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
          } else if (prop.includes(":")) {
            openURL(prop);
          } else if (prop.includes("#")) {
            let el = document.querySelectorAll(prop)[0];
            window.scrollTo({
              top: el.offsetTop - 48,
              behavior: "smooth"
            });
            setTimeout(() => {
              el.classList.add("animated", "pulse");
            }, 500);
            el.classList.remove("animated", "pulse");
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
              let story = response.data.story;
              this.story = story;
              this.metadata = story.content.seo;
            })
            .catch(error => {
              console.log(error);
              this.story = "404";
            });
        };

        if (!this.$q.platform.is.electron && this.$q.platform.within.iframe) {
          storyblok.pingEditor(() => {
            if (storyblok.inEditor) {
              fetchVersion("draft");
              storyblok.enterEditmode;
              storyblok.on(["input"], event => {
                if (event.story.id == this.story.id) {
                  this.story = event.story;
                }
              });
            } else {
              fetchVersion("published");
            }
          });
        } else {
          fetchVersion("published");
        }
      }
    },
    computed: {
      bp() {
        return this.$q.screen.name;
      }
    }
  });
};
