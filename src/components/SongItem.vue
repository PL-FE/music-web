<template>
    <div class="song-container" :class="{ [`${layoutModel}-model`]: true, active: active }">
        <span class="song-pic-container" @click="playSong(data.id || data.song.id)" @mouseleave="picHover = false"
            @mouseenter="picHover = true">
            <el-avatar shape="square" :size="50" :src="picUrl" class="song-pic" />
            <el-icon class="song-play">
                <!-- 播放中 -->
                <template v-if="active && musicStore.playing">
                    <!-- 播放中 -->
                    <VideoPause v-if="picHover" />
                    <!-- 暂停 -->
                    <Service v-else />
                </template>

                <!-- 开始 -->
                <VideoPlay v-else-if="!active || !musicStore.playing" />
            </el-icon>
        </span>

        <div class="song-details">
            <div class="details-left">
                <div class="line-text-overflow" :title="data.name">
                    {{ data.name }}
                </div>
                <div class="line-text-overflow text-details" :title="artistsText">
                    {{ artistsText }}
                </div>
            </div>
            <div class="details-right">
                {{ millisecondToTime(data.song.duration) }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { VideoPlay, Service, VideoPause } from '@element-plus/icons-vue';
import { watchEffect, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getSongDounloadUrl } from '@/api/music';
import { defineMusicStore } from '@/store/index'
import { millisecondToTime } from '@/utils/index'
const musicStore = defineMusicStore()

const router = useRouter();
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    layoutModel: {
        type: String,
        default: 'col'
    }
})
const picHover = ref(false)
const playSong = async (id: string) => {
    // 获取歌曲mp3
    const songData: any = await getSongDounloadUrl(id)
    musicStore.curSong = <songTypes>{
        ...props.data,
        mp3Url: songData.url
    }
    musicStore.playing = !musicStore.playing
    router.push({
        path: "/song",
        query: {
            id
        }
    })
}
const picUrl = ref('')
const artistsText = ref('')
const active = ref(false) // 歌曲是否当前激活
watchEffect(() => {
    const { data } = props
    picUrl.value = data.picUrl || data['album' || 'al'].picUrl;
    active.value = musicStore?.curSong?.id === data.id
    artistsText.value = `${data.song.artists.map((art: any) => art.name).join('、')}`
})


</script>

<style  lang="less" scoped>
.song-container {
    display: flex;
    align-items: center;
    height: 50px;
    box-sizing: border-box;
    margin-bottom: 16px;
    font-size: 14px;
    cursor: pointer;

    .song-pic-container {
        display: inline-block;
        height: 100%;
        position: relative;

        .song-pic {
            height: 100%;
        }

        .song-play {
            display: none;
            font-size: 25px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .song-details {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0 15px;
        overflow: hidden;
    }

    .details-left {
        flex: 1;
        overflow: hidden;
    }

    .details-right {
        padding: 0 10px;
    }

    // 鼠标hover到歌曲条目上，子元素的样式
    &:hover {
        .song-pic {
            filter: brightness(10%); // 变暗，模仿遮罩
        }

        .song-play {
            display: block;
        }
    }

    // --------- 以上为基础样式

    &.col-model {
        text-align: left;

        // 播放时
        &.active {
            .song-play {
                display: block;
            }

            .song-pic {
                filter: brightness(10%); // 变暗，模仿遮罩
            }

            background-color: #1d1d1d;
        }

        &:hover {
            background-color: #1d1d1d;
        }
    }

    &.row-model {
        width: 500px;
        padding-right: 24px;

        .details-right {
            display: none;
        }
    }
}
</style>