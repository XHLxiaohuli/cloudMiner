<template>
<div class="Itempart" v-if="RegisteroneIF">
      <div class="PutBox" :style="'border-bottom: 1px solid '+RegisteroneOneBottom">
      <input type="number" @input="notExceeding" @focus="RegisteroneOneFocus" @blur="RegisteroneOneBlur" v-model="RegisteroneOneInput" placeholder="请输入手机号码">
      </div>
      <div class="PutBox" :style="'border-bottom: 1px solid '+RegisteroneTowBottom">
     <input type="number" @focus="RegisteroneTowFocus" @blur="RegisteroneTowBlur"  v-model="RegisteroneTowInput" placeholder="请输入验证码">
     <span class="butCode" v-show="IshidCode" @click="Codehid">获取验证码</span>
     <span class="CodeTimeSty" v-show="IshText">重新获取{{NumeTime}}s</span>
     </div>
    <div class="PutBox" :style="'border-bottom: 1px solid '+RegisteroneThreeBottom">
     <input type="password"  @focus="RegisteroneThreeFocus" @blur="RegisteroneThreeBlur"  v-model="RegisteroneThreeInput" placeholder="请设置密码">
     </div>
     <div class="PutBox" :style="'border-bottom: 1px solid '+ConfirmPasswordBottom">
     <input type="password"  @focus="ConfirmPasswordFocus" @blur="ConfirmPasswordBlur"  v-model="ConfirmPasswordInput" placeholder="请确认密码">
     </div>
     <div class="PutBox" :style="'border-bottom: 1px solid '+RegisteroneFourBottom">
     <input type="text"  @focus="RegisteroneFourFocus" @blur="RegisteroneFourBlur"  v-model="RegisteroneFourInput" placeholder="请填写推荐人的邀请码">
     </div>
     <div>
        <x-button class="RegisteroneBtn" @click.native="showPosition('middle')" type="primary"
        :class='{YesRegisteroneBtn:(RegisteroneOneInput!="")&&(RegisteroneTowInput!="")&&(RegisteroneThreeInput!="")&&(RegisteroneFourInput!="")&&(ConfirmPasswordInput!=""),NoRegisteroneBtn:(RegisteroneOneInput=="")||(RegisteroneTowInput=="")||(RegisteroneThreeInput=="")||(RegisteroneFourInput=="")||(ConfirmPasswordInput=="")}'
        >下一步</x-button> 
        <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text=RegisteroneManagementText :position="position">{{('Basic Usage') }}</toast>
     </div>
      <div class="SpaBet"></div>
</div>
</template>
<script>
import { Toast, XButton } from "vux";
import { fail } from "assert";
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import myFunction from "@/page/encryption/encryption";
export default {
  components: {
    Toast,
    XButton,
    myFunction
  },
  data() {
    return {
      showPositionValue: false,
      position: "",
      RegisteroneManagementText: "", //错误提示文本
      RegisteroneIF: true,
      IshidCode: true, //验证码显隐
      IshText: false,
      NumeTime: "60",
      RegisteroneOneInput: "", //注册第一步输入手机号码双向绑定
      RegisteroneTowInput: "", //注册第一步输入验证码双向绑定
      RegisteroneThreeInput: "", //注册第一步输入设置密码双向绑定
      RegisteroneFourInput: "", //注册第一步输入推荐人邀请码双向绑定
      ConfirmPasswordInput: "", //确认密码
      RegisteroneOneBottom: "#b8b8b8", //注册第一步第一个输入框下边框颜色
      RegisteroneTowBottom: "#b8b8b8", //注册第一步第二个输入框下边框颜色
      RegisteroneThreeBottom: "#b8b8b8", //注册第一步第三个输入框下边框颜色
      RegisteroneFourBottom: "#b8b8b8", //注册第一步第四个输入框下边框颜色
      ConfirmPasswordBottom: "#b8b8b8", //确认密码下边框颜色
      TimeAll: "", //定时器
      myTime: ""
    };
  },
  methods: {
    //@input时间监听手机号码输入框，输入长度不能超过11位
    notExceeding() {
      if (this.RegisteroneOneInput.length > 11) {
        this.RegisteroneOneInput = this.RegisteroneOneInput.substring(0, 11);
      }
    },
    showPosition(position) {
      var RsRegisterone = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
      var RsRegisterones = RsRegisterone.test(this.RegisteroneOneInput);
      var RsRegisteronePas = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/;
      var RsRegisteronePass = RsRegisteronePas.test(this.RegisteroneThreeInput);
      if (RsRegisterones && RsRegisteronePass) {
        if (this.ConfirmPasswordInput != this.RegisteroneThreeInput) {
          this.position = position;
          this.showPositionValue = true;
          this.RegisteroneManagementText = "两次密码不一致";
        } else if (this.ConfirmPasswordInput == this.RegisteroneThreeInput) {
          //sessionStorage存储
          sessionStorage["userPhone"] = this.RegisteroneOneInput;
          sessionStorage["verificationCode"] = this.RegisteroneTowInput;
          sessionStorage["userPassword"] = md5(this.RegisteroneThreeInput);
          sessionStorage["inviteCode"] = this.RegisteroneFourInput;
          //获取注册页面一接口start
          // localStorage.setItem("userPhone", this.RegisteroneOneInput);
          // localStorage.setItem("verificationCode", this.RegisteroneTowInput);
          // localStorage.setItem("userPassword", md5(this.RegisteroneThreeInput));
          // localStorage.setItem("inviteCode", this.RegisteroneFourInput);

          var myRequestId = myFunction.myUuid();
          var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
          var myPhone = this.RegisteroneOneInput;
          var myVerificationCode = this.RegisteroneTowInput;
          var myInviteCode = this.RegisteroneFourInput;
          var myArr = [
            "requestId=" + myRequestId,
            "phone=" + myPhone,
            "verificationCode=" + myVerificationCode,
            "inviteCode=" + myInviteCode
          ];
          var myFunctionValue = md5(
            myFunction.myFunction(myArr) +
              "/api/user/registrationVerification.do"
          ).toUpperCase();
          axios
            .post(
              "UserRegistrationVerification",
              qs.stringify({
                phone: myPhone,
                verificationCode: myVerificationCode,
                inviteCode: myInviteCode
              }),
              {
                requestId: myRequestId,
                timestamp: myTimestamp,
                channelType: "h5",
                sign: myFunctionValue
              }
            )
            .then(data => {
              if (data.status == "success") {
                //提交信息通过
                this.RegisteroneIF = false;
                this.$parent._data.Towpar = true;
              } else if (data.status == "fail") {
                //提交信息失败
                //注释的是错误弹窗提示
                this.position = position;
                this.showPositionValue = true;
                this.RegisteroneManagementText = data.message;
              }
            })
            .catch(err => {
              console.log(err);
            });
          //获取注册页面一接口end
        }
      } else if (!RsRegisterones) {
        //注释的是错误弹窗提示
        this.position = position;
        this.showPositionValue = true;
        this.RegisteroneManagementText = "手机号格式不正确";
      } else if (!RsRegisteronePass) {
        //注释的是错误弹窗提示
        this.position = position;
        this.showPositionValue = true;
        this.RegisteroneManagementText =
          "密码不低于6位数，必须由数字和其他字母或符号组合";
      }
    },
    Codehid() {
      var RsRegisterones = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
      var RsRegisteroness = RsRegisterones.test(this.RegisteroneOneInput);
      if (this.RegisteroneOneInput != "") {
        if (RsRegisteroness) {
          //倒计时
          this.NumeTime = "60";
          this.IshidCode = false;
          this.IshText = true;
          let lastTime = 60;
          var myRequestId = myFunction.myUuid();
          var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
          var myPhone = this.RegisteroneOneInput;
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
          //调用获取验证码接口end
          this.TimeAll = setInterval(() => {
            lastTime--;
            if (lastTime == 1) {
              clearInterval(this.TimeAll);
              this.IshidCode = true;
              this.IshText = false;
            }
            this.NumeTime = lastTime;
          }, 1000);
        } else if (!RsRegisteroness) {
          //注释的是错误弹窗提示
          this.position = "middle";
          this.showPositionValue = true;
          this.RegisteroneManagementText = "请填写正确的手机号码";
        }
      } else if (this.RegisteroneOneInput == "") {
        //注释的是错误弹窗提示
        this.position = "middle";
        this.showPositionValue = true;
        this.RegisteroneManagementText = "手机号不能为空";
      }
    },
    //第一个输入框获取焦点下边框变蓝
    RegisteroneOneFocus() {
      this.RegisteroneOneBottom = "#0287ff";
    },
    //第一个输入框失去焦点下边框变回原来
    RegisteroneOneBlur() {
      this.RegisteroneOneBottom = "#b8b8b8";
    },
    //第二个输入框获取焦点下边框变蓝
    RegisteroneTowFocus() {
      this.RegisteroneTowBottom = "#0287ff";
    },
    //第二个输入框失去焦点下边框变回原来
    RegisteroneTowBlur() {
      this.RegisteroneTowBottom = "#b8b8b8";
    },
    //第三个输入框获取焦点下边框变蓝
    RegisteroneThreeFocus() {
      this.RegisteroneThreeBottom = "#0287ff";
    },
    //第三个输入框失去焦点下边框变回原来
    RegisteroneThreeBlur() {
      this.RegisteroneThreeBottom = "#b8b8b8";
    },
    //确认密码获取焦点下边框变蓝色
    ConfirmPasswordFocus() {
      this.ConfirmPasswordBottom = "#0287ff";
    },
    //确认密码失去焦点下边框变回原来
    ConfirmPasswordBlur() {
      this.ConfirmPasswordBottom = "#b8b8b8";
    },
    //第四个输入框获取焦点下边框变蓝
    RegisteroneFourFocus() {
      this.RegisteroneFourBottom = "#0287ff";
    },
    //第四个输入框失去焦点下边框变回原来
    RegisteroneFourBlur() {
      this.RegisteroneFourBottom = "#b8b8b8";
    }
  },
  beforeMount() {
    if (this.$parent._data.UserInvitationCode == " ") {
      this.RegisteroneFourInput = "";
    } else if (this.$parent._data.UserInvitationCode != " ") {
      this.RegisteroneFourInput = this.$parent._data.UserInvitationCode;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../style/Mythem";
.PutBox {
  margin-top: 100px;
  /* border-bottom: 1px solid #b8b8b8; */
}
.SpaBet {
  height: 100px;
  width: 100%;
}
.PutBox > input {
  height: 37px;
  width: 60%;
  margin-left: 10px;
  margin-bottom: 10px;
}
.CodeTimeSty {
  color: #949494;
  font-size: 28px;
  float: right;
  margin-right: 10px;
  margin-top: 7px;
}
.butCode {
  background: #fff;
  border: none;
  color: #ff721f;
  font-size: 28px;
  margin-top: 7px;
  float: right;
  margin-right: 10px;
}
.RegisteroneBtn {
  width: 600px;
  height: 88px;
  font-size: 28px;
  border-radius: 2px;
  margin-top: 100px;
  border: 0;
}
.YesRegisteroneBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.NoRegisteroneBtn {
  pointer-events: none;
  background: #eee;
  color: #949494;
}
.weui-btn:after {
  border: 0;
}
</style>


