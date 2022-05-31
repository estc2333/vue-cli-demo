<template>
  <div>
    product name
    <input v-model="productName"/>
    <el-upload
        action=""
        accept=".jpg, .jpeg, .png"
        :on-success="uploadSuccess"
        :http-request="uploadFile"
        :file-list="fileList"
    >
      <el-button>upload</el-button>
    </el-upload>
    <el-button @click="submit" :disabled="uploadProgress !== 100">submit</el-button>

    <ul v-if="!isEmpty(productsInfo)">
      <li v-for="(product, index) in productsInfo" :key="index">
        {{product.productName}}
        <img width="100" height="100" :src=product.productURL :alt=product.productName />
      </li>
    </ul>
  </div>
</template>

<script>
import { Upload, Button } from 'element-ui'
import { storageRef, storage, productsCollection } from '@/includes/firebase'
import { isEmpty } from "lodash-es"

export default {
  name: "agent",
  components: {
    [Upload.name]: Upload,
    [Button.name]: Button,
  },
  data () {
    return {
      isEmpty,
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
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.productURL = downloadURL
              this.uploadSuccess()
            });
          }
      )
    },
    submit () {
      // add product info to firebase store
      productsCollection.add({
        name: this.productName,
        imgURL: this.productURL,
      })
    },
    uploadSuccess() {
      productsCollection.get()
          .then(res => {
            this.productsInfo = res.docs.map(doc => {
              return doc.data()
            })
          })
    },
    download(file) {
      console.log(file)
      // let storage = storage();
      // const pathReference = storage.ref('images/stars.jpg');
    },
  },
}
</script>

<style scoped>

</style>
