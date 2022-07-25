import HomePage from "@/views/pageContent/HomePage.vue";
import ExplorePage from "@/views/pageContent/ExplorePage.vue";
import LibraryPage from "@/views/pageContent/LibraryPage.vue";
import SingerChannel from "@/views/common/SingerChannel.vue";
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  { name: '首页', path: '/', component: HomePage, meta: { isMenu: true } },
  { name: '探索', path: '/explore', component: ExplorePage, meta: { isMenu: true } },
  { name: '资料库', path: '/library', component: LibraryPage, meta: { isMenu: true } },
  { name: 'singerChannel', path: '/singerChannel', component: SingerChannel },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router