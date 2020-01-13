<template>
	<q-carousel
		animated
		arrows
		:autoplay="blok.autoplay"
		:height="blok.height"
		infinite
		:navigation="blok.navigation"
		swipeable
		v-model="slide"
		v-editable="blok"
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