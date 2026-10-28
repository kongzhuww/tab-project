import { d as ie, o as a, e as c, f as e, l as M, n as q, g as y, F as G, h as I, B as x, t as g, u as w, i as te, b as C, s as U, r as ue, x as ee, C as de, m as Q, k as Z, L as pe, z as me, H as ge, c as B, D as W, E as he } from "./vendor-vue-DokqDua_.js";
import { u as be } from "./useCardActivity-CORletQ-.js";
import { D as ne, E as re, t as A, y as fe } from "./search.service-D8BPpHmG.js";
import { _ as ve, a as ye, b as we, g as ce, G as _e, c as ke } from "./main-BypVWs23.js";
import { A as Ce } from "./AccountSetupGuide-b0Xd0kWd.js";
import Te from "./GitHubTrending-XU5BSiX3.js";
import { _ as le } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { s as oe } from "./storage-cache.service-BYF2zxXX.js";
import { r as $e } from "./view-styles-tviQK1Nj.js";
const Se = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], Ae = [
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
], Re = { class: "gh-awesome-wrapper" }, Ge = { class: "gh-awesome-header" }, He = { class: "gh-awesome-intro" }, xe = { class: "gh-awesome-search-box" }, Ie = { class: "gh-awesome-pills" }, Le = ["onClick"], Ne = { class: "gh-awesome-grid" }, Ee = ["onClick"], De = { class: "gh-awesome-card-head" }, Pe = { class: "gh-awesome-card-name" }, Me = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Ue = { class: "gh-awesome-desc" }, Oe = { class: "gh-awesome-footer" }, Fe = { class: "gh-awesome-tags" }, Ve = ["href"], je = {
  key: 0,
  class: "gh-awesome-empty"
}, ze = /* @__PURE__ */ ie({
  __name: "GitHubAwesome",
  setup(O) {
    const l = C("all"), n = C(""), m = U(() => {
      const f = n.value.trim().toLowerCase(), b = l.value;
      return Ae.filter((i) => b === "all" || i.category === b ? f ? i.name.toLowerCase().includes(f) || i.title.toLowerCase().includes(f) || i.desc.toLowerCase().includes(f) || i.tags.some((p) => p.toLowerCase().includes(f)) : !0 : !1);
    });
    function h(f) {
      window.open(f, "_blank", "noreferrer");
    }
    return (f, b) => (a(), c("div", Re, [
      e("header", Ge, [
        e("div", He, [
          b[3] || (b[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", xe, [
            M(e("input", {
              "onUpdate:modelValue": b[0] || (b[0] = (i) => n.value = i),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [q, n.value]
            ]),
            n.value ? (a(), c("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: b[1] || (b[1] = (i) => n.value = "")
            }, "✕")) : y("", !0)
          ])
        ]),
        e("div", Ie, [
          (a(!0), c(G, null, I(w(Se), (i) => (a(), c("button", {
            key: i.id,
            type: "button",
            class: x(["gh-awesome-pill", { active: l.value === i.id }]),
            onClick: (v) => l.value = i.id
          }, [
            e("span", null, g(i.icon), 1),
            e("b", null, g(i.name), 1)
          ], 10, Le))), 128))
        ])
      ]),
      e("div", Ne, [
        (a(!0), c(G, null, I(m.value, (i) => (a(), c("article", {
          key: i.id,
          class: "gh-awesome-card",
          onClick: (v) => h(i.url)
        }, [
          e("div", De, [
            e("div", Pe, [
              e("strong", null, g(i.title), 1),
              e("small", null, g(i.name), 1)
            ]),
            e("span", Me, "★ " + g(i.stars), 1)
          ]),
          e("p", Ue, g(i.desc), 1),
          e("div", Oe, [
            e("div", Fe, [
              (a(!0), c(G, null, I(i.tags, (v) => (a(), c("span", {
                key: v,
                class: "gh-awesome-tag"
              }, g(v), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: i.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: b[2] || (b[2] = te(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Ve)
          ])
        ], 8, Ee))), 128)),
        m.value.length ? y("", !0) : (a(), c("div", je, [...b[4] || (b[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Be = /* @__PURE__ */ le(ze, [["__scopeId", "data-v-28a8995f"]]), ae = "gh_my_repos_cache_v1", D = "gh_my_repo_custom_topics_v1", d = ue({
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
  let l = O.trim().toLowerCase();
  return l = l.replace(/[\s_]+/g, "-"), l = l.replace(/[^a-z0-9-]/g, ""), l = l.replace(/^-+|-+$/g, "").replace(/-+/g, "-"), l.length > 35 && (l = l.slice(0, 35).replace(/-+$/, "")), l;
}
class P {
  constructor() {
    this.abortController = null;
  }
  static getInstance() {
    return P.instance || (P.instance = new P()), P.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略）
   */
  async load(l = !1) {
    this.abortController?.abort(), this.abortController = new AbortController();
    const n = this.abortController.signal;
    await this.loadPersistedCustomTopics();
    const m = await oe.get(ae);
    if (m && m.length && (d.repos = m), !l && m && m.length) {
      this.fetchRemote(n).catch(() => {
      });
      return;
    }
    d.loading = !0, d.errorMessage = "";
    try {
      await this.fetchRemote(n);
    } catch (h) {
      if (h.name === "AbortError") return;
      d.errorMessage = h.message || "获取个人仓库失败";
    } finally {
      d.loading = !1;
    }
  }
  async fetchRemote(l) {
    const { ghUser: n, ghToken: m } = await ne();
    if (!n && !m) {
      d.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    let h = "https://api.github.com/user/repos?type=owner&sort=updated&per_page=100";
    m || (h = `https://api.github.com/users/${encodeURIComponent(n)}/repos?type=owner&sort=updated&per_page=100`);
    const f = re(m), b = await fetch(h, {
      method: "GET",
      headers: f,
      signal: l
    });
    if (!b.ok)
      throw b.status === 401 ? new Error("GitHub Token 无效或已过期，请在设置中更新。") : b.status === 403 ? new Error("GitHub API 频率受限或无权访问，请检查 Token 权限。") : new Error(`GitHub 请求失败 (HTTP ${b.status})`);
    const i = await b.json();
    if (!Array.isArray(i))
      throw new Error("GitHub 返回数据格式异常");
    const v = i.map((p) => ({
      id: p.id,
      name: p.name,
      fullName: p.full_name || `${p.owner?.login || n}/${p.name}`,
      description: p.description || "",
      isPrivate: !!p.private,
      isFork: !!p.fork,
      htmlUrl: p.html_url || `https://github.com/${n}/${p.name}`,
      language: p.language || null,
      stargazersCount: Number(p.stargazers_count) || 0,
      forksCount: Number(p.forks_count) || 0,
      openIssuesCount: Number(p.open_issues_count) || 0,
      topics: Array.isArray(p.topics) ? p.topics.map(($) => String($).toLowerCase()) : [],
      updatedAt: p.updated_at || "",
      pushedAt: p.pushed_at || "",
      defaultBranch: p.default_branch || "main"
    }));
    d.repos = v, await oe.set(ae, v, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 提交单个仓库的 Topics 到 GitHub 远端
   */
  async syncRepoTopics(l, n) {
    const { ghToken: m } = await ne();
    if (!m)
      return alert("向 GitHub 更新 Topic 需要在 GitHub 设置中配置具备 repo 写入权限的 Token。"), !1;
    const h = Array.from(new Set(n.map(N).filter(Boolean))).slice(0, 20), [f, b] = l.fullName.split("/"), i = `https://api.github.com/repos/${encodeURIComponent(f)}/${encodeURIComponent(b)}/topics`;
    d.syncingTopic = !0;
    try {
      const v = re(m), p = await fetch(i, {
        method: "PUT",
        headers: {
          ...v,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: h })
      });
      if (!p.ok)
        throw p.status === 401 || p.status === 403 ? new Error("Token 权限不足。修改 Topics 需要包含 repo（或 Administration:write）作用域。") : p.status === 404 ? new Error("仓库未找到或无权修改。") : new Error(`GitHub 远端保存失败 (HTTP ${p.status})`);
      const $ = await p.json(), T = Array.isArray($.names) ? $.names : h;
      return l.topics = T, await oe.set(ae, d.repos, { ttlMs: 30 * 86400 * 1e3 }), !0;
    } catch (v) {
      return alert(`更新 GitHub Topics 失败：${v.message || v}`), !1;
    } finally {
      d.syncingTopic = !1;
    }
  }
  /**
   * 将仓库添加到指定 Topic（若远端不存在则新增并提交）
   */
  async addRepoToTopic(l, n) {
    const m = N(n);
    if (!m) return !1;
    if (l.topics.includes(m)) return !0;
    const h = [...l.topics, m];
    return this.syncRepoTopics(l, h);
  }
  /**
   * 将仓库从指定 Topic 移除
   */
  async removeRepoFromTopic(l, n) {
    const m = N(n);
    if (!l.topics.includes(m)) return !0;
    const h = l.topics.filter((f) => f !== m);
    return this.syncRepoTopics(l, h);
  }
  /**
   * 新建一个 Topic 列（本地与远端集合）
   */
  async createTopicColumn(l) {
    const n = N(l);
    return n ? d.customTopicNames.includes(n) ? (alert(`Topic「${n}」板块已存在。`), null) : (d.customTopicNames.push(n), await this.persistCustomTopics(), n) : (alert("Topic 名称无效。GitHub 规范：仅限 1~35 位小写英文字母、数字和连字符 '-'。"), null);
  }
  /**
   * 重命名 Topic 列：同步将该板块下所有仓库的旧 Topic 替换为新 Topic 并提交到 GitHub
   */
  async renameTopicColumn(l, n) {
    const m = N(n);
    if (!m)
      return alert("新 Topic 名称无效。仅限小写英文、数字与中划线。"), !1;
    if (l === m) return !0;
    const h = d.repos.filter((f) => f.topics.includes(l));
    if (h.length > 0) {
      if (!confirm(
        `确定将板块「${l}」重命名为「${m}」吗？
这将调用 GitHub API 同步更新该板块下的 ${h.length} 个仓库的远端 Topic。`
      )) return !1;
      d.syncingTopic = !0;
      let b = 0, i = 0;
      for (const v of h) {
        const p = v.topics.map((T) => T === l ? m : T);
        await this.syncRepoTopics(v, p) ? b++ : i++;
      }
      d.syncingTopic = !1, i > 0 && alert(`重命名完成，成功更新 ${b} 个仓库，失败 ${i} 个。`);
    }
    return d.customTopicNames = d.customTopicNames.map((f) => f === l ? m : f), await this.persistCustomTopics(), !0;
  }
  /**
   * 删除 Topic 板块：从该板块下所有仓库中移除该 topic
   */
  async deleteTopicColumn(l) {
    const n = d.repos.filter((h) => h.topics.includes(l)), m = n.length > 0 ? `确定删除板块「${l}」吗？
将从该板块下的 ${n.length} 个仓库中移除此 Topic 并在 GitHub 远端同步。` : `确定删除空板块「${l}」吗？`;
    if (!confirm(m)) return !1;
    if (n.length > 0) {
      d.syncingTopic = !0;
      for (const h of n)
        await this.removeRepoFromTopic(h, l);
      d.syncingTopic = !1;
    }
    return d.customTopicNames = d.customTopicNames.filter((h) => h !== l), await this.persistCustomTopics(), !0;
  }
  async loadPersistedCustomTopics() {
    try {
      const n = (typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([D]) : { [D]: JSON.parse(localStorage.getItem(D) || "[]") })?.[D];
      Array.isArray(n) && (d.customTopicNames = n.map(N).filter(Boolean));
    } catch {
    }
  }
  async persistCustomTopics() {
    const l = Array.from(new Set(d.customTopicNames.map(N).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [D]: l }) : localStorage.setItem(D, JSON.stringify(l));
    } catch {
    }
  }
}
const R = P.getInstance(), We = { class: "my-repos-workspace" }, Qe = { class: "my-repos-header" }, qe = { class: "header-left" }, Ke = { class: "title" }, Je = { class: "count-pill" }, Ye = {
  key: 0,
  class: "sync-status spinning"
}, Xe = { class: "header-right" }, Ze = { class: "search-box" }, et = ["disabled"], tt = {
  key: 0,
  class: "error-banner"
}, st = { class: "board-viewport" }, ot = { class: "board-columns-track" }, at = { class: "column-header" }, nt = { class: "column-title-group" }, it = { class: "badge-count" }, lt = { class: "column-cards-scroll" }, rt = ["onDragstart"], ct = { class: "repo-card-head" }, ut = ["title", "onClick"], dt = {
  key: 0,
  class: "badge-repo-visibility private"
}, pt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, mt = ["title"], gt = {
  key: 1,
  class: "repo-topics-row"
}, ht = { class: "repo-card-footer" }, bt = { class: "meta-left" }, ft = {
  key: 0,
  class: "meta-item lang"
}, vt = { class: "meta-item" }, yt = {
  key: 1,
  class: "meta-item"
}, wt = ["title"], _t = {
  key: 0,
  class: "empty-column-placeholder"
}, kt = ["onDrop"], Ct = { class: "column-header" }, Tt = {
  key: 0,
  class: "column-title-group"
}, $t = ["title"], St = { class: "badge-count" }, At = {
  key: 1,
  class: "column-rename-group"
}, Rt = ["onKeydown"], Gt = ["onClick"], Ht = { class: "column-actions" }, xt = ["onClick"], It = {
  key: 0,
  class: "col-popover-menu"
}, Lt = ["onClick"], Nt = ["onClick"], Et = { class: "column-add-wrap" }, Dt = ["onClick"], Pt = {
  key: 1,
  class: "add-repo-picker"
}, Mt = { class: "picker-head" }, Ut = { class: "picker-list" }, Ot = ["onClick"], Ft = { class: "cand-name" }, Vt = { class: "cand-visibility" }, jt = {
  key: 0,
  class: "picker-empty"
}, zt = { class: "column-cards-scroll" }, Bt = ["onDragstart"], Wt = { class: "repo-card-head" }, Qt = ["title", "onClick"], qt = {
  key: 0,
  class: "badge-repo-visibility private"
}, Kt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Jt = ["title"], Yt = { class: "repo-topics-row" }, Xt = { class: "topic-chip active-chip" }, Zt = ["onClick"], es = { class: "repo-card-footer" }, ts = { class: "meta-left" }, ss = {
  key: 0,
  class: "meta-item lang"
}, os = { class: "meta-item" }, as = {
  key: 1,
  class: "meta-item"
}, ns = { class: "meta-date" }, is = {
  key: 0,
  class: "empty-column-placeholder"
}, ls = { class: "board-column new-column-slot" }, rs = {
  key: 1,
  class: "new-column-composer"
}, cs = { class: "composer-actions" }, us = /* @__PURE__ */ ie({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(O) {
    const l = O, n = C(""), m = C(!1), h = C(null), f = C(""), b = C(null), i = C(null), v = U(() => {
      const r = new Set(d.customTopicNames);
      for (const t of d.repos)
        for (const s of t.topics)
          s && r.add(s);
      return Array.from(r).sort();
    }), p = U(() => {
      const r = d.searchQuery.trim().toLowerCase();
      return r ? d.repos.filter(
        (t) => t.name.toLowerCase().includes(r) || t.description.toLowerCase().includes(r) || t.topics.some((s) => s.includes(r)) || t.language && t.language.toLowerCase().includes(r)
      ) : d.repos;
    }), $ = U(() => {
      const r = new Set(v.value);
      return p.value.filter((t) => t.topics.length ? !t.topics.some((s) => r.has(s)) : !0);
    });
    function T(r) {
      return p.value.filter((t) => t.topics.includes(r));
    }
    function F(r) {
      return d.repos.filter((t) => !t.topics.includes(r));
    }
    async function K() {
      const r = n.value.trim();
      if (!r) return;
      await R.createTopicColumn(r) && (n.value = "", m.value = !1);
    }
    function J(r) {
      b.value = r, f.value = r, h.value = null;
    }
    async function V(r) {
      const t = f.value.trim();
      if (!t || t === r) {
        b.value = null;
        return;
      }
      await R.renameTopicColumn(r, t) && (b.value = null);
    }
    async function L(r) {
      h.value = null, await R.deleteTopicColumn(r);
    }
    async function E(r, t) {
      await R.addRepoToTopic(r, t), i.value = null;
    }
    async function se(r, t) {
      await R.removeRepoFromTopic(r, t);
    }
    function j(r, t, s) {
      r.dataTransfer && (r.dataTransfer.setData("application/json", JSON.stringify({ repoId: t.id, fromTopic: s })), r.dataTransfer.effectAllowed = "move");
    }
    function z(r) {
      r.preventDefault(), r.dataTransfer && (r.dataTransfer.dropEffect = "move");
    }
    async function H(r, t) {
      if (r.preventDefault(), !!r.dataTransfer)
        try {
          const s = r.dataTransfer.getData("application/json");
          if (!s) return;
          const { repoId: u, fromTopic: k } = JSON.parse(s), _ = d.repos.find((o) => o.id === u);
          if (!_) return;
          if (t === "default")
            k && k !== "default" && await R.removeRepoFromTopic(_, k);
          else if (k && k !== "default" && k !== t) {
            const o = _.topics.filter((S) => S !== k);
            o.includes(t) || o.push(t), await R.syncRepoTopics(_, o);
          } else
            await R.addRepoToTopic(_, t);
        } catch {
        }
    }
    function Y(r) {
      window.open(r, "_blank", "noopener,noreferrer");
    }
    function X(r) {
      if (!r) return "";
      try {
        const t = new Date(r);
        return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ee(
      () => l.active,
      (r) => {
        r && !d.repos.length && R.load();
      },
      { immediate: !0 }
    ), de(() => {
      l.active && !d.repos.length && R.load();
    }), (r, t) => (a(), c("div", We, [
      e("header", Qe, [
        e("div", qe, [
          e("h2", Ke, [
            t[13] || (t[13] = e("span", { class: "icon" }, "📦", -1)),
            t[14] || (t[14] = e("span", null, "我的仓库 · Topic 看板", -1)),
            e("span", Je, g(w(d).repos.length) + " 个项目", 1)
          ]),
          w(d).syncingTopic ? (a(), c("span", Ye, [...t[15] || (t[15] = [
            e("i", { class: "spin-icon" }, "⏳", -1),
            Q(" 正在同步 GitHub 远端 Topics… ", -1)
          ])])) : y("", !0)
        ]),
        e("div", Xe, [
          e("div", Ze, [
            M(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (s) => w(d).searchQuery = s),
              type: "text",
              placeholder: "过滤仓库名 / 描述 / 标签...",
              class: "search-input"
            }, null, 512), [
              [q, w(d).searchQuery]
            ]),
            w(d).searchQuery ? (a(), c("button", {
              key: 0,
              type: "button",
              class: "clear-btn",
              onClick: t[1] || (t[1] = (s) => w(d).searchQuery = "")
            }, "✕")) : y("", !0)
          ]),
          e("button", {
            type: "button",
            class: "btn-refresh",
            disabled: w(d).loading || w(d).syncingTopic,
            title: "重新从 GitHub 拉取仓库列表",
            onClick: t[2] || (t[2] = (s) => w(R).load(!0))
          }, [
            e("span", {
              class: x({ spinning: w(d).loading })
            }, "🔄", 2),
            e("span", null, g(w(d).loading ? "正在刷新…" : "刷新仓库"), 1)
          ], 8, et)
        ])
      ]),
      w(d).errorMessage ? (a(), c("div", tt, [
        e("span", null, "⚠️ " + g(w(d).errorMessage), 1),
        e("button", {
          type: "button",
          onClick: t[3] || (t[3] = (s) => w(R).load(!0))
        }, "重试")
      ])) : y("", !0),
      e("div", st, [
        e("div", ot, [
          e("section", {
            class: "board-column default-column",
            onDragover: z,
            onDrop: t[4] || (t[4] = (s) => H(s, "default"))
          }, [
            e("header", at, [
              e("div", nt, [
                t[16] || (t[16] = e("span", { class: "col-dot default-dot" }, null, -1)),
                t[17] || (t[17] = e("h3", { class: "column-title" }, "默认板块", -1)),
                e("span", it, g($.value.length), 1)
              ]),
              t[18] || (t[18] = e("div", { class: "column-actions" }, [
                e("span", {
                  class: "column-hint",
                  title: "未分配到右侧任何 Topic 的项目自动归入此板块"
                }, "未归类")
              ], -1))
            ]),
            e("div", lt, [
              (a(!0), c(G, null, I($.value, (s) => (a(), c("div", {
                key: s.id,
                class: "repo-card",
                draggable: "true",
                onDragstart: (u) => j(u, s, "default")
              }, [
                e("div", ct, [
                  e("span", {
                    class: "repo-name",
                    title: s.fullName,
                    onClick: (u) => Y(s.htmlUrl)
                  }, g(s.name), 9, ut),
                  s.isPrivate ? (a(), c("span", dt, "私有")) : y("", !0),
                  s.isFork ? (a(), c("span", pt, "Fork")) : y("", !0)
                ]),
                s.description ? (a(), c("p", {
                  key: 0,
                  class: "repo-desc",
                  title: s.description
                }, g(s.description), 9, mt)) : y("", !0),
                s.topics.length ? (a(), c("div", gt, [
                  (a(!0), c(G, null, I(s.topics, (u) => (a(), c("span", {
                    key: u,
                    class: "topic-chip"
                  }, " #" + g(u), 1))), 128))
                ])) : y("", !0),
                e("div", ht, [
                  e("div", bt, [
                    s.language ? (a(), c("span", ft, [
                      t[19] || (t[19] = e("span", { class: "lang-color" }, null, -1)),
                      Q(g(s.language), 1)
                    ])) : y("", !0),
                    e("span", vt, "⭐ " + g(s.stargazersCount), 1),
                    s.forksCount ? (a(), c("span", yt, "🍴 " + g(s.forksCount), 1)) : y("", !0)
                  ]),
                  e("span", {
                    class: "meta-date",
                    title: "最后更新：" + s.updatedAt
                  }, g(X(s.pushedAt || s.updatedAt)), 9, wt)
                ])
              ], 40, rt))), 128)),
              $.value.length ? y("", !0) : (a(), c("div", _t, [...t[20] || (t[20] = [
                e("span", null, "暂无未分类仓库", -1)
              ])]))
            ])
          ], 32),
          (a(!0), c(G, null, I(v.value, (s) => (a(), c("section", {
            key: s,
            class: "board-column topic-column",
            onDragover: z,
            onDrop: (u) => H(u, s)
          }, [
            e("header", Ct, [
              b.value !== s ? (a(), c("div", Tt, [
                t[21] || (t[21] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "GitHub Topic: " + s
                }, " #" + g(s), 9, $t),
                e("span", St, g(T(s).length), 1)
              ])) : (a(), c("div", At, [
                M(e("input", {
                  "onUpdate:modelValue": t[5] || (t[5] = (u) => f.value = u),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    Z((u) => V(s), ["enter"]),
                    t[6] || (t[6] = Z((u) => b.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, Rt), [
                  [q, f.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (u) => V(s)
                }, "✓", 8, Gt),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: t[7] || (t[7] = (u) => b.value = null)
                }, "✕")
              ])),
              e("div", Ht, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "板块操作（重命名 / 删除）",
                  onClick: (u) => h.value = h.value === s ? null : s
                }, "•••", 8, xt),
                h.value === s ? (a(), c("div", It, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (u) => J(s)
                  }, " ✏️ 重命名 Topic 并同步 ", 8, Lt),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (u) => L(s)
                  }, " 🗑️ 删除板块并从远端移除 ", 8, Nt)
                ])) : y("", !0)
              ])
            ]),
            e("div", Et, [
              i.value !== s ? (a(), c("button", {
                key: 0,
                type: "button",
                class: "btn-column-add",
                onClick: (u) => i.value = s
              }, " ＋ 添加仓库到此 Topic ", 8, Dt)) : (a(), c("div", Pt, [
                e("div", Mt, [
                  e("span", null, "选择要加入 #" + g(s) + " 的仓库：", 1),
                  e("button", {
                    type: "button",
                    class: "picker-close",
                    onClick: t[8] || (t[8] = (u) => i.value = null)
                  }, "✕")
                ]),
                e("div", Ut, [
                  (a(!0), c(G, null, I(F(s), (u) => (a(), c("button", {
                    key: u.id,
                    type: "button",
                    class: "picker-repo-item",
                    onClick: (k) => E(u, s)
                  }, [
                    e("span", Ft, g(u.name), 1),
                    e("span", Vt, g(u.isPrivate ? "私有" : "公开"), 1)
                  ], 8, Ot))), 128)),
                  F(s).length ? y("", !0) : (a(), c("div", jt, " 全部仓库均已加入此 Topic "))
                ])
              ]))
            ]),
            e("div", zt, [
              (a(!0), c(G, null, I(T(s), (u) => (a(), c("div", {
                key: u.id,
                class: "repo-card",
                draggable: "true",
                onDragstart: (k) => j(k, u, s)
              }, [
                e("div", Wt, [
                  e("span", {
                    class: "repo-name",
                    title: u.fullName,
                    onClick: (k) => Y(u.htmlUrl)
                  }, g(u.name), 9, Qt),
                  u.isPrivate ? (a(), c("span", qt, "私有")) : y("", !0),
                  u.isFork ? (a(), c("span", Kt, "Fork")) : y("", !0)
                ]),
                u.description ? (a(), c("p", {
                  key: 0,
                  class: "repo-desc",
                  title: u.description
                }, g(u.description), 9, Jt)) : y("", !0),
                e("div", Yt, [
                  e("span", Xt, [
                    Q(" #" + g(s) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从当前 Topic 移除并同步到 GitHub",
                      onClick: te((k) => se(u, s), ["stop"])
                    }, "✕", 8, Zt)
                  ]),
                  (a(!0), c(G, null, I(u.topics.filter((k) => k !== s), (k) => (a(), c("span", {
                    key: k,
                    class: "topic-chip other-chip"
                  }, " #" + g(k), 1))), 128))
                ]),
                e("div", es, [
                  e("div", ts, [
                    u.language ? (a(), c("span", ss, [
                      t[22] || (t[22] = e("span", { class: "lang-color" }, null, -1)),
                      Q(g(u.language), 1)
                    ])) : y("", !0),
                    e("span", os, "⭐ " + g(u.stargazersCount), 1),
                    u.forksCount ? (a(), c("span", as, "🍴 " + g(u.forksCount), 1)) : y("", !0)
                  ]),
                  e("span", ns, g(X(u.pushedAt || u.updatedAt)), 1)
                ])
              ], 40, Bt))), 128)),
              T(s).length ? y("", !0) : (a(), c("div", is, [...t[23] || (t[23] = [
                e("span", null, "暂无项目，可从左侧拖拽或点击上方添加", -1)
              ])]))
            ])
          ], 40, kt))), 128)),
          e("section", ls, [
            m.value ? (a(), c("div", rs, [
              t[25] || (t[25] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建 Topic 分组"),
                e("small", null, "将作为 GitHub 远端标签同步")
              ], -1)),
              M(e("input", {
                "onUpdate:modelValue": t[10] || (t[10] = (s) => n.value = s),
                type: "text",
                placeholder: "例如 tools, vue3, robotics...",
                class: "composer-input",
                onKeydown: [
                  Z(K, ["enter"]),
                  t[11] || (t[11] = Z((s) => m.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [q, n.value]
              ]),
              e("div", cs, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: K
                }, "创建板块"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: t[12] || (t[12] = (s) => m.value = !1)
                }, "取消")
              ])
            ])) : (a(), c("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: t[9] || (t[9] = (s) => m.value = !0)
            }, [...t[24] || (t[24] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建 Topic 板块", -1)
            ])]))
          ])
        ])
      ])
    ]));
  }
}), ds = /* @__PURE__ */ le(us, [["__scopeId", "data-v-2fb3c6ab"]]), ps = ["inert"], ms = { class: "card-head" }, gs = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, hs = ["title"], bs = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, fs = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, vs = ["placeholder"], ys = ["title"], ws = { class: "gh-search-rule-icon" }, _s = { class: "gh-search-rule-text" }, ks = { class: "gh-settings-anchor" }, Cs = ["aria-expanded"], Ts = {
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
}, xs = ["aria-expanded", "title"], Is = { class: "fo-sidebar-toggle-chevron" }, Ls = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, Ns = { class: "fo-sidebar-sub-wrap" }, Es = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Ds = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Ps = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Ms = { class: "gh-bili-sidebar-head" }, Us = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, Os = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Fs = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, Vs = { id: "vue-github-status-root" }, js = { id: "vue-github-repositories-root" }, zs = /* @__PURE__ */ ie({
  __name: "GitHubWorkspaceCard",
  setup(O) {
    const l = he(() => import("./GitHubSettingsModal-C-CAi-mE.js")), { active: n } = be("card-github", "/github.html");
    let m = 0, h = !1, f;
    const b = C(""), i = C("stars");
    ee(() => n.value && i.value === "stars", (_) => A.setAiViewActive(_), { immediate: !0, flush: "sync" });
    const v = C(!1), p = C("local"), $ = C(""), T = C(!1), F = C(0);
    function K() {
      n.value && (T.value = !0, ++F.value);
    }
    const J = C(!1);
    ee(T, (_) => {
      _ && (J.value = !0);
    });
    const V = C(null);
    let L = 0;
    function E(_) {
      i.value = _, _ === "trending" ? ce.switchTab("trending") : ce.switchTab("stars");
    }
    function se() {
      i.value = "stars";
    }
    const j = [
      { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
      { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
      { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
      { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
    ], z = C(A.searchRule || "exact"), H = U(() => j.find((_) => _.id === z.value) || j[0]);
    function Y() {
      const _ = A.cycleSearchRule();
      z.value = _;
    }
    const X = U(() => p.value === "global" ? "在 GitHub 全网搜索开源仓库…" : `在当前分类中${H.value.name}搜索 Star 仓库…`);
    function r() {
      clearTimeout(L), !(!n.value || p.value !== "local") && (L = window.setTimeout(() => A.setSearchQuery($.value.trim().toLowerCase()), 180));
    }
    function t() {
      p.value = p.value === "local" ? "global" : "local", p.value === "local" && r();
    }
    function s() {
      $.value = "", clearTimeout(L), A.resetLocalSearch();
    }
    function u() {
      const _ = $.value.trim();
      p.value === "local" ? (clearTimeout(L), A.setSearchQuery(_.toLowerCase())) : _ && window.open(`https://github.com/search?q=${encodeURIComponent(_)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function k() {
      ++m, h = !0, b.value = "";
    }
    return ee(n, async (_) => {
      const o = ++m;
      if (clearTimeout(L), f?.abort(), f = new AbortController(), _ || f.abort(), A.setRepositoryViewSignal(f.signal), !!_) {
        if (h) {
          await A.resumeRepositoryReads();
          return;
        }
        if (A.repos.length || A.loadingAllStars || A.loadingPage) {
          h = !0;
          return;
        }
        try {
          const S = await ne();
          if (!n.value || o !== m) return;
          h = !0, await A.loadGitHub(S.ghUser, S.ghToken);
        } catch {
          if (!n.value || o !== m) return;
          h = !1, b.value = "GitHub 初始化失败；请检查设置，或重新进入后重试。";
        }
      }
    }, { immediate: !0, flush: "sync" }), pe(() => {
      A.setAiViewActive(!1), ++m, f?.abort(), clearTimeout(L);
    }), (_, o) => (a(), c("section", {
      class: x(["card wide", { "card-fullscreen": w($e).activeId === "card-github" }]),
      id: "card-github",
      inert: !w(n)
    }, [
      e("header", ms, [
        o[13] || (o[13] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        o[14] || (o[14] = e("h2", null, "GitHub", -1)),
        o[15] || (o[15] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", gs, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: te(u, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: p.value === "local" ? "切换为 GitHub 全站搜索" : "切换为当前分类搜索",
              onClick: t
            }, [
              e("span", bs, g(p.value === "local" ? "⭐" : "🌐"), 1),
              e("span", fs, g(p.value === "local" ? "当前分类" : "GitHub 全站"), 1),
              o[10] || (o[10] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, hs),
            M(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": o[0] || (o[0] = (S) => $.value = S),
              placeholder: X.value,
              autocomplete: "off",
              onInput: r
            }, null, 40, vs), [
              [q, $.value]
            ]),
            p.value === "local" ? (a(), c("button", {
              key: 0,
              type: "button",
              class: x(["gh-search-rule-btn", `rule-${H.value.id}`]),
              title: `当前匹配规则：${H.value.name}（${H.value.desc}）
点击切换下一个规则`,
              onClick: te(Y, ["stop"])
            }, [
              e("span", ws, g(H.value.icon), 1),
              e("span", _s, g(H.value.name), 1)
            ], 10, ys)) : y("", !0),
            M(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: "清空搜索",
              onClick: s
            }, "✕", 512), [
              [me, $.value]
            ]),
            o[11] || (o[11] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          o[12] || (o[12] = ge('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-04024e84><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-04024e84><input type="checkbox" value="exact" checked data-v-04024e84>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-04024e84><input type="checkbox" value="loose" data-v-04024e84>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-04024e84><input type="checkbox" value="related" data-v-04024e84>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-04024e84><input type="checkbox" value="topic" data-v-04024e84>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-04024e84><input type="checkbox" value="readme" data-v-04024e84>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-04024e84></div>', 2))
        ]),
        e("div", ks, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: V,
            "aria-expanded": T.value,
            "aria-label": "GitHub 设置",
            class: "gh-head-settings-btn",
            title: "GitHub 模组偏好设置 (账号、Token、AI模型、缓存)",
            onClick: o[1] || (o[1] = (S) => T.value = !T.value)
          }, " ⚙️ ", 8, Cs),
          J.value ? (a(), B(w(l), {
            key: 0,
            visible: w(n) && T.value,
            anchor: V.value,
            "ai-request": F.value,
            onAccountReload: k,
            onClose: o[2] || (o[2] = (S) => T.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : y("", !0)
        ])
      ]),
      b.value ? (a(), c("p", Ts, g(b.value), 1)) : y("", !0),
      e("div", $s, [
        e("div", Ss, [
          e("aside", As, [
            e("div", {
              class: x(["fo-sidebar-toggle-bar", { "is-collapsed": v.value }]),
              title: v.value ? "点击展开快捷频道" : "点击收起快捷频道",
              onClick: o[3] || (o[3] = (S) => v.value = !v.value)
            }, [
              e("div", Gs, [
                o[16] || (o[16] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                o[17] || (o[17] = e("span", null, "快捷频道", -1)),
                v.value ? (a(), c("span", Hs, "3")) : y("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !v.value,
                title: v.value ? "展开" : "收起"
              }, [
                e("span", null, g(v.value ? "展开" : "收起"), 1),
                e("span", Is, g(v.value ? "▾" : "▴"), 1)
              ], 8, xs)
            ], 10, Rs),
            v.value ? y("", !0) : (a(), c("div", Ls, [
              e("div", Ns, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: x(["fo-sidebar-sub-btn", { on: i.value === "stars" }]),
                  title: "查看与管理 Star 星标仓库",
                  onClick: o[4] || (o[4] = (S) => E("stars"))
                }, [...o[18] || (o[18] = [
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
                  class: x(["fo-sidebar-sub-btn", { on: i.value === "trending" }]),
                  title: "查看 GitHub 实时趋势项目",
                  onClick: o[5] || (o[5] = (S) => E("trending"))
                }, [...o[19] || (o[19] = [
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
              e("div", Ds, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: x(["fo-sidebar-sub-btn", { on: i.value === "awesome" }]),
                  title: "查看 Awesome 精选开源资源清单",
                  onClick: o[6] || (o[6] = (S) => E("awesome"))
                }, [...o[20] || (o[20] = [
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
              e("div", Ps, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: x(["fo-sidebar-sub-btn", { on: i.value === "repos" }]),
                  title: "查看与管理我的仓库及 Topic 看板",
                  onClick: o[7] || (o[7] = (S) => E("repos"))
                }, [...o[21] || (o[21] = [
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
            e("header", Ms, [
              o[22] || (o[22] = e("div", null, [
                e("b", { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, [
                  e("i", { class: "fo-folder-icon" }),
                  Q(" 收藏文件夹")
                ]),
                e("small", { style: { color: "var(--dim)", "font-size": "9.5px" } }, "单一文件夹 · 独立正在使用")
              ], -1)),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: "新建文件夹",
                "aria-label": "新建文件夹",
                onClick: o[8] || (o[8] = (S) => w(A).promptCreateFolder())
              }, "＋")
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: se
            }, [
              W(ve, { active: w(n) }, null, 8, ["active"])
            ])
          ]),
          e("section", Us, [
            i.value === "stars" && w(fe).accountConfigured === !1 ? (a(), B(Ce, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: o[9] || (o[9] = (S) => T.value = !0)
            })) : i.value === "stars" ? (a(), c(G, { key: 1 }, [
              e("header", Os, [
                W(_e, { onOpenAiSettings: K })
              ]),
              o[23] || (o[23] = e("div", { class: "gh-main-subbar" }, [
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
                W(ye, {
                  active: w(n) && i.value === "stars"
                }, null, 8, ["active"])
              ]),
              o[24] || (o[24] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", Vs, [
                W(ke)
              ]),
              e("div", js, [
                W(we, {
                  active: w(n) && i.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : i.value === "trending" ? (a(), B(Te, { key: 2 })) : i.value === "awesome" ? (a(), B(Be, { key: 3 })) : i.value === "repos" ? (a(), B(ds, {
              key: 4,
              active: w(n) && i.value === "repos"
            }, null, 8, ["active"])) : y("", !0)
          ])
        ])
      ])
    ], 10, ps));
  }
}), eo = /* @__PURE__ */ le(zs, [["__scopeId", "data-v-04024e84"]]);
export {
  eo as default
};
