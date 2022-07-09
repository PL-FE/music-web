<template>
  <HeaderMenu />
  <router-view></router-view>
  <ControlBar />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import HeaderMenu from "@/views/HeaderMenu.vue";
import ControlBar from "@/views/ControlBar.vue";
export default defineComponent({
  name: 'App',
  components: { HeaderMenu, ControlBar },
  setup() {

  }
})
</script>
<style>
body {
  margin: 0;
  background-color: #030303;
  color: #fff;
}
</style>
