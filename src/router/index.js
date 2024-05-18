import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Notes from "@/views/Notes.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
