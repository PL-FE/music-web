<template>
    <div class="player-page-container">
        <div class="song-cover-container">
            <el-image :src="coverImgUrl" :style="{ height: '100%' }" fit="scale-down" />
        </div>
        <PlayListVue class="play-list-container" />
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import PlayListVue from './PlayList.vue'
import { defineMusicStore } from '@/store/index'
const musicStore = defineMusicStore()
const coverImgUrl = ref('')

watchEffect(() => {
    if (musicStore.curSong) {
        coverImgUrl.value = musicStore.curSong.picUrl;
    }
})

</script>

<style lang="less" scoped>
.player-page-container {
    width: 100%;
    background-color: #030303;
    display: flex;
    padding: 140px 80px 0px 80px;
    text-align: center;
    box-sizing: border-box;

    height: calc(100vh - 64px);

    .song-cover-container {
        padding: 60px 0;
        flex: 2;
        // transition: all 0.6s ease-out;
        // transform: translate(80px, 60px);
    }

    .play-list-container {
        flex: 1;
        min-width: 400px;
    }
}
</style>
