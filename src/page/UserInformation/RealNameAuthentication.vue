<template>
  <div class="RealNameAuthenticationMain">
      <div class="RealNameAuthenticationHeader">
       <div class="RealNameAuthenticationHeaderLeft">
         <div class="RealNameAuthenticationBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="RealNameAuthenticationHeaderText">用户信息</div>
     </div>
     <ul class="RealNameAuthenticationUl">
         <li>
             <div>真实姓名</div>
             <div>{{IsUsername}}</div>
         </li>
         <li>
             <div>身份证号码</div>
             <div>{{UserIDcard}}</div>
         </li>
     </ul>
     <div class="RealNameFooter"><span></span>我们注重保护信息，不授权对外提供。</div>
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
      IsUsername: "",
      UserIDcard: "",
      myTime: ""
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //身份证号码
    PostAllUserInformationFunction() {
      // this.myTime=Math.round(new Date().getTime()/1000).toString()
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
            // time:this.myTime,
            // token:md5( md5( md5(this.myTime)+'yun' )+'yunkuang123' ),
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
          this.UserIDcard = data.data.idNumber;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.PostAllUserInformationFunction();
    this.IsUsername = sessionStorage["realName"];
  }
};
</script>
<style scoped>
.RealNameAuthenticationMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.RealNameAuthenticationHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.RealNameAuthenticationHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.RealNameAuthenticationHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.RealNameAuthenticationBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.RealNameAuthenticationHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}

.RealNameAuthenticationUl {
  background: #fff;
  padding: 0 24px;
  margin-bottom: 50px;
  border-bottom: 1px solid #dfdfdf;
}
.RealNameAuthenticationUl > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.RealNameAuthenticationUl > li {
  padding: 50px 0;
  height: 28px;
  border-bottom: 1px solid #f2f2f2;
}
.RealNameAuthenticationUl > li:last-child {
  border-bottom: 0;
}
.RealNameAuthenticationUl > li > div {
  font-size: 28px;
}
.RealNameAuthenticationUl > li > div:first-child {
  float: left;
  color: #373d41;
}
.RealNameAuthenticationUl > li > div:last-child {
  float: right;
  color: #949494;
}
.RealNameFooter {
  color: #0287ff;
  font-size: 24px;
  text-align: center;
}
.RealNameFooter > span {
  display: inline-block;
  width: 21px;
  height: 24px;
  background: url("../../static/img/duanpai.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 10px;
  position: relative;
  top: 1px;
}
</style>


