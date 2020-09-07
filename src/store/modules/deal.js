// import * as s from '@/utils/sessionStorage'
import * as ls from '@/utils/localStorage'
const global = {
  state: {
    mBalanceInfo: ls.get('mBalanceInfo') || {}

  },
  mutations: {
    setMBalanceInfo: state => {
      state.mBalanceInfo = ls.get('mBalanceInfo') || {}
    }
  },
  actions: {
    setMBalanceInfo: ({ commit, dispatch, state }, payload) => {
      ls.set('mBalanceInfo', payload)
      commit('setMBalanceInfo')
    }
  }
}
export default global
