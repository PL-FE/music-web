<template>
    <div class="header-container">
        <div class="header-left">Logo</div>
        <div class="header-menu">
            <span class="menu-item">首页</span>
            <span class="menu-item">探索</span>
            <span class="menu-item">资料库</span>
            <span class="menu-item">搜索</span>
        </div>
        <div class="header-right">
            <template v-if="userStore.user.code !== 200">
                <el-button text @click="loginVisible = true">登陆</el-button>
            </template>
            <template v-else>
                <el-avatar :size="30" :src="userStore.user.profile.avatarUrl" />
            </template>
        </div>
    </div>
    <Login v-model:visible="loginVisible" />
</template>

<script lang="ts" setup>
import Login from '@/components/Login.vue';
import { ref, watchEffect } from 'vue';

import { defineUserStore } from '@/store/index'
const userStore = defineUserStore()

const loginVisible = ref(false)

watchEffect(() => {

})
</script>

<style lang="less" scoped>
.header-container {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .menu-item {
        padding: 0 22px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.5;

        &:hover {
            opacity: 1;
        }
    }
}
</style>