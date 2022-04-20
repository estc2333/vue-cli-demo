<template>
  <div id="page-wrapper">
    <nav-bar class="menu" :navList="navList" :default-active="defaultActive" @doAuth="doAuth" />
    <div class="content">
      <auth v-if="isVisible" :isVisible.sync="isVisible" @hideModal="hideModal" />
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
      isVisible: false,
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
      this.isVisible = true
    },
    hideModal() {
      this.isVisible = false
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
