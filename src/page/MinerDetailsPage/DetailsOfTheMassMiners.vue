<template>
    <div class="PublicDetailsMain">
     <div class="PublicDetailsHeader">
       <div class="PublicDetailsHeaderLeft">
         <div class="PublicDetailsBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="PublicDetailsHeaderText">大众矿工</div>
     </div>
     <div class="PublicComputingPowerLease">
         <h1 class="PublicComputingPowerLeaseTitle"><span></span>云算力租赁</h1>
         <div class="PublicComputingPowerLeaseTable">
             <div>
                 <p>每T算力价格</p>
                 <p>{{PublicComputingPrice}}<span>元</span></p>
                 <div class="Discount"></div>
             </div>
             <div>
                 <ul>
                     <li>
                         <p>每日每T预计收益</p>
                         <p>{{PublicComputingEverydayProfitOne}}<span>元</span></p>
                     </li>
                     <li>
                         <p>每日每T预计收益</p>
                         <p>{{PublicComputingEverydayProfitTow}}<span>BTC</span></p>
                     </li>
                 </ul>
             </div>
         </div>
         <div class="PublicLeaseProgressBar">
             <div>剩余算力</div>
             <div>
                 <div :style="'width:'+PublicLeaseProgressBarWidth+'%'"></div>
             </div>
             <div>{{PublicLeaseProgressBarT}}T</div>
         </div>
     </div>
     <div class="PublicPurchasingPower">
         <h1><span></span>购买算力</h1>
         <div :style="'border-bottom: 1px solid '+PublicPurchasingBottomBolor">
             <input type="number" @input="InputMonitor" v-model="PublicPurchasingPowerInput" @focus="PublicPurchasingInputFocus" @blur="PublicPurchasingInputBlur" placeholder="请输入你要购买的T数">
             <div>T</div>
         </div>
         <div class="PublicPurchasingInputPrompt">
             <span>需要支付{{PublicNeedHowMoney}}元</span><span v-if="false">起息日 : T+1日</span>
         </div>
         <div class="PublicJoinImmediatelyBtn">
             <button class="PublicJoinImmediatelyBtns" @click="jumpMinersJoin" :class="{YesPublicJoinImmediatelyBtn:(PublicPurchasingPowerInput!=='')&&(CorrectShow==true),NoPublicJoinImmediatelyBtn:(PublicPurchasingPowerInput=='')||(CorrectShow==false)}">立即加入</button>
         </div>
         <div class="PublicTransactionContract">
             <div @click="PublicTransactionContractClick" :style="' border: 1px solid '+DetailsBorderColor"><div v-show="CorrectShow" class="PublicTransactionContractPic"></div></div><span>已阅读并同意</span><span @click="jumpMinerAgreement">《云矿工交易协议》</span>
         </div>
     </div>
     <div @click="jumpDetailsPage" class="PublicDetailsFooter"> <span><img src="../../static/img/finger.png" alt=""></span> 点击查看更多详情</div>
     <div class="MoreThanAHint" v-show="Exceed">一次购买不能超过2000T</div>
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
      PublicComputingPrice: "",
      PublicComputingEverydayProfitOne: "",
      PublicComputingEverydayProfitTow: "",
      PublicLeaseProgressBarWidth: 0,
      PublicLeaseProgressBarT: "",
      PublicNeedHowMoney: "0.00",
      PublicPurchasingBottomBolor: "#b8b8b8",
      PublicPurchasingPowerInput: "",
      PublicCheckState: 0,
      PublicStatus: "",
      CorrectShow: true,
      DetailsBorderColor: "#0287ff",
      workType: 0,
      Exceed: false
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.push("/Home/Index/1");
    },
    //输入框获取焦点下边框变蓝色
    PublicPurchasingInputFocus() {
      this.PublicPurchasingBottomBolor = "#0287ff";
    },
    //失去焦点变回原来的颜色
    PublicPurchasingInputBlur() {
      this.PublicPurchasingBottomBolor = "#b8b8b8";
      if (this.PublicPurchasingPowerInput == "") {
        this.PublicNeedHowMoney = "0.00";
      } else if (this.PublicPurchasingPowerInput != "") {
        var RsPublicDetails = /^\d+(?:\.\d{0,1})?$/;
        var RsPublicDetailss = RsPublicDetails.test(
          this.PublicPurchasingPowerInput
        );
        if (RsPublicDetailss) {
          this.PublicNeedHowMoney =
            this.PublicPurchasingPowerInput *
            parseFloat(this.PublicComputingPrice);
        } else if (!RsPublicDetailss) {
          var num = this.PublicPurchasingPowerInput;
          var f = parseFloat(num).toFixed(2);
          this.PublicPurchasingPowerInput = f.substring(
            0,
            f.toString().length - 1
          );
          this.PublicNeedHowMoney =
            this.PublicPurchasingPowerInput *
            parseFloat(this.PublicComputingPrice);
        }
      }
    },
    //输入框输入值监听变化
    InputMonitor() {
      if (this.PublicPurchasingPowerInput != "") {
        var RsPublicDetails = /^\d+(?:\.\d{0,1})?$/;
        var RsPublicDetailss = RsPublicDetails.test(
          this.PublicPurchasingPowerInput
        );
        if (RsPublicDetailss) {
          this.PublicNeedHowMoney =
            this.PublicPurchasingPowerInput *
            parseFloat(this.PublicComputingPrice);
        } else if (!RsPublicDetailss) {
          var num = this.PublicPurchasingPowerInput;
          var f = parseFloat(num).toFixed(2);
          this.PublicPurchasingPowerInput = f.substring(
            0,
            f.toString().length - 1
          );
          this.PublicNeedHowMoney =
            this.PublicPurchasingPowerInput *
            parseFloat(this.PublicComputingPrice);
        }
      }
    },
    //合同点击是否同意
    PublicTransactionContractClick() {
      this.PublicCheckState++;
      if (this.PublicCheckState % 2 !== 0) {
        this.CorrectShow = false;
        this.DetailsBorderColor = "#b8b8b8";
      } else if (this.PublicCheckState % 2 == 0) {
        this.CorrectShow = true;
        this.DetailsBorderColor = "#0287ff";
      }
    },
    //跳转到加入页面
    jumpMinersJoin() {
      if (this.PublicPurchasingPowerInput > 2000) {
        this.Exceed = true;
        setTimeout(() => {
          this.Exceed = false;
        }, 1500);
      } else {
        if (localStorage.getItem("userID") == null) {
          this.$router.push("/Login/1");
        } else if (localStorage.getItem("userID") != null) {
          var myRequestId = myFunction.myUuid();
          var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
          var myUserId = localStorage.getItem("userID");
          var myArr = ["requestId=" + myRequestId, "userId=" + myUserId];
          var myFunctionValue =
            myFunction.myFunction(myArr) + "/api/user/getUserInfo.do";
          var myFunctionValues = md5(myFunctionValue).toUpperCase();
          axios
            .post(
              "ObtainingUserInformation",
              qs.stringify({
                userId: myUserId
              }),
              {
                requestId: myRequestId,
                timestamp: myTimestamp,
                channelType: "h5",
                sign: myFunctionValues
              }
            )
            .then(data => {
              if (data.code == 200) {
                this.$router.push(
                  "/OrderDetails/1/" +
                    this.PublicPurchasingPowerInput +
                    "/" +
                    this.PublicComputingPrice +
                    "/" +
                    this.PublicLeaseProgressBarT +
                    "/NoNum/大众矿工"
                );
              } else if (data.code == 413) {
                this.$router.push("/Login/1");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    //跳转到详情页
    jumpDetailsPage() {
      this.$router.push("/DetailsPage/1");
    },
    jumpMinerAgreement() {
      this.$router.push("/MinerAgreement");
    },
    //获取BTC信息接口
    PostBTCinformationFunction() {
      var goodsId = this.$route.params.goodsId;
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myArr = ["requestId=" + myRequestId, "goodsId=" + goodsId];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/order/goods/getGoodsDetails.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "CommodityDetails",
          qs.stringify({
            goodsId: goodsId
          }),
          {
            requestId: myRequestId,
            timestamp: myTimestamp,
            channelType: "h5",
            sign: myFunctionValues
          }
        )
        .then(data => {
          this.PublicComputingPrice = data.data.everyCalculatePrice;
          this.PublicComputingEverydayProfitOne =
            data.data.everydayExpectProfitCNY;
          this.PublicComputingEverydayProfitTow =
            data.data.everydayExpectProfitBTC;
          this.PublicLeaseProgressBarT = data.data.surplusCalculate;
          this.PublicLeaseProgressBarWidth =
            data.data.surplusCalculate / 5000 * 100;
          if (this.PublicLeaseProgressBarWidth >= 100) {
            this.PublicLeaseProgressBarWidth = 100;
            this.PublicLeaseProgressBarT = 0;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.PostBTCinformationFunction();
  },
  mounted() {}
};
</script>
<style scoped>
.PublicDetailsMain {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.PublicDetailsHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #f2f2f2;
}
.PublicDetailsHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PublicDetailsHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.PublicDetailsBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.PublicDetailsHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.PublicComputingPowerLease {
  background: #fff;
  margin-top: 108px;
  padding: 50px 24px;
  /* border-bottom: 1px solid #dfdfdf; */
}
.PublicComputingPowerLeaseTitle {
  padding: 0;
  margin: 0;
  font-size: 28px;
  color: #373d41;
  /* border-left: 6px solid #0287ff; */
  /* padding-left: 10px; */
}
.PublicComputingPowerLeaseTitle > span {
  display: inline-block;
  width: 8px;
  height: 28px;
  margin-right: 10px;
  background: #0287ff;
  border: 0;
  position: relative;
  top: 3px;
}
.PublicComputingPowerLeaseTable {
  width: 702px;
  margin-top: 30px;
  margin-bottom: 50px;
}
.PublicComputingPowerLeaseTable:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PublicComputingPowerLeaseTable > div {
  float: left;
}
.PublicComputingPowerLeaseTable > div:nth-child(1) {
  width: 275px;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-right: 0;
  padding: 85px 0;
  position: relative;
}
.PublicComputingPowerLeaseTable > div:nth-child(1) > p {
  text-align: center;
}
.PublicComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(1) {
  font-size: 24px;
  color: #949494;
}
.PublicComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(2) {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  margin-top: 45px;
  color: #0287ff;
}
.PublicComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(2) > span {
  font-size: 24px;
  color: #373d41;
  font-weight: bolder;
  color: #0287ff;
}
.PublicComputingPowerLeaseTable > div:nth-child(2) > ul > li {
  padding: 30px 0;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  width: 427px;
}
.PublicComputingPowerLeaseTable > div:nth-child(2) > ul > li:nth-child(1) {
  border-bottom: 0;
}
.PublicComputingPowerLeaseTable > div:nth-child(2) > ul > li > p {
  padding-left: 120px;
}
.PublicComputingPowerLeaseTable > div:nth-child(2) > ul > li > p:nth-child(1) {
  font-size: 24px;
  color: #949494;
}
.PublicComputingPowerLeaseTable > div:nth-child(2) > ul > li > p:nth-child(2) {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  margin-top: 18px;
}
.PublicComputingPowerLeaseTable
  > div:nth-child(2)
  > ul
  > li
  > p:nth-child(2)
  > span {
  font-size: 24px;
  color: #373d41;
  font-weight: bolder;
}
.PublicLeaseProgressBar:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PublicLeaseProgressBar > div {
  float: left;
}
.PublicLeaseProgressBar > div:nth-child(1) {
  font-size: 28px;
  color: #949494;
}
.PublicLeaseProgressBar > div:nth-child(2) {
  height: 25px;
  width: 400px;
  border-radius: 13px;
  border: 0;
  box-sizing: border-box;
  position: relative;
  margin-left: 45px;
  background: #eaeaea;
}
.PublicLeaseProgressBar > div:nth-child(2) > div {
  height: 100%;
  border-radius: 12px;
  background: #0260b3;
}
.PublicLeaseProgressBar > div:nth-child(3) {
  font-size: 28px;
  color: #373d41;
  float: right;
}
.PublicPurchasingPower {
  background: #fff;
  padding: 50px 24px;
  margin-top: 20px;
  /* border-bottom: 1px solid #dfdfdf; */
}
.PublicPurchasingPower > h1:nth-child(1) {
  padding: 0;
  margin: 0;
  /* border-left: 6px solid #0287ff;
  padding-left: 10px; */
  margin-bottom: 50px;
  font-size: 28px;
  color: #373d41;
}
.PublicPurchasingPower > h1:nth-child(1) > span {
  display: inline-block;
  width: 8px;
  height: 28px;
  background: #0287ff;
  border: 0;
  margin-right: 10px;
  position: relative;
  top: 3px;
}
.PublicPurchasingPower > div:nth-child(2) {
  width: 580px;
  margin-left: 51px;
  padding: 0 10px;
  padding-bottom: 2px;
}
.PublicPurchasingPower > div:nth-child(2) > div {
  float: right;
  font-size: 28px;
  color: #373d41;
  position: relative;
  top: 7px;
}
.PublicPurchasingPower > div:nth-child(2) > input {
  width: 562px;
  font-size: 28px;
  color: #373d41;
  height: 30px;
  padding-bottom: 10px;
}
.PublicPurchasingInputPrompt:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PublicPurchasingInputPrompt {
  margin-top: 20px;
  padding-left: 51px;
}
.PublicPurchasingInputPrompt > span {
  font-size: 24px;
}
.PublicPurchasingInputPrompt > span:nth-child(1) {
  float: left;
}
.PublicPurchasingInputPrompt > span:nth-child(2) {
  float: right;
  margin-right: 51px;
  color: #949494;
}
.PublicJoinImmediatelyBtn {
  width: 600px;
  height: 88px;
  margin: auto;
  margin-top: 100px;
}
.PublicJoinImmediatelyBtn > button {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  border: 0;
  font-size: 28px;
  color: #949494;
}
.PublicJoinImmediatelyBtn > button:focus {
  outline: 0;
}
.PublicTransactionContract {
  margin-top: 30px;
  position: relative;
}
.PublicTransactionContract:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PublicTransactionContract > div:nth-child(1) {
  display: inline-block;
  border: 1px solid #949494;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  font-size: 25px;
  font-weight: bolder;
  color: #ff721f;
  margin-right: 10px;
  line-height: 30px;
  position: absolute;
  top: 2px;
  left: 160px;
}
.PublicTransactionContract > span {
  font-size: 24px;
}
.PublicTransactionContract > span:nth-child(2) {
  color: #949494;
  margin-left: 200px;
}
.PublicTransactionContract > span:nth-child(3) {
  color: #0287ff;
}
.YesPublicJoinImmediatelyBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.NoPublicJoinImmediatelyBtn {
  pointer-events: none;
  background: #eee;
  color: #949494;
}
.PublicDetailsFooter {
  font-size: 24px;
  color: #949494;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 100px;
  background: #f5f5f8;
}
.PublicDetailsFooter > span {
  display: inline-block;
  width: 16px;
  height: 24px;
}
.PublicDetailsFooter > span > img {
  width: 100%;
  height: 100%;
}
.Discount {
  width: 96px;
  height: 96px;
  background: url("../../static/img/Discount.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.PublicTransactionContractPic {
  width: 18px;
  height: 13px;
  border-radius: 50%;
  background: url("../../static/img/Correct.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.PublicJoinImmediatelyBtns:not(.PublicJoinImmediatelyBtnss):active {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  border: 0;
  font-size: 28px;
  background-color: #0260b2 !important;
}
.MoreThanAHint {
  font-size: 24px;
  color: #fff;
  background: rgba(00, 00, 00, 0.5);
  text-align: center;
  line-height: 40px;
  width: 400px;
  height: 40px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>


