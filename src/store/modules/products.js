import mutationTypes from "../mutationTypes"
import {productsCollection} from '@/utils/firebase'
import {v4} from "uuid"
import {Message} from 'element-ui'

const state = {
    productsInfo: [],
}

const actions = {
    getProductsInfo({commit}) {
        return productsCollection.get()
            .then((res) => {
                commit(mutationTypes.GET_PRODUCTS_INFO, res)
            })
    },
    addProduct({dispatch}, {productName, productURL}) {
        let id = v4()
        // add product info to firebase store
        return productsCollection.doc(id).set({
            id,
            productName,
            productURL,
        })
            .then(() => {
                Message({
                    message: 'submit success',
                    type: 'success',
                    center: true,
                })
                dispatch('getProductsInfo')
            })
            .catch(error => {
                Message({
                    message: error,
                    type: 'error',
                    center: true,
                })
            })
    },
    deleteProduct({dispatch}, {id}) {
        return productsCollection.doc(id).delete()
            .then(() => {
                Message({
                    message: 'delete success',
                    type: 'success',
                    center: true,
                })
                dispatch('getProductsInfo')
            })
            .catch((error) => {
                Message({
                    message: error,
                    center: true,
                })
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
    mutations,
    actions,
}
