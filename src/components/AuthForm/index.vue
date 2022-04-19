<template>
  <el-dialog :visible.sync="isVisible" :title="title">
    <el-form
        class="wrapper"
        label-width="120px"
        label-position="left"
        ref="authForm"
        :rules="rules"
        :model="form"
        @click="clickOutside"
    >
      <el-tabs v-model="activeTab">
        <el-tab-pane label="login">Login</el-tab-pane>
        <el-tab-pane label="register">Register</el-tab-pane>
      </el-tabs>
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model.number="form.password"></el-input>
      </el-form-item>
      <div class="btn">
        <el-button plain @click="hide">Cancel</el-button>
        <el-button type="primary" :disabled="!isValid" @click="onSubmit">Submit</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import {Button, Input, TableColumn, Form, FormItem, Dialog, Tabs, TabPane} from 'element-ui'

export default {
  name: "index",
  components: {
    [Button.name]: Button,
    [Input.name]: Input,
    [TableColumn.name]: TableColumn,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Dialog.name]: Dialog,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: true,
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
        password: '',
        email: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入名称'}
        ],
        password: [
          {required: true, message: '请输入电话号码'},
        ],
        email: [
          {required: true, message: '请输入地址'}
        ],
      },
      isValid: false,
      activeTab: 'login'
    }
  },
  watch: {
    form :{
      handler: function () {
        this.$nextTick(() => {
          this.$refs.authForm.validate((valid) => {
            this.isValid = valid
          })
        })
      },
      deep: true,
    }
  },
  methods: {
    onSubmit() {
      this.$refs.authForm.validate((valid)=>{
        if(valid) {
          this.$emit('submit', this.form)
        }
      })
    },
    clickOutside(event) {
      if (!event.target.closest('.wrapper')) {
        this.hide()
      }
    },
    hide() {
      this.$emit('hideModal')
    },
    validateForm (fieldName, isValidField) {
      console.log(fieldName, isValidField, 'fieldName, isValidField')
      this.isValid = isValidField
    },
  },
  mounted() {
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
