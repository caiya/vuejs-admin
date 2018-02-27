/**
 * 设备实时参数接收的store，页面再从该store实时获取显示
 */

import * as TYPES from '../mutation.types'

import moment from 'moment'

const state = {
    // 实时的参数消息
    msgs: []
}

const actions = {

}

const mutations = {
    [TYPES.SETDEVARGSMSG]: (state, {msg = '', devId = ''}) => {
        const time = moment().format('YYYY/MM/DD HH:mm:ss')
        const argValues = msg.split('|')
        argValues.forEach(item => {
            state.msgs.push({
                name: time,
                value: [time, item.split(':')[1], item.split(':')[0], devId],
            })
        })
    }
}

const getters = {
    doneMsg: state => {
        return state.msgs
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}


