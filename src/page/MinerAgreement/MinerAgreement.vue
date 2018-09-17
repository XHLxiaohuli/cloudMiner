<!--作者:var-->
<template>
  <div class="MinerAgreementMain">
      <div class="MinerAgreementHeader">
       <div class="MinerAgreementHeaderLeft">
         <div class="MinerAgreementBackPic" @click="BackUpperStory"></div>
       </div>
       <div class="MinerAgreementHeaderText">云矿工交易协议</div>
    </div>
    <div class="CustomerContractContainer">
        <h1>云矿工云算力客户合约</h1>
        <p>尊敬的客户，当您决定购买云矿工云算力时，请仔细阅读下列条款。当您成功购买本产品，视作您已完全了解并认可产品的收益模式及可能风险。</p>
    </div>
    <div class="ASurveyOfMiners">
        <h1>云矿工概述</h1>
        <p>云矿工云算力合约是基于第三方矿场合作推出的云算力产品。收益日结，显示在账户余额，基于比特币转账手续费日益增高,BTC收益用户账户余额满0.01BTC时可提币，T+1日12:00前放款到绑定的BTC钱包。云矿工云算力合约终止后，矿机所有权归第三方矿场所有。</p>
    </div>
    <div class="CloudMinerSubscribe">
        <h1>云矿工认购</h1>
        <h1>1.认购价格</h1>
        <p>合约按算力认购，大众矿工最小购买单位0.1 TH/s，初级白银算力合约为0.1T，中级白银0.2T，高级白银0.4T；初级黄金算力合约为1.4T，中级黄金算力合约2.4T，高级黄金算力合约4.4T；初级钻石算力合约为14.4T，中级钻石24.4T，高级钻石44.4T，认购单价以官网当日报价为准，初级白银及以上的合约价格，根据用户当前的邀请收益玩法等级，对应不同的差价。客户认购的算力在之后开放二级市场时可交易，算力不能退款。</p>
        <h1 v-if="false">2.算力收割</h1>
        <p v-if="false">客户购买算力后，于次日的0时完成交割，交割后开始获得挖矿收益。</p>
    </div>
    <div class="MinerIsIncome">
        <h1>云矿工收益</h1>
        <p>客户在购买成功后，合约即刻生效。云算力收益以FPPS理论收益进行计算，扣除成本后的净收益为用户的云算力收益支付到用户账户。</p>
        <h1>1.收益阶段</h1>
        <p>采用FPPS模式进行收益的分配，进入收益独享阶段，客户获得独享挖矿收益并承担电费。</p>
        <p>客户累计云算力挖矿收益以个人账户记录为准。每日发放收益锚定实时比特币的人民币价格（默认为huobi.pro）。如果默认的平台存在技术或者网络问题，本网有权力更换交易平台而不再另行通知。每日北京时间10点整根据客户当日0时持有的算力，结算昨日云算力收益，收益方式以BTC的形式发放。</p>
        <h1>2.电费计算</h1>
        <p>云算力所用矿机为独立第三方矿场，电费按照以下约定矿机参数进行计算。</p>
        <p>矿机功耗:145W/THS</p>
        <p>电价:0.5元/KW·h</p>
        <p>每T日电费=每T功率×24小时×电价=145W*24h*0.5  CNY/KWh/1000=1.74CNY</p>
        <p>电费在收益分配时收取,根据当日比特币(默认为huobi.pro)的汇率价格实时转换为BTC。</p>
        <h1>3.管理维护费</h1>
        <p>算力收益扣除电费后的20%。</p>
        <h1>4.收益分配</h1>
        <p>每日分配至客户账户收益=（每T日FPPS理论收益-每T日电费）×客户持有算力T数即客户获得的支付到账户的收益为：</p>
        <p>云算力收益中，第1款收益模式计算的FPPS理论收益减去第2款电费中计算的电费所得余数。</p>
    </div>
    <div class="ContractDuration">
        <h1>合约期限</h1>
        <p>云矿工合约期限为730天。在此期间，按照以下原则执行：</p>
        <p>1.在FPPS理论收益高于电费时，即可分配收益为正数时，将持续执行。当出现任意一个自然日FPPS理论收益小于电费时，项目中止；项目中止期间，不分配挖矿收益，客户也不需要支付电费。</p>
        <p>2.在云算力项目收益为负时（收益减去电费和维护费）项目终止，当项目终止后90个自然日内，出现任意一个自然日FPPS理论收益大于电费和维护费的100%恢复执行，否则项目终止；</p>
        <p>3.在云算力项目进入收益共享阶段后，当出现连续7个自然日FPPS理论收益小于电费和管理费之和时，项目终止；</p>
        <p>4.如遇不可抗力，项目终止，各方互不承担赔偿责任。</p>
    </div>
    <div class="RiskHints">
        <h1>风险提示</h1>
        <p>任何投资都存在风险，本项目不承诺回本。比特币挖矿收益可观，但比特币市场不确定性因素极大，包括难度、价格、政策因素甚至人为恶意打压等导致的多种不受控制的情况，收益无法预估。当您购买算力时，请留意产品的电费收益比等影响投资回报的因素。请您不要进行自己风险承受能力以上的任何投资。</p>
    </div>
    <div class="FailureShutdown">
        <h1>故障停机</h1>
        <p>由于独立矿场实际运营中的电力供应、网络状态等多种不可预知情况，当矿场实际运行中因故停机无法产生挖矿收益时，云算力无挖矿收益分配，客户也不需要支付相应的电费。</p>
    </div>
    <div class="ForceMajeure">
        <h1>不可抗力</h1>
        <p>本合约所称不可抗力，是指不能预见、不能避免并不能克服的客观情况。包括但不限于自然灾害、如台风、地震、洪水、冰雹、雷电、火灾等；政府行为，如法律、法规、政策变动、征收、征用；社会异常事件，如战争、罢工、骚乱等方面。比特币挖矿难度、价格大幅度异常波动，及其他足以导致云算力项目终止的因素，视为不可抗力。</p>
        <p>非因矿场原因导致的断网视为不可抗力。因不可抗力造成合同难以履行的，各方互不承担赔偿责任。</p>
        <p>* 合约中的算力单位T=Thash/s=TH/s=1000GH/</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    //放回上一级
    BackUpperStory() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.MinerAgreementMain {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f8;
}
.MinerAgreementHeader {
  width: 100%;
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #dfdfdf;
}
.MinerAgreementHeader:after {
  content: ".";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.MinerAgreementHeaderLeft {
  width: 38px;
  height: 88px;
  float: left;
  margin-right: 30px;
}
.MinerAgreementBackPic {
  margin: 0;
  height: 26px;
  width: 14px;
  background: url("../../static/img/back-3.png") no-repeat;
  background-size: 100%;
  position: relative;
  top: 32px;
  left: 24px;
}
.MinerAgreementHeaderText {
  height: 88px;
  font-size: 32px;
  color: #373d41;
  line-height: 88px;
  text-align: left;
  float: left;
}
.CustomerContractContainer {
  background: #fff;
  padding-top: 139px;
}
.CustomerContractContainer > h1 {
  text-align: center;
  font-size: 32px;
  font-weight: bolder;
}
.CustomerContractContainer > p {
  padding: 34px 24px;
  text-align: justify;
  line-height: 46px;
  font-size: 26px;
  text-indent: 56px;
}
.ASurveyOfMiners,
.CloudMinerSubscribe,
.MinerIsIncome,
.ContractDuration,
.RiskHints,
.FailureShutdown,
.ForceMajeure {
  background: #fff;
  padding: 0 24px;
}
.ASurveyOfMiners > h1 {
  font-size: 28px;
  color: #373d41;
  font-weight: bolder;
}
.ASurveyOfMiners > p {
  text-align: justify;
  line-height: 46px;
  font-size: 26px;
  text-indent: 56px;
  padding: 34px 0;
}
.CloudMinerSubscribe > h1:first-child {
  font-size: 28px;
  color: #373d41;
  font-weight: bolder;
  margin-bottom: 42px;
}
.CloudMinerSubscribe > h1:nth-child(2),
.CloudMinerSubscribe > h1:nth-child(4) {
  font-size: 26px;
  color: #373d41;
}
.CloudMinerSubscribe > p:nth-child(3),
.CloudMinerSubscribe > p:nth-child(5) {
  font-size: 26px;
  color: #373d41;
  line-height: 46px;
  padding: 34px 0;
  text-align: justify;
  text-indent: 56px;
}
.MinerIsIncome > h1:nth-child(1) {
  font-size: 28px;
  color: #373d41;
  font-weight: bolder;
}
.MinerIsIncome > h1:nth-child(3),
.MinerIsIncome > h1:nth-child(6),
.MinerIsIncome > h1:nth-child(12),
.MinerIsIncome > h1:nth-child(14) {
  font-size: 26px;
  color: #373d41;
}
.MinerIsIncome > p:nth-child(2),
.MinerIsIncome > p:nth-child(5),
.MinerIsIncome > p:nth-child(13) {
  text-align: justify;
  line-height: 46px;
  font-size: 26px;
  text-indent: 56px;
  padding: 34px 0;
}
.MinerIsIncome > p:nth-child(4),
.MinerIsIncome > p:nth-child(7) {
  text-align: justify;
  line-height: 46px;
  font-size: 26px;
  text-indent: 56px;
  padding-top: 34px;
}
.MinerIsIncome > p:nth-child(8),
.MinerIsIncome > p:nth-child(9),
.MinerIsIncome > p:nth-child(10) {
  text-align: justify;
  line-height: 46px;
  font-size: 26px;
  text-indent: 56px;
}
.MinerIsIncome > p:nth-child(11),
.MinerIsIncome > p:nth-child(16) {
  text-align: justify;
  line-height: 46px;
  font-size: 26px;
  text-indent: 56px;
  padding-bottom: 34px;
}
.MinerIsIncome > p:nth-child(15) {
  text-align: justify;
  line-height: 46px;
  font-size: 26px;
  text-indent: 56px;
  padding-top: 34px;
}
.ContractDuration > h1:nth-child(1) {
  font-size: 28px;
  font-weight: bolder;
}
.ContractDuration > p:nth-child(2) {
  text-align: justify;
  line-height: 46px;
  font-size: 26px;
  text-indent: 56px;
  padding: 34px 0;
}
.ContractDuration > p:nth-child(3),
.ContractDuration > p:nth-child(4),
.ContractDuration > p:nth-child(5),
.ContractDuration > p:nth-child(6) {
  text-align: justify;
  line-height: 46px;
  font-size: 26px;
  text-indent: 56px;
  padding-bottom: 34px;
}
.RiskHints > h1:nth-child(1),
.FailureShutdown > h1:nth-child(1),
.ForceMajeure > h1:nth-child(1) {
  font-size: 28px;
  font-weight: bolder;
}
.RiskHints > p:nth-child(2),
.FailureShutdown > p:nth-child(2),
.ForceMajeure > p:nth-child(2) {
  text-align: justify;
  line-height: 46px;
  font-size: 26px;
  text-indent: 56px;
  padding: 34px 0;
}
.ForceMajeure > p:nth-child(3),
.ForceMajeure > p:nth-child(4) {
  text-align: justify;
  line-height: 46px;
  font-size: 26px;
  text-indent: 56px;
  padding-bottom: 34px;
}
</style>


