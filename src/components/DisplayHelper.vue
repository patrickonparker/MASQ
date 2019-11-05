<template>
	<div
		v-if="pathConditions"
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
			pathConditions() {
				if (this.$route.path.startsWith(this.blok.hide_on_path)) {
					return false;
				} else if (!this.$route.path.startsWith(this.blok.only_show_on_path)) {
					return false;
				} else {
					return true;
				}
			}
		}
	};
</script>
