<template>
	<v-app-bar app class="header" dark>
		<div class="d-flex align-center">
			<img
				alt="Vuetify Logo"
				class="shrink mr-2"
				src="https://yt3.ggpht.com/ytc/AKedOLQyvWJNaD6qYuEYSAuTnkrG1AeMo-HnaMHujgIeYA=s176-c-k-c0x00ffffff-no-rj"
				transition="scale-transition"
				width="50"
			/>
		</div>

		<v-spacer></v-spacer>

		<div class="textadvertisement">
			<h4 class="marquee">
				<span>{{ advertisement }}</span>
			</h4>
		</div>
	</v-app-bar>
</template>

<script>
	export default {
		name: 'header-app',
		data() {
			return {
				advertisement:
					'Подписывайтесь на канал HYPERPC! HYPERPC является российским лидером отрасли, производящей компьютеры премиум класса. Наша миссия - создавать легендарные компьютеры, которые будут дарить геймерам и творческим профессионалам удовольствие от использования.',
			};
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
		.textadvertisement {
			display: flex;
			width: 70%;
			height: 40px;
			overflow: hidden;
			position: relative;
			&::after {
				content: '';
				width: 100%;
				height: 100%;
				position: absolute;
				z-index: 2;
				top: 0;
				left: 0;
				background: linear-gradient(
					90deg,
					rgba(0, 0, 0, 1) 0%,
					rgba(255, 255, 255, 0) 20%
				);
			}
			@-webkit-keyframes scroll {
				0% {
					-webkit-transform: translate(0, 0);
					transform: translate(0, 0);
				}
				100% {
					-webkit-transform: translate(-100%, 0);
					transform: translate(-100%, 0);
				}
			}

			@-moz-keyframes scroll {
				0% {
					-moz-transform: translate(0, 0);
					transform: translate(0, 0);
				}
				100% {
					-moz-transform: translate(-100%, 0);
					transform: translate(-100%, 0);
				}
			}

			@keyframes scroll {
				0% {
					transform: translate(0, 0);
				}
				100% {
					transform: translate(-100%, 0);
				}
			}

			.marquee {
				display: block;
				width: 100%;
				white-space: nowrap;
				overflow: hidden;
			}

			.marquee span {
				display: inline-block;
				padding-left: 200%;
				-webkit-animation: scroll 50s infinite linear;
				-moz-animation: scroll 50s infinite linear;
				animation: scroll 50s infinite linear;
			}
		}
	}
</style>
