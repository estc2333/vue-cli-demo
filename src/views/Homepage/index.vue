<template>
  <div id="page-wrapper">
    <side-bar class="menu" :navList="navList" />
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
          title: 'DASHBOARD',
          icon: 'icon-dashboard',
          routeName: ['dashBoard'],
        },
        {
          title: 'AGENT',
          icon: 'icon-sitemap',
          routeName: ['agent'],
        },
      ])
    }
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
    background-color: #42b983;
    height: 100%;
    margin-right: 10px;
  }
  .content {
    flex: 1;
    height: 100%;
    background-color: cadetblue;
  }

}
</style>
