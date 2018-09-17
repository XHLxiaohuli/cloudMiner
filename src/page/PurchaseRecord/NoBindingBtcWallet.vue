<template>
  <div class="NoBindingBtcWalletMain">
      <div class="NoBindingBtcWalletHeader">
       <div class="NoBindingBtcWalletHeaderLeft">
         <div class="NoBindingBtcWalletBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="NoBindingBtcWalletHeaderText">{{BindingOrChangeWalletAddress}}</div>
     </div>
     <div class="BindingOrChangeWalletAddressForm">
         <div :style="'border-bottom: 1px solid '+BindingOrChangeWalletAddressInputColor">
             <input type="text" v-model="BindingOrChangeWalletAddressInput" :placeholder="PleaseEnterCellWalletAddress" @blur="BindingOrChangeWalletAddressInputBlur" @focus="BindingOrChangeWalletAddressInputFocus">
         </div>
         <div class="ObtainVerificationCodeDiv" :style="'border-bottom: 1px solid '+BindingOrChangeVerificationCodeColor">
             <input type="text" v-model="BindingOrChangeVerificationCodeInput" placeholder="请输入验证码"  @blur="BindingOrChangeVerificationCodeInputBlur" @focus="BindingOrChangeVerificationCodeInputFocus"><button :style="'color:'+NoBindingBtcWalletVerificationCodeBtnColor" :disabled="NoBindingBtcWalletVerificationCodeDisabled" @click="NoBindingBtcWalletVerificationCodeBtn">{{NoBindingBtcWalletVerificationCode}}</button>
         </div>
         <div>
             <x-button class="BindingOrChangeWalletAddressOneBtn" :class="{YesBindingOrChangeWalletAddressOneBtn:(BindingOrChangeWalletAddressInput!=='')&&(BindingOrChangeVerificationCodeInput!==''),NoBindingOrChangeWalletAddressOneBtn:(BindingOrChangeWalletAddressInput=='')||(BindingOrChangeVerificationCodeInput=='')}" @click.native="showPosition('middle')" type="primary" >确定</x-button> 
             <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text=BindingBtcWalletText :position="position">{{('Basic Usage') }}</toast>
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
      //密码或者BTC钱包错误弹出框提示
      showPositionValue: false,
      position: "",
      BindingOrChangeWalletAddress: "绑定BTC钱包",
      BindingStillChange: "", //判断是绑定还是修改
      NoBindingBtcWalletVerificationCode: "获取验证码",
      BindingOrChangeWalletAddressInputColor: "#b8b8b8", //输入BTC钱包下边框颜色
      BindingOrChangeVerificationCodeColor: "#b8b8b8", //输入验证码下边框颜色
      NoBindingBtcWalletVerificationCodeDisabled: false, //验证码按钮可否点击
      NoBindingBtcWalletVerificationCodeBtnColor: "#ff721f", //验证码按钮文字颜色
      BindingOrChangeWalletAddressInput: "", //输入BTC钱包双向绑定
      BindingOrChangeVerificationCodeInput: "", //双向绑定验证码
      PleaseEnterCellWalletAddress: "", //输入BTC钱包占位符
      BindingBtcWalletVerificationCodeTime: "",
      BindingBtcWalletText: "", //绑定BTC地址错误弹出文本
      myTime: ""
    };
  },
  methods: {
    showPosition(position) {
      //注释的是错误弹窗提示
      // this.position = position;
      // this.showPositionValue = true;
      var RsBindingBtcWallet = /^\S{26,34}$/;
      var RsBindingBtcWallets = RsBindingBtcWallet.test(
        this.BindingOrChangeWalletAddressInput
      );
      if (RsBindingBtcWallets) {
        // this.myTime=Math.round(new Date().getTime()/1000).toString()
        var myRequestId = myFunction.myUuid();
        var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
        var myUserId = localStorage.getItem("userID");
        var myPhone = sessionStorage["userPhone"];
        var myVerificationCode = this.BindingOrChangeVerificationCodeInput;
        var myBtcAddress = this.BindingOrChangeWalletAddressInput;
        var myArr = [
          "requestId=" + myRequestId,
          "userId=" + myUserId,
          "phone=" + myPhone,
          "verificationCode=" + myVerificationCode,
          "btcAddress=" + myBtcAddress
        ];
        var myFunctionValue =
          myFunction.myFunction(myArr) + "/api/account/bindingBTC.do";
        var myFunctionValues = md5(myFunctionValue).toUpperCase();
        axios
          .post(
            "BindTheBTCAddress",
            qs.stringify({
              userId: myUserId,
              phone: myPhone,
              verificationCode: myVerificationCode,
              btcAddress: myBtcAddress
              // time:this.myTime,
              // token:md5( md5( md5(this.myTime)+'yun' )+'yunkuang123' ),
              // btc: this.BindingOrChangeWalletAddressInput,
              // code: this.BindingOrChangeVerificationCodeInput
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
              sessionStorage["btcAddress"] = myBtcAddress; //绑定BTC地址
              sessionStorage["isBindingBTC"] = 1; //是否绑定BTC地址 0表示没有 1表示有
              this.$router.push("/YesBindingBtcWallet");
            } else if (data.status != "success") {
              //注释的是错误弹窗提示
              this.position = position;
              this.showPositionValue = true;
              this.BindingBtcWalletText = "验证码错误";
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (!RsBindingBtcWallets) {
        //注释的是错误弹窗提示
        this.position = position;
        this.showPositionValue = true;
        this.BindingBtcWalletText = "BTC地址格式不正确";
      }
    },
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
      sessionStorage.setItem("key", 4);
    },
    //输入BTC钱包获得焦点下边框变蓝
    BindingOrChangeWalletAddressInputFocus() {
      this.BindingOrChangeWalletAddressInputColor = "#0287ff";
    },
    //输入BTC钱包失去焦点后下边框变回原来颜色
    BindingOrChangeWalletAddressInputBlur() {
      this.BindingOrChangeWalletAddressInputColor = "#b8b8b8";
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
    NoBindingBtcWalletVerificationCodeBtn() {
      var NoBindingBtcWalletVerificationCodeObtainTime = 60;
      this.NoBindingBtcWalletVerificationCode =
        "重新获取" + NoBindingBtcWalletVerificationCodeObtainTime + "s";
      this.NoBindingBtcWalletVerificationCodeBtnColor = "#949494";
      this.NoBindingBtcWalletVerificationCodeDisabled = true;
      //验证码接口start
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
      //验证码接口end
      this.BindingBtcWalletVerificationCodeTime = setInterval(() => {
        NoBindingBtcWalletVerificationCodeObtainTime--;
        this.NoBindingBtcWalletVerificationCode =
          "重新获取" + NoBindingBtcWalletVerificationCodeObtainTime + "s";
        if (NoBindingBtcWalletVerificationCodeObtainTime == 1) {
          clearInterval(this.BindingBtcWalletVerificationCodeTime);
          this.NoBindingBtcWalletVerificationCode = "获取验证码";
          this.NoBindingBtcWalletVerificationCodeDisabled = false;
          this.NoBindingBtcWalletVerificationCodeBtnColor = "#ff721f";
        }
      }, 1000);
    }
  },
  beforeMount() {
    this.BindingStillChange = this.$route.params.WalletAddressState;
    if (this.BindingStillChange == 1) {
      this.BindingOrChangeWalletAddress = "绑定BTC钱包";
      this.PleaseEnterCellWalletAddress = "请输入BTC地址";
    } else if (this.BindingStillChange == 2) {
      this.BindingOrChangeWalletAddress = "更改绑定BTC钱包";
      this.PleaseEnterCellWalletAddress = "请输入新BTC地址";
    }
  },
  mounted() {
    if (this.BindingStillChange == 3) {
      if (sessionStorage.getItem("key") == 4) {
        this.BindingOrChangeWalletAddress = "绑定BTC钱包";
        this.PleaseEnterCellWalletAddress = "请输入BTC地址";
        this.position = "middle";
        this.showPositionValue = true;
        this.BindingBtcWalletText = "请先绑定BTC钱包";
        sessionStorage.setItem("key", 5);
      } else if (sessionStorage.getItem("key") != 4) {
        this.BindingOrChangeWalletAddress = "绑定BTC钱包";
        this.PleaseEnterCellWalletAddress = "请输入BTC地址";
      }
    }
  }
};
</script>
<style scoped>
.NoBindingBtcWalletMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.NoBindingBtcWalletHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.NoBindingBtcWalletHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.NoBindingBtcWalletHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.NoBindingBtcWalletBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.NoBindingBtcWalletHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.BindingOrChangeWalletAddressForm {
  width: 100%;
  background: #fff;
  padding-bottom: 100px;
  border-bottom: 1px solid #dfdfdf;
}
.BindingOrChangeWalletAddressForm > div {
  width: 600px;
  margin: auto;
  padding-top: 100px;
  font-size: 28px;
  padding-bottom: 2px;
}
.BindingOrChangeWalletAddressForm > div:first-child > input {
  width: 100%;
  height: 27px;
  color: #373d41;
  padding: 0 10px;
  padding-bottom: 10px;
}
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
.BindingOrChangeWalletAddressOneBtn {
  width: 100%;
  height: 88px;
  border-radius: 2px;
  font-size: 28px;
}
.weui-btn_primary {
  color: #949494 !important;
  background: #eee !important;
}
.NoBindingOrChangeWalletAddressOneBtn {
  pointer-events: none;
  color: #949494;
  background: #eee;
}
.YesBindingOrChangeWalletAddressOneBtn {
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




