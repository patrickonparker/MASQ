<template>
	<Fragment>
		<!-- email -->
		<q-input
			v-if="blok.type === 'email'"
			v-bind="blok"
			v-model="value"
			:name="blok.label"
			clearable
			clear-icon="mdi-close"
			hide-bottom-space
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
		<input type="hidden" name="_replyto" :value="blok.value" />

		<!-- phone -->
		<q-input
			v-if="blok.type === 'phone'"
			v-bind="blok"
			v-model="value"
			:name="blok.label"
			clearable
			clear-icon="mdi-close"
			hide-bottom-space
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

		<!-- text -->
		<q-input
			v-if="blok.type === 'text'"
			v-bind="blok"
			v-model="value"
			:name="blok.label"
			clearable
			clear-icon="mdi-close"
			hide-bottom-space
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

		<!-- textarea -->
		<q-input
			v-if="blok.type === 'textarea'"
			v-bind="blok"
			v-model="value"
			:name="blok.label"
			autogrow
			clearable
			clear-icon="mdi-close"
			:counter="blok.max_length ? true : false"
			hide-bottom-space
			:max-length="blok.max_length"
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

		<!-- select -->
		<q-select
			v-if="blok.type === 'select'"
			v-bind="blok"
			v-model="value"
			:options="blok.options.split(',')"
			:name="blok.label"
			clearable
			clear-icon="mdi-close"
			dropdown-icon="mdi-menu-down"
			hide-bottom-space
			:multiple="blok.multiple_values"
			no-error-icon
			:rules="blok.required ? [val => !!val || 'Field is required'] : ''"
			style="position: relative;"
		>
			<template v-slot:prepend v-if="check(blok.icon)">
				<component
					v-for="blok in blok.icon"
					:key="blok._uid"
					:is="blok.component"
					:blok="blok"
				/>
			</template>
			<input
				:required="blok.required"
				:name="blok.label"
				:value="value"
				class="sneaky-input"
			/>
		</q-select>

		<!-- checkbox -->
		<div
			v-if="blok.type === 'checkbox'"
			class="q-gutter-sm q-mb-sm q-mt-md"
			:class="blok.class"
			:style="blok.style"
		>
			<q-item-label style="position: relative;">
				{{ blok.label }}
				<input
					:required="blok.required"
					:name="blok.label"
					:value="String(selection).replace(',', ', ')"
					class="sneaky-input"
				/>
			</q-item-label>
			<q-checkbox
				v-for="option in blok.options.split(',')"
				v-model="selection"
				:key="option"
				:val="option"
				:label="option"
				:color="blok.color"
			/>
		</div>

		<!-- radio -->
		<div
			v-if="blok.type === 'radio'"
			class="q-gutter-sm q-mb-sm q-mt-md"
			:class="blok.class"
			:style="blok.style"
		>
			<q-item-label style="position: relative;">
				{{ blok.label }}
				<input
					:required="blok.required"
					:name="blok.label"
					:value="selection"
					class="sneaky-input"
				/>
			</q-item-label>
			<q-radio
				v-for="option in blok.options.split(',')"
				v-model="selection"
				:key="option"
				:val="option"
				:label="option"
				:color="blok.color"
			/>
		</div>

		<!-- toggle -->
		<div
			v-if="blok.type === 'toggle'"
			class="q-gutter-sm q-mb-sm q-mt-md"
			:class="blok.class"
			:style="blok.style"
		>
			<q-item-label style="position: relative;">
				{{ blok.label }}
				<input
					:required="blok.required"
					:name="blok.label"
					:value="String(selection).replace(',', ', ')"
					class="sneaky-input"
				/>
			</q-item-label>
			<q-toggle
				v-for="option in blok.options.split(',')"
				v-model="selection"
				:key="option"
				:val="option"
				:label="option"
				:color="blok.color"
			/>
		</div>

		<!-- date/time -->
		<q-input
			v-if="blok.type === 'date/time'"
			v-model="value"
			v-bind="blok"
			clearable
			clear-icon="mdi-close"
			:name="blok.label"
			:hint="'Type or select the icons to pick.'"
			:rules="blok.required ? [val => !!val || 'Field is required'] : ''"
		>
			<template v-slot:prepend>
				<q-icon name="mdi-calendar-search" class="cursor-pointer">
					<q-popup-proxy transition-show="scale" transition-hide="scale">
						<q-date v-model="value" mask="MM/DD/YYYY, h:mm a" today-btn />
					</q-popup-proxy>
				</q-icon>
			</template>

			<template v-slot:append>
				<q-icon name="mdi-clock-outline" class="cursor-pointer">
					<q-popup-proxy transition-show="scale" transition-hide="scale">
						<q-time v-model="value" mask="MM/DD/YYYY, h:mm a" now-btn />
					</q-popup-proxy>
				</q-icon>
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
			value: null,
			selection: []
		})
	};
</script>

<style>
	.sneaky-input {
		position: absolute;
		bottom: 0;
		left: 16px;
		width: 0px !important;
		overflow: hidden;
		opacity: 0;
	}

	textarea {
		min-height: 4rem;
	}
</style>
