<template>
	<q-btn
		v-bind="blok"
		:icon="'mdi-' + blok.icon"
		:no-caps="blok.no_caps"
		:to="blok.to | linkType"
		@click="openLink(blok.to)"
		v-ripple
	>
		<component
			v-for="blok in blok.badge"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</q-btn>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
