<template>
    <div class="controbar-container">
        <div class="controller-main left">
            <svg-icon @click="hanlderPrevious" class="icon-svg" iconName="icon-previous"></svg-icon>
            <svg-icon @click="hanlderpause" class="icon-svg main" iconName="icon-pause" v-if="musicStore.playing">
            </svg-icon>
            <svg-icon @click="hanlderPlay" class="icon-svg main" iconName="icon-play" v-else></svg-icon>
            <svg-icon @click="hanlderNext" class="icon-svg" iconName="icon-next"></svg-icon>
            <div class="time" v-if="musciArrts.duration">
                {{ musciArrts.currentTime }} / {{ millisecondToTime(musciArrts.duration) }}
            </div>
        </div>

        <div class="mid">
            <audio ref="audioRef" :src="musciArrts.mp3Url" volume="0.5" @play="hanlderPlay" @pause="hanlderpause"
                @timeupdate="handleTimeupdate"></audio>
            <SongItem v-if="musicStore.curSong" layoutModel="simple" :data="musicStore.curSong" class="song-item">
            </SongItem>
        </div>
        <div class="right">
            <svg-icon iconName="icon-voice"></svg-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineMusicStore } from '@/store/index'
import { watchEffect, ref, nextTick, reactive } from 'vue';
import { getSongDounloadUrl } from '@/api/music';
import SongItem from '@/components/SongItem.vue';
import { millisecondToTime } from '@/utils/index'

const musciArrts = reactive({
    mp3Url: '',
    duration: 0,
    currentTime: ''
})
const musicStore = defineMusicStore()
const audioRef = ref<HTMLAudioElement>()
watchEffect(async () => {
    if (musicStore.curSong) {
        const id = musicStore.curSong.id
        try {
            const songData: any = await getSongDounloadUrl(<string>id)
            musciArrts.mp3Url = songData.url
        } catch (error) {
            musicStore.playing = false
        }
        musciArrts.duration = musicStore.curSong.song.duration
    }
})
watchEffect(() => {
    if (musciArrts.mp3Url) {
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
    console.log(1111);

    musicStore.playing = true
}
// 监听暂停事件
const hanlderpause = () => {

    console.log(1111);
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
// 播放位置被改变
const handleTimeupdate = () => {
    musciArrts.currentTime = useAudioGetCurtime()
}

function useAudioGetCurtime() {
    const currentTime = audioRef.value?.currentTime
    return millisecondToTime(Math.floor(<number>currentTime * 1000))
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
        // text-align: center;
        width: 400px;
    }
}
</style>