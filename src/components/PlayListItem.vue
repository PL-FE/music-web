<template>
    <div class="playItem">
        <div class="img-container" @click="openPlayListPage">
            <SongImage style="width: 210px; height: 200px" :src="data.coverImgUrl || data.blurPicUrl || data.picUrl"
                class="song-pic" />
            <PlayButton @click="playList" class="playButton" />
        </div>
        <div :title="data.name" class="line-text-overflow-2">{{ data.name }}</div>
        <div v-if="isAlbum" class=" line-text-overflow-2 sub-name">{{ data.type === 'Single' ? '单曲' :
                data.type
        }} • {{
        data.artist.name
}}</div>
    </div>
</template>

<script setup lang="ts">
import PlayButton from '@/components/common/PlayButton.vue'
import { useRouter } from 'vue-router';
import { defineMusicStore } from '@/store/index'
import { computed } from 'vue';
import SongImage from '@/components/common/SongImage.vue';

const musicStore = defineMusicStore()

const router = useRouter();
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
const isAlbum = computed(() => { // props.data.creator是歌单
    return !!props.data.artist
})

const playList = () => {
    router.push({
        name: 'playList',
        query: {
            [isAlbum.value ? 'albumId' : 'playListId']: props.data.id
        }
    })
    if (isAlbum.value) {
        musicStore.setAlbum(props.data.id)
    } else {
        musicStore.setplayListSong(props.data.id)
    }
}

const openPlayListPage = () => {
    router.push({
        name: 'playListPage',
        query: {
            [isAlbum.value ? 'albumId' : 'playListId']: props.data.id
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

.playItem {

    >div {
        width: 210px;
    }

}

.sub-name {
    opacity: 0.6;
}
</style>