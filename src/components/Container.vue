<template>
	<div
		:class="[
			'container',
			`${blok.disable_bottom_margin ? '' : 'standard-margin'}`,
			blok.class
		]"
		:style="blok.style"
		v-editable="blok"
	>
		<component
			v-for="blok in blok.children"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
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
		margin: 0 auto;
		width: 100%;
	}
	.standard-margin {
		padding-bottom: 45px;
	}
</style>
