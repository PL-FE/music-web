import HomePage from "@/views/pageContent/HomePage.vue";
import ExplorePage from "@/views/pageContent/ExplorePage.vue";
import LibraryPage from "@/views/pageContent/LibraryPage.vue";
// import PlayerPage from "@/views/common/PlayerPage/index.vue";
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  { name: '首页', path: '/', component: HomePage, meta: { isMenu: true } },
  { name: '探索', path: '/explore', component: ExplorePage, meta: { isMenu: true } },
  { name: '资料库', path: '/library', component: LibraryPage, meta: { isMenu: true } },
  // { path: '/song', component: PlayerPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router