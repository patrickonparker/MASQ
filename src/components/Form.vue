<template>
	<form name="contact" method="POST" data-netlify="true">
		<p>
			<label>Your Name: <input type="text" name="name"/></label>
		</p>
		<p>
			<label>Your Email: <input type="email" name="email"/></label>
		</p>
		<p>
			<label
				>Your Role:
				<select name="role[]" multiple>
					<option value="leader">Leader</option>
					<option value="follower">Follower</option>
				</select></label
			>
		</p>
		<p>
			<label>Message: <textarea name="message"></textarea></label>
		</p>
		<p>
			<button type="submit">Send</button>
		</p>
	</form>
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
