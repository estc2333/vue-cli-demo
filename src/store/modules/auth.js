import mutationTypes from "../mutationTypes";
import { auth } from '@/includes/firebase';

const state = {
    username: '',
}

const actions = {
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
    mutations,
    actions,
}
