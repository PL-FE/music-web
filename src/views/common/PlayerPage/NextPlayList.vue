<template>
    <div class="next-play">
        <SongItem v-for="(it, i) in songList" :key="i" class="song-item" :data="it" />
    </div>
</template>

<script setup lang="ts">
import SongItem from '@/components/SongItem.vue';
import { getSimiSong, getSongDetail } from '@/api/music';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineMusicStore } from '@/store/index'
const musicStore = defineMusicStore()
const route = useRoute()
const songList = ref([]) // 当前播放列表，数据源是相似歌曲
// TODO: 图片获取异常
getSimiSong(<string>route.query.id).then((res: any) => {
    const simiSongids = res.songs.map((a: any) => a.id)
    simiSongids.unshift(route.query.id)
    getSongDetail(simiSongids.join(',')).then(res => {
        songList.value = res.songs
        musicStore.playList = <songTypes[]>res.songs
    })
})
</script>

<style lang="less" scoped>
.next-play {
    padding: 5px;
    overflow: auto;
    height: 100%;
}

.song-item {
    text-align: left;
}
</style>
