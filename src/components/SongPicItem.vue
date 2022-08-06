<template>
    <div class="SongPicItem">
        <div class="img-container" @click="openPlayListPage">
            <el-image style="width: 210px; height: 200px" :src="data.album.picUrl" fit="fill" class="song-pic" />
            <PlayButton @click="playList" class="playButton" />
        </div>
        <div :title="data.name" class="line-text-overflow-2">{{ data.name }}</div>
        <div :title="data.name" class="line-text-overflow-2 sub-name">
            <ArtistsLink :data="data" class="artists-link" />
        </div>
    </div>
</template>

<script setup lang="ts">
import PlayButton from '@/components/common/PlayButton.vue'
import { useRouter } from 'vue-router';
import { defineMusicStore } from '@/store/index'
import ArtistsLink from './common/ArtistsLink.vue';
const musicStore = defineMusicStore()

const router = useRouter();
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
const albumId = props.data.album.id

const playList = () => {
    router.push({
        name: 'playList',
        query: {
            albumId
        }
    })
    musicStore.setAlbum(albumId)
}

const openPlayListPage = () => {
    router.push({
        name: 'playListPage',
        query: {
            albumId: albumId
        }
    })
}

</script>

<style lang="less" scoped>
@import '@/assets/styles/index.less';

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
        transition: all 0.5s;
    }

    .song-pic {
        border-radius: 6px;
    }

    &:hover {
        .song-pic {
            transform: scale(1);
            filter: brightness(0.8);
        }

        .playButton {
            display: inline-block;
        }

    }

    .playButton {
        display: none;
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

.SongPicItem {

    >div {
        width: 210px;
    }

}

.sub-name {
    opacity: 0.6;
    display: flex;
    flex-wrap: nowrap;

    .artists-link {
        flex: 1;
    }
}
</style>