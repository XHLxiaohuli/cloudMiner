<template>
  <div class="MinersJoinMain">
      <div class="MinersJoinHeader">
       <div class="MinersJoinHeaderLeft">
         <div class="MinersJoinBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="MinersJoinHeaderText">加入{{MinerGrade}}</div>
     </div>
     <div class="MinersJoinBody">
         <div class="MinersJoinInputDiv">
             <input type="text" @focus="MinersJoinFocus" @blur="MinersJoinBlur" v-model="MinersJoinInput" :style="' border-bottom: 1px solid '+MinersJoinInputBorderColor" placeholder="请输入激活码">
         </div>
         <div>
            <x-button :disabled="disableds" class="MinersJoinBtn" @click.native="showPosition('middle')" type="primary"
            :class='{YesMinersJoinBtn:MinersJoinInput!="",NoMinersJoinBtn:MinersJoinInput==""}'
            >确认</x-button> 
            <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text=MinersJoinManagementText :position="position">{{('Basic Usage') }}</toast>
        </div>
     </div>
     <div class="howObtainActivationCode">
       <p>如何获取激活码?</p>
       <p>1.长按二维码—2.保存图片—3.微信扫一扫—4.相册选取并添加</p>
       <div><img src="../../static/img/fuwuhao.png" alt=""></div>
       <p>云矿工服务号</p>
       <p>激活服务为云矿工提供</p>
     </div>
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
      MinersJoinManagementText: "", //错误提示文本
      MinerGrade: "大众矿工",
      MinersJoinInput: "",
      MinersJoinInputBorderColor: "#b8b8b8",
      MinerGradeNumber: "",
      MinerInputNumber: "",
      equalOrderNum: "",
      myTime: "",
      disableds: false //控制确认按钮，防止段时间重复提交数据
    };
  },
  methods: {
    showPosition(position) {
      this.disableds = true;
      // this.myTime = Math.round(new Date().getTime() / 1000).toString();
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myUserId = localStorage.getItem("userID");
      var myGoodsId = this.MinerGradeNumber;
      var myGoodsGrade = this.MinerGradeNumber;
      var myGoodsStep = "";
      var myCalculate = "";
      if (this.MinerGradeNumber > 1) {
        myGoodsStep = this.equalOrderNum;
        myCalculate = "";
      } else {
        myGoodsStep = 0;
        myCalculate = this.MinerInputNumber;
      }
      var myActivationCode = this.MinersJoinInput;
      var myArr = [
        "requestId=" + myRequestId,
        "userId=" + myUserId,
        "goodsId=" + myGoodsId,
        "goodsGrade=" + myGoodsGrade,
        "goodsStep=" + myGoodsStep,
        "activationCode=" + myActivationCode,
        "calculate=" + myCalculate
      ];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/order/activationcode/activate.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "ActivationCodeActivation",
          qs.stringify({
            userId: myUserId,
            goodsId: myGoodsId,
            goodsGrade: myGoodsGrade,
            goodsStep: myGoodsStep,
            activationCode: myActivationCode,
            calculate: myCalculate
          }),
          {
            requestId: myRequestId,
            timestamp: myTimestamp,
            channelType: "h5",
            sign: myFunctionValues
          }
        )
        .then(data => {
          if (data.code != 200) {
            this.position = position;
            this.showPositionValue = true;
            this.MinersJoinManagementText = data.message;
          } else if (data.code == 200) {
            this.$router.push("/MinersJoinSuccess");
          }
        })
        .catch(err => {
          console.log(err);
        });
      setTimeout(() => {
        this.disableds = false;
      }, 5000);
    },
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //输入框获取焦点下边框变蓝
    MinersJoinFocus() {
      this.MinersJoinInputBorderColor = "#0287ff";
    },
    //输入框失去焦点下边框变回原来
    MinersJoinBlur() {
      this.MinersJoinInputBorderColor = "#b8b8b8";
    }
  },
  beforeMount() {
    this.MinerGradeNumber = this.$route.params.worktype;
    this.MinerInputNumber = this.$route.params.InputNumber;
    this.equalOrderNum = this.$route.params.equalOrder;
    if (this.MinerGradeNumber == 1) {
      this.MinerGrade = "大众矿工";
    } else if (this.MinerGradeNumber == 2) {
      this.MinerGrade = "白银矿工";
    } else if (this.MinerGradeNumber == 3) {
      this.MinerGrade = "黄金矿工";
    } else if (this.MinerGradeNumber == 4) {
      this.MinerGrade = "钻石矿工";
    }
  }
};
</script>
<style scoped>
.MinersJoinMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.MinersJoinHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #dfdfdf;
}
.MinersJoinHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.MinersJoinHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.MinersJoinBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.MinersJoinHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.MinersJoinBody {
  padding: 100px 75px;
  background: #fff;
  margin-top: 108px;
  /* border-bottom: 1px solid #dfdfdf; */
}
.MinersJoinInputDiv {
  width: 100%;
}
.MinersJoinInputDiv > input {
  width: 580px;
  padding: 0 10px;
  padding-bottom: 10px;
  font-size: 28px;
  color: #373d41;
}

.MinersJoinBtn:focus {
  outline: 0;
}
.MinersJoinBtn {
  width: 600px;
  height: 88px;
  font-size: 28px;
  border-radius: 2px;
  margin-top: 100px;
  border: 0;
}
.YesMinersJoinBtn {
  background: #0287ff !important;
  color: #fff !important;
}
.NoMinersJoinBtn {
  pointer-events: none;
  background: #eee;
  color: #949494;
}
.weui-btn:after {
  border: 0;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  background-color: #0260b2 !important;
}
.howObtainActivationCode > p:nth-child(1) {
  padding: 50px 0;
  padding-left: 24px;
  font-size: 28px;
  color: #373d41;
  font-weight: bolder;
}
.howObtainActivationCode > p:nth-child(2) {
  font-size: 24px;
  color: #949494;
  padding-left: 24px;
  padding-bottom: 50px;
}
.howObtainActivationCode > div:nth-child(3) {
  width: 240px;
  height: 240px;
  margin: auto;
}
.howObtainActivationCode > div:nth-child(3) > img {
  width: 100%;
  height: 100%;
}
.howObtainActivationCode > p:nth-child(4) {
  font-size: 26px;
  color: #373d41;
  padding-top: 30px;
  text-align: center;
}
.howObtainActivationCode > p:nth-child(5) {
  font-size: 20px;
  color: #949494;
  text-align: center;
  padding-top: 20px;
}
</style>


