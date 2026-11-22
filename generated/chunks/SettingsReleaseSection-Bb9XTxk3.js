import { b as m, w as re, e as de, d as fe, o as pe, f as _, g as $, h as r, m as ge, t as b, u as e, j as R, p as me, v as ve, P as ye, n as be } from "./vendor-vue-_upDT3S_.js";
import { t as S } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { o as oe } from "./options.service-0zKxEmHY.js";
const he = "ea64bf8d-56f4-4112-bd30-92ba8587fab1", we = "2026-11-22T15:36:03.685Z";
function le(o) {
  if (!o || typeof o != "object") return null;
  const t = o;
  return typeof t.id != "string" || !/^[a-f0-9-]{36}$/i.test(t.id) || typeof t.builtAt != "string" || !Number.isFinite(Date.parse(t.builtAt)) ? null : { id: t.id, builtAt: t.builtAt };
}
function ke() {
  return le({ id: he, builtAt: we });
}
function ae(o, t) {
  return !!(o && t && o.id !== t.id);
}
const ie = "https://api.github.com/repos/kongzhuww/tab-project/releases";
function J(o) {
  return o !== null && typeof o == "object" ? o : {};
}
function xe(o) {
  const t = J(o);
  if (typeof t.tag_name != "string" || !/^v?\d+(?:\.\d+){1,3}$/i.test(t.tag_name))
    throw new Error("发行版版本号无效，无法比较更新");
  const v = [];
  for (const E of Array.isArray(t.assets) ? t.assets : []) {
    const u = J(E);
    if (typeof u.id != "number" || !Number.isSafeInteger(u.id) || u.id <= 0 || typeof u.name != "string" || !/^[\w.() -]+\.zip$/i.test(u.name) || typeof u.size != "number" || !Number.isSafeInteger(u.size) || u.size < 0) continue;
    let i;
    try {
      i = new URL(String(u.browser_download_url));
    } catch {
      continue;
    }
    i.origin !== "https://github.com" || i.username || i.password || !i.pathname.startsWith("/kongzhuww/tab-project/releases/download/") || v.push({ id: u.id, name: u.name, size: u.size, browser_download_url: i.href });
  }
  return {
    tag_name: t.tag_name,
    name: typeof t.name == "string" ? t.name : "",
    body: typeof t.body == "string" ? t.body : "",
    assets: v
  };
}
function Te(o, t) {
  const v = (i) => {
    if (!/^v?\d+(?:\.\d+){1,3}$/i.test(i)) throw new Error("版本号格式无效");
    return i.replace(/^v/i, "").split(".").map(Number);
  }, E = v(o), u = v(t);
  for (let i = 0; i < Math.max(E.length, u.length); i++) {
    const j = (E[i] || 0) - (u[i] || 0);
    if (j) return Math.sign(j);
  }
  return 0;
}
function _e(o) {
  return o.assets.find((t) => /-extension\.zip$/i.test(t.name));
}
const h = globalThis.chrome, X = (o) => o instanceof Error ? o.message : "操作失败";
function $e(o, t = () => !0) {
  const v = m(!1), E = m(`LogicWeaver 当前版本: v${h?.runtime?.getManifest().version || "未知"}`), u = m("本地构建版本"), i = ke(), j = m(i ? `当前构建 ${i.id.slice(0, 8)} · ${i.builtAt}` : "当前构建标识不可用"), T = m(!1), U = m(!1), k = m(""), W = m(null), I = m(null), y = m(!1), z = m(0), A = m(""), V = m(!1), B = m(""), P = m(!1);
  let d = !0, N = 0, C = 0, G = 0, L = !1, F;
  const M = /* @__PURE__ */ new Set();
  function D(l) {
    const n = new AbortController();
    M.add(n);
    const a = setTimeout(() => n.abort(), l);
    return { signal: n.signal, finish: () => {
      clearTimeout(a), M.delete(n);
    } };
  }
  function O(l = !1) {
    const n = { Accept: l ? "application/octet-stream" : "application/vnd.github+json" }, a = B.value.trim();
    return a && (n.Authorization = `Bearer ${a}`), n;
  }
  async function H() {
    const l = ++C;
    let n = "", a = null;
    const x = D(1e4);
    try {
      if (h?.runtime) {
        const w = await fetch(h.runtime.getURL("manifest.json") + "?t=" + Date.now(), { signal: x.signal }), g = w.ok ? J(await w.json()) : {};
        typeof g.version == "string" && (n = g.version);
      }
    } catch {
    }
    try {
      if (h?.runtime && !x.signal.aborted) {
        const w = await fetch(h.runtime.getURL("generated/build-info.json") + "?t=" + Date.now(), { signal: x.signal, cache: "no-store" });
        w.ok && (a = le(await w.json()));
      }
    } catch {
    } finally {
      x.finish();
    }
    const f = h?.runtime?.getManifest().version || n, c = n || f;
    return d && t() && l === C && (v.value = !!(n && f && n !== f) || ae(i, a), j.value = i ? `当前构建 ${i.id.slice(0, 8)} · ${i.builtAt}${ae(i, a) ? `；磁盘构建 ${a.id.slice(0, 8)}（需重载）` : a ? "" : "；无法核对磁盘构建"}` : "当前构建标识不可用；旧版本可重载扩展后重试", E.value = v.value ? `LogicWeaver 当前版本: v${f} (磁盘最新: v${n})` : `LogicWeaver 当前版本: ${c ? "v" + c : "未知"}`, u.value = v.value ? "本地文件已更新，点击右侧「立即重新载入」生效" : "本地构建版本"), c;
  }
  async function s() {
    const l = B.value;
    try {
      const n = h?.storage?.local ? await h.storage.local.get(["ghToken"]) : { ghToken: localStorage.getItem("ghToken") };
      d && B.value === l && typeof n.ghToken == "string" && (B.value = n.ghToken);
    } catch {
    }
  }
  async function p() {
    try {
      const l = B.value.trim();
      if (h?.storage?.local ? await h.storage.local.set({ ghToken: l }) : localStorage.setItem("ghToken", l), !d) return;
      o("GitHub Token 已保存，正在重新检测更新…"), await Y();
    } catch {
      d && o("Token 保存失败，请重试。", !0);
    }
  }
  async function Y() {
    if (!d || !t() || L || T.value || y.value) return;
    const l = ++N, n = () => d && t() && l === N;
    T.value = !0, U.value = !1, k.value = "", W.value = null, I.value = null, z.value = 0, V.value = !1;
    const a = D(3e4);
    try {
      const x = await H();
      if (!n()) return;
      oe.callNativeHost({ command: "git-check-update" }).then((w) => {
        const g = J(w);
        !n() || g.ok !== !0 || typeof g.localCommit != "string" || (v.value || (u.value = `本地 Commit: ${g.localCommit}${typeof g.commitDesc == "string" ? " (" + g.commitDesc + ")" : ""}`), U.value = g.hasUpdate === !0 && Number(g.behindCount) > 0);
      }).catch(() => {
      });
      const f = await fetch(`${ie}/latest`, { headers: O(), signal: a.signal });
      if (!n()) return;
      if (!f.ok) {
        f.status === 401 || f.status === 404 ? (P.value = !0, k.value = "未能读取发行版，可能未发布或需要仓库访问权限；请核对 Token 后重试。") : k.value = `GitHub API 返回异常状态 (${f.status})`;
        return;
      }
      const c = xe(await f.json());
      if (!n()) return;
      if (Te(c.tag_name, x) > 0) {
        const w = _e(c);
        if (!w) {
          k.value = `发现 ${c.tag_name}，但尚无可下载的扩展安装包。`;
          return;
        }
        W.value = c, I.value = w, k.value = `发现新版本 ${c.tag_name}！包含最新功能与优化。`;
      } else k.value = `✓ 当前已是最新版本 (v${x})，暂无新更新。`;
    } catch (x) {
      n() && (k.value = `检查失败：${X(x)}`);
    } finally {
      a.finish(), n() && (T.value = !1);
    }
  }
  async function ue() {
    const l = I.value;
    if (!d || !t() || !l || y.value || T.value || L) return;
    const n = G, a = () => d && t() && n === G;
    y.value = !0, z.value = 0, A.value = "正在连接 GitHub 下载数据流…", V.value = !1;
    const x = D(3e5);
    let f;
    try {
      const c = await fetch(`${ie}/assets/${l.id}`, { headers: O(!0), signal: x.signal });
      if (!c.ok) throw new Error(`下载失败 (HTTP ${c.status})，请核对权限后重试`);
      const w = 256 * 1024 * 1024, g = Number(c.headers.get("Content-Length")) || l.size;
      if (g > w) throw new Error("安装包超过 256 MB，请通过发行版页面手动下载");
      const K = c.body?.getReader();
      if (!K) throw new Error("浏览器不支持数据流读取");
      const te = [];
      let Z = 0;
      try {
        for (; ; ) {
          const { done: q, value: se } = await K.read();
          if (q) break;
          if (Z += se.byteLength, Z > w) throw new Error("下载内容超过大小限制");
          if (te.push(new Uint8Array(se)), !a()) return;
          z.value = g > 0 ? Math.min(100, Math.round(Z / g * 100)) : 0, A.value = `${z.value}% (${(Z / 1048576).toFixed(1)} MB / ${(g / 1048576).toFixed(1)} MB)`;
        }
      } finally {
        await K.cancel().catch(() => {
        }), K.releaseLock();
      }
      if (!a()) return;
      const ne = new Blob(te, { type: "application/zip" }), Q = new Uint8Array(await ne.slice(0, 4).arrayBuffer());
      if (Q[0] !== 80 || Q[1] !== 75 || Q[2] !== 3 || Q[3] !== 4) throw new Error("返回内容不是 ZIP 安装包");
      if (!a()) return;
      if (f = URL.createObjectURL(ne), h?.downloads) await h.downloads.download({ url: f, filename: l.name, saveAs: !1 });
      else {
        const q = document.createElement("a");
        q.href = f, q.download = l.name, document.body.appendChild(q), q.click(), q.remove();
      }
      a() && (V.value = !0, z.value = 100, A.value = `已交给浏览器保存 (${(Z / 1048576).toFixed(1)} MB)，请在下载列表确认`);
    } catch (c) {
      a() && (k.value = `下载中断：${X(c)}`);
    } finally {
      if (x.finish(), f) {
        const c = f;
        setTimeout(() => URL.revokeObjectURL(c), 6e4);
      }
      a() && (y.value = !1);
    }
  }
  function ee() {
    h?.runtime ? h.runtime.reload() : window.location.reload();
  }
  async function ce() {
    if (!d || !t() || L || T.value || y.value || !U.value) return;
    L = !0;
    const l = G, n = () => d && t() && l === G;
    ++N, U.value = !1, T.value = !0;
    try {
      const a = J(await oe.callNativeHost({ command: "git-apply-update" }));
      if (!n()) return;
      a.ok === !0 ? (v.value = !0, o("更新拉取成功，即将重新载入扩展…"), F = setTimeout(() => {
        n() && ee();
      }, 1200)) : o(typeof a.error == "string" ? a.error : "更新应用失败", !0);
    } catch (a) {
      n() && o(X(a), !0);
    } finally {
      L = !1, n() && (T.value = !1);
    }
  }
  return re(t, (l) => {
    if (!l) {
      ++G, ++N, ++C;
      for (const n of M) n.abort();
      clearTimeout(F), T.value = !1, U.value = !1, y.value = !1;
    }
  }), de(() => {
    d = !1, ++N, ++C;
    for (const l of M) l.abort();
    M.clear(), clearTimeout(F), B.value = "";
  }), {
    needsReloadToApply: v,
    currentVersionText: E,
    currentCommitText: u,
    currentBuildText: j,
    checkingUpdate: T,
    canApplyUpdate: U,
    updateStatusMessage: k,
    onlineRelease: W,
    onlineAsset: I,
    isDownloading: y,
    downloadPercent: z,
    downloadReceivedText: A,
    downloadCompleted: V,
    githubToken: B,
    showTokenInput: P,
    syncLocalVersion: H,
    loadGithubToken: s,
    saveGithubToken: p,
    checkAllUpdates: Y,
    downloadReleaseAsset: ue,
    reloadExtension: ee,
    applyGitUpdate: ce
  };
}
const Ee = { class: "field full-width" }, Ae = { class: "sync-banner" }, Re = { style: { "font-weight": "700", "font-size": "13px", color: "var(--heading)" } }, Be = { style: { "font-size": "10px", color: "var(--dim)", "margin-top": "4px" } }, Ue = { style: { "font-size": "10px", color: "var(--dim)", "margin-top": "4px", "overflow-wrap": "anywhere" } }, ze = { style: { display: "flex", gap: "8px", "align-items": "center" } }, Ce = ["title"], Ge = ["disabled"], Le = {
  key: 0,
  class: "update-log-box"
}, Me = {
  key: 1,
  class: "github-token-box"
}, De = { style: { display: "flex", "justify-content": "space-between", "align-items": "center" } }, Se = {
  key: 2,
  class: "release-card"
}, je = { class: "release-header" }, Ie = { class: "release-tag" }, Ve = {
  key: 0,
  style: { "margin-left": "6px", "font-size": "11px", color: "var(--muted)" }
}, Ne = ["disabled"], He = {
  key: 0,
  class: "release-notes"
}, qe = {
  key: 1,
  class: "download-progress-box"
}, Pe = { class: "download-progress-label" }, Fe = { class: "download-progress-track" }, We = {
  key: 2,
  class: "download-finish-card"
}, Ke = /* @__PURE__ */ fe({
  __name: "SettingsReleaseSection",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["notify"],
  setup(o, { expose: t, emit: v }) {
    const E = o, u = v, {
      needsReloadToApply: i,
      currentVersionText: j,
      currentCommitText: T,
      currentBuildText: U,
      checkingUpdate: k,
      canApplyUpdate: W,
      updateStatusMessage: I,
      onlineRelease: y,
      onlineAsset: z,
      isDownloading: A,
      downloadPercent: V,
      downloadReceivedText: B,
      downloadCompleted: P,
      githubToken: d,
      showTokenInput: N,
      syncLocalVersion: C,
      loadGithubToken: G,
      saveGithubToken: L,
      checkAllUpdates: F,
      downloadReleaseAsset: M,
      reloadExtension: D,
      applyGitUpdate: O
    } = $e((H, s) => u("notify", H, s), () => E.active);
    return pe(() => {
      C(), G();
    }), re(() => E.active, (H) => {
      H && C();
    }), t({ syncLocalVersion: C, loadGithubToken: G }), (H, s) => (_(), $("div", Ee, [
      r("label", null, [
        ge(b(e(S)("settings.release.title")) + " ", 1),
        s[7] || (s[7] = r("em", null, "RELEASE & GIT", -1))
      ]),
      r("div", Ae, [
        r("div", null, [
          r("div", Re, b(e(j)), 1),
          r("div", Be, b(e(T)), 1),
          r("div", Ue, b(e(U)), 1)
        ]),
        r("div", ze, [
          e(i) ? (_(), $("button", {
            key: 0,
            type: "button",
            class: "btn-save-green",
            title: e(S)("settings.release.reloadTip"),
            onClick: s[0] || (s[0] = //@ts-ignore
            (...p) => e(D) && e(D)(...p))
          }, b(e(S)("settings.release.reloadNow")), 9, Ce)) : R("", !0),
          r("button", {
            type: "button",
            class: "btn-secondary",
            disabled: e(k) || e(A),
            onClick: s[1] || (s[1] = //@ts-ignore
            (...p) => e(F) && e(F)(...p))
          }, b(e(k) ? e(S)("settings.release.checking") : e(S)("settings.release.checkBtn")), 9, Ge),
          e(W) ? (_(), $("button", {
            key: 1,
            type: "button",
            class: "btn-primary",
            onClick: s[2] || (s[2] = //@ts-ignore
            (...p) => e(O) && e(O)(...p))
          }, b(e(S)("settings.release.applyGit")), 1)) : R("", !0)
        ])
      ]),
      e(I) ? (_(), $("div", Le, b(e(I)), 1)) : R("", !0),
      e(N) || !e(d) ? (_(), $("div", Me, [
        r("div", De, [
          s[8] || (s[8] = r("strong", { style: { "font-size": "12px" } }, "GitHub 访问 Token（私有仓库协作者在线拉取）", -1)),
          r("button", {
            type: "button",
            style: { padding: "2px 8px", "font-size": "11px" },
            onClick: s[3] || (s[3] = //@ts-ignore
            (...p) => e(L) && e(L)(...p))
          }, "保存 Token")
        ]),
        me(r("input", {
          "onUpdate:modelValue": s[4] || (s[4] = (p) => ye(d) ? d.value = p : null),
          type: "password",
          placeholder: "ghp_... 输入你的 GitHub Personal Access Token",
          style: { "font-size": "11px", padding: "6px 8px" }
        }, null, 512), [
          [ve, e(d)]
        ]),
        s[9] || (s[9] = r("p", {
          class: "hint",
          style: { margin: "0" }
        }, "填写后可免安装 Git 直接从 GitHub 在线检测、进度条下载最新版插件压缩包。", -1))
      ])) : R("", !0),
      e(y) ? (_(), $("div", Se, [
        r("div", je, [
          r("div", null, [
            r("span", Ie, "🎉 发现新版本：" + b(e(y).tag_name), 1),
            e(y).name ? (_(), $("span", Ve, "(" + b(e(y).name) + ")", 1)) : R("", !0)
          ]),
          e(z) && !e(P) ? (_(), $("button", {
            key: 0,
            type: "button",
            class: "btn-primary",
            disabled: e(A),
            onClick: s[5] || (s[5] = //@ts-ignore
            (...p) => e(M) && e(M)(...p))
          }, b(e(A) ? e(S)("settings.release.downloading") : e(S)("settings.release.downloadPackage")), 9, Ne)) : R("", !0)
        ]),
        e(y).body ? (_(), $("div", He, b(e(y).body), 1)) : R("", !0),
        e(A) || e(V) > 0 ? (_(), $("div", qe, [
          r("div", Pe, [
            r("span", null, b(e(A) ? "正在从 GitHub 下载安装包…" : e(P) ? "已交给浏览器保存" : "已暂停"), 1),
            r("strong", null, b(e(B)), 1)
          ]),
          r("div", Fe, [
            r("div", {
              class: "download-progress-bar",
              style: be({ width: `${e(V)}%` })
            }, null, 4)
          ])
        ])) : R("", !0),
        e(P) ? (_(), $("div", We, [
          s[10] || (s[10] = r("strong", null, "安装包已交给浏览器，请在下载列表确认保存完成。", -1)),
          s[11] || (s[11] = r("p", { style: { margin: "0", "font-size": "11px", "line-height": "1.4" } }, " 解压安装包覆盖到当前扩展目录后，点击下方按钮即可一键重新载入生效，无需重启浏览器： ", -1)),
          r("button", {
            type: "button",
            class: "btn-save-green",
            style: { "align-self": "flex-start", "margin-top": "4px" },
            onClick: s[6] || (s[6] = //@ts-ignore
            (...p) => e(D) && e(D)(...p))
          }, " 🔄 立即重新载入扩展 (Hot Reload) ")
        ])) : R("", !0)
      ])) : R("", !0)
    ]));
  }
});
export {
  Ke as default
};
