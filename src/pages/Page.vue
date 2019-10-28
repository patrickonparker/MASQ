<template>
  <q-page :class="page.class" padding>
    <component
      v-for="blok in page.body"
      :key="blok._uid"
      :is="blok.component"
      :blok="blok"
      v-bind="blok"
    />
  </q-page>
</template>

<script>
import StoryblokClient from "storyblok-js-client";
const token = "BQbCs8YukzGveNbBLlyoSgtt";
let storyapi = new StoryblokClient({
  accessToken: token
});

export default {
  name: "Page",
  data: () => ({
    page: {}
  }),
  methods: {
    getStory(slug, version) {
      storyapi
        .get("cdn/stories/" + slug, {
          version: version
        })
        .then(response => {
          this.page = response.data.story.content;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getVersion() {
      let path = this.$route.path === "/" ? "home" : this.$route.path;
      window.storyblok.on("change", () => {
        this.getStory(path, "draft");
      });
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          this.getStory(path, "draft");
        } else {
          this.getStory(path, "published");
        }
      });
    }
  },
  created() {
    this.getVersion();
  },
  watch: {
    $route(to, from) {
      this.getVersion();
    }
  }
};
</script>
