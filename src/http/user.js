/*
 * @Author: cnblogs.com/vipzhou
 * @Date: 2018-02-22 21:30:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-22 22:02:47
 */

import * as http from './base'

/**
 * 登陆
 * @param {object} data 
 */
const login = (data) => {
  return http.post('/users/login', data)
}

/**
 * 获取用户列表
 * @param {object} params 
 */
const getUserList = params => {
  return http.fetch('/users', params)
}
/**
 * 删除用户
 * @param  {object} params
 */
const deleteUserById = id => {
  return http.del(`/users/${id}`)
}
/**
 * 获取用户详情
 * @param  {id} id
 */
const getUserDetail = id => {
  return http.fetch(`/users/${id}`, {})
}

/**
 * 保存用户信息
 * @param {object} user 
 */
const updateUserInfo = user => {
  if (!user.id) {
    return Promise.reject(new Error(`arg id can't be null`))
  }
  return http.put(`/users/${user.id}`, user)
}

export { login, getUserList, deleteUserById, getUserDetail, updateUserInfo }