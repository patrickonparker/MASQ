<template>
	<q-list v-bind="blok" :dark="darkTheme(blok.dark)" v-editable="blok">
		<q-item-label header v-if="blok.label">{{ blok.label }}</q-item-label>
		<component
			v-for="blok in blok.content"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
			v-bind="blok"
		/>
	</q-list>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>

<style lang="scss">
	.row > .q-item {
		@media (max-width: 599px) {
			width: 100%;
		}
		@media (min-width: 600px) {
			width: 50%;
		}
		@media (min-width: 1200px) {
			width: 33.33%;
		}
		@media (min-width: 1500px) {
			width: 25%;
		}
	}
</style>
