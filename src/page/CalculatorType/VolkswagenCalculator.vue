<!--作者:var-->
<template>
  <div class="VolkswagenCalculatorBody">
    <div class="VolkswagenCalculatorForm">
      <div class="VolkswagenCalculatorInput">
        <div>当前币价</div>
        <div>元</div>
        <div>
          <input type="number" @focus="VolkswagenCurrencyPriceFocus" @blur="VolkswagenCurrencyPriceBlur" v-model="VolkswagenCurrencyPriceInput" :style="'border-bottom: 1px solid '+VolkswagenCurrencyPriceBorder">
        </div>
      </div>
      <div  class="VolkswagenCalculatorInput VolkswagenCalculatorInputTow">
        <div>购买T数</div>
        <div>T</div>
        <div>
          <input type="number" placeholder="请输入T数" @focus="VolkswagenPurchaseNumberFocus" @blur="VolkswagenPurchaseNumberBlur" v-model="VolkswagenPurchaseNumberInput" :style="'border-bottom: 1px solid '+VolkswagenPurchaseNumberBorder">
        </div>
      </div>
      <div class="VolkswagenCalculatorSubmitBtn">
        <button @click="VolkswagenCalculation" :class="{InputNotEmpty:(VolkswagenCurrencyPriceInput!=='')&&(VolkswagenPurchaseNumberInput!==''),InputYestEmpty:(VolkswagenCurrencyPriceInput=='')||(VolkswagenPurchaseNumberInput=='')}">计算</button><button @click="VolkswagenClearZeroClick">重置</button>
      </div>
    </div>
    <div class="VolkswagenExpectedProfitOverview">
      <h1>预期利润概览</h1>
      <!--第二次大众预期利润概览start-->
      <div class="VolkswagenExpectedBody">
        <div class="VolkswagenExpectedBodyLeft">
          <ul class="VolkswagenExpectedBodyLeftUl">
            <li>
              <div>总利润</div>
              <div>{{VolkswagenExpectedBodyLeftLiOne}}元</div>
            </li>
            <li>
              <div>总收入</div>
              <div>{{VolkswagenExpectedBodyLeftLiTow}}元</div>
            </li>
            <li>
              <div>每T价格</div>
              <div>{{VolkswagenExpectedBodyLeftLiThree}}元</div>
            </li>
            <li>
              <div>电费</div>
              <div>{{VolkswagenExpectedBodyLeftLiForu}}元</div>
            </li>
            <li>
              <div>维护费</div>
              <div>{{VolkswagenExpectedBodyLeftLiFive}}元</div>
            </li>
          </ul>
        </div>
        <div class="VolkswagenExpectedBodyRight">
          <ul class="VolkswagenExpectedBodyRightUl">
            <li>
              <div>每日利润</div>
              <div>{{VolkswagenExpectedBodyRightLiOne}}元</div>
            </li>
            <li>
              <div>每日收入</div>
              <div>{{VolkswagenExpectedBodyRightLiTow}}元</div>
            </li>
            <li>
              <div>每日电费</div>
              <div>{{VolkswagenExpectedBodyRightLiThree}}元</div>
            </li>
            <li>
              <div>挖矿天数</div>
              <div>{{VolkswagenExpectedBodyRightLiForu}}天</div>
            </li>
            <li>
              <div>投资回报率</div>
              <div>{{VolkswagenExpectedBodyRightLiFive}}%</div>
            </li>
          </ul>
        </div>
      </div>
      <!--第二次大众预期利润概览end-->
    </div>
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import myFunction from "@/page/encryption/encryption";
export default {
  components: {
    myFunction
  },
  data() {
    return {
      VolkswagenCurrencyPriceInput: "",
      VolkswagenPurchaseNumberInput: "10",
      //第二次预期利润概览数据satart
      VolkswagenExpectedBodyLeftLiOne: "",
      VolkswagenExpectedBodyLeftLiTow: "",
      VolkswagenExpectedBodyLeftLiThree: "",
      VolkswagenExpectedBodyLeftLiForu: "",
      VolkswagenExpectedBodyLeftLiFive: "",
      VolkswagenExpectedBodyRightLiOne: "",
      VolkswagenExpectedBodyRightLiTow: "",
      VolkswagenExpectedBodyRightLiThree: "",
      VolkswagenExpectedBodyRightLiForu: "",
      VolkswagenExpectedBodyRightLiFive: "",
      //第二次预期利润概览数据end
      VolkswagenCurrencyPriceBorder: "#b8b8b8",
      VolkswagenPurchaseNumberBorder: "#b8b8b8",
      eachTPrice: "",

      myTime: ""
    };
  },
  methods: {
    //当前币价输入框获取焦点下边框变蓝
    VolkswagenCurrencyPriceFocus() {
      this.VolkswagenCurrencyPriceBorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static"; //获取焦点改变原来的fixed布局，防止输入法弹出把底部导航挤上去
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //当前币价输入框失去焦点下边框变回原来颜色
    VolkswagenCurrencyPriceBlur() {
      this.VolkswagenCurrencyPriceBorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed"; //失去焦点变回原来的fixed布局
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //购买T数输入框获取焦点下边框变蓝
    VolkswagenPurchaseNumberFocus() {
      this.VolkswagenPurchaseNumberBorder = "#0287ff";
      document.getElementsByClassName("HomeNav")[0].style.position = "static";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "13.3335vw";
    },
    //购买T数输入框失去焦点下边框变回原来颜色
    VolkswagenPurchaseNumberBlur() {
      this.VolkswagenPurchaseNumberBorder = "#b8b8b8";
      document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
      document.getElementsByClassName("CalculatorFooter")[0].style.height =
        "26.667vw";
    },
    //清零按钮
    VolkswagenClearZeroClick() {
      this.VolkswagenPurchaseNumberInput = "";
      this.VolkswagenExpectedBodyLeftLiOne = 0;
      this.VolkswagenExpectedBodyLeftLiTow = 0;
      this.VolkswagenExpectedBodyLeftLiThree = 0;
      this.VolkswagenExpectedBodyLeftLiForu = 0;
      this.VolkswagenExpectedBodyLeftLiFive = 0;
      this.VolkswagenExpectedBodyRightLiOne = 0;
      this.VolkswagenExpectedBodyRightLiTow = 0;
      this.VolkswagenExpectedBodyRightLiThree = 0;
      this.VolkswagenExpectedBodyRightLiForu = 0;
      this.VolkswagenExpectedBodyRightLiFive = 0;
      this.PostBTCinformationFuction();
    },
    //初始获取当前比价
    PostBTCinformationFuction() {
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
            this.VolkswagenCurrencyPriceInput = data.data.currentPrice;
          }
        })
        .catch(err => {
          console.log(err);
        });
      // }
    },
    //计算按钮
    VolkswagenCalculation() {
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myCurrentBtcPrice = this.VolkswagenCurrencyPriceInput;
      var myBuyNumber = Number(
        this.VolkswagenPurchaseNumberInput.match(/^\d+(?:\.\d{0,1})?/)
      );
      var myArr = [
        "requestId=" + myRequestId,
        "currentBtcPrice=" + myCurrentBtcPrice,
        "buyNumber=" + myBuyNumber
      ];
      var myFunctionValue =
        myFunction.myFunction(myArr) +
        "/api/order/calculator/publicIncomeCal.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "PublicIncomeCalculator",
          qs.stringify({
            currentBtcPrice: myCurrentBtcPrice,
            buyNumber: myBuyNumber
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
            this.VolkswagenExpectedBodyLeftLiOne = data.data.totalProfit;
            this.VolkswagenExpectedBodyLeftLiTow = data.data.totalIncome;
            this.VolkswagenExpectedBodyLeftLiThree = data.data.evertUnitPrice;
            this.VolkswagenExpectedBodyLeftLiForu = data.data.electricCharge;
            this.VolkswagenExpectedBodyLeftLiFive = data.data.maintenanceCharge;
            this.VolkswagenExpectedBodyRightLiOne = data.data.everydayProfit;
            this.VolkswagenExpectedBodyRightLiTow = data.data.everydayIncome;
            this.VolkswagenExpectedBodyRightLiThree =
              data.data.everydayElectricCharge;
            this.VolkswagenExpectedBodyRightLiForu = data.data.miningDay;
            this.VolkswagenExpectedBodyRightLiFive = data.data.investReturnRate;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.PostBTCinformationFuction();
    this.VolkswagenCalculation();
  },
  mounted() {}
};
</script>
<style scoped>
.VolkswagenCalculatorForm {
  width: 100%;
  background: #fff;
  padding-top: 80px;
  font-size: 28px;
  padding-bottom: 50px;
  border-bottom: 1px solid #dfdfdf;
}
.VolkswagenCalculatorForm > div:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.VolkswagenCalculatorInput > div:first-child {
  float: left;
  margin-left: 24px;
}
.VolkswagenCalculatorInput > div:nth-child(2) {
  margin-right: 24px;
  width: 28px;
  color: #949494;
}
.VolkswagenCalculatorInput > div:nth-child(3) {
  width: 407px;
  margin-right: 50px;
}
.VolkswagenCalculatorInput > div:nth-child(3) > input {
  width: 100%;
  padding-left: 10px;
  padding-bottom: 30px;
  font-size: 28px;
  color: #373d41;
}
.VolkswagenCalculatorInput > div:nth-child(2),
.VolkswagenCalculatorInput > div:nth-child(3) {
  float: right;
}
.VolkswagenCalculatorInputTow {
  margin-top: 80px;
}
.VolkswagenCalculatorSubmitBtn {
  margin: auto;
  margin-top: 80px;
}
.VolkswagenCalculatorSubmitBtn > button {
  width: 200px;
  height: 72px;
  border-radius: 2px;
  font-size: 28px;
  border: 0;
  box-sizing: border-box;
}
.VolkswagenCalculatorSubmitBtn > button:first-child {
  margin-left: 88px;
}
.VolkswagenCalculatorSubmitBtn > button:nth-child(2) {
  background: #fff;
  color: #0287ff;
  border: 1px solid #0287ff;
  margin-left: 174px;
  box-sizing: border-box;
}
.VolkswagenExpectedProfitOverview {
  margin-top: 20px;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
}
.VolkswagenExpectedProfitOverview > h1:first-child {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  text-align: center;
  padding: 50px 0;
  border-bottom: 1px solid #f2f2f2;
  box-sizing: border-box;
}
.VolkswagenCalculatorSubmitBtn > button:focus {
  outline: 0;
}
.InputNotEmpty {
  background: #0287ff !important;
  color: #fff !important;
}
.InputYestEmpty {
  pointer-events: none;
  background: #eee;
  color: #949494;
}
.VolkswagenExpectedBody {
  background: #fff;
  padding: 50px 0;
}
.VolkswagenExpectedBody:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.VolkswagenExpectedBody > div {
  float: left;
  width: 50%;
  padding: 0 24px;
  font-size: 28px;
  box-sizing: border-box;
}
.VolkswagenExpectedBody > div:first-child {
  border-right: 1px solid #f2f2f2;
}
.VolkswagenExpectedBodyLeftUl > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.VolkswagenExpectedBodyRightUl > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.VolkswagenExpectedBodyLeftUl > li,
.VolkswagenExpectedBodyRightUl > li {
  padding-bottom: 50px;
}
.VolkswagenExpectedBodyLeftUl > li:last-child,
.VolkswagenExpectedBodyRightUl > li:last-child {
  padding-bottom: 0;
}
.VolkswagenExpectedBodyLeftUl > li > div:nth-child(1),
.VolkswagenExpectedBodyRightUl > li > div:nth-child(1) {
  float: left;
  color: #949494;
}
.VolkswagenExpectedBodyLeftUl > li > div:nth-child(2),
.VolkswagenExpectedBodyRightUl > li > div:nth-child(2) {
  float: right;
  color: #373d41;
}
</style>


