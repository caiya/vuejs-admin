import * as TYPES from '../mutation.types'

const state = {
    user: {},
    token: ''
}

const actions = {}

const mutations = {
    [TYPES.LOGIN]: (state, loginData) => {
        state.user = loginData.user
        state.token = loginData.token
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}


