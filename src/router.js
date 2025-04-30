import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import UserList from './pages/UserList.vue'
import GroupList from './pages/GroupList.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/users', component: UserList },
  { path: '/groups', component: GroupList}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
