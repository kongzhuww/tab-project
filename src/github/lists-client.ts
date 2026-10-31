/**
 * GitHub GraphQL Lists Client
 * 对接 GitHub 官方 User Lists (Star 分组列表) GraphQL API
 * 包含列表查询、创建、删除与仓库所属列表更新
 */

export interface GitHubUserList {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  totalCount: number;
}

export interface GitHubUserListDetail extends GitHubUserList {
  repoNames: string[]; // "owner/repo" in lower-case
  repoNodeIds: Map<string, string>; // "owner/repo" -> nodeId
}

export interface GitHubListsSnapshot {
  lists: GitHubUserList[];
  // repo full_name (lowercase) -> array of list IDs
  repoListIds: Map<string, string[]>;
  // repo full_name (lowercase) -> array of list names
  repoListNames: Map<string, string[]>;
  // repo full_name (lowercase) -> repo GraphQL Node ID
  repoNodeIds: Map<string, string>;
  fetchedAt: number;
}

const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

async function executeGraphQL<T>(
  token: string,
  query: string,
  variables: Record<string, unknown> = {},
  signal?: AbortSignal
): Promise<T> {
  const cleanToken = token.trim();
  if (!cleanToken) {
    throw new Error("需要配置 GitHub Token 才能访问或操作 GitHub Lists。");
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${cleanToken}`,
    "Content-Type": "application/json",
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    signal,
    credentials: "omit",
    redirect: "error"
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("GitHub Token 无效或已过期，请在设置中更新。");
    if (response.status === 403) throw new Error("GitHub API 拒绝访问，可能超额或 Token 权限不足。");
    throw new Error(`GitHub GraphQL HTTP ${response.status}`);
  }

  const result = await response.json();
  if (result.errors && result.errors.length > 0) {
    const firstErr = result.errors[0];
    if (firstErr.type === "INSUFFICIENT_SCOPES" || /requires.*scope/i.test(firstErr.message || "")) {
      throw new Error("当前 Token 缺少 'user' 权限，无法修改或创建 GitHub 列表。请在 GitHub Settings > Developer settings > Personal access tokens 中勾选 user 权限。");
    }
    throw new Error(firstErr.message || "GitHub Lists 接口请求失败");
  }

  return result.data as T;
}

const LISTS_QUERY = `
query GetUserLists($cursor: String) {
  viewer {
    lists(first: 100, after: $cursor) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        name
        description
        isPrivate
        items(first: 100) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ... on Repository {
              id
              nameWithOwner
            }
          }
        }
      }
    }
  }
}
`;

const LIST_ITEMS_PAGE_QUERY = `
query GetListItems($id: ID!, $cursor: String!) {
  node(id: $id) {
    ... on UserList {
      items(first: 100, after: $cursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ... on Repository {
            id
            nameWithOwner
          }
        }
      }
    }
  }
}
`;

export async function fetchGitHubUserLists(token: string, signal?: AbortSignal): Promise<GitHubListsSnapshot> {
  const lists: GitHubUserList[] = [];
  const repoListIds = new Map<string, string[]>();
  const repoListNames = new Map<string, string[]>();
  const repoNodeIds = new Map<string, string>();

  let hasNextList = true;
  let listCursor: string | null = null;

  while (hasNextList) {
    signal?.throwIfAborted();
    type QueryResult = {
      viewer: {
        lists: {
          totalCount: number;
          pageInfo: { hasNextPage: boolean; endCursor: string | null };
          nodes: Array<{
            id: string;
            name: string;
            description: string;
            isPrivate: boolean;
            items: {
              totalCount: number;
              pageInfo: { hasNextPage: boolean; endCursor: string | null };
              nodes: Array<{ id: string; nameWithOwner: string }>;
            };
          }>;
        };
      };
    };

    const data: QueryResult = await executeGraphQL<QueryResult>(
      token,
      LISTS_QUERY,
      { cursor: listCursor },
      signal
    );

    const listConnection = data?.viewer?.lists;
    if (!listConnection?.nodes) break;

    for (const rawList of listConnection.nodes) {
      const listInfo: GitHubUserList = {
        id: rawList.id,
        name: rawList.name,
        description: rawList.description || "",
        isPrivate: Boolean(rawList.isPrivate),
        totalCount: rawList.items?.totalCount ?? 0
      };
      lists.push(listInfo);

      const collectItems = (items: Array<{ id: string; nameWithOwner: string }>) => {
        for (const repo of items) {
          if (!repo?.nameWithOwner) continue;
          const key = repo.nameWithOwner.toLowerCase();
          if (repo.id) repoNodeIds.set(key, repo.id);

          const ids = repoListIds.get(key) || [];
          if (!ids.includes(listInfo.id)) ids.push(listInfo.id);
          repoListIds.set(key, ids);

          const names = repoListNames.get(key) || [];
          if (!names.includes(listInfo.name)) names.push(listInfo.name);
          repoListNames.set(key, names);
        }
      };

      if (rawList.items?.nodes) {
        collectItems(rawList.items.nodes);
      }

      // If a list has more than 100 items, paginate through remaining items
      let itemPageInfo = rawList.items?.pageInfo;
      while (itemPageInfo?.hasNextPage && itemPageInfo.endCursor) {
        signal?.throwIfAborted();
        type NodeResult = {
          node: {
            items: {
              totalCount: number;
              pageInfo: { hasNextPage: boolean; endCursor: string | null };
              nodes: Array<{ id: string; nameWithOwner: string }>;
            };
          };
        };
        const itemPageData: NodeResult = await executeGraphQL<NodeResult>(
          token,
          LIST_ITEMS_PAGE_QUERY,
          { id: listInfo.id, cursor: itemPageInfo.endCursor },
          signal
        );
        const subItems = itemPageData?.node?.items;
        if (subItems?.nodes) {
          collectItems(subItems.nodes);
        }
        itemPageInfo = subItems?.pageInfo;
      }
    }

    hasNextList = Boolean(listConnection.pageInfo?.hasNextPage && listConnection.pageInfo.endCursor);
    listCursor = listConnection.pageInfo?.endCursor || null;
  }

  return {
    lists,
    repoListIds,
    repoListNames,
    repoNodeIds,
    fetchedAt: Date.now()
  };
}

const CREATE_LIST_MUTATION = `
mutation CreateUserList($name: String!, $description: String, $isPrivate: Boolean) {
  createUserList(input: { name: $name, description: $description, isPrivate: $isPrivate }) {
    list {
      id
      name
      description
      isPrivate
    }
  }
}
`;

export async function createGitHubUserList(
  token: string,
  name: string,
  description = "",
  isPrivate = false,
  signal?: AbortSignal
): Promise<GitHubUserList> {
  type MutationResult = {
    createUserList: {
      list: {
        id: string;
        name: string;
        description: string;
        isPrivate: boolean;
      };
    };
  };

  const data = await executeGraphQL<MutationResult>(
    token,
    CREATE_LIST_MUTATION,
    { name: name.trim(), description: description.trim(), isPrivate },
    signal
  );

  const created = data?.createUserList?.list;
  if (!created?.id) throw new Error("新建列表未返回有效 ID");
  return {
    id: created.id,
    name: created.name,
    description: created.description || "",
    isPrivate: created.isPrivate,
    totalCount: 0
  };
}

const DELETE_LIST_MUTATION = `
mutation DeleteUserList($listId: ID!) {
  deleteUserList(input: { listId: $listId }) {
    clientMutationId
  }
}
`;

export async function deleteGitHubUserList(
  token: string,
  listId: string,
  signal?: AbortSignal
): Promise<void> {
  await executeGraphQL(token, DELETE_LIST_MUTATION, { listId }, signal);
}

const UPDATE_ITEM_LISTS_MUTATION = `
mutation UpdateListsForItem($itemId: ID!, $listIds: [ID!]!) {
  updateUserListsForItem(input: { itemId: $itemId, listIds: $listIds }) {
    lists {
      id
      name
    }
  }
}
`;

export async function updateGitHubItemLists(
  token: string,
  repositoryNodeId: string,
  targetListIds: string[],
  signal?: AbortSignal
): Promise<Array<{ id: string; name: string }>> {
  type MutationResult = {
    updateUserListsForItem: {
      lists: Array<{ id: string; name: string }>;
    };
  };

  const data = await executeGraphQL<MutationResult>(
    token,
    UPDATE_ITEM_LISTS_MUTATION,
    { itemId: repositoryNodeId, listIds: targetListIds },
    signal
  );

  return data?.updateUserListsForItem?.lists || [];
}
