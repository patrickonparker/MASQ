// import something here
import { openURL } from 'quasar'
import StoryblokClient from 'storyblok-js-client'
let storyapi = new StoryblokClient({
  accessToken: process.env.SB_TOKEN
})

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.mixin({
    methods: {
      check(prop) {
        return (prop || {}).length > 0
      },

      darkTheme(prop) {
        return this.$q.dark.isActive ? true : prop
      },

      openLink(prop) {
        prop.includes('://') ? openURL(prop) : ''
      },

      getStory(path) {
        const fetchVersion = async version => {
          await storyapi
            .get('cdn/stories/' + path, {
              version: version
            })
            .then(response => {
              this.story = response.data.story
            })
            .then(
              (document.getElementById('masq-loader').className =
                'loaded')
            )
            .catch(error => {
              console.log(error)
              this.story = '404'
            })
        }

        if (
          !this.$q.platform.is.electron &&
          this.$q.platform.within.iframe
        ) {
          let storyblok = window.storyblok
          storyblok.pingEditor(() => {
            if (storyblok.isInEditor()) {
              fetchVersion('draft')
              storyblok.enterEditmode
              storyblok.on(['change'], () => {
                fetchVersion('draft')
              })
            } else {
              fetchVersion('published')
            }
          })
        } else {
          fetchVersion('published')
        }
      }
    }
  })
}
