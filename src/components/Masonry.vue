<template>
	<vue-packer :style="`margin: -${gutter}`" v-editable="blok">
		<div
			v-for="blok in blok.content"
			:key="blok._uid"
			class="masonry-item"
			:style="`padding: ${gutter};`"
		>
			<component :is="blok.component" :blok="blok" :class="itemClass" />
		</div>
	</vue-packer>
</template>

<script>
	import Vue from "vue";
	import { PackerGenerator } from "vue-packer";
	const VuePacker = PackerGenerator();

	export default {
		props: ["blok"],
		components: { VuePacker },
		computed: {
			gutter() {
				return this.blok.item_gutter;
			},
			itemClass() {
				return this.blok.item_class;
			},
			minWidth() {
				return this.blok.item_min_width;
			}
		}
	};
</script>

<style lang="scss">
	.packer-sizer {
		width: 25%;
		width: var(--masonry_lg, 25%);
		@media (max-width: 599px) {
			width: 100%;
			width: var(--masonry_xs, 100%);
		}
		@media (min-width: 600px) and (max-width: 1023px) {
			width: 50%;
			width: var(--masonry_sm, 50%);
		}
		@media (min-width: 1024px) and(max-width: 1439px) {
			width: 33.33%;
			width: var(--masonry_md, 33.33%);
		}
	}
</style>
