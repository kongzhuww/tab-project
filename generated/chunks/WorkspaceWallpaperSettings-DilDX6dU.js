import { u as g, s as W } from "./workspace-wallpaper-VZA3CcfK.js";
import { W as I, D as E, a as $ } from "./wallpaper.service-Bv45Nhfa.js";
import { l as D, g as B, v as L, s as N, a as x } from "./SettingsView-De4vobQn.js";
import { d as A, o as U, e as F, f as v, g as f, h as u, m as C, F as w, i as y, t as h, j as S, b as _ } from "./vendor-vue-_upDT3S_.js";
import { _ as H } from "./_plugin-vue_export-helper-DtNgUcga.js";
async function O(c = !1) {
  const n = [
    { id: "builtin-mountain", title: "默认山景", kind: "内置", builtin: "mountain" }
  ], { history: o } = await I.loadHistory();
  let t = await D();
  if (c || !t.length) {
    const e = await B();
    e && await L(e, c) && (t = await N(e));
  }
  const i = t.map((e) => ({ id: `workshop:${e.id}`, title: e.title, kind: e.type === "video" ? "工坊视频" : e.type === "web" ? "工坊网页" : "暂不支持", unavailable: e.type !== "video" && e.type !== "web", workshop: e })), r = new Set(t.map((e) => e.id)), m = o.filter((e) => !e.value?.workshopId).map((e) => ({ id: `history:${e.id}`, title: e.title || "未命名壁纸", kind: e.kind || "壁纸库", history: e }));
  for (const e of o) {
    const k = e.value?.workshopId, b = e.value?.type;
    k && !r.has(String(k)) && (b === "video" || b === "web") && (i.push({ id: `workshop:${k}`, title: e.title || "工坊壁纸", kind: b === "video" ? "工坊视频" : "工坊网页", unavailable: !1, workshop: { id: String(k), title: e.title || "工坊壁纸", type: b, entryFile: e.value.entry } }), r.add(String(k)));
  }
  return [...n, ...m, ...i];
}
async function T(c) {
  const n = c.id;
  if (c.builtin === "mountain") return { sourceId: n, kind: "image", src: E };
  if (c.workshop) {
    const t = await x(c.workshop);
    if (t.type === "video") {
      const i = t.files.find((r) => r.path === t.entry) || t.files.find((r) => /^video\//.test(r.file.type) || /\.(mp4|webm|mkv|mov)$/i.test(r.path));
      if (!i) throw new Error("未找到壁纸视频文件");
      return { sourceId: n, kind: "video", blob: i.file };
    }
    return { sourceId: n, kind: "web", pack: t };
  }
  const o = c.history?.value;
  if (typeof o == "string") return { sourceId: n, kind: "image", src: o };
  if (o?.type === "style" && typeof o.style == "string") return { sourceId: n, kind: "css", background: o.style.replace(/^\s*background\s*:\s*/i, "").replace(/;\s*$/, "") };
  if (o?.type === "db") {
    const t = await $(o.storageKey);
    if (!(t instanceof Blob)) throw new Error("壁纸文件未找到，请在壁纸库重新添加");
    return { sourceId: n, kind: /^video\//i.test(t.type) || /\.(mp4|webm|mov)$/i.test(t.name || "") ? "video" : "image", blob: t };
  }
  throw new Error("这款壁纸暂不支持作为工作区背景");
}
const V = { class: "workspace-wallpapers" }, G = ["aria-label", "value", "disabled", "onChange"], K = { value: "" }, P = ["value", "disabled"], M = ["value"], R = { class: "workspace-wallpaper-switch" }, j = ["checked", "disabled", "onChange"], q = {
  key: 0,
  role: "alert",
  class: "field-hint"
}, z = /* @__PURE__ */ A({
  __name: "WorkspaceWallpaperSettings",
  setup(c) {
    const n = [
      { id: "bilibili", label: "B站收藏夹", state: g("bilibili") },
      { id: "todoist", label: "Todoist", state: g("todoist") },
      { id: "github", label: "GitHub", state: g("github") }
    ], o = _([]), t = _(null), i = _("");
    let r = !0;
    async function m(d = !1) {
      try {
        const s = await O(d);
        r && (o.value = s);
      } catch {
        r && (i.value = "读取壁纸库失败，请重新打开设置。");
      }
    }
    function e(d, s) {
      s === "local" && d.heroBackgroundHistory && m();
    }
    U(() => {
      m(), typeof chrome < "u" && chrome.storage?.onChanged?.addListener(e);
    }), F(() => {
      r = !1, typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(e);
    });
    async function k(d, s) {
      const a = s.target, l = o.value.find((p) => p.id === a.value);
      if (l) {
        t.value = d.id, i.value = "";
        try {
          const p = await T(l);
          await W(d.id, { selection: p, image: null, name: l.title, enabled: !0 });
        } catch (p) {
          a.value = d.state.value.value.selection?.sourceId || "", i.value = p instanceof Error ? p.message : "壁纸读取失败";
        } finally {
          t.value = null;
        }
      }
    }
    async function b(d, s) {
      const a = s.target, l = a.checked;
      t.value = d.id, i.value = "";
      try {
        await W(d.id, { enabled: l });
      } catch (p) {
        a.checked = !l, i.value = p instanceof Error ? p.message : "设置保存失败";
      } finally {
        t.value = null;
      }
    }
    return (d, s) => (v(), f("div", V, [
      s[2] || (s[2] = u("label", null, [
        C("工作区背景 "),
        u("em", null, "WORKSPACE BACKGROUNDS")
      ], -1)),
      s[3] || (s[3] = u("p", { class: "field-hint" }, "从壁纸库或已连接的 Steam 工坊中选择，三个工作区各自独立，默认关闭；更换主界面壁纸不会影响这里。", -1)),
      u("button", {
        type: "button",
        class: "workspace-wallpaper-refresh",
        onClick: s[0] || (s[0] = (a) => m(!0))
      }, "刷新壁纸库"),
      (v(), f(w, null, y(n, (a) => u("div", {
        key: a.id,
        class: "workspace-wallpaper-row"
      }, [
        u("strong", null, h(a.label), 1),
        u("select", {
          "aria-label": `${a.label}壁纸`,
          value: a.state.value.value.selection?.sourceId || "",
          disabled: !!t.value,
          onChange: (l) => k(a, l)
        }, [
          u("option", K, h(a.state.value.value.image ? `原图片：${a.state.value.value.name}` : "选择已有壁纸"), 1),
          (v(!0), f(w, null, y(o.value, (l) => (v(), f("option", {
            key: l.id,
            value: l.id,
            disabled: l.unavailable
          }, h(l.title) + " · " + h(l.kind), 9, P))), 128)),
          a.state.value.value.selection && !o.value.some((l) => l.id === a.state.value.value.selection?.sourceId) ? (v(), f("option", {
            key: 0,
            value: a.state.value.value.selection.sourceId
          }, h(a.state.value.value.name) + "（已保存）", 9, M)) : S("", !0)
        ], 40, G),
        u("label", R, [
          u("input", {
            type: "checkbox",
            checked: a.state.value.value.enabled,
            disabled: !!t.value || !a.state.value.value.image && !a.state.value.value.selection,
            onChange: (l) => b(a, l)
          }, null, 40, j),
          s[1] || (s[1] = C(" 启用", -1))
        ])
      ])), 64)),
      i.value ? (v(), f("p", q, h(i.value), 1)) : S("", !0),
      (v(!0), f(w, null, y(n.filter((a) => a.state.error.value), (a) => (v(), f("p", {
        key: a.id,
        role: "alert",
        class: "field-hint"
      }, h(a.label) + "：" + h(a.state.error.value), 1))), 128))
    ]));
  }
}), ee = /* @__PURE__ */ H(z, [["__scopeId", "data-v-abf6c4c6"]]);
export {
  ee as default
};
