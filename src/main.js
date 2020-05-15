import Vue from 'vue';
import router from './Router';
import App from './App';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
