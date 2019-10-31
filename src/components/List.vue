<template>
	<q-list v-bind="blok" v-editable="blok">
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
