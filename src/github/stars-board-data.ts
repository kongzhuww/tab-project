import { shallowReactive } from "vue";
import type { GitHubRawRepo } from "../services/github.service";
import type { GitHubUserList } from "./lists-client";

/** Public view snapshot only; never proxy the service (which owns credentials). */
export const starBoardData = shallowReactive({
  ownerKey: "",
  searchQuery: "",
  sections: ["默认"] as string[],
  activeSection: "默认",
  repos: [] as GitHubRawRepo[],
  lists: [] as GitHubUserList[],
  repoListNames: new Map<string, string[]>(),
  loading: false
});

export function getStarBoardRepoFolders(fullName: string): string[] {
  return starBoardData.repoListNames.get(fullName.toLowerCase()) || [];
}
