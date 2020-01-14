<template>
	<q-expansion-item
		v-bind="blok"
		:header-class="blok.class"
		:header-style="blok.style"
		:icon="icon"
		v-model="expanded"
		v-editable="blok"
	>
		<template v-slot:header v-if="blok.header">
			<component
				v-for="blok in blok.header"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
			/>
		</template>
		<q-separator />
		<div @click="blok.close_on_content_click ? (expanded = false) : ''">
			<component
				v-for="blok in blok.content"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
			/>
		</div>
	</q-expansion-item>
</template>

<script>
	export default {
		props: ["blok"],
		data() {
			return {
				expanded: false
			};
		},
		computed: {
			icon() {
				return this.mdi(this.blok.icon);
			},
			expandIcon() {
				return this.mdi(this.blok.expand_icon);
			}
		}
	};
</script>
