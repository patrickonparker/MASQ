<template>
	<q-img
		v-bind="blok"
		:image-class="blok.class"
		:ratio="ratio"
		:src="blok.custom_placeholder ? placeholder : dynamic"
		v-editable="blok"
	>
		<component
			v-for="blok in blok.content"
			:key="blok._uid"
			:is="blok.component"
			:blok="blok"
		/>
	</q-img>
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			dynamic() {
				let sbImg = "//a.storyblok.com";
				if (this.blok.src.includes(sbImg)) {
					let img = this.blok.src.replace(sbImg, "");
					let size = `/${this.blok.width}x${this.blok.height}`;
					let smart = this.blok.smart ? "/smart" : "";
					let quality = `/filters:quality(${
						this.blok.quality ? this.blok.quality : "80"
					})`;
					let optimized =
						"https://img2.storyblok.com" + size + smart + quality + img;
					return optimized;
				} else if (this.blok.src) {
					return this.blok.src;
				} else {
					let placeholderStorage = localStorage.getItem("placeholders");
					if (placeholderStorage) {
						let placeholders = placeholderStorage.split(",");
						let random = Math.floor(
							Math.random() * Math.floor(placeholders.length)
						);
						return placeholders[random];
					} else {
						let random = Math.floor(Math.random() * 1000) + 1;
						let width = this.blok.width ? this.blok.width : "600";
						let height = this.blok.height ? this.blok.height : "400";
						return `https://picsum.photos/${width}/${height}?random=${random}`;
					}
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
