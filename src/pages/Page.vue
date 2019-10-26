<template>
  <q-page :class="blok.class" padding>
    <component
      v-for="blok in blok.body"
      :key="blok._uid"
      :is="blok.component"
      :blok="blok"
      v-bind="blok"
    />
  </q-page>
</template>

<script>
import StoryblokClient from "storyblok-js-client";

export default {
  name: "Page",
  data: () => ({
    blok: {}
  }),
  methods: {
    async getStory() {
      let path = this.$route.path;
      if (this.$route.path === "/") path = "/home";

      const Storyblok = new StoryblokClient({
        accessToken: "BQbCs8YukzGveNbBLlyoSgtt",
        cache: {
          clear: "auto",
          type: "memory"
        }
      });

      await Storyblok.get(`cdn/stories${path}`, {})
        .then(response => {
          this.blok = response.data.story.content;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getStory();
  },
  watch: {
    $route(to, from) {
      this.getStory();
    }
  }
};
</script>
