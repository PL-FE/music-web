<template>
    <div class="controbar-container">
        <div class="controller-main left">
            <svg-icon class="icon-svg" iconName="icon-previous"></svg-icon>
            <svg-icon @click="hanlderpause" class="icon-svg main" iconName="icon-pause" v-if="musicStore.playing">
            </svg-icon>
            <svg-icon @click="hanlderPlay" class="icon-svg main" iconName="icon-play" v-else></svg-icon>
            <svg-icon class="icon-svg" iconName="icon-next"></svg-icon>
        </div>

        <div class="mid">
            <audio ref="audioRef" :src="mp3Url" volume="0.5" controls @play="hanlderPlay" @pause="hanlderpause"></audio>
        </div>
        <div class="right">
            <svg-icon iconName="icon-voice"></svg-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineMusicStore } from '@/store/index'
import { watchEffect, ref, watch } from 'vue';
const musicStore = defineMusicStore()
const mp3Url = ref('')
const audioRef = ref<HTMLAudioElement>()
watchEffect(() => {
    if (musicStore.curSong) {
        console.log(musicStore.curSong.mp3Url);
        mp3Url.value = musicStore.curSong.mp3Url
    }
})
watch(() => musicStore.playing, (val) => {
    console.log(2222, val);

    if (val) {
        audioRef.value?.play()
    } else {
        audioRef.value?.pause()
    }
})
// 监听播放事件
const hanlderPlay = () => {
    musicStore.playing = true
}
// 监听暂停事件
const hanlderpause = (e) => {
    musicStore.playing = false
    console.log(333, e);
}
</script>

<style lang="less" scoped>
.controbar-container {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
    background-color: #212121;

    width: 100%;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .controller-main {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon-svg {
            margin: 0 20px;
            cursor: pointer;

            &.main {
                font-size: 30px;
            }
        }
    }

    .mid {
        text-align: center;
    }
}
</style>