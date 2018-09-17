<template>
  <div class="NoBindingCellPhoneMain">
      <div class="NoBindingCellPhoneHeader">
       <div class="NoBindingCellPhoneHeaderLeft">
         <div class="NoBindingCellPhoneBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="NoBindingCellPhoneHeaderText">{{BindingOrChangePhone}}</div>
     </div>
     <div class="BindingOrChangePhoneForm">
         <div :style="'border-bottom: 1px solid '+BindingOrChangePhoneInputColor">
             <input v-if="AFewTimes==1" readonly="readonly" type="text" :value="BindingOrChangePhoneInputValue" placeholder="请输入原手机号码" @blur="BindingOrChangePhoneInputBlur" @focus="BindingOrChangePhoneInputFocus">
             <input v-if="AFewTimes!=1" type="text"  v-model="BindingOrChangePhoneInput" placeholder="请输入新手机手机号码" @input="notExceeding"  @blur="BindingOrChangePhoneInputBlur" @focus="BindingOrChangePhoneInputFocus">
         </div>
         <div class="ObtainVerificationCodeDiv" :style="'border-bottom: 1px solid '+BindingOrChangeVerificationCodeColor">
             <input type="text" v-model="BindingOrChangeVerificationCodeInput" placeholder="请输入验证码"  @blur="BindingOrChangeVerificationCodeInputBlur" @focus="BindingOrChangeVerificationCodeInputFocus"><button :style="'color:'+NoBindingCellPhoneVerificationCodeBtnColor" :disabled="NoBindingCellPhoneVerificationCodeDisabled" @click="NoBindingCellPhoneVerificationCodeBtn">{{NoBindingCellPhoneVerificationCode}}</button>
         </div>
         <div v-if="AFewTimes==1">
             <x-button class="BindingOrChangePhoneOneBtn" :class="{YesBindingOrChangePhoneOneBtn:(BindingOrChangePhoneInputValue!=='')&&(BindingOrChangeVerificationCodeInput!==''),NoBindingOrChangePhoneOneBtn:(BindingOrChangePhoneInputValue=='')||(BindingOrChangeVerificationCodeInput=='')}" @click.native="showPosition('middle')" type="primary" >{{BindingOrChangePhoneOneBtnText}}</x-button> 
             <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text=positionText :position="position">{{('Basic Usage') }}</toast>
         </div>
         <div v-if="(AFewTimes!=1)">
             <x-button class="BindingOrChangePhoneOneBtn" :class="{YesBindingOrChangePhoneOneBtn:(BindingOrChangePhoneInput!=='')&&(BindingOrChangeVerificationCodeInput!==''),NoBindingOrChangePhoneOneBtn:(BindingOrChangePhoneInput=='')||(BindingOrChangeVerificationCodeInput=='')}" @click.native="showPosition('middle')" type="primary" >{{BindingOrChangePhoneOneBtnText}}</x-button> 
             <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text=positionText :position="position">{{('Basic Usage') }}</toast>
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
      //密码或者手机号错误弹出框提示
      showPositionValue: false,
      position: "",
      positionText: "",
      BindingOrChangePhone: "绑定手机号码",
      BindingStillChange: "", //判断是绑定还是修改
      NoBindingCellPhoneVerificationCode: "获取验证码",
      BindingOrChangePhoneInputColor: "#b8b8b8", //输入电话号码下边框颜色
      BindingOrChangeVerificationCodeColor: "#b8b8b8", //输入验证码下边框颜色
      NoBindingCellPhoneVerificationCodeDisabled: false, //验证码按钮可否点击
      NoBindingCellPhoneVerificationCodeBtnColor: "#ff721f", //验证码按钮文字颜色
      BindingOrChangePhoneInput: "", //输入手机号码双向绑定
      BindingOrChangeVerificationCodeInput: "", //双向绑定验证码
      BindingOrChangePhoneOneBtnText: "", //提交按钮文本
      AFewTimes: 1,
      BindingCellPhoneVerificationCodeTime: "",
      BindingOrChangePhoneInputValue: "", //用户旧号码
      myTime: ""
    };
  },
  methods: {
    //@input时间监听手机号码输入框，输入长度不能超过11位
    notExceeding() {
      if (this.BindingOrChangePhoneInput.length > 11) {
        this.BindingOrChangePhoneInput = this.BindingOrChangePhoneInput.substring(
          0,
          11
        );
      }
    },
    showPosition(position) {
      if (this.BindingStillChange == 2) {
        if (this.AFewTimes == 1) {
          // this.myTime=Math.round(new Date().getTime()/1000).toString()
          var myRequestId = myFunction.myUuid();
          var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
          var myUserId = localStorage.getItem("userID");
          var myVerificationCode = this.BindingOrChangeVerificationCodeInput;
          var myPhone = this.BindingOrChangePhoneInputValue;
          var myArr = [
            "requestId=" + myRequestId,
            "userId=" + myUserId,
            "verificationCode=" + myVerificationCode,
            "phone=" + myPhone
          ];
          var myFunctionValue =
            myFunction.myFunction(myArr) + "/api/user/verifyUserPhone.do";
          var myFunctionValues = md5(myFunctionValue).toUpperCase();
          axios
            .post(
              "ChangeThePhoneNumberOne",
              qs.stringify({
                userId: myUserId,
                verificationCode: myVerificationCode,
                phone: myPhone
              }),
              {
                requestId: myRequestId,
                timestamp: myTimestamp,
                channelType: "h5",
                sign: myFunctionValues
              }
            )
            .then(res => {
              if (res.status == "success") {
                this.AFewTimes = 2;
                this.BindingOrChangePhoneOneBtnText = "确定";
                this.BindingOrChangePhoneInput = "";
                this.BindingOrChangeVerificationCodeInput = "";
                clearInterval(this.BindingCellPhoneVerificationCodeTime);
                this.NoBindingCellPhoneVerificationCode = "获取验证码";
                this.NoBindingCellPhoneVerificationCodeDisabled = false;
                this.NoBindingCellPhoneVerificationCodeBtnColor = "#ff721f";
              } else {
                //注释的是错误弹窗提示
                this.position = position;
                this.showPositionValue = true;
                this.positionText = res.message;
              }
            });
        } else if (this.AFewTimes != 1) {
          var RsBindingOrChangePhoneBtn = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
          var RsBindingOrChangePhoneBtns = RsBindingOrChangePhoneBtn.test(
            this.BindingOrChangePhoneInput
          );
          if (RsBindingOrChangePhoneBtns) {
            if (this.BindingOrChangePhoneInput == sessionStorage["userPhone"]) {
              this.position = position;
              this.showPositionValue = true;
              this.positionText = "新手机号不能和旧手机号一样!";
            } else {
              var myRequestId = myFunction.myUuid();
              var myTimestamp = Math.round(
                new Date().getTime() / 1000
              ).toString();
              var myUserId = localStorage.getItem("userID");
              var myVerificationCode = this
                .BindingOrChangeVerificationCodeInput;
              var myOriginalPhone = this.BindingOrChangePhoneInputValue;
              var myNewPhone = this.BindingOrChangePhoneInput;
              var myArr = [
                "requestId=" + myRequestId,
                "userId=" + myUserId,
                "verificationCode=" + myVerificationCode,
                "originalPhone=" + myOriginalPhone,
                "newPhone=" + myNewPhone
              ];
              var myFunctionValue =
                myFunction.myFunction(myArr) + "/api/user/updateUserPhone.do";
              var myFunctionValues = md5(myFunctionValue).toUpperCase();
              axios
                .post(
                  "ChangeThePhoneNumberTow",
                  qs.stringify({
                    userId: myUserId,
                    verificationCode: myVerificationCode,
                    originalPhone: myOriginalPhone,
                    newPhone: myNewPhone
                  }),
                  {
                    requestId: myRequestId,
                    timestamp: myTimestamp,
                    channelType: "h5",
                    sign: myFunctionValues
                  }
                )
                .then(res => {
                  if (res.status == "success") {
                    // this.myTime=Math.round(new Date().getTime()/1000).toString()
                    var myRequestIds = myFunction.myUuid();
                    var myTimestamps = Math.round(
                      new Date().getTime() / 1000
                    ).toString();
                    var myUserIds = localStorage.getItem("userID");
                    var myArrs = [
                      "requestId=" + myRequestIds,
                      "userId=" + myUserIds
                    ];
                    var myFunctionValues =
                      myFunction.myFunction(myArrs) + "/api/user/logOut.do";
                    var myFunctionValuess = md5(myFunctionValues).toUpperCase();
                    axios
                      .post(
                        "DropOut",
                        qs.stringify({
                          userId: myUserIds
                        }),
                        {
                          requestId: myRequestIds,
                          timestamp: myTimestamps,
                          channelType: "h5",
                          sign: myFunctionValuess
                        }
                      )
                      .then(data => {})
                      .catch(err => {
                        console.log(err);
                      });
                    this.$router.push("/Login/4");
                  } else {
                    //注释的是错误弹窗提示
                    this.position = position;
                    this.showPositionValue = true;
                    this.positionText = res.message;
                  }
                });
            }
          } else if (!RsBindingOrChangePhoneBtns) {
            //注释的是错误弹窗提示
            this.position = position;
            this.showPositionValue = true;
            this.positionText = "手机号码格式不正确";
          }
        }
      }
    },
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //输入手机号码获得焦点下边框变蓝
    BindingOrChangePhoneInputFocus() {
      this.BindingOrChangePhoneInputColor = "#0287ff";
    },
    //输入手机号码失去焦点后下边框变回原来颜色
    BindingOrChangePhoneInputBlur() {
      this.BindingOrChangePhoneInputColor = "#b8b8b8";
    },
    //输入验证码输入框获得焦点后下边框变蓝
    BindingOrChangeVerificationCodeInputFocus() {
      this.BindingOrChangeVerificationCodeColor = "#0287ff";
    },
    //输入验证码输入框失去焦点后下边框变回原来颜色
    BindingOrChangeVerificationCodeInputBlur() {
      this.BindingOrChangeVerificationCodeColor = "#b8b8b8";
    },
    //验证码按钮点击倒计时
    NoBindingCellPhoneVerificationCodeBtn() {
      //获取验证码接口start
      if (this.AFewTimes == 1) {
        //更改页面第一个获取验证码请求
        var NoBindingCellPhoneVerificationCodeObtainTime = 60;
        this.NoBindingCellPhoneVerificationCode =
          "重新获取" + NoBindingCellPhoneVerificationCodeObtainTime + "s";
        this.NoBindingCellPhoneVerificationCodeBtnColor = "#949494";
        this.NoBindingCellPhoneVerificationCodeDisabled = true;
        // this.myTime=Math.round(new Date().getTime()/1000).toString()
        var myRequestId = myFunction.myUuid();
        var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
        var myPhone = sessionStorage["userPhone"];
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
        this.BindingCellPhoneVerificationCodeTime = setInterval(() => {
          NoBindingCellPhoneVerificationCodeObtainTime--;
          this.NoBindingCellPhoneVerificationCode =
            "重新获取" + NoBindingCellPhoneVerificationCodeObtainTime + "s";
          if (NoBindingCellPhoneVerificationCodeObtainTime == 1) {
            clearInterval(this.BindingCellPhoneVerificationCodeTime);
            this.NoBindingCellPhoneVerificationCode = "获取验证码";
            this.NoBindingCellPhoneVerificationCodeDisabled = false;
            this.NoBindingCellPhoneVerificationCodeBtnColor = "#ff721f";
          }
        }, 1000);
      } else if (this.AFewTimes != 1) {
        //更改页面第二个获取验证码请求
        var RsBindingOrChangePhone = /0?(13|14|15|18|17)[0-9]{9}/;
        var RsBindingOrChangePhones = RsBindingOrChangePhone.test(
          this.BindingOrChangePhoneInput
        );
        if (RsBindingOrChangePhones && this.BindingOrChangePhoneInput != "") {
          var NoBindingCellPhoneVerificationCodeObtainTime = 60;
          this.NoBindingCellPhoneVerificationCode =
            "重新获取" + NoBindingCellPhoneVerificationCodeObtainTime + "s";
          this.NoBindingCellPhoneVerificationCodeBtnColor = "#949494";
          this.NoBindingCellPhoneVerificationCodeDisabled = true;
          // this.myTime=Math.round(new Date().getTime()/1000).toString()
          var myRequestId = myFunction.myUuid();
          var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
          var myPhone = this.BindingOrChangePhoneInput;
          var myArr = ["requestId=" + myRequestId, "phone=" + myPhone];
          var myFunctionValue =
            myFunction.myFunction(myArr) + "/api/user/sendSms.do";
          var myFunctionValues = md5(myFunctionValue).toUpperCase();
          axios
            .post(
              "SMSAuthenticationCode",
              qs.stringify({
                phone: myPhone
                // time:this.myTime,
                // token:md5( md5( md5(this.myTime)+'yun' )+'yunkuang123' ),
                // type: 3,
                // phone: this.BindingOrChangePhoneInput
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
          this.BindingCellPhoneVerificationCodeTime = setInterval(() => {
            NoBindingCellPhoneVerificationCodeObtainTime--;
            this.NoBindingCellPhoneVerificationCode =
              "重新获取" + NoBindingCellPhoneVerificationCodeObtainTime + "s";
            if (NoBindingCellPhoneVerificationCodeObtainTime == 1) {
              clearInterval(this.BindingCellPhoneVerificationCodeTime);
              this.NoBindingCellPhoneVerificationCode = "获取验证码";
              this.NoBindingCellPhoneVerificationCodeDisabled = false;
              this.NoBindingCellPhoneVerificationCodeBtnColor = "#ff721f";
            }
          }, 1000);
        } else if (!RsBindingOrChangePhones) {
          if (this.BindingOrChangePhoneInput != "") {
            //注释的是错误弹窗提示
            this.position = "middle";
            this.showPositionValue = true;
            this.positionText = "手机号码格式不正确";
          } else if (this.BindingOrChangePhoneInput == "") {
            //注释的是错误弹窗提示
            this.position = "middle";
            this.showPositionValue = true;
            this.positionText = "手机号码不能为空";
          }
        }
      }
      //获取验证码接口end
    }
  },
  beforeMount() {
    this.BindingOrChangePhoneInputValue = sessionStorage["userPhone"];
    this.BindingStillChange = this.$route.params.BindingOrChange;
    if (this.BindingStillChange == 1) {
      this.BindingOrChangePhone = "绑定手机号码";
      this.BindingOrChangePhoneOneBtnText = "确定";
    } else if (this.BindingStillChange == 2) {
      this.BindingOrChangePhone = "更改绑定手机号码";
      this.BindingOrChangePhoneOneBtnText = "下一步";
    }
  }
};
</script>
<style scoped>
.NoBindingCellPhoneMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.NoBindingCellPhoneHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.NoBindingCellPhoneHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.NoBindingCellPhoneHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.NoBindingCellPhoneBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.NoBindingCellPhoneHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.BindingOrChangePhoneForm {
  width: 100%;
  background: #fff;
  padding-bottom: 100px;
}
.BindingOrChangePhoneForm > div {
  width: 600px;
  margin: auto;
  padding-top: 100px;
  font-size: 28px;
}
.BindingOrChangePhoneForm > div:first-child > input {
  width: 100%;
  height: 27px;
  color: #373d41;
  padding: 0 10px;
  padding-bottom: 10px;
}
.BindingOrChangePhoneForm > div:first-child,
.ObtainVerificationCodeDiv {
  padding-bottom: 2px;
}
.ObtainVerificationCodeDiv > input {
  width: 390px;
  height: 27px;
  color: #373d41;
  padding-left: 10px;
  padding-bottom: 10px;
}
.ObtainVerificationCodeDiv > button {
  width: 188px;
  padding: 0;
  border: 0;
  font-size: 28px;
  text-align: right;
  background: transparent;
}
.BindingOrChangePhoneOneBtn {
  width: 100%;
  height: 88px;
  border-radius: 2px;
  font-size: 28px;
}
.weui-btn_primary {
  color: #949494 !important;
  background: #eee !important;
}
.NoBindingOrChangePhoneOneBtn {
  pointer-events: none;
  color: #949494;
  background: #eee;
}
.YesBindingOrChangePhoneOneBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.ObtainVerificationCodeDiv > button:focus {
  outline: 0;
}
/**vuex按钮把按钮默认边框宽度改为0**/
.weui-btn:after {
  border: 0;
}
</style>




