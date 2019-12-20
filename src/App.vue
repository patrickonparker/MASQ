<template>
	<div id="q-app">
		<component
			v-for="blok in global_content"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
		<router-view />
		<div id="masq-loader">
			<q-spinner-ball color="primary" size="4em" />
		</div>
		<div v-html="css"></div>
	</div>
</template>

<script>
	import StoryblokClient from "storyblok-js-client";
	import WebFont from "webfontloader";
	import { colors } from "quasar";
	import cssVars from "css-vars-ponyfill";

	const { setBrand } = colors;
	const storyapi = new StoryblokClient({
		accessToken: process.env.SB_TOKEN
	});

	export default {
		name: "App",
		data: () => ({
			css: {},
			global_content: {}
		}),
		methods: {
			getFonts(theme) {
				let googleFonts = theme.google_fonts.split(", ");
				let adobeFonts = theme.adobe_edge_web_fonts.split(", ").join(";");

				if (googleFonts.length > 0) {
					WebFont.load({
						google: {
							families: googleFonts
						},
						timeout: 2000
					});
				}

				if (adobeFonts.length > 0) {
					WebFont.load({
						typekit: {
							id: adobeFonts,
							api: "//use.edgefonts.net"
						},
						timeout: 2000
					});
				}

				let app = document.getElementById("q-app");
				if ((theme.default_heading_font || {}).length > 0) {
					app.style.setProperty("--heading-font", theme.default_heading_font);
				}
				if ((theme.default_body_font || {}).length > 0) {
					app.style.setProperty("--body-font", theme.default_body_font);
				}
			},

			setTheme(theme) {
				let qColors = [
					"dark",
					"primary",
					"secondary",
					"accent",
					"positive",
					"negative",
					"info",
					"warning"
				];
				let qBreakpoints = ["xs", "sm", "md", "lg"];
				let ponyFill = {};

				if (theme.dark_theme === "true") {
					this.$q.dark.set(true);
				} else if (theme.dark_theme === "auto") {
					this.$q.dark.set("auto");
				} else {
					this.$q.dark.set(false);
				}

				for (var i = 0; i < qColors.length; i++) {
					let qColor = qColors[i];
					let sbColor = theme[`${qColor}`];
					let dark = this.$q.dark.isActive;

					if (dark && sbColor.includes("/")) {
						sbColor = sbColor.split("/")[1];
					} else if (!dark && sbColor.includes("/")) {
						sbColor = sbColor.split("/")[0];
					}

					setBrand(`${qColor}`, sbColor);
					ponyFill[`--q-color-${qColor}`] = sbColor;
				}

				for (var i = 0; i < qBreakpoints.length; i++) {
					ponyFill[`--masonry_${qBreakpoints[i]}`] =
						theme[`masonry_${qBreakpoints[i]}`];
				}

				cssVars({
					variables: ponyFill
				});
			},

			async fetchPlaceholders(query) {
				let storedQuery = localStorage.getItem("query");
				localStorage.setItem("query", query);
				if (query !== storedQuery) {
					let placeholders = [];
					console.info(
						`Fetching updated placeholders, ${storedQuery} → ${query}`
					);
					let searchString = `https://pixabay.com/api/?key=12944521-9a2f8bb0890e6f2118e1acf5a&q=${query}&safesearch=false&order=popular&per_page=200`;
					let request = await fetch(searchString);
					let data = await request.json();
					let hits = data.hits;
					hits.forEach(hit => {
						placeholders.push(hit.largeImageURL);
					});
					localStorage.setItem("placeholders", placeholders);
				}
			}
		},

		async created() {
			const fetchVersion = async version => {
				await storyapi
					.get("cdn/stories/settings/theme", {
						version: version
					})
					.then(response => {
						let theme = response.data.story.content;
						this.getFonts(theme);
						this.setTheme(theme);
						this.css = theme.css;
						this.global_content = theme.global_app_content;
						this.fetchPlaceholders(theme.placeholder_image_search_term);
						setInterval(() => {
							document.getElementById("masq-loader").className = "loaded";
						}, 500);
					})
					.catch(error => {
						console.log(error);
					});
			};
			if (!this.$q.platform.is.electron && this.$q.platform.within.iframe) {
				let storyblok = window.storyblok;
				storyblok.pingEditor(() => {
					if (storyblok.isInEditor()) {
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
	};
</script>
