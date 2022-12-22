<script setup>
import { ref, watch } from 'vue';
import { RouterView ,useRoute} from 'vue-router';
import TabBar from './components/TabBar.vue';

/**
 * vue3路由用法相当于$route,返回当前路由地址
 */
const route = useRoute();

/**
 * 新建一个响应式数据来控制组件的存在
 */
const isShowNav = ref(false);

// 监视路由变动，然后控制TabBar组件的存在
watch(route, newVal => {
  isShowNav.value = newVal.meta.isShowNav;
});
</script>

<template>
  <div id="app">
    <RouterView />
    <!-- 在TabBar组件上控制 -->
    <TabBar v-if="isShowNav" />
  </div>
</template>

<style lang="scss" scoped>

</style>
