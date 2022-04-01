<template>
  <div>
    axios request methods
    <section>
      <li @click="getContacts">get</li>
      <li @click="getContactsById">get with params</li>
      <li @click="addContact">
        post
        <p>post常用数据： 1. form-data（比较老的表单提交，图片、文件上传） 2.application/json （多数）</p>
      </li>
      <li>put：更新数据，将所有数据推给后端</li>
      <li>patch：更新数据，只将修改的数据推给后端（如果表单的数据量很大，有很多项，全部推送耗费性能，考虑patch）</li>
      <li @click="deleteContact">
        delete
        <p @click="deleteContact1">可以把参数放在url，也可以放请求体，要和后端沟通好</p>
      </li>
    </section>
  </div>
</template>

<script>
import contactsAPI from "../../api/contacts";
export default {
  name: "axiosNotes",
  methods: {
    getContacts () {
      contactsAPI.getContacts().then(data => console.log(data))
    },
    getContactsById () {
      contactsAPI.getContactsById(12).then(data => console.log(data))
    },
    addContact () {
      contactsAPI.addContact({name: 'Amber', nick: 'afghj'}).then(data => console.log(data))
    },
    deleteContact () {
      contactsAPI.deleteContact({contact: 'dddd'}).then(data => console.log(data))
    },
    deleteContact1 () {
      contactsAPI.deleteContact1({contact: 'dddd'}).then(data => console.log(data))
    },
  },
}
</script>

<style scoped>

</style>
