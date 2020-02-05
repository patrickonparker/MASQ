<template>
	<div v-bind="blok" v-html="pugger" v-editable="blok" />
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			pugger() {
				var compiled = pug.compile(this.blok.pug);
				return compiled();
			}
		}
	};
</script>
