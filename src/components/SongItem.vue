<template>
    <div class="song-container" :class="{ [`${layoutModel}-model`]: true, playing: playing }">
        <span class="song-pic-container" @click="playSong(data.id + '')">
            <el-avatar shape="square" :size="50" :src="picUrl" class="song-pic" />
            <el-icon class="song-play">
                <Service v-show="playing" />
                <CaretRight v-show="!playing" />
            </el-icon>
        </span>

        <div class="song-details">
            <div>
                {{ data.name }}
            </div>
            <div class="text-details">
                <template v-if="data.song">
                    {{ data.song.artists.map((art: any) => art.name).join('、') }}-{{ data.song.name }}
                </template>
                <template v-if="data.artists">
                    {{ data.artists.map((art: any) => art.name).join('、') }}
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CaretRight, Service } from '@element-plus/icons-vue';
import { watchEffect, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getSongDetail, getSongDounloadUrl } from '@/api/music';
import { defineMusicStore } from '@/store/index'
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
const playSong = async (id: string) => {
    const songInfo: any = await getSongDetail(id)
    // 获取歌曲mp3
    const songData: any = await getSongDounloadUrl(id)
    musicStore.curSong = {
        info: songInfo.songs[0],
        data: songData,
    }

    router.push({
        path: "/song",
        query: {
            id
        }
    })
}
const picUrl = ref('')
const playing = ref(false)
watchEffect(() => {
    const { data } = props
    picUrl.value = data.picUrl || data.artist?.picUrl || data?.artists[0]?.picUrl
    playing.value = route.query.id === (data.id + '')
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
        padding: 0 15px;
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
        &.playing {
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
    }
}
</style>