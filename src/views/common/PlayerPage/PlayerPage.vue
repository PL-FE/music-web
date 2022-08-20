<template>
  <div class="player-page-container">
    <div class="song-cover-container">
      <SongImage :src="coverImgUrl" :size="600" />
    </div>
    <PlayList class="play-list-container" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import PlayList from './PlayList.vue';
import { defineMusicStore } from '@/store/index';
import SongImage from '@/components/common/SongImage.vue';
import { useRouter } from 'vue-router';
const musicStore = defineMusicStore();
const coverImgUrl = ref('');
if (!musicStore.playListIds.length) {
  useRouter().push({ path: '/' });
}
onMounted(() => {
  watchEffect(() => {
    if (musicStore.curSong) {
      coverImgUrl.value = musicStore.curSong.album.picUrl;
    }
  });
});
</script>

<style lang="less" scoped>
.player-page-container {
  position: fixed;
  overflow: hidden;
  top: 0;
  z-index: 10;
  width: 100%;
  background-color: #030303;
  display: flex;
  padding: 128px 0 0 0;
  text-align: center;
  box-sizing: border-box;

  height: calc(100vh - 64px);

  .song-cover-container {
    flex: 2;
    height: 100%;
  }

  .play-list-container {
    height: 100%;
    flex: 1;
    overflow: auto;
    margin-right: 10%;
  }
}
@media screen and(max-width:414px) {
  .player-page-container {
    padding: 0;
    flex-direction: column;
    .song-cover-container {
      position: absolute;
      height: 25%;
      margin: 0px auto;
      padding-top: 64px;
      width: 100%;
    }

    .play-list-container {
      position: absolute;
      top: calc(25% + 64px);
      height: calc(75% - 64px);
      width: 100%;
      margin-right: 0;
    }
    :deep(.relevant-view-container) {
      padding: 0 20px;
    }
  }
}
</style>
