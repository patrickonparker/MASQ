<template>
	<div id="q-app">
		<router-view />
	</div>
</template>

<script>
	import StoryblokClient from "storyblok-js-client";
	import { colors } from "quasar";

	let storyapi = new StoryblokClient({
		accessToken: process.env.SB_TOKEN
	});

	export default {
		name: "App",
		data: () => ({
			theme: {}
		}),
		methods: {
			async setTheme() {
				await storyapi
					.get("cdn/stories/settings/theme", {
						version: "published"
					})
					.then(response => {
						this.theme = response.data.story.content;
					})
					.catch(error => {
						console.log(error);
					});
				colors.setBrand("primary", this.theme.primary);
			}
		},
		created() {
			this.setTheme();
		}
	};
</script>
