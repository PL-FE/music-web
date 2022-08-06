<template>
    <PlayListScroll :refresh="getAlbumNew" class="newReleases-container">
        <template #title>
            <h1 :style="{ fontSize: '40px' }">
                新发行
            </h1>
            <h1>
                专辑和单曲
            </h1>
        </template>
    </PlayListScroll>
</template>

<script setup lang="ts">
import { getAlbumNew } from '@/api/music'
import PlayListScroll from '@/components/PlayListScroll.vue'
</script>

<style lang="less" scoped>
.newReleases-container {
    padding: 64px 10%;
    margin: 0 auto;
    overflow: hidden;
}
</style>