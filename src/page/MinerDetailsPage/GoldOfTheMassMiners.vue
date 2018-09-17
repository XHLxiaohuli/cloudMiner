<template>
    <div class="GoldDetailsMain">
     <div class="GoldDetailsHeader">
       <div class="GoldDetailsHeaderLeft">
         <div class="GoldDetailsBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="GoldDetailsHeaderText">黄金矿工</div>
     </div>
     <div class="GoldComputingPowerLease">
         <h1 class="GoldComputingPowerLeaseTitle">云算力租赁</h1>
         <div class="GoldComputingPowerLeaseTable">
             <div>
                 <p>每T算力价格</p>
                 <p>{{GoldComputingPrice}}<span>元</span></p>
             </div>
             <div>
                 <ul>
                     <li>
                         <p>每日每T预计收益</p>
                         <p>{{GoldComputingEverydayProfitOne}}<span>元</span></p>
                     </li>
                     <li>
                         <p>每日每T预计收益</p>
                         <p>{{GoldComputingEverydayProfitTow}}<span>BTC</span></p>
                     </li>
                 </ul>
             </div>
         </div>
         <div class="GoldLeaseProgressBar">
             <div>剩余算力</div>
             <div>
                 <div :style="'width:'+GoldLeaseProgressBarWidth+'%'"></div>
             </div>
             <div>{{GoldLeaseProgressBarT}}T</div>
         </div>
     </div>
     <div class="GoldDetailsBottom">
         <p>购买算力等级</p>
         <div class='GoldRank'>
           <div class='menu'>
               <div v-for="(gameName,index) in gameNames" @click="selected(index,gameName)" :class="{activesOne: index == gameNameIndex}">
                 <p class="collectionOne" :class='{collectionOneClass: index == gameNameIndex}'>{{gameName.gameNameOne}}</p>
                 <p class="collectionTow" :class='{collectionTowClass: index == gameNameIndex}'>{{gameName.gameNameTow}}</p>
                 <p class="collectionThree" :class='{collectionThreeClass: index == gameNameIndex}'>{{gameName.gameNameThree}}</p>
               </div>
           </div>
         </div>
         <div>
           <x-button class="GoldJoinBtn" @click.native="showPosition('middle')" type="primary"
            :class="{YesGoldJoinImmediatelyBtn:GoldCorrectPicShow==true,NoGoldJoinImmediatelyBtn:GoldCorrectPicShow==false}"
           >立即加入</x-button> 
         </div>
         <div class="GoldTransactionContract">
             <div @click="GoldTransactionContractClick" :style="' border: 1px solid '+GoldBorderColor"><div v-show="GoldCorrectPicShow" class="GoldCorrectPic"></div></div><span>已阅读并同意</span><span  @click="jumpMinerAgreement">《云矿工交易协议》</span>
         </div>
         <toast width="14em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text=GoldJoinManagementText :position="position">{{('Basic Usage') }}</toast>
     </div>
     <div @click="jumpDetailsPage" class="GoldDetailsFooter"> <span><img src="../../static/img/finger.png" alt=""></span> 点击查看更多详情</div>
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
      GoldJoinManagementText: "", //错误提示文本

      GoldComputingPrice: "",
      GoldComputingEverydayProfitOne: "",
      GoldComputingEverydayProfitTow: "",
      GoldLeaseProgressBarWidth: 0,
      GoldLeaseProgressBarT: "",
      GoldCheckState: 0,
      GoldStatus: "",
      GoldRank: "",
      GoldRankname: "",
      GoldCorrectPicShow: true,
      GoldBorderColor: "#0287ff",
      gameNames: [
        {
          gameNameOne: "初级黄金",
          gameNameTow: "合约单位:1.4T",
          gameNameThree: "开启黄金一级收益"
        },
        {
          gameNameOne: "中级黄金",
          gameNameTow: "合约单位:2.4T",
          gameNameThree: "开启黄金二级收益"
        },
        {
          gameNameOne: "高级黄金",
          gameNameTow: "合约单位:4.4T",
          gameNameThree: "开启黄金三级收益"
        }
      ],
      gameNameIndex: 0,
      gameNameing: "初级黄金",
      rankIndex: 1,

      GoldClass: ""
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
              this.GoldClass = data.data.userStep;
              this.GoldRank = data.data.userGrade;

              if (data.data.userGrade == 2) {
                if (data.data.userStep == 1) {
                  this.GoldRankname = "初级白银";
                } else if (data.data.userStep == 2) {
                  this.GoldRankname = "中级白银";
                } else {
                  this.GoldRankname = "高级白银";
                }
              } else if (data.data.userGrade == 3) {
                if (data.data.userStep == 1) {
                  this.GoldRankname = "初级黄金";
                } else if (data.data.userStep == 2) {
                  this.GoldRankname = "中级黄金";
                } else {
                  this.GoldRankname = "高级黄金";
                }
              } else if (data.data.userGrade == 4) {
                if (data.data.userStep == 1) {
                  this.GoldRankname = "初级钻石";
                } else if (data.data.userStep == 2) {
                  this.GoldRankname = "中级钻石";
                } else {
                  this.GoldRankname = "高级钻石";
                }
              } else {
                this.GoldRankname = "大众矿工";
              }

              if (this.GoldRank > 3) {
                this.position = position;
                this.showPositionValue = true;
                this.GoldJoinManagementText =
                  "你已经是" +
                  this.GoldRankname +
                  "矿工" +
                  "，不能再加入" +
                  this.gameNameing +
                  "矿工";
              } else if (this.GoldRank == 3) {
                if (this.GoldClass == 3) {
                  this.position = position;
                  this.showPositionValue = true;
                  this.GoldJoinManagementText =
                    "你已经是" +
                    this.GoldRankname +
                    "矿工" +
                    "，不能再加入" +
                    this.gameNameing +
                    "矿工";
                } else if (this.GoldClass == 1) {
                  if (this.rankIndex == 1) {
                    this.position = position;
                    this.showPositionValue = true;
                    this.GoldJoinManagementText =
                      "你已经是" +
                      this.GoldRankname +
                      "矿工" +
                      "，不能再加入" +
                      this.gameNameing +
                      "矿工";
                  } else {
                    if (this.rankIndex == 2) {
                      this.$router.push(
                        "/OrderDetails/3/2.4/" +
                          this.GoldComputingPrice +
                          "/" +
                          this.GoldLeaseProgressBarT +
                          "/" +
                          this.rankIndex +
                          "/" +
                          this.gameNameing
                      );
                    } else if (this.rankIndex == 3) {
                      this.$router.push(
                        "/OrderDetails/3/4.4/" +
                          this.GoldComputingPrice +
                          "/" +
                          this.GoldLeaseProgressBarT +
                          "/" +
                          this.rankIndex +
                          "/" +
                          this.gameNameing
                      );
                    }
                    // this.$router.push("/MinersJoin/3/" + this.rankIndex);
                  }
                } else if (this.GoldClass == 2) {
                  if (this.rankIndex == 1 || this.rankIndex == 2) {
                    this.position = position;
                    this.showPositionValue = true;
                    this.GoldJoinManagementText =
                      "你已经是" +
                      this.GoldRankname +
                      "矿工" +
                      "，不能再加入" +
                      this.gameNameing +
                      "矿工";
                  } else {
                    // this.$router.push("/MinersJoin/3/" + this.rankIndex);
                    this.$router.push(
                      "/OrderDetails/3/4.4/" +
                        this.GoldComputingPrice +
                        "/" +
                        this.GoldLeaseProgressBarT +
                        "/" +
                        this.rankIndex +
                        "/" +
                        this.gameNameing
                    );
                  }
                }
              } else {
                if (this.rankIndex == 1) {
                  this.$router.push(
                    "/OrderDetails/3/1.4/" +
                      this.GoldComputingPrice +
                      "/" +
                      this.GoldLeaseProgressBarT +
                      "/" +
                      this.rankIndex +
                      "/" +
                      this.gameNameing
                  );
                } else if (this.rankIndex == 2) {
                  this.$router.push(
                    "/OrderDetails/3/2.4/" +
                      this.GoldComputingPrice +
                      "/" +
                      this.GoldLeaseProgressBarT +
                      "/" +
                      this.rankIndex +
                      "/" +
                      this.gameNameing
                  );
                } else if (this.rankIndex == 3) {
                  this.$router.push(
                    "/OrderDetails/3/4.4/" +
                      this.GoldComputingPrice +
                      "/" +
                      this.GoldLeaseProgressBarT +
                      "/" +
                      this.rankIndex +
                      "/" +
                      this.gameNameing
                  );
                }
                // this.$router.push("/MinersJoin/3/" + this.rankIndex);
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
    //切换黄金等级
    selected: function(index, gameName) {
      this.gameNameIndex = index;
      this.rankIndex = index + 1;
      this.gameNameing = gameName.gameNameOne;
    },
    //放回上一级
    BackUpperStory() {
      this.$router.push("/Home/Index/1");
    },
    //输入框获取焦点下边框变蓝色
    GoldPurchasingInputFocus() {
      this.GoldPurchasingBottomBolor = "#0287ff";
    },
    //交易协议
    GoldTransactionContractClick() {
      this.GoldCheckState++;
      if (this.GoldCheckState % 2 !== 0) {
        this.GoldCorrectPicShow = false;
        this.GoldBorderColor = "#b8b8b8";
      } else if (this.GoldCheckState % 2 == 0) {
        this.GoldCorrectPicShow = true;
        this.GoldBorderColor = "#0287ff";
      }
    },
    //跳转到详情页
    jumpDetailsPage() {
      this.$router.push("/DetailsPage/3");
    },
    jumpMinerAgreement() {
      this.$router.push("/MinerAgreement");
    },
    //获取BTC信息接口
    GoldDetailsFunction() {
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
          this.GoldComputingPrice = data.data.everyCalculatePrice;
          this.GoldComputingEverydayProfitOne =
            data.data.everydayExpectProfitCNY;
          this.GoldComputingEverydayProfitTow =
            data.data.everydayExpectProfitBTC;
          this.GoldLeaseProgressBarT = data.data.surplusCalculate;
          this.GoldLeaseProgressBarWidth =
            data.data.surplusCalculate / 5000 * 100;
          if (this.GoldLeaseProgressBarWidth >= 100) {
            this.GoldLeaseProgressBarWidth = 100;
            this.GoldLeaseProgressBarT = 0;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.GoldDetailsFunction();
  }
};
</script>
<style scoped>
.GoldDetailsBottom {
  width: 702px;
  margin: 0 auto;
  padding-top: 50px;
}
.GoldRank {
  width: 702px;
  padding-top: 50px;
}
.GoldRank > div {
  width: 702px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.GoldRank > div > div {
  font-size: 28px;
  color: #949494;
  width: 218px;
  background: #fff;
  text-align: center;
  border-radius: 2px;
  padding-top: 50px;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
}
.GoldDetailsMain {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.GoldDetailsHeader {
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
.GoldDetailsHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldDetailsHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.GoldDetailsBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.GoldDetailsHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.GoldComputingPowerLease {
  background: #fff;
  margin-top: 108px;
  padding: 50px 24px;
  font-size: 0;
  /* border-bottom: 1px solid #dfdfdf; */
}
.GoldComputingPowerLeaseTitle {
  padding: 0;
  margin: 0;
  font-size: 28px;
  color: #373d41;
  border-left: 8px solid #0287ff;
  padding-left: 10px;
  /* border-left: 6px solid #0287ff;
  padding-left: 10px; */
}
.GoldComputingPowerLeaseTable {
  width: 702px;
  margin-top: 30px;
  margin-bottom: 50px;
}
.GoldComputingPowerLeaseTable:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldComputingPowerLeaseTable > div {
  float: left;
}
.GoldComputingPowerLeaseTable > div:nth-child(1) {
  width: 275px;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-right: 0;
  padding: 85px 0;
}
.GoldComputingPowerLeaseTable > div:nth-child(1) > p {
  text-align: center;
}
.GoldComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(1) {
  font-size: 24px;
  color: #949494;
}
.GoldComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(2) {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  margin-top: 45px;
}
.GoldComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(2) > span {
  font-size: 24px;
  color: #373d41;
  font-weight: bolder;
}
.GoldComputingPowerLeaseTable > div:nth-child(2) > ul > li {
  padding: 30px 0;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  width: 427px;
}
.GoldComputingPowerLeaseTable > div:nth-child(2) > ul > li:nth-child(1) {
  border-bottom: 0;
}
.GoldComputingPowerLeaseTable > div:nth-child(2) > ul > li > p {
  padding-left: 120px;
}
.GoldComputingPowerLeaseTable > div:nth-child(2) > ul > li > p:nth-child(1) {
  font-size: 24px;
  color: #949494;
}
.GoldComputingPowerLeaseTable > div:nth-child(2) > ul > li > p:nth-child(2) {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  margin-top: 18px;
}
.GoldComputingPowerLeaseTable
  > div:nth-child(2)
  > ul
  > li
  > p:nth-child(2)
  > span {
  font-size: 24px;
  color: #373d41;
  font-weight: bolder;
}
.GoldLeaseProgressBar:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldLeaseProgressBar > div {
  float: left;
}
.GoldLeaseProgressBar > div:nth-child(1) {
  font-size: 28px;
  color: #949494;
}
.GoldLeaseProgressBar > div:nth-child(2) {
  height: 25px;
  width: 400px;
  border-radius: 13px;
  border: 0;
  box-sizing: border-box;
  position: relative;
  margin-left: 45px;
  background: #eaeaea;
}
.GoldLeaseProgressBar > div:nth-child(2) > div {
  height: 100%;
  border-radius: 12px;
  background: #0260b3;
}
.GoldLeaseProgressBar > div:nth-child(3) {
  font-size: 28px;
  color: #373d41;
  float: right;
}
.GoldDetailsBottom {
  background: #fff;
  padding: 50px 24px;
  margin-top: 20px;
  /* border-bottom: 1px solid #dfdfdf; */
}
.GoldDetailsBottom > p:nth-child(1) {
  color: #373d41;
  font-size: 28px;
  border-left: 8px solid #0287ff;
  padding-left: 10px;
}
.GoldDetailsBottom > div:nth-child(3) {
  width: 600px;
  height: 88px;
  margin: auto;
  margin-top: 50px;
}
.GoldDetailsBottom > div:nth-child(3) > button {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  border: 0;
  font-size: 28px;
}
.GoldDetailsBottom > div:nth-child(3) > button:focus {
  outline: 0;
}
.GoldTransactionContract {
  margin-top: 30px;
  position: relative;
}
.GoldTransactionContract:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GoldTransactionContract > div:nth-child(1) {
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
.GoldTransactionContract > span {
  font-size: 24px;
}
.GoldTransactionContract > span:nth-child(2) {
  color: #949494;
  margin-left: 200px;
}
.GoldTransactionContract > span:nth-child(3) {
  color: #0287ff;
}
.YesGoldJoinImmediatelyBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.NoGoldJoinImmediatelyBtn {
  pointer-events: none;
  background: #eee;
  color: #949494;
}
.GoldDetailsFooter {
  font-size: 24px;
  color: #949494;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 100px;
  background: #f5f5f8;
}
.GoldCorrectPic {
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
.GoldDetailsFooter > span {
  display: inline-block;
  width: 16px;
  height: 24px;
}
.GoldDetailsFooter > span > img {
  width: 100%;
  height: 100%;
}
.weui-btn:after {
  border: 0;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  background-color: #0260b2 !important;
}
.collectionOne {
  padding-bottom: 30px;
  color: #949494;
  font-size: 26px;
  font-weight: bolder;
}
.collectionTow {
  color: #949494;
  font-size: 20px;
  padding-bottom: 50px;
}
.collectionThree {
  color: #b8b8b8;
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  background: #eaeaea;
}
.activesOne {
  border: 1px solid #0287ff !important;
}
.collectionOneClass {
  color: #0287ff !important;
}
.collectionTowClass {
  color: #0287ff !important;
}
.collectionThreeClass {
  background: #0287ff;
  color: #fff;
}
</style>


