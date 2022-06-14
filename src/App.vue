<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import {mapActions} from "vuex"
import {auth} from '@/utils/firebase'

export default {
  name: 'App',
  components: {
  },
  methods: {
  ...mapActions('auth', ['getUsername']),
  },
  created() {
    if(auth.currentUser) {
      this.getUsername(auth.currentUser.displayName)
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #f4f8f9;
}
</style>
