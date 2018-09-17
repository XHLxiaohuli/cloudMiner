export default {
    getAuditAndApplyList:'home/member/login',  //我审核的和我的申请
    PostMailboxChange:'home/member/mail_code',//请求邮箱
    PostPassChange:'home/member/change_pwd',//修改密码
    PostAllUserInformation:'home/member/users',//获取页面用户信息（公共接口）
    MyPhonechange:'home/member/message_code',//手机短信电话验证码接口
    ProofValue:'home/member/validate_code',//校验手机验证码接口
    Bankpinless:'home/member/update_bank',//绑定银行卡参数
    DropoutAll:'home/member/outlogin',//退出登录
    Returnsalist:'home/member/income',//收益列表接口
    PostRegisterFirst:'home/member/register',//注册页面1
    PostRegisterSecond:'home/member/certification',//注册页面2
    PostPasswordBack:'home/member/modify_code',//密码找回
    PostChangePasswordSuccess:'home/member/modify_pwd',//修改密码成功
    PostApplicationForCash:'home/member/withdraw',//提现申请接口
    PostVolkswagenCalculator:'home/calculator/cal_bublic',//大众计算器
    PostCleanCalculatorBeta:'home/calculator/cal_silver',//普通建议计算器
    Ranking:'home/member/ranking',//收益排行版
    PostBTC:'home/member/update_btc',//BTC访问接口
    DynamicState:'home/Calculator/invest_ing',//云矿工动态列表接口
    SalesRecord:'home/member/invest',           //算力购买记录
    ActivationCode:'home/member/activation',//激活码
    Withdrawcash:'home/member/flowing',//用户提现明细
    investment:'home/Calculator/dynamic',//投资动态
    usermassrws:'home/member/user_income',// 用户收益接口 
    PostBTCinformation:'home/Calculator/btc_data', //获取BTC信息接口   
    MobileAllProfit:'home/member/agent',//总收益信息接口
    ReplacePhonenumber:'home/member/update_phone',//更换手机号码 
    AmountOfAccess:"home/home/trajectory",//访问量
    ActivityJudgment:"home/home/activity",//活动判断接口
    ReceiveActivationCode:"home/home/receive",//领取激活码接口
    ActivationCodeList:"home/home/invite_list",//激活码列表
    ProxyInformation:"home/home/user_invite",//个人代理信息
    UserAgentJoinRecord:"home/home/list_invite",//用户代理加入记录


    //java接口
    CommodityDetails:"order/goods/getGoodsDetails.do",//获取商品详情的接口
    ListOfGoods:"order/goods/getGoodsList.do",//获取商品列表的接口
    CommodityEntryRecord:"order/goods/goodsJoinRecord.do",//获取商品加入记录的接口
    MembershipIncome:"order/earning/memberEarning.do",//会员收益接口(403参数有误)
    ActivationCodeActivation:"order/activationcode/activate.do",//激活码激活接口(403参数有误)
    ActivationCodePurchaseList:"order/activationcode/getActivateOrderInfoList.do",//分页获取激活码购买列表接口
    ForgetPasswordReset:"user/forgetPassword.do",//忘记密码重置
    NewUserRegistrationInformation:"user/getNewUserInfoList.do",//获取最新注册用户信息列表接口
    ObtainingUserInformation:"user/getUserInfo.do",//获取用户信息接口
    DropOut:"user/logOut.do",//退出登录接口
    UserLogin:"user/login.do",//用户登录接口
    UserRegistration:"user/register.do",//用户注册接口
    UserRegistrationVerification:"user/registrationVerification.do",//用户注册验证-验证码手机号和邀请码接口
    SMSAuthenticationCode:"user/sendSms.do",//发送短信获取验证码接口
    BitcoinPrice:"order/calculator/btcMarketInfo.do",//获取当前市场比特币信息接口
    DistributionIncomeCalculator:"order/calculator/distIncomeCal.do",//分销收益计算器接口
    PublicIncomeCalculator:"order/calculator/publicIncomeCal.do",//大众收益计算器接口
    UserAccountInformation:"account/getUserAccountInfo.do",//获取用户账户信息接口
    IncomeRankings:"account/getEarningsInfoList.do",//收益排行版接口
    PhysicalAddress:"user/getAddressByIP.do",//根据用户ip地址获取地址位置接口
    MyInvitingFriend:"user/invite/myInviteFriend.do",//我的邀请好友接口
    InvitationStatistics:"user/invite/inviteStatistics.do",//邀请统计接口
    InvitationRecord:"user/invite/inviteRecord.do",//邀请记录接口
    BindTheBTCAddress:"account/bindingBTC.do",//绑定btc地址接口
    ApplicationForPresentation:"account/applyCash.do",//申请提现接口
    ChangeThePhoneNumberOne:"user/verifyUserPhone.do",//跟换手机号时验证接口
    ChangeThePhoneNumberTow:"user/updateUserPhone.do",//跟换手机号接口
    ModifyThePassword:"user/updatePassword.do",//修改密码接口
    PaginationRecord:"account/selectUserCashInfoList.do",//分页获取提现记录接口
    CreateAnOrder:"cash/order/createCashOrder.do",//创建订单获取支付参数接口
    PurchaseRecord:"order/activationcode/selectOrderInfoListPage.do",//购买记录接口
    ThirdPartyPayment:"cash/order/createAndPayOrder.do",//第三方支付




}  