<template>
  <div class="OrderDetailsNotPay">

       <div class="PublicDetailsHeader">
            <div class="PublicDetailsHeaderLeft">
                <div class="PublicDetailsBackPic" @click="BackUpperStory"></div>
            </div>
            <div class="PublicDetailsHeaderText">订单详情</div>
        </div>
        <div class='payMessage'>
            <ul>
                <li class='payPack'></li>
                <li>
                    <div>待支付</div>
                    <div>请在 <span>23:00:00</span>内完成支付, 超时将自动取消！</div>
                </li>
            </ul>
        </div>
        <p class='bacp'></p>
     <div>
          <ul class="IndexMemberGradeUl">
            <li>
            <div class='typeimg'><img src="../../static/img/HomePic/dazhong.png" alt=""></div>
            <div class='viooterPart'>
                <div class='viootertype'>
                    <span class='viooter'>大众矿工</span>
                    <span class='viooterpic'><img src="../../static/img/discounts@2x.png" alt="" ></span>
                 </div>
                <div class='lists'>
                    <span class='money'>￥1200.00</span><span class='total'>
                    </span><span class='concat'>合约T数：<span class='contacNum'>10T</span></span>
                </div>
            </div>
            </li>
         </ul>
         <div class='favrable'><div></div><span>优惠进行中,预计优惠结束后涨至1290.00元!</span></div>
         <div class='bacfff'></div>
         <p data-v-13edd9b7="" class="bacp"></p>
     </div>
     <div class='listdetails'>
         <ul>
             <li class='details det'>订单详情</li>
             <li>
                 <span>每T价格&nbsp;:&nbsp;<span>1200.00元</span></span><span class='datetime'>&nbsp;合约周期&nbsp;:&nbsp;<span>365d</span></span>
             </li>
             <li>
                 <span>结束方式&nbsp;:&nbsp;</span><span>每日10:00结算昨日收益</span>
             </li>
             <li>
                 <span>云矿工算力期数&nbsp;:&nbsp;</span><span>第二期</span>
             </li>
             <li class='gettime'>
                 <span>算力交割时间&nbsp;:&nbsp;</span><span>2018-01-10 22:22:22</span>
             </li>
             <li>
                 <span>收益发放时间&nbsp;:&nbsp;</span><span>2018-01-10 22:22:22</span>
             </li>
         </ul>   
         <p></p>
     </div>
     <div class='listdetails listpart'>
         <ul>
            
             <li class='gettime'>
                 <span>订单编号:&nbsp;:&nbsp;</span><span>12121212112xxx</span>
             </li>
             <li>
                 <span>下单时间:&nbsp;:&nbsp;</span><span>2018-01-10 22:22:22</span>
             </li>
         </ul>   
         <p></p>
     </div>
     <div class='activeuser'>
         <span>我是激活码用户</span><i></i>
     </div>
     <p></p>
     <div class='listdetails'>
         <ul>
             <li class='details'>支付方式</li>
             <li class='applys payTypee' @click='applys '><span class='apply '><img src="../../static/img/indent_images_zhifubao@2x.png" alt=""></span><span>支付宝付款</span><i v-if='applyactive'></i></li>
             <li class='wetchat payTypee' @click='wetchat'><span class='apply '><img src="../../static/img/indent_images_wechat@2x.png" alt=""></span><span>微信付款</span><i v-if='wetchatactive'></i></li>
             <li class='unionpay payTypee' @click='unionpay'><span class='apply '><img src="../../static/img/indent_images_idcard@2x.png" alt=""></span><span>银联付款</span><i v-if='unionpayactive'></i></li>
         </ul>   
        
     </div>
      
     <ul class='fixfooter'>
         <li><span>取消订单</span></li>
         <li><span>立即支付</span></li>
     </ul>
     <p class='bacbottom'></p>
  </div>
</template>

<script>
mounted: {
}
import axios from "../../utils/axios";
import qs from "qs";
export default {
  name: "OrderDetailsNotPay",
  data() {
    return {
      applyactive: true,
      wetchatactive: false,
      unionpayactive: false
    };
  },

  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.push("/DetailsOfTheMassMiners");
    },
    //选择支付方式
    applys() {
      (this.applyactive = true),
        (this.wetchatactive = false),
        (this.unionpayactive = false);
    },
    wetchat() {
      (this.applyactive = false),
        (this.wetchatactive = true),
        (this.unionpayactive = false);
    },
    unionpay() {
      (this.applyactive = false),
        (this.wetchatactive = false),
        (this.unionpayactive = true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contacNum {
  font-size: 24px;
}
.typeimg {
  width: 124px;
  height: 120px;
}
.payMessage > ul:after {
  display: block;
  content: "";
  clear: both;
}
.payMessage > ul {
  display: flex;
  align-items: center;
}
.payMessage > ul > li {
  float: left;
}
.payPack {
  width: 56px;
  height: 46px;
  background: url("../../static/img/notPay.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 24px;
}
.payMessage {
  margin-top: 88px;
  font-size: 26px;
  background: #cc0302;
  color: #fff;
  padding: 30px 0px 30px 24px;
}
.payMessage li > div:first-child {
  margin-bottom: 20px;
}
.lists {
  position: absolute;
  bottom: 21px;
  width: 100%;
}
.concat {
  float: right;
  margin-right: 24px;
  font-size: 26px;
}
.IndexMemberGradeUl .viooterPart {
  width: 100%;
  margin-right: 0px;
  height: 120px;
  position: relative;
  margin-left: 6px;
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
}

.OrderDetailsNotPay .bacbottom {
  background: #f2f2f8;
  height: 232px;
}
.fixfooter {
  position: fixed;
  bottom: 0;
  height: 132px;
  line-height: 98px;
  width: 100%;
  font-size: 28px;
  background: #fff;
  padding: 30px 0px;
  box-sizing: border-box;
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
.fixfooter li:last-child > span {
  background: #0287ff;
  color: #fff;
  border: 1px solid transparent;
}
.fixfooter li:first-child > span {
  border: 1px solid #949494;
}
.fixfooter > li {
  float: left;

  width: 50%;
}
.fixfooter > li > span {
  display: block;
  width: 258px;
  height: 70px;
  text-align: center;
  line-height: 72px;
  background: #fff;
  color: #373d41;
  border-radius: 2px;
  margin: 0 auto;
}
.apply {
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
.OrderDetailsNotPay > div > p,
.OrderDetailsNotPay > p {
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
  margin-left: 176px;
}
.listdetails > ul {
  padding: 50px 0px 0px 24px;
}
.listdetails > ul > li {
  margin-bottom: 50px;
}
.listdetails .details {
  height: 26px;
  font-size: 28px;
  border-left: 8px solid #0287ff;
  padding-left: 10px;
  color: #3d3d41;
  margin-bottom: 0px;
}
.listdetails .det {
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
.total b,
.total span {
  display: inline-block;
  width: 46px;
  height: 46px;
  text-align: center;
  vertical-align: bottom;
  letter-spacing: 0;
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
}
.money + span {
  font-size: 24px;
  color: #373d41;
  margin-right: 30px;
  float: right;
}
.viootertype {
  display: flex;
  font-size: 0;
  position: relative;
  top: 21px;
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
  height: 40px;
  line-height: 40px;
}
.OrderDetailsNotPay .groover {
  font-size: 28px;
  color: #373d21;
  margin-bottom: 30px;
}
.OrderDetailsNotPay .grooverType {
  margin-right: 10px;
}
.OrderDetailsNotPay .bacp {
  height: 20px;
  background: #f2f2f8;
}
.IndexMemberGradeUl {
  /* padding: 50px 24px 30px; */
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
.IndexMemberGradeUl li img {
  width: 124px;
  height: 120px;
  /* margin-right: 48px; */
}
.IndexMemberGradeUl > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.IndexMemberGradeUl > li > div {
  float: left;
  margin: 0 24px;
}

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
}
.listpart > ul {
  padding-top: 0px;
}
.listpart .gettime + li > span {
  font-weight: normal;
}
.listpart .gettime > span {
  font-weight: normal;
}
.listdetails .payTypee {
  padding: 50px 24px 50px 0px;
  border-bottom: 1px solid #f2f2f2;
  margin: 0;
  position: relative;
  display: flex;
  align-items: center;
}
.listdetails .payTypee:last-child {
  border-bottom: 0px;
}
</style>
