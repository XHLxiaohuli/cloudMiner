<template>
  <div>
      <div class="FieldPictureMain">
          <div>
              <img src="../../static/img/01@2x.png" alt="">
          </div>
          <div>
              <img src="../../static/img/02@2x.png" alt="">
          </div>
          <div>
              <img src="../../static/img/03@2x.png" alt="">
          </div>
      </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.FieldPictureFill {
  width: 100%;
  height: 20px;
  background: #f5f5f8;
  position: fixed;
  top: 206px;
}
.FieldPictureMain {
  padding: 50px 24px;
  background: #fff;
  margin-top: 232px;
  /* border-bottom: 1px solid #dfdfdf; */
}
.FieldPictureMain > div {
  width: 100%;
  height: 400px;
}
.FieldPictureMain > div > img {
  width: 100%;
  height: 100%;
}
.FieldPictureMain > div:nth-child(2) {
  margin-top: 30px;
}
.FieldPictureMain > div:last-child {
  margin-top: 30px;
}
</style>


