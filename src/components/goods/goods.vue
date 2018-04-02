<!--  -->
<template>
  <div>goods</div>
</template>

<script>
import { getSeller } from '../../service/apiUrl';
export default {
  name: 'goods',
  data() {
    return {
    };
  },
  methods: {
    /**
     * async await 异步请求
     * 去掉就是同步请求
     */
    async getSeller() {
      let result = await getSeller({ id: 1 });
      if (result.code === 200) {
        console.log('请求成功');
      }
    }
  },
  created() {
    this.getSeller();
  }
};

</script>
<style lang='scss' scoped>

</style>
