import { getAlbum } from "@/api/music";
import { millisecondToTime } from "@/utils";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute } from 'vue-router';


export default function useAlbum() {
    const route = useRoute();
    const album = ref<albumType>({})
    const songData = ref<songTypes[]>([])
    const albumDt = computed(() => {
        const allDt = songData.value.reduce((pre: number, cur: any) => {
            pre += cur.song.duration;
            return pre
        }, 0)
        return Number(millisecondToTime(allDt).split(':')[0])
    })
    watch(() => route.query.albumId, async (v) => {
        console.log(v);

        const albumId = Number(route.query.albumId)
        if (albumId) {
            const albumRes = await getAlbum(albumId)
            songData.value = albumRes.songs
            album.value = albumRes.album
        }
    }, {
        immediate: true
    })

    return {
        album,
        songData,
        albumDt
    }
}
