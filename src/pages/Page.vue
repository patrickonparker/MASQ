<template>
	<q-page
		:class="(story.content || {}).class"
		:style="(story.content || {}).style"
		padding
	>
		<component
			v-for="blok in (story.content || {}).body"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
			v-bind="blok"
		/>
		<portal to="header"> {{ story.name }} </portal>
		<div v-if="story === '404'" class="items-center column text-center">
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
				ripple
			/>
		</div>
	</q-page>
</template>

<script>
	export default {
		name: "Page",
		data: () => ({
			story: {},
			noStory: false,
			metadata: {}
		}),
		meta() {
			if (this.metadata) {
				return {
					title: this.metadata.title ? this.metadata.title : this.story.name,
					meta: {
						ogTitle: {
							property: "og:title",
							content: this.metadata
								? this.metadata.og_title
									? this.metadata.og_title
									: this.metadata.title
								: this.story.name
						},
						twitterTitle: {
							name: "twitter:title",
							content: this.metadata
								? this.metadata.twitter_title
									? this.metadata.twitter_title
									: this.metadata.title
								: this.story.name
						},
						description: {
							name: "description",
							content: this.metadata.description ? this.metadata.description : ""
						},
						ogDescription: {
							property: "og:description",
							content: this.metadata
								? this.metadata.og_description
									? this.metadata.og_description
									: this.metadata.description
								: ""
						},
						twitterDescription: {
							name: "twitter:description",
							content: this.metadata
								? this.metadata.twitter_description
									? this.metadata.twitter_description
									: this.metadata.description
								: ""
						},
						ogImage: {
							property: "og:image",
							content: this.metadata ? this.metadata.og_image : ""
						},
						twitterImage: {
							name: "twitter:image",
							content: this.metadata ? this.metadata.twitter_image : ""
						}
					}
				};
			}
		},
		computed: {
			path() {
				let paths = ["/", "/settings", "/settings/layout", "/settings/theme"];
				return paths.includes(this.$route.path) ? "home" : this.$route.path;
			}
		},
		created() {
			this.getStory(this.path);
		},
		watch: {
			$route(to, from) {
				this.getStory(this.path);
			}
		}
	};
</script>
