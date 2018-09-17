<template>
  <div  class="redEnveRuleMain">
      <div class="redEnveRuleHeader">
        <div class="redEnveRuleHeaderLeft">
            <div class="redEnveRuleBackPic" @click="BackUpperStory"></div>
        </div>
        <div class="redEnveRuleHeaderText">云矿工邀请活动</div>
        <div @click="jumpAllredEnveRule">邀请记录</div>
      </div>
      <div class="redEnveBanner"></div>
      <div class="redEnvelopesBox" v-show="WhetherSuccessOne">
          <img v-show="!WhetherReceive" src="../../static/img/hongbao1.png" alt="">
          <img v-show="WhetherReceive" src="../../static/img/hongbao2.png" alt="">
          <div v-show="RemoveShow">
              <x-button class="RemoveBtn" @click.native="showPosition('middle')" type="primary" ></x-button> 
          </div>
      </div>
      <div class="activityRule" v-show="false" @click="activityRuleClick"></div>
      <ul class="ReceiveSuccess" v-show="WhetherSuccessTow">
          <!-- <li v-for="(item,index) in ReceiveSuccessData">
              <div>
                  <p id=getcode>{{item.code}}</p>
                  <p><span>{{item.rank}}</span><span>(仅限使用一次)</span></p>
                  <p>{{item.value}}T云算力</p>
              </div>
              <div>
                  <button class="copyInvitationClass" @click="copyInvitationClick(index)" data-clipboard-action="cut" data-clipboard-target="#fooTow">复制</button>
              </div>
              <input class="copyInvitationInput" type="text" id="fooTow" :value="item.code">
          </li> -->
          <li v-if="ReceiveSuccessA">
              <div>
                  <p id=getcodeA>{{ReceiveSuccessData[0].code}}</p>
                  <p><span>{{ReceiveSuccessData[0].rank}}</span><span>(仅限使用一次)</span></p>
                  <p>{{ReceiveSuccessData[0].value}}T云算力</p>
              </div>
              <div>
                  <button class="copyInvitationClassA" @click="copyWxA" data-clipboard-action="cut" data-clipboard-target="#fooTowA">复制</button>
              </div>
              <input class="copyInvitationInput" type="text" id="fooTowA" :value="ReceiveSuccessData[0].code">
          </li>
          <!--第一个-->
          <li v-if="ReceiveSuccessB">
              <div>
                  <p id=getcodeB>{{ReceiveSuccessData[1].code}}</p>
                  <p><span>{{ReceiveSuccessData[1].rank}}</span><span>(仅限使用一次)</span></p>
                  <p>{{ReceiveSuccessData[1].value}}T云算力</p>
              </div>
              <div>
                  <button class="copyInvitationClassB" @click="copyWxB" data-clipboard-action="cut" data-clipboard-target="#fooTowB">复制</button>
              </div>
              <input class="copyInvitationInput" type="text" id="fooTowB" :value="ReceiveSuccessData[1].code">
          </li>
          <!--第二个-->
          <li v-if="ReceiveSuccessC">
              <div>
                  <p id=getcodeC>{{ReceiveSuccessData[2].code}}</p>
                  <p><span>{{ReceiveSuccessData[2].rank}}</span><span>(仅限使用一次)</span></p>
                  <p>{{ReceiveSuccessData[2].value}}T云算力</p>
              </div>
              <div>
                  <button class="copyInvitationClassC" @click="copyWxC" data-clipboard-action="cut" data-clipboard-target="#fooTowC">复制</button>
              </div>
              <input class="copyInvitationInput" type="text" id="fooTowC" :value="ReceiveSuccessData[2].code">
          </li>
          <!--第三个-->
          <li v-if="ReceiveSuccessD">
              <div>
                  <p id=getcodeD>{{ReceiveSuccessData[3].code}}</p>
                  <p><span>{{ReceiveSuccessData[3].rank}}</span><span>(仅限使用一次)</span></p>
                  <p>{{ReceiveSuccessData[3].value}}T云算力</p>
              </div>
              <div>
                  <button class="copyInvitationClassD" @click="copyWxD" data-clipboard-action="cut" data-clipboard-target="#fooTowD">复制</button>
              </div>
              <input class="copyInvitationInput" type="text" id="fooTowD" :value="ReceiveSuccessData[3].code">
          </li>
          <!--第四个-->
          <li v-if="ReceiveSuccessE">
              <div>
                  <p id=getcodeE>{{ReceiveSuccessData[4].code}}</p>
                  <p><span>{{ReceiveSuccessData[4].rank}}</span><span>(仅限使用一次)</span></p>
                  <p>{{ReceiveSuccessData[4].value}}T云算力</p>
              </div>
              <div>
                  <button class="copyInvitationClassE" @click="copyWxE" data-clipboard-action="cut" data-clipboard-target="#fooTowE">复制</button>
              </div>
              <input class="copyInvitationInput" type="text" id="fooTowE" :value="ReceiveSuccessData[4].code">
          </li>
          <!--第五个-->
          <li v-if="ReceiveSuccessF">
              <div>
                  <p id=getcodeF>{{ReceiveSuccessData[5].code}}</p>
                  <p><span>{{ReceiveSuccessData[5].rank}}</span><span>(仅限使用一次)</span></p>
                  <p>{{ReceiveSuccessData[5].value}}T云算力</p>
              </div>
              <div>
                  <button class="copyInvitationClassF" @click="copyWxF" data-clipboard-action="cut" data-clipboard-target="#fooTowF">复制</button>
              </div>
              <input class="copyInvitationInput" type="text" id="fooTowF" :value="ReceiveSuccessData[5].code">
          </li>
          <!--第六个-->
          <li v-if="ReceiveSuccessG">
              <div>
                  <p id=getcodeG>{{ReceiveSuccessData[6].code}}</p>
                  <p><span>{{ReceiveSuccessData[6].rank}}</span><span>(仅限使用一次)</span></p>
                  <p>{{ReceiveSuccessData[6].value}}T云算力</p>
              </div>
              <div>
                  <button class="copyInvitationClassG" @click="copyWxG" data-clipboard-action="cut" data-clipboard-target="#fooTowG">复制</button>
              </div>
              <input class="copyInvitationInput" type="text" id="fooTowG" :value="ReceiveSuccessData[6].code">
          </li>
          <!--第七个-->
          <li v-if="ReceiveSuccessH">
              <div>
                  <p id=getcodeH>{{ReceiveSuccessData[7].code}}</p>
                  <p><span>{{ReceiveSuccessData[7].rank}}</span><span>(仅限使用一次)</span></p>
                  <p>{{ReceiveSuccessData[7].value}}T云算力</p>
              </div>
              <div>
                  <button class="copyInvitationClassH" @click="copyWxH" data-clipboard-action="cut" data-clipboard-target="#fooTowH">复制</button>
              </div>
              <input class="copyInvitationInput" type="text" id="fooTowH" :value="ReceiveSuccessData[7].code">
          </li>
          <!--第八个-->
          <li v-if="ReceiveSuccessI">
              <div>
                  <p id=getcodeI>{{ReceiveSuccessData[8].code}}</p>
                  <p><span>{{ReceiveSuccessData[8].rank}}</span><span>(仅限使用一次)</span></p>
                  <p>{{ReceiveSuccessData[8].value}}T云算力</p>
              </div>
              <div>
                  <button class="copyInvitationClassI" @click="copyWxI" data-clipboard-action="cut" data-clipboard-target="#fooTowI">复制</button>
              </div>
              <input class="copyInvitationInput" type="text" id="fooTowI" :value="ReceiveSuccessData[8].code">
          </li>
          <!--第九个-->
          <li v-if="ReceiveSuccessJ">
              <div>
                  <p id=getcodeJ>{{ReceiveSuccessData[9].code}}</p>
                  <p><span>{{ReceiveSuccessData[9].rank}}</span><span>(仅限使用一次)</span></p>
                  <p>{{ReceiveSuccessData[9].value}}T云算力</p>
              </div>
              <div>
                  <button class="copyInvitationClassJ" @click="copyWxJ" data-clipboard-action="cut" data-clipboard-target="#fooTowJ">复制</button>
              </div>
              <input class="copyInvitationInput" type="text" id="fooTowJ" :value="ReceiveSuccessData[9].code">
          </li>
          <!--第十个-->
      </ul>
      <div v-show="WhetherSuccessThree">
          <div class="NonConformity"></div>
          <p class="NonConformityText">您已经很努力完成这次活动了期待下次活动吧~</p>
      </div>
      <div v-show="WhetherSuccessFour" class="ReceiveSuccessFill"></div>
      <div class="redEnveFooter">立即邀请好友</div>
      <toast width="13em" v-model="showPositionValue" type="text" :time="1500" is-show-mask :text="redEnvePrompt" :position="position">{{('Basic Usage') }}</toast>
      <div class="activityRuleMaskMask" v-show="activityRuleMaskMaskShow">
          <div>
              <h1>云矿工官网免费送算力活动</h1>
              <p>活动如下：</p>
              <p>云矿工平台新用户可免费领取10个初级白银矿工激活码名额，每个为0.1T算力，一个账户只能激活一次，其余激活码需邀请好友使用，用以增长算力和收益。</p>
              <p>本活动规定无邀请则无收益，请尽快邀请好友激活初级白银矿工，2天后即可得收益。</p>
              <p>此次发放10000个免费初级白银矿工名额，送完即止。</p>
              <div @click="Shield">我知道了</div>
          </div>
      </div>
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import { Toast, XButton } from "vux";
import { fail } from "assert";
import Clipboard from "clipboard";
export default {
  components: {
    Toast,
    XButton
  },
  data() {
    return {
      //密码或者手机号错误弹出框提示
      showPositionValue: false,
      position: "",
      redEnvePrompt: "",

      WhetherReceive: false,
      RemoveShow: true,
      WhetherSuccessOne: false, //活动结束，封闭领取入口
      WhetherSuccessTow: true,
      WhetherSuccessThree: false, //活动结束，封闭领取入口
      WhetherSuccessFour: false, //活动结束，封闭活动规则

      ReceiveSuccessData: [
        { code: "" },
        { code: "" },
        { code: "" },
        { code: "" },
        { code: "" },
        { code: "" },
        { code: "" },
        { code: "" },
        { code: "" },
        { code: "" }
      ],

      ReceiveSuccessA: true,
      ReceiveSuccessB: true,
      ReceiveSuccessC: true,
      ReceiveSuccessD: true,
      ReceiveSuccessE: true,
      ReceiveSuccessF: true,
      ReceiveSuccessG: true,
      ReceiveSuccessH: true,
      ReceiveSuccessI: true,
      ReceiveSuccessJ: true,

      activityRuleMaskMaskShow: false,

      myTime: ""
    };
  },
  methods: {
    //复制功能1
    copyWxA() {
      var clipboard = new Clipboard(".copyInvitationClassA");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
        alert("复制成功");
      });
      clipboard.on("error", e => {
        // 不支持复制
        alert("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcodeA").innerHTML;
    },
    //复制功能2
    copyWxB() {
      var clipboard = new Clipboard(".copyInvitationClassB");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
        alert("复制成功");
      });
      clipboard.on("error", e => {
        // 不支持复制
        alert("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcodeB").innerHTML;
    },
    //复制功能3
    copyWxC() {
      var clipboard = new Clipboard(".copyInvitationClassC");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
        alert("复制成功");
      });
      clipboard.on("error", e => {
        // 不支持复制
        alert("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcodeC").innerHTML;
    },
    //复制功能4
    copyWxD() {
      var clipboard = new Clipboard(".copyInvitationClassD");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
        alert("复制成功");
      });
      clipboard.on("error", e => {
        // 不支持复制
        alert("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcodeD").innerHTML;
    },
    //复制功能5
    copyWxE() {
      var clipboard = new Clipboard(".copyInvitationClassE");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
        alert("复制成功");
      });
      clipboard.on("error", e => {
        // 不支持复制
        alert("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcodeE").innerHTML;
    },
    //复制功能6
    copyWxF() {
      var clipboard = new Clipboard(".copyInvitationClassF");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
        alert("复制成功");
      });
      clipboard.on("error", e => {
        // 不支持复制
        alert("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcodeF").innerHTML;
    },
    //复制功能7
    copyWxG() {
      var clipboard = new Clipboard(".copyInvitationClassG");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
        alert("复制成功");
      });
      clipboard.on("error", e => {
        // 不支持复制
        alert("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcodeG").innerHTML;
    },
    //复制功能8
    copyWxH() {
      var clipboard = new Clipboard(".copyInvitationClassH");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
        alert("复制成功");
      });
      clipboard.on("error", e => {
        // 不支持复制
        alert("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcodeH").innerHTML;
    },
    //复制功能9
    copyWxI() {
      var clipboard = new Clipboard(".copyInvitationClassI");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
        alert("复制成功");
      });
      clipboard.on("error", e => {
        // 不支持复制
        alert("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcodeI").innerHTML;
    },
    //复制功能10
    copyWxJ() {
      var clipboard = new Clipboard(".copyInvitationClassJ");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
        alert("复制成功");
      });
      clipboard.on("error", e => {
        // 不支持复制
        alert("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      var getcodes = document.getElementById("getcodeJ").innerHTML;
    },

    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    },
    //跳转到邀请记录页面
    jumpAllredEnveRule() {
      this.$router.push("/InvitationRecord");
    },
    //复制邀请码
    // copyInvitationClick(index){
    //     if(index==0){
    //         this.copyWx()
    //     }else if(index==1){
    //         this.copyWx()
    //     }else if(index==2){
    //         this.copyWx()
    //     }else if(index==3){
    //         this.copyWx()
    //     }else if(index==4){
    //         this.copyWx()
    //     }else if(index==5){
    //         this.copyWx()
    //     }else if(index==6){
    //         this.copyWx()
    //     }else if(index==7){
    //         this.copyWx()
    //     }else if(index==8){
    //         this.copyWx()
    //     }else if(index==9){
    //         this.copyWx()
    //     }
    //注释的是错误弹窗提示
    //  this.showPositionValue=true
    //  this.position="middle"
    //  this.redEnvePrompt="复制成功"
    // },

    //活动结束，封闭领取接口
    // showPosition(position) {
    //     axios
    //         .post("PostAllUserInformation", qs.stringify({}))
    //         .then(data => {
    //         if(data.status == -1){
    //             this.$router.push("/Login/3");
    //         }else if (data.status == 1) {
    //             //是否领取成功接口start
    //             axios
    //                 .post("ReceiveActivationCode", qs.stringify({
    //                     type:1
    //                 }))
    //                 .then(data => {
    //                 if(data.status==0){
    //                     //注释的是错误弹窗提示
    //                     this.redEnvePrompt = "领取失败，请稍后重试";
    //                     this.position = position;
    //                     this.showPositionValue = true;
    //                 }else if(data.status==1){
    //                     this.RemoveShow=false;
    //                     this.WhetherReceive=true;
    //                     setTimeout(()=>{
    //                         this.WhetherSuccessOne=false
    //                         this.WhetherSuccessTow=true
    //                         this.WhetherSuccessThree=false
    //                         //获取激活码列表start
    //                             this.howMuchData()
    //                         //获取激活码列表end
    //                     },3000)
    //                 }
    //             })
    //             .catch(err => {});
    //             //是否领取成功接口end
    //         }
    //     })
    //     .catch(err => {});
    // },

    // initialReceive(){
    //     axios
    //         .post("ActivityJudgment", qs.stringify({
    //             type:1
    //         }))
    //         .then(data => {
    //             if(data.status==0){
    //                 this.WhetherSuccessOne=false
    //                 this.WhetherSuccessTow=true
    //                 this.WhetherSuccessThree=false
    //             }else if(data.status==1){
    //                 this.WhetherSuccessOne=true
    //                 this.WhetherSuccessTow=false
    //                 this.WhetherSuccessThree=false
    //             }else if(data.status==-1){
    //                 this.WhetherSuccessThree=true
    //                 this.WhetherSuccessOne=false
    //                 this.WhetherSuccessTow=false
    //             }
    //         })
    //         .catch(err => {});
    //         this.howMuchData()
    // },
    howMuchData() {
      //获取激活码列表start
      this.myTime = Math.round(new Date().getTime() / 1000).toString();
      axios
        .post(
          "ActivationCodeList",
          qs.stringify({
            time: this.myTime,
            token: md5(md5(md5(this.myTime) + "yun") + "yunkuang123")
          })
        )
        .then(data => {
          if (data.status == 1) {
            if (data.data.length == 10) {
              this.ReceiveSuccessA = true;
              this.ReceiveSuccessB = true;
              this.ReceiveSuccessC = true;
              this.ReceiveSuccessD = true;
              this.ReceiveSuccessE = true;
              this.ReceiveSuccessF = true;
              this.ReceiveSuccessG = true;
              this.ReceiveSuccessH = true;
              this.ReceiveSuccessI = true;
              this.ReceiveSuccessJ = true;
            } else if (data.data.length == 9) {
              this.ReceiveSuccessA = true;
              this.ReceiveSuccessB = true;
              this.ReceiveSuccessC = true;
              this.ReceiveSuccessD = true;
              this.ReceiveSuccessE = true;
              this.ReceiveSuccessF = true;
              this.ReceiveSuccessG = true;
              this.ReceiveSuccessH = true;
              this.ReceiveSuccessI = true;
              this.ReceiveSuccessJ = false;
            } else if (data.data.length == 8) {
              this.ReceiveSuccessA = true;
              this.ReceiveSuccessB = true;
              this.ReceiveSuccessC = true;
              this.ReceiveSuccessD = true;
              this.ReceiveSuccessE = true;
              this.ReceiveSuccessF = true;
              this.ReceiveSuccessG = true;
              this.ReceiveSuccessH = true;
              this.ReceiveSuccessI = false;
              this.ReceiveSuccessJ = false;
            } else if (data.data.length == 7) {
              this.ReceiveSuccessA = true;
              this.ReceiveSuccessB = true;
              this.ReceiveSuccessC = true;
              this.ReceiveSuccessD = true;
              this.ReceiveSuccessE = true;
              this.ReceiveSuccessF = true;
              this.ReceiveSuccessG = true;
              this.ReceiveSuccessH = false;
              this.ReceiveSuccessI = false;
              this.ReceiveSuccessJ = false;
            } else if (data.data.length == 6) {
              this.ReceiveSuccessA = true;
              this.ReceiveSuccessB = true;
              this.ReceiveSuccessC = true;
              this.ReceiveSuccessD = true;
              this.ReceiveSuccessE = true;
              this.ReceiveSuccessF = true;
              this.ReceiveSuccessG = false;
              this.ReceiveSuccessH = false;
              this.ReceiveSuccessI = false;
              this.ReceiveSuccessJ = false;
            } else if (data.data.length == 5) {
              this.ReceiveSuccessA = true;
              this.ReceiveSuccessB = true;
              this.ReceiveSuccessC = true;
              this.ReceiveSuccessD = true;
              this.ReceiveSuccessE = true;
              this.ReceiveSuccessF = false;
              this.ReceiveSuccessG = false;
              this.ReceiveSuccessH = false;
              this.ReceiveSuccessI = false;
              this.ReceiveSuccessJ = false;
            } else if (data.data.length == 4) {
              this.ReceiveSuccessA = true;
              this.ReceiveSuccessB = true;
              this.ReceiveSuccessC = true;
              this.ReceiveSuccessD = true;
              this.ReceiveSuccessE = false;
              this.ReceiveSuccessF = false;
              this.ReceiveSuccessG = false;
              this.ReceiveSuccessH = false;
              this.ReceiveSuccessI = false;
              this.ReceiveSuccessJ = false;
            } else if (data.data.length == 3) {
              this.ReceiveSuccessA = true;
              this.ReceiveSuccessB = true;
              this.ReceiveSuccessC = true;
              this.ReceiveSuccessD = false;
              this.ReceiveSuccessE = false;
              this.ReceiveSuccessF = false;
              this.ReceiveSuccessG = false;
              this.ReceiveSuccessH = false;
              this.ReceiveSuccessI = false;
              this.ReceiveSuccessJ = false;
            } else if (data.data.length == 2) {
              this.ReceiveSuccessA = true;
              this.ReceiveSuccessB = true;
              this.ReceiveSuccessC = false;
              this.ReceiveSuccessD = false;
              this.ReceiveSuccessE = false;
              this.ReceiveSuccessF = false;
              this.ReceiveSuccessG = false;
              this.ReceiveSuccessH = false;
              this.ReceiveSuccessI = false;
              this.ReceiveSuccessJ = false;
            } else if (data.data.length == 1) {
              this.ReceiveSuccessA = true;
              this.ReceiveSuccessB = false;
              this.ReceiveSuccessC = false;
              this.ReceiveSuccessD = false;
              this.ReceiveSuccessE = false;
              this.ReceiveSuccessF = false;
              this.ReceiveSuccessG = false;
              this.ReceiveSuccessH = false;
              this.ReceiveSuccessI = false;
              this.ReceiveSuccessJ = false;
              this.WhetherSuccessFour = false;
            } else {
              this.ReceiveSuccessA = false;
              this.ReceiveSuccessB = false;
              this.ReceiveSuccessC = false;
              this.ReceiveSuccessD = false;
              this.ReceiveSuccessE = false;
              this.ReceiveSuccessF = false;
              this.ReceiveSuccessG = false;
              this.ReceiveSuccessH = false;
              this.ReceiveSuccessI = false;
              this.ReceiveSuccessJ = false;
            }
            this.ReceiveSuccessData = data.data;
          }
        })
        .catch(err => {});
      //获取激活码列表end
    },
    activityRuleClick() {
      this.activityRuleMaskMaskShow = true;
    },
    Shield() {
      this.activityRuleMaskMaskShow = false;
    }
  },
  beforeMount() {
    this.howMuchData();
    //   this.initialReceive()
  }
};
</script>
<style scoped>
.redEnveRuleMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
}
.redEnveRuleHeader {
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid #dfdfdf;
}
.redEnveRuleHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.redEnveRuleHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.redEnveRuleBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.redEnveRuleHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.redEnveRuleHeader > div:last-child {
  float: right;
  line-height: 88px;
  font-size: 28px;
  color: #0287ff;
  margin-right: 24px;
}
.redEnveBanner {
  width: 100%;
  height: 484px;
  margin-top: 88px;
  background: url("../../static/img/banner_images_invite.png") no-repeat;
  background-size: 100% 100%;
}
.redEnvelopesBox {
  width: 100%;
  height: 718px;
  position: relative;
}
.redEnvelopesBox > div {
  width: 114px;
  height: 114px;
  background: transparent;
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 192px;
}
.redEnvelopesBox > img {
  width: 100%;
  height: 100%;
}
.redEnveFooter {
  width: 100%;
  height: 98px;
  text-align: center;
  line-height: 98px;
  background: #0287ff;
  color: #fff;
  font-size: 28px;
  position: fixed;
  bottom: 0;
  z-index: 100;
  display: none;
}
.ReceiveSuccess {
  width: 100%;
  /* padding-top: 102px; */
  padding-bottom: 20px;
  /* position: relative; */
}
.ReceiveSuccess > li:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.ReceiveSuccess > li {
  width: 702px;
  height: 235px;
  background: url("../../static/img/invite_images_key.png") no-repeat;
  background-size: 100% 100%;
  margin: auto;
  margin-bottom: 30px;
  position: relative;
}
.ReceiveSuccess > li > div {
  float: left;
  height: 100%;
}
.ReceiveSuccess > li > div:nth-child(1) {
  width: 538px;
}
.ReceiveSuccess > li > div:nth-child(1) > p:nth-child(1) {
  font-size: 24px;
  color: #fff;
  padding-left: 24px;
  margin-top: 43px;
}
.ReceiveSuccess > li > div:nth-child(1) > p:nth-child(2) {
  margin-top: 40px;
  padding-left: 24px;
  color: #fff;
  font-size: 28px;
}
.ReceiveSuccess > li > div:nth-child(1) > p:nth-child(2) > span:nth-child(1) {
  font-weight: bolder;
}
.ReceiveSuccess > li > div:nth-child(1) > p:nth-child(2) > span:nth-child(2) {
  font-size: 24px;
}
.ReceiveSuccess > li > div:nth-child(1) > p:nth-child(3) {
  padding-left: 24px;
  margin-top: 40px;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.7);
}
.ReceiveSuccess > li > div:nth-child(2) {
  width: 164px;
  position: relative;
}
.ReceiveSuccess > li > div:nth-child(2) > button {
  width: 130px;
  height: 60px;
  color: #0287ff;
  font-size: 28px;
  border: 1px solid #0287ff;
  background: transparent;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.ReceiveSuccessFill {
  width: 100%;
  height: 100px;
  background: #f5f5f8;
}
.RemoveBtn {
  width: 100%;
  height: 100%;
  z-index: 500;
  background: transparent;
  border-radius: 50%;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  background: transparent;
}
.copyInvitationInput {
  background: transparent;
  color: transparent;
  font-size: 24px;
  position: absolute;
  top: 43px;
  left: 24px;
  z-index: -100;
}
.activityRule {
  width: 206px;
  height: 72px;
  position: absolute;
  top: 572px;
  left: 0;
  background: url("../../static/img/invite_buttom_rule@2x.png") no-repeat;
  background-size: 100% 100%;
  z-index: 800;
}
.activityRuleMaskMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(000, 000, 000, 0.5);
  z-index: 1500;
}
.activityRuleMaskMask > div {
  width: 600px;
  height: 570px;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.activityRuleMaskMask > div > p {
  font-size: 26px;
  color: #373d41;
  line-height: 45px;
  padding: 0 24px;
  text-indent: 2em;
}
.activityRuleMaskMask > div > p:nth-child(2) {
  text-indent: 0;
}
.activityRuleMaskMask > div > p:nth-child(5) {
  padding-bottom: 45px;
}
.activityRuleMaskMask > div > h1:nth-child(1) {
  padding: 50px 0;
  text-align: center;
  font-size: 28px;
  color: #373d41;
  font-weight: bolder;
}
.activityRuleMaskMask > div > div:nth-child(6) {
  width: 100%;
  height: 80px;
  background: #0287ff;
  font-style: 28px;
  color: #fff;
  text-align: center;
  line-height: 80px;
}
.NonConformity {
  width: 195px;
  height: 144px;
  margin: auto;
  margin-top: 160px;
  background: url("../../static/img/good.png") no-repeat;
  background-size: 100% 100%;
}
.NonConformityText {
  width: 420px;
  font-size: 32px;
  margin: auto;
  margin-top: 50px;
  color: #dfdfdf;
  text-align: center;
  line-height: 50px;
}
</style>

