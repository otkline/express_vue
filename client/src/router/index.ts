import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import HomeView from '../views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',   // 新規登録ページ
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ログイン状態のチェックを追加
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token') // トークンの存在チェック

  if ((to.path !== '/login' && to.path !== '/signup') && !isAuthenticated) {
    next('/login') // ログインしていない場合、/loginにリダイレクト
  } else {
    next() // ログインしていればそのまま遷移
  }
})

export default router
