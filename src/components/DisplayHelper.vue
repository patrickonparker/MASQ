<template>
	<div
		v-if="path"
		:class="[
			blok.greater_than,
			blok.less_than,
			blok.hide_on,
			blok.only_show_on,
			blok.orientation
		]"
	>
		<component
			v-for="blok in blok.children"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</div>
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			path() {
				if (this.blok.only_show_on_path || this.blok.hide_on_path) {
					if (this.blok.only_show_on_path === "/") {
						return this.$route.path === "/" ? true : false;
					} else if (this.blok.hide_on_path === "/") {
						return this.$route.path === "/" ? false : true;
					} else if (this.blok.only_show_on_path.length > 0) {
						let paths = this.blok.only_show_on_path.split(",");
						let show = false;
						paths.forEach(path => {
							if (this.$route.path.startsWith(path)) show = true;
						});
						return show;
					} else if (this.blok.hide_on_path.length > 0) {
						let paths = this.blok.hide_on_path.split(",");
						let hide = true;
						paths.forEach(path => {
							if (this.$route.path.startsWith(path)) hide = false;
						});
						return hide;
					}
				} else {
					return true;
				}
			}
		}
	};
</script>
