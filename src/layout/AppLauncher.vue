<script setup lang="ts">
import { defineAsyncComponent, onMounted } from "vue";
import WeatherWidget from "../weather/WeatherWidget.vue";
import HeroMotto from "../clock/HeroMotto.vue";
import HeroClock from "../clock/HeroClock.vue";
import SearchBox from "../search/SearchBox.vue";
import HomeMusicCard from "../music/HomeMusicCard.vue";
import FavoriteSites from "../launchers/FavoriteSites.vue";
import { launcherGroupsState } from "../launchers/store";
import { homePrefsState } from "../launcher/home-prefs.store";
import { homeMusicState } from "../music/store";
import { windowManagerController } from "../core/window-manager.store";
import { WallpaperService } from "../services/wallpaper.service";

onMounted(() => {
  void WallpaperService.initWallpaper();
});

function openNeteaseWorkspace() {
  windowManagerController.handleToolClick("music");
}
</script>

<template>
  <section id="launcher" class="launcher" aria-label="快捷入口">
    <div id="hero-background-media" class="hero-background-media" aria-hidden="true"></div>

    <div class="launcher-inner">
      <div class="launcher-overview">
        <section v-show="homePrefsState.showWeather" class="launcher-widget launcher-weather" data-home-module="weather" title="右键此处可快速切换天气地点">
          <header class="card-head">
            <span class="bar" style="background: linear-gradient(180deg,#38bdf8,#818cf8)"></span>
            <h2 id="wx-title">天气</h2>
          </header>
          <div id="weather-body">
            <WeatherWidget />
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

        <section class="launcher-widget launcher-task-threads launcher-music-card" data-home-module="taskThreads">
          <header class="card-head">
            <span class="bar music-purple"></span>
            <h2>播放器</h2>
            <span class="grow"></span>
            <button id="home-music-open-panel" class="home-music-head-btn" type="button" title="打开网易云模块" @click="openNeteaseWorkspace">网易云 ↗</button>
          </header>
          <div id="task-thread-home" class="task-thread-home home-music-body">
            <HomeMusicCard />
          </div>
        </section>
      </div>

      <div id="launcher-groups" class="launcher-groups" :class="{ 'has-sites': launcherGroupsState.showSites, 'has-todoist': launcherGroupsState.hasTodo, 'has-bili': launcherGroupsState.hasBili, 'has-media': launcherGroupsState.hasTodo || launcherGroupsState.hasBili }">
        <FavoriteSites />
      </div>
    </div>

    <input id="background-input" type="file" accept="image/*,video/mp4,video/webm,.gif,.mp4,.webm" multiple hidden />
  </section>
</template>
