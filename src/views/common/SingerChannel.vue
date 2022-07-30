<template>
    <div class="singer-channel-container">
        <div class="img container" :style="{ backgroundImage: `url(${artistDetail && artistDetail?.artist?.cover})` }">
        </div>
        <div class="shade container">
        </div>
        <div class="gradient container">
        </div>
        <div class="singer-channel-container-wrapper container">
            <div class="artist-details module">
                <h1 class="artist-name">{{ artistDetail?.artist?.name }}</h1>
                <p class="artist-text" :class="{ 'line-text-overflow-2': !expanding }">
                    {{ artistDetail?.artist?.briefDesc }}
                </p>
                <p class="toggle" @click="toggle">{{ expanding ? '收起' : '展开' }}</p>
            </div>
            <div class="singer-channel-container-body module">
                <div class="singer-channel-container-body-item">
                    <h1>热门歌曲 TOP50</h1>
                    <div v-for="song in songsWrap" :key="song.id" class="song-body">
                        <div class="left">
                            <SongAvatar :data="song" :playListIds="songData.songs.map(a => a.id)" :size="32"
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
                <div class="singer-channel-container-body-item">
                    <SectionListSong title="专辑" :column="6">
                        <PlayListItem isAlbum v-for="(it, i) in playlists" :key="i" :data="it" />
                    </SectionListSong>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getArtistDetail, getArtistTopSong, getartistAlbum } from '@/api/music';
import ArtistsLink from '@/components/common/ArtistsLink.vue'
import AlbumLink from '@/components/common/AlbumLink.vue'
import SongAvatar from '@/components/SongAvatar.vue';
import SectionListSong from '@/components/common/SectionList.vue'
import PlayListItem from '@/components/PlayListItem.vue'

const route = useRoute()
const { artistDetail } = useArtistDetails()
const { songData, showHotSongAll, songsWrap } = useHotSong()

const { playlists } = usePlayListBysong()

const expanding = ref(false)
const toggle = () => {
    expanding.value = !expanding.value
}

function useHotSong() {
    const songData = ref()
    const showHotSongAll = ref(false)
    const songsWrap = computed(() => {
        if (!songData.value) {
            return []
        }
        if (showHotSongAll.value) {
            return songData.value?.songs
        }
        return songData.value.songs.slice(0, 5)
    })
    watch(() => route.query.singerId, (val, oldVal) => {
        if (val !== oldVal) {
            console.log(val, oldVal);

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
    return {
        songData,
        showHotSongAll,
        songsWrap
    }
}

function useArtistDetails() {
    const artistDetail = ref()
    watchEffect(() => {
        if (route.query.singerId) {
            getArtistDetail(+route.query.singerId).then((res: any) => {
                artistDetail.value = res

            })
        }
    })
    return {
        artistDetail
    }
}

function usePlayListBysong() {
    const playlists = ref([])
    getartistAlbum(Number(route.query.singerId)).then((res: any) => {
        playlists.value = res.hotAlbums
    })
    return {
        playlists
    }
}
</script>

<style lang="less" scoped>
@import '@/assets/style.less';

.module {
    margin-bottom: 64px;
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