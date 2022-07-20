<template>
    <SectionListSong title="为你推荐" :column="3" itemHeight="">
        <SongItem layoutModel="row" v-for="(it, i) in newSongList" :key="i" :data="it" />
    </SectionListSong>
    <SectionListSong title="流行歌单" :column="6">
        <PlayListItem v-for="(it, i) in playlists" :key="i" :data="it" />
    </SectionListSong>
</template>


<script setup lang="ts">
import SectionListSong from '@/components/common/SectionList.vue'
import { getNewsong, topPlaylist } from '@/api/music'
import { ref } from 'vue';
import { defineMusicStore } from '@/store/index'
import SongItem from '@/components/SongItem.vue'
import PlayListItem from '@/components/PlayListItem.vue'

const musicStore = defineMusicStore()
const newSongList = ref<songTypes[]>([])
const limit = 30
getNewsong(limit).then((res: any) => {
    newSongList.value = <songTypes[]>res
    if (!musicStore.playList.length) {
        musicStore.playList = res
    }
})

const playlists = ref([])
topPlaylist().then((res: any) => {
    console.log(res);
    playlists.value = res.playlists
    // newSongList.value = <songTypes[]>res
    // if (!musicStore.playList.length) {
    //     musicStore.playList = res
    // }
})
</script>
