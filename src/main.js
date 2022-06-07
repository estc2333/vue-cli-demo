import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './styles/_reset.scss'
import './styles/overwrite.scss'
import store from './store'
import './includes/firebase'
import { auth } from '@/includes/firebase'
import { Message } from 'element-ui'

Vue.prototype.$message=Message

Vue.config.productionTip = false
let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})
