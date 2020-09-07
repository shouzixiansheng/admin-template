import request from './request'
import axios from 'axios'

// 渠道列表
export const getChannelTypeList = (params) => {
  return request('get', `/api/channel-type/list`, params)
}

// 获取图片上传url
export const ossUpload = (params) => {
  return request('get', `/api/storage/image/sign`, params)
}

export const getTypeUsers = (type, params) => {
  return request('get', `/api/user/${type}`, params)
}

export const getUserQuery = (params) => {
  return request('get', `/api/user/query`, params)
}

export const uploadImg = (data, file) => {
  let formData = new FormData()
  const param = data.param
  formData.append('OSSAccessKeyId', param.OSSAccessKeyId)
  formData.append('Signature', param.Signature)
  formData.append('Content-Type', param['Content-Type'])
  formData.append('key', param.key)
  formData.append('policy', param.policy)
  formData.append('file', file)
  return axios.post(data.url, formData).then(res => {
    return Promise.resolve(res)
  }).catch(err => {
    return Promise.reject(err)
  })
}
