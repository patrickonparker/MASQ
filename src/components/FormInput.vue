<template>
	<Fragment>
		<q-input
			v-if="blok.type && blok.type === 'email'"
			v-bind="blok"
			v-model="value"
			:name="blok.label"
			clearable
			clear-icon="mdi-close"
			hide-bottom-space
			no-error-icon
			:rules="blok.required ? [val => !!val || 'Field is required'] : ''"
			type="email"
		>
			<template v-slot:prepend v-if="check(blok.icon)">
				<component
					v-for="blok in blok.icon"
					:key="blok._uid"
					:is="blok.component"
					:blok="blok"
				/>
			</template>
		</q-input>
		<q-input
			v-if="blok.type && blok.type === 'phone'"
			v-bind="blok"
			v-model="value"
			:name="blok.label"
			clearable
			clear-icon="mdi-close"
			hide-bottom-space
			no-error-icon
			:rules="blok.required ? [val => !!val || 'Field is required'] : ''"
			mask="(###) ### - ####"
			type="tel"
			unmasked-value
		>
			<template v-slot:prepend v-if="check(blok.icon)">
				<component
					v-for="blok in blok.icon"
					:key="blok._uid"
					:is="blok.component"
					:blok="blok"
				/>
			</template>
		</q-input>
		<q-input
			v-if="blok.type && blok.type === 'text'"
			v-bind="blok"
			v-model="value"
			:name="blok.label"
			clearable
			clear-icon="mdi-close"
			hide-bottom-space
			no-error-icon
			:rules="blok.required ? [val => !!val || 'Field is required'] : ''"
			type="text"
		>
			<template v-slot:prepend v-if="check(blok.icon)">
				<component
					v-for="blok in blok.icon"
					:key="blok._uid"
					:is="blok.component"
					:blok="blok"
				/>
			</template>
		</q-input>
		<q-input
			v-if="blok.type && blok.type === 'textarea'"
			v-bind="blok"
			v-model="value"
			:name="blok.label"
			autogrow
			clearable
			clear-icon="mdi-close"
			:counter="blok.max_length ? true : false"
			hide-bottom-space
			:max-length="blok.max_length"
			no-error-icon
			:rules="blok.required ? [val => !!val || 'Field is required'] : ''"
			type="textarea"
		>
			<template v-slot:prepend v-if="check(blok.icon)">
				<component
					v-for="blok in blok.icon"
					:key="blok._uid"
					:is="blok.component"
					:blok="blok"
				/>
			</template>
		</q-input>
	</Fragment>
</template>

<script>
	import { Fragment } from "vue-fragment";

	export default {
		props: ["blok"],
		components: { Fragment },
		data: () => ({
			value: null
		})
	};
</script>
