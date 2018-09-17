<!--作者:var-->
<template>
  <div>
      <div class="RmbProfit">
          <p class="RmbYesterdayProfit">昨日收益(RMB)</p>
          <p class="RmbYesterdayProfitNum">{{RMBYesterdayProfitData}}</p>
          <ul class="RmbAllProfitTitle">
              <li v-for="item in RmbAllProfitText">{{item}}</li>
          </ul>
          <!--为了填充空间start-->
          <ul class="FillingSpace">
              <li></li>
              <li></li>
              <li></li>
          </ul>
          <!--为了填充空间end-->
          <ul class="RmbProfitTitleNum">
              <li>{{RmbCumulativeIncome}}</li>
              <li>{{RmbMyPowerOfCalculation}}</li>
              <li>{{RmbNumberOfInvitations}}</li>
          </ul>
          <div class="RmbPromoteTitel">回本进度：{{PercentageOfProgress}}，距离{{MinerGrade}}还差{{howMuchRmb}}元</div>
      </div>
      <ul class="RmbProfitList">
        <li class="RmbProfitListLi">
          <div class="RmbProfitListLiLeft">
            <p>一级代理</p>
            <p>{{RmbOneAgentPeople}}人</p>
          </div>
          <div class="RmbProfitListLiRight">
            <p>昨日收益</p>
            <p>{{RmbOneYesterdayProfit}}元</p>
          </div>
        </li>
        <li class="RmbProfitListLi">
          <div class="RmbProfitListLiLeft">
            <p>二级代理</p>
            <p>{{RmbTowAgentPeople}}人</p>
          </div>
          <div class="RmbProfitListLiRight">
            <p>昨日收益</p>
            <p>{{RmbTowYesterdayProfit}}元</p>
          </div>
        </li>
        <li class="RmbProfitListLi">
          <div class="RmbProfitListLiLeft">
            <p>三级代理</p>
            <p>{{RmbThreeAgentPeople}}人</p>
          </div>
          <div class="RmbProfitListLiRight">
            <p>昨日收益</p>
            <p>{{RmbThreeYesterdayProfit}}元</p>
          </div>
        </li>
      </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      RMBYesterdayProfitData: "15.37",
      RmbAllProfitText: ["累计收益(元)", "我的算力(T)", "邀请人数(人)"],
      RmbCumulativeIncome: "0.00",
      RmbMyPowerOfCalculation: "0.1",
      RmbNumberOfInvitations: "23",
      PercentageOfProgress: "99.99%",
      MinerGrade: "黄金矿工",
      howMuchRmb: "296.66",
      RmbOneAgentPeople: "3",
      RmbTowAgentPeople: "12",
      RmbThreeAgentPeople: "8",
      RmbOneYesterdayProfit: "0.00012000",
      RmbTowYesterdayProfit: "0.00033000",
      RmbThreeYesterdayProfit: "0.00044000"
    };
  }
};
</script>
<style scoped>
.RmbProfit {
  width: 100%;
  padding-top: 50px;
  background: #0287ff;
}
.RmbYesterdayProfit {
  text-align: center;
  font-size: 26px;
  color: #fff;
  opacity: 0.6;
  padding-bottom: 30px;
}
.RmbYesterdayProfitNum {
  text-align: center;
  font-size: 46px;
  color: #fff;
  padding-bottom: 77px;
  font-weight: bold;
}
.RmbAllProfitTitle:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.RmbAllProfitTitle > li {
  list-style: none;
  width: 250px;
  float: left;
  color: #fff;
  opacity: 0.6;
  font-size: 24px;
  text-align: center;
}
.FillingSpace:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.FillingSpace > li {
  height: 40px;
  width: 250px;
  float: left;
}
.FillingSpace > li:nth-child(2) {
  box-sizing: border-box;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  opacity: 0.6;
}
.RmbProfitTitleNum:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.RmbProfitTitleNum > li {
  width: 250px;
  text-align: center;
  font-size: 32px;
  color: #fff;
  float: left;
}
.RmbProfitTitleNum {
  padding-bottom: 50px;
}
.RmbPromoteTitel {
  height: 100px;
  font-size: 24px;
  padding-left: 24px;
  line-height: 100px;
  color: #fff;
  background: rgba(1, 69, 128, 0.1);
}

.RmbProfitList {
  width: 703px;
  margin: auto;
}
.RmbProfitList > li {
  margin-top: 20px;
  padding: 50px 0;
  background: #fff;
}
.RmbProfitListLi:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.RmbProfitListLi > div {
  float: left;
}
.RmbProfitListLiLeft {
  width: 211px;
  box-sizing: border-box;
  border-right: 1px solid #dfdfdf;
}
.RmbProfitListLiRight {
  width: 492px;
}
.RmbProfitListLiLeft > p:nth-child(1) {
  text-align: center;
  color: #949494;
  font-size: 28px;
  margin-bottom: 30px;
}
.RmbProfitListLiLeft > p:nth-child(2) {
  text-align: center;
  color: #373d41;
  font-size: 28px;
  font-weight: bolder;
}
.RmbProfitListLiRight > p:nth-child(1) {
  text-align: center;
  color: #949494;
  font-size: 28px;
  margin-bottom: 30px;
}
.RmbProfitListLiRight > p:nth-child(2) {
  text-align: center;
  color: #373d41;
  font-size: 28px;
  font-weight: bolder;
}
</style>


