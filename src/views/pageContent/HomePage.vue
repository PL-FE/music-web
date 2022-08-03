<template>
    <div class="home-page-container">
        <SectionListSong title="为你推荐" :column="3" itemHeight="" width="80%">
            <SongItem v-for="(it, i) in recommendSongList" :key="i" :data="it"
                :playListIds="recommendSongList.map(a => a.id)" />
        </SectionListSong>
        <SectionListSong v-if="recommendPlaylists.length" title="推荐歌单" :column="6" width="80%" key="1">
            <PlayListItem v-for="(it, i) in recommendPlaylists" :key="i" :data="it" />
        </SectionListSong>
        <SectionListSong title="流行歌手" :column="6" width="80%" key="2">
            <ArtistsItem v-for="(it, i) in topArtists" :key="i" :data="it" />
        </SectionListSong>
        <SectionListSong title="流行歌单" :column="6" width="80%" key="2">
            <PlayListItem v-for="(it, i) in topPlaylists" :key="i" :data="it" />
        </SectionListSong>
    </div>
</template>


<script setup lang="ts">
import SectionListSong from '@/components/common/SectionList.vue'
import { getNewsong, getTopPlaylist, getTopArtists, recommendSongs, recommendResource } from '@/api/music'
import { ref, watchEffect } from 'vue';
import SongItem from '@/components/SongItem.vue'
import ArtistsItem from '@/components/ArtistsItem.vue'
import PlayListItem from '@/components/PlayListItem.vue'
import { defineUserStore } from '@/store/index'
const recommendSongList = ref<songTypes[]>([])
const userStore = defineUserStore()
// 为你推荐的歌曲（兼容未登录）
watchEffect(() => {
    if (userStore.user.account) {
        recommendSongs().then((songs: songTypes[]) => {
            recommendSongList.value = songs
        })
    } else {
        const limit = 30
        getNewsong(limit).then((res: any) => {
            recommendSongList.value = <songTypes[]>res
        })
    }
})

// 推荐的歌单（需要登陆）
const recommendPlaylists = ref<playListTypes[]>([])
recommendResource().then((res: any) => {
    recommendPlaylists.value = res.recommend
})

// 流行歌手
const topArtists = ref<artistTypes[]>([])
getTopArtists().then((res: any) => {
    topArtists.value = res.artists
})

// 流行歌单
const topPlaylists = ref<playListTypes[]>([])
getTopPlaylist().then((res: any) => {
    topPlaylists.value = res.playlists
})
</script>

<style lang="less" scoped>
.home-page-container {
    padding-top: 64px;
}
</style>