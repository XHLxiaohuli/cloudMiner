<template>
  <div class="OnTheIncomeMain">
      <div class="OnTheIncomeHeader">
        <div class="OnTheIncomeHeaderLeft">
            <div class="OnTheIncomeBackPic" @click="BackUpperStory"></div>
        </div>
        <div class="OnTheIncomeHeaderText">关于收益</div>
       </div>
       <ul class="OnTheIncomeUl">
           <li class="OnTheIncomeLi">
               <div @click="OnTheIncomeClick(1)">
                   <span>1.如何才能获得二级、三级代理收益？</span><span v-show="OnTheIncomeOne"></span><span v-show="!OnTheIncomeOne"></span>
               </div>
               <div v-show="!OnTheIncomeOne">初级白银矿工享有一级邀请收益，升级到中级白银矿工和高级白银矿工后，可享有二、三级邀请收益，初级黄金矿工享有白银矿工的一、二、三级邀请收益，黄金矿工部分的二、三级邀请收益在加入中级、高级黄金矿工后享有。</div>
           </li>
           <li class="OnTheIncomeLi">
               <div @click="OnTheIncomeClick(2)">
                   <span>2.邀请多少人才能有收益？</span><span v-show="OnTheIncomeTow"></span><span v-show="!OnTheIncomeTow"></span>
               </div>
               <div v-show="!OnTheIncomeTow">矿工白银、黄金、钻石矿工结合三级分销挖矿模式，让所有人都能低成本手机挖矿，比特币收益的多少，主要取决于您所邀请的人数和矿工等级，邀请人数越多，矿工等级越高，那么比特币的权益和收益就越高。更多详情请参考挖矿计算器的计算结果。</div>
           </li>
           <li class="OnTheIncomeLi">
               <div @click="OnTheIncomeClick(3)">
                   <span>3.为什么我邀请的人购买了，还没有收到收益？</span><span v-show="OnTheIncomeThree"></span><span v-show="!OnTheIncomeThree"></span>
               </div>
               <div v-show="!OnTheIncomeThree">每日北京时间10点整根据客户当日0时持有的算力，结算昨日云算力收益，收益方式以BTC的形式发放。</div>
           </li>
           <li class="OnTheIncomeLi">
               <div @click="OnTheIncomeClick(4)">
                   <span>4. 不邀请人挖矿会有收益吗？</span><span v-show="OnTheIncomeFour"></span><span v-show="!OnTheIncomeFour"></span>
               </div>
               <div v-show="!OnTheIncomeFour">白银矿工，黄金矿工和钻石矿工采用三级分销模式挖矿，不邀请人则不享受任何收益。如果不愿意加入邀请制挖矿模式，则可选择购买大众矿工，不限定算力额度，无上限投资挖矿，稳定长线，省心省力。</div>
           </li>
           <li class="OnTheIncomeLi">
               <div @click="OnTheIncomeClick(5)">
                   <span>5. 初级白银矿工享受的收益权是什么？</span><span v-show="OnTheIncomeFive"></span><span v-show="!OnTheIncomeFive"></span>
               </div>
               <div v-show="!OnTheIncomeFive">初级白银矿工能够邀请好友一起挖矿，享有一级挖矿收益，即A邀请B，则能享有B的46.4%算力收益，邀请好友越多，那么算力佣金就越多。如果您想开通朋友B邀请C的20.8%二级收益，以及C邀请D的12.8%三级收益，那么只需升级高级白银矿工即可。</div>
           </li>
       </ul>
       <div class="OnTheIncomeBottum" :style="'background:'+OnTheIncomeBottumBg">
           <div></div>
           <p>客服微信</p>
       </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      OnTheIncomeOne: true,
      OnTheIncomeTow: true,
      OnTheIncomeThree: true,
      OnTheIncomeFour: true,
      OnTheIncomeFive: true,
      OnTheIncomeOnenum: 0,
      OnTheIncomeTownum: 0,
      OnTheIncomeThreenum: 0,
      OnTheIncomeFournum: 0,
      OnTheIncomeFivenum: 0,
      OnTheIncomeBottumBg: "#f5f5f8"
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //文本收缩
    OnTheIncomeClick(index) {
      if (index == 1) {
        if (this.OnTheIncomeOnenum % 2 == 0) {
          this.OnTheIncomeOne = false;
          this.OnTheIncomeTow = true;
          this.OnTheIncomeThree = true;
          this.OnTheIncomeFour = true;
          this.OnTheIncomeFive = true;
          this.OnTheIncomeOnenum++;
          this.OnTheIncomeTownum = 0;
          this.OnTheIncomeThreenum = 0;
          this.OnTheIncomeFournum = 0;
          this.OnTheIncomeFivenum = 0;
        } else {
          this.OnTheIncomeOne = true;
          this.OnTheIncomeTow = true;
          this.OnTheIncomeThree = true;
          this.OnTheIncomeFour = true;
          this.OnTheIncomeFive = true;
          this.OnTheIncomeOnenum++;
        }
      } else if (index == 2) {
        if (this.OnTheIncomeTownum % 2 == 0) {
          this.OnTheIncomeOne = true;
          this.OnTheIncomeTow = false;
          this.OnTheIncomeThree = true;
          this.OnTheIncomeFour = true;
          this.OnTheIncomeFive = true;
          this.OnTheIncomeOnenum = 0;
          this.OnTheIncomeTownum++;
          this.OnTheIncomeThreenum = 0;
          this.OnTheIncomeFournum = 0;
          this.OnTheIncomeFivenum = 0;
        } else {
          this.OnTheIncomeOne = true;
          this.OnTheIncomeTow = true;
          this.OnTheIncomeThree = true;
          this.OnTheIncomeFour = true;
          this.OnTheIncomeFive = true;
          this.OnTheIncomeTownum++;
        }
      } else if (index == 3) {
        if (this.OnTheIncomeThreenum % 2 == 0) {
          this.OnTheIncomeOne = true;
          this.OnTheIncomeTow = true;
          this.OnTheIncomeThree = false;
          this.OnTheIncomeFour = true;
          this.OnTheIncomeFive = true;
          this.OnTheIncomeOnenum = 0;
          this.OnTheIncomeTownum = 0;
          this.OnTheIncomeThreenum++;
          this.OnTheIncomeFournum = 0;
          this.OnTheIncomeFivenum = 0;
        } else {
          this.OnTheIncomeOne = true;
          this.OnTheIncomeTow = true;
          this.OnTheIncomeThree = true;
          this.OnTheIncomeFour = true;
          this.OnTheIncomeFive = true;
          this.OnTheIncomeThreenum++;
        }
      } else if (index == 4) {
        if (this.OnTheIncomeFournum % 2 == 0) {
          this.OnTheIncomeOne = true;
          this.OnTheIncomeTow = true;
          this.OnTheIncomeThree = true;
          this.OnTheIncomeFour = false;
          this.OnTheIncomeFive = true;
          this.OnTheIncomeOnenum = 0;
          this.OnTheIncomeTownum = 0;
          this.OnTheIncomeThreenum = 0;
          this.OnTheIncomeFournum++;
          this.OnTheIncomeFivenum = 0;
        } else {
          this.OnTheIncomeOne = true;
          this.OnTheIncomeTow = true;
          this.OnTheIncomeThree = true;
          this.OnTheIncomeFour = true;
          this.OnTheIncomeFive = true;
          this.OnTheIncomeFournum++;
        }
      } else if (index == 5) {
        if (this.OnTheIncomeFivenum % 2 == 0) {
          this.OnTheIncomeOne = true;
          this.OnTheIncomeTow = true;
          this.OnTheIncomeThree = true;
          this.OnTheIncomeFour = true;
          this.OnTheIncomeFive = false;
          this.OnTheIncomeOnenum = 0;
          this.OnTheIncomeTownum = 0;
          this.OnTheIncomeThreenum = 0;
          this.OnTheIncomeFournum = 0;
          this.OnTheIncomeFivenum++;
        } else {
          this.OnTheIncomeOne = true;
          this.OnTheIncomeTow = true;
          this.OnTheIncomeThree = true;
          this.OnTheIncomeFour = true;
          this.OnTheIncomeFive = true;
          this.OnTheIncomeFivenum++;
        }
      }
    }
  }
};
</script>
<style scoped>
.OnTheIncomeMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.OnTheIncomeHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 20px;
}
.OnTheIncomeHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.OnTheIncomeHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.OnTheIncomeBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.OnTheIncomeHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.OnTheIncomeLi > div:nth-child(1):after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.OnTheIncomeLi > div:nth-child(1) {
  background: #fff;
  padding: 50px 24px;
  border-bottom: 1px solid #f2f2f2;
  position: relative;
}
.OnTheIncomeLi > div:nth-child(1) > span:nth-child(1) {
  float: left;
  font-size: 28px;
  color: #373d41;
}
.OnTheIncomeLi > div:nth-child(1) > span:nth-child(2) {
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
.OnTheIncomeLi > div:nth-child(1) > span:nth-child(3) {
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
.OnTheIncomeLi > div:nth-child(2) {
  padding: 45px 24px;
  font-size: 26px;
  line-height: 45px;
  background: #f6f6f6;
  text-align: left;
  background: #f6f6f6;
}
.OnTheIncomeBottum {
  padding: 100px 0;
  /* background: #f2f2f8; */
}
.OnTheIncomeBottum > div {
  width: 240px;
  height: 240px;
  margin: auto;
  background: url("../../static/img/fuwuhao.png") no-repeat;
  background-size: 100% 100%;
}
.OnTheIncomeBottum > p {
  text-align: center;
  font-size: 28px;
  color: #373d41;
  margin-top: 20px;
}
.OnTheIncomeUl > li:last-child > div:nth-child(2) {
  border-bottom: 1px solid #dfdfdf;
}
</style>


