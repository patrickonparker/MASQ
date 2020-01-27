<template>
	<q-timeline-entry
		v-bind="blok"
		:heading="blok.heading"
		:icon="this.mdi(blok.icon)"
		v-editable="blok"
	>
		<span v-if="blok.heading">{{ blok.title }}</span>
		<component
			v-for="blok in blok.content"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</q-timeline-entry>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>

<style lang="scss">
</style>