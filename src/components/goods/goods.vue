<!--goods  -->
<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li class="menu-item"
            v-for="(item,$index) in goods"
            :key="$index"
            :class="{'current':currentIndex === $index}"
            @click="selectMenu($index,$event)">
          <span class="text border-bottom-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="food">
      <!-- <good-item v-for="item in goods" :item="item" :key="item.key" v-if="loading"></good-item> -->
      <ul v-if="loading">
        <li v-for="item in goods" class="food-list food-list-hook" :key="item.key">
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
      </ul>
      <div v-for="loade in loades" :key="loade.key" v-if="!loading">
        <loading-item ></loading-item>
      </div>
    </div>
    <shopcart ref="shopCart"
              :select-foods="selectFoods"
              :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
  <food :food="selectedFood" ref="foodComponent"></food>
  </div>
</template>

<script>
import { getGoods } from 'service/apiUrl';
import loadingItem from '../loading/loadingItem';
import BScroll from 'better-scroll';
import shopcart from 'components/shopCart/shopCart';
import cartcontrol from 'components/cartcontrol/cartcontrol';
// import goodItem from './goodItem';
import food from 'components/food/food';
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
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
      loades: 10,
      loading: false
    };
  },
  computed: {
    /**
     * 动态计算索引
     */
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        /**
         * 滚动位置落在了height1和height2之间或者是最后一个 就返回当前索引
         */
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    /** @augments
     * 动态关联cartcontrol组件
     * 如果food.count不为空 表明该食物被选中，将其push进数组，并将数组传给shopcart组件
     */
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    async getGoods() {
      let result = await getGoods();
      if (result.code === ERR_OK) {
        this.loading = true;
        this.goods = result.result;
        this.$nextTick(() => {
          this._initScroll();
          this._caculateHeight();
        });
      }
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menu, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.food, {
        probeType: 3,
        click: true
      });
      /**
       * 动态监听滚动，实时获得scrollY的正整数
       */
      this.foodScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _caculateHeight() {
      let foodList = this.$refs.food.getElementsByClassName('food-list-hook'); // 获取每个类别的总高度：标题+商品
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    /** @augments
     * 点击菜单显示对应的食物栏
     */
    selectMenu(index, event) {
      if (!event._constructed) {
        // 判断pc中是否有这个属性如果无则不再触发2次点击事件
        return;
      }
      let foodList = this.$refs.food.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 300); // better-scroll的一个api 使得这个dom滚动到最顶部
    },
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
    shopcart,
    cartcontrol,
    food,
    // goodItem,
    loadingItem
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'sepcial'];
    setTimeout(() => {
      this.getGoods();
    }, 1000);
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
      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        font-weight: 700;
        background: #fff;
        .text {
          @include border-none();
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        @include border-bottom-1px(rgba(7, 17, 27, 0.1));
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
}
</style>
