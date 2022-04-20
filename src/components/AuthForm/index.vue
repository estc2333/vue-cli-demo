<template>
  <el-dialog :visible.sync="isShow" title="Your Account">
    <el-form
        class="form-wrapper"
        label-width="120px"
        label-position="left"
        ref="authForm"
        @validate="validateForm"
        :rules="rules"
        :model="form"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="login" name="login"></el-tab-pane>
        <el-tab-pane label="register" name="register"></el-tab-pane>
      </el-tabs>
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
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
import firebase from '@/includes/firebase';

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
      default: false,
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
          {required: true, message: 'What’s your name?', trigger: 'change'}
        ],
        password: [
          {required: true, message: 'Please enter your password.', trigger: 'change'},
        ],
        email: [
          {required: true, message: 'Please enter a valid email.'}
        ],
      },
      isValid: false,
      activeName: 'login'
    }
  },
  computed: {
    isShow: {
      get() {
        return this.isVisible
      },
      set(val) {
        this.$emit('update:isVisible', val)
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.authForm.validate((valid)=>{
        if(valid) {
          // it will return a Promise
          firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
              .then((userCredential) => {
                // Signed in
                const { user } = userCredential;
                console.log(userCredential, user, 'aaa');
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
              });
        }
      })
    },
    hide() {
      this.$emit('hideModal')
    },
    validateForm () {
      this.isValid = !Object.values(this.form).some(value => {
        return !value
      })
    },
  },
  mounted() {
    this.validateForm()
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__body{
  padding: 10px 20px 30px;
}
.form-wrapper {
  padding:0 40px;

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
