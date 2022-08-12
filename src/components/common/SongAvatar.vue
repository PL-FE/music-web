<template>
  <span
    class="song-pic-container"
    :class="{ active: active, hasStatusIcon: hasStatusIcon }"
    @click.stop="playSong(data.id)"
  >
    <el-avatar v-if="index" class="song-pic">
      {{ index }}
    </el-avatar>
    <SongImage
      v-else
      class="song-pic"
      :size="50"
      :src="picUrl"
      :style="{ width: size + 'px', height: size + 'px' }"
    />

    <PlayButton
      v-if="hasStatusIcon"
      readonly
      class="song-play"
      :song-id="data.id"
    ></PlayButton>
  </span>
</template>

<!-- 带播放按钮的图片组件 -->
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { defineMusicStore } from '@/store/index';
import PlayButton from '@/components/common/PlayButton.vue';
import SongImage from '@/components/common/SongImage.vue';
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  hasStatusIcon: {
    // 是否展示状态图标
    type: Boolean,
    default: true,
  },
  size: {
    type: Number,
    default: 50,
  },
  playListIds: {
    type: Array,
    default: () => [],
  },
  index: {
    type: Number,
  },
});
const musicStore = defineMusicStore();

const router = useRouter();
const route = useRoute();

const picUrl = ref('');
const active = ref(false); // 歌曲是否当前激活
watchEffect(() => {
  const { data } = props;
  picUrl.value = data.picUrl || data.album?.picUrl;
  active.value = musicStore?.curSong?.id === data.id;
});

const playSong = async (id: string | number) => {
  if (!props.hasStatusIcon) {
    return;
  }
  if (active.value) {
    musicStore.playing = !musicStore.playing;
    return;
  }
  const isPlayListPage = route.name === 'playList';
  const hasSong =
    isPlayListPage && musicStore.playListIds.includes(props.data.id);

  // 修改全局状态
  router.push({
    name: 'playList',
    query: {
      ...(hasSong ? route.query : { ids: props.playListIds.join(',') }),
      id,
    },
  });
  if (hasSong) {
    // 播放列表中切换
    musicStore.playSongId = props.data.id;
  } else {
    musicStore.setPlayList(<number[]>props.playListIds, props.data.id);
  }
};
</script>

<style lang="less" scoped>
.song-pic-container {
  display: inline-block;
  position: relative;
  cursor: pointer;
  font-size: 0;

  .song-pic {
    background-color: transparent;
  }

  .song-play {
    display: none;
    font-size: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover,
  &.active {
    &.hasStatusIcon {
      .song-pic {
        filter: brightness(10%); // 变暗，模仿遮罩
      }

      .song-play {
        display: block;
      }
    }
  }
}
</style>
