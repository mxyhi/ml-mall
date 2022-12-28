import Home from '@/views/Home.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { getToken } from '@/utils/auth';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

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
      component: Home,
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
        title: '购物车',
      },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User/index.vue'),
      meta: {
        isShowNav: true,
        title: '我的',
      },
    },
    {
      path: '/user-info',
      name: 'userInfo',
      component: () => import('@/views/User/Info.vue'),
      meta: {
        login: true,
        title: '个人信息',
      },
    },
    {
      path: '/edit-pwd',
      name: 'editPwd',
      component: () => import('@/views/User/EditPwd.vue'),
      meta: {
        login: true,
        title: '修改密码',
      },
    },
    {
      path: '/address-list',
      name: 'addressList',
      component: () => import('@/views/Address/index.vue'),
      meta: {
        login: true,
        title: '收货地址',
      },
    },
    {
      path: '/edit-address',
      name: 'edit',
      component: () => import('@/views/Address/Edit.vue'),
      meta: {
        login: true,
        title: "编辑",
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/User/Login.vue'),
      meta: {
        title: '登录',
      },
    },
    {
      path: '/goods/:goodsId',
      name: 'goodsDetail',
      component: () => import('@/views/GoodsDetail.vue'),
      meta: {},
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

router.beforeEach((to, from, next) => {
  NProgress.start();
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: from.path });
    }
  } else {
    if (to.meta.login) {
      next({ path: '/login' });
      return;
    }
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
