<!--  -->
<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" :key="itemClass.index"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  name: 'star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'start-' + this.size;
    },
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;// 向下取0.5的倍值
      let hasDecimal = score % 1 !== 0;// 判断是否有小数
      let intger = Math.floor(score);// 取分数的整数部分
      /**
       * 循环需要显示整星的分数
       * 将整星的class push进result数组里
       */
      for (let i = 0; i < intger; i++) {
        result.push(CLS_ON);
      }
      /**
       * 半星只可能有一个
       * 所以只要判断hasDecimal如果为true则代表需要显示要给半星
       * 直接push进result
       */
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      /**
       * 判断最后整个result数组的长度是否比原定星星长度的长
       * 如果小于原定的LENGTH长度 则说明全星+半星的长度仍少于LENGTH，这时需要往result数组push灰色星星的class
       * 反之则全星+半星的长度仍等于LENGTH 无需操作
       */
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};

</script>
<style lang='scss' scoped>
.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('./static/img/star48_on');
      }
      &.half {
        @include bg-image('./static/img/star48_half');
      }
      &.off {
        @include bg-image('./static/img/star48_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('./static/img/star36_on');
      }
      &.half {
        @include bg-image('./static/img/star36_half');
      }
      &.off {
        @include bg-image('./static/img/star36_off');
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('./static/img/star24_on');
      }
      &.half {
        @include bg-image('./static/img/star24_half');
      }
      &.off {
        @include bg-image('./static/img/star24_off');
      }
    }
  }
}
</style>
