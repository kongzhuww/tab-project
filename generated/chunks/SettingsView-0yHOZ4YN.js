import { b as u, x as Ke, y as ro, d as Wo, G as Do, C as Io, o as i, e as r, f as t, i as at, g as C, F as j, h as J, B as ce, t as p, m as k, u as l, l as a, z as Ee, p as ge, v as _, A as dt, n as P, H as Yt, k as Kt, P as Oo, c as Mo, E as jo, s as ve, r as pt } from "./vendor-vue-CjOHdfe5.js";
import { o as Je, D as kt, i as Ct, L as St, a as ae, S as $e, b as fe, G as Tt } from "./options.service-DphW8DsG.js";
import { e as _o, i as Jt, D as zt, g as Xt, W as B } from "./view-styles-CHa87-Dj.js";
import { s as de } from "./store-C4EO6cWS.js";
import { a2 as Zt, a3 as ut, a4 as Bo, a5 as No, a6 as Fo, a7 as Go, a8 as Ho, a9 as Qt, m as eo, aa as to, ab as oo, ac as Ye, F as so } from "./search.service-lHw6yJW3.js";
import { s as no, m as Et, a as $t, p as qo, A as Yo } from "./read-session-C1M3QoXl.js";
import { w as Lt } from "./webdav.service-BlfwrB2s.js";
import { r as Ko, c as Jo, a as Xo } from "./sync.service-DTh6oAhK.js";
import { loadWebDavSettings as Zo, saveWebDavSettings as Qo, toWebDavConfig as At } from "./settings-IMXKhcVf.js";
const es = '.settings-view-root.settings-view-root{display:flex;flex-direction:column;height:100%;width:100%;overflow:hidden;background:var(--background);color:var(--text);font-family:inherit;position:relative}.settings-view-root.settings-view-root button{box-sizing:border-box;font-family:inherit}.settings-view-root .settings-view-shell{position:relative;display:grid;grid-template-columns:220px minmax(0,1fr);height:100%;overflow:hidden}.settings-view-root .settings-fields{display:contents}.settings-view-root .settings-brand,.settings-view-root .settings-hero{touch-action:none}.settings-view-root .settings-view-nav{width:220px;flex-shrink:0;display:flex;flex-direction:column;padding:24px 14px 16px;background:color-mix(in srgb,var(--panel) 85%,transparent);border-right:1px solid var(--border);overflow-y:auto}.settings-view-root .settings-brand{display:flex;align-items:center;gap:10px;margin-bottom:24px;cursor:grab;user-select:none}.settings-view-root .settings-brand-mark{display:grid;width:34px;height:34px;flex:none;place-items:center;border:1px solid rgba(56,189,248,.35);border-radius:10px;background:linear-gradient(145deg,#38bdf82e,#34d39914);color:#7dd3fc;font-size:14px;font-weight:850}.settings-view-root .settings-brand strong{display:block;font-size:13px;letter-spacing:.03em;color:var(--heading);white-space:nowrap}.settings-view-root .settings-brand small{display:block;font-size:8px;color:var(--dim);letter-spacing:.11em;white-space:nowrap}.settings-view-root .settings-nav-label{margin:0 6px 8px;color:var(--dim);font-size:9px;font-weight:800;letter-spacing:.16em;white-space:nowrap}.settings-view-root .settings-nav-links{display:flex;flex-direction:column;gap:5px}.settings-view-root .nav-tab-btn{width:100%!important;min-width:0!important;height:38px!important;display:flex!important;align-items:center!important;gap:10px!important;padding:0 12px!important;border:1px solid transparent;border-radius:9px;background:transparent;color:var(--muted);font-size:11.5px;font-weight:600;cursor:pointer;text-align:left;white-space:nowrap!important;transition:all .16s ease;user-select:none}.settings-view-root .nav-tab-btn span{display:grid;width:22px;height:22px;flex:none;place-items:center;border-radius:6px;background:var(--surface);font-size:10px}.settings-view-root .nav-tab-btn:hover{background:var(--surface-hover);color:var(--heading);transform:translate(2px)}.settings-view-root .nav-tab-btn.active{border-color:#38bdf859;background:#38bdf81f;color:#38bdf8}.settings-view-root .nav-tab-btn.active span{background:#38bdf8;color:#04151a;font-weight:800}.settings-view-root .settings-nav-dev-card{margin-top:auto;padding:12px 10px;border-radius:10px;border:1px dashed rgba(56,189,248,.35);background:#38bdf80d;display:flex;flex-direction:column;gap:6px}.settings-view-root .btn-nav-dev-preview{width:100%;padding:7px 10px;border-radius:7px;border:1px solid rgba(56,189,248,.45);background:#38bdf81f;color:#0284c7;font-size:11px;font-weight:700;cursor:pointer;transition:all .14s ease;text-align:center}.settings-view-root .btn-nav-dev-preview.primary{background:linear-gradient(135deg,#38bdf840,#0ea5e959);border-color:#38bdf8;color:#0284c7}.settings-view-root .btn-nav-dev-preview.primary:hover:not(:disabled){background:#0284c7;color:#fff;transform:translateY(-1px)}.settings-view-root .btn-nav-dev-preview.secondary{background:transparent;border-color:#94a3b84d;color:var(--muted);font-size:10px}.settings-view-root .btn-nav-dev-preview.secondary:hover{background:#94a3b826;color:var(--text)}html[data-theme=dark] .settings-view-root .btn-nav-dev-preview.primary,html[data-theme=endfield] .settings-view-root .btn-nav-dev-preview.primary{color:#38bdf8;background:linear-gradient(135deg,#38bdf833,#0ea5e940)}html[data-theme=dark] .settings-view-root .btn-nav-dev-preview.primary:hover:not(:disabled),html[data-theme=endfield] .settings-view-root .btn-nav-dev-preview.primary:hover:not(:disabled){background:#38bdf8;color:#04151a}html[data-theme=dark] .settings-view-root .btn-nav-dev-preview,html[data-theme=endfield] .settings-view-root .btn-nav-dev-preview{color:#38bdf8;background:#38bdf82e}.settings-view-root .btn-nav-dev-preview:hover{background:#38bdf8;color:#fff;transform:translateY(-1px)}.settings-view-root .btn-nav-dev-preview.active{background:#10b981;border-color:#10b981;color:#fff}.settings-view-root .settings-nav-dev-card p{margin:0;font-size:9.5px;color:var(--muted);line-height:1.45}.settings-view-root .settings-local-note{margin-top:auto;padding:10px;border:1px solid rgba(52,211,153,.2);border-radius:8px;background:#34d3990d;color:var(--muted);font-size:9px;line-height:1.5}.settings-view-root .settings-local-note b{display:block;margin-bottom:2px;color:#6ee7b7}.settings-view-root .settings-view-main{padding:28px 36px 90px;overflow-y:auto}.settings-view-root .settings-hero{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:22px;padding-right:88px;cursor:grab;user-select:none}.settings-view-root .settings-window-actions{position:absolute;top:24px;right:32px;z-index:90;display:flex;align-items:center;gap:8px;flex-shrink:0;user-select:none}.settings-view-root .settings-win-btn{border:1px solid var(--border);background:var(--surface);color:var(--muted);border-radius:9px;width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;transition:all .16s ease}.settings-view-root .settings-win-btn:hover{background:var(--surface-hover);color:var(--heading);border-color:var(--border-hover)}.settings-view-root .settings-win-btn.close:hover{background:#ef44442e;color:#ef4444;border-color:#ef444466}.settings-view-root .settings-kicker{margin:0 0 6px;color:#38bdf8;font-size:9px;font-weight:850;letter-spacing:.17em}.settings-view-root .settings-hero h1{margin:0;font-size:24px;color:var(--heading)}.settings-view-root .settings-hero p{margin:6px 0 0;color:var(--muted);font-size:11px;max-width:600px}.settings-view-root .settings-panel{padding:18px 20px;border:1px solid var(--border);border-radius:14px;background:color-mix(in srgb,var(--panel) 75%,transparent)}.settings-view-root .settings-subgroup{margin-top:16px;padding:16px 18px;border:1px solid var(--border);border-radius:14px;background:color-mix(in srgb,var(--surface) 50%,transparent)}.settings-view-root .settings-subgroup:first-of-type{margin-top:8px}.settings-view-root .settings-subgroup-title{display:flex;align-items:center;gap:8px;margin:0 0 12px;font-size:13.5px;font-weight:700;color:var(--heading)}.settings-view-root .settings-subgroup-title small{font-size:10.5px;font-weight:400;color:var(--muted);text-transform:uppercase}.settings-view-root .panel-head{display:flex!important;align-items:flex-start!important;justify-content:flex-start!important;gap:12px!important;margin-bottom:16px!important;padding:0!important;border-bottom:none!important;cursor:default!important;touch-action:auto!important;user-select:auto!important}.settings-view-root .panel-index{display:grid;width:28px;height:28px;place-items:center;border:1px solid rgba(56,189,248,.25);border-radius:8px;background:#38bdf814;color:#7dd3fc;font-size:9px;font-weight:850}.settings-view-root .panel-head h2{margin:0;font-size:14px;color:var(--heading)}.settings-view-root .panel-head p{margin:3px 0 0;font-size:9px;color:var(--dim)}.settings-view-root .module-toggles{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:9px}.settings-view-root .toggle-card{position:relative;display:flex;min-height:60px;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);cursor:pointer;transition:all .15s ease}.settings-view-root .toggle-card:hover{background:var(--surface-hover);border-color:#ffffff26}.settings-view-root .toggle-card input{position:absolute;opacity:0}.settings-view-root .toggle-copy b{display:block;font-size:11px;color:var(--heading)}.settings-view-root .toggle-copy small{display:block;font-size:8.5px;color:var(--dim);margin-top:2px}.settings-view-root .switch{position:relative;width:36px;height:20px;border-radius:999px;background:#cbd5e1;border:1px solid rgba(0,0,0,.12);transition:.2s ease;flex-shrink:0}html[data-theme=dark] .settings-view-root .switch,html[data-theme=endfield] .settings-view-root .switch{background:#fff3;border-color:#ffffff29}.settings-view-root .switch:after{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 3px #00000040;content:"";transition:.2s ease}.settings-view-root .toggle-card input:checked+.switch{background:#10b981;border-color:#059669}.settings-view-root .toggle-card input:checked+.switch:after{left:18px;background:#fff;box-shadow:0 1px 4px #0000004d}.settings-view-root .btn-save-green{display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 20px;border-radius:8px;border:1px solid #059669;background:#10b981;color:#fff;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 2px 8px #10b98152;transition:all .15s ease}.settings-view-root .btn-save-green:hover{background:#059669;border-color:#047857;box-shadow:0 4px 14px #10b9816b;transform:translateY(-1px)}.settings-view-root .btn-save-green:active{transform:translateY(0)}.settings-view-root .fields-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.settings-view-root .field{padding:12px;border:1px solid var(--border);border-radius:10px;background:var(--surface)}.settings-view-root .field.full-width{grid-column:1 / -1}.settings-view-root .field label{display:flex;align-items:center;justify-content:space-between;margin-bottom:7px;font-size:10px;font-weight:700;color:var(--heading)}.settings-view-root .field label em{font-style:normal;font-size:7.5px;color:#c4b5fd;background:#a78bfa1a;padding:2px 6px;border-radius:999px}.settings-view-root .field input[type=text],.settings-view-root .field input[type=password],.settings-view-root .field input[type=url],.settings-view-root .field input[type=email],.settings-view-root .field select{width:100%;min-height:36px;padding:8px 10px;border:1px solid var(--border);border-radius:8px;background:color-mix(in srgb,var(--panel) 90%,transparent);color:var(--text);font-size:11px;outline:none;transition:border-color .15s ease}.settings-view-root .field input:focus,.settings-view-root .field select:focus{border-color:#38bdf8;box-shadow:0 0 0 2px #38bdf826}.settings-view-root .color-picker{width:44px;height:36px;padding:2px;cursor:pointer;border-radius:8px;border:1px solid var(--border);background:transparent}.settings-view-root .hint{margin:6px 1px 0;font-size:8px;color:var(--dim);line-height:1.5}.settings-view-root .btn-primary{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:auto!important;height:auto!important;min-height:36px!important;padding:8px 16px!important;border:none;border-radius:8px;background:linear-gradient(135deg,#38bdf8,#34d399);color:#04151a;font-size:11px;font-weight:800;cursor:pointer;white-space:nowrap!important;transition:all .16s ease}.settings-view-root .btn-primary:hover{filter:brightness(1.1);transform:translateY(-1px)}.settings-view-root .btn-secondary{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:auto!important;height:auto!important;min-height:36px!important;padding:8px 14px!important;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap!important;transition:all .16s ease}.settings-view-root .btn-secondary:hover{border-color:#ffffff40;background:var(--surface-hover)}.settings-view-root .btn-secondary:disabled,.settings-view-root .btn-primary:disabled{opacity:.5;cursor:not-allowed}.settings-view-root .icon-btn-danger{width:24px;height:24px;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--dim);cursor:pointer;transition:all .15s ease}.settings-view-root .icon-btn-danger:hover{border-color:#ef4444;color:#ef4444;background:#ef444414}.settings-view-root .shortcut-group+.shortcut-group{margin-top:18px}.settings-view-root .shortcut-group-title{margin:0 0 8px;font-size:12px;font-weight:600;color:var(--heading)}.settings-view-root .shortcut-label{min-width:0;overflow-wrap:anywhere}.settings-view-root .shortcut-actions{flex-shrink:0}.settings-view-root .shortcuts-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.settings-view-root .shortcut-row{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface)}.settings-view-root .shortcut-label{font-size:11px;font-weight:600;color:var(--heading)}.settings-view-root .shortcut-actions{display:flex;align-items:center;gap:6px}.settings-view-root .shortcut-key-btn{min-width:86px;padding:4px 10px;font-size:10.5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:600;border:1px solid var(--border);border-radius:6px;background:#ffffff0f;color:var(--text);cursor:pointer;transition:all .15s ease}.settings-view-root .shortcut-key-btn.recording{border-color:#a855f7;background:#a855f729;color:#c084fc}.settings-view-root .shortcut-clear-btn{width:22px;height:22px;border-radius:5px;border:1px solid var(--border);background:transparent;color:var(--dim);cursor:pointer;font-size:10px}.settings-view-root .shortcut-clear-btn:hover{border-color:#ef4444;color:#ef4444}.settings-view-root .fixed-shortcuts-card{padding:12px 14px;border:1px solid var(--border);border-radius:10px;background:var(--surface)}.settings-view-root .fixed-shortcuts-head{font-size:11px;font-weight:700;color:var(--heading);margin-bottom:10px}.settings-view-root .fixed-shortcuts-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.settings-view-root .fixed-row{display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;background:#ffffff08;border:1px solid rgba(255,255,255,.06);font-size:10.5px}.settings-view-root .fs-keys kbd{padding:2px 5px;border:1px solid rgba(255,255,255,.15);border-radius:4px;background:#ffffff14;font-size:9.5px;font-family:ui-monospace,SFMono-Regular,monospace}.settings-view-root .ignored-folders-list{display:flex;flex-direction:column;gap:6px}.settings-view-root .ignored-folder-row{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface)}.settings-view-root .folder-path{font-size:11px;color:var(--heading)}.settings-view-root .sync-banner{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;background:#38bdf80f;border:1px solid rgba(56,189,248,.2);border-radius:10px;flex-wrap:wrap}.settings-view-root .update-log-box{margin-top:8px;padding:8px 12px;border-radius:6px;background:var(--surface);font-size:10px;color:var(--muted);line-height:1.5}.settings-view-root .release-card{margin-top:10px;padding:12px 14px;background:var(--surface);border:1px solid var(--border);border-radius:10px;display:flex;flex-direction:column;gap:8px}.settings-view-root .release-header{display:flex;align-items:center;justify-content:space-between;gap:8px}.settings-view-root .release-tag{font-weight:700;font-size:13px;color:var(--accent, #10b981)}.settings-view-root .release-notes{font-size:11px;color:var(--text);line-height:1.5;max-height:120px;overflow-y:auto;white-space:pre-wrap;background:var(--panel);padding:8px 10px;border-radius:6px;border:1px solid var(--border)}.settings-view-root .download-progress-box{margin-top:8px;display:flex;flex-direction:column;gap:6px}.settings-view-root .download-progress-label{display:flex;justify-content:space-between;font-size:11px;color:var(--muted)}.settings-view-root .download-progress-track{width:100%;height:8px;border-radius:4px;background:var(--panel);border:1px solid var(--border);overflow:hidden}.settings-view-root .download-progress-bar{height:100%;background:linear-gradient(90deg,#3b82f6,#10b981);border-radius:4px;transition:width .15s ease}.settings-view-root .download-finish-card{margin-top:8px;padding:10px 12px;border-radius:8px;background:#10b98114;border:1px solid rgba(16,185,129,.25);display:flex;flex-direction:column;gap:6px;font-size:12px;color:var(--heading)}.settings-view-root .github-token-box{margin-top:10px;padding:10px 12px;border-radius:8px;background:var(--surface);border:1px solid var(--border);display:flex;flex-direction:column;gap:6px}.settings-view-root .save-dock{position:absolute;right:28px;bottom:16px;display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px solid var(--border);border-radius:12px;background:color-mix(in srgb,var(--panel) 92%,transparent);box-shadow:0 16px 36px -12px #000c;z-index:10}.settings-view-root .save-status-msg{font-size:10px;font-weight:700;color:#34d399}.settings-view-root .save-status-msg.error{color:#fb7185}.settings-view-root .text-success{color:#34d399}.settings-view-root .text-danger{color:#fb7185}.settings-view-root .search-slots-list{display:flex;flex-direction:column;gap:8px;margin-top:6px}.settings-view-root .search-slot-row{display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);transition:all .16s ease}.settings-view-root .search-slot-row:hover{background:var(--surface-hover, var(--surface));border-color:var(--border-strong, var(--border))}.settings-view-root .search-slot-row.disabled{opacity:.55}.settings-view-root .search-slot-order{display:flex;flex-direction:column;gap:2px}.settings-view-root .btn-slot-move{width:18px;height:14px;padding:0;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);border-radius:3px;background:var(--panel);color:var(--muted);font-size:8px;cursor:pointer;line-height:1;transition:all .12s}.settings-view-root .btn-slot-move:hover:not(:disabled){border-color:#38bdf8;color:#38bdf8;background:#38bdf81a}.settings-view-root .btn-slot-move:disabled{opacity:.3;cursor:not-allowed}.settings-view-root .search-slot-badge-preview{width:32px;height:32px;border-radius:8px;border:1.5px solid;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}.settings-view-root .search-slot-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.settings-view-root .search-slot-title-row{display:flex;align-items:center;gap:6px}.settings-view-root .search-slot-name{font-size:13px;font-weight:650;color:var(--heading)}.settings-view-root .search-slot-tag{font-size:9.5px;padding:1px 5px;border-radius:4px;font-weight:600;line-height:1.2}.settings-view-root .search-slot-tag.builtin{background:#38bdf81f;color:#0284c7;border:1px solid rgba(56,189,248,.25)}.settings-view-root .search-slot-tag.custom{background:#10b9811f;color:#059669;border:1px solid rgba(16,185,129,.25)}.settings-view-root .search-slot-url{font-size:11px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.settings-view-root .search-slot-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.settings-view-root .btn-slot-del{width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--muted);font-size:12px;cursor:pointer;transition:all .14s}.settings-view-root .btn-slot-del:hover{background:#f43f5e1f;border-color:#f43f5e;color:#f43f5e}.settings-view-root .slot-switch-label{position:relative;display:inline-flex;align-items:center;cursor:pointer;user-select:none;flex-shrink:0;width:36px;height:20px}.settings-view-root .slot-switch-label input{position:absolute;inset:0;width:100%;height:100%;opacity:0;margin:0;cursor:pointer;z-index:2}.settings-view-root .slot-switch-label .switch{pointer-events:none}.settings-view-root .slot-switch-label input:checked+.switch{background:#10b981!important;border-color:#10b981!important}.settings-view-root .slot-switch-label input:checked+.switch:after{transform:translate(16px)!important;background:#fff!important}.settings-view-root .search-slot-add-drawer{margin-top:12px;padding:14px 16px;border:1px solid var(--border);border-radius:12px;background:var(--surface);display:flex;flex-direction:column;gap:12px;animation:slotDrawerSlide .15s ease-out}@keyframes slotDrawerSlide{0%{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}.settings-view-root .drawer-header{display:flex;flex-direction:column;gap:2px}.settings-view-root .drawer-header strong{font-size:13px;color:var(--heading)}.settings-view-root .drawer-header small{font-size:11px;color:var(--muted)}.settings-view-root .template-chips-section{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.settings-view-root .chips-label{font-size:11px;color:var(--muted);font-weight:600}.settings-view-root .template-chips{display:flex;flex-wrap:wrap;gap:6px}.settings-view-root .template-chip-btn{display:inline-flex;align-items:center;gap:4px;padding:4px 9px;border-radius:6px;border:1px solid var(--border);background:var(--panel);color:var(--text);font-size:11px;font-weight:550;cursor:pointer;transition:all .12s}.settings-view-root .template-chip-btn:hover{border-color:#38bdf8;background:#38bdf814;color:#0284c7;transform:translateY(-1px)}.settings-view-root .slot-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.settings-view-root .slot-form-field{display:flex;flex-direction:column;gap:4px}.settings-view-root .slot-form-field.full-width{grid-column:1 / -1}.settings-view-root .slot-form-field label{font-size:11.5px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:4px}.settings-view-root .slot-form-field label em{font-style:normal;font-size:9.5px;color:var(--muted)}.settings-view-root .slot-form-field input[type=text]{width:100%;box-sizing:border-box;padding:7px 10px;border:1px solid var(--border);border-radius:7px;background:var(--panel);color:var(--text);font-size:12px;outline:none;transition:border-color .14s}.settings-view-root .slot-form-field input[type=text]:focus{border-color:#38bdf8}.settings-view-root .field-hint{margin:3px 0 0;font-size:10.5px;color:var(--muted)}.settings-view-root .field-hint code{background:#38bdf81f;color:#0284c7;padding:1px 4px;border-radius:4px}.settings-view-root .quick-emojis{display:flex;align-items:center;gap:4px;flex-wrap:wrap}.settings-view-root .quick-emo-item{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:4px;cursor:pointer;font-size:14px;transition:transform .1s}.settings-view-root .quick-emo-item:hover{transform:scale(1.2);background:#38bdf826}.settings-view-root .quick-color-palette{display:flex;align-items:center;gap:6px}.settings-view-root .palette-dot{width:20px;height:20px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:all .12s}.settings-view-root .palette-dot:hover{transform:scale(1.15)}.settings-view-root .palette-dot.active{border-color:var(--heading);transform:scale(1.15)}.settings-view-root .slot-form-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:4px}.settings-view-root .btn-ghost-small{border:0;background:transparent;color:var(--muted);cursor:pointer;padding:4px 8px;border-radius:6px;transition:all .12s}.settings-view-root .btn-ghost-small:hover{color:#38bdf8;background:#38bdf814}@media(max-width:800px){.settings-view-root .settings-view-shell{grid-template-columns:1fr}.settings-view-root .settings-view-nav{flex-direction:row;overflow-x:auto;border-right:none;border-bottom:1px solid var(--border);padding:10px 14px}.settings-view-root .settings-brand,.settings-view-root .settings-nav-label,.settings-view-root .settings-local-note{display:none}.settings-view-root .settings-nav-links{flex-direction:row}.settings-view-root .nav-tab-btn{white-space:nowrap}.settings-view-root .fields-grid,.settings-view-root .shortcuts-grid,.settings-view-root .fixed-shortcuts-grid{grid-template-columns:1fr}.settings-view-root .save-dock{left:16px;right:16px;justify-content:flex-end}}.settings-view-root .wallpaper-presets-grid,.settings-view-root .wallpaper-library-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:10px}.settings-view-root .wallpaper-item-card{position:relative;border-radius:10px;border:1px solid var(--border);background:var(--panel);overflow:hidden;cursor:pointer;transition:all .2s cubic-bezier(.16,1,.3,1);display:flex;flex-direction:column}.settings-view-root .wallpaper-item-card:hover{border-color:#38bdf8;transform:translateY(-2px);box-shadow:0 4px 12px #00000014}.settings-view-root .wallpaper-item-card.is-active{border-color:#38bdf8;box-shadow:0 0 0 2px #38bdf859}.settings-view-root .wallpaper-card-preview{position:relative;width:100%;aspect-ratio:16 / 9;background-size:cover;background-position:center;background-repeat:no-repeat;display:flex;align-items:center;justify-content:center;overflow:hidden;background-color:color-mix(in srgb,var(--panel) 85%,var(--text) 15%)}.settings-view-root .wallpaper-card-preview img,.settings-view-root .wallpaper-card-preview video{width:100%;height:100%;object-fit:cover}.settings-view-root .wallpaper-card-badge{position:absolute;top:6px;left:6px;padding:2px 6px;border-radius:4px;background:#000000a6;color:#fff;font-size:10px;font-weight:600;backdrop-filter:blur(4px)}.settings-view-root .wallpaper-card-active-pill{position:absolute;bottom:6px;right:6px;padding:2px 7px;border-radius:4px;background:#0284c7;color:#fff;font-size:10px;font-weight:600;box-shadow:0 2px 4px #00000040}.settings-view-root .wallpaper-card-delete-btn{position:absolute;top:6px;right:6px;width:22px;height:22px;border-radius:50%;border:none;background:#ef4444d9;color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:all .15s ease}.settings-view-root .wallpaper-item-card:hover .wallpaper-card-delete-btn{opacity:1}.settings-view-root .wallpaper-card-meta{padding:8px 10px;display:flex;align-items:center;justify-content:space-between;gap:6px;background:var(--surface);border-top:1px solid var(--border)}.settings-view-root .wallpaper-card-title{font-size:11.5px;font-weight:500;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}.settings-view-root .wallpaper-card-edit-btn{border:none;background:transparent;cursor:pointer;font-size:11px;color:var(--muted);padding:2px;border-radius:4px;opacity:.6}.settings-view-root .wallpaper-card-edit-btn:hover{opacity:1;color:#38bdf8}', io = "https://api.github.com/repos/kongzhuww/tab-project-next/releases";
function Xe(L) {
  return L !== null && typeof L == "object" ? L : {};
}
function ts(L) {
  const S = Xe(L);
  if (typeof S.tag_name != "string" || !/^v?\d+(?:\.\d+){1,3}$/i.test(S.tag_name))
    throw new Error("发行版版本号无效，无法比较更新");
  const A = [];
  for (const F of Array.isArray(S.assets) ? S.assets : []) {
    const g = Xe(F);
    if (typeof g.id != "number" || !Number.isSafeInteger(g.id) || g.id <= 0 || typeof g.name != "string" || !/^[\w.() -]+\.zip$/i.test(g.name) || typeof g.size != "number" || !Number.isSafeInteger(g.size) || g.size < 0) continue;
    let m;
    try {
      m = new URL(String(g.browser_download_url));
    } catch {
      continue;
    }
    m.origin !== "https://github.com" || m.username || m.password || !m.pathname.startsWith("/kongzhuww/tab-project-next/releases/download/") || A.push({ id: g.id, name: g.name, size: g.size, browser_download_url: m.href });
  }
  return {
    tag_name: S.tag_name,
    name: typeof S.name == "string" ? S.name : "",
    body: typeof S.body == "string" ? S.body : "",
    assets: A
  };
}
function os(L, S) {
  const A = (m) => {
    if (!/^v?\d+(?:\.\d+){1,3}$/i.test(m)) throw new Error("版本号格式无效");
    return m.replace(/^v/i, "").split(".").map(Number);
  }, F = A(L), g = A(S);
  for (let m = 0; m < Math.max(F.length, g.length); m++) {
    const G = (F[m] || 0) - (g[m] || 0);
    if (G) return Math.sign(G);
  }
  return 0;
}
function ss(L) {
  return L.assets.find((S) => /-extension\.zip$/i.test(S.name));
}
const N = globalThis.chrome, Ut = (L) => L instanceof Error ? L.message : "操作失败";
function ns(L, S = () => !0) {
  const A = u(!1), F = u(`LogicWeaver 当前版本: v${N?.runtime?.getManifest().version || "未知"}`), g = u("本地构建版本"), m = u(!1), G = u(!1), I = u(""), De = u(null), U = u(null), H = u(!1), T = u(0), z = u(""), q = u(!1), Q = u(""), Ze = u(!1);
  let O = !0, be = 0, Le = 0, xe = 0, we = !1, Ie;
  const me = /* @__PURE__ */ new Set();
  function he(h) {
    const v = new AbortController();
    me.add(v);
    const c = setTimeout(() => v.abort(), h);
    return { signal: v.signal, finish: () => {
      clearTimeout(c), me.delete(v);
    } };
  }
  function D(h = !1) {
    const v = { Accept: h ? "application/octet-stream" : "application/vnd.github+json" }, c = Q.value.trim();
    return c && (v.Authorization = `Bearer ${c}`), v;
  }
  async function Oe() {
    const h = ++Le;
    let v = "";
    const c = he(1e4);
    try {
      if (N?.runtime) {
        const y = await fetch(N.runtime.getURL("manifest.json") + "?t=" + Date.now(), { signal: c.signal }), M = y.ok ? Xe(await y.json()) : {};
        typeof M.version == "string" && (v = M.version);
      }
    } catch {
    } finally {
      c.finish();
    }
    const E = N?.runtime?.getManifest().version || v, V = v || E;
    return O && S() && h === Le && (A.value = !!(v && E && v !== E), F.value = A.value ? `LogicWeaver 当前版本: v${E} (磁盘最新: v${v})` : `LogicWeaver 当前版本: ${V ? "v" + V : "未知"}`, g.value = A.value ? "本地文件已更新，点击右侧「立即重新载入」生效" : "本地构建版本"), V;
  }
  async function ct() {
    const h = Q.value;
    try {
      const v = N?.storage?.local ? await N.storage.local.get(["ghToken"]) : { ghToken: localStorage.getItem("ghToken") };
      O && Q.value === h && typeof v.ghToken == "string" && (Q.value = v.ghToken);
    } catch {
    }
  }
  async function Me() {
    try {
      const h = Q.value.trim();
      if (N?.storage?.local ? await N.storage.local.set({ ghToken: h }) : localStorage.setItem("ghToken", h), !O) return;
      L("GitHub Token 已保存，正在重新检测更新…"), await d();
    } catch {
      O && L("Token 保存失败，请重试。", !0);
    }
  }
  async function d() {
    if (!O || !S() || we || m.value || H.value) return;
    const h = ++be, v = () => O && S() && h === be;
    m.value = !0, G.value = !1, I.value = "", De.value = null, U.value = null, T.value = 0, q.value = !1;
    const c = he(3e4);
    try {
      const E = await Oe();
      if (!v()) return;
      Je.callNativeHost({ command: "git-check-update" }).then((M) => {
        const R = Xe(M);
        !v() || R.ok !== !0 || typeof R.localCommit != "string" || (A.value || (g.value = `本地 Commit: ${R.localCommit}${typeof R.commitDesc == "string" ? " (" + R.commitDesc + ")" : ""}`), G.value = R.hasUpdate === !0 && Number(R.behindCount) > 0);
      }).catch(() => {
      });
      const V = await fetch(`${io}/latest`, { headers: D(), signal: c.signal });
      if (!v()) return;
      if (!V.ok) {
        V.status === 401 || V.status === 404 ? (Ze.value = !0, I.value = "未能读取发行版，可能未发布或需要仓库访问权限；请核对 Token 后重试。") : I.value = `GitHub API 返回异常状态 (${V.status})`;
        return;
      }
      const y = ts(await V.json());
      if (!v()) return;
      if (os(y.tag_name, E) > 0) {
        const M = ss(y);
        if (!M) {
          I.value = `发现 ${y.tag_name}，但尚无可下载的扩展安装包。`;
          return;
        }
        De.value = y, U.value = M, I.value = `发现新版本 ${y.tag_name}！包含最新功能与优化。`;
      } else I.value = `✓ 当前已是最新版本 (v${E})，暂无新更新。`;
    } catch (E) {
      v() && (I.value = `检查失败：${Ut(E)}`);
    } finally {
      c.finish(), v() && (m.value = !1);
    }
  }
  async function b() {
    const h = U.value;
    if (!O || !S() || !h || H.value || m.value || we) return;
    const v = xe, c = () => O && S() && v === xe;
    H.value = !0, T.value = 0, z.value = "正在连接 GitHub 下载数据流…", q.value = !1;
    const E = he(3e5);
    let V;
    try {
      const y = await fetch(`${io}/assets/${h.id}`, { headers: D(!0), signal: E.signal });
      if (!y.ok) throw new Error(`下载失败 (HTTP ${y.status})，请核对权限后重试`);
      const M = 256 * 1024 * 1024, R = Number(y.headers.get("Content-Length")) || h.size;
      if (R > M) throw new Error("安装包超过 256 MB，请通过发行版页面手动下载");
      const X = y.body?.getReader();
      if (!X) throw new Error("浏览器不支持数据流读取");
      const Qe = [];
      let ke = 0;
      try {
        for (; ; ) {
          const { done: te, value: je } = await X.read();
          if (te) break;
          if (ke += je.byteLength, ke > M) throw new Error("下载内容超过大小限制");
          if (Qe.push(new Uint8Array(je)), !c()) return;
          T.value = R > 0 ? Math.min(100, Math.round(ke / R * 100)) : 0, z.value = `${T.value}% (${(ke / 1048576).toFixed(1)} MB / ${(R / 1048576).toFixed(1)} MB)`;
        }
      } finally {
        await X.cancel().catch(() => {
        }), X.releaseLock();
      }
      if (!c()) return;
      const et = new Blob(Qe, { type: "application/zip" }), Ce = new Uint8Array(await et.slice(0, 4).arrayBuffer());
      if (Ce[0] !== 80 || Ce[1] !== 75 || Ce[2] !== 3 || Ce[3] !== 4) throw new Error("返回内容不是 ZIP 安装包");
      if (!c()) return;
      if (V = URL.createObjectURL(et), N?.downloads) await N.downloads.download({ url: V, filename: h.name, saveAs: !1 });
      else {
        const te = document.createElement("a");
        te.href = V, te.download = h.name, document.body.appendChild(te), te.click(), te.remove();
      }
      c() && (q.value = !0, T.value = 100, z.value = `已交给浏览器保存 (${(ke / 1048576).toFixed(1)} MB)，请在下载列表确认`);
    } catch (y) {
      c() && (I.value = `下载中断：${Ut(y)}`);
    } finally {
      if (E.finish(), V) {
        const y = V;
        setTimeout(() => URL.revokeObjectURL(y), 6e4);
      }
      c() && (H.value = !1);
    }
  }
  function ee() {
    N?.runtime ? N.runtime.reload() : window.location.reload();
  }
  async function ye() {
    if (!O || !S() || we || m.value || H.value || !G.value) return;
    we = !0;
    const h = xe, v = () => O && S() && h === xe;
    ++be, G.value = !1, m.value = !0;
    try {
      const c = Xe(await Je.callNativeHost({ command: "git-apply-update" }));
      if (!v()) return;
      c.ok === !0 ? (A.value = !0, L("更新拉取成功，即将重新载入扩展…"), Ie = setTimeout(() => {
        v() && ee();
      }, 1200)) : L(typeof c.error == "string" ? c.error : "更新应用失败", !0);
    } catch (c) {
      v() && L(Ut(c), !0);
    } finally {
      we = !1, v() && (m.value = !1);
    }
  }
  return Ke(S, (h) => {
    if (!h) {
      ++xe, ++be, ++Le;
      for (const v of me) v.abort();
      clearTimeout(Ie), m.value = !1, G.value = !1, H.value = !1;
    }
  }), ro(() => {
    O = !1, ++be, ++Le;
    for (const h of me) h.abort();
    me.clear(), clearTimeout(Ie), Q.value = "";
  }), {
    needsReloadToApply: A,
    currentVersionText: F,
    currentCommitText: g,
    checkingUpdate: m,
    canApplyUpdate: G,
    updateStatusMessage: I,
    onlineRelease: De,
    onlineAsset: U,
    isDownloading: H,
    downloadPercent: T,
    downloadReceivedText: z,
    downloadCompleted: q,
    githubToken: Q,
    showTokenInput: Ze,
    syncLocalVersion: Oe,
    loadGithubToken: ct,
    saveGithubToken: Me,
    checkAllUpdates: d,
    downloadReleaseAsset: b,
    reloadExtension: ee,
    applyGitUpdate: ye
  };
}
const is = ["aria-busy"], rs = { class: "settings-view-shell" }, ls = {
  key: 0,
  class: "settings-window-actions"
}, as = { class: "settings-view-nav" }, ds = { class: "settings-nav-links" }, ps = ["onClick"], us = { class: "settings-nav-dev-card" }, cs = { class: "settings-hero-copy" }, gs = ["disabled"], vs = { class: "settings-panel" }, fs = { class: "settings-subgroup" }, bs = { class: "field full-width" }, xs = {
  class: "field full-width",
  style: { "margin-top": "8px" }
}, ws = {
  class: "field full-width",
  style: { "margin-top": "8px" }
}, ms = { style: { display: "flex", gap: "10px", "align-items": "center" } }, hs = {
  class: "module-toggles",
  style: { "margin-top": "10px" }
}, ys = { class: "toggle-card" }, ks = { class: "toggle-card" }, Cs = { class: "settings-subgroup" }, Ss = { class: "search-slots-list" }, Ts = { class: "search-slot-order" }, zs = ["disabled", "onClick"], Es = ["disabled", "onClick"], $s = ["src"], Ls = { key: 1 }, As = { class: "search-slot-info" }, Us = { class: "search-slot-title-row" }, Vs = { class: "search-slot-name" }, Ps = {
  key: 0,
  class: "search-slot-tag builtin"
}, Rs = {
  key: 1,
  class: "search-slot-tag custom"
}, Ws = ["title"], Ds = { class: "search-slot-actions" }, Is = ["onClick"], Os = ["title"], Ms = ["onUpdate:modelValue", "onChange"], js = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", "margin-top": "10px", gap: "8px" } }, _s = {
  key: 0,
  class: "search-slot-add-drawer"
}, Bs = { class: "template-chips-section" }, Ns = { class: "template-chips" }, Fs = ["onClick"], Gs = { class: "slot-form-grid" }, Hs = { class: "slot-form-field" }, qs = { class: "slot-form-field" }, Ys = { style: { display: "flex", gap: "6px", "align-items": "center" } }, Ks = { class: "quick-emojis" }, Js = ["onClick"], Xs = { class: "slot-form-field full-width" }, Zs = { style: { display: "flex", "align-items": "center", gap: "8px" } }, Qs = { class: "quick-color-palette" }, en = ["onClick"], tn = { class: "slot-form-field full-width" }, on = { class: "slot-form-field full-width" }, sn = { class: "slot-form-actions" }, nn = { class: "settings-subgroup" }, rn = { class: "module-toggles" }, ln = { class: "toggle-card" }, an = { class: "toggle-card" }, dn = { class: "toggle-card" }, pn = { class: "toggle-card" }, un = { class: "toggle-card" }, cn = { class: "toggle-card" }, gn = { class: "toggle-card" }, vn = { class: "toggle-card" }, fn = { class: "toggle-card" }, bn = { class: "toggle-card" }, xn = { class: "settings-panel" }, wn = { class: "shortcut-group-title" }, mn = { class: "shortcuts-grid" }, hn = { class: "shortcut-label" }, yn = { class: "shortcut-actions" }, kn = ["onClick"], Cn = ["title", "aria-label", "onClick"], Sn = ["title", "aria-label", "onClick"], Tn = { class: "settings-panel" }, zn = { class: "fields-grid" }, En = { class: "field full-width" }, $n = { style: { display: "flex", gap: "10px", "align-items": "center" } }, Ln = { value: "" }, An = ["value"], Un = ["disabled"], Vn = {
  class: "ignored-folders-list",
  style: { "margin-top": "14px" }
}, Pn = { class: "folder-path" }, Rn = ["onClick"], Wn = {
  key: 0,
  class: "hint"
}, Dn = { class: "settings-panel" }, In = { class: "fields-grid" }, On = { class: "field full-width" }, Mn = { class: "field" }, jn = { style: { display: "flex", gap: "10px", "align-items": "center" } }, _n = { class: "field" }, Bn = { style: { display: "flex", gap: "10px", "align-items": "center" } }, Nn = { class: "field" }, Fn = { style: { display: "flex", gap: "10px", "align-items": "center" } }, Gn = { class: "field" }, Hn = { class: "field" }, qn = { class: "field" }, Yn = { class: "settings-panel" }, Kn = { class: "fields-grid" }, Jn = { class: "field full-width" }, Xn = { style: { display: "flex", gap: "8px", "flex-wrap": "wrap", "align-items": "center" } }, Zn = ["disabled"], Qn = {
  key: 0,
  style: { "margin-top": "8px", "font-size": "11px", padding: "6px 10px", "border-radius": "6px", background: "var(--panel)", border: "1px solid var(--border)", color: "var(--text)" }
}, ei = { class: "field full-width" }, ti = { class: "wallpaper-presets-grid" }, oi = ["onClick"], si = { class: "wallpaper-card-badge" }, ni = {
  key: 0,
  class: "wallpaper-card-active-pill"
}, ii = { class: "wallpaper-card-meta" }, ri = { class: "wallpaper-card-title" }, li = { class: "field full-width" }, ai = { style: { display: "flex", "justify-content": "space-between", "align-items": "center" } }, di = { style: { "margin-bottom": "0" } }, pi = {
  key: 0,
  style: { display: "flex", gap: "6px", "align-items": "center", "font-size": "11px" }
}, ui = ["disabled"], ci = { style: { color: "var(--muted)" } }, gi = ["disabled"], vi = {
  key: 0,
  style: { padding: "24px", "text-align": "center", border: "1px dashed var(--border)", "border-radius": "10px", "margin-top": "10px", color: "var(--muted)", "font-size": "12px" }
}, fi = {
  key: 1,
  class: "wallpaper-library-grid"
}, bi = ["onClick"], xi = { class: "wallpaper-card-preview" }, wi = ["src"], mi = ["src"], hi = {
  key: 2,
  style: { "font-size": "20px", color: "var(--muted)" }
}, yi = { class: "wallpaper-card-badge" }, ki = {
  key: 3,
  class: "wallpaper-card-active-pill"
}, Ci = ["title", "onClick"], Si = ["onKeydown"], Ti = ["onClick"], zi = ["title"], Ei = ["onClick"], $i = { class: "settings-panel" }, Li = { class: "fields-grid" }, Ai = { class: "field full-width" }, Ui = { style: { display: "flex", "flex-direction": "column", gap: "10px", background: "color-mix(in srgb, var(--panel) 92%, var(--text) 8%)", padding: "14px", "border-radius": "10px", border: "1px solid var(--border)" } }, Vi = { style: { display: "flex", gap: "10px", "flex-wrap": "wrap" } }, Pi = { style: { flex: "1", "min-width": "180px" } }, Ri = { style: { flex: "1", "min-width": "180px" } }, Wi = { style: { flex: "1", "min-width": "160px" } }, Di = { style: { display: "flex", gap: "8px", "flex-wrap": "wrap", "align-items": "center", "margin-top": "4px" } }, Ii = ["disabled"], Oi = ["disabled"], Mi = ["disabled"], ji = ["disabled"], _i = {
  key: 0,
  style: { "font-size": "11px", padding: "6px 10px", "border-radius": "6px", background: "var(--panel)", border: "1px solid var(--border)", color: "var(--text)" }
}, Bi = { class: "field full-width" }, Ni = { style: { display: "flex", gap: "10px", "align-items": "center", "flex-wrap": "wrap", background: "color-mix(in srgb, var(--panel) 92%, var(--text) 8%)", padding: "12px 14px", "border-radius": "10px", border: "1px solid var(--border)" } }, Fi = {
  class: "btn-secondary",
  style: { cursor: "pointer", margin: "0", display: "inline-flex", "align-items": "center" }
}, Gi = {
  key: 0,
  style: { "font-size": "11px", color: "#10b981", "font-weight": "bold" }
}, Hi = { class: "field full-width" }, qi = { class: "sync-banner" }, Yi = { style: { "font-weight": "700", "font-size": "13px", color: "var(--heading)" } }, Ki = { style: { "font-size": "10px", color: "var(--dim)", "margin-top": "4px" } }, Ji = { style: { display: "flex", gap: "8px", "align-items": "center" } }, Xi = ["disabled"], Zi = {
  key: 0,
  class: "update-log-box"
}, Qi = {
  key: 1,
  class: "github-token-box"
}, er = { style: { display: "flex", "justify-content": "space-between", "align-items": "center" } }, tr = {
  key: 2,
  class: "release-card"
}, or = { class: "release-header" }, sr = { class: "release-tag" }, nr = {
  key: 0,
  style: { "margin-left": "6px", "font-size": "11px", color: "var(--muted)" }
}, ir = ["disabled"], rr = {
  key: 0,
  class: "release-notes"
}, lr = {
  key: 1,
  class: "download-progress-box"
}, ar = { class: "download-progress-label" }, dr = { class: "download-progress-track" }, pr = {
  key: 2,
  class: "download-finish-card"
}, ur = { class: "settings-panel" }, cr = { class: "save-dock" }, gr = {
  key: 1,
  role: "status",
  class: "save-status-msg"
}, vr = ["disabled"], Vt = 8, Sr = /* @__PURE__ */ Wo({
  __name: "SettingsView",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(L) {
    const S = jo(() => import("./StorageSettings-SDgwu8Zc.js"));
    _o("logicweaver-settings-styles", es);
    const A = L, F = [
      { id: "modules", index: "01", name: "模块与功能" },
      { id: "shortcuts", index: "02", name: "快捷键配置" },
      { id: "privacy", index: "03", name: "搜索书签过滤" },
      { id: "limbus", index: "04", name: "漫游歌词定制" },
      { id: "wallpaper", index: "05", name: "壁纸与背景" },
      { id: "sync", index: "06", name: "数据备份与同步" },
      { id: "storage", index: "07", name: "文件夹与存储" }
    ], g = u("modules"), m = u(null);
    Ke(() => de.state.sectionRequest, () => {
      const s = de.state.requestedSection;
      s && F.some((e) => e.id === s) && (g.value = s);
    }, { immediate: !0 });
    const G = ve(() => {
      const s = F.find((e) => e.id === g.value);
      return s ? `${s.index} ${s.name}` : "设置";
    }), I = ve(() => typeof location < "u" && location.pathname.endsWith("/options.html"));
    function De() {
      D(), de.minimize();
      const s = typeof window < "u" ? window : null;
      s?.LogicWeaverWindowManager?.minimize && s.LogicWeaverWindowManager.minimize("settings");
    }
    const U = pt({
      webdavUrl: "https://dav.jianguoyun.com/dav/LogicWeaver/",
      webdavUsername: "",
      webdavPassword: "",
      webdavFilename: "logicweaver-settings.json"
    }), H = u({ ...U }), T = u(""), z = u(!1), q = u("");
    async function Q() {
      try {
        const s = await Zo();
        H.value = { ...s }, Object.assign(U, s);
      } catch {
      }
    }
    async function Ze() {
      if (!z.value) {
        z.value = !0, T.value = "";
        try {
          await Qo(U, H.value), H.value = { ...U }, T.value = "✓ WebDAV 连接设置已保存", x("WebDAV 连接设置已保存");
        } catch (s) {
          T.value = `保存失败: ${s.message || "请检查URL格式"}`;
        } finally {
          z.value = !1;
        }
      }
    }
    async function O() {
      if (!z.value) {
        z.value = !0, T.value = "正在连接 WebDAV 服务器…";
        try {
          const s = At(U), e = await Lt.testConnection(s);
          e.ok ? (T.value = "✓ WebDAV 连接成功！服务器响应正常。", x("WebDAV 连通性测试通过！")) : T.value = `✕ 连接失败: ${e.message || "请检查服务器地址与密码"}`;
        } catch (s) {
          T.value = `✕ 测试异常: ${s.message}`;
        } finally {
          z.value = !1;
        }
      }
    }
    async function be() {
      if (!z.value) {
        z.value = !0, T.value = "正在上传配置备份至 WebDAV…";
        try {
          const s = At(U), e = await Lt.pushCurrentConfig(s);
          e.ok ? (T.value = `✓ 上传成功！已将全部设置备份至云端 (${e.byteLength || 0} 字节)`, x("已成功上传云端备份！")) : T.value = `✕ 上传失败: ${e.error || "请检查写入权限"}`;
        } catch (s) {
          T.value = `✕ 上传异常: ${s.message}`;
        } finally {
          z.value = !1;
        }
      }
    }
    async function Le() {
      if (!z.value && confirm("确定从 WebDAV 恢复备份吗？恢复后将覆盖当前本地设置。")) {
        z.value = !0, T.value = "正在从 WebDAV 拉取配置并恢复…";
        try {
          const s = At(U), e = await Lt.pullCurrentConfig(s);
          e.ok ? (T.value = `✓ 恢复成功！已成功还原 ${e.restoredCount || 0} 项配置。请刷新页面查看。`, x(`恢复成功！已还原 ${e.restoredCount || 0} 项配置`)) : T.value = `✕ 恢复失败: ${e.error || "未在服务器找到对应备份文件"}`;
        } catch (s) {
          T.value = `✕ 恢复异常: ${s.message}`;
        } finally {
          z.value = !1;
        }
      }
    }
    async function xe() {
      try {
        const s = await Ko(), e = Jo(s), o = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = URL.createObjectURL(o), f = document.createElement("a");
        f.href = n, f.download = `logicweaver-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, f.click(), URL.revokeObjectURL(n), q.value = "✓ 本地备份已导出！", x("本地配置快照已成功导出");
      } catch (s) {
        q.value = `导出失败: ${s.message}`;
      }
    }
    async function we(s) {
      const e = s.target, o = e.files?.[0];
      if (o)
        try {
          const n = await o.text(), f = JSON.parse(n);
          if (!confirm(`确定导入「${o.name}」恢复配置吗？`)) return;
          const ze = await Xo(f);
          q.value = `✓ 恢复成功！已成功还原 ${ze.restoredCount || 0} 项配置。`, x(`成功导入 ${ze.restoredCount || 0} 项配置！建议刷新页面。`);
        } catch (n) {
          q.value = `恢复失败: ${n.message || "文件格式不匹配"}`;
        } finally {
          e.value = "";
        }
    }
    function Ie() {
      Xt.toggle(), Xt.isActive ? (x("已切入「新用户空态视角」沙箱，常用网站已清空，真实数据已安全封存"), de.close()) : x("已恢复真实数据");
    }
    function me() {
      D(), de.close();
      const s = typeof window < "u" ? window : null;
      s?.LogicWeaverWindowManager?.close && s.LogicWeaverWindowManager.close("settings");
    }
    let he;
    function D() {
      const s = he;
      he = void 0, s?.();
    }
    Ke(() => A.active, (s) => {
      s || D();
    }, { flush: "sync" });
    function Oe(s) {
      if (I.value || !A.active || document.hidden || s.button !== 0 || !s.isPrimary) return;
      const e = s.target;
      if (!e || e.closest("button, input, select, textarea, a, .settings-window-actions")) return;
      const o = document.getElementById("settings-dialog"), n = s.currentTarget;
      if (!o || !n) return;
      D();
      const f = o.getBoundingClientRect(), ze = s.clientX, le = s.clientY, pe = s.pointerId, ht = Math.max(8, window.innerWidth - f.width - 8), yt = Math.max(8, window.innerHeight - 56);
      let Re = !1, w = 0, Y = f.left, ue = f.top;
      const qe = () => {
        w = 0, o.style.setProperty("--settings-drag-x", `${Y - f.left}px`), o.style.setProperty("--settings-drag-y", `${ue - f.top}px`);
      }, Ft = (K) => {
        Y = Math.max(8, Math.min(f.left + K.clientX - ze, ht)), ue = Math.max(8, Math.min(f.top + K.clientY - le, yt));
      }, Gt = (K) => {
        if (K.pointerId === pe) {
          if (!Re) {
            if (Math.hypot(K.clientX - ze, K.clientY - le) <= 4) return;
            Re = !0, o.classList.add("dragged"), o.style.width = `${f.width}px`, o.style.height = `${f.height}px`, o.style.left = `${f.left}px`, o.style.top = `${f.top}px`, o.style.right = "auto", o.style.bottom = "auto", o.style.margin = "0", o.style.transform = "none", o.style.setProperty("--settings-drag-x", "0px"), o.style.setProperty("--settings-drag-y", "0px"), o.classList.add("settings-dragging");
            try {
              n.setPointerCapture(pe);
            } catch {
            }
          }
          Ft(K), w || (w = requestAnimationFrame(qe));
        }
      }, We = (K) => {
        K.pointerId === pe && (Re && K.type === "pointerup" && Ft(K), D());
      }, Ht = () => {
        document.hidden && D();
      }, qt = () => {
        Y = Math.max(8, Math.min(Y, Math.max(8, window.innerWidth - f.width - 8))), ue = Math.max(8, Math.min(ue, Math.max(8, window.innerHeight - 56))), D();
      };
      he = () => {
        w && cancelAnimationFrame(w), w = 0, window.removeEventListener("pointermove", Gt), window.removeEventListener("pointerup", We), window.removeEventListener("pointercancel", We), window.removeEventListener("blur", D), window.removeEventListener("resize", qt), document.removeEventListener("visibilitychange", Ht), n.removeEventListener("lostpointercapture", We), Re && (o.style.left = `${Y}px`, o.style.top = `${ue}px`, o.classList.remove("settings-dragging"), o.style.removeProperty("--settings-drag-x"), o.style.removeProperty("--settings-drag-y"));
        try {
          n.hasPointerCapture(pe) && n.releasePointerCapture(pe);
        } catch {
        }
      }, window.addEventListener("pointermove", Gt, { passive: !0 }), window.addEventListener("pointerup", We), window.addEventListener("pointercancel", We), window.addEventListener("blur", D), window.addEventListener("resize", qt), document.addEventListener("visibilitychange", Ht), n.addEventListener("lostpointercapture", We);
    }
    function ct(s) {
      if (I.value || (D(), s.target.closest("button, input, select, textarea, a, .settings-window-actions"))) return;
      const e = document.getElementById("settings-dialog");
      e && (e.classList.remove("dragged"), e.style.left = "", e.style.top = "", e.style.right = "", e.style.bottom = "", e.style.width = "", e.style.height = "", e.style.margin = "", e.style.transform = "");
    }
    const Me = {
      displaySize: "auto",
      city: "",
      showWeather: !0,
      showSites: !0,
      showBili: !0,
      showYouTube: !0,
      showTodo: !0,
      showLeftNavigation: !0,
      showNavBall: !1,
      showBookmarkPanel: !0,
      showBookmarkFoldersTop: !1,
      showStartupAnimation: !0,
      startupAnimationStyle: "endfield",
      searchEngine: "bing",
      singleNewTab: !1,
      showHomeMusicVisualizer: !0,
      showLimbusLyricEffect: !0,
      dockPosition: "bottom"
    }, d = pt({ ...Me }), b = pt({ ...kt }), ee = /* @__PURE__ */ new Set();
    let ye = 0;
    const h = ve(() => Yo.filter((s) => $t(s.id))), v = ve(() => [
      { id: "navigation", title: "导航与界面", tools: h.value.filter((s) => s.group === "navigation") },
      { id: "components", title: "已启用组件", tools: h.value.filter((s) => s.group === "components") }
    ].filter((s) => s.tools.length)), c = u({}), E = u(null);
    Ke(() => [A.active, g.value], () => {
      (!A.active || g.value !== "shortcuts") && Te();
    });
    const V = u([]), y = u([]), M = ve(() => y.value.flatMap((s, e) => {
      const o = Ct(s);
      if (o === void 0) return [];
      const n = s, f = typeof n.path == "string" && n.path ? n.path : typeof n.title == "string" && n.title ? n.title : o;
      return [{ id: o, path: f, rowKey: `${o}:${e}` }];
    })), R = ve(() => y.value.length - M.value.length), X = u(""), {
      needsReloadToApply: Qe,
      currentVersionText: ke,
      currentCommitText: et,
      checkingUpdate: Ce,
      canApplyUpdate: te,
      updateStatusMessage: je,
      onlineRelease: Ae,
      onlineAsset: lo,
      isDownloading: _e,
      downloadPercent: Pt,
      downloadReceivedText: ao,
      downloadCompleted: gt,
      githubToken: tt,
      showTokenInput: po,
      syncLocalVersion: uo,
      loadGithubToken: co,
      saveGithubToken: Rt,
      checkAllUpdates: Wt,
      downloadReleaseAsset: Dt,
      reloadExtension: ot,
      applyGitUpdate: It
    } = ns(x, () => A.active), Be = u(""), vt = u(!1), oe = u(!1), Ue = u(!1), se = u(!1);
    let ne = !0, go = !1, ft = {}, st = {};
    function bt() {
      const s = {};
      for (const e of Tt) s[e] = d[e];
      return s[ae] = b, s[$e] = c.value, s[fe] = y.value, Ye(s);
    }
    const vo = [
      {
        id: "builtin-mountain",
        title: "默认山景 (Mountains)",
        kind: "内置",
        value: zt,
        thumb: "assets/newtab-mountains.png",
        isBuiltin: !0
      },
      {
        id: "builtin-pure-dark",
        title: "极简深色 (Pure Dark)",
        kind: "纯色",
        value: null,
        style: "background: #090d16;",
        isPure: !0
      },
      {
        id: "builtin-cyber-gradient",
        title: "赛博霓虹 (Cyber Neon)",
        kind: "渐变",
        value: { type: "style", style: "background: radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.25), transparent 45%), radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.2), transparent 45%), #090d16;" },
        style: "background: radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.25), transparent 45%), radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.2), transparent 45%), #090d16;",
        isGradient: !0
      },
      {
        id: "builtin-aurora",
        title: "极光翡翠 (Aurora Green)",
        kind: "渐变",
        value: { type: "style", style: "background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.28), transparent 60%), #0c141f;" },
        style: "background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.28), transparent 60%), #0c141f;",
        isGradient: !0
      }
    ], Ne = u([]), Z = u(null), xt = u(!1), nt = u(""), ie = pt({}), Ve = u(1), Fe = u(null), it = u(""), Ge = u(null), wt = ve(() => Math.ceil(Ne.value.length / Vt) || 1), Ot = ve(() => {
      const s = (Ve.value - 1) * Vt;
      return Ne.value.slice(s, s + Vt);
    });
    function rt(s) {
      return s.id === "builtin-mountain" ? Z.value === zt : s.isPure ? !Z.value || Z.value === "none" || Z.value?.type === "none" : Z.value && s.value ? JSON.stringify(Z.value) === JSON.stringify(s.value) : !1;
    }
    async function Pe() {
      xt.value = !0;
      try {
        const s = await B.loadHistory();
        Ne.value = s.history || [], Z.value = s.currentValue, fo();
      } catch (s) {
        nt.value = `壁纸库读取失败: ${s.message || "未知错误"}`;
      } finally {
        xt.value = !1;
      }
    }
    async function fo() {
      const s = [...Ot.value];
      for (const e of s) {
        if (e.thumb || e.style || e.previewUrl || ie[e.id]) continue;
        const o = e.value?.storageKey;
        if (o)
          try {
            const n = await B.createLibraryPreviewUrl(o);
            n && (ie[e.id] = n);
          } catch {
          }
      }
    }
    async function Mt(s) {
      try {
        s.id === "builtin-mountain" ? (await B.setMountain(), Z.value = zt) : s.isPure ? (await B.clearWallpaper(), Z.value = null) : (await B.setWallpaper(s.value), Z.value = s.value), x(`已应用壁纸: ${s.title || "自定义壁纸"}`), nt.value = `✓ 已成功应用壁纸「${s.title || "壁纸"}」`;
      } catch (e) {
        x(`应用失败: ${e.message}`, !0);
      }
    }
    async function bo() {
      try {
        const s = await B.chooseBackgroundFile("image");
        if (!s || s.length === 0) return;
        for (let e = 0; e < s.length; e++)
          await B.importBackgroundFile(s[e], { apply: e === s.length - 1 });
        await Pe(), x("本地图片壁纸已成功导入并应用！");
      } catch (s) {
        s?.name !== "AbortError" && x(`导入图片失败: ${s.message}`, !0);
      }
    }
    async function xo() {
      try {
        const s = await B.chooseBackgroundFile("video");
        if (!s || s.length === 0) return;
        for (let e = 0; e < s.length; e++)
          await B.importBackgroundFile(s[e], { apply: e === s.length - 1 });
        await Pe(), x("动态视频壁纸已成功导入并应用！");
      } catch (s) {
        s?.name !== "AbortError" && x(`导入视频失败: ${s.message}`, !0);
      }
    }
    async function wo() {
      try {
        await B.importWallpaperDirectory(), await Pe(), x("文件夹图片已成功批量导入！");
      } catch (s) {
        s?.name !== "AbortError" && x(`导入文件夹失败: ${s.message}`, !0);
      }
    }
    async function mo(s) {
      if (Ge.value !== s.id) {
        Ge.value = s.id;
        return;
      }
      Ge.value = null;
      try {
        await B.deleteHistory(s), ie[s.id] && (URL.revokeObjectURL(ie[s.id]), delete ie[s.id]), await Pe(), x("壁纸已从历史库中删除");
      } catch (e) {
        x(`删除失败: ${e.message}`, !0);
      }
    }
    function ho(s) {
      Fe.value = s.id, it.value = s.title || "";
    }
    async function jt(s) {
      const e = Fe.value, o = it.value.trim();
      if (!(!e || !o))
        try {
          await B.updateHistoryTitle(s.id, o), s.title = o, Fe.value = null, x("壁纸名称已更新");
        } catch (n) {
          x(`更新名称失败: ${n.message}`, !0);
        }
    }
    function _t() {
      Fe.value = null;
    }
    Ke(g, (s) => {
      Do(() => {
        m.value && (m.value.scrollTop = 0);
      }), s === "wallpaper" && Pe();
    });
    let He = null;
    function x(s, e = !1) {
      Be.value = s, vt.value = e, He && clearTimeout(He), e || (He = setTimeout(() => {
        Be.value = "";
      }, 3500));
    }
    function yo() {
      const s = typeof window < "u" ? window : null;
      s?.LogicWeaverStartupIntro?.playIntro ? s.LogicWeaverStartupIntro.playIntro({ force: !0, style: d.startupAnimationStyle }) : x(`正在使用 ${d.startupAnimationStyle} 动效风格`);
    }
    const Se = u(!1), $ = u({
      name: "",
      iconType: "text",
      iconValue: "🎬",
      themeColor: "#38bdf8",
      searchUrl: "",
      placeholder: ""
    });
    function ko(s) {
      $.value = {
        name: s.name,
        iconType: s.iconType,
        iconValue: s.iconValue,
        themeColor: s.themeColor,
        searchUrl: s.searchUrl,
        placeholder: s.placeholder
      }, Se.value = !0;
    }
    function Co() {
      const s = $.value.name.trim(), e = $.value.searchUrl.trim();
      if (!s || !e) {
        x("请填写栏位名称和搜索 URL 模板", !0);
        return;
      }
      Fo({
        name: s,
        placeholder: $.value.placeholder.trim() || `在 ${s} 中搜索…`,
        iconType: $.value.iconType,
        iconValue: $.value.iconValue.trim() || "🔍",
        themeColor: $.value.themeColor || "#38bdf8",
        searchUrl: e
      }), x(`已成功添加「${s}」搜索栏位`), Se.value = !1, $.value = {
        name: "",
        iconType: "text",
        iconValue: "🎬",
        themeColor: "#38bdf8",
        searchUrl: "",
        placeholder: ""
      };
    }
    function So(s) {
      const e = ut.value.find((n) => n.id === s);
      if (!e) return;
      const o = ut.value.filter((n) => n.enabled).length;
      if (!e.enabled && o === 0) {
        e.enabled = !0, x("至少需要保留一个启用的搜索栏位", !0);
        return;
      }
      Go();
    }
    function To() {
      confirm("确定要恢复默认搜索栏位配置吗？自定义添加的栏位将被清空。") && (Ho(), x("已恢复默认搜索栏位"));
    }
    function Te() {
      E.value = null, no.active = !1;
    }
    function zo(s) {
      !oe.value || se.value || !$t(s) || (E.value = s, no.active = !0);
    }
    function Eo(s) {
      Te(), c.value = { ...c.value, [s]: "" }, mt();
    }
    function $o(s) {
      Te();
      const e = { ...c.value };
      delete e[s], c.value = e, mt();
    }
    function Bt(s) {
      if (!oe.value || se.value || !E.value || !A.active) return;
      if (s.preventDefault(), s.stopImmediatePropagation(), s.key === "Escape") {
        Te();
        return;
      }
      if (s.isComposing || s.repeat) return;
      if (!$t(E.value)) {
        Te();
        return;
      }
      const e = qo(s);
      if (!e) return;
      if (["Alt+W", "Alt+H", "Alt+Space", "Ctrl+K", "Meta+K", "Ctrl+W", "Meta+W"].includes(e)) {
        x("该组合由系统固定操作使用，请选择其他按键。", !0);
        return;
      }
      const o = h.value.find((n) => n.id !== E.value && Et(c.value, n).toLowerCase().replace(/^cmd\+/, "meta+") === e.toLowerCase());
      if (o) {
        x(`该组合已用于${o.label}，请先取消原绑定或换一个组合。`, !0);
        return;
      }
      c.value = { ...c.value, [E.value]: e }, Te(), mt();
    }
    async function mt() {
      await lt(!1, !1, [$e]);
    }
    function Lo() {
      const s = V.value.find((e) => e.id === X.value);
      s && (y.value.some((e) => Ct(e) === s.id) || (y.value.push(s), Nt()), X.value = "");
    }
    function Ao(s) {
      y.value = y.value.filter((e) => Ct(e) !== s), Nt();
    }
    async function Nt() {
      await lt(!1, !1, [fe]);
    }
    function re(s) {
      ++ye, ee.add(s);
    }
    function Uo() {
      const s = b.preset;
      if (++ye, ee.add("preset"), St[s]) {
        for (const e of Object.keys(St[s])) ee.add(e);
        Object.assign(b, St[s]);
      }
    }
    function Vo() {
      const s = d.dockPosition || "bottom";
      Qt(s) && eo.setPosition(s), W("dockPosition");
    }
    async function W(s) {
      await lt(!1, !0, [s]);
    }
    async function lt(s = !1, e = !1, o) {
      if (!oe.value || se.value || !ne)
        return ne && x("设置尚未读完、保存中或结果待核对，草稿保留；请等待或重读设置。", !0), !1;
      se.value = !0;
      try {
        const n = bt(), f = [...ee], ze = ye, le = {}, pe = {};
        for (const w of o || Object.keys(n))
          (!to(n[w], st[w]) || w === ae && f.length > 0) && (le[w] = n[w], pe[w] = ft[w]);
        const ht = Object.fromEntries(Object.keys(le).map((w) => [w, st[w]])), yt = await Je.saveSettings(le, pe, ht, f);
        if (!ne) return !0;
        const Re = bt();
        for (const w of [$e, fe, ae])
          if (Object.prototype.hasOwnProperty.call(le, w) && (!to(Re[w], n[w]) || w === ae && ze !== ye))
            throw new oo("本次修改已保存，但保存期间产生了新的设置草稿；请重读核对后再写入，草稿未覆盖");
        for (const w of Object.keys(le)) {
          const Y = Ye(yt[w]);
          w === $e && (c.value = Y), w === fe && (y.value = Y);
          const ue = w === ae ? { ...kt, ...Y } : Y;
          if (w === ae) {
            for (const qe of Object.keys(b)) delete b[qe];
            Object.assign(b, ue);
            for (const qe of f) ee.delete(qe);
          }
          ft[w] = Ye(Y), st[w] = Ye(ue);
        }
        return e || x(Object.keys(le).length ? "✓ 本次改动已保存生效" : "没有待保存的改动"), s && de.close(), !0;
      } catch (n) {
        return ne && (n instanceof oo && (oe.value = !1), x(n?.message || "保存未确认，草稿保留；请重读核对", !0)), !1;
      } finally {
        se.value = !1;
      }
    }
    function Po() {
      location.pathname.endsWith("/options.html") ? location.assign(chrome.runtime.getURL("newtab.html")) : de.close();
    }
    async function Ro() {
      if (!(Ue.value || !ne)) {
        Ue.value = !0, oe.value = !1;
        try {
          const s = await Je.loadGlobalSettings();
          if (!ne) return;
          for (const e of Tt)
            if (s[e] !== void 0 && typeof s[e] != typeof Me[e])
              throw new Error("设置数据格式异常，未允许覆盖；请核对已有配置");
          for (const e of [ae, $e])
            if (s[e] !== void 0 && (!s[e] || typeof s[e] != "object" || Array.isArray(s[e])))
              throw new Error("设置数据格式异常，未允许覆盖；请核对已有配置");
          if (s[fe] !== void 0 && !Array.isArray(s[fe]))
            throw new Error("书签过滤设置格式异常，未允许覆盖");
          Object.assign(d, Me);
          for (const e of Object.keys(b)) delete b[e];
          Object.assign(b, kt), ee.clear(), ++ye, c.value = {}, y.value = [];
          for (const e of Tt)
            s[e] !== void 0 && (d[e] = s[e]);
          s[ae] && Object.assign(b, s[ae]), s[$e] && (c.value = s[$e]), Array.isArray(s[fe]) && (y.value = s[fe]), d.dockPosition && Qt(d.dockPosition) ? eo.setPosition(d.dockPosition) : so.position && (d.dockPosition = so.position), ft = Ye(s), st = bt(), oe.value = !0, go = !0, Be.value = "", vt.value = !1, typeof chrome < "u" && chrome.bookmarks?.getTree && chrome.bookmarks.getTree((e) => {
            ne && e && e[0] && (V.value = Je.collectBookmarkFolders(e[0]));
          }), uo(), co();
        } catch {
          ne && (oe.value = !1, x("设置读取失败或初始化异常，草稿保留，暂不允许保存；可点击重读设置再核对。", !0));
        } finally {
          Ue.value = !1;
        }
      }
    }
    return Io(() => {
      Ro(), Q(), window.addEventListener("keydown", Bt, !0);
    }), ro(() => {
      Te(), D(), ne = !1, window.removeEventListener("keydown", Bt, !0), He && clearTimeout(He);
    }), (s, e) => (i(), r("div", {
      class: "settings-view-root",
      "aria-busy": se.value || Ue.value
    }, [
      t("div", rs, [
        I.value ? C("", !0) : (i(), r("div", ls, [
          t("button", {
            id: "settings-minimize",
            type: "button",
            class: "settings-win-btn",
            title: "最小化（标签保留）",
            onClick: at(De, ["stop"])
          }, "−"),
          t("button", {
            id: "settings-close",
            type: "button",
            class: "settings-win-btn close",
            title: "关闭",
            onClick: at(me, ["stop"])
          }, "✕")
        ])),
        t("aside", as, [
          t("div", {
            class: "settings-brand",
            onPointerdown: Oe
          }, [...e[72] || (e[72] = [
            t("span", { class: "settings-brand-mark" }, "TP", -1),
            t("div", null, [
              t("strong", null, "tab-project"),
              t("small", null, "CONTROL CENTER")
            ], -1)
          ])], 32),
          e[74] || (e[74] = t("p", { class: "settings-nav-label" }, "设置分类", -1)),
          t("nav", ds, [
            (i(), r(j, null, J(F, (o) => t("button", {
              key: o.id,
              type: "button",
              class: ce(["nav-tab-btn", { active: g.value === o.id }]),
              onClick: (n) => g.value = o.id
            }, [
              t("span", null, p(o.index), 1),
              k(" " + p(o.name), 1)
            ], 10, ps)), 64))
          ]),
          t("div", us, [
            t("button", {
              type: "button",
              class: ce(["btn-nav-dev-preview secondary", { active: l(Jt) }]),
              onClick: Ie
            }, [
              t("span", null, p(l(Jt) ? "👀 恢复真实数据" : "🧪 页面内空态预览"), 1)
            ], 2),
            e[73] || (e[73] = t("p", null, "零数据空态视角，体验新用户初次打开的开箱状态。", -1))
          ])
        ]),
        t("main", {
          ref_key: "settingsMain",
          ref: m,
          class: "settings-view-main"
        }, [
          t("header", {
            class: "settings-hero",
            onPointerdown: Oe,
            onDblclick: ct
          }, [
            t("div", cs, [
              e[75] || (e[75] = t("p", { class: "settings-kicker" }, "CONTROL CENTER / PERSONAL SETTINGS", -1)),
              t("h1", null, p(G.value), 1),
              e[76] || (e[76] = t("p", null, "集中管理首页组件、服务连接、快捷键与多端云同步。开关即时保存，输入项可完成编辑后统一保存。", -1))
            ])
          ], 32),
          t("fieldset", {
            class: "settings-fields",
            disabled: !oe.value || se.value
          }, [
            a(t("section", vs, [
              e[123] || (e[123] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "01"),
                t("div", null, [
                  t("h2", null, "模块与功能"),
                  t("p", null, "决定新标签页首页显示哪些核心卡片与启动行为。")
                ])
              ], -1)),
              t("div", fs, [
                e[90] || (e[90] = t("div", { class: "settings-subgroup-title" }, [
                  t("span", null, "🧭 界面布局与基础交互"),
                  t("small", null, "LAYOUT & BEHAVIOR")
                ], -1)),
                t("div", bs, [
                  e[78] || (e[78] = t("label", null, [
                    k("Dock 栏停靠位置 "),
                    t("em", null, "DOCK POSITION")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => d.dockPosition = o),
                    onChange: Vo
                  }, [...e[77] || (e[77] = [
                    t("option", { value: "bottom" }, "⬇️ 屏幕底部居中（默认 · 经典 Dock）", -1),
                    t("option", { value: "left" }, "⬅️ 屏幕左侧居中（紧凑垂直侧边栏）", -1),
                    t("option", { value: "right" }, "➡️ 屏幕右侧居中（紧凑垂直侧边栏）", -1),
                    t("option", { value: "top" }, "⬆️ 屏幕顶部悬浮（顶栏下方居中）", -1)
                  ])], 544), [
                    [ge, d.dockPosition]
                  ]),
                  e[79] || (e[79] = t("p", { class: "hint" }, "自由切换底部、顶部、左侧或右侧停靠，满足多显示器与不同屏幕的使用习惯。", -1))
                ]),
                t("div", xs, [
                  e[81] || (e[81] = t("label", null, [
                    k("默认搜索引擎 "),
                    t("em", null, "SEARCH ENGINE")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[1] || (e[1] = (o) => d.searchEngine = o),
                    onChange: e[2] || (e[2] = (o) => W("searchEngine"))
                  }, [...e[80] || (e[80] = [
                    t("option", { value: "bing" }, "🔷 必应 (Bing) · 国内外综合智能检索", -1),
                    t("option", { value: "google" }, "🌐 谷歌 (Google) · 全球学术与开发生态检索", -1),
                    t("option", { value: "baidu" }, "🐾 百度 (Baidu) · 中文资讯与本土生活搜索", -1),
                    t("option", { value: "duckduckgo" }, "🦆 DuckDuckGo · 隐私保护与零追踪搜索", -1)
                  ])], 544), [
                    [ge, d.searchEngine]
                  ]),
                  e[82] || (e[82] = t("p", { class: "hint" }, "新标签页搜索栏回车或选择第一项直达时，将调用所选的默认搜索引擎。", -1))
                ]),
                t("div", ws, [
                  e[84] || (e[84] = t("label", null, [
                    k("开屏动画风格 "),
                    t("em", null, "STARTUP STYLE")
                  ], -1)),
                  t("div", ms, [
                    a(t("select", {
                      "onUpdate:modelValue": e[3] || (e[3] = (o) => d.startupAnimationStyle = o),
                      style: { flex: "1" },
                      onChange: e[4] || (e[4] = (o) => W("startupAnimationStyle"))
                    }, [...e[83] || (e[83] = [
                      t("option", { value: "endfield" }, "终末地 (Endfield) · 工业高能黑黄动效", -1),
                      t("option", { value: "rhinelab" }, "莱茵生命 (Rhine Lab) · 科研终端科技动效 (Joyce Moore)", -1)
                    ])], 544), [
                      [ge, d.startupAnimationStyle]
                    ]),
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      style: { "min-width": "110px" },
                      onClick: yo
                    }, "预览动效 ↗")
                  ]),
                  e[85] || (e[85] = t("p", { class: "hint" }, "可自由切换明日方舟「终末地」黑黄工业动效，或「莱茵生命」科研终端动效。", -1))
                ]),
                t("div", hs, [
                  t("label", ys, [
                    e[86] || (e[86] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "开屏启动动画"),
                      t("small", null, "新标签页启动进度与品牌动画")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[5] || (e[5] = (o) => d.showStartupAnimation = o),
                      type: "checkbox",
                      onChange: e[6] || (e[6] = (o) => W("showStartupAnimation"))
                    }, null, 544), [
                      [_, d.showStartupAnimation]
                    ]),
                    e[87] || (e[87] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", ks, [
                    e[88] || (e[88] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "仅保留一个主界面"),
                      t("small", null, "后续标签打开大号搜索")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[7] || (e[7] = (o) => d.singleNewTab = o),
                      type: "checkbox",
                      onChange: e[8] || (e[8] = (o) => W("singleNewTab"))
                    }, null, 544), [
                      [_, d.singleNewTab]
                    ]),
                    e[89] || (e[89] = t("i", { class: "switch" }, null, -1))
                  ])
                ])
              ]),
              t("div", Cs, [
                e[100] || (e[100] = t("div", { class: "settings-subgroup-title" }, [
                  t("span", null, "🔍 搜索栏位与引擎管理"),
                  t("small", null, "SEARCH MODES & ENGINES")
                ], -1)),
                e[101] || (e[101] = t("p", {
                  class: "hint",
                  style: { margin: "0 0 10px" }
                }, " 管理主搜索框可切换的搜索栏位。点击搜索框左侧图标可循环切换，支持自定义添加任意网站搜索直达（低代码免开发）。 ", -1)),
                t("div", Ss, [
                  (i(!0), r(j, null, J(l(ut), (o, n) => (i(), r("div", {
                    key: o.id,
                    class: ce(["search-slot-row", { disabled: !o.enabled }])
                  }, [
                    t("div", Ts, [
                      t("button", {
                        type: "button",
                        class: "btn-slot-move",
                        disabled: n === 0,
                        title: "上移",
                        onClick: (f) => l(Zt)(o.id, "up")
                      }, "▲", 8, zs),
                      t("button", {
                        type: "button",
                        class: "btn-slot-move",
                        disabled: n === l(ut).length - 1,
                        title: "下移",
                        onClick: (f) => l(Zt)(o.id, "down")
                      }, "▼", 8, Es)
                    ]),
                    t("div", {
                      class: "search-slot-badge-preview",
                      style: dt({ borderColor: o.themeColor, color: o.themeColor, backgroundColor: `color-mix(in srgb, ${o.themeColor} 12%, transparent)` })
                    }, [
                      o.iconType === "svg" ? (i(), r("img", {
                        key: 0,
                        src: o.iconValue,
                        alt: "",
                        style: { width: "16px", height: "16px" }
                      }, null, 8, $s)) : (i(), r("span", Ls, p(o.iconValue || "⌕"), 1))
                    ], 4),
                    t("div", As, [
                      t("div", Us, [
                        t("strong", Vs, p(o.name), 1),
                        o.isBuiltin ? (i(), r("span", Ps, "默认内置")) : (i(), r("span", Rs, "自定义"))
                      ]),
                      t("small", {
                        class: "search-slot-url",
                        title: o.searchUrl
                      }, p(o.placeholder || o.searchUrl), 9, Ws)
                    ]),
                    t("div", Ds, [
                      o.isBuiltin ? C("", !0) : (i(), r("button", {
                        key: 0,
                        type: "button",
                        class: "btn-slot-del",
                        title: "删除此自定义栏位",
                        onClick: (f) => l(Bo)(o.id)
                      }, "✕", 8, Is)),
                      t("label", {
                        class: "slot-switch-label",
                        title: o.enabled ? "已启用，点击禁用" : "已禁用，点击启用"
                      }, [
                        a(t("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": (f) => o.enabled = f,
                          onChange: (f) => So(o.id)
                        }, null, 40, Ms), [
                          [_, o.enabled]
                        ]),
                        e[91] || (e[91] = t("i", { class: "switch" }, null, -1))
                      ], 8, Os)
                    ])
                  ], 2))), 128))
                ]),
                t("div", js, [
                  t("button", {
                    type: "button",
                    class: "btn-secondary",
                    style: { display: "inline-flex", "align-items": "center", gap: "6px", padding: "6px 12px", "font-size": "12px" },
                    onClick: e[9] || (e[9] = (o) => Se.value = !Se.value)
                  }, [
                    t("span", null, p(Se.value ? "▲ 收起面板" : "+ 添加自定义搜索栏位"), 1)
                  ]),
                  t("button", {
                    type: "button",
                    class: "btn-ghost-small",
                    style: { "font-size": "11px", opacity: "0.75" },
                    title: "重置所有搜索栏位为初始状态",
                    onClick: To
                  }, " 恢复默认栏位 ")
                ]),
                Se.value ? (i(), r("div", _s, [
                  e[99] || (e[99] = t("div", { class: "drawer-header" }, [
                    t("strong", null, "✨ 快速添加自定义搜索栏位"),
                    t("small", null, "支持一键套用常用平台，或填入包含 {query} 的搜索网址")
                  ], -1)),
                  t("div", Bs, [
                    e[92] || (e[92] = t("span", { class: "chips-label" }, "一键套用预设：", -1)),
                    t("div", Ns, [
                      (i(!0), r(j, null, J(l(No), (o) => (i(), r("button", {
                        key: o.name,
                        type: "button",
                        class: "template-chip-btn",
                        onClick: (n) => ko(o)
                      }, [
                        t("span", null, p(o.iconValue), 1),
                        t("span", null, p(o.name), 1)
                      ], 8, Fs))), 128))
                    ])
                  ]),
                  t("div", Gs, [
                    t("div", Hs, [
                      e[93] || (e[93] = t("label", null, [
                        k("栏位名称 "),
                        t("em", null, "NAME")
                      ], -1)),
                      a(t("input", {
                        "onUpdate:modelValue": e[10] || (e[10] = (o) => $.value.name = o),
                        type: "text",
                        placeholder: "如：YouTube、小红书"
                      }, null, 512), [
                        [P, $.value.name]
                      ])
                    ]),
                    t("div", qs, [
                      e[94] || (e[94] = t("label", null, [
                        k("图标 (Emoji) "),
                        t("em", null, "ICON")
                      ], -1)),
                      t("div", Ys, [
                        a(t("input", {
                          "onUpdate:modelValue": e[11] || (e[11] = (o) => $.value.iconValue = o),
                          type: "text",
                          placeholder: "🎬",
                          style: { width: "50px", "text-align": "center", "font-size": "15px" }
                        }, null, 512), [
                          [P, $.value.iconValue]
                        ]),
                        t("div", Ks, [
                          (i(), r(j, null, J(["🎬", "📕", "💡", "🤖", "🔍", "🎓", "🛍️", "🎧", "💻", "📰"], (o) => t("span", {
                            key: o,
                            class: "quick-emo-item",
                            onClick: (n) => $.value.iconValue = o
                          }, p(o), 9, Js)), 64))
                        ])
                      ])
                    ]),
                    t("div", Xs, [
                      e[95] || (e[95] = t("label", null, [
                        k("主题颜色 "),
                        t("em", null, "THEME COLOR")
                      ], -1)),
                      t("div", Zs, [
                        a(t("input", {
                          "onUpdate:modelValue": e[12] || (e[12] = (o) => $.value.themeColor = o),
                          type: "color",
                          style: { width: "32px", height: "28px", padding: "0", border: "1px solid var(--border)", "border-radius": "6px", cursor: "pointer", background: "transparent" }
                        }, null, 512), [
                          [P, $.value.themeColor]
                        ]),
                        t("div", Qs, [
                          (i(), r(j, null, J(["#38bdf8", "#f43f5e", "#ff2442", "#10b981", "#0084ff", "#8b5cf6", "#f59e0b", "#06b6d4"], (o) => t("span", {
                            key: o,
                            class: ce(["palette-dot", { active: $.value.themeColor === o }]),
                            style: dt({ backgroundColor: o }),
                            onClick: (n) => $.value.themeColor = o
                          }, null, 14, en)), 64))
                        ])
                      ])
                    ]),
                    t("div", tn, [
                      e[96] || (e[96] = t("label", null, [
                        k("搜索直达 URL 模板 "),
                        t("em", null, "SEARCH URL ({query})")
                      ], -1)),
                      a(t("input", {
                        "onUpdate:modelValue": e[13] || (e[13] = (o) => $.value.searchUrl = o),
                        type: "text",
                        placeholder: "如：https://www.youtube.com/results?search_query={query}"
                      }, null, 512), [
                        [P, $.value.searchUrl]
                      ]),
                      e[97] || (e[97] = t("p", { class: "field-hint" }, [
                        k("请使用 "),
                        t("code", null, "{query}"),
                        k(" 作为你的搜索词占位符，回车将自动拼接并打开。")
                      ], -1))
                    ]),
                    t("div", on, [
                      e[98] || (e[98] = t("label", null, [
                        k("占位提示文字 (选填) "),
                        t("em", null, "PLACEHOLDER")
                      ], -1)),
                      a(t("input", {
                        "onUpdate:modelValue": e[14] || (e[14] = (o) => $.value.placeholder = o),
                        type: "text",
                        placeholder: "如：搜索 YouTube 精彩视频与博主…"
                      }, null, 512), [
                        [P, $.value.placeholder]
                      ])
                    ])
                  ]),
                  t("div", sn, [
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      onClick: e[15] || (e[15] = (o) => Se.value = !1)
                    }, "取消"),
                    t("button", {
                      type: "button",
                      class: "btn-save-green",
                      onClick: Co
                    }, "确认添加")
                  ])
                ])) : C("", !0)
              ]),
              t("div", nn, [
                e[122] || (e[122] = t("div", { class: "settings-subgroup-title" }, [
                  t("span", null, "🧩 首页卡片组件与动效"),
                  t("small", null, "CARDS & VISUAL EFFECTS")
                ], -1)),
                t("div", rn, [
                  t("label", ln, [
                    e[102] || (e[102] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "天气模块"),
                      t("small", null, "当前天气与短期预报")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[16] || (e[16] = (o) => d.showWeather = o),
                      type: "checkbox",
                      onChange: e[17] || (e[17] = (o) => W("showWeather"))
                    }, null, 544), [
                      [_, d.showWeather]
                    ]),
                    e[103] || (e[103] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", an, [
                    e[104] || (e[104] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "常用网站"),
                      t("small", null, "快捷入口与自定义分区")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[18] || (e[18] = (o) => d.showSites = o),
                      type: "checkbox",
                      onChange: e[19] || (e[19] = (o) => W("showSites"))
                    }, null, 544), [
                      [_, d.showSites]
                    ]),
                    e[105] || (e[105] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", dn, [
                    e[106] || (e[106] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "B站收藏夹"),
                      t("small", null, "读取当前登录账号收藏")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[20] || (e[20] = (o) => d.showBili = o),
                      type: "checkbox",
                      onChange: e[21] || (e[21] = (o) => W("showBili"))
                    }, null, 544), [
                      [_, d.showBili]
                    ]),
                    e[107] || (e[107] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", pn, [
                    e[108] || (e[108] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "日报 · YouTube"),
                      t("small", null, "订阅更新与播放列表")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[22] || (e[22] = (o) => d.showYouTube = o),
                      type: "checkbox",
                      onChange: e[23] || (e[23] = (o) => W("showYouTube"))
                    }, null, 544), [
                      [_, d.showYouTube]
                    ]),
                    e[109] || (e[109] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", un, [
                    e[110] || (e[110] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "任务串"),
                      t("small", null, "首页任务轮播区域")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[24] || (e[24] = (o) => d.showTodo = o),
                      type: "checkbox",
                      onChange: e[25] || (e[25] = (o) => W("showTodo"))
                    }, null, 544), [
                      [_, d.showTodo]
                    ]),
                    e[111] || (e[111] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", cn, [
                    e[112] || (e[112] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "常驻导航悬浮球"),
                      t("small", null, "关闭则仅快捷键唤出")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[26] || (e[26] = (o) => d.showNavBall = o),
                      type: "checkbox",
                      onChange: e[27] || (e[27] = (o) => W("showNavBall"))
                    }, null, 544), [
                      [_, d.showNavBall]
                    ]),
                    e[113] || (e[113] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", gn, [
                    e[114] || (e[114] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "浏览器书签菜单"),
                      t("small", null, "侧边书签整理面板")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[28] || (e[28] = (o) => d.showBookmarkPanel = o),
                      type: "checkbox",
                      onChange: e[29] || (e[29] = (o) => W("showBookmarkPanel"))
                    }, null, 544), [
                      [_, d.showBookmarkPanel]
                    ]),
                    e[115] || (e[115] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", vn, [
                    e[116] || (e[116] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "顶部书签文件夹"),
                      t("small", null, "替代浏览器原生书签栏")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[30] || (e[30] = (o) => d.showBookmarkFoldersTop = o),
                      type: "checkbox",
                      onChange: e[31] || (e[31] = (o) => W("showBookmarkFoldersTop"))
                    }, null, 544), [
                      [_, d.showBookmarkFoldersTop]
                    ]),
                    e[117] || (e[117] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", fn, [
                    e[118] || (e[118] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "音乐卡片音频频谱"),
                      t("small", null, "跟随音频实时跳动频谱柱")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[32] || (e[32] = (o) => d.showHomeMusicVisualizer = o),
                      type: "checkbox",
                      onChange: e[33] || (e[33] = (o) => W("showHomeMusicVisualizer"))
                    }, null, 544), [
                      [_, d.showHomeMusicVisualizer]
                    ]),
                    e[119] || (e[119] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", bn, [
                    e[120] || (e[120] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "边狱巴士 漫游歌词"),
                      t("small", null, "屏幕随机位置逐字跟随演出")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[34] || (e[34] = (o) => d.showLimbusLyricEffect = o),
                      type: "checkbox",
                      onChange: e[35] || (e[35] = (o) => W("showLimbusLyricEffect"))
                    }, null, 544), [
                      [_, d.showLimbusLyricEffect]
                    ]),
                    e[121] || (e[121] = t("i", { class: "switch" }, null, -1))
                  ])
                ])
              ])
            ], 512), [
              [Ee, g.value === "modules"]
            ]),
            a(t("section", xn, [
              e[124] || (e[124] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "02"),
                t("div", null, [
                  t("h2", null, "快捷键"),
                  t("p", null, "按用途管理，仅显示可用功能。点击按键槽录入，Esc 取消；× 取消绑定，↺ 恢复默认。")
                ])
              ], -1)),
              (i(!0), r(j, null, J(v.value, (o) => (i(), r("div", {
                key: o.id,
                class: "shortcut-group"
              }, [
                t("h3", wn, p(o.title), 1),
                t("div", mn, [
                  (i(!0), r(j, null, J(o.tools, (n) => (i(), r("div", {
                    key: n.id,
                    class: "shortcut-row"
                  }, [
                    t("span", hn, p(n.label), 1),
                    t("div", yn, [
                      t("button", {
                        type: "button",
                        class: ce(["shortcut-key-btn", { recording: E.value === n.id }]),
                        onClick: (f) => zo(n.id)
                      }, p(E.value === n.id ? "请按下按键…" : l(Et)(c.value, n) || "未分配"), 11, kn),
                      l(Et)(c.value, n) ? (i(), r("button", {
                        key: 0,
                        type: "button",
                        class: "shortcut-clear-btn",
                        title: `取消${n.label}的快捷键`,
                        "aria-label": `取消${n.label}的快捷键`,
                        onClick: (f) => Eo(n.id)
                      }, "×", 8, Cn)) : C("", !0),
                      Object.prototype.hasOwnProperty.call(c.value, n.id) ? (i(), r("button", {
                        key: 1,
                        type: "button",
                        class: "shortcut-clear-btn",
                        title: `恢复${n.label}的默认键`,
                        "aria-label": `恢复${n.label}的默认键`,
                        onClick: (f) => $o(n.id)
                      }, "↺", 8, Sn)) : C("", !0)
                    ])
                  ]))), 128))
                ])
              ]))), 128)),
              e[125] || (e[125] = Yt('<p class="hint">组件停用后，不显示也不触发对应快捷键；原绑定保留，重新启用后恢复。导航轮盘与工具轮盘同样只列出已启用组件。</p><div class="fixed-shortcuts-card" style="margin-top:18px;"><div class="fixed-shortcuts-head">固定操作（不在上方重复配置）</div><div class="fixed-shortcuts-grid"><div class="fixed-row"><span class="fs-desc">关闭当前工作区 / 窗口</span><span class="fs-keys"><kbd>Alt</kbd> + <kbd>W</kbd></span></div><div class="fixed-row"><span class="fs-desc">回到新标签页</span><span class="fs-keys"><kbd>Alt</kbd> + <kbd>H</kbd></span></div><div class="fixed-row"><span class="fs-desc">取消录制 / 退出当前浮层</span><span class="fs-keys"><kbd>Esc</kbd></span></div></div></div>', 2))
            ], 512), [
              [Ee, g.value === "shortcuts"]
            ]),
            a(t("section", Tn, [
              e[127] || (e[127] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "03"),
                t("div", null, [
                  t("h2", null, "搜索与书签过滤"),
                  t("p", null, "排除特定书签文件夹，避免其出现在主搜索框的实时联想建议中。")
                ])
              ], -1)),
              t("div", zn, [
                t("div", En, [
                  e[126] || (e[126] = t("label", null, [
                    k("排除书签文件夹 "),
                    t("em", null, "SEARCH FILTER")
                  ], -1)),
                  t("div", $n, [
                    a(t("select", {
                      "onUpdate:modelValue": e[36] || (e[36] = (o) => X.value = o),
                      style: { flex: "1" }
                    }, [
                      t("option", Ln, p(V.value.length ? "选择要排除的书签文件夹…" : "正在读取浏览器书签…"), 1),
                      (i(!0), r(j, null, J(V.value, (o) => (i(), r("option", {
                        key: o.id,
                        value: o.id
                      }, p(o.path), 9, An))), 128))
                    ], 512), [
                      [ge, X.value]
                    ]),
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      disabled: !X.value,
                      onClick: Lo
                    }, "＋ 添加到排除", 8, Un)
                  ]),
                  t("div", Vn, [
                    (i(!0), r(j, null, J(M.value, (o) => (i(), r("div", {
                      key: o.rowKey,
                      class: "ignored-folder-row"
                    }, [
                      t("span", Pn, p(o.path), 1),
                      t("button", {
                        type: "button",
                        class: "icon-btn-danger",
                        onClick: (n) => Ao(o.id)
                      }, "✕", 8, Rn)
                    ]))), 128)),
                    R.value ? (i(), r("p", Wn, "另有 " + p(R.value) + " 条旧格式规则原样保留，本面板不编辑或清理它们。", 1)) : C("", !0)
                  ])
                ])
              ])
            ], 512), [
              [Ee, g.value === "privacy"]
            ]),
            a(t("section", Dn, [
              e[139] || (e[139] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "04"),
                t("div", null, [
                  t("h2", null, "边狱巴士 漫游歌词定制"),
                  t("p", null, "深度调整全屏漫游歌词色彩、字体、描边宽度、光晕与 3D 透视视差。")
                ])
              ], -1)),
              t("div", In, [
                t("div", On, [
                  e[129] || (e[129] = t("label", null, [
                    k("色彩风格预设 "),
                    t("em", null, "PRESET")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[37] || (e[37] = (o) => b.preset = o),
                    onChange: Uo
                  }, [...e[128] || (e[128] = [
                    Yt('<option value="cover">🖼 封面自适应 (随当前播放专辑封面实时变色 - 强烈推荐)</option><option value="default">👑 通用 (经典金珀) — Limbus 默认战役风格</option><option value="heartbreak">💔 心碎 (暴怒紫红) — 绯红暴怒战斗色相</option><option value="command">💠 指令 (科技青蓝) — 绝密指引深空荧光</option><option value="custom">🎨 自定义色彩与特效</option>', 5)
                  ])], 544), [
                    [ge, b.preset]
                  ])
                ]),
                t("div", Mn, [
                  e[130] || (e[130] = t("label", null, [
                    k("主文字颜色 "),
                    t("em", null, "TEXT COLOR")
                  ], -1)),
                  t("div", jn, [
                    a(t("input", {
                      "onUpdate:modelValue": e[38] || (e[38] = (o) => b.textColor = o),
                      type: "color",
                      class: "color-picker",
                      onInput: e[39] || (e[39] = (o) => re("textColor"))
                    }, null, 544), [
                      [P, b.textColor]
                    ]),
                    a(t("input", {
                      "onUpdate:modelValue": e[40] || (e[40] = (o) => b.textColor = o),
                      type: "text",
                      style: { flex: "1" },
                      onInput: e[41] || (e[41] = (o) => re("textColor"))
                    }, null, 544), [
                      [P, b.textColor]
                    ])
                  ])
                ]),
                t("div", _n, [
                  e[131] || (e[131] = t("label", null, [
                    k("轮廓描边颜色 "),
                    t("em", null, "STROKE")
                  ], -1)),
                  t("div", Bn, [
                    a(t("input", {
                      "onUpdate:modelValue": e[42] || (e[42] = (o) => b.strokeColor = o),
                      type: "color",
                      class: "color-picker",
                      onInput: e[43] || (e[43] = (o) => re("strokeColor"))
                    }, null, 544), [
                      [P, b.strokeColor]
                    ]),
                    a(t("input", {
                      "onUpdate:modelValue": e[44] || (e[44] = (o) => b.strokeColor = o),
                      type: "text",
                      style: { flex: "1" },
                      onInput: e[45] || (e[45] = (o) => re("strokeColor"))
                    }, null, 544), [
                      [P, b.strokeColor]
                    ])
                  ])
                ]),
                t("div", Nn, [
                  e[132] || (e[132] = t("label", null, [
                    k("辉光光晕颜色 "),
                    t("em", null, "GLOW")
                  ], -1)),
                  t("div", Fn, [
                    a(t("input", {
                      "onUpdate:modelValue": e[46] || (e[46] = (o) => b.glowColor = o),
                      type: "color",
                      class: "color-picker",
                      onInput: e[47] || (e[47] = (o) => re("glowColor"))
                    }, null, 544), [
                      [P, b.glowColor]
                    ]),
                    a(t("input", {
                      "onUpdate:modelValue": e[48] || (e[48] = (o) => b.glowColor = o),
                      type: "text",
                      style: { flex: "1" },
                      onInput: e[49] || (e[49] = (o) => re("glowColor"))
                    }, null, 544), [
                      [P, b.glowColor]
                    ])
                  ])
                ]),
                t("div", Gn, [
                  e[134] || (e[134] = t("label", null, [
                    k("描边轮廓宽度 "),
                    t("em", null, "WIDTH")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[50] || (e[50] = (o) => b.strokeWidth = o),
                    onChange: e[51] || (e[51] = (o) => re("strokeWidth"))
                  }, [...e[133] || (e[133] = [
                    t("option", { value: "1.5" }, "细致 (1.5px)", -1),
                    t("option", { value: "2.2" }, "标准 (2.2px - 原版预设)", -1),
                    t("option", { value: "3.0" }, "浓重 (3.0px)", -1),
                    t("option", { value: "4.0" }, "超厚 (4.0px)", -1)
                  ])], 544), [
                    [ge, b.strokeWidth]
                  ])
                ]),
                t("div", Hn, [
                  e[136] || (e[136] = t("label", null, [
                    k("字号大小 "),
                    t("em", null, "FONT SIZE")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[52] || (e[52] = (o) => b.fontSize = o),
                    onChange: e[53] || (e[53] = (o) => re("fontSize"))
                  }, [...e[135] || (e[135] = [
                    t("option", { value: "26" }, "紧凑 (26px)", -1),
                    t("option", { value: "36" }, "标准 (36px - 推荐)", -1),
                    t("option", { value: "46" }, "大型 (46px - 巨幕沉浸)", -1),
                    t("option", { value: "56" }, "特大 (56px - 冲击力)", -1)
                  ])], 544), [
                    [ge, b.fontSize]
                  ])
                ]),
                t("div", qn, [
                  e[138] || (e[138] = t("label", null, [
                    k("3D 透视视差倾角 "),
                    t("em", null, "PERSPECTIVE")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[54] || (e[54] = (o) => b.perspectiveStrength = o),
                    onChange: e[55] || (e[55] = (o) => re("perspectiveStrength"))
                  }, [...e[137] || (e[137] = [
                    t("option", { value: "0" }, "关闭透视 (纯平面)", -1),
                    t("option", { value: "0.6" }, "轻柔透视 (0.6x)", -1),
                    t("option", { value: "1.0" }, "标准透视 (1.0x - 原版算法)", -1),
                    t("option", { value: "1.5" }, "强烈透视 (1.5x - 视差拉扯)", -1)
                  ])], 544), [
                    [ge, b.perspectiveStrength]
                  ])
                ])
              ])
            ], 512), [
              [Ee, g.value === "limbus"]
            ]),
            a(t("section", Yn, [
              e[143] || (e[143] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "05"),
                t("div", null, [
                  t("h2", null, "壁纸与桌面背景"),
                  t("p", null, "个性化定制新标签页背景：支持预设山景、纯黑无干扰、赛博霓虹渐变、自定义本地图片与动态视频壁纸。")
                ])
              ], -1)),
              t("div", Kn, [
                t("div", Jn, [
                  e[140] || (e[140] = t("label", null, [
                    k("导入与管理 "),
                    t("em", null, "IMPORT & ACTIONS")
                  ], -1)),
                  t("div", Xn, [
                    t("button", {
                      type: "button",
                      class: "btn-primary",
                      onClick: bo
                    }, " ＋ 导入本地图片 "),
                    t("button", {
                      type: "button",
                      class: "btn-primary",
                      onClick: xo
                    }, " ▶ 导入动态视频 (MP4/WebM) "),
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      onClick: wo
                    }, " 📁 批量导入文件夹 "),
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      disabled: xt.value,
                      onClick: Pe
                    }, " 🔄 刷新壁纸库 ", 8, Zn)
                  ]),
                  nt.value ? (i(), r("div", Qn, p(nt.value), 1)) : C("", !0)
                ]),
                t("div", ei, [
                  e[141] || (e[141] = t("label", null, [
                    k("精选预设与风格 "),
                    t("em", null, "BUILTIN PRESETS")
                  ], -1)),
                  t("div", ti, [
                    (i(), r(j, null, J(vo, (o) => t("div", {
                      key: o.id,
                      class: ce(["wallpaper-item-card", { "is-active": rt(o) }]),
                      onClick: (n) => Mt(o)
                    }, [
                      t("div", {
                        class: "wallpaper-card-preview",
                        style: dt(o.style ? o.style : o.thumb ? { backgroundImage: `url(${o.thumb})` } : {})
                      }, [
                        t("span", si, p(o.kind), 1),
                        rt(o) ? (i(), r("span", ni, "✓ 使用中")) : C("", !0)
                      ], 4),
                      t("div", ii, [
                        t("span", ri, p(o.title), 1)
                      ])
                    ], 10, oi)), 64))
                  ])
                ]),
                t("div", li, [
                  t("div", ai, [
                    t("label", di, [
                      e[142] || (e[142] = k("本地与自导入壁纸库 ", -1)),
                      t("em", null, "MY WALLPAPERS (" + p(Ne.value.length) + ")", 1)
                    ]),
                    wt.value > 1 ? (i(), r("div", pi, [
                      t("button", {
                        type: "button",
                        class: "btn-secondary",
                        style: { padding: "2px 8px", "font-size": "11px" },
                        disabled: Ve.value <= 1,
                        onClick: e[56] || (e[56] = (o) => Ve.value--)
                      }, " ◀ ", 8, ui),
                      t("span", ci, p(Ve.value) + " / " + p(wt.value), 1),
                      t("button", {
                        type: "button",
                        class: "btn-secondary",
                        style: { padding: "2px 8px", "font-size": "11px" },
                        disabled: Ve.value >= wt.value,
                        onClick: e[57] || (e[57] = (o) => Ve.value++)
                      }, " ▶ ", 8, gi)
                    ])) : C("", !0)
                  ]),
                  Ne.value.length === 0 ? (i(), r("div", vi, " 暂无导入的自定义壁纸，点击上方「＋ 导入本地图片」或「▶ 导入动态视频」添加你喜爱的桌面壁纸！ ")) : (i(), r("div", fi, [
                    (i(!0), r(j, null, J(Ot.value, (o) => (i(), r("div", {
                      key: o.id,
                      class: ce(["wallpaper-item-card", { "is-active": rt(o) }]),
                      onClick: (n) => Mt(o)
                    }, [
                      t("div", xi, [
                        o.kind === "视频" && ie[o.id] ? (i(), r("video", {
                          key: 0,
                          src: ie[o.id],
                          autoplay: "",
                          loop: "",
                          muted: "",
                          playsinline: "",
                          preload: "metadata"
                        }, null, 8, wi)) : ie[o.id] || o.thumb ? (i(), r("img", {
                          key: 1,
                          src: ie[o.id] || o.thumb,
                          alt: "",
                          loading: "lazy"
                        }, null, 8, mi)) : (i(), r("div", hi, p(o.kind === "视频" ? "▶" : "🖼️"), 1)),
                        t("span", yi, p(o.kind || "本地"), 1),
                        rt(o) ? (i(), r("span", ki, "✓ 使用中")) : C("", !0),
                        t("button", {
                          type: "button",
                          class: "wallpaper-card-delete-btn",
                          title: Ge.value === o.id ? "再次点击确认删除" : "删除该壁纸",
                          onClick: at((n) => mo(o), ["stop"])
                        }, p(Ge.value === o.id ? "✓" : "×"), 9, Ci)
                      ]),
                      t("div", {
                        class: "wallpaper-card-meta",
                        onClick: e[59] || (e[59] = at(() => {
                        }, ["stop"]))
                      }, [
                        Fe.value === o.id ? (i(), r(j, { key: 0 }, [
                          a(t("input", {
                            "onUpdate:modelValue": e[58] || (e[58] = (n) => it.value = n),
                            type: "text",
                            style: { width: "100%", "box-sizing": "border-box", padding: "2px 6px", "font-size": "11px", border: "1px solid #38bdf8", "border-radius": "4px", background: "var(--panel)", color: "var(--text)" },
                            onKeydown: [
                              Kt((n) => jt(o), ["enter"]),
                              Kt(_t, ["esc"])
                            ]
                          }, null, 40, Si), [
                            [P, it.value]
                          ]),
                          t("button", {
                            type: "button",
                            class: "wallpaper-card-edit-btn",
                            title: "保存",
                            onClick: (n) => jt(o)
                          }, "✓", 8, Ti),
                          t("button", {
                            type: "button",
                            class: "wallpaper-card-edit-btn",
                            title: "取消",
                            onClick: _t
                          }, "✕")
                        ], 64)) : (i(), r(j, { key: 1 }, [
                          t("span", {
                            class: "wallpaper-card-title",
                            title: o.title
                          }, p(o.title || "自定义壁纸"), 9, zi),
                          t("button", {
                            type: "button",
                            class: "wallpaper-card-edit-btn",
                            title: "重命名",
                            onClick: (n) => ho(o)
                          }, "✏️", 8, Ei)
                        ], 64))
                      ])
                    ], 10, bi))), 128))
                  ]))
                ])
              ])
            ], 512), [
              [Ee, g.value === "wallpaper"]
            ]),
            a(t("section", $i, [
              e[159] || (e[159] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "06"),
                t("div", null, [
                  t("h2", null, "数据备份、多端云同步与版本更新"),
                  t("p", null, "管理新标签页的 WebDAV 云端同步、本地 JSON 配置快照导出，以及版本检查与热重载。")
                ])
              ], -1)),
              t("div", Li, [
                t("div", Ai, [
                  e[149] || (e[149] = t("label", null, [
                    k("☁️ WebDAV 多端云端漫游 "),
                    t("em", null, "WEBDAV CLOUD SYNC")
                  ], -1)),
                  e[150] || (e[150] = t("p", {
                    class: "hint",
                    style: { margin: "0 0 10px" }
                  }, " 支持坚果云、Nextcloud、私有 NAS 或 VPS 搭建的 WebDAV 服务。配置后可实现不同电脑间配置一键漫游同步。 ", -1)),
                  t("div", Ui, [
                    t("div", null, [
                      e[144] || (e[144] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "WebDAV 服务器地址", -1)),
                      a(t("input", {
                        "onUpdate:modelValue": e[60] || (e[60] = (o) => U.webdavUrl = o),
                        type: "url",
                        placeholder: "https://dav.jianguoyun.com/dav/LogicWeaver/",
                        style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
                      }, null, 512), [
                        [P, U.webdavUrl]
                      ]),
                      e[145] || (e[145] = t("small", { style: { "font-size": "10px", color: "var(--muted)", "margin-top": "2px", display: "block" } }, "坚果云用户推荐在应用管理生成应用密码，地址填写根目录或子文件夹。", -1))
                    ]),
                    t("div", Vi, [
                      t("div", Pi, [
                        e[146] || (e[146] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "账号 / 邮箱", -1)),
                        a(t("input", {
                          "onUpdate:modelValue": e[61] || (e[61] = (o) => U.webdavUsername = o),
                          type: "text",
                          placeholder: "account@example.com",
                          style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
                        }, null, 512), [
                          [P, U.webdavUsername]
                        ])
                      ]),
                      t("div", Ri, [
                        e[147] || (e[147] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "应用专用密码", -1)),
                        a(t("input", {
                          "onUpdate:modelValue": e[62] || (e[62] = (o) => U.webdavPassword = o),
                          type: "password",
                          placeholder: "••••••••••••",
                          style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
                        }, null, 512), [
                          [P, U.webdavPassword]
                        ])
                      ]),
                      t("div", Wi, [
                        e[148] || (e[148] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "备份文件名", -1)),
                        a(t("input", {
                          "onUpdate:modelValue": e[63] || (e[63] = (o) => U.webdavFilename = o),
                          type: "text",
                          placeholder: "logicweaver-settings.json",
                          style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
                        }, null, 512), [
                          [P, U.webdavFilename]
                        ])
                      ])
                    ]),
                    t("div", Di, [
                      t("button", {
                        type: "button",
                        class: "btn-primary",
                        disabled: z.value,
                        onClick: Ze
                      }, " 保存连接设置 ", 8, Ii),
                      t("button", {
                        type: "button",
                        class: "btn-secondary",
                        disabled: z.value,
                        onClick: O
                      }, " 测试连接 ", 8, Oi),
                      t("button", {
                        type: "button",
                        class: "btn-save-green",
                        disabled: z.value,
                        onClick: be
                      }, " ⬆️ 上传备份到云端 ", 8, Mi),
                      t("button", {
                        type: "button",
                        class: "btn-secondary",
                        disabled: z.value,
                        style: { color: "#0284c7" },
                        onClick: Le
                      }, " ⬇️ 从云端恢复备份 ", 8, ji)
                    ]),
                    T.value ? (i(), r("div", _i, p(T.value), 1)) : C("", !0)
                  ])
                ]),
                t("div", Bi, [
                  e[153] || (e[153] = t("label", null, [
                    k("📦 本地数据快照文件 "),
                    t("em", null, "LOCAL BACKUP & RESTORE")
                  ], -1)),
                  t("div", Ni, [
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      onClick: xe
                    }, " 💾 导出配置为本地 JSON "),
                    t("label", Fi, [
                      e[151] || (e[151] = k(" 📂 导入本地 JSON 恢复 ", -1)),
                      t("input", {
                        type: "file",
                        accept: ".json,application/json",
                        style: { display: "none" },
                        onChange: we
                      }, null, 32)
                    ]),
                    q.value ? (i(), r("span", Gi, p(q.value), 1)) : C("", !0),
                    e[152] || (e[152] = t("small", { style: { "flex-basis": "100%", color: "var(--muted)", "font-size": "10.5px", "margin-top": "2px" } }, " 本地快照包含常用网站、分组布局、主题、快捷键等普通配置，不含任何账户密码私密信息。 ", -1))
                  ])
                ]),
                t("div", Hi, [
                  e[158] || (e[158] = t("label", null, [
                    k("🚀 插件版本与 GitHub 在线更新 "),
                    t("em", null, "RELEASE & GIT")
                  ], -1)),
                  t("div", qi, [
                    t("div", null, [
                      t("div", Yi, p(l(ke)), 1),
                      t("div", Ki, p(l(et)), 1)
                    ]),
                    t("div", Ji, [
                      l(Qe) ? (i(), r("button", {
                        key: 0,
                        type: "button",
                        class: "btn-save-green",
                        title: "本地文件已更新，点击一键重新载入扩展生效",
                        onClick: e[64] || (e[64] = //@ts-ignore
                        (...o) => l(ot) && l(ot)(...o))
                      }, " 🔄 立即重新载入扩展 ")) : C("", !0),
                      t("button", {
                        type: "button",
                        class: "btn-secondary",
                        disabled: l(Ce) || l(_e),
                        onClick: e[65] || (e[65] = //@ts-ignore
                        (...o) => l(Wt) && l(Wt)(...o))
                      }, p(l(Ce) ? "正在检测最新版…" : "🔍 检查最新版本"), 9, Xi),
                      l(te) ? (i(), r("button", {
                        key: 1,
                        type: "button",
                        class: "btn-primary",
                        onClick: e[66] || (e[66] = //@ts-ignore
                        (...o) => l(It) && l(It)(...o))
                      }, " 一键本地拉取 (Git) ")) : C("", !0)
                    ])
                  ]),
                  l(je) ? (i(), r("div", Zi, p(l(je)), 1)) : C("", !0),
                  l(po) || !l(tt) ? (i(), r("div", Qi, [
                    t("div", er, [
                      e[154] || (e[154] = t("strong", { style: { "font-size": "12px" } }, "GitHub 访问 Token（私有仓库协作者在线拉取）", -1)),
                      t("button", {
                        type: "button",
                        style: { padding: "2px 8px", "font-size": "11px" },
                        onClick: e[67] || (e[67] = //@ts-ignore
                        (...o) => l(Rt) && l(Rt)(...o))
                      }, "保存 Token")
                    ]),
                    a(t("input", {
                      "onUpdate:modelValue": e[68] || (e[68] = (o) => Oo(tt) ? tt.value = o : null),
                      type: "password",
                      placeholder: "ghp_... 输入你的 GitHub Personal Access Token",
                      style: { "font-size": "11px", padding: "6px 8px" }
                    }, null, 512), [
                      [P, l(tt)]
                    ]),
                    e[155] || (e[155] = t("p", {
                      class: "hint",
                      style: { margin: "0" }
                    }, "填写后可免安装 Git 直接从 GitHub 在线检测、进度条下载最新版插件压缩包。", -1))
                  ])) : C("", !0),
                  l(Ae) ? (i(), r("div", tr, [
                    t("div", or, [
                      t("div", null, [
                        t("span", sr, "🎉 发现新版本：" + p(l(Ae).tag_name), 1),
                        l(Ae).name ? (i(), r("span", nr, "(" + p(l(Ae).name) + ")", 1)) : C("", !0)
                      ]),
                      l(lo) && !l(gt) ? (i(), r("button", {
                        key: 0,
                        type: "button",
                        class: "btn-primary",
                        disabled: l(_e),
                        onClick: e[69] || (e[69] = //@ts-ignore
                        (...o) => l(Dt) && l(Dt)(...o))
                      }, p(l(_e) ? "下载中…" : "⬇️ 一键下载更新包"), 9, ir)) : C("", !0)
                    ]),
                    l(Ae).body ? (i(), r("div", rr, p(l(Ae).body), 1)) : C("", !0),
                    l(_e) || l(Pt) > 0 ? (i(), r("div", lr, [
                      t("div", ar, [
                        t("span", null, p(l(_e) ? "正在从 GitHub 下载安装包…" : l(gt) ? "已交给浏览器保存" : "已暂停"), 1),
                        t("strong", null, p(l(ao)), 1)
                      ]),
                      t("div", dr, [
                        t("div", {
                          class: "download-progress-bar",
                          style: dt({ width: `${l(Pt)}%` })
                        }, null, 4)
                      ])
                    ])) : C("", !0),
                    l(gt) ? (i(), r("div", pr, [
                      e[156] || (e[156] = t("strong", null, "安装包已交给浏览器，请在下载列表确认保存完成。", -1)),
                      e[157] || (e[157] = t("p", { style: { margin: "0", "font-size": "11px", "line-height": "1.4" } }, " 解压安装包覆盖到当前扩展目录后，点击下方按钮即可一键重新载入生效，无需重启浏览器： ", -1)),
                      t("button", {
                        type: "button",
                        class: "btn-save-green",
                        style: { "align-self": "flex-start", "margin-top": "4px" },
                        onClick: e[70] || (e[70] = //@ts-ignore
                        (...o) => l(ot) && l(ot)(...o))
                      }, " 🔄 立即重新载入扩展 (Hot Reload) ")
                    ])) : C("", !0)
                  ])) : C("", !0)
                ])
              ])
            ], 512), [
              [Ee, g.value === "sync"]
            ]),
            a(t("section", ur, [
              e[160] || (e[160] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "07"),
                t("div", null, [
                  t("h2", null, "文件夹与存储"),
                  t("p", null, "按用途管理本地目录，各目录独立授权。")
                ])
              ], -1)),
              g.value === "storage" ? (i(), Mo(l(S), {
                key: 0,
                active: A.active && g.value === "storage",
                target: l(de).state.requestedStorageTarget,
                request: l(de).state.sectionRequest
              }, null, 8, ["active", "target", "request"])) : C("", !0)
            ], 512), [
              [Ee, g.value === "storage"]
            ])
          ], 8, gs)
        ], 512)
      ]),
      t("div", cr, [
        Be.value ? (i(), r("span", {
          key: 0,
          class: ce(["save-status-msg", { error: vt.value }])
        }, p(Be.value), 3)) : C("", !0),
        Ue.value || se.value ? (i(), r("span", gr, p(Ue.value ? "正在读取设置…" : "正在保存改动项…"), 1)) : C("", !0),
        t("button", {
          type: "button",
          class: "btn-save-green",
          disabled: !oe.value || se.value,
          onClick: e[71] || (e[71] = (o) => lt(!1))
        }, "保存", 8, vr),
        t("button", {
          type: "button",
          class: "btn-secondary",
          onClick: Po
        }, "返回")
      ])
    ], 8, is));
  }
});
export {
  Sr as default
};
