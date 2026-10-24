<script setup lang="ts">
import { workspaceLaunchersController } from "./store";

function onOpen(id: string) {
  workspaceLaunchersController.openWorkspace(id, true);
}
</script>

<template>
  <button id="ai-top-open" type="button" @click="onOpen('ai')">AI 助手</button>
  <button id="todoist-top-open" type="button" @click="onOpen('todoist')">Todoist</button>
  <button id="stickers-top-open" type="button" @click="onOpen('stickers')">表情包</button>
  <button id="calcom-top-open" type="button" @click="onOpen('calcom')">预约</button>
  <button id="wallpaper-top-open" type="button" @click="onOpen('wallpaper')">壁纸库</button>
  <slot />
</template>
