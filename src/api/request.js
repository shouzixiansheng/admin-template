import axios from 'axios'
import { throwErr, clearParams } from '@/utils'
import store from '@/store'
import { Message } from 'element-ui'
import router from '../router'
import * as ls from '@/utils/localStorage'
// 过滤请求
const Request = axios.create({

})
Request.interceptors.request.use(config => {
  if (config.url === '/api/user/login' || config.url.indexOf('/api/user/totp/check/') > -1) {
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
    if (response.data.code === '0') {
      return Promise.resolve(response.data)
    } else if (response.data.code === '101') {
      store.dispatch('logout', {})
      Message({
        message: '已失效，请重新登录'
      })
      return Promise.resolve(response.data)
    } else if (response.data.code === 4800) {
      router.push('/login')
    } else {
      Message({
        type: 'error',
        message: response.data.msg
      })
      return Promise.reject(response.data)
    }
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
  if (method === 'post') {
    return Request.post(url, data)
  } else if (method === 'patch') {
    return Request.patch(url, data)
  } else if (method === 'put') {
    return Request.put(url, data)
  } else if (method === 'get') {
    return Request.get(url, {
      params: clearParams(data)
    })
  } else if (method === 'delete') {
    return Request.delete(url, { params: clearParams(data) })
  }
}
