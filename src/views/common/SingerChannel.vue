<template>
    <div class="singer-channel-container">
        <div class="img container" :style="{ backgroundImage: `url(${artistDetail && artistDetail?.picUrl})` }">
        </div>
        <div class="shade container">
        </div>
        <div class="gradient container">
        </div>
        <div class="singer-channel-container-wrapper container">
            <div class="artist-details module">
                <h1 class="artist-name">{{ artistDetail?.name }}</h1>
                <p class="artist-text" :class="{ 'line-text-overflow-2': !expanding }" ref="artistTextRef">
                    {{ artistDetail?.briefDesc }}
                </p>
                <p class="toggle" v-if="hasOverflow" @click="toggle">{{ expanding ? '收起' : '展开' }}</p>
            </div>
            <div class="singer-channel-container-body ">
                <div class="singer-channel-container-body-item module">
                    <el-button plain @click="playAll">全部播放</el-button>
                    <h1>热门歌曲 TOP50</h1>
                    <div v-for="song in songsWrap" :key="song.id" class="song-body">
                        <div class="left">
                            <SongAvatar :data="song" :playListIds="songData.map(a => a.id)" :size="32"
                                :style="{ marginRight: '20px' }"></SongAvatar>
                            {{ song.name }}
                        </div>
                        <div class="mid">
                            <ArtistsLink :data="song" :style="{ width: '100%' }"></ArtistsLink>
                        </div>
                        <div class="right">
                            <AlbumLink :data="song" :style="{ width: '100%' }"></AlbumLink>
                        </div>
                    </div>
                    <div>
                        <span v-if="!showHotSongAll" class="text-button" @click="showHotSongAll = true">全部显示</span>
                    </div>
                </div>
                <div class="singer-channel-container-body-item module">
                    <SectionListSong title="专辑" :column="6">
                        <PlayListItem isAlbum v-for="(it, i) in playlists" :key="i" :data="it" />
                    </SectionListSong>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, computed, watch, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { getArtistDetail, getArtistTopSong, getartistAlbum } from '@/api/music';
import ArtistsLink from '@/components/common/ArtistsLink.vue'
import AlbumLink from '@/components/common/AlbumLink.vue'
import SongAvatar from '@/components/SongAvatar.vue';
import SectionListSong from '@/components/common/SectionList.vue'
import PlayListItem from '@/components/PlayListItem.vue'
import { defineMusicStore } from '@/store';

const musicStore = defineMusicStore()
const route = useRoute()
const { artistDetail } = useArtistDetails()
const { songData, showHotSongAll, songsWrap, playAll } = useHotSong()

const { playlists } = usePlayListBysong()

const expanding = ref(false)
const toggle = () => {
    expanding.value = !expanding.value
}
const artistTextRef = ref<HTMLElement>()
const hasOverflow = ref(false)
watchEffect(() => {
    if (artistTextRef.value && artistDetail.value?.briefDesc) {
        nextTick(() => {
            hasOverflow.value = artistTextRef.value?.scrollHeight > artistTextRef.value?.clientHeight
        })
    }
})

function useHotSong() {
    const songData = ref<songTypes[]>([])
    const showHotSongAll = ref(false)
    const songsWrap = computed(() => {
        if (!songData.value) {
            return []
        }
        if (showHotSongAll.value) {
            return songData.value
        }
        return songData.value.slice(0, 5)
    })
    watch(() => route.query.singerId, (val, oldVal) => {
        if (val !== oldVal) {
            if (route.query.singerId) {
                getArtistTopSong(+route.query.singerId).then((res: any) => {
                    songData.value = <songTypes[]>res
                })
                showHotSongAll.value = false
            }
        }
    }, {
        immediate: true
    })
    const playAll = () => {
        if (songData.value.length) {
            musicStore.setPlayList(songData.value.map((a: songTypes) => a.id))
        }
    }
    return {
        songData,
        showHotSongAll,
        songsWrap,
        playAll
    }
}

function useArtistDetails() {
    const artistDetail = ref<artistTypes>()
    watchEffect(() => {
        if (route.query.singerId) {
            getArtistDetail(+route.query.singerId).then((res: any) => {
                artistDetail.value = res.artist
            })
        }
    })
    return {
        artistDetail
    }
}

function usePlayListBysong() {
    const playlists = ref<albumTypes>([])
    getartistAlbum(Number(route.query.singerId)).then((res: any) => {
        playlists.value = res.hotAlbums
    })
    return {
        playlists
    }
}
</script>

<style lang="less" scoped>
@import '@/assets/styles/index.less';

.module {
    padding-bottom: 64px;
}

:deep(.el-button, .el-button:hover, .el-button:active, .el-button:focus) {
    color: #606266;
    border-color: #ffffff;
}

.singer-channel-container {
    height: 100%;
}

// 容器布局和背景
.container {
    height: 100%;
    padding: 400px 10% 0px 10%;
    height: 250px;
    width: 80%;

    &.shade {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.4);
    }

    &.img {
        position: absolute;
        background-size: 100%;
        background-position: center;
    }

    &.gradient {
        position: absolute;
        background-image: linear-gradient(rgba(0, 0, 0, 0), #030303);
    }

    &.singer-channel-container-wrapper {
        position: absolute;
    }
}

.artist-name {
    font-size: 45px;
}

.artist-text {
    width: 50%;
    margin: 0;
    font-size: 14px;
    line-height: 22px;
}

.toggle {
    cursor: pointer;
}

.singer-channel-container-body-item {
    .song-body {
        @margin: 10px;
        display: flex;
        align-items: center;
        padding-bottom: @margin;
        border-bottom: 1px solid @outline-color;
        margin-bottom: @margin;

        >div {
            flex: 1;
            overflow: hidden;
        }

        .left {
            display: flex;
            align-items: center;
        }
    }
}
</style>