<template>
	<q-parallax
		:height="Number(blok.height)"
		:speed="Number(blok.speed)"
		:class="blok.class"
		:style="blok.style"
		v-editable="blok"
	>
		<template v-slot:media>
			<img :src="blok.image" />
		</template>
		<component
			v-for="blok in blok.content"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</q-parallax>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>