import { reactive, nextTick } from "vue";
import "../modules/builtins";
import { getDockModule, getDockModuleTransition } from "../modules/registry";
import { notificationController } from "../notifications/store";
import { toolModalsController, isToolModalId, toolModalsState, type ToolModalId } from "../core/tool-modals.store";
import { windowManagerController, windowManagerState, isWindowVisible } from "../core/window-manager.store";
import { macDockController } from "./store";

export interface DockToolMeta {
  id: string;
  title: string;
  icon?: string;
  emoji?: string;
}

// 记录当前在内存中处于保活（Running）状态的工具 ID
export const runningAppsState = reactive(new Set<string>());

// 记录每个组件的渲染 Key，递增用于强制热重载
export const appRenderKeys = reactive<Record<string, number>>({});

// 记录每个组件是否处于保留挂载（Mounted）状态
export const appMountedState = reactive<Record<string, boolean>>({});

export interface DockLifecycleResult { ok: boolean; error?: string }
function allowModuleUnmount(id: string): DockLifecycleResult {
  const module = getDockModule(id);
  if (!module?.lifecycle.canUnmount || module.lifecycle.canUnmount()) return { ok: true };
  const error = module.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  notificationController.show({ appName: module.title, title: "操作进行中", message: error, showActions: false });
  return { ok: false, error };
}

export const dockLifecycleController = {
  // 检查应用是否在内存中运行（驱动 Dock 上的小圆点）
  isRunning(id: string): boolean {
    return runningAppsState.has(id);
  },

  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(id: string): boolean {
    const module = getDockModule(id);
    if (module) return module.lifecycle.isVisible();
    if (isToolModalId(id)) {
      return Boolean(toolModalsState[id as ToolModalId]);
    }

    return isWindowVisible(id);
  },

  // 标记应用启动
  markRunning(id: string) {
    runningAppsState.add(id);
    if (id in appMountedState || getDockModule(id)) {
      appMountedState[id] = true;
    }
  },

  // 获取组件当前的 render key
  getRenderKey(id: string): number {
    return appRenderKeys[id] || 0;
  },

  // 打开 / 显示应用窗口
  openApp(id: string) {
    const module = getDockModule(id);
    if (module) {
      windowManagerController.open(id);
      if (module.lifecycle.isVisible()) this.markRunning(id);
      return;
    }
    this.markRunning(id);
    if (isToolModalId(id)) {
      toolModalsController.open(id as ToolModalId);
      return;
    }

    windowManagerController.open(id);
  },

  // 隐藏窗口（应用仍保留在后台内存中保活）
  hideApp(id: string) {
    if (getDockModule(id)) {
      void windowManagerController.close(id);
      return;
    }
    if (isToolModalId(id)) {
      toolModalsController.close(id as ToolModalId);
      return;
    }
    windowManagerController.close(id);
  },

  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(id: string) {
    if (getDockModule(id)) {
      const allowed = allowModuleUnmount(id);
      if (!allowed.ok) return allowed;
      const beforeQuit = getDockModule(id)?.lifecycle.beforeQuit;
      if (beforeQuit) {
        const beforeVersion = getDockModuleTransition(id);
        try { await beforeQuit(); }
        catch {
          const error = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          notificationController.show({ appName: getDockModule(id)!.title, title: "未退出", message: error, showActions: false });
          return { ok: false, error };
        }
        if (getDockModuleTransition(id) !== beforeVersion) return { ok: false, error: "窗口已有后续操作，未卸载。" };
        const recheck = allowModuleUnmount(id);
        if (!recheck.ok) return recheck;
      }
      const closing = windowManagerController.close(id);
      const version = getDockModuleTransition(id);
      runningAppsState.delete(id);
      appMountedState[id] = false;
      macDockController.removeActiveTool(id);
      await closing;
      await nextTick();
      return getDockModuleTransition(id) === version ? { ok: true } : { ok: false, error: "模块已有后续操作，退出状态已变化。" };
    }

    // 1. 关闭前端视窗
    this.hideApp(id);

    // 2. 彻底从运行集合中剔除（小圆点熄灭）
    runningAppsState.delete(id);
    macDockController.removeActiveTool(id);

    // 3. 如果是保留挂载的组件，置为 false 触发 Vue 彻底 Unmount
    if (id in appMountedState) {
      appMountedState[id] = false;
    }

    // 4. 清理窗口管理器中的活跃状态
    const wmState = windowManagerState;
    if (wmState.activeId === id) wmState.activeId = "";
    const openIdx = wmState.openOrder.indexOf(id);
    if (openIdx >= 0) wmState.openOrder.splice(openIdx, 1);
    const actIdx = wmState.activeTools.indexOf(id);
    if (actIdx >= 0) wmState.activeTools.splice(actIdx, 1);
    windowManagerController.render();
  },

  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(id: string) {
    const module = getDockModule(id);
    if (module) {
      if (module.lifecycle.canOpen && !module.lifecycle.canOpen()) return { ok: false, error: "模块当前不能打开，未重载窗口。" };
      const allowed = allowModuleUnmount(id);
      if (!allowed.ok) return allowed;
      const closing = windowManagerController.close(id);
      const version = getDockModuleTransition(id);
      await closing;
      if (getDockModuleTransition(id) !== version) return { ok: false, error: "模块已有后续操作，重载已取消。" };
      appMountedState[id] = false;
      await nextTick();
      if (getDockModuleTransition(id) !== version) return { ok: false, error: "模块已有后续操作，未重新打开。" };
      appRenderKeys[id] = (appRenderKeys[id] || 0) + 1;
      windowManagerController.open(id);
      if (!module.lifecycle.isVisible()) return { ok: false, error: "模块当前不能打开，未重新显示窗口。" };
      this.markRunning(id);
      return { ok: true };
    }
    // 先关闭视窗
    this.hideApp(id);

    // 如果处于挂载列表中，快速卸载并在下一帧重新挂载
    if (id in appMountedState) {
      appMountedState[id] = false;
      await nextTick();
      // 递增渲染 key 强制重新构建全新实例
      appRenderKeys[id] = (appRenderKeys[id] || 0) + 1;
      appMountedState[id] = true;
    } else {
      appRenderKeys[id] = (appRenderKeys[id] || 0) + 1;
    }

    // 保持运行态小圆点亮起，并重新打开窗口
    await nextTick();
    this.openApp(id);
  }
};
