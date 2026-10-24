import { calendarWorkspaceController } from "../calendar/workspace-store";
import { introController } from "../intro/controller";
import { notificationController } from "../notifications/store";
import { commandPaletteController } from "../commands/command-palette-store";
import type { CommandRegistry } from "./commands";

export function registerUiCommands(commands: CommandRegistry): void {
  commands.register({
    id: "palette.toggle", title: "打开全局命令中心 (Spotlight)", category: "界面", keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"], concurrency: "drop",
    run: () => commandPaletteController.toggle()
  });
  commands.register({
    id: "intro.skip", title: "跳过开屏动画", category: "界面", keywords: ["开屏", "启动", "skip"], concurrency: "drop",
    enabled: () => introController.enabled && !introController.finished,
    run: () => introController.skip("COMMAND SKIP")
  });
  commands.register({
    id: "notifications.clear", title: "清除全部通知", category: "通知", keywords: ["toast", "关闭", "清空"], concurrency: "drop",
    enabled: () => notificationController.size > 0,
    run: () => notificationController.clear()
  });
  commands.register({
    id: "weather.refresh", title: "刷新天气数据", category: "天气", description: "重新拉取当前城市的气象预报",
    keywords: ["天气", "weather", "气温", "预报"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverWeather?.refresh === "function",
    run: () => window.LogicWeaverWeather?.refresh()
  });
  commands.register({
    id: "weather.change-location", title: "切换天气城市", category: "天气", description: "弹出城市搜索选择气象城市",
    keywords: ["天气", "城市", "地点", "location"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverWeather?.changeLocation === "function",
    run: () => window.LogicWeaverWeather?.changeLocation()
  });
  commands.register({
    id: "clock.open-settings", title: "时钟个性化设置", category: "时钟", description: "弹出时钟字体、颜色与时区设置菜单",
    keywords: ["时钟", "clock", "字体", "时区", "颜色"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverClock?.openSettings === "function",
    run: () => window.LogicWeaverClock?.openSettings()
  });
  commands.register({
    id: "search.focus", title: "聚焦搜索框", category: "搜索", description: "聚焦首屏中央搜索框并全选内容",
    keywords: ["搜索", "search", "输入", "查找"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverSearch?.focus === "function",
    run: () => window.LogicWeaverSearch?.focus()
  });
  commands.register({
    id: "search.cycle-mode", title: "切换搜索模式", category: "搜索", description: "在网页/B站/GitHub/网易云之间切换搜索模式",
    keywords: ["搜索模式", "bilibili", "github", "netease"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverSearch?.cycleMode === "function",
    run: () => window.LogicWeaverSearch?.cycleMode()
  });
  commands.register({
    id: "music.toggle-play", title: "播放 / 暂停音乐", category: "音乐", description: "切换音乐播放或暂停状态",
    keywords: ["播放", "暂停", "play", "pause", "music", "塞壬唱片"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverHomeMusic?.togglePlay === "function",
    run: () => window.LogicWeaverHomeMusic?.togglePlay()
  });
  commands.register({
    id: "music.next", title: "播放下一首音乐", category: "音乐", description: "切换到下一首曲目",
    keywords: ["下一首", "next", "切歌"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverHomeMusic?.next === "function",
    run: () => window.LogicWeaverHomeMusic?.next()
  });
  commands.register({
    id: "music.prev", title: "播放上一首音乐", category: "音乐", description: "切换到上一首曲目",
    keywords: ["上一首", "prev"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverHomeMusic?.prev === "function",
    run: () => window.LogicWeaverHomeMusic?.prev()
  });
  commands.register({
    id: "music.open-siren", title: "打开塞壬唱片模块", category: "音乐", description: "打开明日方舟塞壬唱片官方原声模块",
    keywords: ["塞壬", "唱片", "原声", "siren"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverHomeMusic?.togglePicker === "function",
    run: () => window.LogicWeaverHomeMusic?.togglePicker()
  });
  commands.register({
    id: "music.open-netease", title: "打开网易云模块", category: "音乐", description: "打开网易云音乐工作区",
    keywords: ["网易云", "音乐", "netease"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverHomeMusic?.openPanel === "function",
    run: () => window.LogicWeaverHomeMusic?.openPanel()
  });
  commands.register({
    id: "launcher.next-page", title: "切换到下一网站分区", category: "常用网站", description: "向后切换常用网站分区标签",
    keywords: ["常用网站", "下一页", "分区", "launcher page"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverLauncherGroups?.nextPage === "function",
    run: () => window.LogicWeaverLauncherGroups?.nextPage()
  });
  commands.register({
    id: "launcher.prev-page", title: "切换到上一网站分区", category: "常用网站", description: "向前切换常用网站分区标签",
    keywords: ["常用网站", "上一页", "分区", "launcher page"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverLauncherGroups?.prevPage === "function",
    run: () => window.LogicWeaverLauncherGroups?.prevPage()
  });
  commands.register({
    id: "calendar.open", title: "打开日历", category: "日历", keywords: ["Todoist", "Google Calendar", "月历"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverCalendar?.open === "function", run: () => window.LogicWeaverCalendar?.open()
  });
  commands.register({
    id: "calendar.refresh", title: "刷新日历", category: "日历", keywords: ["Todoist", "Google Calendar", "同步"], concurrency: "drop",
    enabled: () => calendarWorkspaceController.ready, run: () => calendarWorkspaceController.refresh()
  });
  commands.register({
    id: "calendar.today", title: "日历跳转到今天", category: "日历", keywords: ["今日", "today", "日期"], concurrency: "drop",
    enabled: () => calendarWorkspaceController.ready, run: () => calendarWorkspaceController.goToday()
  });
  commands.register({
    id: "github.refresh", title: "刷新 GitHub Star", category: "GitHub", keywords: ["仓库", "收藏", "repository", "star"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverGitHub?.refresh === "function", run: () => window.LogicWeaverGitHub?.refresh()
  });
  commands.register({
    id: "todoist.open", title: "打开 Todoist", category: "Todoist", keywords: ["任务", "待办", "todo"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverTodoist?.open === "function", run: () => window.LogicWeaverTodoist?.open()
  });
  commands.register({
    id: "todoist.refresh", title: "刷新 Todoist", category: "Todoist", keywords: ["任务", "同步", "待办"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverTodoist?.refresh === "function", run: () => window.LogicWeaverTodoist?.refresh()
  });
  commands.register({
    id: "todoist.quick-add", title: "快速添加 Todoist 任务", category: "Todoist", keywords: ["新建", "任务", "quick add"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverTodoist?.quickAdd === "function", run: () => window.LogicWeaverTodoist?.quickAdd()
  });
  commands.register({
    id: "profile.show-info", title: "查看本地信息与性能", category: "账号", description: "打开浏览器指纹、环境与硬件性能网格",
    keywords: ["性能", "指纹", "探针", "profile", "fps"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfileMenu?.trigger === "function",
    run: () => window.LogicWeaverProfileMenu?.trigger("messages")
  });
  commands.register({
    id: "profile.refresh", title: "刷新账号与性能探针", category: "账号", description: "清空账号缓存并重新探测性能",
    keywords: ["刷新", "账号", "探针", "bilibili"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfileMenu?.trigger === "function",
    run: () => window.LogicWeaverProfileMenu?.trigger("refresh")
  });
  commands.register({
    id: "workspace.open-ai", title: "打开 AI 助手", category: "工作区", description: "展开侧边或悬浮 AI 对话助手",
    keywords: ["ai", "助手", "chat", "llm"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverWorkspaceLaunchers?.openWorkspace === "function",
    run: () => window.LogicWeaverWorkspaceLaunchers?.openWorkspace("ai")
  });
  commands.register({
    id: "workspace.open-todoist", title: "打开 Todoist 工作区", category: "工作区", description: "打开常驻 Todoist 任务工作区",
    keywords: ["todoist", "任务", "待办"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverWorkspaceLaunchers?.openWorkspace === "function",
    run: () => window.LogicWeaverWorkspaceLaunchers?.openWorkspace("todoist")
  });
  commands.register({
    id: "dock.go-home", title: "回到主页视窗", category: "Dock", description: "退出全屏卡片并平滑滚动回首屏主页",
    keywords: ["主页", "home", "dock"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverMacDock?.triggerItem === "function",
    run: () => window.LogicWeaverMacDock?.triggerItem("home", "home-launcher")
  });
  commands.register({
    id: "dock.open-bilibili", title: "打开 B站全屏收藏", category: "Dock", description: "展开 B站收藏卡片或切换全屏",
    keywords: ["bilibili", "b站", "收藏"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverMacDock?.triggerItem === "function",
    run: () => window.LogicWeaverMacDock?.triggerItem("target", "daily-bilibili")
  });
  commands.register({
    id: "dock.open-github", title: "打开 GitHub 卡片", category: "Dock", description: "展开 GitHub 仓库卡片或切换全屏",
    keywords: ["github", "仓库"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverMacDock?.triggerItem === "function",
    run: () => window.LogicWeaverMacDock?.triggerItem("target", "card-github")
  });
  commands.register({
    id: "wallpaper.open-dialog", title: "打开壁纸库", category: "壁纸", description: "打开壁纸历史与导入视窗",
    keywords: ["壁纸", "wallpaper", "背景"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBackgroundLibrary?.openDialog === "function",
    run: () => window.LogicWeaverBackgroundLibrary?.openDialog()
  });
  commands.register({
    id: "wallpaper.close-dialog", title: "关闭壁纸库", category: "壁纸", description: "关闭壁纸历史视窗",
    keywords: ["关闭壁纸", "close wallpaper"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBackgroundLibrary?.closeDialog === "function",
    run: () => window.LogicWeaverBackgroundLibrary?.closeDialog()
  });
  commands.register({
    id: "wallpaper.reset", title: "恢复默认壁纸", category: "壁纸", description: "重置为默认纯色主题壁纸",
    keywords: ["重置壁纸", "reset wallpaper"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBackgroundLibrary?.resetDefault === "function",
    run: () => window.LogicWeaverBackgroundLibrary?.resetDefault()
  });
  commands.register({
    id: "profile.open-panel", title: "打开个人信息与性能面板", category: "个人中心", description: "查看浏览器指纹、环境与性能指标",
    keywords: ["个人信息", "性能", "浏览器指纹", "profile"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfilePanel?.openPanel === "function",
    run: () => window.LogicWeaverProfilePanel?.openPanel()
  });
  commands.register({
    id: "profile.close-panel", title: "关闭个人信息面板", category: "个人中心", description: "关闭个人信息与性能采样面板",
    keywords: ["关闭信息", "close profile"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfilePanel?.closePanel === "function",
    run: () => window.LogicWeaverProfilePanel?.closePanel()
  });
  commands.register({
    id: "profile.toggle-tech-drawer", title: "展开/收起微架构抽屉", category: "个人中心", description: "切换多核心 Dedicated Workers 与微架构创新抽屉",
    keywords: ["微架构", "多核心", "tech drawer"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfilePanel?.toggleTechDrawer === "function",
    run: () => window.LogicWeaverProfilePanel?.toggleTechDrawer()
  });
  commands.register({
    id: "bookmark.close-menu", title: "关闭书签操作菜单", category: "书签", description: "关闭书签右键操作与备注编辑菜单",
    keywords: ["书签菜单", "close bookmark menu"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBookmarkMenu?.closeMenu === "function",
    run: () => window.LogicWeaverBookmarkMenu?.closeMenu()
  });
  commands.register({
    id: "launcher.open-edit-dialog", title: "打开添加网站弹窗", category: "启动器", description: "打开添加或编辑常用网站对话框",
    keywords: ["添加网站", "编辑网站", "add launcher"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverLauncherDialogs?.openEditDialog === "function",
    run: () => window.LogicWeaverLauncherDialogs?.openEditDialog({})
  });
  commands.register({
    id: "launcher.open-icon-picker", title: "打开网站图标选择器", category: "启动器", description: "搜索并选用网站高清图标或上传自定义图片",
    keywords: ["图标选择", "网站头像", "icon picker"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverLauncherDialogs?.openIconPicker === "function",
    run: () => window.LogicWeaverLauncherDialogs?.openIconPicker("新网站")
  });
  commands.register({
    id: "settings.open", title: "打开设置中心", category: "设置", description: "打开全局新标签页偏好设置对话框",
    keywords: ["偏好设置", "options", "settings"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverSettings?.open === "function",
    run: () => window.LogicWeaverSettings?.open()
  });
  commands.register({
    id: "settings.close", title: "关闭设置中心", category: "设置", description: "关闭并释放新标签页设置对话框",
    keywords: ["关闭设置", "close settings"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverSettings?.close === "function",
    run: () => window.LogicWeaverSettings?.close()
  });
  commands.register({
    id: "clock.open-settings-menu", title: "打开时钟个性化设置", category: "时钟", description: "呼出中央时钟字体、颜色与时区偏好配置菜单",
    keywords: ["时钟字体", "时钟颜色", "时钟时区", "clock settings"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverClockSettings?.open === "function",
    run: () => window.LogicWeaverClockSettings?.open()
  });
  commands.register({
    id: "clock.close-settings-menu", title: "关闭时钟设置菜单", category: "时钟", description: "关闭中央时钟偏好配置右键菜单",
    keywords: ["关闭时钟菜单", "close clock settings"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverClockSettings?.close === "function",
    run: () => window.LogicWeaverClockSettings?.close()
  });
  commands.register({
    id: "bilibili.open-theater", title: "打开B站视频剧场", category: "Bilibili", description: "打开B站沉浸视频播放与评论区弹窗",
    keywords: ["B站播放", "bilibili theater", "视频评论"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBiliTheater?.open === "function",
    run: () => window.LogicWeaverBiliTheater?.open()
  });
  commands.register({
    id: "bilibili.close-theater", title: "关闭B站视频剧场", category: "Bilibili", description: "关闭B站沉浸视频播放弹窗并停止播放",
    keywords: ["关闭B站", "close bilibili theater"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBiliTheater?.close === "function",
    run: () => window.LogicWeaverBiliTheater?.close()
  });
  commands.register({
    id: "ai.open-dialog", title: "打开AI助手", category: "AI", description: "呼出基于大模型的 AI 对话与知识提炼窗口",
    keywords: ["AI 对话", "ChatGPT", "Gemini", "ai assistant"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverAiDialog?.open === "function",
    run: () => window.LogicWeaverAiDialog?.open()
  });
  commands.register({
    id: "ai.close-dialog", title: "关闭AI助手", category: "AI", description: "关闭并断开当前 AI 会话窗口",
    keywords: ["关闭AI", "close ai"], concurrency: "drop",
    enabled: () => typeof window.LogicWeaverAiDialog?.close === "function",
    run: () => window.LogicWeaverAiDialog?.close()
  });

}
