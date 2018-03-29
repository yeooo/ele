<template>
  <div>
      <Header/>
      <section class="tab">
        <div class="tab-item"><router-link to="/goods">商品</router-link></div>
        <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
        <div class="tab-item"><router-link to="/seller">商家</router-link></div>
      </section>
      <router-view>
      </router-view>
  </div>
</template>

<script>
import Header from './components/header/header';
export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    Header
  }
};
</script>

<style lang='scss' scoped>
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .tab-item {
    flex: 1;
    text-align: center;
  }
}
</style>
