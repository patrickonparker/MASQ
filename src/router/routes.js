const routes = [
  {
    path: '*',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Page.vue') }
    ]
  }
]

export default routes
