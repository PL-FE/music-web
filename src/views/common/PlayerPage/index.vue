<template>
    <div class="player-page-container" :class="{ showPage: musicStore.isShow }">
        <div class="song-cover-container">
            <el-image :src="coverImgUrl" :style="{ height: '100%' }" fit="scale-down" />
        </div>
        <PlayListVue class="play-list-container" />
    </div>
</template>

<script setup lang="ts">
import { getSongDetail, getSongDounloadUrl, getPlaylistDetail } from '@/api/music';
import { ref, watchEffect } from 'vue';
import PlayListVue from './PlayList.vue'
import { useRoute } from 'vue-router';
import { defineMusicStore } from '@/store/index'
const route = useRoute()
const musicStore = defineMusicStore()
const coverImgUrl = ref('')

watchEffect(() => {
    if (route.query.playListId) {
        getPlayList(+route.query.playListId)
    }
})

watchEffect(() => {
    if (musicStore.curSong) {
        coverImgUrl.value = musicStore.curSong.picUrl;
    } else {
        // TODO:适配
        useSong(<string>route.query.id)
    }
})

async function getPlayList(playListId: number) {
    const playListRes: any = await getPlaylistDetail(playListId)
    const ids = playListRes.playlist.trackIds.map((a: any) => a.id)
    const songs = await useSong(ids.join(','))
    musicStore.playList = songs
}

async function useSong(id: string) {
    if (!id) return
    const songInfo: any = await getSongDetail(id)

    if (!songInfo.songs.length) return
    const song = songInfo.songs[0]
    // 获取歌曲mp3
    const songData: any = await getSongDounloadUrl(song.id)
    song.mp3Url = songData.url
    musicStore.playSongId = song.id
    return songInfo.songs
}
</script>

<style lang="less" scoped>
.player-page-container {
    transition: transform .5s;
    transform: translateY(100%);
    position: fixed;
    top: 64px;
    left: 0;
    width: 100vw;
    background-color: #030303;
    display: flex;
    padding: 80px 80px 0px 80px;
    text-align: center;
    box-sizing: border-box;

    .song-cover-container {
        padding: 60px 0;
        flex: 2;

        transition: all 0.6s ease-out;
        transform: translate(80px, 60px);
    }

    .play-list-container {
        flex: 1;
        min-width: 400px;
    }
}

.showPage {
    transform: translateY(0%);

    .song-cover-container {
        transform: translate(-80px, -60px);
    }
}
</style>
