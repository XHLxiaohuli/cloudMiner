
import Vue from 'vue'
import Router from 'vue-router'
import RegisTer from '@/page/RsgisTer/RegisTer'
import Home from '@/page/Home/home'
import Index from '@/page/Home/index'
import Calculator from '@/page/Home/Calculator'
import Profit from '@/page/Home/profit'
import BTCprofit from '@/page/Home/BTCprofit'
import RMBprofit from '@/page/Home/RMBprofit'
import My from '@/page/Home/My'
import Login from '@/page/Login/login'
import ForgetPassword from '@/page/ForgetPassword/ForgetPassword'
import Withdrawals from '@/page/Withdrawals/Withdrawals'
import BtcWithdrawals from '@/page/Withdrawals/BtcWithdrawals'
import RmbWithdrawals from '@/page/Withdrawals/RmbWithdrawals'
import BringUpSuccess from '@/page/Withdrawals/BringUpSuccess'
import PurchaseRecord from '@/page/PurchaseRecord/PurchaseRecord'
import PresentRecord from '@/page/PurchaseRecord/PresentRecord'
import BankCardAndBtcWallet from '@/page/PurchaseRecord/BankCardAndBtcWallet'
import YesBindingBtcWallet from '@/page/PurchaseRecord/YesBindingBtcWallet'
import NoBindingBtcWallet from '@/page/PurchaseRecord/NoBindingBtcWallet'
import UserInformation from '@/page/UserInformation/UserInformation'
import RealNameAuthentication from '@/page/UserInformation/RealNameAuthentication'
import YesBindingCellPhone from '@/page/UserInformation/YesBindingCellPhone'
import NoBindingCellPhone from '@/page/UserInformation/NoBindingCellPhone'
import PasswordManagement from '@/page/UserInformation/PasswordManagement'
import CopyInvitationCode from '@/page/CopyInvitationCode/CopyInvitationCode'

import copyInvitationRecord from '@/page/CopyInvitationCode/copyInvitationRecord'

import MinerGradeRule from '@/page/MinerGradeRule/MinerGradeRule'
import MassMiners from '@/page/MinerGradeRule/MassMiners'
import SilverMiner from '@/page/MinerGradeRule/SilverMiner'
import GoldenMiner from '@/page/MinerGradeRule/GoldenMiner'
import DiamondMiner from '@/page/MinerGradeRule/DiamondMiner'
import AllMinerGradeRule from '@/page/MinerGradeRule/AllMinerGradeRule'
import MinerAgreement from '@/page/MinerAgreement/MinerAgreement'
import VolkswagenCalculator from '@/page/CalculatorType/VolkswagenCalculator'
import SilverCalculator from '@/page/CalculatorType/SilverCalculator'
import GoldCalculator from '@/page/CalculatorType/GoldCalculator'
import DiamondCalculator from '@/page/CalculatorType/DiamondCalculator'
import DetailsOfTheMassMiners from '@/page/MinerDetailsPage/DetailsOfTheMassMiners'
import SilverOfTheMassMiners from '@/page/MinerDetailsPage/SilverOfTheMassMiners'
import GoldOfTheMassMiners from '@/page/MinerDetailsPage/GoldOfTheMassMiners'
import DiamondsOfTheMassMiners from '@/page/MinerDetailsPage/DiamondsOfTheMassMiners'
import MinersJoin from '@/page/MinerDetailsPage/MinersJoin'
import OrderSuccess from '@/page/MinerDetailsPage/OrderSuccess'
import orderFalse from '@/page/MinerDetailsPage/orderFalse'
import OrderDetails from '@/page/MinerDetailsPage/OrderDetails'
import OrderDetailsNotPay from '@/page/MinerDetailsPage/OrderDetailsNotPay'
import MinersJoinSuccess from '@/page/MinerDetailsPage/MinersJoinSuccess'
import IncomeRankings from '@/page/IncomeRankings/IncomeRankings'
import DetailsPage from '@/page/DetailsPage/DetailsPage'
import projectDetails from '@/page/DetailsPage/projectDetails'
import AddARecord from '@/page/DetailsPage/AddARecord'
import FieldPicture from '@/page/DetailsPage/FieldPicture'
import redEnvelopes from '@/page/RedEnvelopes/redEnvelopes'
import InvitationRecord from '@/page/RedEnvelopes/InvitationRecord'
import noticeDetails from '@/page/noticeDetails/noticeDetails'
import MinerRaiderss from '@/page/MinerRaiderss/MinerRaiderss'
import commonProblem from '@/page/GetIntoRaiders/commonProblem'
import OnTheIncome from '@/page/GetIntoRaiders/OnTheIncome'
import aboutWithdrawals from '@/page/GetIntoRaiders/aboutWithdrawals'
import aboutInvitation from '@/page/GetIntoRaiders/aboutInvitation'
import broadcast from '@/page/Broadcast/broadcast'
import myFunction from '@/page/encryption/encryption'//封装请求消息头加密方法



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', redirect: '/Home/Index/1'
    }, {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        { path: 'Index/:Index', component: Index },
        {
          path: '/Home/Calculator', component: Calculator, children: [
            { path: '/', redirect: '/Home/Calculator/VolkswagenCalculator' },
            { path: '/Home/Calculator/VolkswagenCalculator', component: VolkswagenCalculator },
            { path: '/Home/Calculator/SilverCalculator', component: SilverCalculator },
            { path: '/Home/Calculator/GoldCalculator', component: GoldCalculator },
            { path: '/Home/Calculator/DiamondCalculator', component: DiamondCalculator },
          ]
        },
        {
          path: '/Home/Profit', component: Profit, children: [
            { path: '/', redirect: '/Home/Profit/BTCprofit' },
            { path: '/Home/Profit/BTCprofit', component: BTCprofit },
            { path: '/Home/Profit/RMBprofit', component: RMBprofit },
          ]
        },
        { path: '/Home/My', component: My },
      ]
    }, {
      path: '/RegisTer/:InvitationCode',    //注册路由
      name: 'RegisTer',
      component: RegisTer
    }, {
      path: '/Login/:index',
      name: 'Login',
      component: Login
    }, {
      path: '/ForgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },  {
      path: '/Withdrawals',
      name: 'Withdrawals',
      component: Withdrawals
    }, {
      path: '/BtcWithdrawals',
      name: 'BtcWithdrawals',
      component: BtcWithdrawals
    }, {
      path: '/RmbWithdrawals',
      name: 'RmbWithdrawals',
      component: RmbWithdrawals
    }, {
      path: '/BringUpSuccess',
      name: 'BringUpSuccess',
      component: BringUpSuccess
    }, {
      path: '/PurchaseRecord',
      name: 'PurchaseRecord',
      component: PurchaseRecord
    }, {
      path: '/PresentRecord',
      name: 'PresentRecord',
      component: PresentRecord
    }, {
      path: '/BankCardAndBtcWallet',
      name: 'BankCardAndBtcWallet',
      component: BankCardAndBtcWallet
    }, {
      path: '/UserInformation',
      name: 'UserInformation',
      component: UserInformation
    }, {
      path: '/RealNameAuthentication',
      name: 'RealNameAuthentication',
      component: RealNameAuthentication
    }, {
      path: '/YesBindingCellPhone',
      name: 'YesBindingCellPhone',
      component: YesBindingCellPhone
    }, {
      path: '/NoBindingCellPhone/:BindingOrChange',
      name: 'NoBindingCellPhone',
      component: NoBindingCellPhone
    }, {
      path: '/PasswordManagement',
      name: 'PasswordManagement',
      component: PasswordManagement
    }, {
      path: '/CopyInvitationCode',
      name: 'CopyInvitationCode',
      component: CopyInvitationCode
    }, {
      path: '/YesBindingBtcWallet',
      name: 'YesBindingBtcWallet',
      component: YesBindingBtcWallet
    }, {
      path: '/NoBindingBtcWallet/:WalletAddressState',
      name: 'NoBindingBtcWallet',
      component: NoBindingBtcWallet
    }, {
      path: '/MinerGradeRule/:MinerGrade',
      name: 'MinerGradeRule',
      component: MinerGradeRule,
      children: [
        { path: '/MinerGradeRule/MassMiners', component: MassMiners },
        { path: '/MinerGradeRule/SilverMiner', component: SilverMiner },
        { path: '/MinerGradeRule/GoldenMiner', component: GoldenMiner },
        { path: '/MinerGradeRule/DiamondMiner', component: DiamondMiner },
      ]
    }, {
      path: '/AllMinerGradeRule',
      name: 'AllMinerGradeRule',
      component: AllMinerGradeRule
    }, {
      path: '/MinerAgreement',
      name: 'MinerAgreement',
      component: MinerAgreement
    }, {
      path: '/DetailsOfTheMassMiners/:goodsId',
      name: 'DetailsOfTheMassMiners',
      component: DetailsOfTheMassMiners
    }, {
      path: '/SilverOfTheMassMiners/:goodsId',
      name: 'SilverOfTheMassMiners',
      component: SilverOfTheMassMiners
    }, {
      path: '/GoldOfTheMassMiners/:goodsId',
      name: 'GoldOfTheMassMiners',
      component: GoldOfTheMassMiners
    }, {
      path: '/DiamondsOfTheMassMiners/:goodsId',
      name: 'DiamondsOfTheMassMiners',
      component: DiamondsOfTheMassMiners
    }, {
      // path: '/MinersJoin/:GradeNumber/:InputNumber/:rank',
      path: '/MinersJoin/:worktype/:InputNumber/:equalOrder',
      name: 'MinersJoin',
      component: MinersJoin
    },{
      path: '/OrderDetails/:type/:tValue/:unitPrice/:MaximumValue/:myEqualOrder/:CommodityName',
      name: 'OrderDetails',
      component: OrderDetails
    }, {
      path: '/OrderDetailsNotPay',
      name: 'OrderDetailsNotPay',
      component: OrderDetailsNotPay
    }, {
      path: '/OrderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }, {
      path: '/orderFalse',
      name: 'orderFalse',
      component: orderFalse
    }, {
      path: '/MinersJoinSuccess',
      name: 'MinersJoinSuccess',
      component: MinersJoinSuccess
    }, {
      path: '/IncomeRankings',
      name: 'IncomeRankings',
      component: IncomeRankings
    }, {
      path: '/DetailsPage/:GradeIndex',
      name: 'DetailsPage',
      component: DetailsPage,
      children: [
        { path: '/DetailsPage/:GradeIndex/', redirect: 'projectDetails/:GradeIndex' },
        { path: 'projectDetails/:SubrouteNum', component: projectDetails },
        { path: 'AddARecord/:AddSubrouteNum', component: AddARecord },
        { path: 'FieldPicture/:FieldSubrouteNum', component: FieldPicture },
      ]
    }, {
      path: '/redEnvelopes',
      name: 'redEnvelopes',
      component: redEnvelopes
    }, {
      path: '/InvitationRecord',
      name: 'InvitationRecord',
      component: InvitationRecord
    }, {
      path: '/noticeDetails',
      name: 'noticeDetails',
      component: noticeDetails
    }, {
      path: '/MinerRaiderss',
      name: 'MinerRaiderss',
      component: MinerRaiderss
    }, {
      path: '/commonProblem',
      name: 'commonProblem',
      component: commonProblem
    }, {
      path: '/OnTheIncome',
      name: 'OnTheIncome',
      component: OnTheIncome
    }, {
      path: '/aboutWithdrawals',
      name: 'aboutWithdrawals',
      component: aboutWithdrawals
    }, {
      path: '/aboutInvitation',
      name: 'aboutInvitation',
      component: aboutInvitation
    }, {
      path: '/copyInvitationRecord',
      name: 'copyInvitationRecord',
      component: copyInvitationRecord
    }, {
      path: '/broadcast',
      name: 'broadcast',
      component: broadcast
    },
    { path: '*', redirect: '/Home/Index/1' }
  ]
})
