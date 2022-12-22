<script setup>
import { getProductList } from '@/api/home.js';
import { query } from '../utils/query';

const onClick = async () => {
  console.log(
    query({
      keyword: '',
      limit: 10,
      page: 1,
      sort: 'price_down',
    })
  );
  const res = await getProductList({
    keyword: '',
    limit: 10,
    page: 1,
    sort: 'price_down',
  });
  console.log(res);
  console.log('s');
};
</script>

<template>
  <div>首页</div>
  <van-button @click="onClick" type="primary">主要按钮</van-button>
</template>
