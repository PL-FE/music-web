<template>
  <div
    v-infinite-scroll="load"
    class="playList-scroll-container"
    :infinite-scroll-immediate="false"
    :infinite-scroll-distance="50"
    :infinite-scroll-disabled="newPlaylists.length >= total"
  >
    <slot name="title"></slot>
    <div class="section-conatainer">
      <template v-for="item in newPlaylists" :key="item.id">
        <PlayListItem :data="item" class="section-item" :sizes="sizes" />
      </template>
    </div>
    <p v-if="loading" class="loading-container">
      <svg-icon
        class="icon-svg custom-loading main"
        icon-name="icon-loading"
      ></svg-icon>
    </p>
  </div>
</template>

<!-- 全屏歌单组件 虚拟滚动列表 -->
<script setup lang="ts">
import { nextTick, onActivated, onDeactivated, ref, watch } from 'vue';
import PlayListItem from '@/components/item/PlayListItem.vue';
const props = defineProps({
  refresh: {
    type: Function,
    default: () => {
      return {};
    },
  },
  params: {
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
const pageIndex = ref(1);
const total = ref(0);
const loading = ref(false);
const load = () => {
  if (watcher.length) {
    pageIndex.value += 1;
  }
};
// 新专辑
const newPlaylists = ref<any[]>([]);
let watcher: any = [];
loadData();
onActivated(() => {
  watcher.push(
    watch(pageIndex, () => {
      loadData();
    })
  );
});
onDeactivated(() => {
  watcher.forEach((w: any) => w());
  watcher = [];
});

function loadData() {
  loading.value = true;
  props
    .refresh({ index: pageIndex.value, ...props.params })
    .then((res: any) => {
      total.value = res.total;
      const data = res.playlists || res.albums;
      newPlaylists.value.push(...data);
      nextTick(() => {
        loading.value = false;
      });
    });
}
</script>

<style lang="less" scoped>
.playList-scroll-container {
  overflow: hidden;
}

.section-conatainer {
  display: flex;
  flex-wrap: wrap;

  .section-item {
    margin-right: 40px;
    margin-bottom: 45px;
  }
}

.loading-container {
  text-align: center;
}
</style>
