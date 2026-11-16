<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { gitHubService, type GitHubRawRepo } from "../services/github.service";
import { starBoardData } from "./stars-board-data";
import { githubStatusState } from "./store";
const props = defineProps<{ repo: GitHubRawRepo; alreadyStarred?: boolean }>();
const busy = ref(false), confirmedOwner = ref(""), error = ref("");
const starred = computed(() => Boolean(props.alreadyStarred || (starBoardData.ownerKey && confirmedOwner.value === starBoardData.ownerKey) || (gitHubService.token && starBoardData.repos.some(item => item.full_name.toLowerCase() === props.repo.full_name.toLowerCase()))));
watch(() => [starBoardData.ownerKey, props.repo.full_name] as const, () => { confirmedOwner.value = ""; error.value = ""; });
async function addStar(): Promise<void> {
  if (busy.value || starred.value) return;
  if (!gitHubService.token) { error.value = "请先在 GitHub 账号设置中配置 Token。"; return; }
  const owner = starBoardData.ownerKey;
  if (!owner) { error.value = "GitHub 账号正在加载，请稍后再试。"; return; }
  busy.value = true; error.value = "";
  try {
    // PUT is idempotent. An unfilled star means not yet verified, not necessarily unstarred.
    const ok = await gitHubService.starRepository(props.repo, true);
    if (owner !== starBoardData.ownerKey) return;
    if (ok) confirmedOwner.value = owner;
    else error.value = githubStatusState.actionText || "Star 未完成，请稍后重试。";
  } catch { if (owner === starBoardData.ownerKey) error.value = "Star 结果未确认，请先刷新核对，勿重复提交。"; }
  finally { busy.value = false; }
}
</script>
<template>
  <span class="star-wrap">
    <button type="button" class="star-action" :class="{ starred }" :disabled="busy || starred" :title="starred ? '已 Star' : '点击 Star，未点击时状态可能尚未核对'" :aria-label="starred ? '已 Star' : `Star ${repo.full_name}`" @click.stop="addStar">{{ busy ? '…' : starred ? '★' : '☆' }}</button>
    <span v-if="error" class="star-error" role="status">{{ error }}</span>
  </span>
</template>
<style scoped>
.star-wrap{flex:none}.star-action{display:grid;place-items:center;width:29px;height:29px;border:1px solid var(--border,#e2e8f0);border-radius:7px;background:var(--surface,#f8fafc);color:var(--muted,#64748b);font-size:17px;line-height:1;cursor:pointer}.star-action:hover:not(:disabled){color:#c58a1a;border-color:#d7b463;background:#fff9e8}.star-action.starred{color:#c58a1a;opacity:1}.star-action:disabled{cursor:default}.star-error{position:absolute;right:8px;top:46px;z-index:5;width:220px;max-width:80%;padding:8px;border:1px solid var(--border,#e2e8f0);border-radius:7px;background:var(--panel,#fff);color:var(--text,#334155);font-size:11px;line-height:1.4;box-shadow:0 3px 12px #0002;overflow-wrap:anywhere}
</style>
