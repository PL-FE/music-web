<template>
    <span class="line-text-overflow text-details albumLink-container" :title="data.song.album.name">
        <label class="artists-label" @click="albumDetails(data.song.album.id)">
            {{ data.song.album.name }}
        </label>
    </span>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router';
// const router = useRouter();
const props = defineProps({
    data: {
        type: Object,
        default: null
    }
})
console.log(props.data);

const albumDetails = (id: number) => {

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