<template>
    <SectionListSong :data="newSongList" />
</template>


<script setup lang="ts">
import SectionListSong from '@/components/SectionListSong.vue'
import { getNewsong } from '@/api/music'
import { ref } from 'vue';
const newSongList = ref([])
const limit = 30
getNewsong(limit).then(res => {
    console.log(res)
    newSongList.value = <any>res
})
</script>
