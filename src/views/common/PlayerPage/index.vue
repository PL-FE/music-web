<template>
    <div class="player-page-container">
        <div class="song-cover-container">
            <SongImage :src="coverImgUrl" />
        </div>
        <PlayList class="play-list-container" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import PlayList from './PlayList.vue'
import { defineMusicStore } from '@/store/index'
import SongImage from '@/components/common/SongImage.vue';
import { useRouter, useRoute } from 'vue-router';
const musicStore = defineMusicStore()
const coverImgUrl = ref('')
const router = useRouter();
const route = useRoute();
onMounted(() => {
    if (!musicStore.playing) {
        initSetData()
    }

    watchEffect(() => {
        if (musicStore.curSong) {
            coverImgUrl.value = musicStore.curSong.album.picUrl;
        }
    })
})

function initSetData() {
    const { query } = route
    if (JSON.stringify(query) === '{}' && !musicStore.curSong) {
        router.push('/')
    } else if (query.albumId) {
        musicStore.setAlbum(+query.albumId)
    } else if (query.playListId) {
        musicStore.setplayListSong(+query.playListId)
    } else if (query.ids) {
        const idsStr: string = <string>query.ids
        const ids: number[] = idsStr.split(',').map((a: string) => +a)
        const id = query.id || ids[0]
        musicStore.setPlayList(ids, +id)
    } else if (query.id) {
        musicStore.setPlayList([+query.id])
    }
}



</script>

<style lang="less" scoped>
.player-page-container {
    position: fixed;
    overflow: hidden;
    top: 0;
    width: 100%;
    background-color: #030303;
    display: flex;
    padding: 140px 80px 64px 80px;
    text-align: center;
    box-sizing: border-box;

    height: calc(100vh);

    .song-cover-container {
        padding: 60px 0;
        flex: 2;
        // transform: translate(80px, 60px);
        // transition: translate 0.6s ease-out;
    }

    .play-list-container {
        flex: 1;
        min-width: 400px;
    }
}
</style>
