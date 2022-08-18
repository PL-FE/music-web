<template>
  <PlayListScroll
    :refresh="getAlbumNew"
    class="newReleases-container"
    :sizes="150"
  >
    <template #title>
      <h1 :style="{ fontSize: '40px' }">新发行</h1>
      <h1>专辑和单曲</h1>
    </template>
  </PlayListScroll>
</template>

<script setup lang="ts">
import { getAlbumNew } from '@/api/music';
import PlayListScroll from '@/components/PlayListScroll.vue';
</script>

<style lang="less" scoped>
.newReleases-container {
  padding: 64px 10%;
  margin: 0 auto;
  overflow: hidden;
}
</style>

<style lang="less" scoped>
@media screen and(max-width:414px) {
  .newReleases-container {
    padding: 64px 10px;
    width: 100%;
  }
}
</style>
