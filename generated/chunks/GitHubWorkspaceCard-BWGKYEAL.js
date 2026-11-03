import { d as ge, o as i, g as l, h as e, n as ne, q as pe, i as T, F as P, j as V, C as I, t as n, u as t, k as J, b as D, y as Y, r as ye, w as ue, D as Me, z as Le, p as Q, A as qe, m as ve, e as oe, l as Ye, B as Ke, G as Fe, L as tt, H as st, s as te, E as ot } from "./vendor-vue-FFI3kJnP.js";
import { u as nt } from "./useCardActivity-C0OMv7ky.js";
import { D as He, E as de, t as z, y as at } from "./search.service-DacqWPJU.js";
import { g as it, _ as rt, a as lt, G as ct, b as Be, c as ut, d as dt } from "./main-BtDh0UhL.js";
import { A as pt } from "./AccountSetupGuide-ZDGhjuNx.js";
import ht from "./GitHubTrending-C4ho-4h_.js";
import { _ as fe, t as h } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { s as Re } from "./storage-cache.service-BYF2zxXX.js";
import { n as We, r as mt } from "./view-styles-D7nGbd1d.js";
import { m as ae } from "./core-utils-Ccz-tarm.js";
const gt = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], ft = [
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
], bt = { class: "gh-awesome-wrapper" }, vt = { class: "gh-awesome-header" }, yt = { class: "gh-awesome-intro" }, wt = { class: "gh-awesome-search-box" }, _t = { class: "gh-awesome-pills" }, kt = ["onClick"], $t = { class: "gh-awesome-grid" }, Ct = ["onClick"], Tt = { class: "gh-awesome-card-head" }, Rt = { class: "gh-awesome-card-name" }, At = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, St = { class: "gh-awesome-desc" }, Ht = { class: "gh-awesome-footer" }, xt = { class: "gh-awesome-tags" }, Mt = ["href"], Lt = {
  key: 0,
  class: "gh-awesome-empty"
}, Gt = /* @__PURE__ */ ge({
  __name: "GitHubAwesome",
  setup(g) {
    const c = D("all"), r = D(""), d = Y(() => {
      const f = r.value.trim().toLowerCase(), C = c.value;
      return ft.filter((u) => C === "all" || u.category === C ? f ? u.name.toLowerCase().includes(f) || u.title.toLowerCase().includes(f) || u.desc.toLowerCase().includes(f) || u.tags.some((v) => v.toLowerCase().includes(f)) : !0 : !1);
    });
    function y(f) {
      window.open(f, "_blank", "noreferrer");
    }
    return (f, C) => (i(), l("div", bt, [
      e("header", vt, [
        e("div", yt, [
          C[3] || (C[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", wt, [
            ne(e("input", {
              "onUpdate:modelValue": C[0] || (C[0] = (u) => r.value = u),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [pe, r.value]
            ]),
            r.value ? (i(), l("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: C[1] || (C[1] = (u) => r.value = "")
            }, "✕")) : T("", !0)
          ])
        ]),
        e("div", _t, [
          (i(!0), l(P, null, V(t(gt), (u) => (i(), l("button", {
            key: u.id,
            type: "button",
            class: I(["gh-awesome-pill", { active: c.value === u.id }]),
            onClick: (A) => c.value = u.id
          }, [
            e("span", null, n(u.icon), 1),
            e("b", null, n(u.name), 1)
          ], 10, kt))), 128))
        ])
      ]),
      e("div", $t, [
        (i(!0), l(P, null, V(d.value, (u) => (i(), l("article", {
          key: u.id,
          class: "gh-awesome-card",
          onClick: (A) => y(u.url)
        }, [
          e("div", Tt, [
            e("div", Rt, [
              e("strong", null, n(u.title), 1),
              e("small", null, n(u.name), 1)
            ]),
            e("span", At, "★ " + n(u.stars), 1)
          ]),
          e("p", St, n(u.desc), 1),
          e("div", Ht, [
            e("div", xt, [
              (i(!0), l(P, null, V(u.tags, (A) => (i(), l("span", {
                key: A,
                class: "gh-awesome-tag"
              }, n(A), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: u.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: C[2] || (C[2] = J(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Mt)
          ])
        ], 8, Ct))), 128)),
        d.value.length ? T("", !0) : (i(), l("div", Lt, [...C[4] || (C[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Dt = /* @__PURE__ */ fe(Gt, [["__scopeId", "data-v-28a8995f"]]), Ae = "gh_my_repos_cache_v1", re = "gh_my_repo_custom_topics_v1", S = ye({
  loading: !1,
  syncingTopic: !1,
  errorMessage: "",
  repos: [],
  customTopicNames: [],
  searchQuery: "",
  editingColumnTopic: null,
  composerActiveColumnId: null
});
function se(g) {
  let c = g.trim().toLowerCase();
  return c = c.replace(/[\s_]+/g, "-"), c = c.replace(/[^a-z0-9-]/g, ""), c = c.replace(/^-+|-+$/g, "").replace(/-+/g, "-"), c.length > 35 && (c = c.slice(0, 35).replace(/-+$/, "")), c;
}
class ce {
  constructor() {
    this.abortController = null;
  }
  static getInstance() {
    return ce.instance || (ce.instance = new ce()), ce.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略）
   */
  async load(c = !1) {
    this.abortController?.abort(), this.abortController = new AbortController();
    const r = this.abortController.signal;
    await this.loadPersistedCustomTopics();
    const d = await Re.get(Ae);
    if (d && d.length && (S.repos = d), !c && d && d.length) {
      this.fetchRemote(r).catch(() => {
      });
      return;
    }
    S.loading = !0, S.errorMessage = "";
    try {
      await this.fetchRemote(r);
    } catch (y) {
      if (y.name === "AbortError") return;
      S.errorMessage = y.message || "获取个人仓库失败";
    } finally {
      S.loading = !1;
    }
  }
  async fetchRemote(c) {
    const { ghUser: r, ghToken: d } = await He();
    if (!r && !d) {
      S.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    let y = "https://api.github.com/user/repos?type=owner&sort=updated&per_page=100";
    d || (y = `https://api.github.com/users/${encodeURIComponent(r)}/repos?type=owner&sort=updated&per_page=100`);
    const f = de(d), C = await fetch(y, {
      method: "GET",
      headers: f,
      signal: c
    });
    if (!C.ok)
      throw C.status === 401 ? new Error("GitHub Token 无效或已过期，请在设置中更新。") : C.status === 403 ? new Error("GitHub API 频率受限或无权访问，请检查 Token 权限。") : new Error(`GitHub 请求失败 (HTTP ${C.status})`);
    const u = await C.json();
    if (!Array.isArray(u))
      throw new Error("GitHub 返回数据格式异常");
    const A = u.map((v) => ({
      id: v.id,
      name: v.name,
      fullName: v.full_name || `${v.owner?.login || r}/${v.name}`,
      description: v.description || "",
      isPrivate: !!v.private,
      isFork: !!v.fork,
      htmlUrl: v.html_url || `https://github.com/${r}/${v.name}`,
      language: v.language || null,
      stargazersCount: Number(v.stargazers_count) || 0,
      forksCount: Number(v.forks_count) || 0,
      openIssuesCount: Number(v.open_issues_count) || 0,
      topics: Array.isArray(v.topics) ? v.topics.map((x) => String(x).toLowerCase()) : [],
      updatedAt: v.updated_at || "",
      pushedAt: v.pushed_at || "",
      defaultBranch: v.default_branch || "main"
    }));
    S.repos = A, await Re.set(Ae, A, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 提交单个仓库的 Topics 到 GitHub 远端
   */
  async syncRepoTopics(c, r) {
    const { ghToken: d } = await He();
    if (!d)
      return alert("向 GitHub 更新 Topic 需要在 GitHub 设置中配置具备 repo 写入权限的 Token。"), !1;
    const y = Array.from(new Set(r.map(se).filter(Boolean))).slice(0, 20), [f, C] = c.fullName.split("/"), u = `https://api.github.com/repos/${encodeURIComponent(f)}/${encodeURIComponent(C)}/topics`;
    S.syncingTopic = !0;
    try {
      const A = de(d), v = await fetch(u, {
        method: "PUT",
        headers: {
          ...A,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: y })
      });
      if (!v.ok)
        throw v.status === 401 || v.status === 403 ? new Error("Token 权限不足。修改 Topics 需要包含 repo（或 Administration:write）作用域。") : v.status === 404 ? new Error("仓库未找到或无权修改。") : new Error(`GitHub 远端保存失败 (HTTP ${v.status})`);
      const x = await v.json(), k = Array.isArray(x.names) ? x.names : y;
      return c.topics = k, await Re.set(Ae, S.repos, { ttlMs: 30 * 86400 * 1e3 }), !0;
    } catch (A) {
      return alert(`更新 GitHub Topics 失败：${A.message || A}`), !1;
    } finally {
      S.syncingTopic = !1;
    }
  }
  /**
   * 将仓库添加到指定 Topic（若远端不存在则新增并提交）
   */
  async addRepoToTopic(c, r) {
    const d = se(r);
    if (!d) return !1;
    if (c.topics.includes(d)) return !0;
    const y = [...c.topics, d];
    return this.syncRepoTopics(c, y);
  }
  /**
   * 将仓库从指定 Topic 移除
   */
  async removeRepoFromTopic(c, r) {
    const d = se(r);
    if (!c.topics.includes(d)) return !0;
    const y = c.topics.filter((f) => f !== d);
    return this.syncRepoTopics(c, y);
  }
  /**
   * 新建一个 Topic 列（本地与远端集合）
   */
  async createTopicColumn(c) {
    const r = se(c);
    return r ? S.customTopicNames.includes(r) ? (alert(`Topic「${r}」板块已存在。`), null) : (S.customTopicNames.push(r), await this.persistCustomTopics(), r) : (alert("Topic 名称无效。GitHub 规范：仅限 1~35 位小写英文字母、数字和连字符 '-'。"), null);
  }
  /**
   * 重命名 Topic 列：同步将该板块下所有仓库的旧 Topic 替换为新 Topic 并提交到 GitHub
   */
  async renameTopicColumn(c, r) {
    const d = se(r);
    if (!d)
      return alert("新 Topic 名称无效。仅限小写英文、数字与中划线。"), !1;
    if (c === d) return !0;
    const y = S.repos.filter((f) => f.topics.includes(c));
    if (y.length > 0) {
      if (!confirm(
        `确定将板块「${c}」重命名为「${d}」吗？
这将调用 GitHub API 同步更新该板块下的 ${y.length} 个仓库的远端 Topic。`
      )) return !1;
      S.syncingTopic = !0;
      let C = 0, u = 0;
      for (const A of y) {
        const v = A.topics.map((k) => k === c ? d : k);
        await this.syncRepoTopics(A, v) ? C++ : u++;
      }
      S.syncingTopic = !1, u > 0 && alert(`重命名完成，成功更新 ${C} 个仓库，失败 ${u} 个。`);
    }
    return S.customTopicNames = S.customTopicNames.map((f) => f === c ? d : f), await this.persistCustomTopics(), !0;
  }
  /**
   * 删除 Topic 板块：从该板块下所有仓库中移除该 topic
   */
  async deleteTopicColumn(c) {
    const r = S.repos.filter((y) => y.topics.includes(c)), d = r.length > 0 ? `确定删除板块「${c}」吗？
将从该板块下的 ${r.length} 个仓库中移除此 Topic 并在 GitHub 远端同步。` : `确定删除空板块「${c}」吗？`;
    if (!confirm(d)) return !1;
    if (r.length > 0) {
      S.syncingTopic = !0;
      for (const y of r)
        await this.removeRepoFromTopic(y, c);
      S.syncingTopic = !1;
    }
    return S.customTopicNames = S.customTopicNames.filter((y) => y !== c), await this.persistCustomTopics(), !0;
  }
  async loadPersistedCustomTopics() {
    try {
      const r = (typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([re]) : { [re]: JSON.parse(localStorage.getItem(re) || "[]") })?.[re];
      Array.isArray(r) && (S.customTopicNames = r.map(se).filter(Boolean));
    } catch {
    }
  }
  async persistCustomTopics() {
    const c = Array.from(new Set(S.customTopicNames.map(se).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [re]: c }) : localStorage.setItem(re, JSON.stringify(c));
    } catch {
    }
  }
}
const q = ce.getInstance(), Ut = { class: "my-repos-workspace" }, Nt = {
  key: 0,
  class: "error-banner"
}, It = { class: "shelf-header" }, Et = { class: "shelf-title-group" }, jt = { class: "shelf-title" }, Ot = { class: "badge-count" }, Pt = { class: "shelf-hint" }, Ft = {
  key: 0,
  class: "sync-status"
}, Bt = { class: "shelf-actions" }, Wt = { class: "shelf-search-box" }, zt = ["placeholder"], Vt = ["disabled", "title"], qt = ["title"], Yt = ["onDragstart", "onContextmenu"], Kt = { class: "repo-card-head" }, Xt = ["title", "onClick"], Qt = {
  key: 0,
  class: "badge-repo-visibility private"
}, Jt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Zt = ["title"], es = {
  key: 1,
  class: "repo-topics-row"
}, ts = { class: "repo-card-footer" }, ss = { class: "meta-left" }, os = {
  key: 0,
  class: "meta-item lang"
}, ns = { class: "meta-item" }, as = {
  key: 1,
  class: "meta-item"
}, is = ["title"], rs = {
  key: 0,
  class: "empty-shelf-placeholder"
}, ls = { class: "board-columns-track" }, cs = ["onDragover", "onDragleave", "onDrop"], us = { class: "column-header" }, ds = {
  key: 0,
  class: "column-title-group"
}, ps = ["title"], hs = { class: "badge-count" }, ms = {
  key: 1,
  class: "column-rename-group"
}, gs = ["onKeydown"], fs = ["onClick"], bs = { class: "column-actions" }, vs = ["title", "onClick"], ys = {
  key: 0,
  class: "col-popover-menu"
}, ws = ["onClick"], _s = ["onClick"], ks = { class: "column-cards-scroll" }, $s = ["onDragstart", "onContextmenu"], Cs = { class: "repo-card-head" }, Ts = ["title", "onClick"], Rs = {
  key: 0,
  class: "badge-repo-visibility private"
}, As = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Ss = ["title"], Hs = { class: "repo-topics-row" }, xs = { class: "topic-chip active-chip" }, Ms = ["title", "onClick"], Ls = { class: "repo-card-footer" }, Gs = { class: "meta-left" }, Ds = {
  key: 0,
  class: "meta-item lang"
}, Us = { class: "meta-item" }, Ns = {
  key: 1,
  class: "meta-item"
}, Is = { class: "meta-date" }, Es = {
  key: 0,
  class: "empty-column-placeholder"
}, js = { class: "board-column new-column-slot" }, Os = {
  key: 1,
  class: "new-column-composer"
}, Ps = { class: "composer-header" }, Fs = ["placeholder"], Bs = { class: "composer-actions" }, Ws = ["onClick"], zs = /* @__PURE__ */ ge({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(g) {
    const c = g, r = D(""), d = D(!1), y = D(null), f = D(""), C = D(null), u = D(null), A = D(null), v = D(!1);
    function x() {
      v.value = !v.value;
    }
    function k(o) {
      const s = A.value;
      s && (Math.abs(o.deltaX) > Math.abs(o.deltaY) && o.deltaX !== 0 || o.deltaY !== 0 && (o.preventDefault(), s.scrollLeft += o.deltaY));
    }
    const L = D(null), $ = D(null), _ = D(null);
    let w = null, j = 0;
    const R = ye({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromTopic: null
    }), B = D(null), ee = D(!1);
    function W() {
      R.visible = !1, B.value = null;
    }
    function K(o, s, a) {
      o.preventDefault(), o.stopPropagation();
      let p = o.clientX, E = o.clientY;
      p > window.innerWidth - 200 && (p = window.innerWidth - 210), E > window.innerHeight - 240 && (E = window.innerHeight - 245), R.x = p, R.y = E, R.repo = s, R.fromTopic = a, R.visible = !0, B.value = "folder", ee.value = p > window.innerWidth - 380;
    }
    async function ie() {
      const o = R.repo, s = R.fromTopic;
      W(), o && (s && s !== "default" ? await q.removeRepoFromTopic(o, s) : o.topics.length && await q.syncRepoTopics(o, []));
    }
    async function M(o) {
      const s = R.repo, a = R.fromTopic;
      if (W(), !!s)
        if (a && a !== "default" && a !== o) {
          const p = s.topics.filter((E) => E !== a);
          p.includes(o) || p.push(o), await q.syncRepoTopics(s, p);
        } else
          await q.addRepoToTopic(s, o);
    }
    async function G() {
      const o = R.repo;
      if (W(), !!o)
        try {
          await navigator.clipboard.writeText(o.htmlUrl), We.show({
            appName: "GitHub",
            title: h("github.myRepos.copiedUrlTitle"),
            message: h("github.myRepos.copiedUrlMsg", { name: o.name })
          });
        } catch {
        }
    }
    async function U() {
      const o = R.repo;
      if (W(), !!o)
        try {
          const s = `git clone ${o.htmlUrl}.git`;
          await navigator.clipboard.writeText(s), We.show({
            appName: "GitHub",
            title: h("github.myRepos.copiedCloneTitle"),
            message: s
          });
        } catch {
        }
    }
    function O() {
      const o = R.repo;
      W(), o && Ce(o.htmlUrl);
    }
    function X() {
      const o = R.repo;
      W(), o && it.open({
        fullName: o.fullName,
        description: o.description || "",
        stars: o.stargazersCount,
        language: o.language || void 0,
        updated: o.pushedAt
      });
    }
    function Z(o) {
      o.target?.closest(".gh-repo-context-menu") || R.visible && W();
    }
    function N(o) {
      o.key === "Escape" && R.visible && W();
    }
    const b = Y(() => {
      const o = new Set(S.customTopicNames);
      for (const s of S.repos)
        for (const a of s.topics)
          a && o.add(a);
      return Array.from(o).sort();
    }), F = Y(() => {
      const o = S.searchQuery.trim().toLowerCase();
      return o ? S.repos.filter(
        (s) => s.name.toLowerCase().includes(o) || s.description.toLowerCase().includes(o) || s.topics.some((a) => a.includes(o)) || s.language && s.language.toLowerCase().includes(o)
      ) : S.repos;
    }), we = Y(() => {
      const o = new Set(b.value);
      return F.value.filter((s) => s.topics.length ? !s.topics.some((a) => o.has(a)) : !0);
    });
    function _e(o) {
      return F.value.filter((s) => s.topics.includes(o));
    }
    async function Ge() {
      const o = r.value.trim();
      if (!o) return;
      await q.createTopicColumn(o) && (r.value = "", d.value = !1);
    }
    function Xe(o) {
      C.value = o, f.value = o, y.value = null;
    }
    async function De(o) {
      const s = f.value.trim();
      if (!s || s === o) {
        C.value = null;
        return;
      }
      await q.renameTopicColumn(o, s) && (C.value = null);
    }
    async function Qe(o) {
      y.value = null, await q.deleteTopicColumn(o);
    }
    async function Je(o, s) {
      await q.removeRepoFromTopic(o, s);
    }
    function Ze(o) {
      const s = u.value;
      if (!s) return;
      const p = o.target?.closest(".column-cards-scroll");
      if (p && p.scrollHeight > p.clientHeight && !o.shiftKey && o.deltaX === 0) {
        const E = p.scrollTop <= 0 && o.deltaY < 0, Te = p.scrollTop + p.clientHeight >= p.scrollHeight - 1 && o.deltaY > 0;
        if (!E && !Te)
          return;
      }
      Math.abs(o.deltaX) > Math.abs(o.deltaY) && o.deltaX !== 0 || o.deltaY !== 0 && (o.preventDefault(), s.scrollLeft += o.deltaY);
    }
    function ke(o) {
      if (!L.value || !u.value) return;
      o.preventDefault();
      const s = o.deltaX !== 0 ? o.deltaX : o.deltaY;
      u.value.scrollLeft += s;
    }
    function Ue() {
      if (w !== null) return;
      const o = () => {
        u.value && j !== 0 ? (u.value.scrollLeft += j, w = requestAnimationFrame(o)) : be();
      };
      w = requestAnimationFrame(o);
    }
    function be() {
      w !== null && (cancelAnimationFrame(w), w = null), j = 0;
    }
    function Ne(o) {
      if (!L.value || !u.value) return;
      const s = u.value.getBoundingClientRect(), a = 100;
      if (o > s.right - a) {
        const p = Math.min(1, Math.max(0.1, (o - (s.right - a)) / a));
        j = Math.round(p * 20), Ue();
      } else if (o < s.left + a) {
        const p = Math.min(1, Math.max(0.1, (s.left + a - o) / a));
        j = -Math.round(p * 20), Ue();
      } else
        be();
    }
    function et(o) {
      L.value && (o.preventDefault(), Ne(o.clientX));
    }
    function Ie(o, s, a) {
      W(), L.value = s, $.value = a, o.dataTransfer && (o.dataTransfer.effectAllowed = "move", o.dataTransfer.setData("text/plain", `${s.id}:${a}`)), window.addEventListener("wheel", ke, { passive: !1 });
    }
    function $e() {
      L.value = null, $.value = null, _.value = null, be(), window.removeEventListener("wheel", ke);
    }
    function Ee(o, s) {
      L.value && (o.preventDefault(), o.dataTransfer && (o.dataTransfer.dropEffect = "move"), _.value = s, Ne(o.clientX));
    }
    function je(o, s) {
      const a = o.currentTarget, p = o.relatedTarget;
      a?.contains(p) || _.value === s && (_.value = null);
    }
    async function Oe(o, s) {
      o.preventDefault();
      const a = L.value, p = $.value;
      if ($e(), !!a)
        if (s === "default")
          p && p !== "default" && await q.removeRepoFromTopic(a, p);
        else if (p && p !== "default" && p !== s) {
          const E = a.topics.filter((Te) => Te !== p);
          E.includes(s) || E.push(s), await q.syncRepoTopics(a, E);
        } else
          await q.addRepoToTopic(a, s);
    }
    function Ce(o) {
      window.open(o, "_blank", "noopener,noreferrer");
    }
    function Pe(o) {
      if (!o) return "";
      try {
        const s = new Date(o);
        return `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}-${String(s.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ue(
      () => c.active,
      (o) => {
        window.removeEventListener("pointerdown", Z), window.removeEventListener("keydown", N), W(), o && (window.addEventListener("pointerdown", Z), window.addEventListener("keydown", N), S.repos.length || q.load());
      },
      { immediate: !0 }
    ), Me(() => {
      c.active && (window.addEventListener("pointerdown", Z), window.addEventListener("keydown", N), S.repos.length || q.load());
    }), Le(() => {
      window.removeEventListener("wheel", ke), window.removeEventListener("pointerdown", Z), window.removeEventListener("keydown", N), be(), W();
    }), (o, s) => (i(), l("div", Ut, [
      t(S).errorMessage ? (i(), l("div", Nt, [
        e("span", null, "⚠️ " + n(t(S).errorMessage), 1),
        e("button", {
          type: "button",
          onClick: s[0] || (s[0] = (a) => t(q).load(!0))
        }, "重试")
      ])) : T("", !0),
      e("section", {
        class: I(["default-shelf", { "drop-active": _.value === "default", "is-collapsed": v.value }]),
        onDragover: s[4] || (s[4] = (a) => Ee(a, "default")),
        onDragleave: s[5] || (s[5] = (a) => je(a, "default")),
        onDrop: s[6] || (s[6] = (a) => Oe(a, "default"))
      }, [
        e("header", It, [
          e("div", Et, [
            s[24] || (s[24] = e("span", { class: "col-dot default-dot" }, null, -1)),
            e("h3", jt, n(t(h)("github.myRepos.defaultShelf")), 1),
            e("span", Ot, n(we.value.length), 1),
            e("span", Pt, n(t(h)("github.myRepos.defaultShelfHint")), 1),
            t(S).syncingTopic ? (i(), l("span", Ft, [
              s[23] || (s[23] = e("i", { class: "spin-icon" }, "⏳", -1)),
              Q(" " + n(t(h)("github.myRepos.syncingTopics")), 1)
            ])) : T("", !0)
          ]),
          e("div", Bt, [
            e("div", Wt, [
              ne(e("input", {
                "onUpdate:modelValue": s[1] || (s[1] = (a) => t(S).searchQuery = a),
                type: "text",
                placeholder: t(h)("github.myRepos.filterPlaceholder"),
                class: "shelf-search-input"
              }, null, 8, zt), [
                [pe, t(S).searchQuery]
              ]),
              t(S).searchQuery ? (i(), l("button", {
                key: 0,
                type: "button",
                class: "shelf-clear-btn",
                onClick: s[2] || (s[2] = (a) => t(S).searchQuery = "")
              }, "✕")) : T("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(S).loading || t(S).syncingTopic,
              title: t(h)("github.myRepos.refreshBtnTitle"),
              onClick: s[3] || (s[3] = (a) => t(q).load(!0))
            }, [
              e("span", {
                class: I({ spinning: t(S).loading })
              }, "🔄", 2),
              e("span", null, n(t(S).loading ? t(h)("github.myRepos.refreshing") : t(h)("common.refresh")), 1)
            ], 8, Vt),
            e("button", {
              type: "button",
              class: "shelf-toggle-btn",
              title: v.value ? t(h)("github.myRepos.expandShelf") : t(h)("github.myRepos.collapseShelf"),
              onClick: x
            }, n(v.value ? t(h)("github.myRepos.expandBtn") : t(h)("github.myRepos.collapseBtn")), 9, qt)
          ])
        ]),
        ne(e("div", {
          ref_key: "shelfScrollRef",
          ref: A,
          class: "shelf-cards-scroll",
          onWheel: k
        }, [
          (i(!0), l(P, null, V(we.value, (a) => (i(), l("div", {
            key: a.id,
            class: I(["repo-card shelf-card", { "card-dragging": L.value?.id === a.id }]),
            draggable: "true",
            onDragstart: (p) => Ie(p, a, "default"),
            onDragend: $e,
            onContextmenu: (p) => K(p, a, "default")
          }, [
            e("div", Kt, [
              e("span", {
                class: "repo-name",
                title: a.fullName,
                onClick: (p) => Ce(a.htmlUrl)
              }, n(a.name), 9, Xt),
              a.isPrivate ? (i(), l("span", Qt, "私有")) : T("", !0),
              a.isFork ? (i(), l("span", Jt, "Fork")) : T("", !0)
            ]),
            a.description ? (i(), l("p", {
              key: 0,
              class: "repo-desc",
              title: a.description
            }, n(a.description), 9, Zt)) : T("", !0),
            a.topics.length ? (i(), l("div", es, [
              (i(!0), l(P, null, V(a.topics, (p) => (i(), l("span", {
                key: p,
                class: "topic-chip"
              }, " #" + n(p), 1))), 128))
            ])) : T("", !0),
            e("div", ts, [
              e("div", ss, [
                a.language ? (i(), l("span", os, [
                  s[25] || (s[25] = e("span", { class: "lang-color" }, null, -1)),
                  Q(n(a.language), 1)
                ])) : T("", !0),
                e("span", ns, "⭐ " + n(a.stargazersCount), 1),
                a.forksCount ? (i(), l("span", as, "🍴 " + n(a.forksCount), 1)) : T("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + a.updatedAt
              }, n(Pe(a.pushedAt || a.updatedAt)), 9, is)
            ])
          ], 42, Yt))), 128)),
          we.value.length ? T("", !0) : (i(), l("div", rs, [
            e("span", null, n(t(h)("github.myRepos.emptyShelf")), 1)
          ]))
        ], 544), [
          [qe, !v.value]
        ])
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: u,
        class: "board-viewport",
        onWheel: Ze,
        onDragover: et
      }, [
        e("div", ls, [
          (i(!0), l(P, null, V(b.value, (a) => (i(), l("section", {
            key: a,
            class: I(["board-column topic-column", { "drop-active": _.value === a }]),
            onDragover: (p) => Ee(p, a),
            onDragleave: (p) => je(p, a),
            onDrop: (p) => Oe(p, a)
          }, [
            e("header", us, [
              C.value !== a ? (i(), l("div", ds, [
                s[26] || (s[26] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "GitHub Topic: " + a
                }, " #" + n(a), 9, ps),
                e("span", hs, n(_e(a).length), 1)
              ])) : (i(), l("div", ms, [
                ne(e("input", {
                  "onUpdate:modelValue": s[7] || (s[7] = (p) => f.value = p),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    ve((p) => De(a), ["enter"]),
                    s[8] || (s[8] = ve((p) => C.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, gs), [
                  [pe, f.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (p) => De(a)
                }, "✓", 8, fs),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: s[9] || (s[9] = (p) => C.value = null)
                }, "✕")
              ])),
              e("div", bs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: t(h)("github.myRepos.topicActions"),
                  onClick: (p) => y.value = y.value === a ? null : a
                }, "•••", 8, vs),
                y.value === a ? (i(), l("div", ys, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (p) => Xe(a)
                  }, n(t(h)("github.myRepos.renameTopicMenu")), 9, ws),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (p) => Qe(a)
                  }, n(t(h)("github.myRepos.deleteTopicMenu")), 9, _s)
                ])) : T("", !0)
              ])
            ]),
            e("div", ks, [
              (i(!0), l(P, null, V(_e(a), (p) => (i(), l("div", {
                key: p.id,
                class: I(["repo-card", { "card-dragging": L.value?.id === p.id }]),
                draggable: "true",
                onDragstart: (E) => Ie(E, p, a),
                onDragend: $e,
                onContextmenu: (E) => K(E, p, a)
              }, [
                e("div", Cs, [
                  e("span", {
                    class: "repo-name",
                    title: p.fullName,
                    onClick: (E) => Ce(p.htmlUrl)
                  }, n(p.name), 9, Ts),
                  p.isPrivate ? (i(), l("span", Rs, "私有")) : T("", !0),
                  p.isFork ? (i(), l("span", As, "Fork")) : T("", !0)
                ]),
                p.description ? (i(), l("p", {
                  key: 0,
                  class: "repo-desc",
                  title: p.description
                }, n(p.description), 9, Ss)) : T("", !0),
                e("div", Hs, [
                  e("span", xs, [
                    Q(" #" + n(a) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: t(h)("github.myRepos.removeTopicTip"),
                      onClick: J((E) => Je(p, a), ["stop"])
                    }, "✕", 8, Ms)
                  ]),
                  (i(!0), l(P, null, V(p.topics.filter((E) => E !== a), (E) => (i(), l("span", {
                    key: E,
                    class: "topic-chip other-chip"
                  }, " #" + n(E), 1))), 128))
                ]),
                e("div", Ls, [
                  e("div", Gs, [
                    p.language ? (i(), l("span", Ds, [
                      s[27] || (s[27] = e("span", { class: "lang-color" }, null, -1)),
                      Q(n(p.language), 1)
                    ])) : T("", !0),
                    e("span", Us, "⭐ " + n(p.stargazersCount), 1),
                    p.forksCount ? (i(), l("span", Ns, "🍴 " + n(p.forksCount), 1)) : T("", !0)
                  ]),
                  e("span", Is, n(Pe(p.pushedAt || p.updatedAt)), 1)
                ])
              ], 42, $s))), 128)),
              _e(a).length ? T("", !0) : (i(), l("div", Es, [
                e("span", null, n(t(h)("github.myRepos.emptyColumn")), 1)
              ]))
            ])
          ], 42, cs))), 128)),
          e("section", js, [
            d.value ? (i(), l("div", Os, [
              e("header", Ps, [
                e("strong", null, n(t(h)("github.myRepos.newTopicTitle")), 1),
                e("small", null, n(t(h)("github.myRepos.newTopicSub")), 1)
              ]),
              ne(e("input", {
                "onUpdate:modelValue": s[11] || (s[11] = (a) => r.value = a),
                type: "text",
                placeholder: t(h)("github.myRepos.newTopicPlaceholder"),
                class: "composer-input",
                onKeydown: [
                  ve(Ge, ["enter"]),
                  s[12] || (s[12] = ve((a) => d.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 40, Fs), [
                [pe, r.value]
              ]),
              e("div", Bs, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: Ge
                }, n(t(h)("github.myRepos.createTopicBtn")), 1),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: s[13] || (s[13] = (a) => d.value = !1)
                }, n(t(h)("common.cancel")), 1)
              ])
            ])) : (i(), l("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: s[10] || (s[10] = (a) => d.value = !0)
            }, [...s[28] || (s[28] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建 Topic 板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (i(), oe(Ye, { to: "body" }, [
        R.visible && R.repo ? (i(), l("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Ke({ left: `${R.x}px`, top: `${R.y}px` }),
          onClick: s[21] || (s[21] = J(() => {
          }, ["stop"])),
          onContextmenu: s[22] || (s[22] = J(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: I(["gh-menu-has-sub", { "is-active": B.value === "folder" }]),
            onMouseenter: s[16] || (s[16] = (a) => B.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: s[14] || (s[14] = J((a) => B.value = B.value === "folder" ? null : "folder", ["stop"]))
            }, [
              e("span", null, n(t(h)("github.myRepos.moveToGroup")), 1),
              s[29] || (s[29] = e("span", { class: "sub-arrow" }, "›", -1))
            ]),
            e("div", {
              class: I(["gh-sub-flyout", { "flyout-left": ee.value }]),
              onClick: s[15] || (s[15] = J(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: I(["fo-cover-menu-item", { primary: !R.repo.topics.length }]),
                type: "button",
                onClick: ie
              }, n(R.repo.topics.length ? "  " : "✓ ") + n(t(h)("github.myRepos.setUncategorized")), 3),
              (i(!0), l(P, null, V(b.value, (a) => (i(), l("button", {
                key: a,
                class: I(["fo-cover-menu-item", { primary: R.repo.topics.includes(a) }]),
                type: "button",
                onClick: (p) => M(a)
              }, n(R.repo.topics.includes(a) ? "✓ " : "  ") + "📁 " + n(a), 11, Ws))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[17] || (s[17] = (a) => B.value = null),
            onClick: G
          }, n(t(h)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[18] || (s[18] = (a) => B.value = null),
            onClick: U
          }, n(t(h)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[19] || (s[19] = (a) => B.value = null),
            onClick: X
          }, " 📋 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[20] || (s[20] = (a) => B.value = null),
            onClick: O
          }, n(t(h)("github.myRepos.openInGitHub")), 33)
        ], 36)) : T("", !0)
      ]))
    ]));
  }
}), Vs = /* @__PURE__ */ fe(zs, [["__scopeId", "data-v-21611e9e"]]);
function qs(g) {
  const c = g.subject?.url, r = g.repository?.html_url || "https://github.com";
  if (!c) return r;
  const d = g.subject?.type;
  return d === "Issue" ? c.replace("https://api.github.com/repos/", "https://github.com/") : d === "PullRequest" ? c.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : d === "Release" ? c.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : c.replace("https://api.github.com/repos/", "https://github.com/");
}
function Ys(g) {
  try {
    const c = Date.now() - new Date(g).getTime();
    if (c < 6e4) return "刚刚";
    const r = Math.floor(c / 6e4);
    if (r < 60) return `${r} 分钟前`;
    const d = Math.floor(r / 60);
    if (d < 24) return `${d} 小时前`;
    const y = Math.floor(d / 24);
    return y < 30 ? `${y} 天前` : g.slice(5, 10);
  } catch {
    return "";
  }
}
const H = ye({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), le = {
  open() {
    H.isOpen = !0, (!H.items.length || Date.now() - H.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    H.isOpen = !1;
  },
  toggle() {
    H.isOpen ? this.close() : this.open();
  },
  setTab(g) {
    H.activeKind = g;
  },
  async refresh() {
    const g = z.token?.trim();
    if (!g) {
      H.items = [], H.unreadCount = 0, H.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    H.loading = !0, H.error = "";
    try {
      const c = {
        ...de(g),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, r = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: c
      });
      if (!r.ok)
        throw r.status === 401 ? new Error("GitHub Token 无效或已过期") : r.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${r.status})`);
      const d = await r.json();
      if (!Array.isArray(d))
        throw new Error("GitHub 返回数据异常");
      const y = d.map((f) => ({
        id: String(f.id),
        unread: !!f.unread,
        reason: String(f.reason || ""),
        updatedAt: f.updated_at,
        formattedTime: Ys(f.updated_at),
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
        htmlUrl: qs(f)
      }));
      H.items = y, H.unreadCount = y.filter((f) => f.unread).length, H.lastFetchedAt = Date.now();
    } catch (c) {
      console.warn("[GitHubNotifications] 读取失败:", c), H.error = c?.message || "网络请求异常";
    } finally {
      H.loading = !1;
    }
  },
  openTarget(g) {
    typeof window < "u" && window.open(g.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, m = ye({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function he(g) {
  try {
    const c = Date.now() - new Date(g).getTime(), r = Math.floor(c / 6e4);
    if (r < 1) return "刚刚";
    if (r < 60) return `${r}分钟前`;
    const d = Math.floor(r / 60);
    if (d < 24) return `${d}小时前`;
    const y = Math.floor(d / 24);
    if (y < 30) return `${y}天前`;
    const f = new Date(g);
    return `${f.getFullYear()}/${f.getMonth() + 1}/${f.getDate()}`;
  } catch {
    return "";
  }
}
function me(g) {
  switch (g) {
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
function Ks(g) {
  return g ? {
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
  }[g] || (g.startsWith(":") && g.endsWith(":") ? g.slice(1, -1) : g) : "";
}
function Se(g) {
  if (!Array.isArray(g)) return [];
  const c = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return g.map((r) => ({
    emoji: c[r.content] || r.content,
    count: r.reactors?.totalCount || r.users?.totalCount || 0
  })).filter((r) => r.count > 0);
}
function ze(g) {
  if (!g || typeof g != "object") return [];
  const c = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, r = [];
  for (const [d, y] of Object.entries(c)) {
    const f = Number(g[d] || 0);
    f > 0 && r.push({ emoji: y, count: f });
  }
  return r;
}
async function Ve(g, c) {
  if (!g) return "";
  try {
    const r = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...de(c),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: g, mode: "gfm" })
    });
    if (r.ok)
      return await r.text();
  } catch {
  }
  return ae.renderMarkdown(g);
}
async function Xs(g, c, r, d) {
  const y = `
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
        ...de(d),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: y,
        variables: { owner: g, name: c, num: r }
      })
    });
    if (!f.ok) return null;
    const u = (await f.json())?.data?.repository?.discussion;
    if (!u) return null;
    let A = 0;
    const v = (u.comments?.nodes || []).map((L) => {
      const $ = L.replies?.nodes || [];
      A += $.length;
      const _ = $.map((w) => ({
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
        reactions: Se(w.reactionGroups)
      }));
      return {
        id: L.id,
        author: {
          login: L.author?.login || "匿名",
          avatarUrl: L.author?.avatarUrl || "",
          association: me(L.authorAssociation)
        },
        createdAt: L.createdAt,
        formattedTime: he(L.createdAt),
        body: L.body || "",
        bodyHtml: L.bodyHTML || (L.body ? ae.renderMarkdown(L.body) : "<p>（评论内容为空）</p>"),
        reactions: Se(L.reactionGroups),
        replies: _
      };
    }), x = u.body || "", k = u.bodyHTML && u.bodyHTML.trim().length > 10 ? u.bodyHTML : x ? ae.renderMarkdown(x) : "<p>（主贴内容为空）</p>";
    return {
      title: u.title,
      number: r,
      state: "discussion",
      category: u.category ? {
        name: u.category.name,
        emoji: Ks(u.category.emoji)
      } : void 0,
      author: {
        login: u.author?.login || "未知",
        avatarUrl: u.author?.avatarUrl || "",
        association: me(u.authorAssociation)
      },
      createdAt: u.createdAt,
      formattedTime: he(u.createdAt),
      body: x,
      bodyHtml: k,
      htmlUrl: u.url,
      commentsCount: u.comments?.totalCount || v.length,
      totalRepliesCount: A,
      comments: v,
      reactions: Se(u.reactionGroups)
    };
  } catch {
    return null;
  }
}
const xe = {
  async open(g) {
    m.isOpen = !0, m.loading = !0, m.error = "", m.data = null, m.notificationItem = g;
    const c = z.token?.trim() || "", r = {
      ...de(c),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const d = g.subject?.url, y = g.subject?.type, f = g.repository?.fullName || "", [C, u] = f.split("/"), A = d?.match(/\/(\d+)$/), v = A ? Number(A[1]) : void 0;
      if (y === "Discussion" && C && u && v) {
        const x = await Xs(C, u, v, c);
        if (x) {
          m.data = {
            notificationId: g.id,
            title: x.title || g.subject.title,
            number: v,
            state: "discussion",
            category: x.category,
            author: x.author || { login: g.repository.owner.login, avatarUrl: g.repository.owner.avatarUrl || "" },
            createdAt: x.createdAt || g.updatedAt,
            formattedTime: x.formattedTime || g.formattedTime,
            body: x.body || "",
            bodyHtml: x.bodyHtml || (x.body ? ae.renderMarkdown(x.body) : ""),
            htmlUrl: x.htmlUrl || g.htmlUrl,
            commentsCount: x.commentsCount || 0,
            totalRepliesCount: x.totalRepliesCount || 0,
            comments: x.comments || [],
            reactions: x.reactions || [],
            repositoryFullName: f,
            type: "Discussion"
          };
          return;
        }
      }
      if (d) {
        const x = await fetch(d, { headers: r, cache: "no-store" });
        if (x.ok) {
          const k = await x.json();
          let L = [];
          if (k.comments_url && k.comments > 0)
            try {
              const w = await fetch(`${k.comments_url}?per_page=50`, { headers: r, cache: "no-store" });
              if (w.ok) {
                const j = await w.json();
                Array.isArray(j) && (L = await Promise.all(
                  j.map(async (R) => {
                    const B = R.body_html || (R.body ? await Ve(R.body, c) : "");
                    return {
                      id: R.id,
                      author: {
                        login: R.user?.login || "匿名",
                        avatarUrl: R.user?.avatar_url || "",
                        association: me(R.author_association)
                      },
                      createdAt: R.created_at,
                      formattedTime: he(R.created_at),
                      body: R.body || "",
                      bodyHtml: B,
                      reactions: ze(R.reactions)
                    };
                  })
                ));
              }
            } catch (w) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", w);
            }
          const $ = k.body || "";
          let _ = k.body_html || "";
          !_ && $ && (_ = await Ve($, c)), !_ && $ && (_ = ae.renderMarkdown($)), m.data = {
            notificationId: g.id,
            title: k.title || k.name || g.subject.title,
            number: k.number || v,
            state: k.merged ? "merged" : k.state || k.conclusion || "open",
            author: {
              login: k.user?.login || k.author?.login || g.repository.owner.login,
              avatarUrl: k.user?.avatar_url || k.author?.avatar_url || g.repository.owner.avatarUrl || "",
              association: me(k.author_association)
            },
            createdAt: k.created_at || k.published_at || g.updatedAt,
            formattedTime: he(k.created_at || k.published_at || g.updatedAt),
            body: $,
            bodyHtml: _ || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: k.html_url || g.htmlUrl,
            commentsCount: typeof k.comments == "number" ? k.comments : L.length,
            comments: L,
            reactions: ze(k.reactions),
            repositoryFullName: f,
            type: y || "Issue"
          };
          return;
        }
      }
      m.data = {
        notificationId: g.id,
        title: g.subject.title,
        number: v,
        state: "open",
        author: {
          login: g.repository.owner.login,
          avatarUrl: g.repository.owner.avatarUrl || ""
        },
        createdAt: g.updatedAt,
        formattedTime: g.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: g.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: f,
        type: y || "通知"
      };
    } catch (d) {
      console.warn("[GitHubNotificationDetail] 读取异常:", d), m.error = d?.message || "网络请求异常";
    } finally {
      m.loading = !1;
    }
  },
  close() {
    m.isOpen = !1, m.data = null, m.error = "";
  }
}, Qs = { class: "vue-gh-notification-panel-wrapper" }, Js = { class: "gh-msg-header" }, Zs = { class: "gh-msg-account" }, eo = { class: "gh-msg-subtitle" }, to = {
  class: "gh-msg-tabs",
  role: "tablist"
}, so = ["onClick"], oo = { class: "gh-msg-list" }, no = {
  key: 0,
  class: "gh-msg-loading"
}, ao = {
  key: 1,
  class: "gh-msg-error"
}, io = {
  key: 2,
  class: "gh-msg-empty"
}, ro = ["onClick"], lo = { class: "gh-card-indicator-col" }, co = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, uo = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, po = { class: "gh-card-type-col" }, ho = ["title"], mo = { class: "gh-card-main-col" }, go = { class: "gh-card-repo-row" }, fo = ["title"], bo = { class: "gh-card-reason-tag" }, vo = { class: "gh-card-time" }, yo = ["title"], wo = { class: "gh-card-footer-row" }, _o = { class: "gh-card-type-label" }, ko = ["onClick"], $o = /* @__PURE__ */ ge({
  __name: "GitHubNotificationPanel",
  setup(g) {
    const c = D(null), r = Y(() => [
      { kind: "all", label: "所有", count: H.items.length },
      { kind: "unread", label: "未读", count: H.items.filter(($) => $.unread).length },
      { kind: "mention", label: "提及", count: H.items.filter(($) => $.reason === "mention").length },
      { kind: "author", label: "作者", count: H.items.filter(($) => $.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: H.items.filter(($) => $.reason === "ci_activity" || $.subject.type === "CheckSuite").length }
    ]), d = Y(() => {
      const $ = H.items;
      switch (H.activeKind) {
        case "unread":
          return $.filter((_) => _.unread);
        case "mention":
          return $.filter((_) => _.reason === "mention");
        case "author":
          return $.filter((_) => _.reason === "author");
        case "ci":
          return $.filter((_) => _.reason === "ci_activity" || _.subject.type === "CheckSuite");
        default:
          return $;
      }
    });
    function y($, _) {
      if (_ === "ci_activity" || $ === "CheckSuite")
        return "⚡";
      switch ($) {
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
    function f($) {
      switch ($) {
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
          return $ || "通知";
      }
    }
    function C() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function u() {
      le.refresh();
    }
    function A() {
      le.close();
    }
    function v($) {
      xe.open($);
    }
    function x($) {
      le.openTarget($);
    }
    function k($) {
      if (!H.isOpen) return;
      const _ = $.target;
      !c.value?.contains(_) && !_?.closest("#gh-header-msg-center-btn") && le.close();
    }
    function L($) {
      $.key === "Escape" && H.isOpen && le.close();
    }
    return Me(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", k), window.addEventListener("keydown", L));
    }), Le(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", k), window.removeEventListener("keydown", L));
    }), ($, _) => (i(), l("div", Qs, [
      t(H).isOpen ? (i(), l("section", {
        key: 0,
        ref_key: "panelRef",
        ref: c,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: _[0] || (_[0] = J(() => {
        }, ["stop"]))
      }, [
        e("header", Js, [
          e("div", Zs, [
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
              e("p", eo, " 共 " + n(t(H).items.length) + " 条通知 · " + n(t(H).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          _[3] || (_[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: C
          }, " ↗ "),
          e("button", {
            type: "button",
            class: I(["gh-panel-btn", { "is-spinning": t(H).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: u
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: A
          }, " ✕ ")
        ]),
        e("nav", to, [
          (i(!0), l(P, null, V(r.value, (w) => (i(), l("button", {
            key: w.kind,
            type: "button",
            class: I(["gh-msg-tab", { active: t(H).activeKind === w.kind }]),
            onClick: (j) => t(H).activeKind = w.kind
          }, [
            Q(n(w.label) + " ", 1),
            w.count > 0 ? (i(), l("span", {
              key: 0,
              class: I(["gh-tab-pill", { "is-unread-pill": w.kind === "unread" }])
            }, n(w.count), 3)) : T("", !0)
          ], 10, so))), 128))
        ]),
        e("div", oo, [
          t(H).loading && !t(H).items.length ? (i(), l("div", no, [..._[4] || (_[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(H).error ? (i(), l("div", ao, [
            _[5] || (_[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, n(t(H).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: u
            }, "重试")
          ])) : d.value.length === 0 ? (i(), l("div", io, [..._[6] || (_[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (i(!0), l(P, { key: 3 }, V(d.value, (w) => (i(), l("article", {
            key: w.id,
            class: I(["gh-notification-card", { "is-unread": w.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (j) => v(w)
          }, [
            e("div", lo, [
              w.unread ? (i(), l("span", co)) : (i(), l("span", uo))
            ]),
            e("div", po, [
              e("span", {
                class: "gh-type-badge",
                title: w.subject.type
              }, n(y(w.subject.type, w.reason)), 9, ho)
            ]),
            e("div", mo, [
              e("div", go, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: w.repository.fullName
                }, n(w.repository.fullName), 9, fo),
                e("span", bo, n(f(w.reason)), 1),
                e("time", vo, n(w.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: w.subject.title
              }, n(w.subject.title), 9, yo),
              e("div", wo, [
                e("span", _o, n(w.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: J((j) => x(w), ["stop"])
                }, "在网页打开 ↗", 8, ko)
              ])
            ])
          ], 10, ro))), 128))
        ])
      ], 512)) : T("", !0)
    ]));
  }
}), Co = /* @__PURE__ */ fe($o, [["__scopeId", "data-v-4271efab"]]), To = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, Ro = ["aria-label"], Ao = { class: "gh-modal-title-wrap" }, So = { class: "gh-modal-octo-icon" }, Ho = ["href"], xo = { class: "gh-owner" }, Mo = { class: "gh-name" }, Lo = {
  key: 1,
  class: "gh-modal-repo-name"
}, Go = { class: "gh-name" }, Do = { class: "gh-modal-actions" }, Uo = { class: "gh-modal-content" }, No = {
  key: 0,
  class: "gh-content-loading"
}, Io = {
  key: 1,
  class: "gh-content-error"
}, Eo = { class: "gh-discussion-title-header" }, jo = { class: "gh-discussion-h1" }, Oo = {
  key: 0,
  class: "gh-discussion-num"
}, Po = { class: "gh-discussion-sub-meta" }, Fo = {
  key: 0,
  class: "gh-category-pill"
}, Bo = {
  key: 0,
  class: "cat-emoji"
}, Wo = {
  key: 1,
  class: "gh-category-pill"
}, zo = { class: "gh-sub-author" }, Vo = { class: "gh-sub-verb" }, qo = {
  key: 2,
  class: "gh-sub-comments-count"
}, Yo = { class: "gh-op-post-card" }, Ko = { class: "gh-op-post-head" }, Xo = { class: "gh-op-author-left" }, Qo = ["src"], Jo = { class: "gh-op-meta" }, Zo = { class: "gh-op-name-row" }, en = { class: "gh-op-name" }, tn = {
  key: 0,
  class: "gh-role-pill"
}, sn = { class: "gh-op-time" }, on = ["innerHTML"], nn = {
  key: 0,
  class: "gh-reactions-bar"
}, an = { class: "rx-emoji" }, rn = { class: "rx-count" }, ln = {
  key: 0,
  class: "gh-comments-block"
}, cn = { class: "gh-comments-header" }, un = { class: "gh-comments-count-pill" }, dn = { class: "gh-comments-feed" }, pn = { class: "gh-comment-head" }, hn = ["src"], mn = { class: "gh-comment-meta" }, gn = { class: "gh-comment-author" }, fn = {
  key: 0,
  class: "gh-role-pill small"
}, bn = { class: "gh-comment-time" }, vn = ["innerHTML"], yn = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, wn = { class: "rx-emoji" }, _n = { class: "rx-count" }, kn = {
  key: 1,
  class: "gh-comment-replies-thread"
}, $n = { class: "gh-replies-thread-title" }, Cn = { class: "gh-reply-head" }, Tn = ["src"], Rn = { class: "gh-reply-meta" }, An = { class: "gh-reply-author" }, Sn = {
  key: 0,
  class: "gh-role-pill tiny"
}, Hn = { class: "gh-reply-time" }, xn = ["innerHTML"], Mn = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, Ln = { class: "rx-emoji" }, Gn = { class: "rx-count" }, Dn = {
  key: 1,
  class: "gh-no-comments"
}, Un = /* @__PURE__ */ ge({
  __name: "GitHubNotificationDetailDrawer",
  setup(g) {
    const c = D(null), r = D(null), d = D(null);
    let y = !1, f = 0, C = 0, u = 0, A = 0, v = () => {
    };
    const x = Y(() => (m.data?.repositoryFullName || m.notificationItem?.repository.fullName || "").split("/")[0] || ""), k = Y(() => {
      const M = m.data?.repositoryFullName || m.notificationItem?.repository.fullName || "";
      return M.split("/")[1] || M;
    }), L = Y(() => {
      if (!m.data) return "";
      const M = m.data.bodyHtml?.trim() || "";
      if (M.length > 20) return M;
      const G = m.data.body?.trim() || "";
      return G.length > 0 ? ae.renderMarkdown(G) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), $ = Y(() => d.value ? {
      position: "fixed",
      left: `${d.value.x}px`,
      top: `${d.value.y}px`,
      transform: "none"
    } : {});
    ue(
      () => m.isOpen,
      (M) => {
        M && (d.value = null, Fe(() => {
          r.value && (r.value.scrollTop = 0);
        }));
      }
    ), ue(
      () => m.data,
      (M) => {
        M && Fe(() => {
          r.value && (r.value.scrollTop = 0);
        });
      }
    );
    function _(M) {
      if (M.target.closest("button, a, input")) return;
      v();
      const G = c.value;
      if (!G || !m.isOpen) return;
      y = !0;
      const U = G.getBoundingClientRect();
      u = U.left, A = U.top, f = M.clientX, C = M.clientY, d.value = { x: u, y: A };
      const O = (Z) => {
        if (!y) return;
        const N = Z.clientX - f, b = Z.clientY - C;
        d.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, u + N)),
          y: Math.max(10, Math.min(window.innerHeight - 80, A + b))
        };
      }, X = () => {
        y = !1, window.removeEventListener("mousemove", O), window.removeEventListener("mouseup", X);
      };
      v = X, window.addEventListener("mousemove", O), window.addEventListener("mouseup", X);
    }
    function w() {
      xe.close();
    }
    function j() {
      const M = m.data?.htmlUrl || m.notificationItem?.htmlUrl;
      M && typeof window < "u" && window.open(M, "_blank", "noopener,noreferrer");
    }
    function R(M) {
      const U = M.target?.closest("a");
      U && U.href && (M.preventDefault(), M.stopPropagation(), window.open(U.href, "_blank", "noopener,noreferrer"));
    }
    function B() {
      m.notificationItem && xe.open(m.notificationItem);
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
    function W(M) {
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
    function ie(M) {
      M.key === "Escape" && m.isOpen && w();
    }
    return Me(() => {
      window.addEventListener("keydown", ie);
    }), Le(() => {
      window.removeEventListener("keydown", ie), v();
    }), (M, G) => (i(), oe(Ye, { to: "body" }, [
      t(m).isOpen ? (i(), l("div", To, [
        e("div", {
          ref_key: "windowRef",
          ref: c,
          class: "gh-nonmodal-window",
          style: Ke($.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(m).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: _
          }, [
            e("div", Ao, [
              e("span", So, n(ee(t(m).data?.type || t(m).notificationItem?.subject.type)), 1),
              t(m).data?.htmlUrl || t(m).notificationItem?.htmlUrl ? (i(), l("a", {
                key: 0,
                href: t(m).data?.htmlUrl || t(m).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", xo, n(x.value), 1),
                G[0] || (G[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", Mo, n(k.value), 1),
                G[1] || (G[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, Ho)) : (i(), l("span", Lo, [
                e("strong", Go, n(t(m).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", Do, [
              t(m).data?.state ? (i(), l("span", {
                key: 0,
                class: I(["gh-detail-state-pill", t(m).data.state])
              }, n(K(t(m).data.state)), 3)) : T("", !0),
              t(m).data?.htmlUrl || t(m).notificationItem?.htmlUrl ? (i(), l("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: j
              }, " 在网页打开 ↗ ")) : T("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: w
              }, " ✕ ")
            ])
          ], 32),
          e("div", Uo, [
            t(m).loading ? (i(), l("div", No, [
              G[2] || (G[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + n(t(m).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(m).error ? (i(), l("div", Io, [
              G[3] || (G[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, n(t(m).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: B
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: j
                }, "在 GitHub 打开 ↗")
              ])
            ])) : t(m).data ? (i(), l("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: r,
              class: "gh-detail-scrollable",
              onClick: R
            }, [
              e("div", Eo, [
                e("h1", jo, [
                  Q(n(t(m).data.title) + " ", 1),
                  t(m).data.number ? (i(), l("span", Oo, "#" + n(t(m).data.number), 1)) : T("", !0)
                ]),
                e("div", Po, [
                  t(m).data.category ? (i(), l("span", Fo, [
                    t(m).data.category.emoji ? (i(), l("span", Bo, n(t(m).data.category.emoji), 1)) : T("", !0),
                    e("span", null, n(t(m).data.category.name), 1)
                  ])) : (i(), l("span", Wo, n(W(t(m).data.type)), 1)),
                  e("span", zo, n(t(m).data.author.login), 1),
                  e("span", Vo, "发布于 " + n(t(m).data.formattedTime), 1),
                  t(m).data.commentsCount ? (i(), l("span", qo, [
                    Q(" · " + n(t(m).data.commentsCount) + " 条讨论主题 ", 1),
                    t(m).data.totalRepliesCount ? (i(), l(P, { key: 0 }, [
                      Q(" （含 " + n(t(m).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : T("", !0)
                  ])) : T("", !0)
                ])
              ]),
              e("article", Yo, [
                e("div", Ko, [
                  e("div", Xo, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(m).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Qo),
                    e("div", Jo, [
                      e("div", Zo, [
                        e("strong", en, n(t(m).data.author.login), 1),
                        t(m).data.author.association ? (i(), l("span", tn, n(t(m).data.author.association), 1)) : T("", !0)
                      ]),
                      e("time", sn, n(t(m).data.formattedTime), 1)
                    ])
                  ]),
                  G[4] || (G[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                G[5] || (G[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: L.value
                }, null, 8, on),
                t(m).data.reactions?.length ? (i(), l("div", nn, [
                  (i(!0), l(P, null, V(t(m).data.reactions, (U) => (i(), l("span", {
                    key: U.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", an, n(U.emoji), 1),
                    e("span", rn, n(U.count), 1)
                  ]))), 128))
                ])) : T("", !0)
              ]),
              t(m).data.comments.length ? (i(), l("div", ln, [
                e("div", cn, [
                  G[6] || (G[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", un, [
                    Q(n(t(m).data.commentsCount) + " 条主题 ", 1),
                    t(m).data.totalRepliesCount ? (i(), l(P, { key: 0 }, [
                      Q(" · " + n(t(m).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : T("", !0)
                  ])
                ]),
                e("div", dn, [
                  (i(!0), l(P, null, V(t(m).data.comments, (U) => (i(), l("div", {
                    key: U.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", pn, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: U.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, hn),
                      e("div", mn, [
                        e("span", gn, n(U.author.login), 1),
                        U.author.association ? (i(), l("span", fn, n(U.author.association), 1)) : T("", !0),
                        e("time", bn, n(U.formattedTime), 1)
                      ])
                    ]),
                    G[7] || (G[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: U.bodyHtml
                    }, null, 8, vn),
                    U.reactions?.length ? (i(), l("div", yn, [
                      (i(!0), l(P, null, V(U.reactions, (O) => (i(), l("span", {
                        key: O.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", wn, n(O.emoji), 1),
                        e("span", _n, n(O.count), 1)
                      ]))), 128))
                    ])) : T("", !0),
                    U.replies?.length ? (i(), l("div", kn, [
                      e("div", $n, [
                        e("span", null, "💬 " + n(U.replies.length) + " 条回复对话", 1)
                      ]),
                      (i(!0), l(P, null, V(U.replies, (O) => (i(), l("div", {
                        key: O.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", Cn, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: O.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, Tn),
                          e("div", Rn, [
                            e("strong", An, n(O.author.login), 1),
                            O.author.association ? (i(), l("span", Sn, n(O.author.association), 1)) : T("", !0),
                            e("time", Hn, n(O.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: O.bodyHtml
                        }, null, 8, xn),
                        O.reactions?.length ? (i(), l("div", Mn, [
                          (i(!0), l(P, null, V(O.reactions, (X) => (i(), l("span", {
                            key: X.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", Ln, n(X.emoji), 1),
                            e("span", Gn, n(X.count), 1)
                          ]))), 128))
                        ])) : T("", !0)
                      ]))), 128))
                    ])) : T("", !0)
                  ]))), 128))
                ])
              ])) : (i(), l("div", Dn, [...G[8] || (G[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : T("", !0)
          ])
        ], 12, Ro)
      ])) : T("", !0)
    ]));
  }
}), Nn = /* @__PURE__ */ fe(Un, [["__scopeId", "data-v-d22ba06c"]]), In = ["inert"], En = { class: "card-head" }, jn = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, On = ["title"], Pn = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Fn = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Bn = ["placeholder"], Wn = ["title"], zn = { class: "gh-search-rule-icon" }, Vn = { class: "gh-search-rule-text" }, qn = ["title"], Yn = ["title"], Kn = { class: "gh-header-msg-label" }, Xn = {
  key: 0,
  class: "gh-header-msg-badge"
}, Qn = { class: "gh-settings-anchor" }, Jn = ["aria-expanded", "aria-label", "title"], Zn = {
  key: 0,
  class: "muted small",
  role: "status"
}, ea = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, ta = { class: "gh-bili-layout" }, sa = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, oa = ["title"], na = { class: "fo-sidebar-toggle-title" }, aa = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, ia = ["aria-expanded", "title"], ra = { class: "fo-sidebar-toggle-chevron" }, la = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, ca = { class: "fo-sidebar-sub-wrap" }, ua = ["title"], da = { class: "fo-sidebar-sub-main" }, pa = { class: "fo-sidebar-sub-text" }, ha = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, ma = ["title"], ga = { class: "fo-sidebar-sub-main" }, fa = { class: "fo-sidebar-sub-text" }, ba = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, va = ["title"], ya = { class: "fo-sidebar-sub-main" }, wa = { class: "fo-sidebar-sub-text" }, _a = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, ka = ["title"], $a = { class: "fo-sidebar-sub-main" }, Ca = { class: "fo-sidebar-sub-text" }, Ta = { class: "gh-bili-sidebar-head" }, Ra = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, Aa = { style: { color: "var(--dim)", "font-size": "9.5px" } }, Sa = ["title", "aria-label"], Ha = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, xa = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Ma = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, La = { id: "vue-github-status-root" }, Ga = { id: "vue-github-repositories-root" }, Da = /* @__PURE__ */ ge({
  __name: "GitHubWorkspaceCard",
  setup(g) {
    const c = ot(() => import("./GitHubSettingsModal-uFg7rv5k.js")), { active: r } = nt("card-github", "/github.html");
    let d = 0, y = !1, f;
    const C = D(""), u = D("stars");
    ue(() => r.value && u.value === "stars", (N) => z.setAiViewActive(N), { immediate: !0, flush: "sync" });
    const A = D(!1), v = D("local"), x = D(""), k = D(!1), L = D(0);
    function $() {
      r.value && (k.value = !0, ++L.value);
    }
    const _ = D(!1);
    ue(k, (N) => {
      N && (_.value = !0);
    });
    const w = D(null);
    let j = 0;
    function R(N) {
      u.value = N, N === "trending" ? Be.switchTab("trending") : Be.switchTab("stars");
    }
    function B() {
      u.value = "stars";
    }
    const ee = Y(() => [
      { id: "exact", icon: "🎯", name: h("search.rule.exact"), desc: h("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: h("search.rule.fuzzy"), desc: h("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: h("search.rule.topic"), desc: h("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: h("search.rule.smart"), desc: h("search.rule.smartDesc") }
    ]), W = D(z.searchRule || "exact"), K = Y(() => ee.value.find((N) => N.id === W.value) || ee.value[0]);
    function ie() {
      const N = z.cycleSearchRule();
      W.value = N;
    }
    const M = Y(() => v.value === "global" ? h("github.searchGlobalPlaceholder") : h("github.searchLocalPlaceholder", { rule: K.value.name }));
    function G() {
      clearTimeout(j), !(!r.value || v.value !== "local") && (j = window.setTimeout(() => z.setSearchQuery(x.value.trim().toLowerCase()), 180));
    }
    function U() {
      v.value = v.value === "local" ? "global" : "local", v.value === "local" && G();
    }
    function O() {
      x.value = "", clearTimeout(j), z.resetLocalSearch();
    }
    function X() {
      const N = x.value.trim();
      v.value === "local" ? (clearTimeout(j), z.setSearchQuery(N.toLowerCase())) : N && window.open(`https://github.com/search?q=${encodeURIComponent(N)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function Z() {
      ++d, y = !0, C.value = "";
    }
    return ue(r, async (N) => {
      const b = ++d;
      if (clearTimeout(j), f?.abort(), f = new AbortController(), N || f.abort(), z.setRepositoryViewSignal(f.signal), !!N) {
        if (y) {
          await z.resumeRepositoryReads();
          return;
        }
        if (z.repos.length || z.loadingAllStars || z.loadingPage) {
          y = !0;
          return;
        }
        try {
          const F = await He();
          if (!r.value || b !== d) return;
          y = !0, await z.loadGitHub(F.ghUser, F.ghToken);
        } catch {
          if (!r.value || b !== d) return;
          y = !1, C.value = h("github.initError");
        }
      }
    }, { immediate: !0, flush: "sync" }), tt(() => {
      z.setAiViewActive(!1), ++d, f?.abort(), clearTimeout(j);
    }), (N, b) => (i(), l("section", {
      class: I(["card wide", { "card-fullscreen": t(mt).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(r)
    }, [
      e("header", En, [
        b[15] || (b[15] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        b[16] || (b[16] = e("h2", null, "GitHub", -1)),
        b[17] || (b[17] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", jn, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: J(X, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: v.value === "local" ? t(h)("github.searchScope.toGlobal") : t(h)("github.searchScope.toLocal"),
              onClick: U
            }, [
              e("span", Pn, n(v.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Fn, n(v.value === "local" ? t(h)("github.searchScope.local") : t(h)("github.searchScope.global")), 1),
              b[11] || (b[11] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, On),
            ne(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": b[0] || (b[0] = (F) => x.value = F),
              placeholder: M.value,
              autocomplete: "off",
              onInput: G
            }, null, 40, Bn), [
              [pe, x.value]
            ]),
            v.value === "local" ? (i(), l("button", {
              key: 0,
              type: "button",
              class: I(["gh-search-rule-btn", `rule-${K.value.id}`]),
              title: t(h)("github.ruleHint", { rule: K.value.name, desc: K.value.desc }),
              onClick: J(ie, ["stop"])
            }, [
              e("span", zn, n(K.value.icon), 1),
              e("span", Vn, n(K.value.name), 1)
            ], 10, Wn)) : T("", !0),
            ne(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: t(h)("github.clearSearch"),
              onClick: O
            }, "✕", 8, qn), [
              [qe, x.value]
            ]),
            b[12] || (b[12] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          b[13] || (b[13] = st('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-90a302f8><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-90a302f8><input type="checkbox" value="exact" checked data-v-90a302f8>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-90a302f8><input type="checkbox" value="loose" data-v-90a302f8>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-90a302f8><input type="checkbox" value="related" data-v-90a302f8>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-90a302f8><input type="checkbox" value="topic" data-v-90a302f8>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-90a302f8><input type="checkbox" value="readme" data-v-90a302f8>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-90a302f8></div>', 2))
        ]),
        e("button", {
          id: "gh-header-msg-center-btn",
          class: I(["gh-header-msg-btn", { "has-unread": t(H).unreadCount > 0, "is-active": t(H).isOpen }]),
          type: "button",
          title: t(H).unreadCount > 0 ? t(h)("github.header.msgUnread", { count: t(H).unreadCount }) : t(h)("github.header.msgCenter"),
          onClick: b[1] || (b[1] = (F) => t(le).toggle())
        }, [
          b[14] || (b[14] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
          e("span", Kn, n(t(h)("github.header.msg")), 1),
          t(H).unreadCount > 0 ? (i(), l("span", Xn, n(t(H).unreadCount > 99 ? "99+" : t(H).unreadCount), 1)) : T("", !0)
        ], 10, Yn),
        e("div", Qn, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: w,
            "aria-expanded": k.value,
            "aria-label": t(h)("github.settings"),
            class: "gh-head-settings-btn",
            title: t(h)("github.header.settings"),
            onClick: b[2] || (b[2] = (F) => k.value = !k.value)
          }, " ⚙️ ", 8, Jn),
          _.value ? (i(), oe(t(c), {
            key: 0,
            visible: t(r) && k.value,
            anchor: w.value,
            "ai-request": L.value,
            onAccountReload: Z,
            onClose: b[3] || (b[3] = (F) => k.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : T("", !0)
        ])
      ]),
      C.value ? (i(), l("p", Zn, n(C.value), 1)) : T("", !0),
      e("div", ea, [
        e("div", ta, [
          e("aside", sa, [
            e("div", {
              class: I(["fo-sidebar-toggle-bar", { "is-collapsed": A.value }]),
              title: A.value ? t(h)("github.channel.toggleExpand") : t(h)("github.channel.toggleCollapse"),
              onClick: b[4] || (b[4] = (F) => A.value = !A.value)
            }, [
              e("div", na, [
                b[18] || (b[18] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, n(t(h)("github.channel.channels")), 1),
                A.value ? (i(), l("span", aa, "3")) : T("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !A.value,
                title: A.value ? t(h)("github.expand") : t(h)("github.collapse")
              }, [
                e("span", null, n(A.value ? t(h)("github.expand") : t(h)("github.collapse")), 1),
                e("span", ra, n(A.value ? "▾" : "▴"), 1)
              ], 8, ia)
            ], 10, oa),
            A.value ? T("", !0) : (i(), l("div", la, [
              e("div", ca, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: u.value === "stars" }]),
                  title: t(h)("github.channel.starsTitle"),
                  onClick: b[5] || (b[5] = (F) => R("stars"))
                }, [
                  e("div", da, [
                    b[19] || (b[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", pa, [
                      e("strong", null, n(t(h)("github.channel.stars")), 1),
                      e("small", null, n(t(h)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  b[20] || (b[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, ua)
              ]),
              e("div", ha, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: u.value === "trending" }]),
                  title: t(h)("github.channel.trendingTitle"),
                  onClick: b[6] || (b[6] = (F) => R("trending"))
                }, [
                  e("div", ga, [
                    b[21] || (b[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", fa, [
                      e("strong", null, n(t(h)("github.channel.trending")), 1),
                      e("small", null, n(t(h)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  b[22] || (b[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, ma)
              ]),
              e("div", ba, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: u.value === "awesome" }]),
                  title: t(h)("github.channel.awesomeTitle"),
                  onClick: b[7] || (b[7] = (F) => R("awesome"))
                }, [
                  e("div", ya, [
                    b[23] || (b[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", wa, [
                      e("strong", null, n(t(h)("github.channel.awesome")), 1),
                      e("small", null, n(t(h)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  b[24] || (b[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, va)
              ]),
              e("div", _a, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: u.value === "repos" }]),
                  title: t(h)("github.channel.reposTitle"),
                  onClick: b[8] || (b[8] = (F) => R("repos"))
                }, [
                  e("div", $a, [
                    b[25] || (b[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", Ca, [
                      e("strong", null, n(t(h)("github.channel.repos")), 1),
                      e("small", null, n(t(h)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  b[26] || (b[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, ka)
              ])
            ])),
            e("header", Ta, [
              e("div", null, [
                e("b", Ra, [
                  b[27] || (b[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  Q(" " + n(t(h)("github.lists.title")), 1)
                ]),
                e("small", Aa, n(t(h)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: t(h)("github.lists.new"),
                "aria-label": t(h)("github.lists.new"),
                onClick: b[9] || (b[9] = (F) => t(z).promptCreateFolder())
              }, "＋", 8, Sa)
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: B
            }, [
              te(rt, { active: t(r) }, null, 8, ["active"])
            ])
          ]),
          e("section", Ha, [
            u.value === "stars" && t(at).accountConfigured === !1 ? (i(), oe(pt, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: b[10] || (b[10] = (F) => k.value = !0)
            })) : u.value === "stars" ? (i(), l(P, { key: 1 }, [
              e("header", xa, [
                te(ut, { onOpenAiSettings: $ })
              ]),
              b[28] || (b[28] = e("div", { class: "gh-main-subbar" }, [
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
              e("div", Ma, [
                te(lt, {
                  active: t(r) && u.value === "stars"
                }, null, 8, ["active"])
              ]),
              b[29] || (b[29] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", La, [
                te(dt)
              ]),
              e("div", Ga, [
                te(ct, {
                  active: t(r) && u.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : u.value === "trending" ? (i(), oe(ht, { key: 2 })) : u.value === "awesome" ? (i(), oe(Dt, { key: 3 })) : u.value === "repos" ? (i(), oe(Vs, {
              key: 4,
              active: t(r) && u.value === "repos"
            }, null, 8, ["active"])) : T("", !0)
          ])
        ])
      ]),
      te(Co),
      te(Nn)
    ], 10, In));
  }
}), za = /* @__PURE__ */ fe(Da, [["__scopeId", "data-v-90a302f8"]]);
export {
  za as default
};
