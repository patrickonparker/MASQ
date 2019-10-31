export default {
  methods: {
    async getStory(slug, version) {
      let path = (slug
      ? slug
      : this.$route.path === '/')
        ? 'home'
        : this.$route.path
      await storyapi
        .get('cdn/stories/' + path, {
          version: version
        })
        .then(response => {
          this.page = response.data.story.content
          this.name = response.data.story.name
        })
        .catch(error => {
          console.log(error)
          this.page = '404'
          this.name = 'Page not found'
        })
    }
  }
}
