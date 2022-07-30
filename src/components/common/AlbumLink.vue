<template>
    <span class="line-text-overflow text-details albumLink-container" :title="data.song.album.name">
        <label class="artists-label" @click="albumDetails(data.song.album.id)">
            {{ data.song.album.name }}
        </label>
    </span>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
defineProps({
    data: {
        type: Object,
        default: null
    }
})
const albumDetails = (id: number) => {
    router.push({
        name: 'albumPage', query: {
            ...route.query,
            albumId: id
        }
    })
}
</script>

<style lang="less" scoped>
.albumLink-container {
    display: inline-block;
}

.artists-label {
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}
</style>