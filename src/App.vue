<template>
	<div id="q-app">
		<router-view />
		<div id="masq-loader">
			<q-spinner-ball color="primary" size="4em" />
		</div>
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
		methods: {
			getFonts(settings) {
				let googleFonts = settings.google_fonts.split(", ");
				let adobeFonts = settings.adobe_edge_web_fonts.split(", ").join(";");
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
				if ((settings.default_heading_font || {}).length > 0) {
					app.style.setProperty("--heading-font", settings.default_heading_font);
				}
				if ((settings.default_body_font || {}).length > 0) {
					app.style.setProperty("--body-font", settings.default_body_font);
				}
			},
			setTheme(settings) {
				let qColors = [
					"primary",
					"secondary",
					"accent",
					"positive",
					"negative",
					"info",
					"warning"
				];
				let ponyfillColors = {};
				for (var i = 0; i < qColors.length; i++) {
					setBrand(`${qColors[i]}`, settings[`${qColors[i]}`]);
					ponyfillColors[`--q-color-${qColors[i]}`] = settings[`${qColors[i]}`];
				}
				if (settings.dark_theme === "true") {
					this.$q.dark.set(true);
				} else if (settings.dark_theme === "auto") {
					this.$q.dark.set("auto");
				} else {
					this.$q.dark.set(false);
				}
				cssVars({
					// Options...
					variables: ponyfillColors
				});
			}
		},
		async created() {
			const fetchVersion = async version => {
				await storyapi
					.get("cdn/stories/app/settings", {
						version: version
					})
					.then(response => {
						let settings = response.data.story.content;
						this.getFonts(settings);
						this.setTheme(settings);
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
