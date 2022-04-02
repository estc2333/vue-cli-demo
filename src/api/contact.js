import request from "./request";

export default {
    getContactList: () => {
        return request.get('/contactList')
            .then(res => res.data)
    }
}
