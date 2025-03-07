import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (
    to.meta.needAuthentication === true &&
    (await authStore.getIsSignedIn()) === false
  ) {
    next({ name: 'auth' })
  } else {
    next()
  }
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.name == 'auth' && (await authStore.getIsSignedIn()) === true) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
