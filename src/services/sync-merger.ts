/**
 * 跨设备配置合并器 (Cross-Device Config Merger)
 * 纯函数：将远程备份配置（Remote）与本地当前配置（Local）进行语义化无损并集合并
 * 核心原则：
 * 1. 常用网站：按 URL、页面与文件夹归属去重；同时合并页面与文件夹元数据；
 * 2. Star 本地分组（ghLocalStarGroupsV1）：按账号字典合并，合并各端分组列表与仓库归属映射并集；
 * 3. 个人仓库分组（gh_my_repo_groups_v2）：数组去重并集；
 * 4. 普通单值设置：以远程或本地非空值为基准合并。
 */

export function mergeSyncSettings(
  local: Record<string, any> | null | undefined,
  remote: Record<string, any> | null | undefined
): Record<string, any> {
  const loc = (local && typeof local === "object") ? local : {};
  const rem = (remote && typeof remote === "object") ? remote : {};
  const merged: Record<string, any> = { ...loc, ...rem };

  // 1. 常用网站 (quickLinks) 智能合并
  type Link = { url: string; title: string; id?: string; icon?: string; page?: string; group?: string };
  const localLinks: Link[] = Array.isArray(loc.quickLinks) ? loc.quickLinks : [];
  const remoteLinks: Link[] = Array.isArray(rem.quickLinks) ? rem.quickLinks : [];

  // A URL can intentionally appear in multiple folders/pages. Do not collapse
  // those placements or overwrite the local folder/page dictionaries wholesale.
  for (const key of ["launcherFolders", "launcherPageLabels", "quickLinkGroupSizes", "launcherFolderPositionV1"]) {
    const record = (value: any) => value && typeof value === "object" && !Array.isArray(value) ? value : {};
    if (loc[key] !== undefined || rem[key] !== undefined) {
      merged[key] = { ...record(loc[key]), ...record(rem[key]) };
    }
  }
  const placementKey = (item: any) => {
    const page = item.page || "常用网站";
    const label = merged.launcherPageLabels?.[page] || page;
    return JSON.stringify([item.url, label === "默认" ? "常用网站" : label, item.group || "常用网站"]);
  };
  const linkMap = new Map<string, any>();
  for (const item of [...localLinks, ...remoteLinks]) {
    if (!item?.url || typeof item.url !== "string") continue;
    const key = placementKey(item);
    const existing = linkMap.get(key);
    linkMap.set(key, existing
      ? { ...existing, ...item, id: existing.id || item.id }
      : { ...item });
  }
  const usedIds = new Set<string>();
  merged.quickLinks = Array.from(linkMap.values()).map(item => {
    const base = String(item.id || "sync-link");
    let id = base;
    for (let suffix = 2; usedIds.has(id); suffix++) id = `${base}-sync-${suffix}`;
    usedIds.add(id);
    return { ...item, id };
  });
  if (loc.launcherPages !== undefined || rem.launcherPages !== undefined || merged.quickLinks.length) {
    merged.launcherPages = Array.from(new Set([
      ...(Array.isArray(loc.launcherPages) ? loc.launcherPages : []),
      ...(Array.isArray(rem.launcherPages) ? rem.launcherPages : []),
      ...merged.quickLinks.map((item: any) => item.page || "常用网站"),
      ...Object.values(merged.launcherFolders || {}).map((folder: any) => folder?.page || "常用网站")
    ]));
  }

  // 2. Star 本地分组 (ghLocalStarGroupsV1) 智能合并
  if (loc.ghLocalStarGroupsV1 || rem.ghLocalStarGroupsV1) {
    const localStars = typeof loc.ghLocalStarGroupsV1 === "object" && loc.ghLocalStarGroupsV1 && !Array.isArray(loc.ghLocalStarGroupsV1) ? loc.ghLocalStarGroupsV1 : {};
    const remoteStars = typeof rem.ghLocalStarGroupsV1 === "object" && rem.ghLocalStarGroupsV1 && !Array.isArray(rem.ghLocalStarGroupsV1) ? rem.ghLocalStarGroupsV1 : {};
    const mergedStars: Record<string, any> = { ...localStars, ...remoteStars };

    // 对相同的账号前缀 key 做深度合并
    const allAccountKeys = new Set([...Object.keys(localStars), ...Object.keys(remoteStars)]);
    for (const accKey of allAccountKeys) {
      const lAcc = localStars[accKey];
      const rAcc = remoteStars[accKey];
      if (lAcc && rAcc && typeof lAcc === "object" && typeof rAcc === "object") {
        const groupsMap = new Map<string, any>();
        const lGroups = Array.isArray(lAcc.groups) ? lAcc.groups : [];
        const rGroups = Array.isArray(rAcc.groups) ? rAcc.groups : [];
        lGroups.forEach((g: any) => { if (g?.id) groupsMap.set(g.id, { ...g }); });
        rGroups.forEach((g: any) => {
          if (g?.id) {
            if (!groupsMap.has(g.id)) groupsMap.set(g.id, { ...g });
            else groupsMap.set(g.id, { ...groupsMap.get(g.id), ...g });
          }
        });

        // 仓库归属 memberships 合并：本地已分类优先保留本地，避免两端无脑并集导致仓库跨多文件夹漂移
        const lMemberships = (lAcc.memberships && typeof lAcc.memberships === "object" && !Array.isArray(lAcc.memberships)) ? lAcc.memberships : {};
        const rMemberships = (rAcc.memberships && typeof rAcc.memberships === "object" && !Array.isArray(rAcc.memberships)) ? rAcc.memberships : {};
        const memberships: Record<string, string[]> = { ...lMemberships };
        for (const [repoName, rList] of Object.entries(rMemberships)) {
          const lList = Array.isArray(memberships[repoName]) ? memberships[repoName] : [];
          const rListArr = Array.isArray(rList) ? rList : [];
          if (lList.length > 0) {
            memberships[repoName] = lList;
          } else {
            memberships[repoName] = rListArr;
          }
        }

        const lSections = Array.isArray(lAcc.sections) ? lAcc.sections : [];
        const rSections = Array.isArray(rAcc.sections) ? rAcc.sections : [];
        const sections = Array.from(new Set([...lSections, ...rSections]));

        mergedStars[accKey] = {
          version: 1,
          owner: lAcc.owner || rAcc.owner,
          groups: Array.from(groupsMap.values()),
          memberships,
          sections: sections.length ? sections : ["默认"],
          activeSection: rAcc.activeSection || lAcc.activeSection || "默认"
        };
      }
    }
    merged.ghLocalStarGroupsV1 = mergedStars;
  }

  // 3. 个人仓库分组 (gh_my_repo_groups_v2) 智能合并
  if (loc.gh_my_repo_groups_v2 || rem.gh_my_repo_groups_v2) {
    const lGroups = Array.isArray(loc.gh_my_repo_groups_v2) ? loc.gh_my_repo_groups_v2 : [];
    const rGroups = Array.isArray(rem.gh_my_repo_groups_v2) ? rem.gh_my_repo_groups_v2 : [];
    merged.gh_my_repo_groups_v2 = Array.from(new Set([...lGroups, ...rGroups]));
  }

  // 4. 个人仓库分组映射 (gh_my_repo_groups_map_v2)
  if (loc.gh_my_repo_groups_map_v2 || rem.gh_my_repo_groups_map_v2) {
    const lMap = typeof loc.gh_my_repo_groups_map_v2 === "object" && loc.gh_my_repo_groups_map_v2 && !Array.isArray(loc.gh_my_repo_groups_map_v2) ? loc.gh_my_repo_groups_map_v2 : {};
    const rMap = typeof rem.gh_my_repo_groups_map_v2 === "object" && rem.gh_my_repo_groups_map_v2 && !Array.isArray(rem.gh_my_repo_groups_map_v2) ? rem.gh_my_repo_groups_map_v2 : {};
    const mergedRepoMap: Record<string, string[]> = { ...lMap };
    for (const [repo, rGroups] of Object.entries(rMap)) {
      const lList = Array.isArray(mergedRepoMap[repo]) ? mergedRepoMap[repo] : [];
      const rGroupsArr = Array.isArray(rGroups) ? rGroups : [];
      mergedRepoMap[repo] = Array.from(new Set([...lList, ...rGroupsArr]));
    }
    merged.gh_my_repo_groups_map_v2 = mergedRepoMap;
  }

  return merged;
}
