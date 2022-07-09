import HomePage from "@/views/pageContent/HomePage.vue";
import ExplorePage from "@/views/pageContent/ExplorePage.vue";
import LibraryPage from "@/views/pageContent/LibraryPage.vue";
import PlayerPage from "@/views/common/PlayerPage/index.vue";
import {createRouter, createWebHashHistory} from 'vue-router'
const routes = [
  { path: '/', component: HomePage },
  { path: '/explore', component: ExplorePage },
  { path: '/library', component: LibraryPage },
  { path: '/song', component: PlayerPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router