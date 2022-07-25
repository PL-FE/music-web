<template>
    <div class="next-play">
        <SongItem v-for="(it, i) in  musicStore.playList" :key="i" class="song-item" :data="it" />
    </div>
</template>

<script setup lang="ts">
import SongItem from '@/components/SongItem.vue';
import { getSimiSong, getSongDetail } from '@/api/music';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { defineMusicStore } from '@/store/index'
const musicStore = defineMusicStore()
const route = useRoute()
// TODO: 图片获取异常
watch(() => route.query.id, (songId) => {
    if (songId) {
        init(<string>songId)
    }
}, {
    immediate: true
})


function init(songId: string) {
    if (musicStore.playList.map(it => +it.id).includes(+songId)) {
        return
    }
    getSimiSong(songId).then((res: any) => {
        const simiSongids = res.songs.map((a: any) => a.id)
        simiSongids.unshift(route.query.id)
        getSongDetail(simiSongids.join(',')).then(res => {
            musicStore.playList = JSON.parse(JSON.stringify(<songTypes[]>res.songs))
        })
    })
}
</script>

<style lang="less" scoped>
.next-play {
    padding: 5px;
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
}

.song-item {
    text-align: left;
}
</style>
