<template>
	<q-toolbar v-bind="blok" v-editable="blok">
		<q-toolbar-title v-if="check(blok.title)" shrink>
			{{ blok.title }}
		</q-toolbar-title>
		<component
			v-for="blok in blok.content"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</q-toolbar>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
