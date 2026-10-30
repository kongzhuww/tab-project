import { d as B, M as N, y as I, o as C, e as V, w as E, g as t, m as T, v as O, n as M, p as D, f as A, t as S, h as w, b } from "./vendor-vue-wIH4jcna.js";
import { M as J } from "./ModuleSettingsPanel-B2LUyzyF.js";
import { y as P } from "./YouTubeCard-DviIZ00q.js";
import { g as U } from "./youtube-store-JPBm8JFw.js";
import { _ as $ } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const p = "youtubeModuleSettingsV1", j = {
  fallbackChannels: []
};
function k(l = {}) {
  const o = l && typeof l == "object" && !Array.isArray(l) ? l : {};
  return {
    preferAccount: o.preferAccount !== !1,
    fallbackChannels: Array.isArray(o.fallbackChannels) ? [...new Set(o.fallbackChannels.filter((a) => typeof a == "string" && /^UC[\w-]{22}$/.test(a)))] : [...j.fallbackChannels]
  };
}
async function Y() {
  if (typeof chrome < "u" && chrome.storage?.local) {
    const l = await chrome.storage.local.get(p);
    return k(l[p]);
  }
  try {
    return k(JSON.parse(localStorage.getItem(p) || "{}"));
  } catch {
    return k();
  }
}
async function G(l, o) {
  const a = await Y(), u = k(l);
  return o && l.preferAccount === o.preferAccount && (u.preferAccount = a.preferAccount), o && JSON.stringify(l.fallbackChannels) === JSON.stringify(o.fallbackChannels) && (u.fallbackChannels = a.fallbackChannels), typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [p]: u }) : localStorage.setItem(p, JSON.stringify(u)), u;
}
const K = { class: "yt-module-settings" }, R = ["disabled"], z = ["disabled"], F = {
  key: 1,
  role: "status"
}, L = ["disabled"], q = /* @__PURE__ */ B({
  __name: "YouTubeSettingsPanel",
  props: {
    anchor: {},
    visible: { type: Boolean, default: !0 }
  },
  emits: ["close"],
  setup(l, { emit: o }) {
    const a = l, u = o, m = b(!0), y = b(""), f = b(!1), c = b(!1), i = b("");
    let g, s = !1, v = 0;
    const d = b(!1);
    N(() => {
      s = !0, ++v;
    });
    async function h() {
      if (s || !a.visible || f.value || c.value || d.value) return;
      const r = ++v;
      d.value = !0;
      try {
        const e = await Y();
        if (s || !a.visible || r !== v) return;
        g = e, m.value = e.preferAccount, y.value = e.fallbackChannels.join(`
`), f.value = !0;
      } catch {
        !s && a.visible && r === v && (i.value = "读取设置失败，保存已禁用；请重试读取。");
      } finally {
        r === v && (d.value = !1);
      }
    }
    I(() => a.visible, (r) => {
      r ? h() : (++v, d.value = !1);
    }, { immediate: !0, flush: "sync" });
    async function x() {
      if (s || !a.visible || !f.value || c.value || !g) return;
      const r = [...new Set(y.value.split(/\s+/).filter(Boolean))];
      if (r.some((n) => !/^UC[\w-]{22}$/.test(n))) {
        i.value = "频道 ID 应以 UC 开头，共 24 位；每行一个。";
        return;
      }
      c.value = !0;
      let e = !1;
      try {
        const n = await G({ preferAccount: m.value, fallbackChannels: r }, g);
        if (e = !0, s) return;
        if (g = n, m.value = n.preferAccount, y.value = n.fallbackChannels.join(`
`), !a.visible || U.currentView !== "recommend") {
          i.value = "设置已保存；请回到推荐页点击刷新。收藏未改动。";
          return;
        }
        i.value = "已保存，正在更新推荐；收藏不会被删除。", await P.loadRecommend(!0), s || (i.value = U.error ? "设置已保存；推荐读取有错误，请查看列表提示后重试。" : "设置已保存；推荐读取可能因切走而暂停，数据状态请查看推荐页。");
      } catch {
        s || (i.value = e ? "设置已保存，但更新失败，请重试。" : "设置保存失败，请重试。");
      } finally {
        s || (c.value = !1);
      }
    }
    return (r, e) => (C(), V(J, {
      anchor: l.anchor,
      visible: l.visible,
      label: "YouTube 设置",
      onClose: e[3] || (e[3] = (n) => u("close"))
    }, {
      default: E(() => [
        t("div", K, [
          t("header", null, [
            e[4] || (e[4] = t("strong", null, "YouTube 设置", -1)),
            t("button", {
              type: "button",
              "aria-label": "关闭设置",
              onClick: e[0] || (e[0] = (n) => u("close"))
            }, "✕")
          ]),
          e[7] || (e[7] = t("p", null, "当前使用浏览器登录状态与公开 RSS，不需要额外 API Key。Google OAuth 属于共享配置，本次不迁移。", -1)),
          t("fieldset", {
            disabled: !f.value || c.value
          }, [
            t("label", null, [
              T(t("input", {
                "onUpdate:modelValue": e[1] || (e[1] = (n) => m.value = n),
                type: "checkbox"
              }, null, 512), [
                [O, m.value]
              ]),
              e[5] || (e[5] = M(" 优先使用已登录账号的推荐", -1))
            ]),
            e[6] || (e[6] = t("label", { for: "yt-fallback-channels" }, "备用推荐频道（每行一个 UC 频道 ID）", -1)),
            T(t("textarea", {
              id: "yt-fallback-channels",
              "onUpdate:modelValue": e[2] || (e[2] = (n) => y.value = n),
              rows: "6",
              spellcheck: "false"
            }, null, 512), [
              [D, y.value]
            ])
          ], 8, R),
          e[8] || (e[8] = t("small", null, "关闭账号推荐后直接使用这些频道；留空则不提供备用来源。不会导出浏览器 Cookie。", -1)),
          e[9] || (e[9] = t("p", null, "隐藏设置或切换页面会保留本页草稿；关闭整个标签页仍会丢失。", -1)),
          f.value ? w("", !0) : (C(), A("button", {
            key: 0,
            type: "button",
            disabled: d.value || !l.visible,
            onClick: h
          }, S(d.value ? "正在读取…" : "重试读取"), 9, z)),
          i.value ? (C(), A("p", F, S(i.value), 1)) : w("", !0),
          t("footer", null, [
            t("button", {
              type: "button",
              disabled: !f.value || c.value,
              onClick: x
            }, S(c.value ? "处理中…" : "保存并更新推荐"), 9, L)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), _ = /* @__PURE__ */ $(q, [["__scopeId", "data-v-c474c83c"]]);
export {
  _ as default
};
