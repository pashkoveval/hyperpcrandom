<template>
	<v-container
		fluid
		class="main-wrapper"
		:style="badApiCounter === 3 ? badapi : ''"
	>
		<APIInput v-if="!API" />
		<SelectVideo v-if="API && !WRONG_API_KEY && !LIMIT_EXCEEDED" />
	</v-container>
</template>

<script>
	import SelectVideo from '../components/SelectVideo.vue';
	import APIInput from '../components/APIInput.vue';
	import { mapGetters } from 'vuex';

	export default {
		name: 'Home',
		components: {
			SelectVideo,
			APIInput,
		},
		data() {
			return {
				badApiCounter: 0,
				img: require('../assets/badapi.png'),
			};
		},
		computed: {
			...mapGetters(['API', 'WRONG_API_KEY', 'LIMIT_EXCEEDED']),
			badapi() {
				return `background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${this.img});background-size: cover;background-repeat: no-repeat;background-position: 0 50%;`;
			},
		},
		watch: {
			WRONG_API_KEY(v) {
				if (v) {
					this.badApiCounter++;
				}
			},
			LIMIT_EXCEEDED(v) {
				if (v) {
					this.$router.push('/error');
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.main-wrapper {
		position: relative;
		height: 100%;
	}
</style>
