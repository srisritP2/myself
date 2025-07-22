// Lazy load components for better performance
const PortfolioView = () => import('@/views/PortfolioView.vue')
const AdminDashboard = () => import('@/views/AdminDashboard.vue')
const LoginView = () => import('@/views/auth/LoginView.vue')
const RegisterView = () => import('@/views/auth/RegisterView.vue')

export const routes = [
  {
    path: '/',
    name: 'portfolio',
    component: PortfolioView,
    meta: {
      title: 'Sri Sri Tummu | QA Lead Portfolio',
      description: 'Professional portfolio showcasing QA leadership and automation expertise',
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: 'Admin Dashboard',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login',
      guest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Register',
      guest: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Page Not Found',
    },
  },
]
