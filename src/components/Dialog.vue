<template>
	<Fragment>
		<component
			v-for="blok in blok.open"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
			@click.native="open = true"
		></component>
		<q-dialog v-model="open" v-bind="blok">
			<component
				v-for="blok in blok.content"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
			>
				<template v-slot:actions>
					<q-btn @click="open = false" flat color="red">Close</q-btn>
				</template>
			</component>
		</q-dialog>
	</Fragment>
</template>

<script>
	import { Fragment } from "vue-fragment";

	export default {
		props: ["blok"],
		components: { Fragment },
		data: () => ({
			open: false
		})
	};
</script>
