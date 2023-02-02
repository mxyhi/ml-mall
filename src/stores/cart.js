import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { getCartList } from '@/api/cart';

export const useCartStore = defineStore('cart', () => {
  const count = ref(0);
  const data = ref([]);
  const changeCart = async () => {
    const res = await getCartList({ page: 1, limit: 100 });
    if (res.code === 1) {
      count.value = res.data.count;
      data.value = res.data.list;
      console.table(res.data.list);
    }
  };
  const reset = () => {
    count.value = 0;
    data.value = [];
  };

  return { count, data, changeCart, reset };
});
