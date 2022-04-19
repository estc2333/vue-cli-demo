<template>
  <div id="page-wrapper">
    <nav-bar class="menu" :navList="navList" :default-active="defaultActive" />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navBar from '../../components/NavBar'
export default {
  name: "homepage",
  components: {
    navBar,
  },
  computed: {
    navList() {
      return ([
        {
          title: 'Shop',
          routeName: ['shop'],
        },
        {
          title: 'Contacts',
          routeName: ['contacts'],
        },
        {
          title: 'Agent',
          routeName: ['agent'],
        },
      ])
    },
    defaultActive () {
      return this.$route.name
    },
  },
}
</script>

<style scoped lang="scss">
#page-wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 0 200px;

  .content {
    height: 100%;
    padding: 25px 20px;
    overflow: auto;
  }

}
</style>
