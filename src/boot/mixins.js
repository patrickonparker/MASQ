// import something here
import { openURL } from 'quasar'

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
      setTheme() {}
    }
  })
}
