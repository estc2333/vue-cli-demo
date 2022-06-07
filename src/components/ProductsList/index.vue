<template>
  <section class="products-container">
    <li v-for="(product, index) in products" :key="index" class="product">
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
    }
  }
}
</script>

<style scoped lang="scss">
.products-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  justify-content: space-between;

  li {
    background-color: #fff;
    height: 310px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:not(:last-of-type) {
      margin-right: 10px;
    }

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
