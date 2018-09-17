<template>
  <div class="InvitationRecordMain" :style="'background: '+InvitationRecordMainBg">
      <div class="InvitationRecordHeader">
       <div class="InvitationRecordHeaderLeft">
         <div class="InvitationRecordBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="InvitationRecordHeaderText">邀请记录</div>
     </div>
     <ul class="AlreadyUsed" v-show="AlreadyUsedShow">
         <li v-for="item in AlreadyUsedData">
             <p class="AlreadyUsedOne">{{item.code}}</p>
             <p class="AlreadyUsedTow"><span>{{item.rank}}</span><span>{{item.value}}T云算力</span></p>
             <p class="AlreadyUsedThree"><span>使用人 : </span><span>{{item.username}}</span></p>
             <p class="AlreadyUsedFour"><span>上级 : </span><span>{{item.parent_name}}</span><span>{{item.create_time}}</span></p>
             <div class="AlreadyUsedFive"></div>
         </li>
     </ul>
     <div class="NoAlreadyUsed" v-show="!AlreadyUsedShow"></div>
     <p class="NoAlreadyUsedText" v-show="!AlreadyUsedShow">没有相关数据</p>
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
export default {
  data() {
    return {
      AlreadyUsedShow: true,
      AlreadyUsedData: "",
      InvitationRecordMainBg: "#f5f5f8",
      myTime: ""
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //使用过的激活码
    OldInvitationCode() {
      this.myTime = Math.round(new Date().getTime() / 1000).toString();
      axios
        .post(
          "ActivationCodeList",
          qs.stringify({
            time: this.myTime,
            token: md5(md5(md5(this.myTime) + "yun") + "yunkuang123"),
            use: 1
          })
        )
        .then(data => {
          if (data.status == 1) {
            if (data.data.length == undefined) {
              this.AlreadyUsedShow = false;
              this.InvitationRecordMainBg = "#fff";
            } else {
              this.AlreadyUsedShow = true;
              this.AlreadyUsedData = data.data;
              this.InvitationRecordMainBg = "#f5f5f8";
            }
          }
        })
        .catch(err => {});
    }
  },
  beforeMount() {
    this.OldInvitationCode();
  }
};
</script>
<style scoped>
.InvitationRecordMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.InvitationRecordHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
}
.InvitationRecordHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.InvitationRecordHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.InvitationRecordBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.InvitationRecordHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.AlreadyUsed {
  width: 100%;
  background: #fff;
  padding: 50px 0;
}
.AlreadyUsed > li {
  width: 654px;
  margin: auto;
  padding: 30px 24px;
  position: relative;
  box-shadow: rgba(000, 000, 000, 0.1) 0px 1px 8px 0px;
  margin-bottom: 30px;
}
.AlreadyUsed > li:last-child {
  margin-bottom: 0;
}
.AlreadyUsedOne {
  font-size: 24px;
  font-weight: bolder;
  color: #373d41;
}
.AlreadyUsedTow {
  margin-top: 30px;
  font-size: 24px;
}
.AlreadyUsedTow > span:nth-child(1) {
  color: #373d41;
}
.AlreadyUsedTow > span:nth-child(2) {
  color: #949494;
  margin-left: 20px;
}
.AlreadyUsedThree {
  margin-top: 30px;
  font-size: 26px;
  color: #ff721f;
}
.AlreadyUsedFour {
  margin-top: 30px;
  font-size: 26px;
  color: #0287ff;
}
.AlreadyUsedFour > span:nth-child(3) {
  float: right;
  color: #373d41;
}
.AlreadyUsedFive {
  width: 140px;
  height: 140px;
  position: absolute;
  top: 50px;
  right: 24px;
  background: url("../../static/img/invite_images_used.png") no-repeat;
  background-size: 100% 100%;
}
.NoAlreadyUsed {
  width: 191px;
  height: 122px;
  background: url("../../static/img/invite_images_information@2x.png") no-repeat;
  background-size: 100% 100%;
  margin: auto;
  margin-top: 433px;
}
.NoAlreadyUsedText {
  text-align: center;
  margin-top: 50px;
  font-size: 32px;
  color: #dfdfdf;
}
</style>

