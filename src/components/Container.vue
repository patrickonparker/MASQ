<template>
	<div
		:class="[
			'container',
			blok.disable_bottom_margin ? '' : 'standard-margin',
			blok.full_width ? 'full-width-container' : '',
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
	.full-width-container {
		max-width: none;
		@media (max-width: 599px) {
			margin: 0 -8px;
			width: calc(100% + 16px);
		}
		@media (min-width: 600px) and (max-width: 1439px) {
			margin: 0 -16px;
			width: calc(100% + 32px);
		}
		@media (min-width: 1440px) {
			margin: 0 -24px;
			width: calc(100% + 48px);
		}
	}
</style>
