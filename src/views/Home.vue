<script setup>
import { onMounted, ref } from 'vue';
import {
  getProductList,
  getCarouselChartData,
  getClassification,
} from '@/api/home.js';
import Goods from '@/components/Goods.vue';

/**
 * 轮播图数据
 */
const carouselChartData = ref([]);

/**
 * 商品数据
 */
const commodityData = ref([]);

onMounted(async () => {
  // 获取轮播图数据
  carouselChartData.value = (
    await getCarouselChartData({ limit: 10, page: 1 })
  ).data.list;
  console.table(carouselChartData.value);
  // 获取商品数据
  commodityData.value = (
    await getProductList({ limit: 20, page: 1 })
  ).data.list;
  console.table(commodityData.value);
  const res = await getClassification(1);
  console.log(res);
});
</script>

<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in carouselChartData" :key="item.id"
        ><img :src="item.pic_url" :alt="item.pic_url"
      /></van-swipe-item>
    </van-swipe>
    <!-- 商品展示 -->
    <Goods :data-item="commodityData">
      <template #title>
        <div>商品</div>
      </template>
    </Goods>
    <van-back-top right="20px" bottom="60px" />
  </div>
</template>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  width: 100%;
  height: 168px;
  img {
    width: 100%;
  }
}
</style>
