<template>
  <div>
    <section class="upload-wrapper">
      <div> product name:
        <input v-model="productName" placeholder="product name"/>
      </div>
      <el-upload
          action=""
          accept=".jpg, .jpeg, .png"
          :http-request="uploadFile"
          :show-file-list="false"
          :disabled="!productName"
      >
        <button :disabled="!productName">upload
          <i class="el-icon-upload el-icon--right"></i>
        </button>
      </el-upload>
    </section>
    <section>
      uploaded products
      <products-list :products="productsInfo" enableDelete @onDelete="handleDelete"/>
    </section>
  </div>
</template>

<script>
import { Upload, Button } from 'element-ui'
import { storageRef, storage } from '@/includes/firebase'
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
    }
  },
  mounted() {
    this.getProducts()
  },
  computed: {
    ...mapState('products', ['productsInfo']),
  },
  methods: {
    ...mapActions('products', ['getProductsInfo', 'addProduct', 'deleteProduct']),
    uploadFile({file}) {
      // firebase upload api
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
                  this.productURL = downloadURL
                  this.addProduct({
                    productName: this.productName,
                    productURL: this.productURL,
                  })
                })
            .then(() => {
              this.productName = ''
            })
          }
      )
    },
    handleDelete(id) {
      this.deleteProduct({ id })
    },
    getProducts() {
      this.getProductsInfo()
    },
  },
}
</script>

<style scoped lang="scss">
.upload-wrapper {
  display: flex;

  button {
    border-radius: 10px;
    border: solid 1px #1989fa;
    background-color: #fff;
    cursor: pointer;
    margin-left: 10px;
    &:disabled {
      cursor: not-allowed;
      border: none;
    }
  }
}
</style>
