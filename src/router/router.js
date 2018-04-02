/**
 * 路由配置
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// require.ensure是webpack里面的，这样做会将单独拉出来作为一个chunk文件
// const Goods = r => require.ensure([], () => r(require('components/goods/goods')), 'Goods');
// const Rating = r => require.ensure([], () => r(require('components/ratings/rating')), 'Rating');
// const Seller = r => require.ensure([], () => r(require('components/seller/seller')), 'Seller');

/**
 * Failed to mount component: template or render function not defined.
 * 出现加载不成功的情况，路由会变化，但是页面没有渲染
 */
// const Goods = require('../pages/goods');
// const Rating = require('../pages/rating');
// const Seller = require('../pages/seller');

const Goods = () => import('components/goods/goods');
const Rating = () => import('components/ratings/rating');
const Seller = () => import('components/seller/seller');

const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: Goods,
    meta: {
      keep: true // 某些页面进行缓存处理
    }
  },
  { path: '/ratings', component: Rating },
  { path: '/seller', component: Seller }
];

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes // （缩写）相当于 routes: routes
});

// export default [routes];
export default router;
