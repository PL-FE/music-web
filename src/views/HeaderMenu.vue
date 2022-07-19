<template>
    <div class="header-container">
        <div class="header-left">Logo</div>
        <div class="header-menu">
            <span class="menu-item" :class="{ active: route.path === _route.path }" @click="changePage(_route.path)"
                v-for="_route in menuRouters" :key="_route.path">{{
                        _route.name
                }}</span>
            <span class="menu-item">搜索</span>
        </div>
        <div class="header-right">
            <template v-if="!userStore.user.account">
                <el-button text @click="loginVisible = true">登陆</el-button>
            </template>
            <template v-else>
                <el-dropdown>
                    <el-avatar :size="30" :src="userStore?.user?.profile?.avatarUrl" />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="handlerLogout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </div>
    </div>
    <Login v-model:visible="loginVisible" />
</template>

<script lang="ts" setup>
import Login from '@/components/Login.vue';
import { ref } from 'vue';
import { Logout, loginStatus } from '@/api/user'

import { defineUserStore, defineMusicStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const userStore = defineUserStore()
const musicStore = defineMusicStore()
const routers = router.getRoutes()

const loginVisible = ref(false)
const menuRouters = routers.filter(route => route.meta.isMenu)

const changePage = (path: string) => {
    router.push(path)
    musicStore.isShow = false
}
const handlerLogout = () => {
    Logout().then(() => {
        loginStatus().then(res => {
            userStore.user = res
        })
    })
}
</script>

<style lang="less" scoped>
.header-container {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .active {
        opacity: 1;
    }

    .menu-item {
        padding: 0 22px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.5;

        &:hover,
        &.active {
            opacity: 1;
        }
    }
}
</style>