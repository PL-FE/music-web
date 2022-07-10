<template>
    <div class="controbar-container">
        <audio :src="mp3Url" controls autoplay volume="0.5"></audio>

    </div>
</template>

<script setup lang="ts">

import { defineMusicStore } from '@/store/index'
import { watchEffect, ref } from 'vue';
const musicStore = defineMusicStore()
const mp3Url = ref('')
watchEffect(() => {
    if (musicStore.curSong) {
        console.log(musicStore.curSong.data.url);
        mp3Url.value = musicStore.curSong.data.url
    }
})
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