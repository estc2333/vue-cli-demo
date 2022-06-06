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
    <el-button @click="submit" :disabled="!allowSubmit">submit</el-button>
    <el-button @click="deleteImg" >delete</el-button>
  </div>
</template>

<script>
import { Upload, Button } from 'element-ui'
import { storageRef, storage, productsCollection } from '@/includes/firebase'
import {v4} from "uuid";

export default {
  name: "manage",
  components: {
    [Upload.name]: Upload,
    [Button.name]: Button,
  },
  data () {
    return {
      fileList: [],
      productName: '',
      productURL: '',
      uploadProgress: 0,
      allowSubmit: false,
    }
  },
  methods: {
    uploadFile({file}) {
      // firebase upload api
      this.allowSubmit = false
      const uploadTask = storageRef.child(file.name).put(file)
      uploadTask.on(storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + this.uploadProgress + '% done');
          },
          (error) => {
            console.log(error)
          },
          () => {
            // Upload completed successfully, get the download URL
            uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                  this.allowSubmit = true
                  this.productURL = downloadURL
                })
          }
      )
    },
    submit() {
      // add product info to firebase store
      productsCollection.add({
        id: v4(),
        productName: this.productName,
        productURL: this.productURL,
      })
    },
    deleteImg() {
      productsCollection.doc('1111').delete()
          .then(() => {
            console.log('de')
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          })
    }
  },
}
</script>

<style scoped>

</style>
