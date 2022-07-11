<template>
    <div class="controbar-container">
        <audio ref="audioRef" :src="mp3Url" controls autoplay volume="0.5" @play="hanlderPlay"
            @pause="hanlderpause"></audio>
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
const hanlderpause = () => {
    musicStore.playing = false
}
</script>

<style lang="less" scoped>
.controbar-container {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;

    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
}
</style>