<script setup>
import { logout, getUserInfo } from '@/api/auth';
import { getToken, removeToken } from '@/utils/auth';
import { useUserStore } from '@/stores/user';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { resetLogin } from '@/utils/userCache';
import getAvatar from '@/utils/avatar';
import { lastLoginUser } from '@/utils/userCache';

const userStore = useUserStore();
const isLogin = ref(false);
const router = useRouter();
console.log(userStore);
const currentUser = lastLoginUser();
console.log(currentUser);

onMounted(async () => {
  if (getToken()) {
    userStore.setInfo(currentUser);
    isLogin.value = true;
    const res = await getUserInfo(currentUser);
    console.log(res);
  } else {
    userStore.reset();
  }
});

const toUserInfo = () => {
  router.push('/user-info');
};

const logOut = async _ => {
  const res = await logout(getToken());
  console.log(res);
  if (res.code === 1) {
    removeToken();
    resetLogin();
    router.go(0);
  }
};
</script>

<template>
  <main class="container">
    <van-nav-bar
      :title="$route.meta.title"
      placeholder
      fixed
      left-arrow
      @click-left="$router.back()"
    />
    <div v-if="isLogin" class="content">
      <van-card
        class="user_card"
        :thumb="userStore.avatar ? userStore.avatar : getAvatar()"
        @click="toUserInfo"
      >
        <template #title>
          <p class="user_name">{{ userStore.name }}</p>
        </template>
        <template #tags>
          <p class="user_sign">{{ userStore.sign }}</p></template
        >
        <template #desc>
          <p class="user_sex">{{ userStore.sex ? '男' : '女' }}</p>
        </template>
      </van-card>
      <van-cell icon="logistics" title="我的收货地址" is-link to="/address-list" />
      <div class="logout_box">
        <van-button
          v-if="isLogin"
          class="logout_btn"
          type="warning"
          @click="logOut"
          >退出登录</van-button
        >
      </div>
    </div>
    <div v-else class="no_login_content">
      <van-empty class="thumbnail" description="未登录">
        <van-button
          type="primary"
          class="login_btn"
          @click="router.push('/login')"
          >登录</van-button
        >
      </van-empty>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main.container {
  .user_card {
    background: #fff;
    margin-bottom: 10px;
    .user_name {
      margin-top: 2px;
      font-size: 20px;
    }
    .user_sex {
      margin: 6px 0;
    }
  }
  .content {
    width: 100%;
    .logout_box {
      margin-top: 18px;
      padding: 0 10px;
      .logout_btn {
        width: 100%;
      }
    }
  }
  .no_login_content {
    .login_btn {
      width: 180px;
    }
  }
}
</style>
