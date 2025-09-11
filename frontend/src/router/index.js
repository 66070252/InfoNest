import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/views/HomePage.vue'
import LoginPage from '../components/views/LoginPage.vue'
import RegisterPage from '../components/views/RegisterPage.vue'

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/register', name: 'RegisterPage', component: RegisterPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes : routes,
})

export default router
