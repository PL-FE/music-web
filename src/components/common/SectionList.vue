<template>
  <div ref="containerRef" class="section-container">
    <div class="section-header">
      <h1>{{ title }}</h1>
      <span class="section-operation">
        <span :style="{ paddingRight: '20px' }">
          <slot name="tool"> </slot>
        </span>
        <el-icon
          class="arrow-target pc"
          :class="{ disabled: scrollLeft === 0 }"
          @click="changePage(0)"
        >
          <ArrowLeftBold />
        </el-icon>
        <el-icon
          class="arrow-target pc"
          :class="{ disabled: disabledNext }"
          @click="changePage(1)"
        >
          <ArrowRightBold />
        </el-icon>
      </span>
    </div>
    <div ref="slotContentRef" class="slot-content">
      <slot class="song-item"></slot>
    </div>
  </div>
</template>

<!-- 左右滚动容器 -->
<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
import { computed, nextTick, onMounted, ref } from 'vue';
const props = defineProps({
  column: {
    type: Number,
    default: 3,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '100%',
  },
});

const containerWidth = ref(0);
const containerRef = ref<HTMLDivElement>();
// 每个项目的宽
const itemWidth = computed(() => {
  return containerWidth.value / props.column;
});
const { changePage, disabledNext, scrollLeft, slotContentRef } =
  useChangePage();
const { slotContentWidthWrap, itemWidthWrap } = useCss();

onMounted(() => {
  screenResize();
});

function useCss() {
  // 容器宽度，css使用
  const slotContentWidthWrap = computed(() => {
    return containerWidth.value + 'px';
  });
  // 每个项目的宽，css使用
  const itemWidthWrap = computed(() => {
    return itemWidth.value + 'px';
  });
  return {
    slotContentWidthWrap,
    itemWidthWrap,
  };
}

function useChangePage() {
  const scrollLeft = ref(0);
  const disabledNext = ref(false); // 禁止翻下页
  const slotContentRef = ref<HTMLDivElement>(); // 滚动条容器Ref
  const changePage = (add: number) => {
    if (!slotContentRef.value) {
      return;
    }
    disabledNext.value = false;
    if (add) {
      scrollLeft.value += itemWidth.value * Math.ceil(props.column / 2);
    } else {
      scrollLeft.value -= itemWidth.value * Math.ceil(props.column / 2);
    }

    if (
      scrollLeft.value >=
      slotContentRef.value.scrollWidth - containerWidth.value
    ) {
      scrollLeft.value =
        slotContentRef.value.scrollWidth - containerWidth.value;
      disabledNext.value = true;
    } else if (scrollLeft.value < 0) {
      scrollLeft.value = 0;
    }
    slotContentRef.value.scrollLeft = scrollLeft.value;
  };

  return {
    changePage,
    disabledNext,
    slotContentRef,
    scrollLeft,
  };
}

function screenResize() {
  nextTick(() => {
    containerWidth.value = containerRef.value?.clientWidth || 0;
  });
}
</script>
<style lang="less" scoped>
.section-container {
  margin: 0 auto;
  width: v-bind(width);

  .arrow-target {
    padding: 10px;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.3);

    &:hover {
      background-color: #1d1d1d;
    }

    &.disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    & + .arrow-target {
      margin-left: 10px;
    }
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.slot-content) {
  height: 285px;
  display: flex;
  flex-flow: wrap;
  flex-direction: column;
  width: v-bind(slotContentWidthWrap);
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  > div {
    width: v-bind(itemWidthWrap);
  }
}
</style>
