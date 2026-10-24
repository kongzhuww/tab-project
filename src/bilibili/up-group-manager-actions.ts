/**
 * 关注分组管理器的界面状态发布与动作处理。
 * 负责接收弹窗内的创建、重命名、删除、移动分组、切换成员以及 UP 预览等动作。
 */
import { flattenBiliUpGroups, validateBiliGroupMove } from "./up-group-tree";
import type { BiliFollowedUp, BiliUpGroup } from "./channel-types";

export interface UpGroupManagerAdapter {
  initGroups: () => Promise<void>;
  getGroups: () => BiliUpGroup[];
  setGroups: (groups: BiliUpGroup[]) => void;
  getFollowings: () => BiliFollowedUp[];
  saveGroups: () => Promise<void>;
  loadFollowedUps: (forceRefresh: boolean, onBatch?: () => void) => Promise<BiliFollowedUp[]>;
  showConfirmModal: (options: {
    title?: string;
    content: string | Node;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
    onConfirm?: () => Promise<void> | void;
  }) => void;
  previewUp: (
    event: { preventDefault?: () => void; stopPropagation?: () => void; clientX: number; clientY: number },
    up: BiliFollowedUp
  ) => void;
  notifyToast: (text: string) => void;
}

export async function openBiliUpGroupManager(
  adapter: UpGroupManagerAdapter,
  targetGroupId = "",
  searchKeyword = "",
  autoCreate = false
): Promise<void> {
  const g = globalThis as any;
  let controller = g.LogicWeaverBiliUpGroupManager;
  if (!controller) {
    await new Promise((r) => setTimeout(r, 120));
    controller = g.LogicWeaverBiliUpGroupManager;
  }
  if (!controller) {
    adapter.notifyToast("关注分组管理器尚未加载，请刷新页面");
    return;
  }

  await adapter.initGroups();
  const savedUngrouped = localStorage.getItem("bili_upg_only_ungrouped_pref");
  controller.open({ query: searchKeyword || "", onlyUngrouped: savedUngrouped === "true" });

  const publish = () => {
    const groups = flattenBiliUpGroups(adapter.getGroups() || []);
    const groupNames = new Map(groups.map((group) => [group.id, group.name]));
    const membership = new Map<string, string[]>();
    groups.forEach((group) =>
      group.upMids.forEach((mid) => {
        const list = membership.get(String(mid)) || [];
        list.push(group.id);
        membership.set(String(mid), list);
      })
    );
    const activeGroupId = groups.some((group) => group.id === controller.state.activeGroupId)
      ? controller.state.activeGroupId
      : groups.some((group) => group.id === targetGroupId)
      ? targetGroupId
      : groups[0]?.id || "";
    controller.update({
      loading: false,
      error: "",
      groups,
      activeGroupId,
      followings: (adapter.getFollowings() || []).map((up) => {
        const groupIds = membership.get(String(up.mid)) || [];
        return {
          mid: String(up.mid),
          name: String(up.name || `UP ${up.mid}`),
          face: String(up.face || ""),
          sign: String(up.sign || ""),
          groupIds,
          groupName: groupIds.map((id) => groupNames.get(id)).filter(Boolean).join(" / ")
        };
      })
    });
  };

  const saveAndPublish = async () => {
    try {
      await adapter.saveGroups();
      publish();
      g.__refreshBiliUpGroupManager = publish;
    } catch (err: any) {
      controller.update({ error: err?.message || "分组保存失败，请检查存储" });
    }
  };

  controller.setActionHandler(async (action: string, payload: any) => {
    if (action === "close") {
      localStorage.setItem("bili_upg_only_ungrouped_pref", controller.state.onlyUngrouped ? "true" : "false");
      delete g.__refreshBiliUpGroupManager;
      controller.setActionHandler(null);
      return;
    }
    if (action === "refresh") {
      controller.update({ refreshing: true, error: "" });
      try {
        await adapter.loadFollowedUps(true, () => {
          publish();
          controller.update({ refreshing: false });
        });
        publish();
      } catch (error: any) {
        controller.update({ error: error?.message || "刷新关注列表失败" });
      } finally {
        controller.update({ refreshing: false });
      }
      return;
    }
    if (action === "create-group") {
      const name = String(payload?.name || "").trim();
      if (!name) return;
      const parentId = String(payload?.parentId || "");
      const groups = adapter.getGroups();
      groups.push({
        id: `g_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        name,
        parentId: parentId || null,
        upMids: [],
        createdAt: Date.now()
      });
      await saveAndPublish();
      adapter.notifyToast(parentId ? `已创建子分组「${name}」` : `已创建分组「${name}」`);
      return;
    }
    if (action === "rename-group") {
      const groups = adapter.getGroups();
      const group = groups.find((item) => String(item.id) === String(payload?.id));
      const name = String(payload?.name || "").trim();
      if (group && name) {
        group.name = name;
        await saveAndPublish();
      }
      return;
    }
    if (action === "delete-group") {
      const id = String(payload || "");
      const groups = adapter.getGroups();
      const group = groups.find((item) => String(item.id) === id);
      if (!group) return;
      adapter.showConfirmModal({
        title: "删除关注分组",
        content: `确定删除分组「${group.name}」吗？分组中的 UP 主不会被取消关注。`,
        confirmText: "删除",
        onConfirm: async () => {
          const parentId = group.parentId || null;
          groups.forEach((item) => {
            if (String(item.parentId || "") === id) item.parentId = parentId;
          });
          adapter.setGroups(groups.filter((item) => String(item.id) !== id));
          await saveAndPublish();
        }
      });
      return;
    }
    if (action === "move-group") {
      const sourceId = String(payload?.sourceId || "");
      const targetId = String(payload?.targetId || "");
      const mode = String(payload?.mode ?? "into");
      const groups = adapter.getGroups();
      const moveError = validateBiliGroupMove(groups, sourceId, targetId, mode);
      if (moveError) {
        controller.update({ error: moveError });
        return;
      }
      const source = groups.find((item) => String(item.id) === sourceId);
      if (!source) return;
      if (mode === "root") source.parentId = null;
      else {
        const target = groups.find((item) => String(item.id) === targetId);
        if (!target) return;
        source.parentId = mode === "into" ? target.id : target.parentId || null;
        if (mode !== "into") {
          const oldIndex = groups.indexOf(source);
          groups.splice(oldIndex, 1);
          const targetIndex = groups.indexOf(target);
          groups.splice(targetIndex + (mode === "after" ? 1 : 0), 0, source);
        }
      }
      await saveAndPublish();
      return;
    }
    if (action === "toggle-member") {
      const groups = adapter.getGroups();
      const group = groups.find((item) => String(item.id) === String(payload?.groupId));
      const mid = String(payload?.mid || "");
      if (!group || !mid) return;
      const occupied = groups.some(
        (item) => String(item.id) !== String(group.id) && (item.upMids || []).map(String).includes(mid)
      );
      const index = (group.upMids || []).map(String).indexOf(mid);
      if (index < 0 && occupied) return;
      controller.update({ busyMid: mid });
      if (index >= 0) group.upMids.splice(index, 1);
      else group.upMids.push(mid);
      await saveAndPublish();
      controller.update({ busyMid: "" });
      return;
    }
    if (action === "preview-up") {
      const followings = adapter.getFollowings();
      const up = followings.find((item) => String(item.mid) === String(payload?.mid));
      if (up) {
        adapter.previewUp(
          { preventDefault() {}, stopPropagation() {}, clientX: Number(payload?.clientX || 0), clientY: Number(payload?.clientY || 0) },
          up
        );
      }
    }
  });

  g.__refreshBiliUpGroupManager = publish;
  try {
    await adapter.loadFollowedUps(false, publish);
    publish();
    if (autoCreate) controller.update({ activeGroupId: targetGroupId || controller.state.activeGroupId });
  } catch (error: any) {
    controller.update({ loading: false, error: error?.message || "无法读取关注列表" });
  }
}
