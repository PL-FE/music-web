<template>
  <div class="app">
    <HeaderMenu :isScrollTop="isScrollTop" />
    <div class="app-container main-container" @scroll="onScroll" ref="mainContainerRef">
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
import { ref } from "vue";
const userStore = defineUserStore()
getLoginStatus()

function getLoginStatus() {
  loginStatus().then(res => {
    userStore.user = res
  })
}

const mainContainerRef = ref<HTMLDivElement>()
const isScrollTop = ref(true)
function onScroll() {
  isScrollTop.value = mainContainerRef.value?.scrollTop === 0
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
  overflow: auto;
  position: absolute;
  top: 0;
  width: 100%;
}

.main-container {
  height: calc(100vh - 64px);
}
</style>
