<!--作者:var-->
<template>
  <div>
    <div class="SilverMinerTop">
      <div class="SilverMinerPic">
        <img src="../../static/img/Membership/baiyin@2x.png" alt="">
      </div>
      <p class="SilverMinerTitle">白银矿工</p>
      <div class="SilverMinerProgressBar">
        <box gap="0px">
          <x-progress :percent="percent1" :show-cancel="false"></x-progress>
        </box>
        <div class="ProgressBarCircle" :style="'left:'+percent1+'%'"></div>
      </div>
      <p class="ReturnToTheProgressBar">回本进度 : {{percent1}}%，可加入黄金矿工赚取更高收益</p>
    </div>
    <div class="SilverReturnTheProgressBarContainer">
      <h1><span></span>白银矿工邀请收益</h1>
      <p>A推荐B，获取B的46.4%相应算力，C的20.8%相应算力，D的12.8%相应算力；</p>
      <p>B推荐C，获取C的46.4%相应算力，D的20.8%相应算力，E的12.8%相应算力；</p>
      <p>C推荐D，获取D的46.4%相应算力，E的20.8%相应算力，F的12.8%相应算力。</p>
      <p>每位推荐人最多可有三层邀请下线，例如A邀请B，B邀请C，C邀请D，D邀请E，但是E与A没有关系，A无权拿到E购买算力相应的奖励。</p>
    </div>
    <!-- <div class="SilverMinerUpgradeRules">
      <h1><span></span>白银矿工升级规则</h1>
      <p>加入初级白银矿工后，可享受白银等级的一级邀请收益。二级邀请收益可通过购买中级白银矿工进行升级后开始享有，当您成为中级白银矿工后，便可以加入高级白银矿工，获取更高的收益。</p>
    </div> -->
    <div class="SilverMinerFooter"></div>
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from 'js-md5'
import { XProgress, Box } from "vux";
import myFunction from "@/page/encryption/encryption";
export default {
  components: {
    XProgress,
    Box,
    myFunction
  },
  data() {
    return {
      percent1: 0,
      myTime:"",
    };
  },
  methods: {
    //公共接口
    PostAllUserInformationFunction() {

      if ((localStorage.getItem("userID") == null)||(localStorage.getItem("userID") == undefined)) {
        this.$router.push("/Login/1");
      } else {
        var myRequestId=myFunction.myUuid()
        var myTimestamp=Math.round(new Date().getTime() / 1000).toString();
        var myUserId=localStorage.getItem("userID")
        var myArr=["requestId="+myRequestId,"userId="+myUserId]
        var myFunctionValue=myFunction.myFunction(myArr)+"/api/user/getUserInfo.do"
        var myFunctionValues=md5(myFunctionValue).toUpperCase()
        axios
          .post(
            "ObtainingUserInformation",
            qs.stringify({
              userId: myUserId
            }),{
              requestId:myRequestId,
              timestamp:myTimestamp,
              channelType:"h5",
              sign:myFunctionValues
            }
          )
          .then(data => {
            if (data.code == 200) {
              this.percent1 = parseFloat(data.data.paybackScale);
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
    this.PostAllUserInformationFunction();
  }
};
</script>
<style lang="scss" seoped>
@import "../../style/Mythem";
.SilverMinerTop {
  width: 100%;
  padding: 50px 0;
  background: url("../../static/img/MinerGradeBG.jpg") no-repeat;
  background-size: 100%;
  margin-bottom: 20px;
}
.SilverMinerPic {
  width: 128px;
  height: 112px;
  margin: auto;
}
.SilverMinerPic > img {
  width: 100%;
  height: 100%;
}
.SilverMinerTitle {
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: bolder;
  margin-top: 30px;
}
.SilverMinerProgressBar {
  width: 600px;
  margin: auto;
  margin-top: 50px;
  position: relative;
  background: red;
}
.ProgressBarCircle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 0;
  background: #fe741f;
  position: absolute;
  top: -7px;
}
.ReturnToTheProgressBar {
  font-size: 24px;
  text-align: center;
  color: #fff;
  opacity: 0.8;
  margin-top: 30px;
}
.SilverReturnTheProgressBarContainer,
.SilverMinerUpgradeRules {
  width: 100%;
  background: #fff;
  padding-top: 50px;
  padding-bottom: 34px;
  border-bottom: 1px solid #dfdfdf;
}
.SilverMinerUpgradeRules {
  margin-top: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.SilverReturnTheProgressBarContainer > h1,
.SilverMinerUpgradeRules > h1 {
  font-size: 28px;
  color: #373d41;
  font-weight: bolder;
  margin-left: 24px;
  // padding-left: 10px;
  margin-bottom: 36px;
  // border-left: 4px solid #0287ff;
}
.SilverReturnTheProgressBarContainer > h1 > span,
.SilverMinerUpgradeRules > h1 > span {
  display: inline-block;
  width: 8px;
  height: 28px;
  background: #0287ff;
  border: 0;
  margin-right: 10px;
  position: relative;
  top: 3px;
}
.SilverReturnTheProgressBarContainer > p,
.SilverMinerUpgradeRules > p {
  padding: 0 38px;
  line-height: 46px;
  margin-bottom: 12px;
  font-size: 26px;
  text-align: justify;
}
.SilverReturnTheProgressBarContainer > p:last-child,
.SilverMinerUpgradeRules > p:last-child {
  margin-bottom: 0;
}
.SilverMinerFooter {
  width: 100%;
  height: 100px;
  background: #f5f5f8;
}
</style>
