<template>
	<q-carousel
		animated
		arrows
		:autoplay="
			blok.autoplay_interval > 0 ? blok.autoplay_interval * 1000 : blok.autoplay
		"
		:height="blok.height"
		infinite
		:navigation="blok.navigation"
		swipeable
		transition-prev="slide-right"
		transition-next="slide-left"
		v-model="slide"
		v-editable="blok"
		:class="blok.class"
		:style="blok.style"
	>
		<q-carousel-slide
			v-for="(blok, index) in blok.content"
			:name="index"
			:key="blok._uid"
			class="q-pa-none"
		>
			<component :is="blok.component" :blok="blok" />
		</q-carousel-slide>
	</q-carousel>
</template>

<script>
	export default {
		props: ["blok"],
		data() {
			return {
				slide: 0
			};
		}
	};
</script>

<style lang="scss">
	.q-carousel__slide .q-img__content > .container {
		padding: 48px !important;
	}
</style>