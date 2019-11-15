<template>
	<q-icon v-bind="blok" :name="'mdi-' + blok.name" v-editable="blok" />
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
