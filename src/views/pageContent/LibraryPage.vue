<template>
  <div class="library-container">
    <div class="section-recent-container">
      <SectionListSong key="2" title="最近播放" :column="6">
        <template v-for="it in recent" :key="it.resourceId">
          <PlayListItem
            v-if="['PLAYLIST', 'ALBUM'].includes(it.resourceType)"
            :data="it.data"
          />
          <SongPicItem v-else :data="it.data" />
        </template>
      </SectionListSong>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SectionListSong from '@/components/common/SectionList.vue';
import PlayListItem from '@/components/PlayListItem.vue';
import SongPicItem from '@/components/SongPicItem.vue';
import { ref } from 'vue';
import {
  queryRecordRecentSong,
  queryRecordRecentAlbum,
  queryRecordRecentPlaylist,
} from '@/api/music';

const { recent } = useRecent();

function useRecent() {
  const recent = ref<recentType[]>([]);
  Promise.allSettled([
    queryRecordRecentSong(),
    queryRecordRecentAlbum(),
    queryRecordRecentPlaylist(),
  ]).then((res: any[]) => {
    const data: any[] = [];
    console.log(res);

    res.forEach((it) => {
      const val = (it && it.value) || [];
      data.push(...val);
    });
    data.sort((a, b) => {
      return b.playTime - a.playTime;
    });
    recent.value = data;
  });
  return {
    recent,
  };
}
</script>

<style lang="less" scoped>
.library-container {
  padding: 64px 0;
  width: 80%;
  margin: 0 auto;
}
</style>
