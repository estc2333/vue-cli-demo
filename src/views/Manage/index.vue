<template>
  <div>
    <section>
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
    </section>
    <section>
      uploaded products
      <products-list :products="productsInfo" enableDelete />
    </section>
  </div>
</template>

<script>
import { Upload, Button } from 'element-ui'
import { storageRef, storage, productsCollection } from '@/includes/firebase'
import { v4 } from "uuid"
import { mapActions, mapState } from "vuex"
import ProductsList from "@/components/ProductsList"

export default {
  name: "manage",
  components: {
    ProductsList,
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
  mounted() {
    this.getProductsInfo()
    // .then(() => {
    //   this.fileList = this.productsList
    // })
  },
  computed: {
    ...mapState('products', ['productsInfo']),
  },
  methods: {
    ...mapActions('products', ['getProductsInfo']),
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
          .then(() => {
            this.$message({
              message: 'submit success',
              type: 'success',
              center: true,
            })
            this.productName = ''
          })
          .catch(error => {
            this.$message({
              message: error,
              center: true,
            })
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
