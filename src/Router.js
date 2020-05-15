import Vue from 'vue';
import VueRouter from 'vue-router';
import Router from 'vue-router';
import Foo from './components/Foo';
import Bar from './components/Bar';
import Landing from './components/landing';

Vue.use(Router);

export default new VueRouter ({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/foo',
      name: 'Foo',
      component: Foo
    },
    {
      path: '/bar',
      name: 'Bar',
      component: Bar
    }
  ]
});