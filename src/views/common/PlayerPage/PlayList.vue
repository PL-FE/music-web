<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" stretch>
        <el-tab-pane label="接下来播放" name="next" :class="{ 'text-unselect': activeName === 'next' }">接下来播放</el-tab-pane>
        <el-tab-pane label="歌词" name="lyric" :class="{ 'text-unselect': activeName === 'lyric' }">歌词</el-tab-pane>
        <el-tab-pane label="相关内容" name="relevant" :class="{ 'text-unselect': activeName === 'relevant' }">相关内容
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('next')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>
<style lang="less" scoped>
:deep(.el-tabs__item) {
    height: 50px;
    line-height: 50px;

    &.is-active {
        color: #fff;
    }

    &:hover {
        color: #fff;
        opacity: 0.3;
    }
}

:deep(.el-tabs__active-bar) {
    background-color: #fff;
}

:deep(.el-tabs__nav-wrap::after) {
    opacity: 0.3;
    height: 1px;
}
</style>
