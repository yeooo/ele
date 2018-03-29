/**
 * 路由配置
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// require.ensure是webpack里面的，这样做会将单独拉出来作为一个chunk文件
// const Goods = r => require.ensure([], () => r(require('@/pages/goods')), 'Goods');
// const Rating = r => require.ensure([], () => r(require('@/pages/rating')), 'Rating');
// const Seller = r => require.ensure([], () => r(require('@/pages/seller')), 'Seller');

/**
 * Failed to mount component: template or render function not defined.
 * 出现加载不成功的情况，路由会变化，但是页面没有渲染
 */
// const Goods = require('../pages/goods');
// const Rating = require('../pages/rating');
// const Seller = require('../pages/seller');

const Goods = () => import('@/pages/goods');
const Rating = () => import('@/pages/rating');
const Seller = () => import('@/pages/seller');

const routes = [
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
  routes // （缩写）相当于 routes: routes
});

// export default [routes];
export default router;
