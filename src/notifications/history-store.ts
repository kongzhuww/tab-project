import { computed, reactive } from 'vue';
import { NOTIFICATION_HISTORY_KEY, safeSnapshot, safeTarget, type ArchivedNotification, type HistorySnapshot, type NotificationTarget } from './history-contract';
import { notificationHistoryOperation } from './history-repository';
declare const chrome: any;

export const notificationHistoryState = reactive({
  isOpen: false,
  loading: false,
  saving: false,
  error: '',
  version: -1,
  items: [] as ArchivedNotification[]
});

export const notificationUnreadCount = computed(() => {
  return notificationHistoryState.items.filter(item => !item.read).length;
});

let started = false;

function apply(snapshot: HistorySnapshot) {
  if (snapshot.version < notificationHistoryState.version) return;
  notificationHistoryState.version = snapshot.version;
  notificationHistoryState.items = snapshot.items;
}

export const notificationHistoryController = {
  state: notificationHistoryState,

  start() {
    if (started) return;
    started = true;

    // 跨页面与 Background 状态实时同步
    if (typeof chrome !== 'undefined' && chrome.storage?.onChanged) {
      chrome.storage.onChanged.addListener((changes: any, area: string) => {
        if (area !== 'local' || !changes[NOTIFICATION_HISTORY_KEY]) return;
        try {
          apply(safeSnapshot(changes[NOTIFICATION_HISTORY_KEY].newValue));
        } catch {
          notificationHistoryState.error = '通知历史格式异常，未覆盖当前记录。';
        }
      });
    }

    void this.refresh();
  },

  async refresh() {
    notificationHistoryState.loading = true;
    try {
      const snapshot = await notificationHistoryOperation('list');
      apply(snapshot);
      notificationHistoryState.error = '';
    } catch {
      notificationHistoryState.error = '通知历史读取失败。请点击“重新读取”重试。';
    } finally {
      notificationHistoryState.loading = false;
    }
  },

  open() {
    this.start();
    notificationHistoryState.isOpen = true;
    void this.refresh();
  },

  close() {
    notificationHistoryState.isOpen = false;
  },

  toggle() {
    if (notificationHistoryState.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  async markRead(id: string) {
    if (notificationHistoryState.saving) return;
    notificationHistoryState.saving = true;
    try {
      const snapshot = await notificationHistoryOperation('read', id);
      apply(snapshot);
      notificationHistoryState.error = '';
    } catch {
      notificationHistoryState.error = '标记已读未确认，请重试。';
    } finally {
      notificationHistoryState.saving = false;
    }
  },

  async markAllRead() {
    if (notificationHistoryState.saving) return;
    notificationHistoryState.saving = true;
    try {
      const snapshot = await notificationHistoryOperation('read-all');
      apply(snapshot);
      notificationHistoryState.error = '';
    } catch {
      notificationHistoryState.error = '全部标记已读未确认，请重试。';
    } finally {
      notificationHistoryState.saving = false;
    }
  },

  async remove(id: string) {
    if (notificationHistoryState.saving) return;
    notificationHistoryState.saving = true;
    try {
      const snapshot = await notificationHistoryOperation('remove', id);
      apply(snapshot);
      notificationHistoryState.error = '';
    } catch {
      notificationHistoryState.error = '删除通知未确认，请重试。';
    } finally {
      notificationHistoryState.saving = false;
    }
  },

  async clear() {
    if (notificationHistoryState.saving) return;
    notificationHistoryState.saving = true;
    try {
      const snapshot = await notificationHistoryOperation('clear');
      apply(snapshot);
      notificationHistoryState.error = '';
    } catch {
      notificationHistoryState.error = '清空通知未确认，请重试。';
    } finally {
      notificationHistoryState.saving = false;
    }
  },

  async activate(item: ArchivedNotification) {
    await this.markRead(item.id);
    if (item.target) {
      await this.openTarget(item.target);
    }
  },

  async openTarget(raw: NotificationTarget) {
    const target = safeTarget(raw);
    if (!target) return;
    try {
      if (target.type === 'todoist-task') {
        const { openTodoistTask } = await import('../todoist/task-navigation');
        openTodoistTask(target.taskId);
      } else if (target.type === 'github-repository') {
        const { githubRepoDetailController } = await import('../github/repo-detail-store');
        githubRepoDetailController.open(target.fullName);
      } else if (target.type === 'bili-video') {
        const { biliMiniPlayerController } = await import('../bilibili/mini-player-store');
        await biliMiniPlayerController.openVideo({ bvid: target.bvid, aid: target.aid });
      } else if (target.type === 'bili-messages') {
        const { biliMessagePanelController } = await import('../bilibili/message-panel-store');
        biliMessagePanelController.openPanel();
      } else {
        const { getDockModule } = await import('../modules/registry');
        if (!getDockModule(target.moduleId)) throw new Error();
        const { windowManagerController } = await import('../core/window-manager.store');
        windowManagerController.open(target.moduleId);
      }
      this.close();
    } catch {
      notificationHistoryState.error = '通知对应页面暂不能打开，记录已保留。';
    }
  }
};

export function archiveToast(item: ArchivedNotification): void {
  notificationHistoryController.start();
  void notificationHistoryOperation('append', item)
    .then(snapshot => apply(snapshot))
    .catch(() => {
      notificationHistoryState.error = '有一条通知未获持久保存确认。';
    });
}
