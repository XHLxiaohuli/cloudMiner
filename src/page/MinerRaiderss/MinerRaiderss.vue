<template>
  <div class="MinerRaiderssMain">
      <div class="MinerRaiderssHeader">
       <div class="MinerRaiderssHeaderLeft">
         <div class="MinerRaiderssBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="MinerRaiderssHeaderText">云矿工攻略</div>
      </div>
      <ul class="MinerRaiderssBody">
          <li v-for="(item,index) in MinerRaiderssBodyData" @click="MinerRaiderssJump(index)">
              <span>{{item}}</span><span></span>
          </li>
      </ul>
      <div class="MinerWeChat" :style="'background:'+MinerWeChatBgColor">
        <div></div>
        <p>客服微信</p>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      MinerRaiderssBodyData: [
        "常见问题",
        "等级介绍",
        "关于收益",
        "关于提现",
        "关于邀请"
      ],
      MinerWeChatBgColor: "#f5f5f8"
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    MinerRaiderssJump(index) {
      if (index == 0) {
        this.$router.push("/commonProblem");
      } else if (index == 1) {
        this.$router.push("/AllMinerGradeRule");
      } else if (index == 2) {
        this.$router.push("/OnTheIncome");
      } else if (index == 3) {
        this.$router.push("/aboutWithdrawals");
      } else if (index == 4) {
        this.$router.push("/aboutInvitation");
      }
    }
  }
};
</script>
<style scoped>
.MinerRaiderssMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.MinerRaiderssHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.MinerRaiderssHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.MinerRaiderssHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.MinerRaiderssBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.MinerRaiderssHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.MinerRaiderssBody {
  background: #fff;
  padding: 0 24px;
}
.MinerRaiderssBody > li {
  font-size: 0;
  background: #fff;
  padding: 50px 0;
  border-bottom: 1px solid #f2f2f2;
}
.MinerRaiderssBody > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.MinerRaiderssBody > li > span:nth-child(1) {
  font-size: 28px;
  color: #373d41;
}
.MinerRaiderssBody > li:last-child {
  border-bottom: 0;
}
.MinerRaiderssBody > li > span:nth-child(2) {
  float: right;
  width: 14px;
  height: 28px;
  background: url("../../static/img/rukou-qiehuan.png") no-repeat;
  background-size: 100% 100%;
}
.MinerWeChat {
  padding: 100px 0;
  /* background: #f2f2f8; */
}
.MinerWeChat > div {
  width: 240px;
  height: 240px;
  margin: auto;
  background: url("../../static/img/fuwuhao.png") no-repeat;
  background-size: 100% 100%;
}
.MinerWeChat > p {
  text-align: center;
  font-size: 28px;
  color: #373d41;
  margin-top: 20px;
}
</style>
