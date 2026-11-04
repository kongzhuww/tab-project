import { d as ge, o as n, g as l, h as e, n as oe, q as pe, i as C, F as O, j as B, C as I, t as r, u as t, k as Q, b as D, y as Y, r as we, w as ue, D as Ae, z as Re, A as Ve, m as ye, e as se, l as qe, B as Ye, p as J, G as je, L as st, H as ot, s as te, E as at } from "./vendor-vue-FFI3kJnP.js";
import { u as nt } from "./useCardActivity-BM3aijHX.js";
import { D as Ke, E as fe, t as W, y as rt } from "./search.service-DacqWPJU.js";
import { g as it, _ as lt, a as ut, G as ct, b as Oe, c as dt, d as pt } from "./main-DKRVuPBK.js";
import { A as ht } from "./AccountSetupGuide-ZDGhjuNx.js";
import mt from "./GitHubTrending-BKVesHCo.js";
import { _ as be, t as v } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { s as Pe } from "./storage-cache.service-BYF2zxXX.js";
import { n as Fe, r as gt } from "./view-styles-CGAqmtBD.js";
import { m as ae } from "./core-utils-Ccz-tarm.js";
const ft = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], bt = [
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
], vt = { class: "gh-awesome-wrapper" }, yt = { class: "gh-awesome-header" }, wt = { class: "gh-awesome-intro" }, _t = { class: "gh-awesome-search-box" }, kt = { class: "gh-awesome-pills" }, $t = ["onClick"], Ct = { class: "gh-awesome-grid" }, Gt = ["onClick"], Tt = { class: "gh-awesome-card-head" }, St = { class: "gh-awesome-card-name" }, At = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Rt = { class: "gh-awesome-desc" }, Ht = { class: "gh-awesome-footer" }, Mt = { class: "gh-awesome-tags" }, xt = ["href"], Lt = {
  key: 0,
  class: "gh-awesome-empty"
}, Dt = /* @__PURE__ */ ge({
  __name: "GitHubAwesome",
  setup(h) {
    const u = D("all"), a = D(""), c = Y(() => {
      const f = a.value.trim().toLowerCase(), A = u.value;
      return bt.filter((d) => A === "all" || d.category === A ? f ? d.name.toLowerCase().includes(f) || d.title.toLowerCase().includes(f) || d.desc.toLowerCase().includes(f) || d.tags.some((y) => y.toLowerCase().includes(f)) : !0 : !1);
    });
    function b(f) {
      window.open(f, "_blank", "noreferrer");
    }
    return (f, A) => (n(), l("div", vt, [
      e("header", yt, [
        e("div", wt, [
          A[3] || (A[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", _t, [
            oe(e("input", {
              "onUpdate:modelValue": A[0] || (A[0] = (d) => a.value = d),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [pe, a.value]
            ]),
            a.value ? (n(), l("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: A[1] || (A[1] = (d) => a.value = "")
            }, "✕")) : C("", !0)
          ])
        ]),
        e("div", kt, [
          (n(!0), l(O, null, B(t(ft), (d) => (n(), l("button", {
            key: d.id,
            type: "button",
            class: I(["gh-awesome-pill", { active: u.value === d.id }]),
            onClick: (x) => u.value = d.id
          }, [
            e("span", null, r(d.icon), 1),
            e("b", null, r(d.name), 1)
          ], 10, $t))), 128))
        ])
      ]),
      e("div", Ct, [
        (n(!0), l(O, null, B(c.value, (d) => (n(), l("article", {
          key: d.id,
          class: "gh-awesome-card",
          onClick: (x) => b(d.url)
        }, [
          e("div", Tt, [
            e("div", St, [
              e("strong", null, r(d.title), 1),
              e("small", null, r(d.name), 1)
            ]),
            e("span", At, "★ " + r(d.stars), 1)
          ]),
          e("p", Rt, r(d.desc), 1),
          e("div", Ht, [
            e("div", Mt, [
              (n(!0), l(O, null, B(d.tags, (x) => (n(), l("span", {
                key: x,
                class: "gh-awesome-tag"
              }, r(x), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: d.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: A[2] || (A[2] = Q(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, xt)
          ])
        ], 8, Gt))), 128)),
        c.value.length ? C("", !0) : (n(), l("div", Lt, [...A[4] || (A[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Ut = /* @__PURE__ */ be(Dt, [["__scopeId", "data-v-28a8995f"]]), We = "gh_my_repos_cache_v1", ce = "gh_my_repo_groups_v2", de = "gh_my_repo_groups_map_v2", G = we({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function re(h) {
  return h.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class le {
  constructor() {
    this.abortController = null;
  }
  static getInstance() {
    return le.instance || (le.instance = new le()), le.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略）
   */
  async load(u = !1) {
    this.abortController?.abort(), this.abortController = new AbortController();
    const a = this.abortController.signal;
    await this.loadPersistedGroups();
    const c = await Pe.get(We);
    if (c && c.length && this.hydrateRepos(c), !u && c && c.length) {
      this.fetchRemote(a).catch(() => {
      });
      return;
    }
    G.loading = !0, G.errorMessage = "";
    try {
      await this.fetchRemote(a);
    } catch (b) {
      if (b.name === "AbortError") return;
      G.errorMessage = b.message || "获取个人仓库失败";
    } finally {
      G.loading = !1;
    }
  }
  async fetchRemote(u) {
    const { ghUser: a, ghToken: c } = await Ke();
    if (!a && !c) {
      G.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    let b = "https://api.github.com/user/repos?type=owner&sort=updated&per_page=100";
    c || (b = `https://api.github.com/users/${encodeURIComponent(a)}/repos?type=owner&sort=updated&per_page=100`);
    const f = fe(c), A = await fetch(b, {
      method: "GET",
      headers: f,
      signal: u
    });
    if (!A.ok)
      throw A.status === 401 ? new Error("GitHub Token 无效或已过期，请在设置中更新。") : A.status === 403 ? new Error("GitHub API 频率受限或无权访问，请检查 Token 权限。") : new Error(`GitHub 请求失败 (HTTP ${A.status})`);
    const d = await A.json();
    if (!Array.isArray(d))
      throw new Error("GitHub 返回数据格式异常");
    const x = d.map((y) => {
      const R = y.full_name || `${y.owner?.login || a}/${y.name}`, $ = G.repoGroupsMap[R] || [];
      return {
        id: y.id,
        name: y.name,
        fullName: R,
        description: y.description || "",
        isPrivate: !!y.private,
        isFork: !!y.fork,
        htmlUrl: y.html_url || `https://github.com/${a}/${y.name}`,
        language: y.language || null,
        stargazersCount: Number(y.stargazers_count) || 0,
        forksCount: Number(y.forks_count) || 0,
        openIssuesCount: Number(y.open_issues_count) || 0,
        topics: Array.isArray(y.topics) ? y.topics.map((H) => String(H).toLowerCase()) : [],
        localGroups: $,
        updatedAt: y.updated_at || "",
        pushedAt: y.pushed_at || "",
        defaultBranch: y.default_branch || "main"
      };
    });
    this.hydrateRepos(x), await Pe.set(We, x, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(u) {
    G.repos = u.map((a) => {
      const c = G.repoGroupsMap[a.fullName] || a.localGroups || [];
      return {
        ...a,
        localGroups: [...new Set(c.filter(Boolean))]
      };
    });
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(u, a) {
    const c = re(a);
    c && (u.localGroups.includes(c) || u.localGroups.push(c), G.repoGroupsMap[u.fullName] = [...u.localGroups], await this.persistGroupsMap());
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(u, a) {
    u.localGroups = u.localGroups.filter((c) => c !== a), G.repoGroupsMap[u.fullName] = [...u.localGroups], await this.persistGroupsMap();
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(u, a) {
    if (!a)
      u.localGroups = [];
    else {
      const c = re(a);
      if (!c) return;
      u.localGroups = [c];
    }
    G.repoGroupsMap[u.fullName] = [...u.localGroups], await this.persistGroupsMap();
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(u) {
    const a = re(u);
    return a ? G.customGroups.includes(a) ? (alert(`分组「${a}」已存在。`), null) : (G.customGroups.push(a), await this.persistGroups(), a) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(u, a) {
    const c = re(a);
    return c ? u === c ? !0 : G.customGroups.includes(c) ? (alert(`已存在名为「${c}」的分组。`), !1) : (G.customGroups = G.customGroups.map((b) => b === u ? c : b), G.repos.forEach((b) => {
      b.localGroups.includes(u) && (b.localGroups = b.localGroups.map((f) => f === u ? c : f), G.repoGroupsMap[b.fullName] = [...b.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(u) {
    const a = G.repos.filter((b) => b.localGroups.includes(u)).length, c = a > 0 ? `确定删除分组「${u}」吗？
该分组下的 ${a} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${u}」吗？`;
    return confirm(c) ? (G.customGroups = G.customGroups.filter((b) => b !== u), G.repos.forEach((b) => {
      b.localGroups.includes(u) && (b.localGroups = b.localGroups.filter((f) => f !== u), G.repoGroupsMap[b.fullName] = [...b.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const u = await chrome.storage.local.get([ce, de]), a = u?.[ce];
        Array.isArray(a) && (G.customGroups = a.map(re).filter(Boolean));
        const c = u?.[de];
        c && typeof c == "object" && (G.repoGroupsMap = c);
      } else {
        const u = localStorage.getItem(ce);
        u && (G.customGroups = JSON.parse(u));
        const a = localStorage.getItem(de);
        a && (G.repoGroupsMap = JSON.parse(a));
      }
    } catch {
    }
  }
  async persistGroups() {
    const u = Array.from(new Set(G.customGroups.map(re).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [ce]: u }) : localStorage.setItem(ce, JSON.stringify(u));
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [de]: G.repoGroupsMap }) : localStorage.setItem(de, JSON.stringify(G.repoGroupsMap));
    } catch {
    }
  }
}
const q = le.getInstance(), Et = { class: "my-repos-workspace" }, It = {
  key: 0,
  class: "error-banner"
}, Nt = { class: "shelf-header" }, jt = { class: "shelf-left" }, Ot = { class: "shelf-badge" }, Pt = { class: "shelf-right" }, Ft = { class: "shelf-search-wrap" }, Wt = ["disabled", "title"], Bt = ["title"], zt = ["onDragstart", "onContextmenu"], Vt = { class: "repo-card-head" }, qt = ["title", "onClick"], Yt = {
  key: 0,
  class: "badge-repo-visibility private"
}, Kt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Xt = ["title"], Qt = {
  key: 1,
  class: "repo-topics-row"
}, Jt = { class: "repo-card-footer" }, Zt = { class: "meta-left" }, es = {
  key: 0,
  class: "meta-item lang"
}, ts = { class: "meta-item" }, ss = {
  key: 1,
  class: "meta-item"
}, os = ["title"], as = {
  key: 0,
  class: "empty-shelf-placeholder"
}, ns = { class: "board-columns-track" }, rs = ["onDragover", "onDragleave", "onDrop"], is = { class: "column-header" }, ls = {
  key: 0,
  class: "column-title-group"
}, us = ["title"], cs = { class: "badge-count" }, ds = {
  key: 1,
  class: "column-rename-group"
}, ps = ["onKeydown"], hs = ["onClick"], ms = { class: "column-actions" }, gs = ["onClick"], fs = {
  key: 0,
  class: "col-popover-menu"
}, bs = ["onClick"], vs = ["onClick"], ys = { class: "column-cards-scroll" }, ws = ["onDragstart", "onContextmenu"], _s = { class: "repo-card-head" }, ks = ["title", "onClick"], $s = {
  key: 0,
  class: "badge-repo-visibility private"
}, Cs = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Gs = ["title"], Ts = { class: "repo-topics-row" }, Ss = { class: "topic-chip active-chip" }, As = ["onClick"], Rs = { class: "repo-card-footer" }, Hs = { class: "meta-left" }, Ms = {
  key: 0,
  class: "meta-item lang"
}, xs = { class: "meta-item" }, Ls = {
  key: 1,
  class: "meta-item"
}, Ds = { class: "meta-date" }, Us = {
  key: 0,
  class: "empty-column-placeholder"
}, Es = { class: "board-column new-column-slot" }, Is = {
  key: 1,
  class: "new-column-composer"
}, Ns = { class: "composer-actions" }, js = ["onClick"], Os = /* @__PURE__ */ ge({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(h) {
    const u = h, a = D(""), c = D(!1), b = D(null), f = D(""), A = D(null), d = D(null), x = D(null), y = D(!1);
    function R() {
      y.value = !y.value;
    }
    function $(o) {
      const s = x.value;
      s && (Math.abs(o.deltaX) > Math.abs(o.deltaY) && o.deltaX !== 0 || o.deltaY !== 0 && (o.preventDefault(), s.scrollLeft += o.deltaY));
    }
    const H = D(null), k = D(null), _ = D(null);
    let w = null, N = 0;
    const S = we({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), F = D(null), ee = D(!1);
    function z() {
      S.visible = !1, F.value = null;
    }
    function K(o, s, i) {
      o.preventDefault(), o.stopPropagation();
      let m = o.clientX, V = o.clientY;
      m > window.innerWidth - 200 && (m = window.innerWidth - 210), V > window.innerHeight - 240 && (V = window.innerHeight - 245), S.x = m, S.y = V, S.repo = s, S.fromGroup = i, S.visible = !0, F.value = "folder", ee.value = m > window.innerWidth - 380;
    }
    async function ne() {
      const o = S.repo;
      z(), o && await q.moveRepoToGroup(o, null);
    }
    async function M(o) {
      const s = S.repo;
      z(), s && await q.moveRepoToGroup(s, o);
    }
    async function L() {
      const o = S.repo;
      if (z(), !!o)
        try {
          await navigator.clipboard.writeText(o.htmlUrl), Fe.show({
            appName: "GitHub",
            title: v("github.myRepos.copiedUrlTitle"),
            message: v("github.myRepos.copiedUrlMsg", { name: o.name })
          });
        } catch {
        }
    }
    async function U() {
      const o = S.repo;
      if (z(), !!o)
        try {
          const s = `git clone ${o.htmlUrl}.git`;
          await navigator.clipboard.writeText(s), Fe.show({
            appName: "GitHub",
            title: v("github.myRepos.copiedCloneTitle"),
            message: s
          });
        } catch {
        }
    }
    function j() {
      const o = S.repo;
      z(), o && Ge(o.htmlUrl);
    }
    function X() {
      const o = S.repo;
      z(), o && it.open({
        fullName: o.fullName,
        description: o.description || "",
        stars: o.stargazersCount,
        language: o.language || void 0,
        updated: o.pushedAt
      });
    }
    function Z(o) {
      o.target?.closest(".gh-repo-context-menu") || S.visible && z();
    }
    function E(o) {
      o.key === "Escape" && S.visible && z();
    }
    const g = Y(() => G.customGroups), P = Y(() => {
      const o = G.searchQuery.trim().toLowerCase();
      return o ? G.repos.filter(
        (s) => s.name.toLowerCase().includes(o) || s.description.toLowerCase().includes(o) || s.localGroups.some((i) => i.toLowerCase().includes(o)) || s.topics.some((i) => i.toLowerCase().includes(o)) || s.language && s.language.toLowerCase().includes(o)
      ) : G.repos;
    }), _e = Y(() => P.value.filter((o) => !o.localGroups.length));
    function ke(o) {
      return P.value.filter((s) => s.localGroups.includes(o));
    }
    async function He() {
      const o = a.value.trim();
      if (!o) return;
      await q.createGroup(o) && (a.value = "", c.value = !1);
    }
    function Xe(o) {
      A.value = o, f.value = o, b.value = null;
    }
    async function Me(o) {
      const s = f.value.trim();
      if (!s || s === o) {
        A.value = null;
        return;
      }
      await q.renameGroup(o, s) && (A.value = null);
    }
    async function Qe(o) {
      b.value = null, await q.deleteGroup(o);
    }
    async function Je(o, s) {
      await q.removeRepoFromGroup(o, s);
    }
    function Ze(o) {
      const s = d.value;
      if (!s) return;
      const m = o.target?.closest(".column-cards-scroll");
      if (m && m.scrollHeight > m.clientHeight && !o.shiftKey && o.deltaX === 0) {
        const V = m.scrollTop <= 0 && o.deltaY < 0, tt = m.scrollTop + m.clientHeight >= m.scrollHeight - 1 && o.deltaY > 0;
        if (!V && !tt)
          return;
      }
      Math.abs(o.deltaX) > Math.abs(o.deltaY) && o.deltaX !== 0 || o.deltaY !== 0 && (o.preventDefault(), s.scrollLeft += o.deltaY);
    }
    function $e(o) {
      if (!H.value || !d.value) return;
      o.preventDefault();
      const s = o.deltaX !== 0 ? o.deltaX : o.deltaY;
      d.value.scrollLeft += s;
    }
    function xe() {
      if (w !== null) return;
      const o = () => {
        d.value && N !== 0 ? (d.value.scrollLeft += N, w = requestAnimationFrame(o)) : ve();
      };
      w = requestAnimationFrame(o);
    }
    function ve() {
      w !== null && (cancelAnimationFrame(w), w = null), N = 0;
    }
    function Le(o) {
      if (!H.value || !d.value) return;
      const s = d.value.getBoundingClientRect(), i = 100;
      if (o > s.right - i) {
        const m = Math.min(1, Math.max(0.1, (o - (s.right - i)) / i));
        N = Math.round(m * 20), xe();
      } else if (o < s.left + i) {
        const m = Math.min(1, Math.max(0.1, (s.left + i - o) / i));
        N = -Math.round(m * 20), xe();
      } else
        ve();
    }
    function et(o) {
      H.value && (o.preventDefault(), Le(o.clientX));
    }
    function De(o, s, i) {
      z(), H.value = s, k.value = i, o.dataTransfer && (o.dataTransfer.effectAllowed = "move", o.dataTransfer.setData("text/plain", `${s.id}:${i}`)), window.addEventListener("wheel", $e, { passive: !1 });
    }
    function Ce() {
      H.value = null, k.value = null, _.value = null, ve(), window.removeEventListener("wheel", $e);
    }
    function Ue(o, s) {
      H.value && (o.preventDefault(), o.dataTransfer && (o.dataTransfer.dropEffect = "move"), _.value = s, Le(o.clientX));
    }
    function Ee(o, s) {
      const i = o.currentTarget, m = o.relatedTarget;
      i?.contains(m) || _.value === s && (_.value = null);
    }
    async function Ie(o, s) {
      o.preventDefault();
      const i = H.value, m = k.value;
      Ce(), i && (s === "default" ? m && m !== "default" ? await q.removeRepoFromGroup(i, m) : await q.moveRepoToGroup(i, null) : (await q.addRepoToGroup(i, s), m && m !== "default" && m !== s && await q.removeRepoFromGroup(i, m)));
    }
    function Ge(o) {
      window.open(o, "_blank", "noopener,noreferrer");
    }
    function Ne(o) {
      if (!o) return "";
      try {
        const s = new Date(o);
        return `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}-${String(s.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ue(
      () => u.active,
      (o) => {
        window.removeEventListener("pointerdown", Z), window.removeEventListener("keydown", E), z(), o && (window.addEventListener("pointerdown", Z), window.addEventListener("keydown", E), q.load());
      },
      { immediate: !0 }
    ), Ae(() => {
      u.active && (window.addEventListener("pointerdown", Z), window.addEventListener("keydown", E), q.load());
    }), Re(() => {
      ve(), window.removeEventListener("wheel", $e), window.removeEventListener("pointerdown", Z), window.removeEventListener("keydown", E);
    }), (o, s) => (n(), l("div", Et, [
      t(G).errorMessage ? (n(), l("div", It, [
        e("span", null, "⚠️ " + r(t(G).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: s[0] || (s[0] = (i) => t(q).load(!0))
        }, "重试")
      ])) : C("", !0),
      e("section", {
        class: I(["default-shelf-area", { "is-collapsed": y.value, "drop-active": _.value === "default" }]),
        onDragover: s[4] || (s[4] = (i) => Ue(i, "default")),
        onDragleave: s[5] || (s[5] = (i) => Ee(i, "default")),
        onDrop: s[6] || (s[6] = (i) => Ie(i, "default"))
      }, [
        e("header", Nt, [
          e("div", jt, [
            s[23] || (s[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            s[24] || (s[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", Ot, r(_e.value.length), 1),
            s[25] || (s[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", Pt, [
            e("div", Ft, [
              s[26] || (s[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              oe(e("input", {
                "onUpdate:modelValue": s[1] || (s[1] = (i) => t(G).searchQuery = i),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [pe, t(G).searchQuery]
              ]),
              t(G).searchQuery ? (n(), l("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: s[2] || (s[2] = (i) => t(G).searchQuery = "")
              }, "✕")) : C("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(G).loading,
              title: t(v)("github.myRepos.refreshBtnTitle"),
              onClick: s[3] || (s[3] = (i) => t(q).load(!0))
            }, [
              e("span", {
                class: I({ spinning: t(G).loading })
              }, "🔄", 2),
              e("span", null, r(t(G).loading ? t(v)("github.myRepos.refreshing") : t(v)("common.refresh")), 1)
            ], 8, Wt),
            e("button", {
              type: "button",
              class: "shelf-toggle-btn",
              title: y.value ? t(v)("github.myRepos.expandShelf") : t(v)("github.myRepos.collapseShelf"),
              onClick: R
            }, r(y.value ? t(v)("github.myRepos.expandBtn") : t(v)("github.myRepos.collapseBtn")), 9, Bt)
          ])
        ]),
        oe(e("div", {
          ref_key: "shelfScrollRef",
          ref: x,
          class: "shelf-cards-scroll",
          onWheel: $
        }, [
          (n(!0), l(O, null, B(_e.value, (i) => (n(), l("div", {
            key: i.id,
            class: I(["repo-card shelf-card", { "card-dragging": H.value?.id === i.id }]),
            draggable: "true",
            onDragstart: (m) => De(m, i, "default"),
            onDragend: Ce,
            onContextmenu: (m) => K(m, i, "default")
          }, [
            e("div", Vt, [
              e("span", {
                class: "repo-name",
                title: i.fullName,
                onClick: (m) => Ge(i.htmlUrl)
              }, r(i.name), 9, qt),
              i.isPrivate ? (n(), l("span", Yt, "私有")) : C("", !0),
              i.isFork ? (n(), l("span", Kt, "Fork")) : C("", !0)
            ]),
            i.description ? (n(), l("p", {
              key: 0,
              class: "repo-desc",
              title: i.description
            }, r(i.description), 9, Xt)) : C("", !0),
            i.topics.length ? (n(), l("div", Qt, [
              (n(!0), l(O, null, B(i.topics, (m) => (n(), l("span", {
                key: m,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + r(m), 1))), 128))
            ])) : C("", !0),
            e("div", Jt, [
              e("div", Zt, [
                i.language ? (n(), l("span", es, [
                  s[27] || (s[27] = e("span", { class: "lang-color" }, null, -1)),
                  J(r(i.language), 1)
                ])) : C("", !0),
                e("span", ts, "⭐ " + r(i.stargazersCount), 1),
                i.forksCount ? (n(), l("span", ss, "🍴 " + r(i.forksCount), 1)) : C("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + i.updatedAt
              }, r(Ne(i.pushedAt || i.updatedAt)), 9, os)
            ])
          ], 42, zt))), 128)),
          _e.value.length ? C("", !0) : (n(), l("div", as, [...s[28] || (s[28] = [
            e("span", null, "暂无未分类仓库，所有仓库都已归入下方自定义板块", -1)
          ])]))
        ], 544), [
          [Ve, !y.value]
        ])
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: d,
        class: "board-viewport",
        onWheel: Ze,
        onDragover: et
      }, [
        e("div", ns, [
          (n(!0), l(O, null, B(g.value, (i) => (n(), l("section", {
            key: i,
            class: I(["board-column topic-column", { "drop-active": _.value === i }]),
            onDragover: (m) => Ue(m, i),
            onDragleave: (m) => Ee(m, i),
            onDrop: (m) => Ie(m, i)
          }, [
            e("header", is, [
              A.value !== i ? (n(), l("div", ls, [
                s[29] || (s[29] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + i
                }, " 📁 " + r(i), 9, us),
                e("span", cs, r(ke(i).length), 1)
              ])) : (n(), l("div", ds, [
                oe(e("input", {
                  "onUpdate:modelValue": s[7] || (s[7] = (m) => f.value = m),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    ye((m) => Me(i), ["enter"]),
                    s[8] || (s[8] = ye((m) => A.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, ps), [
                  [pe, f.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (m) => Me(i)
                }, "✓", 8, hs),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: s[9] || (s[9] = (m) => A.value = null)
                }, "✕")
              ])),
              e("div", ms, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (m) => b.value = b.value === i ? null : i
                }, "•••", 8, gs),
                b.value === i ? (n(), l("div", fs, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (m) => Xe(i)
                  }, " 重命名分组 ", 8, bs),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (m) => Qe(i)
                  }, " 删除分组 ", 8, vs)
                ])) : C("", !0)
              ])
            ]),
            e("div", ys, [
              (n(!0), l(O, null, B(ke(i), (m) => (n(), l("div", {
                key: m.id,
                class: I(["repo-card", { "card-dragging": H.value?.id === m.id }]),
                draggable: "true",
                onDragstart: (V) => De(V, m, i),
                onDragend: Ce,
                onContextmenu: (V) => K(V, m, i)
              }, [
                e("div", _s, [
                  e("span", {
                    class: "repo-name",
                    title: m.fullName,
                    onClick: (V) => Ge(m.htmlUrl)
                  }, r(m.name), 9, ks),
                  m.isPrivate ? (n(), l("span", $s, "私有")) : C("", !0),
                  m.isFork ? (n(), l("span", Cs, "Fork")) : C("", !0)
                ]),
                m.description ? (n(), l("p", {
                  key: 0,
                  class: "repo-desc",
                  title: m.description
                }, r(m.description), 9, Gs)) : C("", !0),
                e("div", Ts, [
                  e("span", Ss, [
                    J(" 📁 " + r(i) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: Q((V) => Je(m, i), ["stop"])
                    }, "✕", 8, As)
                  ]),
                  (n(!0), l(O, null, B(m.topics, (V) => (n(), l("span", {
                    key: V,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + r(V), 1))), 128))
                ]),
                e("div", Rs, [
                  e("div", Hs, [
                    m.language ? (n(), l("span", Ms, [
                      s[30] || (s[30] = e("span", { class: "lang-color" }, null, -1)),
                      J(r(m.language), 1)
                    ])) : C("", !0),
                    e("span", xs, "⭐ " + r(m.stargazersCount), 1),
                    m.forksCount ? (n(), l("span", Ls, "🍴 " + r(m.forksCount), 1)) : C("", !0)
                  ]),
                  e("span", Ds, r(Ne(m.pushedAt || m.updatedAt)), 1)
                ])
              ], 42, ws))), 128)),
              ke(i).length ? C("", !0) : (n(), l("div", Us, [...s[31] || (s[31] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, rs))), 128)),
          e("section", Es, [
            c.value ? (n(), l("div", Is, [
              s[33] || (s[33] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              oe(e("input", {
                "onUpdate:modelValue": s[11] || (s[11] = (i) => a.value = i),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  ye(He, ["enter"]),
                  s[12] || (s[12] = ye((i) => c.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [pe, a.value]
              ]),
              e("div", Ns, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: He
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: s[13] || (s[13] = (i) => c.value = !1)
                }, r(t(v)("common.cancel")), 1)
              ])
            ])) : (n(), l("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: s[10] || (s[10] = (i) => c.value = !0)
            }, [...s[32] || (s[32] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (n(), se(qe, { to: "body" }, [
        S.visible && S.repo ? (n(), l("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Ye({ left: `${S.x}px`, top: `${S.y}px` }),
          onClick: s[21] || (s[21] = Q(() => {
          }, ["stop"])),
          onContextmenu: s[22] || (s[22] = Q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: I(["gh-menu-has-sub", { "is-active": F.value === "folder" }]),
            onMouseenter: s[16] || (s[16] = (i) => F.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: s[14] || (s[14] = Q((i) => F.value = F.value === "folder" ? null : "folder", ["stop"]))
            }, [...s[34] || (s[34] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: I(["gh-sub-flyout", { "flyout-left": ee.value }]),
              onClick: s[15] || (s[15] = Q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: I(["fo-cover-menu-item", { primary: !S.repo.localGroups.length }]),
                type: "button",
                onClick: ne
              }, r(S.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (n(!0), l(O, null, B(g.value, (i) => (n(), l("button", {
                key: i,
                class: I(["fo-cover-menu-item", { primary: S.repo.localGroups.includes(i) }]),
                type: "button",
                onClick: (m) => M(i)
              }, r(S.repo.localGroups.includes(i) ? "✓ " : "  ") + "📁 " + r(i), 11, js))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[17] || (s[17] = (i) => F.value = null),
            onClick: L
          }, r(t(v)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[18] || (s[18] = (i) => F.value = null),
            onClick: U
          }, r(t(v)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[19] || (s[19] = (i) => F.value = null),
            onClick: X
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[20] || (s[20] = (i) => F.value = null),
            onClick: j
          }, r(t(v)("github.myRepos.openInGitHub")), 33)
        ], 36)) : C("", !0)
      ]))
    ]));
  }
}), Ps = /* @__PURE__ */ be(Os, [["__scopeId", "data-v-afd138b5"]]);
function Fs(h) {
  const u = h.subject?.url, a = h.repository?.html_url || "https://github.com";
  if (!u) return a;
  const c = h.subject?.type;
  return c === "Issue" ? u.replace("https://api.github.com/repos/", "https://github.com/") : c === "PullRequest" ? u.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : c === "Release" ? u.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : u.replace("https://api.github.com/repos/", "https://github.com/");
}
function Ws(h) {
  try {
    const u = Date.now() - new Date(h).getTime();
    if (u < 6e4) return "刚刚";
    const a = Math.floor(u / 6e4);
    if (a < 60) return `${a} 分钟前`;
    const c = Math.floor(a / 60);
    if (c < 24) return `${c} 小时前`;
    const b = Math.floor(c / 24);
    return b < 30 ? `${b} 天前` : h.slice(5, 10);
  } catch {
    return "";
  }
}
const T = we({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), ie = {
  open() {
    T.isOpen = !0, (!T.items.length || Date.now() - T.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    T.isOpen = !1;
  },
  toggle() {
    T.isOpen ? this.close() : this.open();
  },
  setTab(h) {
    T.activeKind = h;
  },
  async refresh() {
    const h = W.token?.trim();
    if (!h) {
      T.items = [], T.unreadCount = 0, T.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    T.loading = !0, T.error = "";
    try {
      const u = {
        ...fe(h),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, a = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: u
      });
      if (!a.ok)
        throw a.status === 401 ? new Error("GitHub Token 无效或已过期") : a.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${a.status})`);
      const c = await a.json();
      if (!Array.isArray(c))
        throw new Error("GitHub 返回数据异常");
      const b = c.map((f) => ({
        id: String(f.id),
        unread: !!f.unread,
        reason: String(f.reason || ""),
        updatedAt: f.updated_at,
        formattedTime: Ws(f.updated_at),
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
        htmlUrl: Fs(f)
      }));
      T.items = b, T.unreadCount = b.filter((f) => f.unread).length, T.lastFetchedAt = Date.now();
    } catch (u) {
      console.warn("[GitHubNotifications] 读取失败:", u), T.error = u?.message || "网络请求异常";
    } finally {
      T.loading = !1;
    }
  },
  openTarget(h) {
    typeof window < "u" && window.open(h.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, p = we({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function he(h) {
  try {
    const u = Date.now() - new Date(h).getTime(), a = Math.floor(u / 6e4);
    if (a < 1) return "刚刚";
    if (a < 60) return `${a}分钟前`;
    const c = Math.floor(a / 60);
    if (c < 24) return `${c}小时前`;
    const b = Math.floor(c / 24);
    if (b < 30) return `${b}天前`;
    const f = new Date(h);
    return `${f.getFullYear()}/${f.getMonth() + 1}/${f.getDate()}`;
  } catch {
    return "";
  }
}
function me(h) {
  switch (h) {
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
function Bs(h) {
  return h ? {
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
  }[h] || (h.startsWith(":") && h.endsWith(":") ? h.slice(1, -1) : h) : "";
}
function Te(h) {
  if (!Array.isArray(h)) return [];
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
  return h.map((a) => ({
    emoji: u[a.content] || a.content,
    count: a.reactors?.totalCount || a.users?.totalCount || 0
  })).filter((a) => a.count > 0);
}
function Be(h) {
  if (!h || typeof h != "object") return [];
  const u = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, a = [];
  for (const [c, b] of Object.entries(u)) {
    const f = Number(h[c] || 0);
    f > 0 && a.push({ emoji: b, count: f });
  }
  return a;
}
async function ze(h, u) {
  if (!h) return "";
  try {
    const a = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...fe(u),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: h, mode: "gfm" })
    });
    if (a.ok)
      return await a.text();
  } catch {
  }
  return ae.renderMarkdown(h);
}
async function zs(h, u, a, c) {
  const b = `
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
        ...fe(c),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: b,
        variables: { owner: h, name: u, num: a }
      })
    });
    if (!f.ok) return null;
    const d = (await f.json())?.data?.repository?.discussion;
    if (!d) return null;
    let x = 0;
    const y = (d.comments?.nodes || []).map((H) => {
      const k = H.replies?.nodes || [];
      x += k.length;
      const _ = k.map((w) => ({
        id: w.id,
        author: {
          login: w.author?.login || "匿名",
          avatarUrl: w.author?.avatarUrl || "",
          association: me(w.authorAssociation)
        },
        createdAt: w.createdAt,
        formattedTime: he(w.createdAt),
        body: w.body || "",
        bodyHtml: w.bodyHTML || (w.body ? ae.renderMarkdown(w.body) : ""),
        reactions: Te(w.reactionGroups)
      }));
      return {
        id: H.id,
        author: {
          login: H.author?.login || "匿名",
          avatarUrl: H.author?.avatarUrl || "",
          association: me(H.authorAssociation)
        },
        createdAt: H.createdAt,
        formattedTime: he(H.createdAt),
        body: H.body || "",
        bodyHtml: H.bodyHTML || (H.body ? ae.renderMarkdown(H.body) : "<p>（评论内容为空）</p>"),
        reactions: Te(H.reactionGroups),
        replies: _
      };
    }), R = d.body || "", $ = d.bodyHTML && d.bodyHTML.trim().length > 10 ? d.bodyHTML : R ? ae.renderMarkdown(R) : "<p>（主贴内容为空）</p>";
    return {
      title: d.title,
      number: a,
      state: "discussion",
      category: d.category ? {
        name: d.category.name,
        emoji: Bs(d.category.emoji)
      } : void 0,
      author: {
        login: d.author?.login || "未知",
        avatarUrl: d.author?.avatarUrl || "",
        association: me(d.authorAssociation)
      },
      createdAt: d.createdAt,
      formattedTime: he(d.createdAt),
      body: R,
      bodyHtml: $,
      htmlUrl: d.url,
      commentsCount: d.comments?.totalCount || y.length,
      totalRepliesCount: x,
      comments: y,
      reactions: Te(d.reactionGroups)
    };
  } catch {
    return null;
  }
}
const Se = {
  async open(h) {
    p.isOpen = !0, p.loading = !0, p.error = "", p.data = null, p.notificationItem = h;
    const u = W.token?.trim() || "", a = {
      ...fe(u),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const c = h.subject?.url, b = h.subject?.type, f = h.repository?.fullName || "", [A, d] = f.split("/"), x = c?.match(/\/(\d+)$/), y = x ? Number(x[1]) : void 0;
      if (b === "Discussion" && A && d && y) {
        const R = await zs(A, d, y, u);
        if (R) {
          p.data = {
            notificationId: h.id,
            title: R.title || h.subject.title,
            number: y,
            state: "discussion",
            category: R.category,
            author: R.author || { login: h.repository.owner.login, avatarUrl: h.repository.owner.avatarUrl || "" },
            createdAt: R.createdAt || h.updatedAt,
            formattedTime: R.formattedTime || h.formattedTime,
            body: R.body || "",
            bodyHtml: R.bodyHtml || (R.body ? ae.renderMarkdown(R.body) : ""),
            htmlUrl: R.htmlUrl || h.htmlUrl,
            commentsCount: R.commentsCount || 0,
            totalRepliesCount: R.totalRepliesCount || 0,
            comments: R.comments || [],
            reactions: R.reactions || [],
            repositoryFullName: f,
            type: "Discussion"
          };
          return;
        }
      }
      if (c) {
        const R = await fetch(c, { headers: a, cache: "no-store" });
        if (R.ok) {
          const $ = await R.json();
          let H = [];
          if ($.comments_url && $.comments > 0)
            try {
              const w = await fetch(`${$.comments_url}?per_page=50`, { headers: a, cache: "no-store" });
              if (w.ok) {
                const N = await w.json();
                Array.isArray(N) && (H = await Promise.all(
                  N.map(async (S) => {
                    const F = S.body_html || (S.body ? await ze(S.body, u) : "");
                    return {
                      id: S.id,
                      author: {
                        login: S.user?.login || "匿名",
                        avatarUrl: S.user?.avatar_url || "",
                        association: me(S.author_association)
                      },
                      createdAt: S.created_at,
                      formattedTime: he(S.created_at),
                      body: S.body || "",
                      bodyHtml: F,
                      reactions: Be(S.reactions)
                    };
                  })
                ));
              }
            } catch (w) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", w);
            }
          const k = $.body || "";
          let _ = $.body_html || "";
          !_ && k && (_ = await ze(k, u)), !_ && k && (_ = ae.renderMarkdown(k)), p.data = {
            notificationId: h.id,
            title: $.title || $.name || h.subject.title,
            number: $.number || y,
            state: $.merged ? "merged" : $.state || $.conclusion || "open",
            author: {
              login: $.user?.login || $.author?.login || h.repository.owner.login,
              avatarUrl: $.user?.avatar_url || $.author?.avatar_url || h.repository.owner.avatarUrl || "",
              association: me($.author_association)
            },
            createdAt: $.created_at || $.published_at || h.updatedAt,
            formattedTime: he($.created_at || $.published_at || h.updatedAt),
            body: k,
            bodyHtml: _ || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: $.html_url || h.htmlUrl,
            commentsCount: typeof $.comments == "number" ? $.comments : H.length,
            comments: H,
            reactions: Be($.reactions),
            repositoryFullName: f,
            type: b || "Issue"
          };
          return;
        }
      }
      p.data = {
        notificationId: h.id,
        title: h.subject.title,
        number: y,
        state: "open",
        author: {
          login: h.repository.owner.login,
          avatarUrl: h.repository.owner.avatarUrl || ""
        },
        createdAt: h.updatedAt,
        formattedTime: h.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: h.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: f,
        type: b || "通知"
      };
    } catch (c) {
      console.warn("[GitHubNotificationDetail] 读取异常:", c), p.error = c?.message || "网络请求异常";
    } finally {
      p.loading = !1;
    }
  },
  close() {
    p.isOpen = !1, p.data = null, p.error = "";
  }
}, Vs = { class: "vue-gh-notification-panel-wrapper" }, qs = { class: "gh-msg-header" }, Ys = { class: "gh-msg-account" }, Ks = { class: "gh-msg-subtitle" }, Xs = {
  class: "gh-msg-tabs",
  role: "tablist"
}, Qs = ["onClick"], Js = { class: "gh-msg-list" }, Zs = {
  key: 0,
  class: "gh-msg-loading"
}, eo = {
  key: 1,
  class: "gh-msg-error"
}, to = {
  key: 2,
  class: "gh-msg-empty"
}, so = ["onClick"], oo = { class: "gh-card-indicator-col" }, ao = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, no = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, ro = { class: "gh-card-type-col" }, io = ["title"], lo = { class: "gh-card-main-col" }, uo = { class: "gh-card-repo-row" }, co = ["title"], po = { class: "gh-card-reason-tag" }, ho = { class: "gh-card-time" }, mo = ["title"], go = { class: "gh-card-footer-row" }, fo = { class: "gh-card-type-label" }, bo = ["onClick"], vo = /* @__PURE__ */ ge({
  __name: "GitHubNotificationPanel",
  setup(h) {
    const u = D(null), a = Y(() => [
      { kind: "all", label: "所有", count: T.items.length },
      { kind: "unread", label: "未读", count: T.items.filter((k) => k.unread).length },
      { kind: "mention", label: "提及", count: T.items.filter((k) => k.reason === "mention").length },
      { kind: "author", label: "作者", count: T.items.filter((k) => k.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: T.items.filter((k) => k.reason === "ci_activity" || k.subject.type === "CheckSuite").length }
    ]), c = Y(() => {
      const k = T.items;
      switch (T.activeKind) {
        case "unread":
          return k.filter((_) => _.unread);
        case "mention":
          return k.filter((_) => _.reason === "mention");
        case "author":
          return k.filter((_) => _.reason === "author");
        case "ci":
          return k.filter((_) => _.reason === "ci_activity" || _.subject.type === "CheckSuite");
        default:
          return k;
      }
    });
    function b(k, _) {
      if (_ === "ci_activity" || k === "CheckSuite")
        return "⚡";
      switch (k) {
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
    function f(k) {
      switch (k) {
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
          return k || "通知";
      }
    }
    function A() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function d() {
      ie.refresh();
    }
    function x() {
      ie.close();
    }
    function y(k) {
      Se.open(k);
    }
    function R(k) {
      ie.openTarget(k);
    }
    function $(k) {
      if (!T.isOpen) return;
      const _ = k.target;
      !u.value?.contains(_) && !_?.closest("#gh-header-msg-center-btn") && ie.close();
    }
    function H(k) {
      k.key === "Escape" && T.isOpen && ie.close();
    }
    return Ae(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", $), window.addEventListener("keydown", H));
    }), Re(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", $), window.removeEventListener("keydown", H));
    }), (k, _) => (n(), l("div", Vs, [
      t(T).isOpen ? (n(), l("section", {
        key: 0,
        ref_key: "panelRef",
        ref: u,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: _[0] || (_[0] = Q(() => {
        }, ["stop"]))
      }, [
        e("header", qs, [
          e("div", Ys, [
            _[2] || (_[2] = e("div", { class: "gh-msg-octo-avatar" }, [
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
              _[1] || (_[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", Ks, " 共 " + r(t(T).items.length) + " 条通知 · " + r(t(T).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          _[3] || (_[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: A
          }, " ↗ "),
          e("button", {
            type: "button",
            class: I(["gh-panel-btn", { "is-spinning": t(T).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: d
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: x
          }, " ✕ ")
        ]),
        e("nav", Xs, [
          (n(!0), l(O, null, B(a.value, (w) => (n(), l("button", {
            key: w.kind,
            type: "button",
            class: I(["gh-msg-tab", { active: t(T).activeKind === w.kind }]),
            onClick: (N) => t(T).activeKind = w.kind
          }, [
            J(r(w.label) + " ", 1),
            w.count > 0 ? (n(), l("span", {
              key: 0,
              class: I(["gh-tab-pill", { "is-unread-pill": w.kind === "unread" }])
            }, r(w.count), 3)) : C("", !0)
          ], 10, Qs))), 128))
        ]),
        e("div", Js, [
          t(T).loading && !t(T).items.length ? (n(), l("div", Zs, [..._[4] || (_[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(T).error ? (n(), l("div", eo, [
            _[5] || (_[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, r(t(T).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: d
            }, "重试")
          ])) : c.value.length === 0 ? (n(), l("div", to, [..._[6] || (_[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (n(!0), l(O, { key: 3 }, B(c.value, (w) => (n(), l("article", {
            key: w.id,
            class: I(["gh-notification-card", { "is-unread": w.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (N) => y(w)
          }, [
            e("div", oo, [
              w.unread ? (n(), l("span", ao)) : (n(), l("span", no))
            ]),
            e("div", ro, [
              e("span", {
                class: "gh-type-badge",
                title: w.subject.type
              }, r(b(w.subject.type, w.reason)), 9, io)
            ]),
            e("div", lo, [
              e("div", uo, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: w.repository.fullName
                }, r(w.repository.fullName), 9, co),
                e("span", po, r(f(w.reason)), 1),
                e("time", ho, r(w.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: w.subject.title
              }, r(w.subject.title), 9, mo),
              e("div", go, [
                e("span", fo, r(w.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: Q((N) => R(w), ["stop"])
                }, "在网页打开 ↗", 8, bo)
              ])
            ])
          ], 10, so))), 128))
        ])
      ], 512)) : C("", !0)
    ]));
  }
}), yo = /* @__PURE__ */ be(vo, [["__scopeId", "data-v-4271efab"]]), wo = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, _o = ["aria-label"], ko = { class: "gh-modal-title-wrap" }, $o = { class: "gh-modal-octo-icon" }, Co = ["href"], Go = { class: "gh-owner" }, To = { class: "gh-name" }, So = {
  key: 1,
  class: "gh-modal-repo-name"
}, Ao = { class: "gh-name" }, Ro = { class: "gh-modal-actions" }, Ho = { class: "gh-modal-content" }, Mo = {
  key: 0,
  class: "gh-content-loading"
}, xo = {
  key: 1,
  class: "gh-content-error"
}, Lo = { class: "gh-discussion-title-header" }, Do = { class: "gh-discussion-h1" }, Uo = {
  key: 0,
  class: "gh-discussion-num"
}, Eo = { class: "gh-discussion-sub-meta" }, Io = {
  key: 0,
  class: "gh-category-pill"
}, No = {
  key: 0,
  class: "cat-emoji"
}, jo = {
  key: 1,
  class: "gh-category-pill"
}, Oo = { class: "gh-sub-author" }, Po = { class: "gh-sub-verb" }, Fo = {
  key: 2,
  class: "gh-sub-comments-count"
}, Wo = { class: "gh-op-post-card" }, Bo = { class: "gh-op-post-head" }, zo = { class: "gh-op-author-left" }, Vo = ["src"], qo = { class: "gh-op-meta" }, Yo = { class: "gh-op-name-row" }, Ko = { class: "gh-op-name" }, Xo = {
  key: 0,
  class: "gh-role-pill"
}, Qo = { class: "gh-op-time" }, Jo = ["innerHTML"], Zo = {
  key: 0,
  class: "gh-reactions-bar"
}, ea = { class: "rx-emoji" }, ta = { class: "rx-count" }, sa = {
  key: 0,
  class: "gh-comments-block"
}, oa = { class: "gh-comments-header" }, aa = { class: "gh-comments-count-pill" }, na = { class: "gh-comments-feed" }, ra = { class: "gh-comment-head" }, ia = ["src"], la = { class: "gh-comment-meta" }, ua = { class: "gh-comment-author" }, ca = {
  key: 0,
  class: "gh-role-pill small"
}, da = { class: "gh-comment-time" }, pa = ["innerHTML"], ha = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, ma = { class: "rx-emoji" }, ga = { class: "rx-count" }, fa = {
  key: 1,
  class: "gh-comment-replies-thread"
}, ba = { class: "gh-replies-thread-title" }, va = { class: "gh-reply-head" }, ya = ["src"], wa = { class: "gh-reply-meta" }, _a = { class: "gh-reply-author" }, ka = {
  key: 0,
  class: "gh-role-pill tiny"
}, $a = { class: "gh-reply-time" }, Ca = ["innerHTML"], Ga = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, Ta = { class: "rx-emoji" }, Sa = { class: "rx-count" }, Aa = {
  key: 1,
  class: "gh-no-comments"
}, Ra = /* @__PURE__ */ ge({
  __name: "GitHubNotificationDetailDrawer",
  setup(h) {
    const u = D(null), a = D(null), c = D(null);
    let b = !1, f = 0, A = 0, d = 0, x = 0, y = () => {
    };
    const R = Y(() => (p.data?.repositoryFullName || p.notificationItem?.repository.fullName || "").split("/")[0] || ""), $ = Y(() => {
      const M = p.data?.repositoryFullName || p.notificationItem?.repository.fullName || "";
      return M.split("/")[1] || M;
    }), H = Y(() => {
      if (!p.data) return "";
      const M = p.data.bodyHtml?.trim() || "";
      if (M.length > 20) return M;
      const L = p.data.body?.trim() || "";
      return L.length > 0 ? ae.renderMarkdown(L) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), k = Y(() => c.value ? {
      position: "fixed",
      left: `${c.value.x}px`,
      top: `${c.value.y}px`,
      transform: "none"
    } : {});
    ue(
      () => p.isOpen,
      (M) => {
        M && (c.value = null, je(() => {
          a.value && (a.value.scrollTop = 0);
        }));
      }
    ), ue(
      () => p.data,
      (M) => {
        M && je(() => {
          a.value && (a.value.scrollTop = 0);
        });
      }
    );
    function _(M) {
      if (M.target.closest("button, a, input")) return;
      y();
      const L = u.value;
      if (!L || !p.isOpen) return;
      b = !0;
      const U = L.getBoundingClientRect();
      d = U.left, x = U.top, f = M.clientX, A = M.clientY, c.value = { x: d, y: x };
      const j = (Z) => {
        if (!b) return;
        const E = Z.clientX - f, g = Z.clientY - A;
        c.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, d + E)),
          y: Math.max(10, Math.min(window.innerHeight - 80, x + g))
        };
      }, X = () => {
        b = !1, window.removeEventListener("mousemove", j), window.removeEventListener("mouseup", X);
      };
      y = X, window.addEventListener("mousemove", j), window.addEventListener("mouseup", X);
    }
    function w() {
      Se.close();
    }
    function N() {
      const M = p.data?.htmlUrl || p.notificationItem?.htmlUrl;
      M && typeof window < "u" && window.open(M, "_blank", "noopener,noreferrer");
    }
    function S(M) {
      const U = M.target?.closest("a");
      U && U.href && (M.preventDefault(), M.stopPropagation(), window.open(U.href, "_blank", "noopener,noreferrer"));
    }
    function F() {
      p.notificationItem && Se.open(p.notificationItem);
    }
    function ee(M) {
      switch (M) {
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
    function z(M) {
      switch (M) {
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
          return M || "通知详情";
      }
    }
    function K(M) {
      switch (M) {
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
          return M || "";
      }
    }
    function ne(M) {
      M.key === "Escape" && p.isOpen && w();
    }
    return Ae(() => {
      window.addEventListener("keydown", ne);
    }), Re(() => {
      window.removeEventListener("keydown", ne), y();
    }), (M, L) => (n(), se(qe, { to: "body" }, [
      t(p).isOpen ? (n(), l("div", wo, [
        e("div", {
          ref_key: "windowRef",
          ref: u,
          class: "gh-nonmodal-window",
          style: Ye(k.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(p).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: _
          }, [
            e("div", ko, [
              e("span", $o, r(ee(t(p).data?.type || t(p).notificationItem?.subject.type)), 1),
              t(p).data?.htmlUrl || t(p).notificationItem?.htmlUrl ? (n(), l("a", {
                key: 0,
                href: t(p).data?.htmlUrl || t(p).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", Go, r(R.value), 1),
                L[0] || (L[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", To, r($.value), 1),
                L[1] || (L[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, Co)) : (n(), l("span", So, [
                e("strong", Ao, r(t(p).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", Ro, [
              t(p).data?.state ? (n(), l("span", {
                key: 0,
                class: I(["gh-detail-state-pill", t(p).data.state])
              }, r(K(t(p).data.state)), 3)) : C("", !0),
              t(p).data?.htmlUrl || t(p).notificationItem?.htmlUrl ? (n(), l("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: N
              }, " 在网页打开 ↗ ")) : C("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: w
              }, " ✕ ")
            ])
          ], 32),
          e("div", Ho, [
            t(p).loading ? (n(), l("div", Mo, [
              L[2] || (L[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + r(t(p).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(p).error ? (n(), l("div", xo, [
              L[3] || (L[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, r(t(p).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: F
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: N
                }, "在 GitHub 打开 ↗")
              ])
            ])) : t(p).data ? (n(), l("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: a,
              class: "gh-detail-scrollable",
              onClick: S
            }, [
              e("div", Lo, [
                e("h1", Do, [
                  J(r(t(p).data.title) + " ", 1),
                  t(p).data.number ? (n(), l("span", Uo, "#" + r(t(p).data.number), 1)) : C("", !0)
                ]),
                e("div", Eo, [
                  t(p).data.category ? (n(), l("span", Io, [
                    t(p).data.category.emoji ? (n(), l("span", No, r(t(p).data.category.emoji), 1)) : C("", !0),
                    e("span", null, r(t(p).data.category.name), 1)
                  ])) : (n(), l("span", jo, r(z(t(p).data.type)), 1)),
                  e("span", Oo, r(t(p).data.author.login), 1),
                  e("span", Po, "发布于 " + r(t(p).data.formattedTime), 1),
                  t(p).data.commentsCount ? (n(), l("span", Fo, [
                    J(" · " + r(t(p).data.commentsCount) + " 条讨论主题 ", 1),
                    t(p).data.totalRepliesCount ? (n(), l(O, { key: 0 }, [
                      J(" （含 " + r(t(p).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : C("", !0)
                  ])) : C("", !0)
                ])
              ]),
              e("article", Wo, [
                e("div", Bo, [
                  e("div", zo, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(p).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Vo),
                    e("div", qo, [
                      e("div", Yo, [
                        e("strong", Ko, r(t(p).data.author.login), 1),
                        t(p).data.author.association ? (n(), l("span", Xo, r(t(p).data.author.association), 1)) : C("", !0)
                      ]),
                      e("time", Qo, r(t(p).data.formattedTime), 1)
                    ])
                  ]),
                  L[4] || (L[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                L[5] || (L[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: H.value
                }, null, 8, Jo),
                t(p).data.reactions?.length ? (n(), l("div", Zo, [
                  (n(!0), l(O, null, B(t(p).data.reactions, (U) => (n(), l("span", {
                    key: U.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", ea, r(U.emoji), 1),
                    e("span", ta, r(U.count), 1)
                  ]))), 128))
                ])) : C("", !0)
              ]),
              t(p).data.comments.length ? (n(), l("div", sa, [
                e("div", oa, [
                  L[6] || (L[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", aa, [
                    J(r(t(p).data.commentsCount) + " 条主题 ", 1),
                    t(p).data.totalRepliesCount ? (n(), l(O, { key: 0 }, [
                      J(" · " + r(t(p).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : C("", !0)
                  ])
                ]),
                e("div", na, [
                  (n(!0), l(O, null, B(t(p).data.comments, (U) => (n(), l("div", {
                    key: U.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", ra, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: U.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, ia),
                      e("div", la, [
                        e("span", ua, r(U.author.login), 1),
                        U.author.association ? (n(), l("span", ca, r(U.author.association), 1)) : C("", !0),
                        e("time", da, r(U.formattedTime), 1)
                      ])
                    ]),
                    L[7] || (L[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: U.bodyHtml
                    }, null, 8, pa),
                    U.reactions?.length ? (n(), l("div", ha, [
                      (n(!0), l(O, null, B(U.reactions, (j) => (n(), l("span", {
                        key: j.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", ma, r(j.emoji), 1),
                        e("span", ga, r(j.count), 1)
                      ]))), 128))
                    ])) : C("", !0),
                    U.replies?.length ? (n(), l("div", fa, [
                      e("div", ba, [
                        e("span", null, "💬 " + r(U.replies.length) + " 条回复对话", 1)
                      ]),
                      (n(!0), l(O, null, B(U.replies, (j) => (n(), l("div", {
                        key: j.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", va, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: j.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, ya),
                          e("div", wa, [
                            e("strong", _a, r(j.author.login), 1),
                            j.author.association ? (n(), l("span", ka, r(j.author.association), 1)) : C("", !0),
                            e("time", $a, r(j.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: j.bodyHtml
                        }, null, 8, Ca),
                        j.reactions?.length ? (n(), l("div", Ga, [
                          (n(!0), l(O, null, B(j.reactions, (X) => (n(), l("span", {
                            key: X.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", Ta, r(X.emoji), 1),
                            e("span", Sa, r(X.count), 1)
                          ]))), 128))
                        ])) : C("", !0)
                      ]))), 128))
                    ])) : C("", !0)
                  ]))), 128))
                ])
              ])) : (n(), l("div", Aa, [...L[8] || (L[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : C("", !0)
          ])
        ], 12, _o)
      ])) : C("", !0)
    ]));
  }
}), Ha = /* @__PURE__ */ be(Ra, [["__scopeId", "data-v-d22ba06c"]]), Ma = ["inert"], xa = { class: "card-head" }, La = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, Da = ["title"], Ua = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Ea = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Ia = ["placeholder"], Na = ["title"], ja = { class: "gh-search-rule-icon" }, Oa = { class: "gh-search-rule-text" }, Pa = ["title"], Fa = ["title"], Wa = { class: "gh-header-msg-label" }, Ba = {
  key: 0,
  class: "gh-header-msg-badge"
}, za = { class: "gh-settings-anchor" }, Va = ["aria-expanded", "aria-label", "title"], qa = {
  key: 0,
  class: "muted small",
  role: "status"
}, Ya = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Ka = { class: "gh-bili-layout" }, Xa = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, Qa = ["title"], Ja = { class: "fo-sidebar-toggle-title" }, Za = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, en = ["aria-expanded", "title"], tn = { class: "fo-sidebar-toggle-chevron" }, sn = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, on = { class: "fo-sidebar-sub-wrap" }, an = ["title"], nn = { class: "fo-sidebar-sub-main" }, rn = { class: "fo-sidebar-sub-text" }, ln = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, un = ["title"], cn = { class: "fo-sidebar-sub-main" }, dn = { class: "fo-sidebar-sub-text" }, pn = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, hn = ["title"], mn = { class: "fo-sidebar-sub-main" }, gn = { class: "fo-sidebar-sub-text" }, fn = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, bn = ["title"], vn = { class: "fo-sidebar-sub-main" }, yn = { class: "fo-sidebar-sub-text" }, wn = { class: "gh-bili-sidebar-head" }, _n = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, kn = { style: { color: "var(--dim)", "font-size": "9.5px" } }, $n = ["title", "aria-label"], Cn = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, Gn = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Tn = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, Sn = { id: "vue-github-status-root" }, An = { id: "vue-github-repositories-root" }, Rn = /* @__PURE__ */ ge({
  __name: "GitHubWorkspaceCard",
  setup(h) {
    const u = at(() => import("./GitHubSettingsModal-uFg7rv5k.js")), { active: a } = nt("card-github", "/github.html");
    let c = 0, b = !1, f;
    const A = D(""), d = D("stars");
    ue(() => a.value && d.value === "stars", (E) => W.setAiViewActive(E), { immediate: !0, flush: "sync" });
    const x = D(!1), y = D("local"), R = D(""), $ = D(!1), H = D(0);
    function k() {
      a.value && ($.value = !0, ++H.value);
    }
    const _ = D(!1);
    ue($, (E) => {
      E && (_.value = !0);
    });
    const w = D(null);
    let N = 0;
    function S(E) {
      d.value = E, E === "trending" ? Oe.switchTab("trending") : Oe.switchTab("stars");
    }
    function F() {
      d.value = "stars";
    }
    const ee = Y(() => [
      { id: "exact", icon: "🎯", name: v("search.rule.exact"), desc: v("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: v("search.rule.fuzzy"), desc: v("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: v("search.rule.topic"), desc: v("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: v("search.rule.smart"), desc: v("search.rule.smartDesc") }
    ]), z = D(W.searchRule || "exact"), K = Y(() => ee.value.find((E) => E.id === z.value) || ee.value[0]);
    function ne() {
      const E = W.cycleSearchRule();
      z.value = E;
    }
    const M = Y(() => y.value === "global" ? v("github.searchGlobalPlaceholder") : v("github.searchLocalPlaceholder", { rule: K.value.name }));
    function L() {
      clearTimeout(N), !(!a.value || y.value !== "local") && (N = window.setTimeout(() => W.setSearchQuery(R.value.trim().toLowerCase()), 180));
    }
    function U() {
      y.value = y.value === "local" ? "global" : "local", y.value === "local" && L();
    }
    function j() {
      R.value = "", clearTimeout(N), W.resetLocalSearch();
    }
    function X() {
      const E = R.value.trim();
      y.value === "local" ? (clearTimeout(N), W.setSearchQuery(E.toLowerCase())) : E && window.open(`https://github.com/search?q=${encodeURIComponent(E)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function Z() {
      ++c, b = !0, A.value = "";
    }
    return ue(a, async (E) => {
      const g = ++c;
      if (clearTimeout(N), f?.abort(), f = new AbortController(), E || f.abort(), W.setRepositoryViewSignal(f.signal), !!E) {
        if (b) {
          await W.resumeRepositoryReads();
          return;
        }
        if (W.repos.length || W.loadingAllStars || W.loadingPage) {
          b = !0;
          return;
        }
        try {
          const P = await Ke();
          if (!a.value || g !== c) return;
          b = !0, await W.loadGitHub(P.ghUser, P.ghToken);
        } catch {
          if (!a.value || g !== c) return;
          b = !1, A.value = v("github.initError");
        }
      }
    }, { immediate: !0, flush: "sync" }), st(() => {
      W.setAiViewActive(!1), ++c, f?.abort(), clearTimeout(N);
    }), (E, g) => (n(), l("section", {
      class: I(["card wide", { "card-fullscreen": t(gt).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(a)
    }, [
      e("header", xa, [
        g[15] || (g[15] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        g[16] || (g[16] = e("h2", null, "GitHub", -1)),
        g[17] || (g[17] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", La, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: Q(X, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: y.value === "local" ? t(v)("github.searchScope.toGlobal") : t(v)("github.searchScope.toLocal"),
              onClick: U
            }, [
              e("span", Ua, r(y.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Ea, r(y.value === "local" ? t(v)("github.searchScope.local") : t(v)("github.searchScope.global")), 1),
              g[11] || (g[11] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, Da),
            oe(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": g[0] || (g[0] = (P) => R.value = P),
              placeholder: M.value,
              autocomplete: "off",
              onInput: L
            }, null, 40, Ia), [
              [pe, R.value]
            ]),
            y.value === "local" ? (n(), l("button", {
              key: 0,
              type: "button",
              class: I(["gh-search-rule-btn", `rule-${K.value.id}`]),
              title: t(v)("github.ruleHint", { rule: K.value.name, desc: K.value.desc }),
              onClick: Q(ne, ["stop"])
            }, [
              e("span", ja, r(K.value.icon), 1),
              e("span", Oa, r(K.value.name), 1)
            ], 10, Na)) : C("", !0),
            oe(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: t(v)("github.clearSearch"),
              onClick: j
            }, "✕", 8, Pa), [
              [Ve, R.value]
            ]),
            g[12] || (g[12] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          g[13] || (g[13] = ot('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-90a302f8><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-90a302f8><input type="checkbox" value="exact" checked data-v-90a302f8>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-90a302f8><input type="checkbox" value="loose" data-v-90a302f8>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-90a302f8><input type="checkbox" value="related" data-v-90a302f8>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-90a302f8><input type="checkbox" value="topic" data-v-90a302f8>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-90a302f8><input type="checkbox" value="readme" data-v-90a302f8>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-90a302f8></div>', 2))
        ]),
        e("button", {
          id: "gh-header-msg-center-btn",
          class: I(["gh-header-msg-btn", { "has-unread": t(T).unreadCount > 0, "is-active": t(T).isOpen }]),
          type: "button",
          title: t(T).unreadCount > 0 ? t(v)("github.header.msgUnread", { count: t(T).unreadCount }) : t(v)("github.header.msgCenter"),
          onClick: g[1] || (g[1] = (P) => t(ie).toggle())
        }, [
          g[14] || (g[14] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
          e("span", Wa, r(t(v)("github.header.msg")), 1),
          t(T).unreadCount > 0 ? (n(), l("span", Ba, r(t(T).unreadCount > 99 ? "99+" : t(T).unreadCount), 1)) : C("", !0)
        ], 10, Fa),
        e("div", za, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: w,
            "aria-expanded": $.value,
            "aria-label": t(v)("github.settings"),
            class: "gh-head-settings-btn",
            title: t(v)("github.header.settings"),
            onClick: g[2] || (g[2] = (P) => $.value = !$.value)
          }, " ⚙️ ", 8, Va),
          _.value ? (n(), se(t(u), {
            key: 0,
            visible: t(a) && $.value,
            anchor: w.value,
            "ai-request": H.value,
            onAccountReload: Z,
            onClose: g[3] || (g[3] = (P) => $.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : C("", !0)
        ])
      ]),
      A.value ? (n(), l("p", qa, r(A.value), 1)) : C("", !0),
      e("div", Ya, [
        e("div", Ka, [
          e("aside", Xa, [
            e("div", {
              class: I(["fo-sidebar-toggle-bar", { "is-collapsed": x.value }]),
              title: x.value ? t(v)("github.channel.toggleExpand") : t(v)("github.channel.toggleCollapse"),
              onClick: g[4] || (g[4] = (P) => x.value = !x.value)
            }, [
              e("div", Ja, [
                g[18] || (g[18] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, r(t(v)("github.channel.channels")), 1),
                x.value ? (n(), l("span", Za, "3")) : C("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !x.value,
                title: x.value ? t(v)("github.expand") : t(v)("github.collapse")
              }, [
                e("span", null, r(x.value ? t(v)("github.expand") : t(v)("github.collapse")), 1),
                e("span", tn, r(x.value ? "▾" : "▴"), 1)
              ], 8, en)
            ], 10, Qa),
            x.value ? C("", !0) : (n(), l("div", sn, [
              e("div", on, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: d.value === "stars" }]),
                  title: t(v)("github.channel.starsTitle"),
                  onClick: g[5] || (g[5] = (P) => S("stars"))
                }, [
                  e("div", nn, [
                    g[19] || (g[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", rn, [
                      e("strong", null, r(t(v)("github.channel.stars")), 1),
                      e("small", null, r(t(v)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  g[20] || (g[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, an)
              ]),
              e("div", ln, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: d.value === "trending" }]),
                  title: t(v)("github.channel.trendingTitle"),
                  onClick: g[6] || (g[6] = (P) => S("trending"))
                }, [
                  e("div", cn, [
                    g[21] || (g[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", dn, [
                      e("strong", null, r(t(v)("github.channel.trending")), 1),
                      e("small", null, r(t(v)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  g[22] || (g[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, un)
              ]),
              e("div", pn, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: d.value === "awesome" }]),
                  title: t(v)("github.channel.awesomeTitle"),
                  onClick: g[7] || (g[7] = (P) => S("awesome"))
                }, [
                  e("div", mn, [
                    g[23] || (g[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", gn, [
                      e("strong", null, r(t(v)("github.channel.awesome")), 1),
                      e("small", null, r(t(v)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  g[24] || (g[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, hn)
              ]),
              e("div", fn, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: d.value === "repos" }]),
                  title: t(v)("github.channel.reposTitle"),
                  onClick: g[8] || (g[8] = (P) => S("repos"))
                }, [
                  e("div", vn, [
                    g[25] || (g[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", yn, [
                      e("strong", null, r(t(v)("github.channel.repos")), 1),
                      e("small", null, r(t(v)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  g[26] || (g[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, bn)
              ])
            ])),
            e("header", wn, [
              e("div", null, [
                e("b", _n, [
                  g[27] || (g[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  J(" " + r(t(v)("github.lists.title")), 1)
                ]),
                e("small", kn, r(t(v)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: t(v)("github.lists.new"),
                "aria-label": t(v)("github.lists.new"),
                onClick: g[9] || (g[9] = (P) => t(W).promptCreateFolder())
              }, "＋", 8, $n)
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: F
            }, [
              te(lt, { active: t(a) }, null, 8, ["active"])
            ])
          ]),
          e("section", Cn, [
            d.value === "stars" && t(rt).accountConfigured === !1 ? (n(), se(ht, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: g[10] || (g[10] = (P) => $.value = !0)
            })) : d.value === "stars" ? (n(), l(O, { key: 1 }, [
              e("header", Gn, [
                te(dt, { onOpenAiSettings: k })
              ]),
              g[28] || (g[28] = e("div", { class: "gh-main-subbar" }, [
                e("span", {
                  id: "gh-rate",
                  class: "gh-rate"
                }),
                e("button", {
                  type: "button",
                  class: "gh-batch-toggle-btn",
                  id: "gh-batch-toggle-btn",
                  hidden: "",
                  style: { display: "none" }
                }, "批量操作")
              ], -1)),
              e("div", Tn, [
                te(ut, {
                  active: t(a) && d.value === "stars"
                }, null, 8, ["active"])
              ]),
              g[29] || (g[29] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", Sn, [
                te(pt)
              ]),
              e("div", An, [
                te(ct, {
                  active: t(a) && d.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : d.value === "trending" ? (n(), se(mt, { key: 2 })) : d.value === "awesome" ? (n(), se(Ut, { key: 3 })) : d.value === "repos" ? (n(), se(Ps, {
              key: 4,
              active: t(a) && d.value === "repos"
            }, null, 8, ["active"])) : C("", !0)
          ])
        ])
      ]),
      te(yo),
      te(Ha)
    ], 10, Ma));
  }
}), On = /* @__PURE__ */ be(Rn, [["__scopeId", "data-v-90a302f8"]]);
export {
  On as default
};
