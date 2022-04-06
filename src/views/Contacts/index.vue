<template>
  <div v-if="!isEmpty(list)">contacts
    <contact-modal
        v-if="isVisible"
        :contact-info="contactInfo"
        @submit="onSubmit"
        @hideModal="onHideModal"
    />
    <template v-else>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="tel" label="电话" width="180" />
        <el-table-column prop="address" label="地址" />
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="onEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="onAdd">add</el-button>
    </template>
  </div>
</template>

<script>
import {Button, Table, TableColumn} from 'element-ui'
import {mapState, mapActions} from 'vuex'
import { isEmpty } from 'lodash-es'
import ContactModal from '@/components/Modal'

export default {
  name: "contacts",
  components: {
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    ContactModal,
  },
  data() {
    return {
      isEmpty,
      contactInfo: {},
      isVisible: false,
      isEdit: false,
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
      this.isVisible = true
      this.isEdit = false
      this.contactInfo = null
    },
    onEdit(contactInfo) {
      this.isVisible = true
      this.isEdit = true
      this.contactInfo = contactInfo
    },
    onDelete(contactId) {
      this.deleteContact({id: contactId})
          .then(() => this.getContactList())
    },
    async onSubmit (formInfo) {
      this.isEdit
          ? await this.editContact({contactInfo: formInfo})
          : await this.addContact({contactInfo: formInfo})
      this.getContactList()
      this.isVisible = false
    },
    onHideModal() {
      this.isVisible = false
    }
  },
  mounted() {
    this.getContactList()
  }
}
</script>

<style scoped>

</style>
