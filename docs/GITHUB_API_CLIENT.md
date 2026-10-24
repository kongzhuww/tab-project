# GitHub 只读客户端边界

这是架构升级第一阶段的源码说明，不是浏览器或真实账号验收报告。

## 分层

```text
列表 / 详情 / 设置 / 分析 / GitHub 搜索
                 |
        领域读取与会话守卫
                 |
     api-client.ts (GitHub GET only)
                 |
         https://api.github.com
```

- `src/github/api-client.ts`：唯一 GitHub API 只读传输入口，包含请求头快照、域名限制、超时/取消、完整响应体积上限、JSON解析和错误分类。
- `src/github/account-settings.ts`：原有账号键的叶读取器，没有 service/store 依赖；import 不读取存储或启动网络。
- `src/github/read-request.ts`：旧调用签名的轻量兼容适配器，加上既有可取消等待；不再自己 fetch。
- `detail-read.ts`：默认分支、README、中文候选及相对资源相关领域规则；不再维护另一套 HTTP 实现。
- `star-request.ts`：Star 写入仍有独立的单次 PUT/DELETE 路径，不能拿 GET 重试策略套写入；Star 状态 GET 则使用只读客户端。
- `ai-request.ts`：GitHub README GET 使用共同客户端；付费 AI POST 有独立的节点和凭据规则，不进入 GitHub 客户端。
- `trending-store.ts`：GitHub 主源使用共同客户端，第三方备用源仍有不接受凭据参数的独立、有界读取路径。

## 鉴权是显式选择

读取参数必须提供 `headers`，没有隐式自动降级策略。

- 已加载账号/AI任务：用 `createGitHubReadHeaders(token)` 或原先的请求头快照，保持当前任务的账号归属。
- 详情、独立分析与显式在线搜索：`loadGitHubReadHeaders(signal)` 读取当前已保存的账号；一次多请求任务共用该快照。
- 设置页连接检查：只用当前表单草稿，不用已保存值覆盖尚未保存的输入。
- 明确的匿名模式：`createGitHubReadHeaders()`。只有确实没配置 Token 才匿名；设置读取失败或超过10秒不是“没有Token”。

只发送允许的 Accept、API版本和 Authorization，不转发任意 Cookie/自定义请求头。凭据仅放固定 GitHub API 的请求头，拒绝其它域名、非HTTPS、URL用户信息/凭据查询参数、片段与重定向；客户端不把鉴权复制到展示快照、日志、新缓存或第三方请求；设置表单自身的受控凭据编辑仍保留。

## 调用范围与预算

| 调用方 | 鉴权来源 | 单次预算 |
| --- | --- | --- |
| Star列表、账号身份 | 已加载账号快照 | 15秒、4MiB JSON |
| 仓库详情 | 已保存账号快照 | 单次12秒、2MiB JSON；原有整链45秒、README解码1MiB保留 |
| GitIngest/README摘录 | 已保存账号快照 | 单次15秒、4MiB JSON；原有分析会话60秒与采样限制保留 |
| AI前置README | AI任务已有GitHub快照 | 15秒、1.5MiB JSON、解码1MiB |
| 设置连接检查 | 当前表单草稿 | 10秒、128KiB JSON |
| 搜索栏显式GitHub在线搜索 | 已保存账号快照 | 15秒、1MiB JSON；输入改变/切模式后不提交旧结果 |
| 开源发现GitHub主源 | 已保存账号快照 | 15秒、2MiB JSON；明确is:public，不因Token混入私有仓库 |
| Star状态核对 | 原任务快照 | 15秒；只读状态并立即取消正文 |

JSON按流计数，不能先无界 response.json() 后再检查。客户端缺省4MiB，允许明确配置不超过8MiB的有限预算。状态读取只有显式允许的404才交给领域层判断，不把私有仓库404当作肯定不存在。

开源发现主源现在可以复用Token，但备用 `ghapi.h11.dev` 始终不带账号信息；主源失败原因与备用来源要说明，口径不能冒充GitHub官方Trending。

## 错误与重试

`GitHubReadError` 提供安全的 `kind`、可选HTTP `status` 与 `retryable`，不携带响应正文、URL、请求头或凭据。

- 区分账号设置读取、401鉴权、403权限/SSO、403/429限额、404、其它HTTP、大小、格式、超时和网络。
- HTTP错误正文不展示或写入日志，避免泄露出口地址或其它服务端细节。
- 底层每次只发一次GET，不自动重试、不自动换成匿名、不自动去镜像。
- 列表原来的“有Token最多2次、无Token1次”策略留在业务层；只有网络、超时或5xx允许这次有限重试。401/403/429/404、格式与大小错误不重试。
- 开源发现保留一次第三方公开源降级，不是同一个GitHub请求反复重试，也绝不携带Token。

## 本轮没有做的事

- 不改变窗口、卡片布局、账号键、缓存格式和既有分类/历史数据。
- 不引入跨账号README缓存、全局请求队列、自动账号刷新或后台预取。
- 客户端只校验传输和JSON；仓库、树、搜索、README等数据的领域校验仍由原读取器承担。旧兼容层仍有 `any`，不宣称已消除整个模块的弱类型。
- 本次没有把全应用的 GitHub 更新下载、其它服务请求或第三方接口都迁入该客户端。
- 没有统一所有模块的会话机制；现有version/signal/提交检查继续有效，跨模块会话是后续阶段。
- 没有操作浏览器、读取真实凭据、发起真实API请求、执行Star/AI/Webhook/文件写入验收或运行断言/无头E2E。

验证基线为类型检查、构建、语法和差异检查；真实鉴权、额度响应、取消恢复、卡片和搜索显示仍需用户人工确认。
