<template>
    <div class="artistsItem">
        <div class="img-container">
            <el-avatar :size="200" :src="data.picUrl + '?params=200y200'" @click="openPlayListPage" />
        </div>
        <div :title="data.name" class="line-text-overflow-2 artists-name">
            {{ data.name }}
        </div>
        <div :title="data.name" class="line-text-overflow-2 artists-fans">
            {{ fansCount }}位粉丝
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})

const openPlayListPage = () => {
    router.push({
        name: 'singerChannel', query: {
            singerId: props.data.id
        }
    })
}

const fansCount = computed(() => {
    const _fansCount: number = props.data.fansCount
    if (_fansCount > 10000) {
        return Math.floor(_fansCount / 10000) + '万'
    }
    return _fansCount
})
</script>

<style lang="less" scoped>
@import '@/assets/styles/index.less';

.img-container {
    cursor: pointer;
    margin-bottom: 15px;
}

.artistsItem {

    >div {
        width: 200px;
    }

}

.artists-name {
    text-align: center;
    font-weight: 700;
}

.artists-fans {
    padding-top: 6px;
    text-align: center;
    color: @unactivated-color;
}
</style>