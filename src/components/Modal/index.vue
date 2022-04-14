<template>
  <el-dialog :visible.sync="isVisible" :title="title">
    <el-form class="wrapper" label-width="120px" label-position="left" @click="clickOutside">
      <el-form-item label="姓名">
        <el-input v-model="form.name" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <div class="btn">
        <el-button plain @click="hide">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import {Button, Input, TableColumn, Form, FormItem, Dialog} from 'element-ui'
import {isEmpty} from 'lodash-es'

export default {
  name: "ContactModal",
  components: {
    [Button.name]: Button,
    [Input.name]: Input,
    [TableColumn.name]: TableColumn,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Dialog.name]: Dialog,
  },
  props: {
    contactInfo: {
      type: Object,
      default: () => ({}),
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
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
        this.hide()
      }
    },
    hide() {
      this.$emit('hideModal')
    },
  },
  mounted() {
    if (!isEmpty(this.contactInfo)) {
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
  z-index: 2;
  background-color: white;
  padding: 40px 40px 25px 40px;

  .el-input {
    width: 300px;
  }

  .btn {
    width: 100%;
    display: inline-flex;
    justify-content: center;

    button {
      height: 35px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      font-size: 14px;
      font-weight: normal;
      text-align: center;
    }
  }
}
</style>
