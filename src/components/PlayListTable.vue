<template>
  <div class="album-container-body-item module">
    <div :style="{ marginBottom: '30px' }">
      <el-button v-if="data.length" @click="playAll">全部播放</el-button>
    </div>
    <InfiniteScroll :list="data" :showNum="40" class="vmScroll">
      <template #default="{ showList }">
        <div v-for="song in showList" :key="song.id" class="song-body">
          <div class="left">
            <SongAvatar
              :data="song"
              :play-list-ids="data.map((a:any) => a.id)"
              :size="32"
              :style="{ marginRight: '20px' }"
            ></SongAvatar>
            {{ song.name }}
          </div>
          <div class="mid">
            <ArtistsLink :data="song" :style="{ width: '100%' }"></ArtistsLink>
          </div>
          <div class="right pc">
            {{ millisecondToTime(song.duration) }}
          </div>
        </div>
      </template>
    </InfiniteScroll>
  </div>
</template>

<!-- 歌单专辑的表格 -->
<script lang="ts" setup>
import { millisecondToTime } from '@/utils';
import ArtistsLink from '@/components/common/ArtistsLink.vue';
import SongAvatar from '@/components/common/SongAvatar.vue';
import InfiniteScroll from '@/components/InfiniteScroll.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
interface Props {
  data?: songTypes[];
  playListId?: number;
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  data: (): songTypes[] => {
    return [];
  },
  playListId: 0,
});
function playAll() {
  if (props.data.length) {
    const ids = props.data.map((a: any) => a.id);
    const query = {
      ...route.query,
      id: ids[0],
    };
    if (props.playListId) {
      Object.assign(query, {
        playListId: props.playListId,
      });
    }
    router.push({
      name: 'playList',
      query,
    });
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/styles/index.less';
.album-container-body-item {
  display: flex;
  flex-direction: column;
  .vmScroll {
    flex: 1;
  }
  .song-body {
    @margin: 10px;
    display: flex;
    align-items: center;
    padding-bottom: @margin;
    border-bottom: 1px solid @outline-color;
    margin-bottom: @margin;

    > div {
      overflow: hidden;
    }

    .left {
      display: flex;
      align-items: center;
      flex: 1;
    }

    .mid {
      flex: 1;
    }

    .right {
      padding: 0 15px;
    }
  }
}
</style>
