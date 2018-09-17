<template>
  <div  class="copyRecordMain">
          <div class="copyRecordHeader">
                <div class="copyRecordHeaderLeft">
                    <div class="copyRecordBackPic" @click="BackUpperStory"></div>
                </div>
                <div class="copyRecordHeaderText">邀请记录</div>
                </div>
              <scroller :on-infinite="infinite" ref="myscroller">
                <div class="copyRecordTop">
                    <div>邀请统计</div>
                    <ul>
                        <li><div>邀请总计</div><div>{{AllInvitation}}人</div><div>购买记录</div><div>{{AllPurchase}}人</div></li>
                        <li><div>一级邀请</div><div>{{OneInvitation}}人</div><div>一级代理</div><div>{{OnePurchase}}人</div></li>
                        <li><div>二级邀请</div><div>{{TowInvitation}}人</div><div>二级代理</div><div>{{TowPurchase}}人</div></li>
                        <li><div>三级邀请</div><div>{{ThreeInvitation}}人</div><div>三级代理</div><div>{{ThreePurchase}}人</div></li>
                    </ul>
                    <p>*可到收益页面查看已购买矿工的等级分布</p>
                </div>
                <div class="copyRecordMiddle">
                    <div>
                        <div>
                            <p>{{NewInvitation}}</p>
                            <p>今日新增邀请人数</p>
                        </div>
                        <div>
                            <p>{{NewPurchase}}</p>
                            <p>今日新增购买人数</p>
                        </div>
                    </div>
                    <p>击败了全国<span>{{scaleNull}}%</span>的矿工！</p>
                </div>
                <div class="copyRecordButtom">
                    <div>
                        <div><span></span> 邀请记录 <span></span></div>
                        <ul>
                            <li v-for="item in RecordTextData">{{item}}</li>
                        </ul>
                        <ul>
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
                                <div>{{item.registerTime}}</div>
                                <div v-if="item.isJoin==1">{{item.joinsTime}}</div>
                                <div v-if="item.isJoin==0" :class="{copyColor:item.isJoin==0}">暂未加入</div>
                            </li>
                        </ul>
                    </div>
                </div>
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
      RecordTextData: ["推荐朋友", "矿工等级", "注册时间", "加入时间"],
      AllInvitation: "", //邀请总计
      AllPurchase: "", //购买总计
      OneInvitation: "", //邀请一级代理
      TowInvitation: "", //邀请二级代理
      ThreeInvitation: "", //邀请三级代理
      OnePurchase: "", //购买一级代理
      TowPurchase: "", //购买二级代理
      ThreePurchase: "", //购买三级代理
      NewInvitation: "", //今日新增邀请人数
      NewPurchase: "", //今日新增购买人数
      scaleNull: "", //击败全国人数百分比
      investmentPage: 1,
      AllInvestmentPage: "",
      AddARecordLiData: "",
      noData: "",
      AddARecordLiDatas: "",
      myTime: ""
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
        myFunction.myFunction(myArr) + "/api/user/invite/inviteRecord.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "InvitationRecord",
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
                data.page.list[i]["registerTime"] = myFunction
                  .timestampToTime(data.page.list[i].createTime)
                  .substring(5)
                  .substring(0, 11);
                data.page.list[i]["joinsTime"] = myFunction
                  .timestampToTime(data.page.list[i].joinTime)
                  .substring(5)
                  .substring(0, 11);
              }
              if (self.investmentPage >= self.AllInvestmentPage) {
                self.noData = "没有更多数据";
                abc = 0;
              }
              done();
            } else if (self.investmentPage >= 2) {
              self.AddARecordLiDatas = data.page.list;
              for (var i = 0; i < self.AddARecordLiDatas.length; i++) {
                data.page.list[i]["registerTime"] = myFunction
                  .timestampToTime(data.page.list[i].createTime)
                  .substring(5)
                  .substring(0, 11);
                data.page.list[i]["joinsTime"] = myFunction
                  .timestampToTime(data.page.list[i].joinTime)
                  .substring(5)
                  .substring(0, 11);
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
    ProxyInformationFn() {
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myUserId = localStorage.getItem("userID");
      var myArr = ["requestId=" + myRequestId, "userId=" + myUserId];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/user/invite/inviteStatistics.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "InvitationStatistics",
          qs.stringify({
            userId: myUserId
          }),
          {
            requestId: myRequestId,
            timestamp: myTimestamp,
            channelType: "h5",
            sign: myFunctionValues
          }
        )
        .then(data => {
          this.AllInvitation = data.data.inviteStatistics; //邀请总计
          this.AllPurchase = data.data.buyStatistics; //购买总计
          this.OneInvitation = data.data.oneInvite; //邀请一级代理
          this.TowInvitation = data.data.twoInvite; //邀请二级代理
          this.ThreeInvitation = data.data.threeInvite; //邀请三级代理
          this.OnePurchase = data.data.oneBuy; //购买一级代理
          this.TowPurchase = data.data.twoBuy; //购买二级代理
          this.ThreePurchase = data.data.threeBuy; //购买三级代理
          //  this.NewInvitation=data.data.count1//今日新增邀请人数
          //  this.NewPurchase=data.data.count2//今日新增购买人数
          //  this.scaleNull=data.data.scale//
        })
        .catch(err => {});
    }
  },
  mounted() {
    // this.infinite()
    this.ProxyInformationFn();
  }
};
</script>
<style scoped>
.copyRecordMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.copyRecordHeader {
  width: 100%;
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  position: fixed;
  z-index: 1000;
  border-bottom: 1px solid #f2f2f2;
}
.copyRecordsHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.copyRecordHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.copyRecordBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.copyRecordHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.copyRecordTop {
  background: #fff;
  margin-top: 109px;
  padding: 0 24px;
  padding-bottom: 50px;
}
.copyRecordTop > div:nth-child(1) {
  padding: 50px 0;
  text-align: center;
  font-size: 28px;
  color: #373d41;
}
.copyRecordTop > ul:nth-child(2) {
  width: 100%;
  border: 1px solid #eaeaea;
}
.copyRecordTop > ul:nth-child(2) > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.copyRecordTop > ul:nth-child(2) > li {
  border-bottom: 1px solid #eaeaea;
}
.copyRecordTop > ul:nth-child(2) > li:last-child {
  border-bottom: 0;
}
.copyRecordTop > ul:nth-child(2) > li > div {
  float: left;
  width: 25%;
  text-align: center;
  font-size: 26px;
  color: #949494;
  padding: 30px 0;
}
.copyRecordTop > ul:nth-child(2) > li > div:nth-child(2) {
  border-right: 1px solid #eaeaea;
  box-sizing: border-box;
}
.copyRecordTop > ul:nth-child(2) > li:nth-child(1) > div:nth-child(2) {
  border-right: 0;
}
.copyRecordTop > ul:nth-child(2) > li:nth-child(1) {
  background: rgba(2, 135, 255, 0.1);
}
.copyRecordTop > ul:nth-child(2) > li:nth-child(1) > div {
  color: #373d41;
  font-weight: bolder;
}
.copyRecordTop > p:nth-child(3) {
  margin-top: 20px;
  font-size: 24px;
  color: #373d41;
}
.copyRecordMiddle {
  margin-top: 20px;
  background: #fff;
  padding: 50px 24px;
  display: none;
}
.copyRecordMiddle > div:nth-child(1):after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.copyRecordMiddle > div:nth-child(1) {
  padding-bottom: 50px;
}
.copyRecordMiddle > div:nth-child(1) > div {
  float: left;
  width: 339px;
  text-align: center;
  padding: 50px 0;
  box-shadow: rgba(000, 000, 000, 0.1) 0px 1px 4px 0px;
}
.copyRecordMiddle > div:nth-child(1) > div > p:nth-child(1) {
  font-size: 60px;
  padding-bottom: 50px;
  font-weight: bolder;
  color: #373d41;
}
.copyRecordMiddle > div:nth-child(1) > div > p:nth-child(2) {
  font-size: 28px;
  color: #373d41;
}
.copyRecordMiddle > div:nth-child(1) > div:nth-child(2) > p {
  color: #0287ff;
}
.copyRecordMiddle > div:nth-child(1) > div:nth-child(2) {
  margin-left: 24px;
}
.copyRecordMiddle > p:nth-child(2) {
  font-size: 24px;
  color: #373d41;
  text-align: center;
}
.copyRecordMiddle > p:nth-child(2) > span {
  color: #ff721f;
  font-size: 24px;
}
.copyRecordButtom {
  margin-top: 20px;
  background: #fff;
  /* padding: 50px 24px 100px 24px; */
}
.copyRecordButtom > div {
  width: 100%;
  /* background: #ecdfcd; */
  padding-bottom: 10px;
}
.copyRecordButtom > div > div:nth-child(1) {
  text-align: center;
  padding: 50px 0;
  font-size: 28px;
  /* color: #dfb823; */
  color: #373d41;
  /* padding-bottom:50px; */
  border-bottom: 1px solid #f2f2f2;
}
.copyRecordButtom > div > div:nth-child(1) > span {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  /* background: #dfb823; */
  position: relative;
  top: -4px;
}
.copyRecordButtom > div > ul:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.copyRecordButtom > div > ul:nth-child(2) {
  padding: 0 24px;
  padding-top: 40px;
}
.copyRecordButtom > div > ul:nth-child(2) > li {
  float: left;
  width: 25%;
  padding-bottom: 50px;
  text-align: center;
  font-size: 26px;
  color: rgba(55, 61, 65, 0.6);
}
.copyRecordButtom > div > ul:nth-child(3) > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.copyRecordButtom > div > ul:nth-child(3) {
  padding: 0 24px;
}
.copyRecordButtom > div > ul:nth-child(3) > li > div {
  float: left;
  width: 25%;
  font-size: 24px;
  color: #373d41;
  text-align: center;
  padding-bottom: 40px;
}
.copyColor {
  color: #f04134 !important;
}
</style>


