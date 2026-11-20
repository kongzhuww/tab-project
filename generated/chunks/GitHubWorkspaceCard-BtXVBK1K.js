import { d as Le, f as t, g as s, h as e, F as j, i as ee, s as Z, t as a, u as o, k as ne, j as _, b as G, x as ie, r as je, w as be, o as ut, e as ft, p as ke, A as et, m as se, v as qe, q as ct, l as we, T as $t, n as tt, H as Ct, C as Ue, J as Rt, z as Oe, y as Gt, B as dt, E as Mt } from "./vendor-vue-BbmU9NUg.js";
import { u as Nt } from "./useCardActivity-CXFXWuCr.js";
import { x as St, y as st, n as Tt, z as le, A as ht, m as J, R as At, B as Pt, q as mt, r as gt, C as Ot, D as pt, G as Ft, E as Bt, w as jt } from "./github.service-mYu1TuZI.js";
import { A as qt } from "./AccountSetupGuide-aAWH-mt-.js";
import { c as Et, g as vt, G as zt, d as Wt } from "./github-task-modal-store-BmukMkrV.js";
import Vt from "./GitHubTrending-BrXaP9kK.js";
import { _ as De, t as U } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
import { i as Yt, l as Kt } from "./github-resources-DWMhFx7q.js";
import { s as at } from "./storage-cache.service-BYF2zxXX.js";
import { l as Zt, a as Xt, b as Qt, r as Jt, c as es } from "./workspace-bridge-D95cD4vF.js";
import { z as bt, A as ts, B as ss, g as as } from "./search.service-DiFFcmm2.js";
import { m as Be } from "./core-utils-KTt-RZby.js";
import { u as os } from "./workspace-wallpaper-BZrhOgwG.js";
import { W as ns } from "./WorkspaceWallpaperLayer-nCpfKdVa.js";
const ls = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], is = [
  // 1. AI 与大模型
  {
    id: "awesome-generative-ai",
    name: "awesome-generative-ai",
    title: "生成式 AI 大全 (Generative AI)",
    category: "ai",
    desc: "精选各类顶尖生成式 AI 工具、模型架构、API 服务与研究论文索引。",
    stars: "18k+",
    url: "https://github.com/steven2358/awesome-generative-ai",
    tags: ["LLM", "Diffusion", "AI工具", "GPT"]
  },
  {
    id: "awesome-llm",
    name: "Awesome-LLM",
    title: "大语言模型权威全景指南",
    category: "ai",
    desc: "覆盖全球主流大语言模型（LLM）的论文、微调框架、评测基准与实战资料。",
    stars: "22k+",
    url: "https://github.com/Hannibal046/Awesome-LLM",
    tags: ["深度学习", "LLM", "论文", "微调"]
  },
  {
    id: "awesome-chatgpt-prompts",
    name: "awesome-chatgpt-prompts",
    title: "ChatGPT / Claude 提示词神级指南",
    category: "ai",
    desc: "全球最受欢迎的优质提示词合集，包含编程专家、角色扮演、写作助理等海量 Prompt。",
    stars: "120k+",
    url: "https://github.com/f/awesome-chatgpt-prompts",
    tags: ["Prompt", "ChatGPT", "Claude", "效率"]
  },
  {
    id: "awesome-langchain",
    name: "awesome-langchain",
    title: "LangChain & Agent 生态精选",
    category: "ai",
    desc: "精选基于 LangChain、LlamaIndex 等构建的智能体、RAG 向量检索与应用示例。",
    stars: "11k+",
    url: "https://github.com/kyrolabs/awesome-langchain",
    tags: ["Agent", "RAG", "向量检索", "Python"]
  },
  // 2. 现代前端
  {
    id: "awesome-vue",
    name: "awesome-vue",
    title: "Vue.js 官方精选生态资源",
    category: "frontend",
    desc: "Vue 3 官方社区维护的周边全景：UI 组件库、状态管理、模板、工具与教程。",
    stars: "72k+",
    url: "https://github.com/vuejs/awesome-vue",
    tags: ["Vue3", "UI库", "Pinia", "Vite"]
  },
  {
    id: "awesome-react",
    name: "awesome-react",
    title: "React 生态完整全景清单",
    category: "frontend",
    desc: "精选 React 核心生态资源：Next.js、Hooks、动画库、表单与全栈方案。",
    stars: "66k+",
    url: "https://github.com/enaqx/awesome-react",
    tags: ["React", "Next.js", "前端", "Hooks"]
  },
  {
    id: "awesome-tailwind-css",
    name: "awesome-tailwindcss",
    title: "Tailwind CSS 神器集合",
    category: "frontend",
    desc: "优质 Tailwind 插件、设计系统组件、配色生成器与现代排版实践。",
    stars: "16k+",
    url: "https://github.com/aniftyco/awesome-tailwindcss",
    tags: ["CSS", "Tailwind", "样式", "UI"]
  },
  {
    id: "awesome-electron",
    name: "awesome-electron",
    title: "Electron 桌面端开发精选",
    category: "frontend",
    desc: "使用 Web 技术打造跨平台桌面软件的实用框架、打包工具与知名开源软件清单。",
    stars: "26k+",
    url: "https://github.com/sindresorhus/awesome-electron",
    tags: ["桌面端", "CrossPlatform", "Node"]
  },
  // 3. 后端与多语言
  {
    id: "awesome-python",
    name: "awesome-python",
    title: "Python 顶级开源库与框架大全",
    category: "backend",
    desc: "Python 开发者必备百科全书：涵盖爬虫、Web 框架、并发、科学计算与工具库。",
    stars: "230k+",
    url: "https://github.com/vinta/awesome-python",
    tags: ["Python", "FastAPI", "自动化", "爬虫"]
  },
  {
    id: "awesome-go",
    name: "awesome-go",
    title: "Go 语言实用包与高并发工具",
    category: "backend",
    desc: "Golang 高性能后端、微服务架构、网络库、存储引擎与脚手架。",
    stars: "140k+",
    url: "https://github.com/avelino/awesome-go",
    tags: ["Go", "高并发", "微服务", "网络"]
  },
  {
    id: "awesome-rust",
    name: "awesome-rust",
    title: "Rust 语言神级开源应用与库",
    category: "backend",
    desc: "极速且安全的现代系统编程：WebAssembly、高性能网络、CLI 工具与游戏开发。",
    stars: "45k+",
    url: "https://github.com/rust-unofficial/awesome-rust",
    tags: ["Rust", "系统级", "WASM", "高性能"]
  },
  {
    id: "awesome-nodejs",
    name: "awesome-nodejs",
    title: "Node.js 实用包与服务端清单",
    category: "backend",
    desc: "高星 Node.js 库、异步处理、文件系统与现代后端运行时方案。",
    stars: "57k+",
    url: "https://github.com/sindresorhus/awesome-nodejs",
    tags: ["Node.js", "TypeScript", "后端"]
  },
  // 4. 自建服务与私有云
  {
    id: "awesome-selfhosted",
    name: "awesome-selfhosted",
    title: "Self-Hosted 自由自建私有服务大全",
    category: "selfhosted",
    desc: "摆脱云服务垄断！自建个人网盘、家庭媒体中心、个人笔记、密码管理器与 Git 服务器。",
    stars: "210k+",
    url: "https://github.com/awesome-selfhosted/awesome-selfhosted",
    tags: ["私有云", "Docker", "NAS", "本地优先"]
  },
  {
    id: "awesome-docker",
    name: "awesome-docker",
    title: "Docker 容器技术与镜像实战",
    category: "selfhosted",
    desc: "容器化部署精选、Compose 模板、轻量运维面板与极速优化工具。",
    stars: "31k+",
    url: "https://github.com/veggiemonk/awesome-docker",
    tags: ["Docker", "容器", "DevOps", "运维"]
  },
  {
    id: "awesome-sysadmin",
    name: "awesome-sysadmin",
    title: "Linux 与系统管理员神级清单",
    category: "selfhosted",
    desc: "系统监控、备份方案、自动化编排、日志分析与安全加固必备开源神器。",
    stars: "28k+",
    url: "https://github.com/kahun/awesome-sysadmin",
    tags: ["Linux", "系统管理", "监控", "备份"]
  },
  // 5. CLI 与效率工具
  {
    id: "awesome-cli",
    name: "awesome-cli-apps",
    title: "现代命令行 CLI 生产力神器",
    category: "tools",
    desc: "终极终端生产力！现代替代品（bat、eza、ripgrep、fzf）与炫酷终端增强应用。",
    stars: "25k+",
    url: "https://github.com/agarrharr/awesome-cli-apps",
    tags: ["终端", "命令行", "CLI", "效率"]
  },
  {
    id: "awesome-mac",
    name: "awesome-mac",
    title: "macOS 绝赞开源与实用软件清单",
    category: "tools",
    desc: "让 Mac 体验更进一步的顶尖开发者工具、窗口管理、效率辅助与设计软件。",
    stars: "74k+",
    url: "https://github.com/jaywcjlove/awesome-mac",
    tags: ["macOS", "桌面", "效率", "开发工具"]
  },
  {
    id: "awesome-windows",
    name: "awesome-windows",
    title: "Windows 开发者高级工具合集",
    category: "tools",
    desc: "针对 Windows 10/11 的极简美化、WSL2、终端配置、PowerToys 与效率神器。",
    stars: "11k+",
    url: "https://github.com/Awesome-Windows/Awesome",
    tags: ["Windows", "WSL", "美化", "工具"]
  },
  // 6. 计算机体系与学习
  {
    id: "awesome-cs-courses",
    name: "awesome-cs-courses",
    title: "全球顶尖名校计算机公开课汇总",
    category: "learning",
    desc: "斯坦福、MIT、伯克利等世界名校的计算机科学系统化自学路线与视频作业。",
    stars: "61k+",
    url: "https://github.com/prakhar1989/awesome-courses",
    tags: ["计算机科学", "名校课程", "算法", "操作系统"]
  },
  {
    id: "awesome-free-programming-books",
    name: "free-programming-books",
    title: "经典免费编程电子书大全",
    category: "learning",
    desc: "全语言覆盖的权威经典开源技术书籍、教程与交互式编程学习资源。",
    stars: "340k+",
    url: "https://github.com/EbookFoundation/free-programming-books",
    tags: ["电子书", "编程入门", "教程", "免费资源"]
  },
  {
    id: "awesome-algorithms",
    name: "awesome-algorithms",
    title: "数据结构与算法精选索引",
    category: "learning",
    desc: "刷题必备、算法可视化、经典数据结构实现与面试精编题解。",
    stars: "17k+",
    url: "https://github.com/tayllan/awesome-algorithms",
    tags: ["算法", "数据结构", "LeetCode", "面试"]
  }
], rs = { class: "gh-awesome-wrapper" }, us = { class: "gh-awesome-header" }, cs = { class: "gh-awesome-pills" }, ds = ["onClick"], ps = { class: "gh-awesome-grid" }, hs = ["onClick"], gs = { class: "gh-awesome-card-head" }, fs = { class: "gh-awesome-card-name" }, ms = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, vs = { class: "gh-awesome-desc" }, bs = { class: "gh-awesome-footer" }, ys = { class: "gh-awesome-tags" }, _s = ["href"], ws = {
  key: 0,
  class: "gh-awesome-empty"
}, ks = /* @__PURE__ */ Le({
  __name: "GitHubAwesome",
  setup(w) {
    const i = G("all"), l = ie(() => is.filter((p) => i.value === "all" || p.category === i.value));
    function u(p) {
      window.open(p, "_blank", "noreferrer");
    }
    return (p, f) => (t(), s("div", rs, [
      e("header", us, [
        f[1] || (f[1] = e("div", { class: "gh-awesome-intro" }, [
          e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ])
        ], -1)),
        e("div", cs, [
          (t(!0), s(j, null, ee(o(ls), (M) => (t(), s("button", {
            key: M.id,
            type: "button",
            class: Z(["gh-awesome-pill", { active: i.value === M.id }]),
            onClick: ($) => i.value = M.id
          }, [
            e("span", null, a(M.icon), 1),
            e("b", null, a(M.name), 1)
          ], 10, ds))), 128))
        ])
      ]),
      e("div", ps, [
        (t(!0), s(j, null, ee(l.value, (M) => (t(), s("article", {
          key: M.id,
          class: "gh-awesome-card",
          onClick: ($) => u(M.url)
        }, [
          e("div", gs, [
            e("div", fs, [
              e("strong", null, a(M.title), 1),
              e("small", null, a(M.name), 1)
            ]),
            e("span", ms, "★ " + a(M.stars), 1)
          ]),
          e("p", vs, a(M.desc), 1),
          e("div", bs, [
            e("div", ys, [
              (t(!0), s(j, null, ee(M.tags, ($) => (t(), s("span", {
                key: $,
                class: "gh-awesome-tag"
              }, a($), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: M.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: f[0] || (f[0] = ne(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, _s)
          ])
        ], 8, hs))), 128)),
        l.value.length ? _("", !0) : (t(), s("div", ws, [...f[2] || (f[2] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), $s = /* @__PURE__ */ De(ks, [["__scopeId", "data-v-ce110d1d"]]), ot = "gh_my_repos_cache_v1", nt = "gh_my_repo_groups_v2", lt = "gh_my_repo_groups_map_v2", O = je({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function Ze(w) {
  return w.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class Qe {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return Qe.instance || (Qe.instance = new Qe()), Qe.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(i = !1) {
    if (!i && this.inFlightPromise)
      return this.inFlightPromise;
    i && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const l = this.abortController.signal, u = (async () => {
      await this.loadPersistedGroups();
      const p = await at.get(ot);
      if (p && p.length ? this.hydrateRepos(p) : O.repos.length && this.hydrateRepos(O.repos), i || !O.repos.length) {
        O.loading = !0, O.errorMessage = "";
        try {
          await this.fetchRemote(l);
        } catch (M) {
          if (M.name === "AbortError") return;
          O.errorMessage = M.message || "获取个人仓库失败";
        } finally {
          O.loading = !1;
        }
      } else
        this.fetchRemote(l).catch(() => {
        });
    })();
    return this.inFlightPromise = u.finally(() => {
      this.inFlightPromise === u && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(i) {
    const { ghUser: l, ghToken: u } = await St();
    if (!l && !u) {
      O.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const p = st(u), f = [], M = /* @__PURE__ */ new Set();
    if (l)
      try {
        const R = `https://api.github.com/users/${encodeURIComponent(l)}/repos?type=owner&sort=updated&per_page=100`, k = await fetch(R, { method: "GET", headers: p, signal: i });
        if (k.ok) {
          const P = await k.json();
          if (Array.isArray(P))
            for (const C of P)
              C && C.id && !M.has(C.id) && (M.add(C.id), f.push(C));
        }
      } catch (R) {
        if (R.name === "AbortError") throw R;
      }
    if (u)
      try {
        const k = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: p, signal: i });
        if (k.ok) {
          const P = await k.json();
          if (Array.isArray(P))
            for (const C of P)
              C && C.id && !M.has(C.id) && (M.add(C.id), f.push(C));
        }
      } catch (R) {
        if (R.name === "AbortError") throw R;
      }
    if (!f.length) {
      O.repos.length || (O.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const $ = f.map((R) => {
      const k = R.full_name || `${R.owner?.login || l}/${R.name}`, P = R.name, C = O.repoGroupsMap[k] || O.repoGroupsMap[P] || O.repoGroupsMap[k.toLowerCase()] || O.repoGroupsMap[P.toLowerCase()] || [];
      return {
        id: R.id,
        name: R.name,
        fullName: k,
        description: R.description || "",
        isPrivate: !!R.private,
        isFork: !!R.fork,
        htmlUrl: R.html_url || `https://github.com/${l}/${R.name}`,
        language: R.language || null,
        stargazersCount: Number(R.stargazers_count) || 0,
        forksCount: Number(R.forks_count) || 0,
        openIssuesCount: Number(R.open_issues_count) || 0,
        topics: Array.isArray(R.topics) ? R.topics.map((E) => String(E).toLowerCase()) : [],
        localGroups: C,
        updatedAt: R.updated_at || "",
        pushedAt: R.pushed_at || "",
        defaultBranch: R.default_branch || "main"
      };
    });
    this.hydrateRepos($), await at.set(ot, $, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(i) {
    let l = !1;
    O.repos = i.map((u) => {
      const p = O.repoGroupsMap[u.fullName] || O.repoGroupsMap[u.name] || O.repoGroupsMap[u.fullName.toLowerCase()] || O.repoGroupsMap[u.name.toLowerCase()], f = u.localGroups && u.localGroups.length ? u.localGroups : null, M = Yt(u, O.customGroups), $ = (p && p.length ? p : null) || f || M, R = $ ? [...new Set($.filter(Boolean))] : [];
      return R.length && (!O.repoGroupsMap[u.fullName] || !O.repoGroupsMap[u.fullName].length) && (O.repoGroupsMap[u.fullName] = R, l = !0), {
        ...u,
        localGroups: R
      };
    }), l && this.persistGroupsMap();
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(i, l) {
    const u = Ze(l);
    u && (i.localGroups.includes(u) || i.localGroups.push(u), O.repoGroupsMap[i.fullName] = [...i.localGroups], await this.persistGroupsMap(), await at.set(ot, O.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(i, l) {
    i.localGroups = i.localGroups.filter((u) => u !== l), O.repoGroupsMap[i.fullName] = [...i.localGroups], await this.persistGroupsMap(), await at.set(ot, O.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(i, l) {
    if (!l)
      i.localGroups = [];
    else {
      const u = Ze(l);
      if (!u) return;
      i.localGroups = [u];
    }
    O.repoGroupsMap[i.fullName] = [...i.localGroups], await this.persistGroupsMap(), await at.set(ot, O.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(i) {
    const l = Ze(i);
    return l ? O.customGroups.includes(l) ? (alert(`分组「${l}」已存在。`), null) : (O.customGroups.push(l), await this.persistGroups(), l) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(i, l) {
    const u = Ze(l);
    return u ? i === u ? !0 : O.customGroups.includes(u) ? (alert(`已存在名为「${u}」的分组。`), !1) : (O.customGroups = O.customGroups.map((p) => p === i ? u : p), O.repos.forEach((p) => {
      p.localGroups.includes(i) && (p.localGroups = p.localGroups.map((f) => f === i ? u : f), O.repoGroupsMap[p.fullName] = [...p.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(i) {
    const l = O.repos.filter((p) => p.localGroups.includes(i)).length, u = l > 0 ? `确定删除分组「${i}」吗？
该分组下的 ${l} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${i}」吗？`;
    return confirm(u) ? (O.customGroups = O.customGroups.filter((p) => p !== i), O.repos.forEach((p) => {
      p.localGroups.includes(i) && (p.localGroups = p.localGroups.filter((f) => f !== i), O.repoGroupsMap[p.fullName] = [...p.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let i = null, l = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const u = await chrome.storage.local.get([nt, lt]);
        i = u?.[nt], l = u?.[lt];
      }
      if (!i || !Array.isArray(i)) {
        const u = localStorage.getItem(nt);
        u && (i = JSON.parse(u));
      }
      if (!l || typeof l != "object") {
        const u = localStorage.getItem(lt);
        u && (l = JSON.parse(u));
      }
      Array.isArray(i) && (O.customGroups = i.map(Ze).filter(Boolean)), l && typeof l == "object" && (O.repoGroupsMap = l);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const i = { ...O.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [lt]: i }), localStorage.setItem(lt, JSON.stringify(i));
    } catch {
    }
  }
  async persistGroups() {
    const i = Array.from(new Set(O.customGroups.map(Ze).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [nt]: i }), localStorage.setItem(nt, JSON.stringify(i));
    } catch {
    }
  }
}
const _e = Qe.getInstance(), Cs = { class: "my-repos-workspace" }, Ss = {
  key: 0,
  class: "error-banner"
}, Rs = { class: "shelf-header" }, Gs = { class: "shelf-left" }, Ms = { class: "shelf-badge" }, Ts = { class: "shelf-right" }, As = ["title"], Ls = ["onDragstart", "onContextmenu"], Ds = { class: "repo-card-head" }, Hs = ["title", "onClick"], xs = {
  key: 0,
  class: "badge-repo-visibility private"
}, Es = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Is = ["title"], Us = {
  key: 1,
  class: "repo-topics-row"
}, Ns = { class: "repo-card-footer" }, Ps = { class: "meta-left" }, Os = {
  key: 0,
  class: "meta-item lang"
}, Fs = { class: "meta-item" }, Bs = {
  key: 1,
  class: "meta-item"
}, js = ["title"], qs = { class: "board-columns-track" }, zs = ["onDragover", "onDragleave", "onDrop"], Ws = { class: "column-header" }, Vs = {
  key: 0,
  class: "column-title-group"
}, Ys = ["title"], Ks = { class: "badge-count" }, Zs = {
  key: 1,
  class: "column-rename-group"
}, Xs = ["onKeydown"], Qs = ["onClick"], Js = { class: "column-actions" }, ea = ["onClick"], ta = {
  key: 0,
  class: "col-popover-menu"
}, sa = ["onClick"], aa = ["onClick"], oa = { class: "column-cards-scroll" }, na = ["onDragstart", "onContextmenu"], la = { class: "repo-card-head" }, ia = ["title", "onClick"], ra = {
  key: 0,
  class: "badge-repo-visibility private"
}, ua = {
  key: 1,
  class: "badge-repo-visibility fork"
}, ca = ["title"], da = { class: "repo-topics-row" }, pa = { class: "topic-chip active-chip" }, ha = ["onClick"], ga = { class: "repo-card-footer" }, fa = { class: "meta-left" }, ma = {
  key: 0,
  class: "meta-item lang"
}, va = { class: "meta-item" }, ba = {
  key: 1,
  class: "meta-item"
}, ya = { class: "meta-date" }, _a = {
  key: 0,
  class: "empty-column-placeholder"
}, wa = { class: "board-column new-column-slot" }, ka = {
  key: 1,
  class: "new-column-composer"
}, $a = { class: "composer-actions" }, Ca = ["onClick"], Sa = /* @__PURE__ */ Le({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(w) {
    const i = w, l = G(""), u = G(!1), p = G(null), f = G(""), M = G(null), $ = G(null), R = G(null), k = G(!1);
    function P() {
      k.value = !k.value;
    }
    function C(g) {
      const h = R.value;
      h && (Math.abs(g.deltaX) > Math.abs(g.deltaY) && g.deltaX !== 0 || g.deltaY !== 0 && (g.preventDefault(), h.scrollLeft += g.deltaY));
    }
    const E = G(null), H = G(null), A = G(null);
    let I = null, Q = 0;
    const x = je({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), L = G(null), z = G(!1);
    function te() {
      x.visible = !1, L.value = null;
    }
    function ce(g, h, m) {
      g.preventDefault(), g.stopPropagation();
      let T = g.clientX, y = g.clientY;
      T > window.innerWidth - 200 && (T = window.innerWidth - 210), y > window.innerHeight - 240 && (y = window.innerHeight - 245), x.x = T, x.y = y, x.repo = h, x.fromGroup = m, x.visible = !0, L.value = "folder", z.value = T > window.innerWidth - 380;
    }
    async function re() {
      const g = x.repo;
      te(), g && await _e.moveRepoToGroup(g, null);
    }
    async function N(g) {
      const h = x.repo;
      te(), h && await _e.moveRepoToGroup(h, g);
    }
    async function W() {
      const g = x.repo;
      if (te(), !!g)
        try {
          await navigator.clipboard.writeText(g.htmlUrl), Tt.show({
            appName: "GitHub",
            title: U("github.myRepos.copiedUrlTitle"),
            message: U("github.myRepos.copiedUrlMsg", { name: g.name })
          });
        } catch {
        }
    }
    async function K() {
      const g = x.repo;
      if (te(), !!g)
        try {
          const h = `git clone ${g.htmlUrl}.git`;
          await navigator.clipboard.writeText(h), Tt.show({
            appName: "GitHub",
            title: U("github.myRepos.copiedCloneTitle"),
            message: h
          });
        } catch {
        }
    }
    function Y() {
      const g = x.repo;
      te(), g && Ne(g.htmlUrl);
    }
    function F() {
      const g = x.repo;
      te(), g && Et.open({
        fullName: g.fullName,
        description: g.description || "",
        stars: g.stargazersCount,
        language: g.language || void 0,
        updated: g.pushedAt
      });
    }
    function ae(g) {
      g.target?.closest(".gh-repo-context-menu") || x.visible && te();
    }
    function ye(g) {
      g.key === "Escape" && x.visible && te();
    }
    const de = ie(() => O.customGroups), he = ie(() => O.repos), ue = ie(() => he.value.filter((g) => !g.localGroups.length));
    function fe(g) {
      return he.value.filter((h) => h.localGroups.includes(g));
    }
    async function $e() {
      const g = l.value.trim();
      if (!g) return;
      await _e.createGroup(g) && (l.value = "", u.value = !1);
    }
    function Se(g) {
      M.value = g, f.value = g, p.value = null;
    }
    async function He(g) {
      const h = f.value.trim();
      if (!h || h === g) {
        M.value = null;
        return;
      }
      await _e.renameGroup(g, h) && (M.value = null);
    }
    async function Me(g) {
      p.value = null, await _e.deleteGroup(g);
    }
    async function xe(g, h) {
      await _e.removeRepoFromGroup(g, h);
    }
    function Ee(g) {
      const h = $.value;
      if (!h) return;
      const T = g.target?.closest(".column-cards-scroll");
      if (T && T.scrollHeight > T.clientHeight && !g.shiftKey && g.deltaX === 0) {
        const y = T.scrollTop <= 0 && g.deltaY < 0, c = T.scrollTop + T.clientHeight >= T.scrollHeight - 1 && g.deltaY > 0;
        if (!y && !c)
          return;
      }
      Math.abs(g.deltaX) > Math.abs(g.deltaY) && g.deltaX !== 0 || g.deltaY !== 0 && (g.preventDefault(), h.scrollLeft += g.deltaY);
    }
    function Re(g) {
      if (!E.value || !$.value) return;
      g.preventDefault();
      const h = g.deltaX !== 0 ? g.deltaX : g.deltaY;
      $.value.scrollLeft += h;
    }
    function Te() {
      if (I !== null) return;
      const g = () => {
        $.value && Q !== 0 ? ($.value.scrollLeft += Q, I = requestAnimationFrame(g)) : B();
      };
      I = requestAnimationFrame(g);
    }
    function B() {
      I !== null && (cancelAnimationFrame(I), I = null), Q = 0;
    }
    function b(g) {
      if (!E.value || !$.value) return;
      const h = $.value.getBoundingClientRect(), m = 100;
      if (g > h.right - m) {
        const T = Math.min(1, Math.max(0.1, (g - (h.right - m)) / m));
        Q = Math.round(T * 20), Te();
      } else if (g < h.left + m) {
        const T = Math.min(1, Math.max(0.1, (h.left + m - g) / m));
        Q = -Math.round(T * 20), Te();
      } else
        B();
    }
    function X(g) {
      E.value && (g.preventDefault(), b(g.clientX));
    }
    function ze(g, h, m) {
      te(), E.value = h, H.value = m, g.dataTransfer && (g.dataTransfer.effectAllowed = "move", g.dataTransfer.setData("text/plain", `${h.id}:${m}`)), window.addEventListener("wheel", Re, { passive: !1 });
    }
    function Ie() {
      E.value = null, H.value = null, A.value = null, B(), window.removeEventListener("wheel", Re);
    }
    function We(g, h) {
      E.value && (g.preventDefault(), g.dataTransfer && (g.dataTransfer.dropEffect = "move"), A.value = h, b(g.clientX));
    }
    function Ve(g, h) {
      const m = g.currentTarget, T = g.relatedTarget;
      m?.contains(T) || A.value === h && (A.value = null);
    }
    async function Ye(g, h) {
      g.preventDefault();
      const m = E.value, T = H.value;
      Ie(), m && (h === "default" ? T && T !== "default" ? await _e.removeRepoFromGroup(m, T) : await _e.moveRepoToGroup(m, null) : (await _e.addRepoToGroup(m, h), T && T !== "default" && T !== h && await _e.removeRepoFromGroup(m, T)));
    }
    function Ne(g) {
      window.open(g, "_blank", "noopener,noreferrer");
    }
    function Pe(g) {
      if (!g) return "";
      try {
        const h = new Date(g);
        return `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, "0")}-${String(h.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return be(
      () => i.active,
      (g) => {
        te(), g && _e.load();
      }
    ), ut(() => {
      window.addEventListener("pointerdown", ae), window.addEventListener("keydown", ye), _e.load();
    }), ft(() => {
      B(), window.removeEventListener("wheel", Re), window.removeEventListener("pointerdown", ae), window.removeEventListener("keydown", ye);
    }), (g, h) => (t(), s("div", Cs, [
      o(O).errorMessage ? (t(), s("div", Ss, [
        e("span", null, "⚠️ " + a(o(O).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: h[0] || (h[0] = (m) => o(_e).load(!0))
        }, "重试")
      ])) : _("", !0),
      e("section", {
        class: Z(["default-shelf-area", { "is-collapsed": k.value, "drop-active": A.value === "default" }]),
        onDragover: h[1] || (h[1] = (m) => We(m, "default")),
        onDragleave: h[2] || (h[2] = (m) => Ve(m, "default")),
        onDrop: h[3] || (h[3] = (m) => Ye(m, "default"))
      }, [
        e("header", Rs, [
          e("div", Gs, [
            h[20] || (h[20] = e("span", { class: "shelf-icon" }, "📁", -1)),
            h[21] || (h[21] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", Ms, a(ue.value.length), 1),
            h[22] || (h[22] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", Ts, [
            ue.value.length ? (t(), s("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: k.value ? o(U)("github.myRepos.expandShelf") : o(U)("github.myRepos.collapseShelf"),
              onClick: P
            }, a(k.value ? o(U)("github.myRepos.expandBtn") : o(U)("github.myRepos.collapseBtn")), 9, As)) : _("", !0)
          ])
        ]),
        ue.value.length ? ke((t(), s("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: R,
          class: "shelf-cards-scroll",
          onWheel: C
        }, [
          (t(!0), s(j, null, ee(ue.value, (m) => (t(), s("div", {
            key: m.id,
            class: Z(["repo-card shelf-card", { "card-dragging": E.value?.id === m.id }]),
            draggable: "true",
            onDragstart: (T) => ze(T, m, "default"),
            onDragend: Ie,
            onContextmenu: (T) => ce(T, m, "default")
          }, [
            e("div", Ds, [
              e("span", {
                class: "repo-name",
                title: m.fullName,
                onClick: (T) => Ne(m.htmlUrl)
              }, a(m.name), 9, Hs),
              m.isPrivate ? (t(), s("span", xs, "私有")) : _("", !0),
              m.isFork ? (t(), s("span", Es, "Fork")) : _("", !0)
            ]),
            m.description ? (t(), s("p", {
              key: 0,
              class: "repo-desc",
              title: m.description
            }, a(m.description), 9, Is)) : _("", !0),
            m.topics.length ? (t(), s("div", Us, [
              (t(!0), s(j, null, ee(m.topics, (T) => (t(), s("span", {
                key: T,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + a(T), 1))), 128))
            ])) : _("", !0),
            e("div", Ns, [
              e("div", Ps, [
                m.language ? (t(), s("span", Os, [
                  h[23] || (h[23] = e("span", { class: "lang-color" }, null, -1)),
                  se(a(m.language), 1)
                ])) : _("", !0),
                e("span", Fs, "⭐ " + a(m.stargazersCount), 1),
                m.forksCount ? (t(), s("span", Bs, "🍴 " + a(m.forksCount), 1)) : _("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + m.updatedAt
              }, a(Pe(m.pushedAt || m.updatedAt)), 9, js)
            ])
          ], 42, Ls))), 128))
        ], 544)), [
          [et, !k.value]
        ]) : _("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: $,
        class: "board-viewport",
        onWheel: Ee,
        onDragover: X
      }, [
        e("div", qs, [
          (t(!0), s(j, null, ee(de.value, (m) => (t(), s("section", {
            key: m,
            class: Z(["board-column topic-column", { "drop-active": A.value === m }]),
            onDragover: (T) => We(T, m),
            onDragleave: (T) => Ve(T, m),
            onDrop: (T) => Ye(T, m)
          }, [
            e("header", Ws, [
              M.value !== m ? (t(), s("div", Vs, [
                h[24] || (h[24] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + m
                }, " 📁 " + a(m), 9, Ys),
                e("span", Ks, a(fe(m).length), 1)
              ])) : (t(), s("div", Zs, [
                ke(e("input", {
                  "onUpdate:modelValue": h[4] || (h[4] = (T) => f.value = T),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    ct((T) => He(m), ["enter"]),
                    h[5] || (h[5] = ct((T) => M.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, Xs), [
                  [qe, f.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (T) => He(m)
                }, "✓", 8, Qs),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: h[6] || (h[6] = (T) => M.value = null)
                }, "✕")
              ])),
              e("div", Js, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (T) => p.value = p.value === m ? null : m
                }, "•••", 8, ea),
                p.value === m ? (t(), s("div", ta, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (T) => Se(m)
                  }, " 重命名分组 ", 8, sa),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (T) => Me(m)
                  }, " 删除分组 ", 8, aa)
                ])) : _("", !0)
              ])
            ]),
            e("div", oa, [
              (t(!0), s(j, null, ee(fe(m), (T) => (t(), s("div", {
                key: T.id,
                class: Z(["repo-card", { "card-dragging": E.value?.id === T.id }]),
                draggable: "true",
                onDragstart: (y) => ze(y, T, m),
                onDragend: Ie,
                onContextmenu: (y) => ce(y, T, m)
              }, [
                e("div", la, [
                  e("span", {
                    class: "repo-name",
                    title: T.fullName,
                    onClick: (y) => Ne(T.htmlUrl)
                  }, a(T.name), 9, ia),
                  T.isPrivate ? (t(), s("span", ra, "私有")) : _("", !0),
                  T.isFork ? (t(), s("span", ua, "Fork")) : _("", !0)
                ]),
                T.description ? (t(), s("p", {
                  key: 0,
                  class: "repo-desc",
                  title: T.description
                }, a(T.description), 9, ca)) : _("", !0),
                e("div", da, [
                  e("span", pa, [
                    se(" 📁 " + a(m) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: ne((y) => xe(T, m), ["stop"])
                    }, "✕", 8, ha)
                  ]),
                  (t(!0), s(j, null, ee(T.topics, (y) => (t(), s("span", {
                    key: y,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + a(y), 1))), 128))
                ]),
                e("div", ga, [
                  e("div", fa, [
                    T.language ? (t(), s("span", ma, [
                      h[25] || (h[25] = e("span", { class: "lang-color" }, null, -1)),
                      se(a(T.language), 1)
                    ])) : _("", !0),
                    e("span", va, "⭐ " + a(T.stargazersCount), 1),
                    T.forksCount ? (t(), s("span", ba, "🍴 " + a(T.forksCount), 1)) : _("", !0)
                  ]),
                  e("span", ya, a(Pe(T.pushedAt || T.updatedAt)), 1)
                ])
              ], 42, na))), 128)),
              fe(m).length ? _("", !0) : (t(), s("div", _a, [...h[26] || (h[26] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, zs))), 128)),
          e("section", wa, [
            u.value ? (t(), s("div", ka, [
              h[28] || (h[28] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              ke(e("input", {
                "onUpdate:modelValue": h[8] || (h[8] = (m) => l.value = m),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  ct($e, ["enter"]),
                  h[9] || (h[9] = ct((m) => u.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [qe, l.value]
              ]),
              e("div", $a, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: $e
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: h[10] || (h[10] = (m) => u.value = !1)
                }, a(o(U)("common.cancel")), 1)
              ])
            ])) : (t(), s("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: h[7] || (h[7] = (m) => u.value = !0)
            }, [...h[27] || (h[27] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (t(), we($t, { to: "body" }, [
        x.visible && x.repo ? (t(), s("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: tt({ left: `${x.x}px`, top: `${x.y}px` }),
          onClick: h[18] || (h[18] = ne(() => {
          }, ["stop"])),
          onContextmenu: h[19] || (h[19] = ne(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: Z(["gh-menu-has-sub", { "is-active": L.value === "folder" }]),
            onMouseenter: h[13] || (h[13] = (m) => L.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: h[11] || (h[11] = ne((m) => L.value = L.value === "folder" ? null : "folder", ["stop"]))
            }, [...h[29] || (h[29] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: Z(["gh-sub-flyout", { "flyout-left": z.value }]),
              onClick: h[12] || (h[12] = ne(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: Z(["fo-cover-menu-item", { primary: !x.repo.localGroups.length }]),
                type: "button",
                onClick: re
              }, a(x.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (t(!0), s(j, null, ee(de.value, (m) => (t(), s("button", {
                key: m,
                class: Z(["fo-cover-menu-item", { primary: x.repo.localGroups.includes(m) }]),
                type: "button",
                onClick: (T) => N(m)
              }, a(x.repo.localGroups.includes(m) ? "✓ " : "  ") + "📁 " + a(m), 11, Ca))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[14] || (h[14] = (m) => L.value = null),
            onClick: W
          }, a(o(U)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[15] || (h[15] = (m) => L.value = null),
            onClick: K
          }, a(o(U)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[16] || (h[16] = (m) => L.value = null),
            onClick: F
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[17] || (h[17] = (m) => L.value = null),
            onClick: Y
          }, a(o(U)("github.myRepos.openInGitHub")), 33)
        ], 36)) : _("", !0)
      ]))
    ]));
  }
}), Ra = /* @__PURE__ */ De(Sa, [["__scopeId", "data-v-117c5a31"]]), Ae = je({
  uncatPage: 1,
  pageSize: 10
});
class Je {
  static getInstance() {
    return Je.instance || (Je.instance = new Je()), Je.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && Ae.uncatPage++;
  }
  prevUncatPage() {
    Ae.uncatPage > 1 && Ae.uncatPage--;
  }
  setUncatPage(i) {
    const l = Math.max(1, Math.min(i, this.uncatTotalPages));
    Ae.uncatPage = l;
  }
  get uncatPage() {
    return Ae.uncatPage;
  }
  get uncatTotalPages() {
    const i = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(i / Ae.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const i = le.searchQuery.trim().toLowerCase(), l = le.repos.filter((u) => ht(u.full_name).length === 0);
    return i ? l.filter(
      (u) => u.full_name.toLowerCase().includes(i) || u.description && u.description.toLowerCase().includes(i) || u.language && u.language.toLowerCase().includes(i) || u.topics && u.topics.some((p) => p.toLowerCase().includes(i))
    ) : l;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const i = this.filteredUncatRepos, u = (Math.min(Ae.uncatPage, this.uncatTotalPages) - 1) * Ae.pageSize;
    return i.slice(u, u + Ae.pageSize);
  }
  /**
   * 各个本地分组板块列表（根据当前激活的大分组标签过滤）
   */
  get lists() {
    const i = le.activeSection || "默认";
    return le.lists.filter((l) => (l.section || "默认") === i);
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(i) {
    const l = le.searchQuery.trim().toLowerCase(), u = le.repos.filter((p) => ht(p.full_name).includes(i));
    return l ? u.filter(
      (p) => p.full_name.toLowerCase().includes(l) || p.description && p.description.toLowerCase().includes(l) || p.language && p.language.toLowerCase().includes(l) || p.topics && p.topics.some((f) => f.toLowerCase().includes(l))
    ) : u;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(i, l) {
    await J.dropRepositoryIntoFolder(i, l);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(i, l) {
    await J.toggleRepoList(i, l);
  }
}
const oe = Je.getInstance(), Xe = {
  mode: "idle",
  activeDragRepo: null,
  activeDragFromList: null,
  hoverTargetColumn: null,
  draggingColumnId: null,
  hoverColumnId: null,
  repoMenu: null,
  columnMenu: null
};
class Ga {
  constructor() {
    this._state = { ...Xe }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.githubStarsBoard = this);
  }
  get state() {
    return this._state;
  }
  get mode() {
    return this._state.mode;
  }
  get isDraggingRepo() {
    return this._state.mode === "dragging_repo";
  }
  get isDraggingColumn() {
    return this._state.mode === "dragging_column";
  }
  get activeDragRepo() {
    return this._state.activeDragRepo;
  }
  get activeDragFromList() {
    return this._state.activeDragFromList;
  }
  get hoverTargetColumn() {
    return this._state.hoverTargetColumn;
  }
  get draggingColumnId() {
    return this._state.draggingColumnId;
  }
  get hoverColumnId() {
    return this._state.hoverColumnId;
  }
  get repoMenu() {
    return this._state.repoMenu;
  }
  get columnMenu() {
    return this._state.columnMenu;
  }
  subscribe(i) {
    return this._listeners.add(i), () => {
      this._listeners.delete(i);
    };
  }
  _setState(i) {
    this._state = i;
    for (const l of this._listeners)
      l(i);
  }
  send(i) {
    const l = this._state;
    switch (i.type) {
      case "START_DRAG_REPO":
        return this._setState({
          mode: "dragging_repo",
          activeDragRepo: i.repo,
          activeDragFromList: i.fromList,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_TARGET_COLUMN":
        return l.mode === "dragging_repo" ? (this._setState({
          ...l,
          hoverTargetColumn: i.columnId
        }), !0) : !1;
      case "END_DRAG_REPO":
        return l.mode === "dragging_repo" ? (this._setState({ ...Xe }), !0) : !1;
      case "START_DRAG_COLUMN":
        return this._setState({
          mode: "dragging_column",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: i.columnId,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_COLUMN_REORDER":
        return l.mode === "dragging_column" ? (this._setState({
          ...l,
          hoverColumnId: i.columnId
        }), !0) : !1;
      case "END_DRAG_COLUMN":
        return l.mode === "dragging_column" ? (this._setState({ ...Xe }), !0) : !1;
      case "OPEN_REPO_MENU":
        return this._setState({
          mode: "repo_context_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: i.payload,
          columnMenu: null
        }), !0;
      case "CLOSE_REPO_MENU":
        return l.mode === "repo_context_menu" ? (this._setState({ ...Xe }), !0) : !1;
      case "OPEN_COLUMN_MENU":
        return this._setState({
          mode: "column_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: i.payload
        }), !0;
      case "CLOSE_COLUMN_MENU":
        return l.mode === "column_menu" ? (this._setState({ ...Xe }), !0) : !1;
      case "RESET_IDLE":
        return this._setState({ ...Xe }), !0;
      default:
        return !1;
    }
  }
}
const Ma = { class: "stars-board-workspace" }, Ta = ["data-gh-list-drop"], Aa = { class: "shelf-header" }, La = { class: "shelf-left" }, Da = { class: "shelf-badge" }, Ha = { class: "shelf-right" }, xa = {
  key: 0,
  class: "shelf-pager"
}, Ea = ["disabled"], Ia = { class: "pager-text" }, Ua = ["disabled"], Na = ["title"], Pa = {
  key: 0,
  class: "shelf-cards-scroll"
}, Oa = ["onClick", "onDragstart", "onContextmenu"], Fa = ["onClick"], Ba = { class: "gh-card-head" }, ja = ["src"], qa = ["href", "title"], za = { class: "owner" }, Wa = { class: "gh-card-body" }, Va = { class: "gh-card-badges" }, Ya = ["title"], Ka = ["title"], Za = ["title"], Xa = { class: "meta" }, Qa = { class: "gh-stars" }, Ja = {
  key: 0,
  class: "gh-lang"
}, eo = { class: "gh-updated" }, to = { class: "shelf-next-content" }, so = { class: "shelf-next-sub" }, ao = {
  key: 2,
  class: "shelf-empty",
  role: "status"
}, oo = {
  key: 0,
  class: "gh-drilldown-header"
}, no = { class: "gh-drilldown-current" }, lo = { class: "gh-drilldown-sub-count" }, io = {
  key: 0,
  class: "board-columns-track"
}, ro = { class: "column-cards-scroll" }, uo = {
  key: 1,
  class: "board-columns-track"
}, co = ["data-gh-list-drop", "onDragover", "onDragleave", "onDrop"], po = ["title"], ho = ["onClick"], go = ["title"], fo = {
  key: 0,
  class: "col-pinned-icon",
  title: "已置顶分组"
}, mo = { class: "badge-count" }, vo = {
  key: 1,
  class: "col-sub-badge",
  title: "点击下钻查看所有子分组"
}, bo = { class: "column-actions" }, yo = ["onDragstart", "onClick"], _o = { class: "column-cards-scroll" }, wo = ["onClick", "onDragstart", "onContextmenu"], ko = ["onClick"], $o = { class: "gh-card-head" }, Co = ["src"], So = ["href", "title"], Ro = { class: "owner" }, Go = { class: "gh-card-body" }, Mo = { class: "gh-card-badges" }, To = ["title"], Ao = ["onClick"], Lo = ["title"], Do = ["title"], Ho = ["title"], xo = { class: "meta" }, Eo = { class: "gh-stars" }, Io = {
  key: 0,
  class: "gh-lang"
}, Uo = { class: "gh-updated" }, No = {
  key: 0,
  class: "empty-column-dropzone"
}, Po = { class: "board-column add-column-panel" }, Oo = ["title"], Fo = ["onClick"], Bo = /* @__PURE__ */ Le({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(w) {
    const i = w, l = G(null), u = G(null), p = G(!1);
    function f() {
      p.value = !p.value;
    }
    function M(n) {
      const r = u.value;
      r && (Math.abs(n.deltaX) > Math.abs(n.deltaY) && n.deltaX !== 0 || n.deltaY !== 0 && (n.preventDefault(), r.scrollLeft += n.deltaY));
    }
    const $ = ie(() => le.loading), R = ie(() => $.value && !le.repos.length), k = G(null);
    function P(n) {
      if (!n) return null;
      const r = n.match(/^(.+?)[/／](.+)$/);
      if (!r) return null;
      const d = r[1].trim(), v = r[2].trim();
      return !d || !v ? null : { parentPrefix: d, childName: v };
    }
    function C(n) {
      const r = P(n);
      if (!r) return null;
      const d = r.parentPrefix.toLowerCase(), v = oe.lists.find((V) => V.name.trim().toLowerCase() === d);
      return v ? v.name : null;
    }
    function E(n) {
      const r = n.trim().toLowerCase();
      return oe.lists.filter((d) => {
        const v = P(d.name);
        return v !== null && v.parentPrefix.toLowerCase() === r;
      });
    }
    function H(n) {
      return E(n).length > 0;
    }
    const A = ie(() => k.value ? E(k.value).length : 0);
    function I(n) {
      k.value = n, l.value && (l.value.scrollLeft = 0);
    }
    const Q = ie(() => {
      const n = oe.lists;
      if (!k.value)
        return n.filter((V) => C(V.name) === null);
      const r = k.value.trim().toLowerCase(), d = n.find((V) => V.name.trim().toLowerCase() === r), v = E(k.value);
      return !d && !v.length ? (k.value = null, n.filter((V) => C(V.name) === null)) : d ? [d, ...v] : v;
    });
    be(() => le.activeSection, () => {
      k.value = null;
    });
    function x() {
      J.promptCreateFolder(k.value || void 0);
    }
    const L = new Ga(), z = G(L.activeDragRepo), te = G(L.activeDragFromList), ce = G(L.hoverTargetColumn);
    let re = null, N = 0;
    function W() {
      re === null && (re = window.setInterval(() => {
        !l.value || N === 0 || (l.value.scrollLeft += N);
      }, 16));
    }
    function K() {
      re !== null && (clearInterval(re), re = null), N = 0;
    }
    const Y = je({
      visible: !1,
      x: 0,
      y: 0,
      list: null
    }), F = je({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), ae = G(null), ye = G(!1), de = G(L.draggingColumnId), he = G(L.hoverColumnId), ue = L.subscribe((n) => {
      z.value = n.activeDragRepo, te.value = n.activeDragFromList, ce.value = n.hoverTargetColumn, de.value = n.draggingColumnId, he.value = n.hoverColumnId, Y.visible = n.mode === "column_menu" && n.columnMenu !== null, Y.x = n.columnMenu?.x ?? 0, Y.y = n.columnMenu?.y ?? 0, Y.list = n.columnMenu?.list ?? null, F.visible = n.mode === "repo_context_menu" && n.repoMenu !== null, F.x = n.repoMenu?.x ?? 0, F.y = n.repoMenu?.y ?? 0, F.repo = n.repoMenu?.repo ?? null, F.fromList = n.repoMenu?.fromList ?? null, ae.value = n.repoMenu?.activeSubMenu ?? null, ye.value = n.repoMenu?.isFlyoutLeft ?? !1;
    });
    function fe() {
      L.send({ type: "CLOSE_COLUMN_MENU" });
    }
    function $e(n, r) {
      n.preventDefault(), n.stopPropagation();
      const d = 150, v = 130, V = Math.min(n.clientX, window.innerWidth - d - 10), Ke = Math.min(n.clientY, window.innerHeight - v - 10);
      L.send({ type: "OPEN_COLUMN_MENU", payload: { x: V, y: Ke, list: r } });
    }
    async function Se() {
      const n = Y.list;
      fe(), n && await J.renameFolder(n.id, n.name);
    }
    async function He() {
      const n = Y.list;
      fe(), n && await J.pinFolder(n.id);
    }
    async function Me() {
      const n = Y.list;
      fe(), n && await J.deleteFolder(n.name);
    }
    function xe(n, r) {
      L.send({ type: "START_DRAG_COLUMN", columnId: r.id }), n.dataTransfer && (n.dataTransfer.effectAllowed = "move", n.dataTransfer.setData("application/x-gh-col-id", r.id));
    }
    function Ee() {
      L.send({ type: "END_DRAG_COLUMN" });
    }
    function Re(n, r) {
      !de.value || de.value === r || (n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move"), L.send({ type: "HOVER_COLUMN_REORDER", columnId: r }));
    }
    function Te(n, r) {
      he.value === r && L.send({ type: "HOVER_COLUMN_REORDER", columnId: null });
    }
    async function B(n, r) {
      if (!de.value || de.value === r) return;
      n.preventDefault();
      const d = de.value;
      Ee(), await J.reorderFolders(d, r);
    }
    function b() {
      L.send({ type: "CLOSE_REPO_MENU" });
    }
    function X(n, r, d) {
      n.preventDefault(), n.stopPropagation();
      const v = 190, V = 270, Ke = Math.min(n.clientX, window.innerWidth - v - 10), Ut = Math.min(n.clientY, window.innerHeight - V - 10);
      L.send({
        type: "OPEN_REPO_MENU",
        payload: {
          x: Ke,
          y: Ut,
          repo: r,
          fromList: d,
          activeSubMenu: "folder",
          isFlyoutLeft: Ke > window.innerWidth - 380
        }
      });
    }
    async function ze() {
      const n = F.repo;
      b(), n && await oe.moveRepoToList(n.full_name, J.UNCAT);
    }
    async function Ie(n) {
      const r = F.repo;
      b(), r && await oe.moveRepoToList(r.full_name, n);
    }
    async function We() {
      const n = F.repo;
      if (b(), !!n?.html_url)
        try {
          await navigator.clipboard.writeText(n.html_url);
        } catch {
        }
    }
    async function Ve() {
      const n = F.repo;
      if (b(), !!n?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${n.full_name}.git`);
        } catch {
        }
    }
    function Ye() {
      const n = F.repo;
      b(), n && Et.open({
        fullName: n.full_name,
        description: n.description || "",
        stars: n.stargazers_count,
        language: n.language || void 0,
        updated: n.updated_at
      });
    }
    function Ne() {
      const n = F.repo;
      b(), n?.html_url && Ge(n.html_url);
    }
    function Pe(n) {
      const r = n.target;
      !r?.closest(".fo-cover-context-menu") && !r?.closest(".col-popover-menu") && !r?.closest(".gh-list-col-menu") && L.send({ type: "RESET_IDLE" });
    }
    function g(n) {
      if (n.key === "Escape") {
        if (k.value) {
          k.value = null;
          return;
        }
        L.send({ type: "RESET_IDLE" });
      }
    }
    function h(n) {
      const r = l.value;
      if (!r) return;
      const v = n.target?.closest(".column-cards-scroll");
      if (v && v.scrollHeight > v.clientHeight && !n.shiftKey && n.deltaX === 0) {
        const V = v.scrollTop === 0 && n.deltaY < 0, Ke = Math.ceil(v.scrollTop + v.clientHeight) >= v.scrollHeight && n.deltaY > 0;
        if (!V && !Ke)
          return;
      }
      Math.abs(n.deltaX) > Math.abs(n.deltaY) && n.deltaX !== 0 || n.deltaY !== 0 && (n.preventDefault(), r.scrollLeft += n.deltaY);
    }
    function m(n) {
      if (!z.value || !l.value) return;
      n.preventDefault();
      const r = n.deltaY !== 0 ? n.deltaY : n.deltaX;
      l.value.scrollLeft += r;
    }
    function T(n) {
      const r = l.value;
      if (!r) return;
      const d = r.getBoundingClientRect(), v = 100;
      if (n > d.right - v) {
        const V = Math.min(1, Math.max(0.1, (n - (d.right - v)) / v));
        N = Math.round(V * 20), W();
      } else if (n < d.left + v) {
        const V = Math.min(1, Math.max(0.1, (d.left + v - n) / v));
        N = -Math.round(V * 20), W();
      } else
        K();
    }
    function y(n) {
      T(n.clientX);
    }
    function c(n, r, d) {
      L.send({ type: "START_DRAG_REPO", repo: r, fromList: d }), n.dataTransfer && (n.dataTransfer.effectAllowed = "move", n.dataTransfer.setData(At, r.full_name), n.dataTransfer.setData("text/plain", `${r.full_name}:${d || "uncategorized"}`)), window.addEventListener("wheel", m, { passive: !1 });
    }
    function S() {
      L.send({ type: "END_DRAG_REPO" }), K(), window.removeEventListener("wheel", m);
    }
    function me(n, r) {
      !i.active || !z.value && !Array.from(n.dataTransfer?.types || []).includes(At) || (n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move"), L.send({ type: "HOVER_TARGET_COLUMN", columnId: r }));
    }
    function ve(n, r) {
      const d = n.currentTarget;
      d && n.relatedTarget instanceof Node && d.contains(n.relatedTarget) || ce.value === r && L.send({ type: "HOVER_TARGET_COLUMN", columnId: null });
    }
    async function pe(n, r) {
      n.preventDefault();
      const d = z.value?.full_name || Pt(n.dataTransfer);
      S(), !(!i.active || !d) && await oe.moveRepoToList(d, r === "uncategorized" ? J.UNCAT : r);
    }
    function ge(n) {
      mt.open(n.full_name, void 0, n);
    }
    function Ge(n) {
      window.open(n, "_blank", "noopener,noreferrer");
    }
    function Ce(n) {
      if (!n) return "";
      try {
        const r = new Date(n);
        return `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ut(() => {
      window.addEventListener("pointerdown", Pe), window.addEventListener("keydown", g);
    }), ft(() => {
      ue(), L.send({ type: "RESET_IDLE" }), K(), window.removeEventListener("wheel", m), window.removeEventListener("pointerdown", Pe), window.removeEventListener("keydown", g);
    }), (n, r) => (t(), s("div", Ma, [
      e("section", {
        class: Z(["default-shelf-area", { "is-collapsed": p.value, "drop-active": ce.value === "uncategorized" }]),
        "data-gh-list-drop": o(J).UNCAT,
        onDragover: r[5] || (r[5] = (d) => me(d, "uncategorized")),
        onDragleave: r[6] || (r[6] = (d) => ve(d, "uncategorized")),
        onDrop: r[7] || (r[7] = (d) => pe(d, "uncategorized"))
      }, [
        e("header", Aa, [
          e("div", La, [
            r[25] || (r[25] = e("span", { class: "shelf-icon" }, "📁", -1)),
            r[26] || (r[26] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", Da, a(o(oe).filteredUncatRepos.length), 1),
            r[27] || (r[27] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消本地分组归属；单排 10 个一页）", -1))
          ]),
          e("div", Ha, [
            o(oe).filteredUncatRepos.length > o(Ae).pageSize ? (t(), s("div", xa, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: o(oe).uncatPage <= 1,
                title: "上一页",
                onClick: r[0] || (r[0] = //@ts-ignore
                (...d) => o(oe).prevUncatPage && o(oe).prevUncatPage(...d))
              }, "‹", 8, Ea),
              e("span", Ia, a(o(oe).uncatPage) + " / " + a(o(oe).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: o(oe).uncatPage >= o(oe).uncatTotalPages,
                title: "下一页",
                onClick: r[1] || (r[1] = //@ts-ignore
                (...d) => o(oe).nextUncatPage && o(oe).nextUncatPage(...d))
              }, "›", 8, Ua)
            ])) : _("", !0),
            o(oe).filteredUncatRepos.length ? (t(), s("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: p.value ? "展开托盘" : "收起托盘",
              onClick: f
            }, a(p.value ? "展开 ▼" : "收起 ▲"), 9, Na)) : _("", !0)
          ])
        ]),
        R.value ? ke((t(), s("div", Pa, [
          (t(), s(j, null, ee(6, (d) => e("div", {
            key: "skel-shelf-" + d,
            class: "repo gh-card shelf-card skel-card"
          }, [...r[28] || (r[28] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ], 512)), [
          [et, !p.value]
        ]) : o(oe).filteredUncatRepos.length ? ke((t(), s("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: u,
          class: "shelf-cards-scroll",
          onWheel: M
        }, [
          (t(!0), s(j, null, ee(o(oe).pagedUncatRepos, (d) => (t(), s("article", {
            key: d.full_name,
            class: Z(["repo gh-card shelf-card", { "card-dragging": z.value?.full_name === d.full_name }]),
            draggable: "true",
            onClick: (v) => ge(d),
            onDragstart: (v) => c(v, d, null),
            onDragend: S,
            onContextmenu: (v) => X(v, d, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: ne((v) => X(v, d, null), ["stop"])
            }, "⋮", 8, Fa),
            e("div", Ba, [
              e("img", {
                class: "gh-owner-avatar",
                src: d.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: r[2] || (r[2] = (v) => v.target.src = "assets/github-star.svg")
              }, null, 40, ja),
              e("a", {
                href: d.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: d.full_name,
                onClick: r[3] || (r[3] = ne(() => {
                }, ["stop"]))
              }, [
                e("span", za, a(d.owner?.login || d.full_name.split("/")[0]) + "/", 1),
                se(a(d.name), 1)
              ], 8, qa)
            ]),
            e("div", Wa, [
              e("div", Va, [
                r[29] || (r[29] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                d.topics && d.topics.length ? (t(), s(j, { key: 0 }, [
                  (t(!0), s(j, null, ee(d.topics.slice(0, 2), (v) => (t(), s("span", {
                    key: v,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + v
                  }, " #" + a(v), 9, Ya))), 128)),
                  d.topics.length > 2 ? (t(), s("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: d.topics.slice(2).map((v) => "#" + v).join(" ")
                  }, " +" + a(d.topics.length - 2), 9, Ka)) : _("", !0)
                ], 64)) : _("", !0)
              ]),
              e("p", {
                class: "desc",
                title: d.description || ""
              }, a(d.description || "暂无描述"), 9, Za)
            ]),
            e("div", Xa, [
              e("span", Qa, "★ " + a(d.stargazers_count), 1),
              d.language ? (t(), s("span", Ja, a(d.language), 1)) : _("", !0),
              e("span", eo, "更新 " + a(Ce(d.updated_at)), 1)
            ])
          ], 42, Oa))), 128)),
          o(oe).uncatPage < o(oe).uncatTotalPages ? (t(), s("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: r[4] || (r[4] = //@ts-ignore
            (...d) => o(oe).nextUncatPage && o(oe).nextUncatPage(...d))
          }, [
            e("div", to, [
              r[30] || (r[30] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              r[31] || (r[31] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", so, a(o(oe).uncatPage + 1) + " / " + a(o(oe).uncatTotalPages) + " 页", 1)
            ])
          ])) : _("", !0)
        ], 544)), [
          [et, !p.value]
        ]) : p.value ? _("", !0) : (t(), s("p", ao, a(o(le).searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库"), 1))
      ], 42, Ta),
      k.value ? (t(), s("div", oo, [
        e("button", {
          type: "button",
          class: "gh-drilldown-back-btn",
          title: "返回查看全部一级分组 (Esc)",
          onClick: r[8] || (r[8] = (d) => k.value = null)
        }, " ‹ 返回全部 "),
        r[32] || (r[32] = e("span", { class: "gh-drilldown-sep" }, "/", -1)),
        e("span", no, "📁 " + a(k.value), 1),
        e("span", lo, " (含 " + a(A.value) + " 个子分组) ", 1),
        e("button", {
          type: "button",
          class: "gh-drilldown-exit-btn",
          title: "退出下钻视图",
          onClick: r[9] || (r[9] = (d) => k.value = null)
        }, " ✕ ")
      ])) : _("", !0),
      e("div", {
        ref_key: "boardViewportRef",
        ref: l,
        class: "board-viewport",
        onWheel: h,
        onDragover: y
      }, [
        $.value && !Q.value.length ? (t(), s("div", io, [
          (t(), s(j, null, ee(4, (d) => e("div", {
            key: "skel-col-" + d,
            class: "board-column skel-column"
          }, [
            r[34] || (r[34] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", ro, [
              (t(), s(j, null, ee(3, (v) => e("div", {
                key: "skel-col-card-" + v,
                class: "repo gh-card skel-card"
              }, [...r[33] || (r[33] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (t(), s("div", uo, [
          (t(!0), s(j, null, ee(Q.value, (d) => (t(), s("section", {
            key: d.id,
            class: Z(["board-column list-column", {
              "drop-active": ce.value === d.name,
              "col-dragging": de.value === d.id,
              "col-hover-target": he.value === d.id
            }]),
            "data-gh-list-drop": d.name,
            onDragover: (v) => z.value ? me(v, d.name) : Re(v, d.id),
            onDragleave: (v) => z.value ? ve(v, d.name) : Te(v, d.id),
            onDrop: (v) => z.value ? pe(v, d.name) : B(v, d.id)
          }, [
            e("header", {
              class: "column-header",
              title: H(d.name) ? `📁 ${d.name}（包含 ${E(d.name).length} 个子分组，点击下钻进入）` : "拖动此列可调换位置；右侧更多可重命名、置顶或删除"
            }, [
              e("div", {
                class: Z(["column-title-group", { "is-parent-folder": H(d.name) && !k.value }]),
                onClick: (v) => H(d.name) && !k.value && I(d.name)
              }, [
                r[35] || (r[35] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: Z(["column-title", { "title-clickable": H(d.name) && !k.value }]),
                  title: d.description || "本地分组: " + d.name
                }, " 📁 " + a(d.name), 11, go),
                d.pinned ? (t(), s("span", fo, "📌")) : _("", !0),
                e("span", mo, a(o(oe).getReposForList(d.name).length), 1),
                H(d.name) && !k.value ? (t(), s("span", vo, a(E(d.name).length) + "个子分组 › ", 1)) : _("", !0)
              ], 10, ho),
              e("div", bo, [
                e("button", {
                  type: "button",
                  class: "col-more-btn col-drag-handle",
                  title: "按住拖动可调换分组位置；点击打开更多操作",
                  draggable: "true",
                  "aria-label": "分组操作与拖拽手柄",
                  onDragstart: (v) => xe(v, d),
                  onDragend: Ee,
                  onClick: ne((v) => $e(v, d), ["stop"])
                }, "⋮", 40, yo)
              ])
            ], 8, po),
            e("div", _o, [
              (t(!0), s(j, null, ee(o(oe).getReposForList(d.name), (v) => (t(), s("article", {
                key: v.full_name,
                class: Z(["repo gh-card", { "card-dragging": z.value?.full_name === v.full_name }]),
                draggable: "true",
                onClick: (V) => ge(v),
                onDragstart: (V) => c(V, v, d.name),
                onDragend: S,
                onContextmenu: (V) => X(V, v, d.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: ne((V) => X(V, v, d.name), ["stop"])
                }, "⋮", 8, ko),
                e("div", $o, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: v.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: r[10] || (r[10] = (V) => V.target.src = "assets/github-star.svg")
                  }, null, 40, Co),
                  e("a", {
                    href: v.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: v.full_name,
                    onClick: r[11] || (r[11] = ne(() => {
                    }, ["stop"]))
                  }, [
                    e("span", Ro, a(v.owner?.login || v.full_name.split("/")[0]) + "/", 1),
                    se(a(v.name), 1)
                  ], 8, So)
                ]),
                e("div", Go, [
                  e("div", Mo, [
                    e("span", {
                      class: "gh-badge-folder",
                      title: "属于列表: " + d.name
                    }, [
                      se(" 📁 " + a(d.name) + " ", 1),
                      e("span", {
                        class: "btn-inline-remove",
                        title: "从该列表中移出",
                        role: "button",
                        tabindex: "0",
                        onClick: ne((V) => o(oe).removeRepoFromList(v.full_name, d.name), ["stop"])
                      }, "×", 8, Ao)
                    ], 8, To),
                    v.topics && v.topics.length ? (t(), s(j, { key: 0 }, [
                      (t(!0), s(j, null, ee(v.topics.slice(0, 2), (V) => (t(), s("span", {
                        key: V,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + V
                      }, " #" + a(V), 9, Lo))), 128)),
                      v.topics.length > 2 ? (t(), s("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: v.topics.slice(2).map((V) => "#" + V).join(" ")
                      }, " +" + a(v.topics.length - 2), 9, Do)) : _("", !0)
                    ], 64)) : _("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: v.description || ""
                  }, a(v.description || "暂无描述"), 9, Ho)
                ]),
                e("div", xo, [
                  e("span", Eo, "★ " + a(v.stargazers_count), 1),
                  v.language ? (t(), s("span", Io, a(v.language), 1)) : _("", !0),
                  e("span", Uo, "更新 " + a(Ce(v.updated_at)), 1)
                ])
              ], 42, wo))), 128)),
              o(oe).getReposForList(d.name).length ? _("", !0) : (t(), s("div", No, [...r[36] || (r[36] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, co))), 128)),
          e("section", Po, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              title: k.value ? `在「${k.value}」下新建子分组` : "新建本地分组",
              onClick: x
            }, [
              r[37] || (r[37] = e("span", { class: "plus-icon" }, "＋", -1)),
              e("span", null, a(k.value ? `新建 ${k.value} 子分组` : "新建本地分组"), 1)
            ], 8, Oo)
          ])
        ]))
      ], 544),
      (t(), we($t, { to: "body" }, [
        F.visible && F.repo ? (t(), s("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: tt({ left: `${F.x}px`, top: `${F.y}px` }),
          onClick: r[21] || (r[21] = ne(() => {
          }, ["stop"])),
          onContextmenu: r[22] || (r[22] = ne(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: Z(["gh-menu-has-sub", { "is-active": ae.value === "folder" }]),
            onMouseenter: r[14] || (r[14] = (d) => ae.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: r[12] || (r[12] = ne((d) => ae.value = ae.value === "folder" ? null : "folder", ["stop"]))
            }, [...r[38] || (r[38] = [
              e("span", null, "移动/加入本地分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: Z(["gh-sub-flyout", { "flyout-left": ye.value }]),
              onClick: r[13] || (r[13] = ne(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: ze
              }, " 设为未分类 "),
              (t(!0), s(j, null, ee(o(oe).lists, (d) => (t(), s("button", {
                key: d.id,
                class: Z(["fo-cover-menu-item", { primary: o(ht)(F.repo.full_name).includes(d.name) }]),
                type: "button",
                onClick: (v) => Ie(d.name)
              }, a(o(ht)(F.repo.full_name).includes(d.name) ? "✓ " : "  ") + "📁 " + a(d.name), 11, Fo))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[15] || (r[15] = (d) => ae.value = null),
            onClick: r[16] || (r[16] = (d) => ge(F.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[17] || (r[17] = (d) => ae.value = null),
            onClick: We
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[18] || (r[18] = (d) => ae.value = null),
            onClick: Ve
          }, " 复制克隆命令 (git clone) ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[19] || (r[19] = (d) => ae.value = null),
            onClick: Ye
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[20] || (r[20] = (d) => ae.value = null),
            onClick: Ne
          }, " 在 GitHub 打开 ", 32)
        ], 36)) : _("", !0),
        Y.visible && Y.list ? (t(), s("div", {
          key: 1,
          class: "fo-cover-context-menu gh-list-col-menu",
          style: tt({ left: `${Y.x}px`, top: `${Y.y}px` }),
          onClick: r[23] || (r[23] = ne(() => {
          }, ["stop"])),
          onContextmenu: r[24] || (r[24] = ne(() => {
          }, ["prevent"]))
        }, [
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: Se
          }, " ✏️ 重命名分组 "),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: He
          }, [
            e("span", null, a(Y.list?.pinned ? "📍 取消置顶" : "📌 置顶此分组"), 1)
          ]),
          e("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onClick: Me
          }, " 🗑️ 删除分组 ")
        ], 36)) : _("", !0)
      ]))
    ]));
  }
}), jo = /* @__PURE__ */ De(Bo, [["__scopeId", "data-v-20d9a09f"]]), qo = { class: "star-wrap" }, zo = ["disabled", "title", "aria-label"], Wo = {
  key: 0,
  class: "star-error",
  role: "status"
}, Vo = /* @__PURE__ */ Le({
  __name: "GitHubStarButton",
  props: {
    repo: {},
    alreadyStarred: { type: Boolean }
  },
  setup(w) {
    const i = w, l = G(!1), u = G(""), p = G(""), f = ie(() => !!(i.alreadyStarred || le.ownerKey && u.value === le.ownerKey || J.token && le.repos.some(($) => $.full_name.toLowerCase() === i.repo.full_name.toLowerCase())));
    be(() => [le.ownerKey, i.repo.full_name], () => {
      u.value = "", p.value = "";
    });
    async function M() {
      if (l.value || f.value) return;
      if (!J.token) {
        p.value = "请先在 GitHub 账号设置中配置 Token。";
        return;
      }
      const $ = le.ownerKey;
      if (!$) {
        p.value = "GitHub 账号正在加载，请稍后再试。";
        return;
      }
      l.value = !0, p.value = "";
      try {
        const R = await J.starRepository(i.repo, !0);
        if ($ !== le.ownerKey) return;
        R ? u.value = $ : p.value = gt.actionText || "Star 未完成，请稍后重试。";
      } catch {
        $ === le.ownerKey && (p.value = "Star 结果未确认，请先刷新核对，勿重复提交。");
      } finally {
        l.value = !1;
      }
    }
    return ($, R) => (t(), s("span", qo, [
      e("button", {
        type: "button",
        class: Z(["star-action", { starred: f.value }]),
        disabled: l.value || f.value,
        title: f.value ? "已 Star" : "点击 Star，未点击时状态可能尚未核对",
        "aria-label": f.value ? "已 Star" : `Star ${w.repo.full_name}`,
        onClick: ne(M, ["stop"])
      }, a(l.value ? "…" : f.value ? "★" : "☆"), 11, zo),
      p.value ? (t(), s("span", Wo, a(p.value), 1)) : _("", !0)
    ]));
  }
}), It = /* @__PURE__ */ De(Vo, [["__scopeId", "data-v-e3dd27c5"]]), Yo = { class: "gh-global-header" }, Ko = {
  key: 1,
  class: "gh-global-message",
  role: "status"
}, Zo = {
  key: 2,
  class: "gh-global-message",
  role: "alert"
}, Xo = { class: "gh-global-summary" }, Qo = { key: 0 }, Jo = {
  key: 0,
  class: "gh-global-message"
}, en = {
  key: 1,
  class: "gh-global-grid"
}, tn = { class: "gh-global-card-head" }, sn = ["onClick"], an = { class: "gh-global-meta" }, on = { key: 0 }, nn = {
  key: 2,
  class: "gh-global-pager"
}, ln = ["disabled"], rn = ["disabled"], yt = 20, un = /* @__PURE__ */ Le({
  __name: "GitHubGlobalSearch",
  props: {
    query: {},
    requestId: {},
    rule: {},
    embedded: { type: Boolean }
  },
  emits: ["back"],
  setup(w, { emit: i }) {
    const l = w, u = i, p = G(l.query), f = G(""), M = G(1), $ = G(0), R = G(!1), k = G([]), P = G(!1), C = G("");
    let E;
    function H(Q) {
      if (l.rule === "exact") return `"${Q.replace(/"/g, "")}" in:name,description`;
      if (l.rule === "topic") return `topic:${Q.replace(/\s+/g, "-")}`;
      if (l.rule === "smart") {
        const x = Bt[Q.toLowerCase()] || [];
        if (x.length) return `${Q} ${x.slice(0, 3).join(" OR ")}`;
      }
      return Q;
    }
    async function A(Q, x = 1) {
      const L = Q.trim();
      if (!L) return;
      E?.abort();
      const z = new AbortController();
      E = z, p.value = L, f.value = L, M.value = x, k.value = [], $.value = 0, R.value = !1, C.value = "", P.value = !0;
      try {
        const te = await Ot(z.signal), ce = new URLSearchParams({ q: H(L), sort: "stars", order: "desc", per_page: String(yt), page: String(x) }), { data: re } = await pt(`/search/repositories?${ce}`, { headers: te, signal: z.signal, maxBytes: 2 * 1024 * 1024 });
        if (E !== z || z.signal.aborted) return;
        if (!Array.isArray(re?.items)) throw new Error("GitHub 搜索响应格式异常");
        k.value = re.items.filter((N) => typeof N?.full_name == "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(N.full_name)), $.value = typeof re.total_count == "number" ? Math.max(0, re.total_count) : 0, R.value = re.incomplete_results === !0;
      } catch (te) {
        if (E !== z || z.signal.aborted) return;
        C.value = te instanceof Ft || te instanceof Error ? te.message : "请稍后重试";
      } finally {
        E === z && (P.value = !1);
      }
    }
    function I(Q) {
      mt.open(Q.full_name, void 0, Q);
    }
    return be(() => l.requestId, () => {
      A(l.query);
    }, { immediate: !0 }), Ct(() => {
      E?.abort();
    }), (Q, x) => (t(), s("div", {
      class: Z(["gh-global-search", { "is-embedded": w.embedded }])
    }, [
      e("header", Yo, [
        x[6] || (x[6] = e("div", null, [
          e("h3", null, "GitHub 仓库搜索"),
          e("p", null, "在插件内查看公开仓库和 README")
        ], -1)),
        e("button", {
          type: "button",
          class: "gh-global-back",
          onClick: x[0] || (x[0] = (L) => u("back"))
        }, a(w.embedded ? "返回首页" : "返回收藏"), 1)
      ]),
      w.embedded ? _("", !0) : (t(), s("form", {
        key: 0,
        class: "gh-global-form",
        role: "search",
        onSubmit: x[2] || (x[2] = ne((L) => A(p.value), ["prevent"]))
      }, [
        ke(e("input", {
          "onUpdate:modelValue": x[1] || (x[1] = (L) => p.value = L),
          type: "search",
          placeholder: "搜索 GitHub 仓库…",
          "aria-label": "搜索 GitHub 仓库"
        }, null, 512), [
          [qe, p.value]
        ]),
        x[7] || (x[7] = e("button", { type: "submit" }, "搜索", -1))
      ], 32)),
      P.value ? (t(), s("p", Ko, "正在搜索 GitHub 仓库…")) : C.value ? (t(), s("div", Zo, [
        e("p", null, "搜索失败：" + a(C.value), 1),
        e("button", {
          type: "button",
          class: "gh-global-back",
          onClick: x[3] || (x[3] = (L) => A(f.value, M.value))
        }, "重试")
      ])) : (t(), s(j, { key: 3 }, [
        e("p", Xo, [
          se("“" + a(f.value) + "” · " + a($.value.toLocaleString()) + " 个结果", 1),
          R.value ? (t(), s("span", Qo, " · GitHub 标记为不完整结果")) : _("", !0)
        ]),
        k.value.length ? (t(), s("div", en, [
          (t(!0), s(j, null, ee(k.value, (L) => (t(), s("article", {
            key: L.full_name,
            class: "gh-global-card"
          }, [
            e("div", tn, [
              e("button", {
                type: "button",
                class: "gh-global-repo",
                onClick: (z) => I(L)
              }, a(L.full_name), 9, sn),
              Ue(It, { repo: L }, null, 8, ["repo"])
            ]),
            e("p", null, a(L.description || "暂无描述"), 1),
            e("div", an, [
              L.language ? (t(), s("span", on, a(L.language), 1)) : _("", !0),
              e("span", null, "★ " + a((L.stargazers_count || 0).toLocaleString()), 1),
              e("span", null, "⑂ " + a((L.forks_count || 0).toLocaleString()), 1)
            ])
          ]))), 128))
        ])) : (t(), s("p", Jo, "没有找到仓库，换个关键词试试。")),
        M.value > 1 || M.value * yt < Math.min($.value, 1e3) ? (t(), s("div", nn, [
          e("button", {
            type: "button",
            disabled: M.value <= 1,
            onClick: x[4] || (x[4] = (L) => A(f.value, M.value - 1))
          }, "‹ 上一页", 8, ln),
          e("span", null, "第 " + a(M.value) + " 页", 1),
          e("button", {
            type: "button",
            disabled: M.value * yt >= Math.min($.value, 1e3),
            onClick: x[5] || (x[5] = (L) => A(f.value, M.value + 1))
          }, "下一页 ›", 8, rn)
        ])) : _("", !0)
      ], 64))
    ], 2));
  }
}), Lt = /* @__PURE__ */ De(un, [["__scopeId", "data-v-26667dd5"]]), cn = { class: "local-search" }, dn = {
  key: 0,
  class: "notice"
}, pn = {
  key: 1,
  class: "summary"
}, hn = {
  key: 2,
  class: "notice"
}, gn = {
  key: 3,
  class: "grid"
}, fn = { class: "repo-head" }, mn = ["onClick"], vn = { class: "meta" }, bn = { key: 0 }, yn = {
  key: 4,
  class: "pager"
}, _n = ["disabled"], wn = ["disabled"], kn = /* @__PURE__ */ Le({
  __name: "GitHubLocalSearch",
  emits: ["back"],
  setup(w, { emit: i }) {
    const l = i, u = G(1), p = ie(() => (le.repos, le.repoListNames, le.searchQuery, le.activeSection, le.loading, J.getDashboardSearchResults())), f = ie(() => p.value.slice((u.value - 1) * 20, u.value * 20)), M = ie(() => Math.max(1, Math.ceil(p.value.length / 20)));
    return be(() => le.searchQuery, () => {
      u.value = 1;
    }), be(M, ($) => {
      u.value > $ && (u.value = $);
    }), ($, R) => (t(), s("div", cn, [
      e("header", null, [
        e("div", null, [
          R[3] || (R[3] = e("h3", null, "当前分类搜索", -1)),
          e("p", null, a(o(J).active) + " · “" + a(o(le).searchQuery) + "”", 1)
        ]),
        e("button", {
          type: "button",
          onClick: R[0] || (R[0] = (k) => l("back"))
        }, "返回首页")
      ]),
      o(gt).accountConfigured === !1 ? (t(), s("p", dn, "请先在账号设置中配置 GitHub 用户名，然后搜索已加载的 Star 仓库。")) : (t(), s("p", pn, a(o(le).loading ? "正在读取 Star 仓库，结果可能尚未完整 · " : "") + a(p.value.length) + " 个结果", 1)),
      !p.value.length && o(gt).accountConfigured !== !1 ? (t(), s("p", hn, a(o(le).loading ? "正在读取仓库…" : "当前分类没有匹配的仓库。"), 1)) : _("", !0),
      f.value.length ? (t(), s("div", gn, [
        (t(!0), s(j, null, ee(f.value, (k) => (t(), s("article", {
          key: k.full_name,
          class: "repo-card"
        }, [
          e("div", fn, [
            e("button", {
              type: "button",
              class: "repo-name",
              onClick: (P) => o(mt).open(k.full_name, void 0, k)
            }, a(k.full_name), 9, mn),
            Ue(It, {
              repo: k,
              "already-starred": ""
            }, null, 8, ["repo"])
          ]),
          e("p", null, a(k.description || "暂无描述"), 1),
          e("div", vn, [
            k.language ? (t(), s("span", bn, a(k.language), 1)) : _("", !0),
            e("span", null, "★ " + a((k.stargazers_count || 0).toLocaleString()), 1),
            e("span", null, "⑂ " + a((k.forks_count || 0).toLocaleString()), 1)
          ])
        ]))), 128))
      ])) : _("", !0),
      M.value > 1 ? (t(), s("div", yn, [
        e("button", {
          type: "button",
          disabled: u.value <= 1,
          onClick: R[1] || (R[1] = (k) => u.value--)
        }, "‹ 上一页", 8, _n),
        e("span", null, a(u.value) + " / " + a(M.value), 1),
        e("button", {
          type: "button",
          disabled: u.value >= M.value,
          onClick: R[2] || (R[2] = (k) => u.value++)
        }, "下一页 ›", 8, wn)
      ])) : _("", !0)
    ]));
  }
}), $n = /* @__PURE__ */ De(kn, [["__scopeId", "data-v-26ec6440"]]), Cn = { class: "gh-dashboard" }, Sn = { class: "dashboard-layout" }, Rn = { class: "dashboard-main" }, Gn = { class: "dashboard-search" }, Mn = { key: 0 }, Tn = { class: "dashboard-home-content" }, An = { class: "dashboard-heading" }, Ln = { class: "heading-copy" }, Dn = { class: "eyebrow-row" }, Hn = {
  key: 0,
  class: "user-pill"
}, xn = ["disabled"], En = { class: "dashboard-composer" }, In = {
  class: "composer-prompts",
  "aria-label": "快捷提问"
}, Un = ["onClick"], Nn = { class: "composer-bottom" }, Pn = { class: "composer-left" }, On = { class: "repo-picker-anchor" }, Fn = ["aria-expanded"], Bn = {
  key: 0,
  class: "repo-picker"
}, jn = { class: "repo-picker-head" }, qn = ["disabled"], zn = {
  key: 0,
  class: "repo-picker-hint"
}, Wn = {
  key: 1,
  class: "repo-picker-hint",
  role: "alert"
}, Vn = {
  key: 2,
  class: "repo-picker-hint"
}, Yn = { class: "repo-picker-list" }, Kn = ["onClick"], Zn = {
  key: 0,
  class: "repo-picker-hint"
}, Xn = { class: "model-picker-anchor" }, Qn = ["aria-expanded"], Jn = {
  key: 0,
  class: "repo-picker model-picker"
}, el = { class: "repo-picker-list" }, tl = ["onClick"], sl = ["disabled"], al = { class: "dashboard-section" }, ol = { class: "dashboard-list" }, nl = {
  key: 0,
  class: "skeleton-list",
  "aria-hidden": "true"
}, ll = {
  key: 1,
  class: "empty"
}, il = ["onClick"], rl = { class: "row-copy" }, ul = {
  key: 2,
  class: "inline-error"
}, cl = { class: "dashboard-section" }, dl = { class: "section-heading" }, pl = ["href"], hl = { class: "dashboard-list" }, gl = {
  key: 0,
  class: "skeleton-list",
  "aria-hidden": "true"
}, fl = {
  key: 1,
  class: "empty"
}, ml = {
  key: 2,
  class: "inline-error"
}, vl = {
  key: 3,
  class: "empty"
}, bl = ["href"], yl = { class: "row-copy" }, _l = { class: "meta-pill" }, wl = { class: "row-meta" }, kl = { class: "dashboard-side" }, $l = { class: "side-card" }, Cl = { class: "side-heading" }, Sl = {
  key: 0,
  class: "skeleton-list compact",
  "aria-hidden": "true"
}, Rl = {
  key: 1,
  class: "side-empty"
}, Gl = {
  key: 2,
  class: "inline-error"
}, Ml = {
  key: 3,
  class: "side-empty"
}, Tl = {
  key: 4,
  class: "repo-rows"
}, Al = ["onClick"], Ll = ["title"], Dl = { class: "repo-info" }, Hl = {
  key: 0,
  class: "repo-owner"
}, xl = { class: "side-card quick-card" }, El = { class: "quick-links" }, Dt = "lw-gh-dashboard-cache-v1", Il = 300 * 1e3, Ul = /* @__PURE__ */ Le({
  __name: "GitHubDashboard",
  props: {
    active: { type: Boolean },
    accountRevision: {},
    showResults: { type: Boolean }
  },
  emits: ["channel", "settings", "notifications"],
  setup(w, { emit: i }) {
    const l = w, u = i, p = G(""), f = G(""), M = G(!1), $ = G(!1), R = G(""), k = G(""), P = G([]), C = G(null), E = G(""), H = ie(() => {
      const y = E.value.trim().toLowerCase();
      return y ? P.value.filter((c) => c.fullName.toLowerCase().includes(y)) : P.value;
    });
    let A;
    async function I() {
      A?.abort();
      const y = new AbortController();
      A = y, $.value = !0, R.value = "", k.value = "";
      try {
        const c = await Kt(y.signal);
        if (A !== y || y.signal.aborted) return;
        P.value = c.repos, k.value = c.warning;
      } catch (c) {
        A === y && !y.signal.aborted && (R.value = c instanceof Error ? c.message : "仓库读取失败。");
      } finally {
        A === y && ($.value = !1);
      }
    }
    function Q() {
      M.value = !M.value, M.value && !P.value.length && !$.value && I();
    }
    function x(y) {
      C.value = y, M.value = !1, E.value = "";
    }
    be(() => l.accountRevision, () => {
      A?.abort(), A = void 0, P.value = [], C.value = null, $.value = !1, M.value = !1;
    });
    const L = G([]), z = G([]), te = G([]), ce = G(!1), re = G(!1), N = G(""), W = G(""), K = G(""), Y = G(""), F = G(null), ae = G(!1);
    let ye, de = 0;
    const he = G(!1), ue = G([]), fe = G(""), $e = ie(
      () => ue.value.find((y) => y.key === fe.value) || ue.value[0] || null
    );
    async function Se() {
      const [y, c] = await Promise.allSettled([Zt(), Xt()]), S = [];
      if (y.status === "fulfilled" && y.value.configured) {
        const ge = y.value, Ge = ge.models.length ? ge.models : ge.model ? [ge.model] : [];
        for (const Ce of Ge)
          S.push({
            key: `deepseek:${Ce}`,
            label: Ce,
            provider: ge.label || "AI 模型",
            target: { service: "deepseek", model: Ce }
          });
      }
      const me = c.status === "fulfilled" ? c.value : null, ve = me?.selectedAgentId || "pi", pe = me?.piModel || "";
      S.push({
        key: `native:${ve}:${pe}`,
        label: pe ? pe.includes("/") ? pe.split("/").slice(1).join("/") : pe : "本地 Agent",
        provider: ve === "pi" ? "Pi 本地" : ve,
        target: { service: "native", nativeAgentId: ve, model: pe }
      }), ue.value = S, S.some((ge) => ge.key === fe.value) || (fe.value = S[0]?.key || "");
    }
    function He() {
      M.value = !1, he.value = !he.value, he.value && Se();
    }
    function Me(y) {
      fe.value = y.key, he.value = !1;
    }
    function xe(y) {
      const c = y.target;
      c?.closest(".repo-picker-anchor") || (M.value = !1), c?.closest(".model-picker-anchor") || (he.value = !1);
    }
    ut(() => {
      document.addEventListener("pointerdown", xe), Se();
    });
    const Ee = ie(() => {
      const y = (/* @__PURE__ */ new Date()).getHours();
      return y < 6 ? "夜深了" : y < 11 ? "早上好" : y < 14 ? "中午好" : y < 18 ? "下午好" : "晚上好";
    });
    function Re(y) {
      if (!y) return "";
      const c = new Date(y).getTime();
      if (!Number.isFinite(c)) return "";
      const S = Math.max(0, Math.floor((Date.now() - c) / 6e4));
      return S < 60 ? S < 1 ? "刚刚" : `${S} 分钟前` : S < 1440 ? `${Math.floor(S / 60)} 小时前` : S < 43200 ? `${Math.floor(S / 1440)} 天前` : new Date(c).toLocaleDateString();
    }
    const Te = (y) => y instanceof Error ? y.message : "读取失败，请稍后重试。";
    function B(y) {
      return typeof y?.full_name == "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(y.full_name);
    }
    function b(y) {
      try {
        const c = new URL(String(y));
        return c.protocol === "https:" && c.hostname === "github.com" && /^\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/pull\/\d+\/?$/.test(c.pathname) ? c.href : "";
      } catch {
        return "";
      }
    }
    function X() {
      try {
        const y = localStorage.getItem(Dt);
        if (!y) return null;
        const c = JSON.parse(y);
        return !c || typeof c.username != "string" || !Array.isArray(c.repos) || !Array.isArray(c.pulls) ? null : {
          username: c.username,
          repos: c.repos.filter(B).slice(0, 6),
          pulls: c.pulls.filter((S) => S && typeof S.title == "string" && b(S.html_url)).slice(0, 5),
          cachedAt: Number(c.cachedAt) || 0
        };
      } catch {
        return null;
      }
    }
    function ze(y) {
      try {
        localStorage.setItem(Dt, JSON.stringify(y));
      } catch {
      }
    }
    async function Ie(y = !1) {
      if (!y && F.value === l.accountRevision) return;
      ye?.abort();
      const c = new AbortController();
      ye = c;
      const S = ++de, me = l.accountRevision, ve = () => l.active && S === de && !c.signal.aborted;
      ae.value = !0;
      const pe = X(), ge = !!(pe && pe.username);
      if (ge && pe && !y ? (p.value = pe.username, L.value = pe.repos, z.value = pe.pulls, N.value = "", W.value = "", K.value = "") : (y || F.value === null || F.value !== me) && (p.value = "", L.value = [], z.value = [], te.value = [], N.value = "", W.value = "", K.value = "", Y.value = ""), ce.value = !ge || y, re.value = !te.value.length, Se(), (async () => {
        try {
          const Ge = await Qt();
          if (!ve()) return;
          const Ce = Ge.map((n) => ({
            kind: "deepseek",
            id: n.id,
            title: n.title || "未命名对话",
            updated: Number(n.updatedAt) || 0,
            model: n.model
          }));
          te.value = Ce.sort((n, r) => r.updated - n.updated).slice(0, 4);
        } catch {
          ve() && (Y.value = "DeepSeek 本机会话读取失败");
        } finally {
          ve() && (re.value = !1);
        }
      })(), !y && ge && pe && Date.now() - pe.cachedAt < Il) {
        F.value = me, ae.value = !1, ce.value = !1;
        return;
      }
      try {
        const Ge = await St();
        if (!ve()) return;
        const Ce = st(Ge.ghToken);
        let n = Ge.ghUser.trim();
        if (!n && Ge.ghToken) {
          const V = await pt("/user", { headers: Ce, signal: c.signal, maxBytes: 131072 });
          n = typeof V.data?.login == "string" ? V.data.login : "";
        }
        if (!ve()) return;
        if (!n) {
          N.value = "配置 GitHub 用户名后即可查看仓库和 Pull Request。", F.value = me;
          return;
        }
        if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(n)) throw new Error("GitHub 用户名格式无效，请检查设置。");
        p.value = n;
        const r = new URLSearchParams({ q: `is:pr is:open author:${n}`, sort: "updated", order: "desc", per_page: "5" }), [d, v] = await Promise.allSettled([
          pt(`/users/${encodeURIComponent(n)}/repos?type=owner&sort=updated&per_page=6`, { headers: Ce, signal: c.signal, maxBytes: 1024 * 1024 }),
          pt(`/search/issues?${r}`, { headers: Ce, signal: c.signal, maxBytes: 1024 * 1024 })
        ]);
        if (!ve()) return;
        d.status === "fulfilled" && Array.isArray(d.value.data) ? L.value = d.value.data.filter(B).slice(0, 6) : ge || (W.value = d.status === "rejected" ? Te(d.reason) : "仓库响应格式异常。"), v.status === "fulfilled" && Array.isArray(v.value.data?.items) ? z.value = v.value.data.items.filter((V) => V && typeof V.title == "string" && b(V.html_url)).slice(0, 5) : ge || (K.value = v.status === "rejected" ? Te(v.reason) : "Pull Request 响应格式异常。"), (d.status === "fulfilled" || v.status === "fulfilled") && ze({
          username: n,
          repos: L.value,
          pulls: z.value,
          cachedAt: Date.now()
        }), F.value = me;
      } catch (Ge) {
        ve() && (N.value = Te(Ge));
      } finally {
        S === de && (ae.value = !1, ce.value = !1, re.value = !1);
      }
    }
    be(() => [l.active, l.accountRevision], ([y, c]) => {
      y ? F.value !== c && Ie() : ae.value && (++de, ye?.abort(), ae.value = !1);
    }, { immediate: !0 }), Ct(() => {
      document.removeEventListener("pointerdown", xe), ++de, ye?.abort(), A?.abort();
    });
    function We() {
      if (!f.value.trim()) return;
      const y = C.value, c = y ? { kind: "github", id: y.fullName, title: y.fullName, url: `https://github.com/${y.fullName}`, description: y.description, language: y.language, visibility: y.isPrivate ? "private" : "public" } : void 0;
      Jt(f.value.trim(), c, $e.value?.target), bt("multica");
    }
    function Ve(y) {
      es("deepseek", y.id), bt("multica");
    }
    function Ye() {
      bt("multica");
    }
    function Ne(y) {
      const c = b(y.html_url);
      return c ? new URL(c).pathname.split("/").slice(1, 3).join("/") : "";
    }
    const Pe = [
      "总结这个仓库的核心架构",
      "帮我起草一个 PR 描述",
      "排查最近的构建或类型报错",
      "梳理下一步优化清单"
    ];
    function g(y) {
      const c = f.value.trim();
      f.value = c ? `${c}
${y}` : y;
    }
    function h(y) {
      const c = y.indexOf("/");
      return c === -1 ? { owner: "", name: y } : { owner: y.slice(0, c), name: y.slice(c + 1) };
    }
    const m = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Vue: "#41b883",
      Python: "#3572a5",
      Go: "#00add8",
      Rust: "#dea584",
      Java: "#b07219",
      "C++": "#f34b7d",
      C: "#555555",
      "C#": "#178600",
      HTML: "#e34c26",
      CSS: "#563d7c",
      SCSS: "#c6538c",
      Shell: "#89e051",
      Swift: "#f05138",
      Kotlin: "#a97bff",
      Dart: "#00b4ab"
    };
    function T(y) {
      return y && m[y] || "#94a3b8";
    }
    return (y, c) => (t(), s("div", Cn, [
      e("div", Sn, [
        e("main", Rn, [
          e("div", Gn, [
            Rt(y.$slots, "search", {}, void 0, !0)
          ]),
          w.showResults ? (t(), s("div", Mn, [
            Rt(y.$slots, "results", {}, void 0, !0)
          ])) : _("", !0),
          ke(e("div", Tn, [
            e("div", An, [
              e("div", Ln, [
                e("div", Dn, [
                  c[10] || (c[10] = e("span", { class: "eyebrow" }, "GITHUB WORKSPACE", -1)),
                  p.value ? (t(), s("span", Hn, [
                    c[9] || (c[9] = e("i", {
                      class: "user-pill-dot",
                      "aria-hidden": "true"
                    }, null, -1)),
                    se(" @" + a(p.value), 1)
                  ])) : _("", !0)
                ]),
                e("h2", null, [
                  se(a(Ee.value), 1),
                  p.value ? (t(), s(j, { key: 0 }, [
                    se("，" + a(p.value), 1)
                  ], 64)) : _("", !0),
                  c[11] || (c[11] = se("。", -1))
                ])
              ]),
              e("button", {
                type: "button",
                class: "refresh-btn",
                disabled: ce.value,
                title: "刷新 GitHub 数据",
                onClick: c[0] || (c[0] = (S) => Ie(!0))
              }, " ↻ " + a(ce.value ? "刷新中" : "刷新"), 9, xn)
            ]),
            e("div", En, [
              ke(e("textarea", {
                "onUpdate:modelValue": c[1] || (c[1] = (S) => f.value = S),
                placeholder: "有什么想法？输入问题或选择仓库，在 AI 工作区继续探索…",
                "aria-label": "发送到 AI 工作区的草稿",
                maxlength: "100000"
              }, null, 512), [
                [qe, f.value]
              ]),
              e("div", In, [
                (t(), s(j, null, ee(Pe, (S) => e("button", {
                  key: S,
                  type: "button",
                  class: "prompt-chip",
                  onClick: (me) => g(S)
                }, " + " + a(S), 9, Un)), 64))
              ]),
              e("div", Nn, [
                e("div", Pn, [
                  e("div", On, [
                    e("button", {
                      type: "button",
                      class: Z(["repo-picker-toggle", { selected: !!C.value }]),
                      "aria-expanded": M.value,
                      onClick: Q
                    }, [
                      c[12] || (c[12] = e("svg", {
                        viewBox: "0 0 16 16",
                        "aria-hidden": "true"
                      }, [
                        e("path", {
                          fill: "currentColor",
                          d: "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"
                        })
                      ], -1)),
                      e("span", null, a(C.value ? C.value.fullName : "选择仓库"), 1),
                      c[13] || (c[13] = e("span", { class: "caret" }, "▾", -1))
                    ], 10, Fn),
                    M.value ? (t(), s("div", Bn, [
                      e("div", jn, [
                        c[14] || (c[14] = e("strong", null, "选择我的仓库", -1)),
                        e("button", {
                          type: "button",
                          title: "刷新仓库",
                          disabled: $.value,
                          onClick: I
                        }, "↻", 8, qn)
                      ]),
                      ke(e("input", {
                        "onUpdate:modelValue": c[2] || (c[2] = (S) => E.value = S),
                        placeholder: "搜索仓库名称…",
                        "aria-label": "搜索我的仓库"
                      }, null, 512), [
                        [qe, E.value]
                      ]),
                      $.value ? (t(), s("p", zn, "正在读取仓库…")) : R.value ? (t(), s("p", Wn, [
                        se(a(R.value) + " ", 1),
                        e("button", {
                          type: "button",
                          onClick: I
                        }, "重试")
                      ])) : _("", !0),
                      k.value ? (t(), s("p", Vn, a(k.value), 1)) : _("", !0),
                      e("div", Yn, [
                        (t(!0), s(j, null, ee(H.value, (S) => (t(), s("button", {
                          key: S.fullName,
                          type: "button",
                          onClick: (me) => x(S)
                        }, [
                          e("span", null, a(S.fullName), 1),
                          e("small", null, a(S.isPrivate ? "私有" : "公开"), 1)
                        ], 8, Kn))), 128)),
                        !$.value && !R.value && !H.value.length ? (t(), s("p", Zn, "没有找到仓库。")) : _("", !0)
                      ]),
                      C.value ? (t(), s("button", {
                        key: 3,
                        type: "button",
                        class: "repo-picker-clear",
                        onClick: c[3] || (c[3] = (S) => {
                          C.value = null, M.value = !1;
                        })
                      }, "不选择仓库")) : _("", !0),
                      c[15] || (c[15] = e("p", { class: "repo-picker-hint" }, "仅附带仓库链接与简介；发送时会共享所选信息，README 需手动读取。", -1))
                    ])) : _("", !0)
                  ]),
                  e("div", Xn, [
                    e("button", {
                      type: "button",
                      class: "repo-picker-toggle model-toggle",
                      "aria-expanded": he.value,
                      onClick: He
                    }, [
                      c[16] || (c[16] = e("svg", {
                        viewBox: "0 0 16 16",
                        "aria-hidden": "true"
                      }, [
                        e("path", {
                          fill: "currentColor",
                          d: "M8 1.2l1.65 4.15L13.8 7l-4.15 1.65L8 12.8 6.35 8.65 2.2 7l4.15-1.65L8 1.2Z"
                        })
                      ], -1)),
                      e("span", null, a($e.value ? $e.value.label : "选择模型"), 1),
                      c[17] || (c[17] = e("span", { class: "caret" }, "▾", -1))
                    ], 8, Qn),
                    he.value ? (t(), s("div", Jn, [
                      e("div", { class: "repo-picker-head" }, [
                        c[18] || (c[18] = e("strong", null, "选择 AI 模型（同步 Agent / AI 设置）", -1)),
                        e("button", {
                          type: "button",
                          title: "刷新模型列表",
                          onClick: Se
                        }, "↻")
                      ]),
                      e("div", el, [
                        (t(!0), s(j, null, ee(ue.value, (S) => (t(), s("button", {
                          key: S.key,
                          type: "button",
                          class: Z({ chosen: $e.value?.key === S.key }),
                          onClick: (me) => Me(S)
                        }, [
                          e("span", null, a(S.label), 1),
                          e("small", null, a(S.provider), 1)
                        ], 10, tl))), 128))
                      ]),
                      c[19] || (c[19] = e("p", { class: "repo-picker-hint" }, "模型列表读取自 AI 工作区 / 数字员工同一套配置，跳转后不会自动发送。", -1))
                    ])) : _("", !0)
                  ]),
                  c[20] || (c[20] = e("span", { class: "ai-safe-tag" }, [
                    e("small", null, "· 不会自动发送")
                  ], -1))
                ]),
                e("button", {
                  type: "button",
                  class: "composer-submit",
                  disabled: !f.value.trim(),
                  onClick: We
                }, [...c[21] || (c[21] = [
                  se(" 继续到 AI 工作区 ", -1),
                  e("span", null, "↗", -1)
                ])], 8, sl)
              ])
            ]),
            e("section", al, [
              e("div", { class: "section-heading" }, [
                c[23] || (c[23] = e("div", null, [
                  e("h3", null, "最近会话"),
                  e("small", null, "DeepSeek 本机记录")
                ], -1)),
                e("button", {
                  type: "button",
                  onClick: Ye
                }, [...c[22] || (c[22] = [
                  se("查看全部 ", -1),
                  e("span", null, "→", -1)
                ])])
              ]),
              e("div", ol, [
                re.value ? (t(), s("div", nl, [...c[24] || (c[24] = [
                  Oe('<div class="skeleton-row" data-v-478fefc7><i class="sk-dot" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-60" data-v-478fefc7></span><span class="sk-line w-35" data-v-478fefc7></span></div></div><div class="skeleton-row" data-v-478fefc7><i class="sk-dot" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-48" data-v-478fefc7></span><span class="sk-line w-30" data-v-478fefc7></span></div></div>', 2)
                ])])) : te.value.length ? _("", !0) : (t(), s("p", ll, "暂无可显示的会话，打开 AI 工作区开始对话。")),
                (t(!0), s(j, null, ee(te.value, (S) => (t(), s("button", {
                  key: `${S.kind}:${S.id}`,
                  type: "button",
                  class: "list-row",
                  onClick: (me) => Ve(S)
                }, [
                  c[26] || (c[26] = e("span", { class: "row-badge session" }, [
                    e("svg", {
                      viewBox: "0 0 16 16",
                      "aria-hidden": "true"
                    }, [
                      e("path", {
                        fill: "currentColor",
                        d: "M2.75 2h10.5c.966 0 1.75.784 1.75 1.75v6.5A1.75 1.75 0 0 1 13.25 12H6.81l-2.93 2.56A.5.5 0 0 1 3 14.18V12h-.25A1.75 1.75 0 0 1 1 10.25v-6.5C1 2.784 1.784 2 2.75 2Z"
                      })
                    ])
                  ], -1)),
                  e("span", rl, [
                    e("strong", null, a(S.title), 1),
                    e("small", null, [
                      c[25] || (c[25] = e("span", { class: "meta-pill" }, "DeepSeek", -1)),
                      e("span", null, a(S.model), 1),
                      S.updated ? (t(), s(j, { key: 0 }, [
                        se(" · " + a(Re(S.updated)), 1)
                      ], 64)) : _("", !0)
                    ])
                  ]),
                  c[27] || (c[27] = e("span", { class: "row-arrow" }, "↗", -1))
                ], 8, il))), 128)),
                Y.value ? (t(), s("p", ul, a(Y.value), 1)) : _("", !0)
              ])
            ]),
            e("section", cl, [
              e("div", dl, [
                c[28] || (c[28] = e("div", null, [
                  e("h3", null, "Pull requests"),
                  e("small", null, "由你创建、尚未关闭")
                ], -1)),
                p.value ? (t(), s("a", {
                  key: 0,
                  href: `https://github.com/pulls?q=${encodeURIComponent(`is:pr is:open author:${p.value}`)}`,
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, "查看全部 ↗", 8, pl)) : _("", !0)
              ]),
              e("div", hl, [
                ce.value ? (t(), s("div", gl, [...c[29] || (c[29] = [
                  Oe('<div class="skeleton-row" data-v-478fefc7><i class="sk-dot" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-65" data-v-478fefc7></span><span class="sk-line w-40" data-v-478fefc7></span></div></div><div class="skeleton-row" data-v-478fefc7><i class="sk-dot" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-52" data-v-478fefc7></span><span class="sk-line w-32" data-v-478fefc7></span></div></div>', 2)
                ])])) : N.value ? (t(), s("p", fl, a(N.value), 1)) : K.value ? (t(), s("p", ml, a(K.value), 1)) : z.value.length ? _("", !0) : (t(), s("p", vl, "没有找到未关闭的 Pull Request。")),
                (t(!0), s(j, null, ee(z.value, (S) => (t(), s("a", {
                  key: S.html_url,
                  class: "list-row",
                  href: b(S.html_url),
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, [
                  c[30] || (c[30] = e("span", { class: "row-badge pull" }, [
                    e("svg", {
                      viewBox: "0 0 16 16",
                      "aria-hidden": "true"
                    }, [
                      e("path", {
                        fill: "currentColor",
                        d: "M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"
                      })
                    ])
                  ], -1)),
                  e("span", yl, [
                    e("strong", null, a(S.title), 1),
                    e("small", null, [
                      e("span", _l, a(Ne(S)), 1),
                      e("span", null, "#" + a(S.number), 1),
                      S.updated_at ? (t(), s(j, { key: 0 }, [
                        se(" · 更新于 " + a(Re(S.updated_at)), 1)
                      ], 64)) : _("", !0)
                    ])
                  ]),
                  e("span", wl, a(S.comments || 0) + " 条评论 ↗", 1)
                ], 8, bl))), 128))
              ])
            ])
          ], 512), [
            [et, !w.showResults]
          ])
        ]),
        e("aside", kl, [
          e("section", $l, [
            e("div", Cl, [
              c[31] || (c[31] = e("div", null, [
                e("h3", null, "最近更新的仓库"),
                e("small", null, "GitHub 公开仓库")
              ], -1)),
              e("button", {
                type: "button",
                onClick: c[4] || (c[4] = (S) => u("channel", "repos"))
              }, "全部 →")
            ]),
            ce.value ? (t(), s("div", Sl, [...c[32] || (c[32] = [
              Oe('<div class="skeleton-row" data-v-478fefc7><i class="sk-dot sm" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-70" data-v-478fefc7></span><span class="sk-line w-45" data-v-478fefc7></span></div></div><div class="skeleton-row" data-v-478fefc7><i class="sk-dot sm" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-60" data-v-478fefc7></span><span class="sk-line w-40" data-v-478fefc7></span></div></div><div class="skeleton-row" data-v-478fefc7><i class="sk-dot sm" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-65" data-v-478fefc7></span><span class="sk-line w-35" data-v-478fefc7></span></div></div>', 3)
            ])])) : N.value ? (t(), s("p", Rl, a(N.value), 1)) : W.value ? (t(), s("p", Gl, a(W.value), 1)) : L.value.length ? (t(), s("div", Tl, [
              (t(!0), s(j, null, ee(L.value, (S) => (t(), s("button", {
                key: S.full_name,
                type: "button",
                class: "repo-row",
                onClick: (me) => o(mt).open(S.full_name, void 0, S)
              }, [
                e("span", {
                  class: "repo-lang-dot",
                  style: tt({ background: T(S.language) }),
                  title: S.language || "仓库"
                }, null, 12, Ll),
                e("span", Dl, [
                  e("strong", null, [
                    h(S.full_name).owner ? (t(), s("span", Hl, a(h(S.full_name).owner) + "/", 1)) : _("", !0),
                    se(a(h(S.full_name).name), 1)
                  ]),
                  e("small", null, [
                    se(a(S.language || "仓库") + " ", 1),
                    S.stargazers_count ? (t(), s(j, { key: 0 }, [
                      se(" · ★ " + a(S.stargazers_count), 1)
                    ], 64)) : _("", !0),
                    S.updated_at ? (t(), s(j, { key: 1 }, [
                      se(" · " + a(Re(S.updated_at)), 1)
                    ], 64)) : _("", !0)
                  ])
                ])
              ], 8, Al))), 128))
            ])) : (t(), s("p", Ml, "暂无公开仓库。"))
          ]),
          e("section", xl, [
            c[37] || (c[37] = e("div", { class: "side-heading" }, [
              e("div", null, [
                e("h3", null, "快捷入口"),
                e("small", null, "你的 GitHub 工作台")
              ])
            ], -1)),
            e("div", El, [
              e("button", {
                type: "button",
                onClick: c[5] || (c[5] = (S) => u("channel", "stars"))
              }, [...c[33] || (c[33] = [
                Oe('<span class="quick-left" data-v-478fefc7><i class="quick-icon star" data-v-478fefc7><svg viewBox="0 0 16 16" aria-hidden="true" data-v-478fefc7><path fill="currentColor" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" data-v-478fefc7></path></svg></i> Star 收藏 </span><span class="quick-arrow" data-v-478fefc7>→</span>', 2)
              ])]),
              e("button", {
                type: "button",
                onClick: c[6] || (c[6] = (S) => u("channel", "trending"))
              }, [...c[34] || (c[34] = [
                Oe('<span class="quick-left" data-v-478fefc7><i class="quick-icon trending" data-v-478fefc7><svg viewBox="0 0 16 16" aria-hidden="true" data-v-478fefc7><path fill="currentColor" d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" data-v-478fefc7></path></svg></i> 开源发现 </span><span class="quick-arrow" data-v-478fefc7>→</span>', 2)
              ])]),
              e("button", {
                type: "button",
                onClick: c[7] || (c[7] = (S) => u("notifications"))
              }, [...c[35] || (c[35] = [
                Oe('<span class="quick-left" data-v-478fefc7><i class="quick-icon notify" data-v-478fefc7><svg viewBox="0 0 16 16" aria-hidden="true" data-v-478fefc7><path fill="currentColor" d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16ZM3 5a5 5 0 0 1 10 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.519 1.519 0 0 1 13.482 13H2.518a1.519 1.519 0 0 1-1.263-2.36l1.703-2.554A.255.255 0 0 0 3 7.947V5Z" data-v-478fefc7></path></svg></i> GitHub 通知 </span><span class="quick-arrow" data-v-478fefc7>→</span>', 2)
              ])]),
              e("button", {
                type: "button",
                onClick: c[8] || (c[8] = (S) => u("settings", S.currentTarget))
              }, [...c[36] || (c[36] = [
                Oe('<span class="quick-left" data-v-478fefc7><i class="quick-icon settings" data-v-478fefc7><svg viewBox="0 0 16 16" aria-hidden="true" data-v-478fefc7><path fill="currentColor" d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.162 1.4l.164.716a.25.25 0 0 0 .353.17l.657-.329c.688-.344 1.5-.195 2.02.371.482.523.597 1.31.287 1.948l-.33.658a.25.25 0 0 0 .171.353l.716.164c.755.172 1.305.718 1.369 1.461a8.2 8.2 0 0 1 0 1.402c-.064.743-.614 1.289-1.369 1.461l-.716.164a.25.25 0 0 0-.171.353l.33.658c.31.638.195 1.425-.287 1.948-.52.566-1.332.715-2.02.371l-.657-.329a.25.25 0 0 0-.353.17l-.164.716c-.172.755-.718 1.305-1.461 1.369a8.2 8.2 0 0 1-1.402 0c-.743-.064-1.289-.614-1.461-1.369l-.164-.716a.25.25 0 0 0-.353-.17l-.657.329c-.688.344-1.5.195-2.02-.371-.482-.523-.597-1.31-.287-1.948l.33-.658a.25.25 0 0 0-.171-.353l-.716-.164C.645 9.99.095 9.444.031 8.701a8.2 8.2 0 0 1 0-1.402C.095 6.556.645 6.01 1.4 5.838l.716-.164a.25.25 0 0 0 .17-.353l-.33-.658c-.31-.638-.195-1.425.287-1.948.52-.566 1.332-.715 2.02-.371l.657.329a.25.25 0 0 0 .353-.17l.164-.716C6.01.645 6.556.095 7.299.031A8.2 8.2 0 0 1 8 0ZM5.5 8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" data-v-478fefc7></path></svg></i> 账号设置 </span><span class="quick-arrow" data-v-478fefc7>→</span>', 2)
              ])])
            ])
          ])
        ])
      ])
    ]));
  }
}), Nl = /* @__PURE__ */ De(Ul, [["__scopeId", "data-v-478fefc7"]]);
function Pl(w) {
  const i = w.subject?.url, l = w.repository?.html_url || "https://github.com";
  if (!i) return l;
  const u = w.subject?.type;
  return u === "Issue" ? i.replace("https://api.github.com/repos/", "https://github.com/") : u === "PullRequest" ? i.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : u === "Release" ? i.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : i.replace("https://api.github.com/repos/", "https://github.com/");
}
function Ol(w) {
  try {
    const i = Date.now() - new Date(w).getTime();
    if (i < 6e4) return "刚刚";
    const l = Math.floor(i / 6e4);
    if (l < 60) return `${l} 分钟前`;
    const u = Math.floor(l / 60);
    if (u < 24) return `${u} 小时前`;
    const p = Math.floor(u / 24);
    return p < 30 ? `${p} 天前` : w.slice(5, 10);
  } catch {
    return "";
  }
}
const q = je({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), Fe = {
  open() {
    q.isOpen = !0, (!q.items.length || Date.now() - q.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    q.isOpen = !1;
  },
  toggle() {
    q.isOpen ? this.close() : this.open();
  },
  setTab(w) {
    q.activeKind = w;
  },
  async refresh() {
    const w = J.token?.trim();
    if (!w) {
      q.items = [], q.unreadCount = 0, q.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    q.loading = !0, q.error = "";
    try {
      const i = {
        ...st(w),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, l = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: i
      });
      if (!l.ok)
        throw l.status === 401 ? new Error("GitHub Token 无效或已过期") : l.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${l.status})`);
      const u = await l.json();
      if (!Array.isArray(u))
        throw new Error("GitHub 返回数据异常");
      const p = u.map((f) => ({
        id: String(f.id),
        unread: !!f.unread,
        reason: String(f.reason || ""),
        updatedAt: f.updated_at,
        formattedTime: Ol(f.updated_at),
        subject: {
          title: String(f.subject?.title || "未命名通知"),
          url: String(f.subject?.url || ""),
          type: String(f.subject?.type || "Issue"),
          latestCommentUrl: f.subject?.latest_comment_url
        },
        repository: {
          id: Number(f.repository?.id || 0),
          name: String(f.repository?.name || ""),
          fullName: String(f.repository?.full_name || ""),
          owner: {
            login: String(f.repository?.owner?.login || ""),
            avatarUrl: f.repository?.owner?.avatar_url
          },
          htmlUrl: String(f.repository?.html_url || "")
        },
        url: String(f.url || ""),
        htmlUrl: Pl(f)
      }));
      q.items = p, q.unreadCount = p.filter((f) => f.unread).length, q.lastFetchedAt = Date.now();
    } catch (i) {
      console.warn("[GitHubNotifications] 读取失败:", i), q.error = i?.message || "网络请求异常";
    } finally {
      q.loading = !1;
    }
  },
  openTarget(w) {
    typeof window < "u" && window.open(w.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, D = je({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function it(w) {
  try {
    const i = Date.now() - new Date(w).getTime(), l = Math.floor(i / 6e4);
    if (l < 1) return "刚刚";
    if (l < 60) return `${l}分钟前`;
    const u = Math.floor(l / 60);
    if (u < 24) return `${u}小时前`;
    const p = Math.floor(u / 24);
    if (p < 30) return `${p}天前`;
    const f = new Date(w);
    return `${f.getFullYear()}/${f.getMonth() + 1}/${f.getDate()}`;
  } catch {
    return "";
  }
}
function rt(w) {
  switch (w) {
    case "OWNER":
      return "所有者";
    case "MEMBER":
      return "成员";
    case "COLLABORATOR":
      return "维护者";
    case "CONTRIBUTOR":
      return "贡献者";
    case "FIRST_TIME_CONTRIBUTOR":
      return "初次贡献";
    case "FIRST_TIMER":
      return "新人";
    case "AUTHOR":
      return "作者";
    default:
      return "";
  }
}
function Fl(w) {
  return w ? {
    ":triangular_flag_on_post:": "🚩",
    ":speech_balloon:": "💬",
    ":bulb:": "💡",
    ":mega:": "📢",
    ":sparkles:": "✨",
    ":books:": "📚",
    ":tada:": "🎉",
    ":pray:": "🙏",
    ":question:": "❓",
    ":hammer:": "🔨",
    ":zap:": "⚡",
    ":fire:": "🔥",
    ":heart:": "❤️",
    ":rocket:": "🚀",
    ":eyes:": "👀"
  }[w] || (w.startsWith(":") && w.endsWith(":") ? w.slice(1, -1) : w) : "";
}
function _t(w) {
  if (!Array.isArray(w)) return [];
  const i = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return w.map((l) => ({
    emoji: i[l.content] || l.content,
    count: l.reactors?.totalCount || l.users?.totalCount || 0
  })).filter((l) => l.count > 0);
}
function Ht(w) {
  if (!w || typeof w != "object") return [];
  const i = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, l = [];
  for (const [u, p] of Object.entries(i)) {
    const f = Number(w[u] || 0);
    f > 0 && l.push({ emoji: p, count: f });
  }
  return l;
}
async function xt(w, i) {
  if (!w) return "";
  try {
    const l = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...st(i),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: w, mode: "gfm" })
    });
    if (l.ok)
      return await l.text();
  } catch {
  }
  return Be.renderMarkdown(w);
}
async function Bl(w, i, l, u) {
  const p = `
    query($owner: String!, $name: String!, $num: Int!) {
      repository(owner: $owner, name: $name) {
        discussion(number: $num) {
          title
          body
          bodyHTML
          author { login avatarUrl }
          authorAssociation
          createdAt
          url
          category {
            name
            emoji
          }
          reactionGroups {
            content
            reactors {
              totalCount
            }
          }
          comments(first: 30) {
            totalCount
            nodes {
              id
              body
              bodyHTML
              createdAt
              author { login avatarUrl }
              authorAssociation
              reactionGroups {
                content
                reactors {
                  totalCount
                }
              }
              replies(first: 30) {
                totalCount
                nodes {
                  id
                  body
                  bodyHTML
                  createdAt
                  author { login avatarUrl }
                  authorAssociation
                  reactionGroups {
                    content
                    reactors {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const f = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...st(u),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: p,
        variables: { owner: w, name: i, num: l }
      })
    });
    if (!f.ok) return null;
    const $ = (await f.json())?.data?.repository?.discussion;
    if (!$) return null;
    let R = 0;
    const k = ($.comments?.nodes || []).map((E) => {
      const H = E.replies?.nodes || [];
      R += H.length;
      const A = H.map((I) => ({
        id: I.id,
        author: {
          login: I.author?.login || "匿名",
          avatarUrl: I.author?.avatarUrl || "",
          association: rt(I.authorAssociation)
        },
        createdAt: I.createdAt,
        formattedTime: it(I.createdAt),
        body: I.body || "",
        bodyHtml: I.bodyHTML || (I.body ? Be.renderMarkdown(I.body) : ""),
        reactions: _t(I.reactionGroups)
      }));
      return {
        id: E.id,
        author: {
          login: E.author?.login || "匿名",
          avatarUrl: E.author?.avatarUrl || "",
          association: rt(E.authorAssociation)
        },
        createdAt: E.createdAt,
        formattedTime: it(E.createdAt),
        body: E.body || "",
        bodyHtml: E.bodyHTML || (E.body ? Be.renderMarkdown(E.body) : "<p>（评论内容为空）</p>"),
        reactions: _t(E.reactionGroups),
        replies: A
      };
    }), P = $.body || "", C = $.bodyHTML && $.bodyHTML.trim().length > 10 ? $.bodyHTML : P ? Be.renderMarkdown(P) : "<p>（主贴内容为空）</p>";
    return {
      title: $.title,
      number: l,
      state: "discussion",
      category: $.category ? {
        name: $.category.name,
        emoji: Fl($.category.emoji)
      } : void 0,
      author: {
        login: $.author?.login || "未知",
        avatarUrl: $.author?.avatarUrl || "",
        association: rt($.authorAssociation)
      },
      createdAt: $.createdAt,
      formattedTime: it($.createdAt),
      body: P,
      bodyHtml: C,
      htmlUrl: $.url,
      commentsCount: $.comments?.totalCount || k.length,
      totalRepliesCount: R,
      comments: k,
      reactions: _t($.reactionGroups)
    };
  } catch {
    return null;
  }
}
const kt = {
  async open(w) {
    D.isOpen = !0, D.loading = !0, D.error = "", D.data = null, D.notificationItem = w;
    const i = J.token?.trim() || "", l = {
      ...st(i),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const u = w.subject?.url, p = w.subject?.type, f = w.repository?.fullName || "", [M, $] = f.split("/"), R = u?.match(/\/(\d+)$/), k = R ? Number(R[1]) : void 0;
      if (p === "Discussion" && M && $ && k) {
        const P = await Bl(M, $, k, i);
        if (P) {
          D.data = {
            notificationId: w.id,
            title: P.title || w.subject.title,
            number: k,
            state: "discussion",
            category: P.category,
            author: P.author || { login: w.repository.owner.login, avatarUrl: w.repository.owner.avatarUrl || "" },
            createdAt: P.createdAt || w.updatedAt,
            formattedTime: P.formattedTime || w.formattedTime,
            body: P.body || "",
            bodyHtml: P.bodyHtml || (P.body ? Be.renderMarkdown(P.body) : ""),
            htmlUrl: P.htmlUrl || w.htmlUrl,
            commentsCount: P.commentsCount || 0,
            totalRepliesCount: P.totalRepliesCount || 0,
            comments: P.comments || [],
            reactions: P.reactions || [],
            repositoryFullName: f,
            type: "Discussion"
          };
          return;
        }
      }
      if (u) {
        const P = await fetch(u, { headers: l, cache: "no-store" });
        if (P.ok) {
          const C = await P.json();
          let E = [];
          if (C.comments_url && C.comments > 0)
            try {
              const I = await fetch(`${C.comments_url}?per_page=50`, { headers: l, cache: "no-store" });
              if (I.ok) {
                const Q = await I.json();
                Array.isArray(Q) && (E = await Promise.all(
                  Q.map(async (x) => {
                    const L = x.body_html || (x.body ? await xt(x.body, i) : "");
                    return {
                      id: x.id,
                      author: {
                        login: x.user?.login || "匿名",
                        avatarUrl: x.user?.avatar_url || "",
                        association: rt(x.author_association)
                      },
                      createdAt: x.created_at,
                      formattedTime: it(x.created_at),
                      body: x.body || "",
                      bodyHtml: L,
                      reactions: Ht(x.reactions)
                    };
                  })
                ));
              }
            } catch (I) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", I);
            }
          const H = C.body || "";
          let A = C.body_html || "";
          !A && H && (A = await xt(H, i)), !A && H && (A = Be.renderMarkdown(H)), D.data = {
            notificationId: w.id,
            title: C.title || C.name || w.subject.title,
            number: C.number || k,
            state: C.merged ? "merged" : C.state || C.conclusion || "open",
            author: {
              login: C.user?.login || C.author?.login || w.repository.owner.login,
              avatarUrl: C.user?.avatar_url || C.author?.avatar_url || w.repository.owner.avatarUrl || "",
              association: rt(C.author_association)
            },
            createdAt: C.created_at || C.published_at || w.updatedAt,
            formattedTime: it(C.created_at || C.published_at || w.updatedAt),
            body: H,
            bodyHtml: A || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: C.html_url || w.htmlUrl,
            commentsCount: typeof C.comments == "number" ? C.comments : E.length,
            comments: E,
            reactions: Ht(C.reactions),
            repositoryFullName: f,
            type: p || "Issue"
          };
          return;
        }
      }
      D.data = {
        notificationId: w.id,
        title: w.subject.title,
        number: k,
        state: "open",
        author: {
          login: w.repository.owner.login,
          avatarUrl: w.repository.owner.avatarUrl || ""
        },
        createdAt: w.updatedAt,
        formattedTime: w.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: w.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: f,
        type: p || "通知"
      };
    } catch (u) {
      console.warn("[GitHubNotificationDetail] 读取异常:", u), D.error = u?.message || "网络请求异常";
    } finally {
      D.loading = !1;
    }
  },
  close() {
    D.isOpen = !1, D.data = null, D.error = "";
  }
}, jl = { class: "vue-gh-notification-panel-wrapper" }, ql = { class: "gh-msg-header" }, zl = { class: "gh-msg-account" }, Wl = { class: "gh-msg-subtitle" }, Vl = {
  class: "gh-msg-tabs",
  role: "tablist"
}, Yl = ["onClick"], Kl = { class: "gh-msg-list" }, Zl = {
  key: 0,
  class: "gh-msg-loading"
}, Xl = {
  key: 1,
  class: "gh-msg-error"
}, Ql = {
  key: 2,
  class: "gh-msg-empty"
}, Jl = ["onClick"], ei = { class: "gh-card-indicator-col" }, ti = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, si = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, ai = { class: "gh-card-type-col" }, oi = ["title"], ni = { class: "gh-card-main-col" }, li = { class: "gh-card-repo-row" }, ii = ["title"], ri = { class: "gh-card-reason-tag" }, ui = { class: "gh-card-time" }, ci = ["title"], di = { class: "gh-card-footer-row" }, pi = { class: "gh-card-type-label" }, hi = ["onClick"], gi = /* @__PURE__ */ Le({
  __name: "GitHubNotificationPanel",
  setup(w) {
    const i = G(null), l = ie(() => [
      { kind: "all", label: "所有", count: q.items.length },
      { kind: "unread", label: "未读", count: q.items.filter((H) => H.unread).length },
      { kind: "mention", label: "提及", count: q.items.filter((H) => H.reason === "mention").length },
      { kind: "author", label: "作者", count: q.items.filter((H) => H.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: q.items.filter((H) => H.reason === "ci_activity" || H.subject.type === "CheckSuite").length }
    ]), u = ie(() => {
      const H = q.items;
      switch (q.activeKind) {
        case "unread":
          return H.filter((A) => A.unread);
        case "mention":
          return H.filter((A) => A.reason === "mention");
        case "author":
          return H.filter((A) => A.reason === "author");
        case "ci":
          return H.filter((A) => A.reason === "ci_activity" || A.subject.type === "CheckSuite");
        default:
          return H;
      }
    });
    function p(H, A) {
      if (A === "ci_activity" || H === "CheckSuite")
        return "⚡";
      switch (H) {
        case "Issue":
          return "🟢";
        case "PullRequest":
          return "🔀";
        case "Release":
          return "🏷️";
        case "Discussion":
          return "💡";
        default:
          return "📦";
      }
    }
    function f(H) {
      switch (H) {
        case "mention":
          return "提及";
        case "author":
          return "作者";
        case "ci_activity":
          return "CI 活动";
        case "review_requested":
          return "待我审查";
        case "comment":
          return "新评论";
        case "subscribed":
          return "关注动态";
        case "assign":
          return "指派给我";
        default:
          return H || "通知";
      }
    }
    function M() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function $() {
      Fe.refresh();
    }
    function R() {
      Fe.close();
    }
    function k(H) {
      kt.open(H);
    }
    function P(H) {
      Fe.openTarget(H);
    }
    function C(H) {
      if (!q.isOpen) return;
      const A = H.target;
      !i.value?.contains(A) && !A?.closest("#gh-header-msg-center-btn") && Fe.close();
    }
    function E(H) {
      H.key === "Escape" && q.isOpen && Fe.close();
    }
    return ut(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", C), window.addEventListener("keydown", E));
    }), ft(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", C), window.removeEventListener("keydown", E));
    }), (H, A) => (t(), s("div", jl, [
      o(q).isOpen ? (t(), s("section", {
        key: 0,
        ref_key: "panelRef",
        ref: i,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: A[0] || (A[0] = ne(() => {
        }, ["stop"]))
      }, [
        e("header", ql, [
          e("div", zl, [
            A[2] || (A[2] = e("div", { class: "gh-msg-octo-avatar" }, [
              e("svg", {
                viewBox: "0 0 24 24",
                width: "18",
                height: "18",
                fill: "currentColor"
              }, [
                e("path", { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" })
              ])
            ], -1)),
            e("div", null, [
              A[1] || (A[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", Wl, " 共 " + a(o(q).items.length) + " 条通知 · " + a(o(q).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          A[3] || (A[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: M
          }, " ↗ "),
          e("button", {
            type: "button",
            class: Z(["gh-panel-btn", { "is-spinning": o(q).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: $
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: R
          }, " ✕ ")
        ]),
        e("nav", Vl, [
          (t(!0), s(j, null, ee(l.value, (I) => (t(), s("button", {
            key: I.kind,
            type: "button",
            class: Z(["gh-msg-tab", { active: o(q).activeKind === I.kind }]),
            onClick: (Q) => o(q).activeKind = I.kind
          }, [
            se(a(I.label) + " ", 1),
            I.count > 0 ? (t(), s("span", {
              key: 0,
              class: Z(["gh-tab-pill", { "is-unread-pill": I.kind === "unread" }])
            }, a(I.count), 3)) : _("", !0)
          ], 10, Yl))), 128))
        ]),
        e("div", Kl, [
          o(q).loading && !o(q).items.length ? (t(), s("div", Zl, [...A[4] || (A[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : o(q).error ? (t(), s("div", Xl, [
            A[5] || (A[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, a(o(q).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: $
            }, "重试")
          ])) : u.value.length === 0 ? (t(), s("div", Ql, [...A[6] || (A[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (t(!0), s(j, { key: 3 }, ee(u.value, (I) => (t(), s("article", {
            key: I.id,
            class: Z(["gh-notification-card", { "is-unread": I.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (Q) => k(I)
          }, [
            e("div", ei, [
              I.unread ? (t(), s("span", ti)) : (t(), s("span", si))
            ]),
            e("div", ai, [
              e("span", {
                class: "gh-type-badge",
                title: I.subject.type
              }, a(p(I.subject.type, I.reason)), 9, oi)
            ]),
            e("div", ni, [
              e("div", li, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: I.repository.fullName
                }, a(I.repository.fullName), 9, ii),
                e("span", ri, a(f(I.reason)), 1),
                e("time", ui, a(I.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: I.subject.title
              }, a(I.subject.title), 9, ci),
              e("div", di, [
                e("span", pi, a(I.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: ne((Q) => P(I), ["stop"])
                }, "在网页打开 ↗", 8, hi)
              ])
            ])
          ], 10, Jl))), 128))
        ])
      ], 512)) : _("", !0)
    ]));
  }
}), fi = /* @__PURE__ */ De(gi, [["__scopeId", "data-v-9a98e294"]]), mi = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, vi = ["aria-label"], bi = { class: "gh-modal-title-wrap" }, yi = { class: "gh-modal-octo-icon" }, _i = ["href"], wi = { class: "gh-owner" }, ki = { class: "gh-name" }, $i = {
  key: 1,
  class: "gh-modal-repo-name"
}, Ci = { class: "gh-name" }, Si = { class: "gh-modal-actions" }, Ri = { class: "gh-modal-content" }, Gi = {
  key: 0,
  class: "gh-content-loading"
}, Mi = {
  key: 1,
  class: "gh-content-error"
}, Ti = { class: "gh-discussion-title-header" }, Ai = { class: "gh-discussion-h1" }, Li = {
  key: 0,
  class: "gh-discussion-num"
}, Di = { class: "gh-discussion-sub-meta" }, Hi = {
  key: 0,
  class: "gh-category-pill"
}, xi = {
  key: 0,
  class: "cat-emoji"
}, Ei = {
  key: 1,
  class: "gh-category-pill"
}, Ii = { class: "gh-sub-author" }, Ui = { class: "gh-sub-verb" }, Ni = {
  key: 2,
  class: "gh-sub-comments-count"
}, Pi = { class: "gh-op-post-card" }, Oi = { class: "gh-op-post-head" }, Fi = { class: "gh-op-author-left" }, Bi = ["src"], ji = { class: "gh-op-meta" }, qi = { class: "gh-op-name-row" }, zi = { class: "gh-op-name" }, Wi = {
  key: 0,
  class: "gh-role-pill"
}, Vi = { class: "gh-op-time" }, Yi = ["innerHTML"], Ki = {
  key: 0,
  class: "gh-reactions-bar"
}, Zi = { class: "rx-emoji" }, Xi = { class: "rx-count" }, Qi = {
  key: 0,
  class: "gh-comments-block"
}, Ji = { class: "gh-comments-header" }, er = { class: "gh-comments-count-pill" }, tr = { class: "gh-comments-feed" }, sr = { class: "gh-comment-head" }, ar = ["src"], or = { class: "gh-comment-meta" }, nr = { class: "gh-comment-author" }, lr = {
  key: 0,
  class: "gh-role-pill small"
}, ir = { class: "gh-comment-time" }, rr = ["innerHTML"], ur = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, cr = { class: "rx-emoji" }, dr = { class: "rx-count" }, pr = {
  key: 1,
  class: "gh-comment-replies-thread"
}, hr = { class: "gh-replies-thread-title" }, gr = { class: "gh-reply-head" }, fr = ["src"], mr = { class: "gh-reply-meta" }, vr = { class: "gh-reply-author" }, br = {
  key: 0,
  class: "gh-role-pill tiny"
}, yr = { class: "gh-reply-time" }, _r = ["innerHTML"], wr = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, kr = { class: "rx-emoji" }, $r = { class: "rx-count" }, Cr = {
  key: 1,
  class: "gh-no-comments"
}, Sr = /* @__PURE__ */ Le({
  __name: "GitHubNotificationDetailDrawer",
  setup(w) {
    const i = G(null), l = G(null), u = G(null);
    let p = !1, f = 0, M = 0, $ = 0, R = 0, k = () => {
    };
    const P = ie(() => (D.data?.repositoryFullName || D.notificationItem?.repository.fullName || "").split("/")[0] || ""), C = ie(() => {
      const N = D.data?.repositoryFullName || D.notificationItem?.repository.fullName || "";
      return N.split("/")[1] || N;
    }), E = ie(() => {
      if (!D.data) return "";
      const N = D.data.bodyHtml?.trim() || "";
      if (N.length > 20) return N;
      const W = D.data.body?.trim() || "";
      return W.length > 0 ? Be.renderMarkdown(W) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), H = ie(() => u.value ? {
      position: "fixed",
      left: `${u.value.x}px`,
      top: `${u.value.y}px`,
      transform: "none"
    } : {});
    be(
      () => D.isOpen,
      (N) => {
        N && (u.value = null, Gt(() => {
          l.value && (l.value.scrollTop = 0);
        }));
      }
    ), be(
      () => D.data,
      (N) => {
        N && Gt(() => {
          l.value && (l.value.scrollTop = 0);
        });
      }
    );
    function A(N) {
      if (N.target.closest("button, a, input")) return;
      k();
      const W = i.value;
      if (!W || !D.isOpen) return;
      p = !0;
      const K = W.getBoundingClientRect();
      $ = K.left, R = K.top, f = N.clientX, M = N.clientY, u.value = { x: $, y: R };
      const Y = (ae) => {
        if (!p) return;
        const ye = ae.clientX - f, de = ae.clientY - M;
        u.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, $ + ye)),
          y: Math.max(10, Math.min(window.innerHeight - 80, R + de))
        };
      }, F = () => {
        p = !1, window.removeEventListener("mousemove", Y), window.removeEventListener("mouseup", F);
      };
      k = F, window.addEventListener("mousemove", Y), window.addEventListener("mouseup", F);
    }
    function I() {
      kt.close();
    }
    function Q() {
      const N = D.data?.htmlUrl || D.notificationItem?.htmlUrl;
      N && typeof window < "u" && window.open(N, "_blank", "noopener,noreferrer");
    }
    function x(N) {
      const K = N.target?.closest("a");
      K && K.href && (N.preventDefault(), N.stopPropagation(), window.open(K.href, "_blank", "noopener,noreferrer"));
    }
    function L() {
      D.notificationItem && kt.open(D.notificationItem);
    }
    function z(N) {
      switch (N) {
        case "Discussion":
          return "💡";
        case "Issue":
          return "🟢";
        case "PullRequest":
          return "🔀";
        case "Release":
          return "🏷️";
        case "CheckSuite":
          return "⚡";
        default:
          return "🐙";
      }
    }
    function te(N) {
      switch (N) {
        case "Discussion":
          return "Discussion 讨论";
        case "Issue":
          return "Issue 议题";
        case "PullRequest":
          return "Pull Request 合并请求";
        case "Release":
          return "Release 发行版";
        case "CheckSuite":
          return "CI 流水线";
        default:
          return N || "通知详情";
      }
    }
    function ce(N) {
      switch (N) {
        case "open":
          return "Open 开启";
        case "closed":
          return "Closed 已关闭";
        case "merged":
          return "Merged 已合并";
        case "discussion":
          return "活跃中";
        case "success":
          return "构建成功";
        case "failure":
          return "构建失败";
        default:
          return N || "";
      }
    }
    function re(N) {
      N.key === "Escape" && D.isOpen && I();
    }
    return ut(() => {
      jt(), window.addEventListener("keydown", re);
    }), ft(() => {
      window.removeEventListener("keydown", re), k();
    }), (N, W) => (t(), we($t, { to: "body" }, [
      o(D).isOpen ? (t(), s("div", mi, [
        e("div", {
          ref_key: "windowRef",
          ref: i,
          class: "gh-nonmodal-window",
          style: tt(H.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": o(D).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: A
          }, [
            e("div", bi, [
              e("span", yi, a(z(o(D).data?.type || o(D).notificationItem?.subject.type)), 1),
              o(D).data?.htmlUrl || o(D).notificationItem?.htmlUrl ? (t(), s("a", {
                key: 0,
                href: o(D).data?.htmlUrl || o(D).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", wi, a(P.value), 1),
                W[0] || (W[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", ki, a(C.value), 1),
                W[1] || (W[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, _i)) : (t(), s("span", $i, [
                e("strong", Ci, a(o(D).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", Si, [
              o(D).data?.state ? (t(), s("span", {
                key: 0,
                class: Z(["gh-detail-state-pill", o(D).data.state])
              }, a(ce(o(D).data.state)), 3)) : _("", !0),
              o(D).data?.htmlUrl || o(D).notificationItem?.htmlUrl ? (t(), s("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: Q
              }, " 在网页打开 ↗ ")) : _("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: I
              }, " ✕ ")
            ])
          ], 32),
          e("div", Ri, [
            o(D).loading ? (t(), s("div", Gi, [
              W[2] || (W[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + a(o(D).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : o(D).error ? (t(), s("div", Mi, [
              W[3] || (W[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, a(o(D).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: L
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: Q
                }, "在 GitHub 打开 ↗")
              ])
            ])) : o(D).data ? (t(), s("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: l,
              class: "gh-detail-scrollable",
              onClick: x
            }, [
              e("div", Ti, [
                e("h1", Ai, [
                  se(a(o(D).data.title) + " ", 1),
                  o(D).data.number ? (t(), s("span", Li, "#" + a(o(D).data.number), 1)) : _("", !0)
                ]),
                e("div", Di, [
                  o(D).data.category ? (t(), s("span", Hi, [
                    o(D).data.category.emoji ? (t(), s("span", xi, a(o(D).data.category.emoji), 1)) : _("", !0),
                    e("span", null, a(o(D).data.category.name), 1)
                  ])) : (t(), s("span", Ei, a(te(o(D).data.type)), 1)),
                  e("span", Ii, a(o(D).data.author.login), 1),
                  e("span", Ui, "发布于 " + a(o(D).data.formattedTime), 1),
                  o(D).data.commentsCount ? (t(), s("span", Ni, [
                    se(" · " + a(o(D).data.commentsCount) + " 条讨论主题 ", 1),
                    o(D).data.totalRepliesCount ? (t(), s(j, { key: 0 }, [
                      se(" （含 " + a(o(D).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : _("", !0)
                  ])) : _("", !0)
                ])
              ]),
              e("article", Pi, [
                e("div", Oi, [
                  e("div", Fi, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: o(D).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Bi),
                    e("div", ji, [
                      e("div", qi, [
                        e("strong", zi, a(o(D).data.author.login), 1),
                        o(D).data.author.association ? (t(), s("span", Wi, a(o(D).data.author.association), 1)) : _("", !0)
                      ]),
                      e("time", Vi, a(o(D).data.formattedTime), 1)
                    ])
                  ]),
                  W[4] || (W[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                W[5] || (W[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: E.value
                }, null, 8, Yi),
                o(D).data.reactions?.length ? (t(), s("div", Ki, [
                  (t(!0), s(j, null, ee(o(D).data.reactions, (K) => (t(), s("span", {
                    key: K.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", Zi, a(K.emoji), 1),
                    e("span", Xi, a(K.count), 1)
                  ]))), 128))
                ])) : _("", !0)
              ]),
              o(D).data.comments.length ? (t(), s("div", Qi, [
                e("div", Ji, [
                  W[6] || (W[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", er, [
                    se(a(o(D).data.commentsCount) + " 条主题 ", 1),
                    o(D).data.totalRepliesCount ? (t(), s(j, { key: 0 }, [
                      se(" · " + a(o(D).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : _("", !0)
                  ])
                ]),
                e("div", tr, [
                  (t(!0), s(j, null, ee(o(D).data.comments, (K) => (t(), s("div", {
                    key: K.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", sr, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: K.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, ar),
                      e("div", or, [
                        e("span", nr, a(K.author.login), 1),
                        K.author.association ? (t(), s("span", lr, a(K.author.association), 1)) : _("", !0),
                        e("time", ir, a(K.formattedTime), 1)
                      ])
                    ]),
                    W[7] || (W[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: K.bodyHtml
                    }, null, 8, rr),
                    K.reactions?.length ? (t(), s("div", ur, [
                      (t(!0), s(j, null, ee(K.reactions, (Y) => (t(), s("span", {
                        key: Y.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", cr, a(Y.emoji), 1),
                        e("span", dr, a(Y.count), 1)
                      ]))), 128))
                    ])) : _("", !0),
                    K.replies?.length ? (t(), s("div", pr, [
                      e("div", hr, [
                        e("span", null, "💬 " + a(K.replies.length) + " 条回复对话", 1)
                      ]),
                      (t(!0), s(j, null, ee(K.replies, (Y) => (t(), s("div", {
                        key: Y.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", gr, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: Y.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, fr),
                          e("div", mr, [
                            e("strong", vr, a(Y.author.login), 1),
                            Y.author.association ? (t(), s("span", br, a(Y.author.association), 1)) : _("", !0),
                            e("time", yr, a(Y.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: Y.bodyHtml
                        }, null, 8, _r),
                        Y.reactions?.length ? (t(), s("div", wr, [
                          (t(!0), s(j, null, ee(Y.reactions, (F) => (t(), s("span", {
                            key: F.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", kr, a(F.emoji), 1),
                            e("span", $r, a(F.count), 1)
                          ]))), 128))
                        ])) : _("", !0)
                      ]))), 128))
                    ])) : _("", !0)
                  ]))), 128))
                ])
              ])) : (t(), s("div", Cr, [...W[8] || (W[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : _("", !0)
          ])
        ], 12, vi)
      ])) : _("", !0)
    ]));
  }
}), Rr = /* @__PURE__ */ De(Sr, [["__scopeId", "data-v-053c788c"]]), Gr = [
  {
    chapterTitle: "基础篇 · 收藏与本地分类",
    left: { tag: "第 1 篇 · 数据边界", title: "⭐ 收藏从哪里来？", badge: "先看这里", steps: [
      { icon: "🔗", title: "连接 GitHub 账号", desc: "在右上角设置填写 GitHub 用户名。Token 可选，用于读取账号收藏、提高请求额度；本地分类不需要 GitHub Lists 写权限。" },
      { icon: "📥", title: "只把收藏读取到工作台", desc: "刷新会读取 GitHub 的 Star 收藏。同账号刷新保留已有卡片，完整读取成功后再替换；网络失败时保留上次内容并提示。" },
      { icon: "💾", title: "分类只存在本机", desc: "分组、仓库归属和左栏排序保存在当前浏览器的扩展数据中，不会同步修改 GitHub 官方 Lists。", tip: "首次切换会保留本机已有列表缓存作为分组初始数据；官网原有 Lists 不会被删除或改写。" }
    ] },
    right: { tag: "第 2 篇 · 整理收藏", title: "📁 像常用网站一样整理", badge: "本地分组", steps: [
      { icon: "➕", title: "创建与打开文件夹", desc: "点击左侧分组标题右边的 +，输入名称创建本地分组。左栏每行两个图标：文件夹代表分组，独立图标代表未分组仓库。" },
      { icon: "🖱️", title: "拖动归类，边缘排序", desc: "把仓库拖到文件夹中心可加入分组，保留其他分组归属；拖到图标边缘可以调整左栏顺序。点击文件夹会打开独立、实心的无模态窗口。", tip: "分组不支持嵌套；把两个仓库图标叠放只调整顺序，不会偷偷创建分组。" },
      { icon: "↩️", title: "右键移到未分组", desc: "右键仓库图标，选择“移到未分组”，即可移除它的所有本地分组归属。删除分组只影响本地整理，不会取消 GitHub Star。" }
    ] }
  },
  {
    chapterTitle: "进阶篇 · 检索、阅读与安全边界",
    left: { tag: "第 3 篇 · 查找与阅读", title: "🔎 快速找到有用的仓库", badge: "效率技巧", steps: [
      { icon: "⌨️", title: "统一使用顶部搜索", desc: "顶部选择本地搜索后，可按仓库名称、简介、语言或主题标签筛选已读取的收藏。未分组托盘和分组看板共用这一个搜索词。" },
      { icon: "📑", title: "托盘翻页与横向看板", desc: "顶部未分组收藏保持单排，每页 10 个；使用翻页按钮浏览。下方是本地分组的多列看板，支持横向滚动及拖拽归类。" },
      { icon: "📖", title: "打开 README 详情", desc: "点击仓库图标或卡片打开详情，查看说明文档与标题目录；可读取仓库提供的中文版本。近期读过的详情有短时内存缓存。", tip: "图片由原站提供；私有、已删除或网络不可达的资源仍可能加载失败。" }
    ] },
    right: { tag: "第 4 篇 · 使用须知", title: "🛡️ 哪些操作会改变什么？", badge: "真实边界", steps: [
      { icon: "🏠", title: "本地分组不跨设备同步", desc: "不同账号分开保存；首次导入后，刷新收藏不会用官网 Lists 覆盖本地分类。清理扩展数据、卸载扩展或更换扩展 ID 可能丢失本地分组，请谨慎操作。" },
      { icon: "⚠️", title: "Star 操作与分类不同", desc: "分类不修改云端；如果你主动使用已有的 Star / 取消 Star 功能，则仍会真实修改 GitHub 收藏。创建关联任务也会通过对应任务服务执行。" },
      { icon: "❔", title: "遇到加载或拖动问题", desc: "读取失败先检查网络、Token 或请求额度，不要连续重复刷新。Esc 可取消图标拖动、收起菜单或关闭当前说明书；点击窗口外也能收起说明书。", tip: "说明书底部可切换章节，键盘左右方向键也能翻页。" }
    ] }
  }
], Mr = ["inert"], Tr = {
  key: 0,
  class: "muted small",
  role: "status"
}, Ar = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Lr = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, Dr = ["title"], Hr = { class: "fo-sidebar-toggle-title" }, xr = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Er = ["aria-expanded", "title"], Ir = { class: "fo-sidebar-toggle-chevron" }, Ur = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, Nr = { class: "fo-sidebar-sub-wrap" }, Pr = { class: "fo-sidebar-sub-wrap" }, Or = ["title"], Fr = { class: "fo-sidebar-sub-main" }, Br = { class: "fo-sidebar-sub-text" }, jr = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, qr = ["title"], zr = { class: "fo-sidebar-sub-main" }, Wr = { class: "fo-sidebar-sub-text" }, Vr = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Yr = ["title"], Kr = { class: "fo-sidebar-sub-main" }, Zr = { class: "fo-sidebar-sub-text" }, Xr = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Qr = ["title"], Jr = { class: "fo-sidebar-sub-main" }, eu = { class: "fo-sidebar-sub-text" }, tu = { class: "gh-bili-sidebar-head" }, su = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, au = { style: { color: "var(--dim)", "font-size": "9.5px" } }, ou = ["title", "aria-label"], nu = {
  class: "gh-bili-folder-list",
  id: "gh-folder-list"
}, lu = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, iu = { class: "card-fullscreen-gh-search" }, ru = ["title"], uu = { class: "gh-mode-icon" }, cu = { class: "gh-mode-text" }, du = ["placeholder"], pu = ["title"], hu = { class: "gh-search-rule-icon" }, gu = { class: "gh-search-rule-text" }, fu = ["title"], mu = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, vu = {
  class: "card-fullscreen-gh-search gh-hero-search-box-wrap",
  id: "gh-head-search-wrap"
}, bu = ["title"], yu = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, _u = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, wu = ["placeholder"], ku = ["title"], $u = { class: "gh-search-rule-icon" }, Cu = { class: "gh-search-rule-text" }, Su = ["title"], Ru = ["title"], Gu = { class: "gh-header-msg-label" }, Mu = {
  key: 0,
  class: "gh-header-msg-badge"
}, Tu = { class: "gh-settings-anchor" }, Au = ["aria-expanded", "aria-label", "title"], Lu = {
  id: "vue-github-repositories-root",
  style: { flex: "1", "min-height": "0", display: "flex", "flex-direction": "column" }
}, wt = "lw-github-active-channel", Du = /* @__PURE__ */ Le({
  __name: "GitHubWorkspaceCard",
  setup(w) {
    const i = Mt(() => import("./GitHubSettingsModal-CwtcbbOc.js")), l = Mt(() => import("./LauncherBookGuideDialog-BTDkrb5Q.js")), { style: u, media: p } = os("github"), { active: f } = Nt("card-github", "/github.html");
    let M = 0, $ = !1, R;
    const k = G("");
    function P() {
      try {
        const B = sessionStorage.getItem(wt);
        if (B === "dashboard" || B === "stars" || B === "trending" || B === "awesome" || B === "repos")
          return B;
      } catch {
      }
      return "dashboard";
    }
    const C = G(P());
    C.value === "trending" && vt.switchTab("trending"), be(() => f.value && C.value === "stars", (B) => J.setAiViewActive(B), { immediate: !0, flush: "sync" });
    const E = G(!1), H = G("local"), A = G(""), I = G(""), Q = G(0), x = G("fuzzy"), L = G(null), z = G(!1), te = G(!1);
    be(f, (B) => {
      B || (te.value = !1);
    });
    const ce = G(0);
    function re() {
      f.value && (z.value = !0, ++ce.value);
    }
    const N = G(!1);
    be(z, (B) => {
      B && (N.value = !0);
    });
    const W = G(null), K = G(0);
    function Y(B) {
      W.value = B || document.getElementById("gh-sidebar-stars-btn"), z.value = !0;
    }
    let F = 0;
    function ae(B) {
      if (B === "dashboard" && (L.value = null), C.value = B, B !== "search")
        try {
          sessionStorage.setItem(wt, B);
        } catch {
        }
      B === "trending" ? vt.switchTab("trending") : vt.switchTab("stars");
    }
    function ye() {
      C.value = "stars";
      try {
        sessionStorage.setItem(wt, "stars");
      } catch {
      }
    }
    const de = ie(() => [
      { id: "exact", icon: "🎯", name: U("search.rule.exact"), desc: U("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: U("search.rule.fuzzy"), desc: U("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: U("search.rule.topic"), desc: U("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: U("search.rule.smart"), desc: U("search.rule.smartDesc") }
    ]), he = G(J.searchRule || "exact"), ue = ie(() => de.value.find((B) => B.id === he.value) || de.value[0]);
    function fe() {
      const B = J.cycleSearchRule();
      he.value = B;
    }
    const $e = ie(() => H.value === "global" ? U("github.searchGlobalPlaceholder") : U("github.searchLocalPlaceholder", { rule: ue.value.name }));
    function Se() {
      clearTimeout(F), !(!f.value || H.value !== "local") && (F = window.setTimeout(() => J.setSearchQuery(A.value.trim().toLowerCase()), 180));
    }
    function He() {
      H.value = H.value === "local" ? "global" : "local", H.value === "local" && Se();
    }
    function Me() {
      L.value = null, A.value = "", clearTimeout(F), J.resetLocalSearch();
    }
    function xe(B, b) {
      const X = B.trim();
      X && (clearTimeout(F), I.value = X, x.value = b, Q.value++, H.value = "global", A.value = X, ae("dashboard"), L.value = "global");
    }
    function Ee() {
      const B = A.value.trim();
      H.value === "local" ? (clearTimeout(F), J.setSearchQuery(B.toLowerCase())) : B && xe(B, "fuzzy");
    }
    be(() => [f.value, ss.github?.id], ([B, b]) => {
      if (!B || !b) return;
      const X = ts("github");
      X && xe(X.keyword, J.searchRule || "exact");
    }, { immediate: !0 });
    function Re() {
      A.value.trim() && (H.value === "local" ? (clearTimeout(F), J.setSearchQuery(A.value.trim().toLowerCase()), L.value = "local") : Ee());
    }
    function Te() {
      ++K.value, ++M, $ = !0, k.value = "";
    }
    return be(f, async (B) => {
      if (clearTimeout(F), !B) return;
      const b = ++M;
      if ((!R || R.signal.aborted) && (R = new AbortController(), J.setRepositoryViewSignal(R.signal)), $) {
        await J.resumeRepositoryReads();
        return;
      }
      if (J.repos.length || J.loadingAllStars || J.loadingPage) {
        $ = !0;
        return;
      }
      try {
        const X = await St();
        if (b !== M || R.signal.aborted) return;
        $ = !0, await J.loadGitHub(X.ghUser, X.ghToken);
      } catch {
        if (b !== M || R?.signal.aborted) return;
        $ = !1, k.value = U("github.initError");
      }
    }, { immediate: !0, flush: "sync" }), Ct(() => {
      J.setAiViewActive(!1), ++M, R?.abort(), clearTimeout(F);
    }), (B, b) => (t(), s("section", {
      class: Z(["card wide", { "card-fullscreen": o(as).activeId === "card-github" }]),
      id: "card-github",
      inert: !o(f)
    }, [
      b[35] || (b[35] = e("header", { class: "card-head" }, [
        e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }),
        e("h2", null, "GitHub"),
        e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        })
      ], -1)),
      k.value ? (t(), s("p", Tr, a(k.value), 1)) : _("", !0),
      e("div", Ar, [
        e("div", {
          class: Z(["gh-bili-layout", { "has-workspace-wallpaper": !!o(u) }]),
          style: tt(o(u))
        }, [
          Ue(ns, { media: o(p) }, null, 8, ["media"]),
          e("aside", Lr, [
            e("div", {
              class: Z(["fo-sidebar-toggle-bar", { "is-collapsed": E.value }]),
              title: E.value ? o(U)("github.channel.toggleExpand") : o(U)("github.channel.toggleCollapse"),
              onClick: b[0] || (b[0] = (X) => E.value = !E.value)
            }, [
              e("div", Hr, [
                b[17] || (b[17] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, a(o(U)("github.channel.channels")), 1),
                E.value ? (t(), s("span", xr, "5")) : _("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !E.value,
                title: E.value ? o(U)("github.expand") : o(U)("github.collapse")
              }, [
                e("span", null, a(E.value ? o(U)("github.expand") : o(U)("github.collapse")), 1),
                e("span", Ir, a(E.value ? "▾" : "▴"), 1)
              ], 8, Er)
            ], 10, Dr),
            E.value ? _("", !0) : (t(), s("div", Ur, [
              e("div", Nr, [
                e("button", {
                  id: "gh-sidebar-dashboard-btn",
                  type: "button",
                  class: Z(["fo-sidebar-sub-btn", { on: C.value === "dashboard" }]),
                  title: "GitHub 首页",
                  onClick: b[1] || (b[1] = (X) => ae("dashboard"))
                }, [...b[18] || (b[18] = [
                  e("div", { class: "fo-sidebar-sub-main" }, [
                    e("span", { class: "fo-sidebar-sub-icon" }, "⌂"),
                    e("div", { class: "fo-sidebar-sub-text" }, [
                      e("strong", null, "首页"),
                      e("small", null, "工作区概览")
                    ])
                  ], -1),
                  e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "var(--surface-hover)", color: "var(--muted)" }
                  }, "HOME", -1)
                ])], 2)
              ]),
              e("div", Pr, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: Z(["fo-sidebar-sub-btn", { on: C.value === "stars" }]),
                  title: o(U)("github.channel.starsTitle"),
                  onClick: b[2] || (b[2] = (X) => ae("stars"))
                }, [
                  e("div", Fr, [
                    b[19] || (b[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", Br, [
                      e("strong", null, a(o(U)("github.channel.stars")), 1),
                      e("small", null, a(o(U)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  b[20] || (b[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, Or)
              ]),
              e("div", jr, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: Z(["fo-sidebar-sub-btn", { on: C.value === "trending" }]),
                  title: o(U)("github.channel.trendingTitle"),
                  onClick: b[3] || (b[3] = (X) => ae("trending"))
                }, [
                  e("div", zr, [
                    b[21] || (b[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", Wr, [
                      e("strong", null, a(o(U)("github.channel.trending")), 1),
                      e("small", null, a(o(U)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  b[22] || (b[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, qr)
              ]),
              e("div", Vr, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: Z(["fo-sidebar-sub-btn", { on: C.value === "awesome" }]),
                  title: o(U)("github.channel.awesomeTitle"),
                  onClick: b[4] || (b[4] = (X) => ae("awesome"))
                }, [
                  e("div", Kr, [
                    b[23] || (b[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", Zr, [
                      e("strong", null, a(o(U)("github.channel.awesome")), 1),
                      e("small", null, a(o(U)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  b[24] || (b[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, Yr)
              ]),
              e("div", Xr, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: Z(["fo-sidebar-sub-btn", { on: C.value === "repos" }]),
                  title: o(U)("github.channel.reposTitle"),
                  onClick: b[5] || (b[5] = (X) => ae("repos"))
                }, [
                  e("div", Jr, [
                    b[25] || (b[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", eu, [
                      e("strong", null, a(o(U)("github.channel.repos")), 1),
                      e("small", null, a(o(U)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  b[26] || (b[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, Qr)
              ])
            ])),
            e("header", tu, [
              e("div", null, [
                e("b", su, [
                  b[27] || (b[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  se(" " + a(o(U)("github.lists.title")), 1)
                ]),
                e("small", au, a(o(U)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: o(U)("github.lists.new"),
                "aria-label": o(U)("github.lists.new"),
                onClick: b[6] || (b[6] = (X) => o(J).promptCreateFolder())
              }, "＋", 8, ou)
            ]),
            e("nav", nu, [
              Ue(zt, {
                active: o(f),
                onSelect: ye
              }, null, 8, ["active"])
            ])
          ]),
          e("section", lu, [
            C.value === "dashboard" ? (t(), we(Nl, {
              key: 0,
              active: o(f),
              "account-revision": K.value,
              "show-results": !!L.value,
              onChannel: ae,
              onSettings: Y,
              onNotifications: b[8] || (b[8] = (X) => o(Fe).open())
            }, {
              search: dt(() => [
                e("div", iu, [
                  e("form", {
                    class: "gh-search-box",
                    role: "search",
                    onSubmit: ne(Re, ["prevent"])
                  }, [
                    e("button", {
                      type: "button",
                      class: "gh-search-mode-toggle",
                      title: H.value === "local" ? o(U)("github.searchScope.toGlobal") : o(U)("github.searchScope.toLocal"),
                      onClick: He
                    }, [
                      e("span", uu, a(H.value === "local" ? "⭐" : "🌐"), 1),
                      e("span", cu, a(H.value === "local" ? o(U)("github.searchScope.local") : o(U)("github.searchScope.global")), 1),
                      b[28] || (b[28] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
                    ], 8, ru),
                    ke(e("input", {
                      "onUpdate:modelValue": b[7] || (b[7] = (X) => A.value = X),
                      placeholder: $e.value,
                      "aria-label": "搜索 GitHub 仓库",
                      autocomplete: "off"
                    }, null, 8, du), [
                      [qe, A.value]
                    ]),
                    H.value === "local" ? (t(), s("button", {
                      key: 0,
                      type: "button",
                      class: Z(["gh-search-rule-btn", `rule-${ue.value.id}`]),
                      title: o(U)("github.ruleHint", { rule: ue.value.name, desc: ue.value.desc }),
                      onClick: ne(fe, ["stop"])
                    }, [
                      e("span", hu, a(ue.value.icon), 1),
                      e("span", gu, a(ue.value.name), 1)
                    ], 10, pu)) : _("", !0),
                    ke(e("button", {
                      type: "button",
                      class: "gh-search-clear-btn",
                      title: o(U)("github.clearSearch"),
                      onClick: Me
                    }, "✕", 8, fu), [
                      [et, A.value]
                    ]),
                    b[29] || (b[29] = e("button", {
                      type: "submit",
                      title: "搜索",
                      "aria-label": "搜索"
                    }, "⌕", -1))
                  ], 32)
                ])
              ]),
              results: dt(() => [
                L.value === "global" ? (t(), we(Lt, {
                  key: 0,
                  embedded: "",
                  query: I.value,
                  "request-id": Q.value,
                  rule: x.value,
                  onBack: Me
                }, null, 8, ["query", "request-id", "rule"])) : L.value === "local" ? (t(), we($n, {
                  key: 1,
                  onBack: Me
                })) : _("", !0)
              ]),
              _: 1
            }, 8, ["active", "account-revision", "show-results"])) : C.value === "search" ? (t(), we(Lt, {
              key: 1,
              query: I.value,
              "request-id": Q.value,
              rule: x.value,
              onBack: b[9] || (b[9] = (X) => ae("stars"))
            }, null, 8, ["query", "request-id", "rule"])) : C.value === "stars" && o(gt).accountConfigured === !1 ? (t(), we(qt, {
              key: 2,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: b[10] || (b[10] = (X) => Y())
            })) : C.value === "stars" ? (t(), s(j, { key: 3 }, [
              e("header", mu, [
                Ue(Wt, {
                  onOpenAiSettings: re,
                  onOpenGuide: b[14] || (b[14] = (X) => te.value = !0)
                }, {
                  search: dt(() => [
                    e("div", vu, [
                      e("form", {
                        id: "gh-search-form",
                        class: "gh-search-box",
                        onSubmit: ne(Ee, ["prevent"])
                      }, [
                        e("button", {
                          type: "button",
                          id: "gh-search-mode-toggle",
                          class: "gh-search-mode-toggle",
                          title: H.value === "local" ? o(U)("github.searchScope.toGlobal") : o(U)("github.searchScope.toLocal"),
                          onClick: He
                        }, [
                          e("span", yu, a(H.value === "local" ? "⭐" : "🌐"), 1),
                          e("span", _u, a(H.value === "local" ? o(U)("github.searchScope.local") : o(U)("github.searchScope.global")), 1),
                          b[30] || (b[30] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
                        ], 8, bu),
                        ke(e("input", {
                          id: "gh-search-input",
                          "onUpdate:modelValue": b[11] || (b[11] = (X) => A.value = X),
                          placeholder: $e.value,
                          autocomplete: "off",
                          onInput: Se
                        }, null, 40, wu), [
                          [qe, A.value]
                        ]),
                        H.value === "local" ? (t(), s("button", {
                          key: 0,
                          type: "button",
                          class: Z(["gh-search-rule-btn", `rule-${ue.value.id}`]),
                          title: o(U)("github.ruleHint", { rule: ue.value.name, desc: ue.value.desc }),
                          onClick: ne(fe, ["stop"])
                        }, [
                          e("span", $u, a(ue.value.icon), 1),
                          e("span", Cu, a(ue.value.name), 1)
                        ], 10, ku)) : _("", !0),
                        ke(e("button", {
                          type: "button",
                          id: "gh-search-clear-btn",
                          class: "gh-search-clear-btn",
                          title: o(U)("github.clearSearch"),
                          onClick: Me
                        }, "✕", 8, Su), [
                          [et, A.value]
                        ]),
                        b[31] || (b[31] = e("button", {
                          type: "submit",
                          id: "gh-search-submit-btn",
                          title: "搜索"
                        }, "⌕", -1))
                      ], 32),
                      b[32] || (b[32] = e("div", {
                        id: "gh-search-options",
                        class: "gh-search-options",
                        "aria-label": "搜索来源",
                        hidden: ""
                      }, [
                        e("label", { title: "精确：严格用你的原关键词搜索仓库名和描述" }, [
                          e("input", {
                            type: "checkbox",
                            value: "exact",
                            checked: ""
                          }),
                          se("精确")
                        ]),
                        e("label", { title: "宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" }, [
                          e("input", {
                            type: "checkbox",
                            value: "loose"
                          }),
                          se("宽松匹配")
                        ]),
                        e("label", { title: "近义词：自动扩展相关英文词，例如 ai → llm / machine learning" }, [
                          e("input", {
                            type: "checkbox",
                            value: "related"
                          }),
                          se("近义词")
                        ]),
                        e("label", { title: "主题标签：搜索 GitHub Topics 标签，例如 topic:llm" }, [
                          e("input", {
                            type: "checkbox",
                            value: "topic"
                          }),
                          se("主题标签")
                        ]),
                        e("label", { title: "说明文档：搜索仓库 README 内容" }, [
                          e("input", {
                            type: "checkbox",
                            value: "readme"
                          }),
                          se("说明文档")
                        ])
                      ], -1)),
                      b[33] || (b[33] = e("div", {
                        id: "gh-search-suggest",
                        class: "gh-search-suggest",
                        hidden: ""
                      }, null, -1))
                    ])
                  ]),
                  "actions-prefix": dt(() => [
                    e("button", {
                      id: "gh-header-msg-center-btn",
                      class: Z(["gh-header-msg-btn", { "has-unread": o(q).unreadCount > 0, "is-active": o(q).isOpen }]),
                      type: "button",
                      title: o(q).unreadCount > 0 ? o(U)("github.header.msgUnread", { count: o(q).unreadCount }) : o(U)("github.header.msgCenter"),
                      onClick: b[12] || (b[12] = (X) => o(Fe).toggle())
                    }, [
                      b[34] || (b[34] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
                      e("span", Gu, a(o(U)("github.header.msg")), 1),
                      o(q).unreadCount > 0 ? (t(), s("span", Mu, a(o(q).unreadCount > 99 ? "99+" : o(q).unreadCount), 1)) : _("", !0)
                    ], 10, Ru),
                    e("div", Tu, [
                      e("button", {
                        type: "button",
                        ref_key: "settingsButton",
                        ref: W,
                        "aria-expanded": z.value,
                        "aria-label": o(U)("github.settings"),
                        class: "gh-head-settings-btn",
                        title: o(U)("github.header.settings"),
                        onClick: b[13] || (b[13] = (X) => z.value = !z.value)
                      }, " ⚙️ ", 8, Au)
                    ])
                  ]),
                  _: 1
                })
              ]),
              e("div", Lu, [
                Ue(jo, {
                  active: o(f) && C.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : C.value === "trending" ? (t(), we(Vt, { key: 4 })) : C.value === "awesome" ? (t(), we($s, { key: 5 })) : C.value === "repos" ? (t(), we(Ra, {
              key: 6,
              active: o(f) && C.value === "repos"
            }, null, 8, ["active"])) : _("", !0)
          ])
        ], 6)
      ]),
      N.value ? (t(), we(o(i), {
        key: 1,
        visible: o(f) && z.value,
        anchor: W.value,
        "ai-request": ce.value,
        onAccountReload: Te,
        onClose: b[15] || (b[15] = (X) => z.value = !1)
      }, null, 8, ["visible", "anchor", "ai-request"])) : _("", !0),
      te.value ? (t(), we(o(l), {
        key: 2,
        open: te.value,
        title: "GitHub 使用手册",
        spreads: o(Gr),
        "help-selector": ".gh-github-help-btn",
        onClose: b[16] || (b[16] = (X) => te.value = !1)
      }, null, 8, ["open", "spreads"])) : _("", !0),
      Ue(fi),
      Ue(Rr)
    ], 10, Mr));
  }
}), Vu = /* @__PURE__ */ De(Du, [["__scopeId", "data-v-46bbd81f"]]);
export {
  Vu as default
};
