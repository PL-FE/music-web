<template>
    <div class="relevant-view-container">
        <div class="section">
            <h2>您可能还喜欢</h2>
            <div class="section-body">
                <SongItem v-for="(item) in simiSongs" :key="item.id" class="song-item" :data="item" hasDuration
                    :size="40" :hasDuration="false" />
            </div>
        </div>
        <div class="section">
            <h2>包含这首歌的歌单</h2>
            <div class="section-body playList">
                <PlayListItem v-for="(item) in simiPlaylist" :key="item.id" :data="item" class="platlist-item" />
            </div>
        </div>
        <div class="section">
            <h2>同类型音乐人</h2>
            <div class="section-body artist">
                <ArtistsItem v-for="it in simiArtist" :key="it.id" :data="it" class="artist-item" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SongItem from '@/components/SongItem.vue'
import { getSimiSong, getSimiPlaylist, getSimiArtist } from '@/api/music';
import { onActivated, onDeactivated, ref, watch } from 'vue';
import { defineMusicStore } from '@/store/index'
import PlayListItem from '@/components/PlayListItem.vue'
import ArtistsItem from '@/components/ArtistsItem.vue'

const musicStore = defineMusicStore()
const watcher: any = []
const simiSongs = ref<songTypes[]>([])
const simiPlaylist = ref<playListTypes[]>([])
const simiArtist = ref<artistTypes[]>([])
onActivated(() => {
    watcher.push(watch(() => musicStore.playSongId, (songId) => {
        if (!songId) return
        getSimiSong(+songId).then((res: any) => {
            simiSongs.value = res.songs
        })
    }))
    watcher.push(watch(() => musicStore.playSongId, (songId) => {
        if (!songId) return
        getSimiPlaylist(+songId).then((res: any) => {
            simiPlaylist.value = res.playlists
        })
    }))
    watcher.push(watch(() => musicStore?.curSong?.artist?.id, (id) => {
        if (!id) return
        getSimiArtist(+id).then((res: any) => {
            simiArtist.value = res.artists
        })
    }))
})
onDeactivated(() => {
    watcher.forEach((w: any) => w())
})
</script>

<style lang="less" scoped>
.relevant-view-container {
    text-align: left;
    height: 100%;
    overflow: auto;

    .platlist-item,
    .artist-item {
        display: inline-block;
    }
}
</style>
