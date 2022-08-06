<template>
    <div class="SongAlbumtem-container">
        <h1>
            专辑和单曲
        </h1>
        <div class="list-conatainer">
            <component :is="data."></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getAlbumNewest, queryTopNewSong } from '@/api/music'
import { computed, ref } from 'vue';
import SongPicItem from '@/components/SongPicItem.vue'
import PlayListItem from '@/components/PlayListItem.vue'

defineProps({
    data: Array,
    default: () => []
}


</script>

<style lang="less" scoped>
</style>