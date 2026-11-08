/**
 * 同步快照差异与两端比对分析器 (Sync Snapshot Diff & Comparison Analyzer)
 * 纯函数：比对两份配置字典，自动提取出人类易读的模块化改动日志或两端双向对比
 */

export interface ChangeSummary {
  category: "sites" | "star-groups" | "my-repos" | "settings" | "other";
  categoryLabel: string;
  action: "added" | "removed" | "modified";
  badge?: {
    text: string;
    type: "plus" | "minus" | "diff"; // plus -> 绿色 (+N), minus -> 红色 (-N), diff -> 橙/蓝色 (±N)
  };
  text: string;
}

const extractStarGroupNames = (obj: any): string[] => {
  if (!obj || typeof obj !== "object") return [];
  const names = new Set<string>();
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("ghLocalStarGroupsV1:") && v && typeof v === "object") {
      const groups = (v as any).groups;
      if (Array.isArray(groups)) {
        groups.forEach((g: any) => { if (g?.name) names.add(g.name); });
      }
    }
  }
  return Array.from(names);
};

/**
 * 计算一次备份本身的单向变更记录（上一次备份快照 -> 本次新备份快照）
 */
export function computeConfigDiff(
  previous: Record<string, any> | null | undefined,
  current: Record<string, any> | null | undefined
): ChangeSummary[] {
  const changes: ChangeSummary[] = [];
  if (!current) return changes;
  const prev = previous || {};

  // 1. 常用网站 (quickLinks)
  const prevLinks: Array<{ title?: string; url?: string }> = Array.isArray(prev.quickLinks) ? prev.quickLinks : [];
  const currLinks: Array<{ title?: string; url?: string }> = Array.isArray(current.quickLinks) ? current.quickLinks : [];
  const prevUrlMap = new Map(prevLinks.map(l => [l.url || "", l.title || l.url || ""]));
  const currUrlMap = new Map(currLinks.map(l => [l.url || "", l.title || l.url || ""]));

  const addedLinks: string[] = [];
  const removedLinks: string[] = [];

  for (const [url, title] of currUrlMap) {
    if (url && !prevUrlMap.has(url)) {
      addedLinks.push(title);
    }
  }
  for (const [url, title] of prevUrlMap) {
    if (url && !currUrlMap.has(url)) {
      removedLinks.push(title);
    }
  }

  if (addedLinks.length > 0) {
    const preview = addedLinks.slice(0, 3).join("、");
    const countText = addedLinks.length > 3 ? ` 等共 ${addedLinks.length} 个` : "";
    changes.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "added",
      badge: { text: `+${addedLinks.length}`, type: "plus" },
      text: `新增了常用网站: ${preview}${countText}`
    });
  }
  if (removedLinks.length > 0) {
    const preview = removedLinks.slice(0, 3).join("、");
    const countText = removedLinks.length > 3 ? ` 等共 ${removedLinks.length} 个` : "";
    changes.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "removed",
      badge: { text: `-${removedLinks.length}`, type: "minus" },
      text: `移除了常用网站: ${preview}${countText}`
    });
  }

  // 2. Star 本地分组 (ghLocalStarGroupsV1)
  const prevStarGroups = new Set(extractStarGroupNames(prev.ghLocalStarGroupsV1));
  const currStarGroups = new Set(extractStarGroupNames(current.ghLocalStarGroupsV1));

  const addedStarGroups = Array.from(currStarGroups).filter(g => !prevStarGroups.has(g));
  const removedStarGroups = Array.from(prevStarGroups).filter(g => !currStarGroups.has(g));

  if (addedStarGroups.length > 0) {
    changes.push({
      category: "star-groups",
      categoryLabel: "GitHub 收藏",
      action: "added",
      badge: { text: `+${addedStarGroups.length}`, type: "plus" },
      text: `新建了本地分组: ${addedStarGroups.join("、")}`
    });
  }
  if (removedStarGroups.length > 0) {
    changes.push({
      category: "star-groups",
      categoryLabel: "GitHub 收藏",
      action: "removed",
      badge: { text: `-${removedStarGroups.length}`, type: "minus" },
      text: `移除了本地分组: ${removedStarGroups.join("、")}`
    });
  }

  // 3. 个人仓库分组 (gh_my_repo_groups_v2)
  const prevMyRepoGroups: string[] = Array.isArray(prev.gh_my_repo_groups_v2) ? prev.gh_my_repo_groups_v2 : [];
  const currMyRepoGroups: string[] = Array.isArray(current.gh_my_repo_groups_v2) ? current.gh_my_repo_groups_v2 : [];
  const addedMyGroups = currMyRepoGroups.filter(g => !prevMyRepoGroups.includes(g));
  const removedMyGroups = prevMyRepoGroups.filter(g => !currMyRepoGroups.includes(g));

  if (addedMyGroups.length > 0) {
    changes.push({
      category: "my-repos",
      categoryLabel: "个人仓库",
      action: "added",
      badge: { text: `+${addedMyGroups.length}`, type: "plus" },
      text: `新建了个人仓库分组: ${addedMyGroups.join("、")}`
    });
  }
  if (removedMyGroups.length > 0) {
    changes.push({
      category: "my-repos",
      categoryLabel: "个人仓库",
      action: "removed",
      badge: { text: `-${removedMyGroups.length}`, type: "minus" },
      text: `移除了个人仓库分组: ${removedMyGroups.join("、")}`
    });
  }

  // 4. 基础设置与模块开关变化
  const basicKeys: Record<string, string> = {
    theme: "界面主题",
    showWeather: "天气挂件",
    showSites: "常用网站栏",
    showBili: "B站卡片",
    showYouTube: "YouTube卡片",
    showTodo: "待办卡片",
    showBookmarkPanel: "书签栏",
    singleNewTab: "单标签页模式",
    city: "天气城市",
    ghUser: "GitHub 账号",
    todoistToken: "Todoist 授权"
  };

  const modifiedSettings: string[] = [];
  for (const [key, label] of Object.entries(basicKeys)) {
    if (current[key] !== undefined && prev[key] !== undefined && JSON.stringify(current[key]) !== JSON.stringify(prev[key])) {
      modifiedSettings.push(label);
    }
  }

  if (modifiedSettings.length > 0) {
    changes.push({
      category: "settings",
      categoryLabel: "系统设置",
      action: "modified",
      badge: { text: `±${modifiedSettings.length}`, type: "diff" },
      text: `修改了配置项: ${modifiedSettings.join("、")}`
    });
  }

  // 5. 兜底统计概览
  if (changes.length === 0) {
    const details: string[] = [];
    if (currLinks.length > 0 || prevLinks.length > 0) {
      details.push(`常用网站 ${currLinks.length} 个（原 ${prevLinks.length} 个）`);
    }
    const currStarCount = currStarGroups.size;
    const prevStarCount = prevStarGroups.size;
    if (currStarCount > 0 || prevStarCount > 0) {
      details.push(`Star 分组 ${currStarCount} 个（原 ${prevStarCount} 个）`);
    }
    if (currMyRepoGroups.length > 0 || prevMyRepoGroups.length > 0) {
      details.push(`个人仓库分组 ${currMyRepoGroups.length} 个（原 ${prevMyRepoGroups.length} 个）`);
    }

    const summaryDetail = details.length ? `数据概览: ${details.join("，")}` : "两端主要数据结构与配置已对齐";
    changes.push({
      category: "other",
      categoryLabel: "对比概览",
      action: "modified",
      text: summaryDetail
    });
  }

  return changes;
}

/**
 * 现场双向比对：比对当前本地状态与云端状态的客观真实差异
 * 统一站在【当前这台设备（本地）】的角度：
 * - 🟩 绿色 [+N 云端新增项]：云端独有，拉取后本地将补入这些新内容
 * - 🟥 红色 [待上传 N 项]：本地独有，云端还没有，点击“提交本地改动合并到云端”后将同步上去
 */
export function compareLocalAndRemote(
  local: Record<string, any> | null | undefined,
  remote: Record<string, any> | null | undefined
): ChangeSummary[] {
  const summaries: ChangeSummary[] = [];
  const loc = local || {};
  const rem = remote || {};

  // 1. 常用网站差异
  const localLinks: Array<{ title?: string; url?: string }> = Array.isArray(loc.quickLinks) ? loc.quickLinks : [];
  const remoteLinks: Array<{ title?: string; url?: string }> = Array.isArray(rem.quickLinks) ? rem.quickLinks : [];
  const localUrlMap = new Map(localLinks.map(l => [l.url || "", l.title || l.url || ""]));
  const remoteUrlMap = new Map(remoteLinks.map(l => [l.url || "", l.title || l.url || ""]));

  const onlyInRemote: string[] = [];
  const onlyInLocal: string[] = [];

  for (const [url, title] of remoteUrlMap) {
    if (url && !localUrlMap.has(url)) {
      onlyInRemote.push(title);
    }
  }
  for (const [url, title] of localUrlMap) {
    if (url && !remoteUrlMap.has(url)) {
      onlyInLocal.push(title);
    }
  }

  if (onlyInRemote.length > 0) {
    const preview = onlyInRemote.slice(0, 3).join("、");
    const countText = onlyInRemote.length > 3 ? ` 等共 ${onlyInRemote.length} 个` : "";
    summaries.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "added",
      badge: { text: `+${onlyInRemote.length} (云端可拉取)`, type: "plus" },
      text: `云端有新网站: ${preview}${countText}`
    });
  }
  if (onlyInLocal.length > 0) {
    const preview = onlyInLocal.slice(0, 3).join("、");
    const countText = onlyInLocal.length > 3 ? ` 等共 ${onlyInLocal.length} 个` : "";
    summaries.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "modified",
      badge: { text: `待上传 ${onlyInLocal.length} 项`, type: "minus" },
      text: `本地新加网站 (尚未同步云端): ${preview}${countText}`
    });
  }

  // 2. Star 分组差异
  const localStarGroups = new Set(extractStarGroupNames(loc.ghLocalStarGroupsV1));
  const remoteStarGroups = new Set(extractStarGroupNames(rem.ghLocalStarGroupsV1));

  const onlyRemoteStars = Array.from(remoteStarGroups).filter(g => !localStarGroups.has(g));
  const onlyLocalStars = Array.from(localStarGroups).filter(g => !remoteStarGroups.has(g));

  if (onlyRemoteStars.length > 0) {
    summaries.push({
      category: "star-groups",
      categoryLabel: "GitHub 收藏",
      action: "added",
      badge: { text: `+${onlyRemoteStars.length} (云端可拉取)`, type: "plus" },
      text: `云端有新分组: ${onlyRemoteStars.join("、")}`
    });
  }
  if (onlyLocalStars.length > 0) {
    summaries.push({
      category: "star-groups",
      categoryLabel: "GitHub 收藏",
      action: "modified",
      badge: { text: `待上传 ${onlyLocalStars.length} 项`, type: "minus" },
      text: `本地新加分组 (尚未同步云端): ${onlyLocalStars.join("、")}`
    });
  }

  // 3. 个人仓库分组
  const localMyGroups: string[] = Array.isArray(loc.gh_my_repo_groups_v2) ? loc.gh_my_repo_groups_v2 : [];
  const remoteMyGroups: string[] = Array.isArray(rem.gh_my_repo_groups_v2) ? rem.gh_my_repo_groups_v2 : [];
  const onlyRemoteMy = remoteMyGroups.filter(g => !localMyGroups.includes(g));
  const onlyLocalMy = localMyGroups.filter(g => !remoteMyGroups.includes(g));

  if (onlyRemoteMy.length > 0) {
    summaries.push({
      category: "my-repos",
      categoryLabel: "个人仓库",
      action: "added",
      badge: { text: `+${onlyRemoteMy.length} (云端可拉取)`, type: "plus" },
      text: `云端有新仓库分组: ${onlyRemoteMy.join("、")}`
    });
  }
  if (onlyLocalMy.length > 0) {
    summaries.push({
      category: "my-repos",
      categoryLabel: "个人仓库",
      action: "modified",
      badge: { text: `待上传 ${onlyLocalMy.length} 项`, type: "minus" },
      text: `本地新加仓库分组 (尚未同步云端): ${onlyLocalMy.join("、")}`
    });
  }

  // 4. 设置项差异
  const basicKeys: Record<string, string> = {
    theme: "界面主题",
    showWeather: "天气挂件",
    showSites: "常用网站栏",
    showBili: "B站卡片",
    showYouTube: "YouTube卡片",
    showTodo: "待办卡片",
    showBookmarkPanel: "书签栏",
    singleNewTab: "单标签页模式",
    city: "天气城市"
  };

  const diffSettings: string[] = [];
  for (const [key, label] of Object.entries(basicKeys)) {
    if (loc[key] !== undefined && rem[key] !== undefined && JSON.stringify(loc[key]) !== JSON.stringify(rem[key])) {
      diffSettings.push(`${label} (本地: ${JSON.stringify(loc[key])} / 云端: ${JSON.stringify(rem[key])})`);
    }
  }

  if (diffSettings.length > 0) {
    summaries.push({
      category: "settings",
      categoryLabel: "系统设置",
      action: "modified",
      badge: { text: `±${diffSettings.length}`, type: "diff" },
      text: `存在差异的配置项: ${diffSettings.join("；")}`
    });
  }

  // 5. 兜底概览
  if (summaries.length === 0) {
    const totalSites = remoteLinks.length;
    const totalStars = remoteStarGroups.size;
    summaries.push({
      category: "other",
      categoryLabel: "对比结果",
      action: "modified",
      text: `本地与云端数据完全一致（常用网站 ${totalSites} 个，Star 分组 ${totalStars} 个）`
    });
  }

  return summaries;
}
