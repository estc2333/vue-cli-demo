import Vue from 'vue'
import Vuex from 'vuex'

import contacts from "./modules/contacts"
import auth from "./modules/auth"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        contacts,
        auth,
    },
})

export default store
