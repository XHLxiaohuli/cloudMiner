<!--作者var-->
<template>
  <div class="homeMain">
    <div>
      <router-view/>
    </div>
    <ul class="HomeNav">
     <li @click="HomeIndex">
       <div>
         <img src="../../static/img/tabBar/shouye.png" v-if="!(whichPage=='/Home/Index/1')">
         <img src="../../static/img/tabBar/bright-shouye.png" v-if="(whichPage=='/Home/Index/1')">
       </div>
       <p :class="{ClickTar:whichPage=='/Home/Index/1',NoClickTar:whichPage!='/Home/Index/1'}">首页</p>
     </li>
     <li  @click="CalculatorIndex">
       <div>
         <img src="../../static/img/tabBar/jisuanqi.png" v-if="!(whichPage=='/Home/Calculator/VolkswagenCalculator'||whichPage=='/Home/Calculator/SilverCalculator'||whichPage=='/Home/Calculator/GoldCalculator'||whichPage=='/Home/Calculator/DiamondCalculator')">
        <img src="../../static/img/tabBar/bright-jisuanqi.png" v-if="(whichPage=='/Home/Calculator/VolkswagenCalculator'||whichPage=='/Home/Calculator/SilverCalculator'||whichPage=='/Home/Calculator/GoldCalculator'||whichPage=='/Home/Calculator/DiamondCalculator')">
       </div>
       <p :class="{ClickTar:(whichPage=='/Home/Calculator/VolkswagenCalculator'||whichPage=='/Home/Calculator/SilverCalculator'||whichPage=='/Home/Calculator/GoldCalculator'||whichPage=='/Home/Calculator/DiamondCalculator'),NoClickTar:(whichPage!='/Home/Calculator/VolkswagenCalculator'&&whichPage!='/Home/Calculator/SilverCalculator'&&whichPage!='/Home/Calculator/GoldCalculator'&&whichPage!='/Home/Calculator/DiamondCalculator')}">计算器</p>
     </li>
     <li  @click="ProfitIndex">
       <div>
         <img src="../../static/img/tabBar/shouyi.png" v-if="!(whichPage=='/Home/Profit/BTCprofit')">
        <img src="../../static/img/tabBar/bright-shouyi.png" v-if="(whichPage=='/Home/Profit/BTCprofit')">
       </div>
       <p :class="{ClickTar:whichPage=='/Home/Profit/BTCprofit',NoClickTar:whichPage!='/Home/Profit/BTCprofit'}">收益</p>
     </li>
     <li @click="meIndex">
       <div>
         <img src="../../static/img/tabBar/me.png" v-if="!(whichPage=='/Home/My')">
         <img src="../../static/img/tabBar/bright-me.png" v-if="(whichPage=='/Home/My')"> 
       </div>
       <p :class="{ClickTar:whichPage=='/Home/My',NoClickTar:whichPage!='/Home/My'}">我的</p>
     </li>
    </ul>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import myFunction from "@/page/encryption/encryption";
export default {
  components: {
    myFunction
  },
  data() {
    return {
      whichPage: "",
      myTime: ""
    };
  },
  methods: {
    //首页点击
    HomeIndex() {
      this.$router.push("/Home/Index/1");
    },
    //计算器点击
    CalculatorIndex() {
      this.$router.push("/Home/Calculator");
    },
    //收益点击
    ProfitIndex() {
      if (
        localStorage.getItem("userID") == null ||
        localStorage.getItem("userID") == undefined
      ) {
        this.$router.push("/Login/1");
      } else {
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
              sessionStorage["userGrade"] = data.data.userGrade; //用户等级
              sessionStorage['userStep'] =data.data.userStep;
              this.$router.push("/Home/Profit");
            } else if (data.code == 413) {
              this.$router.push("/Login/1");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //我的点击
    meIndex() {
      if (
        localStorage.getItem("userID") == null ||
        localStorage.getItem("userID") == undefined
      ) {
        this.$router.push("/Login/1");
      } else {
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
              this.$router.push("/Home/My");
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
    // localStorage.setItem("userName","Lili")
    // console.log(localStorage.getItem("userName"))
    // localStorage.setItem("userName","meimei")
    // console.log(localStorage.getItem("userName"))
  },
  mounted() {
    document.getElementsByClassName("HomeNav")[0].style.position = "fixed";
    this.whichPage = window.location.pathname;
  },
  beforeUpdate() {
    this.whichPage = window.location.pathname;
  }
};
</script>
<style lang='scss' scoped>
@import "../../style/Mythem";
.homeMain {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f8;
}
.ClickTar {
  color: #0287ff !important;
}
.NoClickTar {
  color: #373d41 !important;
}
.HomeNav {
  width: 100%;
  bottom: 0;
  left: 0;
  border-top: 1px solid #dfdfdf;
  background: #fff;
  z-index: 1000;
}
.HomeNav:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.HomeNav > li {
  width: 25%;
  float: left;
  text-align: center;
}
.HomeNav > li > div:nth-child(1) {
  width: 40px;
  height: 40px;
  margin: auto;
  margin-top: 14px;
  margin-bottom: 10px;
}
.HomeNav > li:last-child > div:nth-child(1) {
  width: 36px;
  height: 40px;
}
.HomeNav > li > div:nth-child(1) > img {
  width: 100%;
  height: 100%;
}
.HomeNav > li > p:nth-child(2) {
  font-size: 20px;
  margin-bottom: 15px;
}
</style>
