<template>
	<q-list v-bind="blok" v-editable="blok">
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
