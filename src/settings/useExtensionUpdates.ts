import { onUnmounted, ref, watch } from "vue";
import { optionsService } from "../services/options.service";
import { RELEASE_API, compareVersions, parseRelease, record, selectExtensionAsset,
  type ReleaseAsset, type ReleaseInfo } from "./release-model";

interface UpdateBrowser {
  runtime?: { getManifest(): { version: string }; getURL(path: string): string; reload(): void };
  storage?: { local: { get(keys: string[]): Promise<Record<string, unknown>>; set(value: Record<string, string>): Promise<void> } };
  downloads?: { download(options: { url: string; filename: string; saveAs: boolean }): Promise<number> };
}
const browser = (globalThis as unknown as { chrome?: UpdateBrowser }).chrome;
const errorText = (error: unknown) => error instanceof Error ? error.message : "操作失败";

export function useExtensionUpdates(notify: (message: string, error?: boolean) => void, isActive: () => boolean = () => true) {
  const needsReloadToApply = ref(false);
  const currentVersionText = ref(`LogicWeaver 当前版本: v${browser?.runtime?.getManifest().version || "未知"}`);
  const currentCommitText = ref("本地构建版本");
  const checkingUpdate = ref(false), canApplyUpdate = ref(false);
  const updateStatusMessage = ref("");
  const onlineRelease = ref<ReleaseInfo | null>(null), onlineAsset = ref<ReleaseAsset | null>(null);
  const isDownloading = ref(false), downloadPercent = ref(0);
  const downloadReceivedText = ref(""), downloadCompleted = ref(false);
  const githubToken = ref(""), showTokenInput = ref(false);
  let alive = true, checkVersion = 0, localVersion = 0, activityVersion = 0;
  let applyingGit = false;
  let reloadTimer: ReturnType<typeof setTimeout> | undefined;
  const requests = new Set<AbortController>();

  function requestScope(timeout: number) {
    const controller = new AbortController();
    requests.add(controller);
    const timer = setTimeout(() => controller.abort(), timeout);
    return { signal: controller.signal, finish: () => { clearTimeout(timer); requests.delete(controller); } };
  }
  function headers(binary = false): Record<string, string> {
    const value: Record<string, string> = { Accept: binary ? "application/octet-stream" : "application/vnd.github+json" };
    const token = githubToken.value.trim();
    if (token) value.Authorization = `Bearer ${token}`;
    return value;
  }

  async function syncLocalVersion(): Promise<string> {
    const sequence = ++localVersion;
    let diskVersion = "";
    const request = requestScope(10000);
    try {
      if (browser?.runtime) {
        const response = await fetch(browser.runtime.getURL("manifest.json") + "?t=" + Date.now(), { signal: request.signal });
        const manifest = response.ok ? record(await response.json()) : {};
        if (typeof manifest.version === "string") diskVersion = manifest.version;
      }
    } catch { /* Runtime manifest remains a valid fallback when disk read fails. */ }
    finally { request.finish(); }
    const running = browser?.runtime?.getManifest().version || diskVersion;
    const effective = diskVersion || running;
    if (alive && isActive() && sequence === localVersion) {
      needsReloadToApply.value = Boolean(diskVersion && running && diskVersion !== running);
      currentVersionText.value = needsReloadToApply.value
        ? `LogicWeaver 当前版本: v${running} (磁盘最新: v${diskVersion})`
        : `LogicWeaver 当前版本: ${effective ? 'v' + effective : '未知'}`;
      currentCommitText.value = needsReloadToApply.value
        ? "本地文件已更新，点击右侧「立即重新载入」生效" : "本地构建版本";
    }
    return effective;
  }

  async function loadGithubToken() {
    const initial = githubToken.value;
    try {
      const stored = browser?.storage?.local ? await browser.storage.local.get(["ghToken"])
        : { ghToken: localStorage.getItem("ghToken") };
      if (alive && githubToken.value === initial && typeof stored.ghToken === "string") githubToken.value = stored.ghToken;
    } catch { /* Missing optional token must not prevent settings from opening. */ }
  }
  async function saveGithubToken() {
    try {
      const value = githubToken.value.trim();
      if (browser?.storage?.local) await browser.storage.local.set({ ghToken: value });
      else localStorage.setItem("ghToken", value);
      if (!alive) return;
      notify("GitHub Token 已保存，正在重新检测更新…");
      await checkAllUpdates();
    } catch { if (alive) notify("Token 保存失败，请重试。", true); }
  }

  async function checkAllUpdates() {
    if (!alive || !isActive() || applyingGit || checkingUpdate.value || isDownloading.value) return;
    const sequence = ++checkVersion;
    const current = () => alive && isActive() && sequence === checkVersion;
    checkingUpdate.value = true;
    canApplyUpdate.value = false;
    updateStatusMessage.value = "";
    onlineRelease.value = null;
    onlineAsset.value = null;
    downloadPercent.value = 0;
    downloadCompleted.value = false;
    const request = requestScope(30000);
    try {
      const version = await syncLocalVersion();
      if (!current()) return;
      void optionsService.callNativeHost({ command: "git-check-update" }).then(value => {
        const result = record(value);
        if (!current() || result.ok !== true || typeof result.localCommit !== "string") return;
        if (!needsReloadToApply.value) currentCommitText.value = `本地 Commit: ${result.localCommit}${typeof result.commitDesc === 'string' ? ' (' + result.commitDesc + ')' : ''}`;
        canApplyUpdate.value = result.hasUpdate === true && Number(result.behindCount) > 0;
      }).catch(() => {});
      const response = await fetch(`${RELEASE_API}/latest`, { headers: headers(), signal: request.signal });
      if (!current()) return;
      if (!response.ok) {
        if (response.status === 401 || response.status === 404) {
          showTokenInput.value = true;
          updateStatusMessage.value = "未能读取发行版，可能未发布或需要仓库访问权限；请核对 Token 后重试。";
        } else updateStatusMessage.value = `GitHub API 返回异常状态 (${response.status})`;
        return;
      }
      const release = parseRelease(await response.json());
      if (!current()) return;
      if (compareVersions(release.tag_name, version) > 0) {
        const asset = selectExtensionAsset(release);
        if (!asset) {
          updateStatusMessage.value = `发现 ${release.tag_name}，但尚无可下载的扩展安装包。`;
          return;
        }
        onlineRelease.value = release;
        onlineAsset.value = asset;
        updateStatusMessage.value = `发现新版本 ${release.tag_name}！包含最新功能与优化。`;
      } else updateStatusMessage.value = `✓ 当前已是最新版本 (v${version})，暂无新更新。`;
    } catch (error: unknown) {
      if (current()) updateStatusMessage.value = `检查失败：${errorText(error)}`;
    } finally {
      request.finish();
      if (current()) checkingUpdate.value = false;
    }
  }

  async function downloadReleaseAsset() {
    const asset = onlineAsset.value;
    if (!alive || !isActive() || !asset || isDownloading.value || checkingUpdate.value || applyingGit) return;
    const activity = activityVersion;
    const current = () => alive && isActive() && activity === activityVersion;
    isDownloading.value = true;
    downloadPercent.value = 0;
    downloadReceivedText.value = "正在连接 GitHub 下载数据流…";
    downloadCompleted.value = false;
    const request = requestScope(300000);
    let objectUrl: string | undefined;
    try {
      const response = await fetch(`${RELEASE_API}/assets/${asset.id}`, { headers: headers(true), signal: request.signal });
      if (!response.ok) throw new Error(`下载失败 (HTTP ${response.status})，请核对权限后重试`);
      const maximum = 256 * 1024 * 1024;
      const length = Number(response.headers.get("Content-Length")) || asset.size;
      if (length > maximum) throw new Error("安装包超过 256 MB，请通过发行版页面手动下载");
      const reader = response.body?.getReader();
      if (!reader) throw new Error("浏览器不支持数据流读取");
      const chunks: Uint8Array<ArrayBuffer>[] = [];
      let received = 0;
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          received += value.byteLength;
          if (received > maximum) throw new Error("下载内容超过大小限制");
          chunks.push(new Uint8Array(value));
          if (!current()) return;
          downloadPercent.value = length > 0 ? Math.min(100, Math.round(received / length * 100)) : 0;
          downloadReceivedText.value = `${downloadPercent.value}% (${(received / 1048576).toFixed(1)} MB / ${(length / 1048576).toFixed(1)} MB)`;
        }
      } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
      if (!current()) return;
      const blob = new Blob(chunks, { type: "application/zip" });
      // API errors/metadata must not be saved as a misleading .zip file.
      const signature = new Uint8Array(await blob.slice(0, 4).arrayBuffer());
      if (signature[0] !== 0x50 || signature[1] !== 0x4b || signature[2] !== 3 || signature[3] !== 4) throw new Error("返回内容不是 ZIP 安装包");
      if (!current()) return;
      objectUrl = URL.createObjectURL(blob);
      if (browser?.downloads) await browser.downloads.download({ url: objectUrl, filename: asset.name, saveAs: false });
      else {
        const anchor = document.createElement("a");
        anchor.href = objectUrl; anchor.download = asset.name;
        document.body.appendChild(anchor); anchor.click(); anchor.remove();
      }
      if (current()) {
        downloadCompleted.value = true;
        downloadPercent.value = 100;
        downloadReceivedText.value = `已交给浏览器保存 (${(received / 1048576).toFixed(1)} MB)，请在下载列表确认`;
      }
    } catch (error: unknown) {
      if (current()) updateStatusMessage.value = `下载中断：${errorText(error)}`;
    } finally {
      request.finish();
      // Allow the browser to consume the Blob, then release it even if settings unmounts.
      if (objectUrl) { const url = objectUrl; setTimeout(() => URL.revokeObjectURL(url), 60000); }
      if (current()) isDownloading.value = false;
    }
  }

  function reloadExtension() {
    if (browser?.runtime) browser.runtime.reload(); else window.location.reload();
  }
  async function applyGitUpdate() {
    if (!alive || !isActive() || applyingGit || checkingUpdate.value || isDownloading.value || !canApplyUpdate.value) return;
    applyingGit = true;
    const activity = activityVersion;
    const current = () => alive && isActive() && activity === activityVersion;
    ++checkVersion; // Ignore an older native check arriving after this explicit mutation.
    canApplyUpdate.value = false;
    checkingUpdate.value = true;
    try {
      const result = record(await optionsService.callNativeHost({ command: "git-apply-update" }));
      if (!current()) return;
      if (result.ok === true) {
        needsReloadToApply.value = true;
        notify("更新拉取成功，即将重新载入扩展…");
        reloadTimer = setTimeout(() => { if (current()) reloadExtension(); }, 1200);
      } else notify(typeof result.error === "string" ? result.error : "更新应用失败", true);
    } catch (error: unknown) { if (current()) notify(errorText(error), true); }
    finally { applyingGit = false; if (current()) checkingUpdate.value = false; }
  }
  watch(isActive, active => {
    if (active) return;
    ++activityVersion; ++checkVersion; ++localVersion;
    for (const request of requests) request.abort();
    clearTimeout(reloadTimer);
    checkingUpdate.value = false;
    canApplyUpdate.value = false;
    isDownloading.value = false;
    // Native Git writes cannot be cancelled; applyingGit stays locked until they settle.
  });
  onUnmounted(() => {
    alive = false; ++checkVersion; ++localVersion;
    for (const request of requests) request.abort();
    requests.clear();
    clearTimeout(reloadTimer);
    githubToken.value = "";
  });
  return { needsReloadToApply, currentVersionText, currentCommitText, checkingUpdate, canApplyUpdate,
    updateStatusMessage, onlineRelease, onlineAsset, isDownloading, downloadPercent, downloadReceivedText,
    downloadCompleted, githubToken, showTokenInput, syncLocalVersion, loadGithubToken, saveGithubToken,
    checkAllUpdates, downloadReleaseAsset, reloadExtension, applyGitUpdate };
}
