/*
 * @Author: cnblogs.com/vipzhou
 * @Date: 2018-02-22 21:30:19 
 * @Last Modified by: vipzhou
 * @Last Modified time: 2018-02-23 21:13:44
 */

import * as http from './base'

/**
 * 获取设备列表
 * @param {object} params 
 */
const getDevTypeList = params => {
  return http.fetch('/devTypes', params)
}
/**
 * 删除设备
 * @param  {object} params
 */
const deleteDevTypeById = id => {
  return http.del(`/devTypes/${id}`)
}
/**
 * 获取设备详情
 * @param  {id} id
 */
const getDevTypeDetail = id => {
  return http.fetch(`/devTypes/${id}`, {})
}

/**
 * 保存设备信息
 * @param {object} devType 
 */
const updateDevTypeInfo = devType => {
  if (!devType.id) {
    return Promise.reject(new Error(`arg id can't be null`))
  }
  return http.put(`/devTypes/${devType.id}`, devType)
}

/**
 * 添加设备
 * @param {devType对象} devType 
 */
const addDevType = devType => {
  return http.post('/devTypes', devType)
}

export { getDevTypeList, deleteDevTypeById, getDevTypeDetail, updateDevTypeInfo, addDevType }