import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/MainSite/Home.vue';
import Search from '../views/MainSite/Search.vue'
import History from '../views/MainSite/History.vue'
import Play from '../views/MainSite/Play.vue'
import Library from '../views/MainSite/Library.vue'

import Login from '../views/Authentication/Login.vue'
import Register from '../views/Authentication/SignUp.vue'
import MainSite from '../views/MainSite.vue'

import Channel from '../views/Channel/Channel.vue'
import About from '../views/Channel/Channel.vue'
import CHome from '../views/Channel/Channel.vue'
import Upload from '../views/Channel/Channel.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainSite',
      component: MainSite,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/search',
          name: 'Search',
          component: Search
        },
        {
            path: '/history',
            name: 'History',
            component: History
        },
        {
            path: '/library',
            name: 'Library',
            component: Library
        },
        {
            path: '/video',
            name: 'Play',
            component: Play
        },
        {
            path: '/channel',
            name: 'Channel',
            redirect: { name : 'CHome'},
            component: Channel,
            children: [
                {
                    path: 'home',
                    name: 'CHome',
                    component: CHome
                },
                {
                    path: 'about',
                    name: 'About',
                    component: About
                },
                {
                    path: 'upload',
                    name: 'Upload',
                    component: Upload
                }
            ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name : 'Register',
      component: Register
    }
  ]
})

export default router