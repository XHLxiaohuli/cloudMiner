<template>
  <div class="DiamondCalculatorBody">
    <ul class="DiamondLadder">
      <li v-for="(item,index) in DiamondLadderData">
        <div @click="DiamondLadderClick(index)" :class="{YesDiamondLadder:index==DiamondLadderIndex}">{{item}}</div>
      </li>
    </ul>
    <div class="DiamondCalculatorForm">
      <div class="DiamondFormTitleAndInput">
        <div>当前币价</div>
        <div>元</div>
        <div>
          <input type="text" v-model="DiamondCurrentPriceInput" @focus="DiamondCurrentPriceFocus" @blur="DiamondCurrentPriceBlur" :style="'border-bottom: 1px solid '+DiamondCurrentPriceBorder">
        </div>
      </div>
      <div class="DiamondFormTitleAndInput">
        <div>一级矿工人数</div>
        <div>人</div>
        <div>
          <input type="text" v-model="DiamondClassAInput" @focus="DiamondClassABorderFocus" @blur="DiamondClassABorderBlur" :style="'border-bottom: 1px solid '+DiamondClassABorder">
        </div>
      </div>
      <div class="DiamondFormTitleAndInput">
        <div>二级矿工人数</div>
        <div>人</div>
        <div>
          <input type="text" v-model="DiamondClassBInput" @focus="DiamondClassBBorderFocus" @blur="DiamondClassBBorderBlur" :style="'border-bottom: 1px solid '+DiamondClassBBorder">
        </div>
      </div>
      <div class="DiamondFormTitleAndInput">
        <div>三级矿工人数</div>
        <div>人</div>
        <div>
          <input type="text" v-model="DiamondClassCInput" @focus="DiamondClassCBorderFocus" @blur="DiamondClassCBorderBlur" :style="'border-bottom: 1px solid '+DiamondClassCBorder">
        </div>
      </div>
      <div class="DiamondCalculationAndReset">
        <button class="NoDiamondCalculationBtn" @click="DiamondCalculatorClick" :class="{YesDiamondCalculationBtn:(DiamondCurrentPriceInput!=='')&&(DiamondClassAInput!==''||DiamondClassBInput!==''||DiamondClassCInput!=='')}">计算</button><button @click="DiamondResetBtn">重置</button>
      </div>
    </div>
    <div class='baccolor'></div>
    <div class="DiamondExpectedProfitOverview">
      <h1>预期利润概览</h1>
      <div class="DiamondExpectedProfitBody">
        <div class="DiamondExpectedProfitLeft">
          <ul>
            <li>
              <div>总利润</div>
              <div>{{DiamondExpectedProfitLeftOne}}元</div>
            </li>
            <li>
              <div>冻结利润</div>
              <div>{{DiamondExpectedProfitLeftTow}}元</div>
            </li>
            <li>
              <div>总收入</div>
              <div>{{DiamondExpectedProfitLeftThree}}元</div>
            </li>
            <li>
              <div>每T价格</div>
              <div>{{DiamondExpectedProfitLeftFour}}元</div>
            </li>
            <li>
              <div>电费</div>
              <div>{{DiamondExpectedProfitLeftFive}}元</div>
            </li>
            <li>
              <div>维护费</div>
              <div>{{DiamondExpectedProfitLeftSix}}元</div>
            </li>
          </ul>
        </div>
        <div class="DiamondExpectedProfitRight">
          <ul>
            <li>
              <div>每日利润</div>
              <div>{{DiamondExpectedProfitRightOne}}元</div>
            </li>
            <li>
              <div>每日冻结利润</div>
              <div>{{DiamondExpectedProfitRighttTow}}元</div>
            </li>
            <li>
              <div>每日收入</div>
              <div>{{DiamondExpectedProfitRightThree}}元</div>
            </li>
            <li>
              <div>每日电费</div>
              <div>{{DiamondExpectedProfitRightFour}}元</div>
            </li>
            <li>
              <div>挖矿天数</div>
              <div>{{DiamondExpectedProfitRightFive}}天</div>
            </li>
            <li>
              <div>投资回报率</div>
              <div>{{DiamondExpectedProfitRightSix}}%</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="DiamondExpectedProfitBottom">
        <h1>每日邀请收益</h1>
        <ul class="DiamondAgentTitle">
          <li>一级邀请</li>
          <li>二级邀请</li>
          <li>三级邀请</li>
        </ul>
        <ul class="DiamondAgentData">
          <li>{{DiamondAgentDataOne}}元</li>
          <li>{{DiamondAgentDataTow}}元</li>
          <li>{{DiamondAgentDataThree}}元</li>
        </ul>
        <ul class="DiamondFrozen">
          <li></li>
          <li>
            <div v-show="DiamondLadderVaule<2">
              <div v-show="firsDiamondTitleShow" class="firstDiamondTitleStyle">
                <div class="firstDiamondText">钻石二级邀请收益在加入中级钻石矿工后解锁</div>
                <div class="firstDiamondTriangle"></div>
              </div>
              冻结<span @click="firsDiamondTitleClick"></span>
            </div>
          </li>
          <li>
            <div v-show="DiamondLadderVaule<3">
              <div v-show="DiamondTitleShow" class="DiamondTitleStyle">
                <div class="DiamondText">钻石三级邀请收益在加入高级钻石矿工后解锁</div>
                <div class="DiamondTriangle"></div>
              </div>
              冻结<span @click="DiamondTitleClick"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="DiamondMask" v-show="DiamondMaskShow" @click="DiamondMaskClick"></div>
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
      DiamondCurrentPriceBorder: "#b8b8b8",
      DiamondClassABorder: "#b8b8b8",
      DiamondClassBBorder: "#b8b8b8",
      DiamondClassCBorder: "#b8b8b8",
      DiamondCurrentPriceInput: "", //双向绑定当前币价
      DiamondClassAInput: "5", //一级矿工人数双向绑定
      DiamondClassBInput: "25", //二级矿工人数双向绑定
      DiamondClassCInput: "125", //三级矿工人数双向绑定
      //收益预览数据start
      DiamondExpectedProfitLeftOne: "",
      DiamondExpectedProfitLeftTow: "",
      DiamondExpectedProfitLeftThree: "",
      DiamondExpectedProfitLeftFour: "",
      DiamondExpectedProfitLeftFive: "",
      DiamondExpectedProfitLeftSix: "",

      DiamondExpectedProfitRightOne: "",
      DiamondExpectedProfitRighttTow: "",
      DiamondExpectedProfitRightThree: "",
      DiamondExpectedProfitRightFour: "",
      DiamondExpectedProfitRightFive: "",
      DiamondExpectedProfitRightSix: "",

      DiamondLadderData: ["初级钻石", "中级钻石", "高级钻石"],
      DiamondLadderIndex: 2,
      DiamondLadderVaule: 3,
      firsDiamondTitleShow: false,
      DiamondTitleShow: false,
      DiamondMaskShow: false,

      DiamondAgentDataOne: "",
      DiamondAgentDataTow: "",
      DiamondAgentDataThree: "",
      //收益预览数据end

      myTime: ""
    };
  },
  methods: {
    //钻石小等级
    DiamondLadderClick(index) {
      this.DiamondLadderIndex = index;
      this.DiamondLadderVaule = index;
      this.DiamondLadderVaule++;
      this.DiamondCalculatorClick();
    },
    //冻结提示
    firsDiamondTitleClick() {
      this.firsDiamondTitleShow = true;
      this.DiamondTitleShow = false;
      this.DiamondMaskShow = true;
    },
    DiamondTitleClick() {
      this.firsDiamondTitleShow = false;
      this.DiamondTitleShow = true;
      this.DiamondMaskShow = true;
    },
    DiamondMaskClick() {
      this.firsDiamondTitleShow = false;
      this.DiamondTitleShow = false;
      this.DiamondMaskShow = false;
    },
    //当前币价获取焦点下边框变蓝色
    DiamondCurrentPriceFocus() {
      this.DiamondCurrentPriceBorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //当前币价失去焦点变回原来颜色
    DiamondCurrentPriceBlur() {
      this.DiamondCurrentPriceBorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //一级代理人数获取焦点下边框变蓝色
    DiamondClassABorderFocus() {
      this.DiamondClassABorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //一级代理人数失去焦点变回原来颜色
    DiamondClassABorderBlur() {
      this.DiamondClassABorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //二级代理人数获取焦点下边框变蓝色
    DiamondClassBBorderFocus() {
      this.DiamondClassBBorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //二级代理人数失去焦点变回原来颜色
    DiamondClassBBorderBlur() {
      this.DiamondClassBBorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //三级代理人数获取焦点下边框变蓝色
    DiamondClassCBorderFocus() {
      this.DiamondClassCBorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //三级代理人数失去焦点变回原来颜色
    DiamondClassCBorderBlur() {
      this.DiamondClassCBorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //重置按钮
    DiamondResetBtn() {
      this.DiamondClassAInput = "";
      this.DiamondClassBInput = "";
      this.DiamondClassCInput = "";
      this.DiamondExpectedProfitLeftOne = 0;
      this.DiamondExpectedProfitLeftTow = 0;
      this.DiamondExpectedProfitLeftThree = 0;
      this.DiamondExpectedProfitLeftFour = 0;
      this.DiamondExpectedProfitLeftFive = 0;
      this.DiamondExpectedProfitLeftSix = 0;

      this.DiamondExpectedProfitRightOne = 0;
      this.DiamondExpectedProfitRighttTow = 0;
      this.DiamondExpectedProfitRightThree = 0;
      this.DiamondExpectedProfitRightFour = 0;
      this.DiamondExpectedProfitRightFive = 0;
      this.DiamondExpectedProfitRightSix = 0;

      this.DiamondAgentDataOne = 0;
      this.DiamondAgentDataTow = 0;
      this.DiamondAgentDataThree = 0;
    },
    //计算按钮
    DiamondCalculatorClick() {
      // this.myTime = Math.round(new Date().getTime() / 1000).toString();
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myCurrentBtcPrice = this.DiamondCurrentPriceInput;
      var myUserGrade = 3;
      var myUserStep = this.DiamondLadderVaule;
      var myOneMinerNumber = this.DiamondClassAInput;
      var myTwoMinerNumber = this.DiamondClassBInput;
      var myThreeMinerNumber = this.DiamondClassCInput;
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
            userGrade: 3,
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
            this.DiamondExpectedProfitLeftOne = data.data.totalProfit;
            this.DiamondExpectedProfitLeftTow = data.data.totalFreezeProfit;
            this.DiamondExpectedProfitLeftThree = data.data.totalIncome;
            this.DiamondExpectedProfitLeftFour = data.data.evertUnitPrice;
            this.DiamondExpectedProfitLeftFive = data.data.electricCharge;
            this.DiamondExpectedProfitLeftSix = data.data.maintenanceCharge;

            this.DiamondExpectedProfitRightOne = data.data.everydayProfit;
            this.DiamondExpectedProfitRighttTow =
              data.data.everydayFreezeProfit;
            this.DiamondExpectedProfitRightThree = data.data.everydayIncome;
            this.DiamondExpectedProfitRightFour =
              data.data.everydayElectricCharge;
            this.DiamondExpectedProfitRightFive = data.data.miningDay;
            this.DiamondExpectedProfitRightSix = data.data.investReturnRate;

            this.DiamondAgentDataOne = data.data.oneAgencyDayIncome;
            this.DiamondAgentDataTow = data.data.twoAgencyDayIncome;
            this.DiamondAgentDataThree = data.data.threeAgencyDayIncome;
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
            this.DiamondCurrentPriceInput = data.data.currentPrice;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.PostBTCinformationFuction();
    this.DiamondCalculatorClick();
  }
};
</script>
<style lang='scss'>
@import "../../style/Mythem";
.baccolor {
  height: 20px;
  background: #f2f2f8;
}
.DiamondCalculatorForm {
  background: #fff;
  padding-bottom: 50px;
  border-bottom: 1px solid #dfdfdf;
}
.DiamondCalculatorForm > div {
  padding-top: 80px;
}
.DiamondCalculatorForm > div:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondFormTitleAndInput > div {
  font-size: 28px;
  color: #373d41;
}
.DiamondFormTitleAndInput > div:first-child {
  float: left;
  margin-left: 24px;
}
.DiamondFormTitleAndInput > div:nth-child(2) {
  margin-right: 24px;
}
.DiamondFormTitleAndInput > div:nth-child(2),
.DiamondFormTitleAndInput > div:nth-child(3) {
  float: right;
  color: #949494;
}
.DiamondFormTitleAndInput > div:nth-child(3) {
  width: 407px;
  margin-right: 50px;
}
.DiamondFormTitleAndInput > div:nth-child(3) > input {
  padding-bottom: 30px;
  width: 100%;
}
.DiamondCalculationAndReset {
  margin: auto;
}
.DiamondCalculationAndReset > button {
  width: 200px;
  height: 72px;
  border-radius: 2px;
  font-size: 28px;
  border: 0;
  box-sizing: border-box;
  /* padding: 0; */
}
.DiamondCalculationAndReset > button:first-child {
  margin-left: 88px;
}
.DiamondCalculationAndReset > button:nth-child(2) {
  background: #fff;
  color: #0287ff;
  border: 1px solid #0287ff;
  margin-left: 174px;
  box-sizing: border-box;
}
.DiamondCalculationAndReset > button:focus {
  outline: 0;
}
.DiamondExpectedProfitOverview {
  background: #fff;
}
.DiamondExpectedProfitOverview > h1:first-child {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  text-align: center;
  padding: 50px 0;
  border-bottom: 1px solid #f2f2f2;
  box-sizing: border-box;
}
.NoDiamondCalculationBtn {
  pointer-events: none;
  background: #eee !important;
  color: #949494 !important;
}
.YesDiamondCalculationBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.DiamondExpectedProfitBody {
  background: #fff;
  padding: 50px 0;
  border-bottom: 1px solid #f2f2f2;
}
.DiamondExpectedProfitBody:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondExpectedProfitBody > div {
  width: 50%;
  float: left;
  box-sizing: border-box;
  padding: 0 24px;
  font-size: 28px;
}
.DiamondExpectedProfitRight {
  border-left: 1px solid #f2f2f2;
}
.DiamondExpectedProfitRight > ul > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondExpectedProfitLeft > ul > li,
.DiamondExpectedProfitRight > ul > li {
  padding-bottom: 50px;
}
.DiamondExpectedProfitLeft > ul > li:last-child,
.DiamondExpectedProfitRight > ul > li:last-child {
  padding-bottom: 0;
}
.DiamondExpectedProfitLeft > ul > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondExpectedProfitLeft > ul > li > div:nth-child(1),
.DiamondExpectedProfitRight > ul > li > div:nth-child(1) {
  float: left;
  color: #949494;
}
.DiamondExpectedProfitLeft > ul > li > div:nth-child(2),
.DiamondExpectedProfitRight > ul > li > div:nth-child(2) {
  float: right;
  color: #373d41;
}
.DiamondExpectedProfitBottom {
  background: #fff;
  padding: 50px 24px;
}
.DiamondExpectedProfitBottom > h1 {
  font-size: 28px;
  color: #949494;
}
.DiamondAgentTitle:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondAgentTitle {
  padding-top: 50px;
}
.DiamondAgentTitle > li {
  width: 33.33%;
  float: left;
  font-size: 26px;
  color: #949494;
  text-align: center;
}
.DiamondAgentData:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondAgentData {
  padding-top: 30px;
}
.DiamondAgentData > li {
  width: 33.33%;
  float: left;
  font-size: 26px;
  color: #373d41;
  text-align: center;
}
.DiamondLadder:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondLadder {
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
}
.DiamondLadder > li {
  float: left;
  width: 33.33%;
  padding: 50px 0;
}
.DiamondLadder > li > div {
  width: 160px;
  height: 60px;
  font-size: 28px;
  color: #949494;
  background: #eaeaea;
  border-radius: 2px;
  line-height: 60px;
  text-align: center;
  margin: auto;
}
.YesDiamondLadder {
  color: #fff !important;
  background: #0287ff !important;
}
.DiamondFrozen:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondFrozen {
  background: #fff;
  position: relative;
}
.DiamondFrozen > li {
  float: left;
  width: 33.33%;
  padding-top: 20px;
  text-align: center;
  font-size: 26px;
  color: #949494;
}
.DiamondFrozen > li:nth-child(3) > div > span,
.DiamondFrozen > li:nth-child(2) > div > span {
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-left: 10px;
  background: url("../../static/img/frozen.png") no-repeat;
  background-size: 100% 100%;
}
.DiamondTitleStyle {
  width: 252px;
  position: absolute;
  top: -110px;
  right: 27px;
  // background:url('../../static/img/CalculatorTow.png') no-repeat;
  // background-size: 100% 100%;
}
.firstDiamondTitleStyle {
  width: 252px;
  position: absolute;
  top: -110px;
  right: 195px;
  // background:url('../../static/img/CalculatorTow.png') no-repeat;
  // background-size: 100% 100%;
}
.firstDiamondTriangle {
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 0px solid transparent;
  border-top: 10px solid #949494;
  position: relative;
  top: 0px;
  margin: auto;
}
.DiamondTriangle {
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 0px solid transparent;
  border-top: 10px solid #949494;
  position: relative;
  top: 0px;
  right: -182px;
}
.firstDiamondText {
  width: 100%;
  color: #fff;
  background: #949494;
  word-wrap: break-word;
  font-size: 20px;
  padding: 30px;
  line-height: 30px;
}
.DiamondText {
  width: 100%;
  color: #fff;
  background: #949494;
  word-wrap: break-word;
  font-size: 20px;
  padding: 30px;
  line-height: 30px;
}
.DiamondMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
}
</style>


