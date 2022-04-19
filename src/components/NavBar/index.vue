<template>
  <div class="nav-wrapper">
    <section>
      <li
          v-for="nav in navList"
          :key="nav.title"
          :class="{active: isActive(nav)}"
          @click="gotoPage(nav)"
      >
        {{ nav.title }}
      </li>
    </section>
    <el-button type="text" @click="onLogin">Login/Register</el-button>
  </div>
</template>

<script>
import { Button } from 'element-ui'
export default {
  name: "NavBar",
  components: {
    [Button.name]: Button,
  },
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
    onLogin () {
      this.$emit('login')
    },
  }
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  height: 55px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
  }

  li {
    display:inline-block;
    line-height: 45px;
    cursor: pointer;
    font-size: 18px;
    margin-right: 25px;
  }
  .active {
    color: #00B4CF;
  }
}
</style>
