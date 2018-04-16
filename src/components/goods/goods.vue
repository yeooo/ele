<!--goods  -->
<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="item in goods" :key="item.index" class="menu-item">
          <span class="text border-bottom-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="food">
      <ul>
        <li v-for="item in goods" class="food-list" :key="item.key">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-bottom-1px" :key="food.key">
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
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoods } from 'service/apiUrl';
import BScroll from 'better-scroll';
const ERR_OK = 200;
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: []
    };
  },
  methods: {
    /**
     * async await 异步请求
     * 去掉就是同步请求
     */
    async getGoods() {
      let result = await getGoods();
      if (result.code === ERR_OK) {
        this.goods = result.result;
        this.$nextTick(() => {
          this.initScroll();
        })
      }
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menu, {});
      this.foodScroll = new BScroll(this.$refs.food, {});
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'sepcial'];
    this.getGoods();
  }
};

</script>
<style lang='scss' scoped>
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    ul {
      overflow-y: auto;
    }
    .menu-item {
      display: table;
      height: 54px;
      padding: 0 12px;
      line-height: 14px;
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        @include border-bottom-1px(rgba(7,17,27,0.1));
      }
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease {
          @include bg-image('./static/img/decrease_3');
        }
        &.discount {
          @include bg-image('./static/img/discount_3');
        }
        &.guarantee {
          @include bg-image('./static/img/guarantee_3');
        }
        &.invoice {
          @include bg-image('./static/img/invoice_3');
        }
        &.sepcial {
          @include bg-image('./static/img/special_3');
        }
      }
    }
  }
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
      @include border-bottom-1px(rgba(7,17,27,0.1));
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
      }
    }
  }
}
</style>
