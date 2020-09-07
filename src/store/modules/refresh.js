// import * as s from '@/utils/sessionStorage'
const refresh = {
  state: {
    repayRefresh: 0,
    loanRefresh: 0,
    chargeRefresh: 0,
    withdrawRefresh: 0
  },
  mutations: {
    setRepayRefresh: state => {
      state.repayRefresh += 1
    },
    setLoanRefresh: state => {
      state.loanRefresh += 1
    },
    setChargeRefresh: state => {
      state.chargeRefresh += 1
    },
    setWithdrawRefresh: state => {
      state.withdrawRefresh += 1
    }
  }
}
export default refresh
