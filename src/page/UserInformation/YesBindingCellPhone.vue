<!--作者:var-->
<template>
  <div class="YesBindingCellPhoneMain">
      <div class="YesBindingCellPhoneHeader">
       <div class="YesBindingCellPhoneHeaderLeft">
         <div class="YesBindingCellPhoneBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="YesBindingCellPhoneHeaderText">手机号码</div>
     </div>
     <ul class="YesBindingCellPhoneUl">
         <li>
             <div>手机号码</div>
             <div>{{YesBindingUserPhone}}</div>
         </li>
         <li @click="jumpChangePhoneNum">
             <div>更改绑定手机号码</div>
             <div>
               <img src="../../static/img/rukou-qiehuan.png" alt="">
             </div>
         </li>
     </ul>
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
export default {
  data() {
    return {
      YesBindingUserPhone: "",
      myTime: ""
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    jumpChangePhoneNum() {
      this.$router.push("/NoBindingCellPhone/2");
    }
  },
  beforeMount() {
    this.YesBindingUserPhone = sessionStorage["userPhone"];
  }
};
</script>
<style scoped>
.YesBindingCellPhoneMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.YesBindingCellPhoneHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.YesBindingCellPhoneHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.YesBindingCellPhoneHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.YesBindingCellPhoneBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.YesBindingCellPhoneHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.YesBindingCellPhoneUl {
  background: #fff;
  padding: 0 24px;
  margin-bottom: 50px;
  border-bottom: 1px solid #dfdfdf;
}
.YesBindingCellPhoneUl > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.YesBindingCellPhoneUl > li {
  padding: 50px 0;
  height: 28px;
  font-size: 28px;
  border-bottom: 1px solid #f2f2f2;
}
.YesBindingCellPhoneUl > li:last-child {
  border-bottom: 0;
}
.YesBindingCellPhoneUl > li:first-child > div:first-child {
  color: #373d41;
  float: left;
}
.YesBindingCellPhoneUl > li:first-child > div:last-child {
  color: #949494;
  float: right;
}
.YesBindingCellPhoneUl > li:last-child > div:first-child {
  float: left;
  color: #0287ff;
}
.YesBindingCellPhoneUl > li:last-child > div:last-child {
  float: right;
  width: 14px;
  height: 28px;
}
.YesBindingCellPhoneUl > li:last-child > div:last-child > img {
  width: 100%;
  height: 100%;
}
</style>




