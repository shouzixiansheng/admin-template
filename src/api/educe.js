import axios from 'axios'
import { throwErr, clearParams } from '@/utils'
import { Message } from 'element-ui'
import * as ls from '@/utils/localStorage'
// 过滤请求
const Request = axios.create({

})
Request.interceptors.request.use(config => {
  if (config.url === '/api/user/login') {
    return config
  } else {
    const userInfo = ls.get('userInfo')
    config.headers = {
      token: userInfo.token
    }
    config.timeout = 30 * 1000
    return config
  }
}, error => {
  return Promise.reject(error)
})
// 添加响应拦截器
Request.interceptors.response.use(
  response => {
    const disposition = response.headers['content-disposition']
    const fileName = decodeURI(disposition.substring(disposition.indexOf('filename=') + 9, disposition.length))
    let blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    link.remove()
  },
  error => {
    if (error && error.response) {
      let res = {}
      res.code = error.response.status
      res.message = throwErr(error.response.status, error.response)
      Message({
        type: 'error',
        message: res.message
      })
      return Promise.reject(res)
    }
    return Promise.reject(error)
  }
)
export default function request(method, url, data) {
  method = method.toLocaleLowerCase()
  data.size = null
  data.page = null
  if (method === 'get') {
    return Request.get(url, {
      params: clearParams(data),
      responseType: 'blob'
    })
  }
}

export const educeOrders = (type, params) => {
  return request('get', `/api/order/${type}/list/export`, params)
}

export const educeUnderwriterDailyReport = (params) => {
  return request('get', `/api/statistics/underwriter/daily-report/export`, params)
}

export const educeChargeLog = (params) => {
  return request('get', `/api/user/amount/charge/log/export`, params)
}

export const educeWithdrawLog = (params) => {
  return request('get', `/api/user/amount/withdraw/log/export`, params)
}

export const educeCommissionReport = (params) => {
  return request('get', `/api/statistics/underwriter/commission/report/export`, params)
}

// 平台历史报表导出
export const educePlatformDailyReport = (params) => {
  return request('get', `/api/statistics/platform-daily-report/history/export`, params)
}

// 财务日报表（历史统计记录) 导出表格
export const educeAccountDailyReport = (params) => {
  return request('get', `/api/statistics/account-daily-report/history/export`, params)
}

// 渠道商财务日报表（历史统计记录) 导出表格
export const educeUnderwriterAccounDailyReport = (params) => {
  return request('get', `/api/statistics/account-daily-report/underwriter/history/export`, params)
}

// 渠道商财务日报表（历史统计记录) 导出表格
export const educeAmountDiffReport = (params) => {
  return request('get', `/api/statistics/amount-diff-order-report/history/export`, params)
}

// 账户余额变更日志导出
export const educeAmountLogReport = (params) => {
  return request('get', `/api/user/amount/change/log/export`, params)
}

// 账户余额变更日志导出
export const educePlatformDailyOrderAmountReportHistory = (params) => {
  return request('get', `/api/statistics/platform-daily-order-amount-report/history/export`, params)
}

// 导出订单状态变更列表
export const educeChannelTypeLog = (channelType, params) => {
  return request('get', `/api/order/${channelType}/status/log/list/export`, params)
}

// 获取银行卡列表导出
export const educeBankcards = (channelType, params) => {
  return request('get', `/api/underwriter/channel/list/bankcard/export`, params)
}
