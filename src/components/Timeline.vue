<template>
	<q-timeline v-bind="blok" :layout="layout" v-editable="blok">
		<component
			v-for="blok in blok.content"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
		<q-resize-observer @resize="onResize" />
	</q-timeline>
</template>

<script>
	export default {
		props: ["blok"],
		data: () => ({
			windowSize: {}
		}),
		methods: {
			onResize(size) {
				this.windowSize = size;
			}
		},
		computed: {
			layout() {
				return this.windowSize.width > 1024 ? this.blok.layout : "dense";
			}
		}
	};
</script>

<style lang="scss">
</style>