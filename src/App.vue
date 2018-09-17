<template>
  <div id="app">
  <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

    }
  },
  methods:{
    //判断用户用什么设备访问网页，跳到对应网页
    //  browserRedirect() {
    //     var sUserAgent = navigator.userAgent.toLowerCase();
    //     var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    //     var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    //     var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    //     var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    //     var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    //     var bIsAndroid = sUserAgent.match(/android/i) == "android";
    //     var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    //     var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    //     if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    //       console.log("这是手机访问的")
    //         window.location.href='http://www.yunkuanggong.cn/#/Home/Index/1';//手机设备跳转到手机站主页
    //     } else {
    //         window.location.href='http://www.yunkuanggong.cn/';
    //         console.log("这是电脑访问的")
    //     }
    // }
  },
  beforeMount(){
    // this.browserRedirect()
    // window.location.href='http://www.yunkuanggong.vip/#/Home/Index/1'
  },
}
</script>

<style lang='scss'>
@import'./style/style';
html{
  height: 100%;
}
#app{
  height: 100%;
}
</style>
