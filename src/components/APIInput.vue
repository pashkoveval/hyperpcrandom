<template>
	<div class="wrapper">
		<v-text-field
			dark
			outlined
			clearable
			hide-details
			maxlength="39"
			v-model="api"
			label="Введи API Key"
			type="password"
			class="input mx-5 mb-5"
		/>
		<span
			v-if="WRONG_API_KEY && api && api.length === 39 && !LIMIT_EXCEEDED"
			class="error errorMSG pa-2"
		>
			{{ wrongApiMsg }}
		</span>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'inpit-api',
		data() {
			return {
				api: '',
				wrongApiMsg:
					'Кто то не умеет копировать и вставлять? Попробуй еще раз. CTRL + C после CTRL V.',
			};
		},
		computed: {
			...mapGetters(['WRONG_API_KEY', 'LIMIT_EXCEEDED', 'API']),
		},
		watch: {
			api(v) {
				if (v && v.length === 39) {
					this.$store.dispatch('TEST_API_KEY_ACTION', v);
				} else {
					this.$store.dispatch('CLEAN_BAD_API_FLAG_ACTION');
				}
			},
		},
		created() {
			console.log('API', this.API);
		},
	};
</script>

<style lang="scss" scoped></style>
