<template>
    <SectionListSong title="为你推荐" :column="3" itemHeight="">
        <SongItem v-for="(it, i) in newSongList" :key="i" :data="it" />
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
import { useRoute } from 'vue-router';
const route = useRoute()
const musicStore = defineMusicStore()
const newSongList = ref<songTypes[]>([])
const limit = 30
getNewsong(limit).then((res: any) => {
    newSongList.value = <songTypes[]>res
    if (!musicStore.playList.length && !route.query.playListId) {
        musicStore.playList = JSON.parse(JSON.stringify(res))
    }
})

const playlists = ref([])
topPlaylist().then((res: any) => {
    playlists.value = res.playlists
})
</script>
