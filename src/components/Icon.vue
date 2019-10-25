<template>
	<q-icon v-bind="blok" :name="'mdi-' + blok.name" />
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
