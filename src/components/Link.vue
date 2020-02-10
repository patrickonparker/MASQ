<template>
	<Fragment>
		<a v-if="blok.to.startsWith('http')" :href="blok.to"
			><component
				v-for="blok in blok.content"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
		/></a>
		<router-link v-else :to="blok.to"
			><component
				v-for="blok in blok.content"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
		/></router-link>
	</Fragment>
</template>

<script>
	import { Fragment } from "vue-fragment";

	export default {
		props: ["blok"],
		components: { Fragment }
	};
</script>