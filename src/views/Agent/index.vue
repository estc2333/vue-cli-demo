<template>
  <div>
    product name
    <input v-model="productName"/>
    <el-upload
        action=""
        accept=".jpg, .jpeg, .png"
        :http-request="uploadFile"
    >
      <el-button>upload</el-button>
    </el-upload>
    <el-button @click="submit" :disabled="uploadProgress !== 100">submit</el-button>
    <el-button @click="deleteImg" >delete</el-button>
  </div>
</template>

<script>
import { Upload, Button } from 'element-ui'
import { storageRef, storage, productsCollection } from '@/includes/firebase'

export default {
  name: "agent",
  components: {
    [Upload.name]: Upload,
    [Button.name]: Button,
  },
  data () {
    return {
      fileList: [],
      productName: '',
      productURL: '',
      productsInfo: [],
      uploadProgress: 0,
    }
  },
  methods: {
    uploadFile({file}) {
      // firebase upload api
      const uploadTask = storageRef.child(file.name).put(file)
      uploadTask.on(storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + this.uploadProgress + '% done');
      },
          (error) => {console.log(error)},
          () => {
            // Upload completed successfully, get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.productURL = downloadURL
            });
          }
      )
    },
    submit() {
      // add product info to firebase store
      productsCollection.add({
        productName: this.productName,
        productURL: this.productURL,
      })
    },
    deleteImg() {
      productsCollection.delete()
      .then(() => {
        console.log('de')
      })
    }
  },
}
</script>

<style scoped>

</style>
