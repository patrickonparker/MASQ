<template>
	<carousel-3d
		v-bind="blok"
		:autoplayTimeout="Number(blok.autoplayTimeout)"
		:space="check(blok.space) ? blok.space : 'auto'"
		v-editable="blok"
	>
		<slide
			v-for="(blok, index) in blok.content"
			:index="index"
			:key="blok._uid"
			:class="contentClass"
			:style="contentStyle"
		>
			<component :is="blok.component" :blok="blok" />
		</slide>
	</carousel-3d>
</template>

<script>
	import { Carousel3d, Slide } from "vue-carousel-3d";
	export default {
		props: ["blok"],
		components: {
			Carousel3d,
			Slide
		},
		computed: {
			contentClass() {
				return this.blok.contentClass;
			},
			contentStyle() {
				return this.blok.contentStyle;
			}
		}
	};
</script>
