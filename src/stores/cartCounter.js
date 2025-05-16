
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLoginCounter } from './loginCounter'
import { addCartAPI, getCartAPI, delCartAPI } from '@/api/cart'

export const useCartCounter = defineStore('cartCounter', () => {
    // 登录状态
    const loginCounter = useLoginCounter()
    const isLogin = computed(() => loginCounter.loginData.token)

    // 购物车列表
    const cartList = ref([])
    // 获取购物车列表
    const getCartList = async () => {
        const res = await getCartAPI()
        cartList.value = res.data.result
    }

    // 添加购物
    const addCart = async (count) => {
        if (isLogin.value) {
            await addCartAPI(count.skuId, count.count)
            await getCartList()
        } else {
            const item = cartList.value.find((item) => count.skuId === item.skuId)
            if (item) {
                item.count += count.count
            } else {
                cartList.value.push(count)
            }
        }
        ElMessage({
            message: '加入购物车成功',
            type: 'success',
        })
    }

    //清空购物车
    const cleanCartList = async () => {
        cartList.value = []
    }

    // 移除购物
    const delCartList = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            await getCartList()
        }
        const item = cartList.value.filter((item) => item.skuId !== skuId)
        cartList.value = item
    }

    // 选中功能
    const selectChange = async (skuId, select) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = select
    }

    // 全选功能
    const selectAll = async (select) => {
        cartList.value.forEach((item) => item.selected = select)
    }

    // 计算总数
    const totalCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    // 计算总价
    const totalPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    // 选择总数
    const selectTotalCount = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0))
    // 选择总价
    const selectTotalPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0))
    return { cartList, totalCount, totalPrice, isAll, selectTotalCount, selectTotalPrice, getCartList, addCart, delCartList, cleanCartList, selectChange, selectAll }
}, {
    persist: true,
})