<template>
  <el-form>
    <el-form-item label="名称">

    </el-form-item>
  </el-form>
</template>

<script>
import {Button, Table, TableColumn, Form, FormItem} from 'element-ui'

export default {
  name: "ContactModal",
  components: {
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
  },
}
</script>

<style scoped>

</style>
