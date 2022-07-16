<template>
    <div class="controbar-container">
        <el-slider class="slider-time" :model-value="progress" @input="progressChange" size="small"
            :format-tooltip="formatTooltip" />
        <div class="controller-main left">
            <svg-icon @click="hanlderPrevious" class="icon-svg" iconName="icon-previous"></svg-icon>
            <svg-icon @click="hanlderpause" class="icon-svg main" iconName="icon-pause" v-if="musicStore.playing">
            </svg-icon>
            <svg-icon @click="hanlderPlay" class="icon-svg main" iconName="icon-play" v-else></svg-icon>
            <svg-icon @click="hanlderNext" class="icon-svg" iconName="icon-next"></svg-icon>
            <div class="time" v-if="musciArrts.duration">
                {{ useAudioGetCurtime(musciArrts.currentTime) }} / {{ millisecondToTime(musciArrts.duration) }}
            </div>
        </div>

        <div class="mid">
            <audio ref="audioRef" :src="musciArrts.mp3Url" preload="auto" volume="0.5" @play="hanlderPlay"
                @pause="hanlderpause" @timeupdate="handleTimeupdate" @ended="handlerEnded"
                @loadeddata="loadeddata"></audio>
            <SongItem v-if="musicStore.curSong" layoutModel="simple" :data="musicStore.curSong" class="song-item">
            </SongItem>
        </div>
        <div class="right">
            <el-slider class="slider-volume" v-model="volume" />
            <svg-icon class="icon-svg" v-if="!musicStore.isMute" iconName="icon-voice" @click="handlerVoice(true)">
            </svg-icon>
            <svg-icon class="icon-svg" v-else iconName="icon-mute" @click="handlerVoice(false)"></svg-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineMusicStore } from '@/store/index'
import { watchEffect, ref, nextTick, reactive, computed } from 'vue';
import { getSongDounloadUrl } from '@/api/music';
import SongItem from '@/components/SongItem.vue';
import { millisecondToTime } from '@/utils/index'
// TODO: 解决缓存进度条的显示
// TODO: 解决跳转未缓存到的时间，而暂停
// TODO: 进度条需要重写，当前是简单版本
const musciArrts = reactive({
    mp3Url: '',
    duration: 0,
    currentTime: 0,
    curtimeSlider: 0
})
const musicStore = defineMusicStore()
const audioRef = ref<HTMLAudioElement>()
const {
    progress,
    progressChange,
    customChangeProgress,
    formatTooltip,
} = useProgress()

const { hanlderPlay, hanlderpause, hanlderNext, hanlderPrevious, handleTimeupdate, handlerEnded, loadeddata } = useAudioEvent(customChangeProgress.value)
const { handlerVoice, volume } = useAudioApi()

document.addEventListener("keydown", function (e) {
    if (e.code === 'Space') {
        musicStore.canplay()
    }
})


function useAudioEvent(customChangeProgress: boolean) {
    // 查询播放时间
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
    // 控制播放暂停
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
    // 静音
    watchEffect(() => {
        if (audioRef.value) {
            audioRef.value.muted = musicStore.isMute
        }
    })
    return {
        loadeddata(e: any) {
            nextTick(() => {
                nextTick(() => {
                    audioRef.value?.play()
                })
            })
        },
        handlerEnded() {
            musicStore.nextSong()
        },
        // 监听播放事件
        hanlderPlay() {
            musicStore.playing = true
        },
        // 监听暂停事件
        hanlderpause() {
            musicStore.playing = false
        },
        // 下一首
        hanlderNext() {
            musicStore.nextSong()
        },
        // 上一首
        hanlderPrevious() {
            musicStore.preSong()
        },
        // 播放位置被改变
        handleTimeupdate() {
            if (!customChangeProgress) {
                musciArrts.currentTime = <number>audioRef.value?.currentTime
                musicStore.currentTime = musciArrts.currentTime
            }
        }
    }
}
function useAudioApi() {
    musicStore.currentVolume = audioRef.value?.volume || 0.5

    watchEffect(() => {
        if (audioRef.value) {
            audioRef.value.volume = musicStore.currentVolume
        }
    })
    const volume = computed({
        get() {
            return musicStore.currentVolume * 100
        },
        set(val) {
            musicStore.currentVolume = val / 100
        }
    })
    return {
        volume,
        handlerVoice(isMute: boolean) {
            musicStore.hanlderMute(isMute)
        },
        changeVolume(val: number) {
            console.log(val);

        }
    }
}

function useAudioGetCurtime(currentTime: number) {
    return millisecondToTime(Math.floor(currentTime * 1000))
}

function useProgress() {
    const progress = computed(() => {
        if (!musciArrts.currentTime) return 0
        return musciArrts.currentTime / (musciArrts.duration / 1000) * 100
    })
    let customChangeProgress = ref(false)
    let customChangeProgressTimer: any = null
    // 进度条 input 事件
    const progressChange = (val: any) => {
        clearTimeout(customChangeProgressTimer)
        customChangeProgressTimer = setTimeout(() => {
            customChangeProgress.value = false
        }, 500)
        customChangeProgress.value = true
        if (audioRef.value) {
            const time = val * (musciArrts.duration / 1000) / 100
            audioRef.value.currentTime = time;
        }
    }
    const formatTooltip = (value: number) => {
        return millisecondToTime(value * (musciArrts.duration / 100))
    }
    return {
        progress,
        progressChange,
        customChangeProgress,
        formatTooltip,
    }
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

    .slider-time {
        position: absolute;
        top: 1px;
        left: 0;
        transform: translateY(-50%);
        .slider-style(#f00)
    }



    .slider-volume {
        .slider-style(#fff)
    }

    .icon-svg {
        margin: 0 20px;
        cursor: pointer;

        &.main {
            font-size: 30px;
        }
    }

    .controller-main {
        display: flex;
        justify-content: space-between;
        align-items: center;


    }

    .mid {
        // text-align: center;
        width: 400px;
    }

    .right {
        display: flex;
        align-items: center;
        width: 300px;

        .slider-volume {
            width: 80px;
        }
    }
}

.slider-style(@mainColor) {
    --el-slider-button-size: 15px;
    --el-slider-button-wrapper-offset: -16px;

    :deep(.el-slider__bar) {
        background-color: @mainColor;
        height: 3px;

        &:hover {
            height: 3px;
        }
    }

    :deep(.el-slider__button) {
        border-color: @mainColor;
        background-color: @mainColor;
    }

    :deep(.el-slider__runway) {
        @runwayColor: rgba(255, 255, 255, 0.4);
        // 轨道
        height: 2px;
        background-color: @runwayColor;
    }
}
</style>