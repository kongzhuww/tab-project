import type { PiThinkingLevel } from '../services/native-bridge.service';

export const DIGITAL_EMPLOYEES_KEY = 'digitalEmployeesV1';
export const DIGITAL_EMPLOYEE_ORGANIZER_SEEDED_KEY = 'digitalEmployeeOrganizerSeededV1';
export const EMPLOYEE_RUN_LOG_KEY = 'digitalEmployeeRunsV1';
export const EMPLOYEE_LIVE_PEEK_KEY = 'digitalEmployeeLivePeekV1';
export const EMPLOYEE_SHARE_FORMAT = 'tab-project-employee-v1';
export const EMPLOYEE_WORKER_STAMP = 'organizer-approval-safe-v6';

export type EmployeeSourceKind = 'bili-toview' | 'bili-fav' | 'bili-history' | 'workspace-organizer';
export type EmployeeAnalyzer = 'native-pi' | 'deepseek';
export type EmployeeDecisionMode = 'llm-fast' | 'jev-http';
export type EmployeeSkillId =
  | 'bili.source'
  | 'bili.info'
  | 'bili.comments'
  | 'bili.subtitle'
  | 'jev.triage'
  | 'library.save'
  | 'notify.high_value'
  | 'bookmarks.read'
  | 'launcher.read'
  | 'organizer.plan';

export interface EmployeeSkillDescriptor {
  id: EmployeeSkillId;
  name: string;
  description: string;
}

export const AVAILABLE_EMPLOYEE_SKILLS: readonly EmployeeSkillDescriptor[] = [
  { id: 'bili.source', name: 'B站数据源读取', description: '读取稍后再看、指定收藏夹或播放历史视频列表' },
  { id: 'bili.info', name: '视频简介与分P工具', description: '允许员工自主调用工具查看完整简介、分区、播放点赞与分P列表' },
  { id: 'bili.comments', name: '评论区置顶/热评工具', description: '允许员工自主调用工具查看置顶课代表总结、热评口碑与勘误' },
  { id: 'bili.subtitle', name: '字幕分段按需读取工具', description: '允许员工自主按分 P 和页码按需抓取消化字幕全文' },
  { id: 'jev.triage', name: '双层快筛路由', description: '先用 Jev / 轻模型做 Noul · Score · Choice 快速分拣' },
  { id: 'library.save', name: '沉淀至资料库', description: '将通过阈值的高价值拆解按分类写入「资料库 → 文章」' },
  { id: 'notify.high_value', name: '高价值静默通知', description: '生成深度笔记后向工作区通知中心追加提醒' },
  { id: 'bookmarks.read', name: '浏览器书签树读取', description: '只读读取 Chrome 书签栏与其他书签目录树用于分类盘点' },
  { id: 'launcher.read', name: '桌面分区与网站读取', description: '只读读取新标签页分区、大/小文件夹、嵌套层级与网站卡片' },
  { id: 'organizer.plan', name: '整理提案（审批后生效）', description: '输出分步桌面/书签整理提案，每一步需用户点击审核后才写入' },
];

export interface EmployeeFeedbackExample {
  id: string;
  title: string;
  verdict: 'keep' | 'skip';
  category: string;
  note?: string;
  createdAt: number;
}

export interface DigitalEmployee {
  id: string;
  name: string;
  role: string;
  description: string;
  accentColor: string;
  enabled: boolean;
  source: {
    kind: EmployeeSourceKind;
    folderId?: string;
    folderTitle?: string;
  };
  runtime: {
    analyzer: EmployeeAnalyzer;
    piModel?: string;
    piThinking?: PiThinkingLevel;
    decisionMode: EmployeeDecisionMode;
    jevEndpoint?: string;
  };
  prompt: {
    systemPrompt: string;
    reportTemplate: string;
  };
  skills: EmployeeSkillId[];
  customSkillInstructions: string;
  decisionGate: {
    worthQuestion: string;
    minScore: number;
    categories: string[];
    skipCategories: string[];
    skipWithoutSubtitle: boolean;
    retryOnSkip: boolean;
  };
  schedulePolicy: {
    intervalMinutes: number;
    dailyLimit: number;
    maxFetchItems: number;
  };
  ownerFeedback: EmployeeFeedbackExample[];
  createdAt: number;
  updatedAt: number;
  lastRunAt?: number;
  lastError?: string;
  nextEligibleAt?: number;
}

export type EmployeeRunStatus = 'analyzed' | 'skipped-gate' | 'skipped-no-sub' | 'error';

export interface EmployeeToolTraceStep {
  tool: string;
  summary: string;
  ok: boolean;
}

export type PeekCursorTarget =
  | 'folder'
  | 'video-card'
  | 'tab-info'
  | 'info-desc'
  | 'tab-comments'
  | 'comments-list'
  | 'tab-subtitle'
  | 'subtitle-lines'
  | 'decision-badge'
  | 'library-save'
  | 'org-partitions'
  | 'org-folders'
  | 'org-links'
  | 'org-bookmarks'
  | 'org-approval';

export type PeekPhase = 'source' | 'info' | 'comments' | 'subtitle' | 'analyzing' | 'done' | 'skipped' | 'error';

export type OrganizerActionType =
  | 'create_partition'
  | 'create_launcher_folder'
  | 'move_quick_link'
  | 'promote_bookmark_to_launcher'
  | 'create_bookmark_folder'
  | 'move_bookmark'
  | 'rename_folder'
  | 'rename_link'
  | 'remove_folder'
  | 'merge_folders';

export type OrganizerFolderSize = 'small' | 'medium' | 'large';
export type OrganizerStepStatus = 'pending' | 'applying' | 'applied' | 'skipped' | 'error' | 'undoing' | 'undone';

export interface OrganizerUndoReceipt {
  kind: 'launcher' | 'launcher-link' | 'bookmark-move' | 'bookmark-folder' | 'bookmark-rename';
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  bookmarkId?: string;
  parentId?: string;
  index?: number;
  title?: string;
}


export interface OrganizerPlanStep {
  id: string;
  order: number;
  type: OrganizerActionType;
  title: string;
  reason?: string;
  status: OrganizerStepStatus;
  appliedAt?: number;
  errorMessage?: string;
  dependsOn?: string[];
  refs?: Partial<Record<'partition' | 'folder' | 'parentFolder' | 'bookmarkParent' | 'bookmarkTarget', string>>;
  result?: { bookmarkFolderId?: string };
  undo?: OrganizerUndoReceipt;
  expected?: { url: string; title: string; page?: string; group?: string; parentId?: string };
  params: {
    scope?: 'desktop' | 'bookmarks';
    sourceFolder?: string;
    sourceLabel?: string;
    newName?: string;
    partitionName?: string;
    folderName?: string;
    parentFolderName?: string;
    parentBookmarkId?: string;
    parentBookmarkPath?: string;
    targetBookmarkPath?: string;
    folderSize?: OrganizerFolderSize;
    linkId?: string;
    linkTitle?: string;
    linkUrl?: string;
    bookmarkId?: string;
    bookmarkTitle?: string;
    bookmarkUrl?: string;
    targetPartition?: string;
    targetFolder?: string;
  };
}

export interface OrganizerWorkspaceSnapshot {
  capturedAt: number;
  partitions: Array<{ id: string; label: string; linkCount: number; folderCount: number }>;
  folders: Array<{ name: string; page: string; parent?: string; size: OrganizerFolderSize; linkCount: number }>;
  links: Array<{ id: string; title: string; url: string; page: string; group: string }>;
  bookmarkFolders: Array<{ id: string; title: string; parentId?: string; path: string; childCount: number }>;
  bookmarks: Array<{ id: string; title: string; url: string; parentId?: string; folderPath: string }>;
}

export interface EmployeePeekVideoItem {
  bvid: string;
  title: string;
  author: string;
  cover: string;
  duration: number;
}

export interface EmployeePeekCommentItem {
  isTop?: boolean;
  author: string;
  likes: number;
  message: string;
}

export interface EmployeePeekSnapshot {
  employeeId: string;
  employeeName: string;
  mode?: 'bili' | 'organizer';
  bvid: string;
  active: boolean;
  phase: PeekPhase;
  cursorTarget: PeekCursorTarget;
  cursorLabel: string;
  sourceKind: EmployeeSourceKind;
  sourceTitle: string;
  sourceVideos: EmployeePeekVideoItem[];
  activeVideo?: {
    bvid: string;
    title: string;
    author: string;
    cover: string;
    desc?: string;
    tname?: string;
    pages?: Array<{ page: number; part: string; durationSec: number }>;
    stat?: { view: number; like: number; coin: number; favorite: number };
  };
  comments?: EmployeePeekCommentItem[];
  subtitleLines?: string[];
  verdict?: { worth: boolean; score: number; category: string; reason: string };
  toolHistory: EmployeeToolTraceStep[];
  timelineSteps?: string[];
  organizerSnapshot?: OrganizerWorkspaceSnapshot;
  organizerSteps?: OrganizerPlanStep[];
  updatedAt: number;
}

export interface EmployeeRunRecord {
  id: string;
  employeeId: string;
  kind?: 'bili' | 'organizer';
  organizerRevision?: number;
  bvid: string;
  title: string;
  author: string;
  url: string;
  status: EmployeeRunStatus;
  engine: 'jev' | 'deepseek' | 'pi' | 'heuristic' | 'none';
  worth: boolean;
  score: number;
  category: string;
  reason: string;
  planSummary?: string;
  planSteps?: OrganizerPlanStep[];
  organizerSnapshot?: OrganizerWorkspaceSnapshot;
  toolTrace?: EmployeeToolTraceStep[];
  peekFrames?: EmployeePeekSnapshot[];
  articleId?: string;
  errorMessage?: string;
  durationMs: number;
  createdAt: number;
}

export interface EmployeeSharePackage {
  format: typeof EMPLOYEE_SHARE_FORMAT;
  exportedAt: number;
  blueprint: Omit<DigitalEmployee, 'id' | 'enabled' | 'ownerFeedback' | 'createdAt' | 'updatedAt' | 'lastRunAt' | 'lastError' | 'nextEligibleAt'> & {
    ownerFeedback?: EmployeeFeedbackExample[];
  };
}

export function createDefaultBiliEmployee(now = Date.now()): DigitalEmployee {
  return {
    id: 'emp-bili-curator-default',
    name: 'B站分拣研究员',
    role: '后台静默分拣 · 精读沉淀',
    description: '空闲时自动巡检 B 站待看与收藏视频：先过决策漏斗过滤水视频，高价值内容再交由大模型拆解并按分类存进资料库。',
    accentColor: '#6366f1',
    enabled: false,
    source: {
      kind: 'bili-toview',
      folderId: '',
      folderTitle: '稍后再看',
    },
    runtime: {
      analyzer: 'deepseek',
      piThinking: 'medium',
      decisionMode: 'llm-fast',
      jevEndpoint: '',
    },
    prompt: {
      systemPrompt:
        '你是主人的私人视频情报研究员。你可以根据需要自主决定调用哪些工具查看视频简介、分P、评论区（尤其是置顶课代表总结与热评勘误）或字幕原文；过滤情绪煽动与流水账，重点保留原理、架构、实操步骤和关键数据。如果结合简介、评论和字幕判断这个视频水、不值得精读，也可在最终 JSON 中标记 worth=false 跳过沉淀。',
      reportTemplate:
        '## 一句话结论\n\n## 核心要点\n- ...\n\n## 评论区与补充勘误\n\n## 适合进一步行动的建议',
    },
    skills: ['bili.source', 'bili.info', 'bili.comments', 'bili.subtitle', 'jev.triage', 'library.save', 'notify.high_value'],
    customSkillInstructions: '',
    decisionGate: {
      worthQuestion: '这个视频是否具有清晰的信息增量、方法论或工程实践价值（而非纯情绪吐槽/水时长/标题党）？',
      minScore: 0.65,
      categories: ['AI 与 Agent', '工程与效率', '行业洞察', '娱乐/低信息跳过'],
      skipCategories: ['娱乐/低信息跳过'],
      skipWithoutSubtitle: false,
      retryOnSkip: true,
    },
    schedulePolicy: {
      intervalMinutes: 20,
      dailyLimit: 8,
      maxFetchItems: 15,
    },
    ownerFeedback: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function createDefaultOrganizerEmployee(now = Date.now()): DigitalEmployee {
  return {
    id: 'emp-workspace-organizer-default',
    name: '桌面与书签整理专员',
    role: '盘点书签与本地网站 · 提案逐条审批',
    description: '只读盘点桌面分区、大文件夹/小文件夹、嵌套层级、常用网站与浏览器书签；每一步在右侧点击确认后才生效，不自动修改。',
    accentColor: '#0ea5e9',
    enabled: false,
    source: {
      kind: 'workspace-organizer',
      folderId: '',
      folderTitle: '本地桌面网站 + 浏览器书签',
    },
    runtime: {
      analyzer: 'deepseek',
      piThinking: 'medium',
      decisionMode: 'llm-fast',
      jevEndpoint: '',
    },
    prompt: {
      systemPrompt: [
        '你是主人的「桌面网站与浏览器书签整理专员」。必须先分清三类核心对象：',
        '1. 桌面分区（Partition / launcherPages）：新标签页顶部的场景分页（最多 12 个字，如「默认」「AI 工具」「开发工作」）。',
        '2. 桌面文件夹（Folder）：建在指定分区下，也可嵌套在已有文件夹（parentFolderName）里。只有两档尺寸：',
        '   - large（大文件夹）：2x2 展示区（可直览最多 9 个网站小图标），放高频常用组；',
        '   - small（小文件夹）：1x1 紧凑图标（内含 2x2 缩略图标），可放在分区根层或嵌套在父文件夹内部。',
        '3. 浏览器原生书签（Chrome Bookmarks）：适合长尾资料、参考文章与归档链接；仅把每天高频直达的优质书签推荐提升到桌面分区（promote_bookmark_to_launcher），其余散落书签在书签栏文件夹里归类（create_bookmark_folder / move_bookmark）。',
        '所有操作先提交提案。优先利用已有文件夹；允许改名、移除目录层和合并目录，保留其中的网站、书签和子文件夹。',
      ].join('\n'),
      reportTemplate: '先说明整体规划思路，再输出有序 JSON 步骤供主人在右侧待办清单逐一点击确认。',
    },
    skills: ['bookmarks.read', 'launcher.read', 'organizer.plan'],
    customSkillInstructions: '',
    decisionGate: {
      worthQuestion: '哪些散落网站和书签需要归类到清晰的新分区、大文件夹或小文件夹？',
      minScore: 0.5,
      categories: ['桌面分区', '桌面文件夹与层级', '常用网站归类', '书签归档'],
      skipCategories: [],
      skipWithoutSubtitle: false,
      retryOnSkip: false,
    },
    schedulePolicy: {
      intervalMinutes: 1440,
      dailyLimit: 10,
      maxFetchItems: 40,
    },
    ownerFeedback: [],
    createdAt: now,
    updatedAt: now,
  };
}

const VALID_SKILL_IDS = new Set<EmployeeSkillId>([
  'bili.source',
  'bili.info',
  'bili.comments',
  'bili.subtitle',
  'jev.triage',
  'library.save',
  'notify.high_value',
  'bookmarks.read',
  'launcher.read',
  'organizer.plan',
]);

function clampNumber(value: unknown, min: number, max: number, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function cleanString(value: unknown, maxLen: number, fallback = ''): string {
  if (typeof value !== 'string') return fallback;
  return value.trim().slice(0, maxLen);
}

function cleanHttpUrl(value: unknown): string {
  const raw = cleanString(value, 300);
  if (!raw) return '';
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '';
    return parsed.toString();
  } catch {
    return '';
  }
}

export function normalizeEmployee(input: unknown, now = Date.now()): DigitalEmployee {
  if (!input || typeof input !== 'object') {
    throw new Error('员工配置格式无效。');
  }
  const raw = input as Record<string, any>;
  const defaults = raw.source?.kind === 'workspace-organizer' ? createDefaultOrganizerEmployee(now) : createDefaultBiliEmployee(now);
  const name = cleanString(raw.name, 48);
  if (!name) throw new Error('请输入员工名称。');

  const sourceRaw = (raw.source && typeof raw.source === 'object' ? raw.source : {}) as Record<string, any>;
  const sourceKind: EmployeeSourceKind =
    sourceRaw.kind === 'bili-fav' || sourceRaw.kind === 'bili-history' || sourceRaw.kind === 'workspace-organizer'
      ? sourceRaw.kind
      : 'bili-toview';

  const runtimeRaw = (raw.runtime && typeof raw.runtime === 'object' ? raw.runtime : {}) as Record<string, any>;
  const analyzer: EmployeeAnalyzer = runtimeRaw.analyzer === 'native-pi' ? 'native-pi' : 'deepseek';
  const decisionMode: EmployeeDecisionMode = runtimeRaw.decisionMode === 'jev-http' ? 'jev-http' : 'llm-fast';
  const jevEndpoint = cleanHttpUrl(runtimeRaw.jevEndpoint);

  const promptRaw = (raw.prompt && typeof raw.prompt === 'object' ? raw.prompt : {}) as Record<string, any>;
  const systemPrompt = cleanString(promptRaw.systemPrompt, 4000, defaults.prompt.systemPrompt);
  const reportTemplate = cleanString(promptRaw.reportTemplate, 2500, defaults.prompt.reportTemplate);

  const rawSkills = Array.isArray(raw.skills) ? raw.skills : defaults.skills;
  const skills = Array.from(new Set(rawSkills.filter((s: unknown): s is EmployeeSkillId => VALID_SKILL_IDS.has(s as EmployeeSkillId))));
  if (!skills.length) {
    if (sourceKind === 'workspace-organizer') skills.push(...defaults.skills);
    else skills.push('bili.source', 'bili.subtitle');
  }

  const gateRaw = (raw.decisionGate && typeof raw.decisionGate === 'object' ? raw.decisionGate : {}) as Record<string, any>;
  const categories = Array.isArray(gateRaw.categories)
    ? gateRaw.categories.map((c: unknown) => cleanString(c, 32)).filter(Boolean).slice(0, 12)
    : [];
  const finalCategories = categories.length ? Array.from(new Set(categories)) : [...defaults.decisionGate.categories];
  const skipCategories = Array.isArray(gateRaw.skipCategories)
    ? gateRaw.skipCategories.map((c: unknown) => cleanString(c, 32)).filter((c: string) => finalCategories.includes(c))
    : defaults.decisionGate.skipCategories.filter(c => finalCategories.includes(c));

  const policyRaw = (raw.schedulePolicy && typeof raw.schedulePolicy === 'object' ? raw.schedulePolicy : {}) as Record<string, any>;

  const feedbackRaw = Array.isArray(raw.ownerFeedback) ? raw.ownerFeedback : [];
  const ownerFeedback: EmployeeFeedbackExample[] = feedbackRaw
    .filter((f: any) => f && typeof f === 'object' && typeof f.title === 'string')
    .slice(0, 16)
    .map((f: any, idx: number) => ({
      id: cleanString(f.id, 64) || `fb-${now}-${idx}`,
      title: cleanString(f.title, 120),
      verdict: f.verdict === 'skip' ? 'skip' : 'keep',
      category: cleanString(f.category, 32) || finalCategories[0],
      note: cleanString(f.note, 200),
      createdAt: Number.isFinite(f.createdAt) ? f.createdAt : now,
    }));

  const id = cleanString(raw.id, 64) || `emp-${now}-${Math.random().toString(36).slice(2, 7)}`;

  return {
    id,
    name,
    role: cleanString(raw.role, 64, '后台智能助手'),
    description: cleanString(raw.description, 240),
    accentColor: /^#[0-9a-fA-F]{6}$/.test(String(raw.accentColor || '')) ? String(raw.accentColor) : '#6366f1',
    enabled: Boolean(raw.enabled),
    source: {
      kind: sourceKind,
      folderId: sourceKind === 'bili-fav' ? cleanString(sourceRaw.folderId, 64) : '',
      folderTitle: sourceKind === 'bili-fav'
        ? cleanString(sourceRaw.folderTitle, 64)
        : sourceKind === 'bili-history'
          ? '播放历史'
          : sourceKind === 'workspace-organizer'
            ? '本地桌面网站 + 浏览器书签'
            : '稍后再看',
    },
    runtime: {
      analyzer,
      piModel: cleanString(runtimeRaw.piModel, 120),
      piThinking: ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'].includes(runtimeRaw.piThinking)
        ? runtimeRaw.piThinking
        : 'medium',
      decisionMode,
      jevEndpoint,
    },
    prompt: {
      systemPrompt,
      reportTemplate,
    },
    skills,
    customSkillInstructions: cleanString(raw.customSkillInstructions, 4000),
    decisionGate: {
      worthQuestion: cleanString(gateRaw.worthQuestion, 400, defaults.decisionGate.worthQuestion),
      minScore: Math.round(clampNumber(gateRaw.minScore, 0, 1, defaults.decisionGate.minScore) * 100) / 100,
      categories: finalCategories,
      skipCategories,
      skipWithoutSubtitle: Boolean(gateRaw.skipWithoutSubtitle),
      retryOnSkip: gateRaw.retryOnSkip !== undefined ? Boolean(gateRaw.retryOnSkip) : true,
    },
    schedulePolicy: {
      intervalMinutes: Math.round(clampNumber(policyRaw.intervalMinutes, 5, 1440, 20)),
      dailyLimit: Math.round(clampNumber(policyRaw.dailyLimit, 1, 50, 8)),
      maxFetchItems: Math.round(clampNumber(policyRaw.maxFetchItems, 1, 40, 15)),
    },
    ownerFeedback,
    createdAt: Number.isFinite(raw.createdAt) ? raw.createdAt : now,
    updatedAt: now,
    lastRunAt: Number.isFinite(raw.lastRunAt) ? raw.lastRunAt : undefined,
    lastError: cleanString(raw.lastError, 240) || undefined,
    nextEligibleAt: Number.isFinite(raw.nextEligibleAt) ? raw.nextEligibleAt : undefined,
  };
}

/** Export a sanitized blueprint for sharing: strips personal folder IDs, owner memory, and runtime state. */
export function exportEmployeeBlueprint(
  employee: DigitalEmployee,
  options: { includeFeedbackExamples?: boolean; now?: number } = {}
): EmployeeSharePackage {
  return {
    format: EMPLOYEE_SHARE_FORMAT,
    exportedAt: options.now ?? Date.now(),
    blueprint: {
      name: employee.name,
      role: employee.role,
      description: employee.description,
      accentColor: employee.accentColor,
      source: {
        kind: employee.source.kind === 'workspace-organizer'
          ? 'workspace-organizer'
          : employee.source.kind === 'bili-history'
            ? 'bili-history'
            : 'bili-toview',
        folderId: '',
        folderTitle: employee.source.kind === 'workspace-organizer'
          ? '本地桌面网站 + 浏览器书签'
          : employee.source.kind === 'bili-history'
            ? '播放历史'
            : '稍后再看',
      },
      runtime: {
        analyzer: employee.runtime.analyzer,
        piModel: '',
        piThinking: employee.runtime.piThinking || 'medium',
        decisionMode: employee.runtime.decisionMode,
        jevEndpoint: '',
      },
      prompt: { ...employee.prompt },
      skills: [...employee.skills],
      customSkillInstructions: employee.customSkillInstructions,
      decisionGate: {
        ...employee.decisionGate,
        categories: [...employee.decisionGate.categories],
        skipCategories: [...employee.decisionGate.skipCategories],
      },
      schedulePolicy: { ...employee.schedulePolicy },
      ...(options.includeFeedbackExamples && employee.ownerFeedback.length
        ? { ownerFeedback: employee.ownerFeedback.slice(0, 6).map(item => ({ ...item })) }
        : {}),
    },
  };
}

export function parseEmployeeImport(rawText: string, now = Date.now()): DigitalEmployee {
  let parsed: any;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error('员工包文件不是有效的 JSON。');
  }
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('员工包内容格式无效。');
  }
  const sourceObj = parsed.format === EMPLOYEE_SHARE_FORMAT && parsed.blueprint ? parsed.blueprint : parsed;
  const normalized = normalizeEmployee(
    {
      ...sourceObj,
      id: `emp-${now}-${Math.random().toString(36).slice(2, 7)}`,
      enabled: false,
      lastRunAt: undefined,
      lastError: undefined,
      nextEligibleAt: undefined,
    },
    now
  );
  // Ensure imported package keeps empty private source folderId and enables safe manual inspection first.
  if (normalized.source.kind === 'bili-fav' && !normalized.source.folderId) {
    normalized.source.kind = 'bili-toview';
    normalized.source.folderTitle = '稍后再看';
  }
  return normalized;
}

export function safeEmployeesList(value: unknown): DigitalEmployee[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) throw new Error('数字员工配置格式异常，未覆盖原数据。');
  return value.slice(0, 40).map(item => normalizeEmployee(item, Number((item as any)?.updatedAt) || Date.now()));
}

export function safeRunLogs(value: unknown): EmployeeRunRecord[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) return [];
  return value
    .filter((item: any): item is EmployeeRunRecord => Boolean(item && typeof item.id === 'string' && typeof item.employeeId === 'string' && typeof item.bvid === 'string'))
    .slice(0, 120);
}

export function localDayKey(ts = Date.now()): string {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
