import type { TranslationKey } from "./zh";

const en: Record<TranslationKey, string> = {
  // 通用操作 (Common Actions)
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.confirm": "Confirm",
  "common.delete": "Delete",
  "common.deletePermanently": "Delete Permanently",
  "common.rename": "Rename",
  "common.edit": "Edit",
  "common.done": "Done",
  "common.finishEdit": "Done Editing",
  "common.add": "Add",
  "common.settings": "Settings",
  "common.close": "Close",
  "common.search": "Search",
  "common.refresh": "Refresh",
  "common.inUse": "Active",
  "common.notice": "Notice",
  "common.loading": "Loading…",
  "common.copied": "Copied to clipboard",

  // 顶栏 (TopBar)
  "topbar.notifications": "Notifications",
  "topbar.bookmarks": "Bookmarks",
  "topbar.settings": "Settings",
  "topbar.sidebar": "Sidebar · Tabs & Tasks",

  // 快捷导航轮盘 (NavWheel)
  "navwheel.appName": "Quick Wheel",
  "navwheel.editSites": "Edit Sites",
  "navwheel.finishEdit": "Done Editing",
  "navwheel.editSitesDesc": "Manage and click sites to add",
  "navwheel.finishEditDesc": "Save changes and exit edit mode",
  "navwheel.dragHint": "Drag center hub to reposition",
  "navwheel.addedNotice": "added to wheel! Click more to add, or click Done Editing when finished.",
  "navwheel.removedNotice": "Removed from wheel",
  "navwheel.maxLimitNotice": "Quick Wheel can hold up to 12 shortcuts",
  "navwheel.enterEditMode": "Site Management Mode",
  "navwheel.editModeDesc": "Click any site on desktop or folder to add, click ✕ on wheel to remove.",
  "navwheel.editSaved": "Quick Wheel layout saved",

  // 设置面板 (Settings)
  "settings.title": "Control Center / Preferences",
  "settings.subtitle": "Manage new tab components, service integrations, shortcuts and multi-device sync.",
  "settings.tab.modules": "Modules & Features",
  "settings.tab.shortcuts": "Keyboard Shortcuts",
  "settings.tab.privacy": "Search & Filters",
  "settings.tab.appearance": "Themes & Appearance",
  "settings.tab.sync": "Backup & Cloud Sync",
  "settings.tab.storage": "Storage & Files",

  // 主题与外观 (Themes & Appearance)
  "theme.sectionTitle": "Themes & Appearance",
  "theme.sectionDesc": "Customize system style and wallpapers: choose between light, dark, and specialized themes with static or dynamic backgrounds.",
  "theme.systemThemes": "System Style",
  "theme.light": "Light Mode",
  "theme.lightDesc": "Classic crisp light theme with optimal contrast across all modules",
  "theme.dark": "Dark Mode",
  "theme.darkDesc": "Eye-friendly deep dark theme for low-light night environments",
  "theme.endfield": "Endfield Style",
  "theme.endfieldDesc": "Tactical industrial aesthetic with warm amber and graphite accents",
  "theme.lonetrail": "Lonetrail Style",
  "theme.lonetrailDesc": "Calm research blue-gray with serene paper texture",
  "theme.hint": "💡 Tip: All components are meticulously designed for Light Mode. Dark Mode is ideal for night-time use.",

  // 语言设置 (Language Settings)
  "language.title": "Interface Language",
  "language.zh": "简体中文",
  "language.en": "English",
  "language.hint": "Switch display language, changes apply immediately across all modules",

  // Todoist 看板 (Todoist Workspace)
  "todoist.newProject": "New Project",
  "todoist.renameProject": "Rename Project",
  "todoist.deleteProject": "Delete Project",
  "todoist.deleteProjectConfirm": "Delete Project",
  "todoist.deleteProjectAlert": "Are you sure you want to permanently delete project \"{name}\"?",
  "todoist.deleteProjectWarning": "This cannot be undone. All sections and tasks in this project will also be removed!",
  "todoist.renameSection": "Rename Section",
  "todoist.deleteSection": "Delete Section",
  "todoist.deleteSectionConfirm": "Delete Section",
  "todoist.deleteSectionAlert": "Are you sure you want to delete section \"{name}\"?",
  "todoist.deleteSectionWarning": "Tasks within this section will be preserved and moved to your default Inbox.",
  "todoist.addTask": "+ Add Task",
  "todoist.deleteTask": "Delete Task",
  "todoist.deleteTaskConfirm": "Delete Task",
  "todoist.deleteTaskAlert": "Are you sure you want to delete task \"{name}\"?",
  "todoist.noTasks": "No tasks",
  "todoist.dragDialogHint": "Drag to reposition",
  "todoist.inputProjectPlaceholder": "New project name…",
  "todoist.inputSectionPlaceholder": "New section name…"
};

export default en;
