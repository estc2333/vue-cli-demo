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
          <el-button type="text" size="mini" @click="onEdit(scope.row.id)">编辑</el-button>
          <el-button type="text" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="onAdd">add</el-button>
    <el-button type="primary" @click="onCancel">cancel</el-button>
  </div>
</template>

<script>
import {Button, Table, TableColumn} from 'element-ui'
import {mapState, mapActions} from 'vuex'
import { isEmpty } from 'lodash-es'
import axios from "axios";

let source = axios.CancelToken.source() // 声明一个带有取消请求的axios实例

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
        'editContact',
        'deleteContact',
    ]),
    getContactList() {
      this.getContacts()
    },
    onAdd() {
      // this.addContact({contactInfo: this.contactInfo})
      //     .then(() => this.getContactList())
      axios.post('http://localhost:9000/api/contact/new/json', {...this.contactInfo}, {
        cancelToken: source.token,
      })
          .then(() => this.getContactList())
          .catch(err => console.log(err))
    },
    onEdit() {
      this.editContact({contactInfo: this.contactInfo})
          .then(() => this.getContactList())
    },
    onDelete(contactId) {
      this.deleteContact({id: contactId})
          .then(() => this.getContactList())
    },
    onCancel() {
      axios.post('http://localhost:9000/api/contact/new/json', {...this.contactInfo}, {
        cancelToken: source.token,
      })
          .then(() => this.getContactList())
          .catch(err => {
                if (axios.isCancel(err)) {
                  console.log('Request canceled:----', err.message);
                } else {
                  // handle error
                }
              }
          )
      source.cancel('Operation canceled by the user.') // 参数可选, 参数取消后会进入上面的catch里
    },

  },
  mounted() {
    this.getContactList()
  }
}
</script>

<style scoped>

</style>
