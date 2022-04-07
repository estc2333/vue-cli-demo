<template>
  <div id="page-wrapper">
    <side-bar class="menu" :navList="navList" :default-active="defaultActive" />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from '../../components/SideBar'
export default {
  name: "homepage",
  components: {
    SideBar,
  },
  computed: {
    navList() {
      return ([
        {
          title: 'SHOP',
          icon: 'icon-dashboard',
          routeName: ['shop'],
        },
        {
          title: 'CONTACTS',
          icon: 'icon-dashboard',
          routeName: ['contacts'],
        },
        {
          title: 'AGENT',
          icon: 'icon-sitemap',
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
  display: flex;

  .menu {
    width: 200px;
    background-color: #9cd0a1;
    height: 100%;
  }
  .content {
    flex: 1;
    height: 100%;
    background-color: #F3F3F3;
    padding: 25px 20px;
    overflow: auto;
  }

}
</style>
