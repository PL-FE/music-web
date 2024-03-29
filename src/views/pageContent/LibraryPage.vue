<template>
  <div class="library-container">
    <div class="section recent-container">
      <SectionListSong key="2" title="最近播放">
        <template #default="{ width }">
          <PlayListItem
            v-for="it in recent"
            :key="it.resourceId"
            :data="it.data"
            :sizes="width"
          />
        </template>
      </SectionListSong>
    </div>
    <div class="section tabs">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="喜欢的音乐" name="song">
          <PlayListTable
            class="playList"
            :data="likeList"
            :loading="likeListLoading"
            :play-list-id="userPlayList.length && userPlayList[0].id"
          />
        </el-tab-pane>
        <el-tab-pane label="歌单" name="playlist">
          <SectionListSong
            v-if="userPlayListFilter.owner.length"
            key="1"
            title="创建的歌单"
            model="flat"
          >
            <template #default="{ width }">
              <PlayListItem
                v-for="it in userPlayListFilter.owner"
                :key="it.id"
                :data="it"
                :sizes="width"
              />
            </template>
          </SectionListSong>
          <SectionListSong
            v-if="userPlayListFilter.other.length"
            key="2"
            title="收藏的歌单"
            model="flat"
          >
            <template #default="{ width }">
              <PlayListItem
                v-for="it in userPlayListFilter.other"
                :key="it.id"
                :data="it"
                :sizes="width"
              />
            </template>
          </SectionListSong>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="album">
          <SectionListSong key="2" title="收藏的专辑" model="flat">
            <template #default="{ width }">
              <PlayListItem
                v-for="it in userAlbum"
                :key="it.id"
                :data="it"
                :sizes="width"
              />
            </template>
          </SectionListSong>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="artist">
          <SectionListSong key="2" title="关注的歌手" model="flat">
            <template #default="{ width }">
              <ArtistsItem
                v-for="it in userArtist"
                :key="it.id"
                :data="it"
                :sizes="width"
              />
            </template>
          </SectionListSong>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SectionListSong from '@/components/common/SectionList.vue';
import PlayListItem from '@/components/item/PlayListItem.vue';
import PlayListTable from '@/components/PlayListTable.vue';
import ArtistsItem from '@/components/item/ArtistsItem.vue';

import { defineUserStore } from '@/store/index';
import { nextTick, reactive, ref, watchEffect, watch, computed } from 'vue';
import {
  queryRecordRecentSong,
  queryRecordRecentAlbum,
  queryRecordRecentPlaylist,
  queryUserPlaylist,
  getPlaylistDetail,
  queryAlbumSublist,
  queryArtistSublist,
} from '@/api/music';
const userStore = defineUserStore();

const { recent } = useRecent();
const { activeName, tabCount } = useTab();

const { likeList, userPlayList, likeListLoading } = useUserLikeMusic(); // 我的歌曲
const { userPlayListFilter } = useUserPlayList(userPlayList); // 我的歌单
const { userAlbum } = useUserAlbum(); // 收藏的专辑
const { userArtist } = useUserArtist(); // 关注的歌手

function useTab() {
  const activeName = ref('song');
  const tabCount: any = reactive({
    song: false,
    playlist: false,
    album: false,
    artist: false,
  });
  watch(
    activeName,
    (val) => {
      tabCount[val] = true;
    },
    {
      immediate: true,
    }
  );
  return {
    activeName,
    tabCount,
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

function useUserLikeMusic() {
  const likeList = ref<songTypes[]>([]);
  const userPlayList = ref<playListTypes[]>([]);
  const likeListLoading = ref(true);
  watchEffect(() => {
    if (!userStore.user.account) {
      likeListLoading.value = false;
      return;
    }
    const uid = userStore.user.account.id;
    queryUserPlaylist(uid).then((res: any) => {
      userPlayList.value = res.playlist;
      if (!res.playlist.length) {
        likeListLoading.value = false;
        return;
      }
      getPlaylistDetail(userPlayList.value[0].id).then((res) => {
        likeList.value = res.playlist.songs;
        nextTick(() => {
          likeListLoading.value = false;
        });
      });
    });
  });
  return {
    likeList,
    userPlayList,
    likeListLoading,
  };
}

function useUserPlayList(userPlayList: { value: playListTypes[] }) {
  const userPlayListFilter = computed(() => {
    const _userPlayListFilter: {
      owner: playListTypes[];
      other: playListTypes[];
    } = {
      owner: [],
      other: [],
    };
    if (!tabCount.playlist) {
      return _userPlayListFilter;
    }

    userPlayList.value.forEach((play: playListTypes) => {
      if (play.creator.userId === userStore.user.account.id) {
        _userPlayListFilter.owner.push(play);
      } else {
        _userPlayListFilter.other.push(play);
      }
    });
    return _userPlayListFilter;
  });

  return {
    userPlayListFilter,
  };
}

function useUserArtist() {
  const userArtist = ref<artistTypes[]>([]);
  watch(
    () => tabCount.artist,
    (val) => {
      if (!val) return;
      queryArtistSublist().then((res) => {
        userArtist.value = res;
      });
    }
  );

  return {
    userArtist,
  };
}
function useUserAlbum() {
  const userAlbum = ref<albumTypes[]>([]);
  watch(
    () => tabCount.album,
    (val) => {
      if (!val) return;
      queryAlbumSublist().then((res) => {
        userAlbum.value = res;
      });
    }
  );
  return {
    userAlbum,
  };
}
</script>

<style lang="less" scoped>
.library-container {
  padding: 64px 0;
  width: 80%;
  margin: 0 auto;
  box-sizing: border-box;
  .section {
    margin-bottom: 30px;
  }
  .playList {
    height: 500px;
  }
}
</style>

<style lang="less" scoped>
@media screen and(max-width:414px) {
  .library-container {
    padding: 64px 10px;
    width: 100%;
  }
}
</style>
