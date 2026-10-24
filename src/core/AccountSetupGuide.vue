<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  description: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
}>();
defineEmits<{ configure: [] }>();
</script>

<template>
  <div class="account-setup-guide" role="status">
    <section class="account-setup-card" :aria-label="title">
      <span class="account-setup-icon" aria-hidden="true">{{ icon }}</span>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div class="account-setup-actions">
        <button type="button" @click="$emit('configure')">前往设置</button>
        <a v-if="secondaryUrl && secondaryLabel" :href="secondaryUrl" target="_blank" rel="noopener noreferrer">{{ secondaryLabel }} ↗</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.account-setup-guide { display:flex; justify-content:center; align-items:center; min-width:0; padding:48px 16px; box-sizing:border-box; }
.account-setup-card { display:flex; flex-direction:column; align-items:center; gap:12px; width:100%; max-width:440px; padding:32px 24px; box-sizing:border-box; border:1px solid var(--border); border-radius:16px; background:var(--surface); text-align:center; box-shadow:0 12px 32px rgba(0,0,0,.08); }
.account-setup-icon { font-size:42px; line-height:1; margin-bottom:4px; }
h3 { margin:0; font-size:16px; font-weight:700; color:var(--heading); }
p { margin:0; font-size:13px; line-height:1.6; color:var(--muted); }
.account-setup-actions { display:flex; flex-wrap:wrap; justify-content:center; gap:12px; margin-top:8px; }
button, a { display:inline-flex; align-items:center; justify-content:center; padding:9px 18px; border:1px solid var(--border); border-radius:9px; background:var(--panel); color:var(--text); font:inherit; font-size:13px; font-weight:600; text-decoration:none; cursor:pointer; }
button { background:var(--accent, #00aeec); border-color:transparent; color:var(--accent-contrast, #fff); }
button:hover { filter:brightness(1.06); }
a:hover { background:var(--surface-hover, var(--surface)); }
</style>
