import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import RouterMap from './permission'
import 'nprogress/nprogress.css'
Vue.use(Router)
// 将路由表暴露给 sideItem 组件 动态渲染出菜单栏
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/layout' /* webpackChunkName: 'layout' */), // 主页
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '主页',
          icon: 'dashboard',
          noCache: true
        },
        component: () =>
          import('@/views/dashboard' /* webpackChunkName: 'dashboard' */) // 启动页
      }
    ]
  },
  ...RouterMap,
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error/401' /* webpackChunkName: '401' */) // 启动页
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login' /* webpackChunkName: '401' */) // 启动页
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404' /* webpackChunkName: '401' */) // 启动页
  }
]
const createRouter = () =>
  new Router({
    // mode: 'history',
    scrollBehavior: () => ({
      y: 0
    }), // 新开的路由默认为顶部
    routes: constantRouterMap
  })
const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 捕获权限
const baseTitle = 'title'
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = baseTitle + '-' + to.meta.title
  if (to.path === '/login') {
    next()
  } else {
    if (JSON.stringify(store.getters.userInfo) === '{}') {
      next('/login')
    } else {
      const role = store.getters.userInfo.userInfo.type
      // 动态加载路由，刷新后页面路由丢失 白屏
      await store.dispatch('setPermission', role)
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
