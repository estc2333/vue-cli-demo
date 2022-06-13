<template>
  <el-dialog class="wrapper" :visible.sync="modalVisible" :title="title">
    <el-form
        class="wrapper"
        label-width="120px"
        label-position="left"
        ref="contactForm"
        :rules="rules"
        :model="form"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model.number="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input v-model="form.comment"></el-input>
      </el-form-item>
      <div class="btn">
        <el-button plain @click="hide">取消</el-button>
        <el-button type="primary" :disabled="!isValid" @click="onSubmit">确定</el-button>
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
  // model: {
  //   props: 'isVisible',
  //   event: 'change',
  // },
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
        comment: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入名称'}
        ],
        tel: [
          {required: true, message: '请输入电话号码'},
        ],
        address: [
          {required: true, message: '请输入地址'}
        ],
        comment: [
          { max: 20, message: '长度20个字符以内'}
        ],
      },
      isValid: false,
    }
  },
  computed: {
    modalVisible: {
      get() {
        console.log(this.isVisible, 'in')
        return this.isVisible
      },
      set(val) {
        console.log(this.isVisible, 'in set')
        this.$emit('update:isVisible', val)
      }
    },
  },
  watch: {
    form :{
      handler: function () {
        this.$nextTick(() => {
          this.$refs.contactForm.validate((valid) => {
            this.isValid = valid
          })
        })
      },
      deep: true,
    }
  },
  methods: {
    onSubmit() {
      this.$refs.contactForm.validate((valid)=>{
        if(valid) {
          this.$emit('submit', this.form)
          this.modalVisible = false
        }
      })
    },
    hide() {
      this.modalVisible = false
    },
    validateForm (fieldName, isValidField) {
      console.log(fieldName, isValidField, 'fieldName, isValidField')
      this.isValid = isValidField
    },
  },
  mounted() {
    if (!isEmpty(this.contactInfo)) {
      this.form = {...this.form, ...this.contactInfo}
    }
  },
}
</script>

<style scoped lang="scss">
.wrapper {
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
