<template>
	<q-timeline-entry
		v-bind="blok"
		:heading="blok.heading"
		:icon="this.mdi(blok.icon)"
		v-editable="blok"
	>
		<span v-if="blok.heading">{{ blok.title }}</span>
	</q-timeline-entry>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>

<style lang="scss">
</style>