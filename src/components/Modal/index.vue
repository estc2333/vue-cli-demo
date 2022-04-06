<template>
  <el-form class="wrapper" label-width="120px" label-position="left" @click="clickOutside">
    <el-form-item label="姓名" >
      <el-input v-model="form.name" size="medium"></el-input>
    </el-form-item>
    <el-form-item label="电话" >
      <el-input v-model="form.tel"></el-input>
    </el-form-item>
    <el-form-item label="地址" >
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-button type="primary" @click="onSubmit">submit</el-button>
  </el-form>
</template>

<script>
import {Button, Input, TableColumn, Form, FormItem} from 'element-ui'
import { isEmpty } from 'lodash-es'

export default {
  name: "ContactModal",
  components: {
    [Button.name]: Button,
    [Input.name]: Input,
    [TableColumn.name]: TableColumn,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
  },
  props: {
    contactInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        name: '',
        tel: '',
        address: '',
      },
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.form)
    },
    clickOutside(event) {
      if (!event.target.closest('.wrapper')) {
        this.$emit('hideModal')
      }
    }
  },
  mounted() {
    if(!isEmpty(this.contactInfo)) {
      this.form = {...this.form, ...this.contactInfo}
    }
    window.addEventListener('mousedown', this.clickOutside)
  },
  destroyed() {
    window.removeEventListener('mousedown', this.clickOutside)
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 30vw;
  background-color: white;
  padding: 40px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%);
  .el-input {
    width: 300px;
  }
}
</style>
