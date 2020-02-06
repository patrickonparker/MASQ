<template>
	<div v-html="PUGtoHTML" v-bind="blok" v-editable="blok" class="q-pug" />
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			PUGtoHTML() {
				let compiled = pug.compile(this.blok.pug);
				return compiled();
			}
		}
	};
</script>
