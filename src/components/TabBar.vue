<script setup>
import { ref } from 'vue';

/**
 * 选中index
 */
const active = ref(0);
</script>

<template>
  <div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="balance-list-o" to="/recommend" replace
        >种草文章</van-tabbar-item
      >
      <van-tabbar-item icon="cart-o" to="/cart" replace>购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user" replace>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped></style>
