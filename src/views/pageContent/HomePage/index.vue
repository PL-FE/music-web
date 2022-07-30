<template>
    <div class="home-page-container">
        <SectionListSong title="为你推荐" :column="3" itemHeight="" width="80%">
            <SongItem v-for="(it, i) in recommendSongList" :key="i" :data="it"
                :playListIds="recommendSongList.map(a => a.id)" />
        </SectionListSong>
        <SectionListSong title="推荐歌单" :column="6" width="80%" key="1">
            <PlayListItem v-for="(it, i) in recommendPlaylists" :key="i" :data="it" />
        </SectionListSong>
        <SectionListSong title="流行歌单" :column="6" width="80%" key="2">
            <PlayListItem v-for="(it, i) in hotPlaylists" :key="i" :data="it" />
        </SectionListSong>
    </div>
</template>


<script setup lang="ts">
import SectionListSong from '@/components/common/SectionList.vue'
import { getNewsong, topPlaylist, recommendSongs, recommendResource } from '@/api/music'
import { ref, watchEffect } from 'vue';
import SongItem from '@/components/SongItem.vue'
import PlayListItem from '@/components/PlayListItem.vue'
import { defineUserStore } from '@/store/index'
const recommendSongList = ref<songTypes[]>([])
const userStore = defineUserStore()
watchEffect(() => {
    if (userStore.user.account) {
        recommendSongs().then((res: any) => {
            recommendSongList.value = <songTypes[]>res.songs
        })
    } else {
        const limit = 30
        getNewsong(limit).then((res: any) => {
            recommendSongList.value = <songTypes[]>res
        })
    }
})

const recommendPlaylists = ref([])
recommendResource().then((res: any) => {
    console.log(11111, res);
    recommendPlaylists.value = res.recommend
})

const hotPlaylists = ref([])
topPlaylist().then((res: any) => {
    hotPlaylists.value = res.playlists
})
</script>

<style lang="less" scoped>
.home-page-container {
    padding-top: 64px;
}
</style>