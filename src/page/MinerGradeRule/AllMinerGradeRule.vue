<!--作者:var-->
<template>
  <div class="AllMinerGradeRuleMain">
      <div class="AllMinerGradeRuleHeader">
       <div class="AllMinerGradeRuleHeaderLeft">
         <div class="AllMinerGradeRuleBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="AllMinerGradeRuleHeaderText">矿工等级规则</div>
    </div>
    <div class="TopMassMinersContainer">
        <div @click="TopMassMinersClick(1)"><span>1.大众矿工</span><span v-show="TopMassMinersShow"></span><span v-show="!TopMassMinersShow"></span></div>
        <p v-show="!TopMassMinersShow">大众矿工收益来源为矿机云算力独享收益，不参与推荐邀请奖励，根据自己所持有算力获取稳定收益。即，即使推荐被推荐人加入白银、黄金、钻石矿工，也无法获取邀请收益。</p>
    </div>
    <div class="SilverAndGoldenAndDiamondContainer">
        <div @click="TopMassMinersClick(2)"><span>2.白银矿工、黄金矿工、钻石矿工</span><span v-show="SilverAndGoldenAndDiamondShow"></span><span v-show="!SilverAndGoldenAndDiamondShow"></span></div>
        <ul v-show="!SilverAndGoldenAndDiamondShow">
          <li v-for="item in RankRuleData">
            <div>{{item.MinerGrade}}</div>
            <div>{{item.HoldingPower}}</div>
          </li>
        </ul>
        <p v-show="!SilverAndGoldenAndDiamondShow">白银、黄金、钻石矿工为共享邀请挖矿收益，邀请参与挖矿的人数越多，收益越高。</p>
        <div v-show="!SilverAndGoldenAndDiamondShow">
          <p>升级方法：您可以直接加入高等级矿工，以享受更高的收益权限及邀请收益；</p>
          <p>也可以通过先加入某一等级，再一级一级往上升，两者升级方法所需的费用一致。</p>
          <p>例如：初级黄金矿工升级至高级黄金矿工，只需要补4.4-1.4=3T算力的差额；</p>
          <p>大众矿工所持算力不参与邀请玩法的算力累计，如：大众矿工10T在加入初级白银矿工时，需要补0.1T算力的差额。</p>
        </div>
    </div>
    <div class="AllMinerButtom" :style="'background:'+AllMinerButtomBg">
      <div></div>
      <p>客服微信</p>
    </div>
    <div class="AllContaunerFooter"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      RankRuleData:[
        {"MinerGrade":"矿工级别","HoldingPower":"持有算力"},
        {"MinerGrade":"大众矿工","HoldingPower":"按购买量"},
        {"MinerGrade":"初级白银","HoldingPower":"0.1T"},
        {"MinerGrade":"中级白银","HoldingPower":"0.2T"},
        {"MinerGrade":"高级白银","HoldingPower":"0.4T"},
        {"MinerGrade":"初级黄金","HoldingPower":"1.4T"},
        {"MinerGrade":"中级黄金","HoldingPower":"2.4T"},
        {"MinerGrade":"高级黄金","HoldingPower":"4.4T"},
        {"MinerGrade":"初级钻石","HoldingPower":"14.4T"},
        {"MinerGrade":"中级钻石","HoldingPower":"24.4T"},
        {"MinerGrade":"高级钻石","HoldingPower":"44.4T"},
      ],
      TopMassMinersShow:true,
      SilverAndGoldenAndDiamondShow:true,
      TopMassMinersnum:0,
      SilverAndGoldenAndDiamondbnum:0,
      AllMinerButtomBg:"#f5f5f8",
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //收缩文本
    TopMassMinersClick(index){
      if(index==1){
        if(this.TopMassMinersnum%2==0){
          this.TopMassMinersShow=false;
          this.SilverAndGoldenAndDiamondShow=true
          this.SilverAndGoldenAndDiamondbnum=0;
          this.TopMassMinersnum++
        }else{
          this.TopMassMinersShow=true;
          this.TopMassMinersnum++
        }
      }else if(index==2){
        if(this.SilverAndGoldenAndDiamondbnum%2==0){
          this.SilverAndGoldenAndDiamondShow=false
          this.TopMassMinersShow=true;
          this.TopMassMinersnum=0
          this.SilverAndGoldenAndDiamondbnum++
        }else{
          this.SilverAndGoldenAndDiamondShow=true
          this.SilverAndGoldenAndDiamondbnum++
        }
      }
    }
  }
};
</script>
<style scoped>
.AllMinerGradeRuleMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.AllMinerGradeRuleHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
}
.AllMinerGradeRuleHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.AllMinerGradeRuleHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.AllMinerGradeRuleBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.AllMinerGradeRuleHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.TopMassMinersContainer,
.SilverAndGoldenAndDiamondContainer {
  width: 100%;
  margin-top: 20px;
  /* border-bottom: 1px solid #dfdfdf; */
}
.SilverAndGoldenAndDiamondContainer{
  margin-top: 0px;
  background: #f6f6f6;
}
.TopMassMinersContainer > div:nth-child(1),
.SilverAndGoldenAndDiamondContainer > div:nth-child(1) {
  font-size: 28px;
  color: #373d41;
  padding: 50px 24px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #f2f2f2;
}
.TopMassMinersContainer > div:nth-child(1):after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverAndGoldenAndDiamondContainer > div:nth-child(1):after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverAndGoldenAndDiamondContainer > div:nth-child(1)>span:nth-child(1),
.TopMassMinersContainer > div:nth-child(1)>span:nth-child(1){
  float: left;
}
.SilverAndGoldenAndDiamondContainer > div:nth-child(1)>span:nth-child(2),
.TopMassMinersContainer > div:nth-child(1)>span:nth-child(2){
  float: right;
    width: 14px;
    height: 28px;
    background: url('../../static/img/back.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0px;
    bottom: 0;
    right: 24px;
    margin: auto;
}
.SilverAndGoldenAndDiamondContainer > div:nth-child(1)>span:nth-child(3),
.TopMassMinersContainer > div:nth-child(1)>span:nth-child(3){
  float: right;
    width: 30px;
    height: 18px;
    background: url('../../static/img/drop-down.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0px;
    bottom: 0;
    right: 24px;
    margin: auto;
}
.TopMassMinersContainer > p {
  padding: 34px 24px;
  font-size: 26px;
  color: #373d41;
  line-height: 46px;
  background: #f6f6f6;
}
.AllContaunerFooter {
  width: 100%;
  height: 100px;
  background: #f5f5f8;
}
.SilverAndGoldenAndDiamondContainer>ul{
  width: 702px;
  margin: auto;
  margin-top: 34px;
  border:1px solid #eaeaea;
}
.SilverAndGoldenAndDiamondContainer>ul>li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverAndGoldenAndDiamondContainer>ul>li:first-child>div{
  font-weight:bolder; 
}
.SilverAndGoldenAndDiamondContainer>ul>li{
  border-bottom: 0;
  box-sizing: border-box;
  background: #fff;
}
.SilverAndGoldenAndDiamondContainer>ul>li:nth-child(2),.SilverAndGoldenAndDiamondContainer>ul>li:nth-child(5),.SilverAndGoldenAndDiamondContainer>ul>li:nth-child(8){
  border-bottom: 1px solid #f2f2f2;
}
.SilverAndGoldenAndDiamondContainer>ul>li>div{
  float: left;
  width: 50%;
  padding: 30px 0;
  font-size: 26px;
  text-align: center;
}
.SilverAndGoldenAndDiamondContainer>ul>li:nth-child(1)>div{
  padding: 50px 0;
  background: #f2f2f8;
}
.SilverAndGoldenAndDiamondContainer>p:nth-child(3){
  padding: 0 24px;
  padding-top: 30px;
  padding-bottom: 25px;
  font-size: 26px;
  line-height: 46px;
  background: #f6f6f6;
}
.SilverAndGoldenAndDiamondContainer>div:nth-child(4){
  padding:0 24px;
  padding-bottom: 50px;
  background: #f6f6f6;
}
.SilverAndGoldenAndDiamondContainer>div:nth-child(4)>p{
  font-size: 26px;
  line-height: 46px;
  padding-bottom: 25px;
}
.AllMinerButtom{
  /* background: #f2f2f8; */
  padding: 100px 0;
}
.AllMinerButtom>div{
  width: 240px;
  height: 240px;
  margin: auto;
  background: url('../../static/img/fuwuhao.png') no-repeat;
  background-size: 100% 100%;
}
.AllMinerButtom>p{
  text-align: center;
  font-size: 28px;
  color:#373d41;
  margin-top: 20px;
}
.SilverAndGoldenAndDiamondContainer>div:nth-child(4){
  border-bottom: 1px solid #dfdfdf;
}
</style>


