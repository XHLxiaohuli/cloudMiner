<template>
  <div  class="commonMain">
       <div class="commonHeader">
        <div class="commonHeaderLeft">
            <div class="commonBackPic" @click="BackUpperStory"></div>
        </div>
        <div class="commonHeaderText">常见问题</div>
       </div>
       <ul class="commonUl">
           <li @click="commonLiClick(1)">
               <div class="commonLiOne">
                   <span>1. 怎么使用激活码？</span><span v-show="commonOneShow"></span><span v-show="!commonOneShow"></span>
               </div>
               <div class="commonLiTow" v-show="!commonOneShow">目前激活码仅限于内部定额发放，每天每人名额有限，发完即止，活动结束即恢复原价120元，不再有免费挖矿的机会。如有想激活白银矿工的用户，联系网站下方客服人员。</div>
           </li>
           <li @click="commonLiClick(2)">
               <div class="commonLiOne">
                   <span>2. 需要邀请几个人才能挖到一个比特币？</span><span v-show="commonTowShow"></span><span v-show="!commonTowShow"></span>
               </div>
               <div class="commonLiTow" v-show="!commonTowShow">白银矿工，黄金矿工和钻石矿工采用三级分销模式挖矿，不邀请人则不享受任何收益。如果不愿意加入邀请制挖矿模式，则可选择购买大众矿工，不限定算力额度，无上限投资挖矿，稳定长线，省心省力。</div>
           </li>
           <li @click="commonLiClick(3)">
               <div class="commonLiOne">
                   <span>3. 不邀请人挖矿会有收益吗？</span><span v-show="commonThreeShow"></span><span v-show="!commonThreeShow"></span>
               </div>
               <div class="commonLiTow" v-show="!commonThreeShow">白银矿工，黄金矿工和钻石矿工采用三级分销模式挖矿，不邀请人则不享受任何收益。如果不愿意加入邀请制挖矿模式，则可选择购买大众矿工，不限定算力额度，无上限投资挖矿，稳定长线，省心省力。</div>
           </li>
           <li @click="commonLiClick(4)">
               <div class="commonLiOne">
                   <span>4. 初级白银矿工享受的收益权是什么？</span><span v-show="commonFourShow"></span><span v-show="!commonFourShow"></span>
               </div>
               <div class="commonLiTow" v-show="!commonFourShow">初级白银矿工能够邀请好友一起挖矿，享有一级挖矿收益，即A邀请B，则能享有B的46.4%算力收益，邀请好友越多，那么算力佣金就越多。如果您想开通朋友B邀请C的20.8%二级收益，以及C邀请D的12.8%三级收益，那么只需升级高级白银矿工即可</div>
           </li>
       </ul>
       <div class="commonFooterKeFu" :style="'background:'+commonFooterKeFuBg">
        <div></div>
        <p>客服微信</p>
       </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      commonNullOne: 0,
      commonNullTow: 0,
      commonNullThree: 0,
      commonNullFour: 0,
      commonOneShow: true,
      commonTowShow: true,
      commonThreeShow: true,
      commonFourShow: true,
      commonFooterKeFuBg: "#f5f5f8"
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    commonLiClick(index) {
      if (index == 1) {
        if (this.commonNullOne % 2 == 0) {
          this.commonOneShow = false;
          this.commonTowShow = true;
          this.commonThreeShow = true;
          this.commonFourShow = true;
          this.commonNullOne++;
          this.commonNullTow = 0;
          this.commonNullThree = 0;
          this.commonNullFour = 0;
        } else {
          this.commonOneShow = true;
          this.commonTowShow = true;
          this.commonThreeShow = true;
          this.commonFourShow = true;
          this.commonNullOne++;
        }
      } else if (index == 2) {
        if (this.commonNullTow % 2 == 0) {
          this.commonTowShow = false;
          this.commonOneShow = true;
          this.commonThreeShow = true;
          this.commonFourShow = true;
          this.commonNullTow++;
          this.commonNullOne = 0;
          this.commonNullThree = 0;
          this.commonNullFour = 0;
        } else {
          this.commonOneShow = true;
          this.commonTowShow = true;
          this.commonThreeShow = true;
          this.commonFourShow = true;
          this.commonNullTow++;
        }
      } else if (index == 3) {
        if (this.commonNullThree % 2 == 0) {
          this.commonThreeShow = false;
          this.commonOneShow = true;
          this.commonTowShow = true;
          this.commonFourShow = true;
          this.commonNullThree++;
          this.commonNullOne = 0;
          this.commonNullTow = 0;
          this.commonNullFour = 0;
        } else {
          this.commonOneShow = true;
          this.commonTowShow = true;
          this.commonThreeShow = true;
          this.commonFourShow = true;
          this.commonNullThree++;
        }
      } else if (index == 4) {
        if (this.commonNullFour % 2 == 0) {
          this.commonFourShow = false;
          this.commonOneShow = true;
          this.commonTowShow = true;
          this.commonThreeShow = true;
          this.commonNullFour++;
          this.commonNullOne = 0;
          this.commonNullThree = 0;
          this.commonNullTow = 0;
        } else {
          this.commonOneShow = true;
          this.commonTowShow = true;
          this.commonThreeShow = true;
          this.commonFourShow = true;
          this.commonNullFour++;
        }
      }
    }
  }
};
</script>
<style scoped>
.commonMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.commonHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 20px;
}
.commonHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.commonHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.commonBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.commonHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.commonLiOne:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.commonLiOne {
  background: #fff;
  padding: 50px 24px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 0;
  position: relative;
}
.commonLiOne > span:nth-child(1) {
  float: left;
  font-size: 28px;
  color: #373d41;
}
.commonLiOne > span:nth-child(2) {
  float: right;
  width: 14px;
  height: 28px;
  background: url("../../static/img/back.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  bottom: 0;
  right: 24px;
  margin: auto;
}
.commonLiOne > span:nth-child(3) {
  float: right;
  width: 30px;
  height: 18px;
  background: url("../../static/img/drop-down.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  bottom: 0;
  right: 24px;
  margin: auto;
}
.commonLiTow {
  padding: 45px 24px;
  font-size: 26px;
  line-height: 45px;
  background: #f6f6f6;
  text-align: left;
}
.commonUl > li:last-child > div:nth-child(2) {
  border-bottom: 1px solid #dfdfdf;
}
.commonFooterKeFu {
  padding: 100px 0;
  /* background: #f2f2f8; */
}
.commonFooterKeFu > div {
  width: 240px;
  height: 240px;
  margin: auto;
  background: url("../../static/img/fuwuhao.png") no-repeat;
  background-size: 100% 100%;
}
.commonFooterKeFu > p {
  text-align: center;
  font-size: 28px;
  color: #373d41;
  margin-top: 20px;
}
</style>

