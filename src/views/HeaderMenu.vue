<template>
  <div class="header-container" :class="{ noScrollTop: !isScrollTop }">
    <div class="header-left" @click="goHome">
      <img
        :src="getImgSrc('music_default.svg')"
        width="25"
        :style="{ marginRight: '10px' }"
      />
      <span>Music</span>
    </div>
    <div class="header-menu">
      <SearchInput v-model:visibleSearch="visibleSearch" />
      <span
        v-for="_route in menuRouters"
        :key="_route.path"
        class="menu-item"
        :class="{ active: route.path === _route.path }"
        @click="changePage(_route.path)"
        >{{ _route.name }}</span
      >
      <span class="menu-item" @click="visibleSearch = true">搜索</span>
    </div>
    <div class="header-right">
      <template v-if="!userStore.user.account">
        <el-button @click="loginVisible = true">登陆</el-button>
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
import Login from '@/views/common/LoginPage.vue';
import SearchInput from '@/components/SearchInput.vue';
import { ref } from 'vue';
import { Logout, loginStatus } from '@/api/user';
import { defineUserStore } from '@/store/index';
import { useRouter, useRoute } from 'vue-router';
import { getImgSrc } from '@/utils';
const router = useRouter();
const route = useRoute();
const userStore = defineUserStore();
const routers = router.getRoutes();

defineProps({
  isScrollTop: {
    type: Boolean,
    default: false,
  },
});

const loginVisible = ref(false);
const menuRouters = routers.filter((route) => route.meta.isMenu);

const changePage = (path: string) => {
  router.push(path);
};
const handlerLogout = () => {
  Logout().then(() => {
    loginStatus().then((res) => {
      userStore.user = res;
    });
  });
};

const { visibleSearch } = useSearch();

function useSearch() {
  const visibleSearch = ref(false);
  return {
    visibleSearch,
  };
}

const goHome = () => {
  router.push({
    path: '/',
  });
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/index.less';

.header-container {
  position: sticky;
  top: 0;
  z-index: 999;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  transition: background 0.2s ease-out;
  background-color: rgba(0, 0, 0, 0);

  .header-left {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &.noScrollTop {
    background-color: @main-color;
    border-bottom: 1px solid @outline-color;
  }

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
