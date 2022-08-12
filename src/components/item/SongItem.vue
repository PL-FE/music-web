<template>
  <div class="song-container">
    <SongAvatar v-bind="{ ...attrs, ...props }"></SongAvatar>

    <div class="song-details">
      <div class="details-left">
        <div class="line-text-overflow" :title="data.name">
          {{ data.name }}
        </div>
        <span class="line-text-overflow song-text">
          <ArtistsLink :data="data"></ArtistsLink>
          <span :style="{ padding: '0px 5px' }">-</span>
          <AlbumLink :data="data"></AlbumLink>
        </span>
      </div>
      <div class="details-right" v-if="hasDuration">
        {{ millisecondToTime(data.duration) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { millisecondToTime } from '@/utils/index';
import ArtistsLink from '@/components/common/ArtistsLink.vue';
import AlbumLink from '@/components/common/AlbumLink.vue';
import SongAvatar from '@/components/comom/SongAvatar.vue';
import { useAttrs } from 'vue';

interface Props {
  data?: songTypes;
  hasDuration?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => {},
  hasDuration: false,
});

const attrs = useAttrs();
</script>

<style lang="less" scoped>
.song-container {
  display: flex;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  font-size: 14px;
  margin-bottom: 15px;

  .song-details {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 15px;
    overflow: hidden;
  }

  .details-left {
    flex: 1;
    overflow: hidden;

    .song-text {
      display: flex;
      align-items: center;
    }
  }

  .details-right {
    padding: 0 10px;
  }
}
</style>
