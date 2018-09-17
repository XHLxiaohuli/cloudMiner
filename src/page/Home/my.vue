<!--作者:var-->
<template>
  <div class="MyMain">
    <ul class="myTop">
      <li class="UserInformationOne">
        <div @click="jumpUserInformation">{{RealNameOfTheUser}}</div>
      </li>
      <li class="UserInformationTow">
        <div @click="jumpUserInformation">{{MyUsername}}</div>
        <div>
          <div @click="jumpUserInformation">编辑信息<span  class="EditInformationPic"><img src="../../static/img/EditInformation.png" alt=""></span></div>
        </div>
      </li>
      <li class="UserInformationThree">
        <div @click="jumpMinerGradeRule">
          <img src='../../static/img/dazhong@2x.png' alt="" v-if="MinerGrade==1">
          <img src='../../static/img/baiyin@2x.png' alt="" v-if="MinerGrade==2">
          <img src='../../static/img/huangjin@2x.png' alt="" v-if="MinerGrade==3">
          <img src='../../static/img/zuanshi@2x.png' alt="" v-if="MinerGrade==4">
        </div>
        <p  @click="jumpMinerGradeRule" class="MyUserGrade">{{UserGrade}}</p>
      </li>
    </ul>
    <div class="AllAccountBalanceAndWithdrawalsDiv">
      <hr>
      <div class="AllAccountBalanceAndWithdrawals">
        <div class="AllAccountBalanceAndWithdrawalsLeft">
          <p>账户余额</p>
          <p>BTC余额</p>
          <p>{{BtcAccountBalance}} <span>BTC</span></p>
          <p>折合RMB余额</p>
          <p>{{EquivalentRmbBalance}} <span>CNY</span></p>
        </div>
        <div class="AllAccountBalanceAndWithdrawalsRight">
          <x-button class="AllAccountBalanceAndWithdrawalsRightBtn" @click.native="showPosition('middle')" type="primary">提现</x-button> 
            <toast width="13em" v-model="showPositionValue" type="text" :time="500" is-show-mask :text=myWithdrawalsBtnTitle :position="position">{{('Basic Usage') }}</toast>
        </div>
      </div>
    </div>
    <div class="MyInvitationCode" @click="jumpCopyInvitationCode">
      <div>邀请好友</div>
      <div>
        <img src="../../static/img/rukou-qiehuan.png" alt="">
      </div>
    </div>
    <div class="FillHrDiv">
      <hr class="FillHr">
    </div>
    <div class="MyReceivingCode" v-show="MyReceivingCodeShow" @click="MyReceivingCodeClick">
      <div>我的激活码</div>
      <div>
        <img src="../../static/img/rukou-qiehuan.png" alt="">
      </div>
    </div>
    <ul class="PurchaseWithdrawalsBankCard">
      <li v-for="(item,index) in PurchaseWithdrawalsBankCardData" @click="jumpPurchaseOrWithdrawalsOrBankCard(index)">
        <div>{{item}}</div>
        <div>
          <img src="../../static/img/rukou-qiehuan.png" alt="">
        </div>
      </li>
    </ul>
    <div class="MinerRaiders" @click="MinerRaidersClick">
      <span>云矿工攻略</span><span></span>
    </div>
    <div class="MyFooterCile"></div>
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
      RealNameOfTheUser: "",
      MyUsername: "",
      UserGrade: "",
      PurchaseWithdrawalsBankCardData: ["购买记录", "提现记录", "BTC钱包"],
      BtcAccountBalance: "", //BTC账户余额
      EquivalentRmbBalance: "", //折合后RMB余额
      MinerGrade: "", //矿工等级
      IsBtcSite: "", //是否绑定了BTC地址
      myWithdrawalsBtnTitle: "",
      showPositionValue: false,
      position: "",
      MyReceivingCodeShow: false
    };
  },
  methods: {
    showPosition(position) {
      //跳到BTC提现页面
      if (this.IsBtcSite == 0) {
        this.$router.push("/NoBindingBtcWallet/3");
      } else if (this.IsBtcSite == 1) {
        this.$router.push("/BtcWithdrawals");
      }
    },
    jumpPurchaseOrWithdrawalsOrBankCard(index) {
      //跳转购买记录，提现记录，btc钱包页面
      if (index == 0) {
        this.$router.push("/PurchaseRecord");
      } else if (index == 1) {
        this.$router.push("/PresentRecord");
      } else if (index == 2) {
        if (this.IsBtcSite == 0) {
          this.$router.push("/NoBindingBtcWallet/1");
        } else if (this.IsBtcSite == 1) {
          this.$router.push("/YesBindingBtcWallet");
        }
      }
    },
    //跳到用户信息
    jumpUserInformation() {
      this.$router.push("/UserInformation");
    },
    //跳到复制邀请码页面
    jumpCopyInvitationCode() {
      this.$router.push("/CopyInvitationCode");
    },
    //跳转到矿工等级规则页面
    jumpMinerGradeRule() {
      var HowMinerGrade = this.MinerGrade;
      if (HowMinerGrade == 1) {
        this.$router.push("/MinerGradeRule/1");
      } else if (HowMinerGrade == 2) {
        this.$router.push("/MinerGradeRule/2");
      } else if (HowMinerGrade == 3) {
        this.$router.push("/MinerGradeRule/3");
      } else if (HowMinerGrade == 4) {
        this.$router.push("/MinerGradeRule/4");
      }
    },
    MobileAllProfitFuction() {
      //获取用户信息接口
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
            this.RealNameOfTheUser = data.data.realName.substr(-2, 2); //用户名字后两个字
            this.MyUsername = data.data.username; //系统生成的用户名称
            var userGradeName = "";
            if (data.data.userGrade == 1) {
              userGradeName = "大众矿工";
            } else if (data.data.userGrade == 2) {
              if (data.data.userStep == 1) {
                userGradeName = "初级白银";
              } else if (data.data.userStep == 2) {
                userGradeName = "中级白银";
              } else if (data.data.userStep == 3) {
                userGradeName = "高级白银";
              }
            } else if (data.data.userGrade == 3) {
              if (data.data.userStep == 1) {
                userGradeName = "初级黄金";
              } else if (data.data.userStep == 2) {
                userGradeName = "中级黄金";
              } else if (data.data.userStep == 3) {
                userGradeName = "高级黄金";
              }
            } else if (data.data.userGrade == 4) {
              if (data.data.userStep == 1) {
                userGradeName = "初级钻石";
              } else if (data.data.userStep == 2) {
                userGradeName = "中级钻石";
              } else if (data.data.userStep == 3) {
                userGradeName = "高级钻石";
              }
            }
            this.UserGrade = userGradeName; //用户等级名称
            this.MinerGrade = data.data.userGrade; //用户等级 1大众 2白银 3表示黄金 4表示砖石 ,
            this.IsBtcSite = data.data.isBindingBTC; //是否绑定BTC地址 0表示没有 1表示有
            sessionStorage['realName'] =data.data.realName;
            sessionStorage['isBindingPhone'] =data.data.isBindingPhone;
            sessionStorage['userPhone'] =data.data.phone;
          } else if (data.code == 413) {
            this.$router.push("/Login/1");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取用户账户信息接口
    AccessToAccountInformation() {
      //获取用户账户信息接口
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
          if (data.code == 200) {
            this.BtcAccountBalance = data.data.balanceBtc; //余额btc量 保留小数点后8位
            this.EquivalentRmbBalance = data.data.convertRMB; //折合RMB价格
            sessionStorage["userBalanceBtc"] = data.data.balanceBtc;
            sessionStorage["userConvertRMB"] = data.data.convertRMB;
          } else if (data.code == 413) {
            this.$router.push("/Login/1");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //云矿工攻略
    MinerRaidersClick() {
      this.$router.push("/MinerRaiderss");
    },
    MyReceivingCodeClick() {
      this.$router.push("/redEnvelopes");
    }
    //红包领取页面跳转，已修改为没有
    // WhetherParticipateIn() {
    // this.myTime = Math.round(new Date().getTime() / 1000).toString();
    // axios
    //   .post(
    //     "ActivityJudgment",
    //     qs.stringify({
    //       time: this.myTime,
    //       token: md5(md5(md5(this.myTime) + "yun") + "yunkuang123"),
    //       type: 1
    //     })
    //   )
    //   .then(data => {
    //     if (data.status == 0) {
    //       this.MyReceivingCodeShow = true;
    //     } else if (data.status == 1) {
    //       this.MyReceivingCodeShow = false;
    //     } else if (data.status == -1) {
    //       this.MyReceivingCodeShow = false;
    //     }
    //   })
    //   .catch(err => {});
    // },
  },
  beforeMount() {
    this.MobileAllProfitFuction();
    this.AccessToAccountInformation();
    // this.WhetherParticipateIn();
  }
};
</script>
<style scoped>
.myTop {
  padding: 0 24px;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #f2f2f2;
}
.myTop:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.myTop > li {
  height: 262px;
  float: left;
  position: relative;
}
.myTop > li:last-child {
  float: right;
}
.UserInformationOne {
  width: 120px;
}
.UserInformationOne > div {
  width: 120px;
  height: 120px;
  color: #949494;
  line-height: 120px;
  background: #f2f2f2;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  margin-right: 20px;
  border-radius: 50%;
  font-size: 32px;
}
.UserInformationTow {
  padding-left: 20px;
  font-size: 28px;
  color: #373d41;
}
.UserInformationThree {
  width: 124px;
}
.UserInformationThree > div {
  width: 124px;
  height: 120px;
  margin-top: 50px;
}
.UserInformationThree > div > img {
  width: 100%;
  height: 100%;
}
.MyUserGrade {
  font-size: 24px;
  color: #373d41;
  text-align: center;
  margin-top: 20px;
}
.MyInvitationcode {
  margin-left: 20px;
  background: #949494;
  position: relative;
}
.MyInvitationcode > p:nth-child(1) {
  font-size: 26px;
  color: #fff;
  opacity: 0.6;
  padding-left: 20px;
}
.MyInvitationcode > p:nth-child(2) {
  text-align: center;
  font-size: 32px;
  color: #fff;
  margin-top: 49px;
  margin-bottom: 55px;
  font-weight: bolder;
}
.MyInvitationcode > p:nth-child(3) {
  text-align: center;
  color: #fff;
  font-size: 20px;
}
.PurchaseWithdrawalsBankCard {
  background: #fff;
  padding: 0 24px;
  margin-top: 20px;
}
.PurchaseWithdrawalsBankCard > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PurchaseWithdrawalsBankCard > li {
  padding: 50px 0;
  height: 26px;
  border-bottom: 1px solid #f2f2f2;
}
.PurchaseWithdrawalsBankCard > li > div:first-child {
  float: left;
  font-size: 28px;
  color: #373d41;
}
.PurchaseWithdrawalsBankCard > li > div:last-child {
  float: right;
  width: 14px;
  height: 100%;
}
.PurchaseWithdrawalsBankCard > li > div:last-child > img {
  width: 100%;
  height: 100%;
}
#foo {
  position: absolute;
  top: 0;
  z-index: -50;
}
.UserInformationTow > div:first-child {
  margin-top: 90px;
  margin-bottom: 20px;
}
.UserInformationTow > div:last-child {
  width: 160px;
  height: 36px;
  border-radius: 18px;
  color: #949494;
  font-size: 20px;
  line-height: 36px;
  text-align: center;
  border: 1px solid #dfdfdf;
}
.EditInformationPic {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 10px;
}
.EditInformationPic > img {
  width: 100%;
  height: 100%;
}
.AllAccountBalanceAndWithdrawalsDiv {
  padding: 0;
  width: 100%;
  background: #fff;
  vertical-align: baseline;
  padding: 50px 0;
}
.AllAccountBalanceAndWithdrawalsDiv > hr {
  margin: 0;
  border: 0;
  border-bottom: 1px solid #fff;
  opacity: 0.5;
  width: 702px;
  margin: auto;
  position: relative;
  top: 88px;
}
.AllAccountBalanceAndWithdrawals {
  padding: 0;
  width: 642px;
  height: 398px;
  margin: auto;
  padding: 0 30px;
  border-radius: 10px;
  background: url("../../static/img/OneMyPic.png") no-repeat;
  background-size: 100% 100%;
}
.AllAccountBalanceAndWithdrawals:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.AllAccountBalanceAndWithdrawalsLeft {
  float: left;
}
.AllAccountBalanceAndWithdrawalsRight {
  float: right;
  width: 120px;
  height: 398px;
  position: relative;
}
.AllAccountBalanceAndWithdrawalsRightBtn {
  width: 120px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  position: absolute;
  bottom: 37px;
  font-size: 28px;
}
.AllAccountBalanceAndWithdrawalsRightBtn:focus {
  outline: 0;
}
.AllAccountBalanceAndWithdrawalsLeft > p {
  color: #fff;
  margin-bottom: 46px;
}
.AllAccountBalanceAndWithdrawalsLeft > p:last-child {
  margin-bottom: 0;
}
.AllAccountBalanceAndWithdrawalsLeft > p:first-child {
  font-size: 28px;
  margin-top: 30px;
  margin-bottom: 61px;
}
.AllAccountBalanceAndWithdrawalsLeft > p:nth-child(2),
.AllAccountBalanceAndWithdrawalsLeft > p:nth-child(4) {
  font-size: 24px;
  opacity: 0.5;
}
.AllAccountBalanceAndWithdrawalsLeft > p:nth-child(3),
.AllAccountBalanceAndWithdrawalsLeft > p:nth-child(5) {
  font-size: 32px;
  font-weight: bolder;
}
.AllAccountBalanceAndWithdrawalsLeft > p:nth-child(3) > span,
.AllAccountBalanceAndWithdrawalsLeft > p:nth-child(5) > span {
  font-size: 24px;
}
.MyInvitationCode {
  width: 100%;
  background: #fff;
  padding: 50px 0;
  margin-top: 20px;
}
.MyInvitationCode:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.MyInvitationCode > div {
  font-size: 28px;
}
.MyInvitationCode > div:first-child {
  float: left;
  padding-left: 24px;
}
.MyInvitationCode > div:nth-child(2) {
  float: right;
  width: 14px;
  height: 28px;
  margin-right: 24px;
}
.MyInvitationCode > div:nth-child(2) > img {
  width: 100%;
  height: 100%;
}
.FillHrDiv {
  background: #fff;
}
.FillHr {
  margin: 0;
  width: 702px;
  border: 0;
  border-bottom: 1px solid #f2f2f2;
  margin: auto;
}
.MyFooterCile {
  width: 100%;
  height: 200px;
  background: #f5f5f8;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  background: transparent;
}
.weui-btn {
  line-height: 50px;
}
.MinerRaiders {
  font-size: 0;
  background: #fff;
  padding: 50px 24px;
}
.MinerRaiders:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.MinerRaiders > span:nth-child(1) {
  font-size: 28px;
  color: #373d41;
}
.MinerRaiders > span:nth-child(2) {
  float: right;
  width: 14px;
  height: 28px;
  background: url("../../static/img/rukou-qiehuan.png") no-repeat;
  background-size: 100% 100%;
}
.MyReceivingCode {
  width: 100%;
  background: #fff;
  padding: 50px 0;
}
.MyReceivingCode:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.MyReceivingCode > div {
  font-size: 28px;
}
.MyReceivingCode > div:first-child {
  float: left;
  padding-left: 24px;
}
.MyReceivingCode > div:nth-child(2) {
  float: right;
  width: 14px;
  height: 28px;
  margin-right: 24px;
}
.MyReceivingCode > div:nth-child(2) > img {
  width: 100%;
  height: 100%;
}
</style>

