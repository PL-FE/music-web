import HomePage from "@/views/pageContent/HomePage/index.vue";
import ExplorePage from "@/views/pageContent/ExplorePage.vue";
import LibraryPage from "@/views/pageContent/LibraryPage.vue";
import SingerChannel from "@/views/common/SingerChannel.vue";
import AlbumPage from "@/views/common/AlbumPage.vue";
import { createRouter, createWebHashHistory } from 'vue-router'
import PlayerPage from "@/views/common/PlayerPage/index.vue";

const routes = [
  { name: '首页', path: '/', component: HomePage, meta: { isMenu: true } },
  { name: '探索', path: '/explore', component: ExplorePage, meta: { isMenu: true } },
  { name: '资料库', path: '/library', component: LibraryPage, meta: { isMenu: true } },
  { name: 'singerChannel', path: '/singerChannel', component: SingerChannel },
  { name: 'playList', path: '/playList', component: PlayerPage, meta: { transition: 'topSlide', transitionMode: 'in-out' } },
  { name: 'albumPage', path: '/albumPage', component: AlbumPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router