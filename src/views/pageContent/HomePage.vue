<template>
    <SectionListSong :data="newSongList" />
</template>


<script setup lang="ts">
import SectionListSong from '@/components/SectionListSong.vue'
import { getNewsong } from '@/api/music'
import { ref } from 'vue';
import { defineMusicStore } from '@/store/index'
const musicStore = defineMusicStore()
const newSongList = ref<songTypes[]>([])
const limit = 30
getNewsong(limit).then((res: any) => {
    newSongList.value = res
    if (!musicStore.playList.length) {
        musicStore.playList = res
    }
})
</script>
