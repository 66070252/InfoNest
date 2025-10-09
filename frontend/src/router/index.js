import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import ArticlePage from '../views/ArticlePage'
import ProfilePage from '../views/ProfilePage'

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/register', name: 'RegisterPage', component: RegisterPage },
  { path: '/info/:id', name: 'ArticlePage', component: ArticlePage},
  { path: '/:username', name: 'ProfilePage', component: ProfilePage}

]

const router = createRouter({
  history: createWebHistory(),
  routes : routes,
})

export default router
