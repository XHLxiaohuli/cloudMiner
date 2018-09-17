<!--作者:var-->
<template>
  <div>
    <div class="GoldenMinerTop">
      <div class="GoldenMinerPic">
        <img src="../../static/img/Membership/huiyuan-huangjin@2x.png" alt="">
      </div>
      <p class="GoldenMinerTitle">黄金矿工</p>
      <div class="GoldenMinerProgressBar">
        <box gap="0px">
          <x-progress :percent="percent1" :show-cancel="false"></x-progress>
        </box>
        <div class="ProgressBarCircle" :style="'left:'+percent1+'%'"></div>
      </div>
      <p class="ReturnToTheProgressBar">回本进度 : {{percent1}}%，可加入钻石矿工赚取更高收益</p>
    </div>
    <div class="GoldenReturnTheProgressBarContainer">
      <h1><span></span>黄金矿工邀请收益</h1>
      <p>A推荐B，获取B的46.4%相应算力，C的20.8%相应算力，D的12.8%相应算力；</p>
      <p>B推荐C，获取C的46.4%相应算力，D的20.8%相应算力，E的12.8%相应算力；</p>
      <p>C推荐D，获取D的46.4%相应算力，E的20.8%相应算力，F的12.8%相应算力。</p>
      <p>每位推荐人最多可有三层邀请下线，例如A邀请B，B邀请C，C邀请D，D邀请E，但是E与A没有关系，A无权拿到E购买算力相应的奖励。</p>
    </div>
    <!-- <div class="GoldenMinerUpgradeRules">
      <h1><span></span>黄金矿工升级规则</h1>
      <p>加入初级黄金矿工后，可享受黄金等级的一级邀请收益以及白银的一、二、三级邀请收益。您可以通过购买中级黄金矿工进行升级，当您成为中级黄金矿工后，便可以加入高级黄金矿工，获取更高的收益。</p>
    </div> -->
    <div class="GoldMinerFooter"></div>
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
      // this.myTime=Math.round(new Date().getTime()/1000).toString()
      // axios
      //   .post("PostAllUserInformation", qs.stringify({
      //     time:this.myTime,
      //     token:md5( md5( md5(this.myTime)+'yun' )+'yunkuang123' ),
      //   }))
      //   .then(data => {
      //     this.percent1 = data.data.cost_rate;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  beforeMount() {
    this.PostAllUserInformationFunction();
  }
};
</script>
<style lang="scss" seoped>
@import "../../style/Mythem";
.GoldenMinerTop {
  width: 100%;
  padding: 50px 0;
  background: url("../../static/img/MinerGradeBG.jpg") no-repeat;
  background-size: 100%;
  margin-bottom: 20px;
}
.GoldenMinerPic {
  width: 128px;
  height: 112px;
  margin: auto;
}
.GoldenMinerPic > img {
  width: 100%;
  height: 100%;
}
.GoldenMinerTitle {
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: bolder;
  margin-top: 30px;
}
.GoldenMinerProgressBar {
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
.GoldenReturnTheProgressBarContainer,
.GoldenMinerUpgradeRules {
  width: 100%;
  background: #fff;
  padding-top: 50px;
  padding-bottom: 34px;
  border-bottom: 1px solid #dfdfdf;
}
.GoldenMinerUpgradeRules {
  margin-top: 20px;
}
.GoldenReturnTheProgressBarContainer > h1,
.GoldenMinerUpgradeRules > h1 {
  font-size: 28px;
  color: #373d41;
  font-weight: bolder;
  margin-left: 24px;
  padding-left: 10px;
  margin-bottom: 36px;
}
.GoldenReturnTheProgressBarContainer > h1 > span,
.GoldenMinerUpgradeRules > h1 > span {
  display: inline-block;
  width: 8px;
  height: 28px;
  background: #0287ff;
  border: 0;
  margin-right: 10px;
  position: relative;
  top: 3px;
}
.GoldenReturnTheProgressBarContainer > p,
.GoldenMinerUpgradeRules > p {
  padding: 0 38px;
  line-height: 46px;
  margin-bottom: 12px;
  font-size: 26px;
  text-align: justify;
}
.GoldenReturnTheProgressBarContainer > p:last-child,
.GoldenMinerUpgradeRules > p:last-child {
  margin-bottom: 0;
}
.GoldMinerFooter {
  width: 100%;
  height: 100px;
  background: #f5f5f8;
}
</style>
