<template>
  <div class="artistsItem">
    <div class="img-container">
      <SongImage
        :style="{ width: sizesStr, height: sizesStr }"
        :size="sizes - marginOffset"
        circle
        :src="data.picUrl"
        @click="openPlayListPage"
      />
    </div>
    <div :title="data.name" class="line-text-overflow-2 artists-name">
      {{ data.name }}
    </div>
    <div
      v-if="fansCount"
      :title="data.name"
      class="line-text-overflow-2 artists-fans"
    >
      {{ fansCount }}位粉丝
    </div>
  </div>
</template>

<!-- 单个歌手组件 -->
<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import SongImage from '@/components/common/SongImage.vue';

const router = useRouter();
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  sizes: {
    type: Number,
    default: 200,
  },
});

const isMobile =
  getCurrentInstance()?.appContext.config.globalProperties.$isMobile;
const marginOffset = isMobile ? 10 : 20;

const sizesStr = props.sizes - marginOffset + 'px';

const openPlayListPage = () => {
  router.push({
    name: 'singerChannel',
    query: {
      singerId: props.data.id,
    },
  });
};

const fansCount = computed(() => {
  const _fansCount: number = props.data.fansCount;
  if (_fansCount > 10000) {
    return Math.floor(_fansCount / 10000) + '万';
  }
  return _fansCount;
});
</script>

<style lang="less" scoped>
@import '@/assets/styles/index.less';

.img-container {
  cursor: pointer;
  margin-bottom: 15px;
}

.artistsItem {
  margin-right: 20px !important;
  margin-bottom: 20px !important;
  > div {
    width: v-bind(sizesStr);
  }
}

.artists-name {
  text-align: center;
  font-weight: 700;
}

.artists-fans {
  padding-top: 6px;
  text-align: center;
  color: @unactivated-color;
}
</style>

<style lang="less" scoped>
@media screen and(max-width:414px) {
  .artistsItem {
    margin-right: 10px !important;
    margin-bottom: 10px !important;
  }
}
</style>
