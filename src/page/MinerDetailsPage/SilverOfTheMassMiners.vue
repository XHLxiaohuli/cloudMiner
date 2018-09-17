<template>
    <div class="SilverDetailsMain">
     <div class="SilverDetailsHeader">
       <div class="SilverDetailsHeaderLeft">
         <div class="SilverDetailsBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="SilverDetailsHeaderText">白银矿工</div>
     </div>
     <div class="SilverComputingPowerLease">
         <h1 class="SilverComputingPowerLeaseTitle">云算力租赁</h1>
         <div class="SilverComputingPowerLeaseTable">
             <div>
                 <p>每T算力价格</p>
                 <p>{{SilverComputingPrice}}<span>元</span></p>
                 <div class="SellingPic"></div>
             </div>
             <div>
                 <ul>
                     <li>
                         <p>每日每T预计收益</p>
                         <p>{{SilverComputingEverydayProfitOne}}<span>元</span></p>
                     </li>
                     <li>
                         <p>每日每T预计收益</p>
                         <p>{{SilverComputingEverydayProfitTow}}<span>BTC</span></p>
                     </li>
                 </ul>
             </div>
         </div>
         <div class="SilverLeaseProgressBar">
             <div>剩余算力</div>
             <div>
                 <div :style="'width:'+SilverLeaseProgressBarWidth+'%'"></div>
             </div>
             <div>{{SilverLeaseProgressBarT}}T</div>
         </div>
     </div>
     <div class="SilverDetailsBottom">
         <p>购买算力等级</p>
         <div class='SilverRank'>
           <div class='menu'>
               <div  class="collection-item"
       v-for="(gameName,index) in gameNames"
       @click="selected(index,gameName)"
       :class="{actives: activeName == gameName.listType}"><span>{{gameName.listType}}</span><div :class="{SliveActives: activeName == gameName.listType}">合约单位:{{gameName.T}}T</div><div>开启白银{{gameName.ind}}级收益</div></div>
           </div>
         </div>
         <div>
           <x-button class="SilverJoinBtn" @click.native="showPosition('middle')" type="primary"
            :class="{YesSilverJoinImmediatelyBtn:SilverCorrectPicShow==true,NoSilverJoinImmediatelyBtn:SilverCorrectPicShow==false}"
           >立即加入</x-button> 
           <toast width="14em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text=SilverJoinManagementText :position="position">{{('Basic Usage') }}</toast>
         </div>
         <div class="SilverTransactionContract">
             <div @click="SilverTransactionContractClick" :style="' border: 1px solid '+SilverBorderColor"><div v-show="SilverCorrectPicShow" class="SilverCorrectPic"></div></div><span>已阅读并同意</span><span @click="jumpMinerAgreement">《云矿工交易协议》</span>
         </div>
     </div>
     <div @click="jumpDetailsPage" class="SilverDetailsFooter"> <span><img src="../../static/img/finger.png" alt=""></span> 点击查看更多详情</div>
    </div>
</template>
<script>
import { Toast, XButton } from "vux";
import { fail } from "assert";
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import myFunction from "@/page/encryption/encryption";
export default {
  components: {
    Toast,
    XButton,
    myFunction
  },
  data() {
    return {
      showPositionValue: false,
      position: "",
      SilverJoinManagementText: "", //错误提示文本

      SilverComputingPrice: "",
      SilverComputingEverydayProfitOne: "",
      SilverComputingEverydayProfitTow: "",
      SilverLeaseProgressBarWidth: 0,
      SilverLeaseProgressBarT: "",
      SilverCheckState: 0,
      SilverStatus: "",
      SilverRank: "",
      SilverRankname: "",
      SilverCorrectPicShow: true,
      SilverBorderColor: "#0287ff",
      gameNames: [
        { listType: "初级白银", ind: "一", T: "0.1" },
        { listType: "中级白银", ind: "二", T: "0.2" },
        { listType: "高级白银", ind: "三", T: "0.4" }
      ],
      activeName: "初级白银",
      rankIndex: 1,

      SilverClass: ""
    };
  },
  methods: {
    //立即加入按钮
    showPosition(position) {
      if (localStorage.getItem("userID") == null) {
        this.$router.push("/Login/1");
      } else if (localStorage.getItem("userID") != null) {
        var myRequestId = myFunction.myUuid();
        var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
        var myUserId = localStorage.getItem("userID");
        var myArr = ["requestId=" + myRequestId, "userId=" + myUserId];
        var myFunctionValue =
          myFunction.myFunction(myArr) + "/api/user/getUserInfo.do";
        var myFunctionValues = md5(myFunctionValue).toUpperCase();
        axios
          .post(
            "ObtainingUserInformation",
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
            if (data.code == 200) {
              this.SilverClass = data.data.userStep;
              this.SilverRank = data.data.userGrade;
              if (data.data.userGrade == 2) {
                if (data.data.userStep == 1) {
                  this.SilverRankname = "初级白银";
                } else if (data.data.userStep == 2) {
                  this.SilverRankname = "中级白银";
                } else {
                  this.SilverRankname = "高级白银";
                }
              } else if (data.data.userGrade == 3) {
                if (data.data.userStep == 1) {
                  this.SilverRankname = "初级黄金";
                } else if (data.data.userStep == 2) {
                  this.SilverRankname = "中级黄金";
                } else {
                  this.SilverRankname = "高级黄金";
                }
              } else if (data.data.userGrade == 4) {
                if (data.data.userStep == 1) {
                  this.SilverRankname = "初级钻石";
                } else if (data.data.userStep == 2) {
                  this.SilverRankname = "中级钻石";
                } else {
                  this.SilverRankname = "高级钻石";
                }
              } else {
                this.SilverRankname = "大众矿工";
              }

              if (this.SilverRank == 1) {
                // this.$router.push("/MinersJoin/2/" + this.rankIndex);
                if (this.rankIndex == 1) {
                  this.$router.push(
                    "/OrderDetails/2/0.1/" +
                      this.SilverComputingPrice +
                      "/" +
                      this.SilverLeaseProgressBarT +
                      "/" +
                      this.rankIndex +
                      "/" +
                      this.activeName
                  );
                } else if (this.rankIndex == 2) {
                  this.$router.push(
                    "/OrderDetails/2/0.2/" +
                      this.SilverComputingPrice +
                      "/" +
                      this.SilverLeaseProgressBarT +
                      "/" +
                      this.rankIndex +
                      "/" +
                      this.activeName
                  );
                } else if (this.rankIndex == 3) {
                  this.$router.push(
                    "/OrderDetails/2/0.4/" +
                      this.SilverComputingPrice +
                      "/" +
                      this.SilverLeaseProgressBarT +
                      "/" +
                      this.rankIndex +
                      "/" +
                      this.activeName
                  );
                }
                // }
              } else if (this.SilverRank == 2) {
                //白银
                if (this.SilverClass == 1) {
                  if (this.rankIndex == 1) {
                    this.position = position;
                    this.showPositionValue = true;
                    this.SilverJoinManagementText =
                      "你已经是" +
                      this.SilverRankname +
                      "矿工" +
                      "，不能再加入" +
                      this.activeName +
                      "矿工";
                  } else {
                    // this.$router.push("/MinersJoin/2/" + this.rankIndex);
                    if (this.rankIndex == 2) {
                      this.$router.push(
                        "/OrderDetails/2/0.2/" +
                          this.SilverComputingPrice +
                          "/" +
                          this.SilverLeaseProgressBarT +
                          "/" +
                          this.rankIndex +
                          "/" +
                          this.activeName
                      );
                    } else if (this.rankIndex == 3) {
                      this.$router.push(
                        "/OrderDetails/2/0.4/" +
                          this.SilverComputingPrice +
                          "/" +
                          this.SilverLeaseProgressBarT +
                          "/" +
                          this.rankIndex +
                          "/" +
                          this.activeName
                      );
                    }
                  }
                } else if (this.SilverClass == 2) {
                  if (this.rankIndex == 1 || this.rankIndex == 2) {
                    this.position = position;
                    this.showPositionValue = true;
                    this.SilverJoinManagementText =
                      "你已经是" +
                      this.SilverRankname +
                      "矿工" +
                      "，不能再加入" +
                      this.activeName +
                      "矿工";
                  } else {
                    this.$router.push(
                      "/OrderDetails/2/0.4/" +
                        this.SilverComputingPrice +
                        "/" +
                        this.SilverLeaseProgressBarT +
                        "/" +
                        this.rankIndex
                    );
                  }
                }else{
                  this.position = position;
                  this.showPositionValue = true;
                  this.SilverJoinManagementText =
                    "你已经是" +
                    this.SilverRankname +
                    "矿工" +
                    "，不能再加入" +
                    this.activeName +
                    "矿工";
                }
              } else if (this.SilverRank >= 3) {
                //黄金钻石
                this.position = position;
                this.showPositionValue = true;
                this.SilverJoinManagementText =
                  "你已经是" +
                  this.SilverRankname +
                  "矿工" +
                  "，不能再加入" +
                  this.activeName +
                  "矿工";
              }
            } else if (data.code == 413) {
              this.$router.push("/Login/1");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //放回上一级
    BackUpperStory() {
      this.$router.push("/Home/Index/1");
    },
    //输入框获取焦点下边框变蓝色
    SilverPurchasingInputFocus() {
      this.SilverPurchasingBottomBolor = "#0287ff";
    },
    //交易协议
    SilverTransactionContractClick() {
      this.SilverCheckState++;
      if (this.SilverCheckState % 2 !== 0) {
        this.SilverCorrectPicShow = false;
        this.SilverBorderColor = "#b8b8b8";
      } else if (this.SilverCheckState % 2 == 0) {
        this.SilverCorrectPicShow = true;
        this.SilverBorderColor = "#0287ff";
      }
    },
    //切换白银等级
    selected: function(index, gameName) {
      this.activeName = gameName.listType;
      this.rankIndex = index + 1;
    },
    //跳转到详情页
    jumpDetailsPage() {
      this.$router.push("/DetailsPage/2");
    },
    jumpMinerAgreement() {
      this.$router.push("/MinerAgreement");
    },
    //获取BTC信息接口
    SilverDetailsFunction() {
      var goodsId = this.$route.params.goodsId;
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myArr = ["requestId=" + myRequestId, "goodsId=" + goodsId];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/order/goods/getGoodsDetails.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "CommodityDetails",
          qs.stringify({
            goodsId: goodsId
          }),
          {
            requestId: myRequestId,
            timestamp: myTimestamp,
            channelType: "h5",
            sign: myFunctionValues
          }
        )
        .then(data => {
          this.SilverComputingPrice = data.data.everyCalculatePrice;
          this.SilverComputingEverydayProfitOne =
            data.data.everydayExpectProfitCNY;
          this.SilverComputingEverydayProfitTow =
            data.data.everydayExpectProfitBTC;
          this.SilverLeaseProgressBarT = data.data.surplusCalculate;
          this.SilverLeaseProgressBarWidth =
            data.data.surplusCalculate / 5000 * 100;
          if (this.SilverLeaseProgressBarWidth >= 100) {
            this.SilverLeaseProgressBarWidth = 100;
            this.SilverLeaseProgressBarT = 0;
          }
        })
        .catch(err => {});
    }
  },
  beforeMount() {
    this.SilverDetailsFunction();
  }
};
</script>
<style scoped>
.collection-item {
  padding-top: 50px;
}
.collection-item > span {
  font-weight: bold;
  color: #949494;
  font-size: 26px;
}
.collection-item > div:nth-child(2) {
  padding-top: 30px;
  color: #949494;
  font-size: 20px;
}
.collection-item > div:nth-child(3) {
  position: absolute;
  width: 100%;
  bottom: 0px;
  left: 0px;
  height: 50px;
  font-size: 20px;
  background: #eaeaea;
  color: #b8b8b8;
  text-align: center;
  line-height: 50px;
  box-sizing: border-box;
}
.collection-item.actives > div:nth-child(3) {
  color: #fff;
  background: #0287ff;
}
.collection-item.actives > span {
  font-weight: bold;
  font-size: 26px;
  color: #0287ff;
}
.SliveActives {
  color: #0287ff !important;
}
.SilverDetailsMain {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.SilverDetailsHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #f2f2f2;
}
.SilverDetailsHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverDetailsHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.SilverDetailsBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.SilverDetailsHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.SilverComputingPowerLease {
  font-size: 0;
  background: #fff;
  margin-top: 108px;
  padding: 50px 24px;
  /* border-bottom: 1px solid #dfdfdf; */
}
.SilverComputingPowerLeaseTitle {
  padding: 0;
  margin: 0;
  font-size: 28px;
  color: #373d41;
  border-left: 8px solid #0287ff;
  padding-left: 10px;
  /* border-left: 6px solid #0287ff;
  padding-left: 10px; */
}
.SilverComputingPowerLeaseTable {
  width: 702px;
  margin-top: 30px;
  margin-bottom: 50px;
}
.SilverComputingPowerLeaseTable:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverComputingPowerLeaseTable > div {
  float: left;
}
.SilverComputingPowerLeaseTable > div:nth-child(1) {
  width: 275px;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-right: 0;
  padding: 85px 0;
  position: relative;
}
.SilverComputingPowerLeaseTable > div:nth-child(1) > p {
  text-align: center;
}
.SilverComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(1) {
  font-size: 24px;
  color: #949494;
}
.SilverComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(2) {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  margin-top: 45px;
  color: #ff721f;
}
.SilverComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(2) > span {
  font-size: 24px;
  color: #373d41;
  font-weight: bolder;
  color: #ff721f;
}
.SilverComputingPowerLeaseTable > div:nth-child(2) > ul > li {
  padding: 30px 0;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  width: 427px;
}
.SilverComputingPowerLeaseTable > div:nth-child(2) > ul > li:nth-child(1) {
  border-bottom: 0;
}
.SilverComputingPowerLeaseTable > div:nth-child(2) > ul > li > p {
  padding-left: 120px;
}
.SilverComputingPowerLeaseTable > div:nth-child(2) > ul > li > p:nth-child(1) {
  font-size: 24px;
  color: #949494;
}
.SilverComputingPowerLeaseTable > div:nth-child(2) > ul > li > p:nth-child(2) {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  margin-top: 18px;
}
.SilverComputingPowerLeaseTable
  > div:nth-child(2)
  > ul
  > li
  > p:nth-child(2)
  > span {
  font-size: 24px;
  color: #373d41;
  font-weight: bolder;
}
.SilverLeaseProgressBar:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverLeaseProgressBar > div {
  float: left;
}
.SilverLeaseProgressBar > div:nth-child(1) {
  font-size: 28px;
  color: #949494;
}
.SilverLeaseProgressBar > div:nth-child(2) {
  height: 25px;
  width: 400px;
  border-radius: 13px;
  border: 0;
  box-sizing: border-box;
  position: relative;
  margin-left: 45px;
  background: #eaeaea;
}
.SilverLeaseProgressBar > div:nth-child(2) > div {
  height: 100%;
  border-radius: 12px;
  background: #0262b3;
}
.SilverLeaseProgressBar > div:nth-child(3) {
  font-size: 28px;
  color: #373d41;
  float: right;
}
.SilverDetailsBottom {
  background: #fff;
  padding: 50px 24px;
  margin-top: 20px;
  /* border-bottom: 1px solid #dfdfdf; */
}
.SilverDetailsBottom > p:nth-child(1) {
  color: #373d41;
  font-size: 28px;
  border-left: 8px solid #0287ff;
  padding-left: 10px;
}
.SilverDetailsBottom > div:nth-child(3) {
  width: 600px;
  height: 88px;
  margin: auto;
  margin-top: 100px;
}
.SilverDetailsBottom > div:nth-child(3) > button {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  border: 0;
  font-size: 28px;
}
.SilverDetailsBottom > div:nth-child(3) > button:focus {
  outline: 0;
}
.SilverDetailsBottom .SilverRank {
  margin: 0 auto;
  padding-top: 50px;
}
.SilverRank > div {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.SilverRank > div > div {
  font-size: 28px;
  color: #949494;
  width: 218px;
  height: 184px;
  background: #fff;
  text-align: center;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  border-radius: 2px;
  position: relative;
}
.SilverRank .actives {
  color: #0287ff;
  background: #fff;
  border: 1px solid #0287ff;
  border-radius: 2px;
}
.SilverTransactionContract {
  margin-top: 30px;
  position: relative;
}
.SilverTransactionContract:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.SilverTransactionContract > div:nth-child(1) {
  display: inline-block;
  border: 1px solid #949494;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  font-size: 25px;
  font-weight: bolder;
  color: #ff721f;
  margin-right: 10px;
  line-height: 30px;
  position: absolute;
  top: 2px;
  left: 160px;
}
.SilverTransactionContract > span {
  font-size: 24px;
}
.SilverTransactionContract > span:nth-child(2) {
  color: #949494;
  margin-left: 200px;
}
.SilverTransactionContract > span:nth-child(3) {
  color: #0287ff;
}
.YesSilverJoinImmediatelyBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.NoSilverJoinImmediatelyBtn {
  pointer-events: none;
  background: #eee;
  color: #949494;
}
.SilverDetailsFooter {
  font-size: 24px;
  color: #949494;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 100px;
  background: #f5f5f8;
}
.SellingPic {
  width: 94px;
  height: 94px;
  background: url("../../static/img/Selling.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.SilverCorrectPic {
  width: 18px;
  height: 13px;
  background: url("../../static/img/Correct.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.SilverDetailsFooter > span {
  display: inline-block;
  width: 16px;
  height: 24px;
}
.SilverDetailsFooter > span > img {
  width: 100%;
  height: 100%;
}
.weui-btn:after {
  border: 0;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  background-color: #0260b2 !important;
}
</style>


