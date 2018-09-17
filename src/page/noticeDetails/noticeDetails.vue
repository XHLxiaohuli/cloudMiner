<template>
  <div class="noticeDetailsMain">
      <div class="noticeDetailsHeader">
       <div class="noticeDetailsHeaderLeft">
         <div class="noticeDetailsBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="noticeDetailsHeaderText">公告详情</div>
      </div>
      <div class="noticeDetailsBody">
          <h1>关于新系统升级福利活动公告</h1>
          <p>
              云矿工平台已完成新系统的升级，本次升级新用户享有大豪礼，注册就赠送价值120元的初级白银矿工，无需再激活开通。“邀请制挖矿活动”详细规则请看平台攻略，免费名额限50000名，送完即止，活动期间禁止恶意刷票，一经发现，封号处理。
          </p>
          <p>同时，此次升级还开通了线上支付功能，您可以随时在线购买或升级算力，获取更高的挖矿收益。</p>
          <p>感谢您一路以来对云矿工平台的支持！</p>
          <p>云矿工运营团队</p>
          <p>2018年4月16日19:07:00</p>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.noticeDetailsMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.noticeDetailsHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.noticeDetailssHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.noticeDetailsHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.noticeDetailsBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.noticeDetailsHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.noticeDetailsBody {
  background: #fff;
  padding: 50px 0;
}
.noticeDetailsBody > h1 {
  font-size: 28px;
  font-weight: bolder;
  color: #373d41;
  text-align: center;
}
.noticeDetailsBody > p:nth-child(2) {
  font-size: 26px;
  color: #373d41;
  padding: 0 24px;
  text-align: left;
  padding-top: 30px;
  line-height: 45px;
  text-indent: 2em;
}
.noticeDetailsBody > p:nth-child(3) {
  font-size: 26px;
  color: #373d41;
  padding: 0 24px;
  text-align: left;
  line-height: 45px;
  text-indent: 2em;
}
.noticeDetailsBody > p:nth-child(4) {
  font-size: 26px;
  color: #373d41;
  padding: 0 24px;
  text-align: left;
  line-height: 45px;
  text-indent: 2em;
}
.noticeDetailsBody > p:nth-child(5) {
  padding-top: 75px;
}
.noticeDetailsBody > p:last-child {
  padding-top: 20px;
}
.noticeDetailsBody > p:nth-child(5),
.noticeDetailsBody > p:last-child {
  text-align: right;
  color: #949494;
  font-size: 24px;
  padding-right: 24px;
}
</style>
