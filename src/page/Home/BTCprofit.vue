<!--作者:var-->
<template>
  <div>
      <ul class="GradeProfitNav">
        <li v-for="(item,index) in GradeProfit" :class='{YesGradeProfitNav:index==GradeProfitIndex}' @click="GradeProfitClick(index,item)">{{item}}</li>
      </ul>
      <div class="BtcProfit">
          <p class="BtcYesterdayProfit">昨日收益(BTC)</p>
          <p class="BtcYesterdayProfitNum">{{BtcYesterdayProfitData}}</p>
          <p class="BtcApproximatelyEqualTo">≈{{ApproximatelyEqualToCny}}CNY</p>
         <ul class="BtcAllProfitTitle">
              <li v-for="item in BtcAllProfitText">{{item}}</li>
          </ul> 
          <!--为了填充空间start-->
          <ul class="FillingSpace">
              <li></li>
              <li></li>
              <li></li>
          </ul>
          <!--为了填充空间end-->
          <ul class="BtcProfitTitleNum">
              <li>{{BtcCumulativeIncome}}</li>
              <li>{{BtcMyPowerOfCalculation}}</li>
              <li>{{BtcNumberOfInvitations}}</li>
          </ul>
          <div class="BtcPromoteTitelDiv">
            <div class="BtcPromoteTitel" v-show="PurchaseProgressBar">回本进度：{{PercentageCostrate}}%</div>
            <div class="BtcPromoteTitel" v-show="FrozenProgressBar">收益将在加入{{GradeName}}矿工后享有并重新累计</div>
          </div>
      </div>
      <ul class="BtcProfitList">
        <li class="BtcProfitListLi" v-show="MassAgent">
          <div class="BtcProfitListLiLeft">
            <p>大众矿工</p>
            <p>{{PublicBtc}}T</p>
          </div>
          <div class="BtcProfitListLiRight">
            <p>昨日收益</p>
            <p>{{BtcZeroYesterdayProfit}} <span class="BtcProfitBtc">BTC</span></p>
            <p>≈{{BtcZeroYesterdayCNY}} CNY</p>
          </div>
        </li>
        <li class="BtcProfitListLi TowGoldFrozenOne" v-show="FirstLevelAgent">
          <div class="BtcProfitListLiLeft">
            <p>一级代理</p>
            <p>{{BtcOneAgentPeople}}人</p>
          </div>
          <div class="BtcProfitListLiRight">
            <p>昨日收益</p>
            <p :class='{AchieveGrade:FirstStageInactivation}'>{{BtcOneYesterdayProfit}} <span :class='{AchieveGrade:FirstStageInactivation}' class="BtcProfitBtc">BTC</span></p>
            <p>≈{{BtcOneYesterdayCNY}} CNY</p>
          </div>
          <div class="OneGoldFrozen" v-show="FirstStageInactivation"></div>
          <div class="OneeeGoldNotice" @click="OneeeGoldNoticeClick" v-show="OneFrozenExclamationMark"></div>
          <div class="OneeeGoldTitle" v-show="FirstFrozenText">
            <div>{{OneeeGoldTitleText}}</div>
            <div></div>
          </div>
        </li>
        <li class="BtcProfitListLi TowGoldFrozenTow" v-show="TwoLevelAgent">
          <div class="BtcProfitListLiLeft">
            <p>二级代理</p>
            <p>{{BtcTowAgentPeople}}人</p>
          </div>
          <div class="BtcProfitListLiRight">
            <p>昨日收益</p>
            <p :class='{AchieveGrade:TwoStageInactivation}'>{{BtcTowYesterdayProfit}} <span :class='{AchieveGrade:TwoStageInactivation}' class="BtcProfitBtc">BTC</span></p>
            <p>≈{{BtcTowYesterdayCNY}} CNY</p>
          </div>
          <div class="TowGoldFrozen" v-show="TwoStageInactivation"></div>
          <div class="ToweeGoldNotice"  @click="ToweeGoldNoticeClick" v-show="TowFrozenExclamationMark"></div>
          <div class="ToweeGoldTitle" v-show="SecondFrozenText">
            <div>{{ToweeGoldTitleText}}</div>
            <div></div>
          </div>
        </li>
        <li class="BtcProfitListLi ThreeGoldFrozenTow" v-show="ThreeLevelAgent">
          <div class="BtcProfitListLiLeft">
            <p>三级代理</p>
            <p>{{BtcThreeAgentPeople}}人</p>
          </div>
          <div class="BtcProfitListLiRight">
            <p>昨日收益</p>
            <p :class='{AchieveGrade:ThreeStageInactivation}'>{{BtcThreeYesterdayProfit}} <span :class='{AchieveGrade:ThreeStageInactivation}' class="BtcProfitBtc">BTC</span></p>
            <p>≈{{BtcThreeYesterdayCNY}} CNY</p>
          </div>
          <div class="ThreeGoldFrozen" v-show="ThreeStageInactivation"></div>
          <div class="ThreeGoldNotice"  @click="ThreeGoldNoticeClick" v-show="ThreeFrozenExclamationMark"></div>
          <div class="ThreeGoldTitle" v-show="ThirdFrozenText">
            <div>{{ThreeeeGoldTitleText}}</div>
            <div></div>
          </div>
        </li>
      </ul>
      <div class="footJoinImmediately" v-show="AddSilverImmediately">想要提高收益? <span @click="jumpSliver">立即加入</span>白银矿工吧!</div>
      <!--没有买过的start-->
      <div class="NotBought" v-show="JoinImmediately">
        <p>开启您的挖矿之旅吧~</p>
        <div>
          <button  @click="jumpSliver">立即加入</button>
        </div>
      </div>
      <!--没有买过的end-->
      <div class="footFill" ></div>
      <div class="footFill"></div>
      <div class="profitMask" v-show="profitMaskShow" @click="profitMaskClick"></div>
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import myFunction from '@/page/encryption/encryption'
export default {
  components: {
    myFunction
  },
  data() {
    return {
      BtcYesterdayProfitData: "",
      ApproximatelyEqualToCny: "",
      BtcAllProfitText: ["累计收益(BTC)", "邀请算力(T)", "邀请人数(人)"],
      BtcCumulativeIncome: "",
      BtcMyPowerOfCalculation: "",
      BtcNumberOfInvitations: "",
      PublicBtc: "",
      BtcOneAgentPeople: "",
      BtcTowAgentPeople: "",
      BtcThreeAgentPeople: "",
      BtcZeroYesterdayProfit: "",
      BtcOneYesterdayProfit: "",
      BtcTowYesterdayProfit: "",
      BtcThreeYesterdayProfit: "",
      BtcProfitrank: "",
      BtcProfitBuy: "",
      BtcProfitPrice: "",
      PercentageCostrate: "",
      profitMaskShow: false, //遮罩层
      OneeeGoldTitleText: "",
      ToweeGoldTitleText: "",
      ThreeeeGoldTitleText: "",
      GradeProfit: ["全部", "大众", "白银", "黄金", "钻石"],
      GradeName: "",
      GradeProfitIndex: 0, //收益页面导航条对应显示
      BackgroundNeedsLevel: "", //提交给后台需要的等级
      BtcProfitClass: "", //用户当前等级是第几等阶
      myTime: "",
      BtcZeroYesterdayCNY: "",
      BtcOneYesterdayCNY: "",
      BtcTowYesterdayCNY: "",
      BtcThreeYesterdayCNY: "",
      BtcProfitPrice: "",
      //全部，大众，白银，黄金，钻石页面的显示隐藏start
      MassAgent: false, //大众代理显示隐藏
      FirstLevelAgent: false, //一级代理显示隐藏
      TwoLevelAgent: false, //二级代理显示隐藏
      ThreeLevelAgent: false, //三级代理显示隐藏
      PurchaseProgressBar: false, //已经购买进度条
      FrozenProgressBar: false, //冻结页面进度条
      AddSilverImmediately: false, //立即加入白银
      JoinImmediately: false, //立即购买加入
      FirstStageInactivation: false, //一级未激活图标
      TwoStageInactivation: false, //二级未激活图标
      ThreeStageInactivation: false, //三级未激活图标
      OneFrozenExclamationMark: false, //第一个冻结感叹号
      TowFrozenExclamationMark: false, //第二个冻结感叹号
      ThreeFrozenExclamationMark: false, //第三个冻结感叹号
      FirstFrozenText: false, //第一个冻结文本
      SecondFrozenText: false, //第二个冻结文本
      ThirdFrozenText: false //第三个冻结文本
      //全部，大众，白银，黄金，钻石页面的显示隐藏end
    };
  },
  methods: {
    //最顶部导航条
    GradeProfitClick(index, item) {
      this.profitMaskShow = false; //遮罩层
      this.GradeProfitIndex = index;
      this.GradeName = item;
      this.profitMaskShow = false;
      this.FirstFrozenText = false; //第一个冻结文本
      this.SecondFrozenText = false; //第二个冻结文本
      this.ThirdFrozenText = false; //第三个冻结文本
      this.BackgroundNeedsLevel = index; //将点击的下标保存到要传给后台的值
      this.BackgroundNeedsLevel++; //因下边比后台需要的值少1，所以需要加上1
      this.MembershipIncome(); //调用请求后台收益接口
    },
    //冻结弹出框
    OneeeGoldNoticeClick() {
      this.profitMaskShow = true;
      this.FirstFrozenText = true; //第一个冻结文本
      this.SecondFrozenText = false; //第二个冻结文本
      this.ThirdFrozenText = false; //第三个冻结文本
      if (this.GradeProfitIndex == 2) {
        this.OneeeGoldTitleText = "白银一级邀请收益在加入初级白银矿工后解锁";
      } else if (this.GradeProfitIndex == 3) {
        this.OneeeGoldTitleText = "黄金一级邀请收益在加入初级黄金矿工后解锁";
      } else if (this.GradeProfitIndex == 4) {
        this.OneeeGoldTitleText = "钻石一级邀请收益在加入初级钻石矿工后解锁";
      }
    },
    ToweeGoldNoticeClick() {
      this.profitMaskShow = true;
      this.FirstFrozenText = false; //第一个冻结文本
      this.SecondFrozenText = true; //第二个冻结文本
      this.ThirdFrozenText = false; //第三个冻结文本
      if (this.GradeProfitIndex == 2) {
        this.ToweeGoldTitleText = "白银二级邀请收益在加入中级白银矿工后解锁";
      } else if (this.GradeProfitIndex == 3) {
        this.ToweeGoldTitleText = "黄金二级邀请收益在加入中级黄金矿工后解锁";
      } else if (this.GradeProfitIndex == 4) {
        this.ToweeGoldTitleText = "钻石二级邀请收益在加入中级钻石矿工后解锁";
      }
    },
    ThreeGoldNoticeClick() {
      this.profitMaskShow = true;
      this.FirstFrozenText = false; //第一个冻结文本
      this.SecondFrozenText = false; //第二个冻结文本
      this.ThirdFrozenText = true; //第三个冻结文本
      if (this.GradeProfitIndex == 2) {
        this.ThreeeeGoldTitleText = "白银三级邀请收益在加入高级白银矿工后解锁";
      } else if (this.GradeProfitIndex == 3) {
        this.ThreeeeGoldTitleText = "黄金三级邀请收益在加入高级黄金矿工后解锁";
      } else if (this.GradeProfitIndex == 4) {
        this.ThreeeeGoldTitleText = "钻石三级邀请收益在加入高级钻石矿工后解锁";
      }
    },
    profitMaskClick() {
      this.profitMaskShow = false;
      this.FirstFrozenText = false; //第一个冻结文本
      this.SecondFrozenText = false; //第二个冻结文本
      this.ThirdFrozenText = false; //第三个冻结文本
    },
    //总收益信息接口
    MobileAllProfitFuction() {},
    jumpSliver() {
      this.$router.push("/SilverOfTheMassMiners");
      sessionStorage.setItem("key", 1);
    },
    //初始化等级对应
    initialGrade() {
      if (sessionStorage['userGrade'] == 1) {
        this.GradeProfitIndex = 1;
        this.BackgroundNeedsLevel = 2;
      } else if (sessionStorage['userGrade'] == 2) {
        this.GradeProfitIndex = 2;
        this.BackgroundNeedsLevel = 3;
      } else if (sessionStorage['userGrade'] == 3) {
        this.GradeProfitIndex = 3;
        this.BackgroundNeedsLevel = 4;
      } else if (sessionStorage['userGrade'] == 4) {
        this.GradeProfitIndex = 4;
        this.BackgroundNeedsLevel = 5;
      }
      this.MembershipIncome();
    },
    //判断当前等级代理收益是否处于冻结状态
    isFreezingState() {
      if (sessionStorage['userGrade'] < this.GradeProfitIndex) {
        this.FirstStageInactivation = true; //一级未激活图标
        this.TwoStageInactivation = true; //二级未激活图标
        this.ThreeStageInactivation = true; //三级未激活图标
        this.OneFrozenExclamationMark = true; //第一个冻结感叹号
        this.TowFrozenExclamationMark = true; //第二个冻结感叹号
        this.ThreeFrozenExclamationMark = true; //第三个冻结感叹号
      } else if (sessionStorage['userGrade'] == this.GradeProfitIndex) {
        if (sessionStorage['userStep'] == 1) {
          this.FirstStageInactivation = false; //一级未激活图标
          this.TwoStageInactivation = true; //二级未激活图标
          this.ThreeStageInactivation = true; //三级未激活图标
          this.OneFrozenExclamationMark = false; //第一个冻结感叹号
          this.TowFrozenExclamationMark = true; //第二个冻结感叹号
          this.ThreeFrozenExclamationMark = true; //第三个冻结感叹号
        } else if (sessionStorage['userStep'] == 2) {
          this.FirstStageInactivation = false; //一级未激活图标
          this.TwoStageInactivation = false; //二级未激活图标
          this.ThreeStageInactivation = true; //三级未激活图标
          this.OneFrozenExclamationMark = false; //第一个冻结感叹号
          this.TowFrozenExclamationMark = false; //第二个冻结感叹号
          this.ThreeFrozenExclamationMark = true; //第三个冻结感叹号
        } else if (sessionStorage['userStep'] == 3) {
          this.FirstStageInactivation = false; //一级未激活图标
          this.TwoStageInactivation = false; //二级未激活图标
          this.ThreeStageInactivation = false; //三级未激活图标
          this.OneFrozenExclamationMark = false; //第一个冻结感叹号
          this.TowFrozenExclamationMark = false; //第二个冻结感叹号
          this.ThreeFrozenExclamationMark = false; //第三个冻结感叹号
        }
      } else {
        this.FirstStageInactivation = false; //一级未激活图标
        this.TwoStageInactivation = false; //二级未激活图标
        this.ThreeStageInactivation = false; //三级未激活图标
        this.OneFrozenExclamationMark = false; //第一个冻结感叹号
        this.TowFrozenExclamationMark = false; //第二个冻结感叹号
        this.ThreeFrozenExclamationMark = false; //第三个冻结感叹号
      }

      if (
        //判断应该显示哪个进度条
        this.FirstStageInactivation == true &&
        this.TwoStageInactivation == true &&
        this.ThreeStageInactivation == true
      ) {
        this.PurchaseProgressBar = false; //已经购买进度条
        this.FrozenProgressBar = true; //冻结页面进度条
      } else {
        this.PurchaseProgressBar = true; //已经购买进度条
        this.FrozenProgressBar = false; //冻结页面进度条
      }
    },
    //会员收益接口
    MembershipIncome() {
      if (this.GradeProfitIndex == 0) {
        this.MassAgent = true; //大众代理显示隐藏
        this.FirstLevelAgent = true; //一级代理显示隐藏
        this.TwoLevelAgent = true; //二级代理显示隐藏
        this.ThreeLevelAgent = true; //三级代理显示隐藏
        this.FirstStageInactivation = false; //一级未激活图标
        this.TwoStageInactivation = false; //二级未激活图标
        this.ThreeStageInactivation = false; //三级未激活图标
        this.OneFrozenExclamationMark = false; //第一个冻结感叹号
        this.TowFrozenExclamationMark = false; //第二个冻结感叹号
        this.ThreeFrozenExclamationMark = false; //第三个冻结感叹号
        var myProfitRequestId=myFunction.myUuid()
        var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
        var myUserId=localStorage.getItem("userID")
        var myOptGrade=  this.BackgroundNeedsLevel //localStorage.getItem("userGrade")
        var myArr=["requestId="+myProfitRequestId,"userId="+myUserId,"optGrade="+myOptGrade]
        var myFunctionVaule=md5(myFunction.myFunction(myArr)+"/api/order/earning/memberEarning.do").toUpperCase()
        axios
          .post(
            "MembershipIncome",
            qs.stringify({
              userId: myUserId,
              optGrade:myOptGrade,
            }),{
              requestId:myProfitRequestId,
              timestamp:myTimestamp,
              channelType:"h5",
              sign:myFunctionVaule
            }
          )
          .then(data => {
            if (data.code == 200) {
                  this.BtcYesterdayProfitData=data.data.yesterdayIncomeBTC
                  this.ApproximatelyEqualToCny=data.data.yesterdayIncomeCNY 
                  this.BtcCumulativeIncome=data.data.totalIncomeBTC  
                  this.BtcMyPowerOfCalculation=data.data.inviteCalculate 
                  this.BtcNumberOfInvitations=data.data.totalAgencyNumber 
                  this.PublicBtc=data.data.publicCalculate 
                  this.BtcZeroYesterdayProfit=data.data.publicIncomeBTC 
                  this.BtcZeroYesterdayCNY=data.data.publicIncomeCNY 
                  this.BtcOneAgentPeople=data.data.oneAgencyNumber 
                  this.BtcOneYesterdayProfit=data.data.oneAgencyIncomeBTC 
                  this.BtcOneYesterdayCNY=data.data.oneAgencyIncomeCNY  
                  this.BtcTowAgentPeople=data.data.twoAgencyNumber 
                  this.BtcTowYesterdayProfit=data.data.twoAgencyIncomeBTC 
                  this.BtcTowYesterdayCNY=data.data.twoAgencyIncomeCNY
                  this.BtcThreeAgentPeople=data.data.threeAgencyNumber 
                  this.BtcThreeYesterdayProfit=data.data.threeAgencyIncomeBTC 
                  this.BtcThreeYesterdayCNY=data.data.threeAgencyIncomeCNY 
              
            } else if (data.code == 413) {
              this.$router.push("/Login/1");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.GradeProfitIndex == 1) {
        this.MassAgent = true; //大众代理显示隐藏
        this.FirstLevelAgent = false; //一级代理显示隐藏
        this.TwoLevelAgent = false; //二级代理显示隐藏
        this.ThreeLevelAgent = false; //三级代理显示隐藏
        var myProfitRequestId=myFunction.myUuid()
        var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
        var myUserId=localStorage.getItem("userID")
        var myOptGrade=  this.BackgroundNeedsLevel //localStorage.getItem("userGrade")
        var myArr=["requestId="+myProfitRequestId,"userId="+myUserId,"optGrade="+myOptGrade]
        var myFunctionVaule=md5(myFunction.myFunction(myArr)+"/api/order/earning/memberEarning.do").toUpperCase()
        axios
          .post(
            "MembershipIncome",
            qs.stringify({
              userId: myUserId,
              optGrade:myOptGrade,
            }),{
              requestId:myProfitRequestId,
              timestamp:myTimestamp,
              channelType:"h5",
              sign:myFunctionVaule
            }
          )
          .then(data => {
            if (data.code == 200) {
              this.BtcYesterdayProfitData=data.data.yesterdayIncomeBTC
              this.ApproximatelyEqualToCny=data.data.yesterdayIncomeCNY 
              this.BtcCumulativeIncome=data.data.totalIncomeBTC  
              this.BtcMyPowerOfCalculation=data.data.inviteCalculate 
              this.BtcNumberOfInvitations=data.data.totalAgencyNumber 
              this.PublicBtc=data.data.publicCalculate 
              this.BtcZeroYesterdayProfit=data.data.publicIncomeBTC 
              this.BtcZeroYesterdayCNY=data.data.publicIncomeCNY 
            } else if (data.code == 413) {
              this.$router.push("/Login/1");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.GradeProfitIndex >= 2) {
        this.MassAgent = false; //大众代理显示隐藏
        this.FirstLevelAgent = true; //一级代理显示隐藏
        this.TwoLevelAgent = true; //二级代理显示隐藏
        this.ThreeLevelAgent = true; //三级代理显示隐藏
        this.isFreezingState();
        var myProfitRequestId=myFunction.myUuid()
        var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
        var myUserId=localStorage.getItem("userID")
        var myOptGrade=  this.BackgroundNeedsLevel //localStorage.getItem("userGrade")
        var myArr=["requestId="+myProfitRequestId,"userId="+myUserId,"optGrade="+myOptGrade]
        var myFunctionVaule=md5(myFunction.myFunction(myArr)+"/api/order/earning/memberEarning.do").toUpperCase()
        axios
          .post(
            "MembershipIncome",
            qs.stringify({
              userId: myUserId,
              optGrade:myOptGrade,
            }),{
              requestId:myProfitRequestId,
              timestamp:myTimestamp,
              channelType:"h5",
              sign:myFunctionVaule
            }
          )
          .then(data => {
            if (data.code == 200) {
              this.BtcYesterdayProfitData=data.data.yesterdayIncomeBTC
              this.ApproximatelyEqualToCny=data.data.yesterdayIncomeCNY 
              this.BtcCumulativeIncome=data.data.totalIncomeBTC  
              this.BtcMyPowerOfCalculation=data.data.inviteCalculate 
              this.BtcNumberOfInvitations=data.data.totalAgencyNumber 
              this.PercentageCostrate=data.data.echoSchedule 
              this.BtcOneAgentPeople=data.data.oneAgencyNumber 
              this.BtcOneYesterdayProfit=data.data.oneAgencyIncomeBTC 
              this.BtcOneYesterdayCNY=data.data.oneAgencyIncomeCNY 
              this.BtcTowAgentPeople=data.data.twoAgencyNumber 
              this.BtcTowYesterdayProfit=data.data.twoAgencyIncomeBTC 
              this.BtcTowYesterdayCNY=data.data.twoAgencyIncomeCNY
              this.BtcThreeAgentPeople=data.data.threeAgencyNumber 
              this.BtcThreeYesterdayProfit=data.data.threeAgencyIncomeBTC 
              this.BtcThreeYesterdayCNY=data.data.threeAgencyIncomeCNY 
            } else if (data.code == 413) {
              this.$router.push("/Login/1");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  beforeMount() {
    this.initialGrade();
  },
  mounted() {},
  beforeUpdate() {}
};
</script>
<style scoped>
.BtcProfit {
  width: 100%;
  padding-top: 138px;
  background: #0287ff;
}
.BtcYesterdayProfit {
  text-align: center;
  font-size: 26px;
  color: #fff;
  opacity: 0.6;
  padding-bottom: 30px;
}
.BtcYesterdayProfitNum {
  text-align: center;
  font-size: 60px;
  color: #fff;
  font-weight: bold;
}
.BtcApproximatelyEqualTo {
  text-align: center;
  height: 120px;
  font-size: 24px;
  color: #fff;
  line-height: 120px;
}
.BtcAllProfitTitle {
  padding-top: 50px;
  background: rgba(1, 69, 128, 0.1);
}
.BtcAllProfitTitle:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.BtcAllProfitTitle > li {
  list-style: none;
  width: 33.33%;
  float: left;
  color: #fff;
  opacity: 0.6;
  font-size: 24px;
  text-align: center;
}
.FillingSpace:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.FillingSpace > li {
  height: 40px;
  width: 250px;
  float: left;
  background: rgba(1, 69, 128, 0.1);
}
.FillingSpace > li:nth-child(2) {
  box-sizing: border-box;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  /* opacity: 0.6; */
}
.BtcProfitTitleNum:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.BtcProfitTitleNum > li {
  width: 33.33%;
  text-align: center;
  font-size: 32px;
  color: #fff;
  float: left;
}
.BtcProfitTitleNum {
  padding-bottom: 50px;
  background: rgba(1, 69, 128, 0.1);
}
.BtcPromoteTitelDiv {
  background: #fff;
}
.BtcPromoteTitel {
  height: 72px;
  font-size: 24px;
  padding-left: 24px;
  line-height: 72px;
  background: rgba(255, 114, 31, 0.1);
  color: #ff721f;
}

.BtcProfitList {
  width: 703px;
  margin: auto;
}
.BtcProfitList > li {
  margin-top: 20px;
  padding: 50px 0;
  background: #fff;
  box-shadow: rgba(000, 000, 000, 0.1) 0px 1px 4px 0px;
}
.BtcProfitListLi:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.BtcProfitListLi > div {
  float: left;
}
.BtcProfitListLiLeft {
  width: 268px;
  /* box-sizing: border-box;
  border-right: 1px solid #dfdfdf; */
}
.BtcProfitListLiRight {
  width: 434px;
}
.BtcProfitListLiLeft > p:nth-child(1) {
  text-align: left;
  color: #949494;
  font-size: 28px;
  padding-left: 24px;
}
.BtcProfitListLiLeft > p:nth-child(2) {
  text-align: left;
  color: #373d41;
  font-size: 32px;
  font-weight: bolder;
  margin-top: 40px;
  padding-left: 24px;
}
.BtcProfitListLiRight > p {
  border-left: 1px solid #eaeaea;
  box-sizing: border-box;
}
.BtcProfitListLiRight > p:nth-child(1) {
  padding-left: 24px;
  color: #949494;
  font-size: 28px;
  /* margin-bottom: 30px; */
}
.BtcProfitListLiRight > p:nth-child(2) {
  padding-left: 24px;
  color: #373d41;
  font-size: 32px;
  font-weight: bolder;
  padding-top: 40px;
}
.BtcProfitListLiRight > p:nth-child(3) {
  padding-left: 24px;
  color: #949494;
  font-size: 24px;
  padding-top: 20px;
}
.footJoinImmediately {
  padding: 250px 0;
  background: #f5f5f8;
  text-align: center;
  font-size: 24px;
  padding-top: 230px;
}
.footJoinImmediately > span {
  color: #ff721f;
}
.footFill {
  width: 100%;
  height: 100px;
  background: #f5f5f8;
}
.NotBought > p:nth-child(1) {
  font-size: 26px;
  color: #949494;
  margin-top: 200px;
  text-align: center;
}
.NotBought > div:nth-child(2) {
  width: 210px;
  height: 70px;
  margin: auto;
  margin-top: 30px;
  border-radius: 2px;
}
.NotBought > div:nth-child(2) > button {
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: 28px;
  color: #0287ff;
  background: transparent;
  border: 1px solid #0287ff;
}
.BtcProfitBtc {
  color: #0287ff;
  font-weight: bolder;
}
.TowGoldFrozenOne {
  position: relative;
}
.TowGoldFrozenTow {
  position: relative;
}
.OneGoldFrozen {
  width: 140px;
  height: 140px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: url("../../static/img/earnings_state_nonactivated@2x.png")
    no-repeat;
  background-size: 100% 100%;
}
.TowGoldFrozen {
  width: 140px;
  height: 140px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: url("../../static/img/earnings_state_nonactivated@2x.png")
    no-repeat;
  background-size: 100% 100%;
}
.ThreeGoldFrozenTow {
  position: relative;
}
.ThreeGoldFrozen {
  width: 140px;
  height: 140px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: url("../../static/img/earnings_state_nonactivated@2x.png")
    no-repeat;
  background-size: 100% 100%;
}
.OneeeGoldNotice,
.ThreeGoldNotice,
.ToweeGoldNotice {
  width: 22px;
  height: 22px;
  position: absolute;
  top: 20px;
  right: 20px;
  background: url("../../static/img/frozen.png") no-repeat;
  background-size: 100% 100%;
}
.OneeeGoldTitle {
  width: 252px;
  position: absolute;
  top: -160px;
  right: 0;
}
.ToweeGoldTitle {
  width: 252px;
  position: absolute;
  top: -160px;
  right: 0;
}
.ThreeGoldTitle {
  width: 252px;
  position: absolute;
  top: -160px;
  right: 0;
}
.OneeeGoldTitle > div:nth-child(1),
.ToweeGoldTitle > div:nth-child(1),
.ThreeGoldTitle > div:nth-child(1) {
  background: #949494;
  font-size: 20px;
  padding: 30px;
  color: #fff;
  line-height: 36px;
}
.OneeeGoldTitle > div:nth-child(2),
.ToweeGoldTitle > div:nth-child(2),
.ThreeGoldTitle > div:nth-child(2) {
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 0px solid transparent;
  border-top: 10px solid #949494;
  position: relative;
  top: 0px;
  right: -211px;
}
.profitMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
}
.AchieveGrade {
  color: #949494 !important;
}
.GradeProfitNav:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.GradeProfitNav {
  width: 100%;
  position: fixed;
  top: 0;
  background: #0287ff;
  z-index: 100;
}
.GradeProfitNav > li {
  float: left;
  width: 20%;
  text-align: center;
  border-bottom: 6px solid transparent;
  line-height: 88px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.8);
  font-size: 28px;
}
.YesGradeProfitNav {
  color: #fff !important;
  border-bottom: 6px solid #fff !important;
}
</style>


