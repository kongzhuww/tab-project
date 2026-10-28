import { d as de, o as c, e as u, f as e, l as F, n as X, g as w, F as x, h as I, B as A, t as v, u as y, i as oe, b as _, s as W, r as we, x as ae, C as ye, y as ke, m as Y, k as se, L as _e, z as Ce, H as Te, c as Q, D as K, E as $e } from "./vendor-vue-DokqDua_.js";
import { u as Se } from "./useCardActivity-B8TOagZV.js";
import { D as ue, E as fe, t as S, y as Ae } from "./search.service-D8BPpHmG.js";
import { _ as Re, a as Ge, b as He, g as ve, G as xe, c as Le } from "./main-DPruwwa7.js";
import { A as De } from "./AccountSetupGuide-b0Xd0kWd.js";
import Ie from "./GitHubTrending-ESEGWK6X.js";
import { _ as pe } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { s as re } from "./storage-cache.service-BYF2zxXX.js";
import { r as Ee } from "./view-styles-hx9Gz5g8.js";
const Ne = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], Me = [
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
], Pe = { class: "gh-awesome-wrapper" }, Ue = { class: "gh-awesome-header" }, Ve = { class: "gh-awesome-intro" }, Fe = { class: "gh-awesome-search-box" }, We = { class: "gh-awesome-pills" }, Oe = ["onClick"], Be = { class: "gh-awesome-grid" }, je = ["onClick"], ze = { class: "gh-awesome-card-head" }, qe = { class: "gh-awesome-card-name" }, Qe = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Ke = { class: "gh-awesome-desc" }, Ye = { class: "gh-awesome-footer" }, Xe = { class: "gh-awesome-tags" }, Je = ["href"], Ze = {
  key: 0,
  class: "gh-awesome-empty"
}, et = /* @__PURE__ */ de({
  __name: "GitHubAwesome",
  setup(O) {
    const r = _("all"), l = _(""), m = W(() => {
      const b = l.value.trim().toLowerCase(), f = r.value;
      return Me.filter((o) => f === "all" || o.category === f ? b ? o.name.toLowerCase().includes(b) || o.title.toLowerCase().includes(b) || o.desc.toLowerCase().includes(b) || o.tags.some((d) => d.toLowerCase().includes(b)) : !0 : !1);
    });
    function h(b) {
      window.open(b, "_blank", "noreferrer");
    }
    return (b, f) => (c(), u("div", Pe, [
      e("header", Ue, [
        e("div", Ve, [
          f[3] || (f[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", Fe, [
            F(e("input", {
              "onUpdate:modelValue": f[0] || (f[0] = (o) => l.value = o),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [X, l.value]
            ]),
            l.value ? (c(), u("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: f[1] || (f[1] = (o) => l.value = "")
            }, "✕")) : w("", !0)
          ])
        ]),
        e("div", We, [
          (c(!0), u(x, null, I(y(Ne), (o) => (c(), u("button", {
            key: o.id,
            type: "button",
            class: A(["gh-awesome-pill", { active: r.value === o.id }]),
            onClick: (g) => r.value = o.id
          }, [
            e("span", null, v(o.icon), 1),
            e("b", null, v(o.name), 1)
          ], 10, Oe))), 128))
        ])
      ]),
      e("div", Be, [
        (c(!0), u(x, null, I(m.value, (o) => (c(), u("article", {
          key: o.id,
          class: "gh-awesome-card",
          onClick: (g) => h(o.url)
        }, [
          e("div", ze, [
            e("div", qe, [
              e("strong", null, v(o.title), 1),
              e("small", null, v(o.name), 1)
            ]),
            e("span", Qe, "★ " + v(o.stars), 1)
          ]),
          e("p", Ke, v(o.desc), 1),
          e("div", Ye, [
            e("div", Xe, [
              (c(!0), u(x, null, I(o.tags, (g) => (c(), u("span", {
                key: g,
                class: "gh-awesome-tag"
              }, v(g), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: o.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: f[2] || (f[2] = oe(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Je)
          ])
        ], 8, je))), 128)),
        m.value.length ? w("", !0) : (c(), u("div", Ze, [...f[4] || (f[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), tt = /* @__PURE__ */ pe(et, [["__scopeId", "data-v-28a8995f"]]), ce = "gh_my_repos_cache_v1", U = "gh_my_repo_custom_topics_v1", p = we({
  loading: !1,
  syncingTopic: !1,
  errorMessage: "",
  repos: [],
  customTopicNames: [],
  searchQuery: "",
  editingColumnTopic: null,
  composerActiveColumnId: null
});
function N(O) {
  let r = O.trim().toLowerCase();
  return r = r.replace(/[\s_]+/g, "-"), r = r.replace(/[^a-z0-9-]/g, ""), r = r.replace(/^-+|-+$/g, "").replace(/-+/g, "-"), r.length > 35 && (r = r.slice(0, 35).replace(/-+$/, "")), r;
}
class V {
  constructor() {
    this.abortController = null;
  }
  static getInstance() {
    return V.instance || (V.instance = new V()), V.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略）
   */
  async load(r = !1) {
    this.abortController?.abort(), this.abortController = new AbortController();
    const l = this.abortController.signal;
    await this.loadPersistedCustomTopics();
    const m = await re.get(ce);
    if (m && m.length && (p.repos = m), !r && m && m.length) {
      this.fetchRemote(l).catch(() => {
      });
      return;
    }
    p.loading = !0, p.errorMessage = "";
    try {
      await this.fetchRemote(l);
    } catch (h) {
      if (h.name === "AbortError") return;
      p.errorMessage = h.message || "获取个人仓库失败";
    } finally {
      p.loading = !1;
    }
  }
  async fetchRemote(r) {
    const { ghUser: l, ghToken: m } = await ue();
    if (!l && !m) {
      p.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    let h = "https://api.github.com/user/repos?type=owner&sort=updated&per_page=100";
    m || (h = `https://api.github.com/users/${encodeURIComponent(l)}/repos?type=owner&sort=updated&per_page=100`);
    const b = fe(m), f = await fetch(h, {
      method: "GET",
      headers: b,
      signal: r
    });
    if (!f.ok)
      throw f.status === 401 ? new Error("GitHub Token 无效或已过期，请在设置中更新。") : f.status === 403 ? new Error("GitHub API 频率受限或无权访问，请检查 Token 权限。") : new Error(`GitHub 请求失败 (HTTP ${f.status})`);
    const o = await f.json();
    if (!Array.isArray(o))
      throw new Error("GitHub 返回数据格式异常");
    const g = o.map((d) => ({
      id: d.id,
      name: d.name,
      fullName: d.full_name || `${d.owner?.login || l}/${d.name}`,
      description: d.description || "",
      isPrivate: !!d.private,
      isFork: !!d.fork,
      htmlUrl: d.html_url || `https://github.com/${l}/${d.name}`,
      language: d.language || null,
      stargazersCount: Number(d.stargazers_count) || 0,
      forksCount: Number(d.forks_count) || 0,
      openIssuesCount: Number(d.open_issues_count) || 0,
      topics: Array.isArray(d.topics) ? d.topics.map((T) => String(T).toLowerCase()) : [],
      updatedAt: d.updated_at || "",
      pushedAt: d.pushed_at || "",
      defaultBranch: d.default_branch || "main"
    }));
    p.repos = g, await re.set(ce, g, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 提交单个仓库的 Topics 到 GitHub 远端
   */
  async syncRepoTopics(r, l) {
    const { ghToken: m } = await ue();
    if (!m)
      return alert("向 GitHub 更新 Topic 需要在 GitHub 设置中配置具备 repo 写入权限的 Token。"), !1;
    const h = Array.from(new Set(l.map(N).filter(Boolean))).slice(0, 20), [b, f] = r.fullName.split("/"), o = `https://api.github.com/repos/${encodeURIComponent(b)}/${encodeURIComponent(f)}/topics`;
    p.syncingTopic = !0;
    try {
      const g = fe(m), d = await fetch(o, {
        method: "PUT",
        headers: {
          ...g,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: h })
      });
      if (!d.ok)
        throw d.status === 401 || d.status === 403 ? new Error("Token 权限不足。修改 Topics 需要包含 repo（或 Administration:write）作用域。") : d.status === 404 ? new Error("仓库未找到或无权修改。") : new Error(`GitHub 远端保存失败 (HTTP ${d.status})`);
      const T = await d.json(), C = Array.isArray(T.names) ? T.names : h;
      return r.topics = C, await re.set(ce, p.repos, { ttlMs: 30 * 86400 * 1e3 }), !0;
    } catch (g) {
      return alert(`更新 GitHub Topics 失败：${g.message || g}`), !1;
    } finally {
      p.syncingTopic = !1;
    }
  }
  /**
   * 将仓库添加到指定 Topic（若远端不存在则新增并提交）
   */
  async addRepoToTopic(r, l) {
    const m = N(l);
    if (!m) return !1;
    if (r.topics.includes(m)) return !0;
    const h = [...r.topics, m];
    return this.syncRepoTopics(r, h);
  }
  /**
   * 将仓库从指定 Topic 移除
   */
  async removeRepoFromTopic(r, l) {
    const m = N(l);
    if (!r.topics.includes(m)) return !0;
    const h = r.topics.filter((b) => b !== m);
    return this.syncRepoTopics(r, h);
  }
  /**
   * 新建一个 Topic 列（本地与远端集合）
   */
  async createTopicColumn(r) {
    const l = N(r);
    return l ? p.customTopicNames.includes(l) ? (alert(`Topic「${l}」板块已存在。`), null) : (p.customTopicNames.push(l), await this.persistCustomTopics(), l) : (alert("Topic 名称无效。GitHub 规范：仅限 1~35 位小写英文字母、数字和连字符 '-'。"), null);
  }
  /**
   * 重命名 Topic 列：同步将该板块下所有仓库的旧 Topic 替换为新 Topic 并提交到 GitHub
   */
  async renameTopicColumn(r, l) {
    const m = N(l);
    if (!m)
      return alert("新 Topic 名称无效。仅限小写英文、数字与中划线。"), !1;
    if (r === m) return !0;
    const h = p.repos.filter((b) => b.topics.includes(r));
    if (h.length > 0) {
      if (!confirm(
        `确定将板块「${r}」重命名为「${m}」吗？
这将调用 GitHub API 同步更新该板块下的 ${h.length} 个仓库的远端 Topic。`
      )) return !1;
      p.syncingTopic = !0;
      let f = 0, o = 0;
      for (const g of h) {
        const d = g.topics.map((C) => C === r ? m : C);
        await this.syncRepoTopics(g, d) ? f++ : o++;
      }
      p.syncingTopic = !1, o > 0 && alert(`重命名完成，成功更新 ${f} 个仓库，失败 ${o} 个。`);
    }
    return p.customTopicNames = p.customTopicNames.map((b) => b === r ? m : b), await this.persistCustomTopics(), !0;
  }
  /**
   * 删除 Topic 板块：从该板块下所有仓库中移除该 topic
   */
  async deleteTopicColumn(r) {
    const l = p.repos.filter((h) => h.topics.includes(r)), m = l.length > 0 ? `确定删除板块「${r}」吗？
将从该板块下的 ${l.length} 个仓库中移除此 Topic 并在 GitHub 远端同步。` : `确定删除空板块「${r}」吗？`;
    if (!confirm(m)) return !1;
    if (l.length > 0) {
      p.syncingTopic = !0;
      for (const h of l)
        await this.removeRepoFromTopic(h, r);
      p.syncingTopic = !1;
    }
    return p.customTopicNames = p.customTopicNames.filter((h) => h !== r), await this.persistCustomTopics(), !0;
  }
  async loadPersistedCustomTopics() {
    try {
      const l = (typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([U]) : { [U]: JSON.parse(localStorage.getItem(U) || "[]") })?.[U];
      Array.isArray(l) && (p.customTopicNames = l.map(N).filter(Boolean));
    } catch {
    }
  }
  async persistCustomTopics() {
    const r = Array.from(new Set(p.customTopicNames.map(N).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [U]: r }) : localStorage.setItem(U, JSON.stringify(r));
    } catch {
    }
  }
}
const G = V.getInstance(), st = { class: "my-repos-workspace" }, at = { class: "my-repos-header" }, ot = { class: "header-left" }, nt = { class: "title" }, it = { class: "count-pill" }, lt = {
  key: 0,
  class: "sync-status"
}, rt = { class: "header-right" }, ct = { class: "search-box" }, ut = ["disabled"], dt = {
  key: 0,
  class: "error-banner"
}, pt = { class: "board-columns-track" }, mt = { class: "column-header" }, gt = { class: "column-title-group" }, ht = { class: "badge-count" }, ft = { class: "column-cards-scroll" }, vt = ["onDragstart"], bt = { class: "repo-card-head" }, wt = ["title", "onClick"], yt = {
  key: 0,
  class: "badge-repo-visibility private"
}, kt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, _t = ["title"], Ct = {
  key: 1,
  class: "repo-topics-row"
}, Tt = { class: "repo-card-footer" }, $t = { class: "meta-left" }, St = {
  key: 0,
  class: "meta-item lang"
}, At = { class: "meta-item" }, Rt = {
  key: 1,
  class: "meta-item"
}, Gt = ["title"], Ht = {
  key: 0,
  class: "empty-column-placeholder"
}, xt = ["onDragover", "onDragleave", "onDrop"], Lt = { class: "column-header" }, Dt = {
  key: 0,
  class: "column-title-group"
}, It = ["title"], Et = { class: "badge-count" }, Nt = {
  key: 1,
  class: "column-rename-group"
}, Mt = ["onKeydown"], Pt = ["onClick"], Ut = { class: "column-actions" }, Vt = ["onClick"], Ft = {
  key: 0,
  class: "col-popover-menu"
}, Wt = ["onClick"], Ot = ["onClick"], Bt = { class: "column-cards-scroll" }, jt = ["onDragstart"], zt = { class: "repo-card-head" }, qt = ["title", "onClick"], Qt = {
  key: 0,
  class: "badge-repo-visibility private"
}, Kt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Yt = ["title"], Xt = { class: "repo-topics-row" }, Jt = { class: "topic-chip active-chip" }, Zt = ["onClick"], es = { class: "repo-card-footer" }, ts = { class: "meta-left" }, ss = {
  key: 0,
  class: "meta-item lang"
}, as = { class: "meta-item" }, os = {
  key: 1,
  class: "meta-item"
}, ns = { class: "meta-date" }, is = {
  key: 0,
  class: "empty-column-placeholder"
}, ls = { class: "board-column new-column-slot" }, rs = {
  key: 1,
  class: "new-column-composer"
}, cs = { class: "composer-actions" }, us = /* @__PURE__ */ de({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(O) {
    const r = O, l = _(""), m = _(!1), h = _(null), b = _(""), f = _(null), o = _(null), g = _(null), d = _(null), T = _(null);
    let C = null, L = 0;
    const J = W(() => {
      const a = new Set(p.customTopicNames);
      for (const t of p.repos)
        for (const s of t.topics)
          s && a.add(s);
      return Array.from(a).sort();
    }), B = W(() => {
      const a = p.searchQuery.trim().toLowerCase();
      return a ? p.repos.filter(
        (t) => t.name.toLowerCase().includes(a) || t.description.toLowerCase().includes(a) || t.topics.some((s) => s.includes(a)) || t.language && t.language.toLowerCase().includes(a)
      ) : p.repos;
    }), M = W(() => {
      const a = new Set(J.value);
      return B.value.filter((t) => t.topics.length ? !t.topics.some((s) => a.has(s)) : !0);
    });
    function H(a) {
      return B.value.filter((t) => t.topics.includes(a));
    }
    async function E() {
      const a = l.value.trim();
      if (!a) return;
      await G.createTopicColumn(a) && (l.value = "", m.value = !1);
    }
    function ne(a) {
      f.value = a, b.value = a, h.value = null;
    }
    async function j(a) {
      const t = b.value.trim();
      if (!t || t === a) {
        f.value = null;
        return;
      }
      await G.renameTopicColumn(a, t) && (f.value = null);
    }
    async function Z(a) {
      h.value = null, await G.deleteTopicColumn(a);
    }
    async function D(a, t) {
      await G.removeRepoFromTopic(a, t);
    }
    function ie(a) {
      const t = o.value;
      if (t && (a.shiftKey || g.value || Math.abs(a.deltaX) > 0)) {
        a.preventDefault();
        const s = a.deltaX !== 0 ? a.deltaX : a.deltaY;
        t.scrollLeft += s;
      }
    }
    function z(a) {
      if (!g.value || !o.value) return;
      a.preventDefault();
      const t = a.deltaX !== 0 ? a.deltaX : a.deltaY;
      o.value.scrollLeft += t * 1.2;
    }
    function q() {
      if (C !== null) return;
      const a = () => {
        o.value && L !== 0 ? (o.value.scrollLeft += L, C = requestAnimationFrame(a)) : P();
      };
      C = requestAnimationFrame(a);
    }
    function P() {
      C !== null && (cancelAnimationFrame(C), C = null), L = 0;
    }
    function ee(a) {
      if (!g.value || !o.value) return;
      const t = o.value.getBoundingClientRect(), s = 100;
      if (a > t.right - s) {
        const i = Math.min(1, Math.max(0.1, (a - (t.right - s)) / s));
        L = Math.round(i * 20), q();
      } else if (a < t.left + s) {
        const i = Math.min(1, Math.max(0.1, (t.left + s - a) / s));
        L = -Math.round(i * 20), q();
      } else
        P();
    }
    function le(a) {
      g.value && (a.preventDefault(), ee(a.clientX));
    }
    function te(a, t, s) {
      g.value = t, d.value = s, a.dataTransfer && (a.dataTransfer.effectAllowed = "move", a.dataTransfer.setData("text/plain", `${t.id}:${s}`)), window.addEventListener("wheel", z, { passive: !1 });
    }
    function k() {
      g.value = null, d.value = null, T.value = null, P(), window.removeEventListener("wheel", z);
    }
    function n(a, t) {
      g.value && (a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move"), T.value = t, ee(a.clientX));
    }
    function $(a, t) {
      const s = a.currentTarget, i = a.relatedTarget;
      s?.contains(i) || T.value === t && (T.value = null);
    }
    async function me(a, t) {
      a.preventDefault();
      const s = g.value, i = d.value;
      if (k(), !!s)
        if (t === "default")
          i && i !== "default" && await G.removeRepoFromTopic(s, i);
        else if (i && i !== "default" && i !== t) {
          const R = s.topics.filter((be) => be !== i);
          R.includes(t) || R.push(t), await G.syncRepoTopics(s, R);
        } else
          await G.addRepoToTopic(s, t);
    }
    function ge(a) {
      window.open(a, "_blank", "noopener,noreferrer");
    }
    function he(a) {
      if (!a) return "";
      try {
        const t = new Date(a);
        return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ae(
      () => r.active,
      (a) => {
        a && !p.repos.length && G.load();
      },
      { immediate: !0 }
    ), ye(() => {
      r.active && !p.repos.length && G.load();
    }), ke(() => {
      window.removeEventListener("wheel", z), P();
    }), (a, t) => (c(), u("div", st, [
      e("header", at, [
        e("div", ot, [
          e("h2", nt, [
            t[14] || (t[14] = e("span", { class: "icon" }, "📦", -1)),
            t[15] || (t[15] = e("span", null, "我的仓库 · Topic 看板", -1)),
            e("span", it, v(y(p).repos.length) + " 个项目", 1)
          ]),
          y(p).syncingTopic ? (c(), u("span", lt, [...t[16] || (t[16] = [
            e("i", { class: "spin-icon" }, "⏳", -1),
            Y(" 正在同步 GitHub 远端 Topics… ", -1)
          ])])) : w("", !0)
        ]),
        e("div", rt, [
          e("div", ct, [
            F(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (s) => y(p).searchQuery = s),
              type: "text",
              placeholder: "过滤仓库名 / 描述 / 标签...",
              class: "search-input"
            }, null, 512), [
              [X, y(p).searchQuery]
            ]),
            y(p).searchQuery ? (c(), u("button", {
              key: 0,
              type: "button",
              class: "clear-btn",
              onClick: t[1] || (t[1] = (s) => y(p).searchQuery = "")
            }, "✕")) : w("", !0)
          ]),
          e("button", {
            type: "button",
            class: "btn-refresh",
            disabled: y(p).loading || y(p).syncingTopic,
            title: "重新从 GitHub 拉取仓库列表",
            onClick: t[2] || (t[2] = (s) => y(G).load(!0))
          }, [
            e("span", {
              class: A({ spinning: y(p).loading })
            }, "🔄", 2),
            e("span", null, v(y(p).loading ? "正在刷新…" : "刷新仓库"), 1)
          ], 8, ut)
        ])
      ]),
      y(p).errorMessage ? (c(), u("div", dt, [
        e("span", null, "⚠️ " + v(y(p).errorMessage), 1),
        e("button", {
          type: "button",
          onClick: t[3] || (t[3] = (s) => y(G).load(!0))
        }, "重试")
      ])) : w("", !0),
      e("div", {
        ref_key: "boardViewportRef",
        ref: o,
        class: "board-viewport",
        onWheel: ie,
        onDragover: le
      }, [
        e("div", pt, [
          e("section", {
            class: A(["board-column default-column", { "drop-active": T.value === "default" }]),
            onDragover: t[4] || (t[4] = (s) => n(s, "default")),
            onDragleave: t[5] || (t[5] = (s) => $(s, "default")),
            onDrop: t[6] || (t[6] = (s) => me(s, "default"))
          }, [
            e("header", mt, [
              e("div", gt, [
                t[17] || (t[17] = e("span", { class: "col-dot default-dot" }, null, -1)),
                t[18] || (t[18] = e("h3", { class: "column-title" }, "默认板块", -1)),
                e("span", ht, v(M.value.length), 1)
              ]),
              t[19] || (t[19] = e("div", { class: "column-actions" }, [
                e("span", {
                  class: "column-hint",
                  title: "未分配到右侧任何 Topic 的项目自动归入此板块"
                }, "未分类")
              ], -1))
            ]),
            e("div", ft, [
              (c(!0), u(x, null, I(M.value, (s) => (c(), u("div", {
                key: s.id,
                class: A(["repo-card", { "card-dragging": g.value?.id === s.id }]),
                draggable: "true",
                onDragstart: (i) => te(i, s, "default"),
                onDragend: k
              }, [
                e("div", bt, [
                  e("span", {
                    class: "repo-name",
                    title: s.fullName,
                    onClick: (i) => ge(s.htmlUrl)
                  }, v(s.name), 9, wt),
                  s.isPrivate ? (c(), u("span", yt, "私有")) : w("", !0),
                  s.isFork ? (c(), u("span", kt, "Fork")) : w("", !0)
                ]),
                s.description ? (c(), u("p", {
                  key: 0,
                  class: "repo-desc",
                  title: s.description
                }, v(s.description), 9, _t)) : w("", !0),
                s.topics.length ? (c(), u("div", Ct, [
                  (c(!0), u(x, null, I(s.topics, (i) => (c(), u("span", {
                    key: i,
                    class: "topic-chip"
                  }, " #" + v(i), 1))), 128))
                ])) : w("", !0),
                e("div", Tt, [
                  e("div", $t, [
                    s.language ? (c(), u("span", St, [
                      t[20] || (t[20] = e("span", { class: "lang-color" }, null, -1)),
                      Y(v(s.language), 1)
                    ])) : w("", !0),
                    e("span", At, "⭐ " + v(s.stargazersCount), 1),
                    s.forksCount ? (c(), u("span", Rt, "🍴 " + v(s.forksCount), 1)) : w("", !0)
                  ]),
                  e("span", {
                    class: "meta-date",
                    title: "最后更新：" + s.updatedAt
                  }, v(he(s.pushedAt || s.updatedAt)), 9, Gt)
                ])
              ], 42, vt))), 128)),
              M.value.length ? w("", !0) : (c(), u("div", Ht, [...t[21] || (t[21] = [
                e("span", null, "暂无未分类仓库", -1)
              ])]))
            ])
          ], 34),
          (c(!0), u(x, null, I(J.value, (s) => (c(), u("section", {
            key: s,
            class: A(["board-column topic-column", { "drop-active": T.value === s }]),
            onDragover: (i) => n(i, s),
            onDragleave: (i) => $(i, s),
            onDrop: (i) => me(i, s)
          }, [
            e("header", Lt, [
              f.value !== s ? (c(), u("div", Dt, [
                t[22] || (t[22] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "GitHub Topic: " + s
                }, " #" + v(s), 9, It),
                e("span", Et, v(H(s).length), 1)
              ])) : (c(), u("div", Nt, [
                F(e("input", {
                  "onUpdate:modelValue": t[7] || (t[7] = (i) => b.value = i),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    se((i) => j(s), ["enter"]),
                    t[8] || (t[8] = se((i) => f.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, Mt), [
                  [X, b.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (i) => j(s)
                }, "✓", 8, Pt),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: t[9] || (t[9] = (i) => f.value = null)
                }, "✕")
              ])),
              e("div", Ut, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "板块操作（重命名 / 删除）",
                  onClick: (i) => h.value = h.value === s ? null : s
                }, "•••", 8, Vt),
                h.value === s ? (c(), u("div", Ft, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (i) => ne(s)
                  }, " ✏️ 重命名 Topic 并同步 ", 8, Wt),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (i) => Z(s)
                  }, " 🗑️ 删除板块并从远端移除 ", 8, Ot)
                ])) : w("", !0)
              ])
            ]),
            e("div", Bt, [
              (c(!0), u(x, null, I(H(s), (i) => (c(), u("div", {
                key: i.id,
                class: A(["repo-card", { "card-dragging": g.value?.id === i.id }]),
                draggable: "true",
                onDragstart: (R) => te(R, i, s),
                onDragend: k
              }, [
                e("div", zt, [
                  e("span", {
                    class: "repo-name",
                    title: i.fullName,
                    onClick: (R) => ge(i.htmlUrl)
                  }, v(i.name), 9, qt),
                  i.isPrivate ? (c(), u("span", Qt, "私有")) : w("", !0),
                  i.isFork ? (c(), u("span", Kt, "Fork")) : w("", !0)
                ]),
                i.description ? (c(), u("p", {
                  key: 0,
                  class: "repo-desc",
                  title: i.description
                }, v(i.description), 9, Yt)) : w("", !0),
                e("div", Xt, [
                  e("span", Jt, [
                    Y(" #" + v(s) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从当前 Topic 移除并同步到 GitHub",
                      onClick: oe((R) => D(i, s), ["stop"])
                    }, "✕", 8, Zt)
                  ]),
                  (c(!0), u(x, null, I(i.topics.filter((R) => R !== s), (R) => (c(), u("span", {
                    key: R,
                    class: "topic-chip other-chip"
                  }, " #" + v(R), 1))), 128))
                ]),
                e("div", es, [
                  e("div", ts, [
                    i.language ? (c(), u("span", ss, [
                      t[23] || (t[23] = e("span", { class: "lang-color" }, null, -1)),
                      Y(v(i.language), 1)
                    ])) : w("", !0),
                    e("span", as, "⭐ " + v(i.stargazersCount), 1),
                    i.forksCount ? (c(), u("span", os, "🍴 " + v(i.forksCount), 1)) : w("", !0)
                  ]),
                  e("span", ns, v(he(i.pushedAt || i.updatedAt)), 1)
                ])
              ], 42, jt))), 128)),
              H(s).length ? w("", !0) : (c(), u("div", is, [...t[24] || (t[24] = [
                e("span", null, "暂无项目，可从其他列拖拽至此", -1)
              ])]))
            ])
          ], 42, xt))), 128)),
          e("section", ls, [
            m.value ? (c(), u("div", rs, [
              t[26] || (t[26] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建 Topic 分组"),
                e("small", null, "将作为 GitHub 远端标签同步")
              ], -1)),
              F(e("input", {
                "onUpdate:modelValue": t[11] || (t[11] = (s) => l.value = s),
                type: "text",
                placeholder: "例如 tools, vue3, robotics...",
                class: "composer-input",
                onKeydown: [
                  se(E, ["enter"]),
                  t[12] || (t[12] = se((s) => m.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [X, l.value]
              ]),
              e("div", cs, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: E
                }, "创建板块"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: t[13] || (t[13] = (s) => m.value = !1)
                }, "取消")
              ])
            ])) : (c(), u("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: t[10] || (t[10] = (s) => m.value = !0)
            }, [...t[25] || (t[25] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建 Topic 板块", -1)
            ])]))
          ])
        ])
      ], 544)
    ]));
  }
}), ds = /* @__PURE__ */ pe(us, [["__scopeId", "data-v-e456f877"]]), ps = ["inert"], ms = { class: "card-head" }, gs = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, hs = ["title"], fs = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, vs = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, bs = ["placeholder"], ws = ["title"], ys = { class: "gh-search-rule-icon" }, ks = { class: "gh-search-rule-text" }, _s = { class: "gh-settings-anchor" }, Cs = ["aria-expanded"], Ts = {
  key: 0,
  class: "muted small",
  role: "status"
}, $s = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Ss = { class: "gh-bili-layout" }, As = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, Rs = ["title"], Gs = { class: "fo-sidebar-toggle-title" }, Hs = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, xs = ["aria-expanded", "title"], Ls = { class: "fo-sidebar-toggle-chevron" }, Ds = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, Is = { class: "fo-sidebar-sub-wrap" }, Es = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Ns = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Ms = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Ps = { class: "gh-bili-sidebar-head" }, Us = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, Vs = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Fs = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, Ws = { id: "vue-github-status-root" }, Os = { id: "vue-github-repositories-root" }, Bs = /* @__PURE__ */ de({
  __name: "GitHubWorkspaceCard",
  setup(O) {
    const r = $e(() => import("./GitHubSettingsModal-C-CAi-mE.js")), { active: l } = Se("card-github", "/github.html");
    let m = 0, h = !1, b;
    const f = _(""), o = _("stars");
    ae(() => l.value && o.value === "stars", (k) => S.setAiViewActive(k), { immediate: !0, flush: "sync" });
    const g = _(!1), d = _("local"), T = _(""), C = _(!1), L = _(0);
    function J() {
      l.value && (C.value = !0, ++L.value);
    }
    const B = _(!1);
    ae(C, (k) => {
      k && (B.value = !0);
    });
    const M = _(null);
    let H = 0;
    function E(k) {
      o.value = k, k === "trending" ? ve.switchTab("trending") : ve.switchTab("stars");
    }
    function ne() {
      o.value = "stars";
    }
    const j = [
      { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
      { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
      { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
      { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
    ], Z = _(S.searchRule || "exact"), D = W(() => j.find((k) => k.id === Z.value) || j[0]);
    function ie() {
      const k = S.cycleSearchRule();
      Z.value = k;
    }
    const z = W(() => d.value === "global" ? "在 GitHub 全网搜索开源仓库…" : `在当前分类中${D.value.name}搜索 Star 仓库…`);
    function q() {
      clearTimeout(H), !(!l.value || d.value !== "local") && (H = window.setTimeout(() => S.setSearchQuery(T.value.trim().toLowerCase()), 180));
    }
    function P() {
      d.value = d.value === "local" ? "global" : "local", d.value === "local" && q();
    }
    function ee() {
      T.value = "", clearTimeout(H), S.resetLocalSearch();
    }
    function le() {
      const k = T.value.trim();
      d.value === "local" ? (clearTimeout(H), S.setSearchQuery(k.toLowerCase())) : k && window.open(`https://github.com/search?q=${encodeURIComponent(k)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function te() {
      ++m, h = !0, f.value = "";
    }
    return ae(l, async (k) => {
      const n = ++m;
      if (clearTimeout(H), b?.abort(), b = new AbortController(), k || b.abort(), S.setRepositoryViewSignal(b.signal), !!k) {
        if (h) {
          await S.resumeRepositoryReads();
          return;
        }
        if (S.repos.length || S.loadingAllStars || S.loadingPage) {
          h = !0;
          return;
        }
        try {
          const $ = await ue();
          if (!l.value || n !== m) return;
          h = !0, await S.loadGitHub($.ghUser, $.ghToken);
        } catch {
          if (!l.value || n !== m) return;
          h = !1, f.value = "GitHub 初始化失败；请检查设置，或重新进入后重试。";
        }
      }
    }, { immediate: !0, flush: "sync" }), _e(() => {
      S.setAiViewActive(!1), ++m, b?.abort(), clearTimeout(H);
    }), (k, n) => (c(), u("section", {
      class: A(["card wide", { "card-fullscreen": y(Ee).activeId === "card-github" }]),
      id: "card-github",
      inert: !y(l)
    }, [
      e("header", ms, [
        n[13] || (n[13] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        n[14] || (n[14] = e("h2", null, "GitHub", -1)),
        n[15] || (n[15] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", gs, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: oe(le, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: d.value === "local" ? "切换为 GitHub 全站搜索" : "切换为当前分类搜索",
              onClick: P
            }, [
              e("span", fs, v(d.value === "local" ? "⭐" : "🌐"), 1),
              e("span", vs, v(d.value === "local" ? "当前分类" : "GitHub 全站"), 1),
              n[10] || (n[10] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, hs),
            F(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": n[0] || (n[0] = ($) => T.value = $),
              placeholder: z.value,
              autocomplete: "off",
              onInput: q
            }, null, 40, bs), [
              [X, T.value]
            ]),
            d.value === "local" ? (c(), u("button", {
              key: 0,
              type: "button",
              class: A(["gh-search-rule-btn", `rule-${D.value.id}`]),
              title: `当前匹配规则：${D.value.name}（${D.value.desc}）
点击切换下一个规则`,
              onClick: oe(ie, ["stop"])
            }, [
              e("span", ys, v(D.value.icon), 1),
              e("span", ks, v(D.value.name), 1)
            ], 10, ws)) : w("", !0),
            F(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: "清空搜索",
              onClick: ee
            }, "✕", 512), [
              [Ce, T.value]
            ]),
            n[11] || (n[11] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          n[12] || (n[12] = Te('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-04024e84><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-04024e84><input type="checkbox" value="exact" checked data-v-04024e84>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-04024e84><input type="checkbox" value="loose" data-v-04024e84>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-04024e84><input type="checkbox" value="related" data-v-04024e84>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-04024e84><input type="checkbox" value="topic" data-v-04024e84>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-04024e84><input type="checkbox" value="readme" data-v-04024e84>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-04024e84></div>', 2))
        ]),
        e("div", _s, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: M,
            "aria-expanded": C.value,
            "aria-label": "GitHub 设置",
            class: "gh-head-settings-btn",
            title: "GitHub 模组偏好设置 (账号、Token、AI模型、缓存)",
            onClick: n[1] || (n[1] = ($) => C.value = !C.value)
          }, " ⚙️ ", 8, Cs),
          B.value ? (c(), Q(y(r), {
            key: 0,
            visible: y(l) && C.value,
            anchor: M.value,
            "ai-request": L.value,
            onAccountReload: te,
            onClose: n[2] || (n[2] = ($) => C.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : w("", !0)
        ])
      ]),
      f.value ? (c(), u("p", Ts, v(f.value), 1)) : w("", !0),
      e("div", $s, [
        e("div", Ss, [
          e("aside", As, [
            e("div", {
              class: A(["fo-sidebar-toggle-bar", { "is-collapsed": g.value }]),
              title: g.value ? "点击展开快捷频道" : "点击收起快捷频道",
              onClick: n[3] || (n[3] = ($) => g.value = !g.value)
            }, [
              e("div", Gs, [
                n[16] || (n[16] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                n[17] || (n[17] = e("span", null, "快捷频道", -1)),
                g.value ? (c(), u("span", Hs, "3")) : w("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !g.value,
                title: g.value ? "展开" : "收起"
              }, [
                e("span", null, v(g.value ? "展开" : "收起"), 1),
                e("span", Ls, v(g.value ? "▾" : "▴"), 1)
              ], 8, xs)
            ], 10, Rs),
            g.value ? w("", !0) : (c(), u("div", Ds, [
              e("div", Is, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: A(["fo-sidebar-sub-btn", { on: o.value === "stars" }]),
                  title: "查看与管理 Star 星标仓库",
                  onClick: n[4] || (n[4] = ($) => E("stars"))
                }, [...n[18] || (n[18] = [
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
              e("div", Es, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: A(["fo-sidebar-sub-btn", { on: o.value === "trending" }]),
                  title: "查看 GitHub 实时趋势项目",
                  onClick: n[5] || (n[5] = ($) => E("trending"))
                }, [...n[19] || (n[19] = [
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
              e("div", Ns, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: A(["fo-sidebar-sub-btn", { on: o.value === "awesome" }]),
                  title: "查看 Awesome 精选开源资源清单",
                  onClick: n[6] || (n[6] = ($) => E("awesome"))
                }, [...n[20] || (n[20] = [
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
              e("div", Ms, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: A(["fo-sidebar-sub-btn", { on: o.value === "repos" }]),
                  title: "查看与管理我的仓库及 Topic 看板",
                  onClick: n[7] || (n[7] = ($) => E("repos"))
                }, [...n[21] || (n[21] = [
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
            e("header", Ps, [
              n[22] || (n[22] = e("div", null, [
                e("b", { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, [
                  e("i", { class: "fo-folder-icon" }),
                  Y(" 收藏文件夹")
                ]),
                e("small", { style: { color: "var(--dim)", "font-size": "9.5px" } }, "单一文件夹 · 独立正在使用")
              ], -1)),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: "新建文件夹",
                "aria-label": "新建文件夹",
                onClick: n[8] || (n[8] = ($) => y(S).promptCreateFolder())
              }, "＋")
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: ne
            }, [
              K(Re, { active: y(l) }, null, 8, ["active"])
            ])
          ]),
          e("section", Us, [
            o.value === "stars" && y(Ae).accountConfigured === !1 ? (c(), Q(De, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: n[9] || (n[9] = ($) => C.value = !0)
            })) : o.value === "stars" ? (c(), u(x, { key: 1 }, [
              e("header", Vs, [
                K(xe, { onOpenAiSettings: J })
              ]),
              n[23] || (n[23] = e("div", { class: "gh-main-subbar" }, [
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
              e("div", Fs, [
                K(Ge, {
                  active: y(l) && o.value === "stars"
                }, null, 8, ["active"])
              ]),
              n[24] || (n[24] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", Ws, [
                K(Le)
              ]),
              e("div", Os, [
                K(He, {
                  active: y(l) && o.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : o.value === "trending" ? (c(), Q(Ie, { key: 2 })) : o.value === "awesome" ? (c(), Q(tt, { key: 3 })) : o.value === "repos" ? (c(), Q(ds, {
              key: 4,
              active: y(l) && o.value === "repos"
            }, null, 8, ["active"])) : w("", !0)
          ])
        ])
      ])
    ], 10, ps));
  }
}), ea = /* @__PURE__ */ pe(Bs, [["__scopeId", "data-v-04024e84"]]);
export {
  ea as default
};
