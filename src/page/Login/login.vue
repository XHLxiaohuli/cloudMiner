<!--作者:var-->
<template>
  <div>
     <div class="LoginHeader">
       <div class="LoginHeaderLeft">
         <div class="BackPic" @click="BackUpperStory"></div>
       </div>
       <div class="LoginHeaderText">登录</div>
     </div>
     <div class="LoginMain">
       <div class="LoginLogo"></div>
     </div>
     <p class="LoginInput">
       <input type="number" maxlength=11 placeholder="请输入手机号码" v-model="LoginPhone" @input="notExceeding" @blur="LoginIsPhoneInput"  @focus="LoginIsPhoneFocus" :style="'border-bottom:1px solid '+LoginPhoneBorderColor"><i @click="OneLoginInputIClick" class="LoginInputI" :class='{YesLoginInputI:LoginPhone!="",NoLoginInputI:LoginPhone==""}'></i>
     </p>
     <p class="LoginInput LoginInputTow">
       <input type="password" placeholder="请输入密码" v-model="LoginPassword" @blur="LoginIsPasswordInput" @focus="LoginIsPasswordFocus" :style="'border-bottom:1px solid '+LoginPasswordBorderColor"><i  @click="TowLoginInputIClick" class="LoginInputI" :class='{YesLoginInputI:LoginPassword!="",NoLoginInputI:LoginPassword==""}'></i>
     </p>
     <div class="ForgetPassWord">
       <span @click="ForgetPasswordClick">忘记密码?</span>
     </div>
     <div class="LoginBtns">
       <x-button class="LoginBtn"  @click.native="showPosition('middle')" type="primary" :class="{IsLoginstate:(LoginPhone!=='')&&(LoginPassword!==''),IsLoginDisab:(LoginPhone=='')||(LoginPassword=='')}">登录</x-button> 
     </div>
     <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text="LoginerrorPrompt" :position="position">{{('Basic Usage') }}</toast>
      <div class="LoginBtnss">
         <x-button class="LoginResgisTerBtn" @click.native="LoginJumpRsgisTer">注册</x-button>
      </div> 
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
      //密码或者手机号错误弹出框提示
      showPositionValue: false,
      position: "",
      //双向绑定手机号
      LoginPhone: "",
      //双向绑定密码
      LoginPassword: "",
      //电话输入框下边框颜色
      LoginPhoneBorderColor: "#b8b8b8",
      //密码输入框下边框颜色
      LoginPasswordBorderColor: "#b8b8b8",
      LoginerrorPrompt: "",

      myTime: ""
    };
  },
  methods: {
    //@input时间监听手机号码输入框，输入长度不能超过11位
    notExceeding() {
      if (this.LoginPhone.length > 11) {
        this.LoginPhone = this.LoginPhone.substring(0, 11);
      }
    },
    OneLoginInputIClick() {
      this.LoginPhone = "";
    },
    TowLoginInputIClick() {
      this.LoginPassword = "";
    },
    showPosition(position) {
      var RsLoginPhone = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
      var RsLoginPhones = RsLoginPhone.test(this.LoginPhone);
      var RsLoginPas = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/;
      var RsLoginPass = RsLoginPas.test(this.LoginPassword);
      if (
        (!RsLoginPhones && !RsLoginPass) ||
        (RsLoginPhones && !RsLoginPass) ||
        (!RsLoginPhones && RsLoginPass)
      ) {
        //注释的是错误弹窗提示
        this.LoginerrorPrompt = "手机号码或者密码不正确";
        this.position = position;
        this.showPositionValue = true;
      } else if (RsLoginPhones && RsLoginPass) {
        // this.myTime=Math.round(new Date().getTime()/1000).toString()
        var myRequestId = myFunction.myUuid();
        var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
        var myPhone = this.LoginPhone;
        var myPassword = md5(this.LoginPassword);
        var myArr = [
          "requestId=" + myRequestId,
          "phone=" + myPhone,
          "password=" + myPassword
        ];
        var myFunctionValue = md5(
          myFunction.myFunction(myArr) + "/api/user/login.do"
        ).toUpperCase();
        axios
          .post(
            "UserLogin",
            qs.stringify({
              phone: myPhone,
              password: myPassword
            }),
            {
              requestId: myRequestId,
              timestamp: myTimestamp,
              channelType: "h5",
              sign: myFunctionValue
            }
          )
          .then(res => {
            if (res.status == "success") {
              if (this.$route.params.index == 3) {
                this.$router.push("/redEnvelopes");
              } else if (this.$route.params.index == 4) {
                this.$router.push("/Home/My");
              } else {
                // this.$router.push("/Home/Index/1");
                this.$router.go(-1);
              }
              //永久储存用户
              localStorage.setItem("userID", res.data.userId); //用户ID
              localStorage.setItem("invitationCode", res.data.invitationCode); //邀请码
              //sessionStorage浏览器储存
              sessionStorage["userPhone"] = res.data.phone; //用户手机
              sessionStorage["userPassword"] = md5(this.LoginPassword); //用户密码
              sessionStorage["userGrade"] = res.data.userGrade; //用户等级
              sessionStorage["userStep"] = res.data.userStep; //用户等级等阶
              sessionStorage["btcAddress"] = res.data.btcAddress; //绑定BTC地址
              sessionStorage["isBindingBTC"] = res.data.isBindingBTC; //是否绑定BTC地址 0表示没有 1表示有
              sessionStorage["isBindingPhone"] = res.data.isBindingPhone; //是否绑定手机 0表示没有 1表示有
              sessionStorage["isRealName"] = res.data.isRealName; //是否实名认证 0表示没有 1表示有
              sessionStorage["realName"] = res.data.realName; //真实名称
              sessionStorage["username"] = res.data.usernam; //用户名称

              //之前本地永久储存
              // localStorage.setItem("userPhone",res.data.phone)//用户手机
              // localStorage.setItem("userPassword", md5(this.LoginPassword))//用户密码
              // localStorage.setItem("userID",res.data.userId)//用户ID
              // localStorage.setItem("userGrade",res.data.userGrade)//用户等级
              // localStorage.setItem("userStep",res.data.userStep)//用户等级等阶
              // localStorage.setItem("btcAddress",res.data.btcAddress )//绑定BTC地址
              // localStorage.setItem("isBindingBTC",res.data.isBindingBTC) //是否绑定BTC地址 0表示没有 1表示有
              // localStorage.setItem("isBindingPhone",res.data.isBindingPhone)//是否绑定手机 0表示没有 1表示有
              // localStorage.setItem("isRealName",res.data.isRealName)//是否实名认证 0表示没有 1表示有
              // localStorage.setItem("realName",res.data.realName)//真实名称
              // localStorage.setItem("username",res.data.username)//用户名称
              // localStorage.setItem("invitationCode",res.data.invitationCode)//邀请码
            } else if (res.status == "fail") {
              this.LoginerrorPrompt = res.message;
              this.position = position;
              this.showPositionValue = true;
            }
          });
      }
    },

    //输入电话输入框失去焦点时间
    LoginIsPhoneInput() {
      this.LoginPhoneBorderColor = "#b8b8b8";
    },
    //输入密码输入框失去焦点时间
    LoginIsPasswordInput() {
      this.LoginPasswordBorderColor = "#b8b8b8";
    },
    //电话输入框获得焦点事件
    LoginIsPhoneFocus() {
      this.LoginPhoneBorderColor = "#0287ff";
    },
    //密码输入框获得焦点事件
    LoginIsPasswordFocus() {
      this.LoginPasswordBorderColor = "#0287ff";
    },
    //放回上一级
    BackUpperStory() {
      if (this.$route.params.index == 1) {
        this.$router.go(-1);
      } else if (this.$route.params.index == 2) {
        this.$router.push("/RegisTer/ ");
      } else if (this.$route.params.index == 3) {
        this.$router.push("/redEnvelopes");
      }
    },
    //跳到注册页面
    LoginJumpRsgisTer() {
      this.$router.push("/RegisTer/ ");
    },
    //跳转忘记密码
    ForgetPasswordClick() {
      this.$router.push("/ForgetPassword");
    }
  }
};
</script>
<style lang='scss' scoped>
.LoginHeader {
  height: 88px;
}
.LoginHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.LoginHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.BackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.LoginHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.LoginMain {
  width: 100%;
  height: 300px;
  position: relative;
}
.LoginLogo {
  width: 300px;
  height: 92px;
  background: url("../../static/img/logo.png") no-repeat;
  background-size: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.LoginInput {
  width: 667pxpx;
}
.LoginInput > input {
  width: 540px;
  height: 37px;
  font-size: 28px;
  color: #373d41;
  padding-left: 10px;
  padding-right: 50px;
  border: 0;
  margin-left: 75px;
  padding-bottom: 10px;
}
.LoginInputTow {
  margin-top: 100px;
}
.ForgetPassWord {
  width: 600px;
  margin: auto;
  text-align: right;
  margin-top: 20px;
}
.ForgetPassWord > span {
  font-size: 24px;
  color: #373d41;
}
/*电话和密码同时不为空时挂载该class*/
.LoginBtn {
  /* width: 600px;
  height: 88px; */
  width: 100%;
  height: 100%;
  font-size: 28px;
  border-radius: 2px;
  /* margin-top: 100px; */
  border: 0;
}
.IsLoginstate {
  background: #0287ff !important; /**!important**/
  color: #fff !important;
}
.IsLoginDisab {
  pointer-events: none;
  background: #eee !important;
  color: #949494 !important;
}
.LoginResgisTerBtn {
  width: 600px;
  height: 88px;
  color: #0287ff !important;
  margin-top: 50px;
  font-size: 28px;
  background: #fff !important;
  border-radius: 2px;
  border: 1px solid #0287ff !important;
}
/**vuex按钮把按钮默认边框宽度改为0**/
.weui-btn:after {
  border: 0;
}
.LoginBtns {
  width: 600px;
  height: 88px;
  border-radius: 2px;
  margin: auto;
  margin-top: 100px;
  border: 0;
}
.LoginBtnss {
  width: 600px;
  height: 88px;
  border-radius: 2px;
  margin: auto;
  border: 0;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  background-color: #0260b2 !important;
  width: 570px;
  height: 84px;
  margin-top: 100px;
  margin-top: 15px;
}
.LoginInputI {
  position: relative;
  display: inline-block;
  top: 7px;
  right: 36px;
  background: url("../../static/img/shanchu.png") no-repeat;
  background-size: 100%;
}
.YesLoginInputI {
  width: 26px;
  height: 26px;
}
.NoLoginInputI {
  width: 0px;
  height: 0px;
}
</style>

