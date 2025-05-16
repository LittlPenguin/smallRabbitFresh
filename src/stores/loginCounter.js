import { ref } from 'vue'
import { defineStore } from 'pinia'
import { postUserLoginAPI } from '@/api/user'
import { mergeCartAPI } from '@/api/cart'
import { useCartCounter } from '@/stores/cartCounter'

export const useLoginCounter = defineStore('useLoginStore', () => {
    const cartCounter = useCartCounter()
    // 登录数据
    const loginData = ref([])
    // 登录
    const setLoginData = async (data) => {
        const {
            data: { result },
        } = await postUserLoginAPI(data.userName, data.userPassword)
        loginData.value = result
        ElMessage({
            message: '登陆成功',
            type: 'success',
        })
        await mergeCartAPI(cartCounter.cartList.map((item) => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }
        ))
        await cartCounter.getCartList()
    }

    // 退出登录
    const setOutLogin = async () => {
        loginData.value = []
        await cartCounter.cleanCartList()
    }

    return { loginData, setLoginData, setOutLogin }
}, {
    persist: true,
},)