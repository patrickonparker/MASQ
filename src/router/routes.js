import axios from 'axios'

const routes = [
  {
    path: '*',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '*', component: () => import('pages/Page.vue') }
    ]
  }
]

axios
  .get(
    `https://api.storyblok.com/v1/cdn/spaces/me?token=${process.env.SB_TOKEN}`
  )
  .then(space_res => {
    // timestamp of latest publish
    cache_version = space_res.data.space.version

    // Call for all Links using the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
    axios
      .get(
        `https://api.storyblok.com/v1/cdn/links?token=${process.env.SB_TOKEN}&version=${version}&cv=${cache_version}`
      )
      .then(res => {
        Object.keys(res.data.links).forEach(key => {
          if (res.data.links[key].slug != 'home') {
            let route = {
              path: '/' + res.data.links[key].slug,
              component: () => import('layouts/MyLayout.vue'),
              children: [
                {
                  path: '',
                  component: () => import('pages/Page.vue')
                }
              ]
            }
            routes.push(route)
          }
        })

        callback(null, routes)
      })
  })

export default routes
