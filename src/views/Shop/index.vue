<template>
  <div class="aa">
    <div class="header">
      <img src="../../assets/img/WechatIMG330.png">
    </div>
    <div>products</div>
  </div>
</template>

<script>
import SideBar from '../../components/SideBar'
export default {
  name: "shop",
  components: {
    SideBar,
  },
}
</script>

<style scoped lang="scss">
  .aa {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 28vh;
    }
  }
</style>
