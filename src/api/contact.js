import request from "./request";

export default {
    getContactList: () => {
        return request.get('/contactList')
            .then(res => res.data)
    },
    addContact: ({name, tel, address, comment}) => {
        return request.post('/contact/new/json', {name, tel, address, comment})
    },
    editContact: ({id, name, tel, address, comment}) => {
        return request.put('/contact/edit', {id, name, tel, address, comment})
    },
    deleteContact: (id) => {
        return request.delete(`/contact`, {
            params: id
        })
    }
}
