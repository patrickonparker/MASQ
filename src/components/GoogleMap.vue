<template>
	<iframe
		v-editable="blok"
		:width="blok.width"
		:height="blok.height"
		:src="
			`https://maps.google.com/maps?q=${JSON.stringify(blok.location)}${
				blok.satellite
			}&z=${blok.zoom_level}&ie=UTF8&output=embed`
		"
		frameborder="0"
		scrolling="no"
		:class="blok.class"
		:style="blok.style"
	></iframe>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
