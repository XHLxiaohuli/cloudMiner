<!--作者:var-->
<template>
  <div class="PurchaseRecordMain">
      <div class="PurchaseRecordHeader">
       <div class="PurchaseRecordHeaderLeft">
         <div class="PurchaseRecordBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="PurchaseRecordHeaderText">购买记录</div>
     </div>
     <!-- <ul class="PurchaseRecordTitle">
         <li v-for="item in PurchaseRecordTitleText">{{item}}</li>
     </ul> -->
     <scroller :on-infinite="infinite" ref="myscroller">
       <ul class="PurchaseRecordUl">
         <li class="PurchaseRecordLi" v-for="item in AddARecordLiData">
           <div class="PurchaseRecordLiTop">
             <div>
               <img src="../../static/img/dazhong.png" alt="" v-if="item.userGrade==1">
               <img src="../../static/img/baiyin.png" alt="" v-if="item.userGrade==2">
               <img src="../../static/img/huangjin.png" alt="" v-if="item.userGrade==3">
               <img src="../../static/img/zuanshi.png" alt="" v-if="item.userGrade==4">
             </div>
             <div>
               <p>
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
               </p>
               <p><span>￥{{item.orderTotalMoney}}</span><span>合约T数: {{item.calculate}}T</span></p>
             </div>
           </div>
           <hr>
           <div class="PurchaseRecordLiButtom">
             <div>
               <p v-if="item.orderType ==2">订单编号 : {{item.orderNo}}</p>
               <p v-if="item.orderType ==1">激活码 : {{item.activationCode}}</p>
               <p>下单时间 : {{item.myTime}}</p>
             </div>
             <div>
               <div v-if="item.status==3">
                 <div><img src="../../static/img/shopping_icon_success@2x.png" alt=""></div><span class="TransactionCompletion">交易完成</span>
               </div>
               <div v-if="item.status==2">
                 <div><img src="../../static/img/矢量智能对象@2x.png" alt=""></div><span class="InTheDelivery">交割中</span>
               </div>
             </div>
           </div>
         </li>
       </ul>
       <!-- <ul class="PurchaseRecordAllData">
            <li  v-for="item in AddARecordLiData">
                <div>
                  <span v-if="item.userStep==1">初级</span><span v-if="item.userStep==2">中级</span><span v-if="item.userStep==3">高级</span><span v-if="item.userGrade==1">大众矿工</span><span v-if="item.userGrade==2">白银</span><span v-if="item.userGrade==3">黄金</span><span v-if="item.userGrade==4">钻石</span>
                </div>
                <div>{{item.calculate}}</div>
                <div>
                    <p>{{item.myTime}}</p>
                </div>
                <hr class="inPurchaseRecordAllDataHr">
            </li>
        </ul> -->
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
      PurchaseRecordTitleText: ["矿工等级", "购买算力(T)", "时间"],
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
        myFunction.myFunction(myArr) +
        "/api/order/activationcode/selectOrderInfoListPage.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "PurchaseRecord",
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
                data.page.list[i]["myTime"] = myFunction.timestampToTime(
                  data.page.list[i].createTime
                );
              }
              if (self.investmentPage >= self.AllInvestmentPage) {
                if(self.AddARecordLiData!=""){
                  self.noData = " ";
                }else{
                  self.noData = "没有更多数据";
                }
                abc = 0;
                console.log(self.noData)
              }
              done();
            } else if (self.investmentPage >= 2) {
              for (var i = 0; i < data.page.list.length; i++) {
                data.page.list[i]["myTime"] = myFunction.timestampToTime(
                  data.page.list[i].createTime
                );
                self.AddARecordLiDatas.push(data.page.list[i]);
              }
              if (self.investmentPage >= self.AllInvestmentPage) {
                 if(self.AddARecordLiData!=""){
                  self.noData = " ";
                }else{
                  self.noData = "没有更多数据";
                }
                abc = 0;
                console.log(self.noData )
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
    }
  },
  beforeMount() {}
};
</script>
<style scoped>
.PurchaseRecordMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.PurchaseRecordHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #f2f2f2;
}
.PurchaseRecordHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PurchaseRecordHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.PurchaseRecordBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.PurchaseRecordHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.PurchaseRecordTitle {
  background: #fff;
  padding: 50px 0;
  position: fixed;
  top: 88px;
  border-bottom: 1px solid #dfdfdf;
  z-index: 100;
}
.PurchaseRecordTitle:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PurchaseRecordTitle > li {
  float: left;
  width: 250px;
  color: #949494;
  font-size: 28px;
  text-align: center;
}
/* .PurchaseRecordAllData {
  width: 100%;
  margin-top: 215px;
  background: #fff;
}
.PurchaseRecordAllData > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
} */
/* .PurchaseRecordAllData > li {
  width: 100%;
  margin: auto;
  border-bottom: 1px solid #dfdfdf;
} */
/* .PurchaseRecordAllData > li:last-child {
  border-bottom: 0;
}
.PurchaseRecordAllData > li > div {
  float: left;
  font-size: 26px;
  color: #373d41;
  width: 33.33%;
  text-align: center;
  padding: 50px 0;
} */
.footDiv {
  padding-top: 118px;
  width: 100%;
  position: relative;
  bottom: 0;
}
/* .inPurchaseRecordAllDataHr {
  width: 702px;
  border: 0;
  margin-top: 0;
  margin-bottom: 0;
  border-bottom: 1px solid #dfdfdf;
} */
/* .PurchaseRecordAllData > li:last-child > hr {
  border: 1px solid #fff;
  margin-top: 0;
  margin-bottom: 0;
} */
.PurchaseRecordUl {
  margin-top: 88px;
}
.PurchaseRecordLi:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PurchaseRecordLi {
  padding: 0 24px;
  background: #fff;
  margin-bottom: 20px;
}
.PurchaseRecordLi > hr {
  margin: 0;
  border: 0;
  border-bottom: 1px dashed #f2f2f2;
}
.PurchaseRecordLiTop {
  padding-top: 40px;
  padding-bottom: 30px;
  position: relative;
}
.PurchaseRecordLiButtom {
  padding-top: 30px;
}
.PurchaseRecordLiButtom:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PurchaseRecordLiTop:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PurchaseRecordLiTop > div:nth-child(1) {
  float: left;
  width: 124px;
  height: 124px;
}
.PurchaseRecordLiTop > div:nth-child(1) > img {
  width: 100%;
  height: 100%;
}
.PurchaseRecordLiTop > div:nth-child(2) {
  float: left;
  padding-left: 24px;
}
.PurchaseRecordLiTop > div:nth-child(2) > p:nth-child(1) {
  font-size: 32px;
  color: #373d41;
  padding-top: 20px;
  margin-bottom: 20px;
}
.PurchaseRecordLiTop > div:nth-child(2) > p:nth-child(2) > span:nth-child(1) {
  font-size: 26px;
  color: #949494;
}
.PurchaseRecordLiTop > div:nth-child(2) > p:nth-child(2) > span:nth-child(2) {
  font-size: 28px;
  color: #373d41;
  font-weight: bolder;
  position: absolute;
  right: 0;
}
.PurchaseRecordLiButtom > div:nth-child(1) > p {
  font-size: 24px;
  color: #b8b8b8;
}
.PurchaseRecordLiButtom > div:nth-child(1) > p:nth-child(2){
  padding-bottom: 30px;
}
.PurchaseRecordLiButtom > div:nth-child(1) > p:nth-child(1) {
  margin-bottom: 20px;
}
.PurchaseRecordLiButtom > div:nth-child(2) {
  height: 38px;
  text-align: center;
  font-size: 0;
  border-top: 1px dashed #f2f2f2;
  height: 88px;
  line-height: 88px;
}
.TransactionCompletion {
  font-size: 28px;
  color: #0287ff;
  position: relative;
  top: -5px;
}
.InTheDelivery {
  font-size: 28px;
  color: #ff721f;
  position: relative;
  top: -5px;
}
.PurchaseRecordLiButtom
  > div:nth-child(2)
  > div:nth-child(1)
  > div:nth-child(1),
.PurchaseRecordLiButtom
  > div:nth-child(2)
  > div:nth-child(2)
  > div:nth-child(1) {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 12px;
}
.PurchaseRecordLiButtom
  > div:nth-child(2)
  > div:nth-child(1)
  > div:nth-child(1)
  > img,
.PurchaseRecordLiButtom
  > div:nth-child(2)
  > div:nth-child(2)
  > div:nth-child(1)
  > img {
  width: 100%;
  height: 100%;
}
</style>



