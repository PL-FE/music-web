<template>
    <div class="song-container">
        <span class="song-pic-container" @click="playSong(data.id)">
            <img :src="data.picUrl" class="song-pic" />
            <el-icon class="song-play">
                <CaretRight />
            </el-icon>
        </span>

        <div class="song-details">
            <div>
                {{ data.name }}
            </div>
            <div class="text-details">
                {{ data.song.artists.map((art: any) => art.name).join('、') }}-{{ data.song.name }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CaretRight } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
const playSong = (id: number) => {
    router.push({
        path: "/song",
        query: {
            id
        }
    })

}
</script>

<style  lang="less" scoped>
.song-container {
    display: flex;
    align-items: center;
    width: 500px;
    height: 50px;
    box-sizing: border-box;
    padding-right: 24px;
    margin-bottom: 16px;
    font-size: 14px;
    cursor: pointer;

    .song-pic-container {
        display: inline-block;
        height: 100%;
        position: relative;

        .song-pic {
            height: 100%;
        }

        .song-play {
            display: none;
        }
    }

    .song-details {
        padding: 0 15px;
    }

    // 鼠标hover到歌曲条目上，子元素的样式
    &:hover {
        .song-pic {
            filter: brightness(10%); // 变暗，模仿遮罩
        }

        .song-play {
            display: block;
            font-size: 25px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>