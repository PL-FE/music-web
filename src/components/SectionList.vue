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
            <slot :width="songItemWidthWrap"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
const props = defineProps({
    data: {
        type: Array,
        default: () => []
    }
})
const songItemWidth = 500
const columnCount = 3
const songItemWidthWrap = songItemWidth + 'px' // 500px
const slotContentWidth = songItemWidth * columnCount + 'px' // // 1500px

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
    width: calc(v-bind(slotContentWidth));
    overflow: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>