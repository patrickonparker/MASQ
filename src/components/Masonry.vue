<template>
	<div class="masonry-container">
		<magic-grid :gap="20" :maxColWidth="columnSize">
			<component
				v-for="blok in blok.content"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
			/>
		</magic-grid>
		<q-resize-observer @resize="size => (container = size)" />
	</div>
</template>

<script>
	import Vue from "vue";
	import MagicGrid from "vue-magic-grid";
	Vue.use(MagicGrid);

	export default {
		props: ["blok"],
		data: () => ({
			container: {}
		}),
		computed: {
			columnSize() {
				let totalWidth = this.container.width;
				console.log("Total Width:", totalWidth);
				var cols;
				if (totalWidth > 1024) {
					cols = Number(this.blok.columns_lg);
				} else if (totalWidth > 768) {
					cols = Number(this.blok.columns_md);
				} else if (totalWidth > 480) {
					cols = Number(this.blok.columns_sm);
				} else {
					cols = 1;
				}
				let gaps = 20 * cols;
				let remainingWidth = totalWidth - gaps;
				let columnWidth = remainingWidth / cols;
				return columnWidth;
			}
		}
	};
</script>

<style lang="scss">
	.masonry-container {
		min-width: 100%;
		margin: 0 -10px;
	}
</style>
