import Buefy from 'buefy';
import Vue from 'vue';
import App from './app';
import Router from './router';
import './assets/scss/app.scss';

Vue.config.productionTip = false

Vue.use(Buefy);

new Vue({
  render: h => h(App),
  router: Router
}).$mount('#app')
