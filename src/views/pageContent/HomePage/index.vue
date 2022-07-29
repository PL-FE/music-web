<template>
    <SectionListSong title="为你推荐" :column="3" itemHeight="" width="80%">
        <SongItem v-for="(it, i) in newSongList" :key="i" :data="it" :playListIds="newSongList.map(a => a.id)" />
    </SectionListSong>
    <SectionListSong title="流行歌单" :column="6" width="80%">
        <PlayListItem v-for="(it, i) in playlists" :key="i" :data="it" />
    </SectionListSong>
</template>


<script setup lang="ts">
import SectionListSong from '@/components/common/SectionList.vue'
import { getNewsong, topPlaylist } from '@/api/music'
import { ref } from 'vue';
import SongItem from '@/components/SongItem.vue'
import PlayListItem from '@/components/PlayListItem.vue'
const newSongList = ref<songTypes[]>([])
const limit = 30
getNewsong(limit).then((res: any) => {
    newSongList.value = <songTypes[]>res
})

const playlists = ref([])
topPlaylist().then((res: any) => {
    playlists.value = res.playlists
})
</script>
