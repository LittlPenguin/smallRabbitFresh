import request from '@/utils/request'

// 获取商品详情
export const getGoodsDetailAPI = (id) => {
    return request.get('/goods', { params: { id } })
}

// 获取热门商品
export const getGoodsDetailHotAPI = ({ id, type, limit }) => {
    return request.get('/goods/hot', { params: { id, type, limit } })
}