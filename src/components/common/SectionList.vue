<template>
    <div class="section-container">
        <div class="section-header">
            <h1>为你推荐</h1>
            <span class="section-operation">
                <el-button :icon="ArrowLeftBold" :disabled="!page.idnex" circle @click="changePage(0)" />
                <el-button :icon="ArrowRightBold" :disabled="page.idnex === page.total" circle @click="changePage(1)" />
            </span>
        </div>
        <div class="slot-content" ref="slotContentRef">
            <SongItem layoutModel="row" v-for="(it, i) in data" :key="i" class="song-item" :data="it" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import SongItem from '../SongItem.vue'
interface Props {
    data?: songTypes[]
}
const props = withDefaults(defineProps<Props>(), {
    data: () => []
})
const columnCount = 4
const slotContentWidth = 1500
const songItemWidth = slotContentWidth / columnCount

const slotContentRef = ref<HTMLDivElement>()
const page = reactive({
    idnex: 0,
    total: 0,
})
onMounted(() => {
    watch(() => props.data, () => {
        nextTick(() => {
            if (slotContentRef.value) {
                const scrollWidth = slotContentRef.value.scrollWidth || 0
                page.total = Math.ceil(scrollWidth / songItemWidth) - columnCount
            }
        })
    })
})
const changePage = (add: Number) => {
    if (!slotContentRef.value) {
        return
    }
    if (add && page.idnex < page.total) {
        page.idnex++
        slotContentRef.value.scrollLeft = songItemWidth * page.idnex
    }
    if (!add && page.idnex > 0) {
        page.idnex--
        slotContentRef.value.scrollLeft = songItemWidth * page.idnex
    }
}
</script>

<style  lang="less" scoped>
.section-container {
    width: 80%;
    margin: 0 auto;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.slot-content {
    height: 285px;
    display: flex;
    flex-flow: wrap;
    flex-direction: column;
    width: calc(v-bind(slotContentWidth));
    overflow: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }


    .song-item {
        width: calc(100% / v-bind(columnCount));
    }
}
</style>