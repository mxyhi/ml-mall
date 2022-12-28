<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getGoodsDetail } from '@/api/goods';
import { addCart, editCart } from '@/api/cart';
import { useCartStore } from '@/stores/cart';
import { addCollection } from '@/api/collection';

const route = useRoute();

const cartStore = useCartStore();
/**
 * 商品id
 */
const goodsId = route.params.goodsId;
/**
 * 商品详情
 */
const goodsDetail = ref({});

onMounted(async () => {
  const res = await getGoodsDetail(goodsId);
  goodsDetail.value = res.data;
  console.table(goodsDetail.value);
});

const isStar = ref(false);

/**
 * 点击购物车事件
 */
const toCart = () => {
  console.log('to cart');
};

/**goodsDetail
 * 收藏事件
 */
const toggleStar = async goodsInfo => {
  isStar.value = !isStar.value;
  console.table(goodsInfo);
  if (isStar.value) {
    //  const res= addCollection({})
    console.log();
    console.log('收藏');
  } else {
    console.log('取消收藏');
  }
};

/**
 * 添加到购物车事件
 */
const addToCart = async id => {
  console.table(cartStore.data);
  const hasGoods = cartStore.data?.find(it => it.goods_id == id);
  console.table(hasGoods);
  if (hasGoods) {
    const res = await editCart({
      goods_id: id,
      count: hasGoods.count + 1,
      id: hasGoods.id,
    });
    console.table(res);
  } else {
    const res = await addCart({ goods_id: id, count: 1 });
    console.table(res);
  }
  cartStore.changeCart();
};
</script>

<template>
  <main>
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="$router.back()"
      fixed
      placeholder
    />
    <div class="container">
      <div class="body_box">
        <div class="img_box">
          <img :src="goodsDetail.pic_url" :alt="goodsDetail.pic_url" />
        </div>
        <p class="price">￥{{ goodsDetail.price }}</p>
        <div class="goods_name">{{ goodsDetail.name }}</div>
        <p class="brands">品牌商：{{ goodsDetail.brand }}</p>
        <div class="express_prompt">
          <span>
            库存：<span>{{ goodsDetail.stock }}</span>
          </span>
          <span>免邮费 顺丰快递</span>
        </div>
        <div class="detail">
          <p class="title">商品详情</p>
          <p class="content">{{ goodsDetail.detail_info }}</p>
        </div>
      </div>
    </div>
    <!-- 动作栏 -->
    <van-action-bar>
      <van-action-bar-icon
        :badge="cartStore?.count ? cartStore.count : ''"
        icon="cart-o"
        text="购物车"
        @click="$router.push('/cart')"
      />
      <van-action-bar-icon
        :icon="isStar ? 'star' : 'star-o'"
        text="收藏"
        color="#ff5000"
        @click="toggleStar(goodsDetail)"
      />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="addToCart(goodsId)"
      />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
  </main>
</template>

<style lang="scss" scoped>
// 内边距离
$pad: 8px;
.container {
  margin-bottom: 50px;
}
.body_box {
  background-color: white;
  margin: 0 10px;
  .img_box {
    width: 100%;
    text-align: center;
    img {
      width: 100%;
    }
  }
  .goods_name {
    padding: 0 $pad;
    background-color: white;
    font-size: 18px;
  }
  .brands,
  .express_prompt {
    padding: 0 $pad;
    display: flex;
    justify-content: space-between;
    color: #999999;
    font-size: 14px;
    margin: 6px 0;
  }
  .price {
    padding: 0 $pad;
    color: #f63515;
    font-size: 22px;
    margin: 6px 0;
  }
  .detail {
    .title {
      margin: 10px 0;
      font-weight: bold;
      font-size: 14px;
      color: black;
      text-align: center;
    }
    .content {
      padding: 0 12px;
      font-size: 16px;
      color: rgb(84, 84, 84);
      text-indent: 2em;
    }
  }
}
</style>
