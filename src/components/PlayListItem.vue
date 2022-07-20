<template>
    <div class="playItem">
        <el-avatar shape="square" :size="200" :src="data.coverImgUrl" class="song-pic" />
        <div :title="data.name">{{ data.name }}</div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
</script>

<style lang="less" scoped>
.playItem {
    >div {
        width: 200px;
    }
}
</style>