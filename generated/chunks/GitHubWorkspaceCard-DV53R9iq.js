import { d as ge, o as i, g as l, h as e, n as ne, q as he, i as T, F as P, j as W, C as N, t as o, u as t, k as J, b as D, y as K, r as ye, w as ue, D as xe, z as Me, p as Q, A as Ve, m as ve, e as oe, l as qe, B as Ye, H as Pe, M as et, I as tt, E as te, G as st } from "./vendor-vue-dDCd4-uG.js";
import { u as ot } from "./useCardActivity-B8O5lWq1.js";
import { D as Ae, E as de, t as B, y as nt } from "./search.service-Ybzy778d.js";
import { _ as at, a as it, G as rt, g as Fe, b as lt, c as ct } from "./main-DpEPGF_F.js";
import { A as ut } from "./AccountSetupGuide-DKD4pEbi.js";
import dt from "./GitHubTrending-B5FgUA9y.js";
import { _ as fe, t as p } from "./_plugin-vue_export-helper-CLaxNhZQ.js";
import { s as Te } from "./storage-cache.service-BYF2zxXX.js";
import { n as Be, r as ht } from "./view-styles-DQwq1HRQ.js";
import { m as ae } from "./core-utils-Ccz-tarm.js";
const pt = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], mt = [
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
], gt = { class: "gh-awesome-wrapper" }, ft = { class: "gh-awesome-header" }, bt = { class: "gh-awesome-intro" }, vt = { class: "gh-awesome-search-box" }, yt = { class: "gh-awesome-pills" }, wt = ["onClick"], _t = { class: "gh-awesome-grid" }, kt = ["onClick"], $t = { class: "gh-awesome-card-head" }, Ct = { class: "gh-awesome-card-name" }, Tt = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Rt = { class: "gh-awesome-desc" }, St = { class: "gh-awesome-footer" }, At = { class: "gh-awesome-tags" }, Ht = ["href"], xt = {
  key: 0,
  class: "gh-awesome-empty"
}, Mt = /* @__PURE__ */ ge({
  __name: "GitHubAwesome",
  setup(g) {
    const c = D("all"), r = D(""), d = K(() => {
      const f = r.value.trim().toLowerCase(), C = c.value;
      return mt.filter((u) => C === "all" || u.category === C ? f ? u.name.toLowerCase().includes(f) || u.title.toLowerCase().includes(f) || u.desc.toLowerCase().includes(f) || u.tags.some((v) => v.toLowerCase().includes(f)) : !0 : !1);
    });
    function y(f) {
      window.open(f, "_blank", "noreferrer");
    }
    return (f, C) => (i(), l("div", gt, [
      e("header", ft, [
        e("div", bt, [
          C[3] || (C[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", vt, [
            ne(e("input", {
              "onUpdate:modelValue": C[0] || (C[0] = (u) => r.value = u),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [he, r.value]
            ]),
            r.value ? (i(), l("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: C[1] || (C[1] = (u) => r.value = "")
            }, "✕")) : T("", !0)
          ])
        ]),
        e("div", yt, [
          (i(!0), l(P, null, W(t(pt), (u) => (i(), l("button", {
            key: u.id,
            type: "button",
            class: N(["gh-awesome-pill", { active: c.value === u.id }]),
            onClick: (R) => c.value = u.id
          }, [
            e("span", null, o(u.icon), 1),
            e("b", null, o(u.name), 1)
          ], 10, wt))), 128))
        ])
      ]),
      e("div", _t, [
        (i(!0), l(P, null, W(d.value, (u) => (i(), l("article", {
          key: u.id,
          class: "gh-awesome-card",
          onClick: (R) => y(u.url)
        }, [
          e("div", $t, [
            e("div", Ct, [
              e("strong", null, o(u.title), 1),
              e("small", null, o(u.name), 1)
            ]),
            e("span", Tt, "★ " + o(u.stars), 1)
          ]),
          e("p", Rt, o(u.desc), 1),
          e("div", St, [
            e("div", At, [
              (i(!0), l(P, null, W(u.tags, (R) => (i(), l("span", {
                key: R,
                class: "gh-awesome-tag"
              }, o(R), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: u.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: C[2] || (C[2] = J(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Ht)
          ])
        ], 8, kt))), 128)),
        d.value.length ? T("", !0) : (i(), l("div", xt, [...C[4] || (C[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Gt = /* @__PURE__ */ fe(Mt, [["__scopeId", "data-v-28a8995f"]]), Re = "gh_my_repos_cache_v1", re = "gh_my_repo_custom_topics_v1", A = ye({
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
    const d = await Te.get(Re);
    if (d && d.length && (A.repos = d), !c && d && d.length) {
      this.fetchRemote(r).catch(() => {
      });
      return;
    }
    A.loading = !0, A.errorMessage = "";
    try {
      await this.fetchRemote(r);
    } catch (y) {
      if (y.name === "AbortError") return;
      A.errorMessage = y.message || "获取个人仓库失败";
    } finally {
      A.loading = !1;
    }
  }
  async fetchRemote(c) {
    const { ghUser: r, ghToken: d } = await Ae();
    if (!r && !d) {
      A.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
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
    const R = u.map((v) => ({
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
    A.repos = R, await Te.set(Re, R, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 提交单个仓库的 Topics 到 GitHub 远端
   */
  async syncRepoTopics(c, r) {
    const { ghToken: d } = await Ae();
    if (!d)
      return alert("向 GitHub 更新 Topic 需要在 GitHub 设置中配置具备 repo 写入权限的 Token。"), !1;
    const y = Array.from(new Set(r.map(se).filter(Boolean))).slice(0, 20), [f, C] = c.fullName.split("/"), u = `https://api.github.com/repos/${encodeURIComponent(f)}/${encodeURIComponent(C)}/topics`;
    A.syncingTopic = !0;
    try {
      const R = de(d), v = await fetch(u, {
        method: "PUT",
        headers: {
          ...R,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: y })
      });
      if (!v.ok)
        throw v.status === 401 || v.status === 403 ? new Error("Token 权限不足。修改 Topics 需要包含 repo（或 Administration:write）作用域。") : v.status === 404 ? new Error("仓库未找到或无权修改。") : new Error(`GitHub 远端保存失败 (HTTP ${v.status})`);
      const x = await v.json(), k = Array.isArray(x.names) ? x.names : y;
      return c.topics = k, await Te.set(Re, A.repos, { ttlMs: 30 * 86400 * 1e3 }), !0;
    } catch (R) {
      return alert(`更新 GitHub Topics 失败：${R.message || R}`), !1;
    } finally {
      A.syncingTopic = !1;
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
    return r ? A.customTopicNames.includes(r) ? (alert(`Topic「${r}」板块已存在。`), null) : (A.customTopicNames.push(r), await this.persistCustomTopics(), r) : (alert("Topic 名称无效。GitHub 规范：仅限 1~35 位小写英文字母、数字和连字符 '-'。"), null);
  }
  /**
   * 重命名 Topic 列：同步将该板块下所有仓库的旧 Topic 替换为新 Topic 并提交到 GitHub
   */
  async renameTopicColumn(c, r) {
    const d = se(r);
    if (!d)
      return alert("新 Topic 名称无效。仅限小写英文、数字与中划线。"), !1;
    if (c === d) return !0;
    const y = A.repos.filter((f) => f.topics.includes(c));
    if (y.length > 0) {
      if (!confirm(
        `确定将板块「${c}」重命名为「${d}」吗？
这将调用 GitHub API 同步更新该板块下的 ${y.length} 个仓库的远端 Topic。`
      )) return !1;
      A.syncingTopic = !0;
      let C = 0, u = 0;
      for (const R of y) {
        const v = R.topics.map((k) => k === c ? d : k);
        await this.syncRepoTopics(R, v) ? C++ : u++;
      }
      A.syncingTopic = !1, u > 0 && alert(`重命名完成，成功更新 ${C} 个仓库，失败 ${u} 个。`);
    }
    return A.customTopicNames = A.customTopicNames.map((f) => f === c ? d : f), await this.persistCustomTopics(), !0;
  }
  /**
   * 删除 Topic 板块：从该板块下所有仓库中移除该 topic
   */
  async deleteTopicColumn(c) {
    const r = A.repos.filter((y) => y.topics.includes(c)), d = r.length > 0 ? `确定删除板块「${c}」吗？
将从该板块下的 ${r.length} 个仓库中移除此 Topic 并在 GitHub 远端同步。` : `确定删除空板块「${c}」吗？`;
    if (!confirm(d)) return !1;
    if (r.length > 0) {
      A.syncingTopic = !0;
      for (const y of r)
        await this.removeRepoFromTopic(y, c);
      A.syncingTopic = !1;
    }
    return A.customTopicNames = A.customTopicNames.filter((y) => y !== c), await this.persistCustomTopics(), !0;
  }
  async loadPersistedCustomTopics() {
    try {
      const r = (typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([re]) : { [re]: JSON.parse(localStorage.getItem(re) || "[]") })?.[re];
      Array.isArray(r) && (A.customTopicNames = r.map(se).filter(Boolean));
    } catch {
    }
  }
  async persistCustomTopics() {
    const c = Array.from(new Set(A.customTopicNames.map(se).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [re]: c }) : localStorage.setItem(re, JSON.stringify(c));
    } catch {
    }
  }
}
const q = ce.getInstance(), Lt = { class: "my-repos-workspace" }, Dt = {
  key: 0,
  class: "error-banner"
}, Ut = { class: "shelf-header" }, It = { class: "shelf-title-group" }, Nt = { class: "shelf-title" }, Et = { class: "badge-count" }, jt = { class: "shelf-hint" }, Ot = {
  key: 0,
  class: "sync-status"
}, Pt = { class: "shelf-actions" }, Ft = { class: "shelf-search-box" }, Bt = ["placeholder"], Wt = ["disabled", "title"], zt = ["title"], Vt = ["onDragstart", "onContextmenu"], qt = { class: "repo-card-head" }, Yt = ["title", "onClick"], Kt = {
  key: 0,
  class: "badge-repo-visibility private"
}, Xt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Qt = ["title"], Jt = {
  key: 1,
  class: "repo-topics-row"
}, Zt = { class: "repo-card-footer" }, es = { class: "meta-left" }, ts = {
  key: 0,
  class: "meta-item lang"
}, ss = { class: "meta-item" }, os = {
  key: 1,
  class: "meta-item"
}, ns = ["title"], as = {
  key: 0,
  class: "empty-shelf-placeholder"
}, is = { class: "board-columns-track" }, rs = ["onDragover", "onDragleave", "onDrop"], ls = { class: "column-header" }, cs = {
  key: 0,
  class: "column-title-group"
}, us = ["title"], ds = { class: "badge-count" }, hs = {
  key: 1,
  class: "column-rename-group"
}, ps = ["onKeydown"], ms = ["onClick"], gs = { class: "column-actions" }, fs = ["title", "onClick"], bs = {
  key: 0,
  class: "col-popover-menu"
}, vs = ["onClick"], ys = ["onClick"], ws = { class: "column-cards-scroll" }, _s = ["onDragstart", "onContextmenu"], ks = { class: "repo-card-head" }, $s = ["title", "onClick"], Cs = {
  key: 0,
  class: "badge-repo-visibility private"
}, Ts = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Rs = ["title"], Ss = { class: "repo-topics-row" }, As = { class: "topic-chip active-chip" }, Hs = ["title", "onClick"], xs = { class: "repo-card-footer" }, Ms = { class: "meta-left" }, Gs = {
  key: 0,
  class: "meta-item lang"
}, Ls = { class: "meta-item" }, Ds = {
  key: 1,
  class: "meta-item"
}, Us = { class: "meta-date" }, Is = {
  key: 0,
  class: "empty-column-placeholder"
}, Ns = { class: "board-column new-column-slot" }, Es = {
  key: 1,
  class: "new-column-composer"
}, js = { class: "composer-header" }, Os = ["placeholder"], Ps = { class: "composer-actions" }, Fs = ["onClick"], Bs = /* @__PURE__ */ ge({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(g) {
    const c = g, r = D(""), d = D(!1), y = D(null), f = D(""), C = D(null), u = D(null), R = D(null), v = D(!1);
    function x() {
      v.value = !v.value;
    }
    function k(n) {
      const s = R.value;
      s && (Math.abs(n.deltaX) > Math.abs(n.deltaY) && n.deltaX !== 0 || n.deltaY !== 0 && (n.preventDefault(), s.scrollLeft += n.deltaY));
    }
    const G = D(null), $ = D(null), _ = D(null);
    let w = null, j = 0;
    const S = ye({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromTopic: null
    }), z = D(null), ee = D(!1);
    function V() {
      S.visible = !1, z.value = null;
    }
    function X(n, s, a) {
      n.preventDefault(), n.stopPropagation();
      let h = n.clientX, E = n.clientY;
      h > window.innerWidth - 200 && (h = window.innerWidth - 210), E > window.innerHeight - 240 && (E = window.innerHeight - 245), S.x = h, S.y = E, S.repo = s, S.fromTopic = a, S.visible = !0, z.value = "folder", ee.value = h > window.innerWidth - 380;
    }
    async function ie() {
      const n = S.repo, s = S.fromTopic;
      V(), n && (s && s !== "default" ? await q.removeRepoFromTopic(n, s) : n.topics.length && await q.syncRepoTopics(n, []));
    }
    async function M(n) {
      const s = S.repo, a = S.fromTopic;
      if (V(), !!s)
        if (a && a !== "default" && a !== n) {
          const h = s.topics.filter((E) => E !== a);
          h.includes(n) || h.push(n), await q.syncRepoTopics(s, h);
        } else
          await q.addRepoToTopic(s, n);
    }
    async function L() {
      const n = S.repo;
      if (V(), !!n)
        try {
          await navigator.clipboard.writeText(n.htmlUrl), Be.show({
            appName: "GitHub",
            title: p("github.myRepos.copiedUrlTitle"),
            message: p("github.myRepos.copiedUrlMsg", { name: n.name })
          });
        } catch {
        }
    }
    async function U() {
      const n = S.repo;
      if (V(), !!n)
        try {
          const s = `git clone ${n.htmlUrl}.git`;
          await navigator.clipboard.writeText(s), Be.show({
            appName: "GitHub",
            title: p("github.myRepos.copiedCloneTitle"),
            message: s
          });
        } catch {
        }
    }
    function O() {
      const n = S.repo;
      V(), n && $e(n.htmlUrl);
    }
    function Y(n) {
      n.target?.closest(".gh-repo-context-menu") || S.visible && V();
    }
    function Z(n) {
      n.key === "Escape" && S.visible && V();
    }
    const I = K(() => {
      const n = new Set(A.customTopicNames);
      for (const s of A.repos)
        for (const a of s.topics)
          a && n.add(a);
      return Array.from(n).sort();
    }), b = K(() => {
      const n = A.searchQuery.trim().toLowerCase();
      return n ? A.repos.filter(
        (s) => s.name.toLowerCase().includes(n) || s.description.toLowerCase().includes(n) || s.topics.some((a) => a.includes(n)) || s.language && s.language.toLowerCase().includes(n)
      ) : A.repos;
    }), F = K(() => {
      const n = new Set(I.value);
      return b.value.filter((s) => s.topics.length ? !s.topics.some((a) => n.has(a)) : !0);
    });
    function we(n) {
      return b.value.filter((s) => s.topics.includes(n));
    }
    async function Ge() {
      const n = r.value.trim();
      if (!n) return;
      await q.createTopicColumn(n) && (r.value = "", d.value = !1);
    }
    function Ke(n) {
      C.value = n, f.value = n, y.value = null;
    }
    async function Le(n) {
      const s = f.value.trim();
      if (!s || s === n) {
        C.value = null;
        return;
      }
      await q.renameTopicColumn(n, s) && (C.value = null);
    }
    async function Xe(n) {
      y.value = null, await q.deleteTopicColumn(n);
    }
    async function Qe(n, s) {
      await q.removeRepoFromTopic(n, s);
    }
    function Je(n) {
      const s = u.value;
      if (!s) return;
      const h = n.target?.closest(".column-cards-scroll");
      if (h && h.scrollHeight > h.clientHeight && !n.shiftKey && n.deltaX === 0) {
        const E = h.scrollTop <= 0 && n.deltaY < 0, Ce = h.scrollTop + h.clientHeight >= h.scrollHeight - 1 && n.deltaY > 0;
        if (!E && !Ce)
          return;
      }
      Math.abs(n.deltaX) > Math.abs(n.deltaY) && n.deltaX !== 0 || n.deltaY !== 0 && (n.preventDefault(), s.scrollLeft += n.deltaY);
    }
    function _e(n) {
      if (!G.value || !u.value) return;
      n.preventDefault();
      const s = n.deltaX !== 0 ? n.deltaX : n.deltaY;
      u.value.scrollLeft += s;
    }
    function De() {
      if (w !== null) return;
      const n = () => {
        u.value && j !== 0 ? (u.value.scrollLeft += j, w = requestAnimationFrame(n)) : be();
      };
      w = requestAnimationFrame(n);
    }
    function be() {
      w !== null && (cancelAnimationFrame(w), w = null), j = 0;
    }
    function Ue(n) {
      if (!G.value || !u.value) return;
      const s = u.value.getBoundingClientRect(), a = 100;
      if (n > s.right - a) {
        const h = Math.min(1, Math.max(0.1, (n - (s.right - a)) / a));
        j = Math.round(h * 20), De();
      } else if (n < s.left + a) {
        const h = Math.min(1, Math.max(0.1, (s.left + a - n) / a));
        j = -Math.round(h * 20), De();
      } else
        be();
    }
    function Ze(n) {
      G.value && (n.preventDefault(), Ue(n.clientX));
    }
    function Ie(n, s, a) {
      V(), G.value = s, $.value = a, n.dataTransfer && (n.dataTransfer.effectAllowed = "move", n.dataTransfer.setData("text/plain", `${s.id}:${a}`)), window.addEventListener("wheel", _e, { passive: !1 });
    }
    function ke() {
      G.value = null, $.value = null, _.value = null, be(), window.removeEventListener("wheel", _e);
    }
    function Ne(n, s) {
      G.value && (n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move"), _.value = s, Ue(n.clientX));
    }
    function Ee(n, s) {
      const a = n.currentTarget, h = n.relatedTarget;
      a?.contains(h) || _.value === s && (_.value = null);
    }
    async function je(n, s) {
      n.preventDefault();
      const a = G.value, h = $.value;
      if (ke(), !!a)
        if (s === "default")
          h && h !== "default" && await q.removeRepoFromTopic(a, h);
        else if (h && h !== "default" && h !== s) {
          const E = a.topics.filter((Ce) => Ce !== h);
          E.includes(s) || E.push(s), await q.syncRepoTopics(a, E);
        } else
          await q.addRepoToTopic(a, s);
    }
    function $e(n) {
      window.open(n, "_blank", "noopener,noreferrer");
    }
    function Oe(n) {
      if (!n) return "";
      try {
        const s = new Date(n);
        return `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}-${String(s.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ue(
      () => c.active,
      (n) => {
        window.removeEventListener("pointerdown", Y), window.removeEventListener("keydown", Z), V(), n && (window.addEventListener("pointerdown", Y), window.addEventListener("keydown", Z), A.repos.length || q.load());
      },
      { immediate: !0 }
    ), xe(() => {
      c.active && (window.addEventListener("pointerdown", Y), window.addEventListener("keydown", Z), A.repos.length || q.load());
    }), Me(() => {
      window.removeEventListener("wheel", _e), window.removeEventListener("pointerdown", Y), window.removeEventListener("keydown", Z), be(), V();
    }), (n, s) => (i(), l("div", Lt, [
      t(A).errorMessage ? (i(), l("div", Dt, [
        e("span", null, "⚠️ " + o(t(A).errorMessage), 1),
        e("button", {
          type: "button",
          onClick: s[0] || (s[0] = (a) => t(q).load(!0))
        }, "重试")
      ])) : T("", !0),
      e("section", {
        class: N(["default-shelf", { "drop-active": _.value === "default", "is-collapsed": v.value }]),
        onDragover: s[4] || (s[4] = (a) => Ne(a, "default")),
        onDragleave: s[5] || (s[5] = (a) => Ee(a, "default")),
        onDrop: s[6] || (s[6] = (a) => je(a, "default"))
      }, [
        e("header", Ut, [
          e("div", It, [
            s[23] || (s[23] = e("span", { class: "col-dot default-dot" }, null, -1)),
            e("h3", Nt, o(t(p)("github.myRepos.defaultShelf")), 1),
            e("span", Et, o(F.value.length), 1),
            e("span", jt, o(t(p)("github.myRepos.defaultShelfHint")), 1),
            t(A).syncingTopic ? (i(), l("span", Ot, [
              s[22] || (s[22] = e("i", { class: "spin-icon" }, "⏳", -1)),
              Q(" " + o(t(p)("github.myRepos.syncingTopics")), 1)
            ])) : T("", !0)
          ]),
          e("div", Pt, [
            e("div", Ft, [
              ne(e("input", {
                "onUpdate:modelValue": s[1] || (s[1] = (a) => t(A).searchQuery = a),
                type: "text",
                placeholder: t(p)("github.myRepos.filterPlaceholder"),
                class: "shelf-search-input"
              }, null, 8, Bt), [
                [he, t(A).searchQuery]
              ]),
              t(A).searchQuery ? (i(), l("button", {
                key: 0,
                type: "button",
                class: "shelf-clear-btn",
                onClick: s[2] || (s[2] = (a) => t(A).searchQuery = "")
              }, "✕")) : T("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(A).loading || t(A).syncingTopic,
              title: t(p)("github.myRepos.refreshBtnTitle"),
              onClick: s[3] || (s[3] = (a) => t(q).load(!0))
            }, [
              e("span", {
                class: N({ spinning: t(A).loading })
              }, "🔄", 2),
              e("span", null, o(t(A).loading ? t(p)("github.myRepos.refreshing") : t(p)("common.refresh")), 1)
            ], 8, Wt),
            e("button", {
              type: "button",
              class: "shelf-toggle-btn",
              title: v.value ? t(p)("github.myRepos.expandShelf") : t(p)("github.myRepos.collapseShelf"),
              onClick: x
            }, o(v.value ? t(p)("github.myRepos.expandBtn") : t(p)("github.myRepos.collapseBtn")), 9, zt)
          ])
        ]),
        ne(e("div", {
          ref_key: "shelfScrollRef",
          ref: R,
          class: "shelf-cards-scroll",
          onWheel: k
        }, [
          (i(!0), l(P, null, W(F.value, (a) => (i(), l("div", {
            key: a.id,
            class: N(["repo-card shelf-card", { "card-dragging": G.value?.id === a.id }]),
            draggable: "true",
            onDragstart: (h) => Ie(h, a, "default"),
            onDragend: ke,
            onContextmenu: (h) => X(h, a, "default")
          }, [
            e("div", qt, [
              e("span", {
                class: "repo-name",
                title: a.fullName,
                onClick: (h) => $e(a.htmlUrl)
              }, o(a.name), 9, Yt),
              a.isPrivate ? (i(), l("span", Kt, "私有")) : T("", !0),
              a.isFork ? (i(), l("span", Xt, "Fork")) : T("", !0)
            ]),
            a.description ? (i(), l("p", {
              key: 0,
              class: "repo-desc",
              title: a.description
            }, o(a.description), 9, Qt)) : T("", !0),
            a.topics.length ? (i(), l("div", Jt, [
              (i(!0), l(P, null, W(a.topics, (h) => (i(), l("span", {
                key: h,
                class: "topic-chip"
              }, " #" + o(h), 1))), 128))
            ])) : T("", !0),
            e("div", Zt, [
              e("div", es, [
                a.language ? (i(), l("span", ts, [
                  s[24] || (s[24] = e("span", { class: "lang-color" }, null, -1)),
                  Q(o(a.language), 1)
                ])) : T("", !0),
                e("span", ss, "⭐ " + o(a.stargazersCount), 1),
                a.forksCount ? (i(), l("span", os, "🍴 " + o(a.forksCount), 1)) : T("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + a.updatedAt
              }, o(Oe(a.pushedAt || a.updatedAt)), 9, ns)
            ])
          ], 42, Vt))), 128)),
          F.value.length ? T("", !0) : (i(), l("div", as, [
            e("span", null, o(t(p)("github.myRepos.emptyShelf")), 1)
          ]))
        ], 544), [
          [Ve, !v.value]
        ])
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: u,
        class: "board-viewport",
        onWheel: Je,
        onDragover: Ze
      }, [
        e("div", is, [
          (i(!0), l(P, null, W(I.value, (a) => (i(), l("section", {
            key: a,
            class: N(["board-column topic-column", { "drop-active": _.value === a }]),
            onDragover: (h) => Ne(h, a),
            onDragleave: (h) => Ee(h, a),
            onDrop: (h) => je(h, a)
          }, [
            e("header", ls, [
              C.value !== a ? (i(), l("div", cs, [
                s[25] || (s[25] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "GitHub Topic: " + a
                }, " #" + o(a), 9, us),
                e("span", ds, o(we(a).length), 1)
              ])) : (i(), l("div", hs, [
                ne(e("input", {
                  "onUpdate:modelValue": s[7] || (s[7] = (h) => f.value = h),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    ve((h) => Le(a), ["enter"]),
                    s[8] || (s[8] = ve((h) => C.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, ps), [
                  [he, f.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (h) => Le(a)
                }, "✓", 8, ms),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: s[9] || (s[9] = (h) => C.value = null)
                }, "✕")
              ])),
              e("div", gs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: t(p)("github.myRepos.topicActions"),
                  onClick: (h) => y.value = y.value === a ? null : a
                }, "•••", 8, fs),
                y.value === a ? (i(), l("div", bs, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (h) => Ke(a)
                  }, o(t(p)("github.myRepos.renameTopicMenu")), 9, vs),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (h) => Xe(a)
                  }, o(t(p)("github.myRepos.deleteTopicMenu")), 9, ys)
                ])) : T("", !0)
              ])
            ]),
            e("div", ws, [
              (i(!0), l(P, null, W(we(a), (h) => (i(), l("div", {
                key: h.id,
                class: N(["repo-card", { "card-dragging": G.value?.id === h.id }]),
                draggable: "true",
                onDragstart: (E) => Ie(E, h, a),
                onDragend: ke,
                onContextmenu: (E) => X(E, h, a)
              }, [
                e("div", ks, [
                  e("span", {
                    class: "repo-name",
                    title: h.fullName,
                    onClick: (E) => $e(h.htmlUrl)
                  }, o(h.name), 9, $s),
                  h.isPrivate ? (i(), l("span", Cs, "私有")) : T("", !0),
                  h.isFork ? (i(), l("span", Ts, "Fork")) : T("", !0)
                ]),
                h.description ? (i(), l("p", {
                  key: 0,
                  class: "repo-desc",
                  title: h.description
                }, o(h.description), 9, Rs)) : T("", !0),
                e("div", Ss, [
                  e("span", As, [
                    Q(" #" + o(a) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: t(p)("github.myRepos.removeTopicTip"),
                      onClick: J((E) => Qe(h, a), ["stop"])
                    }, "✕", 8, Hs)
                  ]),
                  (i(!0), l(P, null, W(h.topics.filter((E) => E !== a), (E) => (i(), l("span", {
                    key: E,
                    class: "topic-chip other-chip"
                  }, " #" + o(E), 1))), 128))
                ]),
                e("div", xs, [
                  e("div", Ms, [
                    h.language ? (i(), l("span", Gs, [
                      s[26] || (s[26] = e("span", { class: "lang-color" }, null, -1)),
                      Q(o(h.language), 1)
                    ])) : T("", !0),
                    e("span", Ls, "⭐ " + o(h.stargazersCount), 1),
                    h.forksCount ? (i(), l("span", Ds, "🍴 " + o(h.forksCount), 1)) : T("", !0)
                  ]),
                  e("span", Us, o(Oe(h.pushedAt || h.updatedAt)), 1)
                ])
              ], 42, _s))), 128)),
              we(a).length ? T("", !0) : (i(), l("div", Is, [
                e("span", null, o(t(p)("github.myRepos.emptyColumn")), 1)
              ]))
            ])
          ], 42, rs))), 128)),
          e("section", Ns, [
            d.value ? (i(), l("div", Es, [
              e("header", js, [
                e("strong", null, o(t(p)("github.myRepos.newTopicTitle")), 1),
                e("small", null, o(t(p)("github.myRepos.newTopicSub")), 1)
              ]),
              ne(e("input", {
                "onUpdate:modelValue": s[11] || (s[11] = (a) => r.value = a),
                type: "text",
                placeholder: t(p)("github.myRepos.newTopicPlaceholder"),
                class: "composer-input",
                onKeydown: [
                  ve(Ge, ["enter"]),
                  s[12] || (s[12] = ve((a) => d.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 40, Os), [
                [he, r.value]
              ]),
              e("div", Ps, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: Ge
                }, o(t(p)("github.myRepos.createTopicBtn")), 1),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: s[13] || (s[13] = (a) => d.value = !1)
                }, o(t(p)("common.cancel")), 1)
              ])
            ])) : (i(), l("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: s[10] || (s[10] = (a) => d.value = !0)
            }, [...s[27] || (s[27] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建 Topic 板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (i(), oe(qe, { to: "body" }, [
        S.visible && S.repo ? (i(), l("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Ye({ left: `${S.x}px`, top: `${S.y}px` }),
          onClick: s[20] || (s[20] = J(() => {
          }, ["stop"])),
          onContextmenu: s[21] || (s[21] = J(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: N(["gh-menu-has-sub", { "is-active": z.value === "folder" }]),
            onMouseenter: s[16] || (s[16] = (a) => z.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: s[14] || (s[14] = J((a) => z.value = z.value === "folder" ? null : "folder", ["stop"]))
            }, [
              e("span", null, o(t(p)("github.myRepos.moveToGroup")), 1),
              s[28] || (s[28] = e("span", { class: "sub-arrow" }, "›", -1))
            ]),
            e("div", {
              class: N(["gh-sub-flyout", { "flyout-left": ee.value }]),
              onClick: s[15] || (s[15] = J(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: N(["fo-cover-menu-item", { primary: !S.repo.topics.length }]),
                type: "button",
                onClick: ie
              }, o(S.repo.topics.length ? "  " : "✓ ") + o(t(p)("github.myRepos.setUncategorized")), 3),
              (i(!0), l(P, null, W(I.value, (a) => (i(), l("button", {
                key: a,
                class: N(["fo-cover-menu-item", { primary: S.repo.topics.includes(a) }]),
                type: "button",
                onClick: (h) => M(a)
              }, o(S.repo.topics.includes(a) ? "✓ " : "  ") + "📁 " + o(a), 11, Fs))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[17] || (s[17] = (a) => z.value = null),
            onClick: L
          }, o(t(p)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[18] || (s[18] = (a) => z.value = null),
            onClick: U
          }, o(t(p)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[19] || (s[19] = (a) => z.value = null),
            onClick: O
          }, o(t(p)("github.myRepos.openInGitHub")), 33)
        ], 36)) : T("", !0)
      ]))
    ]));
  }
}), Ws = /* @__PURE__ */ fe(Bs, [["__scopeId", "data-v-2cb039b3"]]);
function zs(g) {
  const c = g.subject?.url, r = g.repository?.html_url || "https://github.com";
  if (!c) return r;
  const d = g.subject?.type;
  return d === "Issue" ? c.replace("https://api.github.com/repos/", "https://github.com/") : d === "PullRequest" ? c.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : d === "Release" ? c.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : c.replace("https://api.github.com/repos/", "https://github.com/");
}
function Vs(g) {
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
    const g = B.token?.trim();
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
        formattedTime: Vs(f.updated_at),
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
        htmlUrl: zs(f)
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
function pe(g) {
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
function qs(g) {
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
function We(g) {
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
async function ze(g, c) {
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
async function Ys(g, c, r, d) {
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
    let R = 0;
    const v = (u.comments?.nodes || []).map((G) => {
      const $ = G.replies?.nodes || [];
      R += $.length;
      const _ = $.map((w) => ({
        id: w.id,
        author: {
          login: w.author?.login || "匿名",
          avatarUrl: w.author?.avatarUrl || "",
          association: me(w.authorAssociation)
        },
        createdAt: w.createdAt,
        formattedTime: pe(w.createdAt),
        body: w.body || "",
        bodyHtml: w.bodyHTML || (w.body ? ae.renderMarkdown(w.body) : ""),
        reactions: Se(w.reactionGroups)
      }));
      return {
        id: G.id,
        author: {
          login: G.author?.login || "匿名",
          avatarUrl: G.author?.avatarUrl || "",
          association: me(G.authorAssociation)
        },
        createdAt: G.createdAt,
        formattedTime: pe(G.createdAt),
        body: G.body || "",
        bodyHtml: G.bodyHTML || (G.body ? ae.renderMarkdown(G.body) : "<p>（评论内容为空）</p>"),
        reactions: Se(G.reactionGroups),
        replies: _
      };
    }), x = u.body || "", k = u.bodyHTML && u.bodyHTML.trim().length > 10 ? u.bodyHTML : x ? ae.renderMarkdown(x) : "<p>（主贴内容为空）</p>";
    return {
      title: u.title,
      number: r,
      state: "discussion",
      category: u.category ? {
        name: u.category.name,
        emoji: qs(u.category.emoji)
      } : void 0,
      author: {
        login: u.author?.login || "未知",
        avatarUrl: u.author?.avatarUrl || "",
        association: me(u.authorAssociation)
      },
      createdAt: u.createdAt,
      formattedTime: pe(u.createdAt),
      body: x,
      bodyHtml: k,
      htmlUrl: u.url,
      commentsCount: u.comments?.totalCount || v.length,
      totalRepliesCount: R,
      comments: v,
      reactions: Se(u.reactionGroups)
    };
  } catch {
    return null;
  }
}
const He = {
  async open(g) {
    m.isOpen = !0, m.loading = !0, m.error = "", m.data = null, m.notificationItem = g;
    const c = B.token?.trim() || "", r = {
      ...de(c),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const d = g.subject?.url, y = g.subject?.type, f = g.repository?.fullName || "", [C, u] = f.split("/"), R = d?.match(/\/(\d+)$/), v = R ? Number(R[1]) : void 0;
      if (y === "Discussion" && C && u && v) {
        const x = await Ys(C, u, v, c);
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
          let G = [];
          if (k.comments_url && k.comments > 0)
            try {
              const w = await fetch(`${k.comments_url}?per_page=50`, { headers: r, cache: "no-store" });
              if (w.ok) {
                const j = await w.json();
                Array.isArray(j) && (G = await Promise.all(
                  j.map(async (S) => {
                    const z = S.body_html || (S.body ? await ze(S.body, c) : "");
                    return {
                      id: S.id,
                      author: {
                        login: S.user?.login || "匿名",
                        avatarUrl: S.user?.avatar_url || "",
                        association: me(S.author_association)
                      },
                      createdAt: S.created_at,
                      formattedTime: pe(S.created_at),
                      body: S.body || "",
                      bodyHtml: z,
                      reactions: We(S.reactions)
                    };
                  })
                ));
              }
            } catch (w) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", w);
            }
          const $ = k.body || "";
          let _ = k.body_html || "";
          !_ && $ && (_ = await ze($, c)), !_ && $ && (_ = ae.renderMarkdown($)), m.data = {
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
            formattedTime: pe(k.created_at || k.published_at || g.updatedAt),
            body: $,
            bodyHtml: _ || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: k.html_url || g.htmlUrl,
            commentsCount: typeof k.comments == "number" ? k.comments : G.length,
            comments: G,
            reactions: We(k.reactions),
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
}, Ks = { class: "vue-gh-notification-panel-wrapper" }, Xs = { class: "gh-msg-header" }, Qs = { class: "gh-msg-account" }, Js = { class: "gh-msg-subtitle" }, Zs = {
  class: "gh-msg-tabs",
  role: "tablist"
}, eo = ["onClick"], to = { class: "gh-msg-list" }, so = {
  key: 0,
  class: "gh-msg-loading"
}, oo = {
  key: 1,
  class: "gh-msg-error"
}, no = {
  key: 2,
  class: "gh-msg-empty"
}, ao = ["onClick"], io = { class: "gh-card-indicator-col" }, ro = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, lo = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, co = { class: "gh-card-type-col" }, uo = ["title"], ho = { class: "gh-card-main-col" }, po = { class: "gh-card-repo-row" }, mo = ["title"], go = { class: "gh-card-reason-tag" }, fo = { class: "gh-card-time" }, bo = ["title"], vo = { class: "gh-card-footer-row" }, yo = { class: "gh-card-type-label" }, wo = ["onClick"], _o = /* @__PURE__ */ ge({
  __name: "GitHubNotificationPanel",
  setup(g) {
    const c = D(null), r = K(() => [
      { kind: "all", label: "所有", count: H.items.length },
      { kind: "unread", label: "未读", count: H.items.filter(($) => $.unread).length },
      { kind: "mention", label: "提及", count: H.items.filter(($) => $.reason === "mention").length },
      { kind: "author", label: "作者", count: H.items.filter(($) => $.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: H.items.filter(($) => $.reason === "ci_activity" || $.subject.type === "CheckSuite").length }
    ]), d = K(() => {
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
    function R() {
      le.close();
    }
    function v($) {
      He.open($);
    }
    function x($) {
      le.openTarget($);
    }
    function k($) {
      if (!H.isOpen) return;
      const _ = $.target;
      !c.value?.contains(_) && !_?.closest("#gh-header-msg-center-btn") && le.close();
    }
    function G($) {
      $.key === "Escape" && H.isOpen && le.close();
    }
    return xe(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", k), window.addEventListener("keydown", G));
    }), Me(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", k), window.removeEventListener("keydown", G));
    }), ($, _) => (i(), l("div", Ks, [
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
        e("header", Xs, [
          e("div", Qs, [
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
              e("p", Js, " 共 " + o(t(H).items.length) + " 条通知 · " + o(t(H).unreadCount) + " 条未读（完整保留不标记） ", 1)
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
            class: N(["gh-panel-btn", { "is-spinning": t(H).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: u
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: R
          }, " ✕ ")
        ]),
        e("nav", Zs, [
          (i(!0), l(P, null, W(r.value, (w) => (i(), l("button", {
            key: w.kind,
            type: "button",
            class: N(["gh-msg-tab", { active: t(H).activeKind === w.kind }]),
            onClick: (j) => t(H).activeKind = w.kind
          }, [
            Q(o(w.label) + " ", 1),
            w.count > 0 ? (i(), l("span", {
              key: 0,
              class: N(["gh-tab-pill", { "is-unread-pill": w.kind === "unread" }])
            }, o(w.count), 3)) : T("", !0)
          ], 10, eo))), 128))
        ]),
        e("div", to, [
          t(H).loading && !t(H).items.length ? (i(), l("div", so, [..._[4] || (_[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(H).error ? (i(), l("div", oo, [
            _[5] || (_[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, o(t(H).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: u
            }, "重试")
          ])) : d.value.length === 0 ? (i(), l("div", no, [..._[6] || (_[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (i(!0), l(P, { key: 3 }, W(d.value, (w) => (i(), l("article", {
            key: w.id,
            class: N(["gh-notification-card", { "is-unread": w.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (j) => v(w)
          }, [
            e("div", io, [
              w.unread ? (i(), l("span", ro)) : (i(), l("span", lo))
            ]),
            e("div", co, [
              e("span", {
                class: "gh-type-badge",
                title: w.subject.type
              }, o(y(w.subject.type, w.reason)), 9, uo)
            ]),
            e("div", ho, [
              e("div", po, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: w.repository.fullName
                }, o(w.repository.fullName), 9, mo),
                e("span", go, o(f(w.reason)), 1),
                e("time", fo, o(w.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: w.subject.title
              }, o(w.subject.title), 9, bo),
              e("div", vo, [
                e("span", yo, o(w.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: J((j) => x(w), ["stop"])
                }, "在网页打开 ↗", 8, wo)
              ])
            ])
          ], 10, ao))), 128))
        ])
      ], 512)) : T("", !0)
    ]));
  }
}), ko = /* @__PURE__ */ fe(_o, [["__scopeId", "data-v-4271efab"]]), $o = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, Co = ["aria-label"], To = { class: "gh-modal-title-wrap" }, Ro = { class: "gh-modal-octo-icon" }, So = ["href"], Ao = { class: "gh-owner" }, Ho = { class: "gh-name" }, xo = {
  key: 1,
  class: "gh-modal-repo-name"
}, Mo = { class: "gh-name" }, Go = { class: "gh-modal-actions" }, Lo = { class: "gh-modal-content" }, Do = {
  key: 0,
  class: "gh-content-loading"
}, Uo = {
  key: 1,
  class: "gh-content-error"
}, Io = { class: "gh-discussion-title-header" }, No = { class: "gh-discussion-h1" }, Eo = {
  key: 0,
  class: "gh-discussion-num"
}, jo = { class: "gh-discussion-sub-meta" }, Oo = {
  key: 0,
  class: "gh-category-pill"
}, Po = {
  key: 0,
  class: "cat-emoji"
}, Fo = {
  key: 1,
  class: "gh-category-pill"
}, Bo = { class: "gh-sub-author" }, Wo = { class: "gh-sub-verb" }, zo = {
  key: 2,
  class: "gh-sub-comments-count"
}, Vo = { class: "gh-op-post-card" }, qo = { class: "gh-op-post-head" }, Yo = { class: "gh-op-author-left" }, Ko = ["src"], Xo = { class: "gh-op-meta" }, Qo = { class: "gh-op-name-row" }, Jo = { class: "gh-op-name" }, Zo = {
  key: 0,
  class: "gh-role-pill"
}, en = { class: "gh-op-time" }, tn = ["innerHTML"], sn = {
  key: 0,
  class: "gh-reactions-bar"
}, on = { class: "rx-emoji" }, nn = { class: "rx-count" }, an = {
  key: 0,
  class: "gh-comments-block"
}, rn = { class: "gh-comments-header" }, ln = { class: "gh-comments-count-pill" }, cn = { class: "gh-comments-feed" }, un = { class: "gh-comment-head" }, dn = ["src"], hn = { class: "gh-comment-meta" }, pn = { class: "gh-comment-author" }, mn = {
  key: 0,
  class: "gh-role-pill small"
}, gn = { class: "gh-comment-time" }, fn = ["innerHTML"], bn = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, vn = { class: "rx-emoji" }, yn = { class: "rx-count" }, wn = {
  key: 1,
  class: "gh-comment-replies-thread"
}, _n = { class: "gh-replies-thread-title" }, kn = { class: "gh-reply-head" }, $n = ["src"], Cn = { class: "gh-reply-meta" }, Tn = { class: "gh-reply-author" }, Rn = {
  key: 0,
  class: "gh-role-pill tiny"
}, Sn = { class: "gh-reply-time" }, An = ["innerHTML"], Hn = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, xn = { class: "rx-emoji" }, Mn = { class: "rx-count" }, Gn = {
  key: 1,
  class: "gh-no-comments"
}, Ln = /* @__PURE__ */ ge({
  __name: "GitHubNotificationDetailDrawer",
  setup(g) {
    const c = D(null), r = D(null), d = D(null);
    let y = !1, f = 0, C = 0, u = 0, R = 0, v = () => {
    };
    const x = K(() => (m.data?.repositoryFullName || m.notificationItem?.repository.fullName || "").split("/")[0] || ""), k = K(() => {
      const M = m.data?.repositoryFullName || m.notificationItem?.repository.fullName || "";
      return M.split("/")[1] || M;
    }), G = K(() => {
      if (!m.data) return "";
      const M = m.data.bodyHtml?.trim() || "";
      if (M.length > 20) return M;
      const L = m.data.body?.trim() || "";
      return L.length > 0 ? ae.renderMarkdown(L) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), $ = K(() => d.value ? {
      position: "fixed",
      left: `${d.value.x}px`,
      top: `${d.value.y}px`,
      transform: "none"
    } : {});
    ue(
      () => m.isOpen,
      (M) => {
        M && (d.value = null, Pe(() => {
          r.value && (r.value.scrollTop = 0);
        }));
      }
    ), ue(
      () => m.data,
      (M) => {
        M && Pe(() => {
          r.value && (r.value.scrollTop = 0);
        });
      }
    );
    function _(M) {
      if (M.target.closest("button, a, input")) return;
      v();
      const L = c.value;
      if (!L || !m.isOpen) return;
      y = !0;
      const U = L.getBoundingClientRect();
      u = U.left, R = U.top, f = M.clientX, C = M.clientY, d.value = { x: u, y: R };
      const O = (Z) => {
        if (!y) return;
        const I = Z.clientX - f, b = Z.clientY - C;
        d.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, u + I)),
          y: Math.max(10, Math.min(window.innerHeight - 80, R + b))
        };
      }, Y = () => {
        y = !1, window.removeEventListener("mousemove", O), window.removeEventListener("mouseup", Y);
      };
      v = Y, window.addEventListener("mousemove", O), window.addEventListener("mouseup", Y);
    }
    function w() {
      He.close();
    }
    function j() {
      const M = m.data?.htmlUrl || m.notificationItem?.htmlUrl;
      M && typeof window < "u" && window.open(M, "_blank", "noopener,noreferrer");
    }
    function S(M) {
      const U = M.target?.closest("a");
      U && U.href && (M.preventDefault(), M.stopPropagation(), window.open(U.href, "_blank", "noopener,noreferrer"));
    }
    function z() {
      m.notificationItem && He.open(m.notificationItem);
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
    function V(M) {
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
    function X(M) {
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
    return xe(() => {
      window.addEventListener("keydown", ie);
    }), Me(() => {
      window.removeEventListener("keydown", ie), v();
    }), (M, L) => (i(), oe(qe, { to: "body" }, [
      t(m).isOpen ? (i(), l("div", $o, [
        e("div", {
          ref_key: "windowRef",
          ref: c,
          class: "gh-nonmodal-window",
          style: Ye($.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(m).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: _
          }, [
            e("div", To, [
              e("span", Ro, o(ee(t(m).data?.type || t(m).notificationItem?.subject.type)), 1),
              t(m).data?.htmlUrl || t(m).notificationItem?.htmlUrl ? (i(), l("a", {
                key: 0,
                href: t(m).data?.htmlUrl || t(m).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", Ao, o(x.value), 1),
                L[0] || (L[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", Ho, o(k.value), 1),
                L[1] || (L[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, So)) : (i(), l("span", xo, [
                e("strong", Mo, o(t(m).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", Go, [
              t(m).data?.state ? (i(), l("span", {
                key: 0,
                class: N(["gh-detail-state-pill", t(m).data.state])
              }, o(X(t(m).data.state)), 3)) : T("", !0),
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
          e("div", Lo, [
            t(m).loading ? (i(), l("div", Do, [
              L[2] || (L[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + o(t(m).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(m).error ? (i(), l("div", Uo, [
              L[3] || (L[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, o(t(m).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: z
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
              onClick: S
            }, [
              e("div", Io, [
                e("h1", No, [
                  Q(o(t(m).data.title) + " ", 1),
                  t(m).data.number ? (i(), l("span", Eo, "#" + o(t(m).data.number), 1)) : T("", !0)
                ]),
                e("div", jo, [
                  t(m).data.category ? (i(), l("span", Oo, [
                    t(m).data.category.emoji ? (i(), l("span", Po, o(t(m).data.category.emoji), 1)) : T("", !0),
                    e("span", null, o(t(m).data.category.name), 1)
                  ])) : (i(), l("span", Fo, o(V(t(m).data.type)), 1)),
                  e("span", Bo, o(t(m).data.author.login), 1),
                  e("span", Wo, "发布于 " + o(t(m).data.formattedTime), 1),
                  t(m).data.commentsCount ? (i(), l("span", zo, [
                    Q(" · " + o(t(m).data.commentsCount) + " 条讨论主题 ", 1),
                    t(m).data.totalRepliesCount ? (i(), l(P, { key: 0 }, [
                      Q(" （含 " + o(t(m).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : T("", !0)
                  ])) : T("", !0)
                ])
              ]),
              e("article", Vo, [
                e("div", qo, [
                  e("div", Yo, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(m).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Ko),
                    e("div", Xo, [
                      e("div", Qo, [
                        e("strong", Jo, o(t(m).data.author.login), 1),
                        t(m).data.author.association ? (i(), l("span", Zo, o(t(m).data.author.association), 1)) : T("", !0)
                      ]),
                      e("time", en, o(t(m).data.formattedTime), 1)
                    ])
                  ]),
                  L[4] || (L[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                L[5] || (L[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: G.value
                }, null, 8, tn),
                t(m).data.reactions?.length ? (i(), l("div", sn, [
                  (i(!0), l(P, null, W(t(m).data.reactions, (U) => (i(), l("span", {
                    key: U.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", on, o(U.emoji), 1),
                    e("span", nn, o(U.count), 1)
                  ]))), 128))
                ])) : T("", !0)
              ]),
              t(m).data.comments.length ? (i(), l("div", an, [
                e("div", rn, [
                  L[6] || (L[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", ln, [
                    Q(o(t(m).data.commentsCount) + " 条主题 ", 1),
                    t(m).data.totalRepliesCount ? (i(), l(P, { key: 0 }, [
                      Q(" · " + o(t(m).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : T("", !0)
                  ])
                ]),
                e("div", cn, [
                  (i(!0), l(P, null, W(t(m).data.comments, (U) => (i(), l("div", {
                    key: U.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", un, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: U.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, dn),
                      e("div", hn, [
                        e("span", pn, o(U.author.login), 1),
                        U.author.association ? (i(), l("span", mn, o(U.author.association), 1)) : T("", !0),
                        e("time", gn, o(U.formattedTime), 1)
                      ])
                    ]),
                    L[7] || (L[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: U.bodyHtml
                    }, null, 8, fn),
                    U.reactions?.length ? (i(), l("div", bn, [
                      (i(!0), l(P, null, W(U.reactions, (O) => (i(), l("span", {
                        key: O.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", vn, o(O.emoji), 1),
                        e("span", yn, o(O.count), 1)
                      ]))), 128))
                    ])) : T("", !0),
                    U.replies?.length ? (i(), l("div", wn, [
                      e("div", _n, [
                        e("span", null, "💬 " + o(U.replies.length) + " 条回复对话", 1)
                      ]),
                      (i(!0), l(P, null, W(U.replies, (O) => (i(), l("div", {
                        key: O.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", kn, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: O.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, $n),
                          e("div", Cn, [
                            e("strong", Tn, o(O.author.login), 1),
                            O.author.association ? (i(), l("span", Rn, o(O.author.association), 1)) : T("", !0),
                            e("time", Sn, o(O.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: O.bodyHtml
                        }, null, 8, An),
                        O.reactions?.length ? (i(), l("div", Hn, [
                          (i(!0), l(P, null, W(O.reactions, (Y) => (i(), l("span", {
                            key: Y.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", xn, o(Y.emoji), 1),
                            e("span", Mn, o(Y.count), 1)
                          ]))), 128))
                        ])) : T("", !0)
                      ]))), 128))
                    ])) : T("", !0)
                  ]))), 128))
                ])
              ])) : (i(), l("div", Gn, [...L[8] || (L[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : T("", !0)
          ])
        ], 12, Co)
      ])) : T("", !0)
    ]));
  }
}), Dn = /* @__PURE__ */ fe(Ln, [["__scopeId", "data-v-d22ba06c"]]), Un = ["inert"], In = { class: "card-head" }, Nn = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, En = ["title"], jn = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, On = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Pn = ["placeholder"], Fn = ["title"], Bn = { class: "gh-search-rule-icon" }, Wn = { class: "gh-search-rule-text" }, zn = ["title"], Vn = ["title"], qn = { class: "gh-header-msg-label" }, Yn = {
  key: 0,
  class: "gh-header-msg-badge"
}, Kn = { class: "gh-settings-anchor" }, Xn = ["aria-expanded", "aria-label", "title"], Qn = {
  key: 0,
  class: "muted small",
  role: "status"
}, Jn = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Zn = { class: "gh-bili-layout" }, ea = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, ta = ["title"], sa = { class: "fo-sidebar-toggle-title" }, oa = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, na = ["aria-expanded", "title"], aa = { class: "fo-sidebar-toggle-chevron" }, ia = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, ra = { class: "fo-sidebar-sub-wrap" }, la = ["title"], ca = { class: "fo-sidebar-sub-main" }, ua = { class: "fo-sidebar-sub-text" }, da = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, ha = ["title"], pa = { class: "fo-sidebar-sub-main" }, ma = { class: "fo-sidebar-sub-text" }, ga = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, fa = ["title"], ba = { class: "fo-sidebar-sub-main" }, va = { class: "fo-sidebar-sub-text" }, ya = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, wa = ["title"], _a = { class: "fo-sidebar-sub-main" }, ka = { class: "fo-sidebar-sub-text" }, $a = { class: "gh-bili-sidebar-head" }, Ca = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, Ta = { style: { color: "var(--dim)", "font-size": "9.5px" } }, Ra = ["title", "aria-label"], Sa = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, Aa = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Ha = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, xa = { id: "vue-github-status-root" }, Ma = { id: "vue-github-repositories-root" }, Ga = /* @__PURE__ */ ge({
  __name: "GitHubWorkspaceCard",
  setup(g) {
    const c = st(() => import("./GitHubSettingsModal-C96kAxsa.js")), { active: r } = ot("card-github", "/github.html");
    let d = 0, y = !1, f;
    const C = D(""), u = D("stars");
    ue(() => r.value && u.value === "stars", (I) => B.setAiViewActive(I), { immediate: !0, flush: "sync" });
    const R = D(!1), v = D("local"), x = D(""), k = D(!1), G = D(0);
    function $() {
      r.value && (k.value = !0, ++G.value);
    }
    const _ = D(!1);
    ue(k, (I) => {
      I && (_.value = !0);
    });
    const w = D(null);
    let j = 0;
    function S(I) {
      u.value = I, I === "trending" ? Fe.switchTab("trending") : Fe.switchTab("stars");
    }
    function z() {
      u.value = "stars";
    }
    const ee = K(() => [
      { id: "exact", icon: "🎯", name: p("search.rule.exact"), desc: p("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: p("search.rule.fuzzy"), desc: p("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: p("search.rule.topic"), desc: p("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: p("search.rule.smart"), desc: p("search.rule.smartDesc") }
    ]), V = D(B.searchRule || "exact"), X = K(() => ee.value.find((I) => I.id === V.value) || ee.value[0]);
    function ie() {
      const I = B.cycleSearchRule();
      V.value = I;
    }
    const M = K(() => v.value === "global" ? p("github.searchGlobalPlaceholder") : p("github.searchLocalPlaceholder", { rule: X.value.name }));
    function L() {
      clearTimeout(j), !(!r.value || v.value !== "local") && (j = window.setTimeout(() => B.setSearchQuery(x.value.trim().toLowerCase()), 180));
    }
    function U() {
      v.value = v.value === "local" ? "global" : "local", v.value === "local" && L();
    }
    function O() {
      x.value = "", clearTimeout(j), B.resetLocalSearch();
    }
    function Y() {
      const I = x.value.trim();
      v.value === "local" ? (clearTimeout(j), B.setSearchQuery(I.toLowerCase())) : I && window.open(`https://github.com/search?q=${encodeURIComponent(I)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function Z() {
      ++d, y = !0, C.value = "";
    }
    return ue(r, async (I) => {
      const b = ++d;
      if (clearTimeout(j), f?.abort(), f = new AbortController(), I || f.abort(), B.setRepositoryViewSignal(f.signal), !!I) {
        if (y) {
          await B.resumeRepositoryReads();
          return;
        }
        if (B.repos.length || B.loadingAllStars || B.loadingPage) {
          y = !0;
          return;
        }
        try {
          const F = await Ae();
          if (!r.value || b !== d) return;
          y = !0, await B.loadGitHub(F.ghUser, F.ghToken);
        } catch {
          if (!r.value || b !== d) return;
          y = !1, C.value = p("github.initError");
        }
      }
    }, { immediate: !0, flush: "sync" }), et(() => {
      B.setAiViewActive(!1), ++d, f?.abort(), clearTimeout(j);
    }), (I, b) => (i(), l("section", {
      class: N(["card wide", { "card-fullscreen": t(ht).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(r)
    }, [
      e("header", In, [
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
        e("div", Nn, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: J(Y, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: v.value === "local" ? t(p)("github.searchScope.toGlobal") : t(p)("github.searchScope.toLocal"),
              onClick: U
            }, [
              e("span", jn, o(v.value === "local" ? "⭐" : "🌐"), 1),
              e("span", On, o(v.value === "local" ? t(p)("github.searchScope.local") : t(p)("github.searchScope.global")), 1),
              b[11] || (b[11] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, En),
            ne(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": b[0] || (b[0] = (F) => x.value = F),
              placeholder: M.value,
              autocomplete: "off",
              onInput: L
            }, null, 40, Pn), [
              [he, x.value]
            ]),
            v.value === "local" ? (i(), l("button", {
              key: 0,
              type: "button",
              class: N(["gh-search-rule-btn", `rule-${X.value.id}`]),
              title: t(p)("github.ruleHint", { rule: X.value.name, desc: X.value.desc }),
              onClick: J(ie, ["stop"])
            }, [
              e("span", Bn, o(X.value.icon), 1),
              e("span", Wn, o(X.value.name), 1)
            ], 10, Fn)) : T("", !0),
            ne(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: t(p)("github.clearSearch"),
              onClick: O
            }, "✕", 8, zn), [
              [Ve, x.value]
            ]),
            b[12] || (b[12] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          b[13] || (b[13] = tt('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-90a302f8><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-90a302f8><input type="checkbox" value="exact" checked data-v-90a302f8>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-90a302f8><input type="checkbox" value="loose" data-v-90a302f8>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-90a302f8><input type="checkbox" value="related" data-v-90a302f8>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-90a302f8><input type="checkbox" value="topic" data-v-90a302f8>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-90a302f8><input type="checkbox" value="readme" data-v-90a302f8>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-90a302f8></div>', 2))
        ]),
        e("button", {
          id: "gh-header-msg-center-btn",
          class: N(["gh-header-msg-btn", { "has-unread": t(H).unreadCount > 0, "is-active": t(H).isOpen }]),
          type: "button",
          title: t(H).unreadCount > 0 ? t(p)("github.header.msgUnread", { count: t(H).unreadCount }) : t(p)("github.header.msgCenter"),
          onClick: b[1] || (b[1] = (F) => t(le).toggle())
        }, [
          b[14] || (b[14] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
          e("span", qn, o(t(p)("github.header.msg")), 1),
          t(H).unreadCount > 0 ? (i(), l("span", Yn, o(t(H).unreadCount > 99 ? "99+" : t(H).unreadCount), 1)) : T("", !0)
        ], 10, Vn),
        e("div", Kn, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: w,
            "aria-expanded": k.value,
            "aria-label": t(p)("github.settings"),
            class: "gh-head-settings-btn",
            title: t(p)("github.header.settings"),
            onClick: b[2] || (b[2] = (F) => k.value = !k.value)
          }, " ⚙️ ", 8, Xn),
          _.value ? (i(), oe(t(c), {
            key: 0,
            visible: t(r) && k.value,
            anchor: w.value,
            "ai-request": G.value,
            onAccountReload: Z,
            onClose: b[3] || (b[3] = (F) => k.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : T("", !0)
        ])
      ]),
      C.value ? (i(), l("p", Qn, o(C.value), 1)) : T("", !0),
      e("div", Jn, [
        e("div", Zn, [
          e("aside", ea, [
            e("div", {
              class: N(["fo-sidebar-toggle-bar", { "is-collapsed": R.value }]),
              title: R.value ? t(p)("github.channel.toggleExpand") : t(p)("github.channel.toggleCollapse"),
              onClick: b[4] || (b[4] = (F) => R.value = !R.value)
            }, [
              e("div", sa, [
                b[18] || (b[18] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, o(t(p)("github.channel.channels")), 1),
                R.value ? (i(), l("span", oa, "3")) : T("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !R.value,
                title: R.value ? t(p)("github.expand") : t(p)("github.collapse")
              }, [
                e("span", null, o(R.value ? t(p)("github.expand") : t(p)("github.collapse")), 1),
                e("span", aa, o(R.value ? "▾" : "▴"), 1)
              ], 8, na)
            ], 10, ta),
            R.value ? T("", !0) : (i(), l("div", ia, [
              e("div", ra, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: N(["fo-sidebar-sub-btn", { on: u.value === "stars" }]),
                  title: t(p)("github.channel.starsTitle"),
                  onClick: b[5] || (b[5] = (F) => S("stars"))
                }, [
                  e("div", ca, [
                    b[19] || (b[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", ua, [
                      e("strong", null, o(t(p)("github.channel.stars")), 1),
                      e("small", null, o(t(p)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  b[20] || (b[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, la)
              ]),
              e("div", da, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: N(["fo-sidebar-sub-btn", { on: u.value === "trending" }]),
                  title: t(p)("github.channel.trendingTitle"),
                  onClick: b[6] || (b[6] = (F) => S("trending"))
                }, [
                  e("div", pa, [
                    b[21] || (b[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", ma, [
                      e("strong", null, o(t(p)("github.channel.trending")), 1),
                      e("small", null, o(t(p)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  b[22] || (b[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, ha)
              ]),
              e("div", ga, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: N(["fo-sidebar-sub-btn", { on: u.value === "awesome" }]),
                  title: t(p)("github.channel.awesomeTitle"),
                  onClick: b[7] || (b[7] = (F) => S("awesome"))
                }, [
                  e("div", ba, [
                    b[23] || (b[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", va, [
                      e("strong", null, o(t(p)("github.channel.awesome")), 1),
                      e("small", null, o(t(p)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  b[24] || (b[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, fa)
              ]),
              e("div", ya, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: N(["fo-sidebar-sub-btn", { on: u.value === "repos" }]),
                  title: t(p)("github.channel.reposTitle"),
                  onClick: b[8] || (b[8] = (F) => S("repos"))
                }, [
                  e("div", _a, [
                    b[25] || (b[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", ka, [
                      e("strong", null, o(t(p)("github.channel.repos")), 1),
                      e("small", null, o(t(p)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  b[26] || (b[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, wa)
              ])
            ])),
            e("header", $a, [
              e("div", null, [
                e("b", Ca, [
                  b[27] || (b[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  Q(" " + o(t(p)("github.lists.title")), 1)
                ]),
                e("small", Ta, o(t(p)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: t(p)("github.lists.new"),
                "aria-label": t(p)("github.lists.new"),
                onClick: b[9] || (b[9] = (F) => t(B).promptCreateFolder())
              }, "＋", 8, Ra)
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: z
            }, [
              te(at, { active: t(r) }, null, 8, ["active"])
            ])
          ]),
          e("section", Sa, [
            u.value === "stars" && t(nt).accountConfigured === !1 ? (i(), oe(ut, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: b[10] || (b[10] = (F) => k.value = !0)
            })) : u.value === "stars" ? (i(), l(P, { key: 1 }, [
              e("header", Aa, [
                te(lt, { onOpenAiSettings: $ })
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
              e("div", Ha, [
                te(it, {
                  active: t(r) && u.value === "stars"
                }, null, 8, ["active"])
              ]),
              b[29] || (b[29] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", xa, [
                te(ct)
              ]),
              e("div", Ma, [
                te(rt, {
                  active: t(r) && u.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : u.value === "trending" ? (i(), oe(dt, { key: 2 })) : u.value === "awesome" ? (i(), oe(Gt, { key: 3 })) : u.value === "repos" ? (i(), oe(Ws, {
              key: 4,
              active: t(r) && u.value === "repos"
            }, null, 8, ["active"])) : T("", !0)
          ])
        ])
      ]),
      te(ko),
      te(Dn)
    ], 10, Un));
  }
}), Ba = /* @__PURE__ */ fe(Ga, [["__scopeId", "data-v-90a302f8"]]);
export {
  Ba as default
};
