<script setup lang="ts">
import { computed } from "vue";
import { biliOrganizerDialogController, biliOrganizerDialogState } from "./organizer-dialog-store";

const create = computed(() => biliOrganizerDialogState.create);
const confirm = computed(() => biliOrganizerDialogState.confirm);
const channelPicker = computed(() => biliOrganizerDialogState.channelPicker);
const realFolder = computed(() => create.value.kind === "bili");
const visibleChannels = computed(() => {
  const state = channelPicker.value;
  const query = state.query.trim().toLowerCase();
  const group = state.groups.find((item) => item.id === state.activeGroupId);
  const mids = group ? new Set(group.mids) : null;
  return state.items.filter((item) => (!mids || mids.has(item.mid)) && (!query || item.name.toLowerCase().includes(query) || item.mid.includes(query)));
});
function submit(): void {
  const name = create.value.name.trim();
  if (!name) {
    biliOrganizerDialogController.updateCreate({ status: "请输入名称", error: true });
    return;
  }
  biliOrganizerDialogController.submitCreate({ name, privacy: create.value.privacy });
}
</script>

<template>
  <dialog v-if="create.open" class="fo-create-dialog" open @click.self="biliOrganizerDialogController.closeCreate()" @cancel.prevent="biliOrganizerDialogController.closeCreate()">
    <form @submit.prevent="submit">
      <header><div><i class="fo-folder-icon"></i><span><b>{{ realFolder ? '新建 B站收藏夹' : '新建插件分组' }}</b><small>{{ realFolder ? '会同步创建到你的 B站账号' : '只整理左侧收藏夹，不修改 B站数据' }}</small></span></div><button type="button" aria-label="关闭" :disabled="create.submitting" @click="biliOrganizerDialogController.closeCreate()">×</button></header>
      <label><span>{{ realFolder ? '收藏夹名称' : '分组名称' }}</span><input v-model="create.name" maxlength="48" autocomplete="off" placeholder="输入名称" required :disabled="create.submitting" autofocus /></label>
      <fieldset v-if="realFolder"><legend>可见范围</legend><label><input v-model.number="create.privacy" type="radio" :value="0" :disabled="create.submitting" /><span><b>公开</b><small>其他人可以看到</small></span></label><label><input v-model.number="create.privacy" type="radio" :value="1" :disabled="create.submitting" /><span><b>私密</b><small>仅自己可见</small></span></label></fieldset>
      <p class="fo-create-status" :class="{ error: create.error }" role="status">{{ create.status }}</p>
      <footer><button type="button" :disabled="create.submitting" @click="biliOrganizerDialogController.closeCreate()">取消</button><button class="primary" type="submit" :disabled="create.submitting">{{ create.submitting ? '创建中…' : (realFolder ? '创建收藏夹' : '创建分组') }}</button></footer>
    </form>
  </dialog>

  <dialog v-if="channelPicker.open" class="bili-sub-add-dialog" open @cancel.prevent="biliOrganizerDialogController.closeChannelPicker()">
    <div class="bili-sub-add-shell">
      <header><div><b>从我的关注中添加 UP 主</b><small>沿用“正在关注”的本地分组，只能添加已关注的 UP 主</small></div><button type="button" aria-label="关闭" :disabled="!!channelPicker.submittingMid" @click="biliOrganizerDialogController.closeChannelPicker()">×</button></header>
      <div class="bili-sub-add-toolbar">
        <div class="bili-sub-add-groups"><button type="button" class="bili-sub-add-group" :class="{ on: channelPicker.activeGroupId === '__all__' }" @click="biliOrganizerDialogController.updateChannelPicker({ activeGroupId: '__all__' })">全部关注</button><button v-for="group in channelPicker.groups" :key="group.id" type="button" class="bili-sub-add-group" :class="{ on: channelPicker.activeGroupId === group.id }" @click="biliOrganizerDialogController.updateChannelPicker({ activeGroupId: group.id })">{{ group.name }}</button></div>
        <input v-model="channelPicker.query" type="search" placeholder="搜索关注的 UP 主" />
      </div>
      <div class="bili-sub-add-list">
        <div v-if="channelPicker.loading" class="fo-bili-loading"><i></i><span>正在读取关注分组…</span></div>
        <p v-else-if="channelPicker.error" class="fo-bili-empty">{{ channelPicker.error }}</p>
        <p v-else-if="!visibleChannels.length" class="fo-bili-empty">该分组中没有匹配的已关注 UP 主。</p>
        <template v-else><button v-for="item in visibleChannels" :key="item.mid" type="button" class="bili-sub-add-up" :disabled="item.added || !!channelPicker.submittingMid" @click="biliOrganizerDialogController.selectChannel(item.mid)">
          <img v-if="item.face" :src="item.face" alt="" referrerpolicy="no-referrer" /><span v-else class="bili-sub-add-avatar">UP</span><span><b>{{ item.name }}</b><small>UID {{ item.mid }}</small></span><i>{{ item.added ? '已添加' : (channelPicker.submittingMid === item.mid ? '添加中…' : '＋ 添加') }}</i>
        </button></template>
      </div>
    </div>
  </dialog>

  <div v-if="confirm.open" class="fo-custom-confirm-overlay" @click.self="biliOrganizerDialogController.closeConfirm()">
    <div class="fo-custom-confirm-modal" role="dialog" aria-modal="true">
      <div class="fo-custom-confirm-head"><h4>{{ confirm.title }}</h4></div>
      <div class="fo-custom-confirm-body"><p>{{ confirm.message }}</p></div>
      <div class="fo-custom-confirm-actions"><button type="button" class="fo-confirm-btn cancel" :disabled="confirm.submitting" @click="biliOrganizerDialogController.closeConfirm()">{{ confirm.cancelText }}</button><button type="button" class="fo-confirm-btn confirm" :class="{ danger: confirm.danger }" :disabled="confirm.submitting" @click="biliOrganizerDialogController.submitConfirm()">{{ confirm.submitting ? '处理中…' : confirm.confirmText }}</button></div>
    </div>
  </div>
</template>
