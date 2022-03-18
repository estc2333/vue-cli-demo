<template>
  <div class="nav-list">
    <li v-for="nav in navList"
        :key="nav.title"
        :class="{active: isActive(nav)}"
        @click="gotoPage(nav)"
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
      type: Array,
      default: () => ([]),
    },
    defaultActive: {
      type: String,
      default: '',
    },
  },
  watch: {
    '$route': function (route) {
      this.active = route.name
    }
  },
  data() {
    return {
      active: this.defaultActive || this.navList[0].routeName,
    }
  },
  methods: {
    gotoPage(nav, index) {
      this.currentIndex = index;
      this.$router.push({name: nav.routeName[0]})
    },
    isActive (nav) {
      return nav.routeName.includes(this.active)
    },
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
