<template>
  <div class="newReleases-container">
    <h1 :style="{ fontSize: '40px' }">排行榜</h1>
    <div class="section-container">
      <div class="section-conatainer">
        <template v-for="item in toplist" :key="item.id">
          <PlayListItem :data="item" class="section-item" :sizes="150" />
        </template>
      </div>
    </div>
    <div class="section-container">
      <h2>全球榜</h2>
      <div class="section-conatainer">
        <template v-for="item in toplistOther" :key="item.id">
          <PlayListItem :data="item" class="section-item" :sizes="150" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getToplist } from '@/api/music';
import { ref } from 'vue';
import PlayListItem from '@/components/item/PlayListItem.vue';
// 新专辑
const toplist = ref<any[]>([]);
const toplistOther = ref<any[]>([]);

getToplist().then((res: any) => {
  res.list.forEach((item: any) => {
    if (item.ToplistType) {
      toplist.value.push(item);
    } else {
      toplistOther.value.push(item);
    }
  });
});
</script>

<style lang="less" scoped>
.newReleases-container {
  padding: 64px 0;
  margin: 0 auto;
  overflow: hidden;
  width: 80%;

  .section-conatainer {
    display: flex;
    flex-wrap: wrap;

    .section-item {
      margin-right: 40px;
      margin-bottom: 45px;
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
      display: flex;
      flex-wrap: wrap;

      .section-item {
        margin-right: 20px;
        margin-bottom: 25px;
      }
    }
  }
}
</style>
