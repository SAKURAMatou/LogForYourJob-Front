const loginRouter = [
  {
    path: '/',
    redirect: '/login/login'
  },
  {
    path: '/login/login',
    name: 'login',
    component: () => import('../../views/login/Login.vue')
  },
  {
    path: '/login/register',
    name: 'register',
    component: () => import('../../views/login/Register.vue')
  }
]

export default loginRouter
