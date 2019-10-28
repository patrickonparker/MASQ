<template>
	<q-markdown v-bind="blok" v-editable="blok" />
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
