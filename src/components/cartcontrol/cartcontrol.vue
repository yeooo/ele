<!-- 购物按钮组件 -->
<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease"
          v-show="food.count > 0"
          @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'cartcontrol',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit('cart-add', event.target);
      /**
       * vue2.0已经废弃了events和$dispatch
       */
      // this.$dispatch('cart-add', event.target);
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};

</script>
<style lang='scss' scoped>
.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    transition: all 0.4s linear;
    .inner {
      display: inline-block;
      color: rgb(0, 160, 220);
      line-height: 24px;
      font-size: 24px;
      transition: all 0.4s linear;
      transform: rotate(0);
    }
    &.move-enter,
    &.move-leave,
    &.move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    color: rgb(0, 160, 220);
    line-height: 24px;
    font-size: 24px;
  }
}
</style>
