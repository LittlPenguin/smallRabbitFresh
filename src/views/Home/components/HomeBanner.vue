<script setup>
import { onMounted, ref } from 'vue'
import { getHomeBannerAPI } from '@/api/home'

const homeBanner = ref([])
// 获取轮播图数据
const getHomeBanner = async () => {
  const {
    data: { result },
  } = await getHomeBannerAPI(1)
  homeBanner.value = result
}
onMounted(async () => {
  await getHomeBanner()
})
</script>

<template>
  <div class="home-banner">
    <el-carousel trigger="click" height="500px">
      <el-carousel-item v-for="item in homeBanner" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  img {
    width: 100%;
    height: 500px;
  }
}
</style>
