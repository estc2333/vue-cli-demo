<template>
  <div>contacts
    <ul>
      <li v-for="listItem in list" :key="listItem.id">{{listItem.name}}</li>
    </ul>
    <el-button type="primary">add</el-button>
    <el-button type="primary" @click="getContacts()">fetch</el-button>
  </div>
</template>

<script>
import {Button, Table} from 'element-ui'
import {mapState, mapActions} from 'vuex'

export default {
  name: "contacts",
  components: {
    [Button.name]: Button,
    [Table.name]: Table,
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState('contacts', ['list'])
  },
  methods: {
    ...mapActions('contacts', ['getContacts'])
  }
}
</script>

<style scoped>

</style>
