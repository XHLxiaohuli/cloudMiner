<!--作者:var-->
<template>
  <div class="WithdrawalsMain">
      <div class="WithdrawalsHeader">
       <div class="WithdrawalsHeaderLeft">
         <div class="WithdrawalsBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="WithdrawalsHeaderText">账户提现</div>
     </div>
     <ul class="BtcWithdrawalsAndRmbWithdrawals">
         <li v-for="(item,index) in BtcWithdrawalsAndRmbWithdrawalsData" @click="jumpBtcWithdrawalsAndRmbWithdrawals(index)">
             <div>{{item}}</div>
             <div>
              <img src="../../static/img/rukou-qiehuan.png" alt="">
             </div>
         </li>
     </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      BtcWithdrawalsAndRmbWithdrawalsData: ["RMB提现", "BTC提现"]
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    jumpBtcWithdrawalsAndRmbWithdrawals(index) {
      if (index == 0) {
        this.$router.push("/RmbWithdrawals");
      } else if (index == 1) {
        this.$router.push("/BtcWithdrawals");
      }
    }
  }
};
</script>
<style scoped>
.WithdrawalsMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.WithdrawalsHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.WithdrawalsHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.WithdrawalsHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.WithdrawalsBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.WithdrawalsHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.BtcWithdrawalsAndRmbWithdrawals {
  background: #fff;
  padding: 0 24px;
}
.BtcWithdrawalsAndRmbWithdrawals > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.BtcWithdrawalsAndRmbWithdrawals > li {
  padding: 50px 0;
  height: 28px;
  border-bottom: 1px solid #dfdfdf;
}
.BtcWithdrawalsAndRmbWithdrawals > li:last-child {
  border-bottom: 0;
}
.BtcWithdrawalsAndRmbWithdrawals > li > div:last-child {
  float: right;
  width: 14px;
  height: 100%;
}
.BtcWithdrawalsAndRmbWithdrawals > li > div:first-child {
  float: left;
  font-size: 28px;
  color: #373d41;
}
.BtcWithdrawalsAndRmbWithdrawals > li > div:last-child > img {
  width: 100%;
  height: 100%;
}
</style>


