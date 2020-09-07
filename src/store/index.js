import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import tagsView from './modules/tagsView'
import getters from './getters'
import deal from './modules/deal'
import refresh from './modules/refresh'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    global,
    tagsView,
    deal,
    refresh

  },
  getters
})

export default store
