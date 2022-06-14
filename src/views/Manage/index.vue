<template>
  <div>
    <section class="upload-wrapper">
      <div class="name">
        <span>product name:</span>
        <el-input v-model="productName" placeholder="product name" />
      </div>
      <el-upload
          action=""
          accept=".jpg, .jpeg, .png"
          :http-request="uploadFile"
          :show-file-list="false"
          :disabled="!productName"
      >
        <el-button :disabled="!productName" size="mini">upload
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-upload>
    </section>
    <el-divider />
    <section>
      uploaded products:
      <products-list :products="productsInfo" enableDelete @onDelete="handleDelete"/>
    </section>
  </div>
</template>

<script>
import {Upload, Button, Divider, Input} from "element-ui"
import {storageRef, storage} from "@/utils/firebase"
import {mapActions, mapState} from "vuex"
import ProductsList from "@/components/ProductsList"

export default {
  name: "manage",
  components: {
    ProductsList,
    [Upload.name]: Upload,
    [Button.name]: Button,
    [Divider.name]: Divider,
    [Input.name]: Input,
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

  .name {
    display: flex;
    align-items: center;

    span {
      width: 200px;
    }
  }

  button {
    border-radius: 10px;
    margin-left: 10px;
  }
}
</style>
