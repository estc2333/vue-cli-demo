import request from "./request";

export default {
    getContactList: () => {
        return request.get('/contactList')
            .then(res => res.data)
    },
    addContact: ({name, tel, address}) => {
        return request.post('/contact/new/json', {name, tel, address})
    },
    editContact: ({id, name, tel, address}) => {
        return request.put('/contact/edit', {id, name, tel, address})
    },
    deleteContact: (id) => {
        return request.delete(`/contact`, {
            params: id
        })
    }
}
