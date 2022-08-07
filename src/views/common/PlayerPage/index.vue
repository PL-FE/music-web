<template>
    <div class="player-page-container">
        <div class="song-cover-container">
            <SongImage :src="coverImgUrl" />
        </div>
        <PlayList class="play-list-container" />
    </div>
</template>

<script setup lang="ts">
import { onActivated, onDeactivated, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import PlayList from './PlayList.vue'
import { defineMusicStore } from '@/store/index'
import SongImage from '@/components/common/SongImage.vue';
import { useRouter, useRoute } from 'vue-router';
const musicStore = defineMusicStore()
const coverImgUrl = ref('')
const watcher: any = []
onActivated(() => {
    const router = useRouter();
    const route = useRoute();
    watcher.push(watch(() => route.query, (val) => {
        if (!val) return
        if (JSON.stringify(route.query) === '{}' && !musicStore.curSong) {
            router.push('/')
        }
    }, {
        immediate: true
    }))
    watcher.push(watch(() => route.query.albumId, (val) => {
        if (!val) return
        musicStore.setAlbum(+val)
    }, {
        immediate: true
    }))
    watcher.push(watch(() => route.query.playListId, (val) => {
        if (!val) return
        musicStore.setplayListSong(+val)
    }, {
        immediate: true
    }))
    watcher.push(watch(() => route.query.id, (val) => {
        if (!val) return
        if (route.query.playListId || route.query.albumId) return
        if (!musicStore.playListIds.length) {
            musicStore.setPlayList([Number(val)])
        }
    }, {
        immediate: true
    }))
    watcher.push(watchEffect(() => {
        if (musicStore.curSong) {
            coverImgUrl.value = musicStore.curSong.album.picUrl;
        }
    }))
})

onDeactivated(() => {
    watcher.forEach((w: any) => w())
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
