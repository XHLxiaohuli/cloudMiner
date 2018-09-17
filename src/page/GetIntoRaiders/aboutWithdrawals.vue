<template>
  <div class="aboutWithMain">
      <div class="aboutWithHeader">
        <div class="aboutWithHeaderLeft">
            <div class="aboutWithBackPic" @click="BackUpperStory"></div>
        </div>
        <div class="aboutWithHeaderText">关于提现</div>
       </div>
       <ul class="aboutWithUl">
           <li class="aboutWithLi">
               <div @click="aboutWithClick(1)">
                   <span>1.如何才能提现？</span><span v-show="aboutWithOne"></span><span v-show="!aboutWithOne"></span>
               </div>
               <div v-show="!aboutWithOne">请先绑定个人的BTC钱包作为提现的账户，提现的BTC将打到您的BTC钱包中。</div>
           </li>
           <li class="aboutWithLi">
               <div @click="aboutWithClick(2)">
                   <span>2.提现需要手续费吗？</span><span v-show="aboutWithTow"></span><span v-show="!aboutWithTow"></span>
               </div>
               <div v-show="!aboutWithTow">基于比特币转账手续费日益增高，BTC收益用户账户余额满0.01BTC时可提币，提现手续费为0.001BTC（根据火币官网及各交易所）。</div>
           </li>
           <li class="aboutWithLi">
               <div @click="aboutWithClick(3)">
                   <span>3.提现后何时到账？</span><span v-show="aboutWithThree"></span><span v-show="!aboutWithThree"></span>
               </div>
               <div v-show="!aboutWithThree">申请提现后，T+1日12:00前放款到绑定的BTC钱包。</div>
           </li>
       </ul>
       <div class="aboutWithButtom" :style="'background:'+aboutWithButtomBg">
           <div></div>
           <p>客服微信</p>
       </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aboutWithOne: true,
      aboutWithTow: true,
      aboutWithThree: true,
      aboutWithOnenum: 0,
      aboutWithTownum: 0,
      aboutWithThreenum: 0,
      aboutWithButtomBg: "#f5f5f8"
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //文本收缩
    aboutWithClick(index) {
      if (index == 1) {
        if (this.aboutWithOnenum % 2 == 0) {
          this.aboutWithOne = false;
          this.aboutWithTow = true;
          this.aboutWithThree = true;
          this.aboutWithOnenum++;
          this.aboutWithTownum = 0;
          this.aboutWithThreenum = 0;
        } else {
          this.aboutWithOne = true;
          this.aboutWithTow = true;
          this.aboutWithThree = true;
          this.aboutWithOnenum++;
        }
      } else if (index == 2) {
        if (this.aboutWithTownum % 2 == 0) {
          this.aboutWithOne = true;
          this.aboutWithTow = false;
          this.aboutWithThree = true;
          this.aboutWithOnenum = 0;
          this.aboutWithTownum++;
          this.aboutWithThreenum = 0;
        } else {
          this.aboutWithOne = true;
          this.aboutWithTow = true;
          this.aboutWithThree = true;
          this.aboutWithTownum++;
        }
      } else if (index == 3) {
        if (this.aboutWithThreenum % 2 == 0) {
          this.aboutWithOne = true;
          this.aboutWithTow = true;
          this.aboutWithThree = false;
          this.aboutWithOnenum = 0;
          this.aboutWithTownum = 0;
          this.aboutWithThreenum++;
        } else {
          this.aboutWithOne = true;
          this.aboutWithTow = true;
          this.aboutWithThree = true;
          this.aboutWithThreenum++;
        }
      }
    }
  }
};
</script>
<style scoped>
.aboutWithMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.aboutWithHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 20px;
}
.aboutWithHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.aboutWithHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.aboutWithBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.aboutWithHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.aboutWithLi > div:nth-child(1):after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.aboutWithLi > div:nth-child(1) {
  padding: 50px 24px;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
  position: relative;
}
.aboutWithLi > div:nth-child(1) > span:nth-child(1) {
  float: left;
  font-size: 28px;
  color: #373d41;
}
.aboutWithLi > div:nth-child(1) > span:nth-child(2) {
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
.aboutWithLi > div:nth-child(1) > span:nth-child(3) {
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
.aboutWithLi > div:nth-child(2) {
  padding: 45px 24px;
  font-size: 26px;
  line-height: 45px;
  background: #f6f6f6;
  text-align: left;
  background: #f6f6f6;
}
.aboutWithButtom {
  padding: 100px 0;
  /* background: #f2f2f8; */
}
.aboutWithButtom > div {
  width: 240px;
  height: 240px;
  margin: auto;
  background: url("../../static/img/fuwuhao.png") no-repeat;
  background-size: 100% 100%;
}
.aboutWithButtom > p {
  text-align: center;
  font-size: 28px;
  color: #373d41;
  margin-top: 20px;
}
.aboutWithUl > li:last-child > div:nth-child(2) {
  border-bottom: 1px solid #dfdfdf;
}
</style>


