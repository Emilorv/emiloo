import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TerminalView from "@/views/TerminalView.vue";
import CalendarOfLife from '@/views/CalendarOfLife.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/cli',
      name:'terminal',
      component: TerminalView
    },
    {
      path: '/livskalender',
      name: 'livskalender',
      component: CalendarOfLife
    }
  ]
})

export default router
