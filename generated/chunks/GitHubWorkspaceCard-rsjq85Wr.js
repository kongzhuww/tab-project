import { d as de, o as n, e as l, f as e, l as U, n as Y, g as b, F as R, h as H, B as S, t as m, u as y, i as L, b as _, s as O, r as fe, x as le, C as ve, y as be, m as K, k as ie, L as ye, z as we, H as ke, c as Q, D as q, E as _e } from "./vendor-vue-DokqDua_.js";
import { u as Te } from "./useCardActivity-9tRWYMle.js";
import { D as ue, E as me, t as $, y as Ce } from "./search.service-D8BPpHmG.js";
import { _ as $e, a as Se, b as Ae, g as ge, G as Re, c as Ge } from "./main-SovzB6s_.js";
import { A as He } from "./AccountSetupGuide-b0Xd0kWd.js";
import xe from "./GitHubTrending-oL6q5IIn.js";
import { _ as pe } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { s as re } from "./storage-cache.service-BYF2zxXX.js";
import { r as Le } from "./view-styles-BS2802be.js";
const Ie = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], De = [
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
], Ee = { class: "gh-awesome-wrapper" }, Ne = { class: "gh-awesome-header" }, Me = { class: "gh-awesome-intro" }, Pe = { class: "gh-awesome-search-box" }, Ue = { class: "gh-awesome-pills" }, Oe = ["onClick"], Fe = { class: "gh-awesome-grid" }, Ve = ["onClick"], Be = { class: "gh-awesome-card-head" }, je = { class: "gh-awesome-card-name" }, ze = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, We = { class: "gh-awesome-desc" }, Qe = { class: "gh-awesome-footer" }, qe = { class: "gh-awesome-tags" }, Ke = ["href"], Ye = {
  key: 0,
  class: "gh-awesome-empty"
}, Je = /* @__PURE__ */ de({
  __name: "GitHubAwesome",
  setup(F) {
    const c = _("all"), r = _(""), p = O(() => {
      const v = r.value.trim().toLowerCase(), h = c.value;
      return De.filter((i) => h === "all" || i.category === h ? v ? i.name.toLowerCase().includes(v) || i.title.toLowerCase().includes(v) || i.desc.toLowerCase().includes(v) || i.tags.some((d) => d.toLowerCase().includes(v)) : !0 : !1);
    });
    function g(v) {
      window.open(v, "_blank", "noreferrer");
    }
    return (v, h) => (n(), l("div", Ee, [
      e("header", Ne, [
        e("div", Me, [
          h[3] || (h[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", Pe, [
            U(e("input", {
              "onUpdate:modelValue": h[0] || (h[0] = (i) => r.value = i),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [Y, r.value]
            ]),
            r.value ? (n(), l("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: h[1] || (h[1] = (i) => r.value = "")
            }, "✕")) : b("", !0)
          ])
        ]),
        e("div", Ue, [
          (n(!0), l(R, null, H(y(Ie), (i) => (n(), l("button", {
            key: i.id,
            type: "button",
            class: S(["gh-awesome-pill", { active: c.value === i.id }]),
            onClick: (f) => c.value = i.id
          }, [
            e("span", null, m(i.icon), 1),
            e("b", null, m(i.name), 1)
          ], 10, Oe))), 128))
        ])
      ]),
      e("div", Fe, [
        (n(!0), l(R, null, H(p.value, (i) => (n(), l("article", {
          key: i.id,
          class: "gh-awesome-card",
          onClick: (f) => g(i.url)
        }, [
          e("div", Be, [
            e("div", je, [
              e("strong", null, m(i.title), 1),
              e("small", null, m(i.name), 1)
            ]),
            e("span", ze, "★ " + m(i.stars), 1)
          ]),
          e("p", We, m(i.desc), 1),
          e("div", Qe, [
            e("div", qe, [
              (n(!0), l(R, null, H(i.tags, (f) => (n(), l("span", {
                key: f,
                class: "gh-awesome-tag"
              }, m(f), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: i.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: h[2] || (h[2] = L(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Ke)
          ])
        ], 8, Ve))), 128)),
        p.value.length ? b("", !0) : (n(), l("div", Ye, [...h[4] || (h[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Xe = /* @__PURE__ */ pe(Je, [["__scopeId", "data-v-28a8995f"]]), ce = "gh_my_repos_cache_v1", M = "gh_my_repo_custom_topics_v1", u = fe({
  loading: !1,
  syncingTopic: !1,
  errorMessage: "",
  repos: [],
  customTopicNames: [],
  searchQuery: "",
  editingColumnTopic: null,
  composerActiveColumnId: null
});
function I(F) {
  let c = F.trim().toLowerCase();
  return c = c.replace(/[\s_]+/g, "-"), c = c.replace(/[^a-z0-9-]/g, ""), c = c.replace(/^-+|-+$/g, "").replace(/-+/g, "-"), c.length > 35 && (c = c.slice(0, 35).replace(/-+$/, "")), c;
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
  async load(c = !1) {
    this.abortController?.abort(), this.abortController = new AbortController();
    const r = this.abortController.signal;
    await this.loadPersistedCustomTopics();
    const p = await re.get(ce);
    if (p && p.length && (u.repos = p), !c && p && p.length) {
      this.fetchRemote(r).catch(() => {
      });
      return;
    }
    u.loading = !0, u.errorMessage = "";
    try {
      await this.fetchRemote(r);
    } catch (g) {
      if (g.name === "AbortError") return;
      u.errorMessage = g.message || "获取个人仓库失败";
    } finally {
      u.loading = !1;
    }
  }
  async fetchRemote(c) {
    const { ghUser: r, ghToken: p } = await ue();
    if (!r && !p) {
      u.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    let g = "https://api.github.com/user/repos?type=owner&sort=updated&per_page=100";
    p || (g = `https://api.github.com/users/${encodeURIComponent(r)}/repos?type=owner&sort=updated&per_page=100`);
    const v = me(p), h = await fetch(g, {
      method: "GET",
      headers: v,
      signal: c
    });
    if (!h.ok)
      throw h.status === 401 ? new Error("GitHub Token 无效或已过期，请在设置中更新。") : h.status === 403 ? new Error("GitHub API 频率受限或无权访问，请检查 Token 权限。") : new Error(`GitHub 请求失败 (HTTP ${h.status})`);
    const i = await h.json();
    if (!Array.isArray(i))
      throw new Error("GitHub 返回数据格式异常");
    const f = i.map((d) => ({
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
      topics: Array.isArray(d.topics) ? d.topics.map((w) => String(w).toLowerCase()) : [],
      updatedAt: d.updated_at || "",
      pushedAt: d.pushed_at || "",
      defaultBranch: d.default_branch || "main"
    }));
    u.repos = f, await re.set(ce, f, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 提交单个仓库的 Topics 到 GitHub 远端
   */
  async syncRepoTopics(c, r) {
    const { ghToken: p } = await ue();
    if (!p)
      return alert("向 GitHub 更新 Topic 需要在 GitHub 设置中配置具备 repo 写入权限的 Token。"), !1;
    const g = Array.from(new Set(r.map(I).filter(Boolean))).slice(0, 20), [v, h] = c.fullName.split("/"), i = `https://api.github.com/repos/${encodeURIComponent(v)}/${encodeURIComponent(h)}/topics`;
    u.syncingTopic = !0;
    try {
      const f = me(p), d = await fetch(i, {
        method: "PUT",
        headers: {
          ...f,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: g })
      });
      if (!d.ok)
        throw d.status === 401 || d.status === 403 ? new Error("Token 权限不足。修改 Topics 需要包含 repo（或 Administration:write）作用域。") : d.status === 404 ? new Error("仓库未找到或无权修改。") : new Error(`GitHub 远端保存失败 (HTTP ${d.status})`);
      const w = await d.json(), C = Array.isArray(w.names) ? w.names : g;
      return c.topics = C, await re.set(ce, u.repos, { ttlMs: 30 * 86400 * 1e3 }), !0;
    } catch (f) {
      return alert(`更新 GitHub Topics 失败：${f.message || f}`), !1;
    } finally {
      u.syncingTopic = !1;
    }
  }
  /**
   * 将仓库添加到指定 Topic（若远端不存在则新增并提交）
   */
  async addRepoToTopic(c, r) {
    const p = I(r);
    if (!p) return !1;
    if (c.topics.includes(p)) return !0;
    const g = [...c.topics, p];
    return this.syncRepoTopics(c, g);
  }
  /**
   * 将仓库从指定 Topic 移除
   */
  async removeRepoFromTopic(c, r) {
    const p = I(r);
    if (!c.topics.includes(p)) return !0;
    const g = c.topics.filter((v) => v !== p);
    return this.syncRepoTopics(c, g);
  }
  /**
   * 新建一个 Topic 列（本地与远端集合）
   */
  async createTopicColumn(c) {
    const r = I(c);
    return r ? u.customTopicNames.includes(r) ? (alert(`Topic「${r}」板块已存在。`), null) : (u.customTopicNames.push(r), await this.persistCustomTopics(), r) : (alert("Topic 名称无效。GitHub 规范：仅限 1~35 位小写英文字母、数字和连字符 '-'。"), null);
  }
  /**
   * 重命名 Topic 列：同步将该板块下所有仓库的旧 Topic 替换为新 Topic 并提交到 GitHub
   */
  async renameTopicColumn(c, r) {
    const p = I(r);
    if (!p)
      return alert("新 Topic 名称无效。仅限小写英文、数字与中划线。"), !1;
    if (c === p) return !0;
    const g = u.repos.filter((v) => v.topics.includes(c));
    if (g.length > 0) {
      if (!confirm(
        `确定将板块「${c}」重命名为「${p}」吗？
这将调用 GitHub API 同步更新该板块下的 ${g.length} 个仓库的远端 Topic。`
      )) return !1;
      u.syncingTopic = !0;
      let h = 0, i = 0;
      for (const f of g) {
        const d = f.topics.map((C) => C === c ? p : C);
        await this.syncRepoTopics(f, d) ? h++ : i++;
      }
      u.syncingTopic = !1, i > 0 && alert(`重命名完成，成功更新 ${h} 个仓库，失败 ${i} 个。`);
    }
    return u.customTopicNames = u.customTopicNames.map((v) => v === c ? p : v), await this.persistCustomTopics(), !0;
  }
  /**
   * 删除 Topic 板块：从该板块下所有仓库中移除该 topic
   */
  async deleteTopicColumn(c) {
    const r = u.repos.filter((g) => g.topics.includes(c)), p = r.length > 0 ? `确定删除板块「${c}」吗？
将从该板块下的 ${r.length} 个仓库中移除此 Topic 并在 GitHub 远端同步。` : `确定删除空板块「${c}」吗？`;
    if (!confirm(p)) return !1;
    if (r.length > 0) {
      u.syncingTopic = !0;
      for (const g of r)
        await this.removeRepoFromTopic(g, c);
      u.syncingTopic = !1;
    }
    return u.customTopicNames = u.customTopicNames.filter((g) => g !== c), await this.persistCustomTopics(), !0;
  }
  async loadPersistedCustomTopics() {
    try {
      const r = (typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([M]) : { [M]: JSON.parse(localStorage.getItem(M) || "[]") })?.[M];
      Array.isArray(r) && (u.customTopicNames = r.map(I).filter(Boolean));
    } catch {
    }
  }
  async persistCustomTopics() {
    const c = Array.from(new Set(u.customTopicNames.map(I).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [M]: c }) : localStorage.setItem(M, JSON.stringify(c));
    } catch {
    }
  }
}
const A = P.getInstance(), Ze = { class: "my-repos-workspace" }, et = { class: "my-repos-header" }, tt = { class: "header-left" }, st = { class: "title" }, at = { class: "count-pill" }, ot = {
  key: 0,
  class: "sync-status"
}, nt = { class: "header-right" }, it = { class: "search-box" }, lt = ["disabled"], rt = {
  key: 0,
  class: "error-banner"
}, ct = { class: "board-viewport" }, ut = { class: "board-columns-track" }, dt = { class: "column-header" }, pt = { class: "column-title-group" }, mt = { class: "badge-count" }, gt = { class: "column-cards-scroll" }, ht = {
  key: 0,
  class: "drag-drop-placeholder"
}, ft = ["onDragstart"], vt = { class: "repo-card-head" }, bt = ["title", "onClick"], yt = {
  key: 0,
  class: "badge-repo-visibility private"
}, wt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, kt = ["title"], _t = {
  key: 1,
  class: "repo-topics-row"
}, Tt = { class: "repo-card-footer" }, Ct = { class: "meta-left" }, $t = {
  key: 0,
  class: "meta-item lang"
}, St = { class: "meta-item" }, At = {
  key: 1,
  class: "meta-item"
}, Rt = ["title"], Gt = {
  key: 1,
  class: "empty-column-placeholder"
}, Ht = ["onDragover", "onDragleave", "onDrop"], xt = { class: "column-header" }, Lt = {
  key: 0,
  class: "column-title-group"
}, It = ["title"], Dt = { class: "badge-count" }, Et = {
  key: 1,
  class: "column-rename-group"
}, Nt = ["onKeydown"], Mt = ["onClick"], Pt = { class: "column-actions" }, Ut = ["onClick"], Ot = ["onClick"], Ft = ["onClick"], Vt = { class: "column-add-wrap" }, Bt = ["onClick"], jt = { class: "picker-head" }, zt = { class: "picker-list" }, Wt = ["onClick"], Qt = { class: "cand-name" }, qt = { class: "cand-visibility" }, Kt = {
  key: 0,
  class: "picker-empty"
}, Yt = { class: "column-cards-scroll" }, Jt = {
  key: 0,
  class: "drag-drop-placeholder active-placeholder"
}, Xt = ["onDragstart"], Zt = { class: "repo-card-head" }, es = ["title", "onClick"], ts = {
  key: 0,
  class: "badge-repo-visibility private"
}, ss = {
  key: 1,
  class: "badge-repo-visibility fork"
}, as = ["title"], os = { class: "repo-topics-row" }, ns = { class: "topic-chip active-chip" }, is = ["onClick"], ls = { class: "repo-card-footer" }, rs = { class: "meta-left" }, cs = {
  key: 0,
  class: "meta-item lang"
}, us = { class: "meta-item" }, ds = {
  key: 1,
  class: "meta-item"
}, ps = { class: "meta-date" }, ms = {
  key: 1,
  class: "empty-column-placeholder"
}, gs = { class: "board-column new-column-slot" }, hs = {
  key: 1,
  class: "new-column-composer"
}, fs = { class: "composer-actions" }, vs = /* @__PURE__ */ de({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(F) {
    const c = F, r = _(""), p = _(!1), g = _(null), v = _(""), h = _(null), i = _(null), f = _(null), d = _(null), w = _(null), C = O(() => {
      const s = new Set(u.customTopicNames);
      for (const t of u.repos)
        for (const a of t.topics)
          a && s.add(a);
      return Array.from(s).sort();
    }), V = O(() => {
      const s = u.searchQuery.trim().toLowerCase();
      return s ? u.repos.filter(
        (t) => t.name.toLowerCase().includes(s) || t.description.toLowerCase().includes(s) || t.topics.some((a) => a.includes(s)) || t.language && t.language.toLowerCase().includes(s)
      ) : u.repos;
    }), B = O(() => {
      const s = new Set(C.value);
      return V.value.filter((t) => t.topics.length ? !t.topics.some((a) => s.has(a)) : !0);
    });
    function D(s) {
      return V.value.filter((t) => t.topics.includes(s));
    }
    function j(s) {
      return u.repos.filter((t) => !t.topics.includes(s));
    }
    async function G() {
      const s = r.value.trim();
      if (!s) return;
      await A.createTopicColumn(s) && (r.value = "", p.value = !1);
    }
    function E(s) {
      h.value = s, v.value = s, g.value = null;
    }
    async function J(s) {
      const t = v.value.trim();
      if (!t || t === s) {
        h.value = null;
        return;
      }
      await A.renameTopicColumn(s, t) && (h.value = null);
    }
    async function X(s) {
      g.value = null, await A.deleteTopicColumn(s);
    }
    async function Z(s, t) {
      await A.addRepoToTopic(s, t), i.value = null;
    }
    async function x(s, t) {
      await A.removeRepoFromTopic(s, t);
    }
    function ee(s, t, a) {
      if (u.syncingTopic) {
        s.preventDefault();
        return;
      }
      if (f.value = t.id, d.value = a, s.dataTransfer) {
        s.dataTransfer.effectAllowed = "move", s.dataTransfer.setData("application/x-my-repo-id", String(t.id)), s.dataTransfer.setData("application/x-from-topic", a);
        const o = s.currentTarget;
        if (o) {
          const T = o.getBoundingClientRect();
          s.dataTransfer.setDragImage(
            o,
            Math.max(0, Math.min(T.width, s.clientX - T.left)),
            Math.max(0, Math.min(T.height, s.clientY - T.top))
          );
        }
      }
    }
    function N() {
      f.value = null, d.value = null, w.value = null;
    }
    function z(s, t) {
      f.value && (s.preventDefault(), s.stopPropagation(), s.dataTransfer && (s.dataTransfer.dropEffect = "move"), w.value = t);
    }
    function te(s, t) {
      const a = s.currentTarget, o = s.relatedTarget;
      a?.contains(o) || w.value === t && (w.value = null);
    }
    async function se(s, t) {
      s.preventDefault(), s.stopPropagation();
      const a = f.value, o = d.value;
      if (N(), !a) return;
      const T = u.repos.find((W) => W.id === a);
      if (!T) return;
      if (t === "default") {
        o && o !== "default" && await A.removeRepoFromTopic(T, o);
        return;
      }
      const ne = t;
      if (o !== ne)
        if (o && o !== "default") {
          const W = T.topics.filter((he) => he !== o);
          W.includes(ne) || W.push(ne), await A.syncRepoTopics(T, W);
        } else
          await A.addRepoToTopic(T, ne);
    }
    function ae(s) {
      window.open(s, "_blank", "noopener,noreferrer");
    }
    function oe(s) {
      if (!s) return "";
      try {
        const t = new Date(s);
        return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    function k(s) {
      const t = s.target;
      !t?.closest(".column-actions") && !t?.closest(".column-add-wrap") && (g.value = null, i.value = null);
    }
    return le(
      () => c.active,
      (s) => {
        s && !u.repos.length && A.load();
      },
      { immediate: !0 }
    ), ve(() => {
      window.addEventListener("click", k), c.active && !u.repos.length && A.load();
    }), be(() => {
      window.removeEventListener("click", k), N();
    }), (s, t) => (n(), l("div", Ze, [
      e("header", et, [
        e("div", tt, [
          e("h2", st, [
            t[17] || (t[17] = e("span", { class: "icon" }, "📦", -1)),
            t[18] || (t[18] = e("span", null, "我的仓库 · Topic 看板", -1)),
            e("span", at, m(y(u).repos.length) + " 个项目", 1)
          ]),
          y(u).syncingTopic ? (n(), l("span", ot, [...t[19] || (t[19] = [
            e("i", { class: "spin-icon" }, "⏳", -1),
            K(" 正在同步 GitHub 远端 Topics… ", -1)
          ])])) : b("", !0)
        ]),
        e("div", nt, [
          e("div", it, [
            U(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (a) => y(u).searchQuery = a),
              type: "text",
              placeholder: "过滤仓库名 / 描述 / 标签...",
              class: "search-input"
            }, null, 512), [
              [Y, y(u).searchQuery]
            ]),
            y(u).searchQuery ? (n(), l("button", {
              key: 0,
              type: "button",
              class: "clear-btn",
              onClick: t[1] || (t[1] = (a) => y(u).searchQuery = "")
            }, "✕")) : b("", !0)
          ]),
          e("button", {
            type: "button",
            class: "btn-refresh",
            disabled: y(u).loading || y(u).syncingTopic,
            title: "重新从 GitHub 拉取仓库列表",
            onClick: t[2] || (t[2] = (a) => y(A).load(!0))
          }, [
            e("span", {
              class: S({ spinning: y(u).loading })
            }, "🔄", 2),
            e("span", null, m(y(u).loading ? "正在刷新…" : "刷新仓库"), 1)
          ], 8, lt)
        ])
      ]),
      y(u).errorMessage ? (n(), l("div", rt, [
        e("span", null, "⚠️ " + m(y(u).errorMessage), 1),
        e("button", {
          type: "button",
          onClick: t[3] || (t[3] = (a) => y(A).load(!0))
        }, "重试")
      ])) : b("", !0),
      e("div", ct, [
        e("div", ut, [
          e("section", {
            class: S(["board-column default-column", { "is-drag-over": w.value === "default" }]),
            onDragover: t[4] || (t[4] = (a) => z(a, "default")),
            onDragleave: t[5] || (t[5] = (a) => te(a, "default")),
            onDrop: t[6] || (t[6] = (a) => se(a, "default"))
          }, [
            e("header", dt, [
              e("div", pt, [
                t[20] || (t[20] = e("span", { class: "col-dot default-dot" }, null, -1)),
                t[21] || (t[21] = e("h3", { class: "column-title" }, "默认板块", -1)),
                e("span", mt, m(B.value.length), 1)
              ]),
              t[22] || (t[22] = e("div", { class: "column-actions" }, [
                e("span", {
                  class: "column-hint",
                  title: "未分配到右侧任何 Topic 的项目自动归入此板块"
                }, "未分类")
              ], -1))
            ]),
            e("div", gt, [
              w.value === "default" && f.value ? (n(), l("div", ht, [...t[23] || (t[23] = [
                e("span", null, "📥 拖放到此处（移回未分类默认板块）", -1)
              ])])) : b("", !0),
              (n(!0), l(R, null, H(B.value, (a) => (n(), l("div", {
                key: a.id,
                class: S(["repo-card", { "is-dragging": f.value === a.id }]),
                draggable: "true",
                onDragstart: (o) => ee(o, a, "default"),
                onDragend: N
              }, [
                t[25] || (t[25] = e("div", { class: "card-drag-indicator" }, null, -1)),
                e("div", vt, [
                  e("span", {
                    class: "repo-name",
                    title: a.fullName,
                    onClick: (o) => ae(a.htmlUrl)
                  }, m(a.name), 9, bt),
                  a.isPrivate ? (n(), l("span", yt, "私有")) : b("", !0),
                  a.isFork ? (n(), l("span", wt, "Fork")) : b("", !0)
                ]),
                a.description ? (n(), l("p", {
                  key: 0,
                  class: "repo-desc",
                  title: a.description
                }, m(a.description), 9, kt)) : b("", !0),
                a.topics.length ? (n(), l("div", _t, [
                  (n(!0), l(R, null, H(a.topics, (o) => (n(), l("span", {
                    key: o,
                    class: "topic-chip"
                  }, " #" + m(o), 1))), 128))
                ])) : b("", !0),
                e("div", Tt, [
                  e("div", Ct, [
                    a.language ? (n(), l("span", $t, [
                      t[24] || (t[24] = e("span", { class: "lang-color" }, null, -1)),
                      K(m(a.language), 1)
                    ])) : b("", !0),
                    e("span", St, "⭐ " + m(a.stargazersCount), 1),
                    a.forksCount ? (n(), l("span", At, "🍴 " + m(a.forksCount), 1)) : b("", !0)
                  ]),
                  e("span", {
                    class: "meta-date",
                    title: "最后更新：" + a.updatedAt
                  }, m(oe(a.pushedAt || a.updatedAt)), 9, Rt)
                ])
              ], 42, ft))), 128)),
              !B.value.length && w.value !== "default" ? (n(), l("div", Gt, [...t[26] || (t[26] = [
                e("span", null, "暂无未分类项目，拖拽卡片可移回此处", -1)
              ])])) : b("", !0)
            ])
          ], 34),
          (n(!0), l(R, null, H(C.value, (a) => (n(), l("section", {
            key: a,
            class: S(["board-column topic-column", { "is-drag-over": w.value === a }]),
            onDragover: (o) => z(o, a),
            onDragleave: (o) => te(o, a),
            onDrop: (o) => se(o, a)
          }, [
            e("header", xt, [
              h.value !== a ? (n(), l("div", Lt, [
                t[27] || (t[27] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "GitHub Topic: " + a
                }, " #" + m(a), 9, It),
                e("span", Dt, m(D(a).length), 1)
              ])) : (n(), l("div", Et, [
                U(e("input", {
                  "onUpdate:modelValue": t[7] || (t[7] = (o) => v.value = o),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    ie((o) => J(a), ["enter"]),
                    t[8] || (t[8] = ie((o) => h.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, Nt), [
                  [Y, v.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (o) => J(a)
                }, "✓", 8, Mt),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: t[9] || (t[9] = (o) => h.value = null)
                }, "✕")
              ])),
              e("div", Pt, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "板块操作（重命名 / 删除）",
                  onClick: L((o) => g.value = g.value === a ? null : a, ["stop"])
                }, "•••", 8, Ut),
                g.value === a ? (n(), l("div", {
                  key: 0,
                  class: "col-popover-menu",
                  onClick: t[10] || (t[10] = L(() => {
                  }, ["stop"]))
                }, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (o) => E(a)
                  }, " ✏️ 重命名 Topic 并同步远端 ", 8, Ot),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (o) => X(a)
                  }, " 🗑️ 删除板块并从远端移除 ", 8, Ft)
                ])) : b("", !0)
              ])
            ]),
            e("div", Vt, [
              i.value !== a ? (n(), l("button", {
                key: 0,
                type: "button",
                class: "btn-column-add",
                onClick: L((o) => i.value = a, ["stop"])
              }, " ＋ 添加仓库到此 Topic ", 8, Bt)) : (n(), l("div", {
                key: 1,
                class: "add-repo-picker",
                onClick: t[12] || (t[12] = L(() => {
                }, ["stop"]))
              }, [
                e("div", jt, [
                  e("span", null, "选择要加入 #" + m(a) + " 的仓库：", 1),
                  e("button", {
                    type: "button",
                    class: "picker-close",
                    onClick: t[11] || (t[11] = (o) => i.value = null)
                  }, "✕")
                ]),
                e("div", zt, [
                  (n(!0), l(R, null, H(j(a), (o) => (n(), l("button", {
                    key: o.id,
                    type: "button",
                    class: "picker-repo-item",
                    onClick: (T) => Z(o, a)
                  }, [
                    e("span", Qt, m(o.name), 1),
                    e("span", qt, m(o.isPrivate ? "私有" : "公开"), 1)
                  ], 8, Wt))), 128)),
                  j(a).length ? b("", !0) : (n(), l("div", Kt, " 全部仓库均已加入此 Topic "))
                ])
              ]))
            ]),
            e("div", Yt, [
              w.value === a && f.value ? (n(), l("div", Jt, [
                e("span", null, "📥 拖放到此处（同步添加 #" + m(a) + "）", 1)
              ])) : b("", !0),
              (n(!0), l(R, null, H(D(a), (o) => (n(), l("div", {
                key: o.id,
                class: S(["repo-card", { "is-dragging": f.value === o.id }]),
                draggable: "true",
                onDragstart: (T) => ee(T, o, a),
                onDragend: N
              }, [
                t[29] || (t[29] = e("div", { class: "card-drag-indicator topic-indicator" }, null, -1)),
                e("div", Zt, [
                  e("span", {
                    class: "repo-name",
                    title: o.fullName,
                    onClick: (T) => ae(o.htmlUrl)
                  }, m(o.name), 9, es),
                  o.isPrivate ? (n(), l("span", ts, "私有")) : b("", !0),
                  o.isFork ? (n(), l("span", ss, "Fork")) : b("", !0)
                ]),
                o.description ? (n(), l("p", {
                  key: 0,
                  class: "repo-desc",
                  title: o.description
                }, m(o.description), 9, as)) : b("", !0),
                e("div", os, [
                  e("span", ns, [
                    K(" #" + m(a) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从当前 Topic 移除并同步到 GitHub",
                      onClick: L((T) => x(o, a), ["stop"])
                    }, "✕", 8, is)
                  ]),
                  (n(!0), l(R, null, H(o.topics.filter((T) => T !== a), (T) => (n(), l("span", {
                    key: T,
                    class: "topic-chip other-chip"
                  }, " #" + m(T), 1))), 128))
                ]),
                e("div", ls, [
                  e("div", rs, [
                    o.language ? (n(), l("span", cs, [
                      t[28] || (t[28] = e("span", { class: "lang-color" }, null, -1)),
                      K(m(o.language), 1)
                    ])) : b("", !0),
                    e("span", us, "⭐ " + m(o.stargazersCount), 1),
                    o.forksCount ? (n(), l("span", ds, "🍴 " + m(o.forksCount), 1)) : b("", !0)
                  ]),
                  e("span", ps, m(oe(o.pushedAt || o.updatedAt)), 1)
                ])
              ], 42, Xt))), 128)),
              !D(a).length && w.value !== a ? (n(), l("div", ms, [...t[30] || (t[30] = [
                e("span", null, "暂无项目，可从左侧拖拽或点击上方添加", -1)
              ])])) : b("", !0)
            ])
          ], 42, Ht))), 128)),
          e("section", gs, [
            p.value ? (n(), l("div", hs, [
              t[32] || (t[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建 Topic 分组"),
                e("small", null, "将作为 GitHub 远端标签同步")
              ], -1)),
              U(e("input", {
                "onUpdate:modelValue": t[14] || (t[14] = (a) => r.value = a),
                type: "text",
                placeholder: "例如 tools, vue3, robotics...",
                class: "composer-input",
                onKeydown: [
                  ie(G, ["enter"]),
                  t[15] || (t[15] = ie((a) => p.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [Y, r.value]
              ]),
              e("div", fs, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: G
                }, "创建板块"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: t[16] || (t[16] = (a) => p.value = !1)
                }, "取消")
              ])
            ])) : (n(), l("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: t[13] || (t[13] = (a) => p.value = !0)
            }, [...t[31] || (t[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建 Topic 板块", -1)
            ])]))
          ])
        ])
      ])
    ]));
  }
}), bs = /* @__PURE__ */ pe(vs, [["__scopeId", "data-v-429c73ea"]]), ys = ["inert"], ws = { class: "card-head" }, ks = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, _s = ["title"], Ts = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Cs = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, $s = ["placeholder"], Ss = ["title"], As = { class: "gh-search-rule-icon" }, Rs = { class: "gh-search-rule-text" }, Gs = { class: "gh-settings-anchor" }, Hs = ["aria-expanded"], xs = {
  key: 0,
  class: "muted small",
  role: "status"
}, Ls = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Is = { class: "gh-bili-layout" }, Ds = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, Es = ["title"], Ns = { class: "fo-sidebar-toggle-title" }, Ms = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Ps = ["aria-expanded", "title"], Us = { class: "fo-sidebar-toggle-chevron" }, Os = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, Fs = { class: "fo-sidebar-sub-wrap" }, Vs = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Bs = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, js = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, zs = { class: "gh-bili-sidebar-head" }, Ws = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, Qs = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, qs = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, Ks = { id: "vue-github-status-root" }, Ys = { id: "vue-github-repositories-root" }, Js = /* @__PURE__ */ de({
  __name: "GitHubWorkspaceCard",
  setup(F) {
    const c = _e(() => import("./GitHubSettingsModal-C-CAi-mE.js")), { active: r } = Te("card-github", "/github.html");
    let p = 0, g = !1, v;
    const h = _(""), i = _("stars");
    le(() => r.value && i.value === "stars", (k) => $.setAiViewActive(k), { immediate: !0, flush: "sync" });
    const f = _(!1), d = _("local"), w = _(""), C = _(!1), V = _(0);
    function B() {
      r.value && (C.value = !0, ++V.value);
    }
    const D = _(!1);
    le(C, (k) => {
      k && (D.value = !0);
    });
    const j = _(null);
    let G = 0;
    function E(k) {
      i.value = k, k === "trending" ? ge.switchTab("trending") : ge.switchTab("stars");
    }
    function J() {
      i.value = "stars";
    }
    const X = [
      { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
      { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
      { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
      { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
    ], Z = _($.searchRule || "exact"), x = O(() => X.find((k) => k.id === Z.value) || X[0]);
    function ee() {
      const k = $.cycleSearchRule();
      Z.value = k;
    }
    const N = O(() => d.value === "global" ? "在 GitHub 全网搜索开源仓库…" : `在当前分类中${x.value.name}搜索 Star 仓库…`);
    function z() {
      clearTimeout(G), !(!r.value || d.value !== "local") && (G = window.setTimeout(() => $.setSearchQuery(w.value.trim().toLowerCase()), 180));
    }
    function te() {
      d.value = d.value === "local" ? "global" : "local", d.value === "local" && z();
    }
    function se() {
      w.value = "", clearTimeout(G), $.resetLocalSearch();
    }
    function ae() {
      const k = w.value.trim();
      d.value === "local" ? (clearTimeout(G), $.setSearchQuery(k.toLowerCase())) : k && window.open(`https://github.com/search?q=${encodeURIComponent(k)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function oe() {
      ++p, g = !0, h.value = "";
    }
    return le(r, async (k) => {
      const s = ++p;
      if (clearTimeout(G), v?.abort(), v = new AbortController(), k || v.abort(), $.setRepositoryViewSignal(v.signal), !!k) {
        if (g) {
          await $.resumeRepositoryReads();
          return;
        }
        if ($.repos.length || $.loadingAllStars || $.loadingPage) {
          g = !0;
          return;
        }
        try {
          const t = await ue();
          if (!r.value || s !== p) return;
          g = !0, await $.loadGitHub(t.ghUser, t.ghToken);
        } catch {
          if (!r.value || s !== p) return;
          g = !1, h.value = "GitHub 初始化失败；请检查设置，或重新进入后重试。";
        }
      }
    }, { immediate: !0, flush: "sync" }), ye(() => {
      $.setAiViewActive(!1), ++p, v?.abort(), clearTimeout(G);
    }), (k, s) => (n(), l("section", {
      class: S(["card wide", { "card-fullscreen": y(Le).activeId === "card-github" }]),
      id: "card-github",
      inert: !y(r)
    }, [
      e("header", ws, [
        s[13] || (s[13] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        s[14] || (s[14] = e("h2", null, "GitHub", -1)),
        s[15] || (s[15] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", ks, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: L(ae, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: d.value === "local" ? "切换为 GitHub 全站搜索" : "切换为当前分类搜索",
              onClick: te
            }, [
              e("span", Ts, m(d.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Cs, m(d.value === "local" ? "当前分类" : "GitHub 全站"), 1),
              s[10] || (s[10] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, _s),
            U(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": s[0] || (s[0] = (t) => w.value = t),
              placeholder: N.value,
              autocomplete: "off",
              onInput: z
            }, null, 40, $s), [
              [Y, w.value]
            ]),
            d.value === "local" ? (n(), l("button", {
              key: 0,
              type: "button",
              class: S(["gh-search-rule-btn", `rule-${x.value.id}`]),
              title: `当前匹配规则：${x.value.name}（${x.value.desc}）
点击切换下一个规则`,
              onClick: L(ee, ["stop"])
            }, [
              e("span", As, m(x.value.icon), 1),
              e("span", Rs, m(x.value.name), 1)
            ], 10, Ss)) : b("", !0),
            U(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: "清空搜索",
              onClick: se
            }, "✕", 512), [
              [we, w.value]
            ]),
            s[11] || (s[11] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          s[12] || (s[12] = ke('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-04024e84><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-04024e84><input type="checkbox" value="exact" checked data-v-04024e84>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-04024e84><input type="checkbox" value="loose" data-v-04024e84>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-04024e84><input type="checkbox" value="related" data-v-04024e84>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-04024e84><input type="checkbox" value="topic" data-v-04024e84>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-04024e84><input type="checkbox" value="readme" data-v-04024e84>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-04024e84></div>', 2))
        ]),
        e("div", Gs, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: j,
            "aria-expanded": C.value,
            "aria-label": "GitHub 设置",
            class: "gh-head-settings-btn",
            title: "GitHub 模组偏好设置 (账号、Token、AI模型、缓存)",
            onClick: s[1] || (s[1] = (t) => C.value = !C.value)
          }, " ⚙️ ", 8, Hs),
          D.value ? (n(), Q(y(c), {
            key: 0,
            visible: y(r) && C.value,
            anchor: j.value,
            "ai-request": V.value,
            onAccountReload: oe,
            onClose: s[2] || (s[2] = (t) => C.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : b("", !0)
        ])
      ]),
      h.value ? (n(), l("p", xs, m(h.value), 1)) : b("", !0),
      e("div", Ls, [
        e("div", Is, [
          e("aside", Ds, [
            e("div", {
              class: S(["fo-sidebar-toggle-bar", { "is-collapsed": f.value }]),
              title: f.value ? "点击展开快捷频道" : "点击收起快捷频道",
              onClick: s[3] || (s[3] = (t) => f.value = !f.value)
            }, [
              e("div", Ns, [
                s[16] || (s[16] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                s[17] || (s[17] = e("span", null, "快捷频道", -1)),
                f.value ? (n(), l("span", Ms, "3")) : b("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !f.value,
                title: f.value ? "展开" : "收起"
              }, [
                e("span", null, m(f.value ? "展开" : "收起"), 1),
                e("span", Us, m(f.value ? "▾" : "▴"), 1)
              ], 8, Ps)
            ], 10, Es),
            f.value ? b("", !0) : (n(), l("div", Os, [
              e("div", Fs, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: S(["fo-sidebar-sub-btn", { on: i.value === "stars" }]),
                  title: "查看与管理 Star 星标仓库",
                  onClick: s[4] || (s[4] = (t) => E("stars"))
                }, [...s[18] || (s[18] = [
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
              e("div", Vs, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: S(["fo-sidebar-sub-btn", { on: i.value === "trending" }]),
                  title: "查看 GitHub 实时趋势项目",
                  onClick: s[5] || (s[5] = (t) => E("trending"))
                }, [...s[19] || (s[19] = [
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
              e("div", Bs, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: S(["fo-sidebar-sub-btn", { on: i.value === "awesome" }]),
                  title: "查看 Awesome 精选开源资源清单",
                  onClick: s[6] || (s[6] = (t) => E("awesome"))
                }, [...s[20] || (s[20] = [
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
              e("div", js, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: S(["fo-sidebar-sub-btn", { on: i.value === "repos" }]),
                  title: "查看与管理我的仓库及 Topic 看板",
                  onClick: s[7] || (s[7] = (t) => E("repos"))
                }, [...s[21] || (s[21] = [
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
            e("header", zs, [
              s[22] || (s[22] = e("div", null, [
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
                onClick: s[8] || (s[8] = (t) => y($).promptCreateFolder())
              }, "＋")
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: J
            }, [
              q($e, { active: y(r) }, null, 8, ["active"])
            ])
          ]),
          e("section", Ws, [
            i.value === "stars" && y(Ce).accountConfigured === !1 ? (n(), Q(He, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: s[9] || (s[9] = (t) => C.value = !0)
            })) : i.value === "stars" ? (n(), l(R, { key: 1 }, [
              e("header", Qs, [
                q(Re, { onOpenAiSettings: B })
              ]),
              s[23] || (s[23] = e("div", { class: "gh-main-subbar" }, [
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
              e("div", qs, [
                q(Se, {
                  active: y(r) && i.value === "stars"
                }, null, 8, ["active"])
              ]),
              s[24] || (s[24] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", Ks, [
                q(Ge)
              ]),
              e("div", Ys, [
                q(Ae, {
                  active: y(r) && i.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : i.value === "trending" ? (n(), Q(xe, { key: 2 })) : i.value === "awesome" ? (n(), Q(Xe, { key: 3 })) : i.value === "repos" ? (n(), Q(bs, {
              key: 4,
              active: y(r) && i.value === "repos"
            }, null, 8, ["active"])) : b("", !0)
          ])
        ])
      ])
    ], 10, ys));
  }
}), la = /* @__PURE__ */ pe(Js, [["__scopeId", "data-v-04024e84"]]);
export {
  la as default
};
