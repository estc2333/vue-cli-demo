<template>
  <div v-if="!isEmpty(list)">
    <contact-modal
        v-if="isVisible"
        :isVisible="isVisible"
        :contact-info="contactInfo"
        :title="title"
        @submit="onSubmit"
        @hideModal="onHideModal"
    />
    <template>
      <div class="header">
        <p>门店联系人</p>
        <el-button type="text" @click="onAdd">添加联系人</el-button>
      </div>
      <el-table
          :data="list"
          :header-cell-style="{ background: '#fafafa' }"
      >
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
      title: ''
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
      this.title = '添加联系人'
    },
    onEdit(contactInfo) {
      this.isVisible = true
      this.isEdit = true
      this.contactInfo = contactInfo
      this.title = '编辑联系人'
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

<style lang="scss" scoped>
.header {
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  margin-bottom: 1px;
}
</style>
