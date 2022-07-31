<template>
    <div class="playItem">
        <div class="img-container">
            <el-image style="width: 210px; height: 200px" :src="data.coverImgUrl || data.blurPicUrl || data.picUrl"
                @click="openPlayListPage" fit="fill" class="song-pic" />
            <PlayButton @click="playList" class="playButton" />
        </div>
        <div :title="data.name" class="line-text-overflow-2">{{ data.name }}</div>
    </div>
</template>

<script setup lang="ts">
import PlayButton from '@/components/common/PlayButton.vue'
import { useRouter, useRoute } from 'vue-router';
import { defineMusicStore } from '@/store/index'
const musicStore = defineMusicStore()

const router = useRouter();
const route = useRoute();
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    isAlbum: { // 是否是专辑，true 是专辑，false是歌单
        type: Boolean,
        default: false
    }
})

const playList = () => {
    router.push({
        name: 'playList',
        query: {
            [props.isAlbum ? 'albumId' : 'playListId']: props.data.id
        }
    })
    if (props.isAlbum) {
        musicStore.setAlbum(props.data.id)
    } else {
        musicStore.setplayListSong(props.data.id)
    }
}

const openPlayListPage = () => {
    router.push({
        name: 'playListPage',
        query: {
            [props.isAlbum ? 'albumId' : 'playListId']: props.data.id
        }
    })
}

</script>

<style lang="less" scoped>
.img-container {
    position: relative;
    cursor: pointer;
    width: 210px;
    overflow: hidden;
    margin-bottom: 15px;
    font-size: 0;

    .song-pic,
    .playButton {
        font-size: 0;
        transition: transform 0.5s;
    }

    &:hover {
        .song-pic {
            transform: scale(1.2);
            // filter: blur(2px);
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