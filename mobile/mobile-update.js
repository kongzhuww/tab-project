"use strict";

(function initMobileUpdater() {
  const OWNER = "kongzhuww";
  const REPO = "tab-Project";
  const plugin = window.Capacitor?.Plugins?.AppUpdater;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  async function render(body) {
    const wrap = el("div", "mobile-updater");
    if (!plugin) {
      wrap.append(
        el("b", "", "当前是浏览器预览模式"),
        el("p", "mobile-tool-note", "安装 Android APK 后，这里会检查 GitHub Release 并下载更新。浏览器预览不会请求安装权限。")
      );
      body.replaceChildren(wrap);
      return;
    }

    const status = el("div", "mobile-update-status", "正在读取版本…");
    const source = el("div", "mobile-bridge-note");
    source.append(
      el("b", "", "更新源已内置，无需填写 API 地址"),
      el("p", "", `GitHub 私有仓库：${OWNER}/${REPO}\n接口：GitHub Releases API`)
    );
    const tokenBox = el("div", "mobile-update-token");
    const tokenLabel = el("label", "mobile-setting-field");
    tokenLabel.append(el("b", "", "GitHub 更新 Token（手机只需填写这一项）"));
    const tokenInput = document.createElement("input");
    tokenInput.type = "password";
    tokenInput.placeholder = "github_pat_...";
    tokenInput.autocomplete = "off";
    tokenLabel.append(tokenInput, el("small", "", "Fine-grained personal access token：仅选择 tab-Project，Repository permissions → Contents 设为 Read-only。Token 仅加密保存在本机 Android Keystore。"));
    const tokenActions = el("div", "mobile-inline-actions");
    const createToken = el("button", "action-btn", "去 GitHub 创建 Token ↗");
    createToken.type = "button";
    createToken.addEventListener("click", () => window.open("https://github.com/settings/personal-access-tokens/new", "_blank", "noopener,noreferrer"));
    const saveToken = el("button", "action-btn", "保存 Token");
    saveToken.type = "button";
    saveToken.addEventListener("click", async () => {
      const token = tokenInput.value.trim();
      if (!token) return;
      await plugin.setGithubToken({ token });
      tokenInput.value = "";
      status.textContent = "更新凭据已安全保存";
    });
    const clearToken = el("button", "action-btn", "删除 Token");
    clearToken.type = "button";
    clearToken.addEventListener("click", async () => {
      await plugin.setGithubToken({ token: "" });
      tokenInput.value = "";
      status.textContent = "更新 Token 已从本机删除";
    });
    tokenActions.append(createToken, saveToken, clearToken);
    tokenBox.append(tokenLabel, tokenActions);

    const check = el("button", "mobile-primary-button", "检查 GitHub 更新");
    check.type = "button";
    const progress = document.createElement("progress");
    progress.max = 100; progress.value = 0; progress.hidden = true;
    const releaseBox = el("div", "mobile-release-box");

    try {
      const info = await plugin.getStatus();
      status.textContent = `当前版本：${info.versionName} (${info.versionCode}) · ${info.tokenConfigured ? "私有仓库凭据已配置" : "尚未配置私有仓库凭据"}`;
    } catch (error) {
      status.textContent = `版本读取失败：${error.message}`;
    }

    plugin.addListener?.("downloadProgress", ({ percent }) => {
      progress.hidden = false;
      progress.value = Number(percent || 0);
      status.textContent = `正在下载更新：${Math.round(progress.value)}%`;
    });

    check.addEventListener("click", async () => {
      check.disabled = true;
      releaseBox.replaceChildren();
      status.textContent = "正在检查 GitHub Release…";
      try {
        const release = await plugin.checkForUpdate({ owner: OWNER, repo: REPO });
        if (!release.updateAvailable) {
          status.textContent = `已经是最新版：${release.currentVersion}`;
          return;
        }
        status.textContent = `发现新版本：${release.version}`;
        releaseBox.append(el("b", "", release.name || release.tagName || release.version));
        if (release.notes) releaseBox.append(el("p", "mobile-release-notes", release.notes.slice(0, 3000)));
        const install = el("button", "mobile-primary-button", "下载并安装 APK");
        install.type = "button";
        install.addEventListener("click", async () => {
          install.disabled = true;
          try {
            await plugin.downloadAndInstall({ assetApiUrl: release.assetApiUrl, fileName: release.assetName });
            status.textContent = "APK 已下载，请按 Android 系统提示确认安装";
          } catch (error) {
            status.textContent = `更新失败：${error.message}`;
            install.disabled = false;
          }
        });
        releaseBox.appendChild(install);
      } catch (error) {
        status.textContent = error.message?.includes("401")
          ? "私有仓库认证失败，请保存具有只读 Contents 权限的 GitHub Token"
          : `检查失败：${error.message}`;
      } finally { check.disabled = false; }
    });

    wrap.append(status, source, tokenBox, check, progress, releaseBox,
      el("p", "mobile-tool-note", "更新必须来自同一签名证书。Android 会显示系统安装确认，普通 App 无法静默覆盖安装。"));
    body.replaceChildren(wrap);
  }

  window.LogicWeaverMobileUpdater = { render };
})();
