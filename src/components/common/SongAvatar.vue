<template>
  <span
    class="song-pic-container"
    :class="{ active: active, hasStatusIcon: hasStatusIcon }"
  >
    <SongImage
      class="song-pic"
      :size="50"
      :src="picUrl"
      :style="{ width: size + 'px', height: size + 'px' }"
    />

    <PlayButton
      v-if="hasStatusIcon"
      class="song-play"
      :songId="data.id"
      :data="data"
      :playListIds="playListIds"
      :hasStatusIcon="hasStatusIcon"
    ></PlayButton>
  </span>
</template>

<!-- 带播放按钮的图片组件 -->
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { defineMusicStore } from '@/store/index';
import PlayButton from '@/components/common/PlayButton.vue';
import SongImage from '@/components/common/SongImage.vue';
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
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
});
const musicStore = defineMusicStore();

const picUrl = ref('');
const active = ref(false); // 歌曲是否当前激活
watchEffect(() => {
  const { data } = props;
  picUrl.value = data.picUrl || data.album?.picUrl;
  active.value = musicStore?.curSong?.id === data.id;
});
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
