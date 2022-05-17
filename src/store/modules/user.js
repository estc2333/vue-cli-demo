import mutationTypes from "../mutationTypes";

const state = {
    username: '',
}
const actions = {
    getUsername ({ commit }, res) {
        commit(mutationTypes.GET_USERNAME, res)
    }
}

const mutations = {
    [mutationTypes.GET_USERNAME] (state, payload) {
        state.username = payload
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
