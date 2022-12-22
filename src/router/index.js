import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        isShowNav: true,
      },
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('@/views/Recommend.vue'),
      meta: {
        isShowNav: true,
      },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Cart.vue'),
      meta: {
        isShowNav: true,
      },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User.vue'),
      meta: {
        isShowNav: true,
      },
    },
    // 访问没有的路由直接跳往首页
    {
      path: '/:toHome*',
      name: 'toHome',
      redirect: '/home',
    },
  ],
});

export default router;
