import request from '@/utils/request.js'

// 轮播图
export const getHomeBannerAPI = (distributionSite) => {
    return request.get('/home/banner', { params: { distributionSite } })
}

// 新鲜好物
export const getHomeNewAPI = () => {
    return request.get('/home/new')
}

// 商品列表
export const getHomeGoodsAPI = () => {
    return request.get('/home/goods')
}