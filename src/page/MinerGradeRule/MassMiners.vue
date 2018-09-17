<!--作者:var-->
<template>
  <div>
    <div class="MassMinersTop">
      <div class="MassMinersPic">
        <img src="../../static/img/Membership/huiyuan-dazhong@2x.png" alt="">
      </div>
      <p class="MassMinersTitle">大众矿工</p>
      <div class="MassMinersProgressBar">
        <box gap="0px">
          <x-progress :percent="percent1" :show-cancel="false"></x-progress>
        </box>
        <div class="ProgressBarCircle" :style="'left:'+percent1+'%'"></div>
      </div>
      <p class="ReturnToTheProgressBar">回本进度 : {{percent1}}%，可加入白银矿工赚取更高收益</p>
    </div>
    <div class="ReturnTheProgressBarContainer">
      <h1 class="ReturnTheProgressBarTitle"><span></span>大众矿工邀请收益</h1>
      <p class="ReturnTheProgressBarText">
        大众矿工收益来源为矿机云算力独享收益，不参与推荐邀请奖励，根据自己所持有算力获取稳定收益。即，即使推荐被推荐人加入白银、黄金、钻石矿工，也无法获取邀请收益。
      </p>
    </div>
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
.MassMinersTop {
  width: 100%;
  height: 287px;
  background: url("../../static/img/MinerGradeBG.jpg") no-repeat;
  background-size: 100%;
  padding: 50px 0;
}
.MassMinersPic {
  width: 128px;
  height: 112px;
  margin: auto;
}
.MassMinersPic > img {
  width: 100%;
  height: 100%;
}
.MassMinersTitle {
  color: #fff;
  text-align: center;
  font-size: 32px;
  padding-top: 30px;
  font-weight: bolder;
}
.MassMinersProgressBar {
  width: 600px;
  margin: auto;
  margin-top: 50px;
  position: relative;
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
  margin-top: 36px;
}
.ReturnTheProgressBarContainer {
  background: #fff;
  padding-top: 50px;
  padding-bottom: 34px;
  margin-top: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.ReturnTheProgressBarTitle {
  margin-left: 24px;
  // padding-left: 10px;
  // border-left: 4px solid #0287ff;
  font-size: 28px;
  color: #373d41;
  font-weight: bolder;
  margin-bottom: 36px;
}
.ReturnTheProgressBarTitle > span {
  display: inline-block;
  width: 8px;
  height: 28px;
  background: #0287ff;
  border: 0;
  margin-right: 10px;
  position: relative;
  top: 3px;
}
.ReturnTheProgressBarText {
  line-height: 48px;
  padding: 0 38px;
  font-size: 26px;
  color: #373d41;
}
</style>
