<template>
	<v-row class="filters d-flex mt-5">
		<v-flex sm12>
			<div class="filters-title mb-5">Параметры фильтрации:</div>

			<v-flex
				v-if="errorArr && errorArr.length > 0"
				sm12
				class="error-alert error mb-5 px-3 py-1"
			>
				Не заполнены нужные поля:
				<span v-for="(err, idx) in errorArr" :key="idx">
					<strong> {{ err }} </strong>
				</span>
			</v-flex>
		</v-flex>

		<v-flex sm6 class="pr-5">
			<v-checkbox
				v-model="filters.countComents.value"
				dark
				:color="color"
				hide-details
				class="mb-5"
				:label="filters.countComents.des"
			/>
			<!-- Выбор количества победителей -->
			<div class="winers-count">
				<v-text-field
					v-model="filters.countWiners.value"
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

			<!-- Проверка комментария на содержания выражения или слова -->
			<div class="includded-text">
				<v-checkbox
					v-model="validationForm.inputPhrase"
					dark
					:color="color"
					hide-details
					class="mt-5"
					:label="
						!validationForm.inputPhrase
							? 'Проверять комментарий на содержание ?'
							: 'Проверка комментария на содержание включена'
					"
					@change="callClearInput"
				/>

				<v-fade-transition leave-absolute>
					<v-text-field
						v-if="validationForm.inputPhrase"
						v-model="filters.textIncluds.value"
						dark
						outlined
						:color="color"
						:disabled="!validationForm.inputPhrase"
						hide-details
						class="mt-1"
						label="Введи что должен содержать комментарий..."
					>
						<template v-slot:append>
							<v-fade-transition leave-absolute>
								<v-btn v-if="filters.textIncluds.value" icon @click="clearable">
									<v-icon size="20px">mdi-close-circle-outline</v-icon>
								</v-btn>
							</v-fade-transition>
						</template>
					</v-text-field>
				</v-fade-transition>
			</div>
			<!-- Проверка комментария на содержания выражения или слова -->
		</v-flex>

		<v-flex sm6 class="pl-5">
			<!-- Выбор даты розыграша -->
			<div class="date mt-5">
				<v-checkbox
					v-model="validationForm.inputDate"
					dark
					class="ma-0"
					:color="color"
					:label="dateLabel"
					@change="dateClick"
				></v-checkbox>
				<div
					v-if="filters.date.value && filters.date.value.length"
					class="purple mt-1 dateShows py-1"
					@click="showOrHideDatePicker(true)"
				>
					с
					{{ currentDateFormat(filters.date.value[0]) }}
					{{
						filters.date.value[1]
							? `по ${currentDateFormat(filters.date.value[1])} `
							: ''
					}}
				</div>

				<v-date-picker
					v-if="hideDate && validationForm.inputDate"
					v-model="filters.date.value"
					range
					dark
					width="auto"
					locale="RU"
					no-title
					reactive
					scrollable
					:color="color"
					v-click-outside="clickOutsideDate"
				></v-date-picker>
			</div>
			<!-- Выбор даты розыграша -->
		</v-flex>

		<v-flex sm12>
			<v-btn
				dark
				outlined
				width="100%"
				class="mt-5"
				color="purple accent-1"
				@click="toComments"
			>
				Перейти к комментариям?
			</v-btn>
		</v-flex>
	</v-row>
</template>

<script>
	export default {
		name: 'settings-filter',
		data() {
			return {
				filters: {
					countComents: {
						des: 'Разрешен лишь один комментарий',
						value: true,
					},
					countWiners: {
						des: 'Количество победителей:',
						value: 1,
					},
					textIncluds: {
						des: 'В комментарий содержится:',
						value: '',
					},
					date: {
						des: 'Даты публикации комментария:',
						value: [],
					},
				},
				validationForm: {
					inputDate: true,
					inputPhrase: true,
				},
				valid: true,
				inputDate: false,
				hideDate: true,
				errorText: 'Содержание комментария',
				errorDate: 'Дата',
				errorArr: [],
				color: 'purple ',
			};
		},
		computed: {
			dateLabel() {
				if (!this.filters.date.value.length && this.validationForm.inputDate) {
					return 'Выбрать период дат для розыграша';
				} else if (!this.validationForm.inputDate) {
					return 'Выбрать период дат для розыграша ?';
				}
				return 'Выбранная дата: ';
			},
		},
		watch: {
			'filters.date.value': {
				handler(v) {
					// new Date(date)
					if (v.length > 1) {
						this.checkDatesEqvl();
					}
				},
			},
		},
		methods: {
			clearValidate() {
				this.errorArr = [];
			},
			validate() {
				const textReq = this.validationForm.inputPhrase;
				const dateReq = this.validationForm.inputDate;
				let text = null;
				let date = null;
				if (textReq) {
					text =
						this.filters.textIncluds.value &&
						this.filters.textIncluds.value.length > 0 &&
						textReq
							? true
							: false;
					if (!text) {
						this.errorArr.push(this.errorText);
					}
				}
				if (dateReq) {
					date =
						this.filters.date.value &&
						this.filters.date.value.length > 0 &&
						dateReq
							? true
							: false;
					if (!date) {
						this.errorArr.push(this.errorDate);
					}
				}
				if (textReq && !dateReq && text) {
					return true;
				} else if (!textReq && dateReq && date) {
					return true;
				} else if (textReq && dateReq && date && text) {
					return true;
				} else if (!textReq && !dateReq) {
					return true;
				} else {
					return false;
				}
			},
			clickOutsideDate() {
				if (this.filters.date.value.length > 0) {
					this.showOrHideDatePicker(false);
				}
			},
			toComments() {
				if (this.validate()) {
					const string = this.filters.countWiners.value.toString();
					this.filters.countWiners.value = string;
					this.$store.dispatch('SAVE_FILTER_SETTINGS_ACTION', this.filters);
					this.$store.dispatch('SHOW_COMMENTS_ACTION');
					console.log('filters', this.filters);
				}
			},
			checkDatesEqvl() {
				const dateA = this.filters.date.value[0];
				const dateB = this.filters.date.value[1];
				if (this.$moment(dateA).isAfter(dateB)) {
					this.filters.date.value = [
						this.filters.date.value[1],
						this.filters.date.value[0],
					];
				} else if (dateA === dateB) {
					this.clearDate();
				}
			},
			currentDateFormat(date) {
				return this.$moment(date).format('DD.MM.YYYY');
			},
			dateClick(v) {
				this.clearValidate();
				if (!v) {
					this.clearDate();
					this.showOrHideDatePicker(false);
				} else {
					this.showOrHideDatePicker(true);
				}
			},
			showOrHideDatePicker(v) {
				this.hideDate = v;
			},
			clearDate() {
				this.filters.date.value = [];
			},
			clearable() {
				this.filters.textIncluds.value = '';
			},
			callClearInput(v) {
				this.clearValidate();
				if (!v) {
					this.clearable();
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.filters {
		width: 100%;
		height: 100%;
		&-title {
			color: #fff;
			font-size: 30px;
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
	}
</style>
