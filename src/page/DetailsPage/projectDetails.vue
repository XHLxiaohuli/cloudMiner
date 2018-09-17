
<template>
  <div class="projectDetailsMain">
    <div class="OneProjectDetails">
      <h1><span>云算力租赁</span></h1>
      <div class="OneProjectDetailsPic">
        <img src="../../static/img/KuangJi.jpg" alt="">
      </div>
      <p v-for="item in OneProjectDetailsArr">{{item}}</p>
    </div>
    <div class="TowProjectDetails">
      <h1><span>收益计算公式</span></h1>
      <p v-for="item in TowProjectDetailsArr">{{item}}</p>
    </div>
    <div class="projectDetailsFail"></div>
    <div class="ThreeProjectDetails">
      <h1><span>项目优势</span></h1>
      <p v-for="item in ThreeProjectDetailsArr">{{item}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      OneProjectDetailsArr: "",
      TowProjectDetailsArr: "",
      ThreeProjectDetailsArr: ""
    };
  },
  methods: {},
  beforeMount() {
    this.OneProjectDetailsArr = [
      "合作厂商：BITMAIN、EBANG Communication",
      "合作矿池：BTC.com",
      "功耗：145W/TH/s",
      "合约单位： 0.1 TH/s 标准算力",
      "合约起算日：即时生效"
    ];
    var SubrouteName = this.$route.params.SubrouteNum;
    if (SubrouteName == 1) {
      this.TowProjectDetailsArr = [
        "收益=云算力收入-成本，收益来源为云算力产生的收益。",
        "成本：电费0.5元/度，维护费=（算力收益-电费）*0.2。",
        "*预计收益参照计算器的收益，您的收益以实际收益为准。"
      ];
      this.ThreeProjectDetailsArr = [
        "低投入成本：0.1T起投，低投入高回报。",
        "稳定收益：专人维护，持续运行，收益无忧。",
        "信任可靠：真实矿机，真实收益，每日准时收益。"
      ];
    } else if (SubrouteName == 2) {
      this.TowProjectDetailsArr = [
        "收益=云算力收入+邀请收益-成本，收益来源为云算力产生的收益和推荐被推荐人产生的收益。",
        "成本：电费0.5元/度，白银矿工等级费=云算力收入80%，维护费=（算力收益-电费）*0.2。",
        "白银矿工邀请收益：邀请用户成为白银矿工，永久享有被邀请人46.4%的云算力收益。",
        "即A推荐B，享有B 46.4%的云算力收益，C 20.8%的云算力收益，D 12.8%的云算力收益。",
        "*推荐人和被推荐人都需自身拥有算力，推荐人不能拿到被推荐人高于自己算力等级的收益。",
        "*被邀请人自身收益不受邀请人影响。",
        "*预计收益参照计算器的收益，您的收益以实际收益为准。"
      ];
      this.ThreeProjectDetailsArr = [
        "低投入成本：0.1T起投，低投入高回报",
        "稳定收益：专人维护，持续运行，收益无忧",
        "信任可靠：真实矿机，真实收益，每日准时收益"
      ];
    } else if (SubrouteName == 3) {
      this.TowProjectDetailsArr = [
        "收益=云算力收入+邀请收益-成本，收益来源为云算力产生的收益和推荐被推荐人产生的收益。",
        "成本：电费0.5元/度，黄金矿工等级费=云算力收入80%，维护费=（算力收益-电费）*0.2。",
        "黄金矿工邀请收益：邀请用户成为白银或黄金矿工，永久享有被邀请人46.4%的云算力收益。",
        "即A推荐B，享有B 46.4%的云算力收益，C 20.8%的云算力收益，D 12.8%的云算力收益。",
        "*推荐人和被推荐人都需自身拥有算力，推荐人不能拿到被推荐人高于自己算力等级的收益。",
        "*被邀请人自身收益不受邀请人影响。",
        "*预计收益参照计算器的收益，您的收益以实际收益为准。"
      ];
      this.ThreeProjectDetailsArr = [
        "低投入成本：1.4T起投，低投入高回报",
        "稳定收益：专人维护，持续运行，收益无忧",
        "信任可靠：真实矿机，真实收益，每日准时收益"
      ];
    } else if (SubrouteName == 4) {
      this.TowProjectDetailsArr = [
        "收益=云算力收入+邀请收益-成本，收益来源为云算力产生的收益和推荐被推荐人产生的收益。",
        "成本：电费0.5元/度，钻石矿工等级费=云算力收入80%，维护费=（算力收益-电费）*0.2。",
        "钻石矿工邀请收益：邀请用户成为白银、黄金、钻石矿工，永久享有被邀请人46.4%的云算力收益。",
        "即A推荐B，享有B 46.4%的云算力收益，C 20.8%的云算力收益，D 12.8%的云算力收益。",
        "*推荐人和被推荐人都需自身拥有算力，推荐人不能拿到被推荐人高于自己算力等级的收益。",
        "*被邀请人自身收益不受邀请人影响。",
        "*预计收益参照计算器的收益，您的收益以实际收益为准。"
      ];
      this.ThreeProjectDetailsArr = [
        "低投入成本：14.4T起投，低投入高回报",
        "稳定收益：专人维护，持续运行，收益无忧",
        "信任可靠：真实矿机，真实收益，每日准时收益"
      ];
    }
  }
};
</script>
<style scoped>
.projectDetailsFail {
  width: 100%;
  height: 20px;
  background: #f5f5f8;
}
.OneProjectDetails {
  background: #fff;
  padding: 50px 24px;
  /* border-bottom: 1px solid #dfdfdf; */
}
.OneProjectDetails > h1,
.TowProjectDetails > h1,
.ThreeProjectDetails > h1 {
  /* display: inline-block;
  width: 8px;
  height: 28px;
  margin-right: 10px;
  background: #0287ff;
  border: 0;
  position: relative;
  top: 3px; */
  font-size: 0;
  border-left: 8px solid #0287ff;
  padding-left: 10px;
}
.OneProjectDetails > h1 > span,
.TowProjectDetails > h1 > span,
.ThreeProjectDetails > h1 > span {
  font-size: 26px;
}
.OneProjectDetailsPic {
  width: 100%;
  height: 400px;
  margin-top: 50px;
}
.OneProjectDetailsPic > img {
  width: 100%;
  height: 100%;
}
.OneProjectDetails > p {
  font-size: 26px;
  color: #373d41;
  margin-top: 30px;
}
.TowProjectDetails {
  padding: 50px 24px;
  margin-top: 20px;
  background: #fff;
  /* border-bottom: 1px solid #dfdfdf; */
}
.TowProjectDetails > h1,
.ThreeProjectDetails > h1 {
  margin-bottom: 50px;
}
.TowProjectDetails > p {
  line-height: 46px;
}
.TowProjectDetails > p,
.ThreeProjectDetails > p {
  font-size: 26px;
  color: #373d41;
  margin-bottom: 30px;
}
.TowProjectDetails > p:last-child,
.ThreeProjectDetails > p:last-child {
  margin-bottom: 0;
}
.ThreeProjectDetails {
  padding: 50px 24px;
  background: #fff;
}
.DetailsPageHeaderTitleBetweens {
  width: 100%;
  height: 20px;
  background: #f5f5f8;
  position: fixed;
  top: 205px;
  z-index: 100;
}
.projectDetailsMain {
  margin-top: 231px;
  /* border-bottom: 1px solid #dfdfdf; */
}
</style>



