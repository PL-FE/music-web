<template>
    <div class="singer-channel-container">
        <div class="img container" :style="{ backgroundImage: `url(${artistDetail && artistDetail?.artist?.cover})` }">
        </div>
        <div class="shade container">
        </div>
        <div class="gradient container">
        </div>
        <div class="singer-channel-container-wrapper container">
            <div class="artist-details">
                <h1 class="artist-name">{{ artistDetail?.artist?.name }}</h1>
                <p class="artist-text" :class="{ 'line-text-overflow-2': !expanding }">
                    {{ artistDetail?.artist?.briefDesc }}
                </p>
                <p class="toggle" @click="toggle">{{ expanding ? '收起' : '展开' }}</p>
            </div>
            <div class="singer-channel-container-body">
                <div class="singer-channel-container-body-item">
                    <h2>热门歌曲 TOP50</h2>
                    <div v-for="song in songData?.songs" :key="song.id" class="song-body">
                        <div class="left">
                            {{ song.name }}
                        </div>
                        <div class="mid">
                            <ArtistsLink :data="song"></ArtistsLink>
                        </div>
                        <div class="right">
                            <AlbumLink :data="song"></AlbumLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getArtistDetail, getArtistTopSong } from '@/api/music';
import ArtistsLink from '@/components/common/ArtistsLink.vue'
import AlbumLink from '@/components/common/AlbumLink.vue'

const route = useRoute()
const { artistDetail } = useArtistDetails()
const { songData } = useHotSong()


const expanding = ref(false)
const toggle = () => {
    expanding.value = !expanding.value
}

function useHotSong() {
    const songData = ref()
    watchEffect(() => {
        if (route.query.singerId) {
            getArtistTopSong(+route.query.singerId).then((res: any) => {
                songData.value = <songTypes[]>res
            })
        }
    })
    return {
        songData
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
</script>

<style lang="less" scoped>
.singer-channel-container {
    margin-bottom: 100px;
    height: 100%;
}

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
    margin-bottom: 20px;

    .song-body {
        display: flex;
        align-items: center;
        line-height: 28px;

        >div {
            flex: 1;
            overflow: hidden;
        }
    }
}
</style>