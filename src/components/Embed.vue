<template>
	<Fragment>
		<div
			v-if="blok.script_tag"
			:id="blok._uid"
			v-bind="blok"
			v-editable="blok"
		/>
		<object
			v-if="blok.document"
			v-bind="blok"
			v-editable="blok"
			:data="blok.document"
			type="application/pdf"
			width="100%"
			height="100%"
		/>
	</Fragment>
</template>

<script>
	import { Fragment } from "vue-fragment";
	import postscribe from "postscribe";

	export default {
		props: ["blok"],
		components: { Fragment },
		mounted: function() {
			postscribe(`#${this.blok._uid}`, `${this.blok.script_tag}`);
		}
	};
</script>
