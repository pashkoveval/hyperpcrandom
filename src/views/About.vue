<template>
	<div
		class="wrapper px-5"
		:class="{
			center: !api || api.length < 39 || WRONG_API_KEY,
		}"
		:style="badApiCounter === 3 ? badapi : ''"
	>
		<template v-if="!api || api.length < 39 || WRONG_API_KEY">
			<v-text-field
				v-model="api"
				outlined
				clearable
				maxlength="39"
				dark
				label="Введи API Key"
				type="password"
				class="input mx-5 mb-5"
				hide-details
			>
				<slot append> ggg </slot>
			</v-text-field>
			<span
				v-if="WRONG_API_KEY && api && api.length === 39 && !LIMIT_EXCEEDED"
				class="error errorMSG pa-2"
			>
				{{ wrongAPIMsg }}
			</span>
		</template>
		<v-stepper
			v-if="WRONG_API_KEY === false"
			v-model="e1"
			vertical
			transition="scale-transition"
			dark
			height="100%"
		>
			<v-stepper-header>
				<v-stepper-step :complete="e1 > 1" step="1">
					Name of step 1
				</v-stepper-step>

				<v-divider></v-divider>

				<v-stepper-step
					:complete="e1 > 2"
					step="2"
					@click="e1 > 2 ? (e1 = 2) : null"
				>
					Name of step 2
				</v-stepper-step>

				<v-divider></v-divider>

				<v-stepper-step step="3" @click="e1 = 2">
					Name of step 3
				</v-stepper-step>
			</v-stepper-header>

			<v-stepper-items>
				<v-stepper-content step="1">
					<v-card class="mb-12" color="grey lighten-1" height="400"></v-card>

					<v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

					<v-btn text disabled> Cancel </v-btn>
				</v-stepper-content>

				<v-stepper-content step="2">
					<v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

					<v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

					<v-btn text @click="e1 = 1"> Cancel </v-btn>
				</v-stepper-content>

				<v-stepper-content step="3">
					<v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

					<v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

					<v-btn text @click="e1 = 2"> Cancel </v-btn>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				e1: 1,
				api: null,
				badApiCounter: 0,
				wrongAPIMsg:
					'Ошибка!!! Код ошибки = GF6404. Кто то не умеет коипровать и вставлять верный код! =)',
				img: require('../assets/badapi.png'),
			};
		},
		computed: {
			...mapGetters(['WRONG_API_KEY', 'API', 'LIMIT_EXCEEDED']),
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
			api(v) {
				if (v && v.length === 39) {
					this.$store.dispatch('TEST_API_KEY_ACTION', v);
				} else {
					this.$store.dispatch('CLEAN_BAD_API_FLAG_ACTION');
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
		&.center {
			.input {
				flex: 0 0 auto;
				width: 100%;
			}
			.errorMSG {
				flex: 0 0 auto;
				width: 100%;
				text-align: center;
				text-transform: uppercase;
				color: #fff;
			}
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}
</style>
