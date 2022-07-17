<template>
    <div class="lyricView-container" ref="containerRef" @scroll="handlerScroll">
        <div class="row" :class="{ highlightLyricIndex: highlightLyricIndex === idx }" v-for="(row, idx) in lyrics"
            :key="row.time + idx">
            {{ row.lyric }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { getLyric } from '@/api/music';
import { defineMusicStore } from '@/store/index'
import { ref, watchEffect } from 'vue';

interface lyricsType {
    lyric: string,
    time: number,
}

const musicStore = defineMusicStore()
const lyrics = ref<lyricsType[]>([])
const containerRef = ref<HTMLDivElement>()
const highlightLyricIndex = ref(0)
watchEffect(() => {
    const playSongId = musicStore.playSongId
    if (!playSongId) return
    getLyric(<string>playSongId).then((res: any) => {
        lyrics.value = useLyric(res.lrc.lyric)
    })
})
watchEffect(() => {
    const currentTime = musicStore.currentTime
    if (!lyrics.value.length) return
    for (let index in lyrics.value) {
        let idx = Number(index) - 1
        const lyric = lyrics.value[index]
        // 匹配当前时间和歌词的时间
        if (currentTime <= lyric.time) {
            if (containerRef.value) {
                highlightLyricIndex.value = idx
                // 前面四行不滚动
                if (idx > 4) {
                    // 拖动滚动条时，取消自动滚动
                    if (!isScroll.value) {
                        containerRef.value.scrollTop = 50 * (idx - 4)
                    }
                } else {
                    containerRef.value.scrollTop = 0
                }
            }
            break;
        }
    }
})

const isScroll = ref(false)
let timer: any = null
let isMousedown: any = null
const handlerScroll = () => {
    isScroll.value = true
    clearInterval(timer)
    timer = setTimeout(() => {
        isScroll.value = false
    }, 1000)
}


function useLyric(lyric: string): lyricsType[] {
    const lyricList = lyric.split('\n')
    const lyricsObjArr = recordLyricTime(lyricList)
    return lyricsObjArr
}

function recordLyricTime(recordLyricTime: string[]) {
    const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
    let lyricsObjArr = <any>[]
    recordLyricTime.forEach(item => {
        if (item === '') return
        const obj = {
            lyric: '',
            time: 0,
        }
        const time = item.match(regTime)

        obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
        obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
        if (obj.lyric === '') {
            console.log('这一行没有歌词')
        } else {
            lyricsObjArr.push(obj)
        }
    })
    return lyricsObjArr
}

function formatLyricTime(time: any) { // 格式化歌词的时间 转换成 sss:ms
    const regMin = /.*:/
    const regSec = /:.*\./
    const regMs = /\./

    const min = parseInt(time.match(regMin)[0].slice(0, 2))
    let sec = parseInt(time.match(regSec)[0].slice(1, 3))
    const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
    if (min !== 0) {
        sec += min * 60
    }
    return Number(sec + '.' + ms)
}
</script>

<style lang="less" scoped>
.lyricView-container {
    height: 100%;
    overflow: auto;
    scroll-behavior: smooth;
}

.row {
    line-height: 50px;
}

.highlightLyricIndex {
    color: #ff0000;
}
</style>