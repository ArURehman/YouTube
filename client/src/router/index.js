import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/MainSite/Home.vue';
import Search from '../views/MainSite/Search.vue'
import History from '../views/MainSite/History.vue'
import Play from '../views/MainSite/Play.vue'
import Library from '../views/MainSite/Library.vue'

import Login from '../views/Authentication/Login.vue'
import Register from '../views/Authentication/SignUp.vue'
import CreateChannel from '../views/CreateChannel.vue'
import MainSite from '../views/MainSite.vue'

import Channel from '../views/Channel/Channel.vue'
import About from '../views/Channel/About.vue'
import CHome from '../views/Channel/Home.vue'
import Upload from '../views/Channel/Upload.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainSite',
      component: MainSite,
      redirect: { name: 'Home'},
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
            path: '/video/:id?',
            name: 'Play',
            props: true,
            component: Play
        },
        {
            path: '/channel/:id?',
            name: 'Channel',
            redirect: { name : 'CHome'},
            component: Channel,
            props: true,
            beforeEnter: (to, from, next) => {
              console.log(to.params.id)
              next()
            },
            children: [
                {
                    path: 'home',
                    name: 'CHome',
                    component: CHome,
                    props: true
                },
                {
                    path: 'about',
                    name: 'About',
                    component: About,
                    props: true
                },
                {
                    path: 'upload',
                    name: 'Upload',
                    component: Upload,
                    props: true
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
    },
    {
      path: '/create-channel',
      name: 'CreateChannel',
      component: CreateChannel
    }
  ]
})

export default router