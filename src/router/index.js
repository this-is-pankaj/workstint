import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ForgotPassword.vue'),
  },
  {
    path: '/my-profile',
    name: 'MyProfile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MyProfile.vue'),
  },
  {
    path: '/clients',
    component: () => import('../views/MyClient.vue'),
    children: [
      {
        path: '/',
        component: () => import('../components/MyClient/MyClient.view.vue'),
      },
      {
        path: 'new',
        component: () => import('../components/MyClient/MyClient.new.vue'),
      },
    ],
  },
  {
    path: '/my-ewb',
    component: () => import('../views/MyEWB.vue'),
    children: [
      {
        path: '/',
        component: () => import('../components/MyEWB/MyEWB.view.vue'),
      },
      {
        path: 'new',
        component: () => import('../components/MyEWB/MyEWB.new.vue'),
        // children: [
        //   {
        //     path: '',
        //     redirect: 'step1',
        //   },
        //   {
        //     path: 'step1',
        //     component: () => import('../components/MyEWB/EWBFormSections/EWB.form.section1.vue'),
        //   },
        // ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
