<template>
    <div class="player-page-container" :class="{ showPage: musicStore.isShow }">
        <div class="song-cover-container">
            <el-image :src="coverImgUrl" :style="{ height: '100%' }" fit="scale-down" />
        </div>
        <PlayListVue class="play-list-container" />
    </div>
</template>

<script setup lang="ts">
import { getSongDetail, getSongDounloadUrl } from '@/api/music';
import { ref, watchEffect } from 'vue';
import PlayListVue from './PlayList.vue'
import { useRoute } from 'vue-router';
import { defineMusicStore } from '@/store/index'
const route = useRoute()
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
    transition: transform .5s;
    transform: translateY(100%);
    position: fixed;
    top: 64px;
    left: 0;
    width: 100vw;
    background-color: #030303;
    display: flex;
    padding: 80px 80px 0px 80px;
    text-align: center;
    box-sizing: border-box;

    .song-cover-container {
        padding: 60px 0;
        flex: 2;

        transition: all 0.6s ease-out;
        transform: translate(80px, 60px);
    }

    .play-list-container {
        flex: 1;
        min-width: 400px;
    }
}

.showPage {
    transform: translateY(0%);

    .song-cover-container {
        transform: translate(-80px, -60px);
    }
}
</style>
