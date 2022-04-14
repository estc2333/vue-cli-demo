import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './styles/_reset.scss'
import './styles/overwrite.scss'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
