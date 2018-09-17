<template>
  <div class="aboutInvitationMain">
      <div class="aboutInvitationHeader">
        <div class="aboutInvitationHeaderLeft">
            <div class="aboutInvitationBackPic" @click="BackUpperStory"></div>
        </div>
        <div class="aboutInvitationHeaderText">关于邀请</div>
       </div>
       <ul class="aboutInvitationUl">
           <li class="aboutInvitationLi">
               <div @click="aboutInvitationClick(1)">
                    <span>1.如何邀请好友？</span><span v-show="aboutInvitationOne"></span><span v-show="!aboutInvitationOne"></span>
               </div>
               <div v-show="!aboutInvitationOne">您可以在“我的”——“邀请好友”中查看邀请码，复制邀请链接发送给想要邀请的好友，他们填了您的邀请码之后，变成为您邀请的用户了。</div>
           </li>
           <li class="aboutInvitationLi">
               <div @click="aboutInvitationClick(2)">
                    <span>2.用自己发的激活码算邀请吗？</span><span v-show="aboutInvitationTow"></span><span v-show="!aboutInvitationTow"></span>
               </div>
               <div v-show="!aboutInvitationTow">激活码用于替代购买算力所需的金额，不是填了自己邀请码注册的用户，填了自己发送的激活码不算邀请人数。</div>
           </li>
       </ul>
       <div class="aboutInvitationButtom" :style="'background'+aboutInvitationButtomBg">
           <div></div>
           <p>客服微信</p>
       </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aboutInvitationOne: true,
      aboutInvitationTow: true,
      aboutInvitationOnenum: 0,
      aboutInvitationTownum: 0,
      aboutInvitationButtomBg: 0
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //文本收缩
    aboutInvitationClick(index) {
      if (index == 1) {
        if (this.aboutInvitationOnenum % 2 == 0) {
          this.aboutInvitationOne = false;
          this.aboutInvitationTow = true;
          this.aboutInvitationOnenum++;
          this.aboutInvitationTownum = 0;
        } else {
          this.aboutInvitationOne = true;
          this.aboutInvitationTow = true;
          this.aboutInvitationOnenum++;
        }
      } else if (index == 2) {
        if (this.aboutInvitationTownum % 2 == 0) {
          this.aboutInvitationOne = true;
          this.aboutInvitationTow = false;
          this.aboutInvitationOnenum = 0;
          this.aboutInvitationTownum++;
        } else {
          this.aboutInvitationOne = true;
          this.aboutInvitationTow = true;
          this.aboutInvitationTownum++;
        }
      }
    }
  }
};
</script>
<style scoped>
.aboutInvitationMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.aboutInvitationHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 20px;
}
.aboutInvitationHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.aboutInvitationHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.aboutInvitationBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.aboutInvitationHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.aboutInvitationLi > div:nth-child(1):after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.aboutInvitationLi > div:nth-child(1) {
  padding: 50px 24px;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
  position: relative;
}
.aboutInvitationLi > div:nth-child(1) > span:nth-child(1) {
  float: left;
  font-size: 28px;
  color: #373d41;
}
.aboutInvitationLi > div:nth-child(1) > span:nth-child(2) {
  float: right;
  width: 14px;
  height: 28px;
  background: url("../../static/img/back.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  bottom: 0;
  right: 24px;
  margin: auto;
}
.aboutInvitationLi > div:nth-child(1) > span:nth-child(3) {
  float: right;
  width: 30px;
  height: 18px;
  background: url("../../static/img/drop-down.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  bottom: 0;
  right: 24px;
  margin: auto;
}
.aboutInvitationLi > div:nth-child(2) {
  padding: 45px 24px;
  font-size: 26px;
  line-height: 45px;
  background: #f6f6f6;
  text-align: left;
  background: #f6f6f6;
}
.aboutInvitationButtom {
  padding: 100px 0;
  /* background: #f2f2f8; */
}
.aboutInvitationButtom > div {
  width: 240px;
  height: 240px;
  margin: auto;
  background: url("../../static/img/fuwuhao.png") no-repeat;
  background-size: 100% 100%;
}
.aboutInvitationButtom > p {
  text-align: center;
  font-size: 28px;
  color: #373d41;
  margin-top: 20px;
}
.aboutInvitationUl > li:last-child > div:nth-child(2) {
  border-bottom: 1px solid #dfdfdf;
}
</style>


