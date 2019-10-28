<template>
	<q-btn v-bind="blok" :icon="'mdi-' + blok.icon" :no-caps="blok.no_caps" />
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
