<template>
    <div class="album-page-container">
        <div class="album-info module">
            <el-avatar shape="square" :size="300" :src="album.picUrl || playList.picUrl" />
            <div class="album-details" v-show="album.name || playList.name">
                <h1 class="album-name">{{ album?.name || playList.name }}</h1>
                <div class="album-subtitle">
                    <p>{{ isAlbum ? '专辑' : '歌单' }} •
                        {{ album?.artist?.name || playList?.creator?.nickname }} •
                        {{
                                timestampToTime(album.publishTime || playList?.createTime)
                        }}
                    </p>
                    <p>{{ songData.length }} 首歌曲 • {{ albumDt }} 分钟</p>
                </div>
                <p class="album-text" :class="{ 'line-text-overflow-2': !expanding }">
                    {{ album.description || playList.description }}
                </p>
                <p class="toggle" v-if="hasOverflow" @click="toggle">{{ expanding ? '收起' : '展开' }}</p>
            </div>
        </div>
        <div class="album-container-body">
            <div class="album-container-body-item module">
                <div :style="{ marginBottom: '30px' }">
                    <el-button plain @click="playAll">全部播放</el-button>
                </div>
                <div v-for="(song, index) in songData" :key="song.id" class="song-body">
                    <div class="left">
                        <SongAvatar :data="song" :playListIds="songData.map(a => a.id)" :size="32"
                            :index="isAlbum ? index + 1 : 0" :style="{ marginRight: '20px' }"></SongAvatar>
                        {{ song.name }}
                    </div>
                    <div class="mid">
                        <ArtistsLink :data="song" :style="{ width: '100%' }"></ArtistsLink>
                    </div>
                    <div class="right">
                        {{ millisecondToTime(song.duration) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { timestampToTime, millisecondToTime } from '@/utils';
import { ref, watchEffect, nextTick } from 'vue';
import ArtistsLink from '@/components/common/ArtistsLink.vue';
import SongAvatar from '@/components/SongAvatar.vue';
import useAlbum from '@/views/common/useAlbum';
import { defineMusicStore } from '@/store';

const musicStore = defineMusicStore()
const { album, playList, songData, albumDt, isAlbum } = useAlbum()

const expanding = ref(false)
const toggle = () => {
    expanding.value = !expanding.value
}
const artistTextRef = ref<HTMLElement>(<HTMLElement>{})
const hasOverflow = ref(false)
watchEffect(() => {
    if (artistTextRef && artistTextRef.value && album.value?.description) {
        nextTick(() => {
            hasOverflow.value = artistTextRef.value.scrollHeight > artistTextRef.value.clientHeight
        })
    }
})
const playAll = () => {
    if (songData.value.length) {
        musicStore.setPlayList(songData.value.map((a: songTypes) => a.id))
    }
}
</script>

<style lang="less" scoped>
@import '@/assets/styles/index.less';

.toggle {
    cursor: pointer;
}

.module {
    padding-bottom: 64px;
}

.album-page-container {
    padding-top: 128px;
    height: 100%;
    width: 80%;
    margin: 0 auto;

    .album-info {
        display: flex;

        .album-name {
            margin-top: 0;
        }

        .album-details {
            width: 60%;
            margin-left: 30px;
        }
    }

    .album-container-body-item {
        margin-bottom: 20px;

        .song-body {
            @margin: 10px;
            display: flex;
            align-items: center;
            padding-bottom: @margin;
            border-bottom: 1px solid @outline-color;
            margin-bottom: @margin;

            >div {
                overflow: hidden;
            }

            .left {
                display: flex;
                align-items: center;
                flex: 1;
            }

            .mid {
                flex: 1;
            }

            .right {
                padding: 0 15px;
            }
        }
    }
}
</style>