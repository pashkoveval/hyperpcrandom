<template>
	<div class="wrapper" :style="badApiCounter === 3 ? badapi : ''">
		<APIInput v-if="!API" />
		<test v-if="!WRONG_API_KEY" />
	</div>
</template>

<script>
	import test from '../components/test';
	import APIInput from '../components/APIInput.vue';
	import { mapGetters } from 'vuex';

	export default {
		name: 'Home',
		components: {
			test,
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
	.wrapper {
		width: 100%;
		height: 100%;
		padding: 0 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
