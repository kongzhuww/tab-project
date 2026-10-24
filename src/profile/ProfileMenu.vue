<script setup lang="ts">
import { profileMenuController, type ProfileAction } from "./store";

function onActionClick(action: ProfileAction) {
  profileMenuController.trigger(action);
}
</script>

<template>
  <button type="button" data-action="messages" @click.stop="onActionClick('messages')">
    在本地查看我的信息与性能
  </button>
  <button type="button" data-action="refresh" @click.stop="onActionClick('refresh')">
    刷新账号与性能探针
  </button>
  <button type="button" data-action="switch" @click.stop="onActionClick('switch')">
    切换用户（打开 B站）
  </button>
  <button type="button" data-action="web" @click.stop="onActionClick('web')">
    打开 B站个人中心
  </button>
</template>
