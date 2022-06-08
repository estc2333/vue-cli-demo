<template>
  <section class="products-container">
    <li v-for="(product, index) in products" :key="index" class="product">
      <i v-if="enableDelete" class="el-icon-close" @click="onDelete(product.id)"></i>
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
  },
  methods: {
    onDelete (id) {
      this.$emit('onDelete', id)
    },
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
  padding: 10px 0 40px;

  li {
    background-color: #fff;
    height: 315px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    img {
      max-width: 100%;
      max-height: 280px;
    }

    .name {
      text-align: center;
    }

    .el-icon-close {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #00B4CF;
      }
    }
  }
}
</style>
