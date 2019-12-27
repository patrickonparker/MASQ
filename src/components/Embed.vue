<template>
	<div :id="blok._uid" v-bind="blok" v-editable="blok" />
</template>

<script>
	import postscribe from "postscribe";

	export default {
		props: ["blok"],
		mounted: function() {
			postscribe(`#${this.blok._uid}`, `${this.blok.script_tag}`);
		}
	};
</script>
