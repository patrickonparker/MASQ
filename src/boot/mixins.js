// import something here
import { openURL } from "quasar";
import StoryblokClient from "storyblok-js-client";
let storyapi = new StoryblokClient({
  accessToken: process.env.SB_TOKEN
});
let storyblok = window.storyblok;

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.mixin({
    methods: {
      check(prop) {
        return String(prop).length > 0;
      },

      darkTheme(prop) {
        return this.$q.dark.isActive ? true : prop;
      },

      openLink(prop) {
        storyblok.pingEditor(() => {
          if (storyblok.inEditor) {
          } else {
            prop.includes("://") ? openURL(prop) : "";
          }
        });
      },

      mdi(prop) {
        return this.check(prop) ? "mdi-" + prop : "";
      },

      getStory(path) {
        const fetchVersion = async version => {
          await storyapi
            .get("cdn/stories/" + path, {
              version: version
            })
            .then(response => {
              this.story = response.data.story;
            })
            .catch(error => {
              console.log(error);
              this.story = "404";
            });
        };

        if (!this.$q.platform.is.electron && this.$q.platform.within.iframe) {
          storyblok.pingEditor(() => {
            if (storyblok.inEditor) {
              // console.log(storyblok.inEditor)
              fetchVersion("draft");
              storyblok.enterEditmode;
              storyblok.on(["change"], () => {
                fetchVersion("draft");
              });
            } else {
              fetchVersion("published");
            }
          });
        } else {
          fetchVersion("published");
        }
      }
    }
  });
};
