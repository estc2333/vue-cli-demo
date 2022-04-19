<template>
  <div id="page-wrapper">
    <nav-bar class="menu" :navList="navList" :default-active="defaultActive" @doAuth="doAuth" />
    <div class="content">
      <auth v-if="showAuth"></auth>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import Auth from '../../components/AuthForm'
export default {
  name: "homepage",
  components: {
    NavBar,
    Auth,
  },
  data() {
    return {
      showAuth: false,
    }
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
  methods: {
    doAuth() {
      console.log('as')
      this.showAuth = true
    }
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
