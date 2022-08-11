import HomePage from '@/views/pageContent/HomePage.vue';
import ExplorePage from '@/views/pageContent/ExplorePage.vue';
import LibraryPage from '@/views/pageContent/LibraryPage.vue';
import SingerChannel from '@/views/common/SingerChannel.vue';
import playListPage from '@/views/common/playListPage.vue';
import NewReleasesPage from '@/views/common/NewReleasesPage.vue';
import ToplistPage from '@/views/common/ToplistPage.vue';
import TagListPage from '@/views/common/TagListPage.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import PlayerPage from '@/views/common/PlayerPage/index.vue';
import TagListReleasesPage from '@/views/common/TagListReleases.vue';

const routes = [
  { name: '首页', path: '/', component: HomePage, meta: { isMenu: true } },
  {
    name: '探索',
    path: '/explore',
    component: ExplorePage,
    meta: { isMenu: true },
  },
  {
    name: '资料库',
    path: '/library',
    component: LibraryPage,
    meta: { isMenu: true },
  },
  { name: 'singerChannel', path: '/singer_channel', component: SingerChannel },
  {
    name: 'playList',
    path: '/play_list',
    component: PlayerPage,
    meta: { transition: 'topSlide', transitionMode: 'in-out' },
  },
  { name: 'albumPage', path: '/album_page', component: playListPage },
  { name: 'playListPage', path: '/play_listPage', component: playListPage },
  { name: 'newReleases', path: '/new_releases', component: NewReleasesPage },
  { name: 'toplist', path: '/toplist', component: ToplistPage },
  { name: 'taglist', path: '/tagList', component: TagListPage },
  {
    name: 'tagListReleases',
    path: '/tagList_releases',
    component: TagListReleasesPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
