<template>
	<q-badge v-bind="blok" :text-color="blok.text_color" />
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
