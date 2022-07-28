<template>
    <span class="song-pic-container" @click.stop="playSong(data.id || data.song.id)"
        :class="{ active: active, hasStatusIcon: hasStatusIcon }" :style="{ width: size + 'px', height: size + 'px' }">
        <el-avatar shape="square" :size="size" :src="picUrl" class="song-pic" />
        <PlayButton readonly v-if="hasStatusIcon" class="song-play" :songId="data.id || data.song.id"></PlayButton>
    </span>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { defineMusicStore } from '@/store/index'
import PlayButton from '@/components/common/PlayButton.vue'

const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    hasStatusIcon: { // 是否展示状态图标
        type: Boolean,
        default: true
    },
    size: {
        type: Number,
        default: 50
    },
    playListIds: {
        type: Array,
        default: () => []
    },
})
const musicStore = defineMusicStore()

const router = useRouter();
const route = useRoute();

const picUrl = ref('')
const active = ref(false) // 歌曲是否当前激活
watchEffect(() => {
    const { data } = props
    picUrl.value = data.picUrl || data.album.picUrl;
    active.value = musicStore?.curSong?.id === data.id
})

const playSong = async (id: string) => {
    if (!props.hasStatusIcon) {
        return
    }
    // 修改全局状态
    router.push({
        path: route.path,
        query: {
            id
        }
    })
    musicStore.playing = active.value ? !musicStore.playing : true
    musicStore.setPlayList(<number[]>props.playListIds)
    musicStore.isShow = true
}
</script>

<style lang="less" scoped>
.song-pic-container {
    display: inline-block;
    position: relative;
    cursor: pointer;
    font-size: 0;

    .song-play {
        display: none;
        font-size: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &:hover,
    &.active {
        &.hasStatusIcon {

            .song-pic {
                filter: brightness(10%); // 变暗，模仿遮罩
            }

            .song-play {
                display: block;
            }
        }
    }
}
</style>