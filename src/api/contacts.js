import request from "./request";

export default {
    getContacts: () => request.get('/data.json').then(response => response.data)
        .catch(err => console.log(err, 'e')),
    getContactsById: (id) => request.get('/data.json', {
        params: {id}
    }).then(response => response.data)
        .catch(err => console.log(err, 'e')),
    addContact: (contact) => request.post('/data.json', {contact})
        .catch(err => console.log(err, 'e')),

    deleteContact: ({contact}) => request.delete('/ddd', {params: {contact}}), // params in url
    deleteContact1: ({contact}) => request.delete('/ddd', {data: {contact}}) // params in requestBody
}
