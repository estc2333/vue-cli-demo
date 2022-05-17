import Vue from 'vue'
import Vuex from 'vuex'

import contacts from "./modules/contacts"
import user from "./modules/user"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        contacts,
        user,
    },
})

export default store
