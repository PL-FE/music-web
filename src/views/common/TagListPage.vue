<template>
  <div class="newReleases-container">
    <h1 :style="{ fontSize: '40px' }">心情与流派</h1>
    <div class="section-container">
      <h2>热门</h2>
      <div class="section-conatainer">
        <template v-for="tag in tagListHot" :key="tag.id">
          <TagItem :data="tag" class="tag-item" />
        </template>
      </div>
    </div>
    <div
      v-for="toplist in tagMap"
      :key="toplist[0]?.category"
      class="section-container"
    >
      <h2>
        {{ toplist[0]?.categoryName }}
      </h2>
      <div class="section-conatainer">
        <template v-for="item in toplist" :key="item.id">
          <TagItem :data="item" class="tag-item" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPlaylistCatlist } from '@/api/music';
import { ref } from 'vue';
import TagItem from '@/components/item/TagItem.vue';

// 心情与流派
const tagMap = ref<any>({});
const tagListHot = ref([]);
getPlaylistCatlist().then((res: any) => {
  if (!res) {
    return;
  }
  const sub = res.sub || [];
  const categories = res.categories || [];
  tagMap.value = sub.reduce((pre: any, cur: any) => {
    cur.categoryName = categories[cur.category];
    pre[cur.category]
      ? pre[cur.category].push(cur)
      : (pre[cur.category] = [cur]);

    // 收集热门tag
    if (cur && cur.hot) {
      tagListHot.value.push(cur as never);
    }
    return pre;
  }, {});
});
</script>

<style lang="less" scoped>
.newReleases-container {
  padding: 64px 0;
  margin: 0 auto;
  overflow: hidden;
  width: 80%;

  .section-conatainer {
    display: inline-flex;
    flex-wrap: wrap;

    .tag-item {
      width: 250px;
    }
  }
}
</style>
<style lang="less" scoped>
@media screen and(max-width:414px) {
  .newReleases-container {
    padding: 64px 10px;
    width: 100%;

    .section-conatainer {
      width: 100%;
      .tag-item {
        width: 50%;
      }
    }
  }
}
</style>
