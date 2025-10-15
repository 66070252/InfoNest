import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'HomePage', component: () => import('../views/HomePage.vue') },
  { path: '/login', name: 'LoginPage', component: () => import('../views/LoginPage.vue') },
  { path: '/register', name: 'RegisterPage', component: () => import('../views/RegisterPage.vue') },
  { path: '/info/:id', name: 'ArticlePage', component: () => import('../views/ArticlePage.vue')},
  { 
    path: '/my-posts',
    name: 'MyPostsPage',
    component: () => import('../views/MyPostsPage.vue'),
    meta: { requiresAuth: true } 
  },
  { 
    path: '/create-post', 
    name: 'CreatePost', 
    component: () => import('../views/CreatePost.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/archive', 
    name: 'ArchivePage', 
    component: () => import('../views/ArchivePage.vue'),
    meta: { requiresAuth: true }
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next({ name: 'LoginPage' })
  } else {
    next()
  }
})

export default router