<template>
  <div class="home-page-container">
    <SectionListSong
      :title="userStore.isLogin ? '为你推荐' : '新歌速递'"
      :column="isMobile ? 2 : 4"
    >
      <template #default="{ width }">
        <SongItem
          v-for="it in recommendSongList"
          :key="it.id"
          :data="it"
          :style="{ width: width + 'px' }"
          :playListIds="recommendSongList.map((a) => a.id)"
        />
      </template>
    </SectionListSong>
    <SectionListSong v-if="recommendPlaylists.length" key="1" title="推荐歌单">
      <template #default="{ width }">
        <PlayListItem
          v-for="it in recommendPlaylists"
          :key="it.id"
          :data="it"
          :sizes="width"
        />
      </template>
    </SectionListSong>
    <SectionListSong key="2" title="流行歌手">
      <template #default="{ width }">
        <ArtistsItem
          v-for="it in topArtists"
          :key="it.id"
          :data="it"
          :sizes="width"
        />
      </template>
    </SectionListSong>
    <SectionListSong key="2" title="流行歌单">
      <template #default="{ width }">
        <PlayListItem
          v-for="it in topPlaylists"
          :key="it.id"
          :data="it"
          :sizes="width"
        />
      </template>
    </SectionListSong>
  </div>
</template>

<script setup lang="ts">
import SectionListSong from '@/components/common/SectionList.vue';
import {
  getNewsong,
  getTopPlaylist,
  getTopArtists,
  recommendSongs,
  recommendResource,
} from '@/api/music';
import { ref, watchEffect, getCurrentInstance } from 'vue';
import SongItem from '@/components/item/SongItem.vue';
import ArtistsItem from '@/components/item/ArtistsItem.vue';
import PlayListItem from '@/components/item/PlayListItem.vue';
import { defineUserStore } from '@/store/index';
const recommendSongList = ref<songTypes[]>([]);
const userStore = defineUserStore();
const isMobile =
  getCurrentInstance()?.appContext.config.globalProperties.$isMobile;

// 为你推荐的歌曲（兼容未登录）
watchEffect(() => {
  if (userStore.isLogin) {
    recommendSongs().then((songs: songTypes[]) => {
      recommendSongList.value = songs;
    });
  } else {
    const limit = 30;
    getNewsong(limit).then((res: any) => {
      recommendSongList.value = res as songTypes[];
    });
  }
});

// 推荐的歌单（需要登陆）
const recommendPlaylists = ref<playListTypes[]>([]);
recommendResource().then((res: any) => {
  recommendPlaylists.value = res.recommend;
});

// 流行歌手
const topArtists = ref<artistTypes[]>([]);
getTopArtists().then((res: any) => {
  topArtists.value = res.artists;
});

// 流行歌单
const topPlaylists = ref<playListTypes[]>([]);
getTopPlaylist({}).then((res: any) => {
  topPlaylists.value = res.playlists;
});
</script>

<style lang="less" scoped>
.home-page-container {
  padding: 64px 0;
  width: 80%;
  margin: 0 auto;
}
</style>
<style lang="less" scoped>
@media screen and(max-width:414px) {
  .home-page-container {
    width: 100%;
    padding: 64px 10px;
    box-sizing: border-box;
  }
}
</style>
