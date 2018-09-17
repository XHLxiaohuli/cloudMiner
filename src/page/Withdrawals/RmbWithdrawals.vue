<!--作者:var-->
<template>
  <div  class="RmbWithdrawalsMain">
      <div class="RmbWithdrawalsHeader">
       <div class="RmbWithdrawalsHeaderLeft">
         <div class="RmbWithdrawalsBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="RmbWithdrawalsHeaderText">RMB提现</div>
      </div>
      <p class="RmbWithdrawalsBalance">账户余额:{{RmbWithdrawalsBalanceData}}元</p>
      <div class="RmbWithdrawalsForm">
          <div class="RmbWithdrawalsAmount" :style="'border-bottom:1px solid '+RmbWithdrawalsAmountBorder">
              <input type="text" v-model="RmbWithdrawalsAmountInput" placeholder="请输入需要体现的金额" @focus="RmbWithdrawalsAmountFocus" @blur="RmbWithdrawalsAmountBlur"><span class="RmbWithdrawalsAmountText">元</span>
          </div>
          <div class="RmbWithdrawalsVerificationCode" :style="'border-bottom:1px solid '+RmbWithdrawalsVerificationCodeBorder">
              <input type="text" v-model="RmbWithdrawalsVerificationCodeInput" placeholder="请输入手机验证码" @focus="RmbWithdrawalsVerificationCodeFocus" @blur="RmbWithdrawalsVerificationCodeBlur"><button :style="'color:'+RmbWithdrawalsVerificationCodeTextColor" @click="RmbWithdrawalsVerificationCodeClick" :disabled="RmbWithdrawalsVerificationCodeDisabled" class="RmbWithdrawalsVerificationCodeBtn">{{RmbWithdrawalsObtainVerificationCodeBtn}}</button>
          </div>
          <div style="text-align: center;">
            <x-button class="RmbConfirmWithdrawalsBtn" @click.native="showPosition('middle')" type="primary" :class="{RmbConfirmWithdrawalsBtnYes:(RmbWithdrawalsAmountInput!=='')&&(RmbWithdrawalsVerificationCodeInput!==''),RmbConfirmWithdrawalsBtnYesNo:(RmbWithdrawalsAmountInput=='')||(RmbWithdrawalsVerificationCodeInput=='')}" >下一步</x-button> 
            <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text="RmbWithdrawalsError" :position="position">{{('Basic Usage') }}</toast>
        </div>
      </div>
  </div>
</template>
<script>
import { Toast, XButton } from "vux";
export default {
  components: {
    Toast,
    XButton
  },
  data() {
    return {
      RmbWithdrawalsError: "验证码错误",
      showPositionValue: false,
      position: "",
      RmbWithdrawalsBalanceData: "88888",
      RmbWithdrawalsObtainVerificationCodeBtn: "获取验证码",
      RmbWithdrawalsAmountBorder: "#b8b8b8",
      RmbWithdrawalsVerificationCodeBorder: "#b8b8b8",
      RmbWithdrawalsAmountInput: "",
      RmbWithdrawalsVerificationCodeInput: "",
      RmbWithdrawalsVerificationCodeDisabled: false,
      RmbWithdrawalsVerificationCodeTextColor: "#ff721f"
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    showPosition(position) {
      //注释的是错误弹出提示
      //   this.position = position;
      //   this.showPositionValue = true;
      this.$router.push("/BringUpSuccess");
    },
    //提现金额输入框获取焦点下边框变蓝
    RmbWithdrawalsAmountFocus() {
      this.RmbWithdrawalsAmountBorder = "#0287ff";
    },
    //提现金额输入框失去焦点下边框变回原来颜色
    RmbWithdrawalsAmountBlur() {
      this.RmbWithdrawalsAmountBorder = "#b8b8b8";
    },
    //获取验证码获取焦点下边框变蓝
    RmbWithdrawalsVerificationCodeFocus() {
      this.RmbWithdrawalsVerificationCodeBorder = "#0287ff";
    },
    //获取验证码输入框失去焦点下边框变回原来颜色
    RmbWithdrawalsVerificationCodeBlur() {
      this.RmbWithdrawalsVerificationCodeBorder = "#b8b8b8";
    },
    //获取验证码点击按钮后倒计时
    RmbWithdrawalsVerificationCodeClick() {
      var RmbTime = 60;
      this.RmbWithdrawalsVerificationCodeDisabled = true;
      this.RmbWithdrawalsObtainVerificationCodeBtn = "重新获取" + RmbTime + "s";
      this.RmbWithdrawalsVerificationCodeTextColor = "#949494";
      var RmbWithdrawalsVerificationCodeTime = setInterval(() => {
        RmbTime--;
        this.RmbWithdrawalsObtainVerificationCodeBtn =
          "重新获取" + RmbTime + "s";
        if (RmbTime == 1) {
          clearInterval(RmbWithdrawalsVerificationCodeTime);
          this.RmbWithdrawalsObtainVerificationCodeBtn = "获取验证码";
          this.RmbWithdrawalsVerificationCodeDisabled = false;
          this.RmbWithdrawalsVerificationCodeTextColor = "#ff721f";
        }
      }, 1000);
    }
  }
};
</script>
<style scoped>
.RmbWithdrawalsMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.RmbWithdrawalsHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.RmbWithdrawalsHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.RmbWithdrawalsHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.RmbWithdrawalsBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.RmbWithdrawalsHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.RmbWithdrawalsBalance {
  padding: 50px 24px;
  background: #fff;
  font-size: 32px;
  color: #373d41;
}
.RmbWithdrawalsForm {
  padding-top: 50px;
  padding-bottom: 100px;
  background: #fff;
  margin-top: 20px;
}
.RmbWithdrawalsAmount,
.RmbWithdrawalsVerificationCode {
  height: 37px;
  width: 580px;
  padding: 0 10px;
  margin: auto;
  padding-bottom: 10px;
  font-size: 28px;
  color: #373d41;
  margin-bottom: 100px;
}
.RmbWithdrawalsAmountText {
  float: right;
}
.RmbWithdrawalsVerificationCodeBtn {
  padding: 0;
  width: 188px;
  float: right;
  font-size: 28px;
  text-align: right;
  background: #fff;
  border: 0;
  outline: 0;
}
.RmbConfirmWithdrawalsBtn {
  width: 600px;
  height: 88px;
  font-size: 28px;
  border: 0;
  border-radius: 2px;
  margin-top: 100px;
}
.RmbConfirmWithdrawalsBtnYes {
  background: #0287ff !important;
  color: #fff !important;
}
.RmbConfirmWithdrawalsBtnYesNo {
  background: #eee;
  pointer-events: none;
  color: #949494;
}
.weui-btn:after {
  border: 0;
}
</style>


