<script setup lang="ts">
import { profileMenuController, type ProfileAction } from "./store";
import { t } from "../i18n";

function onActionClick(action: ProfileAction) {
  profileMenuController.trigger(action);
}
</script>

<template>
  <button type="button" data-action="messages" @click.stop="onActionClick('messages')">
    {{ t('profile.menu.notifications') }}
  </button>
  <button type="button" data-action="tabs" @click.stop="onActionClick('tabs')">{{ t('profile.menu.tabs') }}</button>
  <button type="button" data-action="refresh" @click.stop="onActionClick('refresh')">
    {{ t('profile.menu.refreshBili') }}
  </button>
  <button type="button" data-action="switch" @click.stop="onActionClick('switch')">
    {{ t('profile.menu.switchUser') }}
  </button>
  <button type="button" data-action="web" @click.stop="onActionClick('web')">
    {{ t('profile.menu.biliCenter') }}
  </button>
</template>
