<template>
   <li class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item border-bottom-1px" v-for="food in item.foods"
                                                    :key="food.key"
                                                    @click="clickFood(food,$event)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">
                  {{food.name}}
                </h2>
                <p class="desc">
                  {{food.description}}
                </p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span><span>好评{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"
                               @cart-add="cartAdd">
                  </cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
</template>
<script>
import cartcontrol from 'components/cartcontrol/cartcontrol';

export default {
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    clickFood(food, event) {
      if (!event._constructed) {
        // 判断pc中是否有这个属性如果无则不再触发2次点击事件
        return;
      }
      this.selectedFood = food;
      this.$refs.foodComponent.show();
    },
    cartAdd(target) {
      // 优化动画体验
      this.$nextTick(() => {
        this.$refs.shopCart.drop(target);
      });
    }
  },
  components: {
    cartcontrol
  }
};
</script>
<style lang="scss" scoped>
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      @include border-bottom-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        @include border-none();
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          margin-bottom: 8px;
          line-height: 12px;
        }
        .extra {
          span {
            &:first-child {
              margin-right: 12px;
            }
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
</style>
