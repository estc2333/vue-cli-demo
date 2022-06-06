import Vue from 'vue'
import Vuex from 'vuex'

import contacts from "./modules/contacts"
import auth from "./modules/auth"
import products from "./modules/products"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        contacts,
        auth,
        products,
    },
})

export default store
