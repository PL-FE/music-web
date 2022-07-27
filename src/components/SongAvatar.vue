<template>
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
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { VideoPlay, Service, VideoPause } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { defineMusicStore } from '@/store/index'
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
const musicStore = defineMusicStore()

const router = useRouter();
const route = useRoute();

const picHover = ref(false)

const picUrl = ref('')
const active = ref(false) // 歌曲是否当前激活
watchEffect(() => {
    const { data } = props
    picUrl.value = data.picUrl || data.album.picUrl;
    active.value = musicStore?.curSong?.id === data.id
})

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
</script>

<style lang="less" scoped>
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

    &:hover {
        .song-pic {
            filter: brightness(10%); // 变暗，模仿遮罩
        }

        .song-play {
            display: block;
        }
    }
}
</style>