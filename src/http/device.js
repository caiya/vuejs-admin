/*
 * @Author: cnblogs.com/vipzhou
 * @Date: 2018-02-22 21:30:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-22 22:02:47
 */

import * as http from './base'

/**
 * 获取设备列表
 * @param {object} params 
 */
const getDeviceList = params => {
  return http.fetch('/devices', params)
}
/**
 * 删除设备
 * @param  {object} params
 */
const deleteDeviceById = id => {
  return http.del(`/devices/${id}`)
}
/**
 * 获取设备详情
 * @param  {id} id
 */
const getDeviceDetail = id => {
  return http.fetch(`/devices/${id}`, {})
}

/**
 * 保存设备信息
 * @param {object} device 
 */
const updateDeviceInfo = device => {
  if (!device.id) {
    return Promise.reject(new Error(`arg id can't be null`))
  }
  return http.put(`/devices/${device.id}`, device)
}

/**
 * 添加设备
 * @param {device对象} device 
 */
const addDevice = device => {
  return http.post('/devices', device)
}

export { getDeviceList, deleteDeviceById, getDeviceDetail, updateDeviceInfo, addDevice }