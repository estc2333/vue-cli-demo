<template>
  <div>agent
    <el-upload
        action=""
        :http-request="uploadFile"
        :file-list="fileList"
    >
      <el-button>upload</el-button>
    </el-upload>
  </div>
</template>

<script>
import { Upload, Button } from 'element-ui'
import { storageRef } from '@/includes/firebase';

export default {
  name: "agent",
  components: {
    [Upload.name]: Upload,
    [Button.name]: Button,
  },
  data () {
    return {
      fileList: [],
    }
  },
  methods: {
    uploadFile({file}) {
      const fileRef = storageRef.child(file.name)
      fileRef.put(file)
      .then(() => {
        console.log('aha')
      })
    }
  },
}
</script>

<style scoped>

</style>
