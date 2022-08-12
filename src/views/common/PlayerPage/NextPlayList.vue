<template>
  <div class="next-play">
    <SongItem
      v-for="(it, i) in musicStore.playList"
      :key="i"
      class="song-item"
      :data="it"
      :playListIds="musicStore.playList.map((a) => a.id)"
      hasDuration
      :size="40"
    />
  </div>
</template>

<script setup lang="ts">
import SongItem from '@/components/item/SongItem.vue';
import { defineMusicStore } from '@/store/index';
const musicStore = defineMusicStore();
</script>

<style lang="less" scoped>
.next-play {
  padding: 5px;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
}

.song-item {
  text-align: left;
}
</style>
