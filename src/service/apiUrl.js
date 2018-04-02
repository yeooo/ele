import api from '../service/api';
/**
 *  获取商家信息
 */
export const getSeller = (data, headers) =>
  api.post('/api/seller', data, headers);
/**
 *  获取评论信息
 */
export const getRatings = (data, headers) =>
  api.post('/api/ratings', data, headers);
/**
 *  获取商品信息
 */
export const getGoods = (data, headers) =>
  api.post('/api/goods', data, headers);
