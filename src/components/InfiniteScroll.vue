<template>
  <div
    v-infinite-scroll="load"
    v-loading="!list.length"
    element-loading-text="Loading..."
    element-loading-background="rgba(0, 0, 0, 0.2)"
    :infinite-scroll-immediate="false"
    :infinite-scroll-disabled="showList.length >= list.length"
    class="list-wrap"
  >
    <slot :showList="showList"></slot>
    <p v-if="list.length && showList.length === list.length">No more...</p>
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, nextTick } from 'vue';

const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return [];
    },
  },
  showNum: {
    type: Number,
    default: () => {
      return 20;
    },
  },
});
const pageIndex = ref(1);
const showList = ref<songTypes[]>([]);
const loading = ref(false);
watchEffect(() => {
  if (!props.list.length) return;
  const start = (pageIndex.value - 1) * props.showNum;
  const end = start + props.showNum;
  const data = props.list.slice(start, end) as songTypes[];
  showList.value.push(...data);
  loading.value = false;
});
const load = () => {
  loading.value = true;
  nextTick(() => {
    pageIndex.value++;
  });
};
</script>

<style lang="less" scoped>
.list-wrap {
  overflow: auto;
  height: 100%;
}
</style>
