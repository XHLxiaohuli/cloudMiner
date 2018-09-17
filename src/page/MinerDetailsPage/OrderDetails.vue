<template>
  <div class="OrderDetails">
      <div>
          
      
       <div class="PublicDetailsHeader">
            <div class="PublicDetailsHeaderLeft">
                <div class="PublicDetailsBackPic" @click="BackUpperStory"></div>
            </div>
            <div class="PublicDetailsHeaderText ">订单详情</div>
        </div>
        <p class='bacp'></p>
     <div>
          <ul class="IndexMemberGradeUl">
            <li>
            <div class='titpic'>
                <img v-if='this.worktype==1' src="../../static/img/dazhong.png" alt="">
                <img v-if='this.worktype==2' src="../../static/img/baiyin.png" alt="">
                <img v-if='this.worktype==3' src="../../static/img/huangjin.png" alt="">
                <img v-if='this.worktype==4' src="../../static/img/zuanshi.png" alt="">
            </div>
            <div class='viooterPart'>
                <div class='viootertype'>
                    <span class='viooter'>{{rankName}}</span>
                    <span class='viooterpic' v-if='this.worktype==1'><img src="../../static/img/discounts@2x.png" alt="" ></span>
                    <span class='viooterpic' v-if='this.worktype==2'><img src="../../static/img/hotTow.png" alt="" ></span>
                    
                 </div>
                <div class='lists'> <span class='money'>￥{{allnum*eachmoney+0.00}}</span>
                   <span class='total' v-if='this.worktype==1'><i @click='reducenum'></i><span class='num' >{{allnum}}</span><b @click='addnum'></b>
                    </span><span class='concat' v-if='this.worktype==1'>合约T数
                      </span><span class='otherconcat' v-if='this.worktype==2||this.worktype==3||this.worktype==4'>合约T数 : {{allnum}}T</span>
                    
                </div>
            </div>
            </li>
         </ul>
         <!--优惠公告去除，不需要-->
         <div class='favrable' v-if='false'><div></div><span>优惠进行中,预计优惠结束后涨至1290.00元!</span></div>
         <div class='bacfff'></div>
         <p data-v-13edd9b7="" class="bacp"></p>
     </div>
     <div class='listdetails'>
         <ul>
             <li class='details dets'>订单详情</li>
             <li class='eachmoney'>
                 <span>每T价格&nbsp;:&nbsp;<span>{{eachmoney}}元</span></span><span class='datetime'>合约周期&nbsp;:&nbsp;<span>730d</span></span>
             </li>
             <li>
                 <span>结束方式&nbsp;:&nbsp;</span><span>每日10:00结算昨日收益</span>
             </li>
             <li>
                 <span>云矿工算力期数&nbsp;:&nbsp;</span><span>第二期</span>
             </li>
             <li class='gettime'>
                 <span>算力交割时间&nbsp;:&nbsp;</span><span>{{nowDate}}</span>
             </li>
             <li>
                 <span>收益发放时间&nbsp;:&nbsp;</span><span>{{nextDate}}</span>
             </li>
         </ul>   
         <p></p>
     </div>
     <p></p>
     <div class='activeuser' @click='toActiveUser'>
         <span>我是激活码用户</span><i></i>
     </div>
     <!--请求第四方交易start-->
     <!-- <form id="Submission" action="http://trans.palmf.cn/sdk/api/v1.0/cli/order_h5/0"  method="post" style="float:left;opacity: 0;">
        <input type="text" name="orderInfo" value="" id="name2">
     </form> -->
     <!--请求第四方交易end-->
     <p></p>
     <!--选择支付方式-->
     <div class='listdetails'>
         <ul>
             <li class='details '>支付方式</li>
             <li class='applys paytyee' @click='applys'><span class='apply '><img src="../../static/img/indent_images_zhifubao@2x.png" alt=""></span><span>支付宝付款</span><i v-if='applyactive'></i></li>
             <!-- <li class='wetchat paytyee' @click='wetchat'><span class='apply '><img src="../../static/img/indent_images_wechat@2x.png" alt=""></span><span>微信付款</span><i v-if='wetchatactive'></i></li>
             <li class='unionpay paytyee' @click='unionpay'><span class='apply '><img src="../../static/img/indent_images_idcard@2x.png" alt=""></span><span>银联付款</span><i v-if='unionpayactive'></i></li> -->
         </ul>   
        
     </div>
      
     <ul class='fixfooter'>
         <li><span>实付款&nbsp;:&nbsp;</span><span class='paymoney'>{{myTotalPrices}}元</span></li>
         <li @click='applynNow'>立即支付</li><!--<router-link to='/OrderDetailsNotPay'>立即支付</router-link>-->
      </ul>
     <p class='bacbottom'></p>
     </div>
     <!--弹框提示-->
     <div class='alertMessage' v-if='showalertMessage'>
         <div>
             提示
             <i @click='deletemask'></i>
         </div>
         <div>
             支付完成前请不要关闭本窗口
         </div>
         <ul>
             <li @click='payWays'><span>另选支付方式</span></li>
             <li><span>已完成支付</span></li>
         </ul>
     </div>
     <div class='mask' :style="' height:  '+maskheight+'vw'" v-if='showmask' id='mask'>
         
     </div>
     <div class='inmask' :style="' height:  '+inmaskheight+'vw'" v-if='inshowmask' id='inmask'></div>
     <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text="LoginerrorPrompt" :position="position">{{('Basic Usage') }}</toast>
     <!--用来盛放后台返回支付宝的form表单-->
     <div id="Alipay"></div>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import qs from "qs";
import { setTimeout } from "timers";
import md5 from "js-md5";
import myFunction from "@/page/encryption/encryption";
import { Toast } from "vux";
export default {
  name: "OrderDetails",
  components: {
    myFunction,
    Toast
  },
  data() {
    return {
      applyactive: true,
      wetchatactive: false,
      unionpayactive: false,
      worktype: this.$route.params.type, //类型
      allnum: "", //输入T值
      allT: this.$route.params.MaximumValue, //最大T值
      eachmoney: this.$route.params.unitPrice, //单价
      equalOrder: this.$route.params.myEqualOrder, //等阶
      rankName: "", //等级名称
      showalertMessage: false,
      maskhei: "",
      maskheight: 0,
      inmaskheight: 0,
      nromal: true,
      showmask: false, //面罩
      inshowmask: false,
      nowDate: "",
      nextDate: "",
      orderInfos: "",
      PaymentMethod: 2,
      myTotalPrices: "", //应付价格
      showPositionValue: false,
      LoginerrorPrompt:"",
      position: "",
    };
  },

  methods: {
    //放回上一级
    BackUpperStory() {
      if (this.worktype == 1) {
        this.$router.push("/DetailsOfTheMassMiners");
      } else if (this.worktype == 2) {
        this.$router.push("/SilverOfTheMassMiners");
      } else if (this.worktype == 3) {
        this.$router.push("/GoldOfTheMassMiners");
      } else {
        this.$router.push("/DiamondsOfTheMassMiners");
      }
    },
    //减
    reducenum() {
      if (this.allnum > 0) {
        this.allnum = (this.allnum * 10 - 1) / 10;
        this.myTotalPrices =
              Math.floor(this.allnum * this.$route.params.unitPrice * 100) /
              100;
      }
    },
    //加
    addnum() {
      if (this.allnum < this.allT) {
        this.allnum = (this.allnum * 10 + 1) / 10;
        this.myTotalPrices =
              Math.floor(this.allnum * this.$route.params.unitPrice * 100) /
              100;
      }
    },
    //选择支付方式
    applys() {
      (this.applyactive = true),
        (this.wetchatactive = false),
        (this.unionpayactive = false);
      this.PaymentMethod = 2;
    },
    wetchat() {
      (this.applyactive = false),
        (this.wetchatactive = true),
        (this.unionpayactive = false);
      this.PaymentMethod = 1;
    },
    unionpay() {
      (this.applyactive = false),
        (this.wetchatactive = false),
        (this.unionpayactive = true);
      this.PaymentMethod = 3;
    },
    //选择支付
    applynNow() {
      if(this.allnum<=0){
        //注释的是错误弹窗提示
        this.LoginerrorPrompt = "购买T数不能小于0";
        this.position = "middle";
        this.showPositionValue = true;
      }else{
          var _this = this;
          var myRequestId = myFunction.myUuid();
          var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
          var myUserId = localStorage.getItem("userID");
          var myGoodsId = this.$route.params.type;
          var myGoodsName = this.$route.params.CommodityName;
          var myGoodsGrade = this.$route.params.type;
          var myGoodsStep = "";
          if (this.$route.params.type >= 2) {
            myGoodsStep = this.$route.params.myEqualOrder;
          } else if (this.$route.params.type == 1) {
            myGoodsStep = 0;
          }
          var myCalculate = this.allnum;
          var myUnitPrice = this.$route.params.unitPrice;
          var myTotalPrice =
            Math.floor(this.allnum * this.$route.params.unitPrice * 100) / 100;
          var myIpAddress = returnCitySN["cip"];
          var myPayType = this.PaymentMethod;
          var myArr = [
            "requestId=" + myRequestId,
            "userId=" + myUserId,
            "goodsId=" + myGoodsId,
            "goodsName=" + myGoodsName,
            "goodsGrade=" + myGoodsGrade,
            "goodsStep=" + myGoodsStep,
            "calculate=" + myCalculate,
            "unitPrice=" + myUnitPrice,
            "totalPrice=" + myTotalPrice,
            "ipAddress=" + myIpAddress,
            "payType=" + myPayType
          ];
          var myFunctionValue =
            myFunction.myFunction(myArr) + "/api/cash/order/createAndPayOrder.do";
          var myFunctionValues = md5(myFunctionValue).toUpperCase();
          axios
            .post(
              "ThirdPartyPayment",
              qs.stringify({
                userId: myUserId,
                goodsId: myGoodsId,
                goodsName: myGoodsName,
                goodsGrade: myGoodsGrade,
                goodsStep: myGoodsStep,
                calculate: myCalculate,
                unitPrice: myUnitPrice,
                totalPrice: myTotalPrice,
                ipAddress: myIpAddress,
                payType: myPayType
              }),
              {
                requestId: myRequestId,
                timestamp: myTimestamp,
                channelType: "h5",
                sign: myFunctionValues
              }
            )
            .then(data => {
              if (data.code == 413) {
                this.$router.push("/Login/1");
              } else {
                document.getElementById(
                  "Alipay"
                ).innerHTML = data.data.aliPayForm.split("<script>")[0];
                document.forms[0].submit();
                //请求第四方交易
                // document.getElementById("name2").value=data.data.reqParams
                // document.getElementById("Submission").submit();
              }
            })
            .catch(err => {});
          // (this.showalertMessage = true),
          //   (this.inshowalertMessage = true),
          //   (this.showmask = true),
          //   (this.maskheight = this.maskhei);
      }
      
    },
    //关闭弹框
    deletemask() {
      (this.showmask = false),
        (this.inshowmask = false),
        (this.showalertMessage = false);
    },
    //激活码用户
    toActiveUser() {
      if (this.worktype == 1) {
        this.$router.push(
          "/MinersJoin/" +
            this.worktype +
            "/" +
            this.allnum +
            "/" +
            this.equalOrder
        );
      } else {
        this.$router.push(
          "/MinersJoin/" + this.worktype + "/valueNull/" + this.equalOrder
        );
      }
    },
    //
    payWays() {
      (this.showmask = false),
        (this.inshowmask = false),
        (this.showalertMessage = false);
    },
    TNumberDifference() {
      var userGrade = "";
      var userEqualOrder = "";
      var userOriginalValue = "";
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
          userGrade = data.data.userGrade;
          userEqualOrder = data.data.userStep;
          if (userGrade == 2) {
            if (userEqualOrder == 1) {
              userOriginalValue = 0.1;
            } else if (userEqualOrder == 2) {
              userOriginalValue = 0.2;
            } else if (userEqualOrder == 3) {
              userOriginalValue = 0.4;
            }
          } else if (userGrade == 3) {
            if (userEqualOrder == 1) {
              userOriginalValue = 1.4;
            } else if (userEqualOrder == 2) {
              userOriginalValue = 2.4;
            } else if (userEqualOrder == 3) {
              userOriginalValue = 4.4;
            }
          } else if (userGrade == 4) {
            if (userEqualOrder == 1) {
              userOriginalValue = 14.4;
            } else if (userEqualOrder == 2) {
              userOriginalValue = 24.4;
            } else if (userEqualOrder == 3) {
              userOriginalValue = 44.4;
            }
          }
          if (this.$route.params.type >= 2) {
            this.allnum =
              (this.$route.params.tValue * 10 - userOriginalValue * 10) / 10;
            this.myTotalPrices =
              Math.floor(this.allnum * this.$route.params.unitPrice * 100) /
              100;
          } else {
            this.allnum = this.$route.params.tValue;
            this.myTotalPrices =
              Math.floor(this.allnum * this.$route.params.unitPrice * 100) /
              100;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.TNumberDifference();
    this.rankName = this.$route.params.CommodityName;
  },
  mounted() {
    //明天时间
    var TomorrowTime=new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000
    this.nowDate =myFunction.timestampToTime(TomorrowTime)
    //后天时间
    var TheDayAfterTomorrow=new Date(new Date().toLocaleDateString()).getTime()+2*24*60*60*1000+10*60*60*1000
    this.nextDate =myFunction.timestampToTime(TheDayAfterTomorrow)

    setTimeout(() => {
      var appid = document.getElementById("app");
      this.maskhei = appid.offsetHeight;
      this.inmaskhei = appid.offsetHeight;
    }, 0);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.otherconcat {
  position: absolute;
  bottom: 0px;
  right: 0px;
  color: #373d41;
  font-size: 24px;
  text-align: right;
}
.titpic {
  width: 120px;
  height: 120px;
  margin: 0 24px;
}
.titpic > img {
  /* width: 100%; */
  height: 100%;
}
.mask {
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  opacity: 0.4;
  top: 0;
  z-index: 100;
}
.inmask {
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  opacity: 0.4;
  top: 0;
  z-index: 101;
}
.alertMessage > ul:after {
  display: block;
  content: "";
  clear: both;
}
.alertMessage > ul {
  height: 80px;
  line-height: 80px;
  background: #f2f2f8;
}
.alertMessage ul > li {
  float: left;
  width: 50%;
}
.alertMessage ul > li > span {
  font-size: 26px;
}
.alertMessage ul > li:first-child > span {
  display: inline-block;
  width: 100%;
  height: 24px;
  line-height: 24px;
  border-right: 1px solid #dfdfdf;
}
.alertMessage ul > li:last-child {
  color: #0287ff;
}
.alertMessage {
  text-align: center;
  color: #373741;
  position: fixed;
  top: 30%;
  left: 17%;
  width: 500px;
  background: #fff;
  z-index: 1000;
}
.alertMessage > div:first-child {
  font-weight: 700;
  font-size: 28px;
  padding: 30px 24px;
  border-bottom: 1px solid #dfdfdf;
}
.alertMessage > div:nth-child(2) {
  font-size: 26px;
  padding: 50px 0px;
}
.lists {
  position: absolute;
  height: 46px;
  bottom: 21px;
  width: 100%;
}
.concat {
  float: right;

  font-size: 26px;
  position: absolute;
  bottom: 0px;
  right: 250px;
}
.IndexMemberGradeUl .viooterPart {
  width: 100%;
  margin-right: 0px;
  height: 120px;
  position: relative;
}

.applys i,
.wetchat i,
.unionpay i {
  display: inline-block;
  width: 26px;
  height: 26px;
  background: url("../../static/img/indent_state_selected@2x.png") no-repeat;
  background-size: 100% 100%;
  float: right;
  position: absolute;
  right: 24px;
}

.OrderDetails .bacbottom {
  background: #f2f2f8;
  height: 198px;
}
.fixfooter {
  position: fixed;
  bottom: 0;
  height: 98px;
  line-height: 98px;
  width: 100%;
  font-size: 28px;
  background: #fff;
  border-top: 1px solid #dfdfdf;
}
.fixfooter:after {
  display: block;
  clear: both;
  content: "";
}
.fixfooter .paymoney {
  color: #ff721f;
}
.fixfooter li:last-child {
  background: #0287ff;
  color: #fff;
}
.fixfooter > li {
  float: left;
  width: 50%;
  text-align: center;
  height: 100%;
  background: #fff;
}
.fixfooter > li a {
  color: #fff;
}
.OrderDetails .listdetails .apply {
  display: inline-block;
  width: 46px;
  height: 34px;
  margin-right: 30px;
  vertical-align: middle;
}
.apply > img {
  width: 100%;
  height: 100%;
}
.activeuser {
  padding: 50px 24px;
  color: #ff0303;
  font-size: 28px;
}
.activeuser i {
  display: inline-block;
  width: 14px;
  height: 26px;
  background: url("../../static/img/back.png") no-repeat;
  background-size: 100% 100%;
  float: right;
}
.OrderDetails > div > p,
.OrderDetails > p {
  background: #f2f2f8;
  height: 20px;
  border-top: 1px solid #dfdfdf;
}

.listdetails .gettime {
  padding-top: 50px;
  border-top: 1px solid #f2f2f8;
}
.gettime + li > span {
  font-weight: 800;
}
.gettime > span {
  font-weight: 800;
}
.listdetails .datetime {
}
.listdetails > ul {
  padding: 50px 0px 0px 24px;
}
.listdetails > ul > li {
  margin-bottom: 50px;
}
.listdetails > ul > li:nth-child(2) {
  padding-right: 24px;
}
.listdetails > ul > li:nth-child(2) > span {
  display: inline-block;
  width: 50%;
}
.listdetails > ul > li:nth-child(2) > span:nth-child(2) {
  box-sizing: border-box;
  height: 34px;
  line-height: 34px;
}
.listdetails .details {
  height: 26px;
  font-size: 28px;
  border-left: 8px solid #0287ff;
  padding-left: 10px;
  color: #3d3d41;
  margin-bottom: 0px;
}
.listdetails .dets {
  margin-bottom: 50px;
}
.listdetails > ul > li {
  font-size: 26px;
  color: #373d41;
}
.bacfff {
  background: #fff;
  height: 50px;
}
.favrable {
  position: relative;
}
.favrable > div {
  height: 50px;
  line-height: 50px;
  opacity: 0.05;
  background: #ff0303;
}
.favrable span {
  color: #ff0303;
  opacity: 0.8;
  position: absolute;
  top: 0px;
  left: 24px;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
}
.total {
  font-size: 0;
}
.num {
  background: #f2f2f8;
  font-size: 24px;
  color: #373d41;
  line-height: 46px;
}
.total i,
.total b {
  display: inline-block;
  width: 46px;
  height: 46px;
  text-align: center;
  vertical-align: bottom;
  letter-spacing: 0;
}
.total .num {
  display: inline-block;
  text-align: center;
  vertical-align: bottom;
  letter-spacing: 0;
  width: 100px;
  height: 46px;
  font-size: 24px;
}
.total i {
  background: url("../../static/img/indent_buttom_increase@2x.png") no-repeat
    center center;
  background-size: 100% 100%;
}
.total b {
  background: url("../../static/img/indent_buttom_reduce@2x.png") no-repeat
    center center;
  background-size: 100% 100%;
}
.money {
  font-size: 28px;
  color: #ff721f;
  float: left;
  position: absolute;
  bottom: 0;
}
.money + span {
  font-size: 24px;
  color: #373d41;
  margin-right: 24px;
  float: right;
  width: 196px;
}
.viootertype {
  display: flex;
  font-size: 0;
  position: relative;
  bottom: -21px;
}
.viooterpic {
  width: 92px;
  height: 40px;
  display: block;
  position: relative;
  top: -8px;
}
.viootertype .viooterpic > img {
  height: 100%;
  width: 100%;
}
.viooter {
  font-size: 28px;
  color: #373d41;
  margin-right: 10px;
}
.OrderDetails .groover {
  font-size: 28px;
  color: #373d21;
  margin-bottom: 30px;
}
.OrderDetails .grooverType {
  margin-right: 10px;
}
.OrderDetails .bacp {
  height: 108px;
  background: #f2f2f8;
}
.IndexMemberGradeUl {
  padding-top: 50px;
  padding-bottom: 30px;
  background: #fff;
}
.IndexMemberGradeUl > li {
  display: flex;
  align-items: center;
}
.IndexMemberGradeUl > li:first-child {
  font-size: 0px;
}
/* .IndexMemberGradeUl li img {
  width: 100%;
  height: 100%;
} */
.IndexMemberGradeUl > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
/* .IndexMemberGradeUl > li > div {
  float: left;
  margin: 0 24px;
} */

.PublicDetailsHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;

  position: fixed;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #dfdfdf;
}
.PublicDetailsHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.PublicDetailsHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.PublicDetailsBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.PublicDetailsHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.bacfff + .bacp {
  height: 20px;
  border-top: 1px solid #dfdfdf;
}
.listdetails .paytyee {
  padding: 50px 0px;
  padding-right: 24px;
  margin: 0px;
  border-bottom: 1px solid #f2f2f2;
  position: relative;
  display: flex;
  align-items: center;
}
.listdetails .paytyee:last-child {
  border: none;
}
.alertMessage i {
  display: block;
  width: 26px;
  height: 26px;
  background: url("../../static/img/alertDelete.png") no-repeat;
  background-size: 100% 100%;
  float: right;
}
</style>
