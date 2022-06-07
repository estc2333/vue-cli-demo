<template>
  <div class="shop-wrapper">
    <div class="header">
      <img src="../../assets/img/WechatIMG330.png">
    </div>
    <template v-if="!isEmpty(productsInfo)">
      <products-list :products="productsInfo" />
    </template>
    <el-empty v-else :image-size="200" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import { isEmpty } from "lodash-es"
import { Empty } from "element-ui"
import ProductsList from "@/components/ProductsList"

export default {
  name: "shop",
  components: {
    ProductsList,
    [Empty.name]: Empty,
  },
  data() {
    return {
      isEmpty,
    }
  },
  computed: {
    ...mapState('products', ['productsInfo'])
  },
  methods: {
    ...mapActions('products', ['getProductsInfo']),
  },
  mounted() {
    this.getProductsInfo()
  }
}
</script>

<style scoped lang="scss">
.shop-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  .header {
    height: 20vh;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
