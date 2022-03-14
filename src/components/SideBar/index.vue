<template>
  <div class="nav-list">
    <li v-for="(nav, index) in navList"
        :key="nav.title"
        :class="index === currentIndex ? 'active' : ''"
        @click="gotoPage(nav, index)"
    >
      <i :class='nav.icon'></i>
      {{ nav.title }}
    </li>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    navList: {
      type: Array
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    gotoPage(nav, index) {
      this.currentIndex = index;
      this.$router.push({name: nav.routeName})
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-list {

  li {
    list-style: none;
    height: 45px;
    line-height: 45px;
    cursor: pointer;
    font-size: 18px;
    margin-top: 20px;

    i {
      font-size: 20px;
      margin: 25px;
    }
  }
  .active {
    color: #00B4CF;
    background-color: #C1F4C5;
  }
}
</style>
