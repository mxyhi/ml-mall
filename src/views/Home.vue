<script setup>
import { onMounted, ref } from 'vue';
import { getProductList, getCarouselChartData } from '@/api/home.js';

const carouselChartData = ref([]);

onMounted(async () => {
  carouselChartData.value = (
    await getCarouselChartData({ limit: 10, page: 1 })
  ).data.list;
  console.table(carouselChartData.value);
});

</script>

<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in carouselChartData" :key="item.id"
        ><img :src="item.pic_url" :alt="item.pic_url"
      /></van-swipe-item>
    </van-swipe>
  </div>
</template>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
