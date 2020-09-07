// import * as s from '@/utils/sessionStorage'
import * as ls from '@/utils/localStorage'
import asyncRouterMap from '@/router/permission'
// import { getAdminPermissionTree } from '@/api/login'  权限树
import * as _ from 'lodash'
const global = {
  state: {
    isCollapse: false,
    userInfo: ls.get('userInfo') || {},
    permission: [],
    isBindGoogleCode: ls.get('isBindGoogleCode') || false
  },
  mutations: {
    setIsCollapse: (state, payload) => {
      state.isCollapse = payload
    },
    setUserInfo: state => {
      state.userInfo = ls.get('userInfo') || {}
    },
    setPermission: (state, payload) => {
      state.permission = payload
    },
    setIsBindGoogleCode: (state, payload) => {
      ls.set('isBindGoogleCode', payload)
      state.isBindGoogleCode = payload
    }
  },
  actions: {
    setUserInfo: async({ commit, dispatch, state }, payload) => {
      ls.set('userInfo', payload)
      await dispatch(
        'setPermission',
        JSON.stringify(payload) === '{}' ? '' : payload.userInfo.type
      )
      await commit('setUserInfo')
    },
    logout: async({ commit, dispatch, state }, payload) => {
      const ysfHold = document.querySelector('#YSF-BTN-HOLDER')
      const ysfInfo = document.querySelector('#YSF-PANEL-INFO')
      if (ysfHold) {
        ysfHold.style.display = 'none'
        ysfInfo.classList.remove('ysf-chat-layeropen')
      }
      if (window.ysf) {
        window.ysf('logoff')
      }
      await dispatch('setUserInfo', {})
      await ls.clear()
    },
    setPermission: ({ commit, dispatch, state }, payload) => {
      let routes = _.cloneDeep(asyncRouterMap)
      // 解决重定向404问题
      commit('setPermission', routes)
      // if (payload === '') {
      //   return new Promise(resolve => {
      //     commit('setPermission', [])
      //     resolve([])
      //   })
      // } else {
      //   return new Promise(async resolve => {
      //     let permissionCodes = []
      //     const res = await getAdminPermissionTree()
      //     filterPermissionCodes(res.data, node => {
      //       if (node.active) {
      //         permissionCodes.push(node.code)
      //       }
      //     })

      //     await ls.set('permissionCodes', permissionCodes)
      //     const permission = await filterAsyncRoutes(payload, permissionCodes)
      //     // 解决重定向404问题

      //     await commit('setPermission', permission)
      //     resolve(permission)
      //   })
      // }
    }
  }
}
export default global
// 过滤左侧菜单使用 可以后端来定义左侧路由菜单
// function filterAsyncRoutes(role, permissionCodes) {
//   let routes = _.cloneDeep(asyncRouterMap)
//   const res = []
//   routes.forEach(route => {
//     let temp = []
//     route.children.forEach(item => {
//       if (hasPermission(role, item, permissionCodes)) {
//         temp.push(item)
//       }
//     })
//     route.children = temp
//     if (route.children.length > 0) {
//       res.push(route)
//     }
//   })
//   return res
// }
// function hasPermission(role, route, permissionCodes) {
//   if (route.meta && route.meta.roles) {
//     if (route.meta.roles.includes(role)) {
//       if (!route.meta.code) {
//         return true
//       } else {
//         return permissionCodes.includes(route.meta.code)
//       }
//     }
//   } else {
//     return false
//   }
// }

// function filterPermissionCodes(tree, func) {
//   tree.forEach(data => {
//     func(data)
//     data.children && filterPermissionCodes(data.children, func) // 遍历子树
//   })
// }
