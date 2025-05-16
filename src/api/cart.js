import request from '@/utils/request'

// 添加购物车
export const addCartAPI = (skuId, count) => {
    return request.post('/member/cart', { skuId, count })
}

// 获取购物车列表
export const getCartAPI = () => {
    return request.get('/member/cart')
}

// 删除-购物车商品
export const delCartAPI = (ids) => {
    return request.delete('/member/cart', { data: { ids } })
}

// 合并购物车
export const mergeCartAPI = (data) => {
    return request.post('/member/cart/merge', data)
}