<template>
    <div class="controbar-container">
        <div class="controller-main left">
            <svg-icon @click="hanlderPrevious" class="icon-svg" iconName="icon-previous"></svg-icon>
            <svg-icon @click="hanlderpause" class="icon-svg main" iconName="icon-pause" v-if="musicStore.playing">
            </svg-icon>
            <svg-icon @click="hanlderPlay" class="icon-svg main" iconName="icon-play" v-else></svg-icon>
            <svg-icon @click="hanlderNext" class="icon-svg" iconName="icon-next"></svg-icon>
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
import { watchEffect, ref, nextTick } from 'vue';
import { getSongDounloadUrl } from '@/api/music';

const musicStore = defineMusicStore()
const mp3Url = ref('')
const audioRef = ref<HTMLAudioElement>()
watchEffect(async () => {
    if (musicStore.curSong) {
        const id = musicStore.curSong.id
        try {
            const songData: any = await getSongDounloadUrl(<string>id)
            mp3Url.value = songData.url
        } catch (error) {
            musicStore.playing = false
        }
    }
})
watchEffect(() => {
    if (mp3Url.value) {
        if (musicStore.playing) {
            nextTick(() => {
                audioRef.value?.play()
            })
        } else {
            nextTick(() => {
                audioRef.value?.pause()
            })
        }
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
// 下一首
const hanlderNext = () => {
    musicStore.nextSong()
}
// 上一首
const hanlderPrevious = () => {
    musicStore.preSong()
}
</script>

<style lang="less" scoped>
.controbar-container {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
    background-color: #212121;
    box-sizing: border-box;
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