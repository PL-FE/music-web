<template>
    <div class="song-container" :class="{ [`${layoutModel}-model`]: true, active: active }">
        <span class="song-pic-container" @click="playSong(data.id || data.song.id)" @mouseleave="picHover = false"
            @mouseenter="picHover = true">
            <el-avatar shape="square" :size="50" :src="picUrl" class="song-pic" />
            <el-icon v-if="layoutModel !== 'simple'" class="song-play">
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
                <span class="line-text-overflow song-text">
                    <ArtistsLink :data="data"></ArtistsLink>
                    <span :style="{ padding: '0px 5px' }">-</span>
                    <AlbumLink :data="data"></AlbumLink>
                </span>
            </div>
            <div class="details-right" v-if="layoutModel !== 'simple'">
                {{ millisecondToTime(data.song.duration) }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { VideoPlay, Service, VideoPause } from '@element-plus/icons-vue';
import { watchEffect, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { millisecondToTime } from '@/utils/index'
import { defineMusicStore } from '@/store/index'
import ArtistsLink from '@/components/common/ArtistsLink.vue'
import AlbumLink from '@/components/common/AlbumLink.vue'

const musicStore = defineMusicStore()

const router = useRouter();
const route = useRoute();
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
    musicStore.playSongId = props.data.id
    // 修改全局状态
    router.push({
        path: route.path,
        query: {
            id
        }
    })
    musicStore.playing = active.value ? !musicStore.playing : true
    musicStore.isShow = true
}
const picUrl = ref('')
const artistsText = ref('')
const active = ref(false) // 歌曲是否当前激活
watchEffect(() => {
    const { data } = props
    picUrl.value = data.picUrl || data.album.picUrl;
    active.value = musicStore?.curSong?.id === data.id
    artistsText.value = `${data.song.artists.map((art: any) => art.name).join('、')}`
    if (['row', 'simple'].includes(props.layoutModel)) {
        artistsText.value += '-' + data.song.album.name
    }
})

const artistsDetails = (id: number) => {
    router.push({
        name: 'singerChannel', query: {
            singerId: id
        }
    })
}

</script>

<style  lang="less" scoped>
.song-container {
    display: flex;
    align-items: center;
    height: 50px;
    box-sizing: border-box;
    font-size: 14px;

    .song-pic-container {
        display: inline-block;
        height: 100%;
        position: relative;
        cursor: pointer;

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

        .song-text {
            display: flex;
            align-items: center;
        }
    }

    .details-right {
        padding: 0 10px;
    }



    // --------- 以上为基础样式
    // 鼠标hover到歌曲条目上，子元素的样式
    &.col-model,
    &.row-model {

        &:hover {
            .song-pic {
                filter: brightness(10%); // 变暗，模仿遮罩
            }

            .song-play {
                display: block;
            }
        }
    }

    &.col-model {
        text-align: left;

        &+.song-container {
            margin-top: 16px;
        }

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
        margin-top: 16px;

        .details-right {
            display: none;
        }
    }
}
</style>