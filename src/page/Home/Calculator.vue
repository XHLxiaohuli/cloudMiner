<template>
  <div>
    <div class="CalculatorNav">
      <ul class="CalculatorNavUl">
        <li @click="CalculatorNavTextClick(index)" v-for="(iten,index) in CalculatorNavText" :class="{YesCalculatorNavLi:index==CalculatorNavTextIndex}">{{iten}}</li>
      </ul>
    </div>
    <p class="IncomeCalculatorTitle">收益计算器</p>
    <div>
      <router-view/>
    </div>
    <div class="CalculatorFooter"></div>
    <!-- <div class="LoadMask">
      <div class="OnLoadMask">
        <div>
          <Loading></Loading>
        </div>
        <p>努力加载中...</p>
      </div>
    </div> -->
  </div>
</template>
<script>
import Loading from "../LoadIcon/LoadIcon";
export default {
  components: {
    Loading
  },
  data() {
    return {
      CalculatorNavText: ["大众矿工", "白银矿工", "黄金矿工", "钻石矿工"],
      CalculatorNavTextIndex: 0
    };
  },
  methods: {
    //点击计算器导航栏添加样式，跳转到不同路由页面
    CalculatorNavTextClick(index) {
      this.CalculatorNavTextIndex = index;
      if (index == 0) {
        this.$router.push("/Home/Calculator/VolkswagenCalculator");
      } else if (index == 1) {
        this.$router.push("/Home/Calculator/SilverCalculator");
      } else if (index == 2) {
        this.$router.push("/Home/Calculator/GoldCalculator");
      } else if (index == 3) {
        this.$router.push("/Home/Calculator/DiamondCalculator");
      }
    },
    whichGradeCalculator() {
      //判断当前计算器处于哪个等级上面
      if (window.location.pathname == "/Home/Calculator/VolkswagenCalculator") {
        this.CalculatorNavTextIndex = 0;
      } else if (
        window.location.pathname == "/Home/Calculator/SilverCalculator"
      ) {
        this.CalculatorNavTextIndex = 1;
      } else if (
        window.location.pathname == "/Home/Calculator/GoldCalculator"
      ) {
        this.CalculatorNavTextIndex = 2;
      } else if (
        window.location.pathname == "/Home/Calculator/DiamondCalculator"
      ) {
        this.CalculatorNavTextIndex = 3;
      }
    }
  },
  beforeUpdate() {
    this.whichGradeCalculator();
  },
  beforeMount() {
    this.whichGradeCalculator();
  }
};
</script>
<style scoped>
.CalculatorNav {
  width: 100%;
  height: 88px;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #dfdfdf;
}
.CalculatorNavUl {
  width: 100%;
  height: 100%;
}
.CalculatorNavUl:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.CalculatorNavUl > li {
  width: 25%;
  height: 100%;
  float: left;
  font-size: 28px;
  text-align: center;
  line-height: 88px;
  color: #373d41;
  border-bottom: 6px solid #fff;
  box-sizing: border-box;
}
.YesCalculatorNavLi {
  color: #0287ff !important;
  border-bottom: 6px solid #0287ff !important;
}
.IncomeCalculatorTitle {
  text-align: center;
  margin: auto;
  background: #fff;
  margin-top: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 132px;
  font-weight: bolder;
  border-bottom: 1px solid #f2f2f2;
}
.CalculatorFooter {
  background: #f5f5f8;
  width: 100%;
  height: 200px;
}
.LoadMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f8;
}
.OnLoadMask {
  font-size: 0;
  width: 200px;
  height: 80px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(000, 000, 000, 0.1);
  border-radius: 25px;
  padding: 10px 0;
}
.OnLoadMask > div:nth-child(1) {
  width: 100%;
  position: relative;
}
.OnLoadMask > p:nth-child(2) {
  text-align: center;
  font-size: 25px;
  color: #373d41;
  padding-top: 10px;
}
</style>

