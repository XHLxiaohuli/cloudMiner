<template>
  <div class="GoldCalculatorBody">
    <ul class="GoldLadder">
      <li v-for="(item,index) in GoldLadderData">
        <div @click="GoldLadderClick(index)" :class='{YesGoldLadder:index==GoldLadderIndex}'>{{item}}</div>
      </li>
    </ul>
    <div class="GoldCalculatorForm">
      <div class="GoldFormTitleAndInput">
        <div>当前币价</div>
        <div>元</div>
        <div>
          <input type="text" v-model="GoldCurrentPriceInput" @focus="GoldCurrentPriceFocus" @blur="GoldCurrentPriceBlur" :style="'border-bottom: 1px solid '+GoldCurrentPriceBorder">
        </div>
      </div>
      <div class="GoldFormTitleAndInput">
        <div>一级矿工人数</div>
        <div>人</div>
        <div>
          <input type="text" v-model="GoldClassAInput" @focus="GoldClassABorderFocus" @blur="GoldClassABorderBlur" :style="'border-bottom: 1px solid '+GoldClassABorder">
        </div>
      </div>
      <div class="GoldFormTitleAndInput">
        <div>二级矿工人数</div>
        <div>人</div>
        <div>
          <input type="text" v-model="GoldClassBInput" @focus="GoldClassBBorderFocus" @blur="GoldClassBBorderBlur" :style="'border-bottom: 1px solid '+GoldClassBBorder">
        </div>
      </div>
      <div class="GoldFormTitleAndInput">
        <div>三级矿工人数</div>
        <div>人</div>
        <div>
          <input type="text" v-model="GoldClassCInput" @focus="GoldClassCBorderFocus" @blur="GoldClassCBorderBlur" :style="'border-bottom: 1px solid '+GoldClassCBorder">
        </div>
      </div>
      <div class="GoldCalculationAndReset">
        <button class="NoGoldCalculationBtn" @click="GoldCalculatorClick" :class="{YesGoldCalculationBtn:(GoldCurrentPriceInput!=='')&&(GoldClassAInput!==''||GoldClassBInput!==''||GoldClassCInput!=='')}">计算</button><button @click="GoldResetBtn">重置</button>
      </div>
    </div>
    <div class='baccolor'></div>
    <div class="GoldExpectedProfitOverview">
      <h1>预期利润概览</h1>
      <div class="GoldExpectedProfitBody">
        <div class="GoldExpectedProfitLeft">
          <ul>
            <li>
              <div>总利润</div>
              <div>{{GoldExpectedProfitLeftOne}}元</div>
            </li>
            <li>
              <div>冻结利润</div>
              <div>{{GoldExpectedProfitLeftTow}}元</div>
            </li>
            <li>
              <div>总收入</div>
              <div>{{GoldExpectedProfitLeftThree}}元</div>
            </li>
            <li>
              <div>每T价格</div>
              <div>{{GoldExpectedProfitLeftFour}}元</div>
            </li>
            <li>
              <div>电费</div>
              <div>{{GoldExpectedProfitLeftFive}}元</div>
            </li>
            <li>
              <div>维护费</div>
              <div>{{GoldExpectedProfitLeftSix}}元</div>
            </li>
          </ul>
        </div>
        <div class="GoldExpectedProfitRight">
          <ul>
            <li>
              <div>每日利润</div>
              <div>{{GoldExpectedProfitRightOne}}元</div>
            </li>
            <li>
              <div>每日冻结利润</div>
              <div>{{GoldExpectedProfitRighttTow}}元</div>
            </li>
            <li>
              <div>每日收入</div>
              <div>{{GoldExpectedProfitRightThree}}元</div>
            </li>
            <li>
              <div>每日电费</div>
              <div>{{GoldExpectedProfitRightFour}}元</div>
            </li>
            <li>
              <div>挖矿天数</div>
              <div>{{GoldExpectedProfitRightFive}}天</div>
            </li>
            <li>
              <div>投资回报率</div>
              <div>{{GoldExpectedProfitRightSix}}%</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="GoldExpectedProfitBottom">
        <h1>每日邀请收益</h1>
        <ul class="GoldAgentTitle">
          <li>一级邀请</li>
          <li>二级邀请</li>
          <li>三级邀请</li>
        </ul>
        <ul class="GoldAgentData">
          <li>{{GoldAgentDataOne}}元</li>
          <li>{{GoldAgentDataTow}}元</li>
          <li>{{GoldAgentDataThree}}元</li>
        </ul>
        <ul class="GoldFrozenUl">
          <li></li>
          <li>
            <div v-show="GoldLadderNum<2">
              <div v-show="firstGoldTitleShow" class="firstGoldTitleStyle">
                <div class="firstGoldText">黄金二级邀请收益在加入中级黄金矿工后解锁</div>
                <div class="firstGoldTriangle"></div>
              </div>
              冻结<span @click="firstGoldTitleClick"><img src="../../static/img/frozen.png" alt=""></span>
            </div>
          </li>
          <li>
            <div v-show="GoldLadderNum<3">
              <div v-show="GoldTitleShow" class="GoldTitleStyle">
                <div class="GoldText">黄金三级邀请收益在加入高级黄金矿工后解锁</div>
                <div class="GoldTriangle"></div>
              </div>
              冻结<span @click="GoldTitleClick"><img src="../../static/img/frozen.png" alt=""></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="GoldMask" v-show="GoldMaskShow" @click="GoldMaskClick"></div>
  </div>
</template>
<script>
import { Cell } from "vux";
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import myFunction from "@/page/encryption/encryption";
export default {
  components: {
    Cell,
    myFunction
  },
  data() {
    return {
      showContent004: true,
      GoldCurrentPriceBorder: "#b8b8b8",
      GoldClassABorder: "#b8b8b8",
      GoldClassBBorder: "#b8b8b8",
      GoldClassCBorder: "#b8b8b8",
      GoldCurrentPriceInput: "", //双向绑定当前币价
      GoldClassAInput: "5", //一级矿工人数双向绑定
      GoldClassBInput: "25", //二级矿工人数双向绑定
      GoldClassCInput: "125", //三级矿工人数双向绑定
      //收益预览数据start
      GoldExpectedProfitLeftOne: "",
      GoldExpectedProfitLeftTow: "",
      GoldExpectedProfitLeftThree: "",
      GoldExpectedProfitLeftFour: "",
      GoldExpectedProfitLeftFive: "",
      GoldExpectedProfitLeftSix: "",

      GoldExpectedProfitRightOne: "",
      GoldExpectedProfitRighttTow: "",
      GoldExpectedProfitRightThree: "",
      GoldExpectedProfitRightFour: "",
      GoldExpectedProfitRightFive: "",
      GoldExpectedProfitRightSix: "",

      GoldAgentDataOne: "",
      GoldAgentDataTow: "",
      GoldAgentDataThree: "",
      //收益预览数据end

      GoldLadderData: ["初级黄金", "中级黄金", "高级黄金"],
      GoldLadderIndex: 2,
      GoldLadderNum: 3,

      GoldTitleShow: false,
      GoldMaskShow: false,
      firstGoldTitleShow: false,

      myTime: ""
    };
  },
  methods: {
    //黄金小等级
    GoldLadderClick(index) {
      this.GoldLadderIndex = index;
      this.GoldLadderNum = index;
      this.GoldLadderNum++;
      this.GoldCalculatorClick();
    },
    //冻结弹出框
    GoldTitleClick() {
      this.GoldTitleShow = true;
      this.GoldMaskShow = true;
      this.firstGoldTitleShow = false;
    },
    firstGoldTitleClick() {
      this.GoldTitleShow = false;
      this.GoldMaskShow = true;
      this.firstGoldTitleShow = true;
    },
    GoldMaskClick() {
      this.GoldTitleShow = false;
      this.GoldMaskShow = false;
      this.firstGoldTitleShow = false;
    },

    //当前币价获取焦点下边框变蓝色
    GoldCurrentPriceFocus() {
      this.GoldCurrentPriceBorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //当前币价失去焦点变回原来颜色
    GoldCurrentPriceBlur() {
      this.GoldCurrentPriceBorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //一级代理人数获取焦点下边框变蓝色
    GoldClassABorderFocus() {
      this.GoldClassABorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //一级代理人数失去焦点变回原来颜色
    GoldClassABorderBlur() {
      this.GoldClassABorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //二级代理人数获取焦点下边框变蓝色
    GoldClassBBorderFocus() {
      this.GoldClassBBorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //二级代理人数失去焦点变回原来颜色
    GoldClassBBorderBlur() {
      this.GoldClassBBorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //三级代理人数获取焦点下边框变蓝色
    GoldClassCBorderFocus() {
      this.GoldClassCBorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //三级代理人数失去焦点变回原来颜色
    GoldClassCBorderBlur() {
      this.GoldClassCBorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //重置按钮
    GoldResetBtn() {
      this.GoldClassAInput = "";
      this.GoldClassBInput = "";
      this.GoldClassCInput = "";
      this.GoldExpectedProfitLeftOne = 0;
      this.GoldExpectedProfitLeftTow = 0;
      this.GoldExpectedProfitLeftThree = 0;
      this.GoldExpectedProfitLeftFour = 0;
      this.GoldExpectedProfitLeftFive = 0;
      this.GoldExpectedProfitLeftSix = 0;

      this.GoldExpectedProfitRightOne = 0;
      this.GoldExpectedProfitRighttTow = 0;
      this.GoldExpectedProfitRightThree = 0;
      this.GoldExpectedProfitRightFour = 0;
      this.GoldExpectedProfitRightFive = 0;
      this.GoldExpectedProfitRightSix = 0;

      this.GoldAgentDataOne = 0;
      this.GoldAgentDataTow = 0;
      this.GoldAgentDataThree = 0;
    },
    //计算按钮
    GoldCalculatorClick() {
      // this.myTime = Math.round(new Date().getTime() / 1000).toString();
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myCurrentBtcPrice = this.GoldCurrentPriceInput;
      var myUserGrade = 2;
      var myUserStep = this.GoldLadderNum;
      var myOneMinerNumber = this.GoldClassAInput;
      var myTwoMinerNumber = this.GoldClassBInput;
      var myThreeMinerNumber = this.GoldClassCInput;
      var myArr = [
        "requestId=" + myRequestId,
        "currentBtcPrice=" + myCurrentBtcPrice,
        "userGrade=" + myUserGrade,
        "userStep=" + myUserStep,
        "oneMinerNumber=" + myOneMinerNumber,
        "twoMinerNumber=" + myTwoMinerNumber,
        "threeMinerNumber=" + myThreeMinerNumber
      ];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/order/calculator/distIncomeCal.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "DistributionIncomeCalculator",
          qs.stringify({
            currentBtcPrice: myCurrentBtcPrice,
            userGrade: 2,
            userStep: myUserStep,
            oneMinerNumber: myOneMinerNumber,
            twoMinerNumber: myTwoMinerNumber,
            threeMinerNumber: myThreeMinerNumber
          }),
          {
            requestId: myRequestId,
            timestamp: myTimestamp,
            channelType: "h5",
            sign: myFunctionValues
          }
        )
        .then(data => {
          if (data.status == "success") {
            this.GoldExpectedProfitLeftOne = data.data.totalProfit;
            this.GoldExpectedProfitLeftTow = data.data.totalFreezeProfit;
            this.GoldExpectedProfitLeftThree = data.data.totalIncome;
            this.GoldExpectedProfitLeftFour = data.data.evertUnitPrice;
            this.GoldExpectedProfitLeftFive = data.data.electricCharge;
            this.GoldExpectedProfitLeftSix = data.data.maintenanceCharge;

            this.GoldExpectedProfitRightOne = data.data.everydayProfit;
            this.GoldExpectedProfitRighttTow = data.data.everydayFreezeProfit;
            this.GoldExpectedProfitRightThree = data.data.everydayIncome;
            this.GoldExpectedProfitRightFour = data.data.everydayElectricCharge;
            this.GoldExpectedProfitRightFive = data.data.miningDay;
            this.GoldExpectedProfitRightSix = data.data.investReturnRate;

            this.GoldAgentDataOne = data.data.oneAgencyDayIncome;
            this.GoldAgentDataTow = data.data.twoAgencyDayIncome;
            this.GoldAgentDataThree = data.data.threeAgencyDayIncome;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //初始获取当前比价
    PostBTCinformationFuction() {
      var _this = this;
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myArr = ["requestId=" + myRequestId];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/order/calculator/btcMarketInfo.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post("BitcoinPrice", qs.stringify({}), {
          requestId: myRequestId,
          timestamp: myTimestamp,
          channelType: "h5",
          sign: myFunctionValues
        })
        .then(data => {
          if (data.status == "success") {
            this.GoldCurrentPriceInput = data.data.currentPrice;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.PostBTCinformationFuction();
    this.GoldCalculatorClick();
  }
};
</script>
<style lang='scss'>
@import "../../style/Mythem";
.baccolor {
  height: 20px;
  background: #f2f2f8;
}
.GoldCalculatorForm {
  background: #fff;
  padding-bottom: 50px;
  border-bottom: 1px solid #dfdfdf;
}
.GoldCalculatorForm > div {
  padding-top: 80px;
}
.GoldCalculatorForm > div:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldFormTitleAndInput > div {
  font-size: 28px;
  color: #373d41;
}
.GoldFormTitleAndInput > div:first-child {
  float: left;
  margin-left: 24px;
}
.GoldFormTitleAndInput > div:nth-child(2) {
  margin-right: 24px;
}
.GoldFormTitleAndInput > div:nth-child(2),
.GoldFormTitleAndInput > div:nth-child(3) {
  float: right;
  color: #949494;
}
.GoldFormTitleAndInput > div:nth-child(3) {
  width: 407px;
  margin-right: 50px;
}
.GoldFormTitleAndInput > div:nth-child(3) > input {
  padding-bottom: 30px;
  width: 100%;
}
.GoldCalculationAndReset {
  margin: auto;
}
.GoldCalculationAndReset > button {
  width: 200px;
  height: 72px;
  border-radius: 2px;
  font-size: 28px;
  border: 0;
  box-sizing: border-box;
  /* padding: 0; */
}
.GoldCalculationAndReset > button:first-child {
  margin-left: 88px;
}
.GoldCalculationAndReset > button:nth-child(2) {
  background: #fff;
  color: #0287ff;
  border: 1px solid #0287ff;
  margin-left: 174px;
  box-sizing: border-box;
}
.GoldCalculationAndReset > button:focus {
  outline: 0;
}
.GoldExpectedProfitOverview {
  background: #fff;
}
.GoldExpectedProfitOverview > h1:first-child {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  text-align: center;
  padding: 50px 0;
  border-bottom: 1px solid #f2f2f2;
  box-sizing: border-box;
}
.NoGoldCalculationBtn {
  pointer-events: none;
  background: #eee !important;
  color: #949494 !important;
}
.YesGoldCalculationBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.GoldExpectedProfitBody {
  background: #fff;
  padding: 50px 0;
  border-bottom: 1px solid #f2f2f2;
}
.GoldExpectedProfitBody:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldExpectedProfitBody > div {
  width: 50%;
  float: left;
  box-sizing: border-box;
  padding: 0 24px;
  font-size: 28px;
}
.GoldExpectedProfitRight {
  border-left: 1px solid #f2f2f2;
}
.GoldExpectedProfitRight > ul > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldExpectedProfitLeft > ul > li,
.GoldExpectedProfitRight > ul > li {
  padding-bottom: 50px;
}
.GoldExpectedProfitLeft > ul > li:last-child,
.GoldExpectedProfitRight > ul > li:last-child {
  padding-bottom: 0;
}
.GoldExpectedProfitLeft > ul > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldExpectedProfitLeft > ul > li > div:nth-child(1),
.GoldExpectedProfitRight > ul > li > div:nth-child(1) {
  float: left;
  color: #949494;
}
.GoldExpectedProfitLeft > ul > li > div:nth-child(2),
.GoldExpectedProfitRight > ul > li > div:nth-child(2) {
  float: right;
  color: #373d41;
}
.GoldExpectedProfitBottom {
  background: #fff;
  padding: 50px 24px;
}
.GoldExpectedProfitBottom > h1 {
  font-size: 28px;
  color: #949494;
}
.GoldAgentTitle:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldAgentTitle {
  padding-top: 50px;
}
.GoldAgentTitle > li {
  width: 33.33%;
  float: left;
  font-size: 26px;
  color: #949494;
  text-align: center;
}
.GoldAgentData:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldAgentData {
  padding-top: 30px;
}
.GoldAgentData > li {
  width: 33.33%;
  float: left;
  font-size: 26px;
  color: #373d41;
  text-align: center;
}
.GoldFrozenUl {
  position: relative;
}
.GoldFrozenUl:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldFrozenUl > li {
  float: left;
  width: 33.33%;
  padding-top: 20px;
  text-align: center;
  font-size: 26px;
  color: #949494;
}
.GoldFrozenUl > li:nth-child(3) > div > span,
.GoldFrozenUl > li:nth-child(2) > div > span {
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-left: 10px;
}
.GoldFrozenUl > li:nth-child(3) > div > span > img,
.GoldFrozenUl > li:nth-child(2) > div > span > img {
  width: 100%;
  height: 100%;
}
.GoldTitleStyle {
  width: 252px;
  height: 140px;
  position: absolute;
  top: -110px;
  right: 27px;
  // background:url('../../static/img/CalculatorTow.png') no-repeat;
  // background-size: 100% 100%;
}
.firstGoldTitleStyle {
  width: 252px;
  position: absolute;
  top: -110px;
  right: 196px;
  // background:url('../../static/img/CalculatorTow.png') no-repeat;
  // background-size: 100% 100%;
}
.firstGoldTriangle {
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 0px solid transparent;
  border-top: 10px solid #949494;
  position: relative;
  top: 0px;
  right: -1px;
  margin: auto;
}
.GoldTriangle {
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 0px solid transparent;
  border-top: 10px solid rgba(000, 000, 000, 0.5);
  position: relative;
  top: 0px;
  right: -181px;
}
.firstGoldText {
  width: 100%;
  color: #fff;
  background: #949494;
  word-wrap: break-word;
  font-size: 20px;
  padding: 30px;
  line-height: 30px;
}
.GoldText {
  width: 100%;
  color: #fff;
  background: #949494;
  word-wrap: break-word;
  font-size: 20px;
  padding: 30px;
  line-height: 30px;
}
.GoldMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
}
.GoldLadder:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldLadder {
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
}
.GoldLadder > li {
  float: left;
  width: 33.33%;
  padding: 50px 0;
}
.GoldLadder > li > div {
  width: 160px;
  height: 60px;
  border-radius: 2px;
  margin: auto;
  text-align: center;
  font-size: 28px;
  color: #949494;
  line-height: 60px;
  background: #eaeaea;
}
.YesGoldLadder {
  color: #fff !important;
  background: #0287ff !important;
}
</style>


