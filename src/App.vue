<template>
  <div>
      <Header :seller = "seller"/>
      <section class="tab border-1px">
        <div class="tab-item"><router-link to="/goods">商品</router-link></div>
        <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
        <div class="tab-item"><router-link to="/seller">商家</router-link></div>
      </section>
      <router-view :seller="seller">
      </router-view>
  </div>
</template>

<script>
import Header from 'components/header/header';
import { getSeller } from 'service/apiUrl';
const ERR_OK = 200;
export default {
  name: 'App',
  data() {
    return {
      seller: {}
    };
  },
  components: {
    Header
  },
  methods: {
    async getSeller() {
      let result = await getSeller();
      if (result.code === ERR_OK) {
        this.seller = result.result;
      }
    }
  },
  created() {
    this.getSeller();
  }
};
</script>

<style lang='scss' scoped>
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  @include border-bottom-1px(rgba(7, 17, 27, 0.1));
  .tab-item {
    flex: 1;
    text-align: center;
    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
