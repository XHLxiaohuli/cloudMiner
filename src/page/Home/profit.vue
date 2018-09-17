<!--作者:var-->
<template>
  <div>
    <div class="profitBody">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.clickProfit {
  color: #fff !important;
  border-bottom: 3px solid #fff !important;
}
.profitBody > div {
  background: #f5f5f8;
}
</style>

