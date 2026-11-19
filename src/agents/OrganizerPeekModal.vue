<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  EMPLOYEE_LIVE_PEEK_KEY,
  type EmployeePeekSnapshot,
  type EmployeeRunRecord,
  type OrganizerFolderSize,
  type OrganizerPlanStep,
  type OrganizerWorkspaceSnapshot,
} from './employee-contract';
import { callEmployeeBackend } from './employee-client';
import { cleanHttpUrl, computeOrganizerPreview, refreshOrganizerStepTitles, resolveOrganizerParams, type PreviewPartitionView } from './workspace-organizer';
import { useWindowDraggable } from '../sdk/ui';
import LauncherTileContent from '../launchers/LauncherTileContent.vue';

declare const chrome: any;

const props = defineProps<{
  employeeId: string;
  employeeName: string;
  latestRun?: EmployeeRunRecord | null;
  running?: boolean;
  backendStale?: boolean;
  generationError?: string;
}>();

const emit = defineEmits<{
  close: [];
  runNow: [employeeId: string];
  updated: [];
  reloadExtension: [];
}>();

const liveSnapshot = ref<EmployeePeekSnapshot | null>(null);
const localRun = ref<EmployeeRunRecord | null>(null);
const activeRun = computed(() => (localRun.value?.id === props.latestRun?.id ? localRun.value : props.latestRun));
watch(
  () => props.latestRun,
  (next, previous) => {
    if (next?.id !== previous?.id) {
      localRun.value = null;
      editingStepId.value = '';
      hoveredStepId.value = undefined;
      batchConfirm.value = false;
    } else if (next && (next.organizerRevision || 0) >= (localRun.value?.organizerRevision || 0)) {
      localRun.value = next;
    }
  }
);

const previewMode = ref<'proposal' | 'actual' | 'step'>('proposal');
watch(
  () => props.employeeId,
  () => {
    liveSnapshot.value = null;
    hoveredStepId.value = undefined;
  }
);

const batchConfirm = ref(false);
const { panelRef, headerRef, initialStyle, onHeaderPointerDown } = useWindowDraggable({
  windowId: 'organizer-approval',
  managed: false,
  defaultWidth: 1140,
  defaultHeight: 740,
  minWidth: 360,
  minHeight: 320,
});

const stageRef = ref<HTMLElement | null>(null);
const gridWrapRef = ref<HTMLElement | null>(null);
const viewTab = ref<'desktop' | 'bookmarks'>('desktop');
const selectedPartitionId = ref('');
const openedFolderName = ref('');
const selectedBookmarkRootId = ref('');
const openedBookmarkFolderId = ref('');
const hoveredStepId = ref<string | undefined>(undefined);
const busyStepId = ref('');
const applyingAll = ref(false);
const stepNotice = ref('');
const stepError = ref('');
const editingStepId = ref('');
const editFolderName = ref('');
const editFolderSize = ref<OrganizerFolderSize>('small');

const cursorPos = ref<{ x: number; y: number; visible: boolean }>({ x: 110, y: 90, visible: false });
const pulseKey = ref(0);

let pollTimer: ReturnType<typeof setInterval> | null = null;

const isLiveGenerating = computed(() =>
  Boolean(props.running) || (!activeRun.value && Boolean(liveSnapshot.value?.active && liveSnapshot.value?.employeeId === props.employeeId))
);

const activeWorkspaceSnapshot = computed<OrganizerWorkspaceSnapshot | null>(() => {
  if (activeRun.value?.organizerSnapshot && !isLiveGenerating.value) return activeRun.value.organizerSnapshot;
  return liveSnapshot.value?.employeeId === props.employeeId ? liveSnapshot.value.organizerSnapshot || null : null;
});

const steps = computed<OrganizerPlanStep[]>(() => {
  if (isLiveGenerating.value) return liveSnapshot.value?.employeeId === props.employeeId ? liveSnapshot.value.organizerSteps || [] : [];
  if (activeRun.value) return activeRun.value.planSteps || [];
  return liveSnapshot.value?.organizerSteps || [];
});

const previewSteps = computed(() => {
  const copy: OrganizerPlanStep[] = JSON.parse(JSON.stringify(steps.value));
  const edited = copy.find(s => s.id === editingStepId.value);
  if (edited) {
    if (edited.type === 'create_partition') edited.params.partitionName = editFolderName.value;
    else edited.params.folderName = editFolderName.value;
    if (edited.type === 'create_launcher_folder') edited.params.folderSize = editFolderSize.value;
  }
  refreshOrganizerStepTitles(copy);
  return copy;
});

const preview = computed(() => {
  if (!activeWorkspaceSnapshot.value) return { partitions: [], bookmarkFolders: [], warnings: [] };
  return computeOrganizerPreview(
    activeWorkspaceSnapshot.value,
    previewSteps.value,
    previewMode.value === 'step' ? hoveredStepId.value : undefined,
    previewMode.value === 'actual' ? 'actual' : 'proposal'
  );
});

const actualPreview = computed(() => {
  if (!activeWorkspaceSnapshot.value) return { partitions: [], bookmarkFolders: [], warnings: [] };
  return computeOrganizerPreview(activeWorkspaceSnapshot.value, previewSteps.value, undefined, 'actual');
});

const uncertain = computed(() => steps.value.some(s => s.status === 'applying' || s.status === 'undoing'));

watch(
  () => preview.value.partitions,
  parts => {
    if (!parts.length) return;
    if (!selectedPartitionId.value || !parts.some(p => p.id === selectedPartitionId.value)) {
      selectedPartitionId.value = parts[0].id;
    }
  },
  { immediate: true }
);

const currentPartition = computed(() =>
  preview.value.partitions.find(p => p.id === selectedPartitionId.value) || preview.value.partitions[0] || null
);

watch(
  [() => selectedPartitionId.value, () => viewTab.value, () => previewMode.value],
  () => {
    if (openedFolderName.value && !currentPartition.value?.folders.some(f => f.name === openedFolderName.value)) {
      openedFolderName.value = '';
    }
  }
);

const rootFolders = computed(() =>
  (currentPartition.value?.folders || []).filter(f => !f.parent)
);

const openedFolder = computed(() =>
  openedFolderName.value
    ? currentPartition.value?.folders.find(f => f.name === openedFolderName.value) || null
    : null
);

const openedChildFolders = computed(() =>
  openedFolder.value
    ? (currentPartition.value?.folders || []).filter(f => f.parent === openedFolder.value?.name)
    : []
);

type PreviewFolder = PreviewPartitionView['folders'][number];
type PreviewBookmarkFolder = (typeof preview.value.bookmarkFolders)[number];

interface GridDisplayLink {
  id: string;
  title: string;
  url: string;
  badge?: 'moved' | 'promoted' | 'applied';
  pendingTargetFolder?: string;
  pendingRootFolder?: string;
  pendingRootFolderId?: string;
  stepId?: string;
}

function findRootDesktopFolderName(folderName: string): string {
  const folders = currentPartition.value?.folders || [];
  let cur = folders.find(f => f.name === folderName);
  const seen = new Set<string>();
  while (cur?.parent && !seen.has(cur.name)) {
    seen.add(cur.name);
    const parent = folders.find(f => f.name === cur!.parent);
    if (!parent) break;
    cur = parent;
  }
  return cur?.name || folderName;
}

const desktopRootLinks = computed<GridDisplayLink[]>(() => {
  const part = currentPartition.value;
  if (!part) return [];
  const actualPart = actualPreview.value.partitions.find(p => p.id === part.id);
  const folderNames = new Set(part.folders.map(f => f.name));
  const pendingByLinkId = new Map<string, { targetFolder: string; rootFolder: string; stepId: string }>();

  for (const step of previewSteps.value) {
    if (!['pending', 'error'].includes(step.status)) continue;
    let p = step.params;
    try { p = resolveOrganizerParams(step, previewSteps.value); } catch { continue; }
    if ((step.type === 'move_quick_link' || step.type === 'promote_bookmark_to_launcher') &&
        p.targetFolder && folderNames.has(p.targetFolder)) {
      const linkId = step.type === 'move_quick_link' ? p.linkId : `preview:${step.id}`;
      if (linkId) {
        pendingByLinkId.set(linkId, {
          targetFolder: p.targetFolder,
          rootFolder: findRootDesktopFolderName(p.targetFolder),
          stepId: step.id,
        });
      }
    }
  }

  const out: GridDisplayLink[] = [];
  const seen = new Set<string>();

  for (const link of actualPart?.looseLinks || []) {
    const pending = pendingByLinkId.get(link.id);
    if (pending) {
      out.push({
        ...link,
        badge: 'moved',
        pendingTargetFolder: pending.targetFolder,
        pendingRootFolder: pending.rootFolder,
        stepId: pending.stepId,
      });
      seen.add(link.id);
    } else {
      const inProposal = part.looseLinks.find(l => l.id === link.id);
      if (inProposal) {
        out.push({ ...inProposal });
        seen.add(link.id);
      }
    }
  }

  for (const link of part.looseLinks) {
    if (seen.has(link.id)) continue;
    out.push({ ...link });
    seen.add(link.id);
  }

  for (const folder of part.folders) {
    for (const link of folder.links) {
      if (seen.has(link.id)) continue;
      const pending = pendingByLinkId.get(link.id);
      if (pending) {
        out.push({
          ...link,
          pendingTargetFolder: pending.targetFolder,
          pendingRootFolder: pending.rootFolder,
          stepId: pending.stepId,
        });
        seen.add(link.id);
      }
    }
  }

  return out;
});

function buildFolderTileData(folder: PreviewFolder) {
  const childFolders = (currentPartition.value?.folders || []).filter(f => f.parent === folder.name);
  const previewLinks = [...folder.links];
  for (const child of childFolders) {
    for (const l of child.links) {
      if (previewLinks.length >= 9) break;
      previewLinks.push(l);
    }
  }
  return {
    title: folder.name,
    preview: previewLinks.slice(0, 9),
    count: folder.links.length + childFolders.length,
  };
}

function selectPartition(partitionId: string) {
  selectedPartitionId.value = partitionId;
  openedFolderName.value = '';
}

function toggleDesktopFolder(folderName: string) {
  openedFolderName.value = openedFolderName.value === folderName ? '' : folderName;
}

const bookmarkRoots = computed(() => {
  const all = preview.value.bookmarkFolders;
  const ids = new Set(all.map(f => f.id));
  const roots = all.filter(f => !f.parentId || f.parentId === '0' || !ids.has(f.parentId));
  return roots.length ? roots : all.slice(0, 1);
});

watch(
  bookmarkRoots,
  roots => {
    if (!roots.length) return;
    if (!selectedBookmarkRootId.value || !roots.some(r => r.id === selectedBookmarkRootId.value)) {
      selectedBookmarkRootId.value = roots[0].id;
    }
  },
  { immediate: true }
);

const currentBookmarkRoot = computed(() =>
  bookmarkRoots.value.find(r => r.id === selectedBookmarkRootId.value) || bookmarkRoots.value[0] || null
);

watch(
  [() => selectedBookmarkRootId.value, () => viewTab.value],
  () => {
    if (openedBookmarkFolderId.value && !preview.value.bookmarkFolders.some(f => f.id === openedBookmarkFolderId.value)) {
      openedBookmarkFolderId.value = '';
    }
  }
);

const bookmarkRootFolders = computed(() => {
  const root = currentBookmarkRoot.value;
  if (!root) return [];
  return preview.value.bookmarkFolders.filter(f => f.parentId === root.id);
});

function findBookmarkRootChildId(folderIdOrTitle: string, rootId: string): string {
  const all = preview.value.bookmarkFolders;
  let cur = all.find(f => f.id === folderIdOrTitle || f.title === folderIdOrTitle);
  const seen = new Set<string>();
  while (cur && cur.parentId && cur.parentId !== rootId && !seen.has(cur.id)) {
    seen.add(cur.id);
    const parent = all.find(f => f.id === cur!.parentId);
    if (!parent) break;
    cur = parent;
  }
  return cur && cur.parentId === rootId ? cur.id : '';
}

function findOwningBookmarkRootId(folderIdOrTitle: string): string {
  const all = preview.value.bookmarkFolders;
  const rootIds = new Set(bookmarkRoots.value.map(r => r.id));
  let cur = all.find(f => f.id === folderIdOrTitle || f.title === folderIdOrTitle);
  const seen = new Set<string>();
  while (cur && !rootIds.has(cur.id) && cur.parentId && !seen.has(cur.id)) {
    seen.add(cur.id);
    cur = all.find(f => f.id === cur!.parentId);
  }
  return cur && rootIds.has(cur.id) ? cur.id : '';
}

const bookmarkRootLinks = computed<GridDisplayLink[]>(() => {
  const root = currentBookmarkRoot.value;
  if (!root) return [];
  const all = preview.value.bookmarkFolders;
  const actualRoot = actualPreview.value.bookmarkFolders.find(f => f.id === root.id);
  const pendingByBmId = new Map<string, { targetFolderTitle: string; rootFolderId: string; stepId: string }>();

  for (const step of previewSteps.value) {
    if (step.type !== 'move_bookmark' || !['pending', 'error'].includes(step.status)) continue;
    let p = step.params;
    try { p = resolveOrganizerParams(step, previewSteps.value); } catch { continue; }
    if (!p.bookmarkId || !p.targetFolder) continue;
    const targetFolder = all.find(f => f.id === p.targetFolder || f.title === p.targetFolder);
    if (!targetFolder) continue;
    const rootChildId = findBookmarkRootChildId(targetFolder.id, root.id);
    if (rootChildId) {
      pendingByBmId.set(p.bookmarkId, {
        targetFolderTitle: targetFolder.title,
        rootFolderId: rootChildId,
        stepId: step.id,
      });
    }
  }

  const out: GridDisplayLink[] = [];
  const seen = new Set<string>();

  for (const bm of actualRoot?.items || []) {
    const pending = pendingByBmId.get(bm.id);
    if (pending) {
      out.push({
        id: bm.id,
        title: bm.title,
        url: bm.url,
        badge: 'moved',
        pendingTargetFolder: pending.targetFolderTitle,
        pendingRootFolderId: pending.rootFolderId,
        stepId: pending.stepId,
      });
      seen.add(bm.id);
    } else {
      const inProposal = root.items.find(i => i.id === bm.id);
      if (inProposal) {
        out.push({ id: inProposal.id, title: inProposal.title, url: inProposal.url, badge: inProposal.badge });
        seen.add(bm.id);
      }
    }
  }

  for (const bm of root.items) {
    if (seen.has(bm.id)) continue;
    out.push({ id: bm.id, title: bm.title, url: bm.url, badge: bm.badge });
    seen.add(bm.id);
  }

  for (const folder of all) {
    for (const bm of folder.items) {
      if (seen.has(bm.id)) continue;
      const pending = pendingByBmId.get(bm.id);
      if (pending) {
        out.push({
          id: bm.id,
          title: bm.title,
          url: bm.url,
          badge: 'moved',
          pendingTargetFolder: pending.targetFolderTitle,
          pendingRootFolderId: pending.rootFolderId,
          stepId: pending.stepId,
        });
        seen.add(bm.id);
      }
    }
  }

  return out;
});

function buildBookmarkFolderTileData(folder: PreviewBookmarkFolder) {
  const all = preview.value.bookmarkFolders;
  const childFolders = all.filter(f => f.parentId === folder.id);
  const previewLinks = [...folder.items];
  for (const child of childFolders) {
    for (const item of child.items) {
      if (previewLinks.length >= 9) break;
      previewLinks.push(item);
    }
  }
  return {
    title: folder.title,
    preview: previewLinks.slice(0, 9),
    count: folder.items.length + childFolders.length,
  };
}

const openedBookmarkFolder = computed(() =>
  openedBookmarkFolderId.value
    ? preview.value.bookmarkFolders.find(f => f.id === openedBookmarkFolderId.value) || null
    : null
);

const openedBookmarkChildFolders = computed(() =>
  openedBookmarkFolder.value
    ? preview.value.bookmarkFolders.filter(f => f.parentId === openedBookmarkFolder.value?.id)
    : []
);

function selectBookmarkRoot(rootId: string) {
  selectedBookmarkRootId.value = rootId;
  openedBookmarkFolderId.value = '';
}

function toggleBookmarkFolder(folderId: string) {
  openedBookmarkFolderId.value = openedBookmarkFolderId.value === folderId ? '' : folderId;
}

function goUpBookmarkFolder() {
  const parentId = openedBookmarkFolder.value?.parentId;
  if (!parentId || parentId === currentBookmarkRoot.value?.id || parentId === '0') {
    openedBookmarkFolderId.value = '';
  } else {
    openedBookmarkFolderId.value = parentId;
  }
}

function linkBadgeText(badge?: 'moved' | 'promoted' | 'applied'): string {
  if (badge === 'applied') return '✓';
  if (badge === 'promoted') return '上屏';
  if (badge === 'moved') return '移入';
  return '';
}

interface FlowConnectorLine {
  id: string;
  path: string;
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  focused: boolean;
}

const connectorLines = ref<FlowConnectorLine[]>([]);

function buildConnectorGeometry(
  id: string,
  fromEl: HTMLElement,
  toEl: HTMLElement,
  wrapRect: DOMRect,
  focused: boolean
): FlowConnectorLine | null {
  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();
  if (fromRect.width <= 0 || toRect.width <= 0) return null;
  const x1 = fromRect.left - wrapRect.left + fromRect.width * 0.5;
  const y1 = fromRect.top - wrapRect.top + Math.min(fromRect.height * 0.36, 30);
  const x2 = toRect.left - wrapRect.left + toRect.width * 0.5;
  const y2 = toRect.top - wrapRect.top + Math.min(toRect.height * 0.38, toEl.classList.contains('size-large') ? 68 : 30);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  if (dist < 10) return null;

  const mx = (x1 + x2) * 0.5;
  const arc = Math.max(18, Math.min(46, dist * 0.22));
  const cx = mx + (dy > 20 ? -12 : dy < -20 ? 12 : 0);
  const cy = Math.max(6, Math.min(y1, y2) - arc);

  const sdx = cx - x1;
  const sdy = cy - y1;
  const sLen = Math.hypot(sdx, sdy) || 1;
  const startPad = Math.min(18, dist * 0.22);
  const sx = x1 + (sdx / sLen) * startPad;
  const sy = y1 + (sdy / sLen) * startPad;

  const edx = x2 - cx;
  const edy = y2 - cy;
  const eLen = Math.hypot(edx, edy) || 1;
  const isLarge = toEl.classList.contains('size-large');
  const endPad = Math.min(isLarge ? 42 : 25, dist * 0.32);
  const ex = x2 - (edx / eLen) * endPad;
  const ey = y2 - (edy / eLen) * endPad;

  return {
    id,
    path: `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
    sx: Number(sx.toFixed(1)),
    sy: Number(sy.toFixed(1)),
    ex: Number(ex.toFixed(1)),
    ey: Number(ey.toFixed(1)),
    focused,
  };
}

function updateConnectorLines() {
  const wrap = gridWrapRef.value;
  if (!wrap) {
    connectorLines.value = [];
    return;
  }
  const wrapRect = wrap.getBoundingClientRect();
  if (wrapRect.width <= 0 || wrapRect.height <= 0) {
    connectorLines.value = [];
    return;
  }
  const lines: FlowConnectorLine[] = [];
  if (viewTab.value === 'desktop') {
    for (const link of desktopRootLinks.value) {
      if (!link.pendingRootFolder) continue;
      const fromEl = Array.from(wrap.querySelectorAll<HTMLElement>('[data-peek-link]'))
        .find(el => el.dataset.peekLink === link.id);
      const toEl = Array.from(wrap.querySelectorAll<HTMLElement>('[data-peek-folder]'))
        .find(el => el.dataset.peekFolder === link.pendingRootFolder);
      if (!fromEl || !toEl) continue;
      const focused = Boolean(hoveredStepId.value && hoveredStepId.value === link.stepId)
        || isLinkFocused(link.id, link.url)
        || isFolderFocused(link.pendingTargetFolder || link.pendingRootFolder);
      const line = buildConnectorGeometry(`desk:${link.id}->${link.pendingRootFolder}`, fromEl, toEl, wrapRect, focused);
      if (line) lines.push(line);
    }
  } else {
    for (const bm of bookmarkRootLinks.value) {
      if (!bm.pendingRootFolderId) continue;
      const fromEl = Array.from(wrap.querySelectorAll<HTMLElement>('[data-peek-bm-item]'))
        .find(el => el.dataset.peekBmItem === bm.id);
      const toEl = Array.from(wrap.querySelectorAll<HTMLElement>('[data-peek-bm-id]'))
        .find(el => el.dataset.peekBmId === bm.pendingRootFolderId);
      if (!fromEl || !toEl) continue;
      const focused = Boolean(hoveredStepId.value && hoveredStepId.value === bm.stepId)
        || hoveredResolvedParams.value?.bookmarkId === bm.id;
      const line = buildConnectorGeometry(`bm:${bm.id}->${bm.pendingRootFolderId}`, fromEl, toEl, wrapRect, focused);
      if (line) lines.push(line);
    }
  }
  connectorLines.value = lines;
}

const pendingCount = computed(() => steps.value.filter(s => s.status === 'pending' || s.status === 'error').length);
const appliedCount = computed(() => steps.value.filter(s => s.status === 'applied').length);

const liveTimeline = computed<string[]>(() => {
  if (liveSnapshot.value?.employeeId === props.employeeId && liveSnapshot.value?.timelineSteps?.length) {
    return liveSnapshot.value.timelineSteps;
  }
  return [];
});

const hoveredStep = computed<OrganizerPlanStep | null>(() => {
  if (!hoveredStepId.value) return null;
  return previewSteps.value.find(s => s.id === hoveredStepId.value) || null;
});

const cursorTooltip = computed(() => {
  if (isLiveGenerating.value && liveSnapshot.value?.cursorLabel) {
    return liveSnapshot.value.cursorLabel;
  }
  if (hoveredStep.value) {
    return hoveredStep.value.title;
  }
  return '';
});

function actionTypeLabel(step: OrganizerPlanStep): string {
  switch (step.type) {
    case 'create_partition':
      return '新建分区';
    case 'create_launcher_folder':
      return step.params.folderSize === 'large' ? '大文件夹' : '小文件夹';
    case 'move_quick_link':
      return '网站归类';
    case 'promote_bookmark_to_launcher':
      return '书签上桌面';
    case 'create_bookmark_folder':
      return '书签目录';
    case 'move_bookmark':
      return '书签归档';
    case 'rename_folder':
    case 'rename_link':
      return '改名';
    case 'remove_folder':
      return '移除文件夹';
    case 'merge_folders':
      return '合并文件夹';
  }
}

const hoveredResolvedParams = computed<Record<string, string> | null>(() => {
  if (!hoveredStep.value) return null;
  try {
    return resolveOrganizerParams(hoveredStep.value, previewSteps.value);
  } catch {
    return hoveredStep.value.params;
  }
});

function isFolderFocused(folderName: string): boolean {
  const p = hoveredResolvedParams.value;
  if (!p) return false;
  return p.folderName === folderName || p.targetFolder === folderName || p.parentFolderName === folderName;
}

function isLinkFocused(linkId: string, linkUrl?: string): boolean {
  const p = hoveredResolvedParams.value;
  if (!p) return false;
  return (Boolean(p.linkId) && p.linkId === linkId) || (Boolean(p.bookmarkUrl) && p.bookmarkUrl === linkUrl);
}

function isBookmarkFolderFocused(folderId: string, folderTitle: string): boolean {
  const p = hoveredResolvedParams.value;
  if (!p) return false;
  return p.targetFolder === folderId || p.targetFolder === folderTitle || p.folderName === folderTitle || p.parentBookmarkId === folderId;
}

function isBookmarkItemFocused(bookmarkId: string): boolean {
  const p = hoveredResolvedParams.value;
  if (!p) return false;
  return Boolean(p.bookmarkId) && p.bookmarkId === bookmarkId;
}

function resolveStageTargetElement(): HTMLElement | null {
  const stage = stageRef.value;
  if (!stage) return null;

  if (!isLiveGenerating.value && hoveredStep.value) {
    const step = hoveredStep.value;
    const params = hoveredResolvedParams.value || step.params;

    if (step.type === 'create_bookmark_folder' || step.type === 'move_bookmark' || params.scope === 'bookmarks') {
      const folderRef = params.targetFolder || params.sourceFolder || params.folderName;
      if (folderRef) {
        const bmMatch = Array.from(stage.querySelectorAll<HTMLElement>('[data-peek-bm-folder]'))
          .find(el => el.dataset.peekBmFolder === folderRef || el.dataset.peekBmId === folderRef);
        if (bmMatch) return bmMatch;
      }
      if (params.bookmarkId) {
        const bmItemMatch = Array.from(stage.querySelectorAll<HTMLElement>('[data-peek-bm-item]'))
          .find(el => el.dataset.peekBmItem === params.bookmarkId);
        if (bmItemMatch) return bmItemMatch;
      }
      return stage.querySelector<HTMLElement>('[data-peek-target="org-bookmarks"]');
    }

    if (step.type === 'create_partition') {
      const pName = params.partitionName;
      if (pName) {
        const partMatch = Array.from(stage.querySelectorAll<HTMLElement>('[data-peek-part]'))
          .find(el => el.dataset.peekPart === pName || el.dataset.peekPartLabel === pName);
        if (partMatch) return partMatch;
      }
      return stage.querySelector<HTMLElement>('[data-peek-target="org-partitions"]');
    }

    const folderName = params.targetFolder || params.folderName;
    if (folderName) {
      const folderEl = Array.from(stage.querySelectorAll<HTMLElement>('[data-peek-folder]'))
        .find(el => el.dataset.peekFolder === folderName);
      if (folderEl) return folderEl;
      const parentName = params.parentFolderName
        || currentPartition.value?.folders.find(f => f.name === folderName)?.parent;
      if (parentName) {
        const parentEl = Array.from(stage.querySelectorAll<HTMLElement>('[data-peek-folder]'))
          .find(el => el.dataset.peekFolder === parentName);
        if (parentEl) return parentEl;
      }
    }

    const linkRef = params.linkId || params.bookmarkUrl;
    if (linkRef) {
      const linkEl = Array.from(stage.querySelectorAll<HTMLElement>('[data-peek-link]'))
        .find(el => el.dataset.peekLink === linkRef);
      if (linkEl) return linkEl;
    }

    return stage.querySelector<HTMLElement>('[data-peek-target="org-folders"]');
  }

  const targetKey = liveSnapshot.value?.cursorTarget;
  if (targetKey && targetKey !== 'org-approval') {
    return stage.querySelector<HTMLElement>(`[data-peek-target="${targetKey}"]`);
  }
  return stage.querySelector<HTMLElement>('[data-peek-target="org-folders"]')
    || stage.querySelector<HTMLElement>('[data-peek-target="org-partitions"]');
}

async function updateCursorPosition() {
  await nextTick();
  updateConnectorLines();
  const stage = stageRef.value;
  if (!stage || (!activeWorkspaceSnapshot.value && !isLiveGenerating.value)) {
    cursorPos.value.visible = false;
    return;
  }
  const stageRect = stage.getBoundingClientRect();
  if (stageRect.width <= 0 || stageRect.height <= 0) return;

  const target = resolveStageTargetElement();
  if (!target) {
    cursorPos.value = {
      x: Math.round(stageRect.width * 0.42),
      y: Math.round(stageRect.height * 0.36),
      visible: Boolean(cursorTooltip.value),
    };
    return;
  }
  const rect = target.getBoundingClientRect();
  const x = Math.max(18, Math.min(stageRect.width - 170, rect.left - stageRect.left + Math.min(rect.width * 0.48, 72)));
  const y = Math.max(46, Math.min(stageRect.height - 42, rect.top - stageRect.top + Math.min(rect.height * 0.52, 42)));
  cursorPos.value = { x: Math.round(x), y: Math.round(y), visible: true };
  pulseKey.value++;
}

watch(
  [
    currentPartition,
    currentBookmarkRoot,
    openedFolderName,
    openedBookmarkFolderId,
    viewTab,
    hoveredStepId,
    previewSteps,
    isLiveGenerating,
    () => liveSnapshot.value?.cursorTarget,
    () => liveSnapshot.value?.cursorLabel,
  ],
  () => {
    void updateCursorPosition();
  },
  { immediate: true }
);

function focusStepPreview(step: OrganizerPlanStep) {
  hoveredStepId.value = step.id;
  let params = step.params;
  try {
    params = resolveOrganizerParams(step, previewSteps.value);
  } catch { /* Blocked dependencies remain visible in the checklist. */ }

  if (step.type === 'create_bookmark_folder' || step.type === 'move_bookmark' || params.scope === 'bookmarks') {
    viewTab.value = 'bookmarks';
    const folderRef = params.targetFolder || params.sourceFolder || params.folderName || params.parentBookmarkId || activeWorkspaceSnapshot.value?.bookmarks.find(b => b.id === params.bookmarkId)?.parentId;
    if (folderRef) {
      const rootId = findOwningBookmarkRootId(folderRef);
      if (rootId && selectedBookmarkRootId.value !== rootId) {
        selectBookmarkRoot(rootId);
      }
    }
    return;
  }
  viewTab.value = 'desktop';
  const targetPart = params.partitionName || params.targetPartition || activeWorkspaceSnapshot.value?.folders.find(f => f.name === (params.targetFolder || params.sourceFolder))?.page || activeWorkspaceSnapshot.value?.links.find(l => l.id === params.linkId)?.page;
  if (targetPart) {
    const matched = preview.value.partitions.find(
      p => p.id === targetPart || p.label.toLowerCase() === targetPart.toLowerCase()
    );
    if (matched && selectedPartitionId.value !== matched.id) selectPartition(matched.id);
  }
}

function startEditStep(step: OrganizerPlanStep) {
  if (!['pending', 'error'].includes(step.status)) return;
  if (editingStepId.value === step.id) {
    editingStepId.value = '';
    return;
  }
  editingStepId.value = step.id;
  editFolderName.value = step.params.folderName || step.params.partitionName || '';
  editFolderSize.value = step.params.folderSize === 'large' ? 'large' : 'small';
}

async function applyStep(step: OrganizerPlanStep) {
  if (!activeRun.value?.id || busyStepId.value || applyingAll.value || isLiveGenerating.value || !['pending', 'error'].includes(step.status)) return;
  busyStepId.value = step.id;
  stepError.value = '';
  stepNotice.value = '';
  try {
    const patch =
      editingStepId.value === step.id
        ? {
            ...(step.type === 'create_partition' ? { partitionName: editFolderName.value } : {}),
            ...(step.type === 'create_launcher_folder' || step.type === 'create_bookmark_folder'
              ? { folderName: editFolderName.value }
              : {}),
            ...(step.type === 'create_launcher_folder' ? { folderSize: editFolderSize.value } : {}),
          }
        : undefined;

    const res = await callEmployeeBackend<{ note?: string; run: EmployeeRunRecord }>(
      typeof chrome === 'undefined' ? null : chrome.runtime,
      'apply-plan-step',
      {
        runId: activeRun.value.id,
        stepId: step.id,
        ...(patch ? { patch } : {}),
      }
    );
    localRun.value = res.run;
    editingStepId.value = '';
    stepNotice.value = res?.note || `已生效：${step.title}`;
    emit('updated');
  } catch (err) {
    stepError.value = err instanceof Error ? err.message : '执行步骤失败。';
    await refreshAfterFailure();
  } finally {
    busyStepId.value = '';
  }
}

async function toggleSkipStep(step: OrganizerPlanStep) {
  if (!activeRun.value?.id || busyStepId.value || applyingAll.value || isLiveGenerating.value || !['pending', 'error', 'skipped'].includes(step.status)) return;
  busyStepId.value = step.id;
  stepError.value = '';
  try {
    const res = await callEmployeeBackend<{ run: EmployeeRunRecord; note: string }>(
      typeof chrome === 'undefined' ? null : chrome.runtime,
      'skip-plan-step',
      { runId: activeRun.value.id, stepId: step.id }
    );
    localRun.value = res.run;
    if (editingStepId.value === step.id) editingStepId.value = '';
    stepNotice.value = res.note;
    emit('updated');
  } catch (err) {
    stepError.value = err instanceof Error ? err.message : '更新状态失败。';
  } finally {
    busyStepId.value = '';
  }
}

async function applyAllRemaining() {
  if (!activeRun.value?.id || applyingAll.value || busyStepId.value || isLiveGenerating.value || uncertain.value || editingStepId.value) return;
  if (!batchConfirm.value) {
    batchConfirm.value = true;
    return;
  }
  batchConfirm.value = false;
  const runId = activeRun.value.id;
  const remaining = steps.value.filter(s => s.status === 'pending' || s.status === 'error');
  if (!remaining.length) return;
  applyingAll.value = true;
  stepError.value = '';
  stepNotice.value = '';
  let applied = 0;
  try {
    for (const step of remaining) {
      busyStepId.value = step.id;
      focusStepPreview(step);
      try {
        const res = await callEmployeeBackend<{ run: EmployeeRunRecord }>(
          typeof chrome === 'undefined' ? null : chrome.runtime,
          'apply-plan-step',
          { runId, stepId: step.id }
        );
        localRun.value = res.run;
        applied++;
      } catch (err) {
        stepError.value = `已生效 ${applied} 步，第 #${step.order} 步停止：${err instanceof Error ? err.message : '失败'}`;
        await refreshAfterFailure();
        break;
      }
    }
    emit('updated');
    if (applied > 0 && !stepError.value) {
      stepNotice.value = `已依次生效全部 ${applied} 步，新标签页与书签已同步更新！`;
    }
  } finally {
    busyStepId.value = '';
    applyingAll.value = false;
  }
}

async function refreshAfterFailure() {
  try {
    const list = await callEmployeeBackend<{ runs: EmployeeRunRecord[] }>(chrome.runtime, 'list', {});
    const run = list.runs.find(r => r.id === activeRun.value?.id);
    if (run) localRun.value = run;
  } catch { /* Original failure remains visible. */ }
  emit('updated');
}

async function undoStep(step: OrganizerPlanStep) {
  if (!activeRun.value || busyStepId.value || applyingAll.value || isLiveGenerating.value) return;
  busyStepId.value = step.id;
  stepError.value = '';
  try {
    const res = await callEmployeeBackend<{ run: EmployeeRunRecord; note: string }>(
      chrome.runtime,
      'undo-plan-step',
      { runId: activeRun.value.id, stepId: step.id }
    );
    localRun.value = res.run;
    stepNotice.value = res.note;
    emit('updated');
  } catch (err) {
    stepError.value = err instanceof Error ? err.message : '撤销失败。';
    await refreshAfterFailure();
  } finally {
    busyStepId.value = '';
  }
}

function onOutsidePointer(event: PointerEvent) {
  if (panelRef.value && !event.composedPath().includes(panelRef.value) && !busyStepId.value && !applyingAll.value) emit('close');
}
function onEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && !busyStepId.value && !applyingAll.value) emit('close');
}
async function loadLivePeek() {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return;
  try {
    const res = await chrome.storage.local.get(EMPLOYEE_LIVE_PEEK_KEY);
    const snap = res?.[EMPLOYEE_LIVE_PEEK_KEY] as EmployeePeekSnapshot | undefined;
    if (snap && snap.employeeId === props.employeeId && snap.mode === 'organizer') {
      liveSnapshot.value = snap;
    }
  } catch {}
}

function onStorageChanged(changes: Record<string, { newValue?: any }>, area: string) {
  if (area === 'local' && changes[EMPLOYEE_LIVE_PEEK_KEY]?.newValue) {
    const snap = changes[EMPLOYEE_LIVE_PEEK_KEY].newValue as EmployeePeekSnapshot;
    if (snap.employeeId === props.employeeId && snap.mode === 'organizer') {
      liveSnapshot.value = snap;
    }
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onOutsidePointer);
  document.addEventListener('keydown', onEscape);
  window.addEventListener('resize', updateConnectorLines);
  void loadLivePeek();
  if (typeof chrome !== 'undefined' && chrome.storage?.onChanged) {
    chrome.storage.onChanged.addListener(onStorageChanged);
  }
  pollTimer = setInterval(() => {
    if (props.running && !document.hidden) void loadLivePeek();
  }, 450);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onOutsidePointer);
  document.removeEventListener('keydown', onEscape);
  window.removeEventListener('resize', updateConnectorLines);
  if (typeof chrome !== 'undefined' && chrome.storage?.onChanged) {
    chrome.storage.onChanged.removeListener(onStorageChanged);
  }
  if (pollTimer) clearInterval(pollTimer);
});
</script>

<template>
  <Teleport to="body">
    <section ref="panelRef" class="org-modal" :style="initialStyle" role="dialog" aria-modal="false" :aria-label="`${employeeName} 预览与审批`">
      <header ref="headerRef" class="org-head" @pointerdown="onHeaderPointerDown">
        <div class="org-head-left">
          <span class="org-dot" :class="{ live: isLiveGenerating }" />
          <div>
            <strong>{{ employeeName }} · 整理窥屏与逐条审批</strong>
            <small v-if="activeRun?.planSummary">{{ activeRun.planSummary }}</small>
            <small v-else>只读生成建议：左侧实时预演整理效果，右侧每点击 1 步才真正写入那 1 步。</small>
          </div>
        </div>
        <div class="org-head-actions">
          <button
            v-if="backendStale"
            type="button"
            class="org-btn warn"
            @click="emit('reloadExtension')"
          >
            🔄 热重载扩展
          </button>
          <button
            type="button"
            class="org-btn primary"
            :disabled="isLiveGenerating || Boolean(busyStepId) || applyingAll"
            @click="emit('runNow', employeeId)"
          >
            {{ isLiveGenerating ? '盘点规划中…' : '↻ 重新盘点提案' }}
          </button>
          <button type="button" class="org-btn subtle" :disabled="Boolean(busyStepId) || applyingAll" aria-label="关闭审批窗" @click="emit('close')">✕</button>
        </div>
      </header>

      <div class="org-body">
        <!-- 左侧：真实桌面网格预演 + 动态 AI 鼠标光标 -->
        <div ref="stageRef" class="org-stage">
          <div class="org-stage-bar">
            <div class="org-view-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                data-peek-target="org-partitions"
                :aria-selected="viewTab === 'desktop'"
                :class="{ active: viewTab === 'desktop' }"
                @click="viewTab = 'desktop'"
              >
                🖥️ 新标签页桌面
              </button>
              <button
                type="button"
                role="tab"
                data-peek-target="org-bookmarks"
                :aria-selected="viewTab === 'bookmarks'"
                :class="{ active: viewTab === 'bookmarks' }"
                @click="viewTab = 'bookmarks'"
              >
                🔖 浏览器书签树
              </button>
            </div>

            <span class="org-flow-hint" :data-mode="previewMode === 'step' ? 'step' : 'flow'">
              <i class="hint-dash" aria-hidden="true"></i>
              <span>虚线指向待归入文件夹 · 点击文件夹可在下方展开</span>
            </span>
          </div>

          <div class="stage-scroll" @scroll="void updateCursorPosition()">
            <p v-for="warning in preview.warnings" :key="warning" class="step-toast err">{{ warning }}</p>

            <div v-if="!activeWorkspaceSnapshot" class="org-stage-empty">
              <div class="empty-icon">🧭</div>
              <h4>准备就绪 · 点击右上角开始盘点</h4>
              <p>专员会只读读取你的桌面分区、大/小文件夹、常用网站与浏览器书签树，并在右侧生成类似 Todoist 的待审批列表。</p>
              <button
                type="button"
                class="org-btn primary"
                :disabled="isLiveGenerating"
                @click="emit('runNow', employeeId)"
              >
                {{ isLiveGenerating ? '盘点中…' : '▶ 开始生成整理提案' }}
              </button>
            </div>

            <!-- 桌面视图：分区胶囊 + 文件夹/网站桌面图标网格 + 虚线归入动画 + 底部展开文件夹卡片 -->
            <div v-else-if="viewTab === 'desktop'" class="org-desktop-preview" data-peek-target="org-folders">
              <div class="part-tabs">
                <button
                  v-for="part in preview.partitions"
                  :key="part.id"
                  type="button"
                  class="part-tab"
                  :data-peek-part="part.id"
                  :data-peek-part-label="part.label"
                  :class="{ active: currentPartition?.id === part.id, isNew: part.badge === 'new', isApplied: part.badge === 'applied' }"
                  @click="selectPartition(part.id)"
                >
                  <span>{{ part.label }}</span>
                  <em v-if="part.badge === 'new'">+待建</em>
                  <em v-else-if="part.badge === 'applied'">✓已生效</em>
                </button>
              </div>

              <div v-if="currentPartition" class="part-canvas" data-peek-target="org-links">
                <div ref="gridWrapRef" class="grid-stage-wrap">
                  <div
                    v-if="rootFolders.length || desktopRootLinks.length"
                    class="launcher-items launcher-site-items org-preview-grid"
                  >
                    <div
                      v-for="folder in rootFolders"
                      :key="folder.name"
                      class="launcher-folder"
                      :class="[
                        `size-${folder.size}`,
                        folder.badge ? `peek-${folder.badge}` : '',
                        isFolderFocused(folder.name) ? 'peek-focus' : '',
                        openedFolderName === folder.name ? 'is-open' : '',
                      ]"
                      :data-peek-folder="folder.name"
                      :title="`${folder.name}（${folder.size === 'large' ? '大文件夹' : '小文件夹'}，点击在下方展开）`"
                      role="button"
                      tabindex="0"
                      @click="toggleDesktopFolder(folder.name)"
                      @keydown.enter.prevent="toggleDesktopFolder(folder.name)"
                    >
                      <LauncherTileContent :folder="buildFolderTileData(folder)" :size="folder.size">
                        <span v-if="folder.badge" class="peek-corner-badge" :class="folder.badge">
                          {{ folder.badge === 'applied' ? '✓已建' : '+待建' }}
                        </span>
                      </LauncherTileContent>
                    </div>

                    <a
                      v-for="link in desktopRootLinks"
                      :href="cleanHttpUrl(link.url) || undefined" target="_blank" rel="noreferrer"
                      :key="link.id"
                      class="launcher-link"
                      :class="[
                        link.pendingTargetFolder ? 'peek-moving-out' : link.badge ? `peek-${link.badge}` : '',
                        isLinkFocused(link.id, link.url) ? 'peek-focus' : '',
                      ]"
                      :data-peek-link="link.id"
                      :title="link.pendingTargetFolder ? `${link.title} → 待移入「${link.pendingTargetFolder}」\n${link.url}` : `${link.title}\n${link.url}`"
                    >
                      <LauncherTileContent :link="link">
                        <span v-if="link.pendingTargetFolder" class="peek-corner-badge moved">
                          → {{ link.pendingTargetFolder }}
                        </span>
                        <span v-else-if="link.badge" class="peek-corner-badge" :class="link.badge">
                          {{ linkBadgeText(link.badge) }}
                        </span>
                      </LauncherTileContent>
                    </a>
                  </div>

                  <p v-else class="mini-empty">
                    该分区目前为空，可审批新建文件夹或移入网站。
                  </p>

                  <!-- 网站 -> 目标文件夹 动态虚线流向层 -->
                  <svg v-if="connectorLines.length" class="org-flow-svg" aria-hidden="true">
                    <defs>
                      <marker id="org-flow-arrow" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#0284c7" />
                      </marker>
                      <marker id="org-flow-arrow-focus" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                        <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#0ea5e9" />
                      </marker>
                    </defs>
                    <g v-for="line in connectorLines" :key="line.id" :class="{ focused: line.focused }">
                      <path :d="line.path" class="org-flow-halo" />
                      <path
                        :d="line.path"
                        class="org-flow-path"
                        :marker-end="line.focused ? 'url(#org-flow-arrow-focus)' : 'url(#org-flow-arrow)'"
                      />
                      <circle :cx="line.sx" :cy="line.sy" r="2.8" class="org-flow-dot" />
                    </g>
                  </svg>
                </div>

                <!-- 底部展开文件夹白卡（不替换上方主网格） -->
                <section v-if="openedFolder" class="org-folder-drawer" aria-label="文件夹展开预览">
                  <header class="org-folder-drawer-head">
                    <div class="org-folder-drawer-title">
                      <button
                        v-if="openedFolder.parent"
                        type="button"
                        class="org-folder-icon-btn back"
                        :title="`返回上一级：${openedFolder.parent}`"
                        @click="openedFolderName = openedFolder.parent"
                      >
                        ‹
                      </button>
                      <h3>{{ openedFolder.name }}</h3>
                      <span v-if="openedFolder.badge === 'new'" class="drawer-state-pill new">+待建</span>
                      <span v-else-if="openedFolder.badge === 'applied'" class="drawer-state-pill applied">✓已建</span>
                    </div>
                    <div class="org-folder-drawer-actions">
                      <span class="org-folder-icon-btn plus" aria-hidden="true">+</span>
                      <button
                        type="button"
                        class="org-folder-icon-btn close"
                        title="关闭文件夹"
                        aria-label="关闭文件夹"
                        @click="openedFolderName = ''"
                      >
                        ×
                      </button>
                    </div>
                  </header>
                  <div class="org-folder-drawer-body">
                    <div
                      v-if="openedChildFolders.length || openedFolder.links.length"
                      class="launcher-items launcher-site-items org-preview-grid"
                    >
                      <div
                        v-for="child in openedChildFolders"
                        :key="child.name"
                        class="launcher-folder"
                        :class="[`size-${child.size}`, child.badge ? `peek-${child.badge}` : '', isFolderFocused(child.name) ? 'peek-focus' : '']"
                        :data-peek-folder="child.name"
                        role="button"
                        tabindex="0"
                        @click="openedFolderName = child.name"
                        @keydown.enter.prevent="openedFolderName = child.name"
                      >
                        <LauncherTileContent :folder="buildFolderTileData(child)" :size="child.size">
                          <span v-if="child.badge" class="peek-corner-badge" :class="child.badge">
                            {{ child.badge === 'applied' ? '✓已建' : '+待建' }}
                          </span>
                        </LauncherTileContent>
                      </div>

                      <a
                        v-for="link in openedFolder.links"
                        :href="cleanHttpUrl(link.url) || undefined" target="_blank" rel="noreferrer"
                        :key="link.id"
                        class="launcher-link"
                        :class="[link.badge ? `peek-${link.badge}` : '', isLinkFocused(link.id, link.url) ? 'peek-focus' : '']"
                        :title="`${link.title}\n${link.url}`"
                      >
                        <LauncherTileContent :link="link">
                          <span v-if="link.badge" class="peek-corner-badge" :class="link.badge">
                            {{ linkBadgeText(link.badge) }}
                          </span>
                        </LauncherTileContent>
                      </a>
                    </div>
                    <p v-else class="mini-empty">暂无网站，审批移入后将在此处显示</p>
                  </div>
                </section>
              </div>
            </div>

            <!-- 书签视图：与常用网站完全一致的分区胶囊 + 桌面式文件夹/书签图标网格 + 虚线归入动画 + 底部展开文件夹卡片 -->
            <div v-else class="org-desktop-preview org-bookmarks-preview" data-peek-target="org-folders">
              <div class="part-tabs">
                <button
                  v-for="root in bookmarkRoots"
                  :key="root.id"
                  type="button"
                  class="part-tab"
                  :data-peek-bm-folder="root.title"
                  :data-peek-bm-id="root.id"
                  :class="{ active: currentBookmarkRoot?.id === root.id, isNew: root.badge === 'new', isApplied: root.badge === 'applied' }"
                  @click="selectBookmarkRoot(root.id)"
                >
                  <span>{{ root.title }}</span>
                  <em v-if="root.badge === 'new'">+待建</em>
                  <em v-else-if="root.badge === 'applied'">✓已生效</em>
                </button>
              </div>

              <div v-if="currentBookmarkRoot" class="part-canvas" data-peek-target="org-links">
                <div ref="gridWrapRef" class="grid-stage-wrap">
                  <div
                    v-if="bookmarkRootFolders.length || bookmarkRootLinks.length"
                    class="launcher-items launcher-site-items org-preview-grid"
                  >
                    <div
                      v-for="bf in bookmarkRootFolders"
                      :key="bf.id"
                      class="launcher-folder size-small"
                      :class="[
                        bf.badge ? `peek-${bf.badge}` : '',
                        isBookmarkFolderFocused(bf.id, bf.title) ? 'peek-focus' : '',
                        openedBookmarkFolderId === bf.id ? 'is-open' : '',
                      ]"
                      :data-peek-bm-folder="bf.title"
                      :data-peek-bm-id="bf.id"
                      :title="`${bf.path || bf.title}（点击在下方展开文件夹）`"
                      role="button"
                      tabindex="0"
                      @click="toggleBookmarkFolder(bf.id)"
                      @keydown.enter.prevent="toggleBookmarkFolder(bf.id)"
                    >
                      <LauncherTileContent :folder="buildBookmarkFolderTileData(bf)" size="small">
                        <span v-if="bf.badge" class="peek-corner-badge" :class="bf.badge">
                          {{ bf.badge === 'applied' ? '✓已建' : '+待建' }}
                        </span>
                      </LauncherTileContent>
                    </div>

                    <a
                      v-for="bm in bookmarkRootLinks"
                      :href="cleanHttpUrl(bm.url) || undefined" target="_blank" rel="noreferrer"
                      :key="bm.id"
                      class="launcher-link"
                      :class="[
                        bm.pendingTargetFolder ? 'peek-moving-out' : bm.badge ? `peek-${bm.badge}` : '',
                        isBookmarkItemFocused(bm.id) ? 'peek-focus' : '',
                      ]"
                      :data-peek-bm-item="bm.id"
                      :title="bm.pendingTargetFolder ? `${bm.title} → 待移入「${bm.pendingTargetFolder}」\n${bm.url}` : `${bm.title}\n${bm.url}`"
                    >
                      <LauncherTileContent :link="bm">
                        <span v-if="bm.pendingTargetFolder" class="peek-corner-badge moved">
                          → {{ bm.pendingTargetFolder }}
                        </span>
                        <span v-else-if="bm.badge" class="peek-corner-badge" :class="bm.badge">
                          {{ bm.badge === 'applied' ? '✓' : '移入' }}
                        </span>
                      </LauncherTileContent>
                    </a>
                  </div>

                  <p v-else class="mini-empty">
                    该书签栏板块下暂无目录或书签。
                  </p>

                  <!-- 书签 -> 目标书签文件夹 动态虚线流向层 -->
                  <svg v-if="connectorLines.length" class="org-flow-svg" aria-hidden="true">
                    <defs>
                      <marker id="org-bm-flow-arrow" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#0284c7" />
                      </marker>
                      <marker id="org-bm-flow-arrow-focus" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                        <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#0ea5e9" />
                      </marker>
                    </defs>
                    <g v-for="line in connectorLines" :key="line.id" :class="{ focused: line.focused }">
                      <path :d="line.path" class="org-flow-halo" />
                      <path
                        :d="line.path"
                        class="org-flow-path"
                        :marker-end="line.focused ? 'url(#org-bm-flow-arrow-focus)' : 'url(#org-bm-flow-arrow)'"
                      />
                      <circle :cx="line.sx" :cy="line.sy" r="2.8" class="org-flow-dot" />
                    </g>
                  </svg>
                </div>

                <!-- 底部展开书签文件夹白卡（不替换上方主网格） -->
                <section v-if="openedBookmarkFolder" class="org-folder-drawer" aria-label="书签文件夹展开预览">
                  <header class="org-folder-drawer-head">
                    <div class="org-folder-drawer-title">
                      <button
                        v-if="openedBookmarkFolder.parentId && openedBookmarkFolder.parentId !== currentBookmarkRoot.id && openedBookmarkFolder.parentId !== '0'"
                        type="button"
                        class="org-folder-icon-btn back"
                        title="返回上一级文件夹"
                        @click="goUpBookmarkFolder"
                      >
                        ‹
                      </button>
                      <h3>{{ openedBookmarkFolder.title }}</h3>
                      <span v-if="openedBookmarkFolder.badge === 'new'" class="drawer-state-pill new">+待建</span>
                      <span v-else-if="openedBookmarkFolder.badge === 'applied'" class="drawer-state-pill applied">✓已建</span>
                    </div>
                    <div class="org-folder-drawer-actions">
                      <span class="org-folder-icon-btn plus" aria-hidden="true">+</span>
                      <button
                        type="button"
                        class="org-folder-icon-btn close"
                        title="关闭文件夹"
                        aria-label="关闭文件夹"
                        @click="openedBookmarkFolderId = ''"
                      >
                        ×
                      </button>
                    </div>
                  </header>
                  <div class="org-folder-drawer-body">
                    <div
                      v-if="openedBookmarkChildFolders.length || openedBookmarkFolder.items.length"
                      class="launcher-items launcher-site-items org-preview-grid"
                    >
                      <div
                        v-for="child in openedBookmarkChildFolders"
                        :key="child.id"
                        class="launcher-folder size-small"
                        :class="[child.badge ? `peek-${child.badge}` : '', isBookmarkFolderFocused(child.id, child.title) ? 'peek-focus' : '']"
                        :data-peek-bm-folder="child.title"
                        :data-peek-bm-id="child.id"
                        role="button"
                        tabindex="0"
                        @click="openedBookmarkFolderId = child.id"
                        @keydown.enter.prevent="openedBookmarkFolderId = child.id"
                      >
                        <LauncherTileContent :folder="buildBookmarkFolderTileData(child)" size="small">
                          <span v-if="child.badge" class="peek-corner-badge" :class="child.badge">
                            {{ child.badge === 'applied' ? '✓已建' : '+待建' }}
                          </span>
                        </LauncherTileContent>
                      </div>

                      <a
                        v-for="item in openedBookmarkFolder.items"
                        :href="cleanHttpUrl(item.url) || undefined" target="_blank" rel="noreferrer"
                        :key="item.id"
                        class="launcher-link"
                        :class="[item.badge ? `peek-${item.badge}` : '', isBookmarkItemFocused(item.id) ? 'peek-focus' : '']"
                        :title="`${item.title}\n${item.url}`"
                      >
                        <LauncherTileContent :link="item">
                          <span v-if="item.badge" class="peek-corner-badge" :class="item.badge">
                            {{ item.badge === 'applied' ? '✓' : '移入' }}
                          </span>
                        </LauncherTileContent>
                      </a>
                    </div>
                    <p v-else class="mini-empty">暂无书签，审批移入后将在此处显示</p>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <!-- 仿真 AI 鼠标指针（随悬停步骤或实时扫描平滑移动） -->
          <div
            v-if="cursorPos.visible && cursorTooltip"
            class="peek-cursor"
            :style="{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }"
          >
            <span :key="pulseKey" class="peek-cursor-ripple"></span>
            <svg class="peek-cursor-arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.5 3.5l14.5 7.2-6.2 1.8-3.1 5.9L4.5 3.5z" fill="#0ea5e9" stroke="#ffffff" stroke-width="1.6" stroke-linejoin="round" />
            </svg>
            <span class="peek-cursor-tag">{{ cursorTooltip }}</span>
          </div>
        </div>

        <!-- 右侧：Todoist 式逐条待审批清单 -->
        <aside class="org-checklist" data-peek-target="org-approval">
          <div class="checklist-head">
            <div>
              <strong>整理待办清单</strong>
              <small>点击圆圈才生效 · 待批 {{ pendingCount }} · 已生效 {{ appliedCount }}</small>
            </div>
            <button
              v-if="pendingCount > 0 && !isLiveGenerating"
              type="button"
              class="apply-all-btn"
              :disabled="applyingAll || Boolean(busyStepId) || uncertain || Boolean(editingStepId)"
              @click="applyAllRemaining"
            >
              {{ applyingAll ? '执行中…' : `全部生效 (${pendingCount})` }}
            </button>
          </div>

          <div v-if="batchConfirm" class="step-toast confirm-box">
            <span>将按顺序执行剩余 {{ pendingCount }} 步（已跳过项不执行）。</span>
            <div class="confirm-btns">
              <button type="button" class="org-btn primary" @click="applyAllRemaining">确认全部生效</button>
              <button type="button" class="org-btn subtle" @click="batchConfirm = false">取消</button>
            </div>
          </div>
          <p v-if="generationError" class="step-toast err" role="alert">提案生成失败：{{ generationError }}</p>
          <p v-if="stepNotice" class="step-toast ok" role="status">{{ stepNotice }}</p>
          <p v-if="stepError" class="step-toast err" role="alert">{{ stepError }}</p>

          <div v-if="isLiveGenerating && liveTimeline.length" class="live-steps">
            <div v-for="(line, i) in liveTimeline" :key="i" class="live-step-row">
              <span class="live-dot" />
              <span>{{ line }}</span>
            </div>
          </div>

          <div v-if="steps.length" class="todo-list">
            <article
              v-for="step in previewSteps"
              :key="step.id"
              class="todo-item"
              :class="[step.status, { active: hoveredStepId === step.id }]"
              @mouseenter="focusStepPreview(step)"
              @mouseleave="hoveredStepId = undefined"
            >
              <button
                type="button"
                class="todo-check"
                :disabled="Boolean(busyStepId) || applyingAll || isLiveGenerating || !['pending', 'error'].includes(step.status)"
                :title="step.status === 'applied' ? '已写入生效' : '点击立即生效这一步'"
                @click="applyStep(step)"
              >
                <span v-if="busyStepId === step.id">…</span>
                <span v-else-if="step.status === 'applied'">✓</span>
              </button>

              <div class="todo-main" @click="focusStepPreview(step)">
                <div class="todo-top">
                  <span class="step-num">#{{ step.order }}</span>
                  <span class="type-tag" :class="step.type">{{ actionTypeLabel(step) }}</span>
                  <span v-if="step.status === 'applied'" class="status-tag applied">✓ 已生效</span>
                  <span v-else-if="step.status === 'skipped'" class="status-tag skipped">已跳过</span>
                  <span v-else-if="step.status === 'undone'" class="status-tag skipped">已撤销</span>
                  <span v-else-if="step.status === 'applying' || step.status === 'undoing'" class="status-tag skipped">未完成</span>
                </div>
                <div class="todo-title">{{ step.title }}</div>
                <p v-if="step.dependsOn?.length" class="todo-dep">
                  前置步骤：{{ step.dependsOn.map(id => `#${steps.find(s => s.id === id)?.order || '?'}`).join('、') }}
                </p>
                <p v-if="step.reason" class="todo-reason">{{ step.reason }}</p>
                <p v-if="step.errorMessage && !stepError.includes(step.errorMessage)" class="todo-err">{{ step.errorMessage }}</p>

                <div v-if="editingStepId === step.id" class="todo-edit-row">
                  <input v-model.trim="editFolderName" type="text" :maxlength="step.type === 'create_partition' ? 12 : 20" placeholder="修改名称" />
                  <select v-if="step.type === 'create_launcher_folder'" v-model="editFolderSize">
                    <option value="large">大文件夹</option>
                    <option value="small">小文件夹</option>
                  </select>
                </div>

                <div class="todo-ops">
                  <button
                    v-if="step.status === 'applied' && step.undo"
                    type="button"
                    class="op-btn subtle"
                    :disabled="Boolean(busyStepId) || applyingAll || isLiveGenerating"
                    @click="undoStep(step)"
                  >
                    ↶ 撤销此步
                  </button>
                  <template v-else-if="['pending', 'error', 'skipped'].includes(step.status)">
                    <button
                      type="button"
                      class="op-btn apply"
                      :disabled="Boolean(busyStepId) || applyingAll || isLiveGenerating || step.status === 'skipped'"
                      @click="applyStep(step)"
                    >
                      {{ busyStepId === step.id ? '写入中…' : '点击生效' }}
                    </button>
                    <button
                      v-if="step.status !== 'skipped' && (step.type === 'create_partition' || step.type === 'create_launcher_folder' || step.type === 'create_bookmark_folder')"
                      type="button"
                      class="op-btn"
                      :disabled="Boolean(busyStepId) || applyingAll || isLiveGenerating"
                      @click="startEditStep(step)"
                    >
                      {{ editingStepId === step.id ? '完成编辑' : '改名/尺寸' }}
                    </button>
                    <button
                      type="button"
                      class="op-btn subtle"
                      :disabled="Boolean(busyStepId) || applyingAll || isLiveGenerating"
                      @click="toggleSkipStep(step)"
                    >
                      {{ step.status === 'skipped' ? '恢复' : '跳过' }}
                    </button>
                  </template>
                </div>
              </div>
            </article>
          </div>

          <div v-else-if="!isLiveGenerating" class="todo-empty">
            <p>暂无待审批建议</p>
            <small>点右上角「↻ 重新盘点提案」生成整理步骤，或调整专员提示词后重试。</small>
          </div>
        </aside>
      </div>
    </section>
  </Teleport>
</template>

<style scoped>
.org-modal {
  position: fixed;
  z-index: 2150;
  max-width: calc(100vw - 24px);
  max-height: calc(100dvh - 40px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--border, #dce3ec);
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
  box-shadow: 0 26px 70px rgba(15, 23, 42, 0.34);
}
.org-head {
  touch-action: none;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border, #e2e8f0);
  background: color-mix(in srgb, #0ea5e9 4%, var(--surface, #f8fafc));
}
.org-head-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.org-head-left strong {
  display: block;
  font-size: 13.5px;
  font-weight: 650;
}
.org-head-left small {
  display: block;
  font-size: 11.5px;
  color: var(--muted, #64748b);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 680px;
}
.org-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #0ea5e9;
  flex: none;
}
.org-dot.live {
  background: #10b981;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
  animation: pulseDot 1.5s infinite ease-in-out;
}
@keyframes pulseDot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.25); opacity: 0.75; }
}
.org-head-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: none;
}
.org-btn {
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 8px;
  padding: 6px 11px;
  font-size: 12px;
  background: var(--panel, #ffffff);
  color: inherit;
  cursor: pointer;
}
.org-btn.primary {
  background: #0ea5e9;
  border-color: #0ea5e9;
  color: #fff;
  font-weight: 600;
}
.org-btn.warn {
  background: #fef3c7;
  border-color: #f59e0b;
  color: #92400e;
}
.org-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.org-body {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.32fr) minmax(330px, 1fr);
}
.org-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-right: 1px solid var(--border, #e2e8f0);
  background: var(--panel, #ffffff);
  overflow: hidden;
}
.org-stage-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  padding: 9px 14px;
  border-bottom: 1px solid var(--border, #e6ecf3);
  background: var(--panel, #ffffff);
  flex: none;
}
.org-view-tabs {
  display: inline-flex;
  gap: 3px;
  padding: 3px;
  border-radius: 9px;
  background: color-mix(in srgb, var(--border, #e2e8f0) 75%, transparent);
}
.org-view-tabs button {
  border: 0;
  border-radius: 7px;
  padding: 5px 10px;
  font-size: 11.5px;
  background: transparent;
  color: var(--muted, #475569);
  cursor: pointer;
}
.org-view-tabs button.active {
  background: var(--panel, #ffffff);
  color: var(--text, #0f172a);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}
.org-flow-hint {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--muted, #64748b);
  padding: 4px 10px;
  border-radius: 999px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}
.org-flow-hint .hint-dash {
  width: 18px;
  height: 0;
  border-top: 2px dashed #0284c7;
  display: inline-block;
}
.stage-scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 12px 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--panel, #ffffff);
}
.org-stage-empty {
  margin: auto;
  max-width: 400px;
  text-align: center;
  padding: 20px;
  border-radius: 14px;
  background: var(--panel, #ffffff);
  border: 1px dashed var(--border, #cbd5e1);
}
.empty-icon {
  font-size: 28px;
  margin-bottom: 6px;
}
.org-stage-empty h4 {
  margin: 0 0 6px;
  font-size: 14px;
}
.org-stage-empty p {
  margin: 0 0 12px;
  font-size: 12px;
  line-height: 1.65;
  color: var(--muted, #64748b);
}
.part-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border, #eef2f6);
}
.part-tab {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid var(--border, #dce3ec);
  background: var(--panel, #fff);
  color: var(--text, #334155);
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.part-tab:hover {
  border-color: #93c5fd;
  background: #f8fafc;
}
.part-tab.active {
  border-color: #0284c7;
  background: #0284c7;
  color: #ffffff;
  font-weight: 600;
}
.part-tab em {
  font-style: normal;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 999px;
  background: rgba(245, 158, 11, 0.16);
  color: #b45309;
}
.part-tab.active em {
  background: rgba(255, 255, 255, 0.22);
  color: #ffffff;
}
.part-tab.isApplied em {
  background: rgba(16, 185, 129, 0.16);
  color: #047857;
}
.part-tab.active.isApplied em {
  background: rgba(255, 255, 255, 0.22);
  color: #ffffff;
}
.part-canvas {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.grid-stage-wrap {
  position: relative;
}
.org-preview-grid {
  width: 100%;
  grid-auto-flow: row dense;
  overflow: visible;
  padding: 6px 2px;
}
.org-preview-grid .launcher-link,
.org-preview-grid .launcher-folder {
  position: relative;
  border-radius: 14px;
  transition: transform 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease;
}
.org-preview-grid .launcher-link {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}
.org-preview-grid .launcher-folder {
  cursor: pointer;
}
.org-preview-grid .launcher-folder:hover {
  background: rgba(2, 132, 199, 0.06);
}
.org-preview-grid .launcher-folder.is-open {
  box-shadow: inset 0 0 0 2px #0284c7;
  background: rgba(2, 132, 199, 0.07);
}
.org-preview-grid .peek-new {
  box-shadow: inset 0 0 0 2px rgba(245, 158, 11, 0.78);
  background: rgba(245, 158, 11, 0.06);
}
.org-preview-grid .peek-moved,
.org-preview-grid .peek-promoted {
  box-shadow: inset 0 0 0 2px rgba(14, 165, 233, 0.72);
  background: rgba(14, 165, 233, 0.06);
}
.org-preview-grid .peek-moving-out {
  outline: 1.8px dashed rgba(2, 132, 199, 0.78);
  outline-offset: -2px;
  background: rgba(14, 165, 233, 0.05);
}
.org-preview-grid .peek-applied {
  box-shadow: inset 0 0 0 2px rgba(16, 185, 129, 0.72);
  background: rgba(16, 185, 129, 0.06);
}
.org-preview-grid .peek-focus {
  box-shadow: 0 0 0 2.5px #0ea5e9, 0 6px 16px rgba(14, 165, 233, 0.22);
  transform: translateY(-1px);
}
.peek-corner-badge {
  position: absolute;
  top: 2px;
  right: 3px;
  z-index: 4;
  max-width: 68px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 1px 5px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 700;
  line-height: 1.35;
  pointer-events: none;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.16);
}
.peek-corner-badge.new {
  background: #f59e0b;
  color: #ffffff;
}
.peek-corner-badge.moved,
.peek-corner-badge.promoted {
  background: #0284c7;
  color: #ffffff;
}
.peek-corner-badge.applied {
  background: #10b981;
  color: #ffffff;
}
/* 虚线归入流向 SVG 动画层 */
.org-flow-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 7;
  overflow: visible;
}
.org-flow-halo {
  fill: none;
  stroke: rgba(255, 255, 255, 0.86);
  stroke-width: 4.2px;
  stroke-linecap: round;
}
.org-flow-path {
  fill: none;
  stroke: #0284c7;
  stroke-width: 1.85px;
  stroke-dasharray: 6 5;
  stroke-linecap: round;
  opacity: 0.82;
  animation: orgDashFlow 0.95s linear infinite;
}
.org-flow-dot {
  fill: #0284c7;
  stroke: #ffffff;
  stroke-width: 1.2px;
}
.org-flow-svg g.focused .org-flow-path {
  stroke: #0ea5e9;
  stroke-width: 2.5px;
  opacity: 1;
  filter: drop-shadow(0 2px 5px rgba(14, 165, 233, 0.35));
}
.org-flow-svg g.focused .org-flow-dot {
  fill: #0ea5e9;
}
@keyframes orgDashFlow {
  to {
    stroke-dashoffset: -22;
  }
}
/* 底部展开文件夹大白卡（对齐桌面文件夹弹窗视觉） */
.org-folder-drawer {
  margin-top: 4px;
  padding: 14px 18px 18px;
  border-radius: 22px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04);
}
.org-folder-drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 11px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--border, #eef2f6);
}
.org-folder-drawer-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.org-folder-drawer-title h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text, #0f172a);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.drawer-state-pill {
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 999px;
}
.drawer-state-pill.new {
  background: rgba(245, 158, 11, 0.16);
  color: #b45309;
}
.drawer-state-pill.applied {
  background: rgba(16, 185, 129, 0.16);
  color: #047857;
}
.org-folder-drawer-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: none;
}
.org-folder-icon-btn {
  width: 28px;
  height: 28px;
  display: inline-grid;
  place-items: center;
  border: 1px solid var(--border, #dce3ec);
  background: #f8fafc;
  color: #64748b;
  font-size: 16px;
  line-height: 1;
  padding: 0;
}
.org-folder-icon-btn.plus {
  border-radius: 8px;
  user-select: none;
}
.org-folder-icon-btn.close,
.org-folder-icon-btn.back {
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.org-folder-icon-btn.close:hover,
.org-folder-icon-btn.back:hover {
  background: #e2e8f0;
  color: #0f172a;
}
.mini-empty {
  font-size: 11px;
  color: var(--muted, #94a3b8);
}

/* 仿真 AI 鼠标光标与涟漪 */
.peek-cursor {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 30;
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
}
.peek-cursor-arrow {
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 3px 6px rgba(15, 23, 42, 0.35));
}
.peek-cursor-ripple {
  position: absolute;
  left: 2px;
  top: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #0ea5e9;
  animation: peekPulse 0.75s ease-out forwards;
}
@keyframes peekPulse {
  0% { transform: scale(0.5); opacity: 0.95; }
  100% { transform: scale(2.4); opacity: 0; }
}
.peek-cursor-tag {
  max-width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 4px 9px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.88);
  color: #f8fafc;
  font-size: 11px;
  font-weight: 500;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.25);
}

/* 右侧 Todoist 式待办审批 */
.org-checklist {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: auto;
  padding: 14px;
  gap: 10px;
  background: var(--panel, #ffffff);
}
.checklist-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.checklist-head strong {
  display: block;
  font-size: 13.5px;
}
.checklist-head small {
  display: block;
  font-size: 11px;
  color: var(--muted, #64748b);
}
.apply-all-btn {
  border: 0;
  border-radius: 8px;
  padding: 6px 11px;
  font-size: 11.5px;
  font-weight: 600;
  background: #10b981;
  color: #fff;
  cursor: pointer;
}
.apply-all-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.step-toast {
  margin: 0;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 11.5px;
}
.step-toast.ok {
  background: rgba(16, 185, 129, 0.12);
  color: #047857;
}
.step-toast.err {
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
}
.step-toast.confirm-box {
  background: rgba(245, 158, 11, 0.12);
  color: #92400e;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.confirm-btns {
  display: flex;
  gap: 6px;
}
.live-steps {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--surface, #f8fafc);
  font-size: 11.5px;
}
.live-step-row {
  display: flex;
  align-items: center;
  gap: 7px;
}
.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0ea5e9;
}
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.todo-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 11px;
  border-radius: 11px;
  border: 1px solid var(--border, #e2e8f0);
  background: var(--surface, #f8fafc);
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
}
.todo-item.active {
  border-color: #0ea5e9;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
}
.todo-item.applied {
  background: rgba(16, 185, 129, 0.06);
  border-color: rgba(16, 185, 129, 0.35);
}
.todo-item.skipped {
  opacity: 0.62;
}
.todo-check {
  width: 20px;
  height: 20px;
  flex: none;
  margin-top: 2px;
  border-radius: 50%;
  border: 2px solid #94a3b8;
  background: var(--panel, #fff);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: grid;
  place-items: center;
  cursor: pointer;
}
.todo-check:hover:not(:disabled) {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}
.todo-item.applied .todo-check {
  background: #10b981;
  border-color: #10b981;
}
.todo-main {
  flex: 1;
  min-width: 0;
}
.todo-top {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 3px;
}
.step-num {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--muted, #64748b);
}
.type-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 6px;
  background: rgba(14, 165, 233, 0.13);
  color: #0369a1;
}
.status-tag {
  margin-left: auto;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 6px;
}
.status-tag.applied {
  background: rgba(16, 185, 129, 0.16);
  color: #047857;
}
.status-tag.skipped {
  background: rgba(100, 116, 139, 0.14);
  color: #64748b;
}
.todo-title {
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.45;
}
.todo-item.applied .todo-title {
  text-decoration: line-through;
  color: var(--muted, #64748b);
}
.todo-dep {
  margin: 3px 0 0;
  font-size: 10.5px;
  color: #b45309;
}
.todo-reason {
  margin: 3px 0 0;
  font-size: 11px;
  color: var(--muted, #64748b);
  line-height: 1.45;
}
.todo-err {
  margin: 4px 0 0;
  font-size: 11px;
  color: #b91c1c;
}
.todo-edit-row {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}
.todo-edit-row input,
.todo-edit-row select {
  flex: 1;
  min-width: 0;
  padding: 4px 7px;
  border-radius: 6px;
  border: 1px solid var(--border, #cbd5e1);
  font-size: 11.5px;
}
.todo-ops {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 7px;
  flex-wrap: wrap;
}
.op-btn {
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  background: var(--panel, #fff);
  color: inherit;
  cursor: pointer;
}
.op-btn.apply {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  color: #047857;
  font-weight: 600;
}
.todo-empty {
  margin: auto;
  text-align: center;
  font-size: 12.5px;
  color: var(--muted, #64748b);
}
@media (max-width: 820px) {
  .org-body {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .org-stage {
    border-right: 0;
    border-bottom: 1px solid var(--border, #e2e8f0);
  }
}
</style>
