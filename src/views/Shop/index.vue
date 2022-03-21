<template>
  <div class="shop-wrapper">
    <div class="header">
      <img src="../../assets/img/WechatIMG330.png">
    </div>
    <section class="products-container">
      <div class="product">1</div>
      <div class="product">2</div>
      <div class="product">3</div>
      <div class="product">4</div>
      <div draggable="false" class="product">
        <div class="">
          <img
              draggable="false"
              src="https://i.scdn.co/image/ab67706f0000000249041aa6f955c7bb7b0b9e33"
              class="product-img">
        </div>
        <div class="E1N1ByPFWo4AJLHovIBQ">
          <a draggable="false" class="" dir="auto" href="/playlist/37i9dQZF1DX3WvGXE8FqYX">
            <span class="">Women of Pop</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "shop",
}
</script>

<style scoped lang="scss">
.shop-wrapper {
  width: 100%;
  height: 100%;

  .header {
    height: 20vh;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .products-container {
    display: flex;
    padding: 10px;

    .product {
      width: 25%;
      background-color: #C1F4C5;
      min-height: 200px;
      height: calc(100% / 4);
    }

    div + div {
      margin-left: 10px;
    }
  }
}
</style>
