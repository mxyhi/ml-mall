<script setup>
import { usePageLoad } from '@/hooks/usePageLoad.js';
const props = defineProps({
  articleData: {
    type: Array,
    default: [],
  },
  apiFn: {
    type: Function,
    default: () => [],
  },
  params: {
    type: Object,
    default: {},
  },
});

const { data, onLoad, loading, finished } = usePageLoad(
  props.apiFn,
  props.params
);
</script>

<template>
  <div>
    <van-list
      class="content"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset
    >
      <van-card
        class="item"
        v-for="article in data"
        :thumb="article.pic_url"
        @click="
          $router.push({
            path: '/article-detail',
            query: {
              articleId: article.id,
            },
          })
        "
      >
        <template #title>
          <p class="title">
            {{ article.title }}
          </p>
        </template>
        <template #desc
          ><p class="detail">{{ article.detail }}</p></template
        >
        <template #price>
          <p class="desc">
            {{ article.desc }}
          </p>
        </template>
        <template #num>
          <p>{{ article.created_at }}</p>
        </template>
      </van-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.content {
  .item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .title {
      font-size: 16px;
      color: black;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .detail {
      margin-top: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgb(105, 105, 105);
    }
    .desc {
      color: rgb(105, 105, 105);
      font-weight: normal;
    }
  }
}
</style>
