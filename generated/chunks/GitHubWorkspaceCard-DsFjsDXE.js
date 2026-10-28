import { d as fe, o as i, e as u, f as e, l as z, n as ee, g as w, F as D, h as E, B as x, t as f, u as k, i as N, b as _, s as B, r as Ae, x as ie, C as De, y as Ee, m as Z, k as ne, c as O, j as Me, A as Ie, L as Ne, z as Pe, H as Ue, D as J, E as Fe } from "./vendor-vue-DokqDua_.js";
import { u as Ve } from "./useCardActivity-YE-BRUio.js";
import { D as ge, E as Te, t as H, y as We } from "./search.service-D8BPpHmG.js";
import { _ as Oe, a as je, b as ze, g as $e, G as Be, c as qe } from "./main-BDsnHVTC.js";
import { A as Qe } from "./AccountSetupGuide-b0Xd0kWd.js";
import Ke from "./GitHubTrending-QLfHgZFr.js";
import { _ as he } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { s as pe } from "./storage-cache.service-BYF2zxXX.js";
import { n as Se, r as Ye } from "./view-styles-CHw25oOz.js";
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
  setup(q) {
    const c = _("all"), r = _(""), m = B(() => {
      const b = r.value.trim().toLowerCase(), v = c.value;
      return Je.filter((n) => v === "all" || n.category === v ? b ? n.name.toLowerCase().includes(b) || n.title.toLowerCase().includes(b) || n.desc.toLowerCase().includes(b) || n.tags.some((d) => d.toLowerCase().includes(b)) : !0 : !1);
    });
    function h(b) {
      window.open(b, "_blank", "noreferrer");
    }
    return (b, v) => (i(), u("div", Ze, [
      e("header", et, [
        e("div", tt, [
          v[3] || (v[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", st, [
            z(e("input", {
              "onUpdate:modelValue": v[0] || (v[0] = (n) => r.value = n),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [ee, r.value]
            ]),
            r.value ? (i(), u("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: v[1] || (v[1] = (n) => r.value = "")
            }, "✕")) : w("", !0)
          ])
        ]),
        e("div", ot, [
          (i(!0), u(D, null, E(k(Xe), (n) => (i(), u("button", {
            key: n.id,
            type: "button",
            class: x(["gh-awesome-pill", { active: c.value === n.id }]),
            onClick: (g) => c.value = n.id
          }, [
            e("span", null, f(n.icon), 1),
            e("b", null, f(n.name), 1)
          ], 10, at))), 128))
        ])
      ]),
      e("div", nt, [
        (i(!0), u(D, null, E(m.value, (n) => (i(), u("article", {
          key: n.id,
          class: "gh-awesome-card",
          onClick: (g) => h(n.url)
        }, [
          e("div", lt, [
            e("div", rt, [
              e("strong", null, f(n.title), 1),
              e("small", null, f(n.name), 1)
            ]),
            e("span", ct, "★ " + f(n.stars), 1)
          ]),
          e("p", ut, f(n.desc), 1),
          e("div", dt, [
            e("div", pt, [
              (i(!0), u(D, null, E(n.tags, (g) => (i(), u("span", {
                key: g,
                class: "gh-awesome-tag"
              }, f(g), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: n.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: v[2] || (v[2] = N(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, mt)
          ])
        ], 8, it))), 128)),
        m.value.length ? w("", !0) : (i(), u("div", gt, [...v[4] || (v[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), ht = /* @__PURE__ */ he(ft, [["__scopeId", "data-v-28a8995f"]]), me = "gh_my_repos_cache_v1", W = "gh_my_repo_custom_topics_v1", p = Ae({
  loading: !1,
  syncingTopic: !1,
  errorMessage: "",
  repos: [],
  customTopicNames: [],
  searchQuery: "",
  editingColumnTopic: null,
  composerActiveColumnId: null
});
function F(q) {
  let c = q.trim().toLowerCase();
  return c = c.replace(/[\s_]+/g, "-"), c = c.replace(/[^a-z0-9-]/g, ""), c = c.replace(/^-+|-+$/g, "").replace(/-+/g, "-"), c.length > 35 && (c = c.slice(0, 35).replace(/-+$/, "")), c;
}
class j {
  constructor() {
    this.abortController = null;
  }
  static getInstance() {
    return j.instance || (j.instance = new j()), j.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略）
   */
  async load(c = !1) {
    this.abortController?.abort(), this.abortController = new AbortController();
    const r = this.abortController.signal;
    await this.loadPersistedCustomTopics();
    const m = await pe.get(me);
    if (m && m.length && (p.repos = m), !c && m && m.length) {
      this.fetchRemote(r).catch(() => {
      });
      return;
    }
    p.loading = !0, p.errorMessage = "";
    try {
      await this.fetchRemote(r);
    } catch (h) {
      if (h.name === "AbortError") return;
      p.errorMessage = h.message || "获取个人仓库失败";
    } finally {
      p.loading = !1;
    }
  }
  async fetchRemote(c) {
    const { ghUser: r, ghToken: m } = await ge();
    if (!r && !m) {
      p.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    let h = "https://api.github.com/user/repos?type=owner&sort=updated&per_page=100";
    m || (h = `https://api.github.com/users/${encodeURIComponent(r)}/repos?type=owner&sort=updated&per_page=100`);
    const b = Te(m), v = await fetch(h, {
      method: "GET",
      headers: b,
      signal: c
    });
    if (!v.ok)
      throw v.status === 401 ? new Error("GitHub Token 无效或已过期，请在设置中更新。") : v.status === 403 ? new Error("GitHub API 频率受限或无权访问，请检查 Token 权限。") : new Error(`GitHub 请求失败 (HTTP ${v.status})`);
    const n = await v.json();
    if (!Array.isArray(n))
      throw new Error("GitHub 返回数据格式异常");
    const g = n.map((d) => ({
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
      topics: Array.isArray(d.topics) ? d.topics.map((S) => String(S).toLowerCase()) : [],
      updatedAt: d.updated_at || "",
      pushedAt: d.pushed_at || "",
      defaultBranch: d.default_branch || "main"
    }));
    p.repos = g, await pe.set(me, g, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 提交单个仓库的 Topics 到 GitHub 远端
   */
  async syncRepoTopics(c, r) {
    const { ghToken: m } = await ge();
    if (!m)
      return alert("向 GitHub 更新 Topic 需要在 GitHub 设置中配置具备 repo 写入权限的 Token。"), !1;
    const h = Array.from(new Set(r.map(F).filter(Boolean))).slice(0, 20), [b, v] = c.fullName.split("/"), n = `https://api.github.com/repos/${encodeURIComponent(b)}/${encodeURIComponent(v)}/topics`;
    p.syncingTopic = !0;
    try {
      const g = Te(m), d = await fetch(n, {
        method: "PUT",
        headers: {
          ...g,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: h })
      });
      if (!d.ok)
        throw d.status === 401 || d.status === 403 ? new Error("Token 权限不足。修改 Topics 需要包含 repo（或 Administration:write）作用域。") : d.status === 404 ? new Error("仓库未找到或无权修改。") : new Error(`GitHub 远端保存失败 (HTTP ${d.status})`);
      const S = await d.json(), T = Array.isArray(S.names) ? S.names : h;
      return c.topics = T, await pe.set(me, p.repos, { ttlMs: 30 * 86400 * 1e3 }), !0;
    } catch (g) {
      return alert(`更新 GitHub Topics 失败：${g.message || g}`), !1;
    } finally {
      p.syncingTopic = !1;
    }
  }
  /**
   * 将仓库添加到指定 Topic（若远端不存在则新增并提交）
   */
  async addRepoToTopic(c, r) {
    const m = F(r);
    if (!m) return !1;
    if (c.topics.includes(m)) return !0;
    const h = [...c.topics, m];
    return this.syncRepoTopics(c, h);
  }
  /**
   * 将仓库从指定 Topic 移除
   */
  async removeRepoFromTopic(c, r) {
    const m = F(r);
    if (!c.topics.includes(m)) return !0;
    const h = c.topics.filter((b) => b !== m);
    return this.syncRepoTopics(c, h);
  }
  /**
   * 新建一个 Topic 列（本地与远端集合）
   */
  async createTopicColumn(c) {
    const r = F(c);
    return r ? p.customTopicNames.includes(r) ? (alert(`Topic「${r}」板块已存在。`), null) : (p.customTopicNames.push(r), await this.persistCustomTopics(), r) : (alert("Topic 名称无效。GitHub 规范：仅限 1~35 位小写英文字母、数字和连字符 '-'。"), null);
  }
  /**
   * 重命名 Topic 列：同步将该板块下所有仓库的旧 Topic 替换为新 Topic 并提交到 GitHub
   */
  async renameTopicColumn(c, r) {
    const m = F(r);
    if (!m)
      return alert("新 Topic 名称无效。仅限小写英文、数字与中划线。"), !1;
    if (c === m) return !0;
    const h = p.repos.filter((b) => b.topics.includes(c));
    if (h.length > 0) {
      if (!confirm(
        `确定将板块「${c}」重命名为「${m}」吗？
这将调用 GitHub API 同步更新该板块下的 ${h.length} 个仓库的远端 Topic。`
      )) return !1;
      p.syncingTopic = !0;
      let v = 0, n = 0;
      for (const g of h) {
        const d = g.topics.map((T) => T === c ? m : T);
        await this.syncRepoTopics(g, d) ? v++ : n++;
      }
      p.syncingTopic = !1, n > 0 && alert(`重命名完成，成功更新 ${v} 个仓库，失败 ${n} 个。`);
    }
    return p.customTopicNames = p.customTopicNames.map((b) => b === c ? m : b), await this.persistCustomTopics(), !0;
  }
  /**
   * 删除 Topic 板块：从该板块下所有仓库中移除该 topic
   */
  async deleteTopicColumn(c) {
    const r = p.repos.filter((h) => h.topics.includes(c)), m = r.length > 0 ? `确定删除板块「${c}」吗？
将从该板块下的 ${r.length} 个仓库中移除此 Topic 并在 GitHub 远端同步。` : `确定删除空板块「${c}」吗？`;
    if (!confirm(m)) return !1;
    if (r.length > 0) {
      p.syncingTopic = !0;
      for (const h of r)
        await this.removeRepoFromTopic(h, c);
      p.syncingTopic = !1;
    }
    return p.customTopicNames = p.customTopicNames.filter((h) => h !== c), await this.persistCustomTopics(), !0;
  }
  async loadPersistedCustomTopics() {
    try {
      const r = (typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([W]) : { [W]: JSON.parse(localStorage.getItem(W) || "[]") })?.[W];
      Array.isArray(r) && (p.customTopicNames = r.map(F).filter(Boolean));
    } catch {
    }
  }
  async persistCustomTopics() {
    const c = Array.from(new Set(p.customTopicNames.map(F).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [W]: c }) : localStorage.setItem(W, JSON.stringify(c));
    } catch {
    }
  }
}
const G = j.getInstance(), vt = { class: "my-repos-workspace" }, bt = { class: "my-repos-header" }, wt = { class: "header-left" }, yt = { class: "title" }, kt = { class: "count-pill" }, _t = {
  key: 0,
  class: "sync-status"
}, Ct = { class: "header-right" }, Tt = { class: "search-box" }, $t = ["disabled"], St = {
  key: 0,
  class: "error-banner"
}, At = { class: "board-columns-track" }, xt = { class: "column-header" }, Rt = { class: "column-title-group" }, Gt = { class: "badge-count" }, Ht = { class: "column-cards-scroll" }, Lt = ["onDragstart", "onContextmenu"], Dt = { class: "repo-card-head" }, Et = ["title", "onClick"], Mt = {
  key: 0,
  class: "badge-repo-visibility private"
}, It = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Nt = ["title"], Pt = {
  key: 1,
  class: "repo-topics-row"
}, Ut = { class: "repo-card-footer" }, Ft = { class: "meta-left" }, Vt = {
  key: 0,
  class: "meta-item lang"
}, Wt = { class: "meta-item" }, Ot = {
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
}, bs = { class: "meta-item" }, ws = {
  key: 1,
  class: "meta-item"
}, ys = { class: "meta-date" }, ks = {
  key: 0,
  class: "empty-column-placeholder"
}, _s = { class: "board-column new-column-slot" }, Cs = {
  key: 1,
  class: "new-column-composer"
}, Ts = { class: "composer-actions" }, $s = ["onClick"], Ss = /* @__PURE__ */ fe({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(q) {
    const c = q, r = _(""), m = _(!1), h = _(null), b = _(""), v = _(null), n = _(null), g = _(null), d = _(null), S = _(null);
    let T = null, M = 0;
    const y = Ae({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromTopic: null
    }), L = _(null), Q = _(!1);
    function A() {
      y.visible = !1, L.value = null;
    }
    function P(o, t, s) {
      o.preventDefault(), o.stopPropagation();
      let a = o.clientX, $ = o.clientY;
      a > window.innerWidth - 200 && (a = window.innerWidth - 210), $ > window.innerHeight - 240 && ($ = window.innerHeight - 245), y.x = a, y.y = $, y.repo = t, y.fromTopic = s, y.visible = !0, L.value = "folder", Q.value = a > window.innerWidth - 380;
    }
    async function le() {
      const o = y.repo, t = y.fromTopic;
      A(), o && (t && t !== "default" ? await G.removeRepoFromTopic(o, t) : o.topics.length && await G.syncRepoTopics(o, []));
    }
    async function te(o) {
      const t = y.repo, s = y.fromTopic;
      if (A(), !!t)
        if (s && s !== "default" && s !== o) {
          const a = t.topics.filter(($) => $ !== s);
          a.includes(o) || a.push(o), await G.syncRepoTopics(t, a);
        } else
          await G.addRepoToTopic(t, o);
    }
    async function se() {
      const o = y.repo;
      if (A(), !!o)
        try {
          await navigator.clipboard.writeText(o.htmlUrl), Se.show({
            appName: "GitHub",
            title: "已复制链接",
            message: `已复制 ${o.name} 仓库链接`
          });
        } catch {
        }
    }
    async function I() {
      const o = y.repo;
      if (A(), !!o)
        try {
          const t = `git clone ${o.htmlUrl}.git`;
          await navigator.clipboard.writeText(t), Se.show({
            appName: "GitHub",
            title: "已复制克隆命令",
            message: t
          });
        } catch {
        }
    }
    function re() {
      const o = y.repo;
      A(), o && de(o.htmlUrl);
    }
    function V(o) {
      o.target?.closest(".gh-repo-context-menu") || y.visible && A();
    }
    function U(o) {
      o.key === "Escape" && y.visible && A();
    }
    const K = B(() => {
      const o = new Set(p.customTopicNames);
      for (const t of p.repos)
        for (const s of t.topics)
          s && o.add(s);
      return Array.from(o).sort();
    }), oe = B(() => {
      const o = p.searchQuery.trim().toLowerCase();
      return o ? p.repos.filter(
        (t) => t.name.toLowerCase().includes(o) || t.description.toLowerCase().includes(o) || t.topics.some((s) => s.includes(o)) || t.language && t.language.toLowerCase().includes(o)
      ) : p.repos;
    }), Y = B(() => {
      const o = new Set(K.value);
      return oe.value.filter((t) => t.topics.length ? !t.topics.some((s) => o.has(s)) : !0);
    });
    function X(o) {
      return oe.value.filter((t) => t.topics.includes(o));
    }
    async function C() {
      const o = r.value.trim();
      if (!o) return;
      await G.createTopicColumn(o) && (r.value = "", m.value = !1);
    }
    function l(o) {
      v.value = o, b.value = o, h.value = null;
    }
    async function R(o) {
      const t = b.value.trim();
      if (!t || t === o) {
        v.value = null;
        return;
      }
      await G.renameTopicColumn(o, t) && (v.value = null);
    }
    async function xe(o) {
      h.value = null, await G.deleteTopicColumn(o);
    }
    async function Re(o, t) {
      await G.removeRepoFromTopic(o, t);
    }
    function Ge(o) {
      const t = n.value;
      if (t && (o.shiftKey || g.value || Math.abs(o.deltaX) > 0)) {
        o.preventDefault();
        const s = o.deltaX !== 0 ? o.deltaX : o.deltaY;
        t.scrollLeft += s;
      }
    }
    function ce(o) {
      if (!g.value || !n.value) return;
      o.preventDefault();
      const t = o.deltaX !== 0 ? o.deltaX : o.deltaY;
      n.value.scrollLeft += t * 1.2;
    }
    function ve() {
      if (T !== null) return;
      const o = () => {
        n.value && M !== 0 ? (n.value.scrollLeft += M, T = requestAnimationFrame(o)) : ae();
      };
      T = requestAnimationFrame(o);
    }
    function ae() {
      T !== null && (cancelAnimationFrame(T), T = null), M = 0;
    }
    function be(o) {
      if (!g.value || !n.value) return;
      const t = n.value.getBoundingClientRect(), s = 100;
      if (o > t.right - s) {
        const a = Math.min(1, Math.max(0.1, (o - (t.right - s)) / s));
        M = Math.round(a * 20), ve();
      } else if (o < t.left + s) {
        const a = Math.min(1, Math.max(0.1, (t.left + s - o) / s));
        M = -Math.round(a * 20), ve();
      } else
        ae();
    }
    function He(o) {
      g.value && (o.preventDefault(), be(o.clientX));
    }
    function we(o, t, s) {
      A(), g.value = t, d.value = s, o.dataTransfer && (o.dataTransfer.effectAllowed = "move", o.dataTransfer.setData("text/plain", `${t.id}:${s}`)), window.addEventListener("wheel", ce, { passive: !1 });
    }
    function ue() {
      g.value = null, d.value = null, S.value = null, ae(), window.removeEventListener("wheel", ce);
    }
    function ye(o, t) {
      g.value && (o.preventDefault(), o.dataTransfer && (o.dataTransfer.dropEffect = "move"), S.value = t, be(o.clientX));
    }
    function ke(o, t) {
      const s = o.currentTarget, a = o.relatedTarget;
      s?.contains(a) || S.value === t && (S.value = null);
    }
    async function _e(o, t) {
      o.preventDefault();
      const s = g.value, a = d.value;
      if (ue(), !!s)
        if (t === "default")
          a && a !== "default" && await G.removeRepoFromTopic(s, a);
        else if (a && a !== "default" && a !== t) {
          const $ = s.topics.filter((Le) => Le !== a);
          $.includes(t) || $.push(t), await G.syncRepoTopics(s, $);
        } else
          await G.addRepoToTopic(s, t);
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
      () => c.active,
      (o) => {
        window.removeEventListener("pointerdown", V), window.removeEventListener("keydown", U), A(), o && (window.addEventListener("pointerdown", V), window.addEventListener("keydown", U), p.repos.length || G.load());
      },
      { immediate: !0 }
    ), De(() => {
      c.active && (window.addEventListener("pointerdown", V), window.addEventListener("keydown", U), p.repos.length || G.load());
    }), Ee(() => {
      window.removeEventListener("wheel", ce), window.removeEventListener("pointerdown", V), window.removeEventListener("keydown", U), ae(), A();
    }), (o, t) => (i(), u("div", vt, [
      e("header", bt, [
        e("div", wt, [
          e("h2", yt, [
            t[22] || (t[22] = e("span", { class: "icon" }, "📦", -1)),
            t[23] || (t[23] = e("span", null, "我的仓库 · Topic 看板", -1)),
            e("span", kt, f(k(p).repos.length) + " 个项目", 1)
          ]),
          k(p).syncingTopic ? (i(), u("span", _t, [...t[24] || (t[24] = [
            e("i", { class: "spin-icon" }, "⏳", -1),
            Z(" 正在同步 GitHub 远端 Topics… ", -1)
          ])])) : w("", !0)
        ]),
        e("div", Ct, [
          e("div", Tt, [
            z(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (s) => k(p).searchQuery = s),
              type: "text",
              placeholder: "过滤仓库名 / 描述 / 标签...",
              class: "search-input"
            }, null, 512), [
              [ee, k(p).searchQuery]
            ]),
            k(p).searchQuery ? (i(), u("button", {
              key: 0,
              type: "button",
              class: "clear-btn",
              onClick: t[1] || (t[1] = (s) => k(p).searchQuery = "")
            }, "✕")) : w("", !0)
          ]),
          e("button", {
            type: "button",
            class: "btn-refresh",
            disabled: k(p).loading || k(p).syncingTopic,
            title: "重新从 GitHub 拉取仓库列表",
            onClick: t[2] || (t[2] = (s) => k(G).load(!0))
          }, [
            e("span", {
              class: x({ spinning: k(p).loading })
            }, "🔄", 2),
            e("span", null, f(k(p).loading ? "正在刷新…" : "刷新仓库"), 1)
          ], 8, $t)
        ])
      ]),
      k(p).errorMessage ? (i(), u("div", St, [
        e("span", null, "⚠️ " + f(k(p).errorMessage), 1),
        e("button", {
          type: "button",
          onClick: t[3] || (t[3] = (s) => k(G).load(!0))
        }, "重试")
      ])) : w("", !0),
      e("div", {
        ref_key: "boardViewportRef",
        ref: n,
        class: "board-viewport",
        onWheel: Ge,
        onDragover: He
      }, [
        e("div", At, [
          e("section", {
            class: x(["board-column default-column", { "drop-active": S.value === "default" }]),
            onDragover: t[4] || (t[4] = (s) => ye(s, "default")),
            onDragleave: t[5] || (t[5] = (s) => ke(s, "default")),
            onDrop: t[6] || (t[6] = (s) => _e(s, "default"))
          }, [
            e("header", xt, [
              e("div", Rt, [
                t[25] || (t[25] = e("span", { class: "col-dot default-dot" }, null, -1)),
                t[26] || (t[26] = e("h3", { class: "column-title" }, "默认板块", -1)),
                e("span", Gt, f(Y.value.length), 1)
              ]),
              t[27] || (t[27] = e("div", { class: "column-actions" }, [
                e("span", {
                  class: "column-hint",
                  title: "未分配到右侧任何 Topic 的项目自动归入此板块"
                }, "未分类")
              ], -1))
            ]),
            e("div", Ht, [
              (i(!0), u(D, null, E(Y.value, (s) => (i(), u("div", {
                key: s.id,
                class: x(["repo-card", { "card-dragging": g.value?.id === s.id }]),
                draggable: "true",
                onDragstart: (a) => we(a, s, "default"),
                onDragend: ue,
                onContextmenu: (a) => P(a, s, "default")
              }, [
                e("div", Dt, [
                  e("span", {
                    class: "repo-name",
                    title: s.fullName,
                    onClick: (a) => de(s.htmlUrl)
                  }, f(s.name), 9, Et),
                  s.isPrivate ? (i(), u("span", Mt, "私有")) : w("", !0),
                  s.isFork ? (i(), u("span", It, "Fork")) : w("", !0)
                ]),
                s.description ? (i(), u("p", {
                  key: 0,
                  class: "repo-desc",
                  title: s.description
                }, f(s.description), 9, Nt)) : w("", !0),
                s.topics.length ? (i(), u("div", Pt, [
                  (i(!0), u(D, null, E(s.topics, (a) => (i(), u("span", {
                    key: a,
                    class: "topic-chip"
                  }, " #" + f(a), 1))), 128))
                ])) : w("", !0),
                e("div", Ut, [
                  e("div", Ft, [
                    s.language ? (i(), u("span", Vt, [
                      t[28] || (t[28] = e("span", { class: "lang-color" }, null, -1)),
                      Z(f(s.language), 1)
                    ])) : w("", !0),
                    e("span", Wt, "⭐ " + f(s.stargazersCount), 1),
                    s.forksCount ? (i(), u("span", Ot, "🍴 " + f(s.forksCount), 1)) : w("", !0)
                  ]),
                  e("span", {
                    class: "meta-date",
                    title: "最后更新：" + s.updatedAt
                  }, f(Ce(s.pushedAt || s.updatedAt)), 9, jt)
                ])
              ], 42, Lt))), 128)),
              Y.value.length ? w("", !0) : (i(), u("div", zt, [...t[29] || (t[29] = [
                e("span", null, "暂无未分类仓库", -1)
              ])]))
            ])
          ], 34),
          (i(!0), u(D, null, E(K.value, (s) => (i(), u("section", {
            key: s,
            class: x(["board-column topic-column", { "drop-active": S.value === s }]),
            onDragover: (a) => ye(a, s),
            onDragleave: (a) => ke(a, s),
            onDrop: (a) => _e(a, s)
          }, [
            e("header", qt, [
              v.value !== s ? (i(), u("div", Qt, [
                t[30] || (t[30] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "GitHub Topic: " + s
                }, " #" + f(s), 9, Kt),
                e("span", Yt, f(X(s).length), 1)
              ])) : (i(), u("div", Xt, [
                z(e("input", {
                  "onUpdate:modelValue": t[7] || (t[7] = (a) => b.value = a),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    ne((a) => R(s), ["enter"]),
                    t[8] || (t[8] = ne((a) => v.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, Jt), [
                  [ee, b.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (a) => R(s)
                }, "✓", 8, Zt),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: t[9] || (t[9] = (a) => v.value = null)
                }, "✕")
              ])),
              e("div", es, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "板块操作（重命名 / 删除）",
                  onClick: (a) => h.value = h.value === s ? null : s
                }, "•••", 8, ts),
                h.value === s ? (i(), u("div", ss, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (a) => l(s)
                  }, " ✏️ 重命名 Topic 并同步 ", 8, os),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (a) => xe(s)
                  }, " 🗑️ 删除板块并从远端移除 ", 8, as)
                ])) : w("", !0)
              ])
            ]),
            e("div", ns, [
              (i(!0), u(D, null, E(X(s), (a) => (i(), u("div", {
                key: a.id,
                class: x(["repo-card", { "card-dragging": g.value?.id === a.id }]),
                draggable: "true",
                onDragstart: ($) => we($, a, s),
                onDragend: ue,
                onContextmenu: ($) => P($, a, s)
              }, [
                e("div", ls, [
                  e("span", {
                    class: "repo-name",
                    title: a.fullName,
                    onClick: ($) => de(a.htmlUrl)
                  }, f(a.name), 9, rs),
                  a.isPrivate ? (i(), u("span", cs, "私有")) : w("", !0),
                  a.isFork ? (i(), u("span", us, "Fork")) : w("", !0)
                ]),
                a.description ? (i(), u("p", {
                  key: 0,
                  class: "repo-desc",
                  title: a.description
                }, f(a.description), 9, ds)) : w("", !0),
                e("div", ps, [
                  e("span", ms, [
                    Z(" #" + f(s) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从当前 Topic 移除并同步到 GitHub",
                      onClick: N(($) => Re(a, s), ["stop"])
                    }, "✕", 8, gs)
                  ]),
                  (i(!0), u(D, null, E(a.topics.filter(($) => $ !== s), ($) => (i(), u("span", {
                    key: $,
                    class: "topic-chip other-chip"
                  }, " #" + f($), 1))), 128))
                ]),
                e("div", fs, [
                  e("div", hs, [
                    a.language ? (i(), u("span", vs, [
                      t[31] || (t[31] = e("span", { class: "lang-color" }, null, -1)),
                      Z(f(a.language), 1)
                    ])) : w("", !0),
                    e("span", bs, "⭐ " + f(a.stargazersCount), 1),
                    a.forksCount ? (i(), u("span", ws, "🍴 " + f(a.forksCount), 1)) : w("", !0)
                  ]),
                  e("span", ys, f(Ce(a.pushedAt || a.updatedAt)), 1)
                ])
              ], 42, is))), 128)),
              X(s).length ? w("", !0) : (i(), u("div", ks, [...t[32] || (t[32] = [
                e("span", null, "暂无项目，可从其他列拖拽至此", -1)
              ])]))
            ])
          ], 42, Bt))), 128)),
          e("section", _s, [
            m.value ? (i(), u("div", Cs, [
              t[34] || (t[34] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建 Topic 分组"),
                e("small", null, "将作为 GitHub 远端标签同步")
              ], -1)),
              z(e("input", {
                "onUpdate:modelValue": t[11] || (t[11] = (s) => r.value = s),
                type: "text",
                placeholder: "例如 tools, vue3, robotics...",
                class: "composer-input",
                onKeydown: [
                  ne(C, ["enter"]),
                  t[12] || (t[12] = ne((s) => m.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [ee, r.value]
              ]),
              e("div", Ts, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: C
                }, "创建板块"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: t[13] || (t[13] = (s) => m.value = !1)
                }, "取消")
              ])
            ])) : (i(), u("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: t[10] || (t[10] = (s) => m.value = !0)
            }, [...t[33] || (t[33] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建 Topic 板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (i(), O(Me, { to: "body" }, [
        y.visible && y.repo ? (i(), u("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Ie({ left: `${y.x}px`, top: `${y.y}px` }),
          onClick: t[20] || (t[20] = N(() => {
          }, ["stop"])),
          onContextmenu: t[21] || (t[21] = N(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: x(["gh-menu-has-sub", { "is-active": L.value === "folder" }]),
            onMouseenter: t[16] || (t[16] = (s) => L.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: t[14] || (t[14] = N((s) => L.value = L.value === "folder" ? null : "folder", ["stop"]))
            }, [...t[35] || (t[35] = [
              e("span", null, "📁 移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: x(["gh-sub-flyout", { "flyout-left": Q.value }]),
              onClick: t[15] || (t[15] = N(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: x(["fo-cover-menu-item", { primary: !y.repo.topics.length }]),
                type: "button",
                onClick: le
              }, f(y.repo.topics.length ? "  " : "✓ ") + "＋ 设为未分类（移入默认板块） ", 3),
              (i(!0), u(D, null, E(K.value, (s) => (i(), u("button", {
                key: s,
                class: x(["fo-cover-menu-item", { primary: y.repo.topics.includes(s) }]),
                type: "button",
                onClick: (a) => te(s)
              }, f(y.repo.topics.includes(s) ? "✓ " : "  ") + "📁 " + f(s), 11, $s))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: t[17] || (t[17] = (s) => L.value = null),
            onClick: se
          }, " 📋 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: t[18] || (t[18] = (s) => L.value = null),
            onClick: I
          }, " 💻 复制克隆命令 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: t[19] || (t[19] = (s) => L.value = null),
            onClick: re
          }, " ↗ 在 GitHub 打开 ", 32)
        ], 36)) : w("", !0)
      ]))
    ]));
  }
}), As = /* @__PURE__ */ he(Ss, [["__scopeId", "data-v-198500d9"]]), xs = ["inert"], Rs = { class: "card-head" }, Gs = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, Hs = ["title"], Ls = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Ds = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Es = ["placeholder"], Ms = ["title"], Is = { class: "gh-search-rule-icon" }, Ns = { class: "gh-search-rule-text" }, Ps = { class: "gh-settings-anchor" }, Us = ["aria-expanded"], Fs = {
  key: 0,
  class: "muted small",
  role: "status"
}, Vs = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Ws = { class: "gh-bili-layout" }, Os = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, js = ["title"], zs = { class: "fo-sidebar-toggle-title" }, Bs = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, qs = ["aria-expanded", "title"], Qs = { class: "fo-sidebar-toggle-chevron" }, Ks = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, Ys = { class: "fo-sidebar-sub-wrap" }, Xs = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Js = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Zs = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, eo = { class: "gh-bili-sidebar-head" }, to = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, so = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, oo = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, ao = { id: "vue-github-status-root" }, no = { id: "vue-github-repositories-root" }, io = /* @__PURE__ */ fe({
  __name: "GitHubWorkspaceCard",
  setup(q) {
    const c = Fe(() => import("./GitHubSettingsModal-C-CAi-mE.js")), { active: r } = Ve("card-github", "/github.html");
    let m = 0, h = !1, b;
    const v = _(""), n = _("stars");
    ie(() => r.value && n.value === "stars", (C) => H.setAiViewActive(C), { immediate: !0, flush: "sync" });
    const g = _(!1), d = _("local"), S = _(""), T = _(!1), M = _(0);
    function y() {
      r.value && (T.value = !0, ++M.value);
    }
    const L = _(!1);
    ie(T, (C) => {
      C && (L.value = !0);
    });
    const Q = _(null);
    let A = 0;
    function P(C) {
      n.value = C, C === "trending" ? $e.switchTab("trending") : $e.switchTab("stars");
    }
    function le() {
      n.value = "stars";
    }
    const te = [
      { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
      { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
      { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
      { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
    ], se = _(H.searchRule || "exact"), I = B(() => te.find((C) => C.id === se.value) || te[0]);
    function re() {
      const C = H.cycleSearchRule();
      se.value = C;
    }
    const V = B(() => d.value === "global" ? "在 GitHub 全网搜索开源仓库…" : `在当前分类中${I.value.name}搜索 Star 仓库…`);
    function U() {
      clearTimeout(A), !(!r.value || d.value !== "local") && (A = window.setTimeout(() => H.setSearchQuery(S.value.trim().toLowerCase()), 180));
    }
    function K() {
      d.value = d.value === "local" ? "global" : "local", d.value === "local" && U();
    }
    function oe() {
      S.value = "", clearTimeout(A), H.resetLocalSearch();
    }
    function Y() {
      const C = S.value.trim();
      d.value === "local" ? (clearTimeout(A), H.setSearchQuery(C.toLowerCase())) : C && window.open(`https://github.com/search?q=${encodeURIComponent(C)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function X() {
      ++m, h = !0, v.value = "";
    }
    return ie(r, async (C) => {
      const l = ++m;
      if (clearTimeout(A), b?.abort(), b = new AbortController(), C || b.abort(), H.setRepositoryViewSignal(b.signal), !!C) {
        if (h) {
          await H.resumeRepositoryReads();
          return;
        }
        if (H.repos.length || H.loadingAllStars || H.loadingPage) {
          h = !0;
          return;
        }
        try {
          const R = await ge();
          if (!r.value || l !== m) return;
          h = !0, await H.loadGitHub(R.ghUser, R.ghToken);
        } catch {
          if (!r.value || l !== m) return;
          h = !1, v.value = "GitHub 初始化失败；请检查设置，或重新进入后重试。";
        }
      }
    }, { immediate: !0, flush: "sync" }), Ne(() => {
      H.setAiViewActive(!1), ++m, b?.abort(), clearTimeout(A);
    }), (C, l) => (i(), u("section", {
      class: x(["card wide", { "card-fullscreen": k(Ye).activeId === "card-github" }]),
      id: "card-github",
      inert: !k(r)
    }, [
      e("header", Rs, [
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
        e("div", Gs, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: N(Y, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: d.value === "local" ? "切换为 GitHub 全站搜索" : "切换为当前分类搜索",
              onClick: K
            }, [
              e("span", Ls, f(d.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Ds, f(d.value === "local" ? "当前分类" : "GitHub 全站"), 1),
              l[10] || (l[10] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, Hs),
            z(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": l[0] || (l[0] = (R) => S.value = R),
              placeholder: V.value,
              autocomplete: "off",
              onInput: U
            }, null, 40, Es), [
              [ee, S.value]
            ]),
            d.value === "local" ? (i(), u("button", {
              key: 0,
              type: "button",
              class: x(["gh-search-rule-btn", `rule-${I.value.id}`]),
              title: `当前匹配规则：${I.value.name}（${I.value.desc}）
点击切换下一个规则`,
              onClick: N(re, ["stop"])
            }, [
              e("span", Is, f(I.value.icon), 1),
              e("span", Ns, f(I.value.name), 1)
            ], 10, Ms)) : w("", !0),
            z(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: "清空搜索",
              onClick: oe
            }, "✕", 512), [
              [Pe, S.value]
            ]),
            l[11] || (l[11] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          l[12] || (l[12] = Ue('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-04024e84><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-04024e84><input type="checkbox" value="exact" checked data-v-04024e84>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-04024e84><input type="checkbox" value="loose" data-v-04024e84>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-04024e84><input type="checkbox" value="related" data-v-04024e84>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-04024e84><input type="checkbox" value="topic" data-v-04024e84>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-04024e84><input type="checkbox" value="readme" data-v-04024e84>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-04024e84></div>', 2))
        ]),
        e("div", Ps, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: Q,
            "aria-expanded": T.value,
            "aria-label": "GitHub 设置",
            class: "gh-head-settings-btn",
            title: "GitHub 模组偏好设置 (账号、Token、AI模型、缓存)",
            onClick: l[1] || (l[1] = (R) => T.value = !T.value)
          }, " ⚙️ ", 8, Us),
          L.value ? (i(), O(k(c), {
            key: 0,
            visible: k(r) && T.value,
            anchor: Q.value,
            "ai-request": M.value,
            onAccountReload: X,
            onClose: l[2] || (l[2] = (R) => T.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : w("", !0)
        ])
      ]),
      v.value ? (i(), u("p", Fs, f(v.value), 1)) : w("", !0),
      e("div", Vs, [
        e("div", Ws, [
          e("aside", Os, [
            e("div", {
              class: x(["fo-sidebar-toggle-bar", { "is-collapsed": g.value }]),
              title: g.value ? "点击展开快捷频道" : "点击收起快捷频道",
              onClick: l[3] || (l[3] = (R) => g.value = !g.value)
            }, [
              e("div", zs, [
                l[16] || (l[16] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                l[17] || (l[17] = e("span", null, "快捷频道", -1)),
                g.value ? (i(), u("span", Bs, "3")) : w("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !g.value,
                title: g.value ? "展开" : "收起"
              }, [
                e("span", null, f(g.value ? "展开" : "收起"), 1),
                e("span", Qs, f(g.value ? "▾" : "▴"), 1)
              ], 8, qs)
            ], 10, js),
            g.value ? w("", !0) : (i(), u("div", Ks, [
              e("div", Ys, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: x(["fo-sidebar-sub-btn", { on: n.value === "stars" }]),
                  title: "查看与管理 Star 星标仓库",
                  onClick: l[4] || (l[4] = (R) => P("stars"))
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
              e("div", Xs, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: x(["fo-sidebar-sub-btn", { on: n.value === "trending" }]),
                  title: "查看 GitHub 实时趋势项目",
                  onClick: l[5] || (l[5] = (R) => P("trending"))
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
              e("div", Js, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: x(["fo-sidebar-sub-btn", { on: n.value === "awesome" }]),
                  title: "查看 Awesome 精选开源资源清单",
                  onClick: l[6] || (l[6] = (R) => P("awesome"))
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
              e("div", Zs, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: x(["fo-sidebar-sub-btn", { on: n.value === "repos" }]),
                  title: "查看与管理我的仓库及 Topic 看板",
                  onClick: l[7] || (l[7] = (R) => P("repos"))
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
            e("header", eo, [
              l[22] || (l[22] = e("div", null, [
                e("b", { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, [
                  e("i", { class: "fo-folder-icon" }),
                  Z(" 收藏文件夹")
                ]),
                e("small", { style: { color: "var(--dim)", "font-size": "9.5px" } }, "单一文件夹 · 独立正在使用")
              ], -1)),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: "新建文件夹",
                "aria-label": "新建文件夹",
                onClick: l[8] || (l[8] = (R) => k(H).promptCreateFolder())
              }, "＋")
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: le
            }, [
              J(Oe, { active: k(r) }, null, 8, ["active"])
            ])
          ]),
          e("section", to, [
            n.value === "stars" && k(We).accountConfigured === !1 ? (i(), O(Qe, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: l[9] || (l[9] = (R) => T.value = !0)
            })) : n.value === "stars" ? (i(), u(D, { key: 1 }, [
              e("header", so, [
                J(Be, { onOpenAiSettings: y })
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
              e("div", oo, [
                J(je, {
                  active: k(r) && n.value === "stars"
                }, null, 8, ["active"])
              ]),
              l[24] || (l[24] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", ao, [
                J(qe)
              ]),
              e("div", no, [
                J(ze, {
                  active: k(r) && n.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : n.value === "trending" ? (i(), O(Ke, { key: 2 })) : n.value === "awesome" ? (i(), O(ht, { key: 3 })) : n.value === "repos" ? (i(), O(As, {
              key: 4,
              active: k(r) && n.value === "repos"
            }, null, 8, ["active"])) : w("", !0)
          ])
        ])
      ])
    ], 10, xs));
  }
}), vo = /* @__PURE__ */ he(io, [["__scopeId", "data-v-04024e84"]]);
export {
  vo as default
};
