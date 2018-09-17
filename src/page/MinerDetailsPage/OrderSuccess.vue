<template>
  <div class="OrderSuccess">
       <div>
          <div class='messages'>
                <i></i> 
                <div class='congrau'>恭喜您! 加入成功</div>
                <div>算力交割时间为次日的0时,交割后开始获得挖矿收益</div>
          </div>
          <div class='chatRecod'>
              <div @click="jumpProfit">前往我的收益</div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import qs from "qs";
import md5 from "js-md5";
import myFunction from "@/page/encryption/encryption";
export default {
  name: "OrderSuccess",
  components: {
    myFunction
  },
  data() {
    return {};
  },

  methods: {
    jumpProfit() {
      this.$router.push("/Home/Profit/BTCprofit");
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messages > i {
  display: block;
  width: 70px;
  height: 70px;
  background: url(../../static/img/successbtn.png) no-repeat;
  background-size: 100% 100%;
  margin: 0px auto 50px;
}
.messages {
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
