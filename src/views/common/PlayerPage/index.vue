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
onMounted(() => {
    const router = useRouter();
    const route = useRoute();
    if (JSON.stringify(route.query) === '{}' && !musicStore.curSong) {
        router.push('/')
    } else if (route.query.albumId) {
        musicStore.setAlbum(+route.query.albumId)
    } else if (route.query.playListId) {
        musicStore.setplayListSong(+route.query.playListId)
    } else if (route.query.id) {
        musicStore.setPlayList([+route.query.id])
    }

    watchEffect(() => {
        if (musicStore.curSong) {
            coverImgUrl.value = musicStore.curSong.album.picUrl;
        }
    })
})



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
