<template>
	<q-form
		@submit="onSubmit"
		@reset="onReset"
		class="q-gutter-md"
		name="testform12784"
		action="https://formsubmit.co/lovallo.james@gmail.com"
		method="POST"
	>
		<q-input
			filled
			v-model="name"
			name="name"
			label="Your name *"
			hint="Name and surname"
			lazy-rules
			:rules="[val => (val && val.length > 0) || 'Please type something']"
		/>

		<q-input
			filled
			type="number"
			v-model="age"
			name="age"
			label="Your age *"
			lazy-rules
			:rules="[
				val => (val !== null && val !== '') || 'Please type your age',
				val => (val > 0 && val < 100) || 'Please type a real age'
			]"
		/>

		<q-toggle
			v-model="accept"
			label="I accept the license and terms"
			name="termsf"
		/>

		<div>
			<q-btn label="Submit" type="submit" color="primary" />
			<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
		</div>
	</q-form>
</template>

<script>
	export default {
		data() {
			return {
				name: null,
				age: null,
				accept: false
			};
		},

		methods: {
			onSubmit() {
				if (this.accept !== true) {
					this.$q.notify({
						color: "red-5",
						textColor: "white",
						icon: "warning",
						message: "You need to accept the license and terms first"
					});
				} else {
					this.$q.notify({
						color: "green-4",
						textColor: "white",
						icon: "cloud_done",
						message: "Submitted"
					});
				}
			},

			onReset() {
				this.name = null;
				this.age = null;
				this.accept = false;
			}
		}
	};
</script>
