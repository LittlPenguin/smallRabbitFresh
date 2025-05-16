<script setup>
import { getGoodsDetailHotAPI } from '@/api/goods.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

// 获取热门商品
const goodsDetailHot = ref([])
const getGoodsDetailHot = async () => {
  const {
    data: { result },
  } = await getGoodsDetailHotAPI({
    id: route.params.id,
    type: props.hotType,
    limit: 3,
  })
  goodsDetailHot.value = result
}

onMounted(async () => {
  await getGoodsDetailHot()
})

// 接收父组件传递过来的热门类型
const props = defineProps({
  hotType: {
    type: Number,
  },
})
</script>
<template>
  <div class="goods-hot">
    <h3>{{ hotType === 1 ? '24小时热榜' : '周热榜' }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in goodsDetailHot" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
