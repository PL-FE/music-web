<template>
  <div class="app">
    <HeaderMenu />
    <div class="app-container main-container">
      <router-view></router-view>
      <PlayerPage class="main-container" />
    </div>
    <ControlBar />
  </div>
</template>
<script lang="ts" setup>
import PlayerPage from "@/views/common/PlayerPage/index.vue";

import HeaderMenu from "@/views/HeaderMenu.vue";
import ControlBar from "@/views/ControlBar.vue";
import { loginStatus } from '@/api/user'
import { defineUserStore } from '@/store/index'
const userStore = defineUserStore()

getLoginStatus()

function getLoginStatus() {
  loginStatus().then(res => {
    userStore.user = res
  })
}
</script>
<style>
body {
  margin: 0;
  background-color: #030303;
  color: #fff;
}

.app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.app-container {
  position: relative;
  overflow: auto;
}

.main-container {
  height: calc(100vh - 64px - 64px);
}
</style>
