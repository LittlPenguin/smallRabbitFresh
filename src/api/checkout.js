import request from '@/utils/request'


// 生成-订单(结算页)
export const getMemberOrderAPI = () => {
    return request.get('/member/order/pre')
}

// 提交-订单(结算页)
export const postMemberOrderAPI = (data) => {
    return request.post('/member/order', data)
}
// 1923172440553295873
// 获取 - 订单详情(以及支付结果)
export const getMemberOrderDetailAPI = (id) => {
    return request.get(`/member/order/${id}`)
}