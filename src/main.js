// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import 'default-passive-events'
import '@/assets/styles/main.less'
import '../theme/index.css'
import ElementUI from 'element-ui'
import '@/directive/auth.js'
import mixin from './mixin/index'
import * as filters from './filters'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
import '@/icons' // icon
Vue.use(ElementUI)
Vue.mixin(mixin)
Vue.use(VueDirectiveImagePreviewer, {
  zIndex: 9999
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
const vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
Vue.use({
  vm
})
