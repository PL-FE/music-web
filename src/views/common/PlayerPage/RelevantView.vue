<template>
    <div class="relevant-view-container">
        <div class="section" v-if="simiSongs.length">
            <h2>您可能还喜欢</h2>
            <div class="section-body">
                <SongItem v-for="(item) in simiSongs" :key="item.id" class="song-item" :data="item" hasDuration
                    :size="40" :hasDuration="false" :playListIds="simiSongs.map(a => a.id)" />
            </div>
        </div>
        <div class="section" v-if="simiPlaylist.length">
            <h2>包含这首歌的歌单</h2>
            <div class="section-body playList">
                <PlayListItem v-for="(item) in simiPlaylist" :key="item.id" :data="item" class="platlist-item"
                    :sizes="100" />
            </div>
        </div>
        <div class="section" v-if="simiArtist.length">
            <h2>同类型音乐人</h2>
            <div class="section-body artist">
                <ArtistsItem v-for="it in simiArtist" :key="it.id" :data="it" class="artist-item" :sizes="100" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SongItem from '@/components/SongItem.vue'
import { getSimiSong, getSimiPlaylist, getSimiArtist } from '@/api/music';
import { ref, watch } from 'vue';
import { defineMusicStore } from '@/store/index'
import PlayListItem from '@/components/PlayListItem.vue'
import ArtistsItem from '@/components/ArtistsItem.vue'

const musicStore = defineMusicStore()
const simiSongs = ref<songTypes[]>([])
const simiPlaylist = ref<playListTypes[]>([])
const simiArtist = ref<artistTypes[]>([])
watch(() => musicStore.playSongId, (songId) => {
    if (!songId) return
    getSimiSong(+songId).then((res: any) => {
        simiSongs.value = res.songs
    })
})
watch(() => musicStore.playSongId, (songId) => {
    if (!songId) return
    getSimiPlaylist(+songId).then((res: any) => {
        simiPlaylist.value = res.playlists
    })
})
watch(() => musicStore?.curSong?.artist?.id, (id) => {
    if (!id) return
    getSimiArtist(+id).then((res: any) => {
        simiArtist.value = res.artists
    })
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
        margin-right: 25px;
        margin-bottom: 25px;
    }

    .section-body {

        &.playList,
        &.artist {
            display: flex;
            flex-wrap: wrap;
        }
    }
}
</style>
