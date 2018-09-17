<!--作者:var-->
<template>
  <div>
      <div class="BringUpSuccessPic">
          <div class="OnBringUpSuccessPicDiv">
              <img src="../../static/img/yes.png" alt="">
          </div>
      </div>
      <p class="BringUpSuccessText">提现成功</p>
      <p class="BringUpSuccessInformText">工作人员会在2-3个工作日提现到你的账户</p>
      <div style="text-align: center;">
          <button class="BringUpSuccessFootBtn" @click="jumpMy">确定</button>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    jumpMy() {
      this.$router.push("/Home/My");
    }
  }
};
</script>
<style scoped>
.BringUpSuccessPic {
  margin-top: 260px;
  margin-bottom: 50px;
  height: 70px;
  width: 100%;
  text-align: center;
}
.OnBringUpSuccessPicDiv {
  width: 70px;
  height: 70px;
  margin: auto;
}
.OnBringUpSuccessPicDiv > img {
  width: 100%;
  height: 100%;
}
.BringUpSuccessText {
  text-align: center;
  font-size: 40px;
  color: #0287ff;
  margin-bottom: 30px;
}
.BringUpSuccessInformText {
  text-align: center;
  font-size: 24px;
  color: #949494;
}
.BringUpSuccessFootBtn {
  width: 600px;
  height: 88px;
  font-size: 28px;
  background: #0287ff;
  color: #fff;
  border: 0;
  margin-top: 588px;
  border-radius: 2px;
}
.BringUpSuccessFootBtn:focus {
  outline: 0;
}
</style>


