<template>
  <div class="library-container">
    <div class="section recent-container">
      <SectionListSong key="2" title="最近播放" :column="6">
        <template v-for="it in recent" :key="it.resourceId">
          <PlayListItem :data="it.data" />
        </template>
      </SectionListSong>
    </div>
    <div class="section">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="喜欢的音乐" name="song">
          <PlayListTable
            :data="likeList"
            :play-list-id="playList.length && playList[0].id"
          />
        </el-tab-pane>
        <el-tab-pane label="歌单" name="playlist">歌单</el-tab-pane>
        <el-tab-pane label="专辑" name="album"
          >专辑
          <el-button type="primary">009</el-button>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="artist">歌手</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SectionListSong from '@/components/common/SectionList.vue';
import PlayListItem from '@/components/item/PlayListItem.vue';
import PlayListTable from '@/components/PlayListTable.vue';
import { defineUserStore } from '@/store/index';
import { ref, watchEffect } from 'vue';
import {
  queryRecordRecentSong,
  queryRecordRecentAlbum,
  queryRecordRecentPlaylist,
  queryLikelist,
  getSongDetail,
  queryUserPlaylist,
} from '@/api/music';
const userStore = defineUserStore();

const { recent } = useRecent();
const { activeName } = useTab();
const { likeList, playList } = useLikeMusic();

function useTab() {
  const activeName = ref('song');
  return {
    activeName,
  };
}

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

function useLikeMusic() {
  const likeList = ref<songTypes[]>([]);
  const playList = ref<playListTypes[]>([]);
  const ids = ref([]);
  const index = ref(1);
  let pages = 50;
  watchEffect(() => {
    if (!userStore.user.account) {
      return;
    }
    const uid = userStore.user.account.id;
    queryUserPlaylist(uid).then((res: any) => {
      playList.value = res.playlist;
    });
    queryLikelist(uid).then((res: any) => {
      ids.value = res.ids;
    });
  });
  watchEffect(() => {
    console.log(11, ids);
    console.log(22, index);
    const _ids = ids.value.slice(index.value - 1, pages);
    getSongDetail(_ids.join(',')).then((res: songTypes[]) => {
      likeList.value = res;
    });
  });
  return {
    likeList,
    playList,
  };
}
</script>

<style lang="less" scoped>
.library-container {
  padding: 64px 0;
  width: 80%;
  margin: 0 auto;
  .section {
    margin-bottom: 30px;
  }
}
</style>
