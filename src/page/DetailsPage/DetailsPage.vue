<template>
  <div class="DetailsPageMain">
      <div class="DetailsPageHeader">
       <div class="DetailsPageHeaderLeft">
         <div class="DetailsPageBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="DetailsPageHeaderText">{{HowMinerdetailsHeader}}</div>
     </div>
     <ul class="DetailsPageTitle">
         <li v-for="(item,index) in DetailsPageTitleText" @click="jumpIntroduceOrRecordOrPic(index)" :class="{addBottonBorder:index==modifyIndex}">{{item}}</li>
     </ul>
     <div>
         <router-view/>
     </div>
     <div class="FooterDetails"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      HowMinerdetailsHeader: "",
      DetailsPageTitleText: ["项目介绍", "加入记录", "矿场图片"],
      modifyIndex: 0,
      IsGradeIndex: ""
    };
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      // this.$router.go(-1);
      if (this.IsGradeIndex == 1) {
        this.$router.push("/DetailsOfTheMassMiners");
      } else if (this.IsGradeIndex == 2) {
        this.$router.push("/SilverOfTheMassMiners");
      } else if (this.IsGradeIndex == 3) {
        this.$router.push("/GoldOfTheMassMiners");
      } else if (this.IsGradeIndex == 4) {
        this.$router.push("/DiamondsOfTheMassMiners");
      }
      localStorage.removeItem("key");
    },
    //跳转介绍，记录或者图片页面
    jumpIntroduceOrRecordOrPic(index) {
      this.modifyIndex = index;
      localStorage.setItem("key", this.modifyIndex);
      if (index == 0) {
        this.$router.push(
          "/DetailsPage/nullNum/projectDetails/" + this.IsGradeIndex
        );
      } else if (index == 1) {
        this.$router.push(
          "/DetailsPage/nullNum/AddARecord/" + this.IsGradeIndex
        );
      } else if (index == 2) {
        this.$router.push(
          "/DetailsPage/nullNum/FieldPicture/" + this.IsGradeIndex
        );
      }
    }
  },
  beforeMount() {
    this.IsGradeIndex = this.$route.params.GradeIndex;
    this.IsGradeIndex = window.location.href[window.location.href.length - 1];
    if (this.IsGradeIndex == 1) {
      this.HowMinerdetailsHeader = "大众矿工详情页";
    } else if (this.IsGradeIndex == 2) {
      this.HowMinerdetailsHeader = "白银矿工详情页";
    } else if (this.IsGradeIndex == 3) {
      this.HowMinerdetailsHeader = "黄金矿工详情页";
    } else if (this.IsGradeIndex == 4) {
      this.HowMinerdetailsHeader = "钻石矿工详情页";
    }
    if (localStorage.getItem("key") == null) {
      this.modifyIndex = 0;
    } else if (localStorage.getItem("key") != null) {
      this.modifyIndex = localStorage.getItem("key");
    }
  }
};
</script>
<style scoped>
.DetailsPageMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.DetailsPageHeader {
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #f2f2f2;
}
.DetailsPageHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DetailsPageHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.DetailsPageBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.DetailsPageHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.DetailsPageTitle {
  background: #fff;
  position: fixed;
  top: 88px;
  z-index: 100;
  width: 100%;
  padding: 30px 0;
  border-bottom: 1px solid #f2f2f2;
}
.DetailsPageTitle:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.DetailsPageTitle > li {
  float: left;
  width: 180px;
  height: 60px;
  line-height: 60px;
  color: #949494;
  font-size: 28px;
  text-align: center;
  background: #fff;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
}
.DetailsPageTitle > li:nth-child(2) {
  border-left: 0;
  border-right: 0;
}
.DetailsPageTitle > li:first-child {
  margin-left: 106px;
}
.addBottonBorder {
  background: #0287ff !important;
  color: #fff !important;
  border: 1px solid #0287ff !important;
}
.FooterDetails {
  width: 100%;
  height: 100px;
  background: #f5f5f8;
}
</style>


