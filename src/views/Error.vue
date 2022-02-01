<template>
	<div class="errorblock">
		<span class="msg pa-5">{{ LIMIT_EXCEEDED_MSG }}</span>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters(['LIMIT_EXCEEDED_MSG']),
		},
	};
</script>

<style lang="scss" scoped>
	.errorblock {
		width: 100%;
		height: 100%;
		background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
			url('../assets/GF6404.gif');
		background-size: cover;
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
		justify-content: center;

		.msg {
			color: #fff;
			background: rgba(255, 0, 0, 0.377);
			font-size: 30px;
		}
	}
</style>
