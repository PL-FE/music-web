<template>
  <span v-if="musicStore.playSongId == songId">
    <template v-if="!musicStore.loading">
      <svg-icon
        v-if="musicStore.playing"
        class="icon-svg main"
        icon-name="icon-pause"
        @click="canPlay(false)"
      >
      </svg-icon>
      <svg-icon
        v-else
        class="icon-svg main"
        icon-name="icon-play"
        @click="canPlay(true)"
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
    @click="canPlay(true)"
  ></svg-icon>
</template>

<!-- 统一的播放按钮 -->
<script lang="ts" setup>
import { defineMusicStore } from '@/store/index';
const props = defineProps({
  songId: {
    type: [Number, String],
    default: null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const musicStore = defineMusicStore();
const canPlay = (val: boolean) => {
  if (!props.readonly) {
    musicStore.setPlaying(val);
  }
};
</script>
