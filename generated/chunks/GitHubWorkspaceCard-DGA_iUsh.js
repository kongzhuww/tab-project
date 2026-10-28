import { d as re, o as n, e as c, f as e, l as E, n as Q, g as b, F as A, h as G, B as $, t as m, u as y, i as ae, b as w, s as P, r as me, x as oe, C as ge, m as W, k as se, L as he, z as fe, H as ve, c as z, D as B, E as be } from "./vendor-vue-DokqDua_.js";
import { u as ye } from "./useCardActivity-BTQ9Of3S.js";
import { D as le, E as ue, t as C, y as we } from "./search.service-D8BPpHmG.js";
import { _ as ke, a as _e, b as Ce, g as de, G as Te, c as $e } from "./main-B0_cYACj.js";
import { A as Se } from "./AccountSetupGuide-b0Xd0kWd.js";
import Ae from "./GitHubTrending-kh4jgNX9.js";
import { _ as ce } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { s as ne } from "./storage-cache.service-BYF2zxXX.js";
import { r as Re } from "./view-styles-BdZfWnGM.js";
const Ge = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], He = [
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
], xe = { class: "gh-awesome-wrapper" }, Le = { class: "gh-awesome-header" }, Ie = { class: "gh-awesome-intro" }, De = { class: "gh-awesome-search-box" }, Ne = { class: "gh-awesome-pills" }, Ee = ["onClick"], Pe = { class: "gh-awesome-grid" }, Me = ["onClick"], Ue = { class: "gh-awesome-card-head" }, Fe = { class: "gh-awesome-card-name" }, Oe = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Ve = { class: "gh-awesome-desc" }, je = { class: "gh-awesome-footer" }, ze = { class: "gh-awesome-tags" }, Be = ["href"], We = {
  key: 0,
  class: "gh-awesome-empty"
}, Qe = /* @__PURE__ */ re({
  __name: "GitHubAwesome",
  setup(M) {
    const r = w("all"), i = w(""), p = P(() => {
      const v = i.value.trim().toLowerCase(), h = r.value;
      return He.filter((l) => h === "all" || l.category === h ? v ? l.name.toLowerCase().includes(v) || l.title.toLowerCase().includes(v) || l.desc.toLowerCase().includes(v) || l.tags.some((u) => u.toLowerCase().includes(v)) : !0 : !1);
    });
    function g(v) {
      window.open(v, "_blank", "noreferrer");
    }
    return (v, h) => (n(), c("div", xe, [
      e("header", Le, [
        e("div", Ie, [
          h[3] || (h[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", De, [
            E(e("input", {
              "onUpdate:modelValue": h[0] || (h[0] = (l) => i.value = l),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [Q, i.value]
            ]),
            i.value ? (n(), c("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: h[1] || (h[1] = (l) => i.value = "")
            }, "✕")) : b("", !0)
          ])
        ]),
        e("div", Ne, [
          (n(!0), c(A, null, G(y(Ge), (l) => (n(), c("button", {
            key: l.id,
            type: "button",
            class: $(["gh-awesome-pill", { active: r.value === l.id }]),
            onClick: (f) => r.value = l.id
          }, [
            e("span", null, m(l.icon), 1),
            e("b", null, m(l.name), 1)
          ], 10, Ee))), 128))
        ])
      ]),
      e("div", Pe, [
        (n(!0), c(A, null, G(p.value, (l) => (n(), c("article", {
          key: l.id,
          class: "gh-awesome-card",
          onClick: (f) => g(l.url)
        }, [
          e("div", Ue, [
            e("div", Fe, [
              e("strong", null, m(l.title), 1),
              e("small", null, m(l.name), 1)
            ]),
            e("span", Oe, "★ " + m(l.stars), 1)
          ]),
          e("p", Ve, m(l.desc), 1),
          e("div", je, [
            e("div", ze, [
              (n(!0), c(A, null, G(l.tags, (f) => (n(), c("span", {
                key: f,
                class: "gh-awesome-tag"
              }, m(f), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: l.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: h[2] || (h[2] = ae(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Be)
          ])
        ], 8, Me))), 128)),
        p.value.length ? b("", !0) : (n(), c("div", We, [...h[4] || (h[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), qe = /* @__PURE__ */ ce(Qe, [["__scopeId", "data-v-28a8995f"]]), ie = "gh_my_repos_cache_v1", D = "gh_my_repo_custom_topics_v1", d = me({
  loading: !1,
  syncingTopic: !1,
  errorMessage: "",
  repos: [],
  customTopicNames: [],
  searchQuery: "",
  editingColumnTopic: null,
  composerActiveColumnId: null
});
function x(M) {
  let r = M.trim().toLowerCase();
  return r = r.replace(/[\s_]+/g, "-"), r = r.replace(/[^a-z0-9-]/g, ""), r = r.replace(/^-+|-+$/g, "").replace(/-+/g, "-"), r.length > 35 && (r = r.slice(0, 35).replace(/-+$/, "")), r;
}
class N {
  constructor() {
    this.abortController = null;
  }
  static getInstance() {
    return N.instance || (N.instance = new N()), N.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略）
   */
  async load(r = !1) {
    this.abortController?.abort(), this.abortController = new AbortController();
    const i = this.abortController.signal;
    await this.loadPersistedCustomTopics();
    const p = await ne.get(ie);
    if (p && p.length && (d.repos = p), !r && p && p.length) {
      this.fetchRemote(i).catch(() => {
      });
      return;
    }
    d.loading = !0, d.errorMessage = "";
    try {
      await this.fetchRemote(i);
    } catch (g) {
      if (g.name === "AbortError") return;
      d.errorMessage = g.message || "获取个人仓库失败";
    } finally {
      d.loading = !1;
    }
  }
  async fetchRemote(r) {
    const { ghUser: i, ghToken: p } = await le();
    if (!i && !p) {
      d.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    let g = "https://api.github.com/user/repos?type=owner&sort=updated&per_page=100";
    p || (g = `https://api.github.com/users/${encodeURIComponent(i)}/repos?type=owner&sort=updated&per_page=100`);
    const v = ue(p), h = await fetch(g, {
      method: "GET",
      headers: v,
      signal: r
    });
    if (!h.ok)
      throw h.status === 401 ? new Error("GitHub Token 无效或已过期，请在设置中更新。") : h.status === 403 ? new Error("GitHub API 频率受限或无权访问，请检查 Token 权限。") : new Error(`GitHub 请求失败 (HTTP ${h.status})`);
    const l = await h.json();
    if (!Array.isArray(l))
      throw new Error("GitHub 返回数据格式异常");
    const f = l.map((u) => ({
      id: u.id,
      name: u.name,
      fullName: u.full_name || `${u.owner?.login || i}/${u.name}`,
      description: u.description || "",
      isPrivate: !!u.private,
      isFork: !!u.fork,
      htmlUrl: u.html_url || `https://github.com/${i}/${u.name}`,
      language: u.language || null,
      stargazersCount: Number(u.stargazers_count) || 0,
      forksCount: Number(u.forks_count) || 0,
      openIssuesCount: Number(u.open_issues_count) || 0,
      topics: Array.isArray(u.topics) ? u.topics.map((k) => String(k).toLowerCase()) : [],
      updatedAt: u.updated_at || "",
      pushedAt: u.pushed_at || "",
      defaultBranch: u.default_branch || "main"
    }));
    d.repos = f, await ne.set(ie, f, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 提交单个仓库的 Topics 到 GitHub 远端
   */
  async syncRepoTopics(r, i) {
    const { ghToken: p } = await le();
    if (!p)
      return alert("向 GitHub 更新 Topic 需要在 GitHub 设置中配置具备 repo 写入权限的 Token。"), !1;
    const g = Array.from(new Set(i.map(x).filter(Boolean))).slice(0, 20), [v, h] = r.fullName.split("/"), l = `https://api.github.com/repos/${encodeURIComponent(v)}/${encodeURIComponent(h)}/topics`;
    d.syncingTopic = !0;
    try {
      const f = ue(p), u = await fetch(l, {
        method: "PUT",
        headers: {
          ...f,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: g })
      });
      if (!u.ok)
        throw u.status === 401 || u.status === 403 ? new Error("Token 权限不足。修改 Topics 需要包含 repo（或 Administration:write）作用域。") : u.status === 404 ? new Error("仓库未找到或无权修改。") : new Error(`GitHub 远端保存失败 (HTTP ${u.status})`);
      const k = await u.json(), _ = Array.isArray(k.names) ? k.names : g;
      return r.topics = _, await ne.set(ie, d.repos, { ttlMs: 30 * 86400 * 1e3 }), !0;
    } catch (f) {
      return alert(`更新 GitHub Topics 失败：${f.message || f}`), !1;
    } finally {
      d.syncingTopic = !1;
    }
  }
  /**
   * 将仓库添加到指定 Topic（若远端不存在则新增并提交）
   */
  async addRepoToTopic(r, i) {
    const p = x(i);
    if (!p) return !1;
    if (r.topics.includes(p)) return !0;
    const g = [...r.topics, p];
    return this.syncRepoTopics(r, g);
  }
  /**
   * 将仓库从指定 Topic 移除
   */
  async removeRepoFromTopic(r, i) {
    const p = x(i);
    if (!r.topics.includes(p)) return !0;
    const g = r.topics.filter((v) => v !== p);
    return this.syncRepoTopics(r, g);
  }
  /**
   * 新建一个 Topic 列（本地与远端集合）
   */
  async createTopicColumn(r) {
    const i = x(r);
    return i ? d.customTopicNames.includes(i) ? (alert(`Topic「${i}」板块已存在。`), null) : (d.customTopicNames.push(i), await this.persistCustomTopics(), i) : (alert("Topic 名称无效。GitHub 规范：仅限 1~35 位小写英文字母、数字和连字符 '-'。"), null);
  }
  /**
   * 重命名 Topic 列：同步将该板块下所有仓库的旧 Topic 替换为新 Topic 并提交到 GitHub
   */
  async renameTopicColumn(r, i) {
    const p = x(i);
    if (!p)
      return alert("新 Topic 名称无效。仅限小写英文、数字与中划线。"), !1;
    if (r === p) return !0;
    const g = d.repos.filter((v) => v.topics.includes(r));
    if (g.length > 0) {
      if (!confirm(
        `确定将板块「${r}」重命名为「${p}」吗？
这将调用 GitHub API 同步更新该板块下的 ${g.length} 个仓库的远端 Topic。`
      )) return !1;
      d.syncingTopic = !0;
      let h = 0, l = 0;
      for (const f of g) {
        const u = f.topics.map((_) => _ === r ? p : _);
        await this.syncRepoTopics(f, u) ? h++ : l++;
      }
      d.syncingTopic = !1, l > 0 && alert(`重命名完成，成功更新 ${h} 个仓库，失败 ${l} 个。`);
    }
    return d.customTopicNames = d.customTopicNames.map((v) => v === r ? p : v), await this.persistCustomTopics(), !0;
  }
  /**
   * 删除 Topic 板块：从该板块下所有仓库中移除该 topic
   */
  async deleteTopicColumn(r) {
    const i = d.repos.filter((g) => g.topics.includes(r)), p = i.length > 0 ? `确定删除板块「${r}」吗？
将从该板块下的 ${i.length} 个仓库中移除此 Topic 并在 GitHub 远端同步。` : `确定删除空板块「${r}」吗？`;
    if (!confirm(p)) return !1;
    if (i.length > 0) {
      d.syncingTopic = !0;
      for (const g of i)
        await this.removeRepoFromTopic(g, r);
      d.syncingTopic = !1;
    }
    return d.customTopicNames = d.customTopicNames.filter((g) => g !== r), await this.persistCustomTopics(), !0;
  }
  async loadPersistedCustomTopics() {
    try {
      const i = (typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([D]) : { [D]: JSON.parse(localStorage.getItem(D) || "[]") })?.[D];
      Array.isArray(i) && (d.customTopicNames = i.map(x).filter(Boolean));
    } catch {
    }
  }
  async persistCustomTopics() {
    const r = Array.from(new Set(d.customTopicNames.map(x).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [D]: r }) : localStorage.setItem(D, JSON.stringify(r));
    } catch {
    }
  }
}
const S = N.getInstance(), Ke = { class: "my-repos-workspace" }, Je = { class: "my-repos-header" }, Ye = { class: "header-left" }, Xe = { class: "title" }, Ze = { class: "count-pill" }, et = {
  key: 0,
  class: "sync-status"
}, tt = { class: "header-right" }, st = { class: "search-box" }, ot = ["disabled"], at = {
  key: 0,
  class: "error-banner"
}, nt = { class: "board-viewport" }, it = { class: "board-columns-track" }, lt = { class: "column-header" }, rt = { class: "column-title-group" }, ct = { class: "badge-count" }, ut = { class: "column-cards-scroll" }, dt = ["onDragstart"], pt = { class: "repo-card-head" }, mt = ["title", "onClick"], gt = {
  key: 0,
  class: "badge-repo-visibility private"
}, ht = {
  key: 1,
  class: "badge-repo-visibility fork"
}, ft = ["title"], vt = {
  key: 1,
  class: "repo-topics-row"
}, bt = { class: "repo-card-footer" }, yt = { class: "meta-left" }, wt = {
  key: 0,
  class: "meta-item lang"
}, kt = { class: "meta-item" }, _t = {
  key: 1,
  class: "meta-item"
}, Ct = ["title"], Tt = {
  key: 0,
  class: "empty-column-placeholder"
}, $t = ["onDragover", "onDragleave", "onDrop"], St = { class: "column-header" }, At = {
  key: 0,
  class: "column-title-group"
}, Rt = ["title"], Gt = { class: "badge-count" }, Ht = {
  key: 1,
  class: "column-rename-group"
}, xt = ["onKeydown"], Lt = ["onClick"], It = { class: "column-actions" }, Dt = ["onClick"], Nt = {
  key: 0,
  class: "col-popover-menu"
}, Et = ["onClick"], Pt = ["onClick"], Mt = { class: "column-add-wrap" }, Ut = ["onClick"], Ft = {
  key: 1,
  class: "add-repo-picker"
}, Ot = { class: "picker-head" }, Vt = { class: "picker-list" }, jt = ["onClick"], zt = { class: "cand-name" }, Bt = { class: "cand-visibility" }, Wt = {
  key: 0,
  class: "picker-empty"
}, Qt = { class: "column-cards-scroll" }, qt = ["onDragstart"], Kt = { class: "repo-card-head" }, Jt = ["title", "onClick"], Yt = {
  key: 0,
  class: "badge-repo-visibility private"
}, Xt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Zt = ["title"], es = { class: "repo-topics-row" }, ts = { class: "topic-chip active-chip" }, ss = ["onClick"], os = { class: "repo-card-footer" }, as = { class: "meta-left" }, ns = {
  key: 0,
  class: "meta-item lang"
}, is = { class: "meta-item" }, ls = {
  key: 1,
  class: "meta-item"
}, rs = { class: "meta-date" }, cs = {
  key: 0,
  class: "empty-column-placeholder"
}, us = { class: "board-column new-column-slot" }, ds = {
  key: 1,
  class: "new-column-composer"
}, ps = { class: "composer-actions" }, ms = /* @__PURE__ */ re({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(M) {
    const r = M, i = w(""), p = w(!1), g = w(null), v = w(""), h = w(null), l = w(null), f = w(null), u = w(null), k = w(null), _ = P(() => {
      const o = new Set(d.customTopicNames);
      for (const t of d.repos)
        for (const s of t.topics)
          s && o.add(s);
      return Array.from(o).sort();
    }), U = P(() => {
      const o = d.searchQuery.trim().toLowerCase();
      return o ? d.repos.filter(
        (t) => t.name.toLowerCase().includes(o) || t.description.toLowerCase().includes(o) || t.topics.some((s) => s.includes(o)) || t.language && t.language.toLowerCase().includes(o)
      ) : d.repos;
    }), F = P(() => {
      const o = new Set(_.value);
      return U.value.filter((t) => t.topics.length ? !t.topics.some((s) => o.has(s)) : !0);
    });
    function L(o) {
      return U.value.filter((t) => t.topics.includes(o));
    }
    function O(o) {
      return d.repos.filter((t) => !t.topics.includes(o));
    }
    async function R() {
      const o = i.value.trim();
      if (!o) return;
      await S.createTopicColumn(o) && (i.value = "", p.value = !1);
    }
    function I(o) {
      h.value = o, v.value = o, g.value = null;
    }
    async function q(o) {
      const t = v.value.trim();
      if (!t || t === o) {
        h.value = null;
        return;
      }
      await S.renameTopicColumn(o, t) && (h.value = null);
    }
    async function K(o) {
      g.value = null, await S.deleteTopicColumn(o);
    }
    async function J(o, t) {
      await S.addRepoToTopic(o, t), l.value = null;
    }
    async function H(o, t) {
      await S.removeRepoFromTopic(o, t);
    }
    function Y(o, t, s) {
      f.value = t, u.value = s, o.dataTransfer && (o.dataTransfer.effectAllowed = "move", o.dataTransfer.setData("text/plain", `${t.id}:${s}`));
    }
    function V() {
      f.value = null, u.value = null, k.value = null;
    }
    function j(o, t) {
      f.value && (o.preventDefault(), o.dataTransfer && (o.dataTransfer.dropEffect = "move"), k.value = t);
    }
    function X(o, t) {
      const s = o.currentTarget, a = o.relatedTarget;
      s?.contains(a) || k.value === t && (k.value = null);
    }
    async function Z(o, t) {
      o.preventDefault();
      const s = f.value, a = u.value;
      if (V(), !!s)
        if (t === "default")
          a && a !== "default" && await S.removeRepoFromTopic(s, a);
        else if (a && a !== "default" && a !== t) {
          const T = s.topics.filter((pe) => pe !== a);
          T.includes(t) || T.push(t), await S.syncRepoTopics(s, T);
        } else
          await S.addRepoToTopic(s, t);
    }
    function ee(o) {
      window.open(o, "_blank", "noopener,noreferrer");
    }
    function te(o) {
      if (!o) return "";
      try {
        const t = new Date(o);
        return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return oe(
      () => r.active,
      (o) => {
        o && !d.repos.length && S.load();
      },
      { immediate: !0 }
    ), ge(() => {
      r.active && !d.repos.length && S.load();
    }), (o, t) => (n(), c("div", Ke, [
      e("header", Je, [
        e("div", Ye, [
          e("h2", Xe, [
            t[15] || (t[15] = e("span", { class: "icon" }, "📦", -1)),
            t[16] || (t[16] = e("span", null, "我的仓库 · Topic 看板", -1)),
            e("span", Ze, m(y(d).repos.length) + " 个项目", 1)
          ]),
          y(d).syncingTopic ? (n(), c("span", et, [...t[17] || (t[17] = [
            e("i", { class: "spin-icon" }, "⏳", -1),
            W(" 正在同步 GitHub 远端 Topics… ", -1)
          ])])) : b("", !0)
        ]),
        e("div", tt, [
          e("div", st, [
            E(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (s) => y(d).searchQuery = s),
              type: "text",
              placeholder: "过滤仓库名 / 描述 / 标签...",
              class: "search-input"
            }, null, 512), [
              [Q, y(d).searchQuery]
            ]),
            y(d).searchQuery ? (n(), c("button", {
              key: 0,
              type: "button",
              class: "clear-btn",
              onClick: t[1] || (t[1] = (s) => y(d).searchQuery = "")
            }, "✕")) : b("", !0)
          ]),
          e("button", {
            type: "button",
            class: "btn-refresh",
            disabled: y(d).loading || y(d).syncingTopic,
            title: "重新从 GitHub 拉取仓库列表",
            onClick: t[2] || (t[2] = (s) => y(S).load(!0))
          }, [
            e("span", {
              class: $({ spinning: y(d).loading })
            }, "🔄", 2),
            e("span", null, m(y(d).loading ? "正在刷新…" : "刷新仓库"), 1)
          ], 8, ot)
        ])
      ]),
      y(d).errorMessage ? (n(), c("div", at, [
        e("span", null, "⚠️ " + m(y(d).errorMessage), 1),
        e("button", {
          type: "button",
          onClick: t[3] || (t[3] = (s) => y(S).load(!0))
        }, "重试")
      ])) : b("", !0),
      e("div", nt, [
        e("div", it, [
          e("section", {
            class: $(["board-column default-column", { "drop-active": k.value === "default" }]),
            onDragover: t[4] || (t[4] = (s) => j(s, "default")),
            onDragleave: t[5] || (t[5] = (s) => X(s, "default")),
            onDrop: t[6] || (t[6] = (s) => Z(s, "default"))
          }, [
            e("header", lt, [
              e("div", rt, [
                t[18] || (t[18] = e("span", { class: "col-dot default-dot" }, null, -1)),
                t[19] || (t[19] = e("h3", { class: "column-title" }, "默认板块", -1)),
                e("span", ct, m(F.value.length), 1)
              ]),
              t[20] || (t[20] = e("div", { class: "column-actions" }, [
                e("span", {
                  class: "column-hint",
                  title: "未分配到右侧任何 Topic 的项目自动归入此板块"
                }, "未分类")
              ], -1))
            ]),
            e("div", ut, [
              (n(!0), c(A, null, G(F.value, (s) => (n(), c("div", {
                key: s.id,
                class: $(["repo-card", { "card-dragging": f.value?.id === s.id }]),
                draggable: "true",
                onDragstart: (a) => Y(a, s, "default"),
                onDragend: V
              }, [
                e("div", pt, [
                  e("span", {
                    class: "repo-name",
                    title: s.fullName,
                    onClick: (a) => ee(s.htmlUrl)
                  }, m(s.name), 9, mt),
                  s.isPrivate ? (n(), c("span", gt, "私有")) : b("", !0),
                  s.isFork ? (n(), c("span", ht, "Fork")) : b("", !0)
                ]),
                s.description ? (n(), c("p", {
                  key: 0,
                  class: "repo-desc",
                  title: s.description
                }, m(s.description), 9, ft)) : b("", !0),
                s.topics.length ? (n(), c("div", vt, [
                  (n(!0), c(A, null, G(s.topics, (a) => (n(), c("span", {
                    key: a,
                    class: "topic-chip"
                  }, " #" + m(a), 1))), 128))
                ])) : b("", !0),
                e("div", bt, [
                  e("div", yt, [
                    s.language ? (n(), c("span", wt, [
                      t[21] || (t[21] = e("span", { class: "lang-color" }, null, -1)),
                      W(m(s.language), 1)
                    ])) : b("", !0),
                    e("span", kt, "⭐ " + m(s.stargazersCount), 1),
                    s.forksCount ? (n(), c("span", _t, "🍴 " + m(s.forksCount), 1)) : b("", !0)
                  ]),
                  e("span", {
                    class: "meta-date",
                    title: "最后更新：" + s.updatedAt
                  }, m(te(s.pushedAt || s.updatedAt)), 9, Ct)
                ])
              ], 42, dt))), 128)),
              F.value.length ? b("", !0) : (n(), c("div", Tt, [...t[22] || (t[22] = [
                e("span", null, "暂无未分类仓库", -1)
              ])]))
            ])
          ], 34),
          (n(!0), c(A, null, G(_.value, (s) => (n(), c("section", {
            key: s,
            class: $(["board-column topic-column", { "drop-active": k.value === s }]),
            onDragover: (a) => j(a, s),
            onDragleave: (a) => X(a, s),
            onDrop: (a) => Z(a, s)
          }, [
            e("header", St, [
              h.value !== s ? (n(), c("div", At, [
                t[23] || (t[23] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "GitHub Topic: " + s
                }, " #" + m(s), 9, Rt),
                e("span", Gt, m(L(s).length), 1)
              ])) : (n(), c("div", Ht, [
                E(e("input", {
                  "onUpdate:modelValue": t[7] || (t[7] = (a) => v.value = a),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    se((a) => q(s), ["enter"]),
                    t[8] || (t[8] = se((a) => h.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, xt), [
                  [Q, v.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (a) => q(s)
                }, "✓", 8, Lt),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: t[9] || (t[9] = (a) => h.value = null)
                }, "✕")
              ])),
              e("div", It, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "板块操作（重命名 / 删除）",
                  onClick: (a) => g.value = g.value === s ? null : s
                }, "•••", 8, Dt),
                g.value === s ? (n(), c("div", Nt, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (a) => I(s)
                  }, " ✏️ 重命名 Topic 并同步 ", 8, Et),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (a) => K(s)
                  }, " 🗑️ 删除板块并从远端移除 ", 8, Pt)
                ])) : b("", !0)
              ])
            ]),
            e("div", Mt, [
              l.value !== s ? (n(), c("button", {
                key: 0,
                type: "button",
                class: "btn-column-add",
                onClick: (a) => l.value = s
              }, " ＋ 添加仓库到此 Topic ", 8, Ut)) : (n(), c("div", Ft, [
                e("div", Ot, [
                  e("span", null, "选择要加入 #" + m(s) + " 的仓库：", 1),
                  e("button", {
                    type: "button",
                    class: "picker-close",
                    onClick: t[10] || (t[10] = (a) => l.value = null)
                  }, "✕")
                ]),
                e("div", Vt, [
                  (n(!0), c(A, null, G(O(s), (a) => (n(), c("button", {
                    key: a.id,
                    type: "button",
                    class: "picker-repo-item",
                    onClick: (T) => J(a, s)
                  }, [
                    e("span", zt, m(a.name), 1),
                    e("span", Bt, m(a.isPrivate ? "私有" : "公开"), 1)
                  ], 8, jt))), 128)),
                  O(s).length ? b("", !0) : (n(), c("div", Wt, " 全部仓库均已加入此 Topic "))
                ])
              ]))
            ]),
            e("div", Qt, [
              (n(!0), c(A, null, G(L(s), (a) => (n(), c("div", {
                key: a.id,
                class: $(["repo-card", { "card-dragging": f.value?.id === a.id }]),
                draggable: "true",
                onDragstart: (T) => Y(T, a, s),
                onDragend: V
              }, [
                e("div", Kt, [
                  e("span", {
                    class: "repo-name",
                    title: a.fullName,
                    onClick: (T) => ee(a.htmlUrl)
                  }, m(a.name), 9, Jt),
                  a.isPrivate ? (n(), c("span", Yt, "私有")) : b("", !0),
                  a.isFork ? (n(), c("span", Xt, "Fork")) : b("", !0)
                ]),
                a.description ? (n(), c("p", {
                  key: 0,
                  class: "repo-desc",
                  title: a.description
                }, m(a.description), 9, Zt)) : b("", !0),
                e("div", es, [
                  e("span", ts, [
                    W(" #" + m(s) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从当前 Topic 移除并同步到 GitHub",
                      onClick: ae((T) => H(a, s), ["stop"])
                    }, "✕", 8, ss)
                  ]),
                  (n(!0), c(A, null, G(a.topics.filter((T) => T !== s), (T) => (n(), c("span", {
                    key: T,
                    class: "topic-chip other-chip"
                  }, " #" + m(T), 1))), 128))
                ]),
                e("div", os, [
                  e("div", as, [
                    a.language ? (n(), c("span", ns, [
                      t[24] || (t[24] = e("span", { class: "lang-color" }, null, -1)),
                      W(m(a.language), 1)
                    ])) : b("", !0),
                    e("span", is, "⭐ " + m(a.stargazersCount), 1),
                    a.forksCount ? (n(), c("span", ls, "🍴 " + m(a.forksCount), 1)) : b("", !0)
                  ]),
                  e("span", rs, m(te(a.pushedAt || a.updatedAt)), 1)
                ])
              ], 42, qt))), 128)),
              L(s).length ? b("", !0) : (n(), c("div", cs, [...t[25] || (t[25] = [
                e("span", null, "暂无项目，可从左侧拖拽或点击上方添加", -1)
              ])]))
            ])
          ], 42, $t))), 128)),
          e("section", us, [
            p.value ? (n(), c("div", ds, [
              t[27] || (t[27] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建 Topic 分组"),
                e("small", null, "将作为 GitHub 远端标签同步")
              ], -1)),
              E(e("input", {
                "onUpdate:modelValue": t[12] || (t[12] = (s) => i.value = s),
                type: "text",
                placeholder: "例如 tools, vue3, robotics...",
                class: "composer-input",
                onKeydown: [
                  se(R, ["enter"]),
                  t[13] || (t[13] = se((s) => p.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [Q, i.value]
              ]),
              e("div", ps, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: R
                }, "创建板块"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: t[14] || (t[14] = (s) => p.value = !1)
                }, "取消")
              ])
            ])) : (n(), c("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: t[11] || (t[11] = (s) => p.value = !0)
            }, [...t[26] || (t[26] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建 Topic 板块", -1)
            ])]))
          ])
        ])
      ])
    ]));
  }
}), gs = /* @__PURE__ */ ce(ms, [["__scopeId", "data-v-13bf5ff9"]]), hs = ["inert"], fs = { class: "card-head" }, vs = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, bs = ["title"], ys = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, ws = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, ks = ["placeholder"], _s = ["title"], Cs = { class: "gh-search-rule-icon" }, Ts = { class: "gh-search-rule-text" }, $s = { class: "gh-settings-anchor" }, Ss = ["aria-expanded"], As = {
  key: 0,
  class: "muted small",
  role: "status"
}, Rs = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Gs = { class: "gh-bili-layout" }, Hs = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, xs = ["title"], Ls = { class: "fo-sidebar-toggle-title" }, Is = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Ds = ["aria-expanded", "title"], Ns = { class: "fo-sidebar-toggle-chevron" }, Es = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, Ps = { class: "fo-sidebar-sub-wrap" }, Ms = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Us = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Fs = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Os = { class: "gh-bili-sidebar-head" }, Vs = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, js = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, zs = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, Bs = { id: "vue-github-status-root" }, Ws = { id: "vue-github-repositories-root" }, Qs = /* @__PURE__ */ re({
  __name: "GitHubWorkspaceCard",
  setup(M) {
    const r = be(() => import("./GitHubSettingsModal-C-CAi-mE.js")), { active: i } = ye("card-github", "/github.html");
    let p = 0, g = !1, v;
    const h = w(""), l = w("stars");
    oe(() => i.value && l.value === "stars", (o) => C.setAiViewActive(o), { immediate: !0, flush: "sync" });
    const f = w(!1), u = w("local"), k = w(""), _ = w(!1), U = w(0);
    function F() {
      i.value && (_.value = !0, ++U.value);
    }
    const L = w(!1);
    oe(_, (o) => {
      o && (L.value = !0);
    });
    const O = w(null);
    let R = 0;
    function I(o) {
      l.value = o, o === "trending" ? de.switchTab("trending") : de.switchTab("stars");
    }
    function q() {
      l.value = "stars";
    }
    const K = [
      { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
      { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
      { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
      { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
    ], J = w(C.searchRule || "exact"), H = P(() => K.find((o) => o.id === J.value) || K[0]);
    function Y() {
      const o = C.cycleSearchRule();
      J.value = o;
    }
    const V = P(() => u.value === "global" ? "在 GitHub 全网搜索开源仓库…" : `在当前分类中${H.value.name}搜索 Star 仓库…`);
    function j() {
      clearTimeout(R), !(!i.value || u.value !== "local") && (R = window.setTimeout(() => C.setSearchQuery(k.value.trim().toLowerCase()), 180));
    }
    function X() {
      u.value = u.value === "local" ? "global" : "local", u.value === "local" && j();
    }
    function Z() {
      k.value = "", clearTimeout(R), C.resetLocalSearch();
    }
    function ee() {
      const o = k.value.trim();
      u.value === "local" ? (clearTimeout(R), C.setSearchQuery(o.toLowerCase())) : o && window.open(`https://github.com/search?q=${encodeURIComponent(o)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function te() {
      ++p, g = !0, h.value = "";
    }
    return oe(i, async (o) => {
      const t = ++p;
      if (clearTimeout(R), v?.abort(), v = new AbortController(), o || v.abort(), C.setRepositoryViewSignal(v.signal), !!o) {
        if (g) {
          await C.resumeRepositoryReads();
          return;
        }
        if (C.repos.length || C.loadingAllStars || C.loadingPage) {
          g = !0;
          return;
        }
        try {
          const s = await le();
          if (!i.value || t !== p) return;
          g = !0, await C.loadGitHub(s.ghUser, s.ghToken);
        } catch {
          if (!i.value || t !== p) return;
          g = !1, h.value = "GitHub 初始化失败；请检查设置，或重新进入后重试。";
        }
      }
    }, { immediate: !0, flush: "sync" }), he(() => {
      C.setAiViewActive(!1), ++p, v?.abort(), clearTimeout(R);
    }), (o, t) => (n(), c("section", {
      class: $(["card wide", { "card-fullscreen": y(Re).activeId === "card-github" }]),
      id: "card-github",
      inert: !y(i)
    }, [
      e("header", fs, [
        t[13] || (t[13] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        t[14] || (t[14] = e("h2", null, "GitHub", -1)),
        t[15] || (t[15] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", vs, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: ae(ee, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: u.value === "local" ? "切换为 GitHub 全站搜索" : "切换为当前分类搜索",
              onClick: X
            }, [
              e("span", ys, m(u.value === "local" ? "⭐" : "🌐"), 1),
              e("span", ws, m(u.value === "local" ? "当前分类" : "GitHub 全站"), 1),
              t[10] || (t[10] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, bs),
            E(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": t[0] || (t[0] = (s) => k.value = s),
              placeholder: V.value,
              autocomplete: "off",
              onInput: j
            }, null, 40, ks), [
              [Q, k.value]
            ]),
            u.value === "local" ? (n(), c("button", {
              key: 0,
              type: "button",
              class: $(["gh-search-rule-btn", `rule-${H.value.id}`]),
              title: `当前匹配规则：${H.value.name}（${H.value.desc}）
点击切换下一个规则`,
              onClick: ae(Y, ["stop"])
            }, [
              e("span", Cs, m(H.value.icon), 1),
              e("span", Ts, m(H.value.name), 1)
            ], 10, _s)) : b("", !0),
            E(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: "清空搜索",
              onClick: Z
            }, "✕", 512), [
              [fe, k.value]
            ]),
            t[11] || (t[11] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          t[12] || (t[12] = ve('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-04024e84><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-04024e84><input type="checkbox" value="exact" checked data-v-04024e84>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-04024e84><input type="checkbox" value="loose" data-v-04024e84>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-04024e84><input type="checkbox" value="related" data-v-04024e84>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-04024e84><input type="checkbox" value="topic" data-v-04024e84>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-04024e84><input type="checkbox" value="readme" data-v-04024e84>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-04024e84></div>', 2))
        ]),
        e("div", $s, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: O,
            "aria-expanded": _.value,
            "aria-label": "GitHub 设置",
            class: "gh-head-settings-btn",
            title: "GitHub 模组偏好设置 (账号、Token、AI模型、缓存)",
            onClick: t[1] || (t[1] = (s) => _.value = !_.value)
          }, " ⚙️ ", 8, Ss),
          L.value ? (n(), z(y(r), {
            key: 0,
            visible: y(i) && _.value,
            anchor: O.value,
            "ai-request": U.value,
            onAccountReload: te,
            onClose: t[2] || (t[2] = (s) => _.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : b("", !0)
        ])
      ]),
      h.value ? (n(), c("p", As, m(h.value), 1)) : b("", !0),
      e("div", Rs, [
        e("div", Gs, [
          e("aside", Hs, [
            e("div", {
              class: $(["fo-sidebar-toggle-bar", { "is-collapsed": f.value }]),
              title: f.value ? "点击展开快捷频道" : "点击收起快捷频道",
              onClick: t[3] || (t[3] = (s) => f.value = !f.value)
            }, [
              e("div", Ls, [
                t[16] || (t[16] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                t[17] || (t[17] = e("span", null, "快捷频道", -1)),
                f.value ? (n(), c("span", Is, "3")) : b("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !f.value,
                title: f.value ? "展开" : "收起"
              }, [
                e("span", null, m(f.value ? "展开" : "收起"), 1),
                e("span", Ns, m(f.value ? "▾" : "▴"), 1)
              ], 8, Ds)
            ], 10, xs),
            f.value ? b("", !0) : (n(), c("div", Es, [
              e("div", Ps, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: $(["fo-sidebar-sub-btn", { on: l.value === "stars" }]),
                  title: "查看与管理 Star 星标仓库",
                  onClick: t[4] || (t[4] = (s) => I("stars"))
                }, [...t[18] || (t[18] = [
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
              e("div", Ms, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: $(["fo-sidebar-sub-btn", { on: l.value === "trending" }]),
                  title: "查看 GitHub 实时趋势项目",
                  onClick: t[5] || (t[5] = (s) => I("trending"))
                }, [...t[19] || (t[19] = [
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
              e("div", Us, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: $(["fo-sidebar-sub-btn", { on: l.value === "awesome" }]),
                  title: "查看 Awesome 精选开源资源清单",
                  onClick: t[6] || (t[6] = (s) => I("awesome"))
                }, [...t[20] || (t[20] = [
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
              e("div", Fs, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: $(["fo-sidebar-sub-btn", { on: l.value === "repos" }]),
                  title: "查看与管理我的仓库及 Topic 看板",
                  onClick: t[7] || (t[7] = (s) => I("repos"))
                }, [...t[21] || (t[21] = [
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
            e("header", Os, [
              t[22] || (t[22] = e("div", null, [
                e("b", { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, [
                  e("i", { class: "fo-folder-icon" }),
                  W(" 收藏文件夹")
                ]),
                e("small", { style: { color: "var(--dim)", "font-size": "9.5px" } }, "单一文件夹 · 独立正在使用")
              ], -1)),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: "新建文件夹",
                "aria-label": "新建文件夹",
                onClick: t[8] || (t[8] = (s) => y(C).promptCreateFolder())
              }, "＋")
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: q
            }, [
              B(ke, { active: y(i) }, null, 8, ["active"])
            ])
          ]),
          e("section", Vs, [
            l.value === "stars" && y(we).accountConfigured === !1 ? (n(), z(Se, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: t[9] || (t[9] = (s) => _.value = !0)
            })) : l.value === "stars" ? (n(), c(A, { key: 1 }, [
              e("header", js, [
                B(Te, { onOpenAiSettings: F })
              ]),
              t[23] || (t[23] = e("div", { class: "gh-main-subbar" }, [
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
              e("div", zs, [
                B(_e, {
                  active: y(i) && l.value === "stars"
                }, null, 8, ["active"])
              ]),
              t[24] || (t[24] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", Bs, [
                B($e)
              ]),
              e("div", Ws, [
                B(Ce, {
                  active: y(i) && l.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : l.value === "trending" ? (n(), z(Ae, { key: 2 })) : l.value === "awesome" ? (n(), z(qe, { key: 3 })) : l.value === "repos" ? (n(), z(gs, {
              key: 4,
              active: y(i) && l.value === "repos"
            }, null, 8, ["active"])) : b("", !0)
          ])
        ])
      ])
    ], 10, hs));
  }
}), oo = /* @__PURE__ */ ce(Qs, [["__scopeId", "data-v-04024e84"]]);
export {
  oo as default
};
