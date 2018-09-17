<!--作者:var-->
<template>
  <div class="PresentRecordMain">
      <div class="PresentRecordHeader">
       <div class="PresentRecordHeaderLeft">
         <div class="PresentRecordBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="PresentRecordHeaderText">提现记录</div>
     </div>
     <scroller :on-infinite="infinite" ref="myscroller">
      <div class="PresentRecordTitleTopFill"></div>
      <div class="PresentRecordTitleDiv">
          <ul class="PresentRecordTitle">
              <li v-for="item in PresentRecordTitleText">{{item}}</li>
          </ul>
      </div>
     <!-- <scroller :on-infinite="infinite" ref="myscroller"> -->
       <ul class="PresentRecordAllData">
            <li v-for="item in AddARecordLiData">
                <div>{{item.myTime}}</div>
                <div>{{item. cashBTC  }}</div>
                <div>
                    <p>
                      <span v-if="item.status ==1">待提现</span>
                      <span v-if="item.status ==2">提现成功</span>
                      <span v-if="item.status ==3">提现失败</span>
                    </p>
                </div>
                <div>交易流水号: {{item.transactionNo}}</div>
            </li>
        </ul>
        <p class="footDiv"></p>
     </scroller>
    
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import Vue from "vue";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);
import myFunction from "@/page/encryption/encryption";
export default {
  components: {
    myFunction
  },
  data() {
    return {
      PresentRecordTitleText: ["时间", "交易金额(BTC)", "状态"],
      // PresentRecordData: "",
      noData: "",
      investmentPage: 1,
      AllInvestmentPage: "",
      AddARecordLiData: "",
      noData: "",
      AddARecordLiDatas: []
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
      var myUserId = localStorage.getItem("userID");
      var myCurrentPage = this.investmentPage;
      var myArr = [
        "requestId=" + myRequestId,
        "userId=" + myUserId,
        "currentPage=" + myCurrentPage
      ];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/account/selectUserCashInfoList.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "PaginationRecord",
          qs.stringify({
            userId: myUserId,
            currentPage: myCurrentPage
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
            if (self.investmentPage == 1) {
              self.AddARecordLiData = data.page.list;
              self.AllInvestmentPage = data.page.totalPage;
              for (var i = 0; i < data.page.list.length; i++) {
                data.page.list[i]["myTime"] = myFunction
                  .timestampToTime(data.page.list[i].applyTime)
                  .substring(5)
                  .substring(0, 11);
              }
              if (self.investmentPage >= self.AllInvestmentPage) {
                self.noData = "没有更多数据";
                abc = 0;
              }
              done();
            } else if (self.investmentPage >= 2) {
              for (var i = 0; i < data.page.list.length; i++) {
                data.page.list[i]["myTime"] = myFunction
                  .timestampToTime(data.page.list[i].applyTime)
                  .substring(5)
                  .substring(0, 11);
                self.AddARecordLiDatas.push(data.page.list[i]);
              }
              if (self.investmentPage >= self.AllInvestmentPage) {
                self.noData = "没有更多数据";
                abc = 0;
              }
              done();

              for (let i = 0; i < self.AddARecordLiDatas.length; i++) {
                self.AddARecordLiData.push(self.AddARecordLiDatas[abc]);
                abc++;
              }
              self.AddARecordLiDatas = "";
            }
            self.investmentPage++;
          } else if (data.code == 400) {
            setTimeout(() => {
              this.$refs.myscroller.finishInfinite(2);
            });
            return;
          }
        })
        .catch(err => {});
    },
    //提现记录接口
    WithdrawcashFunction() {
      // this.myTime=Math.round(new Date().getTime()/1000).toString()
      // var myRequestId=myFunction.myUuid()
      // var myTimestamp=Math.round(new Date().getTime()/1000).toString()
      // var myUserId=localStorage.getItem("userID")
      // var myCurrentPage=1
      // var myArr=["requestId="+myRequestId,"userId="+myUserId,"currentPage="+myCurrentPage]
      // var myFunctionValue=myFunction.myFunction(myArr)+"/api/account/selectUserCashInfoList.do"
      // var myFunctionValues=md5(myFunctionValue).toUpperCase()
      // axios
      //   .post(
      //     "PaginationRecord",
      //     qs.stringify({
      //       userId:myUserId,
      //       currentPage:myCurrentPage
      //       // time:this.myTime,
      //       // token:md5( md5( md5(this.myTime)+'yun' )+'yunkuang123' ),
      //       // number: 2000
      //     }),{
      //       requestId:myRequestId,
      //       timestamp:myTimestamp,
      //       channelType:"h5",
      //       sign:myFunctionValues
      //     }
      //   )
      //   .then(data => {
      //     console.log(data)
      //     // this.PresentRecordData = data.data.list;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  beforeMount() {
    this.WithdrawcashFunction();
    // this.infinite()
  }
};
</script>
<style scoped>
.PresentRecordMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.PresentRecordHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #f2f2f2;
}
.PresentRecordHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PresentRecordHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.PresentRecordBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.PresentRecordHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.PresentRecordTitleTopFill{
  width: 100%;
  height: 89px;
}
.PresentRecordTitleDiv {
  background: #fff;
  width: 100%;
  border-bottom: 1px solid #dfdfdf;
  z-index: 100;
}
.PresentRecordTitle {
  padding: 50px 0;
  width: 702px;
  margin: auto;
}
.PresentRecordTitle:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PresentRecordTitle > li {
  float: left;
  width: 33.33%;
  color: #949494;
  font-size: 28px;
  text-align: center;
}
.PresentRecordTitle > li:nth-child(1) {
  text-align: left;
}
.PresentRecordTitle > li:nth-child(3) {
  text-align: right;
}
.PresentRecordAllData {
  width: 100%;
  margin-top: 235px;
  background: #fff;
}
.PresentRecordAllData > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PresentRecordAllData > li {
  width: 702px;
  margin: auto;
  padding: 50px 0;
  border-bottom: 1px solid #dfdfdf;
}
.PresentRecordAllData > li:last-child {
  border-bottom: 0;
}
.PresentRecordAllData > li > div {
  float: left;
  font-size: 28px;
  color: #373d41;
  width: 33.33%;
  text-align: center;
  /* padding: 50px 0; */
}
.PresentRecordAllData > li > div:nth-child(3) > p {
  text-align: right;
}
.PresentRecordAllData > li > div:nth-child(3) > p > span {
  font-weight: bolder;
}
.PresentRecordAllData > li > div:nth-child(1) {
  text-align: left;
}
.PresentRecordAllData > li > div:nth-child(4) {
  width: 100%;
  padding-top: 40px;
  text-align: left;
  font-size: 24px;
  color: #b8b8b8;
}
.footDiv {
  padding-top: 118px;
  width: 100%;
  position: relative;
  bottom: 0;
}
</style>


