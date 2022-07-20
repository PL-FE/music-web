<template>
    <div class="section-container">
        <div class="section-header">
            <h1>{{ title }}</h1>
            <span class="section-operation">
                <el-button :icon="ArrowLeftBold" circle @click="changePage(0)" />
                <el-button :icon="ArrowRightBold" circle @click="changePage(1)" />
            </span>
        </div>
        <div class="slot-content" ref="slotContentRef">
            <slot class="song-item"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { computed, nextTick, ref } from 'vue';
const props = defineProps({
    column: {
        type: Number,
        default: 3
    },
    title: {
        type: String,
        default: ''
    },
})
const columnCount = props.column
const slotContentWidth = 1500
const itemWidth = slotContentWidth / columnCount
const slotContentWidthWrap = computed(() => {
    return slotContentWidth + 'px'
})
const itemWidthWrap = computed(() => {
    return itemWidth + 'px'
})
const scrollLeft = ref(0)
const slotContentRef = ref<HTMLDivElement>()
const changePage = (add: Number) => {
    if (!slotContentRef.value) {
        return
    }
    if (add) {
        scrollLeft.value += itemWidth
    } else {
        scrollLeft.value -= itemWidth
    }

    if (scrollLeft.value > slotContentRef.value.scrollWidth - slotContentWidth) {
        scrollLeft.value = slotContentRef.value.scrollWidth - slotContentWidth
    } else if (scrollLeft.value < 0) {
        scrollLeft.value = 0
    }

    slotContentRef.value.scrollLeft = scrollLeft.value
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

:deep(.slot-content) {
    height: 285px;
    display: flex;
    flex-flow: wrap;
    flex-direction: column;
    width: v-bind(slotContentWidthWrap);
    overflow: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }


    >div {
        width: v-bind(itemWidthWrap);
    }
}
</style>
