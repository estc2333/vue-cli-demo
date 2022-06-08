<template>
  <div id="page-wrapper">
    <nav-bar class="menu" :navList="navList" :default-active="defaultActive" @doAuth="login" />
    <div class="content">
      <auth v-if="isVisible" :isVisible.sync="isVisible" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import Auth from '../../components/AuthForm'
import {mapActions, mapState, mapGetters} from "vuex";
export default {
  name: "homepage",
  components: {
    NavBar,
    Auth,
  },
  computed: {
    ...mapState('auth',['showLoginForm']),
    ...mapGetters('auth',['isShowLoginForm']),
    isVisible: {
      get() {
        return this.showLoginForm
      },
      set () {
        this.updateShowLoginForm()
      }
    },
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
          title: 'Manage',
          routeName: ['manage'],
        },
      ])
    },
    defaultActive () {
      return this.$route.name
    },
  },
  methods: {
    ...mapActions('auth',['login', 'updateShowLoginForm']),
    doAuth() {
      this.login()
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
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
