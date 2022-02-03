<template>
	<v-app>
		<Header />
		<v-main class="main">
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
	import { mapActions } from 'vuex';
	import Header from './components/Header.vue';
	export default {
		name: 'App',
		components: { Header },
		mounted() {
			this.CHECK_API_LOCKAL_ACTION();
		},
		methods: {
			...mapActions(['CHECK_API_LOCKAL_ACTION']),
		},
	};
</script>

<style lang="scss" scoped>
	.main {
		padding-bottom: 5px;
		background: rgb(0, 0, 0);
		background: linear-gradient(
			90deg,
			rgba(0, 0, 0, 1) 30%,
			rgba(91, 9, 121, 1) 82%,
			rgba(91, 9, 121, 1) 100%
		);
	}
</style>
