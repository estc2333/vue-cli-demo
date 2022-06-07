import mutationTypes from "../mutationTypes";
import { productsCollection } from '@/includes/firebase';

const state = {
    productsInfo: [],
}

// const getters = {
//     productsList (state) {
//         return state.productsInfo.map(({id, productName}) => {
//             return {id, productName}
//         })
//     }
// }

const actions = {
    getProductsInfo({commit}) {
        return productsCollection.get()
            .then((res) => {
                commit(mutationTypes.GET_PRODUCTS_INFO, res)
            })
    },
}

const mutations = {
    [mutationTypes.GET_PRODUCTS_INFO](state, payload) {
        state.productsInfo = payload.docs.map(doc => {
            return doc.data()
        })
    }
}

export default {
    namespaced: true,
    state,
    // getters,
    mutations,
    actions,
}
