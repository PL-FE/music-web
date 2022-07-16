<template>
    <div class="container">
        <div class="vbox" @click="boxClick" ref="vBox"></div>
        <div class="music-progress-container">
            <div class="progressBuffer"></div>
            <div class="progress"></div>
            <div class="trigger"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';

const progress = ref(0.4)
const progressBuffer = ref(0.7)
const vBox = ref<HTMLDivElement>()

const boxClick = (e: any) => {
    formatProgress(e.offsetX)
}
function formatProgress(offsetX: number) {
    if (vBox.value) {
        const clientWidth = vBox.value.clientWidth
        if (offsetX >= 0 && offsetX <= clientWidth) {
            progress.value = offsetX / clientWidth
        }
    }
}
onMounted(() => {
    initEvent()
})

const initEvent = () => {
    if (!vBox.value) return
    //鼠标按下就触发的函数
    vBox.value.onmousedown = function (e) {
        const startX = e.pageX - e.offsetX
        document.onmousemove = function (e) {
            const offsetX = e.pageX - startX
            formatProgress(offsetX)
        }
        document.body.onselectstart = function () {
            return false;
        };

        //重置事件
        document.onmouseup = function () {
            document.onmousemove = null
            document.onselectstart = null
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
    z-index: 3;
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
        height: @trigger_size;
        width: @trigger_size;
        border-radius: 50%;
        left: calc(v-bind(progress) * 100%);
        background-color: rgb(87, 148, 7);
        transform: translateX(-50%);
    }
}
</style>