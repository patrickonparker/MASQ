<template>
	<div
		:class="[
			'container',
			`${blok.disable_bottom_margin ? '' : 'standard-margin'}`
		]"
	>
		<component
			v-for="blok in blok.children"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
			v-bind="blok"
		/>
	</div>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>

<style lang="scss" scoped>
	.container {
		max-width: 1440px;
		width: 100%;
	}
	.standard-margin {
		margin: 0 auto 45px auto;
	}
</style>
