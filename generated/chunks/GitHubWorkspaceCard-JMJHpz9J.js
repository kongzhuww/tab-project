import { d as me, o as n, e as i, f as e, l as oe, n as de, g as $, F as O, h as W, B as N, t as u, u as l, i as Q, b as L, s as Y, r as ve, x as ce, C as Re, y as Ge, m as X, z as Ve, k as be, c as se, j as ze, A as qe, G as Oe, L as Ze, H as et, D as ee, E as tt } from "./vendor-vue-DokqDua_.js";
import { u as st } from "./useCardActivity-D5KsJv29.js";
import { D as Ae, E as ue, t as F, y as ot } from "./search.service-DGqXHLyU.js";
import { _ as nt, a as at, G as it, g as Pe, b as rt, c as lt } from "./main-DMEcdWtY.js";
import { A as ct } from "./AccountSetupGuide-b0Xd0kWd.js";
import ut from "./GitHubTrending-BpICwsnF.js";
import { _ as ge } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { s as $e } from "./storage-cache.service-BYF2zxXX.js";
import { n as Fe, r as dt } from "./view-styles-CDVJ_n-J.js";
import { m as ne } from "./core-utils-Ccz-tarm.js";
const pt = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], ht = [
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
], mt = { class: "gh-awesome-wrapper" }, gt = { class: "gh-awesome-header" }, ft = { class: "gh-awesome-intro" }, bt = { class: "gh-awesome-search-box" }, vt = { class: "gh-awesome-pills" }, yt = ["onClick"], wt = { class: "gh-awesome-grid" }, _t = ["onClick"], kt = { class: "gh-awesome-card-head" }, Ct = { class: "gh-awesome-card-name" }, $t = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Tt = { class: "gh-awesome-desc" }, Ht = { class: "gh-awesome-footer" }, At = { class: "gh-awesome-tags" }, St = ["href"], Rt = {
  key: 0,
  class: "gh-awesome-empty"
}, Gt = /* @__PURE__ */ me({
  __name: "GitHubAwesome",
  setup(m) {
    const r = L("all"), a = L(""), d = Y(() => {
      const g = a.value.trim().toLowerCase(), C = r.value;
      return ht.filter((c) => C === "all" || c.category === C ? g ? c.name.toLowerCase().includes(g) || c.title.toLowerCase().includes(g) || c.desc.toLowerCase().includes(g) || c.tags.some((b) => b.toLowerCase().includes(g)) : !0 : !1);
    });
    function v(g) {
      window.open(g, "_blank", "noreferrer");
    }
    return (g, C) => (n(), i("div", mt, [
      e("header", gt, [
        e("div", ft, [
          C[3] || (C[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", bt, [
            oe(e("input", {
              "onUpdate:modelValue": C[0] || (C[0] = (c) => a.value = c),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [de, a.value]
            ]),
            a.value ? (n(), i("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: C[1] || (C[1] = (c) => a.value = "")
            }, "✕")) : $("", !0)
          ])
        ]),
        e("div", vt, [
          (n(!0), i(O, null, W(l(pt), (c) => (n(), i("button", {
            key: c.id,
            type: "button",
            class: N(["gh-awesome-pill", { active: r.value === c.id }]),
            onClick: (T) => r.value = c.id
          }, [
            e("span", null, u(c.icon), 1),
            e("b", null, u(c.name), 1)
          ], 10, yt))), 128))
        ])
      ]),
      e("div", wt, [
        (n(!0), i(O, null, W(d.value, (c) => (n(), i("article", {
          key: c.id,
          class: "gh-awesome-card",
          onClick: (T) => v(c.url)
        }, [
          e("div", kt, [
            e("div", Ct, [
              e("strong", null, u(c.title), 1),
              e("small", null, u(c.name), 1)
            ]),
            e("span", $t, "★ " + u(c.stars), 1)
          ]),
          e("p", Tt, u(c.desc), 1),
          e("div", Ht, [
            e("div", At, [
              (n(!0), i(O, null, W(c.tags, (T) => (n(), i("span", {
                key: T,
                class: "gh-awesome-tag"
              }, u(T), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: c.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: C[2] || (C[2] = Q(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, St)
          ])
        ], 8, _t))), 128)),
        d.value.length ? $("", !0) : (n(), i("div", Rt, [...C[4] || (C[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Mt = /* @__PURE__ */ ge(Gt, [["__scopeId", "data-v-28a8995f"]]), Te = "gh_my_repos_cache_v1", ie = "gh_my_repo_custom_topics_v1", A = ve({
  loading: !1,
  syncingTopic: !1,
  errorMessage: "",
  repos: [],
  customTopicNames: [],
  searchQuery: "",
  editingColumnTopic: null,
  composerActiveColumnId: null
});
function te(m) {
  let r = m.trim().toLowerCase();
  return r = r.replace(/[\s_]+/g, "-"), r = r.replace(/[^a-z0-9-]/g, ""), r = r.replace(/^-+|-+$/g, "").replace(/-+/g, "-"), r.length > 35 && (r = r.slice(0, 35).replace(/-+$/, "")), r;
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
  async load(r = !1) {
    this.abortController?.abort(), this.abortController = new AbortController();
    const a = this.abortController.signal;
    await this.loadPersistedCustomTopics();
    const d = await $e.get(Te);
    if (d && d.length && (A.repos = d), !r && d && d.length) {
      this.fetchRemote(a).catch(() => {
      });
      return;
    }
    A.loading = !0, A.errorMessage = "";
    try {
      await this.fetchRemote(a);
    } catch (v) {
      if (v.name === "AbortError") return;
      A.errorMessage = v.message || "获取个人仓库失败";
    } finally {
      A.loading = !1;
    }
  }
  async fetchRemote(r) {
    const { ghUser: a, ghToken: d } = await Ae();
    if (!a && !d) {
      A.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    let v = "https://api.github.com/user/repos?type=owner&sort=updated&per_page=100";
    d || (v = `https://api.github.com/users/${encodeURIComponent(a)}/repos?type=owner&sort=updated&per_page=100`);
    const g = ue(d), C = await fetch(v, {
      method: "GET",
      headers: g,
      signal: r
    });
    if (!C.ok)
      throw C.status === 401 ? new Error("GitHub Token 无效或已过期，请在设置中更新。") : C.status === 403 ? new Error("GitHub API 频率受限或无权访问，请检查 Token 权限。") : new Error(`GitHub 请求失败 (HTTP ${C.status})`);
    const c = await C.json();
    if (!Array.isArray(c))
      throw new Error("GitHub 返回数据格式异常");
    const T = c.map((b) => ({
      id: b.id,
      name: b.name,
      fullName: b.full_name || `${b.owner?.login || a}/${b.name}`,
      description: b.description || "",
      isPrivate: !!b.private,
      isFork: !!b.fork,
      htmlUrl: b.html_url || `https://github.com/${a}/${b.name}`,
      language: b.language || null,
      stargazersCount: Number(b.stargazers_count) || 0,
      forksCount: Number(b.forks_count) || 0,
      openIssuesCount: Number(b.open_issues_count) || 0,
      topics: Array.isArray(b.topics) ? b.topics.map((R) => String(R).toLowerCase()) : [],
      updatedAt: b.updated_at || "",
      pushedAt: b.pushed_at || "",
      defaultBranch: b.default_branch || "main"
    }));
    A.repos = T, await $e.set(Te, T, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 提交单个仓库的 Topics 到 GitHub 远端
   */
  async syncRepoTopics(r, a) {
    const { ghToken: d } = await Ae();
    if (!d)
      return alert("向 GitHub 更新 Topic 需要在 GitHub 设置中配置具备 repo 写入权限的 Token。"), !1;
    const v = Array.from(new Set(a.map(te).filter(Boolean))).slice(0, 20), [g, C] = r.fullName.split("/"), c = `https://api.github.com/repos/${encodeURIComponent(g)}/${encodeURIComponent(C)}/topics`;
    A.syncingTopic = !0;
    try {
      const T = ue(d), b = await fetch(c, {
        method: "PUT",
        headers: {
          ...T,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: v })
      });
      if (!b.ok)
        throw b.status === 401 || b.status === 403 ? new Error("Token 权限不足。修改 Topics 需要包含 repo（或 Administration:write）作用域。") : b.status === 404 ? new Error("仓库未找到或无权修改。") : new Error(`GitHub 远端保存失败 (HTTP ${b.status})`);
      const R = await b.json(), _ = Array.isArray(R.names) ? R.names : v;
      return r.topics = _, await $e.set(Te, A.repos, { ttlMs: 30 * 86400 * 1e3 }), !0;
    } catch (T) {
      return alert(`更新 GitHub Topics 失败：${T.message || T}`), !1;
    } finally {
      A.syncingTopic = !1;
    }
  }
  /**
   * 将仓库添加到指定 Topic（若远端不存在则新增并提交）
   */
  async addRepoToTopic(r, a) {
    const d = te(a);
    if (!d) return !1;
    if (r.topics.includes(d)) return !0;
    const v = [...r.topics, d];
    return this.syncRepoTopics(r, v);
  }
  /**
   * 将仓库从指定 Topic 移除
   */
  async removeRepoFromTopic(r, a) {
    const d = te(a);
    if (!r.topics.includes(d)) return !0;
    const v = r.topics.filter((g) => g !== d);
    return this.syncRepoTopics(r, v);
  }
  /**
   * 新建一个 Topic 列（本地与远端集合）
   */
  async createTopicColumn(r) {
    const a = te(r);
    return a ? A.customTopicNames.includes(a) ? (alert(`Topic「${a}」板块已存在。`), null) : (A.customTopicNames.push(a), await this.persistCustomTopics(), a) : (alert("Topic 名称无效。GitHub 规范：仅限 1~35 位小写英文字母、数字和连字符 '-'。"), null);
  }
  /**
   * 重命名 Topic 列：同步将该板块下所有仓库的旧 Topic 替换为新 Topic 并提交到 GitHub
   */
  async renameTopicColumn(r, a) {
    const d = te(a);
    if (!d)
      return alert("新 Topic 名称无效。仅限小写英文、数字与中划线。"), !1;
    if (r === d) return !0;
    const v = A.repos.filter((g) => g.topics.includes(r));
    if (v.length > 0) {
      if (!confirm(
        `确定将板块「${r}」重命名为「${d}」吗？
这将调用 GitHub API 同步更新该板块下的 ${v.length} 个仓库的远端 Topic。`
      )) return !1;
      A.syncingTopic = !0;
      let C = 0, c = 0;
      for (const T of v) {
        const b = T.topics.map((_) => _ === r ? d : _);
        await this.syncRepoTopics(T, b) ? C++ : c++;
      }
      A.syncingTopic = !1, c > 0 && alert(`重命名完成，成功更新 ${C} 个仓库，失败 ${c} 个。`);
    }
    return A.customTopicNames = A.customTopicNames.map((g) => g === r ? d : g), await this.persistCustomTopics(), !0;
  }
  /**
   * 删除 Topic 板块：从该板块下所有仓库中移除该 topic
   */
  async deleteTopicColumn(r) {
    const a = A.repos.filter((v) => v.topics.includes(r)), d = a.length > 0 ? `确定删除板块「${r}」吗？
将从该板块下的 ${a.length} 个仓库中移除此 Topic 并在 GitHub 远端同步。` : `确定删除空板块「${r}」吗？`;
    if (!confirm(d)) return !1;
    if (a.length > 0) {
      A.syncingTopic = !0;
      for (const v of a)
        await this.removeRepoFromTopic(v, r);
      A.syncingTopic = !1;
    }
    return A.customTopicNames = A.customTopicNames.filter((v) => v !== r), await this.persistCustomTopics(), !0;
  }
  async loadPersistedCustomTopics() {
    try {
      const a = (typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([ie]) : { [ie]: JSON.parse(localStorage.getItem(ie) || "[]") })?.[ie];
      Array.isArray(a) && (A.customTopicNames = a.map(te).filter(Boolean));
    } catch {
    }
  }
  async persistCustomTopics() {
    const r = Array.from(new Set(A.customTopicNames.map(te).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [ie]: r }) : localStorage.setItem(ie, JSON.stringify(r));
    } catch {
    }
  }
}
const z = le.getInstance(), xt = { class: "my-repos-workspace" }, Lt = {
  key: 0,
  class: "error-banner"
}, Dt = { class: "shelf-header" }, It = { class: "shelf-title-group" }, Nt = { class: "badge-count" }, Ut = {
  key: 0,
  class: "sync-status"
}, Et = { class: "shelf-actions" }, jt = { class: "shelf-search-box" }, Ot = ["disabled"], Pt = ["title"], Ft = ["onDragstart", "onContextmenu"], Wt = { class: "repo-card-head" }, Bt = ["title", "onClick"], Vt = {
  key: 0,
  class: "badge-repo-visibility private"
}, zt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, qt = ["title"], Yt = {
  key: 1,
  class: "repo-topics-row"
}, Kt = { class: "repo-card-footer" }, Xt = { class: "meta-left" }, Qt = {
  key: 0,
  class: "meta-item lang"
}, Jt = { class: "meta-item" }, Zt = {
  key: 1,
  class: "meta-item"
}, es = ["title"], ts = {
  key: 0,
  class: "empty-shelf-placeholder"
}, ss = { class: "board-columns-track" }, os = ["onDragover", "onDragleave", "onDrop"], ns = { class: "column-header" }, as = {
  key: 0,
  class: "column-title-group"
}, is = ["title"], rs = { class: "badge-count" }, ls = {
  key: 1,
  class: "column-rename-group"
}, cs = ["onKeydown"], us = ["onClick"], ds = { class: "column-actions" }, ps = ["onClick"], hs = {
  key: 0,
  class: "col-popover-menu"
}, ms = ["onClick"], gs = ["onClick"], fs = { class: "column-cards-scroll" }, bs = ["onDragstart", "onContextmenu"], vs = { class: "repo-card-head" }, ys = ["title", "onClick"], ws = {
  key: 0,
  class: "badge-repo-visibility private"
}, _s = {
  key: 1,
  class: "badge-repo-visibility fork"
}, ks = ["title"], Cs = { class: "repo-topics-row" }, $s = { class: "topic-chip active-chip" }, Ts = ["onClick"], Hs = { class: "repo-card-footer" }, As = { class: "meta-left" }, Ss = {
  key: 0,
  class: "meta-item lang"
}, Rs = { class: "meta-item" }, Gs = {
  key: 1,
  class: "meta-item"
}, Ms = { class: "meta-date" }, xs = {
  key: 0,
  class: "empty-column-placeholder"
}, Ls = { class: "board-column new-column-slot" }, Ds = {
  key: 1,
  class: "new-column-composer"
}, Is = { class: "composer-actions" }, Ns = ["onClick"], Us = /* @__PURE__ */ me({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(m) {
    const r = m, a = L(""), d = L(!1), v = L(null), g = L(""), C = L(null), c = L(null), T = L(null), b = L(!1);
    function R() {
      b.value = !b.value;
    }
    function _(s) {
      const t = T.value;
      t && (Math.abs(s.deltaX) > Math.abs(s.deltaY) && s.deltaX !== 0 || s.deltaY !== 0 && (s.preventDefault(), t.scrollLeft += s.deltaY));
    }
    const M = L(null), k = L(null), w = L(null);
    let y = null, E = 0;
    const H = ve({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromTopic: null
    }), B = L(null), Z = L(!1);
    function V() {
      H.visible = !1, B.value = null;
    }
    function K(s, t, o) {
      s.preventDefault(), s.stopPropagation();
      let p = s.clientX, U = s.clientY;
      p > window.innerWidth - 200 && (p = window.innerWidth - 210), U > window.innerHeight - 240 && (U = window.innerHeight - 245), H.x = p, H.y = U, H.repo = t, H.fromTopic = o, H.visible = !0, B.value = "folder", Z.value = p > window.innerWidth - 380;
    }
    async function ae() {
      const s = H.repo, t = H.fromTopic;
      V(), s && (t && t !== "default" ? await z.removeRepoFromTopic(s, t) : s.topics.length && await z.syncRepoTopics(s, []));
    }
    async function G(s) {
      const t = H.repo, o = H.fromTopic;
      if (V(), !!t)
        if (o && o !== "default" && o !== s) {
          const p = t.topics.filter((U) => U !== o);
          p.includes(s) || p.push(s), await z.syncRepoTopics(t, p);
        } else
          await z.addRepoToTopic(t, s);
    }
    async function x() {
      const s = H.repo;
      if (V(), !!s)
        try {
          await navigator.clipboard.writeText(s.htmlUrl), Fe.show({
            appName: "GitHub",
            title: "已复制链接",
            message: `已复制 ${s.name} 仓库链接`
          });
        } catch {
        }
    }
    async function D() {
      const s = H.repo;
      if (V(), !!s)
        try {
          const t = `git clone ${s.htmlUrl}.git`;
          await navigator.clipboard.writeText(t), Fe.show({
            appName: "GitHub",
            title: "已复制克隆命令",
            message: t
          });
        } catch {
        }
    }
    function j() {
      const s = H.repo;
      V(), s && ke(s.htmlUrl);
    }
    function q(s) {
      s.target?.closest(".gh-repo-context-menu") || H.visible && V();
    }
    function J(s) {
      s.key === "Escape" && H.visible && V();
    }
    const I = Y(() => {
      const s = new Set(A.customTopicNames);
      for (const t of A.repos)
        for (const o of t.topics)
          o && s.add(o);
      return Array.from(s).sort();
    }), f = Y(() => {
      const s = A.searchQuery.trim().toLowerCase();
      return s ? A.repos.filter(
        (t) => t.name.toLowerCase().includes(s) || t.description.toLowerCase().includes(s) || t.topics.some((o) => o.includes(s)) || t.language && t.language.toLowerCase().includes(s)
      ) : A.repos;
    }), P = Y(() => {
      const s = new Set(I.value);
      return f.value.filter((t) => t.topics.length ? !t.topics.some((o) => s.has(o)) : !0);
    });
    function ye(s) {
      return f.value.filter((t) => t.topics.includes(s));
    }
    async function Me() {
      const s = a.value.trim();
      if (!s) return;
      await z.createTopicColumn(s) && (a.value = "", d.value = !1);
    }
    function Ye(s) {
      C.value = s, g.value = s, v.value = null;
    }
    async function xe(s) {
      const t = g.value.trim();
      if (!t || t === s) {
        C.value = null;
        return;
      }
      await z.renameTopicColumn(s, t) && (C.value = null);
    }
    async function Ke(s) {
      v.value = null, await z.deleteTopicColumn(s);
    }
    async function Xe(s, t) {
      await z.removeRepoFromTopic(s, t);
    }
    function Qe(s) {
      const t = c.value;
      if (!t) return;
      const p = s.target?.closest(".column-cards-scroll");
      if (p && p.scrollHeight > p.clientHeight && !s.shiftKey && s.deltaX === 0) {
        const U = p.scrollTop <= 0 && s.deltaY < 0, Ce = p.scrollTop + p.clientHeight >= p.scrollHeight - 1 && s.deltaY > 0;
        if (!U && !Ce)
          return;
      }
      Math.abs(s.deltaX) > Math.abs(s.deltaY) && s.deltaX !== 0 || s.deltaY !== 0 && (s.preventDefault(), t.scrollLeft += s.deltaY);
    }
    function we(s) {
      if (!M.value || !c.value) return;
      s.preventDefault();
      const t = s.deltaX !== 0 ? s.deltaX : s.deltaY;
      c.value.scrollLeft += t;
    }
    function Le() {
      if (y !== null) return;
      const s = () => {
        c.value && E !== 0 ? (c.value.scrollLeft += E, y = requestAnimationFrame(s)) : fe();
      };
      y = requestAnimationFrame(s);
    }
    function fe() {
      y !== null && (cancelAnimationFrame(y), y = null), E = 0;
    }
    function De(s) {
      if (!M.value || !c.value) return;
      const t = c.value.getBoundingClientRect(), o = 100;
      if (s > t.right - o) {
        const p = Math.min(1, Math.max(0.1, (s - (t.right - o)) / o));
        E = Math.round(p * 20), Le();
      } else if (s < t.left + o) {
        const p = Math.min(1, Math.max(0.1, (t.left + o - s) / o));
        E = -Math.round(p * 20), Le();
      } else
        fe();
    }
    function Je(s) {
      M.value && (s.preventDefault(), De(s.clientX));
    }
    function Ie(s, t, o) {
      V(), M.value = t, k.value = o, s.dataTransfer && (s.dataTransfer.effectAllowed = "move", s.dataTransfer.setData("text/plain", `${t.id}:${o}`)), window.addEventListener("wheel", we, { passive: !1 });
    }
    function _e() {
      M.value = null, k.value = null, w.value = null, fe(), window.removeEventListener("wheel", we);
    }
    function Ne(s, t) {
      M.value && (s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "move"), w.value = t, De(s.clientX));
    }
    function Ue(s, t) {
      const o = s.currentTarget, p = s.relatedTarget;
      o?.contains(p) || w.value === t && (w.value = null);
    }
    async function Ee(s, t) {
      s.preventDefault();
      const o = M.value, p = k.value;
      if (_e(), !!o)
        if (t === "default")
          p && p !== "default" && await z.removeRepoFromTopic(o, p);
        else if (p && p !== "default" && p !== t) {
          const U = o.topics.filter((Ce) => Ce !== p);
          U.includes(t) || U.push(t), await z.syncRepoTopics(o, U);
        } else
          await z.addRepoToTopic(o, t);
    }
    function ke(s) {
      window.open(s, "_blank", "noopener,noreferrer");
    }
    function je(s) {
      if (!s) return "";
      try {
        const t = new Date(s);
        return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ce(
      () => r.active,
      (s) => {
        window.removeEventListener("pointerdown", q), window.removeEventListener("keydown", J), V(), s && (window.addEventListener("pointerdown", q), window.addEventListener("keydown", J), A.repos.length || z.load());
      },
      { immediate: !0 }
    ), Re(() => {
      r.active && (window.addEventListener("pointerdown", q), window.addEventListener("keydown", J), A.repos.length || z.load());
    }), Ge(() => {
      window.removeEventListener("wheel", we), window.removeEventListener("pointerdown", q), window.removeEventListener("keydown", J), fe(), V();
    }), (s, t) => (n(), i("div", xt, [
      l(A).errorMessage ? (n(), i("div", Lt, [
        e("span", null, "⚠️ " + u(l(A).errorMessage), 1),
        e("button", {
          type: "button",
          onClick: t[0] || (t[0] = (o) => l(z).load(!0))
        }, "重试")
      ])) : $("", !0),
      e("section", {
        class: N(["default-shelf", { "drop-active": w.value === "default", "is-collapsed": b.value }]),
        onDragover: t[4] || (t[4] = (o) => Ne(o, "default")),
        onDragleave: t[5] || (t[5] = (o) => Ue(o, "default")),
        onDrop: t[6] || (t[6] = (o) => Ee(o, "default"))
      }, [
        e("header", Dt, [
          e("div", It, [
            t[23] || (t[23] = e("span", { class: "col-dot default-dot" }, null, -1)),
            t[24] || (t[24] = e("h3", { class: "shelf-title" }, "默认板块", -1)),
            e("span", Nt, u(P.value.length), 1),
            t[25] || (t[25] = e("span", { class: "shelf-hint" }, "未分类仓库 · 直接拖拽分发到下方各个 Topic 看板", -1)),
            l(A).syncingTopic ? (n(), i("span", Ut, [...t[22] || (t[22] = [
              e("i", { class: "spin-icon" }, "⏳", -1),
              X(" 正在同步 GitHub Topics… ", -1)
            ])])) : $("", !0)
          ]),
          e("div", Et, [
            e("div", jt, [
              oe(e("input", {
                "onUpdate:modelValue": t[1] || (t[1] = (o) => l(A).searchQuery = o),
                type: "text",
                placeholder: "过滤项目 / 标签…",
                class: "shelf-search-input"
              }, null, 512), [
                [de, l(A).searchQuery]
              ]),
              l(A).searchQuery ? (n(), i("button", {
                key: 0,
                type: "button",
                class: "shelf-clear-btn",
                onClick: t[2] || (t[2] = (o) => l(A).searchQuery = "")
              }, "✕")) : $("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: l(A).loading || l(A).syncingTopic,
              title: "重新从 GitHub 拉取仓库列表",
              onClick: t[3] || (t[3] = (o) => l(z).load(!0))
            }, [
              e("span", {
                class: N({ spinning: l(A).loading })
              }, "🔄", 2),
              e("span", null, u(l(A).loading ? "刷新中…" : "刷新"), 1)
            ], 8, Ot),
            e("button", {
              type: "button",
              class: "shelf-toggle-btn",
              title: b.value ? "展开默认板块" : "收起默认板块",
              onClick: R
            }, u(b.value ? "展开 ▼" : "收起 ▲"), 9, Pt)
          ])
        ]),
        oe(e("div", {
          ref_key: "shelfScrollRef",
          ref: T,
          class: "shelf-cards-scroll",
          onWheel: _
        }, [
          (n(!0), i(O, null, W(P.value, (o) => (n(), i("div", {
            key: o.id,
            class: N(["repo-card shelf-card", { "card-dragging": M.value?.id === o.id }]),
            draggable: "true",
            onDragstart: (p) => Ie(p, o, "default"),
            onDragend: _e,
            onContextmenu: (p) => K(p, o, "default")
          }, [
            e("div", Wt, [
              e("span", {
                class: "repo-name",
                title: o.fullName,
                onClick: (p) => ke(o.htmlUrl)
              }, u(o.name), 9, Bt),
              o.isPrivate ? (n(), i("span", Vt, "私有")) : $("", !0),
              o.isFork ? (n(), i("span", zt, "Fork")) : $("", !0)
            ]),
            o.description ? (n(), i("p", {
              key: 0,
              class: "repo-desc",
              title: o.description
            }, u(o.description), 9, qt)) : $("", !0),
            o.topics.length ? (n(), i("div", Yt, [
              (n(!0), i(O, null, W(o.topics, (p) => (n(), i("span", {
                key: p,
                class: "topic-chip"
              }, " #" + u(p), 1))), 128))
            ])) : $("", !0),
            e("div", Kt, [
              e("div", Xt, [
                o.language ? (n(), i("span", Qt, [
                  t[26] || (t[26] = e("span", { class: "lang-color" }, null, -1)),
                  X(u(o.language), 1)
                ])) : $("", !0),
                e("span", Jt, "⭐ " + u(o.stargazersCount), 1),
                o.forksCount ? (n(), i("span", Zt, "🍴 " + u(o.forksCount), 1)) : $("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + o.updatedAt
              }, u(je(o.pushedAt || o.updatedAt)), 9, es)
            ])
          ], 42, Ft))), 128)),
          P.value.length ? $("", !0) : (n(), i("div", ts, [...t[27] || (t[27] = [
            e("span", null, "暂无未分类仓库 (全部项目已分配至下方各个 Topic 看板)", -1)
          ])]))
        ], 544), [
          [Ve, !b.value]
        ])
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: c,
        class: "board-viewport",
        onWheel: Qe,
        onDragover: Je
      }, [
        e("div", ss, [
          (n(!0), i(O, null, W(I.value, (o) => (n(), i("section", {
            key: o,
            class: N(["board-column topic-column", { "drop-active": w.value === o }]),
            onDragover: (p) => Ne(p, o),
            onDragleave: (p) => Ue(p, o),
            onDrop: (p) => Ee(p, o)
          }, [
            e("header", ns, [
              C.value !== o ? (n(), i("div", as, [
                t[28] || (t[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "GitHub Topic: " + o
                }, " #" + u(o), 9, is),
                e("span", rs, u(ye(o).length), 1)
              ])) : (n(), i("div", ls, [
                oe(e("input", {
                  "onUpdate:modelValue": t[7] || (t[7] = (p) => g.value = p),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    be((p) => xe(o), ["enter"]),
                    t[8] || (t[8] = be((p) => C.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, cs), [
                  [de, g.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (p) => xe(o)
                }, "✓", 8, us),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: t[9] || (t[9] = (p) => C.value = null)
                }, "✕")
              ])),
              e("div", ds, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "板块操作（重命名 / 删除）",
                  onClick: (p) => v.value = v.value === o ? null : o
                }, "•••", 8, ps),
                v.value === o ? (n(), i("div", hs, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (p) => Ye(o)
                  }, " ✏️ 重命名 Topic 并同步 ", 8, ms),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (p) => Ke(o)
                  }, " 🗑️ 删除板块并从远端移除 ", 8, gs)
                ])) : $("", !0)
              ])
            ]),
            e("div", fs, [
              (n(!0), i(O, null, W(ye(o), (p) => (n(), i("div", {
                key: p.id,
                class: N(["repo-card", { "card-dragging": M.value?.id === p.id }]),
                draggable: "true",
                onDragstart: (U) => Ie(U, p, o),
                onDragend: _e,
                onContextmenu: (U) => K(U, p, o)
              }, [
                e("div", vs, [
                  e("span", {
                    class: "repo-name",
                    title: p.fullName,
                    onClick: (U) => ke(p.htmlUrl)
                  }, u(p.name), 9, ys),
                  p.isPrivate ? (n(), i("span", ws, "私有")) : $("", !0),
                  p.isFork ? (n(), i("span", _s, "Fork")) : $("", !0)
                ]),
                p.description ? (n(), i("p", {
                  key: 0,
                  class: "repo-desc",
                  title: p.description
                }, u(p.description), 9, ks)) : $("", !0),
                e("div", Cs, [
                  e("span", $s, [
                    X(" #" + u(o) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从当前 Topic 移除并同步到 GitHub",
                      onClick: Q((U) => Xe(p, o), ["stop"])
                    }, "✕", 8, Ts)
                  ]),
                  (n(!0), i(O, null, W(p.topics.filter((U) => U !== o), (U) => (n(), i("span", {
                    key: U,
                    class: "topic-chip other-chip"
                  }, " #" + u(U), 1))), 128))
                ]),
                e("div", Hs, [
                  e("div", As, [
                    p.language ? (n(), i("span", Ss, [
                      t[29] || (t[29] = e("span", { class: "lang-color" }, null, -1)),
                      X(u(p.language), 1)
                    ])) : $("", !0),
                    e("span", Rs, "⭐ " + u(p.stargazersCount), 1),
                    p.forksCount ? (n(), i("span", Gs, "🍴 " + u(p.forksCount), 1)) : $("", !0)
                  ]),
                  e("span", Ms, u(je(p.pushedAt || p.updatedAt)), 1)
                ])
              ], 42, bs))), 128)),
              ye(o).length ? $("", !0) : (n(), i("div", xs, [...t[30] || (t[30] = [
                e("span", null, "暂无项目，可从其他列拖拽至此", -1)
              ])]))
            ])
          ], 42, os))), 128)),
          e("section", Ls, [
            d.value ? (n(), i("div", Ds, [
              t[32] || (t[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建 Topic 分组"),
                e("small", null, "将作为 GitHub 远端标签同步")
              ], -1)),
              oe(e("input", {
                "onUpdate:modelValue": t[11] || (t[11] = (o) => a.value = o),
                type: "text",
                placeholder: "例如 tools, vue3, robotics...",
                class: "composer-input",
                onKeydown: [
                  be(Me, ["enter"]),
                  t[12] || (t[12] = be((o) => d.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [de, a.value]
              ]),
              e("div", Is, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: Me
                }, "创建板块"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: t[13] || (t[13] = (o) => d.value = !1)
                }, "取消")
              ])
            ])) : (n(), i("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: t[10] || (t[10] = (o) => d.value = !0)
            }, [...t[31] || (t[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建 Topic 板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (n(), se(ze, { to: "body" }, [
        H.visible && H.repo ? (n(), i("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: qe({ left: `${H.x}px`, top: `${H.y}px` }),
          onClick: t[20] || (t[20] = Q(() => {
          }, ["stop"])),
          onContextmenu: t[21] || (t[21] = Q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: N(["gh-menu-has-sub", { "is-active": B.value === "folder" }]),
            onMouseenter: t[16] || (t[16] = (o) => B.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: t[14] || (t[14] = Q((o) => B.value = B.value === "folder" ? null : "folder", ["stop"]))
            }, [...t[33] || (t[33] = [
              e("span", null, "📁 移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: N(["gh-sub-flyout", { "flyout-left": Z.value }]),
              onClick: t[15] || (t[15] = Q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: N(["fo-cover-menu-item", { primary: !H.repo.topics.length }]),
                type: "button",
                onClick: ae
              }, u(H.repo.topics.length ? "  " : "✓ ") + "＋ 设为未分类（移入默认板块） ", 3),
              (n(!0), i(O, null, W(I.value, (o) => (n(), i("button", {
                key: o,
                class: N(["fo-cover-menu-item", { primary: H.repo.topics.includes(o) }]),
                type: "button",
                onClick: (p) => G(o)
              }, u(H.repo.topics.includes(o) ? "✓ " : "  ") + "📁 " + u(o), 11, Ns))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: t[17] || (t[17] = (o) => B.value = null),
            onClick: x
          }, " 📋 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: t[18] || (t[18] = (o) => B.value = null),
            onClick: D
          }, " 💻 复制克隆命令 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: t[19] || (t[19] = (o) => B.value = null),
            onClick: j
          }, " ↗ 在 GitHub 打开 ", 32)
        ], 36)) : $("", !0)
      ]))
    ]));
  }
}), Es = /* @__PURE__ */ ge(Us, [["__scopeId", "data-v-9df7ba26"]]);
function js(m) {
  const r = m.subject?.url, a = m.repository?.html_url || "https://github.com";
  if (!r) return a;
  const d = m.subject?.type;
  return d === "Issue" ? r.replace("https://api.github.com/repos/", "https://github.com/") : d === "PullRequest" ? r.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : d === "Release" ? r.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : r.replace("https://api.github.com/repos/", "https://github.com/");
}
function Os(m) {
  try {
    const r = Date.now() - new Date(m).getTime();
    if (r < 6e4) return "刚刚";
    const a = Math.floor(r / 6e4);
    if (a < 60) return `${a} 分钟前`;
    const d = Math.floor(a / 60);
    if (d < 24) return `${d} 小时前`;
    const v = Math.floor(d / 24);
    return v < 30 ? `${v} 天前` : m.slice(5, 10);
  } catch {
    return "";
  }
}
const S = ve({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), re = {
  open() {
    S.isOpen = !0, (!S.items.length || Date.now() - S.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    S.isOpen = !1;
  },
  toggle() {
    S.isOpen ? this.close() : this.open();
  },
  setTab(m) {
    S.activeKind = m;
  },
  async refresh() {
    const m = F.token?.trim();
    if (!m) {
      S.items = [], S.unreadCount = 0, S.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    S.loading = !0, S.error = "";
    try {
      const r = {
        ...ue(m),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, a = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: r
      });
      if (!a.ok)
        throw a.status === 401 ? new Error("GitHub Token 无效或已过期") : a.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${a.status})`);
      const d = await a.json();
      if (!Array.isArray(d))
        throw new Error("GitHub 返回数据异常");
      const v = d.map((g) => ({
        id: String(g.id),
        unread: !!g.unread,
        reason: String(g.reason || ""),
        updatedAt: g.updated_at,
        formattedTime: Os(g.updated_at),
        subject: {
          title: String(g.subject?.title || "未命名通知"),
          url: String(g.subject?.url || ""),
          type: String(g.subject?.type || "Issue"),
          latestCommentUrl: g.subject?.latest_comment_url
        },
        repository: {
          id: Number(g.repository?.id || 0),
          name: String(g.repository?.name || ""),
          fullName: String(g.repository?.full_name || ""),
          owner: {
            login: String(g.repository?.owner?.login || ""),
            avatarUrl: g.repository?.owner?.avatar_url
          },
          htmlUrl: String(g.repository?.html_url || "")
        },
        url: String(g.url || ""),
        htmlUrl: js(g)
      }));
      S.items = v, S.unreadCount = v.filter((g) => g.unread).length, S.lastFetchedAt = Date.now();
    } catch (r) {
      console.warn("[GitHubNotifications] 读取失败:", r), S.error = r?.message || "网络请求异常";
    } finally {
      S.loading = !1;
    }
  },
  openTarget(m) {
    typeof window < "u" && window.open(m.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, h = ve({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function pe(m) {
  try {
    const r = Date.now() - new Date(m).getTime(), a = Math.floor(r / 6e4);
    if (a < 1) return "刚刚";
    if (a < 60) return `${a}分钟前`;
    const d = Math.floor(a / 60);
    if (d < 24) return `${d}小时前`;
    const v = Math.floor(d / 24);
    if (v < 30) return `${v}天前`;
    const g = new Date(m);
    return `${g.getFullYear()}/${g.getMonth() + 1}/${g.getDate()}`;
  } catch {
    return "";
  }
}
function he(m) {
  switch (m) {
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
function Ps(m) {
  return m ? {
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
  }[m] || (m.startsWith(":") && m.endsWith(":") ? m.slice(1, -1) : m) : "";
}
function He(m) {
  if (!Array.isArray(m)) return [];
  const r = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return m.map((a) => ({
    emoji: r[a.content] || a.content,
    count: a.reactors?.totalCount || a.users?.totalCount || 0
  })).filter((a) => a.count > 0);
}
function We(m) {
  if (!m || typeof m != "object") return [];
  const r = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, a = [];
  for (const [d, v] of Object.entries(r)) {
    const g = Number(m[d] || 0);
    g > 0 && a.push({ emoji: v, count: g });
  }
  return a;
}
async function Be(m, r) {
  if (!m) return "";
  try {
    const a = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...ue(r),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: m, mode: "gfm" })
    });
    if (a.ok)
      return await a.text();
  } catch {
  }
  return ne.renderMarkdown(m);
}
async function Fs(m, r, a, d) {
  const v = `
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
    const g = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...ue(d),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: v,
        variables: { owner: m, name: r, num: a }
      })
    });
    if (!g.ok) return null;
    const c = (await g.json())?.data?.repository?.discussion;
    if (!c) return null;
    let T = 0;
    const b = (c.comments?.nodes || []).map((M) => {
      const k = M.replies?.nodes || [];
      T += k.length;
      const w = k.map((y) => ({
        id: y.id,
        author: {
          login: y.author?.login || "匿名",
          avatarUrl: y.author?.avatarUrl || "",
          association: he(y.authorAssociation)
        },
        createdAt: y.createdAt,
        formattedTime: pe(y.createdAt),
        body: y.body || "",
        bodyHtml: y.bodyHTML || (y.body ? ne.renderMarkdown(y.body) : ""),
        reactions: He(y.reactionGroups)
      }));
      return {
        id: M.id,
        author: {
          login: M.author?.login || "匿名",
          avatarUrl: M.author?.avatarUrl || "",
          association: he(M.authorAssociation)
        },
        createdAt: M.createdAt,
        formattedTime: pe(M.createdAt),
        body: M.body || "",
        bodyHtml: M.bodyHTML || (M.body ? ne.renderMarkdown(M.body) : "<p>（评论内容为空）</p>"),
        reactions: He(M.reactionGroups),
        replies: w
      };
    }), R = c.body || "", _ = c.bodyHTML && c.bodyHTML.trim().length > 10 ? c.bodyHTML : R ? ne.renderMarkdown(R) : "<p>（主贴内容为空）</p>";
    return {
      title: c.title,
      number: a,
      state: "discussion",
      category: c.category ? {
        name: c.category.name,
        emoji: Ps(c.category.emoji)
      } : void 0,
      author: {
        login: c.author?.login || "未知",
        avatarUrl: c.author?.avatarUrl || "",
        association: he(c.authorAssociation)
      },
      createdAt: c.createdAt,
      formattedTime: pe(c.createdAt),
      body: R,
      bodyHtml: _,
      htmlUrl: c.url,
      commentsCount: c.comments?.totalCount || b.length,
      totalRepliesCount: T,
      comments: b,
      reactions: He(c.reactionGroups)
    };
  } catch {
    return null;
  }
}
const Se = {
  async open(m) {
    h.isOpen = !0, h.loading = !0, h.error = "", h.data = null, h.notificationItem = m;
    const r = F.token?.trim() || "", a = {
      ...ue(r),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const d = m.subject?.url, v = m.subject?.type, g = m.repository?.fullName || "", [C, c] = g.split("/"), T = d?.match(/\/(\d+)$/), b = T ? Number(T[1]) : void 0;
      if (v === "Discussion" && C && c && b) {
        const R = await Fs(C, c, b, r);
        if (R) {
          h.data = {
            notificationId: m.id,
            title: R.title || m.subject.title,
            number: b,
            state: "discussion",
            category: R.category,
            author: R.author || { login: m.repository.owner.login, avatarUrl: m.repository.owner.avatarUrl || "" },
            createdAt: R.createdAt || m.updatedAt,
            formattedTime: R.formattedTime || m.formattedTime,
            body: R.body || "",
            bodyHtml: R.bodyHtml || (R.body ? ne.renderMarkdown(R.body) : ""),
            htmlUrl: R.htmlUrl || m.htmlUrl,
            commentsCount: R.commentsCount || 0,
            totalRepliesCount: R.totalRepliesCount || 0,
            comments: R.comments || [],
            reactions: R.reactions || [],
            repositoryFullName: g,
            type: "Discussion"
          };
          return;
        }
      }
      if (d) {
        const R = await fetch(d, { headers: a, cache: "no-store" });
        if (R.ok) {
          const _ = await R.json();
          let M = [];
          if (_.comments_url && _.comments > 0)
            try {
              const y = await fetch(`${_.comments_url}?per_page=50`, { headers: a, cache: "no-store" });
              if (y.ok) {
                const E = await y.json();
                Array.isArray(E) && (M = await Promise.all(
                  E.map(async (H) => {
                    const B = H.body_html || (H.body ? await Be(H.body, r) : "");
                    return {
                      id: H.id,
                      author: {
                        login: H.user?.login || "匿名",
                        avatarUrl: H.user?.avatar_url || "",
                        association: he(H.author_association)
                      },
                      createdAt: H.created_at,
                      formattedTime: pe(H.created_at),
                      body: H.body || "",
                      bodyHtml: B,
                      reactions: We(H.reactions)
                    };
                  })
                ));
              }
            } catch (y) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", y);
            }
          const k = _.body || "";
          let w = _.body_html || "";
          !w && k && (w = await Be(k, r)), !w && k && (w = ne.renderMarkdown(k)), h.data = {
            notificationId: m.id,
            title: _.title || _.name || m.subject.title,
            number: _.number || b,
            state: _.merged ? "merged" : _.state || _.conclusion || "open",
            author: {
              login: _.user?.login || _.author?.login || m.repository.owner.login,
              avatarUrl: _.user?.avatar_url || _.author?.avatar_url || m.repository.owner.avatarUrl || "",
              association: he(_.author_association)
            },
            createdAt: _.created_at || _.published_at || m.updatedAt,
            formattedTime: pe(_.created_at || _.published_at || m.updatedAt),
            body: k,
            bodyHtml: w || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: _.html_url || m.htmlUrl,
            commentsCount: typeof _.comments == "number" ? _.comments : M.length,
            comments: M,
            reactions: We(_.reactions),
            repositoryFullName: g,
            type: v || "Issue"
          };
          return;
        }
      }
      h.data = {
        notificationId: m.id,
        title: m.subject.title,
        number: b,
        state: "open",
        author: {
          login: m.repository.owner.login,
          avatarUrl: m.repository.owner.avatarUrl || ""
        },
        createdAt: m.updatedAt,
        formattedTime: m.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: m.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: g,
        type: v || "通知"
      };
    } catch (d) {
      console.warn("[GitHubNotificationDetail] 读取异常:", d), h.error = d?.message || "网络请求异常";
    } finally {
      h.loading = !1;
    }
  },
  close() {
    h.isOpen = !1, h.data = null, h.error = "";
  }
}, Ws = { class: "vue-gh-notification-panel-wrapper" }, Bs = { class: "gh-msg-header" }, Vs = { class: "gh-msg-account" }, zs = { class: "gh-msg-subtitle" }, qs = {
  class: "gh-msg-tabs",
  role: "tablist"
}, Ys = ["onClick"], Ks = { class: "gh-msg-list" }, Xs = {
  key: 0,
  class: "gh-msg-loading"
}, Qs = {
  key: 1,
  class: "gh-msg-error"
}, Js = {
  key: 2,
  class: "gh-msg-empty"
}, Zs = ["onClick"], eo = { class: "gh-card-indicator-col" }, to = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, so = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, oo = { class: "gh-card-type-col" }, no = ["title"], ao = { class: "gh-card-main-col" }, io = { class: "gh-card-repo-row" }, ro = ["title"], lo = { class: "gh-card-reason-tag" }, co = { class: "gh-card-time" }, uo = ["title"], po = { class: "gh-card-footer-row" }, ho = { class: "gh-card-type-label" }, mo = ["onClick"], go = /* @__PURE__ */ me({
  __name: "GitHubNotificationPanel",
  setup(m) {
    const r = L(null), a = Y(() => [
      { kind: "all", label: "所有", count: S.items.length },
      { kind: "unread", label: "未读", count: S.items.filter((k) => k.unread).length },
      { kind: "mention", label: "提及", count: S.items.filter((k) => k.reason === "mention").length },
      { kind: "author", label: "作者", count: S.items.filter((k) => k.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: S.items.filter((k) => k.reason === "ci_activity" || k.subject.type === "CheckSuite").length }
    ]), d = Y(() => {
      const k = S.items;
      switch (S.activeKind) {
        case "unread":
          return k.filter((w) => w.unread);
        case "mention":
          return k.filter((w) => w.reason === "mention");
        case "author":
          return k.filter((w) => w.reason === "author");
        case "ci":
          return k.filter((w) => w.reason === "ci_activity" || w.subject.type === "CheckSuite");
        default:
          return k;
      }
    });
    function v(k, w) {
      if (w === "ci_activity" || k === "CheckSuite")
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
    function g(k) {
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
    function C() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function c() {
      re.refresh();
    }
    function T() {
      re.close();
    }
    function b(k) {
      Se.open(k);
    }
    function R(k) {
      re.openTarget(k);
    }
    function _(k) {
      if (!S.isOpen) return;
      const w = k.target;
      !r.value?.contains(w) && !w?.closest("#gh-header-msg-center-btn") && re.close();
    }
    function M(k) {
      k.key === "Escape" && S.isOpen && re.close();
    }
    return Re(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", _), window.addEventListener("keydown", M));
    }), Ge(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", _), window.removeEventListener("keydown", M));
    }), (k, w) => (n(), i("div", Ws, [
      l(S).isOpen ? (n(), i("section", {
        key: 0,
        ref_key: "panelRef",
        ref: r,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: w[0] || (w[0] = Q(() => {
        }, ["stop"]))
      }, [
        e("header", Bs, [
          e("div", Vs, [
            w[2] || (w[2] = e("div", { class: "gh-msg-octo-avatar" }, [
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
              w[1] || (w[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", zs, " 共 " + u(l(S).items.length) + " 条通知 · " + u(l(S).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          w[3] || (w[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: C
          }, " ↗ "),
          e("button", {
            type: "button",
            class: N(["gh-panel-btn", { "is-spinning": l(S).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: c
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: T
          }, " ✕ ")
        ]),
        e("nav", qs, [
          (n(!0), i(O, null, W(a.value, (y) => (n(), i("button", {
            key: y.kind,
            type: "button",
            class: N(["gh-msg-tab", { active: l(S).activeKind === y.kind }]),
            onClick: (E) => l(S).activeKind = y.kind
          }, [
            X(u(y.label) + " ", 1),
            y.count > 0 ? (n(), i("span", {
              key: 0,
              class: N(["gh-tab-pill", { "is-unread-pill": y.kind === "unread" }])
            }, u(y.count), 3)) : $("", !0)
          ], 10, Ys))), 128))
        ]),
        e("div", Ks, [
          l(S).loading && !l(S).items.length ? (n(), i("div", Xs, [...w[4] || (w[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : l(S).error ? (n(), i("div", Qs, [
            w[5] || (w[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, u(l(S).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: c
            }, "重试")
          ])) : d.value.length === 0 ? (n(), i("div", Js, [...w[6] || (w[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (n(!0), i(O, { key: 3 }, W(d.value, (y) => (n(), i("article", {
            key: y.id,
            class: N(["gh-notification-card", { "is-unread": y.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (E) => b(y)
          }, [
            e("div", eo, [
              y.unread ? (n(), i("span", to)) : (n(), i("span", so))
            ]),
            e("div", oo, [
              e("span", {
                class: "gh-type-badge",
                title: y.subject.type
              }, u(v(y.subject.type, y.reason)), 9, no)
            ]),
            e("div", ao, [
              e("div", io, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: y.repository.fullName
                }, u(y.repository.fullName), 9, ro),
                e("span", lo, u(g(y.reason)), 1),
                e("time", co, u(y.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: y.subject.title
              }, u(y.subject.title), 9, uo),
              e("div", po, [
                e("span", ho, u(y.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: Q((E) => R(y), ["stop"])
                }, "在网页打开 ↗", 8, mo)
              ])
            ])
          ], 10, Zs))), 128))
        ])
      ], 512)) : $("", !0)
    ]));
  }
}), fo = /* @__PURE__ */ ge(go, [["__scopeId", "data-v-4271efab"]]), bo = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, vo = ["aria-label"], yo = { class: "gh-modal-title-wrap" }, wo = { class: "gh-modal-octo-icon" }, _o = ["href"], ko = { class: "gh-owner" }, Co = { class: "gh-name" }, $o = {
  key: 1,
  class: "gh-modal-repo-name"
}, To = { class: "gh-name" }, Ho = { class: "gh-modal-actions" }, Ao = { class: "gh-modal-content" }, So = {
  key: 0,
  class: "gh-content-loading"
}, Ro = {
  key: 1,
  class: "gh-content-error"
}, Go = { class: "gh-discussion-title-header" }, Mo = { class: "gh-discussion-h1" }, xo = {
  key: 0,
  class: "gh-discussion-num"
}, Lo = { class: "gh-discussion-sub-meta" }, Do = {
  key: 0,
  class: "gh-category-pill"
}, Io = {
  key: 0,
  class: "cat-emoji"
}, No = {
  key: 1,
  class: "gh-category-pill"
}, Uo = { class: "gh-sub-author" }, Eo = { class: "gh-sub-verb" }, jo = {
  key: 2,
  class: "gh-sub-comments-count"
}, Oo = { class: "gh-op-post-card" }, Po = { class: "gh-op-post-head" }, Fo = { class: "gh-op-author-left" }, Wo = ["src"], Bo = { class: "gh-op-meta" }, Vo = { class: "gh-op-name-row" }, zo = { class: "gh-op-name" }, qo = {
  key: 0,
  class: "gh-role-pill"
}, Yo = { class: "gh-op-time" }, Ko = ["innerHTML"], Xo = {
  key: 0,
  class: "gh-reactions-bar"
}, Qo = { class: "rx-emoji" }, Jo = { class: "rx-count" }, Zo = {
  key: 0,
  class: "gh-comments-block"
}, en = { class: "gh-comments-header" }, tn = { class: "gh-comments-count-pill" }, sn = { class: "gh-comments-feed" }, on = { class: "gh-comment-head" }, nn = ["src"], an = { class: "gh-comment-meta" }, rn = { class: "gh-comment-author" }, ln = {
  key: 0,
  class: "gh-role-pill small"
}, cn = { class: "gh-comment-time" }, un = ["innerHTML"], dn = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, pn = { class: "rx-emoji" }, hn = { class: "rx-count" }, mn = {
  key: 1,
  class: "gh-comment-replies-thread"
}, gn = { class: "gh-replies-thread-title" }, fn = { class: "gh-reply-head" }, bn = ["src"], vn = { class: "gh-reply-meta" }, yn = { class: "gh-reply-author" }, wn = {
  key: 0,
  class: "gh-role-pill tiny"
}, _n = { class: "gh-reply-time" }, kn = ["innerHTML"], Cn = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, $n = { class: "rx-emoji" }, Tn = { class: "rx-count" }, Hn = {
  key: 1,
  class: "gh-no-comments"
}, An = /* @__PURE__ */ me({
  __name: "GitHubNotificationDetailDrawer",
  setup(m) {
    const r = L(null), a = L(null), d = L(null);
    let v = !1, g = 0, C = 0, c = 0, T = 0, b = () => {
    };
    const R = Y(() => (h.data?.repositoryFullName || h.notificationItem?.repository.fullName || "").split("/")[0] || ""), _ = Y(() => {
      const G = h.data?.repositoryFullName || h.notificationItem?.repository.fullName || "";
      return G.split("/")[1] || G;
    }), M = Y(() => {
      if (!h.data) return "";
      const G = h.data.bodyHtml?.trim() || "";
      if (G.length > 20) return G;
      const x = h.data.body?.trim() || "";
      return x.length > 0 ? ne.renderMarkdown(x) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), k = Y(() => d.value ? {
      position: "fixed",
      left: `${d.value.x}px`,
      top: `${d.value.y}px`,
      transform: "none"
    } : {});
    ce(
      () => h.isOpen,
      (G) => {
        G && (d.value = null, Oe(() => {
          a.value && (a.value.scrollTop = 0);
        }));
      }
    ), ce(
      () => h.data,
      (G) => {
        G && Oe(() => {
          a.value && (a.value.scrollTop = 0);
        });
      }
    );
    function w(G) {
      if (G.target.closest("button, a, input")) return;
      b();
      const x = r.value;
      if (!x || !h.isOpen) return;
      v = !0;
      const D = x.getBoundingClientRect();
      c = D.left, T = D.top, g = G.clientX, C = G.clientY, d.value = { x: c, y: T };
      const j = (J) => {
        if (!v) return;
        const I = J.clientX - g, f = J.clientY - C;
        d.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, c + I)),
          y: Math.max(10, Math.min(window.innerHeight - 80, T + f))
        };
      }, q = () => {
        v = !1, window.removeEventListener("mousemove", j), window.removeEventListener("mouseup", q);
      };
      b = q, window.addEventListener("mousemove", j), window.addEventListener("mouseup", q);
    }
    function y() {
      Se.close();
    }
    function E() {
      const G = h.data?.htmlUrl || h.notificationItem?.htmlUrl;
      G && typeof window < "u" && window.open(G, "_blank", "noopener,noreferrer");
    }
    function H(G) {
      const D = G.target?.closest("a");
      D && D.href && (G.preventDefault(), G.stopPropagation(), window.open(D.href, "_blank", "noopener,noreferrer"));
    }
    function B() {
      h.notificationItem && Se.open(h.notificationItem);
    }
    function Z(G) {
      switch (G) {
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
    function V(G) {
      switch (G) {
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
          return G || "通知详情";
      }
    }
    function K(G) {
      switch (G) {
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
          return G || "";
      }
    }
    function ae(G) {
      G.key === "Escape" && h.isOpen && y();
    }
    return Re(() => {
      window.addEventListener("keydown", ae);
    }), Ge(() => {
      window.removeEventListener("keydown", ae), b();
    }), (G, x) => (n(), se(ze, { to: "body" }, [
      l(h).isOpen ? (n(), i("div", bo, [
        e("div", {
          ref_key: "windowRef",
          ref: r,
          class: "gh-nonmodal-window",
          style: qe(k.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": l(h).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: w
          }, [
            e("div", yo, [
              e("span", wo, u(Z(l(h).data?.type || l(h).notificationItem?.subject.type)), 1),
              l(h).data?.htmlUrl || l(h).notificationItem?.htmlUrl ? (n(), i("a", {
                key: 0,
                href: l(h).data?.htmlUrl || l(h).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", ko, u(R.value), 1),
                x[0] || (x[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", Co, u(_.value), 1),
                x[1] || (x[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, _o)) : (n(), i("span", $o, [
                e("strong", To, u(l(h).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", Ho, [
              l(h).data?.state ? (n(), i("span", {
                key: 0,
                class: N(["gh-detail-state-pill", l(h).data.state])
              }, u(K(l(h).data.state)), 3)) : $("", !0),
              l(h).data?.htmlUrl || l(h).notificationItem?.htmlUrl ? (n(), i("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: E
              }, " 在网页打开 ↗ ")) : $("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: y
              }, " ✕ ")
            ])
          ], 32),
          e("div", Ao, [
            l(h).loading ? (n(), i("div", So, [
              x[2] || (x[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + u(l(h).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : l(h).error ? (n(), i("div", Ro, [
              x[3] || (x[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, u(l(h).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: B
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: E
                }, "在 GitHub 打开 ↗")
              ])
            ])) : l(h).data ? (n(), i("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: a,
              class: "gh-detail-scrollable",
              onClick: H
            }, [
              e("div", Go, [
                e("h1", Mo, [
                  X(u(l(h).data.title) + " ", 1),
                  l(h).data.number ? (n(), i("span", xo, "#" + u(l(h).data.number), 1)) : $("", !0)
                ]),
                e("div", Lo, [
                  l(h).data.category ? (n(), i("span", Do, [
                    l(h).data.category.emoji ? (n(), i("span", Io, u(l(h).data.category.emoji), 1)) : $("", !0),
                    e("span", null, u(l(h).data.category.name), 1)
                  ])) : (n(), i("span", No, u(V(l(h).data.type)), 1)),
                  e("span", Uo, u(l(h).data.author.login), 1),
                  e("span", Eo, "发布于 " + u(l(h).data.formattedTime), 1),
                  l(h).data.commentsCount ? (n(), i("span", jo, [
                    X(" · " + u(l(h).data.commentsCount) + " 条讨论主题 ", 1),
                    l(h).data.totalRepliesCount ? (n(), i(O, { key: 0 }, [
                      X(" （含 " + u(l(h).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : $("", !0)
                  ])) : $("", !0)
                ])
              ]),
              e("article", Oo, [
                e("div", Po, [
                  e("div", Fo, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: l(h).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Wo),
                    e("div", Bo, [
                      e("div", Vo, [
                        e("strong", zo, u(l(h).data.author.login), 1),
                        l(h).data.author.association ? (n(), i("span", qo, u(l(h).data.author.association), 1)) : $("", !0)
                      ]),
                      e("time", Yo, u(l(h).data.formattedTime), 1)
                    ])
                  ]),
                  x[4] || (x[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                x[5] || (x[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown obsidian-markdown-rendered",
                  innerHTML: M.value
                }, null, 8, Ko),
                l(h).data.reactions?.length ? (n(), i("div", Xo, [
                  (n(!0), i(O, null, W(l(h).data.reactions, (D) => (n(), i("span", {
                    key: D.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", Qo, u(D.emoji), 1),
                    e("span", Jo, u(D.count), 1)
                  ]))), 128))
                ])) : $("", !0)
              ]),
              l(h).data.comments.length ? (n(), i("div", Zo, [
                e("div", en, [
                  x[6] || (x[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", tn, [
                    X(u(l(h).data.commentsCount) + " 条主题 ", 1),
                    l(h).data.totalRepliesCount ? (n(), i(O, { key: 0 }, [
                      X(" · " + u(l(h).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : $("", !0)
                  ])
                ]),
                e("div", sn, [
                  (n(!0), i(O, null, W(l(h).data.comments, (D) => (n(), i("div", {
                    key: D.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", on, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: D.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, nn),
                      e("div", an, [
                        e("span", rn, u(D.author.login), 1),
                        D.author.association ? (n(), i("span", ln, u(D.author.association), 1)) : $("", !0),
                        e("time", cn, u(D.formattedTime), 1)
                      ])
                    ]),
                    x[7] || (x[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown obsidian-markdown-rendered",
                      innerHTML: D.bodyHtml
                    }, null, 8, un),
                    D.reactions?.length ? (n(), i("div", dn, [
                      (n(!0), i(O, null, W(D.reactions, (j) => (n(), i("span", {
                        key: j.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", pn, u(j.emoji), 1),
                        e("span", hn, u(j.count), 1)
                      ]))), 128))
                    ])) : $("", !0),
                    D.replies?.length ? (n(), i("div", mn, [
                      e("div", gn, [
                        e("span", null, "💬 " + u(D.replies.length) + " 条回复对话", 1)
                      ]),
                      (n(!0), i(O, null, W(D.replies, (j) => (n(), i("div", {
                        key: j.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", fn, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: j.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, bn),
                          e("div", vn, [
                            e("strong", yn, u(j.author.login), 1),
                            j.author.association ? (n(), i("span", wn, u(j.author.association), 1)) : $("", !0),
                            e("time", _n, u(j.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown obsidian-markdown-rendered",
                          innerHTML: j.bodyHtml
                        }, null, 8, kn),
                        j.reactions?.length ? (n(), i("div", Cn, [
                          (n(!0), i(O, null, W(j.reactions, (q) => (n(), i("span", {
                            key: q.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", $n, u(q.emoji), 1),
                            e("span", Tn, u(q.count), 1)
                          ]))), 128))
                        ])) : $("", !0)
                      ]))), 128))
                    ])) : $("", !0)
                  ]))), 128))
                ])
              ])) : (n(), i("div", Hn, [...x[8] || (x[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : $("", !0)
          ])
        ], 12, vo)
      ])) : $("", !0)
    ]));
  }
}), Sn = /* @__PURE__ */ ge(An, [["__scopeId", "data-v-3ac8874e"]]), Rn = ["inert"], Gn = { class: "card-head" }, Mn = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, xn = ["title"], Ln = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Dn = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, In = ["placeholder"], Nn = ["title"], Un = { class: "gh-search-rule-icon" }, En = { class: "gh-search-rule-text" }, jn = ["title"], On = {
  key: 0,
  class: "gh-header-msg-badge"
}, Pn = { class: "gh-settings-anchor" }, Fn = ["aria-expanded"], Wn = {
  key: 0,
  class: "muted small",
  role: "status"
}, Bn = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Vn = { class: "gh-bili-layout" }, zn = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, qn = ["title"], Yn = { class: "fo-sidebar-toggle-title" }, Kn = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Xn = ["aria-expanded", "title"], Qn = { class: "fo-sidebar-toggle-chevron" }, Jn = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, Zn = { class: "fo-sidebar-sub-wrap" }, ea = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, ta = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, sa = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, oa = { class: "gh-bili-sidebar-head" }, na = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, aa = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, ia = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, ra = { id: "vue-github-status-root" }, la = { id: "vue-github-repositories-root" }, ca = /* @__PURE__ */ me({
  __name: "GitHubWorkspaceCard",
  setup(m) {
    const r = tt(() => import("./GitHubSettingsModal-BmTgq929.js")), { active: a } = st("card-github", "/github.html");
    let d = 0, v = !1, g;
    const C = L(""), c = L("stars");
    ce(() => a.value && c.value === "stars", (I) => F.setAiViewActive(I), { immediate: !0, flush: "sync" });
    const T = L(!1), b = L("local"), R = L(""), _ = L(!1), M = L(0);
    function k() {
      a.value && (_.value = !0, ++M.value);
    }
    const w = L(!1);
    ce(_, (I) => {
      I && (w.value = !0);
    });
    const y = L(null);
    let E = 0;
    function H(I) {
      c.value = I, I === "trending" ? Pe.switchTab("trending") : Pe.switchTab("stars");
    }
    function B() {
      c.value = "stars";
    }
    const Z = [
      { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
      { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
      { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
      { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
    ], V = L(F.searchRule || "exact"), K = Y(() => Z.find((I) => I.id === V.value) || Z[0]);
    function ae() {
      const I = F.cycleSearchRule();
      V.value = I;
    }
    const G = Y(() => b.value === "global" ? "在 GitHub 全网搜索开源仓库…" : `在当前分类中${K.value.name}搜索 Star 仓库…`);
    function x() {
      clearTimeout(E), !(!a.value || b.value !== "local") && (E = window.setTimeout(() => F.setSearchQuery(R.value.trim().toLowerCase()), 180));
    }
    function D() {
      b.value = b.value === "local" ? "global" : "local", b.value === "local" && x();
    }
    function j() {
      R.value = "", clearTimeout(E), F.resetLocalSearch();
    }
    function q() {
      const I = R.value.trim();
      b.value === "local" ? (clearTimeout(E), F.setSearchQuery(I.toLowerCase())) : I && window.open(`https://github.com/search?q=${encodeURIComponent(I)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function J() {
      ++d, v = !0, C.value = "";
    }
    return ce(a, async (I) => {
      const f = ++d;
      if (clearTimeout(E), g?.abort(), g = new AbortController(), I || g.abort(), F.setRepositoryViewSignal(g.signal), !!I) {
        if (v) {
          await F.resumeRepositoryReads();
          return;
        }
        if (F.repos.length || F.loadingAllStars || F.loadingPage) {
          v = !0;
          return;
        }
        try {
          const P = await Ae();
          if (!a.value || f !== d) return;
          v = !0, await F.loadGitHub(P.ghUser, P.ghToken);
        } catch {
          if (!a.value || f !== d) return;
          v = !1, C.value = "GitHub 初始化失败；请检查设置，或重新进入后重试。";
        }
      }
    }, { immediate: !0, flush: "sync" }), Ze(() => {
      F.setAiViewActive(!1), ++d, g?.abort(), clearTimeout(E);
    }), (I, f) => (n(), i("section", {
      class: N(["card wide", { "card-fullscreen": l(dt).activeId === "card-github" }]),
      id: "card-github",
      inert: !l(a)
    }, [
      e("header", Gn, [
        f[16] || (f[16] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        f[17] || (f[17] = e("h2", null, "GitHub", -1)),
        f[18] || (f[18] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", Mn, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: Q(q, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: b.value === "local" ? "切换为 GitHub 全站搜索" : "切换为当前分类搜索",
              onClick: D
            }, [
              e("span", Ln, u(b.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Dn, u(b.value === "local" ? "当前分类" : "GitHub 全站"), 1),
              f[11] || (f[11] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, xn),
            oe(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": f[0] || (f[0] = (P) => R.value = P),
              placeholder: G.value,
              autocomplete: "off",
              onInput: x
            }, null, 40, In), [
              [de, R.value]
            ]),
            b.value === "local" ? (n(), i("button", {
              key: 0,
              type: "button",
              class: N(["gh-search-rule-btn", `rule-${K.value.id}`]),
              title: `当前匹配规则：${K.value.name}（${K.value.desc}）
点击切换下一个规则`,
              onClick: Q(ae, ["stop"])
            }, [
              e("span", Un, u(K.value.icon), 1),
              e("span", En, u(K.value.name), 1)
            ], 10, Nn)) : $("", !0),
            oe(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: "清空搜索",
              onClick: j
            }, "✕", 512), [
              [Ve, R.value]
            ]),
            f[12] || (f[12] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          f[13] || (f[13] = et('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-96ab861f><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-96ab861f><input type="checkbox" value="exact" checked data-v-96ab861f>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-96ab861f><input type="checkbox" value="loose" data-v-96ab861f>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-96ab861f><input type="checkbox" value="related" data-v-96ab861f>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-96ab861f><input type="checkbox" value="topic" data-v-96ab861f>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-96ab861f><input type="checkbox" value="readme" data-v-96ab861f>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-96ab861f></div>', 2))
        ]),
        e("button", {
          id: "gh-header-msg-center-btn",
          class: N(["gh-header-msg-btn", { "has-unread": l(S).unreadCount > 0, "is-active": l(S).isOpen }]),
          type: "button",
          title: l(S).unreadCount > 0 ? `GitHub 消息通知 (${l(S).unreadCount} 条未读)` : "GitHub 消息通知中心",
          onClick: f[1] || (f[1] = (P) => l(re).toggle())
        }, [
          f[14] || (f[14] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
          f[15] || (f[15] = e("span", { class: "gh-header-msg-label" }, "消息", -1)),
          l(S).unreadCount > 0 ? (n(), i("span", On, u(l(S).unreadCount > 99 ? "99+" : l(S).unreadCount), 1)) : $("", !0)
        ], 10, jn),
        e("div", Pn, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: y,
            "aria-expanded": _.value,
            "aria-label": "GitHub 设置",
            class: "gh-head-settings-btn",
            title: "GitHub 模组偏好设置 (账号、Token、AI模型、缓存)",
            onClick: f[2] || (f[2] = (P) => _.value = !_.value)
          }, " ⚙️ ", 8, Fn),
          w.value ? (n(), se(l(r), {
            key: 0,
            visible: l(a) && _.value,
            anchor: y.value,
            "ai-request": M.value,
            onAccountReload: J,
            onClose: f[3] || (f[3] = (P) => _.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : $("", !0)
        ])
      ]),
      C.value ? (n(), i("p", Wn, u(C.value), 1)) : $("", !0),
      e("div", Bn, [
        e("div", Vn, [
          e("aside", zn, [
            e("div", {
              class: N(["fo-sidebar-toggle-bar", { "is-collapsed": T.value }]),
              title: T.value ? "点击展开快捷频道" : "点击收起快捷频道",
              onClick: f[4] || (f[4] = (P) => T.value = !T.value)
            }, [
              e("div", Yn, [
                f[19] || (f[19] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                f[20] || (f[20] = e("span", null, "快捷频道", -1)),
                T.value ? (n(), i("span", Kn, "3")) : $("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !T.value,
                title: T.value ? "展开" : "收起"
              }, [
                e("span", null, u(T.value ? "展开" : "收起"), 1),
                e("span", Qn, u(T.value ? "▾" : "▴"), 1)
              ], 8, Xn)
            ], 10, qn),
            T.value ? $("", !0) : (n(), i("div", Jn, [
              e("div", Zn, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: N(["fo-sidebar-sub-btn", { on: c.value === "stars" }]),
                  title: "查看与管理 Star 星标仓库",
                  onClick: f[5] || (f[5] = (P) => H("stars"))
                }, [...f[21] || (f[21] = [
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
              e("div", ea, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: N(["fo-sidebar-sub-btn", { on: c.value === "trending" }]),
                  title: "查看 GitHub 实时趋势项目",
                  onClick: f[6] || (f[6] = (P) => H("trending"))
                }, [...f[22] || (f[22] = [
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
              e("div", ta, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: N(["fo-sidebar-sub-btn", { on: c.value === "awesome" }]),
                  title: "查看 Awesome 精选开源资源清单",
                  onClick: f[7] || (f[7] = (P) => H("awesome"))
                }, [...f[23] || (f[23] = [
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
              e("div", sa, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: N(["fo-sidebar-sub-btn", { on: c.value === "repos" }]),
                  title: "查看与管理我的仓库及 Topic 看板",
                  onClick: f[8] || (f[8] = (P) => H("repos"))
                }, [...f[24] || (f[24] = [
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
            e("header", oa, [
              f[25] || (f[25] = e("div", null, [
                e("b", { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, [
                  e("i", { class: "fo-folder-icon" }),
                  X(" 收藏文件夹")
                ]),
                e("small", { style: { color: "var(--dim)", "font-size": "9.5px" } }, "单一文件夹 · 独立正在使用")
              ], -1)),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: "新建文件夹",
                "aria-label": "新建文件夹",
                onClick: f[9] || (f[9] = (P) => l(F).promptCreateFolder())
              }, "＋")
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: B
            }, [
              ee(nt, { active: l(a) }, null, 8, ["active"])
            ])
          ]),
          e("section", na, [
            c.value === "stars" && l(ot).accountConfigured === !1 ? (n(), se(ct, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: f[10] || (f[10] = (P) => _.value = !0)
            })) : c.value === "stars" ? (n(), i(O, { key: 1 }, [
              e("header", aa, [
                ee(rt, { onOpenAiSettings: k })
              ]),
              f[26] || (f[26] = e("div", { class: "gh-main-subbar" }, [
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
              e("div", ia, [
                ee(at, {
                  active: l(a) && c.value === "stars"
                }, null, 8, ["active"])
              ]),
              f[27] || (f[27] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", ra, [
                ee(lt)
              ]),
              e("div", la, [
                ee(it, {
                  active: l(a) && c.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : c.value === "trending" ? (n(), se(ut, { key: 2 })) : c.value === "awesome" ? (n(), se(Mt, { key: 3 })) : c.value === "repos" ? (n(), se(Es, {
              key: 4,
              active: l(a) && c.value === "repos"
            }, null, 8, ["active"])) : $("", !0)
          ])
        ])
      ]),
      ee(fo),
      ee(Sn)
    ], 10, Rn));
  }
}), wa = /* @__PURE__ */ ge(ca, [["__scopeId", "data-v-96ab861f"]]);
export {
  wa as default
};
