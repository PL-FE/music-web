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
            :loading="likeListLoading"
            :play-list-id="playList.length && playList[0].id"
          />
        </el-tab-pane>
        <el-tab-pane label="歌单" name="playlist">
          <h2>创建的歌单</h2>
          <div class="section-conatainer">
            <template v-for="item in playListFilter.owner" :key="item.id">
              <PlayListItem :data="item" class="section-item" />
            </template>
          </div>
          <h2>收藏的歌单</h2>
          <div class="section-conatainer">
            <template v-for="item in playListFilter.other" :key="item.id">
              <PlayListItem :data="item" class="section-item" />
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="album">专辑 </el-tab-pane>
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
import { nextTick, reactive, ref, watchEffect, watch } from 'vue';
import {
  queryRecordRecentSong,
  queryRecordRecentAlbum,
  queryRecordRecentPlaylist,
  queryUserPlaylist,
  getPlaylistDetail,
} from '@/api/music';
const userStore = defineUserStore();

const { recent } = useRecent();
const { activeName } = useTab();
const { likeList, playList, likeListLoading } = useLikeMusic();
const { playListFilter } = useUserPlayList(playList);

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
  const likeListLoading = ref(true);
  watchEffect(() => {
    if (!userStore.user.account) {
      return;
    }
    const uid = userStore.user.account.id;
    queryUserPlaylist(uid).then((res: any) => {
      playList.value = res.playlist;
      getPlaylistDetail(playList.value[0].id).then((res) => {
        likeList.value = res.playlist.songs;
        nextTick(() => {
          likeListLoading.value = false;
        });
      });
    });
  });
  return {
    likeList,
    playList,
    likeListLoading,
  };
}

function useUserPlayList(playList: { value: playListTypes[] }) {
  const playListFilter = reactive<{
    owner: playListTypes[];
    other: playListTypes[];
  }>({
    owner: [],
    other: [],
  });
  watch(playList, () => {
    playList.value.forEach((play: playListTypes) => {
      if (play.creator.userId === userStore.user.account.id) {
        playListFilter.owner.push(play);
      } else {
        playListFilter.other.push(play);
      }
    });
  });
  return {
    playListFilter,
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

  .section-conatainer {
    display: flex;
    flex-wrap: wrap;

    .section-item {
      margin-right: 40px;
      margin-bottom: 45px;
    }
  }
}
</style>
