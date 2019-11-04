<template>
	<q-page :class="(page || {}).class" :style="(page || {}).style" padding>
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
		<div
			v-if="page === '404' && $route.path !== '/'"
			class="items-center column text-center"
		>
			<img
				src="~assets/404.svg"
				style="height: 300px; width: 300px; display: block;"
			/>
			<h3 style="padding: 0 20px">
				Sorry, the page "{{ $route.path }}" does not exist.
			</h3>
			<q-btn
				to="/"
				label="Go Home"
				icon="mdi-home"
				color="accent"
				push
				v-ripple
			/>
		</div>
	</q-page>
</template>

<script>
	import StoryblokClient from "storyblok-js-client";
	let storyapi = new StoryblokClient({
		accessToken: process.env.SB_TOKEN
	});

	export default {
		name: "Page",
		data: () => ({
			page: {},
			name: ""
		}),
		methods: {
			async getStory(slug, version) {
				await storyapi
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
				if (!this.$q.platform.is.electron && this.$q.platform.within.iframe) {
					let storyblok = window.storyblok;
					storyblok.pingEditor(() => {
						if (storyblok.isInEditor()) {
							this.getStory(path, "draft");
							storyblok.enterEditmode;
							storyblok.on(["change"], () => {
								this.getStory(path, "draft");
							});
						} else {
							this.getStory(path, "published");
						}
					});
				} else {
					this.getStory(path, "published");
				}
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
