<script setup lang="ts">
import { ref } from "vue";

const todoistToken = ref("");
const biliMid = ref("");
const busy = ref(false);
const status = ref("");
const statusKind = ref<"success" | "error" | "">("");
function show(message: string, kind: "success" | "error" | "" = ""): void {
  status.value = message;
  statusKind.value = kind;
}
async function responseJson(response: Response): Promise<any> {
  if (!response.ok) throw new Error(`服务返回 HTTP ${response.status}`);
  return response.json();
}
async function checkPool(): Promise<void> {
  if (busy.value) return;
  busy.value = true;
  show("正在查询本地同步池…");
  try {
    const json = await responseJson(await fetch("/api/sync-pull", { cache: "no-store" }));
    if (json && !json.empty) show(`✓ 电脑同步池中已有配置数据！\nTodoist Token: ${json.todoistToken ? "已配置" : "未配置"}\nB站 UID: ${json.biliUserMid || "未配置"}\n手机端现在点击「过继配置」即可继承设置。`, "success");
    else show("电脑同步池目前为空。若确需过继凭据，可在本页明确填写并推送；普通备份不提供 Token。", "error");
  } catch (error: any) { show(`连接服务失败：${error?.message || "未知错误"}`, "error"); }
  finally { busy.value = false; }
}
async function push(): Promise<void> {
  if (busy.value) return;
  const token = todoistToken.value.trim();
  const mid = biliMid.value.trim();
  if (!token && !mid) { show("请至少输入 Todoist Token 或 B站 UID 中的一项。", "error"); return; }
  busy.value = true;
  show("正在直推到同步池…");
  try {
    const payload: { todoistToken?: string; biliUserMid?: string } = {};
    if (token) payload.todoistToken = token;
    if (mid) payload.biliUserMid = mid;
    const json = await responseJson(await fetch("/api/sync-push", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
    }));
    if (json?.ok) {
      todoistToken.value = "";
      show("✓ 已推送到手机同步池，请在手机上过继配置。", "success");
    } else show(`推送失败：${json?.error || "未知原因"}`, "error");
  } catch (error: any) { show(`推送异常：${error?.message || "未知错误"}`, "error"); }
  finally { busy.value = false; }
}
</script>

<template>
  <div class="card">
    <div style="font-size:44px;margin-bottom:8px">📲 ⇄ 💻</div>
    <h1>电脑配置过继到手机 App</h1>
    <p>这是单独的凭据过继功能，不是普通备份。点击直推会把下方手动填写的 Token / UID 明文送到本机同步池，再供手机接收；仅在你信任此服务时使用。</p>
    <div class="step-box">
      <b>普通备份不携带凭据：</b><br />
      全局设置不再读取账号与 Token，Dock「同步备份」也不导出它们。<br />
      如确需过继，可在下方明确填写并直推，再到手机接收；这里不会自动读取模块凭据。
    </div>
    <div class="step-box" style="background:rgba(99,102,241,.06);border-color:rgba(99,102,241,.25)">
      <b>直接填写并推送到手机</b><br />
      <div class="bridge-form">
        <label for="direct-todoist-token">Todoist API Token：</label>
        <input id="direct-todoist-token" v-model="todoistToken" type="password" autocomplete="off" placeholder="粘贴 Todoist Token" />
        <label for="direct-bili-mid">B站用户 UID：</label>
        <input id="direct-bili-mid" v-model="biliMid" type="text" autocomplete="off" inputmode="numeric" placeholder="例如个人主页链接中的 UID" />
        <button class="btn" type="button" :disabled="busy" @click="push">🚀 立即直推到手机端</button>
      </div>
    </div>
    <button class="btn secondary" type="button" :disabled="busy" @click="checkPool">🔍 检查当前电脑同步池状态</button>
    <div v-if="status" class="status" :class="statusKind" role="status" aria-live="polite">{{ status }}</div>
  </div>
</template>
