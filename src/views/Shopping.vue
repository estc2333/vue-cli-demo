<template>
  <div class="main">
    <div class="left"></div>
    <div class="right">
      <div class="top">
        <img src="../assets/img/img_1.png">
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shopping"
}
</script>

<style scoped lang="scss">
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  .left {
    width: 200px;
    background-color: #42b983;
    height: 100%;
    margin-right: 10px;
  }
  .right {
    flex: 1;
    img {
      width: 100%;
      height: 30vh;
    }
  }
}
</style>
