<template>
	<router-link :to="blok.to"
		><component
			v-for="blok in blok.content"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
	/></router-link>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>