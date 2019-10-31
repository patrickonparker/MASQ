<template>
	<q-page :class="(page || {}).class" padding style="height: 100%;">
		<component
			v-for="blok in (page || {}).body"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
			v-bind="blok"
		/>
		<portal to="header">
			{{ name }}
		</portal>
		<div v-if="page === '404'" class="items-center column">
			<img
				src="~assets/404.svg"
				style="height: 300px; width: 300px; display: block;"
			/>
			<h2>Sorry, the page "{{ $route.path }}" doesn't exist.</h2>
			<q-btn to="/" label="Go Home" color="accent" push />
		</div>
	</q-page>
</template>

<script>
	import StoryblokClient from "storyblok-js-client";
	const token = process.env.SB_TOKEN;
	let storyapi = new StoryblokClient({
		accessToken: token
	});

	export default {
		name: "Page",
		data: () => ({
			page: {},
			name: ""
		}),
		methods: {
			getStory(slug, version) {
				storyapi
					.get("cdn/stories/" + slug, {
						version: version
					})
					.then(response => {
						this.page = response.data.story.content;
						this.name = response.data.story.name;
					})
					.catch(error => {
						console.log(error);
						this.page = "404";
						this.name = "Page not found";
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
