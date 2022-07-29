<template>
    <span class="line-text-overflow text-details artistsLink-container" :title="artistsText">
        <span v-for="(art, index) in data.song.artists" :key="art.id">
            <label class="artists-label" @click="artistsDetails(art.id)">
                {{ art.name }}
            </label>
            <template v-if="data.song.artists.length !== index + 1">、</template>
        </span>
    </span>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();
const props = defineProps({
    data: {
        type: Object,
        default: null
    },
    layoutModel: {
        type: String,
        default: 'col'
    }
})

const artistsText = ref('')
watchEffect(() => {
    artistsText.value = `${props.data.song.artists.map((art: any) => art.name).join('、')}`
})
const artistsDetails = (id: number) => {
    router.push({
        name: 'singerChannel', query: {
            ...route.query,
            singerId: id
        }
    })
}
</script>

<style lang="less" scoped>
.artistsLink-container {
    display: inline-block;
}

.artists-label {
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}
</style>