<!--作者:var-->
<template>
    <div>
        <div class="ForgetPasswordHeader">
            <div class="ForgetPasswordHeaderLeft">
                <div class="ForgetPasswordHeaderBackPic" @click="BackUpperStory"></div>
            </div>
            <div class="ForgetPasswordHeaderText">忘记密码</div>
        </div>
        <div style="text-align: center;">
            <input v-model="FPInputPhoneOneModel" @input="notExceeding" @blur="FPInputPhoneOneBlur" @focus="FPInputPhoneOneFocus" :style="'border-bottom:1px solid '+FPInputPhoneOneColor" class="FPInputPhoneOne" type="number" placeholder="请输入手机号">
        </div>
        <div style="text-align: center;">
            <input v-model="InputnewPasswordModel" @blur="InputNewPasswordBlur" @focus="InputNewPasswordFocus"  class="newPassword" type="password" placeholder="请输入新密码" :style="'border-bottom:1px solid '+InputnewPasswordColor">
        </div>
        <div>
            <div class="FPInputVerificationCodeOne" :style="'border-bottom:1px solid '+FristVerificationCodeColor">
                <input v-model="FPInputPasswordOneModel" @blur="FristVerificationCodeBlur" @focus="FristVerificationCodeFocus" type="text" placeholder="请输入验证码" class="FristVerificationCodeInput"><button :disabled="ForgetPasswordDisabled" @click="FristVerificationCodeCountDown" :style="'color:'+FristVerificationCodeTypefaceColor" class="FristVerificationCodeBtnClass">{{FristVerificationCodeBtn}}</button>
            </div>
        </div>
        <div style="text-align: center;">
            <x-button class="ForgetPasswordFristBtn"  @click.native="showPosition('middle')" type="primary" :class="{NoForgetPasswordFrist:(FPInputPhoneOneModel!=='')&&(FPInputPasswordOneModel!==''),ForgetPasswordFrist:(FPInputPhoneOneModel=='')||(FPInputPasswordOneModel=='')}">下一步</x-button> 
            <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text=ForgetPasswordText :position="position">{{('Basic Usage') }}</toast>
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
      //验证码错误弹出框提示
      showPositionValue: false,
      position: "",
      ForgetPasswordText: "",
      FristVerificationCodeBtn: "获取验证码",
      //输入手机号下边框颜色
      FPInputPhoneOneColor: "#b8b8b8",
      //输入新密码下边框颜色
      InputnewPasswordColor: "#b8b8b8",
      //输入验证码下边框颜色
      FristVerificationCodeColor: "#b8b8b8",
      //获取验证码按钮字体颜色
      FristVerificationCodeTypefaceColor: "#ff721f",
      //控制获取验证码按钮是否禁用
      ForgetPasswordDisabled: false,
      //忘记密码手机号码输入双向绑定
      FPInputPhoneOneModel: "",
      //忘记密码验证码码输入双向绑定
      FPInputPasswordOneModel: "",
      //忘记密码新密码双向绑定
      InputnewPasswordModel: "",
      myTime: ""
    };
  },
  methods: {
    //@input时间监听手机号码输入框，输入长度不能超过11位
    notExceeding() {
      if (this.FPInputPhoneOneModel.length > 11) {
        this.FPInputPhoneOneModel = this.FPInputPhoneOneModel.substring(0, 11);
      }
    },
    showPosition(position) {
      //注释的是验证码错误的提示弹出框
      // this.position = position;
      // this.showPositionValue = true;
      var RsForgetPassword = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
      var RsForgetPasswords = RsForgetPassword.test(this.FPInputPhoneOneModel);
      var RsForgetPasswordTow = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/;
      var RsForgetPasswordTows = RsForgetPasswordTow.test(
        this.InputnewPasswordModel
      );
      if (RsForgetPasswords) {
        if (RsForgetPasswordTows) {
          //忘记密码1接口start
          // this.myTime=Math.round(new Date().getTime()/1000).toString()
          var myRequestId = myFunction.myUuid();
          var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
          var myPhone = this.FPInputPhoneOneModel;
          var myVerificationCode = this.FPInputPasswordOneModel;
          var myNewPassword = md5(this.InputnewPasswordModel);
          var myArr = [
            "requestId=" + myRequestId,
            "phone=" + myPhone,
            "verificationCode=" + myVerificationCode,
            "newPassword=" + myNewPassword
          ];
          var myFunctionValue =
            myFunction.myFunction(myArr) + "/api/user/forgetPassword.do";
          var myFunctionValues = md5(myFunctionValue).toUpperCase();
          axios
            .post(
              "ForgetPasswordReset",
              qs.stringify({
                phone: myPhone,
                verificationCode: myVerificationCode,
                newPassword: myNewPassword
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
                this.$router.push("/Login/1");
              } else if (data.status == -1) {
                this.position = position;
                this.showPositionValue = true;
                this.ForgetPasswordText = data.message;
              }
            })
            .catch(err => {
              console.log(err);
            });
          //   //忘记密码1接口end
        } else if (!RsForgetPasswordTows) {
          this.position = position;
          this.showPositionValue = true;
          this.ForgetPasswordText = "新密码号格式不正确";
        }
      } else if (!RsForgetPasswords) {
        this.position = position;
        this.showPositionValue = true;
        this.ForgetPasswordText = "手机号格式不正确";
      }
    },
    //失去焦点电话输入框下边框变#b8b8b8
    FPInputPhoneOneBlur() {
      this.FPInputPhoneOneColor = "#b8b8b8";
    },
    //获取焦点电话输入框下边框变蓝色
    FPInputPhoneOneFocus() {
      this.FPInputPhoneOneColor = "#0287ff";
    },
    //失去焦点新密码下边框变#b8b8b8
    InputNewPasswordBlur() {
      this.InputnewPasswordColor = "#b8b8b8";
    },
    //获取焦点新密码下边框变蓝色
    InputNewPasswordFocus() {
      this.InputnewPasswordColor = "#0287ff";
    },
    //失去焦点验证码输入框下边框变#b8b8b8
    FristVerificationCodeBlur() {
      this.FristVerificationCodeColor = "#b8b8b8";
    },
    //获取焦点验证码输入框下边框变蓝色
    FristVerificationCodeFocus() {
      this.FristVerificationCodeColor = "#0287ff";
    },
    //点击获取验证码倒计时
    FristVerificationCodeCountDown() {
      if (this.FPInputPhoneOneModel != "") {
        var RsForgetPasswords = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
        var RsForgetPasswordss = RsForgetPasswords.test(
          this.FPInputPhoneOneModel
        );
        if (RsForgetPasswordss) {
          var FristVerificationCodeTime = 60;
          this.ForgetPasswordDisabled = true;
          this.FristVerificationCodeBtn =
            "重新获取" + FristVerificationCodeTime + "s";
          this.FristVerificationCodeTypefaceColor = "#949494";
          //验证码接口Start
          // this.myTime=Math.round(new Date().getTime()/1000).toString()
          var myRequestId = myFunction.myUuid();
          var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
          var myPhone = this.FPInputPhoneOneModel;
          var myArr = ["requestId=" + myRequestId, "phone=" + myPhone];
          var myFunctionValue = md5(
            myFunction.myFunction(myArr) + "/api/user/sendSms.do"
          ).toUpperCase();
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
                sign: myFunctionValue
              }
            )
            .then(data => {})
            .catch(err => {
              console.log(err);
            });
          //验证码接口end
          var VerificationCodeTime = setInterval(() => {
            FristVerificationCodeTime--;
            this.FristVerificationCodeBtn =
              "重新获取" + FristVerificationCodeTime + "s";
            if (FristVerificationCodeTime == 1) {
              clearInterval(VerificationCodeTime);
              this.FristVerificationCodeBtn = "获取验证码";
              this.ForgetPasswordDisabled = false;
              this.FristVerificationCodeTypefaceColor = "#ff721f";
            }
          }, 1000);
        } else if (!RsForgetPasswordss) {
          this.position = "middle";
          this.showPositionValue = true;
          this.ForgetPasswordText = "手机号格式不正确";
        }
      } else if (this.FPInputPhoneOneModel == "") {
        this.position = "middle";
        this.showPositionValue = true;
        this.ForgetPasswordText = "手机号不能为空";
      }
    },
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
button:focus {
  outline: 0;
}
.ForgetPasswordHeader {
  height: 88px;
  margin-bottom: 100px;
}
.ForgetPasswordHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.ForgetPasswordHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
}
.ForgetPasswordHeaderBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.ForgetPasswordHeaderText {
  height: 88px;
  float: left;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  padding-left: 30px;
}
.FPInputPhoneOne {
  width: 580px;
  height: 37px;
  padding-left: 10px;
  padding-bottom: 10px;
  font-size: 28px;
  color: #373d41;
}
.FPInputVerificationCodeOne {
  width: 580px;
  height: 37px;
  padding: 0 10px;
  padding-bottom: 10px;
  margin: auto;
  margin-top: 100px;
}
.ForgetPasswordFrist {
  pointer-events: none;
  color: #949494;
  background: #eee;
}
.NoForgetPasswordFrist {
  background: #0287ff !important;
  color: #fff !important;
}
.ForgetPasswordFristBtn {
  width: 600px;
  height: 88px;
  font-size: 28px;
  border: 0;
  border-radius: 2px;
  margin-top: 100px;
}
.FristVerificationCodeInput {
  width: 390px;
  height: 37px;
  border: 0;
  font-size: 28px;
  color: #373d41;
}
.FristVerificationCodeBtnClass {
  width: 188px;
  font-size: 28px;
  padding-right: 0;
  padding-left: 0;
  background: #fff;
  border: 0;
  text-align: right;
}
.FristVerificationCodeBtnClass:focus {
  outline: 0;
}
/**vuex按钮把按钮默认边框宽度改为0**/
.weui-btn:after {
  border: 0;
}
.newPassword {
  width: 580px;
  height: 37px;
  padding-left: 10px;
  padding-bottom: 10px;
  font-size: 28px;
  color: #373d41;
  margin-top: 100px;
}
</style>


