<template>
  <div class="BankCardAndBtcWalletMain">
      <div class="BankCardAndBtcWalletHeader">
       <div class="BankCardAndBtcWalletHeaderLeft">
         <div class="BankCardAndBtcWalletBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="BankCardAndBtcWalletHeaderText">BTC钱包</div>
     </div>
     <ul class="BankCardAndBtcWallet">
         <li>
             <div>银行卡</div>
             <div>
                 <img src="../../static/img/rukou-qiehuan.png" alt="">
             </div>
             <div :class="{AlreadyBinding:BankCardWhetherBinding!='',NoBinding:BankCardWhetherBinding==''}">{{WhetherBindingBankCard}}</div>
         </li>
         <li>
             <div>BTC钱包</div>
             <div>
                 <img src="../../static/img/rukou-qiehuan.png" alt="">
             </div>
             <div  :class="{AlreadyBinding:BtcWalletWhetherBinding!='',NoBinding:BtcWalletWhetherBinding==''}">{{WhetherBindingBtcWallet}}</div>
         </li>
     </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      WhetherBindingBankCard: "未绑定", //银行卡是否绑定
      WhetherBindingBtcWallet: "未绑定", //BTC是否绑定
      BankCardWhetherBinding: "123", //银行卡是否绑定状态
      BtcWalletWhetherBinding: "" //BTC钱包是否绑定状态
    };
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
.BankCardAndBtcWalletMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.BankCardAndBtcWalletHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.BankCardAndBtcWalletHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.BankCardAndBtcWalletHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.BankCardAndBtcWalletBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.BankCardAndBtcWalletHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.BankCardAndBtcWallet {
  background: #fff;
  padding: 0 24px;
}
.BankCardAndBtcWallet > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.BankCardAndBtcWallet > li {
  padding: 50px 0;
  height: 28px;
  border-bottom: 1px solid #dfdfdf;
}
.BankCardAndBtcWallet > li:last-child {
  border-bottom: 0;
}
.BankCardAndBtcWallet > li > div {
  font-size: 28px;
  color: #373d41;
}
.BankCardAndBtcWallet > li > div:first-child {
  float: left;
}
.BankCardAndBtcWallet > li > div:last-child {
  float: right;
}
.BankCardAndBtcWallet > li > div:nth-child(2) {
  float: right;
  width: 14px;
  height: 28px;
  margin-left: 20px;
}
.BankCardAndBtcWallet > li > div:nth-child(2) > img {
  width: 100%;
  height: 100%;
}
.AlreadyBinding {
  color: #ff721f !important;
}
.NoBinding {
  color: #949494 !important;
}
</style>


