<template>
	<q-btn v-bind="blok" :no-caps="blok.no_caps" :icon="'mdi-' + blok.icon" />
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
