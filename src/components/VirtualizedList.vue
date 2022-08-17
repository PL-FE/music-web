<template>
  <div
    ref="listWrapRef"
    v-loading="loading"
    class="list-wrap"
    element-loading-background="rgba(122, 122, 122, 0)"
    @scroll="scrollListener"
  >
    <div ref="innerHeightRef" class="list">
      <div ref="listContainerRef">
        <slot :showList="showList"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';

const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return [];
    },
  },
  itemHeight: {
    //item高度
    type: Number,
    default: () => {
      return 42;
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const start = ref(0); //滚动过程中的开始索引
const showNum = ref(20);
const end = ref(showNum.value); //滚动过程中的结束索引
const listWrapRef = ref<HTMLDivElement>(null as unknown as HTMLDivElement); //获取列表视图模型节点
const innerHeightRef = ref<HTMLDivElement>(null as unknown as HTMLDivElement); //获取列表节点
const listContainerRef = ref<HTMLDivElement>(null as unknown as HTMLDivElement); //获取列表节点

watchEffect(() => {
  if (listWrapRef.value) {
    const h = listWrapRef.value.clientHeight;
    showNum.value = Math.ceil(h / props.itemHeight);
    // listWrapRef.value.style.height = props.itemHeight * props.showNum + 'px'; //设置列表视图模型的高度
  }
  if (innerHeightRef.value && props.list.length) {
    innerHeightRef.value.style.height =
      props.itemHeight * props.list.length + 'px'; //设置内部列表视图模型的高度
  }
});

const showList = computed<any>(() => {
  //获取展示的列表
  return props.list.slice(start.value, end.value);
});

function scrollListener() {
  if (!listWrapRef.value || !listContainerRef.value) {
    return;
  }
  //获取滚动高度
  let scrollTop = listWrapRef.value.scrollTop;

  //开始的数组索引
  start.value = Math.floor(scrollTop / props.itemHeight);
  //结束索引
  end.value = start.value + showNum.value;

  listContainerRef.value.style.transform = `translateY(${
    start.value * props.itemHeight
  }px)`; //对列表项进行偏移
}
</script>

<style lang="less" scoped>
.list-wrap {
  overflow: auto;
  height: 100%;
}
</style>
