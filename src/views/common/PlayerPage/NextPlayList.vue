<template>
  <div class="next-play">
    <InfiniteScroll :list="musicStore.playList" :itemHeight="65">
      <template #default="{ showList }">
        <SongItem
          v-for="(it, i) in showList"
          :key="i"
          class="song-item"
          :data="it"
          :playListIds="(musicStore.playList || []).map((a) => a.id)"
          hasDuration
          :size="40"
        />
      </template>
    </InfiniteScroll>
  </div>
</template>

<script setup lang="ts">
import SongItem from '@/components/item/SongItem.vue';
import { defineMusicStore } from '@/store/index';
import InfiniteScroll from '@/components/InfiniteScroll.vue';
import { ref } from 'vue';

const musicStore = defineMusicStore();
const loading = ref(true);
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
