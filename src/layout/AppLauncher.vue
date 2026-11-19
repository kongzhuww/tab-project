<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";
import WeatherWidget from "../weather/WeatherWidget.vue";
import HeroMotto from "../clock/HeroMotto.vue";
import HeroClock from "../clock/HeroClock.vue";
import SearchBox from "../search/SearchBox.vue";
import HomeMusicCard from "../music/HomeMusicCard.vue";
import FavoriteSites from "../launchers/FavoriteSites.vue";
import { homePrefsState } from "../launcher/home-prefs.store";
import { WallpaperService } from "../services/wallpaper.service";
import { t } from "../i18n";

const transparency = reactive({ sitesTransparency: 6, weatherTransparency: 6, newsTransparency: 6, playerTransparency: 6 });
const keys = Object.keys(transparency) as Array<keyof typeof transparency>;
function setTransparency(key: keyof typeof transparency, value: unknown) {
  transparency[key] = typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.min(80, value)) : 6;
}
function onStorageChanged(changes: Record<string, { newValue?: unknown }>, area: string) {
  if (area === 'local') for (const key of keys) if (changes[key]) setTransparency(key, changes[key].newValue);
}
onMounted(() => {
  void WallpaperService.initWallpaper();
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    void chrome.storage.local.get(keys).then((values: Record<string, unknown>) => {
      for (const key of keys) setTransparency(key, values[key]);
    });
    chrome.storage.onChanged.addListener(onStorageChanged);
  }
});
onUnmounted(() => {
  if (typeof chrome !== 'undefined' && chrome.storage?.onChanged) chrome.storage.onChanged.removeListener(onStorageChanged);
});
</script>

<template>
  <section id="launcher" class="launcher" aria-label="快捷入口" :style="{
    '--sites-opacity': (100 - transparency.sitesTransparency) / 100,
    '--weather-opacity': (100 - transparency.weatherTransparency) / 100,
    '--news-opacity': (100 - transparency.newsTransparency) / 100,
    '--player-opacity': (100 - transparency.playerTransparency) / 100,
  }">
    <div id="hero-background-media" class="hero-background-media" aria-hidden="true"></div>

    <div class="launcher-inner">
      <div class="launcher-overview">
        <section class="launcher-widget launcher-weather" :class="{ 'home-module-hidden': !homePrefsState.showWeather }" :aria-hidden="!homePrefsState.showWeather" :inert="!homePrefsState.showWeather" data-home-module="weather" :title="t('weather.widgetSwitchTip')">
          <header class="card-head">
            <span class="bar" style="background: linear-gradient(180deg,#38bdf8,#818cf8)"></span>
            <h2 id="wx-title">{{ t('weather.widgetTitle') }}</h2>
          </header>
          <div id="weather-body">
            <WeatherWidget v-if="homePrefsState.showWeather" />
          </div>
        </section>

        <div class="launcher-center">
          <div class="hero-clock" id="hero-clock">
            <HeroMotto />
            <HeroClock />
          </div>

          <form id="search" class="search" @submit.prevent>
            <SearchBox />
          </form>
        </div>

        <section class="launcher-widget launcher-task-threads launcher-music-card" :class="{ 'home-module-hidden': !homePrefsState.showHomePlayer }" :aria-hidden="!homePrefsState.showHomePlayer" :inert="!homePrefsState.showHomePlayer" data-home-module="taskThreads">
          <header class="card-head">
            <span class="bar music-purple"></span>
            <h2>{{ t('home.music.player') }}</h2>
          </header>
          <div id="task-thread-home" class="task-thread-home home-music-body">
            <HomeMusicCard v-if="homePrefsState.showHomePlayer" />
          </div>
        </section>
      </div>

      <div id="launcher-groups" class="launcher-groups has-sites has-media">
        <FavoriteSites />
      </div>
    </div>

    <input id="background-input" type="file" accept="image/*,video/mp4,video/webm,.gif,.mp4,.webm" multiple hidden />
  </section>
</template>
