<script setup lang="ts">
defineProps<{ label: string }>();
</script>
<template><span class="loading-indicator" role="status"><span class="spinner" aria-hidden="true"></span><span>{{ label }}</span></span></template>
<style scoped>
.loading-indicator { display:inline-flex; align-items:center; gap:7px; color:#93a2b7; font-size:11px; line-height:1.5; }.spinner { width:13px; height:13px; flex:none; border:1.5px solid rgba(125,119,223,.22); border-top-color:#8178df; border-radius:50%; animation:spin .8s linear infinite; }@keyframes spin { to { transform:rotate(360deg); } }@media(prefers-reduced-motion:reduce) { .spinner { animation-duration:2s; } }
</style>
