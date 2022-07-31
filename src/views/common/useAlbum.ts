import { getAlbum, getPlaylistDetail } from "@/api/music";
import { millisecondToTime } from "@/utils";
import { computed, ref, watch } from "vue";
import { useRoute } from 'vue-router';


export default function useAlbum() {
    const route = useRoute();
    const album = ref<any>({})
    const songData = ref<songTypes[]>([])
    const albumDt = computed(() => {
        const allDt = songData.value.reduce((pre: number, cur: any) => {
            pre += cur.song.duration;
            return pre
        }, 0)
        return Number(millisecondToTime(allDt).split(':')[0])
    })

    // 歌词
    watch(() => route.query.albumId, async (v) => {
        const albumId = Number(route.query.albumId)
        if (albumId) {
            const albumRes = await getAlbum(albumId)
            songData.value = albumRes.songs
            album.value = albumRes.album
        }
    }, {
        immediate: true
    })
    // 歌单
    watch(() => route.query.playListId, async (v) => {
        const playListId = Number(route.query.playListId)
        if (playListId) {
            const albumRes = await getPlaylistDetail(playListId)
            songData.value = albumRes.playlist.songs
            album.value = albumRes.playlist
        }
    }, {
        immediate: true
    })

    return {
        album,
        songData,
        albumDt,
        isAlbum: !!route.query.albumId
    }
}
