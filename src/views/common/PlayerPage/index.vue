<template>
    <div class="player-page-container">
        <div class="song-cover-container">
            <el-image :src="coverImgUrl" :style="{ height: '100%' }" fit="scale-down" />
        </div>
        <PlayListVue class="play-list-container" />
    </div>
</template>

<script setup lang="ts">
import { getSongDetail, getSongDounloadUrl } from '@/api/music';
import { ref, watchEffect } from 'vue';
import PlayListVue from './PlayList.vue'
import { useRoute } from 'vue-router';
import { defineMusicStore } from '@/store/index'
const route = useRoute()
const musicStore = defineMusicStore()
const coverImgUrl = ref('')
watchEffect(() => {
    if (musicStore.curSong) {
        coverImgUrl.value = musicStore.curSong.info.al.picUrl;
    } else {
        useSong(<string>route.query.id)
    }
})

async function useSong(id: string) {
    const songInfo: any = await getSongDetail(id)
    // 获取歌曲mp3
    const songData: any = await getSongDounloadUrl(id)
    musicStore.curSong = {
        info: songInfo.songs[0],
        data: songData,
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
