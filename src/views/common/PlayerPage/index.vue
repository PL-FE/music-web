<template>
    <div class="player-page-container">
        <div class="song-cover-container">
            <el-image :src="coverImgUrl" :style="{ height: '100%' }" fit="scale-down" />
        </div>
        <div class="play-list-container">
            <PlayListVue />
        </div>
    </div>
</template>

<script setup lang="ts">
import { getSongDetail, getSongDounloadUrl } from '@/api/music';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PlayListVue from './PlayList.vue'
const route = useRoute()

defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})

const { coverImgUrl } = useSong()

function useSong() {
    const coverImgUrl = ref('')
    if (route.query.id) {
        // 获取歌曲详情文本
        getSongDetail(<string>route.query.id).then((res: any) => {
            coverImgUrl.value = res.songs[0].al.picUrl
        })
        // 获取歌曲mp3
        getSongDounloadUrl(<string>route.query.id).then((res) => {
            console.log(res);
        })
    }
    return {
        coverImgUrl
    }
}
</script>

<style lang="less" scoped>
.player-page-container {
    display: flex;
    height: calc(100vh - 66px - 66px);
    padding: 80px 80px 0px 80px;
    text-align: center;
    box-sizing: border-box;

    .song-cover-container {
        padding: 60px 0;
        flex: 2;
        border: 1px solid #fff;
    }

    .play-list-container {
        flex: 1;
        min-width: 400px;
        border: 1px solid #fff;
    }
}
</style>
