<template>
  <div class="Towitem">
    <div class="Boid" :style="'border-bottom: 1px solid '+TowitemOneBorder">
          <input type="text" v-model="TowitemOneInput" placeholder="请输入真实姓名" @focus="TowitemOneFocus" @blur="TowitemOneBlur">
   </div>
 <div class="Boid" :style="'border-bottom: 1px solid '+TowitemTowBorder">
          <input type="text" v-model="TowitemTowInput" placeholder="请输入身份证号码" @focus="TowitemTowFocus" @blur="TowitemTowBlur">
   </div>
   <div class="TowitemTitel"><span></span>我们注重保护信息，不授权对外提供。</div>
  <div>
        <x-button class="TowRegisteroneBtn" @click.native="showPosition('middle')" type="primary"
        :class='{YesTowRegisteroneBtn:(TowitemOneInput!="")&&(TowitemTowInput!=""),NoTowRegisteroneBtn:(TowitemOneInput=="")||(TowitemTowInput=="")}'
        >下一步</x-button> 
        <toast width="13em" v-model="TowShowPositionValue" type="text" :time="1500" is-show-mask :text=TowRegisteroneManagementText :position="TowPosition">{{('Basic Usage') }}</toast>
  </div>
   <!--弹框  -->
    <div v-transfer-dom>
      <confirm v-model="PopUp" :title="TileTex">
      <div class="alTex">
        <p style="color: #e12227;">请您再次确认您的身份信息，以免影响您的加入和提现操作！</p>
        <p style="margin-top: 50px;">姓名：{{otographs}}</p>
        <p style="margin-top: 50px;">身份证：{{mmunication}}</p>
      </div>
      <div class="bthbox">
       <button @click="onHide">返回</button><button @click="jumpLogin">确认认证</button>
      </div>.
      </confirm>
    </div>
  </div>
</template>
<script>
import { Toast, XButton } from "vux";
import { fail } from "assert";
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import { Confirm, TransferDomDirective as TransferDom } from "vux";
import myFunction from "@/page/encryption/encryption";
export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    Toast,
    XButton,
    myFunction
  },
  data() {
    return {
      TowShowPositionValue: false,
      TowPosition: "",
      TowRegisteroneManagementText: "", //错误提示文本
      TileTex: "",
      otographs: "",
      mmunication: "",
      PopUp: false,
      TowitemOneBorder: "#b8b8b8",
      TowitemTowBorder: "#b8b8b8",
      TowitemOneInput: "",
      TowitemTowInput: "",
      realAddress: "" //物理地址
    };
  },
  methods: {
    showPosition(position) {
      var RsIDcard = /\d{17}[\d|x]|\d{15}/;
      var RsIDcards = RsIDcard.test(this.TowitemTowInput);
      var RsUserName = /^[\u4E00-\u9FA5]{2,4}$/;
      var RsUserNames = RsUserName.test(this.TowitemOneInput);
      if (RsUserNames) {
        if (RsIDcards) {
          this.PopUp = true; //控制弹框
          this.otographs = this.TowitemOneInput;
          this.mmunication = this.TowitemTowInput;
        } else if (!RsIDcards) {
          this.TowPosition = "middle";
          this.TowShowPositionValue = true;
          this.TowRegisteroneManagementText = "姓名或身份证号码不正确";
        }
      } else if (!RsUserNames) {
        this.TowPosition = "middle";
        this.TowShowPositionValue = true;
        this.TowRegisteroneManagementText = "请输入有效的真实姓名";
      }
    },
    onHide() {
      this.PopUp = false;
    },
    jumpLogin() {
      var myRequestIds = myFunction.myUuid();
      var myTimestamps = Math.round(new Date().getTime() / 1000).toString();
      var myPhones = sessionStorage["userPhone"]; //localStorage.getItem("userPhone") 注释的是本地永久存储;
      var myPasswords = sessionStorage["userPassword"]; //localStorage.getItem("userPassword") 注释的是本地永久存储;
      var myInviteCodes = sessionStorage["inviteCode"]; //localStorage.getItem("inviteCode") 注释的是本地永久存储;
      var myRealNames = this.TowitemOneInput;
      var myIdNumbers = this.TowitemTowInput;
      var myUserAddress = this.realAddress;
      var myArrs = [
        "requestId=" + myRequestIds,
        "phone=" + myPhones,
        "password=" + myPasswords,
        "inviteCode=" + myInviteCodes,
        "realName=" + myRealNames,
        "idNumber=" + myIdNumbers,
        "userAddress=" + myUserAddress
      ];
      var myFunctionValues =
        myFunction.myFunction(myArrs) + "/api/user/register.do";
      var myFunctionValuess = md5(myFunctionValues).toUpperCase();
      axios
        .post(
          "UserRegistration",
          qs.stringify({
            phone: myPhones,
            password: myPasswords,
            inviteCode: myInviteCodes,
            realName: myRealNames,
            idNumber: myIdNumbers,
            userAddress: myUserAddress
          }),
          {
            requestId: myRequestIds,
            timestamp: myTimestamps,
            channelType: "h5",
            sign: myFunctionValuess
          }
        )
        .then(data => {
          if (data.status == "success") {
            // this.$router.push("/Login/2");
            //本地永久储存用户id
            localStorage.setItem("userID", data.data.userId); //用户ID
            localStorage.setItem("invitationCode", data.data.invitationCode); //邀请码
            //浏览器缓存
            sessionStorage["userPhone"] = data.data.phone; //用户手机
            sessionStorage["userGrade"] = data.data.userGrade; //用户等级
            sessionStorage["userStep"] = data.data.userStep; //用户等级等阶
            sessionStorage["btcAddress"] = data.data.btcAddress; //绑定BTC地址
            sessionStorage["isBindingBTC"] = data.data.isBindingBTC; //是否绑定BTC地址 0表示没有 1表示有
            sessionStorage["isBindingPhone"] = data.data.isBindingPhone; //是否绑定手机 0表示没有 1表示有
            sessionStorage["isRealName"] = data.data.isRealName; //是否实名认证 0表示没有 1表示有
            sessionStorage["realName"] = data.data.realName; //真实名称
            sessionStorage["username"] = data.data.username; //用户名称
            //注释的是本地永久储存
            // localStorage.setItem("userPhone",data.data.phone)//用户手机
            // localStorage.setItem("userID",data.data.userId)//用户ID
            // localStorage.setItem("userGrade",data.data.userGrade)//用户等级
            // localStorage.setItem("userStep",data.data.userStep)//用户等级等阶
            // localStorage.setItem("btcAddress",data.data.btcAddress )//绑定BTC地址
            // localStorage.setItem("isBindingBTC",data.data.isBindingBTC) //是否绑定BTC地址 0表示没有 1表示有
            // localStorage.setItem("isBindingPhone",data.data.isBindingPhone)//是否绑定手机 0表示没有 1表示有
            // localStorage.setItem("isRealName",data.data.isRealName)//是否实名认证 0表示没有 1表示有
            // localStorage.setItem("realName",data.data.realName)//真实名称
            // localStorage.setItem("username",data.data.username)//用户名称
            // localStorage.setItem("invitationCode",data.data.invitationCode)//邀请码
            this.$router.push("/Home/Index/1");
          } else if (data.status == "fail") {
            this.PopUp = false;
            this.TowPosition = "middle";
            this.TowShowPositionValue = true;
            this.TowRegisteroneManagementText = data.message;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //注册页面二第一个输入框获取焦点下边框变蓝
    TowitemOneFocus() {
      this.TowitemOneBorder = "#0287ff";
    },
    //注册页面二第一个输入框失去焦点下边框还原
    TowitemOneBlur() {
      this.TowitemOneBorder = "#b8b8b8";
    },
    //注册页面二第二个输入框获取焦点下边框变蓝
    TowitemTowFocus() {
      this.TowitemTowBorder = "#0287ff";
    },
    //注册页面二第二个输入框失去焦点下边框还原
    TowitemTowBlur() {
      this.TowitemTowBorder = "#b8b8b8";
    },
    //根据ip地址获取物理地址
    PhysicalAddress() {
      var IPAddress = returnCitySN["cip"];
      var ipRequestId = myFunction.myUuid();
      var ipTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var ipArr = ["requestId=" + ipRequestId, "ipAddress=" + IPAddress];
      var ipFunction = md5(
        myFunction.myFunction(ipArr) + "/api/user/getAddressByIP.do"
      ).toUpperCase();
      axios
        .post(
          "PhysicalAddress",
          qs.stringify({
            ipAddress: IPAddress
          }),
          {
            requestId: ipRequestId,
            timestamp: ipTimestamp,
            channelType: "h5",
            sign: ipFunction
          }
        )
        .then(data => {
          this.realAddress = data.data.userAddress;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.PhysicalAddress();
  }
};
</script>
<style lang='scss' scoped>
@import "../../style/Mythem";
.Butwpp {
  height: 100px;
  width: 100%;
}
.bthbox {
  width: 100%;
  height: 100px;
  background: #0288ff;
  line-height: 100px;
  font-size: 28px;
  color: #fff;
  margin-top: 100px;
}
.Boid {
  margin-top: 100px;
  // border-bottom: 1px solid #b8b8b8;
}
.Boid > input {
  height: 37px;
  width: 60%;
  margin-left: 10px;
  margin-bottom: 10px;
}
.alTex {
  margin-top: 50px;
  margin-left: 62px;
  margin-right: 62px;
}
.alTex p {
  text-align: left;
  font-size: 28px;
}
.weui-dialog {
  width: 655px !important;
  height: 424px !important;
}
.alTex {
  margin: 0;
}
.alTex p {
  margin: 0 !important;
  padding: 0 55px;
}
.alTex > p:first-child {
  color: #373d41 !important;
  font-size: 28px !important;
  font-weight: bolder !important;
  margin-top: 42px !important;
  line-height: 43px;
}
.alTex > p:nth-child(2),
.alTex > p:nth-child(3) {
  margin-top: 39px !important;
}
.bthbox {
  margin-top: 47px;
  background: #f6f6f9;
}
.bthbox > button:nth-child(1),
.bthbox > button:nth-child(2) {
  width: 50%;
  border: 0;
  background: #f6f6f9;
  padding: 0;
  font-size: 28px;
  float: left;
  margin-top: 36px;
}
.bthbox > button:nth-child(1) {
  color: #373d41;
}
.bthbox > button:nth-child(2) {
  color: #fb0303;
  border-left: 1px solid #b8b8b8;
  box-sizing: border-box;
}
.bthbox > button:focus {
  outline: 0;
}
.TowRegisteroneBtn {
  width: 600px;
  height: 88px;
  font-size: 28px;
  border-radius: 2px;
  margin-top: 100px;
  border: 0;
}
.YesTowRegisteroneBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.NoTowRegisteroneBtn {
  pointer-events: none;
  background: #eee !important;
  color: #949494 !important;
}
.TowitemTitel {
  color: #0287ff;
  font-size: 24px;
  padding-left: 10px;
  margin-top: 20px;
}
.TowitemTitel > span {
  display: inline-block;
  width: 21px;
  height: 24px;
  background: url("../../static/img/duanpai.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 10px;
  position: relative;
  top: 1px;
}
.weui-btn:after {
  border: 0;
}
</style>

