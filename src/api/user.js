import request from '@/utils/request.js'

// 登录
export const postUserLoginAPI = (account, password) => {
    return request.post('/login', { account, password })
}

export const getLikeListAPI = ({ limit }) => {
    return request.get('/goods/relevant', { limit })
}