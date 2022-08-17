<template>
  <div v-if="visibleSearch" class="search-container">
    <div class="target-container">
      <el-input
        ref="inputRef"
        v-model="searchKey"
        size="large"
        @input="searchChange"
      >
        <template #prepend>
          <div class="back" @click="close">返回</div>
        </template>
      </el-input>
    </div>
    <div
      v-if="searchData && Object.keys(searchData).length"
      class="search-body"
    >
      <template v-for="(item, key) in typeMap" :key="key">
        <div v-if="typeMap[key]" class="section">
          <div class="section-title">
            {{ typeMap[key] }}
          </div>
          <div class="section-body">
            <div
              v-for="it in searchData[key]"
              :key="it.id"
              class="section-item"
              @click="hanldeSearch(key + '', it)"
              v-html="highlight(it.name)"
            ></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<!-- 顶部搜索 -->
<script setup lang="ts">
import { searchSuggest } from '@/api/music';
import { ref, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  visibleSearch: {
    type: Boolean,
    defalult: false,
  },
});
const emit = defineEmits(['update:visibleSearch']);
const searchKey = ref('');
const searchData = ref<any>();
const typeMap: any = {
  songs: '单曲',
  artists: '歌手',
  albums: '专辑',
  playlists: '歌单',
};
const searchChange = (val: string) => {
  if (!val) {
    clearData();
    return;
  }
  searchSuggest(val).then((res: any) => {
    res = res || {};
    searchData.value = res;
  });
};

function clearData() {
  searchData.value = null;
  searchKey.value = '';
}

const inputRef = ref<HTMLInputElement>(null as unknown as HTMLInputElement);
watch(
  () => props.visibleSearch,
  (val) => {
    if (val) {
      nextTick(() => {
        if (inputRef.value) {
          inputRef.value.focus();
        }
      });
    } else {
      clearData();
    }
  }
);

const highlight = (text: string) => {
  const value =
    Function('"use strict";return ("' + searchKey.value + '")')() + '';
  return text.replace(
    new RegExp(value, 'ig'),
    `<b style="color:#ff0000">${searchKey.value}</b>`
  );
};
const close = () => {
  emit('update:visibleSearch', false);
};

const hanldeSearch = (type: string, it: any) => {
  console.log(type);

  switch (type) {
    case 'songs':
      router.push({
        name: 'playList',
        query: {
          id: it.id,
        },
      });
      break;
    case 'artists':
      router.push({
        name: 'singerChannel',
        query: {
          singerId: it.id,
        },
      });
      break;
    case 'albums':
      router.push({
        name: 'albumPage',
        query: {
          albumId: it.id,
        },
      });
      break;
    case 'playlists':
      router.push({
        name: 'albumPage',
        query: {
          playListId: it.id,
        },
      });
      break;
  }
  close();
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/index.less';
.back {
  cursor: pointer;
}

.search-container {
  width: 60vw;
  border: 1px solid #333;
  border-radius: 2px;

  .target-container {
    display: flex;
  }

  .target-button {
    white-space: nowrap;
    display: flex;
    background-color: @sub-color;
    color: #fff;
    cursor: pointer;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
  }

  .search-body {
    border-top: 1px solid #333;
    width: 100%;
    background-color: @sub-color;
    padding: 20px;
    box-sizing: border-box;

    max-height: 70vh;
    overflow: auto;

    .section-title {
      padding: 10px 0;
    }

    .section-body {
      .section-item {
        padding-left: 20px;
        cursor: pointer;
        line-height: 40px;

        &:hover {
          background-color: #383838;
        }
      }
    }
  }
}
</style>
