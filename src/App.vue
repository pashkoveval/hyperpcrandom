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

<style lang="scss">
	/* ===== Scrollbar CSS ===== */
	/* Firefox */
	* {
		scrollbar-width: thin;
		scrollbar-color: #5c0e71 #ffffff;
	}

	/* Chrome, Edge, and Safari */
	*::-webkit-scrollbar {
		width: 10px;
	}

	*::-webkit-scrollbar-track {
		background: transparent;
	}

	*::-webkit-scrollbar-thumb {
		background-color: #5c0e71;
		border-radius: 20px;
		border: 2px double #ffffff;
	}
	.main {
		overflow: hidden;
		padding-bottom: 5px;
		background: #360033;
		background: -webkit-linear-gradient(to right, #000000, #360033, #0b8793);
		background: linear-gradient(to right, #000000, #360033, #0b8793);
	}
</style>
