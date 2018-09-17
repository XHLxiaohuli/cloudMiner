<template>
  <div>
    <scroller :on-infinite="infinite" ref="myscroller">
      <ul class="AddARecordTitle">
        <li v-for="item in AddARecordTitleText">{{item}}</li>
      </ul>
      <ul class="AddARecordUl">
      <li v-for="item in AddARecordLiData">
        <div>{{item.username}}</div>
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
        <div>{{item.joiningTime}}</div>
        <hr>
      </li>
    </ul>
    </scroller>
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
      AddARecordTitleText: ["用户名", "加入等级", "加入时间"],
      AddSubrouteNumType: "",
      investmentPage: 1,
      AllInvestmentPage: "",
      AddARecordLiData: "",
      noData: "",
      AddARecordLiDatas: "",
      myTime: ""
    };
  },
  methods: {
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
      var myGoodsGradeType = self.AddSubrouteNumType;
      var myArr = [
        "requestId=" + myRequestId,
        "goodsGradeType=" + myGoodsGradeType
      ];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/order/goods/goodsJoinRecord.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "CommodityEntryRecord",
          qs.stringify({
            goodsGradeType: myGoodsGradeType
          }),
          {
            requestId: myRequestId,
            timestamp: myTimestamp,
            channelType: "h5",
            sign: myFunctionValues
          }
        )
        .then(data => {
          self.AddARecordLiData = data.list;
          for (var i = 0; i < data.list.length; i++) {
            data.list[i]["joiningTime"] = myFunction
              .timestampToTime(data.list[i].joinTime)
              .substring(5)
              .substring(0, 11);
            if (i == data.list.length - 1) {
              self.noData = "没有更多数据";
              abc = 0;
            }
          }
          done();
        });
    }
  },
  beforeMount() {
    this.AddSubrouteNumType = this.$route.params.AddSubrouteNum;
    // this.investmentFunction()
  }
};
</script>
<style scoped>
.AddARecordFail {
  width: 100%;
  height: 20px;
  background: #f5f5f8;
  position: fixed;
  top: 205px;
  z-index: 100;
}
.AddARecordTitle {
  width: 100%;
  padding: 50px 0;
  background: #fff;
  /* position: fixed; */
  /* top:217px; */
  margin-top: 231px;
  border-bottom: 1px solid #f2f2f2;
}
.AddARecordTitle:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.AddARecordTitle > li {
  float: left;
  width: 33.33%;
  text-align: center;
  font-size: 28px;
  color: #949494;
}
.AddARecordUl {
  border-bottom: 1px solid #dfdfdf;
  background: #f2f2f8;
  padding-bottom: 200px;
}
.AddARecordUl > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.AddARecordUl > li {
  background: #fff;
}
.AddARecordUl > li > div {
  width: 33.33%;
  float: left;
  padding: 50px 0;
  text-align: center;
  font-size: 26px;
  color: #373d41;
}
.AddARecordUl > li > hr {
  width: 702px;
  border: 0;
  border-bottom: 1px solid #f2f2f2;
  margin: auto;
}
.AddARecordUl > li:last-child > hr {
  border-bottom: 0;
}
.AddARecordUl > li:last-child {
  border-bottom: 1px solid #dfdfdf;
}
</style>
