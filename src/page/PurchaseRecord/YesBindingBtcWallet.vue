<!--作者:var-->
<template>
    <div class="YesBindingBtcWalletMain">
     <div class="YesBindingBtcWalletHeader">
       <div class="YesBindingBtcWalletHeaderLeft">
         <div class="YesBindingBtcWalletBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="YesBindingBtcWalletHeaderText">BTC钱包</div>
     </div>
     <ul class="YesBindingBtcWalletUl">
         <li>
             <div>BTC钱包</div>
             <div>{{YesBindingBtcWalletAddress}}</div>
         </li>
         <li @click="jumpNoBindingBtcWallet">
             <div>更改绑定BTC钱包地址</div>
             <div>
                 <img src="../../static/img/rukou-qiehuan.png" alt="">
             </div>
         </li>
     </ul>
    </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
export default {
  data() {
    return {
      YesBindingBtcWalletAddress: "",
      myTime: ""
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      // this.$router.go(-1);
      this.$router.push("/Home/My");
    },
    //跳转到更改BTC钱包网页
    jumpNoBindingBtcWallet() {
      this.$router.push("/NoBindingBtcWallet/2");
    }
  },
  beforeMount() {
    this.YesBindingBtcWalletAddress = sessionStorage["btcAddress"];
  }
};
</script>
<style scoped>
.YesBindingBtcWalletMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.YesBindingBtcWalletHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.YesBindingBtcWalletHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.YesBindingBtcWalletHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.YesBindingBtcWalletBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.YesBindingBtcWalletHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.YesBindingBtcWalletUl {
  background: #fff;
  padding: 0 24px;
}
.YesBindingBtcWalletUl > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.YesBindingBtcWalletUl > li {
  padding: 50px 0;
  height: 28px;
  border-bottom: 1px solid #f2f2f2;
}
.YesBindingBtcWalletUl > li:last-child {
  border-bottom: 0;
}
.YesBindingBtcWalletUl > li > div {
  font-size: 28px;
  color: #373d41;
}
.YesBindingBtcWalletUl > li > div:first-child {
  float: left;
}
.YesBindingBtcWalletUl > li > div:last-child {
  float: right;
  color: #949494;
}
.YesBindingBtcWalletUl > li:last-child > div:first-child {
  color: #0287ff;
}
.YesBindingBtcWalletUl > li:last-child > div:last-child {
  width: 14px;
  height: 28px;
}
.YesBindingBtcWalletUl > li:last-child > div:last-child > img {
  width: 100%;
  height: 100%;
}
</style>


