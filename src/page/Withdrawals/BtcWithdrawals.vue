<!--作者:var-->
<template>
  <div  class="BtcWithdrawalsMain">
      <div class="BtcWithdrawalsHeader">
       <div class="BtcWithdrawalsHeaderLeft">
         <div class="BtcWithdrawalsBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="BtcWithdrawalsHeaderText">BTC提现</div>
      </div>
      <p class="BtcWithdrawalsBalance">账户余额:{{BtcWithdrawalsBalanceData}}BTC</p>
      <div class="BtcWithdrawalsForm">
          <div class="BtcWithdrawalsAmount" :style="'border-bottom:1px solid '+BtcWithdrawalsAmountBorder">
              <input type="number" v-model="BtcWithdrawalsAmountInput" placeholder="最小提现金额为0.01" @input="inputBTCChange" @focus="BtcWithdrawalsAmountFocus" @blur="BtcWithdrawalsAmountBlur"><span class="BtcWithdrawalsAmountText">BTC</span>
          </div>
          <div class="BtcWithdrawalsVerificationCode" :style="'border-bottom:1px solid '+BtcWithdrawalsVerificationCodeBorder">
              <input type="number" v-model="BtcWithdrawalsVerificationCodeInput" placeholder="请输入手机验证码" @focus="BtcWithdrawalsVerificationCodeFocus" @blur="BtcWithdrawalsVerificationCodeBlur"><button :style="'color:'+BtcWithdrawalsVerificationCodeTextColor" @click="BtcWithdrawalsVerificationCodeClick" :disabled="BtcWithdrawalsVerificationCodeDisabled" class="BtcWithdrawalsVerificationCodeBtn">{{BtcWithdrawalsObtainVerificationCodeBtn}}</button>
          </div>
          <div class="ServiceCharge" :class='{EmptyOpacity:this.BtcWithdrawalsAmountInput==""}'><span>手续费:</span><span> 0.0001BTC</span></div>
          <div class="ActualAccount" :class='{EmptyOpacity:this.BtcWithdrawalsAmountInput==""}'><span>实际到账:</span><span> {{ActualAccountBTC}}BTC</span></div>
          <div style="text-align: center;">
            <x-button :disabled="disableds" class="BtcConfirmWithdrawalsBtn" @click.native="showPosition('middle')" type="primary" :class="{BtcConfirmWithdrawalsBtnYes:(BtcWithdrawalsAmountInput!=='')&&(BtcWithdrawalsVerificationCodeInput!=='')&&(BtcWithdrawalsBalanceData>=0.01),BtcConfirmWithdrawalsBtnYesNo:(BtcWithdrawalsAmountInput=='')||(BtcWithdrawalsVerificationCodeInput=='')||(BtcWithdrawalsBalanceData<0.01)}" >确认提币</x-button> 
            <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text="BtcWithdrawalsError" :position="position">{{('Basic Usage') }}</toast>
        </div>
      </div>
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import { Toast, XButton } from "vux";
import myFunction from "@/page/encryption/encryption";
export default {
  components: {
    Toast,
    XButton,
    myFunction
  },
  data() {
    return {
      BtcWithdrawalsError: "",
      showPositionValue: false,
      position: "",
      BtcWithdrawalsBalanceData: "",
      BtcWithdrawalsObtainVerificationCodeBtn: "获取验证码",
      BtcWithdrawalsAmountBorder: "#b8b8b8",
      BtcWithdrawalsVerificationCodeBorder: "#b8b8b8",
      BtcWithdrawalsAmountInput: "",
      BtcWithdrawalsVerificationCodeInput: "",
      BtcWithdrawalsVerificationCodeDisabled: false,
      BtcWithdrawalsVerificationCodeTextColor: "#ff721f",
      BtcWithdrawalsUserPhone: "",
      myTime: "",
      ActualAccountBTC: "",
      disableds: false //控制提现按钮，阻止仿佛提交
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //BTC输入变化
    inputBTCChange() {
      this.ActualAccountBTC =
        parseFloat(this.BtcWithdrawalsAmountInput) - 0.0001;
    },
    showPosition(position) {
      //注释的是错误弹出提示
      //   this.position = position;
      //   this.showPositionValue = true;
      if (this.BtcWithdrawalsAmountInput < 0.01) {
        this.position = position;
        this.showPositionValue = true;
        this.BtcWithdrawalsError = "最小提现额为0.01BTC";
      } else if (
        this.BtcWithdrawalsAmountInput > this.BtcWithdrawalsBalanceData
      ) {
        this.position = position;
        this.showPositionValue = true;
        this.BtcWithdrawalsError = "不可超过可提现金额";
      } else if (
        this.BtcWithdrawalsAmountInput >= 0.01 &&
        this.BtcWithdrawalsAmountInput <= this.BtcWithdrawalsBalanceData
      ) {
        //Btc提现接口
        this.disableds = true;
        var myRequestId = myFunction.myUuid();
        var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
        var myUserId = localStorage.getItem("userID");
        var myPhone = this.BtcWithdrawalsUserPhone;
        var myVerificationCode = this.BtcWithdrawalsVerificationCodeInput;
        var myCashBTC = this.BtcWithdrawalsAmountInput;
        var myCommissionBtc = 0.0001;
        var myActualGetBtc = this.ActualAccountBTC;
        var myArr = [
          "requestId=" + myRequestId,
          "userId=" + myUserId,
          "phone=" + myPhone,
          "verificationCode=" + myVerificationCode,
          "cashBTC=" + myCashBTC,
          "commissionBtc=" + myCommissionBtc,
          "actualGetBtc=" + myActualGetBtc
        ];
        var myFunctionValue =
          myFunction.myFunction(myArr) + "/api/account/applyCash.do";
        var myFunctionValues = md5(myFunctionValue).toUpperCase();
        axios
          .post(
            "ApplicationForPresentation",
            qs.stringify({
              userId: myUserId,
              phone: myPhone,
              verificationCode: myVerificationCode,
              cashBTC: this.BtcWithdrawalsAmountInput,
              commissionBtc: myCommissionBtc,
              actualGetBtc: myActualGetBtc
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
              this.$router.push("/BringUpSuccess");
            } else {
              this.position = position;
              this.showPositionValue = true;
              this.BtcWithdrawalsError = data.message;
            }
          })
          .catch(err => {
            console.log(err);
          });
        setTimeout(() => {
          this.disableds = false;
        }, 5000);
      }
    },
    //提现金额输入框获取焦点下边框变蓝
    BtcWithdrawalsAmountFocus() {
      this.BtcWithdrawalsAmountBorder = "#0287ff";
    },
    //提现金额输入框失去焦点下边框变回原来颜色
    BtcWithdrawalsAmountBlur() {
      this.BtcWithdrawalsAmountBorder = "#b8b8b8";
    },
    //获取验证码获取焦点下边框变蓝
    BtcWithdrawalsVerificationCodeFocus() {
      this.BtcWithdrawalsVerificationCodeBorder = "#0287ff";
    },
    //获取验证码输入框失去焦点下边框变回原来颜色
    BtcWithdrawalsVerificationCodeBlur() {
      this.BtcWithdrawalsVerificationCodeBorder = "#b8b8b8";
    },
    //获取验证码点击按钮后倒计时
    BtcWithdrawalsVerificationCodeClick() {
      var BtcTime = 60;
      this.BtcWithdrawalsVerificationCodeDisabled = true;
      this.BtcWithdrawalsObtainVerificationCodeBtn = "重新获取" + BtcTime + "s";
      this.BtcWithdrawalsVerificationCodeTextColor = "#949494";
      //调用获取验证码接口start
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myPhone = this.BtcWithdrawalsUserPhone;
      var myArr = ["requestId=" + myRequestId, "phone=" + myPhone];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/user/sendSms.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "SMSAuthenticationCode",
          qs.stringify({
            phone: myPhone
          }),
          {
            requestId: myRequestId,
            timestamp: myTimestamp,
            channelType: "h5",
            sign: myFunctionValues
          }
        )
        .then(data => {})
        .catch(err => {
          console.log(err);
        });
      //调用获取验证码接口end
      var BtcWithdrawalsVerificationCodeTime = setInterval(() => {
        BtcTime--;
        this.BtcWithdrawalsObtainVerificationCodeBtn =
          "重新获取" + BtcTime + "s";
        if (BtcTime == 1) {
          clearInterval(BtcWithdrawalsVerificationCodeTime);
          this.BtcWithdrawalsObtainVerificationCodeBtn = "获取验证码";
          this.BtcWithdrawalsVerificationCodeDisabled = false;
          this.BtcWithdrawalsVerificationCodeTextColor = "#ff721f";
        }
      }, 1000);
    },
    //获取用户账户信息接口
    MobileAllProfitFuction() {
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myUserId = localStorage.getItem("userID");
      var myArr = ["requestId=" + myRequestId, "userId=" + myUserId];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/account/getUserAccountInfo.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "UserAccountInformation",
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
          this.BtcWithdrawalsBalanceData = data.data.balanceBtc;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.MobileAllProfitFuction();
    this.BtcWithdrawalsUserPhone = sessionStorage["userPhone"];
  }
};
</script>
<style scoped>
.BtcWithdrawalsMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.BtcWithdrawalsHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.BtcWithdrawalsHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.BtcWithdrawalsHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.BtcWithdrawalsBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.BtcWithdrawalsHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.BtcWithdrawalsBalance {
  padding: 50px 24px;
  background: #fff;
  font-size: 32px;
  color: #373d41;
}
.BtcWithdrawalsForm {
  padding-top: 50px;
  padding-bottom: 100px;
  background: #fff;
  margin-top: 20px;
}
.BtcWithdrawalsAmount,
.BtcWithdrawalsVerificationCode {
  height: 37px;
  width: 580px;
  padding: 0 10px;
  margin: auto;
  padding-bottom: 10px;
  font-size: 28px;
  color: #373d41;
  margin-bottom: 100px;
}
.BtcWithdrawalsVerificationCode {
  margin-bottom: 0;
}
.BtcWithdrawalsAmountText {
  float: right;
}
.BtcWithdrawalsVerificationCodeBtn {
  padding: 0;
  width: 188px;
  float: right;
  font-size: 28px;
  text-align: right;
  background: #fff;
  border: 0;
  outline: 0;
}
.BtcConfirmWithdrawalsBtn {
  width: 600px;
  height: 88px;
  font-size: 28px;
  border: 0;
  border-radius: 2px;
  margin-top: 100px;
}
.BtcConfirmWithdrawalsBtnYes {
  background: #0287ff !important;
  color: #fff !important;
}
.BtcConfirmWithdrawalsBtnYesNo {
  background: #eee !important;
  pointer-events: none;
  color: #949494 !important;
}
.weui-btn:after {
  border: 0;
}
.ServiceCharge:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.ActualAccount:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.ServiceCharge,
.ActualAccount {
  width: 580px;
  margin: auto;
  margin-top: 30px;
  color: #373d41;
  font-size: 24px;
}
.ServiceCharge {
  margin-top: 50px;
}
.EmptyOpacity {
  opacity: 0;
}
</style>


