<script setup lang="ts">
import { profileMenuController, type ProfileAction } from "./store";

function onActionClick(action: ProfileAction) {
  profileMenuController.trigger(action);
}
</script>

<template>
  <button type="button" data-action="messages" @click.stop="onActionClick('messages')">
    通知中心
  </button>
  <button type="button" data-action="tabs" @click.stop="onActionClick('tabs')">标签页管理</button>
  <button type="button" data-action="refresh" @click.stop="onActionClick('refresh')">
    刷新 B站账号信息
  </button>
  <button type="button" data-action="switch" @click.stop="onActionClick('switch')">
    切换用户（打开 B站）
  </button>
  <button type="button" data-action="web" @click.stop="onActionClick('web')">
    打开 B站个人中心
  </button>
</template>
