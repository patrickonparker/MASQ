<template>
	<form
		class="q-gutter-md"
		name="testform12784"
		action="https://formsubmit.co/lovallo.james@gmail.com"
		method="POST"
	>
		<q-input
			filled
			v-model="name"
			name="Name"
			label="Your name *"
			hint="Name and surname"
			lazy-rules
			:rules="[val => (val && val.length > 0) || 'Please type something']"
		/>

		<q-input
			filled
			v-model="name"
			name="Occupation"
			label="Your occupation *"
			hint="What you do for a living"
			lazy-rules
			:rules="[val => (val && val.length > 0) || 'Please type something']"
		/>

		<q-input
			filled
			type="number"
			v-model="age"
			name="Age"
			label="Your age *"
			lazy-rules
			:rules="[
				val => (val !== null && val !== '') || 'Please type your age',
				val => (val > 0 && val < 100) || 'Please type a real age'
			]"
		/>

		<input type="hidden" name="_next" value="http://localhost:8080/dogs" />

		<input type="hidden" name="_subject" value="New submission from MASQ!" />

		<input type="text" name="_honey" style="display:none" />

		<!-- <input type="hidden" name="_captcha" value="false" /> -->

		<div>
			<q-btn label="Submit" type="submit" color="primary" @click="recaptcha" />
			<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
		</div>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				name: null,
				age: null,
				accept: false,
				disabled: true
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
