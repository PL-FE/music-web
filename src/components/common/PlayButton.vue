<template>
    <span v-if="musicStore.playSongId == songId">
        <template v-if="!musicStore.loading">
            <svg-icon @click="canPlay(false)" class="icon-svg main" iconName="icon-pause" v-if="musicStore.playing">
            </svg-icon>
            <svg-icon v-else @click="canPlay(true)" class="icon-svg  main" iconName="icon-play"></svg-icon>
        </template>
        <template v-else>
            <svg-icon class="icon-svg custom-loading main" iconName="icon-loading"></svg-icon>
        </template>
    </span>
    <svg-icon v-else @click="canPlay(true)" class="icon-svg  main" iconName="icon-play"></svg-icon>
</template>

<script lang="ts" setup>
import { defineMusicStore } from '@/store/index'
const props = defineProps({
    songId: {
        type: [Number, String],
    },
    readonly: {
        type: Boolean,
        default: false
    }
})

const musicStore = defineMusicStore()
const canPlay = (val: boolean) => {
    if (!props.readonly) {
        musicStore.setPlaying(val)
    }
}


</script>