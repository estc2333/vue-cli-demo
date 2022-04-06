import ContactAPIs from "../../api/contact";
import mutationTypes from "../mutationTypes";

const state = {
    list: [],
}

const actions = {
    getContacts ({commit}) {
        return ContactAPIs.getContactList()
            .then(res => {
                commit(mutationTypes.GET_CONTACT_LIST, res)
            })
            .catch(err => console.log(err))
    },
    addContact ({_}, {contactInfo}) {
        return ContactAPIs.addContact(contactInfo)
            .catch(err => console.log(err))
    },
    editContact ({_}, {contactInfo}) {
        return ContactAPIs.editContact(contactInfo)
            .catch(err => console.log(err))
    },
    deleteContact ({_}, contactId) {
        return ContactAPIs.deleteContact(contactId)
            .catch(err => console.log(err))
    }
}

const mutations = {
    [mutationTypes.GET_CONTACT_LIST] (state, payload) {
        state.list = payload.data
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
