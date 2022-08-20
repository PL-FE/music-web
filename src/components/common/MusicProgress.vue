<template>
  <div class="container">
    <div
      ref="vBoxRef"
      class="vbox"
      @click="boxClick"
      @mouseleave="vBoxHover = false"
      @mouseenter="vBoxHover = true"
    ></div>
    <div class="music-progress-container" :class="{ boxHover: vBoxHover }">
      <div class="progressBuffer"></div>
      <div class="progress"></div>
      <div class="trigger"></div>
    </div>
  </div>
</template>

<!-- 唯一的进度条 -->
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  bufferedValue: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(['update:value', 'update:bufferedValue']);
const progress = computed({
  get() {
    return props.value / 100;
  },
  set(val) {
    emit('update:value', val * 100);
  },
});
const progressBuffer = computed({
  get() {
    return props.bufferedValue / 100;
  },
  set(val) {
    emit('update:bufferedValue', val * 100);
  },
});
const vBoxRef = ref<HTMLDivElement>();
const vBoxHover = ref(false);
const boxClick = (e: any) => {
  formatProgress(e.offsetX);
  vBoxHover.value = true;
};
onMounted(() => {
  initEvent();
});

function initEvent() {
  if (!vBoxRef.value) return;
  //鼠标按下就触发的函数
  vBoxRef.value.onmousedown = function (e) {
    const startX = e.pageX - e.offsetX;
    document.onmousemove = function (e) {
      const offsetX = e.pageX - startX;
      formatProgress(offsetX);
      vBoxHover.value = true;
    };
    document.body.onselectstart = function () {
      return false;
    };
    //重置事件
    document.onmouseup = function () {
      vBoxHover.value = false;
      document.onmousemove = null;
      document.onselectstart = null;
    };
  };
}

function formatProgress(offsetX: number) {
  if (vBoxRef.value) {
    const clientWidth = vBoxRef.value.clientWidth;
    if (offsetX >= 0 && offsetX <= clientWidth) {
      progress.value = offsetX / clientWidth;
    }
  }
}
</script>

<style lang="less" scoped>
@height: 4px;
// 拖动的点
@trigger_size: 20px;

.container {
  width: 100%;
  height: @height;
  z-index: 11;
  cursor: pointer;
  background-color: #383838;
}

.vbox {
  position: absolute;
  z-index: 3;
  height: 200%;
  transform: translateY(calc(-@height / 2));
  width: 100%;
}

.boxHover {
  .trigger {
    height: @trigger_size;
    width: @trigger_size;
  }
}

.music-progress-container {
  height: @height;
  display: flex;
  align-items: center;
  z-index: 4;

  // 进度条
  .progress {
    position: absolute;
    width: calc(v-bind(progress) * 100%);
    height: 100%;
    background-color: #ff0000;
  }

  // 缓存的进度条
  .progressBuffer {
    position: absolute;
    width: calc(v-bind(progressBuffer) * 100%);
    height: 100%;
    background-color: #4c4c4c;
  }

  // 拖动的点

  .trigger {
    position: absolute;
    border-radius: 50%;
    left: calc(v-bind(progress) * 100%);
    background-color: #ff0000;
    transform: translateX(-50%);
  }
}
</style>
