<template>
  <div class="CopyInvitationCodeMain">
      <div class="CopyInvitationCodeHeader">
       <div class="CopyInvitationCodeHeaderLeft">
         <div class="CopyInvitationCodeBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="CopyInvitationCodeHeaderText">邀请好友</div>
      </div>
      <div class="UserInvitationCodeTop">
        <div>
          <p>{{InvitingFriends}}</p>
          <p>共邀请好友</p>
        </div>
        <div>
          <p>{{BuyAFriend}}</p>
          <p>已购买好友</p>
        </div>
      </div>
      <div class="UserInvitationCodeDiv">
          <span>邀请码</span>
          <span id='getcode'>{{UserInvitationCodeValue}}</span>
          <input type="text" id="fooTow" :value="UserInvitationCodeInputValue" disalbed>
          <hr>
      </div>
      <!-- <button class="copyInvitationLink" @click='copyWx'  data-clipboard-action="cut" data-clipboard-target="#fooTow">复制邀请链接</button> -->
      <div class="copyBtnContainer">
        <x-button class="copyInvitationLink" @click.native="showPosition('middle')" type="primary" data-clipboard-action="cut" data-clipboard-target="#fooTow">复制邀请链接</x-button>
        <div class="copyInvitationRecord" @click="jumpCopyRecord">邀请记录</div> 
      </div>
      <div class="copyBottom">
        <p>邀请流程</p>
        <ul>
          <li><span>01</span></li>
          <li><span>02</span></li>
          <li><span>03</span></li>
          <li><span>04</span></li>
        </ul>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul>
          <li>加入云矿工</li>
          <li>好友注册</li>
          <li>邀请好友</li>
          <li>共享挖矿</li>
        </ul>
      </div>
      <div class="copyFill"></div>
      <toast width="13em" v-model="showPositionValue" type="text" :time="2000" is-show-mask :text="CopyerrorPrompt" :position="position">{{('Basic Usage') }}</toast>
  </div>
</template>
<script>
import { Toast, XButton } from "vux";
import { fail } from "assert";
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import Clipboard from "clipboard";
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
      CopyerrorPrompt: "",

      UserInvitationCodeValue: "",
      UserInvitationCodeInputValue: "",
      InvitingFriends: "",
      BuyAFriend: 0,
      myTime: ""
    };
  },
  methods: {
    //复制出现弹框
    showPosition(position) {
      var clipboard = new Clipboard(".copyInvitationLink");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
        this.position = position;
        this.showPositionValue = true;
        this.CopyerrorPrompt = "复制成功";
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.position = position;
        this.showPositionValue = true;
        this.CopyerrorPrompt = "复制成功";
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcode").innerHTML;
    },
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //跳到BTC提现页面
    jumpBtcWithdrawals() {
      this.$router.push("/BtcWithdrawals");
    },
    //邀请人数和加入人数
    PostAllUserInformationFunction() {
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myUserId = localStorage.getItem("userID");
      var myArr = ["requestId=" + myRequestId, "userId=" + myUserId];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/user/invite/myInviteFriend.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "MyInvitingFriend",
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
          if (data.data.inviteFriendNumber == "") {
            this.InvitingFriends = 0;
          }
          if (data.data.inviteFriendNumber == 0) {
            this.InvitingFriends = 0;
          } else {
            this.InvitingFriends = data.data.inviteFriendNumber;
          }
          if (data.data.buyFriendNumber == "") {
            this.BuyAFriend = 0;
          }
          if (data.data.buyFriendNumber == 0) {
            this.BuyAFriend = 0;
          } else {
            this.BuyAFriend = data.data.buyFriendNumber;
          }
          this.UserInvitationCodeValue = data.data.invitationCode;
          this.UserInvitationCodeInputValue =
            window.location.origin +
            "/RegisTer/" +
            this.UserInvitationCodeValue;
        })
        .catch(err => {
          console.log(err);
        });
    },
    jumpCopyRecord() {
      this.$router.push("/copyInvitationRecord");
    }
  },
  beforeMount() {
    this.PostAllUserInformationFunction();
  }
};
</script>
<style scoped>
.CopyInvitationCodeMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.CopyInvitationCodeHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #f2f2f2;
}
.CopyInvitationCodesHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.CopyInvitationCodeHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.CopyInvitationCodeBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.CopyInvitationCodeHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.UserInvitationCodeDiv {
  background: #fff;
  width: 100%;
  /* padding-bottom: 50px; */
  position: relative;
  /* border-bottom: 1px solid #dfdfdf; */
}
.UserInvitationCodeDiv > hr {
  width: 702px;
  margin: 0;
  margin: auto;
  border: 0;
  border-bottom: 1px solid #f2f2f2;
  margin-top: 50px;
}
.UserInvitationCodeDiv:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.UserInvitationCodeDiv > span:first-child {
  font-size: 28px;
  color: #373d41;
  padding-left: 24px;
}
.UserInvitationCodeDiv > span:nth-child(2) {
  float: right;
  text-align: right;
  font-size: 28px;
  color: #373d41;
  background: #fff;
  padding-right: 24px;
}
#fooTow {
  /* opacity: 0; */
  width: 30px;
  height: 20px;
  position: absolute;
  right: 24px;
  z-index: -100;
}
.copyInvitationLink {
  width: 600px;
  height: 88px;
  background: #0287ff;
  border: 0;
  font-size: 28px;
  color: #fff;
  margin: auto;
  /* margin-top: 50px; */
}
.copyInvitationLink:focus {
  outline: 0;
}
.UserInvitationCodeTop {
  padding: 50px 24px;
  background: #fff;
}
.UserInvitationCodeTop:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.UserInvitationCodeTop > div {
  float: left;
  width: 339px;
  text-align: center;
  padding: 50px 0;
  box-shadow: rgba(000, 000, 000, 0.1) 0px 1px 4px 0px;
}
.UserInvitationCodeTop > div > p:nth-child(1) {
  font-size: 60px;
  padding-bottom: 50px;
  font-weight: bolder;
  color: #373d41;
}
.UserInvitationCodeTop > div > p:nth-child(2) {
  font-size: 28px;
  color: #373d41;
}
.UserInvitationCodeTop > div:nth-child(2) > p {
  color: #0287ff;
}
.UserInvitationCodeTop > div:nth-child(2) {
  margin-left: 24px;
}
/**vuex按钮把按钮默认边框宽度改为0**/
.weui-btn:after {
  border: 0;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  background: #fff;
  color: #373d41;
}
.copyBtnContainer {
  background: #fff;
  padding: 50px 0;
  /* border-bottom:1px solid #dfdfdf; */
}
.copyInvitationRecord {
  width: 600px;
  height: 88px;
  margin: auto;
  border: 1px solid #949494;
  font-size: 28px;
  color: #373d41;
  text-align: center;
  line-height: 88px;
  margin-top: 50px;
  box-sizing: border-box;
  border-radius: 6px;
}
.copyBottom {
  background: #fff;
  padding: 50px 0;
  margin-top: 20px;
  /* border-bottom: 1px solid #dfdfdf; */
}
.copyBottom > p:nth-child(1) {
  font-size: 28px;
  color: #373d41;
  padding-bottom: 50px;
  padding-left: 24px;
}
.copyBottom > ul:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.copyBottom > ul > li {
  width: 25%;
  float: left;
}
.copyBottom > ul:nth-child(2) > li > span {
  font-size: 26px;
  color: #dfdfdf;
  padding-left: 18px;
}
.copyBottom > ul:nth-child(2) > li:nth-child(1) > span {
  padding-left: 25px;
}
.copyBottom > div:nth-child(3):after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.copyBottom > div:nth-child(3) > div {
  float: left;
}
.copyBottom > div:nth-child(3) > div:nth-child(1) {
  margin-left: 46px;
}
.copyBottom > div:nth-child(3) > div:nth-child(odd) {
  width: 96px;
  height: 96px;
}
.copyBottom > div:nth-child(3) > div:nth-child(even) {
  width: 92px;
  height: 0;
  border: 0;
  margin-top: 47.5px;
  border-bottom: 1px solid #f2f2f2;
}
.copyBottom > div:nth-child(3) > div:nth-child(1) {
  background: url("../../static/img/invite_images_flow_one@2x.png") no-repeat;
  background-size: 100% 100%;
}
.copyBottom > div:nth-child(3) > div:nth-child(3) {
  background: url("../../static/img/invite_images_flow_two@2x.png") no-repeat;
  background-size: 100% 100%;
}
.copyBottom > div:nth-child(3) > div:nth-child(5) {
  background: url("../../static/img/invite_images_flow_three@2x.png") no-repeat;
  background-size: 100% 100%;
}
.copyBottom > div:nth-child(3) > div:nth-child(7) {
  background: url("../../static/img/invite_images_flow_four@2x.png") no-repeat;
  background-size: 100% 100%;
}
.copyBottom > ul:nth-child(4) {
  margin-top: 30px;
}
.copyBottom > ul:nth-child(4) > li {
  text-align: center;
  font-size: 26px;
  color: #373d41;
}
.copyFill {
  width: 100%;
  height: 100px;
  background: #f5f5f8;
}
</style>


