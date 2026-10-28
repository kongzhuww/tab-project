import { d as fe, o as n, e as c, f as e, l as j, n as Y, g as y, F as L, h as D, B as G, t as v, u as w, i as X, b as k, s as P, r as He, x as ie, C as Le, y as De, m as K, k as ne, c as O, j as Me, A as Ie, L as Ne, z as Ee, H as Pe, D as Q, E as Ue } from "./vendor-vue-DokqDua_.js";
import { u as Fe } from "./useCardActivity-9qYlsnOY.js";
import { D as ge, E as Te, t as R, y as Ve } from "./search.service-D8BPpHmG.js";
import { _ as Oe, a as We, b as je, g as $e, G as ze, c as Be } from "./main-B8XBetlB.js";
import { A as qe } from "./AccountSetupGuide-b0Xd0kWd.js";
import Qe from "./GitHubTrending-1WhSn7Tg.js";
import { _ as he } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { s as pe } from "./storage-cache.service-BYF2zxXX.js";
import { u as Ke } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { n as xe, r as Ye } from "./view-styles-DcR4NtZM.js";
const Xe = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], Je = [
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
], Ze = { class: "gh-awesome-wrapper" }, et = { class: "gh-awesome-header" }, tt = { class: "gh-awesome-intro" }, st = { class: "gh-awesome-search-box" }, ot = { class: "gh-awesome-pills" }, at = ["onClick"], nt = { class: "gh-awesome-grid" }, it = ["onClick"], lt = { class: "gh-awesome-card-head" }, rt = { class: "gh-awesome-card-name" }, ct = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, ut = { class: "gh-awesome-desc" }, dt = { class: "gh-awesome-footer" }, pt = { class: "gh-awesome-tags" }, mt = ["href"], gt = {
  key: 0,
  class: "gh-awesome-empty"
}, ft = /* @__PURE__ */ fe({
  __name: "GitHubAwesome",
  setup(z) {
    const u = k("all"), r = k(""), m = P(() => {
      const b = r.value.trim().toLowerCase(), h = u.value;
      return Je.filter((i) => h === "all" || i.category === h ? b ? i.name.toLowerCase().includes(b) || i.title.toLowerCase().includes(b) || i.desc.toLowerCase().includes(b) || i.tags.some((d) => d.toLowerCase().includes(b)) : !0 : !1);
    });
    function f(b) {
      window.open(b, "_blank", "noreferrer");
    }
    return (b, h) => (n(), c("div", Ze, [
      e("header", et, [
        e("div", tt, [
          h[3] || (h[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", st, [
            j(e("input", {
              "onUpdate:modelValue": h[0] || (h[0] = (i) => r.value = i),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [Y, r.value]
            ]),
            r.value ? (n(), c("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: h[1] || (h[1] = (i) => r.value = "")
            }, "✕")) : y("", !0)
          ])
        ]),
        e("div", ot, [
          (n(!0), c(L, null, D(w(Xe), (i) => (n(), c("button", {
            key: i.id,
            type: "button",
            class: G(["gh-awesome-pill", { active: u.value === i.id }]),
            onClick: (g) => u.value = i.id
          }, [
            e("span", null, v(i.icon), 1),
            e("b", null, v(i.name), 1)
          ], 10, at))), 128))
        ])
      ]),
      e("div", nt, [
        (n(!0), c(L, null, D(m.value, (i) => (n(), c("article", {
          key: i.id,
          class: "gh-awesome-card",
          onClick: (g) => f(i.url)
        }, [
          e("div", lt, [
            e("div", rt, [
              e("strong", null, v(i.title), 1),
              e("small", null, v(i.name), 1)
            ]),
            e("span", ct, "★ " + v(i.stars), 1)
          ]),
          e("p", ut, v(i.desc), 1),
          e("div", dt, [
            e("div", pt, [
              (n(!0), c(L, null, D(i.tags, (g) => (n(), c("span", {
                key: g,
                class: "gh-awesome-tag"
              }, v(g), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: i.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: h[2] || (h[2] = X(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, mt)
          ])
        ], 8, it))), 128)),
        m.value.length ? y("", !0) : (n(), c("div", gt, [...h[4] || (h[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), ht = /* @__PURE__ */ he(ft, [["__scopeId", "data-v-28a8995f"]]), me = "gh_my_repos_cache_v1", V = "gh_my_repo_custom_topics_v1", p = He({
  loading: !1,
  syncingTopic: !1,
  errorMessage: "",
  repos: [],
  customTopicNames: [],
  searchQuery: "",
  editingColumnTopic: null,
  composerActiveColumnId: null
});
function E(z) {
  let u = z.trim().toLowerCase();
  return u = u.replace(/[\s_]+/g, "-"), u = u.replace(/[^a-z0-9-]/g, ""), u = u.replace(/^-+|-+$/g, "").replace(/-+/g, "-"), u.length > 35 && (u = u.slice(0, 35).replace(/-+$/, "")), u;
}
class W {
  constructor() {
    this.abortController = null;
  }
  static getInstance() {
    return W.instance || (W.instance = new W()), W.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略）
   */
  async load(u = !1) {
    this.abortController?.abort(), this.abortController = new AbortController();
    const r = this.abortController.signal;
    await this.loadPersistedCustomTopics();
    const m = await pe.get(me);
    if (m && m.length && (p.repos = m), !u && m && m.length) {
      this.fetchRemote(r).catch(() => {
      });
      return;
    }
    p.loading = !0, p.errorMessage = "";
    try {
      await this.fetchRemote(r);
    } catch (f) {
      if (f.name === "AbortError") return;
      p.errorMessage = f.message || "获取个人仓库失败";
    } finally {
      p.loading = !1;
    }
  }
  async fetchRemote(u) {
    const { ghUser: r, ghToken: m } = await ge();
    if (!r && !m) {
      p.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    let f = "https://api.github.com/user/repos?type=owner&sort=updated&per_page=100";
    m || (f = `https://api.github.com/users/${encodeURIComponent(r)}/repos?type=owner&sort=updated&per_page=100`);
    const b = Te(m), h = await fetch(f, {
      method: "GET",
      headers: b,
      signal: u
    });
    if (!h.ok)
      throw h.status === 401 ? new Error("GitHub Token 无效或已过期，请在设置中更新。") : h.status === 403 ? new Error("GitHub API 频率受限或无权访问，请检查 Token 权限。") : new Error(`GitHub 请求失败 (HTTP ${h.status})`);
    const i = await h.json();
    if (!Array.isArray(i))
      throw new Error("GitHub 返回数据格式异常");
    const g = i.map((d) => ({
      id: d.id,
      name: d.name,
      fullName: d.full_name || `${d.owner?.login || r}/${d.name}`,
      description: d.description || "",
      isPrivate: !!d.private,
      isFork: !!d.fork,
      htmlUrl: d.html_url || `https://github.com/${r}/${d.name}`,
      language: d.language || null,
      stargazersCount: Number(d.stargazers_count) || 0,
      forksCount: Number(d.forks_count) || 0,
      openIssuesCount: Number(d.open_issues_count) || 0,
      topics: Array.isArray(d.topics) ? d.topics.map((T) => String(T).toLowerCase()) : [],
      updatedAt: d.updated_at || "",
      pushedAt: d.pushed_at || "",
      defaultBranch: d.default_branch || "main"
    }));
    p.repos = g, await pe.set(me, g, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 提交单个仓库的 Topics 到 GitHub 远端
   */
  async syncRepoTopics(u, r) {
    const { ghToken: m } = await ge();
    if (!m)
      return alert("向 GitHub 更新 Topic 需要在 GitHub 设置中配置具备 repo 写入权限的 Token。"), !1;
    const f = Array.from(new Set(r.map(E).filter(Boolean))).slice(0, 20), [b, h] = u.fullName.split("/"), i = `https://api.github.com/repos/${encodeURIComponent(b)}/${encodeURIComponent(h)}/topics`;
    p.syncingTopic = !0;
    try {
      const g = Te(m), d = await fetch(i, {
        method: "PUT",
        headers: {
          ...g,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: f })
      });
      if (!d.ok)
        throw d.status === 401 || d.status === 403 ? new Error("Token 权限不足。修改 Topics 需要包含 repo（或 Administration:write）作用域。") : d.status === 404 ? new Error("仓库未找到或无权修改。") : new Error(`GitHub 远端保存失败 (HTTP ${d.status})`);
      const T = await d.json(), _ = Array.isArray(T.names) ? T.names : f;
      return u.topics = _, await pe.set(me, p.repos, { ttlMs: 30 * 86400 * 1e3 }), !0;
    } catch (g) {
      return alert(`更新 GitHub Topics 失败：${g.message || g}`), !1;
    } finally {
      p.syncingTopic = !1;
    }
  }
  /**
   * 将仓库添加到指定 Topic（若远端不存在则新增并提交）
   */
  async addRepoToTopic(u, r) {
    const m = E(r);
    if (!m) return !1;
    if (u.topics.includes(m)) return !0;
    const f = [...u.topics, m];
    return this.syncRepoTopics(u, f);
  }
  /**
   * 将仓库从指定 Topic 移除
   */
  async removeRepoFromTopic(u, r) {
    const m = E(r);
    if (!u.topics.includes(m)) return !0;
    const f = u.topics.filter((b) => b !== m);
    return this.syncRepoTopics(u, f);
  }
  /**
   * 新建一个 Topic 列（本地与远端集合）
   */
  async createTopicColumn(u) {
    const r = E(u);
    return r ? p.customTopicNames.includes(r) ? (alert(`Topic「${r}」板块已存在。`), null) : (p.customTopicNames.push(r), await this.persistCustomTopics(), r) : (alert("Topic 名称无效。GitHub 规范：仅限 1~35 位小写英文字母、数字和连字符 '-'。"), null);
  }
  /**
   * 重命名 Topic 列：同步将该板块下所有仓库的旧 Topic 替换为新 Topic 并提交到 GitHub
   */
  async renameTopicColumn(u, r) {
    const m = E(r);
    if (!m)
      return alert("新 Topic 名称无效。仅限小写英文、数字与中划线。"), !1;
    if (u === m) return !0;
    const f = p.repos.filter((b) => b.topics.includes(u));
    if (f.length > 0) {
      if (!confirm(
        `确定将板块「${u}」重命名为「${m}」吗？
这将调用 GitHub API 同步更新该板块下的 ${f.length} 个仓库的远端 Topic。`
      )) return !1;
      p.syncingTopic = !0;
      let h = 0, i = 0;
      for (const g of f) {
        const d = g.topics.map((_) => _ === u ? m : _);
        await this.syncRepoTopics(g, d) ? h++ : i++;
      }
      p.syncingTopic = !1, i > 0 && alert(`重命名完成，成功更新 ${h} 个仓库，失败 ${i} 个。`);
    }
    return p.customTopicNames = p.customTopicNames.map((b) => b === u ? m : b), await this.persistCustomTopics(), !0;
  }
  /**
   * 删除 Topic 板块：从该板块下所有仓库中移除该 topic
   */
  async deleteTopicColumn(u) {
    const r = p.repos.filter((f) => f.topics.includes(u)), m = r.length > 0 ? `确定删除板块「${u}」吗？
将从该板块下的 ${r.length} 个仓库中移除此 Topic 并在 GitHub 远端同步。` : `确定删除空板块「${u}」吗？`;
    if (!confirm(m)) return !1;
    if (r.length > 0) {
      p.syncingTopic = !0;
      for (const f of r)
        await this.removeRepoFromTopic(f, u);
      p.syncingTopic = !1;
    }
    return p.customTopicNames = p.customTopicNames.filter((f) => f !== u), await this.persistCustomTopics(), !0;
  }
  async loadPersistedCustomTopics() {
    try {
      const r = (typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([V]) : { [V]: JSON.parse(localStorage.getItem(V) || "[]") })?.[V];
      Array.isArray(r) && (p.customTopicNames = r.map(E).filter(Boolean));
    } catch {
    }
  }
  async persistCustomTopics() {
    const u = Array.from(new Set(p.customTopicNames.map(E).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [V]: u }) : localStorage.setItem(V, JSON.stringify(u));
    } catch {
    }
  }
}
const A = W.getInstance(), vt = { class: "my-repos-workspace" }, bt = { class: "my-repos-header" }, yt = { class: "header-left" }, wt = { class: "title" }, kt = { class: "count-pill" }, _t = {
  key: 0,
  class: "sync-status"
}, Ct = { class: "header-right" }, Tt = { class: "search-box" }, $t = ["disabled"], xt = {
  key: 0,
  class: "error-banner"
}, St = { class: "board-columns-track" }, At = { class: "column-header" }, Rt = { class: "column-title-group" }, Gt = { class: "badge-count" }, Ht = { class: "column-cards-scroll" }, Lt = ["onDragstart", "onContextmenu"], Dt = { class: "repo-card-head" }, Mt = ["title", "onClick"], It = {
  key: 0,
  class: "badge-repo-visibility private"
}, Nt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Et = ["title"], Pt = {
  key: 1,
  class: "repo-topics-row"
}, Ut = { class: "repo-card-footer" }, Ft = { class: "meta-left" }, Vt = {
  key: 0,
  class: "meta-item lang"
}, Ot = { class: "meta-item" }, Wt = {
  key: 1,
  class: "meta-item"
}, jt = ["title"], zt = {
  key: 0,
  class: "empty-column-placeholder"
}, Bt = ["onDragover", "onDragleave", "onDrop"], qt = { class: "column-header" }, Qt = {
  key: 0,
  class: "column-title-group"
}, Kt = ["title"], Yt = { class: "badge-count" }, Xt = {
  key: 1,
  class: "column-rename-group"
}, Jt = ["onKeydown"], Zt = ["onClick"], es = { class: "column-actions" }, ts = ["onClick"], ss = {
  key: 0,
  class: "col-popover-menu"
}, os = ["onClick"], as = ["onClick"], ns = { class: "column-cards-scroll" }, is = ["onDragstart", "onContextmenu"], ls = { class: "repo-card-head" }, rs = ["title", "onClick"], cs = {
  key: 0,
  class: "badge-repo-visibility private"
}, us = {
  key: 1,
  class: "badge-repo-visibility fork"
}, ds = ["title"], ps = { class: "repo-topics-row" }, ms = { class: "topic-chip active-chip" }, gs = ["onClick"], fs = { class: "repo-card-footer" }, hs = { class: "meta-left" }, vs = {
  key: 0,
  class: "meta-item lang"
}, bs = { class: "meta-item" }, ys = {
  key: 1,
  class: "meta-item"
}, ws = { class: "meta-date" }, ks = {
  key: 0,
  class: "empty-column-placeholder"
}, _s = { class: "board-column new-column-slot" }, Cs = {
  key: 1,
  class: "new-column-composer"
}, Ts = { class: "composer-actions" }, $s = { class: "ctx-submenu-wrap" }, xs = { class: "ctx-item-left" }, Ss = {
  key: 0,
  class: "ctx-check"
}, As = ["onClick"], Rs = { class: "ctx-item-left" }, Gs = {
  key: 0,
  class: "ctx-check"
}, Hs = {
  key: 1,
  class: "ctx-icon"
}, Ls = /* @__PURE__ */ fe({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(z) {
    const u = z, r = k(""), m = k(!1), f = k(null), b = k(""), h = k(null), i = k(null), g = k(null), d = k(null), T = k(null);
    let _ = null, M = 0;
    const $ = k({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromTopic: null
    });
    function H() {
      $.value.visible = !1;
    }
    const { menuRef: J, style: I } = Ke({
      visible: () => $.value.visible,
      anchor: () => ({ x: $.value.x, y: $.value.y }),
      dismiss: H
    }), U = P(() => typeof window > "u" ? !1 : $.value.x + 360 > window.innerWidth);
    function Z(o, t, s) {
      o.preventDefault(), o.stopPropagation(), $.value = {
        visible: !0,
        x: o.clientX,
        y: o.clientY,
        repo: t,
        fromTopic: s
      };
    }
    async function ee() {
      const o = $.value.repo, t = $.value.fromTopic;
      H(), o && (t && t !== "default" ? await A.removeRepoFromTopic(o, t) : o.topics.length && await A.syncRepoTopics(o, []));
    }
    async function te(o) {
      const t = $.value.repo, s = $.value.fromTopic;
      if (H(), !!t)
        if (s && s !== "default" && s !== o) {
          const a = t.topics.filter((x) => x !== s);
          a.includes(o) || a.push(o), await A.syncRepoTopics(t, a);
        } else
          await A.addRepoToTopic(t, o);
    }
    async function N() {
      const o = $.value.repo;
      if (H(), !!o)
        try {
          await navigator.clipboard.writeText(o.htmlUrl), xe.show({
            appName: "GitHub",
            title: "已复制链接",
            message: `已复制 ${o.name} 仓库链接`
          });
        } catch {
        }
    }
    async function le() {
      const o = $.value.repo;
      if (H(), !!o)
        try {
          const t = `git clone ${o.htmlUrl}.git`;
          await navigator.clipboard.writeText(t), xe.show({
            appName: "GitHub",
            title: "已复制克隆命令",
            message: t
          });
        } catch {
        }
    }
    function re() {
      const o = $.value.repo;
      H(), o && de(o.htmlUrl);
    }
    const F = P(() => {
      const o = new Set(p.customTopicNames);
      for (const t of p.repos)
        for (const s of t.topics)
          s && o.add(s);
      return Array.from(o).sort();
    }), se = P(() => {
      const o = p.searchQuery.trim().toLowerCase();
      return o ? p.repos.filter(
        (t) => t.name.toLowerCase().includes(o) || t.description.toLowerCase().includes(o) || t.topics.some((s) => s.includes(o)) || t.language && t.language.toLowerCase().includes(o)
      ) : p.repos;
    }), B = P(() => {
      const o = new Set(F.value);
      return se.value.filter((t) => t.topics.length ? !t.topics.some((s) => o.has(s)) : !0);
    });
    function q(o) {
      return se.value.filter((t) => t.topics.includes(o));
    }
    async function oe() {
      const o = r.value.trim();
      if (!o) return;
      await A.createTopicColumn(o) && (r.value = "", m.value = !1);
    }
    function C(o) {
      h.value = o, b.value = o, f.value = null;
    }
    async function l(o) {
      const t = b.value.trim();
      if (!t || t === o) {
        h.value = null;
        return;
      }
      await A.renameTopicColumn(o, t) && (h.value = null);
    }
    async function S(o) {
      f.value = null, await A.deleteTopicColumn(o);
    }
    async function Se(o, t) {
      await A.removeRepoFromTopic(o, t);
    }
    function Ae(o) {
      const t = i.value;
      if (t && (o.shiftKey || g.value || Math.abs(o.deltaX) > 0)) {
        o.preventDefault();
        const s = o.deltaX !== 0 ? o.deltaX : o.deltaY;
        t.scrollLeft += s;
      }
    }
    function ce(o) {
      if (!g.value || !i.value) return;
      o.preventDefault();
      const t = o.deltaX !== 0 ? o.deltaX : o.deltaY;
      i.value.scrollLeft += t * 1.2;
    }
    function ve() {
      if (_ !== null) return;
      const o = () => {
        i.value && M !== 0 ? (i.value.scrollLeft += M, _ = requestAnimationFrame(o)) : ae();
      };
      _ = requestAnimationFrame(o);
    }
    function ae() {
      _ !== null && (cancelAnimationFrame(_), _ = null), M = 0;
    }
    function be(o) {
      if (!g.value || !i.value) return;
      const t = i.value.getBoundingClientRect(), s = 100;
      if (o > t.right - s) {
        const a = Math.min(1, Math.max(0.1, (o - (t.right - s)) / s));
        M = Math.round(a * 20), ve();
      } else if (o < t.left + s) {
        const a = Math.min(1, Math.max(0.1, (t.left + s - o) / s));
        M = -Math.round(a * 20), ve();
      } else
        ae();
    }
    function Re(o) {
      g.value && (o.preventDefault(), be(o.clientX));
    }
    function ye(o, t, s) {
      H(), g.value = t, d.value = s, o.dataTransfer && (o.dataTransfer.effectAllowed = "move", o.dataTransfer.setData("text/plain", `${t.id}:${s}`)), window.addEventListener("wheel", ce, { passive: !1 });
    }
    function ue() {
      g.value = null, d.value = null, T.value = null, ae(), window.removeEventListener("wheel", ce);
    }
    function we(o, t) {
      g.value && (o.preventDefault(), o.dataTransfer && (o.dataTransfer.dropEffect = "move"), T.value = t, be(o.clientX));
    }
    function ke(o, t) {
      const s = o.currentTarget, a = o.relatedTarget;
      s?.contains(a) || T.value === t && (T.value = null);
    }
    async function _e(o, t) {
      o.preventDefault();
      const s = g.value, a = d.value;
      if (ue(), !!s)
        if (t === "default")
          a && a !== "default" && await A.removeRepoFromTopic(s, a);
        else if (a && a !== "default" && a !== t) {
          const x = s.topics.filter((Ge) => Ge !== a);
          x.includes(t) || x.push(t), await A.syncRepoTopics(s, x);
        } else
          await A.addRepoToTopic(s, t);
    }
    function de(o) {
      window.open(o, "_blank", "noopener,noreferrer");
    }
    function Ce(o) {
      if (!o) return "";
      try {
        const t = new Date(o);
        return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ie(
      () => u.active,
      (o) => {
        o && !p.repos.length && A.load();
      },
      { immediate: !0 }
    ), Le(() => {
      u.active && !p.repos.length && A.load();
    }), De(() => {
      window.removeEventListener("wheel", ce), ae(), H();
    }), (o, t) => (n(), c("div", vt, [
      e("header", bt, [
        e("div", yt, [
          e("h2", wt, [
            t[15] || (t[15] = e("span", { class: "icon" }, "📦", -1)),
            t[16] || (t[16] = e("span", null, "我的仓库 · Topic 看板", -1)),
            e("span", kt, v(w(p).repos.length) + " 个项目", 1)
          ]),
          w(p).syncingTopic ? (n(), c("span", _t, [...t[17] || (t[17] = [
            e("i", { class: "spin-icon" }, "⏳", -1),
            K(" 正在同步 GitHub 远端 Topics… ", -1)
          ])])) : y("", !0)
        ]),
        e("div", Ct, [
          e("div", Tt, [
            j(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (s) => w(p).searchQuery = s),
              type: "text",
              placeholder: "过滤仓库名 / 描述 / 标签...",
              class: "search-input"
            }, null, 512), [
              [Y, w(p).searchQuery]
            ]),
            w(p).searchQuery ? (n(), c("button", {
              key: 0,
              type: "button",
              class: "clear-btn",
              onClick: t[1] || (t[1] = (s) => w(p).searchQuery = "")
            }, "✕")) : y("", !0)
          ]),
          e("button", {
            type: "button",
            class: "btn-refresh",
            disabled: w(p).loading || w(p).syncingTopic,
            title: "重新从 GitHub 拉取仓库列表",
            onClick: t[2] || (t[2] = (s) => w(A).load(!0))
          }, [
            e("span", {
              class: G({ spinning: w(p).loading })
            }, "🔄", 2),
            e("span", null, v(w(p).loading ? "正在刷新…" : "刷新仓库"), 1)
          ], 8, $t)
        ])
      ]),
      w(p).errorMessage ? (n(), c("div", xt, [
        e("span", null, "⚠️ " + v(w(p).errorMessage), 1),
        e("button", {
          type: "button",
          onClick: t[3] || (t[3] = (s) => w(A).load(!0))
        }, "重试")
      ])) : y("", !0),
      e("div", {
        ref_key: "boardViewportRef",
        ref: i,
        class: "board-viewport",
        onWheel: Ae,
        onDragover: Re
      }, [
        e("div", St, [
          e("section", {
            class: G(["board-column default-column", { "drop-active": T.value === "default" }]),
            onDragover: t[4] || (t[4] = (s) => we(s, "default")),
            onDragleave: t[5] || (t[5] = (s) => ke(s, "default")),
            onDrop: t[6] || (t[6] = (s) => _e(s, "default"))
          }, [
            e("header", At, [
              e("div", Rt, [
                t[18] || (t[18] = e("span", { class: "col-dot default-dot" }, null, -1)),
                t[19] || (t[19] = e("h3", { class: "column-title" }, "默认板块", -1)),
                e("span", Gt, v(B.value.length), 1)
              ]),
              t[20] || (t[20] = e("div", { class: "column-actions" }, [
                e("span", {
                  class: "column-hint",
                  title: "未分配到右侧任何 Topic 的项目自动归入此板块"
                }, "未分类")
              ], -1))
            ]),
            e("div", Ht, [
              (n(!0), c(L, null, D(B.value, (s) => (n(), c("div", {
                key: s.id,
                class: G(["repo-card", { "card-dragging": g.value?.id === s.id }]),
                draggable: "true",
                onDragstart: (a) => ye(a, s, "default"),
                onDragend: ue,
                onContextmenu: (a) => Z(a, s, "default")
              }, [
                e("div", Dt, [
                  e("span", {
                    class: "repo-name",
                    title: s.fullName,
                    onClick: (a) => de(s.htmlUrl)
                  }, v(s.name), 9, Mt),
                  s.isPrivate ? (n(), c("span", It, "私有")) : y("", !0),
                  s.isFork ? (n(), c("span", Nt, "Fork")) : y("", !0)
                ]),
                s.description ? (n(), c("p", {
                  key: 0,
                  class: "repo-desc",
                  title: s.description
                }, v(s.description), 9, Et)) : y("", !0),
                s.topics.length ? (n(), c("div", Pt, [
                  (n(!0), c(L, null, D(s.topics, (a) => (n(), c("span", {
                    key: a,
                    class: "topic-chip"
                  }, " #" + v(a), 1))), 128))
                ])) : y("", !0),
                e("div", Ut, [
                  e("div", Ft, [
                    s.language ? (n(), c("span", Vt, [
                      t[21] || (t[21] = e("span", { class: "lang-color" }, null, -1)),
                      K(v(s.language), 1)
                    ])) : y("", !0),
                    e("span", Ot, "⭐ " + v(s.stargazersCount), 1),
                    s.forksCount ? (n(), c("span", Wt, "🍴 " + v(s.forksCount), 1)) : y("", !0)
                  ]),
                  e("span", {
                    class: "meta-date",
                    title: "最后更新：" + s.updatedAt
                  }, v(Ce(s.pushedAt || s.updatedAt)), 9, jt)
                ])
              ], 42, Lt))), 128)),
              B.value.length ? y("", !0) : (n(), c("div", zt, [...t[22] || (t[22] = [
                e("span", null, "暂无未分类仓库", -1)
              ])]))
            ])
          ], 34),
          (n(!0), c(L, null, D(F.value, (s) => (n(), c("section", {
            key: s,
            class: G(["board-column topic-column", { "drop-active": T.value === s }]),
            onDragover: (a) => we(a, s),
            onDragleave: (a) => ke(a, s),
            onDrop: (a) => _e(a, s)
          }, [
            e("header", qt, [
              h.value !== s ? (n(), c("div", Qt, [
                t[23] || (t[23] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "GitHub Topic: " + s
                }, " #" + v(s), 9, Kt),
                e("span", Yt, v(q(s).length), 1)
              ])) : (n(), c("div", Xt, [
                j(e("input", {
                  "onUpdate:modelValue": t[7] || (t[7] = (a) => b.value = a),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    ne((a) => l(s), ["enter"]),
                    t[8] || (t[8] = ne((a) => h.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, Jt), [
                  [Y, b.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (a) => l(s)
                }, "✓", 8, Zt),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: t[9] || (t[9] = (a) => h.value = null)
                }, "✕")
              ])),
              e("div", es, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "板块操作（重命名 / 删除）",
                  onClick: (a) => f.value = f.value === s ? null : s
                }, "•••", 8, ts),
                f.value === s ? (n(), c("div", ss, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (a) => C(s)
                  }, " ✏️ 重命名 Topic 并同步 ", 8, os),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (a) => S(s)
                  }, " 🗑️ 删除板块并从远端移除 ", 8, as)
                ])) : y("", !0)
              ])
            ]),
            e("div", ns, [
              (n(!0), c(L, null, D(q(s), (a) => (n(), c("div", {
                key: a.id,
                class: G(["repo-card", { "card-dragging": g.value?.id === a.id }]),
                draggable: "true",
                onDragstart: (x) => ye(x, a, s),
                onDragend: ue,
                onContextmenu: (x) => Z(x, a, s)
              }, [
                e("div", ls, [
                  e("span", {
                    class: "repo-name",
                    title: a.fullName,
                    onClick: (x) => de(a.htmlUrl)
                  }, v(a.name), 9, rs),
                  a.isPrivate ? (n(), c("span", cs, "私有")) : y("", !0),
                  a.isFork ? (n(), c("span", us, "Fork")) : y("", !0)
                ]),
                a.description ? (n(), c("p", {
                  key: 0,
                  class: "repo-desc",
                  title: a.description
                }, v(a.description), 9, ds)) : y("", !0),
                e("div", ps, [
                  e("span", ms, [
                    K(" #" + v(s) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从当前 Topic 移除并同步到 GitHub",
                      onClick: X((x) => Se(a, s), ["stop"])
                    }, "✕", 8, gs)
                  ]),
                  (n(!0), c(L, null, D(a.topics.filter((x) => x !== s), (x) => (n(), c("span", {
                    key: x,
                    class: "topic-chip other-chip"
                  }, " #" + v(x), 1))), 128))
                ]),
                e("div", fs, [
                  e("div", hs, [
                    a.language ? (n(), c("span", vs, [
                      t[24] || (t[24] = e("span", { class: "lang-color" }, null, -1)),
                      K(v(a.language), 1)
                    ])) : y("", !0),
                    e("span", bs, "⭐ " + v(a.stargazersCount), 1),
                    a.forksCount ? (n(), c("span", ys, "🍴 " + v(a.forksCount), 1)) : y("", !0)
                  ]),
                  e("span", ws, v(Ce(a.pushedAt || a.updatedAt)), 1)
                ])
              ], 42, is))), 128)),
              q(s).length ? y("", !0) : (n(), c("div", ks, [...t[25] || (t[25] = [
                e("span", null, "暂无项目，可从其他列拖拽至此", -1)
              ])]))
            ])
          ], 42, Bt))), 128)),
          e("section", _s, [
            m.value ? (n(), c("div", Cs, [
              t[27] || (t[27] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建 Topic 分组"),
                e("small", null, "将作为 GitHub 远端标签同步")
              ], -1)),
              j(e("input", {
                "onUpdate:modelValue": t[11] || (t[11] = (s) => r.value = s),
                type: "text",
                placeholder: "例如 tools, vue3, robotics...",
                class: "composer-input",
                onKeydown: [
                  ne(oe, ["enter"]),
                  t[12] || (t[12] = ne((s) => m.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [Y, r.value]
              ]),
              e("div", Ts, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: oe
                }, "创建板块"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: t[13] || (t[13] = (s) => m.value = !1)
                }, "取消")
              ])
            ])) : (n(), c("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: t[10] || (t[10] = (s) => m.value = !0)
            }, [...t[26] || (t[26] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建 Topic 板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (n(), O(Me, { to: "body" }, [
        $.value.visible && $.value.repo ? (n(), c("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: J,
          class: "repo-context-menu",
          style: Ie(w(I)),
          role: "menu",
          onClick: t[14] || (t[14] = X(() => {
          }, ["stop"]))
        }, [
          e("div", $s, [
            t[31] || (t[31] = e("button", {
              type: "button",
              class: "ctx-item has-submenu"
            }, [
              e("span", { class: "ctx-item-left" }, [
                e("span", { class: "ctx-icon" }, "📁"),
                e("span", null, "移动到分组")
              ]),
              e("span", { class: "ctx-arrow" }, "›")
            ], -1)),
            e("div", {
              class: G(["ctx-submenu", { "flip-left": U.value }])
            }, [
              e("button", {
                type: "button",
                class: "ctx-item is-default-item",
                onClick: ee
              }, [
                e("span", xs, [
                  $.value.repo.topics.length ? y("", !0) : (n(), c("span", Ss, "✓")),
                  t[28] || (t[28] = e("span", { class: "ctx-plus" }, "＋", -1)),
                  t[29] || (t[29] = e("span", null, "设为未分类（移入默认板块）", -1))
                ])
              ]),
              t[30] || (t[30] = e("div", { class: "ctx-divider" }, null, -1)),
              (n(!0), c(L, null, D(F.value, (s) => (n(), c("button", {
                key: s,
                type: "button",
                class: "ctx-item",
                onClick: (a) => te(s)
              }, [
                e("span", Rs, [
                  $.value.repo.topics.includes(s) ? (n(), c("span", Gs, "✓")) : (n(), c("span", Hs, "📁")),
                  e("span", null, v(s), 1)
                ])
              ], 8, As))), 128))
            ], 2)
          ]),
          t[35] || (t[35] = e("div", { class: "ctx-divider" }, null, -1)),
          e("button", {
            type: "button",
            class: "ctx-item",
            onClick: N
          }, [...t[32] || (t[32] = [
            e("span", { class: "ctx-item-left" }, [
              e("span", { class: "ctx-icon" }, "📋"),
              e("span", null, "复制仓库链接")
            ], -1)
          ])]),
          e("button", {
            type: "button",
            class: "ctx-item",
            onClick: le
          }, [...t[33] || (t[33] = [
            e("span", { class: "ctx-item-left" }, [
              e("span", { class: "ctx-icon" }, "💻"),
              e("span", null, "复制克隆命令")
            ], -1)
          ])]),
          t[36] || (t[36] = e("div", { class: "ctx-divider" }, null, -1)),
          e("button", {
            type: "button",
            class: "ctx-item",
            onClick: re
          }, [...t[34] || (t[34] = [
            e("span", { class: "ctx-item-left" }, [
              e("span", { class: "ctx-icon" }, "↗"),
              e("span", null, "在 GitHub 打开")
            ], -1)
          ])])
        ], 4)) : y("", !0)
      ]))
    ]));
  }
}), Ds = /* @__PURE__ */ he(Ls, [["__scopeId", "data-v-4841c938"]]), Ms = ["inert"], Is = { class: "card-head" }, Ns = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, Es = ["title"], Ps = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Us = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Fs = ["placeholder"], Vs = ["title"], Os = { class: "gh-search-rule-icon" }, Ws = { class: "gh-search-rule-text" }, js = { class: "gh-settings-anchor" }, zs = ["aria-expanded"], Bs = {
  key: 0,
  class: "muted small",
  role: "status"
}, qs = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Qs = { class: "gh-bili-layout" }, Ks = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, Ys = ["title"], Xs = { class: "fo-sidebar-toggle-title" }, Js = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Zs = ["aria-expanded", "title"], eo = { class: "fo-sidebar-toggle-chevron" }, to = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, so = { class: "fo-sidebar-sub-wrap" }, oo = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, ao = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, no = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, io = { class: "gh-bili-sidebar-head" }, lo = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, ro = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, co = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, uo = { id: "vue-github-status-root" }, po = { id: "vue-github-repositories-root" }, mo = /* @__PURE__ */ fe({
  __name: "GitHubWorkspaceCard",
  setup(z) {
    const u = Ue(() => import("./GitHubSettingsModal-C-CAi-mE.js")), { active: r } = Fe("card-github", "/github.html");
    let m = 0, f = !1, b;
    const h = k(""), i = k("stars");
    ie(() => r.value && i.value === "stars", (C) => R.setAiViewActive(C), { immediate: !0, flush: "sync" });
    const g = k(!1), d = k("local"), T = k(""), _ = k(!1), M = k(0);
    function $() {
      r.value && (_.value = !0, ++M.value);
    }
    const H = k(!1);
    ie(_, (C) => {
      C && (H.value = !0);
    });
    const J = k(null);
    let I = 0;
    function U(C) {
      i.value = C, C === "trending" ? $e.switchTab("trending") : $e.switchTab("stars");
    }
    function Z() {
      i.value = "stars";
    }
    const ee = [
      { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
      { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
      { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
      { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
    ], te = k(R.searchRule || "exact"), N = P(() => ee.find((C) => C.id === te.value) || ee[0]);
    function le() {
      const C = R.cycleSearchRule();
      te.value = C;
    }
    const re = P(() => d.value === "global" ? "在 GitHub 全网搜索开源仓库…" : `在当前分类中${N.value.name}搜索 Star 仓库…`);
    function F() {
      clearTimeout(I), !(!r.value || d.value !== "local") && (I = window.setTimeout(() => R.setSearchQuery(T.value.trim().toLowerCase()), 180));
    }
    function se() {
      d.value = d.value === "local" ? "global" : "local", d.value === "local" && F();
    }
    function B() {
      T.value = "", clearTimeout(I), R.resetLocalSearch();
    }
    function q() {
      const C = T.value.trim();
      d.value === "local" ? (clearTimeout(I), R.setSearchQuery(C.toLowerCase())) : C && window.open(`https://github.com/search?q=${encodeURIComponent(C)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function oe() {
      ++m, f = !0, h.value = "";
    }
    return ie(r, async (C) => {
      const l = ++m;
      if (clearTimeout(I), b?.abort(), b = new AbortController(), C || b.abort(), R.setRepositoryViewSignal(b.signal), !!C) {
        if (f) {
          await R.resumeRepositoryReads();
          return;
        }
        if (R.repos.length || R.loadingAllStars || R.loadingPage) {
          f = !0;
          return;
        }
        try {
          const S = await ge();
          if (!r.value || l !== m) return;
          f = !0, await R.loadGitHub(S.ghUser, S.ghToken);
        } catch {
          if (!r.value || l !== m) return;
          f = !1, h.value = "GitHub 初始化失败；请检查设置，或重新进入后重试。";
        }
      }
    }, { immediate: !0, flush: "sync" }), Ne(() => {
      R.setAiViewActive(!1), ++m, b?.abort(), clearTimeout(I);
    }), (C, l) => (n(), c("section", {
      class: G(["card wide", { "card-fullscreen": w(Ye).activeId === "card-github" }]),
      id: "card-github",
      inert: !w(r)
    }, [
      e("header", Is, [
        l[13] || (l[13] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        l[14] || (l[14] = e("h2", null, "GitHub", -1)),
        l[15] || (l[15] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", Ns, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: X(q, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: d.value === "local" ? "切换为 GitHub 全站搜索" : "切换为当前分类搜索",
              onClick: se
            }, [
              e("span", Ps, v(d.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Us, v(d.value === "local" ? "当前分类" : "GitHub 全站"), 1),
              l[10] || (l[10] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, Es),
            j(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": l[0] || (l[0] = (S) => T.value = S),
              placeholder: re.value,
              autocomplete: "off",
              onInput: F
            }, null, 40, Fs), [
              [Y, T.value]
            ]),
            d.value === "local" ? (n(), c("button", {
              key: 0,
              type: "button",
              class: G(["gh-search-rule-btn", `rule-${N.value.id}`]),
              title: `当前匹配规则：${N.value.name}（${N.value.desc}）
点击切换下一个规则`,
              onClick: X(le, ["stop"])
            }, [
              e("span", Os, v(N.value.icon), 1),
              e("span", Ws, v(N.value.name), 1)
            ], 10, Vs)) : y("", !0),
            j(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: "清空搜索",
              onClick: B
            }, "✕", 512), [
              [Ee, T.value]
            ]),
            l[11] || (l[11] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          l[12] || (l[12] = Pe('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-04024e84><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-04024e84><input type="checkbox" value="exact" checked data-v-04024e84>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-04024e84><input type="checkbox" value="loose" data-v-04024e84>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-04024e84><input type="checkbox" value="related" data-v-04024e84>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-04024e84><input type="checkbox" value="topic" data-v-04024e84>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-04024e84><input type="checkbox" value="readme" data-v-04024e84>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-04024e84></div>', 2))
        ]),
        e("div", js, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: J,
            "aria-expanded": _.value,
            "aria-label": "GitHub 设置",
            class: "gh-head-settings-btn",
            title: "GitHub 模组偏好设置 (账号、Token、AI模型、缓存)",
            onClick: l[1] || (l[1] = (S) => _.value = !_.value)
          }, " ⚙️ ", 8, zs),
          H.value ? (n(), O(w(u), {
            key: 0,
            visible: w(r) && _.value,
            anchor: J.value,
            "ai-request": M.value,
            onAccountReload: oe,
            onClose: l[2] || (l[2] = (S) => _.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : y("", !0)
        ])
      ]),
      h.value ? (n(), c("p", Bs, v(h.value), 1)) : y("", !0),
      e("div", qs, [
        e("div", Qs, [
          e("aside", Ks, [
            e("div", {
              class: G(["fo-sidebar-toggle-bar", { "is-collapsed": g.value }]),
              title: g.value ? "点击展开快捷频道" : "点击收起快捷频道",
              onClick: l[3] || (l[3] = (S) => g.value = !g.value)
            }, [
              e("div", Xs, [
                l[16] || (l[16] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                l[17] || (l[17] = e("span", null, "快捷频道", -1)),
                g.value ? (n(), c("span", Js, "3")) : y("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !g.value,
                title: g.value ? "展开" : "收起"
              }, [
                e("span", null, v(g.value ? "展开" : "收起"), 1),
                e("span", eo, v(g.value ? "▾" : "▴"), 1)
              ], 8, Zs)
            ], 10, Ys),
            g.value ? y("", !0) : (n(), c("div", to, [
              e("div", so, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: G(["fo-sidebar-sub-btn", { on: i.value === "stars" }]),
                  title: "查看与管理 Star 星标仓库",
                  onClick: l[4] || (l[4] = (S) => U("stars"))
                }, [...l[18] || (l[18] = [
                  e("div", { class: "fo-sidebar-sub-main" }, [
                    e("span", { class: "fo-sidebar-sub-icon" }, "⭐"),
                    e("div", { class: "fo-sidebar-sub-text" }, [
                      e("strong", null, "Star 收藏"),
                      e("small", null, "星标项目 · 文件夹管理")
                    ])
                  ], -1),
                  e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1)
                ])], 2)
              ]),
              e("div", oo, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: G(["fo-sidebar-sub-btn", { on: i.value === "trending" }]),
                  title: "查看 GitHub 实时趋势项目",
                  onClick: l[5] || (l[5] = (S) => U("trending"))
                }, [...l[19] || (l[19] = [
                  e("div", { class: "fo-sidebar-sub-main" }, [
                    e("span", { class: "fo-sidebar-sub-icon" }, "🔥"),
                    e("div", { class: "fo-sidebar-sub-text" }, [
                      e("strong", null, "趋势榜单"),
                      e("small", null, "开源风向标 · 今日/近7天")
                    ])
                  ], -1),
                  e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1)
                ])], 2)
              ]),
              e("div", ao, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: G(["fo-sidebar-sub-btn", { on: i.value === "awesome" }]),
                  title: "查看 Awesome 精选开源资源清单",
                  onClick: l[6] || (l[6] = (S) => U("awesome"))
                }, [...l[20] || (l[20] = [
                  e("div", { class: "fo-sidebar-sub-main" }, [
                    e("span", { class: "fo-sidebar-sub-icon" }, "🌟"),
                    e("div", { class: "fo-sidebar-sub-text" }, [
                      e("strong", null, "资源专区"),
                      e("small", null, "神级清单 · 全球精选")
                    ])
                  ], -1),
                  e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1)
                ])], 2)
              ]),
              e("div", no, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: G(["fo-sidebar-sub-btn", { on: i.value === "repos" }]),
                  title: "查看与管理我的仓库及 Topic 看板",
                  onClick: l[7] || (l[7] = (S) => U("repos"))
                }, [...l[21] || (l[21] = [
                  e("div", { class: "fo-sidebar-sub-main" }, [
                    e("span", { class: "fo-sidebar-sub-icon" }, "📦"),
                    e("div", { class: "fo-sidebar-sub-text" }, [
                      e("strong", null, "我的仓库"),
                      e("small", null, "个人项目 · Topic 看板")
                    ])
                  ], -1),
                  e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1)
                ])], 2)
              ])
            ])),
            e("header", io, [
              l[22] || (l[22] = e("div", null, [
                e("b", { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, [
                  e("i", { class: "fo-folder-icon" }),
                  K(" 收藏文件夹")
                ]),
                e("small", { style: { color: "var(--dim)", "font-size": "9.5px" } }, "单一文件夹 · 独立正在使用")
              ], -1)),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: "新建文件夹",
                "aria-label": "新建文件夹",
                onClick: l[8] || (l[8] = (S) => w(R).promptCreateFolder())
              }, "＋")
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: Z
            }, [
              Q(Oe, { active: w(r) }, null, 8, ["active"])
            ])
          ]),
          e("section", lo, [
            i.value === "stars" && w(Ve).accountConfigured === !1 ? (n(), O(qe, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: l[9] || (l[9] = (S) => _.value = !0)
            })) : i.value === "stars" ? (n(), c(L, { key: 1 }, [
              e("header", ro, [
                Q(ze, { onOpenAiSettings: $ })
              ]),
              l[23] || (l[23] = e("div", { class: "gh-main-subbar" }, [
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
              e("div", co, [
                Q(We, {
                  active: w(r) && i.value === "stars"
                }, null, 8, ["active"])
              ]),
              l[24] || (l[24] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", uo, [
                Q(Be)
              ]),
              e("div", po, [
                Q(je, {
                  active: w(r) && i.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : i.value === "trending" ? (n(), O(Qe, { key: 2 })) : i.value === "awesome" ? (n(), O(ht, { key: 3 })) : i.value === "repos" ? (n(), O(Ds, {
              key: 4,
              active: w(r) && i.value === "repos"
            }, null, 8, ["active"])) : y("", !0)
          ])
        ])
      ])
    ], 10, Ms));
  }
}), To = /* @__PURE__ */ he(mo, [["__scopeId", "data-v-04024e84"]]);
export {
  To as default
};
