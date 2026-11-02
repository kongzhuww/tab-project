// src/todoist/api-error.ts
var TodoistApiError = class extends Error {
  constructor(kind, status, retryAfterMs2, submitted = false) {
    super(todoistErrorText({ kind, status, retryAfterMs: retryAfterMs2 }));
    this.kind = kind;
    this.status = status;
    this.retryAfterMs = retryAfterMs2;
    this.submitted = submitted;
    this.name = kind === "cancelled" ? "AbortError" : "TodoistApiError";
  }
  kind;
  status;
  retryAfterMs;
  submitted;
};
function retryAfterMs(value, now = Date.now()) {
  if (!value) return 6e4;
  const numeric = Number(value);
  const delay = Number.isFinite(numeric) ? numeric * 1e3 : Date.parse(value) - now;
  return Number.isFinite(delay) ? Math.max(1e3, delay) : 6e4;
}
function todoistHttpError(response, submitted = false) {
  const status = response.status;
  return new TodoistApiError(
    status === 401 || status === 403 ? "auth" : status === 429 ? "rate-limit" : status === 404 || status === 410 ? "not-found" : "http",
    status,
    status === 429 ? retryAfterMs(response.headers.get("retry-after")) : void 0,
    submitted
  );
}
function todoistErrorText(error) {
  const item = error;
  switch (item?.kind) {
    case "configuration":
      return "Todoist \u914D\u7F6E\u4E0D\u53EF\u7528\uFF0C\u8BF7\u68C0\u67E5\u8D26\u53F7\u8BBE\u7F6E\u3002";
    case "auth":
      return "Todoist \u8D26\u53F7\u6216\u6743\u9650\u4E0D\u53EF\u7528\uFF0C\u8BF7\u68C0\u67E5\u8D26\u53F7\u8BBE\u7F6E\u3002";
    case "rate-limit":
      return `Todoist \u8BF7\u6C42\u53D7\u9650\uFF0C\u8BF7\u7EA6 ${Math.ceil((item.retryAfterMs || 6e4) / 1e3)} \u79D2\u540E\u624B\u52A8\u5237\u65B0\uFF1B\u672A\u81EA\u52A8\u91CD\u8BD5\u3002`;
    case "not-found":
      return "Todoist \u8D44\u6E90\u4E0D\u5B58\u5728\u6216\u63A5\u53E3\u4E0D\u53EF\u7528\uFF0C\u8BF7\u5728 Todoist \u4E2D\u6838\u5BF9\uFF1B\u672A\u5220\u9664\u672C\u673A\u5173\u8054\u3002";
    case "timeout":
      return "Todoist \u8BF7\u6C42\u8D85\u65F6\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u624B\u52A8\u6838\u5BF9\u3002";
    case "cancelled":
      return "Todoist \u8BFB\u53D6\u5DF2\u53D6\u6D88\u3002";
    case "invalid-response":
      return "Todoist \u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u5237\u65B0\u3002";
    case "network":
      return "Todoist \u7F51\u7EDC\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\u8BFB\u53D6\u3002";
    case "http":
      return `Todoist \u8BF7\u6C42\u5931\u8D25${item.status ? `\uFF08HTTP ${item.status}\uFF09` : ""}\uFF0C\u8BF7\u7A0D\u540E\u6838\u5BF9\u3002`;
    default:
      return "Todoist \u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u5237\u65B0\u6838\u5BF9\u3002";
  }
}
export {
  TodoistApiError,
  retryAfterMs,
  todoistErrorText,
  todoistHttpError
};
