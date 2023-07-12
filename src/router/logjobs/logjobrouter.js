const LogJobRouter = [
  {
    path: '/logjobs/main',
    name: 'logjob_main',
    component: () => import('../../views/logjobs/HomeView.vue')
  }
]

export default LogJobRouter
