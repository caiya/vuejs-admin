import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import devArgsMsg from './modules/devArgsMsg'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        devArgsMsg
    }
})  