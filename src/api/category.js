
import request from '@/utils/request.js'

// 二级分类
export const getCategoryAPI = (id) => {
    return request.get('/category', {
        params: {
            id
        }
    })
}

// 获取二级分类列表数据
export const getCategorySubAPI = (id) => {
    return request.get('category/sub/filter', {
        params: {
            id
        }
    })
}

// 获取分类商品
export const getCategorySubGoodsAPI = (data) => {
    return request.post('/category/goods/temporary', data)
}