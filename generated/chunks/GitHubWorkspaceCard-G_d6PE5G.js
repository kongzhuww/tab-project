import { d as Se, f as t, g as s, h as e, F as B, i as Z, s as Y, t as o, u as n, k as te, j as k, b as R, x as ae, r as Ee, w as he, o as lt, e as rt, p as be, A as je, m as X, v as Ie, q as et, l as ve, T as mt, n as ot, H as ft, C as Ae, J as kt, y as $t, B as tt, E as Ct } from "./vendor-vue-BbmU9NUg.js";
import { u as Et } from "./useCardActivity-CM0pgPQ4.js";
import { x as vt, y as Be, n as St, z as se, A as nt, m as K, R as Gt, B as It, q as it, r as at, C as Ut, D as st, G as Nt, E as Pt, w as Ot } from "./github.service-DdJVB3Fj.js";
import { A as Ft } from "./AccountSetupGuide-BZKjVdlS.js";
import { c as Lt, G as jt, d as Bt, g as Rt } from "./github-task-modal-store-Cd7HpZo7.js";
import zt from "./GitHubTrending-Ba6mL59L.js";
import { _ as Ge, t as E } from "./_plugin-vue_export-helper-CP_tFnee.js";
import { i as qt, l as Wt } from "./github-resources-BzNgx_GQ.js";
import { s as We } from "./storage-cache.service-BYF2zxXX.js";
import { l as Yt, r as Vt, a as Kt } from "./workspace-bridge-DSVdr6tH.js";
import { z as dt, A as Xt, B as Qt, g as Jt } from "./search.service-B3Axreqn.js";
import { m as xe } from "./core-utils-KTt-RZby.js";
const Zt = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], es = [
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
], ts = { class: "gh-awesome-wrapper" }, ss = { class: "gh-awesome-header" }, os = { class: "gh-awesome-pills" }, ns = ["onClick"], as = { class: "gh-awesome-grid" }, ls = ["onClick"], rs = { class: "gh-awesome-card-head" }, is = { class: "gh-awesome-card-name" }, us = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, cs = { class: "gh-awesome-desc" }, ds = { class: "gh-awesome-footer" }, ps = { class: "gh-awesome-tags" }, hs = ["href"], gs = {
  key: 0,
  class: "gh-awesome-empty"
}, ms = /* @__PURE__ */ Se({
  __name: "GitHubAwesome",
  setup(w) {
    const u = R("all"), l = ae(() => es.filter((p) => u.value === "all" || p.category === u.value));
    function r(p) {
      window.open(p, "_blank", "noreferrer");
    }
    return (p, m) => (t(), s("div", ts, [
      e("header", ss, [
        m[1] || (m[1] = e("div", { class: "gh-awesome-intro" }, [
          e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ])
        ], -1)),
        e("div", os, [
          (t(!0), s(B, null, Z(n(Zt), (S) => (t(), s("button", {
            key: S.id,
            type: "button",
            class: Y(["gh-awesome-pill", { active: u.value === S.id }]),
            onClick: (C) => u.value = S.id
          }, [
            e("span", null, o(S.icon), 1),
            e("b", null, o(S.name), 1)
          ], 10, ns))), 128))
        ])
      ]),
      e("div", as, [
        (t(!0), s(B, null, Z(l.value, (S) => (t(), s("article", {
          key: S.id,
          class: "gh-awesome-card",
          onClick: (C) => r(S.url)
        }, [
          e("div", rs, [
            e("div", is, [
              e("strong", null, o(S.title), 1),
              e("small", null, o(S.name), 1)
            ]),
            e("span", us, "★ " + o(S.stars), 1)
          ]),
          e("p", cs, o(S.desc), 1),
          e("div", ds, [
            e("div", ps, [
              (t(!0), s(B, null, Z(S.tags, (C) => (t(), s("span", {
                key: C,
                class: "gh-awesome-tag"
              }, o(C), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: S.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: m[0] || (m[0] = te(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, hs)
          ])
        ], 8, ls))), 128)),
        l.value.length ? k("", !0) : (t(), s("div", gs, [...m[2] || (m[2] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), fs = /* @__PURE__ */ Ge(ms, [["__scopeId", "data-v-ce110d1d"]]), Ye = "gh_my_repos_cache_v1", Ve = "gh_my_repo_groups_v2", Ke = "gh_my_repo_groups_map_v2", P = Ee({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function Ne(w) {
  return w.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class Oe {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return Oe.instance || (Oe.instance = new Oe()), Oe.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(u = !1) {
    if (!u && this.inFlightPromise)
      return this.inFlightPromise;
    u && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const l = this.abortController.signal, r = (async () => {
      await this.loadPersistedGroups();
      const p = await We.get(Ye);
      if (p && p.length ? this.hydrateRepos(p) : P.repos.length && this.hydrateRepos(P.repos), u || !P.repos.length) {
        P.loading = !0, P.errorMessage = "";
        try {
          await this.fetchRemote(l);
        } catch (S) {
          if (S.name === "AbortError") return;
          P.errorMessage = S.message || "获取个人仓库失败";
        } finally {
          P.loading = !1;
        }
      } else
        this.fetchRemote(l).catch(() => {
        });
    })();
    return this.inFlightPromise = r.finally(() => {
      this.inFlightPromise === r && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(u) {
    const { ghUser: l, ghToken: r } = await vt();
    if (!l && !r) {
      P.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const p = Be(r), m = [], S = /* @__PURE__ */ new Set();
    if (l)
      try {
        const b = `https://api.github.com/users/${encodeURIComponent(l)}/repos?type=owner&sort=updated&per_page=100`, y = await fetch(b, { method: "GET", headers: p, signal: u });
        if (y.ok) {
          const L = await y.json();
          if (Array.isArray(L))
            for (const G of L)
              G && G.id && !S.has(G.id) && (S.add(G.id), m.push(G));
        }
      } catch (b) {
        if (b.name === "AbortError") throw b;
      }
    if (r)
      try {
        const y = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: p, signal: u });
        if (y.ok) {
          const L = await y.json();
          if (Array.isArray(L))
            for (const G of L)
              G && G.id && !S.has(G.id) && (S.add(G.id), m.push(G));
        }
      } catch (b) {
        if (b.name === "AbortError") throw b;
      }
    if (!m.length) {
      P.repos.length || (P.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const C = m.map((b) => {
      const y = b.full_name || `${b.owner?.login || l}/${b.name}`, L = b.name, G = P.repoGroupsMap[y] || P.repoGroupsMap[L] || P.repoGroupsMap[y.toLowerCase()] || P.repoGroupsMap[L.toLowerCase()] || [];
      return {
        id: b.id,
        name: b.name,
        fullName: y,
        description: b.description || "",
        isPrivate: !!b.private,
        isFork: !!b.fork,
        htmlUrl: b.html_url || `https://github.com/${l}/${b.name}`,
        language: b.language || null,
        stargazersCount: Number(b.stargazers_count) || 0,
        forksCount: Number(b.forks_count) || 0,
        openIssuesCount: Number(b.open_issues_count) || 0,
        topics: Array.isArray(b.topics) ? b.topics.map((U) => String(U).toLowerCase()) : [],
        localGroups: G,
        updatedAt: b.updated_at || "",
        pushedAt: b.pushed_at || "",
        defaultBranch: b.default_branch || "main"
      };
    });
    this.hydrateRepos(C), await We.set(Ye, C, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(u) {
    let l = !1;
    P.repos = u.map((r) => {
      const p = P.repoGroupsMap[r.fullName] || P.repoGroupsMap[r.name] || P.repoGroupsMap[r.fullName.toLowerCase()] || P.repoGroupsMap[r.name.toLowerCase()], m = r.localGroups && r.localGroups.length ? r.localGroups : null, S = qt(r, P.customGroups), C = (p && p.length ? p : null) || m || S, b = C ? [...new Set(C.filter(Boolean))] : [];
      return b.length && (!P.repoGroupsMap[r.fullName] || !P.repoGroupsMap[r.fullName].length) && (P.repoGroupsMap[r.fullName] = b, l = !0), {
        ...r,
        localGroups: b
      };
    }), l && this.persistGroupsMap();
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(u, l) {
    const r = Ne(l);
    r && (u.localGroups.includes(r) || u.localGroups.push(r), P.repoGroupsMap[u.fullName] = [...u.localGroups], await this.persistGroupsMap(), await We.set(Ye, P.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(u, l) {
    u.localGroups = u.localGroups.filter((r) => r !== l), P.repoGroupsMap[u.fullName] = [...u.localGroups], await this.persistGroupsMap(), await We.set(Ye, P.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(u, l) {
    if (!l)
      u.localGroups = [];
    else {
      const r = Ne(l);
      if (!r) return;
      u.localGroups = [r];
    }
    P.repoGroupsMap[u.fullName] = [...u.localGroups], await this.persistGroupsMap(), await We.set(Ye, P.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(u) {
    const l = Ne(u);
    return l ? P.customGroups.includes(l) ? (alert(`分组「${l}」已存在。`), null) : (P.customGroups.push(l), await this.persistGroups(), l) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(u, l) {
    const r = Ne(l);
    return r ? u === r ? !0 : P.customGroups.includes(r) ? (alert(`已存在名为「${r}」的分组。`), !1) : (P.customGroups = P.customGroups.map((p) => p === u ? r : p), P.repos.forEach((p) => {
      p.localGroups.includes(u) && (p.localGroups = p.localGroups.map((m) => m === u ? r : m), P.repoGroupsMap[p.fullName] = [...p.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(u) {
    const l = P.repos.filter((p) => p.localGroups.includes(u)).length, r = l > 0 ? `确定删除分组「${u}」吗？
该分组下的 ${l} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${u}」吗？`;
    return confirm(r) ? (P.customGroups = P.customGroups.filter((p) => p !== u), P.repos.forEach((p) => {
      p.localGroups.includes(u) && (p.localGroups = p.localGroups.filter((m) => m !== u), P.repoGroupsMap[p.fullName] = [...p.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let u = null, l = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const r = await chrome.storage.local.get([Ve, Ke]);
        u = r?.[Ve], l = r?.[Ke];
      }
      if (!u || !Array.isArray(u)) {
        const r = localStorage.getItem(Ve);
        r && (u = JSON.parse(r));
      }
      if (!l || typeof l != "object") {
        const r = localStorage.getItem(Ke);
        r && (l = JSON.parse(r));
      }
      Array.isArray(u) && (P.customGroups = u.map(Ne).filter(Boolean)), l && typeof l == "object" && (P.repoGroupsMap = l);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const u = { ...P.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Ke]: u }), localStorage.setItem(Ke, JSON.stringify(u));
    } catch {
    }
  }
  async persistGroups() {
    const u = Array.from(new Set(P.customGroups.map(Ne).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Ve]: u }), localStorage.setItem(Ve, JSON.stringify(u));
    } catch {
    }
  }
}
const fe = Oe.getInstance(), vs = { class: "my-repos-workspace" }, bs = {
  key: 0,
  class: "error-banner"
}, ys = { class: "shelf-header" }, _s = { class: "shelf-left" }, ws = { class: "shelf-badge" }, ks = { class: "shelf-right" }, $s = ["title"], Cs = ["onDragstart", "onContextmenu"], Ss = { class: "repo-card-head" }, Gs = ["title", "onClick"], Rs = {
  key: 0,
  class: "badge-repo-visibility private"
}, Ms = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Ts = ["title"], Ds = {
  key: 1,
  class: "repo-topics-row"
}, Ls = { class: "repo-card-footer" }, As = { class: "meta-left" }, Hs = {
  key: 0,
  class: "meta-item lang"
}, xs = { class: "meta-item" }, Es = {
  key: 1,
  class: "meta-item"
}, Is = ["title"], Us = { class: "board-columns-track" }, Ns = ["onDragover", "onDragleave", "onDrop"], Ps = { class: "column-header" }, Os = {
  key: 0,
  class: "column-title-group"
}, Fs = ["title"], js = { class: "badge-count" }, Bs = {
  key: 1,
  class: "column-rename-group"
}, zs = ["onKeydown"], qs = ["onClick"], Ws = { class: "column-actions" }, Ys = ["onClick"], Vs = {
  key: 0,
  class: "col-popover-menu"
}, Ks = ["onClick"], Xs = ["onClick"], Qs = { class: "column-cards-scroll" }, Js = ["onDragstart", "onContextmenu"], Zs = { class: "repo-card-head" }, eo = ["title", "onClick"], to = {
  key: 0,
  class: "badge-repo-visibility private"
}, so = {
  key: 1,
  class: "badge-repo-visibility fork"
}, oo = ["title"], no = { class: "repo-topics-row" }, ao = { class: "topic-chip active-chip" }, lo = ["onClick"], ro = { class: "repo-card-footer" }, io = { class: "meta-left" }, uo = {
  key: 0,
  class: "meta-item lang"
}, co = { class: "meta-item" }, po = {
  key: 1,
  class: "meta-item"
}, ho = { class: "meta-date" }, go = {
  key: 0,
  class: "empty-column-placeholder"
}, mo = { class: "board-column new-column-slot" }, fo = {
  key: 1,
  class: "new-column-composer"
}, vo = { class: "composer-actions" }, bo = ["onClick"], yo = /* @__PURE__ */ Se({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(w) {
    const u = w, l = R(""), r = R(!1), p = R(null), m = R(""), S = R(null), C = R(null), b = R(null), y = R(!1);
    function L() {
      y.value = !y.value;
    }
    function G(g) {
      const h = b.value;
      h && (Math.abs(g.deltaX) > Math.abs(g.deltaY) && g.deltaX !== 0 || g.deltaY !== 0 && (g.preventDefault(), h.scrollLeft += g.deltaY));
    }
    const U = R(null), I = R(null), A = R(null);
    let H = null, z = 0;
    const D = Ee({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), x = R(null), Q = R(!1);
    function ee() {
      D.visible = !1, x.value = null;
    }
    function ie(g, h, f) {
      g.preventDefault(), g.stopPropagation();
      let M = g.clientX, de = g.clientY;
      M > window.innerWidth - 200 && (M = window.innerWidth - 210), de > window.innerHeight - 240 && (de = window.innerHeight - 245), D.x = M, D.y = de, D.repo = h, D.fromGroup = f, D.visible = !0, x.value = "folder", Q.value = M > window.innerWidth - 380;
    }
    async function ne() {
      const g = D.repo;
      ee(), g && await fe.moveRepoToGroup(g, null);
    }
    async function N(g) {
      const h = D.repo;
      ee(), h && await fe.moveRepoToGroup(h, g);
    }
    async function O() {
      const g = D.repo;
      if (ee(), !!g)
        try {
          await navigator.clipboard.writeText(g.htmlUrl), St.show({
            appName: "GitHub",
            title: E("github.myRepos.copiedUrlTitle"),
            message: E("github.myRepos.copiedUrlMsg", { name: g.name })
          });
        } catch {
        }
    }
    async function F() {
      const g = D.repo;
      if (ee(), !!g)
        try {
          const h = `git clone ${g.htmlUrl}.git`;
          await navigator.clipboard.writeText(h), St.show({
            appName: "GitHub",
            title: E("github.myRepos.copiedCloneTitle"),
            message: h
          });
        } catch {
        }
    }
    function q() {
      const g = D.repo;
      ee(), g && ze(g.htmlUrl);
    }
    function W() {
      const g = D.repo;
      ee(), g && Lt.open({
        fullName: g.fullName,
        description: g.description || "",
        stars: g.stargazersCount,
        language: g.language || void 0,
        updated: g.pushedAt
      });
    }
    function oe(g) {
      g.target?.closest(".gh-repo-context-menu") || D.visible && ee();
    }
    function le(g) {
      g.key === "Escape" && D.visible && ee();
    }
    const ue = ae(() => P.customGroups), me = ae(() => P.repos), ye = ae(() => me.value.filter((g) => !g.localGroups.length));
    function ge(g) {
      return me.value.filter((h) => h.localGroups.includes(g));
    }
    async function _e() {
      const g = l.value.trim();
      if (!g) return;
      await fe.createGroup(g) && (l.value = "", r.value = !1);
    }
    function Me(g) {
      S.value = g, m.value = g, p.value = null;
    }
    async function Re(g) {
      const h = m.value.trim();
      if (!h || h === g) {
        S.value = null;
        return;
      }
      await fe.renameGroup(g, h) && (S.value = null);
    }
    async function De(g) {
      p.value = null, await fe.deleteGroup(g);
    }
    async function Le(g, h) {
      await fe.removeRepoFromGroup(g, h);
    }
    function $(g) {
      const h = C.value;
      if (!h) return;
      const M = g.target?.closest(".column-cards-scroll");
      if (M && M.scrollHeight > M.clientHeight && !g.shiftKey && g.deltaX === 0) {
        const de = M.scrollTop <= 0 && g.deltaY < 0, Ze = M.scrollTop + M.clientHeight >= M.scrollHeight - 1 && g.deltaY > 0;
        if (!de && !Ze)
          return;
      }
      Math.abs(g.deltaX) > Math.abs(g.deltaY) && g.deltaX !== 0 || g.deltaY !== 0 && (g.preventDefault(), h.scrollLeft += g.deltaY);
    }
    function a(g) {
      if (!U.value || !C.value) return;
      g.preventDefault();
      const h = g.deltaX !== 0 ? g.deltaX : g.deltaY;
      C.value.scrollLeft += h;
    }
    function v() {
      if (H !== null) return;
      const g = () => {
        C.value && z !== 0 ? (C.value.scrollLeft += z, H = requestAnimationFrame(g)) : ce();
      };
      H = requestAnimationFrame(g);
    }
    function ce() {
      H !== null && (cancelAnimationFrame(H), H = null), z = 0;
    }
    function pe(g) {
      if (!U.value || !C.value) return;
      const h = C.value.getBoundingClientRect(), f = 100;
      if (g > h.right - f) {
        const M = Math.min(1, Math.max(0.1, (g - (h.right - f)) / f));
        z = Math.round(M * 20), v();
      } else if (g < h.left + f) {
        const M = Math.min(1, Math.max(0.1, (h.left + f - g) / f));
        z = -Math.round(M * 20), v();
      } else
        ce();
    }
    function re(g) {
      U.value && (g.preventDefault(), pe(g.clientX));
    }
    function Te(g, h, f) {
      ee(), U.value = h, I.value = f, g.dataTransfer && (g.dataTransfer.effectAllowed = "move", g.dataTransfer.setData("text/plain", `${h.id}:${f}`)), window.addEventListener("wheel", a, { passive: !1 });
    }
    function we() {
      U.value = null, I.value = null, A.value = null, ce(), window.removeEventListener("wheel", a);
    }
    function $e(g, h) {
      U.value && (g.preventDefault(), g.dataTransfer && (g.dataTransfer.dropEffect = "move"), A.value = h, pe(g.clientX));
    }
    function ke(g, h) {
      const f = g.currentTarget, M = g.relatedTarget;
      f?.contains(M) || A.value === h && (A.value = null);
    }
    async function Je(g, h) {
      g.preventDefault();
      const f = U.value, M = I.value;
      we(), f && (h === "default" ? M && M !== "default" ? await fe.removeRepoFromGroup(f, M) : await fe.moveRepoToGroup(f, null) : (await fe.addRepoToGroup(f, h), M && M !== "default" && M !== h && await fe.removeRepoFromGroup(f, M)));
    }
    function ze(g) {
      window.open(g, "_blank", "noopener,noreferrer");
    }
    function qe(g) {
      if (!g) return "";
      try {
        const h = new Date(g);
        return `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, "0")}-${String(h.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return he(
      () => u.active,
      (g) => {
        ee(), g && fe.load();
      }
    ), lt(() => {
      window.addEventListener("pointerdown", oe), window.addEventListener("keydown", le), fe.load();
    }), rt(() => {
      ce(), window.removeEventListener("wheel", a), window.removeEventListener("pointerdown", oe), window.removeEventListener("keydown", le);
    }), (g, h) => (t(), s("div", vs, [
      n(P).errorMessage ? (t(), s("div", bs, [
        e("span", null, "⚠️ " + o(n(P).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: h[0] || (h[0] = (f) => n(fe).load(!0))
        }, "重试")
      ])) : k("", !0),
      e("section", {
        class: Y(["default-shelf-area", { "is-collapsed": y.value, "drop-active": A.value === "default" }]),
        onDragover: h[1] || (h[1] = (f) => $e(f, "default")),
        onDragleave: h[2] || (h[2] = (f) => ke(f, "default")),
        onDrop: h[3] || (h[3] = (f) => Je(f, "default"))
      }, [
        e("header", ys, [
          e("div", _s, [
            h[20] || (h[20] = e("span", { class: "shelf-icon" }, "📁", -1)),
            h[21] || (h[21] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", ws, o(ye.value.length), 1),
            h[22] || (h[22] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", ks, [
            ye.value.length ? (t(), s("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: y.value ? n(E)("github.myRepos.expandShelf") : n(E)("github.myRepos.collapseShelf"),
              onClick: L
            }, o(y.value ? n(E)("github.myRepos.expandBtn") : n(E)("github.myRepos.collapseBtn")), 9, $s)) : k("", !0)
          ])
        ]),
        ye.value.length ? be((t(), s("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: b,
          class: "shelf-cards-scroll",
          onWheel: G
        }, [
          (t(!0), s(B, null, Z(ye.value, (f) => (t(), s("div", {
            key: f.id,
            class: Y(["repo-card shelf-card", { "card-dragging": U.value?.id === f.id }]),
            draggable: "true",
            onDragstart: (M) => Te(M, f, "default"),
            onDragend: we,
            onContextmenu: (M) => ie(M, f, "default")
          }, [
            e("div", Ss, [
              e("span", {
                class: "repo-name",
                title: f.fullName,
                onClick: (M) => ze(f.htmlUrl)
              }, o(f.name), 9, Gs),
              f.isPrivate ? (t(), s("span", Rs, "私有")) : k("", !0),
              f.isFork ? (t(), s("span", Ms, "Fork")) : k("", !0)
            ]),
            f.description ? (t(), s("p", {
              key: 0,
              class: "repo-desc",
              title: f.description
            }, o(f.description), 9, Ts)) : k("", !0),
            f.topics.length ? (t(), s("div", Ds, [
              (t(!0), s(B, null, Z(f.topics, (M) => (t(), s("span", {
                key: M,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + o(M), 1))), 128))
            ])) : k("", !0),
            e("div", Ls, [
              e("div", As, [
                f.language ? (t(), s("span", Hs, [
                  h[23] || (h[23] = e("span", { class: "lang-color" }, null, -1)),
                  X(o(f.language), 1)
                ])) : k("", !0),
                e("span", xs, "⭐ " + o(f.stargazersCount), 1),
                f.forksCount ? (t(), s("span", Es, "🍴 " + o(f.forksCount), 1)) : k("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + f.updatedAt
              }, o(qe(f.pushedAt || f.updatedAt)), 9, Is)
            ])
          ], 42, Cs))), 128))
        ], 544)), [
          [je, !y.value]
        ]) : k("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: C,
        class: "board-viewport",
        onWheel: $,
        onDragover: re
      }, [
        e("div", Us, [
          (t(!0), s(B, null, Z(ue.value, (f) => (t(), s("section", {
            key: f,
            class: Y(["board-column topic-column", { "drop-active": A.value === f }]),
            onDragover: (M) => $e(M, f),
            onDragleave: (M) => ke(M, f),
            onDrop: (M) => Je(M, f)
          }, [
            e("header", Ps, [
              S.value !== f ? (t(), s("div", Os, [
                h[24] || (h[24] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + f
                }, " 📁 " + o(f), 9, Fs),
                e("span", js, o(ge(f).length), 1)
              ])) : (t(), s("div", Bs, [
                be(e("input", {
                  "onUpdate:modelValue": h[4] || (h[4] = (M) => m.value = M),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    et((M) => Re(f), ["enter"]),
                    h[5] || (h[5] = et((M) => S.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, zs), [
                  [Ie, m.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (M) => Re(f)
                }, "✓", 8, qs),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: h[6] || (h[6] = (M) => S.value = null)
                }, "✕")
              ])),
              e("div", Ws, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (M) => p.value = p.value === f ? null : f
                }, "•••", 8, Ys),
                p.value === f ? (t(), s("div", Vs, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (M) => Me(f)
                  }, " 重命名分组 ", 8, Ks),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (M) => De(f)
                  }, " 删除分组 ", 8, Xs)
                ])) : k("", !0)
              ])
            ]),
            e("div", Qs, [
              (t(!0), s(B, null, Z(ge(f), (M) => (t(), s("div", {
                key: M.id,
                class: Y(["repo-card", { "card-dragging": U.value?.id === M.id }]),
                draggable: "true",
                onDragstart: (de) => Te(de, M, f),
                onDragend: we,
                onContextmenu: (de) => ie(de, M, f)
              }, [
                e("div", Zs, [
                  e("span", {
                    class: "repo-name",
                    title: M.fullName,
                    onClick: (de) => ze(M.htmlUrl)
                  }, o(M.name), 9, eo),
                  M.isPrivate ? (t(), s("span", to, "私有")) : k("", !0),
                  M.isFork ? (t(), s("span", so, "Fork")) : k("", !0)
                ]),
                M.description ? (t(), s("p", {
                  key: 0,
                  class: "repo-desc",
                  title: M.description
                }, o(M.description), 9, oo)) : k("", !0),
                e("div", no, [
                  e("span", ao, [
                    X(" 📁 " + o(f) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: te((de) => Le(M, f), ["stop"])
                    }, "✕", 8, lo)
                  ]),
                  (t(!0), s(B, null, Z(M.topics, (de) => (t(), s("span", {
                    key: de,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + o(de), 1))), 128))
                ]),
                e("div", ro, [
                  e("div", io, [
                    M.language ? (t(), s("span", uo, [
                      h[25] || (h[25] = e("span", { class: "lang-color" }, null, -1)),
                      X(o(M.language), 1)
                    ])) : k("", !0),
                    e("span", co, "⭐ " + o(M.stargazersCount), 1),
                    M.forksCount ? (t(), s("span", po, "🍴 " + o(M.forksCount), 1)) : k("", !0)
                  ]),
                  e("span", ho, o(qe(M.pushedAt || M.updatedAt)), 1)
                ])
              ], 42, Js))), 128)),
              ge(f).length ? k("", !0) : (t(), s("div", go, [...h[26] || (h[26] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, Ns))), 128)),
          e("section", mo, [
            r.value ? (t(), s("div", fo, [
              h[28] || (h[28] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              be(e("input", {
                "onUpdate:modelValue": h[8] || (h[8] = (f) => l.value = f),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  et(_e, ["enter"]),
                  h[9] || (h[9] = et((f) => r.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [Ie, l.value]
              ]),
              e("div", vo, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: _e
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: h[10] || (h[10] = (f) => r.value = !1)
                }, o(n(E)("common.cancel")), 1)
              ])
            ])) : (t(), s("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: h[7] || (h[7] = (f) => r.value = !0)
            }, [...h[27] || (h[27] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (t(), ve(mt, { to: "body" }, [
        D.visible && D.repo ? (t(), s("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ot({ left: `${D.x}px`, top: `${D.y}px` }),
          onClick: h[18] || (h[18] = te(() => {
          }, ["stop"])),
          onContextmenu: h[19] || (h[19] = te(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: Y(["gh-menu-has-sub", { "is-active": x.value === "folder" }]),
            onMouseenter: h[13] || (h[13] = (f) => x.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: h[11] || (h[11] = te((f) => x.value = x.value === "folder" ? null : "folder", ["stop"]))
            }, [...h[29] || (h[29] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: Y(["gh-sub-flyout", { "flyout-left": Q.value }]),
              onClick: h[12] || (h[12] = te(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: Y(["fo-cover-menu-item", { primary: !D.repo.localGroups.length }]),
                type: "button",
                onClick: ne
              }, o(D.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (t(!0), s(B, null, Z(ue.value, (f) => (t(), s("button", {
                key: f,
                class: Y(["fo-cover-menu-item", { primary: D.repo.localGroups.includes(f) }]),
                type: "button",
                onClick: (M) => N(f)
              }, o(D.repo.localGroups.includes(f) ? "✓ " : "  ") + "📁 " + o(f), 11, bo))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[14] || (h[14] = (f) => x.value = null),
            onClick: O
          }, o(n(E)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[15] || (h[15] = (f) => x.value = null),
            onClick: F
          }, o(n(E)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[16] || (h[16] = (f) => x.value = null),
            onClick: W
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[17] || (h[17] = (f) => x.value = null),
            onClick: q
          }, o(n(E)("github.myRepos.openInGitHub")), 33)
        ], 36)) : k("", !0)
      ]))
    ]));
  }
}), _o = /* @__PURE__ */ Ge(yo, [["__scopeId", "data-v-117c5a31"]]), Ce = Ee({
  uncatPage: 1,
  pageSize: 10
});
class Fe {
  static getInstance() {
    return Fe.instance || (Fe.instance = new Fe()), Fe.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && Ce.uncatPage++;
  }
  prevUncatPage() {
    Ce.uncatPage > 1 && Ce.uncatPage--;
  }
  setUncatPage(u) {
    const l = Math.max(1, Math.min(u, this.uncatTotalPages));
    Ce.uncatPage = l;
  }
  get uncatPage() {
    return Ce.uncatPage;
  }
  get uncatTotalPages() {
    const u = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(u / Ce.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const u = se.searchQuery.trim().toLowerCase(), l = se.repos.filter((r) => nt(r.full_name).length === 0);
    return u ? l.filter(
      (r) => r.full_name.toLowerCase().includes(u) || r.description && r.description.toLowerCase().includes(u) || r.language && r.language.toLowerCase().includes(u) || r.topics && r.topics.some((p) => p.toLowerCase().includes(u))
    ) : l;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const u = this.filteredUncatRepos, r = (Math.min(Ce.uncatPage, this.uncatTotalPages) - 1) * Ce.pageSize;
    return u.slice(r, r + Ce.pageSize);
  }
  /**
   * 各个本地分组板块列表（根据当前激活的大分组标签过滤）
   */
  get lists() {
    const u = se.activeSection || "默认";
    return se.lists.filter((l) => (l.section || "默认") === u);
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(u) {
    const l = se.searchQuery.trim().toLowerCase(), r = se.repos.filter((p) => nt(p.full_name).includes(u));
    return l ? r.filter(
      (p) => p.full_name.toLowerCase().includes(l) || p.description && p.description.toLowerCase().includes(l) || p.language && p.language.toLowerCase().includes(l) || p.topics && p.topics.some((m) => m.toLowerCase().includes(l))
    ) : r;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(u, l) {
    await K.dropRepositoryIntoFolder(u, l);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(u, l) {
    await K.toggleRepoList(u, l);
  }
}
const J = Fe.getInstance(), Pe = {
  mode: "idle",
  activeDragRepo: null,
  activeDragFromList: null,
  hoverTargetColumn: null,
  draggingColumnId: null,
  hoverColumnId: null,
  repoMenu: null,
  columnMenu: null
};
class wo {
  constructor() {
    this._state = { ...Pe }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.githubStarsBoard = this);
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
  subscribe(u) {
    return this._listeners.add(u), () => {
      this._listeners.delete(u);
    };
  }
  _setState(u) {
    this._state = u;
    for (const l of this._listeners)
      l(u);
  }
  send(u) {
    const l = this._state;
    switch (u.type) {
      case "START_DRAG_REPO":
        return this._setState({
          mode: "dragging_repo",
          activeDragRepo: u.repo,
          activeDragFromList: u.fromList,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_TARGET_COLUMN":
        return l.mode === "dragging_repo" ? (this._setState({
          ...l,
          hoverTargetColumn: u.columnId
        }), !0) : !1;
      case "END_DRAG_REPO":
        return l.mode === "dragging_repo" ? (this._setState({ ...Pe }), !0) : !1;
      case "START_DRAG_COLUMN":
        return this._setState({
          mode: "dragging_column",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: u.columnId,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_COLUMN_REORDER":
        return l.mode === "dragging_column" ? (this._setState({
          ...l,
          hoverColumnId: u.columnId
        }), !0) : !1;
      case "END_DRAG_COLUMN":
        return l.mode === "dragging_column" ? (this._setState({ ...Pe }), !0) : !1;
      case "OPEN_REPO_MENU":
        return this._setState({
          mode: "repo_context_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: u.payload,
          columnMenu: null
        }), !0;
      case "CLOSE_REPO_MENU":
        return l.mode === "repo_context_menu" ? (this._setState({ ...Pe }), !0) : !1;
      case "OPEN_COLUMN_MENU":
        return this._setState({
          mode: "column_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: u.payload
        }), !0;
      case "CLOSE_COLUMN_MENU":
        return l.mode === "column_menu" ? (this._setState({ ...Pe }), !0) : !1;
      case "RESET_IDLE":
        return this._setState({ ...Pe }), !0;
      default:
        return !1;
    }
  }
}
const ko = { class: "stars-board-workspace" }, $o = ["data-gh-list-drop"], Co = { class: "shelf-header" }, So = { class: "shelf-left" }, Go = { class: "shelf-badge" }, Ro = { class: "shelf-right" }, Mo = {
  key: 0,
  class: "shelf-pager"
}, To = ["disabled"], Do = { class: "pager-text" }, Lo = ["disabled"], Ao = ["title"], Ho = {
  key: 0,
  class: "shelf-cards-scroll"
}, xo = ["onClick", "onDragstart", "onContextmenu"], Eo = ["onClick"], Io = { class: "gh-card-head" }, Uo = ["src"], No = ["href", "title"], Po = { class: "owner" }, Oo = { class: "gh-card-body" }, Fo = { class: "gh-card-badges" }, jo = ["title"], Bo = ["title"], zo = ["title"], qo = { class: "meta" }, Wo = { class: "gh-stars" }, Yo = {
  key: 0,
  class: "gh-lang"
}, Vo = { class: "gh-updated" }, Ko = { class: "shelf-next-content" }, Xo = { class: "shelf-next-sub" }, Qo = {
  key: 2,
  class: "shelf-empty",
  role: "status"
}, Jo = {
  key: 0,
  class: "gh-drilldown-header"
}, Zo = { class: "gh-drilldown-current" }, en = { class: "gh-drilldown-sub-count" }, tn = {
  key: 0,
  class: "board-columns-track"
}, sn = { class: "column-cards-scroll" }, on = {
  key: 1,
  class: "board-columns-track"
}, nn = ["data-gh-list-drop", "onDragover", "onDragleave", "onDrop"], an = ["title"], ln = ["onClick"], rn = ["title"], un = {
  key: 0,
  class: "col-pinned-icon",
  title: "已置顶分组"
}, cn = { class: "badge-count" }, dn = {
  key: 1,
  class: "col-sub-badge",
  title: "点击下钻查看所有子分组"
}, pn = { class: "column-actions" }, hn = ["onDragstart", "onClick"], gn = { class: "column-cards-scroll" }, mn = ["onClick", "onDragstart", "onContextmenu"], fn = ["onClick"], vn = { class: "gh-card-head" }, bn = ["src"], yn = ["href", "title"], _n = { class: "owner" }, wn = { class: "gh-card-body" }, kn = { class: "gh-card-badges" }, $n = ["title"], Cn = ["onClick"], Sn = ["title"], Gn = ["title"], Rn = ["title"], Mn = { class: "meta" }, Tn = { class: "gh-stars" }, Dn = {
  key: 0,
  class: "gh-lang"
}, Ln = { class: "gh-updated" }, An = {
  key: 0,
  class: "empty-column-dropzone"
}, Hn = { class: "board-column add-column-panel" }, xn = ["title"], En = ["onClick"], In = /* @__PURE__ */ Se({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(w) {
    const u = w, l = R(null), r = R(null), p = R(!1);
    function m() {
      p.value = !p.value;
    }
    function S(i) {
      const c = r.value;
      c && (Math.abs(i.deltaX) > Math.abs(i.deltaY) && i.deltaX !== 0 || i.deltaY !== 0 && (i.preventDefault(), c.scrollLeft += i.deltaY));
    }
    const C = ae(() => se.loading), b = ae(() => C.value && !se.repos.length), y = R(null);
    function L(i) {
      if (!i) return null;
      const c = i.match(/^(.+?)[/／](.+)$/);
      if (!c) return null;
      const d = c[1].trim(), _ = c[2].trim();
      return !d || !_ ? null : { parentPrefix: d, childName: _ };
    }
    function G(i) {
      const c = L(i);
      if (!c) return null;
      const d = c.parentPrefix.toLowerCase(), _ = J.lists.find((V) => V.name.trim().toLowerCase() === d);
      return _ ? _.name : null;
    }
    function U(i) {
      const c = i.trim().toLowerCase();
      return J.lists.filter((d) => {
        const _ = L(d.name);
        return _ !== null && _.parentPrefix.toLowerCase() === c;
      });
    }
    function I(i) {
      return U(i).length > 0;
    }
    const A = ae(() => y.value ? U(y.value).length : 0);
    function H(i) {
      y.value = i, l.value && (l.value.scrollLeft = 0);
    }
    const z = ae(() => {
      const i = J.lists;
      if (!y.value)
        return i.filter((V) => G(V.name) === null);
      const c = y.value.trim().toLowerCase(), d = i.find((V) => V.name.trim().toLowerCase() === c), _ = U(y.value);
      return !d && !_.length ? (y.value = null, i.filter((V) => G(V.name) === null)) : d ? [d, ..._] : _;
    });
    he(() => se.activeSection, () => {
      y.value = null;
    });
    function D() {
      K.promptCreateFolder(y.value || void 0);
    }
    const x = new wo(), Q = R(x.activeDragRepo), ee = R(x.activeDragFromList), ie = R(x.hoverTargetColumn);
    let ne = null, N = 0;
    function O() {
      ne === null && (ne = window.setInterval(() => {
        !l.value || N === 0 || (l.value.scrollLeft += N);
      }, 16));
    }
    function F() {
      ne !== null && (clearInterval(ne), ne = null), N = 0;
    }
    const q = Ee({
      visible: !1,
      x: 0,
      y: 0,
      list: null
    }), W = Ee({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), oe = R(null), le = R(!1), ue = R(x.draggingColumnId), me = R(x.hoverColumnId), ye = x.subscribe((i) => {
      Q.value = i.activeDragRepo, ee.value = i.activeDragFromList, ie.value = i.hoverTargetColumn, ue.value = i.draggingColumnId, me.value = i.hoverColumnId, q.visible = i.mode === "column_menu" && i.columnMenu !== null, q.x = i.columnMenu?.x ?? 0, q.y = i.columnMenu?.y ?? 0, q.list = i.columnMenu?.list ?? null, W.visible = i.mode === "repo_context_menu" && i.repoMenu !== null, W.x = i.repoMenu?.x ?? 0, W.y = i.repoMenu?.y ?? 0, W.repo = i.repoMenu?.repo ?? null, W.fromList = i.repoMenu?.fromList ?? null, oe.value = i.repoMenu?.activeSubMenu ?? null, le.value = i.repoMenu?.isFlyoutLeft ?? !1;
    });
    function ge() {
      x.send({ type: "CLOSE_COLUMN_MENU" });
    }
    function _e(i, c) {
      i.preventDefault(), i.stopPropagation();
      const d = 150, _ = 130, V = Math.min(i.clientX, window.innerWidth - d - 10), Ue = Math.min(i.clientY, window.innerHeight - _ - 10);
      x.send({ type: "OPEN_COLUMN_MENU", payload: { x: V, y: Ue, list: c } });
    }
    async function Me() {
      const i = q.list;
      ge(), i && await K.renameFolder(i.id, i.name);
    }
    async function Re() {
      const i = q.list;
      ge(), i && await K.pinFolder(i.id);
    }
    async function De() {
      const i = q.list;
      ge(), i && await K.deleteFolder(i.name);
    }
    function Le(i, c) {
      x.send({ type: "START_DRAG_COLUMN", columnId: c.id }), i.dataTransfer && (i.dataTransfer.effectAllowed = "move", i.dataTransfer.setData("application/x-gh-col-id", c.id));
    }
    function $() {
      x.send({ type: "END_DRAG_COLUMN" });
    }
    function a(i, c) {
      !ue.value || ue.value === c || (i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = "move"), x.send({ type: "HOVER_COLUMN_REORDER", columnId: c }));
    }
    function v(i, c) {
      me.value === c && x.send({ type: "HOVER_COLUMN_REORDER", columnId: null });
    }
    async function ce(i, c) {
      if (!ue.value || ue.value === c) return;
      i.preventDefault();
      const d = ue.value;
      $(), await K.reorderFolders(d, c);
    }
    function pe() {
      x.send({ type: "CLOSE_REPO_MENU" });
    }
    function re(i, c, d) {
      i.preventDefault(), i.stopPropagation();
      const _ = 190, V = 270, Ue = Math.min(i.clientX, window.innerWidth - _ - 10), xt = Math.min(i.clientY, window.innerHeight - V - 10);
      x.send({
        type: "OPEN_REPO_MENU",
        payload: {
          x: Ue,
          y: xt,
          repo: c,
          fromList: d,
          activeSubMenu: "folder",
          isFlyoutLeft: Ue > window.innerWidth - 380
        }
      });
    }
    async function Te() {
      const i = W.repo;
      pe(), i && await J.moveRepoToList(i.full_name, K.UNCAT);
    }
    async function we(i) {
      const c = W.repo;
      pe(), c && await J.moveRepoToList(c.full_name, i);
    }
    async function $e() {
      const i = W.repo;
      if (pe(), !!i?.html_url)
        try {
          await navigator.clipboard.writeText(i.html_url);
        } catch {
        }
    }
    async function ke() {
      const i = W.repo;
      if (pe(), !!i?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${i.full_name}.git`);
        } catch {
        }
    }
    function Je() {
      const i = W.repo;
      pe(), i && Lt.open({
        fullName: i.full_name,
        description: i.description || "",
        stars: i.stargazers_count,
        language: i.language || void 0,
        updated: i.updated_at
      });
    }
    function ze() {
      const i = W.repo;
      pe(), i?.html_url && Ht(i.html_url);
    }
    function qe(i) {
      const c = i.target;
      !c?.closest(".fo-cover-context-menu") && !c?.closest(".col-popover-menu") && !c?.closest(".gh-list-col-menu") && x.send({ type: "RESET_IDLE" });
    }
    function g(i) {
      if (i.key === "Escape") {
        if (y.value) {
          y.value = null;
          return;
        }
        x.send({ type: "RESET_IDLE" });
      }
    }
    function h(i) {
      const c = l.value;
      if (!c) return;
      const _ = i.target?.closest(".column-cards-scroll");
      if (_ && _.scrollHeight > _.clientHeight && !i.shiftKey && i.deltaX === 0) {
        const V = _.scrollTop === 0 && i.deltaY < 0, Ue = Math.ceil(_.scrollTop + _.clientHeight) >= _.scrollHeight && i.deltaY > 0;
        if (!V && !Ue)
          return;
      }
      Math.abs(i.deltaX) > Math.abs(i.deltaY) && i.deltaX !== 0 || i.deltaY !== 0 && (i.preventDefault(), c.scrollLeft += i.deltaY);
    }
    function f(i) {
      if (!Q.value || !l.value) return;
      i.preventDefault();
      const c = i.deltaY !== 0 ? i.deltaY : i.deltaX;
      l.value.scrollLeft += c;
    }
    function M(i) {
      const c = l.value;
      if (!c) return;
      const d = c.getBoundingClientRect(), _ = 100;
      if (i > d.right - _) {
        const V = Math.min(1, Math.max(0.1, (i - (d.right - _)) / _));
        N = Math.round(V * 20), O();
      } else if (i < d.left + _) {
        const V = Math.min(1, Math.max(0.1, (d.left + _ - i) / _));
        N = -Math.round(V * 20), O();
      } else
        F();
    }
    function de(i) {
      M(i.clientX);
    }
    function Ze(i, c, d) {
      x.send({ type: "START_DRAG_REPO", repo: c, fromList: d }), i.dataTransfer && (i.dataTransfer.effectAllowed = "move", i.dataTransfer.setData(Gt, c.full_name), i.dataTransfer.setData("text/plain", `${c.full_name}:${d || "uncategorized"}`)), window.addEventListener("wheel", f, { passive: !1 });
    }
    function ut() {
      x.send({ type: "END_DRAG_REPO" }), F(), window.removeEventListener("wheel", f);
    }
    function bt(i, c) {
      !u.active || !Q.value && !Array.from(i.dataTransfer?.types || []).includes(Gt) || (i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = "move"), x.send({ type: "HOVER_TARGET_COLUMN", columnId: c }));
    }
    function yt(i, c) {
      const d = i.currentTarget;
      d && i.relatedTarget instanceof Node && d.contains(i.relatedTarget) || ie.value === c && x.send({ type: "HOVER_TARGET_COLUMN", columnId: null });
    }
    async function _t(i, c) {
      i.preventDefault();
      const d = Q.value?.full_name || It(i.dataTransfer);
      ut(), !(!u.active || !d) && await J.moveRepoToList(d, c === "uncategorized" ? K.UNCAT : c);
    }
    function ct(i) {
      it.open(i.full_name, void 0, i);
    }
    function Ht(i) {
      window.open(i, "_blank", "noopener,noreferrer");
    }
    function wt(i) {
      if (!i) return "";
      try {
        const c = new Date(i);
        return `${c.getFullYear()}-${String(c.getMonth() + 1).padStart(2, "0")}-${String(c.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return lt(() => {
      window.addEventListener("pointerdown", qe), window.addEventListener("keydown", g);
    }), rt(() => {
      ye(), x.send({ type: "RESET_IDLE" }), F(), window.removeEventListener("wheel", f), window.removeEventListener("pointerdown", qe), window.removeEventListener("keydown", g);
    }), (i, c) => (t(), s("div", ko, [
      e("section", {
        class: Y(["default-shelf-area", { "is-collapsed": p.value, "drop-active": ie.value === "uncategorized" }]),
        "data-gh-list-drop": n(K).UNCAT,
        onDragover: c[5] || (c[5] = (d) => bt(d, "uncategorized")),
        onDragleave: c[6] || (c[6] = (d) => yt(d, "uncategorized")),
        onDrop: c[7] || (c[7] = (d) => _t(d, "uncategorized"))
      }, [
        e("header", Co, [
          e("div", So, [
            c[25] || (c[25] = e("span", { class: "shelf-icon" }, "📁", -1)),
            c[26] || (c[26] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", Go, o(n(J).filteredUncatRepos.length), 1),
            c[27] || (c[27] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消本地分组归属；单排 10 个一页）", -1))
          ]),
          e("div", Ro, [
            n(J).filteredUncatRepos.length > n(Ce).pageSize ? (t(), s("div", Mo, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: n(J).uncatPage <= 1,
                title: "上一页",
                onClick: c[0] || (c[0] = //@ts-ignore
                (...d) => n(J).prevUncatPage && n(J).prevUncatPage(...d))
              }, "‹", 8, To),
              e("span", Do, o(n(J).uncatPage) + " / " + o(n(J).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: n(J).uncatPage >= n(J).uncatTotalPages,
                title: "下一页",
                onClick: c[1] || (c[1] = //@ts-ignore
                (...d) => n(J).nextUncatPage && n(J).nextUncatPage(...d))
              }, "›", 8, Lo)
            ])) : k("", !0),
            n(J).filteredUncatRepos.length ? (t(), s("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: p.value ? "展开托盘" : "收起托盘",
              onClick: m
            }, o(p.value ? "展开 ▼" : "收起 ▲"), 9, Ao)) : k("", !0)
          ])
        ]),
        b.value ? be((t(), s("div", Ho, [
          (t(), s(B, null, Z(6, (d) => e("div", {
            key: "skel-shelf-" + d,
            class: "repo gh-card shelf-card skel-card"
          }, [...c[28] || (c[28] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ], 512)), [
          [je, !p.value]
        ]) : n(J).filteredUncatRepos.length ? be((t(), s("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: r,
          class: "shelf-cards-scroll",
          onWheel: S
        }, [
          (t(!0), s(B, null, Z(n(J).pagedUncatRepos, (d) => (t(), s("article", {
            key: d.full_name,
            class: Y(["repo gh-card shelf-card", { "card-dragging": Q.value?.full_name === d.full_name }]),
            draggable: "true",
            onClick: (_) => ct(d),
            onDragstart: (_) => Ze(_, d, null),
            onDragend: ut,
            onContextmenu: (_) => re(_, d, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: te((_) => re(_, d, null), ["stop"])
            }, "⋮", 8, Eo),
            e("div", Io, [
              e("img", {
                class: "gh-owner-avatar",
                src: d.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: c[2] || (c[2] = (_) => _.target.src = "assets/github-star.svg")
              }, null, 40, Uo),
              e("a", {
                href: d.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: d.full_name,
                onClick: c[3] || (c[3] = te(() => {
                }, ["stop"]))
              }, [
                e("span", Po, o(d.owner?.login || d.full_name.split("/")[0]) + "/", 1),
                X(o(d.name), 1)
              ], 8, No)
            ]),
            e("div", Oo, [
              e("div", Fo, [
                c[29] || (c[29] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                d.topics && d.topics.length ? (t(), s(B, { key: 0 }, [
                  (t(!0), s(B, null, Z(d.topics.slice(0, 2), (_) => (t(), s("span", {
                    key: _,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + _
                  }, " #" + o(_), 9, jo))), 128)),
                  d.topics.length > 2 ? (t(), s("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: d.topics.slice(2).map((_) => "#" + _).join(" ")
                  }, " +" + o(d.topics.length - 2), 9, Bo)) : k("", !0)
                ], 64)) : k("", !0)
              ]),
              e("p", {
                class: "desc",
                title: d.description || ""
              }, o(d.description || "暂无描述"), 9, zo)
            ]),
            e("div", qo, [
              e("span", Wo, "★ " + o(d.stargazers_count), 1),
              d.language ? (t(), s("span", Yo, o(d.language), 1)) : k("", !0),
              e("span", Vo, "更新 " + o(wt(d.updated_at)), 1)
            ])
          ], 42, xo))), 128)),
          n(J).uncatPage < n(J).uncatTotalPages ? (t(), s("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: c[4] || (c[4] = //@ts-ignore
            (...d) => n(J).nextUncatPage && n(J).nextUncatPage(...d))
          }, [
            e("div", Ko, [
              c[30] || (c[30] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              c[31] || (c[31] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", Xo, o(n(J).uncatPage + 1) + " / " + o(n(J).uncatTotalPages) + " 页", 1)
            ])
          ])) : k("", !0)
        ], 544)), [
          [je, !p.value]
        ]) : p.value ? k("", !0) : (t(), s("p", Qo, o(n(se).searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库"), 1))
      ], 42, $o),
      y.value ? (t(), s("div", Jo, [
        e("button", {
          type: "button",
          class: "gh-drilldown-back-btn",
          title: "返回查看全部一级分组 (Esc)",
          onClick: c[8] || (c[8] = (d) => y.value = null)
        }, " ‹ 返回全部 "),
        c[32] || (c[32] = e("span", { class: "gh-drilldown-sep" }, "/", -1)),
        e("span", Zo, "📁 " + o(y.value), 1),
        e("span", en, " (含 " + o(A.value) + " 个子分组) ", 1),
        e("button", {
          type: "button",
          class: "gh-drilldown-exit-btn",
          title: "退出下钻视图",
          onClick: c[9] || (c[9] = (d) => y.value = null)
        }, " ✕ ")
      ])) : k("", !0),
      e("div", {
        ref_key: "boardViewportRef",
        ref: l,
        class: "board-viewport",
        onWheel: h,
        onDragover: de
      }, [
        C.value && !z.value.length ? (t(), s("div", tn, [
          (t(), s(B, null, Z(4, (d) => e("div", {
            key: "skel-col-" + d,
            class: "board-column skel-column"
          }, [
            c[34] || (c[34] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", sn, [
              (t(), s(B, null, Z(3, (_) => e("div", {
                key: "skel-col-card-" + _,
                class: "repo gh-card skel-card"
              }, [...c[33] || (c[33] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (t(), s("div", on, [
          (t(!0), s(B, null, Z(z.value, (d) => (t(), s("section", {
            key: d.id,
            class: Y(["board-column list-column", {
              "drop-active": ie.value === d.name,
              "col-dragging": ue.value === d.id,
              "col-hover-target": me.value === d.id
            }]),
            "data-gh-list-drop": d.name,
            onDragover: (_) => Q.value ? bt(_, d.name) : a(_, d.id),
            onDragleave: (_) => Q.value ? yt(_, d.name) : v(_, d.id),
            onDrop: (_) => Q.value ? _t(_, d.name) : ce(_, d.id)
          }, [
            e("header", {
              class: "column-header",
              title: I(d.name) ? `📁 ${d.name}（包含 ${U(d.name).length} 个子分组，点击下钻进入）` : "拖动此列可调换位置；右侧更多可重命名、置顶或删除"
            }, [
              e("div", {
                class: Y(["column-title-group", { "is-parent-folder": I(d.name) && !y.value }]),
                onClick: (_) => I(d.name) && !y.value && H(d.name)
              }, [
                c[35] || (c[35] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: Y(["column-title", { "title-clickable": I(d.name) && !y.value }]),
                  title: d.description || "本地分组: " + d.name
                }, " 📁 " + o(d.name), 11, rn),
                d.pinned ? (t(), s("span", un, "📌")) : k("", !0),
                e("span", cn, o(n(J).getReposForList(d.name).length), 1),
                I(d.name) && !y.value ? (t(), s("span", dn, o(U(d.name).length) + "个子分组 › ", 1)) : k("", !0)
              ], 10, ln),
              e("div", pn, [
                e("button", {
                  type: "button",
                  class: "col-more-btn col-drag-handle",
                  title: "按住拖动可调换分组位置；点击打开更多操作",
                  draggable: "true",
                  "aria-label": "分组操作与拖拽手柄",
                  onDragstart: (_) => Le(_, d),
                  onDragend: $,
                  onClick: te((_) => _e(_, d), ["stop"])
                }, "⋮", 40, hn)
              ])
            ], 8, an),
            e("div", gn, [
              (t(!0), s(B, null, Z(n(J).getReposForList(d.name), (_) => (t(), s("article", {
                key: _.full_name,
                class: Y(["repo gh-card", { "card-dragging": Q.value?.full_name === _.full_name }]),
                draggable: "true",
                onClick: (V) => ct(_),
                onDragstart: (V) => Ze(V, _, d.name),
                onDragend: ut,
                onContextmenu: (V) => re(V, _, d.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: te((V) => re(V, _, d.name), ["stop"])
                }, "⋮", 8, fn),
                e("div", vn, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: _.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: c[10] || (c[10] = (V) => V.target.src = "assets/github-star.svg")
                  }, null, 40, bn),
                  e("a", {
                    href: _.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: _.full_name,
                    onClick: c[11] || (c[11] = te(() => {
                    }, ["stop"]))
                  }, [
                    e("span", _n, o(_.owner?.login || _.full_name.split("/")[0]) + "/", 1),
                    X(o(_.name), 1)
                  ], 8, yn)
                ]),
                e("div", wn, [
                  e("div", kn, [
                    e("span", {
                      class: "gh-badge-folder",
                      title: "属于列表: " + d.name
                    }, [
                      X(" 📁 " + o(d.name) + " ", 1),
                      e("span", {
                        class: "btn-inline-remove",
                        title: "从该列表中移出",
                        role: "button",
                        tabindex: "0",
                        onClick: te((V) => n(J).removeRepoFromList(_.full_name, d.name), ["stop"])
                      }, "×", 8, Cn)
                    ], 8, $n),
                    _.topics && _.topics.length ? (t(), s(B, { key: 0 }, [
                      (t(!0), s(B, null, Z(_.topics.slice(0, 2), (V) => (t(), s("span", {
                        key: V,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + V
                      }, " #" + o(V), 9, Sn))), 128)),
                      _.topics.length > 2 ? (t(), s("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: _.topics.slice(2).map((V) => "#" + V).join(" ")
                      }, " +" + o(_.topics.length - 2), 9, Gn)) : k("", !0)
                    ], 64)) : k("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: _.description || ""
                  }, o(_.description || "暂无描述"), 9, Rn)
                ]),
                e("div", Mn, [
                  e("span", Tn, "★ " + o(_.stargazers_count), 1),
                  _.language ? (t(), s("span", Dn, o(_.language), 1)) : k("", !0),
                  e("span", Ln, "更新 " + o(wt(_.updated_at)), 1)
                ])
              ], 42, mn))), 128)),
              n(J).getReposForList(d.name).length ? k("", !0) : (t(), s("div", An, [...c[36] || (c[36] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, nn))), 128)),
          e("section", Hn, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              title: y.value ? `在「${y.value}」下新建子分组` : "新建本地分组",
              onClick: D
            }, [
              c[37] || (c[37] = e("span", { class: "plus-icon" }, "＋", -1)),
              e("span", null, o(y.value ? `新建 ${y.value} 子分组` : "新建本地分组"), 1)
            ], 8, xn)
          ])
        ]))
      ], 544),
      (t(), ve(mt, { to: "body" }, [
        W.visible && W.repo ? (t(), s("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ot({ left: `${W.x}px`, top: `${W.y}px` }),
          onClick: c[21] || (c[21] = te(() => {
          }, ["stop"])),
          onContextmenu: c[22] || (c[22] = te(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: Y(["gh-menu-has-sub", { "is-active": oe.value === "folder" }]),
            onMouseenter: c[14] || (c[14] = (d) => oe.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: c[12] || (c[12] = te((d) => oe.value = oe.value === "folder" ? null : "folder", ["stop"]))
            }, [...c[38] || (c[38] = [
              e("span", null, "移动/加入本地分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: Y(["gh-sub-flyout", { "flyout-left": le.value }]),
              onClick: c[13] || (c[13] = te(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: Te
              }, " 设为未分类 "),
              (t(!0), s(B, null, Z(n(J).lists, (d) => (t(), s("button", {
                key: d.id,
                class: Y(["fo-cover-menu-item", { primary: n(nt)(W.repo.full_name).includes(d.name) }]),
                type: "button",
                onClick: (_) => we(d.name)
              }, o(n(nt)(W.repo.full_name).includes(d.name) ? "✓ " : "  ") + "📁 " + o(d.name), 11, En))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[15] || (c[15] = (d) => oe.value = null),
            onClick: c[16] || (c[16] = (d) => ct(W.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[17] || (c[17] = (d) => oe.value = null),
            onClick: $e
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[18] || (c[18] = (d) => oe.value = null),
            onClick: ke
          }, " 复制克隆命令 (git clone) ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[19] || (c[19] = (d) => oe.value = null),
            onClick: Je
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[20] || (c[20] = (d) => oe.value = null),
            onClick: ze
          }, " 在 GitHub 打开 ", 32)
        ], 36)) : k("", !0),
        q.visible && q.list ? (t(), s("div", {
          key: 1,
          class: "fo-cover-context-menu gh-list-col-menu",
          style: ot({ left: `${q.x}px`, top: `${q.y}px` }),
          onClick: c[23] || (c[23] = te(() => {
          }, ["stop"])),
          onContextmenu: c[24] || (c[24] = te(() => {
          }, ["prevent"]))
        }, [
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: Me
          }, " ✏️ 重命名分组 "),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: Re
          }, [
            e("span", null, o(q.list?.pinned ? "📍 取消置顶" : "📌 置顶此分组"), 1)
          ]),
          e("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onClick: De
          }, " 🗑️ 删除分组 ")
        ], 36)) : k("", !0)
      ]))
    ]));
  }
}), Un = /* @__PURE__ */ Ge(In, [["__scopeId", "data-v-20d9a09f"]]), Nn = { class: "star-wrap" }, Pn = ["disabled", "title", "aria-label"], On = {
  key: 0,
  class: "star-error",
  role: "status"
}, Fn = /* @__PURE__ */ Se({
  __name: "GitHubStarButton",
  props: {
    repo: {},
    alreadyStarred: { type: Boolean }
  },
  setup(w) {
    const u = w, l = R(!1), r = R(""), p = R(""), m = ae(() => !!(u.alreadyStarred || se.ownerKey && r.value === se.ownerKey || K.token && se.repos.some((C) => C.full_name.toLowerCase() === u.repo.full_name.toLowerCase())));
    he(() => [se.ownerKey, u.repo.full_name], () => {
      r.value = "", p.value = "";
    });
    async function S() {
      if (l.value || m.value) return;
      if (!K.token) {
        p.value = "请先在 GitHub 账号设置中配置 Token。";
        return;
      }
      const C = se.ownerKey;
      if (!C) {
        p.value = "GitHub 账号正在加载，请稍后再试。";
        return;
      }
      l.value = !0, p.value = "";
      try {
        const b = await K.starRepository(u.repo, !0);
        if (C !== se.ownerKey) return;
        b ? r.value = C : p.value = at.actionText || "Star 未完成，请稍后重试。";
      } catch {
        C === se.ownerKey && (p.value = "Star 结果未确认，请先刷新核对，勿重复提交。");
      } finally {
        l.value = !1;
      }
    }
    return (C, b) => (t(), s("span", Nn, [
      e("button", {
        type: "button",
        class: Y(["star-action", { starred: m.value }]),
        disabled: l.value || m.value,
        title: m.value ? "已 Star" : "点击 Star，未点击时状态可能尚未核对",
        "aria-label": m.value ? "已 Star" : `Star ${w.repo.full_name}`,
        onClick: te(S, ["stop"])
      }, o(l.value ? "…" : m.value ? "★" : "☆"), 11, Pn),
      p.value ? (t(), s("span", On, o(p.value), 1)) : k("", !0)
    ]));
  }
}), At = /* @__PURE__ */ Ge(Fn, [["__scopeId", "data-v-e3dd27c5"]]), jn = { class: "gh-global-header" }, Bn = {
  key: 1,
  class: "gh-global-message",
  role: "status"
}, zn = {
  key: 2,
  class: "gh-global-message",
  role: "alert"
}, qn = { class: "gh-global-summary" }, Wn = { key: 0 }, Yn = {
  key: 0,
  class: "gh-global-message"
}, Vn = {
  key: 1,
  class: "gh-global-grid"
}, Kn = { class: "gh-global-card-head" }, Xn = ["onClick"], Qn = { class: "gh-global-meta" }, Jn = { key: 0 }, Zn = {
  key: 2,
  class: "gh-global-pager"
}, ea = ["disabled"], ta = ["disabled"], pt = 20, sa = /* @__PURE__ */ Se({
  __name: "GitHubGlobalSearch",
  props: {
    query: {},
    requestId: {},
    rule: {},
    embedded: { type: Boolean }
  },
  emits: ["back"],
  setup(w, { emit: u }) {
    const l = w, r = u, p = R(l.query), m = R(""), S = R(1), C = R(0), b = R(!1), y = R([]), L = R(!1), G = R("");
    let U;
    function I(z) {
      if (l.rule === "exact") return `"${z.replace(/"/g, "")}" in:name,description`;
      if (l.rule === "topic") return `topic:${z.replace(/\s+/g, "-")}`;
      if (l.rule === "smart") {
        const D = Pt[z.toLowerCase()] || [];
        if (D.length) return `${z} ${D.slice(0, 3).join(" OR ")}`;
      }
      return z;
    }
    async function A(z, D = 1) {
      const x = z.trim();
      if (!x) return;
      U?.abort();
      const Q = new AbortController();
      U = Q, p.value = x, m.value = x, S.value = D, y.value = [], C.value = 0, b.value = !1, G.value = "", L.value = !0;
      try {
        const ee = await Ut(Q.signal), ie = new URLSearchParams({ q: I(x), sort: "stars", order: "desc", per_page: String(pt), page: String(D) }), { data: ne } = await st(`/search/repositories?${ie}`, { headers: ee, signal: Q.signal, maxBytes: 2 * 1024 * 1024 });
        if (U !== Q || Q.signal.aborted) return;
        if (!Array.isArray(ne?.items)) throw new Error("GitHub 搜索响应格式异常");
        y.value = ne.items.filter((N) => typeof N?.full_name == "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(N.full_name)), C.value = typeof ne.total_count == "number" ? Math.max(0, ne.total_count) : 0, b.value = ne.incomplete_results === !0;
      } catch (ee) {
        if (U !== Q || Q.signal.aborted) return;
        G.value = ee instanceof Nt || ee instanceof Error ? ee.message : "请稍后重试";
      } finally {
        U === Q && (L.value = !1);
      }
    }
    function H(z) {
      it.open(z.full_name, void 0, z);
    }
    return he(() => l.requestId, () => {
      A(l.query);
    }, { immediate: !0 }), ft(() => {
      U?.abort();
    }), (z, D) => (t(), s("div", {
      class: Y(["gh-global-search", { "is-embedded": w.embedded }])
    }, [
      e("header", jn, [
        D[6] || (D[6] = e("div", null, [
          e("h3", null, "GitHub 仓库搜索"),
          e("p", null, "在插件内查看公开仓库和 README")
        ], -1)),
        e("button", {
          type: "button",
          class: "gh-global-back",
          onClick: D[0] || (D[0] = (x) => r("back"))
        }, o(w.embedded ? "返回首页" : "返回收藏"), 1)
      ]),
      w.embedded ? k("", !0) : (t(), s("form", {
        key: 0,
        class: "gh-global-form",
        role: "search",
        onSubmit: D[2] || (D[2] = te((x) => A(p.value), ["prevent"]))
      }, [
        be(e("input", {
          "onUpdate:modelValue": D[1] || (D[1] = (x) => p.value = x),
          type: "search",
          placeholder: "搜索 GitHub 仓库…",
          "aria-label": "搜索 GitHub 仓库"
        }, null, 512), [
          [Ie, p.value]
        ]),
        D[7] || (D[7] = e("button", { type: "submit" }, "搜索", -1))
      ], 32)),
      L.value ? (t(), s("p", Bn, "正在搜索 GitHub 仓库…")) : G.value ? (t(), s("div", zn, [
        e("p", null, "搜索失败：" + o(G.value), 1),
        e("button", {
          type: "button",
          class: "gh-global-back",
          onClick: D[3] || (D[3] = (x) => A(m.value, S.value))
        }, "重试")
      ])) : (t(), s(B, { key: 3 }, [
        e("p", qn, [
          X("“" + o(m.value) + "” · " + o(C.value.toLocaleString()) + " 个结果", 1),
          b.value ? (t(), s("span", Wn, " · GitHub 标记为不完整结果")) : k("", !0)
        ]),
        y.value.length ? (t(), s("div", Vn, [
          (t(!0), s(B, null, Z(y.value, (x) => (t(), s("article", {
            key: x.full_name,
            class: "gh-global-card"
          }, [
            e("div", Kn, [
              e("button", {
                type: "button",
                class: "gh-global-repo",
                onClick: (Q) => H(x)
              }, o(x.full_name), 9, Xn),
              Ae(At, { repo: x }, null, 8, ["repo"])
            ]),
            e("p", null, o(x.description || "暂无描述"), 1),
            e("div", Qn, [
              x.language ? (t(), s("span", Jn, o(x.language), 1)) : k("", !0),
              e("span", null, "★ " + o((x.stargazers_count || 0).toLocaleString()), 1),
              e("span", null, "⑂ " + o((x.forks_count || 0).toLocaleString()), 1)
            ])
          ]))), 128))
        ])) : (t(), s("p", Yn, "没有找到仓库，换个关键词试试。")),
        S.value > 1 || S.value * pt < Math.min(C.value, 1e3) ? (t(), s("div", Zn, [
          e("button", {
            type: "button",
            disabled: S.value <= 1,
            onClick: D[4] || (D[4] = (x) => A(m.value, S.value - 1))
          }, "‹ 上一页", 8, ea),
          e("span", null, "第 " + o(S.value) + " 页", 1),
          e("button", {
            type: "button",
            disabled: S.value * pt >= Math.min(C.value, 1e3),
            onClick: D[5] || (D[5] = (x) => A(m.value, S.value + 1))
          }, "下一页 ›", 8, ta)
        ])) : k("", !0)
      ], 64))
    ], 2));
  }
}), Mt = /* @__PURE__ */ Ge(sa, [["__scopeId", "data-v-26667dd5"]]), oa = { class: "local-search" }, na = {
  key: 0,
  class: "notice"
}, aa = {
  key: 1,
  class: "summary"
}, la = {
  key: 2,
  class: "notice"
}, ra = {
  key: 3,
  class: "grid"
}, ia = { class: "repo-head" }, ua = ["onClick"], ca = { class: "meta" }, da = { key: 0 }, pa = {
  key: 4,
  class: "pager"
}, ha = ["disabled"], ga = ["disabled"], ma = /* @__PURE__ */ Se({
  __name: "GitHubLocalSearch",
  emits: ["back"],
  setup(w, { emit: u }) {
    const l = u, r = R(1), p = ae(() => (se.repos, se.repoListNames, se.searchQuery, se.activeSection, se.loading, K.getDashboardSearchResults())), m = ae(() => p.value.slice((r.value - 1) * 20, r.value * 20)), S = ae(() => Math.max(1, Math.ceil(p.value.length / 20)));
    return he(() => se.searchQuery, () => {
      r.value = 1;
    }), he(S, (C) => {
      r.value > C && (r.value = C);
    }), (C, b) => (t(), s("div", oa, [
      e("header", null, [
        e("div", null, [
          b[3] || (b[3] = e("h3", null, "当前分类搜索", -1)),
          e("p", null, o(n(K).active) + " · “" + o(n(se).searchQuery) + "”", 1)
        ]),
        e("button", {
          type: "button",
          onClick: b[0] || (b[0] = (y) => l("back"))
        }, "返回首页")
      ]),
      n(at).accountConfigured === !1 ? (t(), s("p", na, "请先在账号设置中配置 GitHub 用户名，然后搜索已加载的 Star 仓库。")) : (t(), s("p", aa, o(n(se).loading ? "正在读取 Star 仓库，结果可能尚未完整 · " : "") + o(p.value.length) + " 个结果", 1)),
      !p.value.length && n(at).accountConfigured !== !1 ? (t(), s("p", la, o(n(se).loading ? "正在读取仓库…" : "当前分类没有匹配的仓库。"), 1)) : k("", !0),
      m.value.length ? (t(), s("div", ra, [
        (t(!0), s(B, null, Z(m.value, (y) => (t(), s("article", {
          key: y.full_name,
          class: "repo-card"
        }, [
          e("div", ia, [
            e("button", {
              type: "button",
              class: "repo-name",
              onClick: (L) => n(it).open(y.full_name, void 0, y)
            }, o(y.full_name), 9, ua),
            Ae(At, {
              repo: y,
              "already-starred": ""
            }, null, 8, ["repo"])
          ]),
          e("p", null, o(y.description || "暂无描述"), 1),
          e("div", ca, [
            y.language ? (t(), s("span", da, o(y.language), 1)) : k("", !0),
            e("span", null, "★ " + o((y.stargazers_count || 0).toLocaleString()), 1),
            e("span", null, "⑂ " + o((y.forks_count || 0).toLocaleString()), 1)
          ])
        ]))), 128))
      ])) : k("", !0),
      S.value > 1 ? (t(), s("div", pa, [
        e("button", {
          type: "button",
          disabled: r.value <= 1,
          onClick: b[1] || (b[1] = (y) => r.value--)
        }, "‹ 上一页", 8, ha),
        e("span", null, o(r.value) + " / " + o(S.value), 1),
        e("button", {
          type: "button",
          disabled: r.value >= S.value,
          onClick: b[2] || (b[2] = (y) => r.value++)
        }, "下一页 ›", 8, ga)
      ])) : k("", !0)
    ]));
  }
}), fa = /* @__PURE__ */ Ge(ma, [["__scopeId", "data-v-26ec6440"]]), va = { class: "gh-dashboard" }, ba = { class: "dashboard-layout" }, ya = { class: "dashboard-main" }, _a = { class: "dashboard-search" }, wa = { key: 0 }, ka = { class: "dashboard-home-content" }, $a = { class: "dashboard-heading" }, Ca = { class: "dashboard-composer" }, Sa = { class: "composer-bottom" }, Ga = { class: "composer-left" }, Ra = { class: "repo-picker-anchor" }, Ma = ["aria-expanded"], Ta = {
  key: 0,
  class: "repo-picker"
}, Da = { class: "repo-picker-head" }, La = ["disabled"], Aa = {
  key: 0,
  class: "repo-picker-hint"
}, Ha = {
  key: 1,
  class: "repo-picker-hint",
  role: "alert"
}, xa = {
  key: 2,
  class: "repo-picker-hint"
}, Ea = { class: "repo-picker-list" }, Ia = ["onClick"], Ua = {
  key: 0,
  class: "repo-picker-hint"
}, Na = ["disabled"], Pa = { class: "dashboard-section" }, Oa = { class: "dashboard-list" }, Fa = {
  key: 0,
  class: "empty"
}, ja = {
  key: 1,
  class: "empty"
}, Ba = ["onClick"], za = { class: "row-copy" }, qa = {
  key: 2,
  class: "inline-error"
}, Wa = { class: "dashboard-section" }, Ya = { class: "section-heading" }, Va = ["href"], Ka = { class: "dashboard-list" }, Xa = {
  key: 0,
  class: "empty"
}, Qa = {
  key: 1,
  class: "empty"
}, Ja = {
  key: 2,
  class: "inline-error"
}, Za = {
  key: 3,
  class: "empty"
}, el = ["href"], tl = { class: "row-copy" }, sl = { class: "row-meta" }, ol = { class: "dashboard-side" }, nl = { class: "side-card" }, al = { class: "side-heading" }, ll = {
  key: 0,
  class: "side-empty"
}, rl = {
  key: 1,
  class: "side-empty"
}, il = {
  key: 2,
  class: "inline-error"
}, ul = {
  key: 3,
  class: "side-empty"
}, cl = ["onClick"], dl = { class: "side-card quick-card" }, pl = /* @__PURE__ */ Se({
  __name: "GitHubDashboard",
  props: {
    active: { type: Boolean },
    accountRevision: {},
    showResults: { type: Boolean }
  },
  emits: ["channel", "settings", "notifications"],
  setup(w, { emit: u }) {
    const l = w, r = u, p = R(""), m = R(""), S = R(!1), C = R(!1), b = R(""), y = R(""), L = R([]), G = R(null), U = R(""), I = ae(() => {
      const $ = U.value.trim().toLowerCase();
      return $ ? L.value.filter((a) => a.fullName.toLowerCase().includes($)) : L.value;
    });
    let A;
    async function H() {
      A?.abort();
      const $ = new AbortController();
      A = $, C.value = !0, b.value = "", y.value = "";
      try {
        const a = await Wt($.signal);
        if (A !== $ || $.signal.aborted) return;
        L.value = a.repos, y.value = a.warning;
      } catch (a) {
        A === $ && !$.signal.aborted && (b.value = a instanceof Error ? a.message : "仓库读取失败。");
      } finally {
        A === $ && (C.value = !1);
      }
    }
    function z() {
      S.value = !S.value, S.value && !L.value.length && !C.value && H();
    }
    function D($) {
      G.value = $, S.value = !1, U.value = "";
    }
    he(() => l.accountRevision, () => {
      A?.abort(), A = void 0, L.value = [], G.value = null, C.value = !1, S.value = !1;
    });
    const x = R([]), Q = R([]), ee = R([]), ie = R(!1), ne = R(!1), N = R(""), O = R(""), F = R(""), q = R("");
    let W, oe = 0;
    const le = ae(() => {
      const $ = (/* @__PURE__ */ new Date()).getHours();
      return $ < 6 ? "夜深了" : $ < 11 ? "早上好" : $ < 14 ? "中午好" : $ < 18 ? "下午好" : "晚上好";
    });
    function ue($) {
      if (!$) return "";
      const a = new Date($).getTime();
      if (!Number.isFinite(a)) return "";
      const v = Math.max(0, Math.floor((Date.now() - a) / 6e4));
      return v < 60 ? v < 1 ? "刚刚" : `${v} 分钟前` : v < 1440 ? `${Math.floor(v / 60)} 小时前` : v < 43200 ? `${Math.floor(v / 1440)} 天前` : new Date(a).toLocaleDateString();
    }
    const me = ($) => $ instanceof Error ? $.message : "读取失败，请稍后重试。";
    function ye($) {
      return typeof $?.full_name == "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test($.full_name);
    }
    function ge($) {
      try {
        const a = new URL(String($));
        return a.protocol === "https:" && a.hostname === "github.com" && /^\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/pull\/\d+\/?$/.test(a.pathname) ? a.href : "";
      } catch {
        return "";
      }
    }
    async function _e() {
      W?.abort();
      const $ = new AbortController();
      W = $;
      const a = ++oe, v = () => l.active && a === oe && !$.signal.aborted;
      p.value = "", x.value = [], Q.value = [], ee.value = [], N.value = "", O.value = "", F.value = "", q.value = "", ie.value = !0, ne.value = !0, (async () => {
        try {
          const ce = await Yt();
          if (!v()) return;
          const pe = ce.map((re) => ({
            kind: "deepseek",
            id: re.id,
            title: re.title || "未命名对话",
            updated: Number(re.updatedAt) || 0,
            model: re.model
          }));
          ee.value = pe.sort((re, Te) => Te.updated - re.updated).slice(0, 4);
        } catch {
          v() && (q.value = "DeepSeek 本机会话读取失败");
        } finally {
          v() && (ne.value = !1);
        }
      })();
      try {
        const ce = await vt();
        if (!v()) return;
        const pe = Be(ce.ghToken);
        let re = ce.ghUser.trim();
        if (!re && ce.ghToken) {
          const ke = await st("/user", { headers: pe, signal: $.signal, maxBytes: 131072 });
          re = typeof ke.data?.login == "string" ? ke.data.login : "";
        }
        if (!v()) return;
        if (!re) {
          N.value = "配置 GitHub 用户名后即可查看仓库和 Pull Request。";
          return;
        }
        if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(re)) throw new Error("GitHub 用户名格式无效，请检查设置。");
        p.value = re;
        const Te = new URLSearchParams({ q: `is:pr is:open author:${re}`, sort: "updated", order: "desc", per_page: "5" }), [we, $e] = await Promise.allSettled([
          st(`/users/${encodeURIComponent(re)}/repos?type=owner&sort=updated&per_page=6`, { headers: pe, signal: $.signal, maxBytes: 1024 * 1024 }),
          st(`/search/issues?${Te}`, { headers: pe, signal: $.signal, maxBytes: 1024 * 1024 })
        ]);
        if (!v()) return;
        we.status === "fulfilled" && Array.isArray(we.value.data) ? x.value = we.value.data.filter(ye).slice(0, 6) : O.value = we.status === "rejected" ? me(we.reason) : "仓库响应格式异常。", $e.status === "fulfilled" && Array.isArray($e.value.data?.items) ? Q.value = $e.value.data.items.filter((ke) => ke && typeof ke.title == "string" && ge(ke.html_url)).slice(0, 5) : F.value = $e.status === "rejected" ? me($e.reason) : "Pull Request 响应格式异常。";
      } catch (ce) {
        v() && (N.value = me(ce));
      } finally {
        v() && (ie.value = !1);
      }
    }
    he(() => [l.active, l.accountRevision], ([$]) => {
      $ ? _e() : (++oe, W?.abort());
    }, { immediate: !0 }), ft(() => {
      ++oe, W?.abort(), A?.abort();
    });
    function Me() {
      if (!m.value.trim()) return;
      const $ = G.value, a = $ ? { kind: "github", id: $.fullName, title: $.fullName, url: `https://github.com/${$.fullName}`, description: $.description, language: $.language, visibility: $.isPrivate ? "private" : "public" } : void 0;
      Vt(m.value.trim(), a), dt("multica");
    }
    function Re($) {
      Kt("deepseek", $.id), dt("multica");
    }
    function De() {
      dt("multica");
    }
    function Le($) {
      const a = ge($.html_url);
      return a ? new URL(a).pathname.split("/").slice(1, 3).join("/") : "";
    }
    return ($, a) => (t(), s("div", va, [
      e("div", ba, [
        e("main", ya, [
          e("div", _a, [
            kt($.$slots, "search", {}, void 0, !0)
          ]),
          w.showResults ? (t(), s("div", wa, [
            kt($.$slots, "results", {}, void 0, !0)
          ])) : k("", !0),
          be(e("div", ka, [
            e("div", $a, [
              e("div", null, [
                a[9] || (a[9] = e("span", { class: "eyebrow" }, "GITHUB WORKSPACE", -1)),
                e("h2", null, [
                  X(o(le.value), 1),
                  p.value ? (t(), s(B, { key: 0 }, [
                    X("，" + o(p.value), 1)
                  ], 64)) : k("", !0),
                  a[8] || (a[8] = X("。", -1))
                ])
              ])
            ]),
            e("div", Ca, [
              be(e("textarea", {
                "onUpdate:modelValue": a[0] || (a[0] = (v) => m.value = v),
                placeholder: "有什么想法？在 AI 工作区继续探索…",
                "aria-label": "发送到 AI 工作区的草稿",
                maxlength: "100000"
              }, null, 512), [
                [Ie, m.value]
              ]),
              e("div", Sa, [
                e("div", Ga, [
                  e("div", Ra, [
                    e("button", {
                      type: "button",
                      class: "repo-picker-toggle",
                      "aria-expanded": S.value,
                      onClick: z
                    }, "⌘ " + o(G.value ? G.value.fullName : "选择仓库") + " ▾", 9, Ma),
                    S.value ? (t(), s("div", Ta, [
                      e("div", Da, [
                        a[10] || (a[10] = e("strong", null, "选择我的仓库", -1)),
                        e("button", {
                          type: "button",
                          title: "刷新仓库",
                          disabled: C.value,
                          onClick: H
                        }, "↻", 8, La)
                      ]),
                      be(e("input", {
                        "onUpdate:modelValue": a[1] || (a[1] = (v) => U.value = v),
                        placeholder: "搜索仓库名称…",
                        "aria-label": "搜索我的仓库"
                      }, null, 512), [
                        [Ie, U.value]
                      ]),
                      C.value ? (t(), s("p", Aa, "正在读取仓库…")) : b.value ? (t(), s("p", Ha, [
                        X(o(b.value) + " ", 1),
                        e("button", {
                          type: "button",
                          onClick: H
                        }, "重试")
                      ])) : k("", !0),
                      y.value ? (t(), s("p", xa, o(y.value), 1)) : k("", !0),
                      e("div", Ea, [
                        (t(!0), s(B, null, Z(I.value, (v) => (t(), s("button", {
                          key: v.fullName,
                          type: "button",
                          onClick: (ce) => D(v)
                        }, [
                          e("span", null, o(v.fullName), 1),
                          e("small", null, o(v.isPrivate ? "私有" : "公开"), 1)
                        ], 8, Ia))), 128)),
                        !C.value && !b.value && !I.value.length ? (t(), s("p", Ua, "没有找到仓库。")) : k("", !0)
                      ]),
                      G.value ? (t(), s("button", {
                        key: 3,
                        type: "button",
                        class: "repo-picker-clear",
                        onClick: a[2] || (a[2] = (v) => {
                          G.value = null, S.value = !1;
                        })
                      }, "不选择仓库")) : k("", !0),
                      a[11] || (a[11] = e("p", { class: "repo-picker-hint" }, "仅附带仓库链接与简介；发送时会共享所选信息，README 需手动读取。", -1))
                    ])) : k("", !0)
                  ]),
                  a[12] || (a[12] = e("span", null, [
                    X("✳  AI 工作区 "),
                    e("small", null, "· 不会自动发送")
                  ], -1))
                ]),
                e("button", {
                  type: "button",
                  disabled: !m.value.trim(),
                  onClick: Me
                }, [...a[13] || (a[13] = [
                  X("继续到 AI 工作区 ", -1),
                  e("span", null, "↗", -1)
                ])], 8, Na)
              ])
            ]),
            e("section", Pa, [
              e("div", { class: "section-heading" }, [
                a[15] || (a[15] = e("div", null, [
                  e("h3", null, "最近会话"),
                  e("small", null, "DeepSeek 本机记录")
                ], -1)),
                e("button", {
                  type: "button",
                  onClick: De
                }, [...a[14] || (a[14] = [
                  X("查看全部 ", -1),
                  e("span", null, "→", -1)
                ])])
              ]),
              e("div", Oa, [
                ne.value ? (t(), s("p", Fa, "正在读取会话…")) : ee.value.length ? k("", !0) : (t(), s("p", ja, "暂无可显示的会话，打开 AI 工作区开始对话。")),
                (t(!0), s(B, null, Z(ee.value, (v) => (t(), s("button", {
                  key: `${v.kind}:${v.id}`,
                  type: "button",
                  class: "list-row",
                  onClick: (ce) => Re(v)
                }, [
                  a[16] || (a[16] = e("span", { class: "status-dot" }, null, -1)),
                  e("span", za, [
                    e("strong", null, o(v.title), 1),
                    e("small", null, [
                      X("DeepSeek · " + o(v.model), 1),
                      v.updated ? (t(), s(B, { key: 0 }, [
                        X(" · " + o(ue(v.updated)), 1)
                      ], 64)) : k("", !0)
                    ])
                  ]),
                  a[17] || (a[17] = e("span", { class: "row-arrow" }, "↗", -1))
                ], 8, Ba))), 128)),
                q.value ? (t(), s("p", qa, o(q.value), 1)) : k("", !0)
              ])
            ]),
            e("section", Wa, [
              e("div", Ya, [
                a[18] || (a[18] = e("div", null, [
                  e("h3", null, "Pull requests"),
                  e("small", null, "由你创建、尚未关闭")
                ], -1)),
                p.value ? (t(), s("a", {
                  key: 0,
                  href: `https://github.com/pulls?q=${encodeURIComponent(`is:pr is:open author:${p.value}`)}`,
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, "查看全部 ↗", 8, Va)) : k("", !0)
              ]),
              e("div", Ka, [
                ie.value ? (t(), s("p", Xa, "正在读取 Pull Request…")) : N.value ? (t(), s("p", Qa, o(N.value), 1)) : F.value ? (t(), s("p", Ja, o(F.value), 1)) : Q.value.length ? k("", !0) : (t(), s("p", Za, "没有找到未关闭的 Pull Request。")),
                (t(!0), s(B, null, Z(Q.value, (v) => (t(), s("a", {
                  key: v.html_url,
                  class: "list-row",
                  href: ge(v.html_url),
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, [
                  a[19] || (a[19] = e("span", { class: "pull-icon" }, "⑂", -1)),
                  e("span", tl, [
                    e("strong", null, o(v.title), 1),
                    e("small", null, [
                      X(o(Le(v)) + " #" + o(v.number), 1),
                      v.updated_at ? (t(), s(B, { key: 0 }, [
                        X(" · 更新于 " + o(ue(v.updated_at)), 1)
                      ], 64)) : k("", !0)
                    ])
                  ]),
                  e("span", sl, o(v.comments || 0) + " 条评论 ↗", 1)
                ], 8, el))), 128))
              ])
            ])
          ], 512), [
            [je, !w.showResults]
          ])
        ]),
        e("aside", ol, [
          e("section", nl, [
            e("div", al, [
              a[20] || (a[20] = e("div", null, [
                e("h3", null, "最近更新的仓库"),
                e("small", null, "GitHub 公开仓库")
              ], -1)),
              e("button", {
                type: "button",
                onClick: a[3] || (a[3] = (v) => r("channel", "repos"))
              }, "全部 →")
            ]),
            ie.value ? (t(), s("p", ll, "正在读取仓库…")) : N.value ? (t(), s("p", rl, o(N.value), 1)) : O.value ? (t(), s("p", il, o(O.value), 1)) : x.value.length ? k("", !0) : (t(), s("p", ul, "暂无公开仓库。")),
            (t(!0), s(B, null, Z(x.value, (v) => (t(), s("button", {
              key: v.full_name,
              type: "button",
              class: "repo-row",
              onClick: (ce) => n(it).open(v.full_name, void 0, v)
            }, [
              a[21] || (a[21] = e("span", { class: "repo-mark" }, "▣", -1)),
              e("span", null, [
                e("strong", null, o(v.full_name), 1),
                e("small", null, [
                  X(o(v.language || "仓库"), 1),
                  v.updated_at ? (t(), s(B, { key: 0 }, [
                    X(" · " + o(ue(v.updated_at)), 1)
                  ], 64)) : k("", !0)
                ])
              ])
            ], 8, cl))), 128))
          ]),
          e("section", dl, [
            a[26] || (a[26] = e("div", { class: "side-heading" }, [
              e("div", null, [
                e("h3", null, "快捷入口"),
                e("small", null, "你的 GitHub 工作台")
              ])
            ], -1)),
            e("button", {
              type: "button",
              onClick: a[4] || (a[4] = (v) => r("channel", "stars"))
            }, [...a[22] || (a[22] = [
              e("span", null, "⭐  Star 收藏", -1),
              e("span", null, "→", -1)
            ])]),
            e("button", {
              type: "button",
              onClick: a[5] || (a[5] = (v) => r("channel", "trending"))
            }, [...a[23] || (a[23] = [
              e("span", null, "◈  开源发现", -1),
              e("span", null, "→", -1)
            ])]),
            e("button", {
              type: "button",
              onClick: a[6] || (a[6] = (v) => r("notifications"))
            }, [...a[24] || (a[24] = [
              e("span", null, "♧  GitHub 通知", -1),
              e("span", null, "→", -1)
            ])]),
            e("button", {
              type: "button",
              onClick: a[7] || (a[7] = (v) => r("settings", v.currentTarget))
            }, [...a[25] || (a[25] = [
              e("span", null, "⚙  账号设置", -1),
              e("span", null, "→", -1)
            ])])
          ])
        ])
      ])
    ]));
  }
}), hl = /* @__PURE__ */ Ge(pl, [["__scopeId", "data-v-7b34184f"]]);
function gl(w) {
  const u = w.subject?.url, l = w.repository?.html_url || "https://github.com";
  if (!u) return l;
  const r = w.subject?.type;
  return r === "Issue" ? u.replace("https://api.github.com/repos/", "https://github.com/") : r === "PullRequest" ? u.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : r === "Release" ? u.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : u.replace("https://api.github.com/repos/", "https://github.com/");
}
function ml(w) {
  try {
    const u = Date.now() - new Date(w).getTime();
    if (u < 6e4) return "刚刚";
    const l = Math.floor(u / 6e4);
    if (l < 60) return `${l} 分钟前`;
    const r = Math.floor(l / 60);
    if (r < 24) return `${r} 小时前`;
    const p = Math.floor(r / 24);
    return p < 30 ? `${p} 天前` : w.slice(5, 10);
  } catch {
    return "";
  }
}
const j = Ee({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), He = {
  open() {
    j.isOpen = !0, (!j.items.length || Date.now() - j.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    j.isOpen = !1;
  },
  toggle() {
    j.isOpen ? this.close() : this.open();
  },
  setTab(w) {
    j.activeKind = w;
  },
  async refresh() {
    const w = K.token?.trim();
    if (!w) {
      j.items = [], j.unreadCount = 0, j.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    j.loading = !0, j.error = "";
    try {
      const u = {
        ...Be(w),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, l = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: u
      });
      if (!l.ok)
        throw l.status === 401 ? new Error("GitHub Token 无效或已过期") : l.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${l.status})`);
      const r = await l.json();
      if (!Array.isArray(r))
        throw new Error("GitHub 返回数据异常");
      const p = r.map((m) => ({
        id: String(m.id),
        unread: !!m.unread,
        reason: String(m.reason || ""),
        updatedAt: m.updated_at,
        formattedTime: ml(m.updated_at),
        subject: {
          title: String(m.subject?.title || "未命名通知"),
          url: String(m.subject?.url || ""),
          type: String(m.subject?.type || "Issue"),
          latestCommentUrl: m.subject?.latest_comment_url
        },
        repository: {
          id: Number(m.repository?.id || 0),
          name: String(m.repository?.name || ""),
          fullName: String(m.repository?.full_name || ""),
          owner: {
            login: String(m.repository?.owner?.login || ""),
            avatarUrl: m.repository?.owner?.avatar_url
          },
          htmlUrl: String(m.repository?.html_url || "")
        },
        url: String(m.url || ""),
        htmlUrl: gl(m)
      }));
      j.items = p, j.unreadCount = p.filter((m) => m.unread).length, j.lastFetchedAt = Date.now();
    } catch (u) {
      console.warn("[GitHubNotifications] 读取失败:", u), j.error = u?.message || "网络请求异常";
    } finally {
      j.loading = !1;
    }
  },
  openTarget(w) {
    typeof window < "u" && window.open(w.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, T = Ee({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function Xe(w) {
  try {
    const u = Date.now() - new Date(w).getTime(), l = Math.floor(u / 6e4);
    if (l < 1) return "刚刚";
    if (l < 60) return `${l}分钟前`;
    const r = Math.floor(l / 60);
    if (r < 24) return `${r}小时前`;
    const p = Math.floor(r / 24);
    if (p < 30) return `${p}天前`;
    const m = new Date(w);
    return `${m.getFullYear()}/${m.getMonth() + 1}/${m.getDate()}`;
  } catch {
    return "";
  }
}
function Qe(w) {
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
function fl(w) {
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
function ht(w) {
  if (!Array.isArray(w)) return [];
  const u = {
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
    emoji: u[l.content] || l.content,
    count: l.reactors?.totalCount || l.users?.totalCount || 0
  })).filter((l) => l.count > 0);
}
function Tt(w) {
  if (!w || typeof w != "object") return [];
  const u = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, l = [];
  for (const [r, p] of Object.entries(u)) {
    const m = Number(w[r] || 0);
    m > 0 && l.push({ emoji: p, count: m });
  }
  return l;
}
async function Dt(w, u) {
  if (!w) return "";
  try {
    const l = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...Be(u),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: w, mode: "gfm" })
    });
    if (l.ok)
      return await l.text();
  } catch {
  }
  return xe.renderMarkdown(w);
}
async function vl(w, u, l, r) {
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
    const m = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...Be(r),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: p,
        variables: { owner: w, name: u, num: l }
      })
    });
    if (!m.ok) return null;
    const C = (await m.json())?.data?.repository?.discussion;
    if (!C) return null;
    let b = 0;
    const y = (C.comments?.nodes || []).map((U) => {
      const I = U.replies?.nodes || [];
      b += I.length;
      const A = I.map((H) => ({
        id: H.id,
        author: {
          login: H.author?.login || "匿名",
          avatarUrl: H.author?.avatarUrl || "",
          association: Qe(H.authorAssociation)
        },
        createdAt: H.createdAt,
        formattedTime: Xe(H.createdAt),
        body: H.body || "",
        bodyHtml: H.bodyHTML || (H.body ? xe.renderMarkdown(H.body) : ""),
        reactions: ht(H.reactionGroups)
      }));
      return {
        id: U.id,
        author: {
          login: U.author?.login || "匿名",
          avatarUrl: U.author?.avatarUrl || "",
          association: Qe(U.authorAssociation)
        },
        createdAt: U.createdAt,
        formattedTime: Xe(U.createdAt),
        body: U.body || "",
        bodyHtml: U.bodyHTML || (U.body ? xe.renderMarkdown(U.body) : "<p>（评论内容为空）</p>"),
        reactions: ht(U.reactionGroups),
        replies: A
      };
    }), L = C.body || "", G = C.bodyHTML && C.bodyHTML.trim().length > 10 ? C.bodyHTML : L ? xe.renderMarkdown(L) : "<p>（主贴内容为空）</p>";
    return {
      title: C.title,
      number: l,
      state: "discussion",
      category: C.category ? {
        name: C.category.name,
        emoji: fl(C.category.emoji)
      } : void 0,
      author: {
        login: C.author?.login || "未知",
        avatarUrl: C.author?.avatarUrl || "",
        association: Qe(C.authorAssociation)
      },
      createdAt: C.createdAt,
      formattedTime: Xe(C.createdAt),
      body: L,
      bodyHtml: G,
      htmlUrl: C.url,
      commentsCount: C.comments?.totalCount || y.length,
      totalRepliesCount: b,
      comments: y,
      reactions: ht(C.reactionGroups)
    };
  } catch {
    return null;
  }
}
const gt = {
  async open(w) {
    T.isOpen = !0, T.loading = !0, T.error = "", T.data = null, T.notificationItem = w;
    const u = K.token?.trim() || "", l = {
      ...Be(u),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const r = w.subject?.url, p = w.subject?.type, m = w.repository?.fullName || "", [S, C] = m.split("/"), b = r?.match(/\/(\d+)$/), y = b ? Number(b[1]) : void 0;
      if (p === "Discussion" && S && C && y) {
        const L = await vl(S, C, y, u);
        if (L) {
          T.data = {
            notificationId: w.id,
            title: L.title || w.subject.title,
            number: y,
            state: "discussion",
            category: L.category,
            author: L.author || { login: w.repository.owner.login, avatarUrl: w.repository.owner.avatarUrl || "" },
            createdAt: L.createdAt || w.updatedAt,
            formattedTime: L.formattedTime || w.formattedTime,
            body: L.body || "",
            bodyHtml: L.bodyHtml || (L.body ? xe.renderMarkdown(L.body) : ""),
            htmlUrl: L.htmlUrl || w.htmlUrl,
            commentsCount: L.commentsCount || 0,
            totalRepliesCount: L.totalRepliesCount || 0,
            comments: L.comments || [],
            reactions: L.reactions || [],
            repositoryFullName: m,
            type: "Discussion"
          };
          return;
        }
      }
      if (r) {
        const L = await fetch(r, { headers: l, cache: "no-store" });
        if (L.ok) {
          const G = await L.json();
          let U = [];
          if (G.comments_url && G.comments > 0)
            try {
              const H = await fetch(`${G.comments_url}?per_page=50`, { headers: l, cache: "no-store" });
              if (H.ok) {
                const z = await H.json();
                Array.isArray(z) && (U = await Promise.all(
                  z.map(async (D) => {
                    const x = D.body_html || (D.body ? await Dt(D.body, u) : "");
                    return {
                      id: D.id,
                      author: {
                        login: D.user?.login || "匿名",
                        avatarUrl: D.user?.avatar_url || "",
                        association: Qe(D.author_association)
                      },
                      createdAt: D.created_at,
                      formattedTime: Xe(D.created_at),
                      body: D.body || "",
                      bodyHtml: x,
                      reactions: Tt(D.reactions)
                    };
                  })
                ));
              }
            } catch (H) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", H);
            }
          const I = G.body || "";
          let A = G.body_html || "";
          !A && I && (A = await Dt(I, u)), !A && I && (A = xe.renderMarkdown(I)), T.data = {
            notificationId: w.id,
            title: G.title || G.name || w.subject.title,
            number: G.number || y,
            state: G.merged ? "merged" : G.state || G.conclusion || "open",
            author: {
              login: G.user?.login || G.author?.login || w.repository.owner.login,
              avatarUrl: G.user?.avatar_url || G.author?.avatar_url || w.repository.owner.avatarUrl || "",
              association: Qe(G.author_association)
            },
            createdAt: G.created_at || G.published_at || w.updatedAt,
            formattedTime: Xe(G.created_at || G.published_at || w.updatedAt),
            body: I,
            bodyHtml: A || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: G.html_url || w.htmlUrl,
            commentsCount: typeof G.comments == "number" ? G.comments : U.length,
            comments: U,
            reactions: Tt(G.reactions),
            repositoryFullName: m,
            type: p || "Issue"
          };
          return;
        }
      }
      T.data = {
        notificationId: w.id,
        title: w.subject.title,
        number: y,
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
        repositoryFullName: m,
        type: p || "通知"
      };
    } catch (r) {
      console.warn("[GitHubNotificationDetail] 读取异常:", r), T.error = r?.message || "网络请求异常";
    } finally {
      T.loading = !1;
    }
  },
  close() {
    T.isOpen = !1, T.data = null, T.error = "";
  }
}, bl = { class: "vue-gh-notification-panel-wrapper" }, yl = { class: "gh-msg-header" }, _l = { class: "gh-msg-account" }, wl = { class: "gh-msg-subtitle" }, kl = {
  class: "gh-msg-tabs",
  role: "tablist"
}, $l = ["onClick"], Cl = { class: "gh-msg-list" }, Sl = {
  key: 0,
  class: "gh-msg-loading"
}, Gl = {
  key: 1,
  class: "gh-msg-error"
}, Rl = {
  key: 2,
  class: "gh-msg-empty"
}, Ml = ["onClick"], Tl = { class: "gh-card-indicator-col" }, Dl = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, Ll = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, Al = { class: "gh-card-type-col" }, Hl = ["title"], xl = { class: "gh-card-main-col" }, El = { class: "gh-card-repo-row" }, Il = ["title"], Ul = { class: "gh-card-reason-tag" }, Nl = { class: "gh-card-time" }, Pl = ["title"], Ol = { class: "gh-card-footer-row" }, Fl = { class: "gh-card-type-label" }, jl = ["onClick"], Bl = /* @__PURE__ */ Se({
  __name: "GitHubNotificationPanel",
  setup(w) {
    const u = R(null), l = ae(() => [
      { kind: "all", label: "所有", count: j.items.length },
      { kind: "unread", label: "未读", count: j.items.filter((I) => I.unread).length },
      { kind: "mention", label: "提及", count: j.items.filter((I) => I.reason === "mention").length },
      { kind: "author", label: "作者", count: j.items.filter((I) => I.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: j.items.filter((I) => I.reason === "ci_activity" || I.subject.type === "CheckSuite").length }
    ]), r = ae(() => {
      const I = j.items;
      switch (j.activeKind) {
        case "unread":
          return I.filter((A) => A.unread);
        case "mention":
          return I.filter((A) => A.reason === "mention");
        case "author":
          return I.filter((A) => A.reason === "author");
        case "ci":
          return I.filter((A) => A.reason === "ci_activity" || A.subject.type === "CheckSuite");
        default:
          return I;
      }
    });
    function p(I, A) {
      if (A === "ci_activity" || I === "CheckSuite")
        return "⚡";
      switch (I) {
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
    function m(I) {
      switch (I) {
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
          return I || "通知";
      }
    }
    function S() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function C() {
      He.refresh();
    }
    function b() {
      He.close();
    }
    function y(I) {
      gt.open(I);
    }
    function L(I) {
      He.openTarget(I);
    }
    function G(I) {
      if (!j.isOpen) return;
      const A = I.target;
      !u.value?.contains(A) && !A?.closest("#gh-header-msg-center-btn") && He.close();
    }
    function U(I) {
      I.key === "Escape" && j.isOpen && He.close();
    }
    return lt(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", G), window.addEventListener("keydown", U));
    }), rt(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", G), window.removeEventListener("keydown", U));
    }), (I, A) => (t(), s("div", bl, [
      n(j).isOpen ? (t(), s("section", {
        key: 0,
        ref_key: "panelRef",
        ref: u,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: A[0] || (A[0] = te(() => {
        }, ["stop"]))
      }, [
        e("header", yl, [
          e("div", _l, [
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
              e("p", wl, " 共 " + o(n(j).items.length) + " 条通知 · " + o(n(j).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          A[3] || (A[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: S
          }, " ↗ "),
          e("button", {
            type: "button",
            class: Y(["gh-panel-btn", { "is-spinning": n(j).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: C
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: b
          }, " ✕ ")
        ]),
        e("nav", kl, [
          (t(!0), s(B, null, Z(l.value, (H) => (t(), s("button", {
            key: H.kind,
            type: "button",
            class: Y(["gh-msg-tab", { active: n(j).activeKind === H.kind }]),
            onClick: (z) => n(j).activeKind = H.kind
          }, [
            X(o(H.label) + " ", 1),
            H.count > 0 ? (t(), s("span", {
              key: 0,
              class: Y(["gh-tab-pill", { "is-unread-pill": H.kind === "unread" }])
            }, o(H.count), 3)) : k("", !0)
          ], 10, $l))), 128))
        ]),
        e("div", Cl, [
          n(j).loading && !n(j).items.length ? (t(), s("div", Sl, [...A[4] || (A[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : n(j).error ? (t(), s("div", Gl, [
            A[5] || (A[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, o(n(j).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: C
            }, "重试")
          ])) : r.value.length === 0 ? (t(), s("div", Rl, [...A[6] || (A[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (t(!0), s(B, { key: 3 }, Z(r.value, (H) => (t(), s("article", {
            key: H.id,
            class: Y(["gh-notification-card", { "is-unread": H.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (z) => y(H)
          }, [
            e("div", Tl, [
              H.unread ? (t(), s("span", Dl)) : (t(), s("span", Ll))
            ]),
            e("div", Al, [
              e("span", {
                class: "gh-type-badge",
                title: H.subject.type
              }, o(p(H.subject.type, H.reason)), 9, Hl)
            ]),
            e("div", xl, [
              e("div", El, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: H.repository.fullName
                }, o(H.repository.fullName), 9, Il),
                e("span", Ul, o(m(H.reason)), 1),
                e("time", Nl, o(H.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: H.subject.title
              }, o(H.subject.title), 9, Pl),
              e("div", Ol, [
                e("span", Fl, o(H.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: te((z) => L(H), ["stop"])
                }, "在网页打开 ↗", 8, jl)
              ])
            ])
          ], 10, Ml))), 128))
        ])
      ], 512)) : k("", !0)
    ]));
  }
}), zl = /* @__PURE__ */ Ge(Bl, [["__scopeId", "data-v-9a98e294"]]), ql = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, Wl = ["aria-label"], Yl = { class: "gh-modal-title-wrap" }, Vl = { class: "gh-modal-octo-icon" }, Kl = ["href"], Xl = { class: "gh-owner" }, Ql = { class: "gh-name" }, Jl = {
  key: 1,
  class: "gh-modal-repo-name"
}, Zl = { class: "gh-name" }, er = { class: "gh-modal-actions" }, tr = { class: "gh-modal-content" }, sr = {
  key: 0,
  class: "gh-content-loading"
}, or = {
  key: 1,
  class: "gh-content-error"
}, nr = { class: "gh-discussion-title-header" }, ar = { class: "gh-discussion-h1" }, lr = {
  key: 0,
  class: "gh-discussion-num"
}, rr = { class: "gh-discussion-sub-meta" }, ir = {
  key: 0,
  class: "gh-category-pill"
}, ur = {
  key: 0,
  class: "cat-emoji"
}, cr = {
  key: 1,
  class: "gh-category-pill"
}, dr = { class: "gh-sub-author" }, pr = { class: "gh-sub-verb" }, hr = {
  key: 2,
  class: "gh-sub-comments-count"
}, gr = { class: "gh-op-post-card" }, mr = { class: "gh-op-post-head" }, fr = { class: "gh-op-author-left" }, vr = ["src"], br = { class: "gh-op-meta" }, yr = { class: "gh-op-name-row" }, _r = { class: "gh-op-name" }, wr = {
  key: 0,
  class: "gh-role-pill"
}, kr = { class: "gh-op-time" }, $r = ["innerHTML"], Cr = {
  key: 0,
  class: "gh-reactions-bar"
}, Sr = { class: "rx-emoji" }, Gr = { class: "rx-count" }, Rr = {
  key: 0,
  class: "gh-comments-block"
}, Mr = { class: "gh-comments-header" }, Tr = { class: "gh-comments-count-pill" }, Dr = { class: "gh-comments-feed" }, Lr = { class: "gh-comment-head" }, Ar = ["src"], Hr = { class: "gh-comment-meta" }, xr = { class: "gh-comment-author" }, Er = {
  key: 0,
  class: "gh-role-pill small"
}, Ir = { class: "gh-comment-time" }, Ur = ["innerHTML"], Nr = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, Pr = { class: "rx-emoji" }, Or = { class: "rx-count" }, Fr = {
  key: 1,
  class: "gh-comment-replies-thread"
}, jr = { class: "gh-replies-thread-title" }, Br = { class: "gh-reply-head" }, zr = ["src"], qr = { class: "gh-reply-meta" }, Wr = { class: "gh-reply-author" }, Yr = {
  key: 0,
  class: "gh-role-pill tiny"
}, Vr = { class: "gh-reply-time" }, Kr = ["innerHTML"], Xr = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, Qr = { class: "rx-emoji" }, Jr = { class: "rx-count" }, Zr = {
  key: 1,
  class: "gh-no-comments"
}, ei = /* @__PURE__ */ Se({
  __name: "GitHubNotificationDetailDrawer",
  setup(w) {
    const u = R(null), l = R(null), r = R(null);
    let p = !1, m = 0, S = 0, C = 0, b = 0, y = () => {
    };
    const L = ae(() => (T.data?.repositoryFullName || T.notificationItem?.repository.fullName || "").split("/")[0] || ""), G = ae(() => {
      const N = T.data?.repositoryFullName || T.notificationItem?.repository.fullName || "";
      return N.split("/")[1] || N;
    }), U = ae(() => {
      if (!T.data) return "";
      const N = T.data.bodyHtml?.trim() || "";
      if (N.length > 20) return N;
      const O = T.data.body?.trim() || "";
      return O.length > 0 ? xe.renderMarkdown(O) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), I = ae(() => r.value ? {
      position: "fixed",
      left: `${r.value.x}px`,
      top: `${r.value.y}px`,
      transform: "none"
    } : {});
    he(
      () => T.isOpen,
      (N) => {
        N && (r.value = null, $t(() => {
          l.value && (l.value.scrollTop = 0);
        }));
      }
    ), he(
      () => T.data,
      (N) => {
        N && $t(() => {
          l.value && (l.value.scrollTop = 0);
        });
      }
    );
    function A(N) {
      if (N.target.closest("button, a, input")) return;
      y();
      const O = u.value;
      if (!O || !T.isOpen) return;
      p = !0;
      const F = O.getBoundingClientRect();
      C = F.left, b = F.top, m = N.clientX, S = N.clientY, r.value = { x: C, y: b };
      const q = (oe) => {
        if (!p) return;
        const le = oe.clientX - m, ue = oe.clientY - S;
        r.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, C + le)),
          y: Math.max(10, Math.min(window.innerHeight - 80, b + ue))
        };
      }, W = () => {
        p = !1, window.removeEventListener("mousemove", q), window.removeEventListener("mouseup", W);
      };
      y = W, window.addEventListener("mousemove", q), window.addEventListener("mouseup", W);
    }
    function H() {
      gt.close();
    }
    function z() {
      const N = T.data?.htmlUrl || T.notificationItem?.htmlUrl;
      N && typeof window < "u" && window.open(N, "_blank", "noopener,noreferrer");
    }
    function D(N) {
      const F = N.target?.closest("a");
      F && F.href && (N.preventDefault(), N.stopPropagation(), window.open(F.href, "_blank", "noopener,noreferrer"));
    }
    function x() {
      T.notificationItem && gt.open(T.notificationItem);
    }
    function Q(N) {
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
    function ee(N) {
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
    function ie(N) {
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
    function ne(N) {
      N.key === "Escape" && T.isOpen && H();
    }
    return lt(() => {
      Ot(), window.addEventListener("keydown", ne);
    }), rt(() => {
      window.removeEventListener("keydown", ne), y();
    }), (N, O) => (t(), ve(mt, { to: "body" }, [
      n(T).isOpen ? (t(), s("div", ql, [
        e("div", {
          ref_key: "windowRef",
          ref: u,
          class: "gh-nonmodal-window",
          style: ot(I.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": n(T).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: A
          }, [
            e("div", Yl, [
              e("span", Vl, o(Q(n(T).data?.type || n(T).notificationItem?.subject.type)), 1),
              n(T).data?.htmlUrl || n(T).notificationItem?.htmlUrl ? (t(), s("a", {
                key: 0,
                href: n(T).data?.htmlUrl || n(T).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", Xl, o(L.value), 1),
                O[0] || (O[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", Ql, o(G.value), 1),
                O[1] || (O[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, Kl)) : (t(), s("span", Jl, [
                e("strong", Zl, o(n(T).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", er, [
              n(T).data?.state ? (t(), s("span", {
                key: 0,
                class: Y(["gh-detail-state-pill", n(T).data.state])
              }, o(ie(n(T).data.state)), 3)) : k("", !0),
              n(T).data?.htmlUrl || n(T).notificationItem?.htmlUrl ? (t(), s("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: z
              }, " 在网页打开 ↗ ")) : k("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: H
              }, " ✕ ")
            ])
          ], 32),
          e("div", tr, [
            n(T).loading ? (t(), s("div", sr, [
              O[2] || (O[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + o(n(T).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : n(T).error ? (t(), s("div", or, [
              O[3] || (O[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, o(n(T).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: x
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: z
                }, "在 GitHub 打开 ↗")
              ])
            ])) : n(T).data ? (t(), s("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: l,
              class: "gh-detail-scrollable",
              onClick: D
            }, [
              e("div", nr, [
                e("h1", ar, [
                  X(o(n(T).data.title) + " ", 1),
                  n(T).data.number ? (t(), s("span", lr, "#" + o(n(T).data.number), 1)) : k("", !0)
                ]),
                e("div", rr, [
                  n(T).data.category ? (t(), s("span", ir, [
                    n(T).data.category.emoji ? (t(), s("span", ur, o(n(T).data.category.emoji), 1)) : k("", !0),
                    e("span", null, o(n(T).data.category.name), 1)
                  ])) : (t(), s("span", cr, o(ee(n(T).data.type)), 1)),
                  e("span", dr, o(n(T).data.author.login), 1),
                  e("span", pr, "发布于 " + o(n(T).data.formattedTime), 1),
                  n(T).data.commentsCount ? (t(), s("span", hr, [
                    X(" · " + o(n(T).data.commentsCount) + " 条讨论主题 ", 1),
                    n(T).data.totalRepliesCount ? (t(), s(B, { key: 0 }, [
                      X(" （含 " + o(n(T).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : k("", !0)
                  ])) : k("", !0)
                ])
              ]),
              e("article", gr, [
                e("div", mr, [
                  e("div", fr, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: n(T).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, vr),
                    e("div", br, [
                      e("div", yr, [
                        e("strong", _r, o(n(T).data.author.login), 1),
                        n(T).data.author.association ? (t(), s("span", wr, o(n(T).data.author.association), 1)) : k("", !0)
                      ]),
                      e("time", kr, o(n(T).data.formattedTime), 1)
                    ])
                  ]),
                  O[4] || (O[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                O[5] || (O[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: U.value
                }, null, 8, $r),
                n(T).data.reactions?.length ? (t(), s("div", Cr, [
                  (t(!0), s(B, null, Z(n(T).data.reactions, (F) => (t(), s("span", {
                    key: F.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", Sr, o(F.emoji), 1),
                    e("span", Gr, o(F.count), 1)
                  ]))), 128))
                ])) : k("", !0)
              ]),
              n(T).data.comments.length ? (t(), s("div", Rr, [
                e("div", Mr, [
                  O[6] || (O[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", Tr, [
                    X(o(n(T).data.commentsCount) + " 条主题 ", 1),
                    n(T).data.totalRepliesCount ? (t(), s(B, { key: 0 }, [
                      X(" · " + o(n(T).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : k("", !0)
                  ])
                ]),
                e("div", Dr, [
                  (t(!0), s(B, null, Z(n(T).data.comments, (F) => (t(), s("div", {
                    key: F.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", Lr, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: F.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, Ar),
                      e("div", Hr, [
                        e("span", xr, o(F.author.login), 1),
                        F.author.association ? (t(), s("span", Er, o(F.author.association), 1)) : k("", !0),
                        e("time", Ir, o(F.formattedTime), 1)
                      ])
                    ]),
                    O[7] || (O[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: F.bodyHtml
                    }, null, 8, Ur),
                    F.reactions?.length ? (t(), s("div", Nr, [
                      (t(!0), s(B, null, Z(F.reactions, (q) => (t(), s("span", {
                        key: q.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", Pr, o(q.emoji), 1),
                        e("span", Or, o(q.count), 1)
                      ]))), 128))
                    ])) : k("", !0),
                    F.replies?.length ? (t(), s("div", Fr, [
                      e("div", jr, [
                        e("span", null, "💬 " + o(F.replies.length) + " 条回复对话", 1)
                      ]),
                      (t(!0), s(B, null, Z(F.replies, (q) => (t(), s("div", {
                        key: q.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", Br, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: q.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, zr),
                          e("div", qr, [
                            e("strong", Wr, o(q.author.login), 1),
                            q.author.association ? (t(), s("span", Yr, o(q.author.association), 1)) : k("", !0),
                            e("time", Vr, o(q.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: q.bodyHtml
                        }, null, 8, Kr),
                        q.reactions?.length ? (t(), s("div", Xr, [
                          (t(!0), s(B, null, Z(q.reactions, (W) => (t(), s("span", {
                            key: W.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", Qr, o(W.emoji), 1),
                            e("span", Jr, o(W.count), 1)
                          ]))), 128))
                        ])) : k("", !0)
                      ]))), 128))
                    ])) : k("", !0)
                  ]))), 128))
                ])
              ])) : (t(), s("div", Zr, [...O[8] || (O[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : k("", !0)
          ])
        ], 12, Wl)
      ])) : k("", !0)
    ]));
  }
}), ti = /* @__PURE__ */ Ge(ei, [["__scopeId", "data-v-053c788c"]]), si = [
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
], oi = ["inert"], ni = {
  key: 0,
  class: "muted small",
  role: "status"
}, ai = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, li = { class: "gh-bili-layout" }, ri = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, ii = ["title"], ui = { class: "fo-sidebar-toggle-title" }, ci = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, di = ["aria-expanded", "title"], pi = { class: "fo-sidebar-toggle-chevron" }, hi = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, gi = { class: "fo-sidebar-sub-wrap" }, mi = { class: "fo-sidebar-sub-wrap" }, fi = ["title"], vi = { class: "fo-sidebar-sub-main" }, bi = { class: "fo-sidebar-sub-text" }, yi = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, _i = ["title"], wi = { class: "fo-sidebar-sub-main" }, ki = { class: "fo-sidebar-sub-text" }, $i = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Ci = ["title"], Si = { class: "fo-sidebar-sub-main" }, Gi = { class: "fo-sidebar-sub-text" }, Ri = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Mi = ["title"], Ti = { class: "fo-sidebar-sub-main" }, Di = { class: "fo-sidebar-sub-text" }, Li = { class: "gh-bili-sidebar-head" }, Ai = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, Hi = { style: { color: "var(--dim)", "font-size": "9.5px" } }, xi = ["title", "aria-label"], Ei = {
  class: "gh-bili-folder-list",
  id: "gh-folder-list"
}, Ii = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, Ui = { class: "card-fullscreen-gh-search" }, Ni = ["title"], Pi = { class: "gh-mode-icon" }, Oi = { class: "gh-mode-text" }, Fi = ["placeholder"], ji = ["title"], Bi = { class: "gh-search-rule-icon" }, zi = { class: "gh-search-rule-text" }, qi = ["title"], Wi = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Yi = {
  class: "card-fullscreen-gh-search gh-hero-search-box-wrap",
  id: "gh-head-search-wrap"
}, Vi = ["title"], Ki = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Xi = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Qi = ["placeholder"], Ji = ["title"], Zi = { class: "gh-search-rule-icon" }, eu = { class: "gh-search-rule-text" }, tu = ["title"], su = ["title"], ou = { class: "gh-header-msg-label" }, nu = {
  key: 0,
  class: "gh-header-msg-badge"
}, au = { class: "gh-settings-anchor" }, lu = ["aria-expanded", "aria-label", "title"], ru = {
  id: "vue-github-repositories-root",
  style: { flex: "1", "min-height": "0", display: "flex", "flex-direction": "column" }
}, iu = /* @__PURE__ */ Se({
  __name: "GitHubWorkspaceCard",
  setup(w) {
    const u = Ct(() => import("./GitHubSettingsModal-BrxBFl2t.js")), l = Ct(() => import("./LauncherBookGuideDialog-DCANnM-F.js")), { active: r } = Et("card-github", "/github.html");
    let p = 0, m = !1, S;
    const C = R(""), b = R("dashboard");
    he(() => r.value && b.value === "stars", ($) => K.setAiViewActive($), { immediate: !0, flush: "sync" });
    const y = R(!1), L = R("local"), G = R(""), U = R(""), I = R(0), A = R("fuzzy"), H = R(null), z = R(!1), D = R(!1);
    he(r, ($) => {
      $ || (D.value = !1);
    });
    const x = R(0);
    function Q() {
      r.value && (z.value = !0, ++x.value);
    }
    const ee = R(!1);
    he(z, ($) => {
      $ && (ee.value = !0);
    });
    const ie = R(null), ne = R(0);
    function N($) {
      ie.value = $ || document.getElementById("gh-sidebar-stars-btn"), z.value = !0;
    }
    let O = 0;
    function F($) {
      $ === "dashboard" && (H.value = null), b.value = $, $ === "trending" ? Rt.switchTab("trending") : Rt.switchTab("stars");
    }
    function q() {
      b.value = "stars";
    }
    const W = ae(() => [
      { id: "exact", icon: "🎯", name: E("search.rule.exact"), desc: E("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: E("search.rule.fuzzy"), desc: E("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: E("search.rule.topic"), desc: E("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: E("search.rule.smart"), desc: E("search.rule.smartDesc") }
    ]), oe = R(K.searchRule || "exact"), le = ae(() => W.value.find(($) => $.id === oe.value) || W.value[0]);
    function ue() {
      const $ = K.cycleSearchRule();
      oe.value = $;
    }
    const me = ae(() => L.value === "global" ? E("github.searchGlobalPlaceholder") : E("github.searchLocalPlaceholder", { rule: le.value.name }));
    function ye() {
      clearTimeout(O), !(!r.value || L.value !== "local") && (O = window.setTimeout(() => K.setSearchQuery(G.value.trim().toLowerCase()), 180));
    }
    function ge() {
      L.value = L.value === "local" ? "global" : "local", L.value === "local" && ye();
    }
    function _e() {
      H.value = null, G.value = "", clearTimeout(O), K.resetLocalSearch();
    }
    function Me($, a) {
      const v = $.trim();
      v && (clearTimeout(O), U.value = v, A.value = a, I.value++, L.value = "global", G.value = v, F("dashboard"), H.value = "global");
    }
    function Re() {
      const $ = G.value.trim();
      L.value === "local" ? (clearTimeout(O), K.setSearchQuery($.toLowerCase())) : $ && Me($, "fuzzy");
    }
    he(() => [r.value, Qt.github?.id], ([$, a]) => {
      if (!$ || !a) return;
      const v = Xt("github");
      v && Me(v.keyword, K.searchRule || "exact");
    }, { immediate: !0 });
    function De() {
      G.value.trim() && (L.value === "local" ? (clearTimeout(O), K.setSearchQuery(G.value.trim().toLowerCase()), H.value = "local") : Re());
    }
    function Le() {
      ++ne.value, ++p, m = !0, C.value = "";
    }
    return he(r, async ($) => {
      if (clearTimeout(O), !$) return;
      const a = ++p;
      if ((!S || S.signal.aborted) && (S = new AbortController(), K.setRepositoryViewSignal(S.signal)), m) {
        await K.resumeRepositoryReads();
        return;
      }
      if (K.repos.length || K.loadingAllStars || K.loadingPage) {
        m = !0;
        return;
      }
      try {
        const v = await vt();
        if (a !== p || S.signal.aborted) return;
        m = !0, await K.loadGitHub(v.ghUser, v.ghToken);
      } catch {
        if (a !== p || S?.signal.aborted) return;
        m = !1, C.value = E("github.initError");
      }
    }, { immediate: !0, flush: "sync" }), ft(() => {
      K.setAiViewActive(!1), ++p, S?.abort(), clearTimeout(O);
    }), ($, a) => (t(), s("section", {
      class: Y(["card wide", { "card-fullscreen": n(Jt).activeId === "card-github" }]),
      id: "card-github",
      inert: !n(r)
    }, [
      a[35] || (a[35] = e("header", { class: "card-head" }, [
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
      C.value ? (t(), s("p", ni, o(C.value), 1)) : k("", !0),
      e("div", ai, [
        e("div", li, [
          e("aside", ri, [
            e("div", {
              class: Y(["fo-sidebar-toggle-bar", { "is-collapsed": y.value }]),
              title: y.value ? n(E)("github.channel.toggleExpand") : n(E)("github.channel.toggleCollapse"),
              onClick: a[0] || (a[0] = (v) => y.value = !y.value)
            }, [
              e("div", ui, [
                a[17] || (a[17] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, o(n(E)("github.channel.channels")), 1),
                y.value ? (t(), s("span", ci, "5")) : k("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !y.value,
                title: y.value ? n(E)("github.expand") : n(E)("github.collapse")
              }, [
                e("span", null, o(y.value ? n(E)("github.expand") : n(E)("github.collapse")), 1),
                e("span", pi, o(y.value ? "▾" : "▴"), 1)
              ], 8, di)
            ], 10, ii),
            y.value ? k("", !0) : (t(), s("div", hi, [
              e("div", gi, [
                e("button", {
                  id: "gh-sidebar-dashboard-btn",
                  type: "button",
                  class: Y(["fo-sidebar-sub-btn", { on: b.value === "dashboard" }]),
                  title: "GitHub 首页",
                  onClick: a[1] || (a[1] = (v) => F("dashboard"))
                }, [...a[18] || (a[18] = [
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
              e("div", mi, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: Y(["fo-sidebar-sub-btn", { on: b.value === "stars" }]),
                  title: n(E)("github.channel.starsTitle"),
                  onClick: a[2] || (a[2] = (v) => F("stars"))
                }, [
                  e("div", vi, [
                    a[19] || (a[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", bi, [
                      e("strong", null, o(n(E)("github.channel.stars")), 1),
                      e("small", null, o(n(E)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  a[20] || (a[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, fi)
              ]),
              e("div", yi, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: Y(["fo-sidebar-sub-btn", { on: b.value === "trending" }]),
                  title: n(E)("github.channel.trendingTitle"),
                  onClick: a[3] || (a[3] = (v) => F("trending"))
                }, [
                  e("div", wi, [
                    a[21] || (a[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", ki, [
                      e("strong", null, o(n(E)("github.channel.trending")), 1),
                      e("small", null, o(n(E)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  a[22] || (a[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, _i)
              ]),
              e("div", $i, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: Y(["fo-sidebar-sub-btn", { on: b.value === "awesome" }]),
                  title: n(E)("github.channel.awesomeTitle"),
                  onClick: a[4] || (a[4] = (v) => F("awesome"))
                }, [
                  e("div", Si, [
                    a[23] || (a[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", Gi, [
                      e("strong", null, o(n(E)("github.channel.awesome")), 1),
                      e("small", null, o(n(E)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  a[24] || (a[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, Ci)
              ]),
              e("div", Ri, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: Y(["fo-sidebar-sub-btn", { on: b.value === "repos" }]),
                  title: n(E)("github.channel.reposTitle"),
                  onClick: a[5] || (a[5] = (v) => F("repos"))
                }, [
                  e("div", Ti, [
                    a[25] || (a[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", Di, [
                      e("strong", null, o(n(E)("github.channel.repos")), 1),
                      e("small", null, o(n(E)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  a[26] || (a[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, Mi)
              ])
            ])),
            e("header", Li, [
              e("div", null, [
                e("b", Ai, [
                  a[27] || (a[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  X(" " + o(n(E)("github.lists.title")), 1)
                ]),
                e("small", Hi, o(n(E)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: n(E)("github.lists.new"),
                "aria-label": n(E)("github.lists.new"),
                onClick: a[6] || (a[6] = (v) => n(K).promptCreateFolder())
              }, "＋", 8, xi)
            ]),
            e("nav", Ei, [
              Ae(jt, {
                active: n(r),
                onSelect: q
              }, null, 8, ["active"])
            ])
          ]),
          e("section", Ii, [
            b.value === "dashboard" ? (t(), ve(hl, {
              key: 0,
              active: n(r),
              "account-revision": ne.value,
              "show-results": !!H.value,
              onChannel: F,
              onSettings: N,
              onNotifications: a[8] || (a[8] = (v) => n(He).open())
            }, {
              search: tt(() => [
                e("div", Ui, [
                  e("form", {
                    class: "gh-search-box",
                    role: "search",
                    onSubmit: te(De, ["prevent"])
                  }, [
                    e("button", {
                      type: "button",
                      class: "gh-search-mode-toggle",
                      title: L.value === "local" ? n(E)("github.searchScope.toGlobal") : n(E)("github.searchScope.toLocal"),
                      onClick: ge
                    }, [
                      e("span", Pi, o(L.value === "local" ? "⭐" : "🌐"), 1),
                      e("span", Oi, o(L.value === "local" ? n(E)("github.searchScope.local") : n(E)("github.searchScope.global")), 1),
                      a[28] || (a[28] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
                    ], 8, Ni),
                    be(e("input", {
                      "onUpdate:modelValue": a[7] || (a[7] = (v) => G.value = v),
                      placeholder: me.value,
                      "aria-label": "搜索 GitHub 仓库",
                      autocomplete: "off"
                    }, null, 8, Fi), [
                      [Ie, G.value]
                    ]),
                    L.value === "local" ? (t(), s("button", {
                      key: 0,
                      type: "button",
                      class: Y(["gh-search-rule-btn", `rule-${le.value.id}`]),
                      title: n(E)("github.ruleHint", { rule: le.value.name, desc: le.value.desc }),
                      onClick: te(ue, ["stop"])
                    }, [
                      e("span", Bi, o(le.value.icon), 1),
                      e("span", zi, o(le.value.name), 1)
                    ], 10, ji)) : k("", !0),
                    be(e("button", {
                      type: "button",
                      class: "gh-search-clear-btn",
                      title: n(E)("github.clearSearch"),
                      onClick: _e
                    }, "✕", 8, qi), [
                      [je, G.value]
                    ]),
                    a[29] || (a[29] = e("button", {
                      type: "submit",
                      title: "搜索",
                      "aria-label": "搜索"
                    }, "⌕", -1))
                  ], 32)
                ])
              ]),
              results: tt(() => [
                H.value === "global" ? (t(), ve(Mt, {
                  key: 0,
                  embedded: "",
                  query: U.value,
                  "request-id": I.value,
                  rule: A.value,
                  onBack: _e
                }, null, 8, ["query", "request-id", "rule"])) : H.value === "local" ? (t(), ve(fa, {
                  key: 1,
                  onBack: _e
                })) : k("", !0)
              ]),
              _: 1
            }, 8, ["active", "account-revision", "show-results"])) : b.value === "search" ? (t(), ve(Mt, {
              key: 1,
              query: U.value,
              "request-id": I.value,
              rule: A.value,
              onBack: a[9] || (a[9] = (v) => F("stars"))
            }, null, 8, ["query", "request-id", "rule"])) : b.value === "stars" && n(at).accountConfigured === !1 ? (t(), ve(Ft, {
              key: 2,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: a[10] || (a[10] = (v) => N())
            })) : b.value === "stars" ? (t(), s(B, { key: 3 }, [
              e("header", Wi, [
                Ae(Bt, {
                  onOpenAiSettings: Q,
                  onOpenGuide: a[14] || (a[14] = (v) => D.value = !0)
                }, {
                  search: tt(() => [
                    e("div", Yi, [
                      e("form", {
                        id: "gh-search-form",
                        class: "gh-search-box",
                        onSubmit: te(Re, ["prevent"])
                      }, [
                        e("button", {
                          type: "button",
                          id: "gh-search-mode-toggle",
                          class: "gh-search-mode-toggle",
                          title: L.value === "local" ? n(E)("github.searchScope.toGlobal") : n(E)("github.searchScope.toLocal"),
                          onClick: ge
                        }, [
                          e("span", Ki, o(L.value === "local" ? "⭐" : "🌐"), 1),
                          e("span", Xi, o(L.value === "local" ? n(E)("github.searchScope.local") : n(E)("github.searchScope.global")), 1),
                          a[30] || (a[30] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
                        ], 8, Vi),
                        be(e("input", {
                          id: "gh-search-input",
                          "onUpdate:modelValue": a[11] || (a[11] = (v) => G.value = v),
                          placeholder: me.value,
                          autocomplete: "off",
                          onInput: ye
                        }, null, 40, Qi), [
                          [Ie, G.value]
                        ]),
                        L.value === "local" ? (t(), s("button", {
                          key: 0,
                          type: "button",
                          class: Y(["gh-search-rule-btn", `rule-${le.value.id}`]),
                          title: n(E)("github.ruleHint", { rule: le.value.name, desc: le.value.desc }),
                          onClick: te(ue, ["stop"])
                        }, [
                          e("span", Zi, o(le.value.icon), 1),
                          e("span", eu, o(le.value.name), 1)
                        ], 10, Ji)) : k("", !0),
                        be(e("button", {
                          type: "button",
                          id: "gh-search-clear-btn",
                          class: "gh-search-clear-btn",
                          title: n(E)("github.clearSearch"),
                          onClick: _e
                        }, "✕", 8, tu), [
                          [je, G.value]
                        ]),
                        a[31] || (a[31] = e("button", {
                          type: "submit",
                          id: "gh-search-submit-btn",
                          title: "搜索"
                        }, "⌕", -1))
                      ], 32),
                      a[32] || (a[32] = e("div", {
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
                          X("精确")
                        ]),
                        e("label", { title: "宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" }, [
                          e("input", {
                            type: "checkbox",
                            value: "loose"
                          }),
                          X("宽松匹配")
                        ]),
                        e("label", { title: "近义词：自动扩展相关英文词，例如 ai → llm / machine learning" }, [
                          e("input", {
                            type: "checkbox",
                            value: "related"
                          }),
                          X("近义词")
                        ]),
                        e("label", { title: "主题标签：搜索 GitHub Topics 标签，例如 topic:llm" }, [
                          e("input", {
                            type: "checkbox",
                            value: "topic"
                          }),
                          X("主题标签")
                        ]),
                        e("label", { title: "说明文档：搜索仓库 README 内容" }, [
                          e("input", {
                            type: "checkbox",
                            value: "readme"
                          }),
                          X("说明文档")
                        ])
                      ], -1)),
                      a[33] || (a[33] = e("div", {
                        id: "gh-search-suggest",
                        class: "gh-search-suggest",
                        hidden: ""
                      }, null, -1))
                    ])
                  ]),
                  "actions-prefix": tt(() => [
                    e("button", {
                      id: "gh-header-msg-center-btn",
                      class: Y(["gh-header-msg-btn", { "has-unread": n(j).unreadCount > 0, "is-active": n(j).isOpen }]),
                      type: "button",
                      title: n(j).unreadCount > 0 ? n(E)("github.header.msgUnread", { count: n(j).unreadCount }) : n(E)("github.header.msgCenter"),
                      onClick: a[12] || (a[12] = (v) => n(He).toggle())
                    }, [
                      a[34] || (a[34] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
                      e("span", ou, o(n(E)("github.header.msg")), 1),
                      n(j).unreadCount > 0 ? (t(), s("span", nu, o(n(j).unreadCount > 99 ? "99+" : n(j).unreadCount), 1)) : k("", !0)
                    ], 10, su),
                    e("div", au, [
                      e("button", {
                        type: "button",
                        ref_key: "settingsButton",
                        ref: ie,
                        "aria-expanded": z.value,
                        "aria-label": n(E)("github.settings"),
                        class: "gh-head-settings-btn",
                        title: n(E)("github.header.settings"),
                        onClick: a[13] || (a[13] = (v) => z.value = !z.value)
                      }, " ⚙️ ", 8, lu)
                    ])
                  ]),
                  _: 1
                })
              ]),
              e("div", ru, [
                Ae(Un, {
                  active: n(r) && b.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : b.value === "trending" ? (t(), ve(zt, { key: 4 })) : b.value === "awesome" ? (t(), ve(fs, { key: 5 })) : b.value === "repos" ? (t(), ve(_o, {
              key: 6,
              active: n(r) && b.value === "repos"
            }, null, 8, ["active"])) : k("", !0)
          ])
        ])
      ]),
      ee.value ? (t(), ve(n(u), {
        key: 1,
        visible: n(r) && z.value,
        anchor: ie.value,
        "ai-request": x.value,
        onAccountReload: Le,
        onClose: a[15] || (a[15] = (v) => z.value = !1)
      }, null, 8, ["visible", "anchor", "ai-request"])) : k("", !0),
      D.value ? (t(), ve(n(l), {
        key: 2,
        open: D.value,
        title: "GitHub 使用手册",
        spreads: n(si),
        "help-selector": ".gh-github-help-btn",
        onClose: a[16] || (a[16] = (v) => D.value = !1)
      }, null, 8, ["open", "spreads"])) : k("", !0),
      Ae(zl),
      Ae(ti)
    ], 10, oi));
  }
}), wu = /* @__PURE__ */ Ge(iu, [["__scopeId", "data-v-4d379f02"]]);
export {
  wu as default
};
