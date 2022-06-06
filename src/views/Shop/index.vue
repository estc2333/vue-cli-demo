<template>
  <div class="shop-wrapper">
    <div class="header">
      <img src="../../assets/img/WechatIMG330.png">
    </div>
    <section class="products-container" v-if="!isEmpty(productsInfo)">
      <li v-for="(product, index) in productsInfo" :key="index" class="product">
        <p class="name">{{ product.productName }}</p>
        <img :src=product.productURL :alt=product.productName />
      </li>
    </section>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import { isEmpty } from "lodash-es"

export default {
  name: "shop",
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

  .products-container {
    display: flex;
    flex-wrap:wrap;

    li {
      flex: 1 0 21%;
      margin: 5px;
      background-color: #C1F4C5;
      min-height: 200px;

      img {
        max-width: 100%;
        max-height: 320px;
      }
    }
  }
}
</style>
