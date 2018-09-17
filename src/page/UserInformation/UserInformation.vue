<!--作者:var-->
<template>
  <div class="UserInformationMain">
      <div class="UserInformationHeader">
       <div class="UserInformationHeaderLeft">
         <div class="UserInformationBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="UserInformationHeaderText">用户信息</div>
     </div>
     <ul class="AllUserInformation">
         <li class="UserNameLi">
             <div>用户名</div>
             <div>{{UserInformationUsername}}</div>
         </li>
         <li class="RealNameValidation" @click="jumpRealNameAuthentication">
             <div>实名认证</div>
             <div>
                 <img src="../../static/img/rukou-qiehuan.png" alt="">
             </div>
             <div class="YesBindingUserInformation">{{WhetherRealNameValidation}}</div>
         </li>
         <li class="BindingPhone" @click="jumpBindingCellPhone">
             <div>手机号码</div>
             <div>
                 <img src="../../static/img/rukou-qiehuan.png" alt="">
             </div>
             <div :class="{YesBindingUserInformation:YesOrNoBindingPhone==1,NoBindingUserInformation:YesOrNoBindingPhone==0}">{{WhetherBindingPhone}}</div>
         </li>
         <li class="PasswordManagement" @click="jumpPasswordManagement">
             <div>密码管理</div>
             <div>
                 <img src="../../static/img/rukou-qiehuan.png" alt="">
             </div>
         </li>
     </ul>
     <button class="UserInformationSafeExit" @click="ExitLogon">安全退出</button>
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from 'js-md5'
import myFunction from '@/page/encryption/encryption'
export default {
  components: {
    myFunction
  },
  data() {
    return {
      UserInformationUsername: "",
      WhetherRealNameValidation: "已认证", //是否实名认证文本
      WhetherBindingPhone: "", //是否绑定手机号码
      YesOrNoBindingPhone: "", //是否绑定电话状态
      myTime:"",
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //跳到实名认证
    jumpRealNameAuthentication() {
      this.$router.push("/RealNameAuthentication");
    },
    //选择跳到对应手机号码绑定页面
    jumpBindingCellPhone() {
      if (this.YesOrNoBindingPhone == 0) {
        this.$router.push("/NoBindingCellPhone/1");
      } else if (this.YesOrNoBindingPhone == 1) {
        this.$router.push("/YesBindingCellPhone");
      }
    },
    //跳转到密码管理页面
    jumpPasswordManagement() {
      this.$router.push("/PasswordManagement");
    },
    //退出登录
    ExitLogon() {
      var myRequestId=myFunction.myUuid()
      var myTimestamp=Math.round(new Date().getTime()/1000).toString()
      var myUserId=localStorage.getItem("userID")
      var myArr=["requestId="+myRequestId,"userId="+myUserId]
      var myFunctionValue=myFunction.myFunction(myArr) + "/api/user/logOut.do";
      var myFunctionValues=md5(myFunctionValue).toUpperCase()
      axios
        .post("DropOut", qs.stringify({
          userId:myUserId
        }),{
          requestId:myRequestId,
          timestamp:myTimestamp,
          channelType:"h5",
          sign:myFunctionValues
        })
        .then(res => {
          if (res.status == "success") {
             localStorage.clear();
            this.$router.push("/Home/Index/1");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {;
    this.UserInformationUsername=sessionStorage['realName']
    this.YesOrNoBindingPhone=sessionStorage['isBindingPhone']
    if (this.YesOrNoBindingPhone == 0) {
      this.WhetherBindingPhone = "未绑定";
    } else if (this.YesOrNoBindingPhone == 1) {
      this.WhetherBindingPhone = "已绑定";
    }
  }
};
</script>
<style scoped>
.UserInformationMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.UserInformationHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.UserInformationHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.UserInformationHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.UserInformationBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.UserInformationHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.AllUserInformation {
  background: #fff;
  padding: 0 24px;
  margin-bottom: 50px;
  border-bottom: 1px solid #dfdfdf;
}
.AllUserInformation > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.AllUserInformation > li {
  padding: 50px 0;
  height: 28px;
  border-bottom: 1px solid #f2f2f2;
}
.AllUserInformation > li:last-child {
  border-bottom: 0;
}
.AllUserInformation > li > div {
  font-size: 28px;
}
.UserNameLi > div:first-child {
  float: left;
}
.UserNameLi > div:last-child {
  float: right;
  color: #949494;
}
.RealNameValidation > div:first-child {
  float: left;
}
.RealNameValidation > div:nth-child(2) {
  float: right;
  width: 14px;
  height: 28px;
  margin-left: 20px;
}
.RealNameValidation > div:nth-child(2) > img {
  width: 100%;
  height: 100%;
}
.RealNameValidation > div:last-child {
  float: right;
}
.BindingPhone > div:first-child {
  float: left;
}
.BindingPhone > div:nth-child(2) {
  float: right;
  width: 14px;
  height: 28px;
  margin-left: 20px;
}
.BindingPhone > div:nth-child(2) > img {
  width: 100%;
  height: 100%;
}
.BindingPhone > div:last-child {
  float: right;
}
.YesBindingUserInformation {
  color: #ff721f !important;
}
.NoBindingUserInformation {
  color: #949494 !important;
}
.PasswordManagement > div:first-child {
  float: left;
}
.PasswordManagement > div:last-child {
  float: right;
  width: 14px;
  height: 28px;
}
.PasswordManagement > div:last-child > img {
  width: 100%;
  height: 100%;
}
.UserInformationSafeExit {
  width: 100%;
  height: 88px;
  background: #fff;
  color: #373d41;
  font-size: 28px;
  border: 0;
}
.UserInformationSafeExit:focus {
  outline: 0;
}
</style>


