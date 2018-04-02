// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router/router';

// import VueResource from 'vue-resource';// vue 2.0已经停止更新，官方推荐使用axios

// 引入公共样式
import './common/style/index.scss';

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
