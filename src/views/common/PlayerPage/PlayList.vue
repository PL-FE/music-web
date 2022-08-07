<template>
    <div class="play-list-container">
        <ul>
            <li v-for="(item) in tabs" class="text-unselect" :class="{ active: item.value == activeName }"
                @click="activeName = item.value">
                {{ item.label }}
            </li>
        </ul>
        <div class="play-list-content">
            <div v-show="activeName === 'next'">
                <NextPlayList />
            </div>
            <div v-show="activeName === 'lyric'">
                <LyricView />
            </div>
            <div v-show="activeName === 'relevant'">
                <RelevantView />
            </div>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { ref } from 'vue'
import LyricView from './LyricView.vue'
import NextPlayList from './NextPlayList.vue'
import RelevantView from './RelevantView.vue'
const activeName = ref('next')
const tabs = [
    {
        label: '接下来播放',
        value: 'next',
    },
    {
        label: '歌词',
        value: 'lyric',
    },
    {
        label: '相关内容',
        value: 'relevant',
    },
]

</script>
<style lang="less" scoped>
.play-list-container {
    display: flex;
    flex-direction: column;

    ul {
        display: flex;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        justify-content: center;
        align-items: center;
    }

    ul li {
        line-height: 50px;
        flex: 1;
        cursor: pointer;

        &.active {
            opacity: 1;
        }
    }

    .play-list-content {
        flex: 1;
        overflow: hidden;

        >div {
            height: 100%;
        }
    }
}
</style>
