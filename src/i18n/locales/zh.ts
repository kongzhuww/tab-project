export default {
  // 通用操作 (Common Actions)
  "common.save": "保存",
  "common.cancel": "取消",
  "common.confirm": "确定",
  "common.delete": "删除",
  "common.deletePermanently": "彻底删除",
  "common.rename": "重命名",
  "common.edit": "编辑",
  "common.done": "完成",
  "common.finishEdit": "完成编辑",
  "common.add": "添加",
  "common.settings": "设置",
  "common.close": "关闭",
  "common.search": "搜索",
  "common.refresh": "刷新",
  "common.inUse": "使用中",
  "common.notice": "提示",
  "common.loading": "加载中…",
  "common.copied": "已复制到剪贴板",

  // 顶栏 (TopBar)
  "topbar.notifications": "通知中心",
  "topbar.bookmarks": "书签",
  "topbar.settings": "设置",
  "topbar.sidebar": "侧栏 · 标签页聚合与待办",

  // 快捷导航轮盘 (NavWheel)
  "navwheel.appName": "快捷轮盘",
  "navwheel.editSites": "编辑网站",
  "navwheel.finishEdit": "完成编辑",
  "navwheel.editSitesDesc": "管理快捷网站与点击收纳",
  "navwheel.finishEditDesc": "点击收尾并退出编辑模式",
  "navwheel.dragHint": "按住中心可自由拖动轮盘",
  "navwheel.addedNotice": "已进入轮盘！继续点选添加，完成后点击「完成编辑」",
  "navwheel.removedNotice": "已从轮盘移出",
  "navwheel.maxLimitNotice": "快捷轮盘最多容纳 12 个快捷网站",
  "navwheel.enterEditMode": "进入网站管理模式",
  "navwheel.editModeDesc": "点击桌面或文件夹网站即刻加入轮盘，点击轮盘 ✕ 可移除，完成后点击「完成编辑」",
  "navwheel.editSaved": "快捷轮盘已保存",

  // 设置面板 (Settings)
  "settings.title": "控制中心 / 偏好设置",
  "settings.subtitle": "集中管理首页组件、服务连接、快捷键与多端云同步。开关即时保存，输入项可完成编辑后统一保存。",
  "settings.tab.modules": "模块与功能",
  "settings.tab.shortcuts": "快捷键配置",
  "settings.tab.privacy": "搜索书签过滤",
  "settings.tab.appearance": "主题与外观",
  "settings.tab.sync": "数据备份与同步",
  "settings.tab.storage": "文件夹与存储",

  // 主题与外观 (Themes & Appearance)
  "theme.sectionTitle": "主题与外观定制",
  "theme.sectionDesc": "系统主题风格与新标签页视觉定制：提供明亮、深色及专属风格切换，支持预设纯净山景与自定义动静态壁纸。",
  "theme.systemThemes": "系统主题风格",
  "theme.light": "白天明亮",
  "theme.lightDesc": "经典纯净浅色，全模块适配最佳，高对比度清爽视觉",
  "theme.dark": "夜间深色",
  "theme.darkDesc": "护眼深邃暗色，适合弱光夜间环境浏览",
  "theme.endfield": "终末地风格",
  "theme.endfieldDesc": "工业战术硬核，金黄微光与深灰质感点缀",
  "theme.lonetrail": "孤星风格",
  "theme.lonetrailDesc": "深空沉稳蓝灰，极简科研与静谧纸面质感",
  "theme.hint": "💡 贴心提示：新标签页所有组件均深度优化适配明亮模式（白天），视觉纯净高雅；深色模式适合夜间低光照环境使用。",

  // 语言设置 (Language Settings)
  "language.title": "界面语言",
  "language.zh": "简体中文",
  "language.en": "English",
  "language.hint": "切换界面显示语言，全模块即刻生效",

  // Todoist 看板 (Todoist Workspace)
  "todoist.newProject": "新建项目",
  "todoist.renameProject": "重命名项目",
  "todoist.deleteProject": "删除项目",
  "todoist.deleteProjectConfirm": "删除项目确认",
  "todoist.deleteProjectAlert": "确定要彻底删除项目「{name}」吗？",
  "todoist.deleteProjectWarning": "此操作不可撤销，项目下的所有板块与任务也将一并删除！",
  "todoist.renameSection": "重命名板块",
  "todoist.deleteSection": "删除分组",
  "todoist.deleteSectionConfirm": "删除板块确认",
  "todoist.deleteSectionAlert": "确定要删除板块「{name}」吗？",
  "todoist.deleteSectionWarning": "板块内的任务将自动保留并移至默认收件箱。",
  "todoist.addTask": "＋ 添加任务",
  "todoist.deleteTask": "删除任务",
  "todoist.deleteTaskConfirm": "删除任务确认",
  "todoist.deleteTaskAlert": "确定要删除任务「{name}」吗？",
  "todoist.noTasks": "暂无任务",
  "todoist.dragDialogHint": "按住可拖动位置",
  "todoist.inputProjectPlaceholder": "新项目名称…",
  "todoist.inputSectionPlaceholder": "新板块名称…"
} as const;

export type TranslationKey = keyof typeof import("./zh").default;
