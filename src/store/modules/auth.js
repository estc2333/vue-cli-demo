import mutationTypes from "../mutationTypes";
import { auth } from '@/utils/firebase';

const state = {
    username: '',
    showLoginForm: false,
}

const getters = {
    isShowLoginForm(state) {
        return state.showLoginForm
    }
}

const actions = {
    login({ commit }) {
        commit(mutationTypes.LOGIN)
    },
    updateShowLoginForm({ commit }) {
        commit(mutationTypes.UPDATE_SHOW_LOGIN_FORM)
    },
    getUsername ({ commit }, res) {
        commit(mutationTypes.GET_USERNAME, res)
    },
    logout({commit}) {
        return auth.signOut()
            .then(() => {
                commit(mutationTypes.LOGOUT)
            })
    }
}

const mutations = {
    [mutationTypes.LOGIN] (state) {
        state.showLoginForm = true
    },
    [mutationTypes.UPDATE_SHOW_LOGIN_FORM] (state) {
        state.showLoginForm = !state.showLoginForm
    },
    [mutationTypes.LOGOUT] (state) {
        state.username = ''
    },
    [mutationTypes.GET_USERNAME] (state, payload) {
        state.username = payload
    },
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
