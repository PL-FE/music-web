<template>
  <div
    ref="listWrapRef"
    class="list-wrap"
    @scroll="scrollListener"
    v-loading="loading"
    element-loading-background="rgba(122, 122, 122, 0)"
  >
    <div class="list" ref="innerHeightRef">
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
  showNum: {
    //展示的数据数量
    type: Number,
    default: 30,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const start = ref(0); //滚动过程中的开始索引
const end = ref(props.showNum); //滚动过程中的结束索引

const listWrapRef = ref<HTMLDivElement>(null as unknown as HTMLDivElement); //获取列表视图模型节点
const innerHeightRef = ref<HTMLDivElement>(null as unknown as HTMLDivElement); //获取列表节点
const listContainerRef = ref<HTMLDivElement>(null as unknown as HTMLDivElement); //获取列表节点

watchEffect(() => {
  if (listWrapRef.value) {
    // TODO: 算得不准，待找到原因
    listWrapRef.value.style.height = props.itemHeight * props.showNum + 'px'; //设置列表视图模型的高度
  }
  if (innerHeightRef.value && props.list.length) {
    console.log(props.list.length);
    console.log(props.itemHeight);
    innerHeightRef.value.style.height =
      props.itemHeight * props.list.length + 'px'; //设置内部列表视图模型的高度
  }

  console.log(2222);
});

const showList = computed<any>(() => {
  //获取展示的列表
  return props.list.slice(start.value, end.value);
});

function scrollListener() {
  if (!listWrapRef.value || !listContainerRef.value) {
    return;
  }
  console.log(111);

  //获取滚动高度
  let scrollTop = listWrapRef.value.scrollTop;

  //开始的数组索引
  start.value = Math.floor(scrollTop / props.itemHeight);
  //结束索引
  end.value = start.value + props.showNum;

  listContainerRef.value.style.transform = `translateY(${
    start.value * props.itemHeight
  }px)`; //对列表项进行偏移
}
</script>

<style lang="less" scoped>
.list-wrap {
  overflow: auto;
}
</style>
