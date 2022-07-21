<template>
    <div class="playItem">
        <div class="img-container">
            <!-- <el-avatar shape="square" :size="210" :src="data.coverImgUrl" class="song-pic" /> -->
            <el-image style="width: 210px; height: 200px" :src="data.coverImgUrl" fit="fill" class="song-pic" />
            <PlayButton @click="playList" class="playButton" />
        </div>
        <div :title="data.name">{{ data.name }}</div>
    </div>
</template>

<script setup lang="ts">
import PlayButton from '@/components/common/PlayButton.vue'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})

const playList = () => {
    router.push({
        path: route.path,
        query: {
            playListId: props.data.id
        }
    })
}
</script>

<style lang="less" scoped>
.img-container {
    position: relative;
    cursor: pointer;
    width: 210px;
    height: 210px;
    overflow: hidden;
    margin-bottom: 10px;
    font-size: 0;

    .song-pic,
    .playButton {
        transition: transform 0.5s;
    }

    &:hover {
        .song-pic {
            transform: scale(1.2);
            filter: blur(2px);
        }

    }

    .playButton {
        position: absolute;
        right: 20px;
        bottom: 16px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 8px;
        padding-left: 10px;
        font-size: 18px;
        transition: all 0.5s;

        &:hover {
            transform: scale(1.4);
            background-color: #030303;
        }
    }
}

.playItem {

    >div {
        width: 210px;
    }

}
</style>