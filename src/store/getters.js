const getters = {
  // 全局
  isCollapse: state => state.global.isCollapse,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  userInfo: state => state.global.userInfo,
  isLogin: state => state.global.userInfo.token,
  role: state => state.global.userInfo.userInfo.type,
  // privilege: state => state.global.userInfo.admin.roles.privilege || [],
  permission: state => state.global.permission,
  // 渠道商
  uRechargeInfo: state => state.deal.uRechargeInfo,
  uBalanceInfo: state => state.deal.uBalanceInfo,
  uChannelInfo: state => state.deal.uChannelInfo,
  uWithdrawInfo: state => state.deal.uWithdrawInfo,
  mRechargeInfo: state => state.deal.mRechargeInfo,
  mBalanceInfo: state => state.deal.mBalanceInfo,
  mChannelInfo: state => state.deal.mChannelInfo,
  mWithdrawInfo: state => state.deal.mWithdrawInfo,
  appealRepayDetail: state => state.deal.appealRepayDetail,
  appealRepayDeal: state => state.deal.appealRepayDeal,
  repayDetail: state => state.deal.repayDetail,
  appealLoanDetail: state => state.deal.appealLoanDetail,
  appealLoanDeal: state => state.deal.appealLoanDeal,
  loanDetail: state => state.deal.loanDetail,
  appealWithdrawDetail: state => state.deal.appealWithdrawDetail,
  appealWithdrawDeal: state => state.deal.appealWithdrawDeal,
  withdrawDetail: state => state.deal.withdrawDetail,
  appealChargeDetail: state => state.deal.appealChargeDetail,
  appealChargeDeal: state => state.deal.appealChargeDeal,
  chargeDetail: state => state.deal.chargeDetail
}
export default getters
