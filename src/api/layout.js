import request from '@/utils/request.js'

export const getHomeCategoryAPI = () => {
    return request.get('/home/category/head')
}