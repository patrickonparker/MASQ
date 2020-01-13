<template>
	<div :class="blok.class" :style="blok.style" v-editable="blok">
		{{ blok.sentence }}
		<vue-typer
			:text="typerArray"
			:repeat="Infinity"
			:shuffle="false"
			initial-action="typing"
			:pre-type-delay="70"
			:type-delay="70"
			:pre-erase-delay="2000"
			:erase-delay="250"
			erase-style="select-all"
			:erase-on-complete="false"
			caret-animation="smooth"
		></vue-typer>
	</div>
</template>

<script>
	import { VueTyper } from "vue-typer";

	export default {
		props: ["blok"],
		components: { VueTyper },
		computed: {
			typerArray() {
				var computedArray = this.blok.text.split(",");
				return computedArray;
			}
		}
	};
</script>

<style>
	.vue-typer .left,
	.vue-typer .right {
		float: none !important;
	}
	.vue-typer {
		display: inline-block;
		min-width: 10em;
	}
</style>
