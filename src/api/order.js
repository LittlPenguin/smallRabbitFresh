import request from '@/utils/request'

export const getOrderAPI = (params) => {
    return request.get('/member/order', { params })
}