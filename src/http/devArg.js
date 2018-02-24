/*
 * @Author: cnblogs.com/vipzhou
 * @Date: 2018-02-22 21:30:19 
 * @Last Modified by: vipzhou
 * @Last Modified time: 2018-02-24 20:52:13
 */

import * as http from './base'

/**
 * 获取设备参数列表
 * @param {object} params 
 */
const getDevArgList = params => {
  return http.fetch('/devArgs', params)
}
/**
 * 删除设备参数
 * @param  {object} params
 */
const deleteDevArgById = id => {
  return http.del(`/devArgs/${id}`)
}
/**
 * 获取设备参数详情
 * @param  {id} id
 */
const getDevArgDetail = id => {
  return http.fetch(`/devArgs/${id}`, {})
}

/**
 * 保存设备参数信息
 * @param {object} devType 
 */
const updateDevArgInfo = devType => {
  if (!devType.id) {
    return Promise.reject(new Error(`arg id can't be null`))
  }
  return http.put(`/devArgs/${devType.id}`, devType)
}

/**
 * 添加设备参数
 * @param {devType对象} devType 
 */
const addDevArg = devType => {
  return http.post('/devArgs', devType)
}

export { getDevArgList, deleteDevArgById, getDevArgDetail, updateDevArgInfo, addDevArg }