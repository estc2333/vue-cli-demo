<template>
  <el-dialog :visible.sync="isShow" title="Your Account">
    <el-form
        class="form-wrapper"
        label-width="140px"
        label-position="left"
        ref="authForm"
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
      <el-form-item v-if="activeName === 'register'" label="confirm password" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword"></el-input>
      </el-form-item>
      <div class="btn">
        <el-button plain @click="hide">Cancel</el-button>
        <el-button type="primary" :disabled="!isValid" @click="onSubmit">Submit</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import {Button, Input, TableColumn, Form, FormItem, Dialog, Tabs, TabPane, Message} from 'element-ui'
import { auth } from '@/includes/firebase';

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
        confirmPassword: '',
        email: '',
      },
      rules: {
        name: [
          {required: true, message: 'What’s your name?', trigger: 'change'}
        ],
        password: [
          // {required: true, validator: this.checkPassword, trigger: 'change'},
          {required: true, message: 'Please enter your password.', trigger: 'change'},
          {
            min: 6,
            max: 32,
            message: "password should be at least 6 characters",
            trigger: "change"
          }
        ],
        confirmPassword: [
          {required: true, message: 'Please confirm your password.', trigger: 'change'},
          {validator: this.confirmPassword, trigger: 'submit'}
        ],
        email: [
          {required: true, message: 'Please enter a valid email.'}
        ],
      },
      isValid: false,
      activeName: 'login'
    }
  },
  watch: {
    form: {
      handler(){
        this.$nextTick(() => {
          this.$refs.authForm && this.validateForm();
        })
      },
      deep: true
    },
    activeName() {
      this.isValid = false
      this.$refs.authForm.resetFields()
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
      if(this.isValid) {
        this.activeName === 'register'
            ?
            // it will return a Promise
            auth.createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then((userCredential) => {
                  // Signed up
                  const { user } = userCredential;
                  console.log(userCredential, user, 'aaa');
                  // ...
                })
                .catch((error) => {
                  const errorMessage = error.message;
                  Message.error(errorMessage)
                })
            :
            auth.signInWithEmailAndPassword(this.form.email, this.form.password)
                .then((userCredential) => {
                  // Signed in
                  const { user } = userCredential;
                  console.log(userCredential, user, 'b');
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode, errorMessage);
                  // ..
                })
      }
    },
    hide() {
      this.$emit('hideModal')
    },
    validateForm () {
      let fields = this.$refs.authForm.fields
      if(fields.find(f => f.validateState === 'validating')) {
        setTimeout(() => {
          this.validateForm()
        }, 100)
      } else {
        this.isValid = fields.every(f => {
          let valid = f.isRequired && f.validateState === 'success'
          let notErroring = !f.isRequired && f.validateState !== "error";
          console.log(valid, notErroring, 'valid, notErroring')
          return valid || notErroring;
        })
      }
    },
    confirmPassword (rule, value, callback) {
      if(value !== this.form.password) {
        callback(new Error('Passwords do not match.'))
      }
    }
  },
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
