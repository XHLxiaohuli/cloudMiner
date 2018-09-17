<template>
        <div class="broadcastMain">
            <div class="main" @touchstart="startPressing" @touchmove="fingerSlipping" @touchend="fingerDetachment">
                <ul class="mainUl" :style="'left:'+OneLeft+';transition: all '+OneTime+'s;width:'+mainUlWidth">
                    <li v-for="(item,index) in data" :style="'width:'+PicWidth">
                        <img draggable="true" :src="item" alt="" @click="broadcastClick(indexNumber)">
                    </li>
                </ul>
            </div>
        </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2432747668,528554284&fm=27&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665207864,746409922&fm=27&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661055612,1771836516&fm=27&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2432747668,528554284&fm=27&gp=0.jpg"
      ],
      //   data: [require("../../static/img/HomePic/bannrThree.jpg")],
      OneLeft: 0,
      OneNum: 0,
      OneTime: 0,
      mainUlWidth: "",
      PicWidth: "",
      indexNumber: 1,
      startPoint: 0,
      startEle: 0,
      box: "",
      NumberOfSheets: "",
      disX: ""
    };
  },
  methods: {
    //传参，参数为多少张轮播，根据张数赋值宽度
    move(howZhang) {
      this.NumberOfSheets = howZhang;
      this.mainUlWidth = howZhang * 100 + "%";
      this.PicWidth = 1 / howZhang * 100 + "%";
      if (howZhang > 1) {
        //大于一张时轮播，等于一张不轮播
        setTimeout(() => {
          this.OneTime = 1;
          this.OneNum = 100;
          this.OneLeft = "-" + this.OneNum + "%";
          if (this.indexNumber < howZhang) {
            this.indexNumber++;
          } else if (this.indexNumber >= howZhang) {
            this.indexNumber = 1;
          }
          setTimeout(this.cleaMove, 1000);
        }, 2000);
      }
    },
    cleaMove() {
      this.OneTime = 0;
      this.OneLeft = 0;
      let IsData = this.data.splice(0, 1);
      this.data.push(IsData[0]);
      this.move(4); //调用第一个函数并传参
    },
    broadcastClick(index) {
      //判断为第几张轮播，实现事件
    },
    //手指开始按下
    startPressing(e) {
      this.startPoint = e.changedTouches[0].pageX;
    },
    //手指滑动
    fingerSlipping(e) {
      this.box = document.querySelector(".mainUl");
      var currPoint = e.changedTouches[0].pageX;
      this.disX = currPoint - this.startPoint;
      if (this.disX > 0) {
        //    alert('向右滑')
        this.box.style.right =
          currPoint / document.documentElement.clientWidth * 100 + "%";
      } else if (this.disX < 0) {
        // alert('向左滑')
        this.box.style.left =
          "-" +
          (100 - currPoint / document.documentElement.clientWidth * 100) +
          "%";
      }
    },
    //手指脱离
    fingerDetachment() {
      this.OneTime = 0.3;
      if (this.disX > 0) {
        //    alert('向右滑')
      } else if (this.disX < 0) {
        // alert('向左滑')
      }
    }
  },
  beforeMount() {
    this.move(4); //开始挂载调用函数并传参
  }
};
</script>
<style scoped>
.broadcastMain {
  width: 100%;
  height: 100%;
}
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.mainUl {
  height: 100%;
  position: relative;
}
.mainUl:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.mainUl > li {
  height: 100%;
  float: left;
}
.mainUl > li > img {
  width: 100%;
  height: 100%;
}
</style>
