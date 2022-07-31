<template>
    <div class="album-page-container">
        <div class="album-info module">
            <el-avatar shape="square" :size="300" :src="album.picUrl" />
            <div class="album-details">
                <h1 class="album-name">{{ album?.name }}</h1>
                <div class="album-subtitle">
                    <p>专辑 • {{ album?.artist?.name }} • {{ timestampToTime(album.publishTime) }}</p>
                    <p>{{ songData.length }} 首歌曲 • {{ albumDt }} 分钟</p>
                </div>
                <p class="album-text" :class="{ 'line-text-overflow-2': !expanding }">
                    {{ album.description }}
                </p>
                <p class="toggle" @click="toggle">{{ expanding ? '收起' : '展开' }}</p>
            </div>
        </div>
        <div class="album-container-body">
            <div class="album-container-body-item module">
                <div v-for="(song, index) in songData" :key="song.id" class="song-body">
                    <div class="left">
                        <SongAvatar :data="song" :playListIds="songData.map(a => a.id)" :size="32" :index="index + 1"
                            :style="{ marginRight: '20px' }"></SongAvatar>
                        {{ song.name }}
                    </div>
                    <div class="mid">
                        <ArtistsLink :data="song" :style="{ width: '100%' }"></ArtistsLink>
                    </div>
                    <div class="right">
                        {{ millisecondToTime(song.song.duration) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getAlbum } from '@/api/music';
import { timestampToTime, millisecondToTime } from '@/utils';
import { watchEffect, ref, computed } from 'vue';
import ArtistsLink from '@/components/common/ArtistsLink.vue';
import SongAvatar from '@/components/SongAvatar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { album, songData, albumDt } = useAlbum()

const expanding = ref(false)
const toggle = () => {
    expanding.value = !expanding.value
}

function useAlbum() {
    const album = ref<albumType>({})
    const songData = ref<songTypes[]>([])
    const albumDt = computed(() => {
        const allDt = songData.value.reduce((pre: number, cur: any) => {
            pre += cur.song.duration;
            return pre
        }, 0)
        console.log(11, allDt);

        return Number(millisecondToTime(allDt).split(':')[0])
    })
    watchEffect(async () => {
        const albumId = Number(route.query.albumId)
        if (albumId) {
            const albumRes = await getAlbum(albumId)
            songData.value = albumRes.songs
            album.value = albumRes.album
        }
    })

    return {
        album,
        songData,
        albumDt
    }
}
</script>

<style lang="less" scoped>
@import '@/assets/styles/index.less';

.toggle {
    cursor: pointer;
}

.module {
    margin-bottom: 64px;
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