import api from '../service/api';
/**
 *  获取商家信息
 */
export const getSeller = data => api.get('/api/seller', data);
/**
 *  获取评论信息
 */
export const getRatings = data => api.get('/api/ratings', data);
/**
 *  获取商品信息
 */
export const getGoods = data => api.get('/api/goods', data);
