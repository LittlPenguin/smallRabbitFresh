<script setup>
import { getCategorySubAPI, getCategorySubGoodsAPI } from '@/api/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import HomeItem from '@/views/Home/components/HomeItem.vue'
const route = useRoute()

const categorySub = ref({})
// 获取分类列表数据
const getCategorySub = async () => {
  const {
    data: { result },
  } = await getCategorySubAPI(route.params.id)
  categorySub.value = result
}

const CategorySubGoods = ref([])
const CategorySubGoodsData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
})
// 获取分类商品数据
const getCategorySubGoods = async () => {
  const {
    data: { result },
  } = await getCategorySubGoodsAPI(CategorySubGoodsData.value)
  CategorySubGoods.value = result
}
onMounted(async () => {
  await getCategorySub()
  await getCategorySubGoods()
})

// 切换排序
const handleClick = async () => {
  await getCategorySubGoods()
}

// 加载更多
const disableInfinite = ref(false)
const load = async () => {
  const {
    data: {
      result: { items },
    },
  } = await getCategorySubGoodsAPI(CategorySubGoodsData.value)
  if (items.length === 0) {
    console.log(123)

    disableInfinite.value = true
    return
  }
  CategorySubGoods.value.items = [...CategorySubGoods.value.items, ...items]
}
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categorySub.parentId}` }"
          >{{ categorySub.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categorySub.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="CategorySubGoodsData.sortField" @tab-click="handleClick">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disableInfinite">
        <HomeItem v-for="item in CategorySubGoods.items" :good="item" :key="item.id"></HomeItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

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

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
