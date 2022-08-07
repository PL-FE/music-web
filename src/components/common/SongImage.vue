<template>
    <el-image class="song-pic" :src="src + sizes" :style="{ height: '100%' }" fit="scale-down" lazy>
        <template #placeholder>
            <el-image :src="getImgSrc('music_default.svg')" fit="scale-down">
            </el-image>
        </template>
        <template #error>
            <el-image :src="getImgSrc('music_default.svg')" fit="scale-down">
            </el-image>
        </template>
    </el-image>
</template>

<script setup lang="ts">
import { getImgSrc } from '@/utils';
const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    size: {
        type: Number
    }
})
const sizes = props.size ? `?param=${props.size}y${props.size}` : ''
</script>

<style lang="less" scoped>
:deep(.el-image__wrapper) {
    display: flex;
}
</style>