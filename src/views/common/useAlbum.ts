import { getAlbum, getPlaylistDetail } from "@/api/music";
import { millisecondToTime } from "@/utils";
import { computed, onActivated, onDeactivated, ref, watch } from "vue";
import { useRoute } from 'vue-router';


export default function useAlbum() {
    const route = useRoute();
    const album = ref<any>({})
    const songData = ref<songTypes[]>([])
    let watcher: any = []
    const albumDt = computed(() => {
        const allDt = songData.value.reduce((pre: number, cur: any) => {
            pre += cur.song.duration;
            return pre
        }, 0)
        return Number(millisecondToTime(allDt).split(':')[0])
    })

    onActivated(() => {
        // 专辑
        watcher.push(watch(() => route.query.albumId, async (v) => {
            const albumId = Number(route.query.albumId)
            if (albumId) {
                const albumRes = await getAlbum(albumId)
                songData.value = albumRes.songs
                album.value = albumRes.album
            }
        }, {
            immediate: true
        }))
        // 歌单
        watcher.push(watch(() => route.query.playListId, async (v) => {
            const playListId = Number(route.query.playListId)
            if (playListId) {
                const albumRes = await getPlaylistDetail(playListId)
                songData.value = albumRes.playlist.songs
                album.value = albumRes.playlist
            }
        }, {
            immediate: true
        }))
    })

    onDeactivated(() => {
        watcher.forEach((w: any) => w())
    })

    return {
        album,
        songData,
        albumDt,
        isAlbum: !!route.query.albumId
    }
}
