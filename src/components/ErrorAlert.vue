<template>
	<div class="error px-3 py-1 mb-5">
		{{ ERROR_MSG }}
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'error-alert',
		computed: {
			...mapGetters(['ERROR_MSG']),
		},
	};
</script>

<style lang="scss" scoped></style>
