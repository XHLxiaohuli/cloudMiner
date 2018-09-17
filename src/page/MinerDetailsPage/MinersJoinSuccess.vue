<!--作者:var-->
<template>
  <div>
      <div class="MinersJoinSuccessPic">
          <div class="OnMinersJoinSuccessPicDiv">
              <img src="../../static/img/yes.png" alt="">
          </div>
      </div>
      <p class="MinersJoinSuccessText">恭喜你! 加入成功</p>
      <p class="MinersJoinSuccessInformText">算力交割时间为次日的0时，交割后开始获得挖矿收益</p>
      <div style="text-align: center;">
          <button class="MinersJoinSuccessFootBtn" @click="jumpProfit">前往我的收益</button>
      </div>
  </div>
</template>
<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import myFunction from "@/page/encryption/encryption";
export default {
  components: {
    myFunction
  },
  data() {
    return {};
  },
  methods: {
    jumpProfit() {
      this.$router.push("/Home/Profit");
    },
    pickUpInformation() {
      var myRequestId = myFunction.myUuid();
      var myTimestamp = Math.round(new Date().getTime() / 1000).toString();
      var myUserId = localStorage.getItem("userID");
      var myArr = ["requestId=" + myRequestId, "userId=" + myUserId];
      var myFunctionValue =
        myFunction.myFunction(myArr) + "/api/user/getUserInfo.do";
      var myFunctionValues = md5(myFunctionValue).toUpperCase();
      axios
        .post(
          "ObtainingUserInformation",
          qs.stringify({
            userId: myUserId
          }),
          {
            requestId: myRequestId,
            timestamp: myTimestamp,
            channelType: "h5",
            sign: myFunctionValues
          }
        )
        .then(data => {
          if (data.code == 200) {
            sessionStorage["userGrade"] = data.data.userGrade; //用户等级
            sessionStorage["userStep"] = data.data.userStep; //用户等级等阶
          } else if (data.code == 413) {
            this.$router.push("/Login/1");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.pickUpInformation();
  }
};
</script>
<style scoped>
.MinersJoinSuccessPic {
  padding-top: 260px;
  margin-bottom: 50px;
  height: 70px;
  width: 100%;
  text-align: center;
}
.OnMinersJoinSuccessPicDiv {
  width: 70px;
  height: 70px;
  margin: auto;
}
.OnMinersJoinSuccessPicDiv > img {
  width: 100%;
  height: 100%;
}
.MinersJoinSuccessText {
  text-align: center;
  font-size: 40px;
  color: #0287ff;
  margin-bottom: 30px;
}
.MinersJoinSuccessInformText {
  text-align: center;
  font-size: 24px;
  color: #949494;
}
.MinersJoinSuccessFootBtn {
  width: 600px;
  height: 88px;
  font-size: 28px;
  background: #0287ff;
  color: #fff;
  border: 0;
  margin-top: 400px;
  border-radius: 2px;
}
.MinersJoinSuccessFootBtn:focus {
  outline: 0;
}
</style>


