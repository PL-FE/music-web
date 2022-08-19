<template>
  <div class="song-container">
    <SongAvatar
      :data="data"
      :playListIds="playListIds"
      :hasDuration="hasDuration"
      :hasStatusIcon="hasStatusIcon"
    ></SongAvatar>

    <div class="song-details">
      <div class="details-left">
        <div class="line-text-overflow" :title="data.name">
          {{ data.name }}
        </div>
        <span class="line-text-overflow song-text">
          <ArtistsLink :data="data"></ArtistsLink>
          <span :style="{ padding: '0px 5px' }" class="pc">-</span>
          <AlbumLink :data="data" class="pc"></AlbumLink>
        </span>
      </div>
      <div v-if="hasDuration" class="details-right pc">
        {{ millisecondToTime(data.duration) }}
      </div>
    </div>
  </div>
</template>

<!-- 单个歌曲组件-横的 -->
<script setup lang="ts">
import { millisecondToTime } from '@/utils/index';
import ArtistsLink from '@/components/common/ArtistsLink.vue';
import AlbumLink from '@/components/common/AlbumLink.vue';
import SongAvatar from '@/components/common/SongAvatar.vue';
import { useAttrs } from 'vue';

interface Props {
  data?: songTypes;
  hasStatusIcon?: boolean;
  hasDuration?: boolean;
  playListIds?: number[];
}

withDefaults(defineProps<Props>(), {
  data: () => {
    return {} as songTypes;
  },
  hasStatusIcon: true,
  hasDuration: false,
  style: () => {
    return {};
  },
  playListIds: () => {
    return [];
  },
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

<style lang="less">
@media screen and(max-width:414px) {
  .song-container {
    .song-details {
      padding: 0 8px !important;
    }
  }
}
</style>
