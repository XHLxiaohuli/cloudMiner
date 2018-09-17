<!--作者:var-->
<template>
<div class="MinerGradeRuleMain">
    <div class="MinerGradeRuleHeader">
       <div class="MinerGradeRuleHeaderLeft">
         <div class="MinerGradeRuleBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="MinerGradeRuleHeaderText">矿工等级</div>
       <div @click="jumpAllMinerGradeRule">矿工等级规则</div>
    </div>
    <div>
        <router-view/>
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
      this.$router.push("/Home/My");
    },
    //跳转到所有矿工等级规则页面
    jumpAllMinerGradeRule() {
      this.$router.push("/AllMinerGradeRule");
    }
  },
  beforeMount() {
    var MinerGradeRule = this.$route.params.MinerGrade;
    if (MinerGradeRule == 1) {
      this.$router.push("/MinerGradeRule/MassMiners");
    } else if (MinerGradeRule == 2) {
      this.$router.push("/MinerGradeRule/SilverMiner");
    } else if (MinerGradeRule == 3) {
      this.$router.push("/MinerGradeRule/GoldenMiner");
    } else if (MinerGradeRule == 4) {
      this.$router.push("/MinerGradeRule/DiamondMiner");
    }
  }
};
</script>
<style scoped>
.MinerGradeRuleMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.MinerGradeRuleHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
}
.MinerGradeRuleHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.MinerGradeRuleHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.MinerGradeRuleBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.MinerGradeRuleHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.MinerGradeRuleHeader > div:last-child {
  float: right;
  line-height: 88px;
  font-size: 28px;
  color: #373d41;
  margin-right: 24px;
}
</style>

