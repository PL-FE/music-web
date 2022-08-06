<template>
    <div class="newReleases-container">
        <div class="section-playList">
            <SectionListSong title="新专辑和单曲" :column="6" key="2">
                <PlayListItem v-for="(it, i) in newPlaylists" :key="i" :data="it" />
            </SectionListSong>
        </div>

        <div class="section-tag">
            <SectionListSong title="心情与流派" :column="6" key="2">
                <TagItem v-for="(it, i) in playlistCatlist.sub" :key="i" :data="it" />
            </SectionListSong>
        </div>
    </div>
</template>

<script setup lang="ts">
import SectionListSong from '@/components/common/SectionList.vue'
import { getAlbumNewest, getPlaylistCatlist } from '@/api/music'
import PlayListItem from '@/components/PlayListItem.vue'
import TagItem from '@/components/TagItem.vue'
import { ref } from 'vue';
// 新专辑和单曲
const newPlaylists = ref<albumTypes[]>([])
getAlbumNewest().then((res: any) => {
    newPlaylists.value = res.albums
})

// 心情与流派
const playlistCatlist: any = ref([])
getPlaylistCatlist().then((res: any) => {
    playlistCatlist.value = res
})
</script>

<style lang="less" scoped>
.newReleases-container {
    padding: 64px 0;
    width: 80%;
    margin: 0 auto;

}
</style>