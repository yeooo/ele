<!-- header -->
<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]" ></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="36" :score="seller.score"></star>
              </div>
              <detail-title :title="'优惠信息'"></detail-title>
              <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item,index) in seller.supports" :key="item.index">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
              <detail-title :title="'商家公告'"></detail-title>
              <div class="blletin">
                <p class="content">{{seller.bulletin}}</p>
              </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from 'components/star/star';
import detailTitle from 'components/detailTitle/detailTitle';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  components: {
    star,
    detailTitle
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'sepcial'];
  }
};
</script>

<style lang='scss' scoped>
.header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background-color: rgba(7, 17, 27, 0.5);
  .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          @include bg-image('./static/img/brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support {
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('./static/img/decrease_1');
          }
          &.discount {
            @include bg-image('./static/img/discount_1');
          }
          &.guarantee {
            @include bg-image('./static/img/guarantee_1');
          }
          &.invoice {
            @include bg-image('./static/img/invoice_1');
          }
          &.sepcial {
            @include bg-image('./static/img/special_1');
          }
        }
        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        vertical-align: top;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right {
        line-height: 24px;
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      @include bg-image('./static/img/bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
      vertical-align: top;
      margin-top: 8px;
    }
    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      right: 12px;
      top: 8px;
      font-size: 10px;
    }
  }
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    &.fade-enter-active,
    &.fade-leave-active {
      transition: all 0.3s ease;
    }
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease {
                @include bg-image('./static/img/decrease_2');
              }
              &.discount {
                @include bg-image('./static/img/discount_2');
              }
              &.guarantee {
                @include bg-image('./static/img/guarantee_2');
              }
              &.invoice {
                @include bg-image('./static/img/invoice_2');
              }
              &.sepcial {
                @include bg-image('./static/img/special_2');
              }
            }
            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        .blletin {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
  }
}
</style>
