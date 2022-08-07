<template>
    <div class="section-container">
        <div class="section-header">
            <h1>{{ title }}</h1>
            <span class="section-operation">
                <el-icon class="arrow-target" @click="changePage(0)" :class="{ disabled: scrollLeft === 0 }">
                    <ArrowLeftBold />
                </el-icon>
                <el-icon class="arrow-target" @click="changePage(1)" :class="{ disabled: disabledNext }">
                    <ArrowRightBold />
                </el-icon>
            </span>
        </div>
        <div class="slot-content" ref="slotContentRef">
            <slot class="song-item"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { computed, ref } from 'vue';
const props = defineProps({
    column: {
        type: Number,
        default: 3
    },
    title: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '100&'
    },
    slotContentWidth: {
        type: Number,
        default: 1500
    },
})
const columnCount = props.column
const slotContentWidth = props.slotContentWidth
const itemWidth = slotContentWidth / columnCount
const slotContentWidthWrap = computed(() => {
    return slotContentWidth + 'px'
})
const itemWidthWrap = computed(() => {
    return itemWidth + 'px'
})
const scrollLeft = ref(0)
const slotContentRef = ref<HTMLDivElement>()
const disabledNext = ref(false)
const changePage = (add: Number) => {
    if (!slotContentRef.value) {
        return
    }
    disabledNext.value = false
    if (add) {
        scrollLeft.value += itemWidth * Math.ceil((props.column) / 2)
    } else {
        scrollLeft.value -= itemWidth * Math.ceil((props.column) / 2)
    }

    if (scrollLeft.value >= slotContentRef.value.scrollWidth - slotContentWidth) {
        scrollLeft.value = slotContentRef.value.scrollWidth - slotContentWidth
        disabledNext.value = true
    } else if (scrollLeft.value < 0) {
        scrollLeft.value = 0
    }
    slotContentRef.value.scrollLeft = scrollLeft.value
}
</script>
<style  lang="less" scoped>
.section-container {
    margin: 0 auto;
    width: v-bind(width);

    .arrow-target {
        padding: 10px;
        border-radius: 50%;
        display: inline-block;
        cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.3);

        &:hover {
            background-color: #1d1d1d;
        }

        &.disabled {
            opacity: 0.4;
            pointer-events: none;
        }

        &+.arrow-target {
            margin-left: 10px;
        }
    }
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
