<template>
  <div class="relevant-view-container">
    <div v-if="simiSongs.length" class="section">
      <h2>您可能还喜欢</h2>
      <div class="section-body">
        <SongItem
          v-for="item in simiSongs"
          :key="item.id"
          class="song-item"
          :data="item"
          :size="40"
          :hasDuration="false"
          :playListIds="simiSongs.map((a) => a.id)"
        />
      </div>
    </div>
    <div v-if="simiPlaylist.length" class="section">
      <h2>包含这首歌的歌单</h2>
      <div class="section-body playList">
        <PlayListItem
          v-for="item in simiPlaylist"
          :key="item.id"
          :data="item"
          class="platlist-item"
          :sizes="100"
        />
      </div>
    </div>
    <div v-if="simiArtist.length" class="section">
      <h2>同类型音乐人</h2>
      <div class="section-body artist">
        <ArtistsItem
          v-for="it in simiArtist"
          :key="it.id"
          :data="it"
          class="artist-item"
          :sizes="100"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SongItem from '@/components/item/SongItem.vue';
import { getSimiSong, getSimiPlaylist, getSimiArtist } from '@/api/music';
import { ref, watch } from 'vue';
import { defineMusicStore } from '@/store/index';
import PlayListItem from '@/components/item/PlayListItem.vue';
import ArtistsItem from '@/components/item/ArtistsItem.vue';

const musicStore = defineMusicStore();
const simiSongs = ref<songTypes[]>([]);
const simiPlaylist = ref<playListTypes[]>([]);
const simiArtist = ref<artistTypes[]>([]);
watch(
  () => musicStore.playSongId,
  (songId) => {
    if (!songId) return;
    getSimiSong(+songId).then((res: any) => {
      simiSongs.value = res.songs;
    });
    getSimiPlaylist(+songId).then((res: any) => {
      simiPlaylist.value = res.playlists;
    });
  },
  {
    immediate: true,
  }
);
watch(
  () => musicStore?.curSong?.artist?.id,
  (id) => {
    if (!id) return;
    getSimiArtist(+id).then((res: any) => {
      simiArtist.value = res.artists;
    });
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.relevant-view-container {
  text-align: left;
  height: 100%;
  overflow: auto;

  .platlist-item,
  .artist-item {
    display: inline-block;
    margin-right: 25px;
    margin-bottom: 25px;
  }

  .section-body {
    &.playList,
    &.artist {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
