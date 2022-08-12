<template>
  <div class="explorePage-container">
    <div class="section-list-container">
      <div class="section navigation-button" @click="openNewReleasesPage">
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          class="section-icon"
        >
          <g>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.56 9.22L23 12l-2.44 2.78.34 3.68-3.61.82-1.89 3.18L12 21l-3.4 1.47-1.89-3.18-3.61-.82.34-3.69L1 12l2.44-2.79-.34-3.68 3.61-.81L8.6 1.54 12 3l3.4-1.46 1.89 3.18 3.61.82-.34 3.68zm-1.81 7.68l-.26-2.79L20.34 12l-1.85-2.11.26-2.79-2.74-.62-1.43-2.41L12 5.18l-2.58-1.1-1.43 2.41-2.74.61.26 2.78L3.66 12l1.85 2.1-.26 2.8 2.74.62 1.43 2.41L12 18.82l2.58 1.11 1.43-2.41 2.74-.62zM12 12.775V7.5h3v2h-2v5a2 2 0 11-2-2c.365 0 .705.105 1 .275z"
            ></path>
          </g>
        </svg>
        <b>新发行</b>
      </div>
      <div class="section navigation-button" @click="openToplist">
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          c
          class="section-icon"
        >
          <g c>
            <path
              d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"
              c
            ></path>
          </g>
        </svg>
        <b>排行榜</b>
      </div>
      <div class="section navigation-button" @click="openTaglist">
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          class="section-icon"
        >
          <g>
            <path
              d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
            ></path>
          </g>
        </svg>
        <b>心情与流派</b>
      </div>
    </div>

    <div class="section-playList">
      <SectionListSong key="2" title="新专辑和单曲" :column="6">
        <PlayListItem v-for="(it, i) in newPlaylists" :key="i" :data="it" />
      </SectionListSong>
    </div>

    <div class="section-tag">
      <SectionListSong key="2" title="心情与流派" :column="6">
        <TagItem v-for="(it, i) in playlistCatlist.sub" :key="i" :data="it" />
      </SectionListSong>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionListSong from '@/components/common/SectionList.vue';
import { getAlbumNewest, getPlaylistCatlist } from '@/api/music';
import PlayListItem from '@/components/item/PlayListItem.vue';
import TagItem from '@/components/item/TagItem.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const openNewReleasesPage = () => {
  router.push({ name: 'newReleases' });
};
const openToplist = () => {
  router.push({ name: 'toplist' });
};
const openTaglist = () => {
  router.push({ name: 'taglist' });
};

// 新专辑
const newPlaylists = ref<albumTypes[]>([]);
getAlbumNewest().then((res: any) => {
  newPlaylists.value = res.albums;
});

// 心情与流派
const playlistCatlist: any = ref([]);
getPlaylistCatlist().then((res: any) => {
  playlistCatlist.value = res;
});
</script>
<style lang="less" scoped>
.explorePage-container {
  padding: 64px 0;
  width: 80%;
  margin: 0 auto;

  .section-list-container {
    padding: 32px 0;
    display: flex;

    .section {
      cursor: pointer;
      display: flex;
      align-items: center;
      flex: 1;
      margin: 0 10px;
      line-height: 64px;
      height: 64px;
      padding: 0 10px;
      font-size: 24px;

      .section-icon {
        pointer-events: none;
        width: 24px;
        height: 24px;
        margin-right: 10px;
        fill: #aaaaaa;
      }
    }
  }
}
</style>
