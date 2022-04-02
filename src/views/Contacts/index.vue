<template>
  <div v-if="!isEmpty(list)">contacts
    <el-table
        :data="list"
        style="width: 100%"
    >
      <el-table-column
          prop="name"
          label="姓名"
          width="180"
      />
      <el-table-column
          prop="tel"
          label="电话"
          width="180"
      />
      <el-table-column
          prop="address"
          label="地址"
      />
      <el-table-column
          label="操作"
          width="280">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editContact">编辑</el-button>
          <el-button type="text" size="mini" @click="deleteContact">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="onAdd">add</el-button>
  </div>
</template>

<script>
import {Button, Table, TableColumn} from 'element-ui'
import {mapState, mapActions} from 'vuex'
import { isEmpty } from 'lodash-es'

export default {
  name: "contacts",
  components: {
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      isEmpty,
      contactInfo: {
        name: '王五2',
        tel: '13000000002',
        address: '中国 四川省 成都市 高新区 新业路92号',
      },
    }
  },
  computed: {
    ...mapState('contacts', ['list'])
  },
  methods: {
    ...mapActions('contacts', [
        'getContacts',
        'addContact',
    ]),
    getContactList() {
      this.getContacts()
    },
    onAdd() {
      this.addContact({contactInfo: this.contactInfo})
    },
    editContact() {

    },
    deleteContact() {

    },

  },
  mounted() {
    this.getContactList()
  }
}
</script>

<style scoped>

</style>
