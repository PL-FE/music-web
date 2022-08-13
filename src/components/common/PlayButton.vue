<template>
  <span v-if="musicStore.playSongId == songId">
    <template v-if="!musicStore.loading">
      <svg-icon
        v-if="musicStore.playing"
        class="icon-svg main"
        icon-name="icon-pause"
        @click.stop="canPlay"
      >
      </svg-icon>
      <svg-icon
        v-else
        class="icon-svg main"
        icon-name="icon-play"
        @click.stop="canPlay"
      ></svg-icon>
    </template>
    <template v-else>
      <svg-icon
        class="icon-svg custom-loading main"
        icon-name="icon-loading"
      ></svg-icon>
    </template>
  </span>
  <svg-icon
    v-else
    class="icon-svg main"
    icon-name="icon-play"
    @click.stop="canPlay"
  ></svg-icon>
</template>

<!-- 统一的播放按钮 -->
<script lang="ts" setup>
import { defineMusicStore } from '@/store/index';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const props = defineProps({
  songId: {
    type: [Number, String],
    default: null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  playListIds: {
    type: Array,
    default: () => {
      return [];
    },
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const route = useRoute();
const router = useRouter();

const musicStore = defineMusicStore();
const curActive = computed(() => {
  return +musicStore?.curSong?.id === +props.songId;
});

const canPlay = () => {
  // 点击当前被激活的歌曲
  if (curActive.value) {
    musicStore.playing = !musicStore.playing;
    return;
  }

  // 校验是否是切换歌曲
  if (
    musicStore.playListIds.length &&
    musicStore.playListIds.join(',') === props.playListIds.join(',')
  ) {
    musicStore.playSongId = props.songId;
    return;
  }

  let query = null;
  switch (props.data.resourceType) {
    case 'ALBUM':
      query = {
        albumId: props.data.id,
      };
      break;
    case 'PLAYLIST':
      query = {
        playListId: props.data.id,
      };
      break;
    case 'SONG':
      const { albumId, playListId } = route.query;
      query = {
        id: props.songId,
      };
      // 兼容专辑页面和歌单页面
      if (albumId) {
        Object.assign(query, { albumId });
      } else if (playListId) {
        Object.assign(query, { playListId });
      } else if (Object.keys(props.data.resource).length) {
        Object.assign(query, props.data.resource);
      } else {
        Object.assign(query, { ids: props.playListIds.join(',') });
      }
      break;
  }
  if (query) {
    router.push({
      name: 'playList',
      query,
    });
  }
};
</script>
