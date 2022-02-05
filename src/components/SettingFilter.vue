<template>
	<div class="filters mt-5">
		<div class="filters-title mb-5">Параметры фильтрации:</div>

		<v-form ref="form" v-model="valid" lazy-validation>
			<!-- Выбор количества победителей -->
			<div class="winers-count">
				<v-text-field
					v-model="filters.countWiners"
					:color="color"
					hide-details
					outlined
					dark
					min="1"
					max="100"
					label="Количество победителей"
					class="winers-count_input"
					type="number"
				></v-text-field>
			</div>
			<!-- Выбор количества победителей -->

			<!-- Проверка коментария на содержания выражения или слова -->
			<div class="includded-text">
				<v-checkbox
					v-model="validationForm.inputPhrase"
					dark
					:color="color"
					hide-details
					class="mt-5"
					:label="
						!validationForm.inputPhrase
							? 'Проверять коментарий на содержание ?'
							: 'Проверка коментария на содержание вкдючена'
					"
					@change="callClearInput"
				/>

				<v-text-field
					v-model="filters.textIncluds"
					dark
					outlined
					:color="color"
					:rules="textRules"
					:disabled="!validationForm.inputPhrase"
					class="mt-1"
					label="Введи что дожен содержать коментарий..."
				>
					<template v-slot:append>
						<v-fade-transition leave-absolute>
							<v-btn v-if="textIncluds" icon @click="clearable">
								<v-icon size="20px">mdi-close-circle-outline</v-icon>
							</v-btn>
						</v-fade-transition>
					</template>
				</v-text-field>
			</div>
			<!-- Проверка коментария на содержания выражения или слова -->

			<!-- Выбор даты розыграша -->
			<div class="date">
				<v-row>
					<v-col cols="6">
						<v-checkbox
							v-model="validationForm.inputDate"
							dark
							class="ma-0"
							:color="color"
							:label="dateLabel"
							@click="hideDate = true"
						></v-checkbox>
					</v-col>
					<v-col cols="6">
						<v-btn
							v-if="filters.dates && filters.dates.length && inputDate"
							dark
							outlined
							width="100%"
							:color="color"
							@click="clearDate"
						>
							Очистить ?
						</v-btn>
						<div
							v-else-if="filters.dates && filters.dates.length"
							class="purple mt-1 dateShows py-1"
							@click="showOrHideDatePicker(true)"
						>
							с
							{{ currentDateFormat(filters.dates[0]) }}
							{{
								filters.dates[1]
									? `по ${currentDateFormat(filters.dates[1])} `
									: ''
							}}
						</div>
					</v-col>
				</v-row>

				<v-date-picker
					v-if="hideDate && validationForm.inputDate"
					v-model="filters.dates"
					range
					full-width
					dark
					locale="RU"
					no-title
					reactive
					required
					scrollable
					landscape
					:color="color"
					v-click-outside="clickOutsideDate"
					class="date"
				></v-date-picker>
			</div>
			<!-- Выбор даты розыграша -->

			<v-btn
				dark
				outlined
				width="100%"
				class="mt-5"
				color="purple accent-1"
				@click="toComments"
			>
				Перейти к коментариям?
			</v-btn>
		</v-form>
	</div>
</template>

<script>
	export default {
		name: 'settings-filter',
		data() {
			return {
				filters: {
					countWiners: 1,
					textIncluds: '',
					dates: [],
				},
				validationForm: {
					inputDate: true,
					inputPhrase: true,
				},
				valid: true,
				inputDate: false,
				hideDate: true,
				textIncluds: '',
				color: 'purple darken-2',
				dateRules: [(v) => !!v || 'Опять про даты забыл ?'],
				textRules: [
					(v) =>
						!!v ||
						'Артём!!!🤬🤬🤬 Пустые коментарии не допустимы! Ну или отключи эту проверку  😇',
				],
			};
		},
		computed: {
			dateLabel() {
				if (!this.filters.dates.length && this.validationForm.inputDate) {
					return 'Выберать период дат розыграша';
				} else if (!this.validationForm.inputDate) {
					return 'Выберать период дат розыграша ?';
				}
				return 'Выбранная дата: ';
			},
		},
		watch: {
			'filters.dates': {
				handler(v) {
					if (v.length > 1) {
						this.checkDatesEqvl();
					}
				},
			},
		},
		methods: {
			validate() {
				this.$refs.form.validate();
			},
			reset() {
				this.$refs.form.reset();
			},
			resetValidation() {
				this.$refs.form.resetValidation();
			},
			showOrHideDatePicker(v) {
				this.hideDate = v;
			},
			clickOutsideDate() {
				if (this.filters.dates.length > 0) {
					this.showOrHideDatePicker(false);
				}
			},
			toComments() {
				if (this.validate()) {
					console.log('gg', this.filters);

					// if (this.filters.dates) {
					// 	this.$store.dispatch(
					// 		'SAVE_FILTRED_DATE_ACTION',
					// 		this.filters.dates
					// 	);
					// }
					// if (this.textIncluds) {
					// 	this.$store.dispatch('SAVE_INCLUDED_TEXT_ACTION', this.textIncluds);
					// }
					// this.$store.dispatch('SHOW_COMMENTS_ACTION');
				}
			},
			checkDatesEqvl() {
				const dateA = this.currentDateFormat(this.filters.dates[0]);
				const dateB = this.currentDateFormat(this.filters.dates[1]);
				if (dateA > dateB) {
					this.filters.dates = [this.filters.dates[1], this.filters.dates[0]];
				} else if (dateA === dateB) {
					this.clearDate();
				}
			},
			currentDateFormat(date) {
				return this.$moment(date).format('DD.MM.YYYY');
			},
			clearDate() {
				this.filters.dates = [];
			},
			clearable() {
				this.filters.textIncluds = '';
			},
			callClearInput(v) {
				if (!v) {
					this.clearable();
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.filters {
		&-title {
			color: #fff;
			font-size: 30px;
		}
	}
	.winers-count {
		display: flex;
		color: #fff;
		&_input {
			width: 60px;
		}
	}
	.date {
		.dateShows {
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			cursor: pointer;
			transition: all 0.3s;
			&:hover {
				opacity: 0.7;
			}
		}
	}
</style>
