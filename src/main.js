import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import VueLoading from 'vuejs-loading-plugin'

Vue.use(VueLoading)
Vue.use(VueResource)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
