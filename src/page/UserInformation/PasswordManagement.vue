<template>
  <div class="PasswordManagementMain">
      <div class="PasswordManagementHeader">
       <div class="PasswordManagementHeaderLeft">
         <div class="PasswordManagementBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="PasswordManagementHeaderText">密码管理</div>
     </div>
     <div class="PasswordManagementForm">
         <div :style="'border-bottom: 1px solid '+PasswordManagementInputOne">
             <input type="password" v-model="PasswordManagementInputOneModel" @focus="OldPasswordFocus" @blur="OldPasswordBlur" placeholder="原密码">
         </div>
         <div :style="'border-bottom: 1px solid '+PasswordManagementInputTow">
             <input type="password"  v-model="PasswordManagementInputTowModel" @focus="NewPasswordFocus" @blur="NewPasswordBlur" placeholder="新密码">
         </div>
         <div :style="'border-bottom: 1px solid '+PasswordManagementInputThree">
             <input type="password"  v-model="PasswordManagementInputThreeModel" @focus="ConfirmNewPasswordFocus" @blur="ConfirmNewPasswordBlur" placeholder="确认新密码">
         </div>
         <div>
             <x-button class="PasswordManagementDetermineBtn" @click.native="showPosition('middle')" type="primary" :class="{YesPasswordManagementDetermineBtn:(PasswordManagementInputOneModel!=='')&&(PasswordManagementInputTowModel!=='')&&(PasswordManagementInputThreeModel!==''),NoPasswordManagementDetermineBtn:(PasswordManagementInputOneModel=='')||(PasswordManagementInputTowModel=='')||(PasswordManagementInputThreeModel=='')}">确定</x-button> 
             <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text=PasswordManagementText :position="position">{{('Basic Usage') }}</toast>
         </div>
     </div>
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import { Toast, XButton } from "vux";
import myFunction from "@/page/encryption/encryption";
export default {
  components: {
    Toast,
    XButton,
    myFunction
  },
  data() {
    return {
      //密码或者手机号错误弹出框提示
      showPositionValue: false,
      position: "",
      PasswordManagementInputOne: "#dfdfdf", //原密码输入框下边框
      PasswordManagementInputTow: "#dfdfdf", //新密码输入框下边框
      PasswordManagementInputThree: "#dfdfdf", //确认新密码输入框下边框
      PasswordManagementInputOneModel: "", //双向绑定旧密码
      PasswordManagementInputTowModel: "", //双向绑定新密码
      PasswordManagementInputThreeModel: "", //双向绑定确认新密码
      PasswordManagementText: "", //错误提示文本
      myTime: ""
    };
  },
  methods: {
    showPosition(position) {
      //注释的是错误弹窗提示
      //   this.position = position;
      //   this.showPositionValue = true;
      //   this.$router.push("/Login");
      var RsPasswordManagementInput = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/;
      var RsPasswordManagementInputOnes = RsPasswordManagementInput.test(
        this.PasswordManagementInputOneModel
      );
      var RsPasswordManagementInputTows = RsPasswordManagementInput.test(
        this.PasswordManagementInputTowModel
      );
      if (
        this.PasswordManagementInputTowModel ==
        this.PasswordManagementInputThreeModel
      ) {
        if (RsPasswordManagementInputOnes) {
          if (RsPasswordManagementInputTows) {
            // this.myTime=Math.round(new Date().getTime()/1000).toString()
            var myRequestId = myFunction.myUuid();
            var myTimestamp = Math.round(
              new Date().getTime() / 1000
            ).toString();
            var myUserId = localStorage.getItem("userID");
            var myOriginalPassword = md5(this.PasswordManagementInputOneModel);
            var myNewPassword = md5(this.PasswordManagementInputTowModel);
            var myArr = [
              "requestId=" + myRequestId,
              "userId=" + myUserId,
              "originalPassword=" + myOriginalPassword,
              "newPassword=" + myNewPassword
            ];
            var myFunctionValue =
              myFunction.myFunction(myArr) + "/api/user/updatePassword.do";
            var myFunctionValues = md5(myFunctionValue).toUpperCase();
            axios
              .post(
                "ModifyThePassword",
                qs.stringify({
                  userId: myUserId,
                  originalPassword: myOriginalPassword,
                  newPassword: myNewPassword
                  // time:this.myTime,
                  // token:md5( md5( md5(this.myTime)+'yun' )+'yunkuang123' ),
                  // password1: this.PasswordManagementInputOneModel,
                  // password2: this.PasswordManagementInputTowModel
                }),
                {
                  requestId: myRequestId,
                  timestamp: myTimestamp,
                  channelType: "h5",
                  sign: myFunctionValues
                }
              )
              .then(data => {
                if (data.status == "success") {
                  var myRequestIds = myFunction.myUuid();
                  var myTimestamps = Math.round(
                    new Date().getTime() / 1000
                  ).toString();
                  var myUserIds = localStorage.getItem("userID");
                  var myArrs = [
                    "requestId=" + myRequestIds,
                    "userId=" + myUserIds
                  ];
                  var myFunctionValues =
                    myFunction.myFunction(myArrs) + "/api/user/logOut.do";
                  var myFunctionValuess = md5(myFunctionValues).toUpperCase();
                  axios
                    .post(
                      "DropOut",
                      qs.stringify({
                        userId: myUserIds
                      }),
                      {
                        requestId: myRequestIds,
                        timestamp: myTimestamps,
                        channelType: "h5",
                        sign: myFunctionValuess
                      }
                    )
                    .then(data => {})
                    .catch(err => {
                      console.log(err);
                    });
                  this.$router.push("/Login/4");
                } else {
                  //注释的是错误弹窗提示
                  this.position = position;
                  this.showPositionValue = true;
                  this.PasswordManagementText = data.message;
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else if (!RsPasswordManagementInputTows) {
            //注释的是错误弹窗提示
            this.position = position;
            this.showPositionValue = true;
            this.PasswordManagementText = "新密码格式不正确";
          }
        } else if (!RsPasswordManagementInputOnes) {
          //注释的是错误弹窗提示
          this.position = position;
          this.showPositionValue = true;
          this.PasswordManagementText = "原密码格式不正确";
        }
      } else if (
        this.PasswordManagementInputTowModel !=
        this.PasswordManagementInputThreeModel
      ) {
        //注释的是错误弹窗提示
        this.position = position;
        this.showPositionValue = true;
        this.PasswordManagementText = "新密码和确认密码不一致";
      }
    },
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //旧密码获取焦点下边框变蓝
    OldPasswordFocus() {
      this.PasswordManagementInputOne = "#0287ff";
    },
    //旧密码失去焦点变回下边框原来
    OldPasswordBlur() {
      this.PasswordManagementInputOne = "#dfdfdf";
    },
    //新密码获取焦点下边框变蓝
    NewPasswordFocus() {
      this.PasswordManagementInputTow = "#0287ff";
    },
    //新密码失去焦点变回下边框原来
    NewPasswordBlur() {
      this.PasswordManagementInputTow = "#dfdfdf";
    },
    //确认新密码获取焦点下边框变蓝
    ConfirmNewPasswordFocus() {
      this.PasswordManagementInputThree = "#0287ff";
    },
    //确认新密码失去焦点变回下边框原来
    ConfirmNewPasswordBlur() {
      this.PasswordManagementInputThree = "#dfdfdf";
    }
  }
};
</script>
<style scoped>
.PasswordManagementMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.PasswordManagementHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.PasswordManagementHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PasswordManagementHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.PasswordManagementBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.PasswordManagementHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.PasswordManagementForm {
  width: 100%;
  padding-bottom: 100px;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
}
.PasswordManagementForm > div {
  width: 600px;
  margin: auto;
  padding-top: 100px;
  padding-bottom: 2px;
}
.PasswordManagementForm > div:last-child {
  border-bottom: 0;
}
.PasswordManagementForm > div:first-child > input,
.PasswordManagementForm > div:nth-child(2) > input,
.PasswordManagementForm > div:nth-child(3) > input {
  width: 100%;
  height: 27px;
  padding: 0 10px;
  font-size: 28px;
  color: #373d41;
  padding-bottom: 10px;
}
.PasswordManagementDetermineBtn {
  width: 100%;
  height: 88px;
  border: 0;
  font-size: 28px;
  border-right: 4px;
}
.NoPasswordManagementDetermineBtn {
  pointer-events: none;
  color: #949494;
  background: #eee;
}
.YesPasswordManagementDetermineBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.PasswordManagementDetermineBtn:focus {
  outline: 0;
}
/**vuex按钮把按钮默认边框宽度改为0**/
.weui-btn:after {
  border: 0;
}
</style>

