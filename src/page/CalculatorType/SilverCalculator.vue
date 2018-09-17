<template>
  <div class="SilverCalculatorBody">
    <ul class="SilverLadder">
      <li v-for="(item,index) in SilverLadderData">
        <div @click="SilverLadderClick(index)" :class='{YesSilverLadder:index==SilverLadderIndex}'>{{item}}</div>
      </li>
    </ul>
    <div class="SilverCalculatorForm">
      <div class="SilverFormTitleAndInput">
        <div>当前币价</div>
        <div>元</div>
        <div>
          <input type="text" v-model="SilverCurrentPriceInput" @focus="SilverCurrentPriceFocus" @blur="SilverCurrentPriceBlur" :style="'border-bottom: 1px solid '+SilverCurrentPriceBorder">
        </div>
      </div>
      <div class="SilverFormTitleAndInput">
        <div>一级矿工人数</div>
        <div>人</div>
        <div>
          <input type="text" v-model="SilverClassAInput" @focus="SilverClassABorderFocus" @blur="SilverClassABorderBlur" :style="'border-bottom: 1px solid '+SilverClassABorder">
        </div>
      </div>
      <div class="SilverFormTitleAndInput">
        <div>二级矿工人数</div>
        <div>人</div>
        <div>
          <input type="text" v-model="SilverClassBInput" @focus="SilverClassBBorderFocus" @blur="SilverClassBBorderBlur" :style="'border-bottom: 1px solid '+SilverClassBBorder">
        </div>
      </div>
      <div class="SilverFormTitleAndInput">
        <div>三级矿工人数</div>
        <div>人</div>
        <div>
          <input type="text" v-model="SilverClassCInput" @focus="SilverClassCBorderFocus" @blur="SilverClassCBorderBlur" :style="'border-bottom: 1px solid '+SilverClassCBorder">
        </div>
      </div>
      <div class="SilverCalculationAndReset">
        <button class="NoSilverCalculationBtn" @click="SilverCalculatorClick" :class="{YesSilverCalculationBtn:(SilverCurrentPriceInput!=='')&&(SilverClassAInput!==''||SilverClassBInput!==''||SilverClassCInput!=='')}">计算</button><button @click="SilverResetBtn">重置</button>
      </div>
    </div>
    <div class='baccolor'></div>
    <div class="SilverExpectedProfitOverview">
      <h1>预期利润概览</h1>
      <div class="SilverExpectedProfitBody">
        <div class="SilverExpectedProfitLeft">
          <ul>
            <li>
              <div>总利润</div>
              <div>{{SilverExpectedProfitLeftOne}}元</div>
            </li>
            <li>
              <div>冻结利润</div>
              <div>{{SilverExpectedProfitLeftTow}}元</div>
            </li>
            <li>
              <div>总收入</div>
              <div>{{SilverExpectedProfitLeftThree}}元</div>
            </li>
            <li>
              <div>每T价格</div>
              <div>{{SilverExpectedProfitLeftFour}}元</div>
            </li>
            <li>
              <div>电费</div>
              <div>{{SilverExpectedProfitLeftFive}}元</div>
            </li>
            <li>
              <div>维护费</div>
              <div>{{SilverExpectedProfitLeftSix}}元</div>
            </li>
          </ul>
        </div>
        <div class="SilverExpectedProfitRight">
          <ul>
            <li>
              <div>每日利润</div>
              <div>{{SilverExpectedProfitRightOne}}元</div>
            </li>
            <li>
              <div>每日冻结利润</div>
              <div>{{SilverExpectedProfitRighttTow}}元</div>
            </li>
            <li>
              <div>每日收入</div>
              <div>{{SilverExpectedProfitRightThree}}元</div>
            </li>
            <li>
              <div>每日电费</div>
              <div>{{SilverExpectedProfitRightFour}}元</div>
            </li>
            <li>
              <div>挖矿天数</div>
              <div>{{SilverExpectedProfitRightFive}}天</div>
            </li>
            <li>
              <div>投资回报率</div>
              <div>{{SilverExpectedProfitRightSix}}%</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="SilverExpectedProfitBottom">
        <h1>每日邀请收益</h1>
        <ul class="SilverAgentTitle">
          <li>一级邀请</li>
          <li>二级邀请</li>
          <li>三级邀请</li>
        </ul>
        <ul class="SilverAgentData">
          <li>{{SilverAgentDataOne}}元</li>
          <li>{{SilverAgentDataTow}}元</li>
          <li>{{SilverAgentDataThree}}元</li>
        </ul>
        <ul class="FrozenUl">
          <li></li>
          <li>
            <div class="TowFrozen" v-show="TowFrozenShow">
              <div class="TowFrozenText">白银二级邀请收益在加入中级白银矿工后解锁</div>
              <div class="TowFrozenTriangle"></div>
            </div>
            <div v-show="SilverLadderVaule<2">冻结<span class="TowNoPic" @click="TowFrozenClick"></span></div>
          </li>
            <div class="ThreeFrozen" v-show="ThreeFrozenShow">
              <div class="ThreeFrozenTexr">白银三级邀请收益在加入高级白银矿工后解锁</div>
              <div class="ThreeFrozenTriangle"></div>
            </div>
          <li v-show="SilverLadderVaule<3">冻结<span @click="ThreeFrozenClick"></span></li>
        </ul>
      </div>
    </div>
    <!--遮罩层-->
    <div v-show="SilverMaskShow" @click="SilverMaskClick" class="SilverMask"></div>
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
      SilverCurrentPriceBorder: "#b8b8b8",
      SilverClassABorder: "#b8b8b8",
      SilverClassBBorder: "#b8b8b8",
      SilverClassCBorder: "#b8b8b8",
      SilverCurrentPriceInput: "", //双向绑定当前币价
      SilverClassAInput: "5", //一级矿工人数双向绑定
      SilverClassBInput: "25", //二级矿工人数双向绑定
      SilverClassCInput: "125", //三级矿工人数双向绑定
      //收益预览数据start
      SilverExpectedProfitLeftOne: "",
      SilverExpectedProfitLeftTow: "",
      SilverExpectedProfitLeftThree: "",
      SilverExpectedProfitLeftFour: "",
      SilverExpectedProfitLeftFive: "",
      SilverExpectedProfitLeftSix: "",

      SilverExpectedProfitRightOne: "",
      SilverExpectedProfitRighttTow: "",
      SilverExpectedProfitRightThree: "",
      SilverExpectedProfitRightFour: "",
      SilverExpectedProfitRightFive: "",
      SilverExpectedProfitRightSix: "",

      SilverAgentDataOne: "",
      SilverAgentDataTow: "",
      SilverAgentDataThree: "",
      //收益预览数据end

      SilverLadderData: ["初级白银", "中级白银", "高级白银"],
      SilverLadderIndex: 2,
      SilverLadderVaule: 3,

      TowFrozenShow: false,
      ThreeFrozenShow: false,
      SilverMaskShow: false,

      myTime: ""
    };
  },
  methods: {
    //等级选择
    SilverLadderClick(index) {
      this.SilverLadderIndex = index;
      this.SilverLadderVaule = index;
      this.SilverLadderVaule++;
      this.SilverCalculatorClick();
    },
    //冻结提示
    TowFrozenClick() {
      this.TowFrozenShow = true;
      this.ThreeFrozenShow = false;
      this.SilverMaskShow = true;
    },
    ThreeFrozenClick() {
      this.TowFrozenShow = false;
      this.ThreeFrozenShow = true;
      this.SilverMaskShow = true;
    },
    SilverMaskClick() {
      this.TowFrozenShow = false;
      this.ThreeFrozenShow = false;
      this.SilverMaskShow = false;
    },
    //当前币价获取焦点下边框变蓝色
    SilverCurrentPriceFocus() {
      this.SilverCurrentPriceBorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //当前币价失去焦点变回原来颜色
    SilverCurrentPriceBlur() {
      this.SilverCurrentPriceBorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //一级代理人数获取焦点下边框变蓝色
    SilverClassABorderFocus() {
      this.SilverClassABorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //一级代理人数失去焦点变回原来颜色
    SilverClassABorderBlur() {
      this.SilverClassABorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //二级代理人数获取焦点下边框变蓝色
    SilverClassBBorderFocus() {
      this.SilverClassBBorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //二级代理人数失去焦点变回原来颜色
    SilverClassBBorderBlur() {
      this.SilverClassBBorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //三级代理人数获取焦点下边框变蓝色
    SilverClassCBorderFocus() {
      this.SilverClassCBorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //三级代理人数失去焦点变回原来颜色
    SilverClassCBorderBlur() {
      this.SilverClassCBorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
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
            this.SilverCurrentPriceInput = data.data.currentPrice;
          }
        })
        .catch(err => {
          console.log(err);
        });

      // }
    },
    //重置按钮
    SilverResetBtn() {
      this.SilverClassAInput = "";
      this.SilverClassBInput = "";
      this.SilverClassCInput = "";
      this.SilverExpectedProfitLeftOne = 0;
      this.SilverExpectedProfitLeftTow = 0;
      this.SilverExpectedProfitLeftThree = 0;
      this.SilverExpectedProfitLeftFour = 0;
      this.SilverExpectedProfitLeftFive = 0;
      this.SilverExpectedProfitLeftSix = 0;

      this.SilverExpectedProfitRightOne = 0;
      this.SilverExpectedProfitRighttTow = 0;
      this.SilverExpectedProfitRightThree = 0;
      this.SilverExpectedProfitRightFour = 0;
      this.SilverExpectedProfitRightFive = 0;
      this.SilverExpectedProfitRightSix = 0;

      this.SilverAgentDataOne = 0;
      this.SilverAgentDataTow = 0;
      this.SilverAgentDataThree = 0;
    },
    //计算按钮
    SilverCalculatorClick() {
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myCurrentBtcPrice = this.SilverCurrentPriceInput;
      var myUserGrade = 1;
      var myUserStep = this.SilverLadderVaule;
      var myOneMinerNumber = this.SilverClassAInput;
      var myTwoMinerNumber = this.SilverClassBInput;
      var myThreeMinerNumber = this.SilverClassCInput;
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
            userGrade: myUserGrade,
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
            this.SilverExpectedProfitLeftOne = data.data.totalProfit;
            this.SilverExpectedProfitLeftTow = data.data.totalFreezeProfit;
            this.SilverExpectedProfitLeftThree = data.data.totalIncome;
            this.SilverExpectedProfitLeftFour = data.data.evertUnitPrice;
            this.SilverExpectedProfitLeftFive = data.data.electricCharge;
            this.SilverExpectedProfitLeftSix = data.data.maintenanceCharge;

            this.SilverExpectedProfitRightOne = data.data.everydayProfit;
            this.SilverExpectedProfitRighttTow = data.data.everydayFreezeProfit;
            this.SilverExpectedProfitRightThree = data.data.everydayIncome;
            this.SilverExpectedProfitRightFour =
              data.data.everydayElectricCharge;
            this.SilverExpectedProfitRightFive = data.data.miningDay;
            this.SilverExpectedProfitRightSix = data.data.investReturnRate;

            this.SilverAgentDataOne = data.data.oneAgencyDayIncome;
            this.SilverAgentDataTow = data.data.twoAgencyDayIncome;
            this.SilverAgentDataThree = data.data.threeAgencyDayIncome;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.PostBTCinformationFuction();
    this.SilverCalculatorClick();
  }
};
</script>
<style lang='scss'>
@import "../../style/Mythem";
.baccolor {
  height: 20px;
  background: #f2f2f8;
}
.SilverCalculatorForm {
  background: #fff;
  padding-bottom: 50px;
  border-bottom: 1px solid #dfdfdf;
}
.SilverCalculatorForm > div {
  padding-top: 80px;
}
.SilverCalculatorForm > div:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverFormTitleAndInput > div {
  font-size: 28px;
  color: #373d41;
}
.SilverFormTitleAndInput > div:first-child {
  float: left;
  margin-left: 24px;
}
.SilverFormTitleAndInput > div:nth-child(2) {
  margin-right: 24px;
}
.SilverFormTitleAndInput > div:nth-child(2),
.SilverFormTitleAndInput > div:nth-child(3) {
  float: right;
  color: #949494;
}
.SilverFormTitleAndInput > div:nth-child(3) {
  width: 407px;
  margin-right: 50px;
}
.SilverFormTitleAndInput > div:nth-child(3) > input {
  padding-bottom: 30px;
  width: 100%;
}
.SilverCalculationAndReset {
  margin: auto;
}
.SilverCalculationAndReset > button {
  width: 200px;
  height: 72px;
  border-radius: 2px;
  font-size: 28px;
  border: 0;
  box-sizing: border-box;
  /* padding: 0; */
}
.SilverCalculationAndReset > button:first-child {
  margin-left: 88px;
}
.SilverCalculationAndReset > button:nth-child(2) {
  background: #fff;
  color: #0287ff;
  border: 1px solid #0287ff;
  margin-left: 174px;
  box-sizing: border-box;
}
.SilverCalculationAndReset > button:focus {
  outline: 0;
}
.SilverExpectedProfitOverview {
  background: #fff;
}
.SilverExpectedProfitOverview > h1:first-child {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  text-align: center;
  padding: 50px 0;
  border-bottom: 1px solid #f2f2f2;
  box-sizing: border-box;
}
.NoSilverCalculationBtn {
  pointer-events: none;
  background: #eee !important;
  color: #949494 !important;
}
.YesSilverCalculationBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.SilverExpectedProfitBody {
  background: #fff;
  padding: 50px 0;
  border-bottom: 1px solid #f2f2f2;
}
.SilverExpectedProfitBody:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverExpectedProfitBody > div {
  width: 50%;
  float: left;
  box-sizing: border-box;
  padding: 0 24px;
  font-size: 28px;
}
.SilverExpectedProfitRight {
  border-left: 1px solid #f2f2f2;
}
.SilverExpectedProfitRight > ul > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverExpectedProfitLeft > ul > li,
.SilverExpectedProfitRight > ul > li {
  padding-bottom: 50px;
}
.SilverExpectedProfitLeft > ul > li:last-child,
.SilverExpectedProfitRight > ul > li:last-child {
  padding-bottom: 0;
}
.SilverExpectedProfitLeft > ul > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverExpectedProfitLeft > ul > li > div:nth-child(1),
.SilverExpectedProfitRight > ul > li > div:nth-child(1) {
  float: left;
  color: #949494;
}
.SilverExpectedProfitLeft > ul > li > div:nth-child(2),
.SilverExpectedProfitRight > ul > li > div:nth-child(2) {
  float: right;
  color: #373d41;
}
.SilverExpectedProfitBottom {
  background: #fff;
  padding: 50px 24px;
}
.SilverExpectedProfitBottom > h1 {
  font-size: 28px;
  color: #949494;
}
.SilverAgentTitle:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverAgentTitle {
  padding-top: 50px;
}
.SilverAgentTitle > li {
  width: 33.33%;
  float: left;
  font-size: 26px;
  color: #949494;
  text-align: center;
}
.SilverAgentData:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverAgentData {
  padding-top: 30px;
}
.SilverAgentData > li {
  width: 33.33%;
  float: left;
  font-size: 26px;
  color: #373d41;
  text-align: center;
}
.FrozenUl {
  position: relative;
}
.FrozenUl:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.FrozenUl > li {
  width: 33.33%;
  float: left;
  font-size: 26px;
  color: #373d41;
  text-align: center;
  padding-top: 20px;
  font-size: 26px;
  color: #949494;
}
.FrozenUl > li > span {
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-left: 10px;
  background: url("../../static/img/frozen.png") no-repeat;
  background-size: 100% 100%;
}
.TowNoPic {
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-left: 10px;
  background: url("../../static/img/frozen.png") no-repeat;
  background-size: 100% 100%;
}
.TowFrozen {
  width: 252px;
  position: absolute;
  top: -110px;
  right: 195px;
  // background:url('../../static/img/CalculatorOne.png') no-repeat;
  // background-size: 100% 100%;
  background: transparent;
}
.TowFrozenTriangle {
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
.ThreeFrozenTriangle {
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
.ThreeFrozenTexr {
  width: 100%;
  color: #fff;
  background: #949494;
  word-wrap: break-word;
  font-size: 20px;
  padding: 30px;
  line-height: 30px;
}
.TowFrozenText {
  width: 100%;
  color: #fff;
  background: #949494;
  word-wrap: break-word;
  font-size: 20px;
  padding: 30px;
  line-height: 30px;
}
.ThreeFrozen {
  width: 252px;
  // height: 140px;
  position: absolute;
  top: -110px;
  right: 27px;
  // background:url('../../static/img/CalculatorTow.png') no-repeat;
  // background-size: 100% 100%;
}
.SilverMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
}
.SilverLadder:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverLadder {
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
}
.SilverLadder > li {
  float: left;
  width: 33.33%;
  padding: 50px 0;
}
.SilverLadder > li > div {
  width: 160px;
  height: 60px;
  border-radius: 2px;
  color: #949494;
  font-size: 28px;
  margin: auto;
  text-align: center;
  line-height: 60px;
  background: #eaeaea;
}
.YesSilverLadder {
  color: #fff !important;
  background: #0287ff !important;
}
</style>


