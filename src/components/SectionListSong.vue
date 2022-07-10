<template>
    <SectionList :data="data">
        <template #="{ width }">
            <div class="song-list">
                <SongItem layoutModel="row" :style="{ width: width }" v-for="(it, i) in data" :key="i" class="song-item"
                    :data="it" />
            </div>
        </template>
    </SectionList>
</template>

<script setup lang="ts">
import SectionList from './SectionList.vue'
import SongItem from './SongItem.vue'
defineProps({
    data: {
        type: Array,
        default: () => []
    }
})
</script>

<style  lang="less" scoped>
.song-list {
    height: 285px;
    display: flex;
    flex-flow: wrap;
    flex-direction: column;
}
</style>
