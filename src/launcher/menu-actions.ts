import { launcherService } from "../services/launcher.service";
import { launcherDialogsController } from "./dialogs-store";
import { appDialog } from "../core/app-dialog.store";

export function promptLauncherFolderDelete(group: string): void {
  if (!group) return;
  const links = launcherService.getState().links.filter((link) => (link.group || "常用网站") === group);
  const count = links.length;
  const names = links.slice(0, 4).map((link) => link.title || "未命名").join("、");
  launcherDialogsController.openFolderDeleteDialog({
    groupName: group,
    count,
    hint: count ? `包含：${names}${count > 4 ? ` 等 ${count} 个书签` : ""}` : "",
    onRelease: async () => { await launcherService.deleteGroup(group, "release"); },
    onDeleteAll: async () => { await launcherService.deleteGroup(group, "purge"); }
  });
}

export async function runLauncherMenuAction(action: string, payload?: {
  group?: string; page?: string; link?: { id: string }
}): Promise<void> {
  const group = payload?.group;
  if (action === "folder:rename" && group) {
    const name = (await appDialog.prompt({
      title: "重命名收藏夹",
      message: `请输入收藏夹「${group}」的新名称：`,
      defaultValue: group
    }))?.trim();
    if (name && name !== group) await launcherService.renameGroup(group, name);
  } else if (action === "folder:toggle-size" && group) {
    await launcherService.toggleGroupSize(group);
  } else if (action === "folder:move" && group && payload?.page) {
    await launcherService.moveFolderToPage(group, payload.page);
  } else if (action === "folder:delete" && group) {
    promptLauncherFolderDelete(group);
  } else if (action === "page:delete" && payload?.page) {
    if (launcherService.getPageNames().length <= 1) {
      await appDialog.alert({
        title: "无法删除分区",
        message: "至少需要保留一个分区，不能删除。"
      });
      return;
    }
    const ok = await appDialog.confirm({
      title: "删除分区确认",
      message: `确定要删除分区「${launcherService.getPageLabel(payload.page)}」吗？\n该分区下的网站和文件夹将移至保留分区。`,
      danger: true
    });
    if (ok) {
      await launcherService.deletePage(payload.page);
    }
  } else if (action === "blank:create-large-folder") {
    await launcherService.createLargeFolder(undefined, payload?.page);
  } else if (action === "blank:create-medium-folder") {
    await launcherService.createMediumFolder(undefined, payload?.page);
  } else if (action.startsWith("link:") && payload?.link) {
    // Menu payloads are snapshots, not mutable service records.
    const link = launcherService.getState().links.find((item) => String(item.id) === String(payload.link!.id));
    if (!link) return;
    if (action === "link:rename") {
      const title = (await appDialog.prompt({
        title: "重命名网站",
        message: `请输入网站「${link.title}」的新名称：`,
        defaultValue: link.title
      }))?.trim();
      if (title && title !== link.title) await launcherService.saveLink({ ...link, title });
    } else if (action === "link:create-large-folder") {
      const defaultName = `${link.title || "新"}大文件夹`;
      const name = (await appDialog.prompt({
        title: "创建大文件夹",
        message: `为「${link.title}」创建大文件夹名称：`,
        defaultValue: defaultName
      }))?.trim();
      if (name) {
        await launcherService.createLargeFolderFromLink(link.id, name);
      }
    } else if (action === "link:change-icon") {
      const query = link.title || launcherService.hostOf(link.url);
      launcherDialogsController.openIconPicker(link.title || "网站", query, link.url, link.id);
      await launcherDialogsController.searchIcons(query);
    } else if (action === "link:move" && payload.page) {
      await launcherService.moveLinkTo(link.id, payload.page, link.group || "常用网站");
    } else if (action === "link:move-out") {
      await launcherService.moveLinkTo(link.id, link.page, "常用网站");
    } else if (action === "link:delete") {
      await launcherService.deleteLink(link.id);
    }
  }
}
