<template>
  <div class="app app-container" @scroll="onScroll" ref="mainContainerRef">
    <HeaderMenu :isScrollTop="isScrollTop" />
    <div class="page-container">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" :mode="route.meta.transitionMode || 'out-in'">
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
    <ControlBar />
  </div>
</template>
<script lang="ts" setup>
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
<style lang="less" >
@import '@/assets/transition/fade.less';
@import '@/assets/transition/top-slide.less';

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
  overflow-y: auto;
  position: absolute;
}

.page-container {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
