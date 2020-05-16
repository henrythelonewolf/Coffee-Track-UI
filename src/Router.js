import Vue from 'vue';
import { default as Router, default as VueRouter } from 'vue-router';
import Dashboard from './components/dashboard';
import Profile from './components/dashboard/profile';
import Overview from './components/dashboard/overview';
import Landing from './components/landing';
import { isAuthenticated } from './services/authorization.service';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Landing',
    alias: '/login',
    component: Landing
  },
  {
    path: '/dashboard/:id',
    component: Dashboard,
    children: [
      {
        path: '/dashboard/overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: '/dashboard/profile',
        name: 'Profile',
        component: Profile
      }
    ]
  }
];

const available = routes.filter(x => x.children === undefined || x.children.length === 0).map(x => x.path);
const nested = routes.filter(x => x.children !== undefined && x.children.length > 0).map(x => x.children).reduce((a, b) => a.concat(b)).map(x => x.path);
const availableRoutes = [...available, ...nested];

const router = new VueRouter ({
  routes: routes
});

const loginPaths = ['/', '/login']

router.beforeEach((to, from, next) => {
  if (availableRoutes.includes(to.path) == false) {
    next({path: '/'});
    return;
  }

  if (isAuthenticated() == true && loginPaths.includes(to.path) == true) {
    next({path: '/dashboard/overview'});
    return;
  }

  if (isAuthenticated() == false && loginPaths.includes(to.path) == false) {
    next({path: '/'});
    return;
  }
  
  next();
});

export default router;