import request from './request'
// 权限树
export const getPermissionTree = (params) => {
  return request('get', `/api/admin/acl/permission/tree`, params)
}

// 创建带权限的角色
export const postRole = (params) => {
  return request('post', `/api/admin/acl/role-with-permission`, params)
}

// 更新带权限角色
export const putRole = (params) => {
  return request('put', `/api/admin/acl/role-with-permission`, params)
}

// 更新带权限角色
export const deleRole = (params) => {
  return request('delete', `/api/admin/acl/role`, params)
}

// 获取系统角色详情列表
export const getRoles = (params) => {
  return request('get', `/api/admin/acl/role-detail-list`, params)
}

// 创建带角色的管理员
export const postAdmin = (params) => {
  return request('post', `/api/admin/admin-with-role`, params)
}

// 更新管理员数据
export const putAdmin = (params) => {
  return request('put', `/api/admin/admin-with-role`, params)
}

// 管理员列表
export const getAdmins = (params) => {
  return request('get', `/api/admin/admin-with-user-list`, params)
}

// 管理员列表
export const putAdminPassword = (params) => {
  return request('put', `/api/admin/reset-password`, params)
}

// 查询管理员角色
export const getAdminRole = (params) => {
  return request('get', `/api/admin/admin-with-role`, params)
}

// 回调日志
export const getNotifyLogs = (params) => {
  return request('get', `/api/notify/logs`, params)
}

// 手动回调
export const postNotifyCall = (id, params) => {
  return request('post', `/api/notify/${id}/call`, params)
}

// 修改自己的密码
export const postMyPassword = (params) => {
  return request('post', `/api/user/reset-my-password`, params)
}

// 通道列表
export const getChannelList = (params) => {
  return request('get', `/api/channel-type/list-with-page`, params)
}

// 更新通道
export const postChannelUpdate = (params) => {
  return request('post', `/api/channel-type/update`, params)
}

// 添加通道
export const postChannelAdd = (params) => {
  return request('post', `/api/channel-type/add`, params)
}

// 系统配置列表
export const getConfigs = (params) => {
  return request('get', `/api/config/list`, params)
}

// 修改系统配置
export const postConfig = (name, params) => {
  return request('post', `/api/config/${name}`, params)
}

// 渠道商渠道列表
export const getUChannelList = (params) => {
  return request('get', `/api/underwriter/channel/list`, params)
}

export const removeUChannel = (id, params) => {
  return request('delete', `/api/underwriter/channel/remove?id=${id}`, params)
}

export const postUChannelAdd = (params) => {
  return request('post', `/api/underwriter/channel/add`, params)
}

export const postUChannelUpdate = (params) => {
  return request('post', `/api/underwriter/channel/update`, params)
}

export const deleC2CAtuo = (id, params) => {
  return request('delete', `/api/order/loan/c2c/grab/auto/${id}`, params)
}
export const postC2CAtuo = (id, params) => {
  return request('post', `/api/order/loan/c2c/grab/auto/${id}`, params)
}

// 获取商户自己的secret
export const getMerchantSercet = (params) => {
  return request('get', `/api/merchant/my-secret`, params)
}

// 活跃度管理
// 渠道列表
export const getActivityList = (params) => {
  return request('get', `/api/underwriter/channel/activity/list`, params)
}

// 设置渠道实例使用限制
export const putActivityLimit = (params) => {
  return request('put', `/api/underwriter/channel/activity/limit`, params)
}

// 同步权限枚举保存到数据库
export const permissionSync = (params) => {
  return request('get', `/api/admin/permission/sync`, params)
}

// 获取指定货币账户配置  充值地址
export const getAmountAccount = (params) => {
  return request('get', `/api/user/amount/account`, params)
}

// 更新指定货币账户的配置  充值地址
export const postAmountAccount = (params) => {
  return request('post', `/api/user/amount/account`, params)
}

// 提现接口_USDT
export const postWithdrawUsdt = (params) => {
  return request('post', `/api/user/amount/withdraw/digital-currency/usdt`, params)
}

// 生成验证码
export const totpGeneral = (params) => {
  return request('post', `/api/user/totp/general`, params)
}

// 绑定
export const totpBind = (params) => {
  return request('post', `/api/user/totp/bind`, params)
}

// 验证验证码
export const totpVerify = (params) => {
  return request('post', `/api/user/totp/verify`, params)
}

// 检查用户是否绑定验证码
export const totpCheckUserName = (name, params) => {
  return request('post', `/api/user/totp/check/${name}`, params)
}

// 解绑
export const totpUnbind = (params) => {
  return request('post', `/api/user/totp/unbind`, params)
}

// 获取银行卡列表
export const getBankcards = (params) => {
  return request('get', `/api/underwriter/channel/list/bankcard`, params)
}

// 通道使用情况查询
export const getChannelUsage = (params) => {
  return request('get', `/api/underwriter/channel/usage`, params)
}
