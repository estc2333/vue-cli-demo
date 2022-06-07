<template>
  <section class="products-container">
    <li v-for="(product, index) in products" :key="index" class="product">
      <i class="el-icon-close"></i>
      <img :src=product.productURL :alt=product.productName />
      <p class="name">{{ product.productName }}</p>
    </li>
  </section>
</template>

<script>
export default {
  name: "ProductsList",
  props: {
    products: {
      type: Array,
      default: () => ([]),
    },
    enableDelete: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped lang="scss">
.products-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: space-between;
  grid-gap: 10px;
  padding: 10px 0;

  li {
    background-color: #fff;
    height: 315px;
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      max-width: 100%;
      max-height: 280px;
    }

    .name {
      text-align: center;
    }
  }
}
</style>
