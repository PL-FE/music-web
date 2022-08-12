<template>
  <div class="album-container-body-item module">
    <div :style="{ marginBottom: '30px' }">
      <el-button plain @click="playAll">全部播放</el-button>
    </div>
    <div v-for="(song, index) in data" :key="song.id" class="song-body">
      <div class="left">
        <SongAvatar
          :data="song"
          :play-list-ids="data.map((a:any) => a.id)"
          :size="32"
          :index="isAlbum ? index + 1 : 0"
          :style="{ marginRight: '20px' }"
        ></SongAvatar>
        {{ song.name }}
      </div>
      <div class="mid">
        <ArtistsLink :data="song" :style="{ width: '100%' }"></ArtistsLink>
      </div>
      <div class="right">
        {{ millisecondToTime(song.duration) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { millisecondToTime } from '@/utils';
import ArtistsLink from '@/components/common/ArtistsLink.vue';
import SongAvatar from '@/components/comom/SongAvatar.vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const props = defineProps({
  data: {
    type: Array,
    default: () => {
      return [];
    },
  },
  isAlbum: Boolean,
  playListId: {
    type: Number,
    default: 0,
  },
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
  margin-bottom: 20px;

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
