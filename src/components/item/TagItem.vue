<template>
    <div class="tag-container" @click="openTaglist">
        <div class="tag-navigation-button navigation-button">
            {{ data.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
const leftColor = `hsl(${(Math.random() * 1000 % 360).toFixed(0)}deg 100% 76%)`;
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
const openTaglist = () => {
    router.push({
        name: 'tagListReleases',
        query: {
            cat: props.data.name
        }
    })
}
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