import { b as c, w as dt, d as to, f as $o, n as Uo, o as Ao, g as r, h as l, i as t, k as it, u as T, F as B, z as Z, s as ce, t as u, j as k, x as i, q as a, D as Se, y as ge, Q as O, B as rt, v as R, m as Ft, A as Gt, M as Vo, I as Po, J as Ro, c as Re, r as lt } from "./vendor-vue-BUkfvXUI.js";
import { o as Ye, A as Wo, D as mt, i as yt, L as ht, a as re, S as Te, b as ve, G as kt } from "./options.service-CqI6inJ-.js";
import { e as Do, i as Ht, D as Ct, g as qt, W as _ } from "./view-styles-CN1yT3tz.js";
import { s as le } from "./store-9q9o9-jB.js";
import { al as Yt, am as at, an as Io, ao as Mo, ap as jo, aq as Oo, ar as Bo, as as Kt, r as Jt, a3 as Xt, a5 as Zt, a4 as qe, t as Qt } from "./search.service-CJV_B19X.js";
import "./read-session-CysyqM5X.js";
import { w as St } from "./webdav.service-CQ7GsI47.js";
import { r as _o, c as No, a as Fo } from "./sync.service-Cv4Y5U-Z.js";
import { loadWebDavSettings as Go, saveWebDavSettings as Ho, toWebDavConfig as Tt } from "./settings-IMXKhcVf.js";
const qo = '.settings-view-root.settings-view-root{display:flex;flex-direction:column;height:100%;width:100%;overflow:hidden;background:var(--background);color:var(--text);font-family:inherit;position:relative}.settings-view-root.settings-view-root button{box-sizing:border-box;font-family:inherit}.settings-view-root .settings-view-shell{position:relative;display:grid;grid-template-columns:220px minmax(0,1fr);height:100%;overflow:hidden}.settings-view-root .settings-fields{display:contents}.settings-view-root .settings-brand,.settings-view-root .settings-hero{touch-action:none}.settings-view-root .settings-view-nav{width:220px;flex-shrink:0;display:flex;flex-direction:column;padding:24px 14px 16px;background:color-mix(in srgb,var(--panel) 85%,transparent);border-right:1px solid var(--border);overflow-y:auto}.settings-view-root .settings-brand{display:flex;align-items:center;gap:10px;margin-bottom:24px;cursor:grab;user-select:none}.settings-view-root .settings-brand-mark{display:grid;width:34px;height:34px;flex:none;place-items:center;border:1px solid rgba(56,189,248,.35);border-radius:10px;background:linear-gradient(145deg,#38bdf82e,#34d39914);color:#7dd3fc;font-size:14px;font-weight:850}.settings-view-root .settings-brand strong{display:block;font-size:13px;letter-spacing:.03em;color:var(--heading);white-space:nowrap}.settings-view-root .settings-brand small{display:block;font-size:8px;color:var(--dim);letter-spacing:.11em;white-space:nowrap}.settings-view-root .settings-nav-label{margin:0 6px 8px;color:var(--dim);font-size:9px;font-weight:800;letter-spacing:.16em;white-space:nowrap}.settings-view-root .settings-nav-links{display:flex;flex-direction:column;gap:5px}.settings-view-root .nav-tab-btn{width:100%!important;min-width:0!important;height:38px!important;display:flex!important;align-items:center!important;gap:10px!important;padding:0 12px!important;border:1px solid transparent;border-radius:9px;background:transparent;color:var(--muted);font-size:11.5px;font-weight:600;cursor:pointer;text-align:left;white-space:nowrap!important;transition:all .16s ease;user-select:none}.settings-view-root .nav-tab-btn span{display:grid;width:22px;height:22px;flex:none;place-items:center;border-radius:6px;background:var(--surface);font-size:10px}.settings-view-root .nav-tab-btn:hover{background:var(--surface-hover);color:var(--heading);transform:translate(2px)}.settings-view-root .nav-tab-btn.active{border-color:#38bdf859;background:#38bdf81f;color:#38bdf8}.settings-view-root .nav-tab-btn.active span{background:#38bdf8;color:#04151a;font-weight:800}.settings-view-root .settings-nav-dev-card{margin-top:auto;padding:12px 10px;border-radius:10px;border:1px dashed rgba(56,189,248,.35);background:#38bdf80d;display:flex;flex-direction:column;gap:6px}.settings-view-root .btn-nav-dev-preview{width:100%;padding:7px 10px;border-radius:7px;border:1px solid rgba(56,189,248,.45);background:#38bdf81f;color:#0284c7;font-size:11px;font-weight:700;cursor:pointer;transition:all .14s ease;text-align:center}.settings-view-root .btn-nav-dev-preview.primary{background:linear-gradient(135deg,#38bdf840,#0ea5e959);border-color:#38bdf8;color:#0284c7}.settings-view-root .btn-nav-dev-preview.primary:hover:not(:disabled){background:#0284c7;color:#fff;transform:translateY(-1px)}.settings-view-root .btn-nav-dev-preview.secondary{background:transparent;border-color:#94a3b84d;color:var(--muted);font-size:10px}.settings-view-root .btn-nav-dev-preview.secondary:hover{background:#94a3b826;color:var(--text)}html[data-theme=dark] .settings-view-root .btn-nav-dev-preview.primary,html[data-theme=endfield] .settings-view-root .btn-nav-dev-preview.primary{color:#38bdf8;background:linear-gradient(135deg,#38bdf833,#0ea5e940)}html[data-theme=dark] .settings-view-root .btn-nav-dev-preview.primary:hover:not(:disabled),html[data-theme=endfield] .settings-view-root .btn-nav-dev-preview.primary:hover:not(:disabled){background:#38bdf8;color:#04151a}html[data-theme=dark] .settings-view-root .btn-nav-dev-preview,html[data-theme=endfield] .settings-view-root .btn-nav-dev-preview{color:#38bdf8;background:#38bdf82e}.settings-view-root .btn-nav-dev-preview:hover{background:#38bdf8;color:#fff;transform:translateY(-1px)}.settings-view-root .btn-nav-dev-preview.active{background:#10b981;border-color:#10b981;color:#fff}.settings-view-root .settings-nav-dev-card p{margin:0;font-size:9.5px;color:var(--muted);line-height:1.45}.settings-view-root .settings-local-note{margin-top:auto;padding:10px;border:1px solid rgba(52,211,153,.2);border-radius:8px;background:#34d3990d;color:var(--muted);font-size:9px;line-height:1.5}.settings-view-root .settings-local-note b{display:block;margin-bottom:2px;color:#6ee7b7}.settings-view-root .settings-view-main{padding:28px 36px 90px;overflow-y:auto}.settings-view-root .settings-hero{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:22px;padding-right:88px;cursor:grab;user-select:none}.settings-view-root .settings-window-actions{position:absolute;top:24px;right:32px;z-index:90;display:flex;align-items:center;gap:8px;flex-shrink:0;user-select:none}.settings-view-root .settings-win-btn{border:1px solid var(--border);background:var(--surface);color:var(--muted);border-radius:9px;width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;transition:all .16s ease}.settings-view-root .settings-win-btn:hover{background:var(--surface-hover);color:var(--heading);border-color:var(--border-hover)}.settings-view-root .settings-win-btn.close:hover{background:#ef44442e;color:#ef4444;border-color:#ef444466}.settings-view-root .settings-kicker{margin:0 0 6px;color:#38bdf8;font-size:9px;font-weight:850;letter-spacing:.17em}.settings-view-root .settings-hero h1{margin:0;font-size:24px;color:var(--heading)}.settings-view-root .settings-hero p{margin:6px 0 0;color:var(--muted);font-size:11px;max-width:600px}.settings-view-root .settings-panel{padding:18px 20px;border:1px solid var(--border);border-radius:14px;background:color-mix(in srgb,var(--panel) 75%,transparent)}.settings-view-root .settings-subgroup{margin-top:16px;padding:16px 18px;border:1px solid var(--border);border-radius:14px;background:color-mix(in srgb,var(--surface) 50%,transparent)}.settings-view-root .settings-subgroup:first-of-type{margin-top:8px}.settings-view-root .settings-subgroup-title{display:flex;align-items:center;gap:8px;margin:0 0 12px;font-size:13.5px;font-weight:700;color:var(--heading)}.settings-view-root .settings-subgroup-title small{font-size:10.5px;font-weight:400;color:var(--muted);text-transform:uppercase}.settings-view-root .panel-head{display:flex!important;align-items:flex-start!important;justify-content:flex-start!important;gap:12px!important;margin-bottom:16px!important;padding:0!important;border-bottom:none!important;cursor:default!important;touch-action:auto!important;user-select:auto!important}.settings-view-root .panel-index{display:grid;width:28px;height:28px;place-items:center;border:1px solid rgba(56,189,248,.25);border-radius:8px;background:#38bdf814;color:#7dd3fc;font-size:9px;font-weight:850}.settings-view-root .panel-head h2{margin:0;font-size:14px;color:var(--heading)}.settings-view-root .panel-head p{margin:3px 0 0;font-size:9px;color:var(--dim)}.settings-view-root .module-toggles{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:9px}.settings-view-root .toggle-card{position:relative;display:flex;min-height:60px;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);cursor:pointer;transition:all .15s ease}.settings-view-root .toggle-card:hover{background:var(--surface-hover);border-color:#ffffff26}.settings-view-root .toggle-card input{position:absolute;opacity:0}.settings-view-root .toggle-copy b{display:block;font-size:11px;color:var(--heading)}.settings-view-root .toggle-copy small{display:block;font-size:8.5px;color:var(--dim);margin-top:2px}.settings-view-root .switch{position:relative;width:36px;height:20px;border-radius:999px;background:#cbd5e1;border:1px solid rgba(0,0,0,.12);transition:.2s ease;flex-shrink:0}html[data-theme=dark] .settings-view-root .switch,html[data-theme=endfield] .settings-view-root .switch{background:#fff3;border-color:#ffffff29}.settings-view-root .switch:after{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 3px #00000040;content:"";transition:.2s ease}.settings-view-root .toggle-card input:checked+.switch{background:#10b981;border-color:#059669}.settings-view-root .toggle-card input:checked+.switch:after{left:18px;background:#fff;box-shadow:0 1px 4px #0000004d}.settings-view-root .btn-save-green{display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 20px;border-radius:8px;border:1px solid #059669;background:#10b981;color:#fff;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 2px 8px #10b98152;transition:all .15s ease}.settings-view-root .btn-save-green:hover{background:#059669;border-color:#047857;box-shadow:0 4px 14px #10b9816b;transform:translateY(-1px)}.settings-view-root .btn-save-green:active{transform:translateY(0)}.settings-view-root .fields-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.settings-view-root .field{padding:12px;border:1px solid var(--border);border-radius:10px;background:var(--surface)}.settings-view-root .field.full-width{grid-column:1 / -1}.settings-view-root .field label{display:flex;align-items:center;justify-content:space-between;margin-bottom:7px;font-size:10px;font-weight:700;color:var(--heading)}.settings-view-root .field label em{font-style:normal;font-size:7.5px;color:#c4b5fd;background:#a78bfa1a;padding:2px 6px;border-radius:999px}.settings-view-root .field input[type=text],.settings-view-root .field input[type=password],.settings-view-root .field input[type=url],.settings-view-root .field input[type=email],.settings-view-root .field select{width:100%;min-height:36px;padding:8px 10px;border:1px solid var(--border);border-radius:8px;background:color-mix(in srgb,var(--panel) 90%,transparent);color:var(--text);font-size:11px;outline:none;transition:border-color .15s ease}.settings-view-root .field input:focus,.settings-view-root .field select:focus{border-color:#38bdf8;box-shadow:0 0 0 2px #38bdf826}.settings-view-root .color-picker{width:44px;height:36px;padding:2px;cursor:pointer;border-radius:8px;border:1px solid var(--border);background:transparent}.settings-view-root .hint{margin:6px 1px 0;font-size:8px;color:var(--dim);line-height:1.5}.settings-view-root .btn-primary{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:auto!important;height:auto!important;min-height:36px!important;padding:8px 16px!important;border:none;border-radius:8px;background:linear-gradient(135deg,#38bdf8,#34d399);color:#04151a;font-size:11px;font-weight:800;cursor:pointer;white-space:nowrap!important;transition:all .16s ease}.settings-view-root .btn-primary:hover{filter:brightness(1.1);transform:translateY(-1px)}.settings-view-root .btn-secondary{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:auto!important;height:auto!important;min-height:36px!important;padding:8px 14px!important;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap!important;transition:all .16s ease}.settings-view-root .btn-secondary:hover{border-color:#ffffff40;background:var(--surface-hover)}.settings-view-root .btn-secondary:disabled,.settings-view-root .btn-primary:disabled{opacity:.5;cursor:not-allowed}.settings-view-root .icon-btn-danger{width:24px;height:24px;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--dim);cursor:pointer;transition:all .15s ease}.settings-view-root .icon-btn-danger:hover{border-color:#ef4444;color:#ef4444;background:#ef444414}.settings-view-root .shortcuts-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.settings-view-root .shortcut-row{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface)}.settings-view-root .shortcut-label{font-size:11px;font-weight:600;color:var(--heading)}.settings-view-root .shortcut-actions{display:flex;align-items:center;gap:6px}.settings-view-root .shortcut-key-btn{min-width:86px;padding:4px 10px;font-size:10.5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:600;border:1px solid var(--border);border-radius:6px;background:#ffffff0f;color:var(--text);cursor:pointer;transition:all .15s ease}.settings-view-root .shortcut-key-btn.recording{border-color:#a855f7;background:#a855f729;color:#c084fc}.settings-view-root .shortcut-clear-btn{width:22px;height:22px;border-radius:5px;border:1px solid var(--border);background:transparent;color:var(--dim);cursor:pointer;font-size:10px}.settings-view-root .shortcut-clear-btn:hover{border-color:#ef4444;color:#ef4444}.settings-view-root .fixed-shortcuts-card{padding:12px 14px;border:1px solid var(--border);border-radius:10px;background:var(--surface)}.settings-view-root .fixed-shortcuts-head{font-size:11px;font-weight:700;color:var(--heading);margin-bottom:10px}.settings-view-root .fixed-shortcuts-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.settings-view-root .fixed-row{display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;background:#ffffff08;border:1px solid rgba(255,255,255,.06);font-size:10.5px}.settings-view-root .fs-keys kbd{padding:2px 5px;border:1px solid rgba(255,255,255,.15);border-radius:4px;background:#ffffff14;font-size:9.5px;font-family:ui-monospace,SFMono-Regular,monospace}.settings-view-root .ignored-folders-list{display:flex;flex-direction:column;gap:6px}.settings-view-root .ignored-folder-row{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface)}.settings-view-root .folder-path{font-size:11px;color:var(--heading)}.settings-view-root .sync-banner{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;background:#38bdf80f;border:1px solid rgba(56,189,248,.2);border-radius:10px;flex-wrap:wrap}.settings-view-root .update-log-box{margin-top:8px;padding:8px 12px;border-radius:6px;background:var(--surface);font-size:10px;color:var(--muted);line-height:1.5}.settings-view-root .release-card{margin-top:10px;padding:12px 14px;background:var(--surface);border:1px solid var(--border);border-radius:10px;display:flex;flex-direction:column;gap:8px}.settings-view-root .release-header{display:flex;align-items:center;justify-content:space-between;gap:8px}.settings-view-root .release-tag{font-weight:700;font-size:13px;color:var(--accent, #10b981)}.settings-view-root .release-notes{font-size:11px;color:var(--text);line-height:1.5;max-height:120px;overflow-y:auto;white-space:pre-wrap;background:var(--panel);padding:8px 10px;border-radius:6px;border:1px solid var(--border)}.settings-view-root .download-progress-box{margin-top:8px;display:flex;flex-direction:column;gap:6px}.settings-view-root .download-progress-label{display:flex;justify-content:space-between;font-size:11px;color:var(--muted)}.settings-view-root .download-progress-track{width:100%;height:8px;border-radius:4px;background:var(--panel);border:1px solid var(--border);overflow:hidden}.settings-view-root .download-progress-bar{height:100%;background:linear-gradient(90deg,#3b82f6,#10b981);border-radius:4px;transition:width .15s ease}.settings-view-root .download-finish-card{margin-top:8px;padding:10px 12px;border-radius:8px;background:#10b98114;border:1px solid rgba(16,185,129,.25);display:flex;flex-direction:column;gap:6px;font-size:12px;color:var(--heading)}.settings-view-root .github-token-box{margin-top:10px;padding:10px 12px;border-radius:8px;background:var(--surface);border:1px solid var(--border);display:flex;flex-direction:column;gap:6px}.settings-view-root .save-dock{position:absolute;right:28px;bottom:16px;display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px solid var(--border);border-radius:12px;background:color-mix(in srgb,var(--panel) 92%,transparent);box-shadow:0 16px 36px -12px #000c;z-index:10}.settings-view-root .save-status-msg{font-size:10px;font-weight:700;color:#34d399}.settings-view-root .save-status-msg.error{color:#fb7185}.settings-view-root .text-success{color:#34d399}.settings-view-root .text-danger{color:#fb7185}.settings-view-root .search-slots-list{display:flex;flex-direction:column;gap:8px;margin-top:6px}.settings-view-root .search-slot-row{display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);transition:all .16s ease}.settings-view-root .search-slot-row:hover{background:var(--surface-hover, var(--surface));border-color:var(--border-strong, var(--border))}.settings-view-root .search-slot-row.disabled{opacity:.55}.settings-view-root .search-slot-order{display:flex;flex-direction:column;gap:2px}.settings-view-root .btn-slot-move{width:18px;height:14px;padding:0;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);border-radius:3px;background:var(--panel);color:var(--muted);font-size:8px;cursor:pointer;line-height:1;transition:all .12s}.settings-view-root .btn-slot-move:hover:not(:disabled){border-color:#38bdf8;color:#38bdf8;background:#38bdf81a}.settings-view-root .btn-slot-move:disabled{opacity:.3;cursor:not-allowed}.settings-view-root .search-slot-badge-preview{width:32px;height:32px;border-radius:8px;border:1.5px solid;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}.settings-view-root .search-slot-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.settings-view-root .search-slot-title-row{display:flex;align-items:center;gap:6px}.settings-view-root .search-slot-name{font-size:13px;font-weight:650;color:var(--heading)}.settings-view-root .search-slot-tag{font-size:9.5px;padding:1px 5px;border-radius:4px;font-weight:600;line-height:1.2}.settings-view-root .search-slot-tag.builtin{background:#38bdf81f;color:#0284c7;border:1px solid rgba(56,189,248,.25)}.settings-view-root .search-slot-tag.custom{background:#10b9811f;color:#059669;border:1px solid rgba(16,185,129,.25)}.settings-view-root .search-slot-url{font-size:11px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.settings-view-root .search-slot-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.settings-view-root .btn-slot-del{width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--muted);font-size:12px;cursor:pointer;transition:all .14s}.settings-view-root .btn-slot-del:hover{background:#f43f5e1f;border-color:#f43f5e;color:#f43f5e}.settings-view-root .slot-switch-label{position:relative;display:inline-flex;align-items:center;cursor:pointer;user-select:none;flex-shrink:0;width:36px;height:20px}.settings-view-root .slot-switch-label input{position:absolute;inset:0;width:100%;height:100%;opacity:0;margin:0;cursor:pointer;z-index:2}.settings-view-root .slot-switch-label .switch{pointer-events:none}.settings-view-root .slot-switch-label input:checked+.switch{background:#10b981!important;border-color:#10b981!important}.settings-view-root .slot-switch-label input:checked+.switch:after{transform:translate(16px)!important;background:#fff!important}.settings-view-root .search-slot-add-drawer{margin-top:12px;padding:14px 16px;border:1px solid var(--border);border-radius:12px;background:var(--surface);display:flex;flex-direction:column;gap:12px;animation:slotDrawerSlide .15s ease-out}@keyframes slotDrawerSlide{0%{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}.settings-view-root .drawer-header{display:flex;flex-direction:column;gap:2px}.settings-view-root .drawer-header strong{font-size:13px;color:var(--heading)}.settings-view-root .drawer-header small{font-size:11px;color:var(--muted)}.settings-view-root .template-chips-section{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.settings-view-root .chips-label{font-size:11px;color:var(--muted);font-weight:600}.settings-view-root .template-chips{display:flex;flex-wrap:wrap;gap:6px}.settings-view-root .template-chip-btn{display:inline-flex;align-items:center;gap:4px;padding:4px 9px;border-radius:6px;border:1px solid var(--border);background:var(--panel);color:var(--text);font-size:11px;font-weight:550;cursor:pointer;transition:all .12s}.settings-view-root .template-chip-btn:hover{border-color:#38bdf8;background:#38bdf814;color:#0284c7;transform:translateY(-1px)}.settings-view-root .slot-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.settings-view-root .slot-form-field{display:flex;flex-direction:column;gap:4px}.settings-view-root .slot-form-field.full-width{grid-column:1 / -1}.settings-view-root .slot-form-field label{font-size:11.5px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:4px}.settings-view-root .slot-form-field label em{font-style:normal;font-size:9.5px;color:var(--muted)}.settings-view-root .slot-form-field input[type=text]{width:100%;box-sizing:border-box;padding:7px 10px;border:1px solid var(--border);border-radius:7px;background:var(--panel);color:var(--text);font-size:12px;outline:none;transition:border-color .14s}.settings-view-root .slot-form-field input[type=text]:focus{border-color:#38bdf8}.settings-view-root .field-hint{margin:3px 0 0;font-size:10.5px;color:var(--muted)}.settings-view-root .field-hint code{background:#38bdf81f;color:#0284c7;padding:1px 4px;border-radius:4px}.settings-view-root .quick-emojis{display:flex;align-items:center;gap:4px;flex-wrap:wrap}.settings-view-root .quick-emo-item{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:4px;cursor:pointer;font-size:14px;transition:transform .1s}.settings-view-root .quick-emo-item:hover{transform:scale(1.2);background:#38bdf826}.settings-view-root .quick-color-palette{display:flex;align-items:center;gap:6px}.settings-view-root .palette-dot{width:20px;height:20px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:all .12s}.settings-view-root .palette-dot:hover{transform:scale(1.15)}.settings-view-root .palette-dot.active{border-color:var(--heading);transform:scale(1.15)}.settings-view-root .slot-form-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:4px}.settings-view-root .btn-ghost-small{border:0;background:transparent;color:var(--muted);cursor:pointer;padding:4px 8px;border-radius:6px;transition:all .12s}.settings-view-root .btn-ghost-small:hover{color:#38bdf8;background:#38bdf814}@media(max-width:800px){.settings-view-root .settings-view-shell{grid-template-columns:1fr}.settings-view-root .settings-view-nav{flex-direction:row;overflow-x:auto;border-right:none;border-bottom:1px solid var(--border);padding:10px 14px}.settings-view-root .settings-brand,.settings-view-root .settings-nav-label,.settings-view-root .settings-local-note{display:none}.settings-view-root .settings-nav-links{flex-direction:row}.settings-view-root .nav-tab-btn{white-space:nowrap}.settings-view-root .fields-grid,.settings-view-root .shortcuts-grid,.settings-view-root .fixed-shortcuts-grid{grid-template-columns:1fr}.settings-view-root .save-dock{left:16px;right:16px;justify-content:flex-end}}.settings-view-root .wallpaper-presets-grid,.settings-view-root .wallpaper-library-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:10px}.settings-view-root .wallpaper-item-card{position:relative;border-radius:10px;border:1px solid var(--border);background:var(--panel);overflow:hidden;cursor:pointer;transition:all .2s cubic-bezier(.16,1,.3,1);display:flex;flex-direction:column}.settings-view-root .wallpaper-item-card:hover{border-color:#38bdf8;transform:translateY(-2px);box-shadow:0 4px 12px #00000014}.settings-view-root .wallpaper-item-card.is-active{border-color:#38bdf8;box-shadow:0 0 0 2px #38bdf859}.settings-view-root .wallpaper-card-preview{position:relative;width:100%;aspect-ratio:16 / 9;background-size:cover;background-position:center;background-repeat:no-repeat;display:flex;align-items:center;justify-content:center;overflow:hidden;background-color:color-mix(in srgb,var(--panel) 85%,var(--text) 15%)}.settings-view-root .wallpaper-card-preview img,.settings-view-root .wallpaper-card-preview video{width:100%;height:100%;object-fit:cover}.settings-view-root .wallpaper-card-badge{position:absolute;top:6px;left:6px;padding:2px 6px;border-radius:4px;background:#000000a6;color:#fff;font-size:10px;font-weight:600;backdrop-filter:blur(4px)}.settings-view-root .wallpaper-card-active-pill{position:absolute;bottom:6px;right:6px;padding:2px 7px;border-radius:4px;background:#0284c7;color:#fff;font-size:10px;font-weight:600;box-shadow:0 2px 4px #00000040}.settings-view-root .wallpaper-card-delete-btn{position:absolute;top:6px;right:6px;width:22px;height:22px;border-radius:50%;border:none;background:#ef4444d9;color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:all .15s ease}.settings-view-root .wallpaper-item-card:hover .wallpaper-card-delete-btn{opacity:1}.settings-view-root .wallpaper-card-meta{padding:8px 10px;display:flex;align-items:center;justify-content:space-between;gap:6px;background:var(--surface);border-top:1px solid var(--border)}.settings-view-root .wallpaper-card-title{font-size:11.5px;font-weight:500;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}.settings-view-root .wallpaper-card-edit-btn{border:none;background:transparent;cursor:pointer;font-size:11px;color:var(--muted);padding:2px;border-radius:4px;opacity:.6}.settings-view-root .wallpaper-card-edit-btn:hover{opacity:1;color:#38bdf8}', eo = "https://api.github.com/repos/kongzhuww/tab-project-next/releases";
function Ke(L) {
  return L !== null && typeof L == "object" ? L : {};
}
function Yo(L) {
  const C = Ke(L);
  if (typeof C.tag_name != "string" || !/^v?\d+(?:\.\d+){1,3}$/i.test(C.tag_name))
    throw new Error("发行版版本号无效，无法比较更新");
  const V = [];
  for (const F of Array.isArray(C.assets) ? C.assets : []) {
    const g = Ke(F);
    if (typeof g.id != "number" || !Number.isSafeInteger(g.id) || g.id <= 0 || typeof g.name != "string" || !/^[\w.() -]+\.zip$/i.test(g.name) || typeof g.size != "number" || !Number.isSafeInteger(g.size) || g.size < 0) continue;
    let m;
    try {
      m = new URL(String(g.browser_download_url));
    } catch {
      continue;
    }
    m.origin !== "https://github.com" || m.username || m.password || !m.pathname.startsWith("/kongzhuww/tab-project-next/releases/download/") || V.push({ id: g.id, name: g.name, size: g.size, browser_download_url: m.href });
  }
  return {
    tag_name: C.tag_name,
    name: typeof C.name == "string" ? C.name : "",
    body: typeof C.body == "string" ? C.body : "",
    assets: V
  };
}
function Ko(L, C) {
  const V = (m) => {
    if (!/^v?\d+(?:\.\d+){1,3}$/i.test(m)) throw new Error("版本号格式无效");
    return m.replace(/^v/i, "").split(".").map(Number);
  }, F = V(L), g = V(C);
  for (let m = 0; m < Math.max(F.length, g.length); m++) {
    const G = (F[m] || 0) - (g[m] || 0);
    if (G) return Math.sign(G);
  }
  return 0;
}
function Jo(L) {
  return L.assets.find((C) => /-extension\.zip$/i.test(C.name));
}
const N = globalThis.chrome, zt = (L) => L instanceof Error ? L.message : "操作失败";
function Xo(L, C = () => !0) {
  const V = c(!1), F = c(`LogicWeaver 当前版本: v${N?.runtime?.getManifest().version || "未知"}`), g = c("本地构建版本"), m = c(!1), G = c(!1), I = c(""), We = c(null), $ = c(null), H = c(!1), S = c(0), z = c(""), q = c(!1), Q = c(""), Je = c(!1);
  let M = !0, fe = 0, ze = 0, be = 0, xe = !1, De;
  const we = /* @__PURE__ */ new Set();
  function me(y) {
    const d = new AbortController();
    we.add(d);
    const f = setTimeout(() => d.abort(), y);
    return { signal: d.signal, finish: () => {
      clearTimeout(f), we.delete(d);
    } };
  }
  function D(y = !1) {
    const d = { Accept: y ? "application/octet-stream" : "application/vnd.github+json" }, f = Q.value.trim();
    return f && (d.Authorization = `Bearer ${f}`), d;
  }
  async function Ie() {
    const y = ++ze;
    let d = "";
    const f = me(1e4);
    try {
      if (N?.runtime) {
        const U = await fetch(N.runtime.getURL("manifest.json") + "?t=" + Date.now(), { signal: f.signal }), j = U.ok ? Ke(await U.json()) : {};
        typeof j.version == "string" && (d = j.version);
      }
    } catch {
    } finally {
      f.finish();
    }
    const P = N?.runtime?.getManifest().version || d, h = d || P;
    return M && C() && y === ze && (V.value = !!(d && P && d !== P), F.value = V.value ? `LogicWeaver 当前版本: v${P} (磁盘最新: v${d})` : `LogicWeaver 当前版本: ${h ? "v" + h : "未知"}`, g.value = V.value ? "本地文件已更新，点击右侧「立即重新载入」生效" : "本地构建版本"), h;
  }
  async function pt() {
    const y = Q.value;
    try {
      const d = N?.storage?.local ? await N.storage.local.get(["ghToken"]) : { ghToken: localStorage.getItem("ghToken") };
      M && Q.value === y && typeof d.ghToken == "string" && (Q.value = d.ghToken);
    } catch {
    }
  }
  async function Me() {
    try {
      const y = Q.value.trim();
      if (N?.storage?.local ? await N.storage.local.set({ ghToken: y }) : localStorage.setItem("ghToken", y), !M) return;
      L("GitHub Token 已保存，正在重新检测更新…"), await p();
    } catch {
      M && L("Token 保存失败，请重试。", !0);
    }
  }
  async function p() {
    if (!M || !C() || xe || m.value || H.value) return;
    const y = ++fe, d = () => M && C() && y === fe;
    m.value = !0, G.value = !1, I.value = "", We.value = null, $.value = null, S.value = 0, q.value = !1;
    const f = me(3e4);
    try {
      const P = await Ie();
      if (!d()) return;
      Ye.callNativeHost({ command: "git-check-update" }).then((j) => {
        const A = Ke(j);
        !d() || A.ok !== !0 || typeof A.localCommit != "string" || (V.value || (g.value = `本地 Commit: ${A.localCommit}${typeof A.commitDesc == "string" ? " (" + A.commitDesc + ")" : ""}`), G.value = A.hasUpdate === !0 && Number(A.behindCount) > 0);
      }).catch(() => {
      });
      const h = await fetch(`${eo}/latest`, { headers: D(), signal: f.signal });
      if (!d()) return;
      if (!h.ok) {
        h.status === 401 || h.status === 404 ? (Je.value = !0, I.value = "未能读取发行版，可能未发布或需要仓库访问权限；请核对 Token 后重试。") : I.value = `GitHub API 返回异常状态 (${h.status})`;
        return;
      }
      const U = Yo(await h.json());
      if (!d()) return;
      if (Ko(U.tag_name, P) > 0) {
        const j = Jo(U);
        if (!j) {
          I.value = `发现 ${U.tag_name}，但尚无可下载的扩展安装包。`;
          return;
        }
        We.value = U, $.value = j, I.value = `发现新版本 ${U.tag_name}！包含最新功能与优化。`;
      } else I.value = `✓ 当前已是最新版本 (v${P})，暂无新更新。`;
    } catch (P) {
      d() && (I.value = `检查失败：${zt(P)}`);
    } finally {
      f.finish(), d() && (m.value = !1);
    }
  }
  async function v() {
    const y = $.value;
    if (!M || !C() || !y || H.value || m.value || xe) return;
    const d = be, f = () => M && C() && d === be;
    H.value = !0, S.value = 0, z.value = "正在连接 GitHub 下载数据流…", q.value = !1;
    const P = me(3e5);
    let h;
    try {
      const U = await fetch(`${eo}/assets/${y.id}`, { headers: D(!0), signal: P.signal });
      if (!U.ok) throw new Error(`下载失败 (HTTP ${U.status})，请核对权限后重试`);
      const j = 256 * 1024 * 1024, A = Number(U.headers.get("Content-Length")) || y.size;
      if (A > j) throw new Error("安装包超过 256 MB，请通过发行版页面手动下载");
      const Ee = U.body?.getReader();
      if (!Ee) throw new Error("浏览器不支持数据流读取");
      const Xe = [];
      let he = 0;
      try {
        for (; ; ) {
          const { done: J, value: te } = await Ee.read();
          if (J) break;
          if (he += te.byteLength, he > j) throw new Error("下载内容超过大小限制");
          if (Xe.push(new Uint8Array(te)), !f()) return;
          S.value = A > 0 ? Math.min(100, Math.round(he / A * 100)) : 0, z.value = `${S.value}% (${(he / 1048576).toFixed(1)} MB / ${(A / 1048576).toFixed(1)} MB)`;
        }
      } finally {
        await Ee.cancel().catch(() => {
        }), Ee.releaseLock();
      }
      if (!f()) return;
      const je = new Blob(Xe, { type: "application/zip" }), Le = new Uint8Array(await je.slice(0, 4).arrayBuffer());
      if (Le[0] !== 80 || Le[1] !== 75 || Le[2] !== 3 || Le[3] !== 4) throw new Error("返回内容不是 ZIP 安装包");
      if (!f()) return;
      if (h = URL.createObjectURL(je), N?.downloads) await N.downloads.download({ url: h, filename: y.name, saveAs: !1 });
      else {
        const J = document.createElement("a");
        J.href = h, J.download = y.name, document.body.appendChild(J), J.click(), J.remove();
      }
      f() && (q.value = !0, S.value = 100, z.value = `已交给浏览器保存 (${(he / 1048576).toFixed(1)} MB)，请在下载列表确认`);
    } catch (U) {
      f() && (I.value = `下载中断：${zt(U)}`);
    } finally {
      if (P.finish(), h) {
        const U = h;
        setTimeout(() => URL.revokeObjectURL(U), 6e4);
      }
      f() && (H.value = !1);
    }
  }
  function ee() {
    N?.runtime ? N.runtime.reload() : window.location.reload();
  }
  async function ye() {
    if (!M || !C() || xe || m.value || H.value || !G.value) return;
    xe = !0;
    const y = be, d = () => M && C() && y === be;
    ++fe, G.value = !1, m.value = !0;
    try {
      const f = Ke(await Ye.callNativeHost({ command: "git-apply-update" }));
      if (!d()) return;
      f.ok === !0 ? (V.value = !0, L("更新拉取成功，即将重新载入扩展…"), De = setTimeout(() => {
        d() && ee();
      }, 1200)) : L(typeof f.error == "string" ? f.error : "更新应用失败", !0);
    } catch (f) {
      d() && L(zt(f), !0);
    } finally {
      xe = !1, d() && (m.value = !1);
    }
  }
  return dt(C, (y) => {
    if (!y) {
      ++be, ++fe, ++ze;
      for (const d of we) d.abort();
      clearTimeout(De), m.value = !1, G.value = !1, H.value = !1;
    }
  }), to(() => {
    M = !1, ++fe, ++ze;
    for (const y of we) y.abort();
    we.clear(), clearTimeout(De), Q.value = "";
  }), {
    needsReloadToApply: V,
    currentVersionText: F,
    currentCommitText: g,
    checkingUpdate: m,
    canApplyUpdate: G,
    updateStatusMessage: I,
    onlineRelease: We,
    onlineAsset: $,
    isDownloading: H,
    downloadPercent: S,
    downloadReceivedText: z,
    downloadCompleted: q,
    githubToken: Q,
    showTokenInput: Je,
    syncLocalVersion: Ie,
    loadGithubToken: pt,
    saveGithubToken: Me,
    checkAllUpdates: p,
    downloadReleaseAsset: v,
    reloadExtension: ee,
    applyGitUpdate: ye
  };
}
const Zo = ["aria-busy"], Qo = { class: "settings-view-shell" }, es = {
  key: 0,
  class: "settings-window-actions"
}, ts = { class: "settings-view-nav" }, os = { class: "settings-nav-links" }, ss = ["onClick"], ns = { class: "settings-nav-dev-card" }, is = { class: "settings-hero-copy" }, rs = ["disabled"], ls = { class: "settings-panel" }, as = { class: "settings-subgroup" }, ds = { class: "field full-width" }, ps = {
  class: "field full-width",
  style: { "margin-top": "8px" }
}, us = {
  class: "field full-width",
  style: { "margin-top": "8px" }
}, cs = { style: { display: "flex", gap: "10px", "align-items": "center" } }, gs = {
  class: "module-toggles",
  style: { "margin-top": "10px" }
}, vs = { class: "toggle-card" }, fs = { class: "toggle-card" }, bs = { class: "settings-subgroup" }, xs = { class: "search-slots-list" }, ws = { class: "search-slot-order" }, ms = ["disabled", "onClick"], ys = ["disabled", "onClick"], hs = ["src"], ks = { key: 1 }, Cs = { class: "search-slot-info" }, Ss = { class: "search-slot-title-row" }, Ts = { class: "search-slot-name" }, zs = {
  key: 0,
  class: "search-slot-tag builtin"
}, Es = {
  key: 1,
  class: "search-slot-tag custom"
}, Ls = ["title"], $s = { class: "search-slot-actions" }, Us = ["onClick"], As = ["title"], Vs = ["onUpdate:modelValue", "onChange"], Ps = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", "margin-top": "10px", gap: "8px" } }, Rs = {
  key: 0,
  class: "search-slot-add-drawer"
}, Ws = { class: "template-chips-section" }, Ds = { class: "template-chips" }, Is = ["onClick"], Ms = { class: "slot-form-grid" }, js = { class: "slot-form-field" }, Os = { class: "slot-form-field" }, Bs = { style: { display: "flex", gap: "6px", "align-items": "center" } }, _s = { class: "quick-emojis" }, Ns = ["onClick"], Fs = { class: "slot-form-field full-width" }, Gs = { style: { display: "flex", "align-items": "center", gap: "8px" } }, Hs = { class: "quick-color-palette" }, qs = ["onClick"], Ys = { class: "slot-form-field full-width" }, Ks = { class: "slot-form-field full-width" }, Js = { class: "slot-form-actions" }, Xs = { class: "settings-subgroup" }, Zs = { class: "module-toggles" }, Qs = { class: "toggle-card" }, en = { class: "toggle-card" }, tn = { class: "toggle-card" }, on = { class: "toggle-card" }, sn = { class: "toggle-card" }, nn = { class: "toggle-card" }, rn = { class: "toggle-card" }, ln = { class: "toggle-card" }, an = { class: "toggle-card" }, dn = { class: "toggle-card" }, pn = { class: "settings-panel" }, un = { class: "shortcuts-grid" }, cn = { class: "shortcut-label" }, gn = { class: "shortcut-actions" }, vn = ["onClick"], fn = ["onClick"], bn = { class: "settings-panel" }, xn = { class: "fields-grid" }, wn = { class: "field full-width" }, mn = { style: { display: "flex", gap: "10px", "align-items": "center" } }, yn = { value: "" }, hn = ["value"], kn = ["disabled"], Cn = {
  class: "ignored-folders-list",
  style: { "margin-top": "14px" }
}, Sn = { class: "folder-path" }, Tn = ["onClick"], zn = {
  key: 0,
  class: "hint"
}, En = { class: "settings-panel" }, Ln = { class: "fields-grid" }, $n = { class: "field full-width" }, Un = { class: "field" }, An = { style: { display: "flex", gap: "10px", "align-items": "center" } }, Vn = { class: "field" }, Pn = { style: { display: "flex", gap: "10px", "align-items": "center" } }, Rn = { class: "field" }, Wn = { style: { display: "flex", gap: "10px", "align-items": "center" } }, Dn = { class: "field" }, In = { class: "field" }, Mn = { class: "field" }, jn = { class: "settings-panel" }, On = { class: "fields-grid" }, Bn = { class: "field full-width" }, _n = { style: { display: "flex", gap: "8px", "flex-wrap": "wrap", "align-items": "center" } }, Nn = ["disabled"], Fn = {
  key: 0,
  style: { "margin-top": "8px", "font-size": "11px", padding: "6px 10px", "border-radius": "6px", background: "var(--panel)", border: "1px solid var(--border)", color: "var(--text)" }
}, Gn = { class: "field full-width" }, Hn = { class: "wallpaper-presets-grid" }, qn = ["onClick"], Yn = { class: "wallpaper-card-badge" }, Kn = {
  key: 0,
  class: "wallpaper-card-active-pill"
}, Jn = { class: "wallpaper-card-meta" }, Xn = { class: "wallpaper-card-title" }, Zn = { class: "field full-width" }, Qn = { style: { display: "flex", "justify-content": "space-between", "align-items": "center" } }, ei = { style: { "margin-bottom": "0" } }, ti = {
  key: 0,
  style: { display: "flex", gap: "6px", "align-items": "center", "font-size": "11px" }
}, oi = ["disabled"], si = { style: { color: "var(--muted)" } }, ni = ["disabled"], ii = {
  key: 0,
  style: { padding: "24px", "text-align": "center", border: "1px dashed var(--border)", "border-radius": "10px", "margin-top": "10px", color: "var(--muted)", "font-size": "12px" }
}, ri = {
  key: 1,
  class: "wallpaper-library-grid"
}, li = ["onClick"], ai = { class: "wallpaper-card-preview" }, di = ["src"], pi = ["src"], ui = {
  key: 2,
  style: { "font-size": "20px", color: "var(--muted)" }
}, ci = { class: "wallpaper-card-badge" }, gi = {
  key: 3,
  class: "wallpaper-card-active-pill"
}, vi = ["title", "onClick"], fi = ["onKeydown"], bi = ["onClick"], xi = ["title"], wi = ["onClick"], mi = { class: "settings-panel" }, yi = { class: "fields-grid" }, hi = { class: "field full-width" }, ki = { style: { display: "flex", "flex-direction": "column", gap: "10px", background: "color-mix(in srgb, var(--panel) 92%, var(--text) 8%)", padding: "14px", "border-radius": "10px", border: "1px solid var(--border)" } }, Ci = { style: { display: "flex", gap: "10px", "flex-wrap": "wrap" } }, Si = { style: { flex: "1", "min-width": "180px" } }, Ti = { style: { flex: "1", "min-width": "180px" } }, zi = { style: { flex: "1", "min-width": "160px" } }, Ei = { style: { display: "flex", gap: "8px", "flex-wrap": "wrap", "align-items": "center", "margin-top": "4px" } }, Li = ["disabled"], $i = ["disabled"], Ui = ["disabled"], Ai = ["disabled"], Vi = {
  key: 0,
  style: { "font-size": "11px", padding: "6px 10px", "border-radius": "6px", background: "var(--panel)", border: "1px solid var(--border)", color: "var(--text)" }
}, Pi = { class: "field full-width" }, Ri = { style: { display: "flex", gap: "10px", "align-items": "center", "flex-wrap": "wrap", background: "color-mix(in srgb, var(--panel) 92%, var(--text) 8%)", padding: "12px 14px", "border-radius": "10px", border: "1px solid var(--border)" } }, Wi = {
  class: "btn-secondary",
  style: { cursor: "pointer", margin: "0", display: "inline-flex", "align-items": "center" }
}, Di = {
  key: 0,
  style: { "font-size": "11px", color: "#10b981", "font-weight": "bold" }
}, Ii = { class: "field full-width" }, Mi = { class: "sync-banner" }, ji = { style: { "font-weight": "700", "font-size": "13px", color: "var(--heading)" } }, Oi = { style: { "font-size": "10px", color: "var(--dim)", "margin-top": "4px" } }, Bi = { style: { display: "flex", gap: "8px", "align-items": "center" } }, _i = ["disabled"], Ni = {
  key: 0,
  class: "update-log-box"
}, Fi = {
  key: 1,
  class: "github-token-box"
}, Gi = { style: { display: "flex", "justify-content": "space-between", "align-items": "center" } }, Hi = {
  key: 2,
  class: "release-card"
}, qi = { class: "release-header" }, Yi = { class: "release-tag" }, Ki = {
  key: 0,
  style: { "margin-left": "6px", "font-size": "11px", color: "var(--muted)" }
}, Ji = ["disabled"], Xi = {
  key: 0,
  class: "release-notes"
}, Zi = {
  key: 1,
  class: "download-progress-box"
}, Qi = { class: "download-progress-label" }, er = { class: "download-progress-track" }, tr = {
  key: 2,
  class: "download-finish-card"
}, or = { class: "settings-panel" }, sr = { class: "save-dock" }, nr = {
  key: 1,
  role: "status",
  class: "save-status-msg"
}, ir = ["disabled"], Et = 8, fr = /* @__PURE__ */ $o({
  __name: "SettingsView",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(L) {
    const C = Ro(() => import("./StorageSettings-CZcL7YSN.js"));
    Do("logicweaver-settings-styles", qo);
    const V = L, F = [
      { id: "modules", index: "01", name: "模块与功能" },
      { id: "shortcuts", index: "02", name: "快捷键配置" },
      { id: "privacy", index: "03", name: "搜索书签过滤" },
      { id: "limbus", index: "04", name: "漫游歌词定制" },
      { id: "wallpaper", index: "05", name: "壁纸与背景" },
      { id: "sync", index: "06", name: "数据备份与同步" },
      { id: "storage", index: "07", name: "文件夹与存储" }
    ], g = c("modules"), m = c(null);
    dt(() => le.state.sectionRequest, () => {
      const s = le.state.requestedSection;
      s && F.some((e) => e.id === s) && (g.value = s);
    }, { immediate: !0 });
    const G = Re(() => {
      const s = F.find((e) => e.id === g.value);
      return s ? `${s.index} ${s.name}` : "设置";
    }), I = Re(() => typeof location < "u" && location.pathname.endsWith("/options.html"));
    function We() {
      D(), le.minimize();
      const s = typeof window < "u" ? window : null;
      s?.LogicWeaverWindowManager?.minimize && s.LogicWeaverWindowManager.minimize("settings");
    }
    const $ = lt({
      webdavUrl: "https://dav.jianguoyun.com/dav/LogicWeaver/",
      webdavUsername: "",
      webdavPassword: "",
      webdavFilename: "logicweaver-settings.json"
    }), H = c({ ...$ }), S = c(""), z = c(!1), q = c("");
    async function Q() {
      try {
        const s = await Go();
        H.value = { ...s }, Object.assign($, s);
      } catch {
      }
    }
    async function Je() {
      if (!z.value) {
        z.value = !0, S.value = "";
        try {
          await Ho($, H.value), H.value = { ...$ }, S.value = "✓ WebDAV 连接设置已保存", b("WebDAV 连接设置已保存");
        } catch (s) {
          S.value = `保存失败: ${s.message || "请检查URL格式"}`;
        } finally {
          z.value = !1;
        }
      }
    }
    async function M() {
      if (!z.value) {
        z.value = !0, S.value = "正在连接 WebDAV 服务器…";
        try {
          const s = Tt($), e = await St.testConnection(s);
          e.ok ? (S.value = "✓ WebDAV 连接成功！服务器响应正常。", b("WebDAV 连通性测试通过！")) : S.value = `✕ 连接失败: ${e.message || "请检查服务器地址与密码"}`;
        } catch (s) {
          S.value = `✕ 测试异常: ${s.message}`;
        } finally {
          z.value = !1;
        }
      }
    }
    async function fe() {
      if (!z.value) {
        z.value = !0, S.value = "正在上传配置备份至 WebDAV…";
        try {
          const s = Tt($), e = await St.pushCurrentConfig(s);
          e.ok ? (S.value = `✓ 上传成功！已将全部设置备份至云端 (${e.byteLength || 0} 字节)`, b("已成功上传云端备份！")) : S.value = `✕ 上传失败: ${e.error || "请检查写入权限"}`;
        } catch (s) {
          S.value = `✕ 上传异常: ${s.message}`;
        } finally {
          z.value = !1;
        }
      }
    }
    async function ze() {
      if (!z.value && confirm("确定从 WebDAV 恢复备份吗？恢复后将覆盖当前本地设置。")) {
        z.value = !0, S.value = "正在从 WebDAV 拉取配置并恢复…";
        try {
          const s = Tt($), e = await St.pullCurrentConfig(s);
          e.ok ? (S.value = `✓ 恢复成功！已成功还原 ${e.restoredCount || 0} 项配置。请刷新页面查看。`, b(`恢复成功！已还原 ${e.restoredCount || 0} 项配置`)) : S.value = `✕ 恢复失败: ${e.error || "未在服务器找到对应备份文件"}`;
        } catch (s) {
          S.value = `✕ 恢复异常: ${s.message}`;
        } finally {
          z.value = !1;
        }
      }
    }
    async function be() {
      try {
        const s = await _o(), e = No(s), o = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = URL.createObjectURL(o), x = document.createElement("a");
        x.href = n, x.download = `logicweaver-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, x.click(), URL.revokeObjectURL(n), q.value = "✓ 本地备份已导出！", b("本地配置快照已成功导出");
      } catch (s) {
        q.value = `导出失败: ${s.message}`;
      }
    }
    async function xe(s) {
      const e = s.target, o = e.files?.[0];
      if (o)
        try {
          const n = await o.text(), x = JSON.parse(n);
          if (!confirm(`确定导入「${o.name}」恢复配置吗？`)) return;
          const Ce = await Fo(x);
          q.value = `✓ 恢复成功！已成功还原 ${Ce.restoredCount || 0} 项配置。`, b(`成功导入 ${Ce.restoredCount || 0} 项配置！建议刷新页面。`);
        } catch (n) {
          q.value = `恢复失败: ${n.message || "文件格式不匹配"}`;
        } finally {
          e.value = "";
        }
    }
    function De() {
      qt.toggle(), qt.isActive ? (b("已切入「新用户空态视角」沙箱，常用网站已清空，真实数据已安全封存"), le.close()) : b("已恢复真实数据");
    }
    function we() {
      D(), le.close();
      const s = typeof window < "u" ? window : null;
      s?.LogicWeaverWindowManager?.close && s.LogicWeaverWindowManager.close("settings");
    }
    let me;
    function D() {
      const s = me;
      me = void 0, s?.();
    }
    dt(() => V.active, (s) => {
      s || D();
    }, { flush: "sync" });
    function Ie(s) {
      if (I.value || !V.active || document.hidden || s.button !== 0 || !s.isPrimary) return;
      const e = s.target;
      if (!e || e.closest("button, input, select, textarea, a, .settings-window-actions")) return;
      const o = document.getElementById("settings-dialog"), n = s.currentTarget;
      if (!o || !n) return;
      D();
      const x = o.getBoundingClientRect(), Ce = s.clientX, ie = s.clientY, pe = s.pointerId, xt = Math.max(8, window.innerWidth - x.width - 8), wt = Math.max(8, window.innerHeight - 56);
      let Ve = !1, w = 0, Y = x.left, ue = x.top;
      const He = () => {
        w = 0, o.style.setProperty("--settings-drag-x", `${Y - x.left}px`), o.style.setProperty("--settings-drag-y", `${ue - x.top}px`);
      }, Ot = (K) => {
        Y = Math.max(8, Math.min(x.left + K.clientX - Ce, xt)), ue = Math.max(8, Math.min(x.top + K.clientY - ie, wt));
      }, Bt = (K) => {
        if (K.pointerId === pe) {
          if (!Ve) {
            if (Math.hypot(K.clientX - Ce, K.clientY - ie) <= 4) return;
            Ve = !0, o.classList.add("dragged"), o.style.width = `${x.width}px`, o.style.height = `${x.height}px`, o.style.left = `${x.left}px`, o.style.top = `${x.top}px`, o.style.right = "auto", o.style.bottom = "auto", o.style.margin = "0", o.style.transform = "none", o.style.setProperty("--settings-drag-x", "0px"), o.style.setProperty("--settings-drag-y", "0px"), o.classList.add("settings-dragging");
            try {
              n.setPointerCapture(pe);
            } catch {
            }
          }
          Ot(K), w || (w = requestAnimationFrame(He));
        }
      }, Pe = (K) => {
        K.pointerId === pe && (Ve && K.type === "pointerup" && Ot(K), D());
      }, _t = () => {
        document.hidden && D();
      }, Nt = () => {
        Y = Math.max(8, Math.min(Y, Math.max(8, window.innerWidth - x.width - 8))), ue = Math.max(8, Math.min(ue, Math.max(8, window.innerHeight - 56))), D();
      };
      me = () => {
        w && cancelAnimationFrame(w), w = 0, window.removeEventListener("pointermove", Bt), window.removeEventListener("pointerup", Pe), window.removeEventListener("pointercancel", Pe), window.removeEventListener("blur", D), window.removeEventListener("resize", Nt), document.removeEventListener("visibilitychange", _t), n.removeEventListener("lostpointercapture", Pe), Ve && (o.style.left = `${Y}px`, o.style.top = `${ue}px`, o.classList.remove("settings-dragging"), o.style.removeProperty("--settings-drag-x"), o.style.removeProperty("--settings-drag-y"));
        try {
          n.hasPointerCapture(pe) && n.releasePointerCapture(pe);
        } catch {
        }
      }, window.addEventListener("pointermove", Bt, { passive: !0 }), window.addEventListener("pointerup", Pe), window.addEventListener("pointercancel", Pe), window.addEventListener("blur", D), window.addEventListener("resize", Nt), document.addEventListener("visibilitychange", _t), n.addEventListener("lostpointercapture", Pe);
    }
    function pt(s) {
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
      dockPosition: "bottom",
      deepseekApiKey: "",
      deepseekBaseUrl: "https://api.deepseek.com",
      deepseekModel: "deepseek-chat"
    }, p = lt({ ...Me }), v = lt({ ...mt }), ee = /* @__PURE__ */ new Set();
    let ye = 0;
    const y = Wo, d = c({}), f = c(null), P = c([]), h = c([]), U = Re(() => h.value.flatMap((s, e) => {
      const o = yt(s);
      if (o === void 0) return [];
      const n = s, x = typeof n.path == "string" && n.path ? n.path : typeof n.title == "string" && n.title ? n.title : o;
      return [{ id: o, path: x, rowKey: `${o}:${e}` }];
    })), j = Re(() => h.value.length - U.value.length), A = c(""), {
      needsReloadToApply: Ee,
      currentVersionText: Xe,
      currentCommitText: he,
      checkingUpdate: je,
      canApplyUpdate: Le,
      updateStatusMessage: J,
      onlineRelease: te,
      onlineAsset: oo,
      isDownloading: Oe,
      downloadPercent: Lt,
      downloadReceivedText: so,
      downloadCompleted: ut,
      githubToken: Ze,
      showTokenInput: no,
      syncLocalVersion: io,
      loadGithubToken: ro,
      saveGithubToken: $t,
      checkAllUpdates: Ut,
      downloadReleaseAsset: At,
      reloadExtension: Qe,
      applyGitUpdate: Vt
    } = Xo(b, () => V.active), Be = c(""), ct = c(!1), ae = c(!1), $e = c(!1), de = c(!1);
    let oe = !0, lo = !1, gt = {}, et = {};
    function vt() {
      const s = {};
      for (const e of kt) s[e] = p[e];
      return s[re] = v, s[Te] = d.value, s[ve] = h.value, qe(s);
    }
    const ao = [
      {
        id: "builtin-mountain",
        title: "默认山景 (Mountains)",
        kind: "内置",
        value: Ct,
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
    ], _e = c([]), X = c(null), ft = c(!1), tt = c(""), se = lt({}), Ue = c(1), Ne = c(null), ot = c(""), Fe = c(null), bt = Re(() => Math.ceil(_e.value.length / Et) || 1), Pt = Re(() => {
      const s = (Ue.value - 1) * Et;
      return _e.value.slice(s, s + Et);
    });
    function st(s) {
      return s.id === "builtin-mountain" ? X.value === Ct : s.isPure ? !X.value || X.value === "none" || X.value?.type === "none" : X.value && s.value ? JSON.stringify(X.value) === JSON.stringify(s.value) : !1;
    }
    async function Ae() {
      ft.value = !0;
      try {
        const s = await _.loadHistory();
        _e.value = s.history || [], X.value = s.currentValue, po();
      } catch (s) {
        tt.value = `壁纸库读取失败: ${s.message || "未知错误"}`;
      } finally {
        ft.value = !1;
      }
    }
    async function po() {
      const s = [...Pt.value];
      for (const e of s) {
        if (e.thumb || e.style || e.previewUrl || se[e.id]) continue;
        const o = e.value?.storageKey;
        if (o)
          try {
            const n = await _.createLibraryPreviewUrl(o);
            n && (se[e.id] = n);
          } catch {
          }
      }
    }
    async function Rt(s) {
      try {
        s.id === "builtin-mountain" ? (await _.setMountain(), X.value = Ct) : s.isPure ? (await _.clearWallpaper(), X.value = null) : (await _.setWallpaper(s.value), X.value = s.value), b(`已应用壁纸: ${s.title || "自定义壁纸"}`), tt.value = `✓ 已成功应用壁纸「${s.title || "壁纸"}」`;
      } catch (e) {
        b(`应用失败: ${e.message}`, !0);
      }
    }
    async function uo() {
      try {
        const s = await _.chooseBackgroundFile("image");
        if (!s || s.length === 0) return;
        for (let e = 0; e < s.length; e++)
          await _.importBackgroundFile(s[e], { apply: e === s.length - 1 });
        await Ae(), b("本地图片壁纸已成功导入并应用！");
      } catch (s) {
        s?.name !== "AbortError" && b(`导入图片失败: ${s.message}`, !0);
      }
    }
    async function co() {
      try {
        const s = await _.chooseBackgroundFile("video");
        if (!s || s.length === 0) return;
        for (let e = 0; e < s.length; e++)
          await _.importBackgroundFile(s[e], { apply: e === s.length - 1 });
        await Ae(), b("动态视频壁纸已成功导入并应用！");
      } catch (s) {
        s?.name !== "AbortError" && b(`导入视频失败: ${s.message}`, !0);
      }
    }
    async function go() {
      try {
        await _.importWallpaperDirectory(), await Ae(), b("文件夹图片已成功批量导入！");
      } catch (s) {
        s?.name !== "AbortError" && b(`导入文件夹失败: ${s.message}`, !0);
      }
    }
    async function vo(s) {
      if (Fe.value !== s.id) {
        Fe.value = s.id;
        return;
      }
      Fe.value = null;
      try {
        await _.deleteHistory(s), se[s.id] && (URL.revokeObjectURL(se[s.id]), delete se[s.id]), await Ae(), b("壁纸已从历史库中删除");
      } catch (e) {
        b(`删除失败: ${e.message}`, !0);
      }
    }
    function fo(s) {
      Ne.value = s.id, ot.value = s.title || "";
    }
    async function Wt(s) {
      const e = Ne.value, o = ot.value.trim();
      if (!(!e || !o))
        try {
          await _.updateHistoryTitle(s.id, o), s.title = o, Ne.value = null, b("壁纸名称已更新");
        } catch (n) {
          b(`更新名称失败: ${n.message}`, !0);
        }
    }
    function Dt() {
      Ne.value = null;
    }
    dt(g, (s) => {
      Uo(() => {
        m.value && (m.value.scrollTop = 0);
      }), s === "wallpaper" && Ae();
    });
    let Ge = null;
    function b(s, e = !1) {
      Be.value = s, ct.value = e, Ge && clearTimeout(Ge), e || (Ge = setTimeout(() => {
        Be.value = "";
      }, 3500));
    }
    function bo() {
      const s = typeof window < "u" ? window : null;
      s?.LogicWeaverStartupIntro?.playIntro ? s.LogicWeaverStartupIntro.playIntro({ force: !0, style: p.startupAnimationStyle }) : b(`正在使用 ${p.startupAnimationStyle} 动效风格`);
    }
    const ke = c(!1), E = c({
      name: "",
      iconType: "text",
      iconValue: "🎬",
      themeColor: "#38bdf8",
      searchUrl: "",
      placeholder: ""
    });
    function xo(s) {
      E.value = {
        name: s.name,
        iconType: s.iconType,
        iconValue: s.iconValue,
        themeColor: s.themeColor,
        searchUrl: s.searchUrl,
        placeholder: s.placeholder
      }, ke.value = !0;
    }
    function wo() {
      const s = E.value.name.trim(), e = E.value.searchUrl.trim();
      if (!s || !e) {
        b("请填写栏位名称和搜索 URL 模板", !0);
        return;
      }
      jo({
        name: s,
        placeholder: E.value.placeholder.trim() || `在 ${s} 中搜索…`,
        iconType: E.value.iconType,
        iconValue: E.value.iconValue.trim() || "🔍",
        themeColor: E.value.themeColor || "#38bdf8",
        searchUrl: e
      }), b(`已成功添加「${s}」搜索栏位`), ke.value = !1, E.value = {
        name: "",
        iconType: "text",
        iconValue: "🎬",
        themeColor: "#38bdf8",
        searchUrl: "",
        placeholder: ""
      };
    }
    function mo(s) {
      const e = at.value.find((n) => n.id === s);
      if (!e) return;
      const o = at.value.filter((n) => n.enabled).length;
      if (!e.enabled && o === 0) {
        e.enabled = !0, b("至少需要保留一个启用的搜索栏位", !0);
        return;
      }
      Oo();
    }
    function yo() {
      confirm("确定要恢复默认搜索栏位配置吗？自定义添加的栏位将被清空。") && (Bo(), b("已恢复默认搜索栏位"));
    }
    function ho(s) {
      f.value = s;
    }
    function ko(s) {
      const e = { ...d.value };
      delete e[s], d.value = e, Mt();
    }
    function It(s) {
      if (!ae.value || de.value || !f.value || (s.preventDefault(), s.stopPropagation(), ["Control", "Alt", "Shift", "Meta"].includes(s.key))) return;
      const e = [];
      s.ctrlKey && e.push("Ctrl"), s.altKey && e.push("Alt"), s.shiftKey && e.push("Shift"), s.metaKey && e.push("Cmd");
      let o = s.key.toUpperCase();
      o === " " && (o = "Space"), e.push(o);
      const n = e.join("+");
      d.value = {
        ...d.value,
        [f.value]: n
      }, f.value = null, Mt();
    }
    async function Mt() {
      await nt(!1, !1, [Te]);
    }
    function Co() {
      const s = P.value.find((e) => e.id === A.value);
      s && (h.value.some((e) => yt(e) === s.id) || (h.value.push(s), jt()), A.value = "");
    }
    function So(s) {
      h.value = h.value.filter((e) => yt(e) !== s), jt();
    }
    async function jt() {
      await nt(!1, !1, [ve]);
    }
    function ne(s) {
      ++ye, ee.add(s);
    }
    function To() {
      const s = v.preset;
      if (++ye, ee.add("preset"), ht[s]) {
        for (const e of Object.keys(ht[s])) ee.add(e);
        Object.assign(v, ht[s]);
      }
    }
    function zo() {
      const s = p.dockPosition || "bottom";
      Kt(s) && Jt.setPosition(s), W("dockPosition");
    }
    async function W(s) {
      await nt(!1, !0, [s]);
    }
    async function nt(s = !1, e = !1, o) {
      if (!ae.value || de.value || !oe)
        return oe && b("设置尚未读完、保存中或结果待核对，草稿保留；请等待或重读设置。", !0), !1;
      de.value = !0;
      try {
        const n = vt(), x = [...ee], Ce = ye, ie = {}, pe = {};
        for (const w of o || Object.keys(n))
          (!Xt(n[w], et[w]) || w === re && x.length > 0) && (ie[w] = n[w], pe[w] = gt[w]);
        const xt = Object.fromEntries(Object.keys(ie).map((w) => [w, et[w]])), wt = await Ye.saveSettings(ie, pe, xt, x);
        if (!oe) return !0;
        const Ve = vt();
        for (const w of [Te, ve, re])
          if (Object.prototype.hasOwnProperty.call(ie, w) && (!Xt(Ve[w], n[w]) || w === re && Ce !== ye))
            throw new Zt("本次修改已保存，但保存期间产生了新的设置草稿；请重读核对后再写入，草稿未覆盖");
        for (const w of Object.keys(ie)) {
          const Y = qe(wt[w]);
          w === Te && (d.value = Y), w === ve && (h.value = Y);
          const ue = w === re ? { ...mt, ...Y } : Y;
          if (w === re) {
            for (const He of Object.keys(v)) delete v[He];
            Object.assign(v, ue);
            for (const He of x) ee.delete(He);
          }
          gt[w] = qe(Y), et[w] = qe(ue);
        }
        return e || b(Object.keys(ie).length ? "✓ 本次改动已保存生效" : "没有待保存的改动"), s && le.close(), !0;
      } catch (n) {
        return oe && (n instanceof Zt && (ae.value = !1), b(n?.message || "保存未确认，草稿保留；请重读核对", !0)), !1;
      } finally {
        de.value = !1;
      }
    }
    function Eo() {
      location.pathname.endsWith("/options.html") ? location.assign(chrome.runtime.getURL("newtab.html")) : le.close();
    }
    async function Lo() {
      if (!($e.value || !oe)) {
        $e.value = !0, ae.value = !1;
        try {
          const s = await Ye.loadGlobalSettings();
          if (!oe) return;
          for (const e of kt)
            if (s[e] !== void 0 && typeof s[e] != typeof Me[e])
              throw new Error("设置数据格式异常，未允许覆盖；请核对已有配置");
          for (const e of [re, Te])
            if (s[e] !== void 0 && (!s[e] || typeof s[e] != "object" || Array.isArray(s[e])))
              throw new Error("设置数据格式异常，未允许覆盖；请核对已有配置");
          if (s[ve] !== void 0 && !Array.isArray(s[ve]))
            throw new Error("书签过滤设置格式异常，未允许覆盖");
          Object.assign(p, Me);
          for (const e of Object.keys(v)) delete v[e];
          Object.assign(v, mt), ee.clear(), ++ye, d.value = {}, h.value = [];
          for (const e of kt)
            s[e] !== void 0 && (p[e] = s[e]);
          s[re] && Object.assign(v, s[re]), s[Te] && (d.value = s[Te]), Array.isArray(s[ve]) && (h.value = s[ve]), p.dockPosition && Kt(p.dockPosition) ? Jt.setPosition(p.dockPosition) : Qt.position && (p.dockPosition = Qt.position), gt = qe(s), et = vt(), ae.value = !0, lo = !0, Be.value = "", ct.value = !1, typeof chrome < "u" && chrome.bookmarks?.getTree && chrome.bookmarks.getTree((e) => {
            oe && e && e[0] && (P.value = Ye.collectBookmarkFolders(e[0]));
          }), io(), ro();
        } catch {
          oe && (ae.value = !1, b("设置读取失败或初始化异常，草稿保留，暂不允许保存；可点击重读设置再核对。", !0));
        } finally {
          $e.value = !1;
        }
      }
    }
    return Ao(() => {
      Lo(), Q(), window.addEventListener("keydown", It, !0);
    }), to(() => {
      D(), oe = !1, window.removeEventListener("keydown", It, !0), Ge && clearTimeout(Ge);
    }), (s, e) => (r(), l("div", {
      class: "settings-view-root",
      "aria-busy": de.value || $e.value
    }, [
      t("div", Qo, [
        I.value ? T("", !0) : (r(), l("div", es, [
          t("button", {
            id: "settings-minimize",
            type: "button",
            class: "settings-win-btn",
            title: "最小化（标签保留）",
            onClick: it(We, ["stop"])
          }, "−"),
          t("button", {
            id: "settings-close",
            type: "button",
            class: "settings-win-btn close",
            title: "关闭",
            onClick: it(we, ["stop"])
          }, "✕")
        ])),
        t("aside", ts, [
          t("div", {
            class: "settings-brand",
            onPointerdown: Ie
          }, [...e[72] || (e[72] = [
            t("span", { class: "settings-brand-mark" }, "TP", -1),
            t("div", null, [
              t("strong", null, "tab-project"),
              t("small", null, "CONTROL CENTER")
            ], -1)
          ])], 32),
          e[74] || (e[74] = t("p", { class: "settings-nav-label" }, "设置分类", -1)),
          t("nav", os, [
            (r(), l(B, null, Z(F, (o) => t("button", {
              key: o.id,
              type: "button",
              class: ce(["nav-tab-btn", { active: g.value === o.id }]),
              onClick: (n) => g.value = o.id
            }, [
              t("span", null, u(o.index), 1),
              k(" " + u(o.name), 1)
            ], 10, ss)), 64))
          ]),
          t("div", ns, [
            t("button", {
              type: "button",
              class: ce(["btn-nav-dev-preview secondary", { active: i(Ht) }]),
              onClick: De
            }, [
              t("span", null, u(i(Ht) ? "👀 恢复真实数据" : "🧪 页面内空态预览"), 1)
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
            onPointerdown: Ie,
            onDblclick: pt
          }, [
            t("div", is, [
              e[75] || (e[75] = t("p", { class: "settings-kicker" }, "CONTROL CENTER / PERSONAL SETTINGS", -1)),
              t("h1", null, u(G.value), 1),
              e[76] || (e[76] = t("p", null, "集中管理首页组件、服务连接、快捷键与多端云同步。开关即时保存，输入项可完成编辑后统一保存。", -1))
            ])
          ], 32),
          t("fieldset", {
            class: "settings-fields",
            disabled: !ae.value || de.value
          }, [
            a(t("section", ls, [
              e[123] || (e[123] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "01"),
                t("div", null, [
                  t("h2", null, "模块与功能"),
                  t("p", null, "决定新标签页首页显示哪些核心卡片与启动行为。")
                ])
              ], -1)),
              t("div", as, [
                e[90] || (e[90] = t("div", { class: "settings-subgroup-title" }, [
                  t("span", null, "🧭 界面布局与基础交互"),
                  t("small", null, "LAYOUT & BEHAVIOR")
                ], -1)),
                t("div", ds, [
                  e[78] || (e[78] = t("label", null, [
                    k("Dock 栏停靠位置 "),
                    t("em", null, "DOCK POSITION")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => p.dockPosition = o),
                    onChange: zo
                  }, [...e[77] || (e[77] = [
                    t("option", { value: "bottom" }, "⬇️ 屏幕底部居中（默认 · 经典 Dock）", -1),
                    t("option", { value: "left" }, "⬅️ 屏幕左侧居中（紧凑垂直侧边栏）", -1),
                    t("option", { value: "right" }, "➡️ 屏幕右侧居中（紧凑垂直侧边栏）", -1),
                    t("option", { value: "top" }, "⬆️ 屏幕顶部悬浮（顶栏下方居中）", -1)
                  ])], 544), [
                    [ge, p.dockPosition]
                  ]),
                  e[79] || (e[79] = t("p", { class: "hint" }, "自由切换底部、顶部、左侧或右侧停靠，满足多显示器与不同屏幕的使用习惯。", -1))
                ]),
                t("div", ps, [
                  e[81] || (e[81] = t("label", null, [
                    k("默认搜索引擎 "),
                    t("em", null, "SEARCH ENGINE")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[1] || (e[1] = (o) => p.searchEngine = o),
                    onChange: e[2] || (e[2] = (o) => W("searchEngine"))
                  }, [...e[80] || (e[80] = [
                    t("option", { value: "bing" }, "🔷 必应 (Bing) · 国内外综合智能检索", -1),
                    t("option", { value: "google" }, "🌐 谷歌 (Google) · 全球学术与开发生态检索", -1),
                    t("option", { value: "baidu" }, "🐾 百度 (Baidu) · 中文资讯与本土生活搜索", -1),
                    t("option", { value: "duckduckgo" }, "🦆 DuckDuckGo · 隐私保护与零追踪搜索", -1)
                  ])], 544), [
                    [ge, p.searchEngine]
                  ]),
                  e[82] || (e[82] = t("p", { class: "hint" }, "新标签页搜索栏回车或选择第一项直达时，将调用所选的默认搜索引擎。", -1))
                ]),
                t("div", us, [
                  e[84] || (e[84] = t("label", null, [
                    k("开屏动画风格 "),
                    t("em", null, "STARTUP STYLE")
                  ], -1)),
                  t("div", cs, [
                    a(t("select", {
                      "onUpdate:modelValue": e[3] || (e[3] = (o) => p.startupAnimationStyle = o),
                      style: { flex: "1" },
                      onChange: e[4] || (e[4] = (o) => W("startupAnimationStyle"))
                    }, [...e[83] || (e[83] = [
                      t("option", { value: "endfield" }, "终末地 (Endfield) · 工业高能黑黄动效", -1),
                      t("option", { value: "rhinelab" }, "莱茵生命 (Rhine Lab) · 科研终端科技动效 (Joyce Moore)", -1)
                    ])], 544), [
                      [ge, p.startupAnimationStyle]
                    ]),
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      style: { "min-width": "110px" },
                      onClick: bo
                    }, "预览动效 ↗")
                  ]),
                  e[85] || (e[85] = t("p", { class: "hint" }, "可自由切换明日方舟「终末地」黑黄工业动效，或「莱茵生命」科研终端动效。", -1))
                ]),
                t("div", gs, [
                  t("label", vs, [
                    e[86] || (e[86] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "开屏启动动画"),
                      t("small", null, "新标签页启动进度与品牌动画")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[5] || (e[5] = (o) => p.showStartupAnimation = o),
                      type: "checkbox",
                      onChange: e[6] || (e[6] = (o) => W("showStartupAnimation"))
                    }, null, 544), [
                      [O, p.showStartupAnimation]
                    ]),
                    e[87] || (e[87] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", fs, [
                    e[88] || (e[88] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "仅保留一个主界面"),
                      t("small", null, "后续标签打开大号搜索")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[7] || (e[7] = (o) => p.singleNewTab = o),
                      type: "checkbox",
                      onChange: e[8] || (e[8] = (o) => W("singleNewTab"))
                    }, null, 544), [
                      [O, p.singleNewTab]
                    ]),
                    e[89] || (e[89] = t("i", { class: "switch" }, null, -1))
                  ])
                ])
              ]),
              t("div", bs, [
                e[100] || (e[100] = t("div", { class: "settings-subgroup-title" }, [
                  t("span", null, "🔍 搜索栏位与引擎管理"),
                  t("small", null, "SEARCH MODES & ENGINES")
                ], -1)),
                e[101] || (e[101] = t("p", {
                  class: "hint",
                  style: { margin: "0 0 10px" }
                }, " 管理主搜索框可切换的搜索栏位。点击搜索框左侧图标可循环切换，支持自定义添加任意网站搜索直达（低代码免开发）。 ", -1)),
                t("div", xs, [
                  (r(!0), l(B, null, Z(i(at), (o, n) => (r(), l("div", {
                    key: o.id,
                    class: ce(["search-slot-row", { disabled: !o.enabled }])
                  }, [
                    t("div", ws, [
                      t("button", {
                        type: "button",
                        class: "btn-slot-move",
                        disabled: n === 0,
                        title: "上移",
                        onClick: (x) => i(Yt)(o.id, "up")
                      }, "▲", 8, ms),
                      t("button", {
                        type: "button",
                        class: "btn-slot-move",
                        disabled: n === i(at).length - 1,
                        title: "下移",
                        onClick: (x) => i(Yt)(o.id, "down")
                      }, "▼", 8, ys)
                    ]),
                    t("div", {
                      class: "search-slot-badge-preview",
                      style: rt({ borderColor: o.themeColor, color: o.themeColor, backgroundColor: `color-mix(in srgb, ${o.themeColor} 12%, transparent)` })
                    }, [
                      o.iconType === "svg" ? (r(), l("img", {
                        key: 0,
                        src: o.iconValue,
                        alt: "",
                        style: { width: "16px", height: "16px" }
                      }, null, 8, hs)) : (r(), l("span", ks, u(o.iconValue || "⌕"), 1))
                    ], 4),
                    t("div", Cs, [
                      t("div", Ss, [
                        t("strong", Ts, u(o.name), 1),
                        o.isBuiltin ? (r(), l("span", zs, "默认内置")) : (r(), l("span", Es, "自定义"))
                      ]),
                      t("small", {
                        class: "search-slot-url",
                        title: o.searchUrl
                      }, u(o.placeholder || o.searchUrl), 9, Ls)
                    ]),
                    t("div", $s, [
                      o.isBuiltin ? T("", !0) : (r(), l("button", {
                        key: 0,
                        type: "button",
                        class: "btn-slot-del",
                        title: "删除此自定义栏位",
                        onClick: (x) => i(Io)(o.id)
                      }, "✕", 8, Us)),
                      t("label", {
                        class: "slot-switch-label",
                        title: o.enabled ? "已启用，点击禁用" : "已禁用，点击启用"
                      }, [
                        a(t("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": (x) => o.enabled = x,
                          onChange: (x) => mo(o.id)
                        }, null, 40, Vs), [
                          [O, o.enabled]
                        ]),
                        e[91] || (e[91] = t("i", { class: "switch" }, null, -1))
                      ], 8, As)
                    ])
                  ], 2))), 128))
                ]),
                t("div", Ps, [
                  t("button", {
                    type: "button",
                    class: "btn-secondary",
                    style: { display: "inline-flex", "align-items": "center", gap: "6px", padding: "6px 12px", "font-size": "12px" },
                    onClick: e[9] || (e[9] = (o) => ke.value = !ke.value)
                  }, [
                    t("span", null, u(ke.value ? "▲ 收起面板" : "+ 添加自定义搜索栏位"), 1)
                  ]),
                  t("button", {
                    type: "button",
                    class: "btn-ghost-small",
                    style: { "font-size": "11px", opacity: "0.75" },
                    title: "重置所有搜索栏位为初始状态",
                    onClick: yo
                  }, " 恢复默认栏位 ")
                ]),
                ke.value ? (r(), l("div", Rs, [
                  e[99] || (e[99] = t("div", { class: "drawer-header" }, [
                    t("strong", null, "✨ 快速添加自定义搜索栏位"),
                    t("small", null, "支持一键套用常用平台，或填入包含 {query} 的搜索网址")
                  ], -1)),
                  t("div", Ws, [
                    e[92] || (e[92] = t("span", { class: "chips-label" }, "一键套用预设：", -1)),
                    t("div", Ds, [
                      (r(!0), l(B, null, Z(i(Mo), (o) => (r(), l("button", {
                        key: o.name,
                        type: "button",
                        class: "template-chip-btn",
                        onClick: (n) => xo(o)
                      }, [
                        t("span", null, u(o.iconValue), 1),
                        t("span", null, u(o.name), 1)
                      ], 8, Is))), 128))
                    ])
                  ]),
                  t("div", Ms, [
                    t("div", js, [
                      e[93] || (e[93] = t("label", null, [
                        k("栏位名称 "),
                        t("em", null, "NAME")
                      ], -1)),
                      a(t("input", {
                        "onUpdate:modelValue": e[10] || (e[10] = (o) => E.value.name = o),
                        type: "text",
                        placeholder: "如：YouTube、小红书"
                      }, null, 512), [
                        [R, E.value.name]
                      ])
                    ]),
                    t("div", Os, [
                      e[94] || (e[94] = t("label", null, [
                        k("图标 (Emoji) "),
                        t("em", null, "ICON")
                      ], -1)),
                      t("div", Bs, [
                        a(t("input", {
                          "onUpdate:modelValue": e[11] || (e[11] = (o) => E.value.iconValue = o),
                          type: "text",
                          placeholder: "🎬",
                          style: { width: "50px", "text-align": "center", "font-size": "15px" }
                        }, null, 512), [
                          [R, E.value.iconValue]
                        ]),
                        t("div", _s, [
                          (r(), l(B, null, Z(["🎬", "📕", "💡", "🤖", "🔍", "🎓", "🛍️", "🎧", "💻", "📰"], (o) => t("span", {
                            key: o,
                            class: "quick-emo-item",
                            onClick: (n) => E.value.iconValue = o
                          }, u(o), 9, Ns)), 64))
                        ])
                      ])
                    ]),
                    t("div", Fs, [
                      e[95] || (e[95] = t("label", null, [
                        k("主题颜色 "),
                        t("em", null, "THEME COLOR")
                      ], -1)),
                      t("div", Gs, [
                        a(t("input", {
                          "onUpdate:modelValue": e[12] || (e[12] = (o) => E.value.themeColor = o),
                          type: "color",
                          style: { width: "32px", height: "28px", padding: "0", border: "1px solid var(--border)", "border-radius": "6px", cursor: "pointer", background: "transparent" }
                        }, null, 512), [
                          [R, E.value.themeColor]
                        ]),
                        t("div", Hs, [
                          (r(), l(B, null, Z(["#38bdf8", "#f43f5e", "#ff2442", "#10b981", "#0084ff", "#8b5cf6", "#f59e0b", "#06b6d4"], (o) => t("span", {
                            key: o,
                            class: ce(["palette-dot", { active: E.value.themeColor === o }]),
                            style: rt({ backgroundColor: o }),
                            onClick: (n) => E.value.themeColor = o
                          }, null, 14, qs)), 64))
                        ])
                      ])
                    ]),
                    t("div", Ys, [
                      e[96] || (e[96] = t("label", null, [
                        k("搜索直达 URL 模板 "),
                        t("em", null, "SEARCH URL ({query})")
                      ], -1)),
                      a(t("input", {
                        "onUpdate:modelValue": e[13] || (e[13] = (o) => E.value.searchUrl = o),
                        type: "text",
                        placeholder: "如：https://www.youtube.com/results?search_query={query}"
                      }, null, 512), [
                        [R, E.value.searchUrl]
                      ]),
                      e[97] || (e[97] = t("p", { class: "field-hint" }, [
                        k("请使用 "),
                        t("code", null, "{query}"),
                        k(" 作为你的搜索词占位符，回车将自动拼接并打开。")
                      ], -1))
                    ]),
                    t("div", Ks, [
                      e[98] || (e[98] = t("label", null, [
                        k("占位提示文字 (选填) "),
                        t("em", null, "PLACEHOLDER")
                      ], -1)),
                      a(t("input", {
                        "onUpdate:modelValue": e[14] || (e[14] = (o) => E.value.placeholder = o),
                        type: "text",
                        placeholder: "如：搜索 YouTube 精彩视频与博主…"
                      }, null, 512), [
                        [R, E.value.placeholder]
                      ])
                    ])
                  ]),
                  t("div", Js, [
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      onClick: e[15] || (e[15] = (o) => ke.value = !1)
                    }, "取消"),
                    t("button", {
                      type: "button",
                      class: "btn-save-green",
                      onClick: wo
                    }, "确认添加")
                  ])
                ])) : T("", !0)
              ]),
              t("div", Xs, [
                e[122] || (e[122] = t("div", { class: "settings-subgroup-title" }, [
                  t("span", null, "🧩 首页卡片组件与动效"),
                  t("small", null, "CARDS & VISUAL EFFECTS")
                ], -1)),
                t("div", Zs, [
                  t("label", Qs, [
                    e[102] || (e[102] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "天气模块"),
                      t("small", null, "当前天气与短期预报")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[16] || (e[16] = (o) => p.showWeather = o),
                      type: "checkbox",
                      onChange: e[17] || (e[17] = (o) => W("showWeather"))
                    }, null, 544), [
                      [O, p.showWeather]
                    ]),
                    e[103] || (e[103] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", en, [
                    e[104] || (e[104] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "常用网站"),
                      t("small", null, "快捷入口与自定义分区")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[18] || (e[18] = (o) => p.showSites = o),
                      type: "checkbox",
                      onChange: e[19] || (e[19] = (o) => W("showSites"))
                    }, null, 544), [
                      [O, p.showSites]
                    ]),
                    e[105] || (e[105] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", tn, [
                    e[106] || (e[106] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "B站收藏夹"),
                      t("small", null, "读取当前登录账号收藏")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[20] || (e[20] = (o) => p.showBili = o),
                      type: "checkbox",
                      onChange: e[21] || (e[21] = (o) => W("showBili"))
                    }, null, 544), [
                      [O, p.showBili]
                    ]),
                    e[107] || (e[107] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", on, [
                    e[108] || (e[108] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "日报 · YouTube"),
                      t("small", null, "订阅更新与播放列表")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[22] || (e[22] = (o) => p.showYouTube = o),
                      type: "checkbox",
                      onChange: e[23] || (e[23] = (o) => W("showYouTube"))
                    }, null, 544), [
                      [O, p.showYouTube]
                    ]),
                    e[109] || (e[109] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", sn, [
                    e[110] || (e[110] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "任务串"),
                      t("small", null, "首页任务轮播区域")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[24] || (e[24] = (o) => p.showTodo = o),
                      type: "checkbox",
                      onChange: e[25] || (e[25] = (o) => W("showTodo"))
                    }, null, 544), [
                      [O, p.showTodo]
                    ]),
                    e[111] || (e[111] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", nn, [
                    e[112] || (e[112] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "常驻导航悬浮球"),
                      t("small", null, "关闭则仅快捷键唤出")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[26] || (e[26] = (o) => p.showNavBall = o),
                      type: "checkbox",
                      onChange: e[27] || (e[27] = (o) => W("showNavBall"))
                    }, null, 544), [
                      [O, p.showNavBall]
                    ]),
                    e[113] || (e[113] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", rn, [
                    e[114] || (e[114] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "浏览器书签菜单"),
                      t("small", null, "侧边书签整理面板")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[28] || (e[28] = (o) => p.showBookmarkPanel = o),
                      type: "checkbox",
                      onChange: e[29] || (e[29] = (o) => W("showBookmarkPanel"))
                    }, null, 544), [
                      [O, p.showBookmarkPanel]
                    ]),
                    e[115] || (e[115] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", ln, [
                    e[116] || (e[116] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "顶部书签文件夹"),
                      t("small", null, "替代浏览器原生书签栏")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[30] || (e[30] = (o) => p.showBookmarkFoldersTop = o),
                      type: "checkbox",
                      onChange: e[31] || (e[31] = (o) => W("showBookmarkFoldersTop"))
                    }, null, 544), [
                      [O, p.showBookmarkFoldersTop]
                    ]),
                    e[117] || (e[117] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", an, [
                    e[118] || (e[118] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "音乐卡片音频频谱"),
                      t("small", null, "跟随音频实时跳动频谱柱")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[32] || (e[32] = (o) => p.showHomeMusicVisualizer = o),
                      type: "checkbox",
                      onChange: e[33] || (e[33] = (o) => W("showHomeMusicVisualizer"))
                    }, null, 544), [
                      [O, p.showHomeMusicVisualizer]
                    ]),
                    e[119] || (e[119] = t("i", { class: "switch" }, null, -1))
                  ]),
                  t("label", dn, [
                    e[120] || (e[120] = t("span", { class: "toggle-copy" }, [
                      t("b", null, "边狱巴士 漫游歌词"),
                      t("small", null, "屏幕随机位置逐字跟随演出")
                    ], -1)),
                    a(t("input", {
                      "onUpdate:modelValue": e[34] || (e[34] = (o) => p.showLimbusLyricEffect = o),
                      type: "checkbox",
                      onChange: e[35] || (e[35] = (o) => W("showLimbusLyricEffect"))
                    }, null, 544), [
                      [O, p.showLimbusLyricEffect]
                    ]),
                    e[121] || (e[121] = t("i", { class: "switch" }, null, -1))
                  ])
                ])
              ])
            ], 512), [
              [Se, g.value === "modules"]
            ]),
            a(t("section", pn, [
              e[124] || (e[124] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "02"),
                t("div", null, [
                  t("h2", null, "快捷键与工具触发"),
                  t("p", null, "点击右侧按键槽后，直接在键盘上按下你期望的快捷键组合，即可自动录入。")
                ])
              ], -1)),
              t("div", un, [
                (r(!0), l(B, null, Z(i(y), (o) => (r(), l("div", {
                  key: o.id,
                  class: "shortcut-row"
                }, [
                  t("span", cn, u(o.label), 1),
                  t("div", gn, [
                    t("button", {
                      type: "button",
                      class: ce(["shortcut-key-btn", { recording: f.value === o.id }]),
                      onClick: (n) => ho(o.id)
                    }, u(f.value === o.id ? "请按下按键..." : d.value[o.id] || o.defaultKey || "未分配"), 11, vn),
                    d.value[o.id] || o.defaultKey ? (r(), l("button", {
                      key: 0,
                      type: "button",
                      class: "shortcut-clear-btn",
                      title: "清除此按键",
                      onClick: (n) => ko(o.id)
                    }, "✕", 8, fn)) : T("", !0)
                  ])
                ]))), 128))
              ]),
              e[125] || (e[125] = Ft('<div class="fixed-shortcuts-card" style="margin-top:18px;"><div class="fixed-shortcuts-head">⚡ 系统内置快捷键速查</div><div class="fixed-shortcuts-grid"><div class="fixed-row"><span class="fs-desc">🔍 快速聚焦搜索框</span><span class="fs-keys"><kbd>Ctrl</kbd> + <kbd>E</kbd> / <kbd>K</kbd> / <kbd>/</kbd></span></div><div class="fixed-row"><span class="fs-desc">➕ Todoist 快速新建任务</span><span class="fs-keys"><kbd>Alt</kbd> + <kbd>A</kbd></span></div><div class="fixed-row"><span class="fs-desc">✕ 关闭当前活动的多窗口</span><span class="fs-keys"><kbd>Alt</kbd> + <kbd>W</kbd></span></div><div class="fixed-row"><span class="fs-desc">⚡ 极速搜索页进入主标签页</span><span class="fs-keys"><kbd>Alt</kbd> + <kbd>H</kbd></span></div><div class="fixed-row"><span class="fs-desc">⎋ 清除搜索 / 退出弹窗</span><span class="fs-keys"><kbd>Esc</kbd></span></div></div></div>', 1))
            ], 512), [
              [Se, g.value === "shortcuts"]
            ]),
            a(t("section", bn, [
              e[127] || (e[127] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "03"),
                t("div", null, [
                  t("h2", null, "搜索与书签过滤"),
                  t("p", null, "排除特定书签文件夹，避免其出现在主搜索框的实时联想建议中。")
                ])
              ], -1)),
              t("div", xn, [
                t("div", wn, [
                  e[126] || (e[126] = t("label", null, [
                    k("排除书签文件夹 "),
                    t("em", null, "SEARCH FILTER")
                  ], -1)),
                  t("div", mn, [
                    a(t("select", {
                      "onUpdate:modelValue": e[36] || (e[36] = (o) => A.value = o),
                      style: { flex: "1" }
                    }, [
                      t("option", yn, u(P.value.length ? "选择要排除的书签文件夹…" : "正在读取浏览器书签…"), 1),
                      (r(!0), l(B, null, Z(P.value, (o) => (r(), l("option", {
                        key: o.id,
                        value: o.id
                      }, u(o.path), 9, hn))), 128))
                    ], 512), [
                      [ge, A.value]
                    ]),
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      disabled: !A.value,
                      onClick: Co
                    }, "＋ 添加到排除", 8, kn)
                  ]),
                  t("div", Cn, [
                    (r(!0), l(B, null, Z(U.value, (o) => (r(), l("div", {
                      key: o.rowKey,
                      class: "ignored-folder-row"
                    }, [
                      t("span", Sn, u(o.path), 1),
                      t("button", {
                        type: "button",
                        class: "icon-btn-danger",
                        onClick: (n) => So(o.id)
                      }, "✕", 8, Tn)
                    ]))), 128)),
                    j.value ? (r(), l("p", zn, "另有 " + u(j.value) + " 条旧格式规则原样保留，本面板不编辑或清理它们。", 1)) : T("", !0)
                  ])
                ])
              ])
            ], 512), [
              [Se, g.value === "privacy"]
            ]),
            a(t("section", En, [
              e[139] || (e[139] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "04"),
                t("div", null, [
                  t("h2", null, "边狱巴士 漫游歌词定制"),
                  t("p", null, "深度调整全屏漫游歌词色彩、字体、描边宽度、光晕与 3D 透视视差。")
                ])
              ], -1)),
              t("div", Ln, [
                t("div", $n, [
                  e[129] || (e[129] = t("label", null, [
                    k("色彩风格预设 "),
                    t("em", null, "PRESET")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[37] || (e[37] = (o) => v.preset = o),
                    onChange: To
                  }, [...e[128] || (e[128] = [
                    Ft('<option value="cover">🖼 封面自适应 (随当前播放专辑封面实时变色 - 强烈推荐)</option><option value="default">👑 通用 (经典金珀) — Limbus 默认战役风格</option><option value="heartbreak">💔 心碎 (暴怒紫红) — 绯红暴怒战斗色相</option><option value="command">💠 指令 (科技青蓝) — 绝密指引深空荧光</option><option value="custom">🎨 自定义色彩与特效</option>', 5)
                  ])], 544), [
                    [ge, v.preset]
                  ])
                ]),
                t("div", Un, [
                  e[130] || (e[130] = t("label", null, [
                    k("主文字颜色 "),
                    t("em", null, "TEXT COLOR")
                  ], -1)),
                  t("div", An, [
                    a(t("input", {
                      "onUpdate:modelValue": e[38] || (e[38] = (o) => v.textColor = o),
                      type: "color",
                      class: "color-picker",
                      onInput: e[39] || (e[39] = (o) => ne("textColor"))
                    }, null, 544), [
                      [R, v.textColor]
                    ]),
                    a(t("input", {
                      "onUpdate:modelValue": e[40] || (e[40] = (o) => v.textColor = o),
                      type: "text",
                      style: { flex: "1" },
                      onInput: e[41] || (e[41] = (o) => ne("textColor"))
                    }, null, 544), [
                      [R, v.textColor]
                    ])
                  ])
                ]),
                t("div", Vn, [
                  e[131] || (e[131] = t("label", null, [
                    k("轮廓描边颜色 "),
                    t("em", null, "STROKE")
                  ], -1)),
                  t("div", Pn, [
                    a(t("input", {
                      "onUpdate:modelValue": e[42] || (e[42] = (o) => v.strokeColor = o),
                      type: "color",
                      class: "color-picker",
                      onInput: e[43] || (e[43] = (o) => ne("strokeColor"))
                    }, null, 544), [
                      [R, v.strokeColor]
                    ]),
                    a(t("input", {
                      "onUpdate:modelValue": e[44] || (e[44] = (o) => v.strokeColor = o),
                      type: "text",
                      style: { flex: "1" },
                      onInput: e[45] || (e[45] = (o) => ne("strokeColor"))
                    }, null, 544), [
                      [R, v.strokeColor]
                    ])
                  ])
                ]),
                t("div", Rn, [
                  e[132] || (e[132] = t("label", null, [
                    k("辉光光晕颜色 "),
                    t("em", null, "GLOW")
                  ], -1)),
                  t("div", Wn, [
                    a(t("input", {
                      "onUpdate:modelValue": e[46] || (e[46] = (o) => v.glowColor = o),
                      type: "color",
                      class: "color-picker",
                      onInput: e[47] || (e[47] = (o) => ne("glowColor"))
                    }, null, 544), [
                      [R, v.glowColor]
                    ]),
                    a(t("input", {
                      "onUpdate:modelValue": e[48] || (e[48] = (o) => v.glowColor = o),
                      type: "text",
                      style: { flex: "1" },
                      onInput: e[49] || (e[49] = (o) => ne("glowColor"))
                    }, null, 544), [
                      [R, v.glowColor]
                    ])
                  ])
                ]),
                t("div", Dn, [
                  e[134] || (e[134] = t("label", null, [
                    k("描边轮廓宽度 "),
                    t("em", null, "WIDTH")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[50] || (e[50] = (o) => v.strokeWidth = o),
                    onChange: e[51] || (e[51] = (o) => ne("strokeWidth"))
                  }, [...e[133] || (e[133] = [
                    t("option", { value: "1.5" }, "细致 (1.5px)", -1),
                    t("option", { value: "2.2" }, "标准 (2.2px - 原版预设)", -1),
                    t("option", { value: "3.0" }, "浓重 (3.0px)", -1),
                    t("option", { value: "4.0" }, "超厚 (4.0px)", -1)
                  ])], 544), [
                    [ge, v.strokeWidth]
                  ])
                ]),
                t("div", In, [
                  e[136] || (e[136] = t("label", null, [
                    k("字号大小 "),
                    t("em", null, "FONT SIZE")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[52] || (e[52] = (o) => v.fontSize = o),
                    onChange: e[53] || (e[53] = (o) => ne("fontSize"))
                  }, [...e[135] || (e[135] = [
                    t("option", { value: "26" }, "紧凑 (26px)", -1),
                    t("option", { value: "36" }, "标准 (36px - 推荐)", -1),
                    t("option", { value: "46" }, "大型 (46px - 巨幕沉浸)", -1),
                    t("option", { value: "56" }, "特大 (56px - 冲击力)", -1)
                  ])], 544), [
                    [ge, v.fontSize]
                  ])
                ]),
                t("div", Mn, [
                  e[138] || (e[138] = t("label", null, [
                    k("3D 透视视差倾角 "),
                    t("em", null, "PERSPECTIVE")
                  ], -1)),
                  a(t("select", {
                    "onUpdate:modelValue": e[54] || (e[54] = (o) => v.perspectiveStrength = o),
                    onChange: e[55] || (e[55] = (o) => ne("perspectiveStrength"))
                  }, [...e[137] || (e[137] = [
                    t("option", { value: "0" }, "关闭透视 (纯平面)", -1),
                    t("option", { value: "0.6" }, "轻柔透视 (0.6x)", -1),
                    t("option", { value: "1.0" }, "标准透视 (1.0x - 原版算法)", -1),
                    t("option", { value: "1.5" }, "强烈透视 (1.5x - 视差拉扯)", -1)
                  ])], 544), [
                    [ge, v.perspectiveStrength]
                  ])
                ])
              ])
            ], 512), [
              [Se, g.value === "limbus"]
            ]),
            a(t("section", jn, [
              e[143] || (e[143] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "05"),
                t("div", null, [
                  t("h2", null, "壁纸与桌面背景"),
                  t("p", null, "个性化定制新标签页背景：支持预设山景、纯黑无干扰、赛博霓虹渐变、自定义本地图片与动态视频壁纸。")
                ])
              ], -1)),
              t("div", On, [
                t("div", Bn, [
                  e[140] || (e[140] = t("label", null, [
                    k("导入与管理 "),
                    t("em", null, "IMPORT & ACTIONS")
                  ], -1)),
                  t("div", _n, [
                    t("button", {
                      type: "button",
                      class: "btn-primary",
                      onClick: uo
                    }, " ＋ 导入本地图片 "),
                    t("button", {
                      type: "button",
                      class: "btn-primary",
                      onClick: co
                    }, " ▶ 导入动态视频 (MP4/WebM) "),
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      onClick: go
                    }, " 📁 批量导入文件夹 "),
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      disabled: ft.value,
                      onClick: Ae
                    }, " 🔄 刷新壁纸库 ", 8, Nn)
                  ]),
                  tt.value ? (r(), l("div", Fn, u(tt.value), 1)) : T("", !0)
                ]),
                t("div", Gn, [
                  e[141] || (e[141] = t("label", null, [
                    k("精选预设与风格 "),
                    t("em", null, "BUILTIN PRESETS")
                  ], -1)),
                  t("div", Hn, [
                    (r(), l(B, null, Z(ao, (o) => t("div", {
                      key: o.id,
                      class: ce(["wallpaper-item-card", { "is-active": st(o) }]),
                      onClick: (n) => Rt(o)
                    }, [
                      t("div", {
                        class: "wallpaper-card-preview",
                        style: rt(o.style ? o.style : o.thumb ? { backgroundImage: `url(${o.thumb})` } : {})
                      }, [
                        t("span", Yn, u(o.kind), 1),
                        st(o) ? (r(), l("span", Kn, "✓ 使用中")) : T("", !0)
                      ], 4),
                      t("div", Jn, [
                        t("span", Xn, u(o.title), 1)
                      ])
                    ], 10, qn)), 64))
                  ])
                ]),
                t("div", Zn, [
                  t("div", Qn, [
                    t("label", ei, [
                      e[142] || (e[142] = k("本地与自导入壁纸库 ", -1)),
                      t("em", null, "MY WALLPAPERS (" + u(_e.value.length) + ")", 1)
                    ]),
                    bt.value > 1 ? (r(), l("div", ti, [
                      t("button", {
                        type: "button",
                        class: "btn-secondary",
                        style: { padding: "2px 8px", "font-size": "11px" },
                        disabled: Ue.value <= 1,
                        onClick: e[56] || (e[56] = (o) => Ue.value--)
                      }, " ◀ ", 8, oi),
                      t("span", si, u(Ue.value) + " / " + u(bt.value), 1),
                      t("button", {
                        type: "button",
                        class: "btn-secondary",
                        style: { padding: "2px 8px", "font-size": "11px" },
                        disabled: Ue.value >= bt.value,
                        onClick: e[57] || (e[57] = (o) => Ue.value++)
                      }, " ▶ ", 8, ni)
                    ])) : T("", !0)
                  ]),
                  _e.value.length === 0 ? (r(), l("div", ii, " 暂无导入的自定义壁纸，点击上方「＋ 导入本地图片」或「▶ 导入动态视频」添加你喜爱的桌面壁纸！ ")) : (r(), l("div", ri, [
                    (r(!0), l(B, null, Z(Pt.value, (o) => (r(), l("div", {
                      key: o.id,
                      class: ce(["wallpaper-item-card", { "is-active": st(o) }]),
                      onClick: (n) => Rt(o)
                    }, [
                      t("div", ai, [
                        o.kind === "视频" && se[o.id] ? (r(), l("video", {
                          key: 0,
                          src: se[o.id],
                          autoplay: "",
                          loop: "",
                          muted: "",
                          playsinline: "",
                          preload: "metadata"
                        }, null, 8, di)) : se[o.id] || o.thumb ? (r(), l("img", {
                          key: 1,
                          src: se[o.id] || o.thumb,
                          alt: "",
                          loading: "lazy"
                        }, null, 8, pi)) : (r(), l("div", ui, u(o.kind === "视频" ? "▶" : "🖼️"), 1)),
                        t("span", ci, u(o.kind || "本地"), 1),
                        st(o) ? (r(), l("span", gi, "✓ 使用中")) : T("", !0),
                        t("button", {
                          type: "button",
                          class: "wallpaper-card-delete-btn",
                          title: Fe.value === o.id ? "再次点击确认删除" : "删除该壁纸",
                          onClick: it((n) => vo(o), ["stop"])
                        }, u(Fe.value === o.id ? "✓" : "×"), 9, vi)
                      ]),
                      t("div", {
                        class: "wallpaper-card-meta",
                        onClick: e[59] || (e[59] = it(() => {
                        }, ["stop"]))
                      }, [
                        Ne.value === o.id ? (r(), l(B, { key: 0 }, [
                          a(t("input", {
                            "onUpdate:modelValue": e[58] || (e[58] = (n) => ot.value = n),
                            type: "text",
                            style: { width: "100%", "box-sizing": "border-box", padding: "2px 6px", "font-size": "11px", border: "1px solid #38bdf8", "border-radius": "4px", background: "var(--panel)", color: "var(--text)" },
                            onKeydown: [
                              Gt((n) => Wt(o), ["enter"]),
                              Gt(Dt, ["esc"])
                            ]
                          }, null, 40, fi), [
                            [R, ot.value]
                          ]),
                          t("button", {
                            type: "button",
                            class: "wallpaper-card-edit-btn",
                            title: "保存",
                            onClick: (n) => Wt(o)
                          }, "✓", 8, bi),
                          t("button", {
                            type: "button",
                            class: "wallpaper-card-edit-btn",
                            title: "取消",
                            onClick: Dt
                          }, "✕")
                        ], 64)) : (r(), l(B, { key: 1 }, [
                          t("span", {
                            class: "wallpaper-card-title",
                            title: o.title
                          }, u(o.title || "自定义壁纸"), 9, xi),
                          t("button", {
                            type: "button",
                            class: "wallpaper-card-edit-btn",
                            title: "重命名",
                            onClick: (n) => fo(o)
                          }, "✏️", 8, wi)
                        ], 64))
                      ])
                    ], 10, li))), 128))
                  ]))
                ])
              ])
            ], 512), [
              [Se, g.value === "wallpaper"]
            ]),
            a(t("section", mi, [
              e[159] || (e[159] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "06"),
                t("div", null, [
                  t("h2", null, "数据备份、多端云同步与版本更新"),
                  t("p", null, "管理新标签页的 WebDAV 云端同步、本地 JSON 配置快照导出，以及版本检查与热重载。")
                ])
              ], -1)),
              t("div", yi, [
                t("div", hi, [
                  e[149] || (e[149] = t("label", null, [
                    k("☁️ WebDAV 多端云端漫游 "),
                    t("em", null, "WEBDAV CLOUD SYNC")
                  ], -1)),
                  e[150] || (e[150] = t("p", {
                    class: "hint",
                    style: { margin: "0 0 10px" }
                  }, " 支持坚果云、Nextcloud、私有 NAS 或 VPS 搭建的 WebDAV 服务。配置后可实现不同电脑间配置一键漫游同步。 ", -1)),
                  t("div", ki, [
                    t("div", null, [
                      e[144] || (e[144] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "WebDAV 服务器地址", -1)),
                      a(t("input", {
                        "onUpdate:modelValue": e[60] || (e[60] = (o) => $.webdavUrl = o),
                        type: "url",
                        placeholder: "https://dav.jianguoyun.com/dav/LogicWeaver/",
                        style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
                      }, null, 512), [
                        [R, $.webdavUrl]
                      ]),
                      e[145] || (e[145] = t("small", { style: { "font-size": "10px", color: "var(--muted)", "margin-top": "2px", display: "block" } }, "坚果云用户推荐在应用管理生成应用密码，地址填写根目录或子文件夹。", -1))
                    ]),
                    t("div", Ci, [
                      t("div", Si, [
                        e[146] || (e[146] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "账号 / 邮箱", -1)),
                        a(t("input", {
                          "onUpdate:modelValue": e[61] || (e[61] = (o) => $.webdavUsername = o),
                          type: "text",
                          placeholder: "account@example.com",
                          style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
                        }, null, 512), [
                          [R, $.webdavUsername]
                        ])
                      ]),
                      t("div", Ti, [
                        e[147] || (e[147] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "应用专用密码", -1)),
                        a(t("input", {
                          "onUpdate:modelValue": e[62] || (e[62] = (o) => $.webdavPassword = o),
                          type: "password",
                          placeholder: "••••••••••••",
                          style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
                        }, null, 512), [
                          [R, $.webdavPassword]
                        ])
                      ]),
                      t("div", zi, [
                        e[148] || (e[148] = t("label", { style: { "font-size": "11.5px", color: "var(--text)" } }, "备份文件名", -1)),
                        a(t("input", {
                          "onUpdate:modelValue": e[63] || (e[63] = (o) => $.webdavFilename = o),
                          type: "text",
                          placeholder: "logicweaver-settings.json",
                          style: { width: "100%", "box-sizing": "border-box", padding: "7px 10px", border: "1px solid var(--border)", "border-radius": "7px", background: "var(--panel)", color: "var(--text)", "font-size": "12px" }
                        }, null, 512), [
                          [R, $.webdavFilename]
                        ])
                      ])
                    ]),
                    t("div", Ei, [
                      t("button", {
                        type: "button",
                        class: "btn-primary",
                        disabled: z.value,
                        onClick: Je
                      }, " 保存连接设置 ", 8, Li),
                      t("button", {
                        type: "button",
                        class: "btn-secondary",
                        disabled: z.value,
                        onClick: M
                      }, " 测试连接 ", 8, $i),
                      t("button", {
                        type: "button",
                        class: "btn-save-green",
                        disabled: z.value,
                        onClick: fe
                      }, " ⬆️ 上传备份到云端 ", 8, Ui),
                      t("button", {
                        type: "button",
                        class: "btn-secondary",
                        disabled: z.value,
                        style: { color: "#0284c7" },
                        onClick: ze
                      }, " ⬇️ 从云端恢复备份 ", 8, Ai)
                    ]),
                    S.value ? (r(), l("div", Vi, u(S.value), 1)) : T("", !0)
                  ])
                ]),
                t("div", Pi, [
                  e[153] || (e[153] = t("label", null, [
                    k("📦 本地数据快照文件 "),
                    t("em", null, "LOCAL BACKUP & RESTORE")
                  ], -1)),
                  t("div", Ri, [
                    t("button", {
                      type: "button",
                      class: "btn-secondary",
                      onClick: be
                    }, " 💾 导出配置为本地 JSON "),
                    t("label", Wi, [
                      e[151] || (e[151] = k(" 📂 导入本地 JSON 恢复 ", -1)),
                      t("input", {
                        type: "file",
                        accept: ".json,application/json",
                        style: { display: "none" },
                        onChange: xe
                      }, null, 32)
                    ]),
                    q.value ? (r(), l("span", Di, u(q.value), 1)) : T("", !0),
                    e[152] || (e[152] = t("small", { style: { "flex-basis": "100%", color: "var(--muted)", "font-size": "10.5px", "margin-top": "2px" } }, " 本地快照包含常用网站、分组布局、主题、快捷键等普通配置，不含任何账户密码私密信息。 ", -1))
                  ])
                ]),
                t("div", Ii, [
                  e[158] || (e[158] = t("label", null, [
                    k("🚀 插件版本与 GitHub 在线更新 "),
                    t("em", null, "RELEASE & GIT")
                  ], -1)),
                  t("div", Mi, [
                    t("div", null, [
                      t("div", ji, u(i(Xe)), 1),
                      t("div", Oi, u(i(he)), 1)
                    ]),
                    t("div", Bi, [
                      i(Ee) ? (r(), l("button", {
                        key: 0,
                        type: "button",
                        class: "btn-save-green",
                        title: "本地文件已更新，点击一键重新载入扩展生效",
                        onClick: e[64] || (e[64] = //@ts-ignore
                        (...o) => i(Qe) && i(Qe)(...o))
                      }, " 🔄 立即重新载入扩展 ")) : T("", !0),
                      t("button", {
                        type: "button",
                        class: "btn-secondary",
                        disabled: i(je) || i(Oe),
                        onClick: e[65] || (e[65] = //@ts-ignore
                        (...o) => i(Ut) && i(Ut)(...o))
                      }, u(i(je) ? "正在检测最新版…" : "🔍 检查最新版本"), 9, _i),
                      i(Le) ? (r(), l("button", {
                        key: 1,
                        type: "button",
                        class: "btn-primary",
                        onClick: e[66] || (e[66] = //@ts-ignore
                        (...o) => i(Vt) && i(Vt)(...o))
                      }, " 一键本地拉取 (Git) ")) : T("", !0)
                    ])
                  ]),
                  i(J) ? (r(), l("div", Ni, u(i(J)), 1)) : T("", !0),
                  i(no) || !i(Ze) ? (r(), l("div", Fi, [
                    t("div", Gi, [
                      e[154] || (e[154] = t("strong", { style: { "font-size": "12px" } }, "GitHub 访问 Token（私有仓库协作者在线拉取）", -1)),
                      t("button", {
                        type: "button",
                        style: { padding: "2px 8px", "font-size": "11px" },
                        onClick: e[67] || (e[67] = //@ts-ignore
                        (...o) => i($t) && i($t)(...o))
                      }, "保存 Token")
                    ]),
                    a(t("input", {
                      "onUpdate:modelValue": e[68] || (e[68] = (o) => Vo(Ze) ? Ze.value = o : null),
                      type: "password",
                      placeholder: "ghp_... 输入你的 GitHub Personal Access Token",
                      style: { "font-size": "11px", padding: "6px 8px" }
                    }, null, 512), [
                      [R, i(Ze)]
                    ]),
                    e[155] || (e[155] = t("p", {
                      class: "hint",
                      style: { margin: "0" }
                    }, "填写后可免安装 Git 直接从 GitHub 在线检测、进度条下载最新版插件压缩包。", -1))
                  ])) : T("", !0),
                  i(te) ? (r(), l("div", Hi, [
                    t("div", qi, [
                      t("div", null, [
                        t("span", Yi, "🎉 发现新版本：" + u(i(te).tag_name), 1),
                        i(te).name ? (r(), l("span", Ki, "(" + u(i(te).name) + ")", 1)) : T("", !0)
                      ]),
                      i(oo) && !i(ut) ? (r(), l("button", {
                        key: 0,
                        type: "button",
                        class: "btn-primary",
                        disabled: i(Oe),
                        onClick: e[69] || (e[69] = //@ts-ignore
                        (...o) => i(At) && i(At)(...o))
                      }, u(i(Oe) ? "下载中…" : "⬇️ 一键下载更新包"), 9, Ji)) : T("", !0)
                    ]),
                    i(te).body ? (r(), l("div", Xi, u(i(te).body), 1)) : T("", !0),
                    i(Oe) || i(Lt) > 0 ? (r(), l("div", Zi, [
                      t("div", Qi, [
                        t("span", null, u(i(Oe) ? "正在从 GitHub 下载安装包…" : i(ut) ? "已交给浏览器保存" : "已暂停"), 1),
                        t("strong", null, u(i(so)), 1)
                      ]),
                      t("div", er, [
                        t("div", {
                          class: "download-progress-bar",
                          style: rt({ width: `${i(Lt)}%` })
                        }, null, 4)
                      ])
                    ])) : T("", !0),
                    i(ut) ? (r(), l("div", tr, [
                      e[156] || (e[156] = t("strong", null, "安装包已交给浏览器，请在下载列表确认保存完成。", -1)),
                      e[157] || (e[157] = t("p", { style: { margin: "0", "font-size": "11px", "line-height": "1.4" } }, " 解压安装包覆盖到当前扩展目录后，点击下方按钮即可一键重新载入生效，无需重启浏览器： ", -1)),
                      t("button", {
                        type: "button",
                        class: "btn-save-green",
                        style: { "align-self": "flex-start", "margin-top": "4px" },
                        onClick: e[70] || (e[70] = //@ts-ignore
                        (...o) => i(Qe) && i(Qe)(...o))
                      }, " 🔄 立即重新载入扩展 (Hot Reload) ")
                    ])) : T("", !0)
                  ])) : T("", !0)
                ])
              ])
            ], 512), [
              [Se, g.value === "sync"]
            ]),
            a(t("section", or, [
              e[160] || (e[160] = t("header", { class: "panel-head" }, [
                t("span", { class: "panel-index" }, "07"),
                t("div", null, [
                  t("h2", null, "文件夹与存储"),
                  t("p", null, "按用途管理本地目录，各目录独立授权。")
                ])
              ], -1)),
              g.value === "storage" ? (r(), Po(i(C), {
                key: 0,
                active: V.active && g.value === "storage",
                target: i(le).state.requestedStorageTarget,
                request: i(le).state.sectionRequest
              }, null, 8, ["active", "target", "request"])) : T("", !0)
            ], 512), [
              [Se, g.value === "storage"]
            ])
          ], 8, rs)
        ], 512)
      ]),
      t("div", sr, [
        Be.value ? (r(), l("span", {
          key: 0,
          class: ce(["save-status-msg", { error: ct.value }])
        }, u(Be.value), 3)) : T("", !0),
        $e.value || de.value ? (r(), l("span", nr, u($e.value ? "正在读取设置…" : "正在保存改动项…"), 1)) : T("", !0),
        t("button", {
          type: "button",
          class: "btn-save-green",
          disabled: !ae.value || de.value,
          onClick: e[71] || (e[71] = (o) => nt(!1))
        }, "保存", 8, ir),
        t("button", {
          type: "button",
          class: "btn-secondary",
          onClick: Eo
        }, "返回")
      ])
    ], 8, Zo));
  }
});
export {
  fr as default
};
