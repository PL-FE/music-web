<template>
    <div class="newReleases-container">
        <PlayListScroll :refresh="getTopPlaylist" :params="{ cat: tag }">
            <template #title>
                <h1 :style="{ fontSize: '40px' }">
                    与“{{ tag }}”相关
                </h1>
            </template>
        </PlayListScroll>
    </div>
</template>

<script setup lang="ts">
import { getTopPlaylist } from '@/api/music'
import PlayListScroll from '@/components/PlayListScroll.vue'
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const tag = ref(route.query.cat)
</script>

<style lang="less" scoped>
.newReleases-container {
    padding: 64px 10%;
    margin: 0 auto;
    overflow: hidden;
}
</style>