import { createRouter, createWebHistory } from '@ionic/vue-router';

import firebase from '@firebase/app';
require('firebase/auth');


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta : {requiresAuth : false}
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta : {requiresAuth : false}
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta : {requiresAuth : true}
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/Messages.vue'),
    meta : {requiresAuth : true}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  const requiresAuth = to.meta.requiresAuth
  const user = firebase.auth().currentUser
  if(requiresAuth && !user)
    next('/login')
  else if(!requiresAuth && user )
    next('/users')
  else
    next()
})

export default router
