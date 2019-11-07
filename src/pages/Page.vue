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
		<portal to="header">
			{{ story.name }}
		</portal>
		<div v-if="story === '404' && $route !== '/'" class="items-center column text-center">
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
	export default {
		name: "Page",
		data: () => ({
			story: {},
			noStory: false
		}),
		computed: {
			path() {
				let paths = ["/", "/app", "/app/layout", "/app/settings"];
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
