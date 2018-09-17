<template>
  <div class="orderFalse">
    
      <div>
          <div class='message'>
                <i></i> 
                <div class='congrau'>加入失败了...</div>
                <div>请稍后查看购买记录,查询订单支付结果</div>
          </div>
          <div class='chatRecod'>
              <div>前往购买记录</div>
          </div>
      </div>
  </div>
</template>

<script>
mounted: {
}
import axios from "../../utils/axios";
import qs from "qs";
export default {
  name: "orderFalse",
  data() {
    return {};
  },

  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message > i {
  display: block;
  width: 70px;
  height: 70px;
  background: url(../../static/img/falsebtn.png) no-repeat;
  background-size: 100% 100%;
  margin: 0px auto 50px;
}
.message {
  text-align: center;
  padding-top: 260px;
}
.congrau {
  color: #0287ff;
  font-size: 40px;
  margin-bottom: 30px;
}
.congrau + div {
  color: #949494;
  font-size: 24px;
}
.chatRecod {
  position: fixed;
  bottom: 250px;
  left: 10%;
}
.chatRecod > div {
  width: 600px;
  height: 88px;
  line-height: 88px;
  margin: 0 auto;
  font-size: 28px;
  color: #fff;
  background: #0287ff;
  text-align: center;
}
</style>
