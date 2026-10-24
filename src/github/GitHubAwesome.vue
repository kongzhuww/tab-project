<script setup lang="ts">
import { ref, computed } from "vue";
import { AWESOME_LISTS, AWESOME_CATEGORIES, type AwesomeItem } from "./awesome-data";

const activeCategory = ref<string>("all");
const searchQuery = ref<string>("");

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  const cat = activeCategory.value;

  return AWESOME_LISTS.filter((item) => {
    const matchCat = cat === "all" || item.category === cat;
    if (!matchCat) return false;
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
});

function handleOpenUrl(url: string) {
  window.open(url, "_blank", "noreferrer");
}
</script>

<template>
  <div class="gh-awesome-wrapper">
    <header class="gh-awesome-header">
      <div class="gh-awesome-intro">
        <div class="gh-awesome-title">
          <span class="gh-awesome-mark">🌟</span>
          <div>
            <h3>Awesome 优质资源宝库</h3>
            <small>全球顶级开源清单索引 · 点击卡片即可快速直达探索</small>
          </div>
        </div>
        <div class="gh-awesome-search-box">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="搜索 Awesome 清单、技术栈或关键词…"
            aria-label="搜索 Awesome 清单"
          />
          <span v-if="searchQuery" class="gh-awesome-clear" @click="searchQuery = ''">✕</span>
        </div>
      </div>

      <div class="gh-awesome-pills">
        <button
          v-for="cat in AWESOME_CATEGORIES"
          :key="cat.id"
          type="button"
          class="gh-awesome-pill"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          <span>{{ cat.icon }}</span>
          <b>{{ cat.name }}</b>
        </button>
      </div>
    </header>

    <div class="gh-awesome-grid">
      <article
        v-for="item in filteredItems"
        :key="item.id"
        class="gh-awesome-card"
        @click="handleOpenUrl(item.url)"
      >
        <div class="gh-awesome-card-head">
          <div class="gh-awesome-card-name">
            <strong>{{ item.title }}</strong>
            <small>{{ item.name }}</small>
          </div>
          <span class="gh-awesome-stars" title="GitHub Star 预估">★ {{ item.stars }}</span>
        </div>

        <p class="gh-awesome-desc">{{ item.desc }}</p>

        <div class="gh-awesome-footer">
          <div class="gh-awesome-tags">
            <span v-for="tag in item.tags" :key="tag" class="gh-awesome-tag">{{ tag }}</span>
          </div>
          <a
            class="gh-awesome-link-btn"
            :href="item.url"
            target="_blank"
            rel="noreferrer"
            @click.stop
          >
            访问仓库 ↗
          </a>
        </div>
      </article>

      <div v-if="!filteredItems.length" class="gh-awesome-empty">
        <span>⌕ 没有找到匹配的 Awesome 资源</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gh-awesome-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: var(--panel, #0f172a);
}

.gh-awesome-header {
  padding: 14px 20px 10px;
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
}

.gh-awesome-intro {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.gh-awesome-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.gh-awesome-mark {
  font-size: 22px;
  filter: drop-shadow(0 2px 8px rgba(251, 191, 36, 0.4));
}

.gh-awesome-title h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--heading, #ffffff);
}

.gh-awesome-title small {
  color: var(--dim, #94a3b8);
  font-size: 11px;
}

.gh-awesome-search-box {
  position: relative;
  width: min(100%, 320px);
}

.gh-awesome-search-box input {
  width: 100%;
  height: 34px;
  padding: 0 28px 0 12px;
  border-radius: 8px;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  background: var(--surface, rgba(255, 255, 255, 0.06));
  color: var(--text, #f1f5f9);
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.15s ease;
}

.gh-awesome-search-box input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
}

.gh-awesome-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--muted, #64748b);
  font-size: 12px;
}

.gh-awesome-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 2px;
}

.gh-awesome-pills::-webkit-scrollbar {
  display: none;
}

.gh-awesome-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
  background: var(--surface, rgba(255, 255, 255, 0.04));
  color: var(--text, #cbd5e1);
  font-size: 11.5px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.gh-awesome-pill:hover {
  background: var(--surface-hover, rgba(255, 255, 255, 0.1));
  color: var(--heading, #ffffff);
}

.gh-awesome-pill.active {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(129, 140, 248, 0.25));
  border-color: #38bdf8;
  color: #38bdf8;
  font-weight: 650;
  box-shadow: 0 2px 8px rgba(56, 189, 248, 0.18);
}

.gh-awesome-grid {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px 80px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 14px;
  align-content: start;
}

.gh-awesome-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
  background: var(--surface, rgba(255, 255, 255, 0.03));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.18s ease;
}

.gh-awesome-card:hover {
  transform: translateY(-2px);
  border-color: rgba(56, 189, 248, 0.4);
  background: var(--surface-hover, rgba(255, 255, 255, 0.06));
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.gh-awesome-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.gh-awesome-card-name strong {
  display: block;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--heading, #ffffff);
  line-height: 1.35;
}

.gh-awesome-card-name small {
  display: block;
  font-size: 10.5px;
  color: #38bdf8;
  font-family: ui-monospace, monospace;
  margin-top: 2px;
}

.gh-awesome-stars {
  font-size: 11px;
  font-weight: 700;
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.12);
  padding: 2px 8px;
  border-radius: 10px;
  flex-shrink: 0;
}

.gh-awesome-desc {
  font-size: 12px;
  color: var(--text, #94a3b8);
  line-height: 1.5;
  margin: 10px 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.gh-awesome-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid var(--border, rgba(255, 255, 255, 0.06));
}

.gh-awesome-tags {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

.gh-awesome-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--dim, #94a3b8);
}

.gh-awesome-link-btn {
  font-size: 11px;
  color: #38bdf8;
  text-decoration: none;
  font-weight: 600;
  flex-shrink: 0;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background 0.12s ease;
}

.gh-awesome-link-btn:hover {
  background: rgba(56, 189, 248, 0.15);
}

.gh-awesome-empty {
  grid-column: 1 / -1;
  padding: 60px 20px;
  text-align: center;
  color: var(--dim, #64748b);
  font-size: 13px;
}

/* 亮色与孤星米色主题自适应（完美匹配 Star 列表风格） */
.gh-awesome-wrapper {
  background: transparent !important;
}

html[data-theme="lonetrail"] .gh-awesome-title h3 {
  color: #26221a !important;
}

html[data-theme="lonetrail"] .gh-awesome-card {
  background: rgba(242, 238, 228, 0.93) !important;
  border-color: rgba(38, 34, 26, 0.18) !important;
  box-shadow: 0 1px 2px rgba(38, 34, 26, 0.05) !important;
}

html[data-theme="lonetrail"] .gh-awesome-card-name strong {
  color: #26221a !important;
}

html[data-theme="lonetrail"] .gh-awesome-desc {
  color: rgba(38, 34, 26, 0.72) !important;
}

html[data-theme="lonetrail"] .gh-awesome-pill {
  background: rgba(242, 238, 228, 0.8) !important;
  border-color: rgba(38, 34, 26, 0.18) !important;
  color: #26221a !important;
}

html[data-theme="lonetrail"] .gh-awesome-pill.active {
  background: linear-gradient(135deg, rgba(201, 153, 63, 0.35), rgba(163, 78, 60, 0.25)) !important;
  border-color: #c9993f !important;
  color: #a34e3c !important;
}

html[data-theme="light"] .gh-awesome-card-name strong,
:root:not([data-theme="dark"]) .gh-awesome-card-name strong {
  color: #0f172a;
}

html[data-theme="light"] .gh-awesome-desc,
:root:not([data-theme="dark"]) .gh-awesome-desc {
  color: #475569;
}

html[data-theme="light"] .gh-awesome-tag,
:root:not([data-theme="dark"]) .gh-awesome-tag {
  background: rgba(0, 0, 0, 0.05);
  color: #64748b;
}

html[data-theme="light"] .gh-awesome-search-box input,
:root:not([data-theme="dark"]) .gh-awesome-search-box input {
  background: #ffffff;
  color: #0f172a;
}
</style>
