<template>
  <div id="app">
      <Header/>
      <section class="tab">
        <div class="tab-item">商品</div>
        <div class="tab-item">评价</div>
        <div class="tab-item">商家</div>
      </section>
      <section class="content">
        内容
      </section>
  </div>
</template>

<script>
import Header from './components/header/header';

export default {
  name: 'App',
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
