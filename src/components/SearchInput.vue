<template>
    <div class="search-container" v-if="visibleSearch">
        <div class="target-container">
            <el-input v-model="searchKey" size="large" @input="searchChange" />
            <div @click="close" class="target-button">关闭</div>
        </div>
        <div class="search-body" v-if="searchData">
            <template v-for=" (item, key) in searchData" :key="key">
                <div class="section" v-if="typeMap[key]">
                    <div class="section-title">
                        {{ typeMap[key] }}
                    </div>
                    <div class="section-body">
                        <div v-for=" item in searchData[key]" :key="item.id" class="section-item"
                            v-html="highlight(item.name)"></div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { searchSuggest } from '@/api/music';
import { ref } from 'vue'
defineProps({
    visibleSearch: {
        type: Boolean,
        defalult: false
    }
})
const emit = defineEmits(['update:visibleSearch'])
const searchKey = ref('')
const searchData = ref<any>()
const typeMap: any = {
    'songs': '单曲',
    'artists': '歌手',
    'albums': '专辑',
    'playlists': '歌单',
}
const searchChange = (val: string) => {
    searchSuggest(val).then((res: any) => {
        res = res || {}
        searchData.value = res
    })
}

const highlight = (text: string) => {
    const value = Function('"use strict";return (' + searchKey.value + ')')() + '';
    return text.replace(new RegExp(value, 'ig'), `<b style="color:#ff0000">${searchKey.value}</b>`);
}
const close = () => {
    emit('update:visibleSearch', false)
}
</script>

<style lang="less" scoped>
@import '@/assets/styles/index.less';

.search-container {
    position: absolute;
    left: 25%;
    width: 50%;
    right: 25%;
    z-index: 1000;

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