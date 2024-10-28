import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/home-view.vue'
import Register from '../views/Register.vue'
import SetupProfile from '../views/SetupProfile.vue'
import Login from '../views/Login.vue'
// import Dashboard from '../views/Dashboard.vue'
import store from '@/store'
import tweetListView from '../views/tweet-list-view.vue' // Import TweetList component
import TweetDetail from '../views/TweetDetail.vue' // Import TweetDetail component
import TweetCompose from '../views/TweetCompose.vue'
import profilePageView from '../views/profile-page-view.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: homeView,
    meta: { layout: 'default' },
    beforeEnter (to, from, next) {
      if (!store.state.account.user) return next('/login')
      return next()
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { layout: 'auth' }
    // beforeEnter (to, from, next) {
    //   if (store.state.account.user) return next('/home')
    //   return next()
    // }
  },
  {
    path: '/setup-profile',
    name: 'setup-profile',
    component: SetupProfile,
    meta: { layout: 'auth' }
    // beforeEnter (to, from, next) {
    //   if (store.state.account.user) return next('/dashboard')
    //   return next()
    // }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { layout: 'auth' }
    // beforeEnter (to, from, next) {
    //   if (store.state.account.user) return next('/home')
    //   return next()
    // }
  },
  {
    path: '/:userHandle/tweets',
    name: 'tweet-list',
    component: tweetListView,
    meta: { layout: 'default' }
  },
  {
    path: '/:userHandle/tweets/:tweetId',
    name: 'tweet-detail',
    component: TweetDetail,
    meta: { layout: 'default' }
  },
  {
    path: '/:userHandle/tweet/compose',
    name: 'tweet-compose',
    component: TweetCompose,
    meta: { layout: 'default' }
  },
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   component: Dashboard,
  //   beforeEnter (to, from, next) {
  //     if (!store.state.account.user) return next('/login')
  //     return next()
  //   }
  // },
  {
    // path: '/users/:userId',
    path: '/:handle',
    name: 'profile-page-view',
    component: profilePageView,
    beforeEnter (to, from, next) {
      if (!store.state.account.user) return next('/login')
      return next()
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
