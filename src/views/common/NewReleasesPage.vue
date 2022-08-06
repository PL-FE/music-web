<template>
    <div class="newReleases-container" v-infinite-scroll="load" :infinite-scroll-immediate="false"
        :infinite-scroll-distance="200" :infinite-scroll-disabled="newPlaylists.length >= total">
        <h1>
            专辑和单曲
        </h1>
        <div class="section-conatainer">
            <template v-for="item in newPlaylists" :key="item.id">
                <PlayListItem :data="item" class="section-item" />
            </template>
        </div>
        <p v-if="loading" class="loading-container">
            <svg-icon class="icon-svg custom-loading main" iconName="icon-loading"></svg-icon>
        </p>
    </div>
</template>

<script setup lang="ts">
import { getAlbumNew } from '@/api/music'
import { nextTick, ref, watchEffect } from 'vue';
import PlayListItem from '@/components/PlayListItem.vue'
const pageIndex = ref(1)
const total = ref(0)
const loading = ref(false)
const load = () => {
    pageIndex.value += 1
}
// 新专辑
const newPlaylists = ref<albumTypes[]>([])
watchEffect(() => {
    loading.value = true
    getAlbumNew(pageIndex.value).then((res: any) => {
        total.value = res.total
        newPlaylists.value.push(...res.albums)
        nextTick(() => {
            loading.value = false
        })
    })
})
</script>

<style lang="less" scoped>
.newReleases-container {
    padding: 64px 10%;
    margin: 0 auto;
    overflow: hidden;
}

.section-conatainer {
    display: flex;
    flex-wrap: wrap;

    .section-item {
        margin-right: 40px;
        margin-bottom: 45px;
    }
}

.loading-container {
    text-align: center;
}
</style>