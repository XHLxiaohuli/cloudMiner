<template>
  <div class="IncomeRankingsMain">
     <div class="IncomeRankingsHeader">
       <div class="IncomeRankingsHeaderLeft">
         <div class="IncomeRankingsBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="IncomeRankingsHeaderText">收益排行榜 <span style="color:#fb0303;">TOP 50</span></div>
     </div>
     <ul class="IncomeRankingsTitle">
         <li v-for="(item,index) in IncomeRankingsTitleText">{{item}}<span v-if="index==2" @click="IncomeMunOrMoneyClick"></span></li>
     </ul>
      <scroller :on-infinite="infinite" ref="myscroller">
         <ul class="IndexProfitRankingBody">
          <li v-for="(item,index) in AddARecordLiData">
            <div>{{item.PlaceOfName}}</div>
            <div>{{item.minersName}}</div>
            <div v-if="IncomeMunOrMoney">{{item.totalBTC}}BTC</div>
            <div v-if="!IncomeMunOrMoney">{{item.totalRMB}}元</div>
            <div>
              <span v-if="item.userGrade==1">大众矿工</span>
              <span v-if="(item.userGrade==2)&&(item.userStep==1)">初级白银</span>
              <span v-if="(item.userGrade==2)&&(item.userStep==2)">中级白银</span>
              <span v-if="(item.userGrade==2)&&(item.userStep==3)">高级白银</span>
              <span v-if="(item.userGrade==3)&&(item.userStep==1)">初级黄金</span>
              <span v-if="(item.userGrade==3)&&(item.userStep==2)">中级黄金</span>
              <span v-if="(item.userGrade==3)&&(item.userStep==3)">高级黄金</span>
              <span v-if="(item.userGrade==4)&&(item.userStep==1)">初级钻石</span>
              <span v-if="(item.userGrade==4)&&(item.userStep==2)">中级钻石</span>
              <span v-if="(item.userGrade==4)&&(item.userStep==3)">高级钻石</span>
            </div>
            <!-- <div>{{item.mun}}</div> -->
            <hr class="inPresentRecordAllDataHr">
          </li>
        </ul>
        <!-- <p class="footDiv"></p>  -->
      </scroller>
      <div class="FooterIncome"></div>
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import Vue from "vue";
import md5 from "js-md5";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);
import myFunction from "@/page/encryption/encryption";
export default {
  components: {
    myFunction
  },
  data() {
    return {
      IncomeRankingsTitleText: ["排名", "云矿工", "累计收益", "矿工等级"],

      IncomeMunOrMoney: true,
      IncomeMunOrMoneyNum: 0,

      investmentPage: 1,
      AllInvestmentPage: "",
      AddARecordLiData: "",
      noData: "",
      AddARecordLiDatas: ""
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //上拉刷新加载更多数据
    infinite(done) {
      if (this.noData) {
        setTimeout(() => {
          this.$refs.myscroller.finishInfinite(2);
        });
        return;
      }
      let self = this;
      let start = this.AddARecordLiData.length;
      let abc = 0;
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myPageSize = 50;
      var myArr = ["requestId=" + myRequestId, "pageSize=" + myPageSize];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/account/getEarningsInfoList.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();

      axios
        .post(
          "IncomeRankings",
          qs.stringify({
            pageSize: myPageSize
          }),
          {
            requestId: myRequestId,
            timestamp: myTimestamp,
            channelType: "h5",
            sign: myFunctionValues
          }
        )
        .then(data => {
          if (data.code == 200) {
            self.AddARecordLiData = data.list;
            var j = 1;
            for (var i = 0; i < data.list.length; i++) {
              data.list[i]["PlaceOfName"] = j++;
              if (i == data.list.length - 1) {
                self.noData = "没有更多数据";
              }
            }
          } else if (data.code == 400) {
            setTimeout(() => {
              this.$refs.myscroller.finishInfinite(2);
            });
            return;
          }
          done();
        })
        .catch(err => {});
    },
    IncomeMunOrMoneyClick() {
      if (this.IncomeMunOrMoneyNum % 2 == 0) {
        this.IncomeMunOrMoney = false;
        this.IncomeMunOrMoneyNum++;
      } else {
        this.IncomeMunOrMoney = true;
        this.IncomeMunOrMoneyNum++;
      }
    }
  },
  beforeMount() {}
};
</script>
<style scoped>
.IncomeRankingsMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.IncomeRankingsHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #dfdfdf;
}
.IncomeRankingsHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.IncomeRankingsHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
  z-index: 1000;
}
.IncomeRankingsBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
  z-index: 1000;
}
.IncomeRankingsHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
  z-index: 1000;
}
.IncomeRankingsTitle {
  background: #fff;
  padding: 50px 0;
  position: fixed;
  top: 88px;
  border-bottom: 1px solid #f2f2f2;
  z-index: 1000;
}
.IncomeRankingsTitle:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.IncomeRankingsTitle > li {
  float: left;
  width: 160px;
  color: #949494;
  font-size: 28px;
  text-align: center;
  z-index: 1000;
  position: relative;
}
.IncomeRankingsTitle > li:nth-child(3) {
  width: 270px;
}
.IncomeRankingsBody > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.IndexProfitRankingBody {
  padding-top: 276px;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
}
.IndexProfitRankingBody > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.IndexProfitRankingBody > li > div {
  text-align: center;
  width: 160px;
  float: left;
  font-size: 28px;
  color: #373d41;
  margin-bottom: 50px;
}
.IndexProfitRankingBody > li > div:nth-child(3) {
  width: 270px;
}
.IndexProfitRankingBody > li:last-child > hr:last-child {
  margin-bottom: 0px;
  border: 0;
}
.IndexProfitRankingBody > li > hr:last-child {
  margin-bottom: 50px;
}
.footDiv {
  padding-top: 118px;
  width: 100%;
  position: relative;
  bottom: 0;
}
.inPresentRecordAllDataHr {
  width: 702px;
  border: 0;
  margin-top: 0;
  margin-bottom: 0;
  border-bottom: 1px solid #f2f2f2;
}
.FooterIncome {
  width: 100%;
  height: 100px;
  background: #f5f5f8;
}
.IncomeRankingsTitle > li > span {
  display: inline-block;
  width: 24px;
  height: 20px;
  background: url("../../static/img/index_earnings_cut@2x.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 8px;
  position: absolute;
  top: 4px;
}
</style>
