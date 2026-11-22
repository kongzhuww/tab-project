import { d as E, o as J, f as g, g as x, h as t, t as w, p as S, v as D, L as P, j as $, b, m as B, B as I, F as T, i as H, n as G, r as M } from "./vendor-vue-_upDT3S_.js";
import { w as N, a as K, i as O, t as _, b as C, l as Y, j as q, k as Q } from "./webdav.service-BD15IxH3.js";
import { _ as X } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { r as j, g as Z, b as ee, f as te } from "./sync.service-CEGuWVnD.js";
const ae = {
  class: "vault-settings",
  "aria-label": "备份加密"
}, le = { class: "status" }, se = { class: "inputs" }, oe = ["disabled"], ne = ["disabled"], ie = { class: "vault-option" }, re = ["disabled"], de = { class: "vault-option" }, ue = ["disabled"], ve = { class: "actions" }, pe = ["disabled"], ce = ["disabled"], be = ["disabled"], fe = {
  key: 0,
  role: "status"
}, ye = /* @__PURE__ */ E({
  __name: "BackupEncryptionSettings",
  props: {
    webdavPassword: {},
    disabled: { type: Boolean }
  },
  emits: ["changed"],
  setup(k, { emit: z }) {
    const f = k, i = z, y = b(""), s = b(""), o = b(!0), p = b(!1), u = b(!0), h = b(!1), r = b(!1), v = b("");
    async function A() {
      try {
        p.value = !!await N.get(), u.value = p.value ? await K() : !0, h.value = !0;
      } catch {
        v.value = "无法读取本机口令状态，请检查浏览器存储。";
      }
    }
    async function R() {
      if (!(r.value || f.disabled || !h.value)) {
        if (y.value.length < 8) {
          v.value = "备份口令至少需要 8 个字符。";
          return;
        }
        if (y.value !== s.value) {
          v.value = "两次输入的备份口令不一致。";
          return;
        }
        if (f.webdavPassword && y.value === f.webdavPassword) {
          v.value = "备份口令需与 WebDAV 应用密码不同。";
          return;
        }
        if (!(p.value && !window.confirm("替换本机已记住的备份口令？这不会修改云端加密口令；若新口令不同，仍需原口令才能读取旧备份。"))) {
          r.value = !0, v.value = "";
          try {
            await N.remember(y.value, o.value), await O(u.value), y.value = "", s.value = "", p.value = !0, v.value = "口令已保存；云端同步时才会验证。请先手动上传或恢复一次以建立自动同步基准。", i("changed");
          } catch {
            v.value = "口令保存未确认，请检查浏览器存储后重试。";
          } finally {
            r.value = !1;
          }
        }
      }
    }
    async function V() {
      if (!(r.value || f.disabled) && window.confirm("只清除本设备记住的备份口令，不删除本机登录或云端文件。忘记口令后旧加密备份无法解密；要重新开始请使用新的备份文件名。确认吗？")) {
        r.value = !0, v.value = "";
        try {
          await O(!1), await N.forget(), u.value = !1, p.value = !1, y.value = "", s.value = "", v.value = "已忘记本机口令；现有账号和云端备份未修改。", i("changed");
        } catch {
          v.value = "清除未确认，请检查浏览器存储后重试。";
        } finally {
          r.value = !1;
        }
      }
    }
    async function U() {
      if (!(!h.value || r.value || f.disabled || !p.value)) {
        r.value = !0;
        try {
          await O(u.value), v.value = u.value ? "已开启启动时自动同步；需先手动同步建立基准。" : "已关闭自动同步。";
        } catch {
          u.value = !u.value, v.value = "自动同步设置未确认，请重试。";
        } finally {
          r.value = !1;
        }
      }
    }
    return J(() => {
      A();
    }), (L, d) => (g(), x("section", ae, [
      d[7] || (d[7] = t("strong", null, "🔐 WebDAV 备份加密", -1)),
      d[8] || (d[8] = t("p", null, "上传前在本机加密整个备份；新设备先输入相同口令。忘记口令将无法解密旧备份。", -1)),
      t("p", le, w(h.value ? p.value ? "本机已有备份口令" : "本机尚未设置备份口令" : v.value ? "口令状态不可用" : "正在读取口令状态…"), 1),
      t("div", se, [
        S(t("input", {
          "onUpdate:modelValue": d[0] || (d[0] = (m) => y.value = m),
          disabled: r.value || k.disabled,
          type: "password",
          autocomplete: "new-password",
          placeholder: "独立备份口令（至少 8 位）",
          "aria-label": "备份口令"
        }, null, 8, oe), [
          [D, y.value]
        ]),
        S(t("input", {
          "onUpdate:modelValue": d[1] || (d[1] = (m) => s.value = m),
          disabled: r.value || k.disabled,
          type: "password",
          autocomplete: "new-password",
          placeholder: "再次输入备份口令",
          "aria-label": "确认备份口令"
        }, null, 8, ne), [
          [D, s.value]
        ])
      ]),
      t("label", ie, [
        S(t("input", {
          "onUpdate:modelValue": d[2] || (d[2] = (m) => o.value = m),
          type: "checkbox",
          disabled: r.value || k.disabled
        }, null, 8, re), [
          [P, o.value]
        ]),
        d[5] || (d[5] = t("span", null, "在这台设备上记住口令（重启后仍可用）", -1))
      ]),
      t("label", de, [
        S(t("input", {
          "onUpdate:modelValue": d[3] || (d[3] = (m) => u.value = m),
          type: "checkbox",
          disabled: r.value || k.disabled || !h.value,
          onChange: U
        }, null, 40, ue), [
          [P, u.value]
        ]),
        d[6] || (d[6] = t("span", null, "启动时自动同步；出现冲突时暂停并提示", -1))
      ]),
      d[9] || (d[9] = t("small", null, "建议使用至少 12 位、且不与其他服务共用的口令。勾选后口令保存在本机扩展存储中，不是系统钥匙串；不勾选则浏览器退出后清除。口令不会上传至 WebDAV。加密备份不保护 HTTP 连接中传输的 WebDAV 登录密码，请使用 HTTPS。请先更新所有同步设备，旧版插件可能把备份以明文覆盖；云端历史版本也可能保留旧明文。提示词、文章及分类已纳入加密备份。恢复前请更新所有设备并刷新所有旧标签页；冲突时同步会暂停，请继续单独导出备份。", -1)),
      t("div", ve, [
        !h.value && v.value ? (g(), x("button", {
          key: 0,
          type: "button",
          disabled: r.value || k.disabled,
          onClick: d[4] || (d[4] = (m) => {
            v.value = "", A();
          })
        }, "重试读取", 8, pe)) : $("", !0),
        t("button", {
          type: "button",
          disabled: r.value || k.disabled || !h.value,
          onClick: R
        }, "保存 / 输入备份口令", 8, ce),
        p.value ? (g(), x("button", {
          key: 1,
          type: "button",
          disabled: r.value || k.disabled,
          onClick: V
        }, "忘记本机口令", 8, be)) : $("", !0)
      ]),
      v.value ? (g(), x("p", fe, w(v.value), 1)) : $("", !0)
    ]));
  }
}), ge = /* @__PURE__ */ X(ye, [["__scopeId", "data-v-3f49ccdc"]]), xe = { class: "field full-width" }, me = { style: { display: "flex", "flex-direction": "column", gap: "10px", background: "color-mix(in srgb, var(--panel) 92%, var(--text) 8%)", padding: "14px", "border-radius": "10px", border: "1px solid var(--border)" } }, we = { style: { display: "flex", gap: "10px", "flex-wrap": "wrap" } }, ke = { style: { flex: "1", "min-width": "180px" } }, he = { style: { flex: "1", "min-width": "180px" } }, $e = { style: { flex: "1", "min-width": "160px" } }, Se = { style: { display: "flex", gap: "8px", "flex-wrap": "wrap", "align-items": "center", "margin-top": "4px" } }, Ce = ["disabled"], De = ["disabled"], _e = { class: "webdav-more" }, Ae = { class: "webdav-more-actions" }, Ve = ["disabled"], We = ["disabled"], ze = ["disabled"], Re = ["disabled"], Ue = ["disabled"], Le = ["disabled"], Be = {
  key: 0,
  style: { "font-size": "11px", padding: "6px 10px", "border-radius": "6px", background: "var(--panel)", border: "1px solid var(--border)", color: "var(--text)" }
}, Ne = {
  key: 1,
  style: { "margin-top": "6px", padding: "12px 14px", "border-radius": "8px", background: "var(--panel)", border: "1px solid var(--border)", display: "flex", "flex-direction": "column", gap: "10px" }
}, Oe = { style: { display: "flex", "justify-content": "space-between", "align-items": "center" } }, Pe = { style: { display: "flex", "align-items": "center", gap: "6px" } }, Te = { style: { "font-size": "14px" } }, je = { style: { "font-size": "12px", color: "var(--heading)" } }, Ee = { style: { "font-size": "10px", color: "var(--muted)", background: "var(--surface)", padding: "2px 6px", "border-radius": "4px" } }, Je = {
  key: 0,
  style: { display: "flex", "flex-direction": "column", gap: "6px" }
}, Fe = { style: { margin: "0", "padding-left": "0", "list-style": "none", display: "flex", "flex-direction": "column", gap: "4px", "font-size": "11px", color: "var(--text)" } }, Ie = { style: { display: "flex", "align-items": "center", gap: "6px" } }, He = { style: { color: "var(--heading)" } }, Ge = { class: "field full-width" }, Me = { style: { display: "flex", gap: "10px", "align-items": "center", "flex-wrap": "wrap", background: "color-mix(in srgb, var(--panel) 92%, var(--text) 8%)", padding: "12px 14px", "border-radius": "10px", border: "1px solid var(--border)" } }, Ke = {
  class: "btn-secondary",
  style: { cursor: "pointer", margin: "0", display: "inline-flex", "align-items": "center" }
}, Ye = {
  key: 0,
  style: { "font-size": "11px", color: "#10b981", "font-weight": "bold" }
}, et = /* @__PURE__ */ E({
  __name: "WebDavSyncCard",
  emits: ["notify"],
  setup(k, { emit: z }) {
    const f = z, i = M({
      webdavUrl: "https://dav.jianguoyun.com/dav/LogicWeaver/",
      webdavUsername: "",
      webdavPassword: "",
      webdavFilename: "logicweaver-settings.json"
    }), y = b({ ...i }), s = b(""), o = b(!1), p = b(""), u = b(null);
    function h(a) {
      try {
        const e = Math.floor((Date.now() - new Date(a).getTime()) / 1e3);
        return e < 60 ? "刚刚" : e < 3600 ? `${Math.floor(e / 60)} 分钟前` : e < 86400 ? `${Math.floor(e / 3600)} 小时前` : `${Math.floor(e / 86400)} 天前`;
      } catch {
        return a;
      }
    }
    async function r(a = !1) {
      if (!o.value) {
        a || (o.value = !0, s.value = "正在读取云端最新修改动态…");
        try {
          const e = _(i), l = await C.download(e);
          if (l.ok && l.data) {
            const n = l.data, c = n.settings || n, W = await j(), F = Z(W, c);
            u.value = {
              deviceName: n.deviceName || (n.clientDevice === "macOS" ? "Mac" : "Windows PC"),
              clientDevice: n.clientDevice || "PC",
              exportedAt: n.exportedAt,
              timeAgo: n.exportedAt ? h(n.exportedAt) : "未知时间",
              changeSummary: F
            }, a || (s.value = `✓ 已获取云端设备动态（来自 ${u.value.deviceName}，${u.value.timeAgo}）`);
          } else a || (s.value = `✕ 读取失败: ${l.error || "云端无有效记录"}`);
        } catch (e) {
          a || (s.value = `✕ 异常: ${e.message}`);
        } finally {
          a || (o.value = !1);
        }
      }
    }
    async function v() {
      try {
        const a = await Y();
        y.value = { ...a }, Object.assign(i, a), i.webdavUrl && i.webdavUsername && i.webdavPassword && r(!0);
      } catch {
      }
    }
    async function A() {
      if (!o.value) {
        o.value = !0, s.value = "";
        try {
          await q(i, y.value), y.value = { ...i }, s.value = "✓ WebDAV 连接设置已保存", f("notify", "WebDAV 连接设置已保存");
        } catch (a) {
          s.value = `保存失败: ${a.message || "请检查URL格式"}`;
        } finally {
          o.value = !1;
        }
      }
    }
    async function R() {
      if (!o.value) {
        o.value = !0, s.value = "正在连接 WebDAV 服务器…";
        try {
          const a = _(i), e = await C.testConnection(a);
          e.ok ? (s.value = "✓ WebDAV 连接成功！服务器响应正常。", f("notify", "WebDAV 连通性测试通过！")) : s.value = `✕ 连接失败: ${e.message || "请检查服务器地址与密码"}`;
        } catch (a) {
          s.value = `✕ 测试异常: ${a.message}`;
        } finally {
          o.value = !1;
        }
      }
    }
    async function V(a = !1) {
      if (o.value || a && !confirm("当前合并按网站并集处理，无法识别旧设备上的删除操作，已删除的网站可能重新出现。请先备份两端数据；确定继续合并上传吗？")) return;
      o.value = !0, s.value = a ? "正在与云端合并并上传…" : "正在上传本地配置到云端…";
      let e = !1;
      try {
        const l = _(i);
        let n = await C.pushCurrentConfig(l, { mergeRemote: a });
        !a && !n.ok && n.missingCloudBackpack && confirm(Q(n.backpackDiff)) && (s.value = "正在按本机当前背包状态覆盖上传到云端…", n = await C.pushCurrentConfig(l, { mergeRemote: !1, allowBackpackOverwrite: !0 })), n.ok ? (s.value = a ? `✓ 已合并并上传云端（${n.byteLength || 0} 字节）；本机未自动覆盖，可选择合并云端到本地。` : `✓ 上传成功！已将当前本地配置保存至云端 (${n.byteLength || 0} 字节)`, n.baselineRecorded || (s.value += " 但两端未完全一致或服务器未提供 ETag，自动同步基准未建立；请手动核对。"), f("notify", a ? "已合并上传至云端，本机未自动覆盖。" : "已成功上传至云端备份！"), e = !0) : s.value = `✕ 上传失败: ${n.error || "请检查写入权限"}`;
      } catch (l) {
        s.value = `✕ 上传异常: ${l.message}`;
      } finally {
        o.value = !1;
      }
      e && r(!0);
    }
    async function U() {
      if (o.value || !confirm("这会读取并合并旧版明文备份，然后将同名云端文件替换为加密备份。请先在 WebDAV 保存旧文件的副本；服务器历史版本可能仍保留明文。合并无法识别旧的删除操作，已删除的网站可能重新出现。确认迁移吗？")) return;
      o.value = !0, s.value = "正在合并旧备份并加密…";
      let a = !1;
      try {
        const e = await C.pushCurrentConfig(_(i), { mergeRemote: !0, migrateLegacy: !0 });
        s.value = e.ok ? `✓ 已迁移并加密；请检查云端历史版本是否仍含明文。${e.baselineRecorded ? "" : " 两端未完全一致，自动同步基准未建立，请手动核对。"}` : `✕ 迁移失败：${e.error || "未确认上传"}`, a = e.ok;
      } catch {
        s.value = "✕ 迁移未确认，请先检查云端状态，不要重复上传。";
      } finally {
        o.value = !1;
      }
      a && r(!0);
    }
    async function L(a = !0) {
      if (o.value || !confirm(a ? "确定合并云端到本地吗？目前按并集合并，无法识别旧的删除操作，已删除的网站可能重新出现。请先备份两端数据。" : "确定用云端覆盖本地配置吗？云端包含的提示词和文章也会覆盖本地对应数据；本机已有账号连接会保留。请先备份当前数据。")) return;
      o.value = !0, s.value = a ? "正在合并云端到本地…" : "正在用云端全量覆盖本地…";
      let l = !1;
      try {
        const n = _(i), c = await C.pullCurrentConfig(n, { merge: a });
        c.ok ? (s.value = a ? "✓ 合并成功！已无损融合云端配置。请刷新页面查看。" : `✓ 覆盖成功！已还原 ${c.restoredCount || 0} 项配置。请刷新页面查看。`, c.credentialResult === "restored" && (s.value += " 历史备份凭据已恢复。"), c.credentialResult === "kept" && (s.value += " 已保留本机原有凭据。"), c.baselineRecorded || (s.value += " 两端未完全一致或服务器未提供 ETag，自动同步基准未建立；请手动核对。"), f("notify", a ? "已成功合并云端配置！" : `覆盖成功！已还原 ${c.restoredCount || 0} 项配置`), l = !0) : s.value = `✕ ${a ? "合并失败" : "覆盖失败"}: ${c.error || "未在服务器找到对应备份文件"}`;
      } catch (n) {
        s.value = `✕ 操作异常: ${n.message}`;
      } finally {
        o.value = !1;
      }
      l && r(!0);
    }
    async function d() {
      if (confirm("本地 JSON 不加密，可能包含 GitHub、Todoist 和 WebDAV 等凭据。请只保存到可信位置，不要分享。确认导出吗？"))
        try {
          const a = await j(), e = await ee(a), l = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = URL.createObjectURL(l), c = document.createElement("a");
          c.href = n, c.download = `logicweaver-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, c.click(), URL.revokeObjectURL(n), p.value = "✓ 本地备份已导出！", f("notify", "本地配置快照已成功导出");
        } catch (a) {
          p.value = `导出失败: ${a.message}`;
        }
    }
    async function m(a) {
      const e = a.target, l = e.files?.[0];
      if (l)
        try {
          const n = await l.text(), c = JSON.parse(n);
          if (!confirm(`确定导入「${l.name}」恢复配置吗？`)) return;
          const W = await te(c);
          p.value = `✓ 恢复成功！已成功还原 ${W.restoredCount || 0} 项配置。`, f("notify", `成功导入 ${W.restoredCount || 0} 项配置！建议刷新页面。`);
        } catch (n) {
          p.value = `恢复失败: ${n.message || "文件格式不匹配"}`;
        } finally {
          e.value = "";
        }
    }
    return J(() => {
      v();
    }), (a, e) => (g(), x(T, null, [
      t("div", xe, [
        e[18] || (e[18] = t("label", null, [
          B("☁️ WebDAV 多端云端漫游 "),
          t("em", null, "WEBDAV CLOUD SYNC")
        ], -1)),
        e[19] || (e[19] = t("p", {
          class: "hint",
          style: { margin: "0 0 10px" }
        }, " 支持坚果云、Nextcloud、私有 NAS 或 VPS 搭建的 WebDAV 服务。配置后可实现不同电脑间配置一键漫游同步。 ", -1)),
        t("div", me, [
          t("div", null, [
            e[10] || (e[10] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "WebDAV 服务器地址", -1)),
            S(t("input", {
              "onUpdate:modelValue": e[0] || (e[0] = (l) => i.webdavUrl = l),
              type: "url",
              placeholder: "https://dav.jianguoyun.com/dav/LogicWeaver/",
              style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
            }, null, 512), [
              [D, i.webdavUrl]
            ]),
            e[11] || (e[11] = t("small", { style: { "font-size": "10px", color: "var(--muted)", "margin-top": "2px", display: "block" } }, "坚果云用户推荐在应用管理生成应用密码，地址填写根目录或子文件夹。", -1))
          ]),
          t("div", we, [
            t("div", ke, [
              e[12] || (e[12] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "账号 / 邮箱", -1)),
              S(t("input", {
                "onUpdate:modelValue": e[1] || (e[1] = (l) => i.webdavUsername = l),
                type: "text",
                placeholder: "account@example.com",
                style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
              }, null, 512), [
                [D, i.webdavUsername]
              ])
            ]),
            t("div", he, [
              e[13] || (e[13] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "应用专用密码", -1)),
              S(t("input", {
                "onUpdate:modelValue": e[2] || (e[2] = (l) => i.webdavPassword = l),
                type: "password",
                placeholder: "••••••••••••",
                style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
              }, null, 512), [
                [D, i.webdavPassword]
              ])
            ]),
            t("div", $e, [
              e[14] || (e[14] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "备份文件名", -1)),
              S(t("input", {
                "onUpdate:modelValue": e[3] || (e[3] = (l) => i.webdavFilename = l),
                type: "text",
                placeholder: "logicweaver-settings.json",
                style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
              }, null, 512), [
                [D, i.webdavFilename]
              ])
            ])
          ]),
          I(ge, {
            "webdav-password": i.webdavPassword,
            disabled: o.value,
            onChanged: e[4] || (e[4] = () => r(!0))
          }, null, 8, ["webdav-password", "disabled"]),
          t("div", Se, [
            t("button", {
              type: "button",
              class: "btn-primary",
              disabled: o.value,
              onClick: A
            }, " 保存连接设置 ", 8, Ce),
            t("button", {
              type: "button",
              class: "btn-save-green",
              disabled: o.value,
              title: "将当前本地配置（含添加与删除）上传至云端保存",
              onClick: e[5] || (e[5] = () => V(!1))
            }, " ⬆️ 上传到云端 ", 8, De),
            t("details", _e, [
              e[15] || (e[15] = t("summary", null, "更多操作", -1)),
              t("div", Ae, [
                t("button", {
                  type: "button",
                  class: "btn-secondary",
                  disabled: o.value,
                  onClick: R
                }, "测试连接", 8, Ve),
                t("button", {
                  type: "button",
                  class: "btn-secondary",
                  disabled: o.value,
                  onClick: e[6] || (e[6] = () => r(!1))
                }, "刷新对比", 8, We),
                t("button", {
                  type: "button",
                  class: "btn-secondary",
                  disabled: o.value,
                  title: "并集合并，旧设备上的已删除网站可能重新出现",
                  onClick: e[7] || (e[7] = () => L(!0))
                }, "合并云端到本地", 8, ze),
                t("button", {
                  type: "button",
                  class: "btn-secondary",
                  disabled: o.value,
                  title: "将两端网站并集合并后上传",
                  onClick: e[8] || (e[8] = () => V(!0))
                }, "双向合并上传", 8, Re),
                t("button", {
                  type: "button",
                  class: "btn-secondary",
                  disabled: o.value,
                  title: "用云端覆盖普通配置，保留本机已有账号连接",
                  onClick: e[9] || (e[9] = () => L(!1))
                }, "用云端覆盖本地", 8, Ue),
                t("button", {
                  type: "button",
                  class: "btn-secondary",
                  disabled: o.value,
                  title: "合并当前配置并替换旧版明文备份",
                  onClick: U
                }, "迁移旧备份并加密", 8, Le)
              ])
            ])
          ]),
          s.value ? (g(), x("div", Be, w(s.value), 1)) : $("", !0),
          u.value ? (g(), x("div", Ne, [
            t("div", Oe, [
              t("div", Pe, [
                t("span", Te, w(u.value.clientDevice === "macOS" ? "💻" : "🖥️"), 1),
                t("strong", je, w(u.value.deviceName || u.value.clientDevice), 1),
                t("span", Ee, w(u.value.timeAgo), 1)
              ]),
              e[16] || (e[16] = t("span", { style: { "font-size": "10px", color: "var(--muted)" } }, "云端最新版本", -1))
            ]),
            u.value.changeSummary && u.value.changeSummary.length ? (g(), x("div", Je, [
              e[17] || (e[17] = t("span", { style: { "font-size": "10.5px", color: "var(--muted)" } }, "两端数据对比明细：", -1)),
              t("ul", Fe, [
                (g(!0), x(T, null, H(u.value.changeSummary, (l, n) => (g(), x("li", {
                  key: n,
                  style: { display: "flex", "align-items": "center", "justify-content": "space-between", gap: "8px", padding: "4px 8px", background: "var(--surface)", "border-radius": "6px" }
                }, [
                  t("div", Ie, [
                    t("strong", He, "[" + w(l.categoryLabel) + "]", 1),
                    t("span", null, w(l.text), 1)
                  ]),
                  l.badge ? (g(), x("span", {
                    key: 0,
                    style: G({
                      fontSize: "10px",
                      fontWeight: "700",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      whiteSpace: "nowrap",
                      fontFamily: "monospace",
                      backgroundColor: l.badge.type === "plus" ? "rgba(16, 185, 129, 0.15)" : l.badge.type === "minus" ? "rgba(239, 68, 68, 0.15)" : "rgba(59, 130, 246, 0.15)",
                      color: l.badge.type === "plus" ? "#10b981" : l.badge.type === "minus" ? "#ef4444" : "#3b82f6",
                      border: `1px solid ${l.badge.type === "plus" ? "rgba(16, 185, 129, 0.3)" : l.badge.type === "minus" ? "rgba(239, 68, 68, 0.3)" : "rgba(59, 130, 246, 0.3)"}`
                    })
                  }, w(l.badge.text), 5)) : $("", !0)
                ]))), 128))
              ])
            ])) : $("", !0)
          ])) : $("", !0)
        ])
      ]),
      t("div", Ge, [
        e[22] || (e[22] = t("label", null, [
          B("📦 本地数据快照文件 "),
          t("em", null, "LOCAL BACKUP & RESTORE")
        ], -1)),
        t("div", Me, [
          t("button", {
            type: "button",
            class: "btn-secondary",
            onClick: d
          }, " 💾 导出配置为本地 JSON "),
          t("label", Ke, [
            e[20] || (e[20] = B(" 📂 导入本地 JSON 恢复 ", -1)),
            t("input", {
              type: "file",
              accept: ".json,application/json",
              style: { display: "none" },
              onChange: m
            }, null, 32)
          ]),
          p.value ? (g(), x("span", Ye, w(p.value), 1)) : $("", !0),
          e[21] || (e[21] = t("small", { style: { "flex-basis": "100%", color: "var(--muted)", "font-size": "10.5px", "margin-top": "2px" } }, " 本地 JSON 导出没有加密，可能包含提示词、文章及 GitHub、Todoist、WebDAV 等凭据；请勿上传或分享。 ", -1))
        ])
      ])
    ], 64));
  }
});
export {
  et as default
};
