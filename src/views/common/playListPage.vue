<template>
  <div class="album-page-container">
    <div class="album-info module">
      <el-image
        :src="(album.picUrl || playList.picUrl) + '?param=300y300'"
        class="img"
      />
      <div v-show="album.name || playList.name" class="album-details">
        <h1 class="album-name">{{ album?.name || playList.name }}</h1>
        <div class="album-subtitle">
          <p>
            {{ isAlbum ? '专辑' : '歌单' }} •
            {{ album?.artist?.name || playList?.creator?.nickname }} •
            <span class="pc">
              {{
                timestampToTime(
                  isAlbum ? album.publishTime : playList?.updateTime
                )
              }}
            </span>
            <span class="mobile">
              {{
                timestampToTime(
                  isAlbum ? album.publishTime : playList?.updateTime
                ).split('-')[0]
              }}
            </span>
          </p>
          <p>{{ songData.length }} 首歌曲 • {{ duration }} 分钟</p>
        </div>
        <p
          ref="artistTextRef"
          class="album-text pc"
          :class="{ 'line-text-overflow-2': !expanding }"
        >
          {{ album.description || playList.description }}
        </p>
        <p v-if="hasOverflow" class="toggle pc" @click="toggle">
          {{ expanding ? '收起' : '展开' }}
        </p>
      </div>
    </div>
    <div class="album-container-body">
      <PlayListTable :data="songData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { timestampToTime } from '@/utils';
import { ref, watchEffect, nextTick } from 'vue';
import PlayListTable from '@/components/PlayListTable.vue';
import usePlayList from '@/views/common/useplayListPage';

const { album, playList, songData, duration, isAlbum } = usePlayList();

const expanding = ref(false);
const toggle = () => {
  expanding.value = !expanding.value;
};
const artistTextRef = ref<any>({});
const hasOverflow = ref(false);
watchEffect(() => {
  if (artistTextRef.value && artistTextRef.value && songData.value.length) {
    nextTick(() => {
      hasOverflow.value =
        artistTextRef.value.scrollHeight > artistTextRef.value.clientHeight;
    });
  }
});
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
}
</style>

<style lang="less" scoped>
@media screen and(max-width:414px) {
  .album-page-container {
    width: 100%;
    padding: 100px 10px;
    padding-bottom: 0;
    box-sizing: border-box;
    .img {
      width: 150px;
      height: 150px;
      padding-right: 15px;
    }
    .album-info {
      .album-details {
        flex: 1;
        text-align: center;
        width: auto;
        margin-left: 0px;
      }
    }
  }
}
</style>
