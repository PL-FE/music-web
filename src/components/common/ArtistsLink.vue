<template>
  <span
    class="line-text-overflow text-details artistsLink-container"
    :title="artistsText"
  >
    <span v-for="(art, index) in data.artists" :key="art.id">
      <label class="artists-label" @click="artistsDetails(art.id)">
        {{ art.name }}
      </label>
      <template v-if="data.artists.length !== index + 1">、</template>
    </span>
  </span>
</template>

<!-- 歌手超链接 -->
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
});

const artistsText = ref('');
watchEffect(() => {
  artistsText.value = `${props.data.artists
    .map((art: any) => art.name)
    .join('、')}`;
});
const artistsDetails = (id: number) => {
  router.push({
    name: 'singerChannel',
    query: {
      singerId: id,
    },
  });
};
</script>

<style lang="less" scoped>
.artistsLink-container {
  display: inline-block;
}

.artists-label {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
