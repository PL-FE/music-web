<template>
    <div class="tag-container">
        <div class="tag-navigation-button navigation-button">
            {{ data.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
const leftColor = `hsl(${(Math.random() * 1000 % 360).toFixed(0)}deg 100% 76%)`;
defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
</script>

<style  lang="less" scoped>
.tag-container {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 14px;
    height: 50px;
    padding-right: 25px;
    margin-bottom: 15px;

    .tag-navigation-button {
        border-radius: 6px;
        width: 100%;
        line-height: 50px;
        border-left: 6px solid v-bind(leftColor);
        padding-left: 10px;
    }
}
</style>