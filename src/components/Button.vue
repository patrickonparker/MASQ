<template>
	<q-btn
		v-bind="blok"
		:icon="this.mdi(blok.icon)"
		:no-caps="blok.no_caps"
		:to="blok.to | linkType"
		@click="openLink(blok.to)"
		ripple
		v-editable="blok"
	>
		<component
			v-for="blok in blok.content"
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

<style lang="scss">
	.q-btn .q-icon:empty {
		display: none;
	}
</style>