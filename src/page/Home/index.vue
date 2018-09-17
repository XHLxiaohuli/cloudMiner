<template>
  <div class="indexMain">
    <scroller :on-infinite="infinite" ref="myscroller">
        <div class="TopIndexBaranPic"><!--@click="jumpRedEnvelopes"-->
          <img src="../../static/img/bannrThree.jpg" alt="">
          <!-- <img src="../../static/img/banner_invite_three.jpg" alt=""> -->
          <!-- <broadcast></broadcast> -->
        </div>
        <div class="indexNotice" @click="jumpNoticeDetails">
          <div></div>
          <div>关于新系统升级福利活动公告</div>
          <div></div>
        </div>
        <div class="IndexMemberGrade">
          <h1>开启挖矿</h1>
          <ul class="IndexMemberGradeUl">
            <li  @click="jumpDetailsOfTheMassMiners">
              <div>
                <div>
                  <img src="../../static/img/dazhong.png" alt="">
                </div>
              </div>
              <div class="IndexMemberGradeLiRight IndexMemberGradeLiRightOne">
                <div>
                  <p>{{volkswagenHeadlines}}<span><img src="../../static/img/TowYouhui.jpg" alt=""></span></p>
                  <p>{{GeneralIntroduction}}</p>
                </div>
                <div>立即加入<span><img src="../../static/img/shouye-huiyuan.png" alt=""></span></div>
              </div>
            </li>
            <li @click="jumpSilverOfTheMassMiners">
              <div>
                <div>
                  <img src="../../static/img/baiyin.png" alt="">
                </div>
              </div>
              <div  class="IndexMemberGradeLiRight IndexMemberGradeLiRightTow">
                <div>
                  <p>{{silverHeadlines}}<span><img src="../../static/img/hotTow.png" alt=""></span></p>
                  <p>{{aBriefIntroductionToSilver}}</p>
                </div>
                <div>立即加入<span><img src="../../static/img/shouye-huiyuan.png" alt=""></span></div>
              </div>
            </li>
            <li  @click="jumpGoldOfTheMassMiners">
              <div>
                <div>
                  <img src="../../static/img/huangjin.png" alt="">
                </div>
              </div>
              <div class="IndexMemberGradeLiRight">
                <div>
                  <p>{{goldTitle}}</p>
                  <p>{{goldIntroduction}}</p>
                </div>
                <div>立即加入<span><img src="../../static/img/shouye-huiyuan.png" alt=""></span></div>
              </div>
            </li>
            <li @click="jumpDiamondsOfTheMassMiners">
              <div>
                <div>
                  <img src="../../static/img/zuanshi.png" alt="">
                </div>
              </div>
              <div class="IndexMemberGradeLiRight">
                <div>
                  <p>{{diamondHeadlines}}</p>
                  <p>{{aBriefIntroductionToDiamond}}</p>
                </div>
                <div >立即加入<span><img src="../../static/img/shouye-huiyuan.png" alt=""></span></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="IndexFill" v-if="CompleteLoadingOne"></div>
        <!--收益排行榜start-->
        <div class="IndexProfitRanking" v-if="CompleteLoadingOne">
          <h1>收益排行榜</h1>
          <ul class="IndexProfitRankingHeader">
            <li v-for="(item,index) in IndexProfitRankingHeaderData">{{item}}<span v-show="index==2" @click="munOrMoneyClick"></span></li>
          </ul>
          <ul class="IndexProfitRankingBody">
            <li v-for="(item,index) in IndexProfitRankingBodyData">
              <div>{{index++}}</div>
              <div>{{item.minersName}}</div>
              <div v-if="munOrMoney">{{item.totalBTC}}BTC</div>
              <div v-if="!munOrMoney">{{item.totalRMB}}元</div>
              <div>
                 <span v-if="item.userGrade==1">大众矿工</span>
                 <span v-if="(item.userGrade==2)&&(item.userStep==1)">初级白银</span>
                 <span v-if="(item.userGrade==2)&&(item.userStep==2)">中级白银</span>
                 <span v-if="(item.userGrade==2)&&(item.userStep==3)">高级白银</span>
                 <span v-if="(item.userGrade==3)&&(item.userStep==1)">初级黄金</span>
                 <span v-if="(item.userGrade==3)&&(item.userStep==2)">中级黄金</span>
                 <span v-if="(item.userGrade==3)&&(item.userStep==3)">高级黄金</span>
                 <span v-if="(item.userGrade==4)&&(item.userStep==1)">初级钻石</span>
                 <span v-if="(item.userGrade==4)&&(item.userStep==2)">中级钻石</span>
                 <span v-if="(item.userGrade==4)&&(item.userStep==3)">高级钻石</span>
              </div>
            </li>
          </ul>
          <div @click="jumpIncomeRankings" class="IndexProfitRankingBottom">查看全部更多</div>
        </div>
        <div class="IndexFill" v-if="CompleteLoadingTow"></div>
        <!--服务体系start-->
          <div class="indexServiceSystem" v-if="CompleteLoadingTow">
            <h1>服务体系</h1>
            <ul class="indexServiceSystemUl">
              <li>
                <div>
                  <img src="../../static/img/bushu.png" alt="">
                </div>
                <h1>集群部署</h1>
                <p>云矿工通过矿机的集群部署，为用户提供便捷的云算力租赁服务</p>
              </li>
              <li>
                <div>
                  <img src="../../static/img/weihu.png" alt="">
                </div>
                <h1>专人维护</h1>
                <p>配备专业的维护人员,保证用户的持续收益</p>
              </li>
              <li>
                <div>
                  <img src="../../static/img/suanli.png" alt="">
                </div>
                <h1>真实算力</h1>
                <p>正规电厂以及真实矿机，云矿工承诺算力100%真实</p>
              </li>
            </ul>
            <!--收益排行榜end-->
          </div>
        <!--服务体系end-->
        <!--加入动态start-->
          <div class="IndexFill" v-if="CompleteLoadingTow"></div>
          <div class="footBannr" v-if="CompleteLoadingTow">
            <p><span></span>正规化矿场，保证矿机持续供电</p>
            <swiper :options="swiperOption" ref="mySwiper" class="footerSwiper" v-show="optionsShow">
              <swiper-slide ><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[0].username}}</span><span class="footerSwiperSpanTow">加入了
                <span v-if="IndexJoinDynamicUlData[0].userGrade==1">大众矿工</span><span v-if="IndexJoinDynamicUlData[0].userGrade==2">白银</span><span v-if="IndexJoinDynamicUlData[0].userGrade==3">黄金</span><span v-if="IndexJoinDynamicUlData[0].userGrade==4">钻石</span><span v-if="IndexJoinDynamicUlData[0].userStep==1">初级</span><span v-if="IndexJoinDynamicUlData[0].userStep==2">高级</span><span v-if="IndexJoinDynamicUlData[0].userStep==3">中级</span>
              </span><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[0].DynamicTime}}</span></swiper-slide>
              <swiper-slide v-if="optionsOne"><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[1].username}}</span><span class="footerSwiperSpanTow">加入了
                <span v-if="IndexJoinDynamicUlData[1].userGrade==1">大众矿工</span><span v-if="IndexJoinDynamicUlData[1].userGrade==2">白银</span><span v-if="IndexJoinDynamicUlData[1].userGrade==3">黄金</span><span v-if="IndexJoinDynamicUlData[1].userGrade==4">钻石</span><span v-if="IndexJoinDynamicUlData[1].userStep==1">初级</span><span v-if="IndexJoinDynamicUlData[1].userStep==2">高级</span><span v-if="IndexJoinDynamicUlData[1].userStep==3">中级</span>
              </span><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[1].DynamicTime}}</span></swiper-slide>
              <swiper-slide v-if="optionsTow"><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[2].username}}</span><span class="footerSwiperSpanTow">加入了
                <span v-if="IndexJoinDynamicUlData[2].userGrade==1">大众矿工</span><span v-if="IndexJoinDynamicUlData[2].userGrade==2">白银</span><span v-if="IndexJoinDynamicUlData[2].userGrade==3">黄金</span><span v-if="IndexJoinDynamicUlData[2].userGrade==4">钻石</span><span v-if="IndexJoinDynamicUlData[2].userStep==1">初级</span><span v-if="IndexJoinDynamicUlData[2].userStep==2">高级</span><span v-if="IndexJoinDynamicUlData[2].userStep==3">中级</span>
              </span><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[2].DynamicTime}}</span></swiper-slide>
              <swiper-slide v-if="optionsThree"><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[3].username}}</span><span class="footerSwiperSpanTow">加入了
                <span v-if="IndexJoinDynamicUlData[3].userGrade==1">大众矿工</span><span v-if="IndexJoinDynamicUlData[3].userGrade==2">白银</span><span v-if="IndexJoinDynamicUlData[3].userGrade==3">黄金</span><span v-if="IndexJoinDynamicUlData[3].userGrade==4">钻石</span><span v-if="IndexJoinDynamicUlData[3].userStep==1">初级</span><span v-if="IndexJoinDynamicUlData[3].userStep==2">高级</span><span v-if="IndexJoinDynamicUlData[3].userStep==3">中级</span>
              </span><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[3].DynamicTime}}</span></swiper-slide>
              <swiper-slide v-if="optionsFour"><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[4].username}}</span><span class="footerSwiperSpanTow">加入了
                <span v-if="IndexJoinDynamicUlData[4].userGrade==1">大众矿工</span><span v-if="IndexJoinDynamicUlData[4].userGrade==2">白银</span><span v-if="IndexJoinDynamicUlData[4].userGrade==3">黄金</span><span v-if="IndexJoinDynamicUlData[4].userGrade==4">钻石</span><span v-if="IndexJoinDynamicUlData[4].userStep==1">初级</span><span v-if="IndexJoinDynamicUlData[4].userStep==2">高级</span><span v-if="IndexJoinDynamicUlData[4].userStep==3">中级</span>
              </span><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[4].DynamicTime}}</span></swiper-slide>
              <swiper-slide v-if="optionsFive"><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[5].username}}</span><span class="footerSwiperSpanTow">加入了
                <span v-if="IndexJoinDynamicUlData[5].userGrade==1">大众矿工</span><span v-if="IndexJoinDynamicUlData[5].userGrade==2">白银</span><span v-if="IndexJoinDynamicUlData[5].userGrade==3">黄金</span><span v-if="IndexJoinDynamicUlData[5].userGrade==4">钻石</span><span v-if="IndexJoinDynamicUlData[5].userStep==1">初级</span><span v-if="IndexJoinDynamicUlData[5].userStep==2">高级</span><span v-if="IndexJoinDynamicUlData[5].userStep==3">中级</span>
              </span><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[5].DynamicTime}}</span></swiper-slide>
              <swiper-slide v-if="optionsSix"><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[6].username}}</span><span class="footerSwiperSpanTow">加入了
                <span v-if="IndexJoinDynamicUlData[6].userGrade==1">大众矿工</span><span v-if="IndexJoinDynamicUlData[6].userGrade==2">白银</span><span v-if="IndexJoinDynamicUlData[6].userGrade==3">黄金</span><span v-if="IndexJoinDynamicUlData[6].userGrade==4">钻石</span><span v-if="IndexJoinDynamicUlData[6].userStep==1">初级</span><span v-if="IndexJoinDynamicUlData[6].userStep==2">高级</span><span v-if="IndexJoinDynamicUlData[6].userStep==3">中级</span>
              </span><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[6].DynamicTime}}</span></swiper-slide>
              <swiper-slide v-if="optionsSeven"><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[7].username}}</span><span class="footerSwiperSpanTow">加入了
                <span v-if="IndexJoinDynamicUlData[7].userGrade==1">大众矿工</span><span v-if="IndexJoinDynamicUlData[7].userGrade==2">白银</span><span v-if="IndexJoinDynamicUlData[7].userGrade==3">黄金</span><span v-if="IndexJoinDynamicUlData[7].userGrade==4">钻石</span><span v-if="IndexJoinDynamicUlData[7].userStep==1">初级</span><span v-if="IndexJoinDynamicUlData[7].userStep==2">高级</span><span v-if="IndexJoinDynamicUlData[7].userStep==3">中级</span>
              </span><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[7].DynamicTime}}</span></swiper-slide>
              <swiper-slide v-if="optionsEight"><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[8].username}}</span><span class="footerSwiperSpanTow">加入了
                <span v-if="IndexJoinDynamicUlData[8].userGrade==1">大众矿工</span><span v-if="IndexJoinDynamicUlData[8].userGrade==2">白银</span><span v-if="IndexJoinDynamicUlData[8].userGrade==3">黄金</span><span v-if="IndexJoinDynamicUlData[8].userGrade==4">钻石</span><span v-if="IndexJoinDynamicUlData[8].userStep==1">初级</span><span v-if="IndexJoinDynamicUlData[8].userStep==2">高级</span><span v-if="IndexJoinDynamicUlData[8].userStep==3">中级</span>
              </span><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[8].DynamicTime}}</span></swiper-slide>
              <swiper-slide v-if="optionsNine"><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[9].username}}</span><span class="footerSwiperSpanTow">加入了
                <span v-if="IndexJoinDynamicUlData[9].userGrade==1">大众矿工</span><span v-if="IndexJoinDynamicUlData[9].userGrade==2">白银</span><span v-if="IndexJoinDynamicUlData[9].userGrade==3">黄金</span><span v-if="IndexJoinDynamicUlData[9].userGrade==4">钻石</span><span v-if="IndexJoinDynamicUlData[9].userStep==1">初级</span><span v-if="IndexJoinDynamicUlData[9].userStep==2">高级</span><span v-if="IndexJoinDynamicUlData[9].userStep==3">中级</span>
              </span><span class="footerSwiperSpan">{{IndexJoinDynamicUlData[9].DynamicTime}}</span></swiper-slide>
            </swiper>
          </div>
        <!--加入动态end-->
        <div class="indexBaseline" v-if="CompleteLoadingTow">
          <hr><div>我也是有底线的</div><hr>
        </div>
        <!-- <div class="footBox"></div> -->
        <div class="indexMask" @touchmove="indexMaskTouch" v-if="indexMaskShow">
          <div>
            <div class="maskBody">
              <span>不再提示</span>
              <div></div>
              <div><img src="../../static/img/images_code@2x.png" alt=""></div>
              <p>你是否关注云矿工公众号?</p>
            </div>
            <div class="maskButtomBtn">
              <div>不关注</div>
              <div>已经关注</div>
            </div>
          </div>
      </div>
      <!--加载图标satrt-->
      <!-- <div class="spinnerDiv" v-if="spinnerIf">
        <Loading></Loading>
      </div> -->
      <!--加载图标end-->
    </scroller>
  </div>
</template>
<script>
import Loading from "../LoadIcon/LoadIcon";
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import Vue from "vue";
import broadcast from "../Broadcast/broadcast";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);
import myFunction from "@/page/encryption/encryption";
export default {
  name: "carrousel",
  components: {
    broadcast,
    Loading,
    myFunction
  },
  data() {
    return {
      IndexProfitRankingHeaderData: ["排名", "云矿工", "累计收益", "矿工等级"],
      IndexProfitRankingBodyData: "",
      IndexJoinDynamicUlData: "",
      swiperOption: {
        delay: 5000,
        notNextTick: true,
        autoplay: true,
        direction: "vertical",
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        mousewheelControl: true,
        observeParents: true,
        allowTouchMove: false
      },
      optionsShow: true,
      optionsOne: true,
      optionsTow: true,
      optionsThree: true,
      optionsFour: true,
      optionsFive: true,
      optionsSix: true,
      optionsSeven: true,
      optionsEight: true,
      optionsNine: true,

      munOrMoney: true,
      munOrMoneyNum: 0,

      myTime: "",

      indexMaskShow: false,
      frequency: 1,
      frequencyTow: 1,

      CompleteLoadingOne: false, //刚开始加载页面，收益排行榜不显示
      CompleteLoadingTow: false, //刚开始加载页面，服务体系及以下不显示
      noData: "",
      spinnerIf: false,
      //获取商品列表的接口商品名称和介绍
      volkswagenHeadlines: "",
      silverHeadlines: "",
      goldTitle: "",
      diamondHeadlines: "",
      GeneralIntroduction: "",
      aBriefIntroductionToSilver: "",
      goldIntroduction: "",
      aBriefIntroductionToDiamond: "",
      VolkswagenId: "",
      SilverId: "",
      GoldId: "",
      DiamondId: ""
    };
  },
  methods: {
    //上拉刷新加载更多数据
    infinite(done) {
      if (this.noData) {
        setTimeout(() => {
          this.$refs.myscroller.finishInfinite(2);
        });
        return;
      }
      let self = this; //第一次上拉刷新收益排行榜数据
      if (this.frequency == 1) {
        self.frequency++;
        self.ReturnsalistFunction();
      }
      if (self.IndexProfitRankingBodyData != "" && this.frequencyTow == 1) {
        //第二次上拉刷新加入动态数据榜数据
        this.frequencyTow++;
        self.DynamicStateFunction();
      }

      if (self.IndexJoinDynamicUlData != "") {
        self.noData = "没有更多数据";
      }
      self.$refs.myscroller.resize();
      done();
    },

    //关注公众号阻止冒泡时间方法
    indexMaskTouch(e) {
      e.preventDefault();
    },
    //跳转红包接口
    // jumpRedEnvelopes(){
    //   axios
    //     .post("PostAllUserInformation", qs.stringify({}))
    //     .then(data => {
    //       if(data.status == -1){
    //         this.$router.push("/Login/3");
    //       }else if (data.status == 1) {
    //         this.$router.push("/redEnvelopes");
    //       }
    //     })
    //     .catch(err => {});
    // },
    //跳转到公告详情
    jumpNoticeDetails() {
      this.$router.push("/noticeDetails");
    },
    //跳转到大众加入页面
    jumpDetailsOfTheMassMiners() {
      this.$router.push("/DetailsOfTheMassMiners/" + this.VolkswagenId);
    },
    //跳转到白银加入页面
    jumpSilverOfTheMassMiners() {
      this.$router.push("/SilverOfTheMassMiners/" + this.SilverId);
    },
    //跳转到黄金加入页面
    jumpGoldOfTheMassMiners() {
      this.$router.push("/GoldOfTheMassMiners/" + this.GoldId);
    },
    //跳转到钻石加入页面
    jumpDiamondsOfTheMassMiners() {
      this.$router.push("/DiamondsOfTheMassMiners/" + this.DiamondId);
    },
    jumpIncomeRankings() {
      this.$router.push("/IncomeRankings");
    },
    //主页面收益排行榜收益条数
    ReturnsalistFunction() {
      this.spinnerIf = true;
      // this.myTime = Math.round(new Date().getTime() / 1000).toString();
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myPageSize = 5;
      var myArr = ["requestId=" + myRequestId, "pageSize=" + myPageSize];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/account/getEarningsInfoList.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "IncomeRankings",
          qs.stringify({
            pageSize: 5
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
            //用户第一次请求数据
            this.spinnerIf = false;
            this.IndexProfitRankingBodyData = data.list;
            this.CompleteLoadingOne = true;
          } else {
            var myRequestIds = myFunction.myUuid();
            var myTimestamps = Math.round(
              new Date().getTime() / 1000
            ).toString();
            var myPageSizes = 5;
            var myArrs = [
              "requestId=" + myRequestIds,
              "pageSize=" + myPageSizes
            ];
            var myFunctionValue =
              myFunction.myFunction(myArrs) +
              "/api/account/getEarningsInfoList.do";
            var myFunctionValues = md5(myFunctionValue).toUpperCase();
            axios
              .post(
                "IncomeRankings",
                qs.stringify({
                  pageSize: 5
                }),
                {
                  requestId: myRequestIds,
                  timestamp: myTimestamps,
                  channelType: "h5",
                  sign: myFunctionValuess
                }
              )
              .then(data => {
                if (data.status == "success") {
                  //用户第一次请求数据
                  this.spinnerIf = false;
                  this.IndexProfitRankingBodyData = data.list;
                  this.CompleteLoadingOne = true;
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //云矿工动态接口
    DynamicStateFunction() {
      this.spinnerIf = true;
      // this.myTime = Math.round(new Date().getTime() / 1000).toString();
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myArr = ["requestId=" + myRequestId];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/user/getNewUserInfoList.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post("NewUserRegistrationInformation", qs.stringify({}), {
          requestId: myRequestId,
          timestamp: myTimestamp,
          channelType: "h5",
          sign: myFunctionValues
        })
        .then(data => {
          if (data.status == "success") {
            var NowTimeArr = [];
            var NowTime =
              Math.round(new Date().getTime() / 1000).toString() * 1000;

            for (var i = 0; i < data.list.length; i++) {
              if (
                parseInt(
                  parseInt(
                    (parseInt(NowTime) - parseInt(data.list[i].createTime)) /
                      1000
                  ) / 60
                ) > 1
              ) {
                if (
                  parseInt(
                    parseInt(
                      parseInt(
                        (parseInt(NowTime) -
                          parseInt(data.list[i].createTime)) /
                          1000
                      ) / 60
                    ) / 60
                  ) > 1
                ) {
                  if (
                    parseInt(
                      parseInt(
                        parseInt(
                          parseInt(
                            (parseInt(NowTime) -
                              parseInt(data.list[i].createTime)) /
                              1000
                          ) / 60
                        ) /
                          60 /
                          24
                      )
                    ) > 1
                  ) {
                    if (
                      parseInt(
                        parseInt(
                          parseInt(
                            parseInt(
                              parseInt(
                                (parseInt(NowTime) -
                                  parseInt(data.list[i].createTime)) /
                                  1000
                              ) / 60
                            ) /
                              60 /
                              24
                          )
                        ) / 7
                      ) > 1
                    ) {
                      NowTimeArr.push(
                        myFunction.timestampToTime(data.list[i].createTime)
                      );
                    } else {
                      var day =
                        parseInt(
                          parseInt(
                            parseInt(
                              parseInt(
                                (parseInt(NowTime) -
                                  parseInt(data.list[i].createTime)) /
                                  1000
                              ) / 60
                            ) /
                              60 /
                              24
                          )
                        ) + "天前";
                      NowTimeArr.push(day);
                    }
                  } else {
                    var hour =
                      parseInt(
                        parseInt(
                          parseInt(
                            (parseInt(NowTime) -
                              parseInt(data.list[i].createTime)) /
                              1000
                          ) / 60
                        ) / 60
                      ) + "小时前";
                    NowTimeArr.push(hour);
                  }
                } else {
                  var Minute =
                    parseInt(
                      parseInt(
                        (parseInt(NowTime) -
                          parseInt(data.list[i].createTime)) /
                          1000
                      ) / 60
                    ) + "分钟之前";
                  NowTimeArr.push(Minute);
                }
              } else {
                NowTimeArr.push("一分钟之内");
              }
              // NowTimeArr.push(parseInt(parseInt(parseInt((parseInt(NowTime)-parseInt(data.list[i].createTime))/1000)/60)/60))
              //  NowTimeArr.push(parseInt(parseInt(parseInt((parseInt(NowTime)-parseInt(data.list[i].createTime))/1000)/60)/60))
              data.list[i]["DynamicTime"] = NowTimeArr[i];
              //myFunction.timestampToTime(data.list[i].createTime)
            }
            //用户第一次下拉刷新请求加入动态数据
            this.spinnerIf = false;
            this.CompleteLoadingTow = true;
            // clearInterval(timeTow);
            if (data.list.length == 0) {
              this.optionsShow = false;
            } else {
              if (data.list.length == 1) {
                this.optionsOne = false;
                this.optionsTow = false;
                this.optionsThree = false;
                this.optionsFour = false;
                this.optionsFive = false;
                this.optionsSix = false;
                this.optionsSeven = false;
                this.optionsEight = false;
                this.optionsNine = false;
                this.IndexJoinDynamicUlData = data.list;
              } else if (data.list.length == 2) {
                this.optionsTow = false;
                this.optionsThree = false;
                this.optionsFour = false;
                this.optionsFive = false;
                this.optionsSix = false;
                this.optionsSeven = false;
                this.optionsEight = false;
                this.optionsNine = false;
                this.IndexJoinDynamicUlData = data.list;
              } else if (data.list.length == 3) {
                this.optionsThree = false;
                this.optionsFour = false;
                this.optionsFive = false;
                this.optionsSix = false;
                this.optionsSeven = false;
                this.optionsEight = false;
                this.optionsNine = false;
                this.IndexJoinDynamicUlData = data.list;
              } else if (data.list.length == 4) {
                this.optionsFour = false;
                this.optionsFive = false;
                this.optionsSix = false;
                this.optionsSeven = false;
                this.optionsEight = false;
                this.optionsNine = false;
                this.IndexJoinDynamicUlData = data.list;
              } else if (data.list.length == 5) {
                this.optionsFive = false;
                this.optionsSix = false;
                this.optionsSeven = false;
                this.optionsEight = false;
                this.optionsNine = false;
                this.IndexJoinDynamicUlData = data.list;
              } else if (data.list.length == 6) {
                this.optionsSix = false;
                this.optionsSeven = false;
                this.optionsEight = false;
                this.optionsNine = false;
                this.IndexJoinDynamicUlData = data.list;
              } else if (data.list.length == 7) {
                this.optionsSeven = false;
                this.optionsEight = false;
                this.optionsNine = false;
                this.IndexJoinDynamicUlData = data.list;
              } else if (data.list.length == 8) {
                this.optionsEight = false;
                this.optionsNine = false;
                this.IndexJoinDynamicUlData = data.list;
              } else if (data.list.length == 9) {
                this.optionsNine = false;
                this.IndexJoinDynamicUlData = data.list;
              } else {
                this.IndexJoinDynamicUlData = data.list;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //btc和Rmb切换
    munOrMoneyClick() {
      if (this.munOrMoneyNum % 2 == 0) {
        this.munOrMoney = false;
        this.munOrMoneyNum++;
      } else {
        this.munOrMoney = true;
        this.munOrMoneyNum++;
      }
    },
    //关注公众号弹窗
    PostAllUserInformationFunction() {
      //   this.myTime = Math.round(new Date().getTime() / 1000).toString();
      //   axios
      //     .post(
      //       "PostAllUserInformation",
      //       qs.stringify({
      //         time: this.myTime,
      //         token: md5(md5(md5(this.myTime) + "yun") + "yunkuang123")
      //       })
      //     )
      //     .then(data => {
      //       if (data.status == 1) {
      //         this.indexMaskShow = false;
      //       } else {
      //         this.indexMaskShow = false;
      //       }
      //     })
      //     .catch(err => {});
    },
    AmountAccess() {
      //访问网页数量接口
      // this.myTime = Math.round(new Date().getTime() / 1000).toString();
      // axios
      //   .post(
      //     "AmountOfAccess",
      //     qs.stringify({
      //       time: this.myTime,
      //       token: md5(md5(md5(this.myTime) + "yun") + "yunkuang123"),
      //       way: "index"
      //     })
      //   )
      //   .then(data => {})
      //   .catch(err => {});
    },
    //获取商品列表的接口
    GetAListOfGoods() {
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myArr = ["requestId=" + myRequestId];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/order/goods/getGoodsList.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post("ListOfGoods", qs.stringify({}), {
          requestId: myRequestId,
          timestamp: myTimestamp,
          channelType: "h5",
          sign: myFunctionValues
        })
        .then(data => {
          this.volkswagenHeadlines = data.list[0].goodsName;
          this.silverHeadlines = data.list[1].goodsName;
          this.goldTitle = data.list[2].goodsName;
          this.diamondHeadlines = data.list[3].goodsName;
          this.GeneralIntroduction = data.list[0].introduction;
          this.aBriefIntroductionToSilver = data.list[1].introduction;
          this.goldIntroduction = data.list[2].introduction;
          this.aBriefIntroductionToDiamond = data.list[3].introduction;
          this.VolkswagenId = data.list[0].goodsId;
          this.SilverId = data.list[1].goodsId;
          this.GoldId = data.list[2].goodsId;
          this.DiamondId = data.list[3].goodsId;
        })
        .catch(err => {});
    }
  },
  beforeMount() {
    this.GetAListOfGoods();
    this.AmountAccess();
    // this.PostAllUserInformationFunction();
    // sessionStorage['myNAme'] = 'Mr.chen';
    // console.log(sessionStorage['myNAme'])
    // sessionStorage['myLike'] = '钱';
    // console.log(sessionStorage['myLike'])

    // var myObj={"name":"Mr.chen","Like":"YoungerSister"}
    // myObj=JSON.stringify(myObj)
    // sessionStorage.setItem('myAll', myObj);
    // console.log(sessionStorage.getItem('myAll'))
    // console.log(JSON.parse(sessionStorage.getItem('StoragePrice')))
  },
  mounted() {}
};
</script>
<style scoped>
.footBox {
  height: 100px;
  width: 100%;
  background: #f5f5f8;
}
.IndexFill {
  width: 100%;
  height: 20px;
  background: #f5f5f8;
}
.TopIndexBaranPic {
  width: 100%;
  height: 422px;
}
.TopIndexBaranPic > img {
  width: 100%;
  height: 100%;
}
.IndexMemberGrade {
  margin-top: 20px;
}
.IndexMemberGrade > h1,
.IndexProfitRanking > h1,
.indexServiceSystem > h1 {
  text-align: center;
  padding: 50px 0;
  font-size: 32px;
  color: #373d41;
  font-weight: bolder;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
}
.IndexMemberGradeUl {
  padding: 20px 24px;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
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
}
.IndexMemberGradeUl > li > div:nth-child(1) {
  width: 150px;
}
.IndexMemberGradeUl > li > div:nth-child(1) > div {
  width: 124px;
  height: 120px;
  margin-top: 30px;
}
.IndexMemberGradeUl > li > div:nth-child(1) > div > img {
  width: 100%;
  height: 100%;
}
.IndexMemberGradeLiRight {
  width: 528px;
  padding: 50px 0;
  padding-left: 24px;
  border-bottom: 1px solid #f2f2f2;
}
.IndexMemberGradeUl > li:last-child > div:nth-child(2) {
  border-bottom: 0;
}
.IndexMemberGradeLiRight > div:nth-child(1) {
  float: left;
}
.IndexMemberGradeLiRight > div:nth-child(1) > p:nth-child(1) {
  font-size: 32px;
  color: #373d41;
  position: relative;
}
.IndexMemberGradeLiRightOne > div:nth-child(1) > p:nth-child(1) > span,
.IndexMemberGradeLiRightTow > div:nth-child(1) > p:nth-child(1) > span {
  display: inline-block;
  width: 92px;
  height: 40px;
  margin-left: 12px;
  position: absolute;
  top: -5px;
}
.IndexMemberGradeLiRightOne > div:nth-child(1) > p:nth-child(1) > span > img,
.IndexMemberGradeLiRightTow > div:nth-child(1) > p:nth-child(1) > span > img {
  width: 100%;
  height: 100%;
}
.IndexMemberGradeLiRight > div:nth-child(1) > p:nth-child(2) {
  margin-top: 26px;
  font-size: 24px;
  color: #949494;
}
.IndexMemberGradeLiRight > div:nth-child(2),
.IndexMemberGradeLiRight > div:nth-child(3) {
  float: right;
}
.IndexMemberGradeLiRight > div:nth-child(2) {
  font-size: 24px;
  color: #0287ff;
  line-height: 80px;
}
.IndexMemberGradeLiRight > div:nth-child(2) > span {
  display: inline-block;
  width: 10px;
  height: 18px;
  margin-left: 10px;
}
.IndexMemberGradeLiRight > div:nth-child(2) > span > img {
  width: 100%;
  height: 100%;
}
.IndexMemberGradeLiRight > div:nth-child(3) {
  font-size: 24px;
  color: #ccc;
  line-height: 80px;
}
.IndexProfitRanking {
  width: 100%;
  background: #fff;
}
.IndexProfitRankingHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.IndexProfitRankingHeader > li {
  width: 21.33%;
  float: left;
  font-size: 26px;
  color: #949494;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 40px;
  position: relative;
}

.IndexProfitRankingBody > li:first-child > div:first-child {
  background: url("../../static/img/one@2x.png") no-repeat center center;
  background-size: 28px 28px;
}
.IndexProfitRankingBody > li:nth-child(2) > div:first-child {
  background: url("../../static/img/two@2x.png") no-repeat center center;
  background-size: 28px 28px;
}
.IndexProfitRankingBody > li:nth-child(3) > div:first-child {
  background: url("../../static/img/three@2x.png") no-repeat center center;
  background-size: 28px 28px;
}
.IndexProfitRankingBody > li:first-child > div:first-child,
.IndexProfitRankingBody > li:nth-child(2) > div:first-child,
.IndexProfitRankingBody > li:nth-child(3) > div:first-child {
  color: transparent;
}
.IndexProfitRankingHeader > li:nth-child(3) {
  width: 36%;
}
.IndexProfitRankingBody > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.IndexProfitRankingBody > li > div {
  text-align: center;
  width: 21.333%;
  float: left;
  font-size: 28px;
  color: #373d41;
  margin-bottom: 50px;
}
.IndexProfitRankingBody > li > div:nth-child(3) {
  width: 36%;
}
.IndexProfitRankingBottom {
  width: 100%;
  height: 88px;
  text-align: center;
  font-size: 24px;
  color: #0287ff;
  line-height: 88px;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #dfdfdf;
}
.indexServiceSystem {
  background: #fff;
}
.indexServiceSystemUl {
  border-bottom: 1px solid #dfdfdf;
}
.indexServiceSystemUl:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.indexServiceSystemUl > li {
  width: 26.9%;
  float: left;
  padding: 50px 3.2%;
}
.indexServiceSystemUl > li > div:nth-child(1) {
  width: 120px;
  height: 120px;
  margin-left: 41px;
}
.indexServiceSystemUl > li > div:nth-child(1) > img {
  width: 100%;
  height: 100%;
}
.indexServiceSystemUl > li > h1:nth-child(2) {
  font-size: 28px;
  color: #373d41;
  text-align: center;
  margin-top: 30px;
}
.indexServiceSystemUl > li > p:nth-child(3) {
  font-size: 20px;
  color: #949494;
  margin-top: 50px;
  text-align: center;
  line-height: 35px;
}
.footBannr {
  padding: 50px 0;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
}
.footBannr > p:first-child {
  text-align: center;
  color: #0287ff;
  font-size: 24px;
}
.footBannr > p:first-child > span {
  display: inline-block;
  width: 21px;
  height: 24px;
  background: url("../../static/img/duanpai.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 10px;
  position: relative;
  top: 1px;
}
.footerSwiper {
  text-align: center;
  height: 60px;
  padding-top: 29px;
  margin-top: 30px;
}
.footerSwiperSpan {
  font-size: 26px;
}
.footerSwiperSpanTow {
  font-size: 26px;
  margin: 0 24px;
}
.indexBaseline {
  background: #f5f5f8;
  width: 100%;
  padding: 60px 0;
}
.indexBaseline > hr {
  border: 0;
  border-bottom: 1px solid #dfdfdf;
  margin: 0;
  width: 33%;
  position: relative;
  top: -8px;
  display: inline-block;
}
.indexBaseline > div {
  display: inline-block;
  font-size: 24px;
  width: 34%;
  color: #bfbfbf;
  text-align: center;
}
.indexNotice {
  font-size: 0;
  background: #fff;
  padding: 0 24px;
  padding-top: 30px;
  padding-bottom: 25px;
}
.indexNotice:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.indexNotice > div:nth-child(1) {
  float: left;
  width: 32px;
  height: 32px;
  position: relative;
  top: -4px;
  background: url("../../static/img/index_images_trumpet.gif") no-repeat;
  background-size: 100% 100%;
}
.indexNotice > div:nth-child(2) {
  float: left;
  font-size: 24px;
  color: #373d41;
  margin-left: 24px;
}
.indexNotice > div:nth-child(3) {
  float: right;
  width: 14px;
  height: 24px;
  background: url("../../static/img/question_states_close@2x.png") no-repeat;
  background-size: 100% 100%;
}
.IndexProfitRankingHeader > li > span {
  display: inline-block;
  width: 24px;
  height: 20px;
  background: url("../../static/img/index_earnings_cut@2x.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 8px;
  position: absolute;
  top: 4px;
}
.indexMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  background: rgba(000, 000, 000, 0.4);
}
.indexMask > div {
  width: 600px;
  height: 508px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding-top: 20px;
  background: #fff;
}
.maskButtomBtn:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.maskButtomBtn {
  width: 100%;
  padding: 30px 0;
  background: #f2f2f8;
}
.maskButtomBtn > div {
  float: left;
  width: 50%;
  text-align: center;
  font-size: 28px;
}
.maskButtomBtn > div:nth-child(1) {
  color: #949494;
  border-right: 1px solid #dfdfdf;
  box-sizing: border-box;
}
.maskButtomBtn > div:nth-child(2) {
  color: #0287ff;
}
.maskBody {
  padding: 0 20px;
  position: relative;
}
.maskBody > span:nth-child(1) {
  font-size: 25px;
  color: #949494;
  position: absolute;
  right: 20px;
  top: 20px;
}
.maskBody > div:nth-child(2) {
  width: 114px;
  height: 69px;
  background: url("../../static/img/toast_images_trumpet@2x.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 20px;
}
.maskBody > div:nth-child(3) {
  width: 240px;
  height: 240px;
  margin: auto;
  padding-top: 69px;
}
.maskBody > div:nth-child(3) > img {
  width: 100%;
  height: 100%;
}
.maskBody > p:nth-child(4) {
  text-align: center;
  font-size: 32px;
  color: #373d41;
  padding-top: 30px;
  padding-bottom: 50px;
}
/**********加载图标样式Css start****************/
.spinnerDiv {
  position: relative;
  padding: 30px 0;
}
/**********加载图标样式Css end****************/
</style>


