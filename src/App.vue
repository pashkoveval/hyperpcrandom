<template>
	<v-app>
		<v-app-bar app class="header" dark>
			<div class="d-flex align-center">
				<img
					alt="Vuetify Logo"
					class="shrink mr-2"
					src="https://yt3.ggpht.com/ytc/AKedOLQyvWJNaD6qYuEYSAuTnkrG1AeMo-HnaMHujgIeYA=s176-c-k-c0x00ffffff-no-rj"
					transition="scale-transition"
					width="50"
				/>
				<v-avatar width="50" height="50"> </v-avatar>
			</div>

			<v-spacer></v-spacer>

			<v-btn to="/" class="mr-2"> Home </v-btn>
			<v-btn to="/about"> About </v-btn>
		</v-app-bar>

		<v-main class="main">
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		name: 'App',
		mounted() {
			this.CHECK_API_LOCKAL_ACTION();
		},
		methods: {
			...mapActions(['CHECK_API_LOCKAL_ACTION']),
		},
	};
</script>

<style lang="scss" scoped>
	.header {
		background: rgb(0, 0, 0);
		background: linear-gradient(
			90deg,
			rgba(0, 0, 0, 1) 30%,
			rgba(91, 9, 121, 1) 82%,
			rgba(91, 9, 121, 1) 100%
		);
	}
	.main {
		padding-bottom: 5px;
		background: rgb(0, 0, 0);
		background: linear-gradient(
			90deg,
			rgba(0, 0, 0, 1) 10%,
			rgba(91, 9, 121, 1) 82%,
			rgba(91, 9, 121, 1) 100%
		);
	}
</style>
