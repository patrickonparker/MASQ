<template>
	<q-img v-bind="blok" :src="dynamic" :ratio="ratio"></q-img>
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			dynamic() {
				if (this.blok.src) {
					return this.blok.src;
				} else {
					let random = Math.floor(100000 + Math.random() * 900000);
					return `https://picsum.photos/600/400?random=${random}`;
				}
			},
			ratio() {
				if (this.blok.ratio) {
					if (this.blok.ratio.includes("/")) {
						let vals = this.blok.ratio.split("/");
						return Number(vals[0]) / Number(vals[1]);
					} else {
						return this.blok.ratio;
					}
				}
			}
		}
	};
</script>
