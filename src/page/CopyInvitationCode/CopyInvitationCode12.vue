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
      </div>
      <!-- <button class="copyInvitationLink" @click='copyWx'  data-clipboard-action="cut" data-clipboard-target="#fooTow">复制邀请链接</button> -->
      <x-button class="copyInvitationLink" @click.native="showPosition('middle')" type="primary" data-clipboard-action="cut" data-clipboard-target="#fooTow">复制邀请链接</x-button> 
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
export default {
  components: {
    Toast,
    XButton
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
        this.CopyerrorPrompt = "浏览器不支持复制";
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcode").innerHTML;
    },
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //旧的复制功能
    // copyWx() {
    //   var clipboard = new Clipboard(".copyInvitationLink");
    //   clipboard.on("success", e => {
    //     // 释放内存
    //     clipboard.destroy();
    //     alert("复制成功");
    //   });
    //   clipboard.on("error", e => {
    //     // 不支持复制
    //     alert("复制成功");
    //     // 释放内存
    //     clipboard.destroy();
    //   });
    //   var getcodes = document.getElementById("getcode").innerHTML;
    // },
    //跳到BTC提现页面
    jumpBtcWithdrawals() {
      this.$router.push("/BtcWithdrawals");
    },
    //是否登录状态
    PostAllUserInformationFunction() {
      this.myTime = Math.round(new Date().getTime() / 1000).toString();
      axios
        .post(
          "PostAllUserInformation",
          qs.stringify({
            time: this.myTime,
            token: md5(md5(md5(this.myTime) + "yun") + "yunkuang123")
          })
        )
        .then(data => {
          if (data.data.count == null) {
            this.InvitingFriends = 0;
          } else {
            this.InvitingFriends = data.data.count;
          }
          if (data.data.count_s == null) {
            this.BuyAFriend = 0;
          } else {
            this.BuyAFriend = data.data.count_s;
          }
          this.UserInvitationCodeValue = data.data.invite;
          this.UserInvitationCodeInputValue =
            "http://www.yunkuanggong.cn/RegisTer/" +
            this.UserInvitationCodeValue;
        })
        .catch(err => {
          console.log(err);
        });
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
  border-bottom: 1px solid #dfdfdf;
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
  padding-bottom: 50px;
  position: relative;
  border-bottom: 1px solid #dfdfdf;
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
  width: 100%;
  height: 88px;
  background: #fff;
  border: 0;
  font-size: 28px;
  color: #373d41;
  margin-top: 50px;
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
</style>


