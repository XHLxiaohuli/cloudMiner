<template>
<div>
  <div class="heardPage">
    <div class="iconareA" @click="backAll">
    <div class="Backicon"></div>
    </div>
    <div class="Pagehea">注册</div>
  </div>
    <div class="contentpage">
    <content-nav ref="mySon"></content-nav>
    <Nextpat-nav v-show="Towpar"></Nextpat-nav>
    <div class="footex" :class='{OneFootex:Towpar==false,TowFootex:Towpar==true}'>
    <span style="color: #949494;">已有账户，</span>
    <span style="color: #373D41;" @click="NtrAnce">立即登录</span>
    </div>
    </div>
</div>
</template>
<script>
import contentNav from "@/page/RsgisTer/Registerone";
import NextpatNav from "@/page/RsgisTer/RsgisTertOw";
export default {
  name: "RegisTer",

  components: {
    contentNav,
    NextpatNav
  },
  data() {
    return {
      Towpar: false,
      UserInvitationCode: ""
    };
  },
  methods: {
    backAll() {
      if (this.Onepar == true) {
        this.$router.push("/login/2");
      } else if (this.$refs.mySon._data.RegisteroneIF) {
        this.$router.go(-1);
      } else {
        this.Towpar = false;
        this.$refs.mySon._data.RegisteroneIF = true;
        this.$refs.mySon._data.showPositionValue = false;
        this.$refs.mySon._data.IshidCode = true;
        this.$refs.mySon._data.IshText = false;
        clearInterval(this.$refs.mySon._data.TimeAll);
      }
    },
    NtrAnce() {
      this.$router.push("/login/2");
    }
  },
  beforeMount() {
    this.UserInvitationCode = this.$route.params.InvitationCode;
  }
};
</script>
<style scoped>
.Nextsty {
  width: 600px;
  height: 88px;
  font-size: 28px;
  outline: none;
  border-radius: 2px;
  color: #949494;
  background: #eeeeee;
  border: none;
}
.footex {
  text-align: center;
  margin: auto;
}
.OneFootex {
  padding-top: 0;
}
.TowFootex {
  padding-top: 327px;
}
.footex span {
  font-size: 28px;
}
.contentpage {
  width: 600px;
  margin: 0 auto;
}
.heardPage {
  height: 88px;
}
.Backicon {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.Pagehea {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.iconareA {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
</style>
