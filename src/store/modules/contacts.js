import ContactAPIs from "../../api/contact";
import mutationTypes from "../mutationTypes";

const state = {
    list: [],
}

const actions = {
    getContacts ({commit}) {
        console.log('s')
        return ContactAPIs.getContactList()
            .then(res => {
                commit(mutationTypes.GET_CONTACT_LIST, res)
            })
            .catch(err => console.log(err))
    }
}

const mutations = {
    [mutationTypes.GET_CONTACT_LIST] (state, payload) {
        state.list = payload
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
