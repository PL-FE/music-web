<template>
  <HeaderMenu />
  <div class="app-container">
    <router-view></router-view>
    <PlayerPage />
  </div>
  <ControlBar />
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

.app-container {
  position: relative;
}
</style>
