import api from '../service/api';
/**
 *  获取商家信息
 */
export const getSeller = (data, data2) => api.post('/api/seller', data, data2);
/**
 *  获取评论信息
 */
export const getRatings = data => api.post('/api/ratings', data);
/**
 *  获取商品信息
 */
export const getGoods = data => api.post('/api/goods', data);
