// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
// import VueRouter from 'vue-router';
import router from '@/router/router';
// import goods from './pages/goods';
// import ratings from './pages/rating';
// import seller from './pages/seller';
Vue.config.productionTip = false;

// Vue.use(VueRouter);

// const routes = [
//   { path: '/goods', component: goods },
//   { path: '/ratings', component: ratings },
//   { path: '/seller', component: seller }
// ];
// const router = new VueRouter({
//   routes // （缩写）相当于 routes: routes
// });
// console.log(router);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
