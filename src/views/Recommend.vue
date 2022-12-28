<script setup>
import { onMounted } from 'vue';
import { articleList } from '@/api/recommend';

onMounted(async () => {
  console.log(await articleList({ limit: 10, page: 1 }));
});
</script>

<template>
  <div>种草文章</div>
</template>

<style lang="scss" scoped></style>
