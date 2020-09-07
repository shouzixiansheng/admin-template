import request from './request'

// 登录
export const login = (params) => {
  return request('post', `/api/user/login`, params)
}

// 管理员权限树
export const getAdminPermissionTree = (params) => {
  return request('get', `/api/admin/admin-permission-tree`, params)
}
