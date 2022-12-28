<script setup>
import { getAddressList } from '@/api/address';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let page = 1;
const limit = 10;
let count = 0;
const router = useRouter();
const addressScope = ref([]);
const addressList = ref([]);

const chosenAddressId = ref('1');

const onEdit = (it, index) => {
  console.log(it);
  router.push({
    path: '/edit-address',
    query: {
      addressInfo: btoa(
        encodeURI(JSON.stringify({ ...addressScope.value[index] }))
      ),
    },
  });
};

const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
  // 数据全部加载完成
  const res = await getAddressList({ page: page++, limit });
  console.log(res);
  console.table(res.data.list);
  if (res.code === 1) {
    count = res.data.count;
    console.log(res.data.list === null);
    loading.value = false;
    addressScope.value.push(...res.data.list);
    addressList.value.push(
      ...res.data.list?.map?.(it => ({
        id: it.id,
        name: it.name,
        tel: it.phone,
        address: it.province.concat(
          it.city,
          it.town,
          it.street !== 'null' ? it.street : '',
          it.detail
        ),
        isDefault: it.is_default ? true : false,
      }))
    );
    console.table(addressScope.value);
    console.table(addressList.value);
  }
  console.log(page, parseInt(count / limit) + 1, count, page, limit);
  if (page > parseInt(count / limit) + 1) {
    finished.value = true;
    return;
  }
};
</script>

<template>
  <div class="container">
    <van-nav-bar
      :title="$route.meta.title"
      placeholder
      fixed
      left-arrow
      @click-left="$router.back()"
    />
    <van-list
      v-model:loading="loading"
      :finished="finished"
      @load="onLoad"
      finished-text="没有更多了"
      offset
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="$router.push('/edit-address')"
        @edit="onEdit"
      />
    </van-list>
    <van-back-top right="20px" bottom="60px" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  background: #ededed;
  height: 100%;
}
</style>
