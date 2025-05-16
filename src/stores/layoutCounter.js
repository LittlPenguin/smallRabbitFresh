import { ref } from "vue";
import { defineStore } from 'pinia'

import { getHomeCategoryAPI } from '@/api/layout.js'

export const useLayoutCounter = defineStore('layoutCounter', () => {
  // 分类数据
  const categoryList = ref([])

  // 获取首页分类
  const getHomeCategory = async () => {
    const {
      data: { result },
    } = await getHomeCategoryAPI()
    categoryList.value = result
  }

  return {
    categoryList,
    getHomeCategory
  }
}, {
  persist: true,
},)