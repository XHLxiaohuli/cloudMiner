<template>
    <div class="DiamondsDetailsMain">
     <div class="DiamondsDetailsHeader">
       <div class="DiamondsDetailsHeaderLeft">
         <div class="DiamondsDetailsBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="DiamondsDetailsHeaderText">钻石矿工</div>
     </div>
     <div class="DiamondsComputingPowerLease">
         <h1 class="DiamondsComputingPowerLeaseTitle">云算力租赁</h1>
         <div class="DiamondsComputingPowerLeaseTable">
             <div>
                 <p>每T算力价格</p>
                 <p>{{DiamondsComputingPrice}}<span>元</span></p>
             </div>
             <div>
                 <ul>
                     <li>
                         <p>每日每T预计收益</p>
                         <p>{{DiamondsComputingEverydayProfitOne}}<span>元</span></p>
                     </li>
                     <li>
                         <p>每日每T预计收益</p>
                         <p>{{DiamondsComputingEverydayProfitTow}}<span>BTC</span></p>
                     </li>
                 </ul>
             </div>
         </div>
         <div class="DiamondsLeaseProgressBar">
             <div>剩余算力</div>
             <div>
                 <div :style="'width:'+DiamondsLeaseProgressBarWidth+'%'"></div>
             </div>
             <div>{{DiamondsLeaseProgressBarT}}T</div>
         </div>
     </div>
     <div class="DiamondsDetailsBottom">
         <p>购买算力等级</p>
         <div class='DiamondsRank'>
           <div class='menu'>
               <div  class="collection-item" v-for="(gameName,index) in gameNames" @click="selected(index,gameName)" :class="{actives: activeIndex == index}">
                 <p class="DiamondsA" :class="{activesOne: activeIndex == index}">{{gameName.GameOne}}</p>
                 <p class="DiamondsB" :class="{activesTow: activeIndex == index}">{{gameName.GameTow}}</p>
                 <p class="DiamondsC" :class="{activesThree: activeIndex == index}">{{gameName.GameThree}}</p>
               </div>
           </div>
         </div>
         <div>
           <x-button class="DiamondsJoinBtn" @click.native="showPosition('middle')" type="primary"
            :class="{YesDiamondsJoinImmediatelyBtn:DiamondsCorrectPicShow==true,NoDiamondsJoinImmediatelyBtn:DiamondsCorrectPicShow==false}"
           >立即加入</x-button> 
         </div>
         <div class="DiamondsTransactionContract">
             <div :style="' border: 1px solid '+DiamondsBorderColor" @click="DiamondsTransactionContractClick"><div v-show="DiamondsCorrectPicShow" class="DiamondsCorrectPic" ></div></div><span>已阅读并同意</span><span   @click="jumpMinerAgreement">《云矿工交易协议》</span>
         </div>
     </div>
     <toast width="14em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text=DiamondsJoinManagementText :position="position">{{('Basic Usage') }}</toast>
     <div @click="jumpDetailsPage" class="DiamondsDetailsFooter"> <span><img src="../../static/img/finger.png" alt=""></span> 点击查看更多详情</div>
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
      checknot: false,
      showPositionValue: false,
      position: "",
      DiamondsJoinManagementText: "", //错误提示文本

      DiamondsBorderColor: "#0287ff", //底部协议圆圈边框
      DiamondsComputingPrice: "",
      DiamondsComputingEverydayProfitOne: "",
      DiamondsComputingEverydayProfitTow: "",
      DiamondsLeaseProgressBarWidth: 0,
      DiamondsLeaseProgressBarT: "",
      DiamondsCheckState: 0,
      DiamondsStatus: "",
      DiamondsRank: "",
      DiamondsRankname: "",
      DiamondsCorrectPicShow: true,
      gameNames: [
        {
          GameOne: "初级钻石",
          GameTow: "合约单位:14.4T",
          GameThree: "开启钻石一级收益"
        },
        {
          GameOne: "中级钻石",
          GameTow: "合约单位:24.4T",
          GameThree: "开启钻石二级收益"
        },
        {
          GameOne: "高级钻石",
          GameTow: "合约单位:44.4T",
          GameThree: "开启钻石三级收益"
        }
      ],
      activeIndex: 0,
      activeNameing: "初级钻石",
      rankIndex: 1,

      DiamondsClass: ""
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
              this.DiamondsClass = data.data.userStep;
              this.DiamondsRank = data.data.userGrade;

              if (data.data.userGrade == 2) {
                if (data.data.userStep == 1) {
                  this.DiamondsRankname = "初级白银";
                } else if (data.data.userStep == 2) {
                  this.DiamondsRankname = "中级白银";
                } else {
                  this.DiamondsRankname = "高级白银";
                }
              } else if (data.data.userGrade == 3) {
                if (data.data.userStep == 1) {
                  this.DiamondsRankname = "初级黄金";
                } else if (data.data.userStep == 2) {
                  this.DiamondsRankname = "中级黄金";
                } else {
                  this.DiamondsRankname = "高级黄金";
                }
              } else if (data.data.userGrade == 4) {
                if (data.data.userStep == 1) {
                  this.DiamondsRankname = "初级钻石";
                } else if (data.data.userStep == 2) {
                  this.DiamondsRankname = "中级钻石";
                } else {
                  this.DiamondsRankname = "高级钻石";
                }
              } else {
                this.DiamondsRankname = "大众矿工";
              }

              if (this.DiamondsRank == 4) {
                if (this.DiamondsClass == 1) {
                  if (this.rankIndex == 1) {
                    this.position = position;
                    this.showPositionValue = true;
                    this.DiamondsJoinManagementText =
                      "你已经是" +
                      this.DiamondsRankname +
                      "，不能再加入" +
                      this.activeNameing +
                      "矿工";
                  } else if (this.rankIndex == 2) {
                    if (this.rankIndex == 2) {
                      this.$router.push(
                        "/OrderDetails/4/14.4/" +
                          this.DiamondsComputingPrice +
                          "/" +
                          this.DiamondsLeaseProgressBarT +
                          "/" +
                          this.rankIndex +
                          "/" +
                          this.activeNameing
                      );
                    } else if (this.rankIndex == 3) {
                      this.$router.push(
                        "/OrderDetails/4/24.4/" +
                          this.DiamondsComputingPrice +
                          "/" +
                          this.DiamondsLeaseProgressBarT +
                          "/" +
                          this.rankIndex +
                          "/" +
                          this.activeNameing
                      );
                    }
                    // this.$router.push("/MinersJoin/4/" + this.rankIndex);
                  }
                } else if (this.DiamondsClass == 2) {
                  if (this.rankIndex == 1 || this.rankIndex == 2) {
                    this.position = position;
                    this.showPositionValue = true;
                    this.DiamondsJoinManagementText =
                      "你已经是" +
                      this.DiamondsRankname +
                      "，不能再加入" +
                      this.activeNameing +
                      "矿工";
                  } else {
                    this.$router.push(
                      "/OrderDetails/4/24.4/" +
                        this.DiamondsComputingPrice +
                        "/" +
                        this.DiamondsLeaseProgressBarT +
                        "/" +
                        this.rankIndex +
                        "/" +
                        this.activeNameing
                    );
                    // this.$router.push("/MinersJoin/4/" + this.rankIndex);
                  }
                } else if (this.DiamondsClass == 3) {
                  this.position = position;
                  this.showPositionValue = true;
                  this.DiamondsJoinManagementText =
                    "你已经是" +
                    this.DiamondsRankname +
                    "，不能再加入" +
                    this.activeNameing +
                    "矿工";
                }
              } else {
                if (this.rankIndex == 1) {
                  this.$router.push(
                    "/OrderDetails/4/14.4/" +
                      this.DiamondsComputingPrice +
                      "/" +
                      this.DiamondsLeaseProgressBarT +
                      "/" +
                      this.rankIndex +
                      "/" +
                      this.activeNameing
                  );
                } else if (this.rankIndex == 2) {
                  this.$router.push(
                    "/OrderDetails/4/24.4/" +
                      this.DiamondsComputingPrice +
                      "/" +
                      this.DiamondsLeaseProgressBarT +
                      "/" +
                      this.rankIndex +
                      "/" +
                      this.activeNameing
                  );
                } else if (this.rankIndex == 3) {
                  this.$router.push(
                    "/OrderDetails/4/44.4/" +
                      this.DiamondsComputingPrice +
                      "/" +
                      this.DiamondsLeaseProgressBarT +
                      "/" +
                      this.rankIndex +
                      "/" +
                      this.activeNameing
                  );
                }
                // this.$router.push("/MinersJoin/4/" + this.rankIndex);
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
    //切换钻石等级
    selected: function(index, gameName) {
      this.activeIndex = index;
      this.rankIndex = index + 1;
      this.activeNameing = gameName.GameOne;
    },
    //放回上一级
    BackUpperStory() {
      this.$router.push("/Home/Index/1");
    },
    //输入框获取焦点下边框变蓝色
    DiamondsPurchasingInputFocus() {
      this.DiamondsPurchasingBottomBolor = "#0287ff";
    },
    //交易协议
    DiamondsTransactionContractClick() {
      this.DiamondsCheckState++;
      if (this.DiamondsCheckState % 2 !== 0) {
        this.DiamondsCorrectPicShow = false;
        this.DiamondsBorderColor = "#b8b8b8";
      } else if (this.DiamondsCheckState % 2 == 0) {
        this.DiamondsCorrectPicShow = true;
        this.DiamondsBorderColor = "#0287ff";
      }
    },
    //跳转到详情页
    jumpDetailsPage() {
      this.$router.push("/DetailsPage/4");
    },
    jumpMinerAgreement() {
      this.$router.push("/MinerAgreement");
    },
    //获取BTC信息接口
    DiamondsDetailsFunction() {
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
          this.DiamondsComputingPrice = data.data.everyCalculatePrice;
          this.DiamondsComputingEverydayProfitOne =
            data.data.everydayExpectProfitCNY;
          this.DiamondsComputingEverydayProfitTow =
            data.data.everydayExpectProfitBTC;
          this.DiamondsLeaseProgressBarT = data.data.surplusCalculate;
          this.DiamondsLeaseProgressBarWidth =
            data.data.surplusCalculate / 5000 * 100;
          if (this.DiamondsLeaseProgressBarWidth >= 100) {
            this.DiamondsLeaseProgressBarWidth = 100;
            this.DiamondsLeaseProgressBarT = 0;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.DiamondsDetailsFunction();
  }
};
</script>
<style scoped>
.DiamondsDetailsBottom .DiamondsRank {
  padding-top: 50px;
}
.DiamondsRank > div {
  width: 702px;
  background: #fff;
  display: flex;
  justify-content: space-between;
}
.DiamondsRank > div > div {
  font-size: 28px;
  color: #949494;
  width: 218px;
  padding-top: 50px;
  text-align: center;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
}
.DiamondsDetailsMain {
  position: absolute;
  height: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.DiamondsDetailsHeader {
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
.DiamondsDetailsHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondsDetailsHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.DiamondsDetailsBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.DiamondsDetailsHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.DiamondsComputingPowerLease {
  font-size: 0;
  background: #fff;
  margin-top: 108px;
  padding: 50px 24px;
  /* border-bottom: 1px solid #dfdfdf; */
}
.DiamondsComputingPowerLeaseTitle {
  padding: 0;
  margin: 0;
  font-size: 28px;
  color: #373d41;
  border-left: 8px solid #0287ff;
  padding-left: 10px;
  /* border-left: 6px solid #0287ff;
  padding-left: 10px; */
}
.DiamondsComputingPowerLeaseTable {
  width: 702px;
  margin-top: 30px;
  margin-bottom: 50px;
}
.DiamondsComputingPowerLeaseTable:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondsComputingPowerLeaseTable > div {
  float: left;
}
.DiamondsComputingPowerLeaseTable > div:nth-child(1) {
  width: 275px;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-right: 0;
  padding: 85px 0;
}
.DiamondsComputingPowerLeaseTable > div:nth-child(1) > p {
  text-align: center;
}
.DiamondsComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(1) {
  font-size: 24px;
  color: #949494;
}
.DiamondsComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(2) {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  margin-top: 45px;
}
.DiamondsComputingPowerLeaseTable > div:nth-child(1) > p:nth-child(2) > span {
  font-size: 24px;
  color: #373d41;
  font-weight: bolder;
}
.DiamondsComputingPowerLeaseTable > div:nth-child(2) > ul > li {
  padding: 30px 0;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  width: 427px;
}
.DiamondsComputingPowerLeaseTable > div:nth-child(2) > ul > li:nth-child(1) {
  border-bottom: 0;
}
.DiamondsComputingPowerLeaseTable > div:nth-child(2) > ul > li > p {
  padding-left: 120px;
}
.DiamondsComputingPowerLeaseTable
  > div:nth-child(2)
  > ul
  > li
  > p:nth-child(1) {
  font-size: 24px;
  color: #949494;
}
.DiamondsComputingPowerLeaseTable
  > div:nth-child(2)
  > ul
  > li
  > p:nth-child(2) {
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  margin-top: 18px;
}
.DiamondsComputingPowerLeaseTable
  > div:nth-child(2)
  > ul
  > li
  > p:nth-child(2)
  > span {
  font-size: 24px;
  color: #373d41;
  font-weight: bolder;
}
.DiamondsLeaseProgressBar:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondsLeaseProgressBar > div {
  float: left;
}
.DiamondsLeaseProgressBar > div:nth-child(1) {
  font-size: 28px;
  color: #949494;
}
.DiamondsLeaseProgressBar > div:nth-child(2) {
  height: 25px;
  width: 400px;
  border-radius: 13px;
  border: 0;
  box-sizing: border-box;
  position: relative;
  margin-left: 45px;
  background: #eaeaea;
}
.DiamondsLeaseProgressBar > div:nth-child(2) > div {
  height: 100%;
  border-radius: 12px;
  background: #0260b3;
}
.DiamondsLeaseProgressBar > div:nth-child(3) {
  font-size: 28px;
  color: #373d41;
  float: right;
}
.DiamondsDetailsBottom {
  background: #fff;
  padding: 50px 24px;
  margin-top: 20px;
  font-size: 0;
  /* border-bottom: 1px solid #dfdfdf; */
}
.DiamondsDetailsBottom > p:nth-child(1) {
  color: #373d41;
  font-size: 28px;
  border-left: 8px solid #0287ff;
  padding-left: 10px;
}
.DiamondsDetailsBottom > div:nth-child(3) {
  width: 600px;
  height: 88px;
  margin: auto;
  margin-top: 50px;
}
.DiamondsDetailsBottom > div:nth-child(3) > button {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  border: 0;
  font-size: 28px;
}
.DiamondsDetailsBottom > div:nth-child(3) > button:focus {
  outline: 0;
}
.DiamondsTransactionContract {
  margin-top: 30px;
  position: relative;
}
.DiamondsTransactionContract:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DiamondsTransactionContract > div:nth-child(1) {
  display: inline-block;
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
.DiamondsTransactionContract > span {
  font-size: 24px;
}
.DiamondsTransactionContract > span:nth-child(2) {
  color: #949494;
  margin-left: 200px;
}
.DiamondsTransactionContract > span:nth-child(3) {
  color: #0287ff;
}
.YesDiamondsJoinImmediatelyBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.NoDiamondsJoinImmediatelyBtn {
  pointer-events: none;
  background: #eee;
  color: #949494;
}
.DiamondsDetailsFooter {
  font-size: 24px;
  color: #949494;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 100px;
  background: #f5f5f8;
}
.DiamondsCorrectPic {
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
.DiamondsDetailsFooter > span {
  display: inline-block;
  width: 16px;
  height: 24px;
}
.DiamondsDetailsFooter > span > img {
  width: 100%;
  height: 100%;
}
.weui-btn:after {
  border: 0;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  background-color: #0260b2 !important;
}
.DiamondsA {
  padding-bottom: 30px;
  color: #949494;
  font-size: 26px;
  font-weight: bolder;
}
.DiamondsB {
  padding-bottom: 50px;
  color: #949494;
  font-size: 20px;
}
.DiamondsC {
  color: #b8b8b8;
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  background: #eaeaea;
}
.actives {
  border: 1px solid #0287ff !important;
}
.activesOne {
  color: #0287ff;
}
.activesTow {
  color: #0287ff;
}
.activesThree {
  color: #fff;
  background: #0287ff;
}
</style>


