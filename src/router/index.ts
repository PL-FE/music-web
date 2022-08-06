import HomePage from "@/views/pageContent/HomePage.vue";
import ExplorePage from "@/views/pageContent/ExplorePage.vue";
import LibraryPage from "@/views/pageContent/LibraryPage.vue";
import SingerChannel from "@/views/common/SingerChannel.vue";
import AlbumPage from "@/views/common/AlbumPage.vue";
import NewReleasesPage from "@/views/common/NewReleasesPage.vue";
import ToplistPage from "@/views/common/ToplistPage.vue";
import TagListPage from "@/views/common/TagListPage.vue";
import { createRouter, createWebHashHistory } from 'vue-router'
import PlayerPage from "@/views/common/PlayerPage/index.vue";

const routes = [
  { name: '首页', path: '/', component: HomePage, meta: { isMenu: true } },
  { name: '探索', path: '/explore', component: ExplorePage, meta: { isMenu: true } },
  { name: '资料库', path: '/library', component: LibraryPage, meta: { isMenu: true } },
  { name: 'singerChannel', path: '/singer_channel', component: SingerChannel },
  { name: 'playList', path: '/play_list', component: PlayerPage, meta: { transition: 'topSlide', transitionMode: 'in-out' } },
  { name: 'albumPage', path: '/album_page', component: AlbumPage },
  { name: 'playListPage', path: '/play_listPage', component: AlbumPage },
  { name: 'newReleases', path: '/new_releases', component: NewReleasesPage },
  { name: 'toplist', path: '/toplist', component: ToplistPage },
  { name: 'taglist', path: '/tagList', component: TagListPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router