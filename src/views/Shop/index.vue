<template>
  <div class="shop-wrapper">
    <div class="header">
      <img src="../../assets/img/WechatIMG330.png">
    </div>
    <section class="products-container">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
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
      div{
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
