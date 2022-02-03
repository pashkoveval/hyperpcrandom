<template>
	<div>
		<v-row dense>
			<v-col cols="8">
				<div class="coments d-flex">
					<template v-for="coment in visiblePages">
						<CommentCard :coment="coment" :key="coment.id" />
					</template>
				</div>
				<v-pagination
					v-if="COMMENTS"
					v-model="page"
					circle
					:length="Math.ceil(COMMENTS.length / 3)"
					:total-visible="7"
					class="mt-5"
					color="purple darken-3"
				></v-pagination>
			</v-col>
			<v-col cols="4">
				<CommentsDetails />
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import CommentCard from './CommentCard';
	import CommentsDetails from './CommentsDetails';

	export default {
		name: 'coments',
		components: {
			CommentCard,
			CommentsDetails,
		},
		data() {
			return {
				page: 1,
				perPage: 4,
				test: [
					{
						kind: 'youtube#commentThread',
						etag: 'gP_MotvvgCB10TwBCVMeqlPTLh8',
						id: 'Ugz64seQvVKzbgCRMNZ4AaABAg',
						snippet: {
							videoId: 'AO7xN6m3y54',
							topLevelComment: {
								kind: 'youtube#comment',
								etag: 'SPu5tRca3NyV9heNgPuE8t_Pcwc',
								id: 'Ugz64seQvVKzbgCRMNZ4AaABAg',
								snippet: {
									videoId: 'AO7xN6m3y54',
									textDisplay: 'Тёплый видосик',
									textOriginal: 'Тёплый видосик',
									authorDisplayName: 'чучел',
									authorProfileImageUrl:
										'https://yt3.ggpht.com/RCryLiCBc8IBj_NgRYCfe2i0amP3xN2usXfxFll0EIsFhdxwBMRs-3ALqDBf6MFVSQZ9hC3cYg=s48-c-k-c0x00ffffff-no-rj',
									authorChannelUrl:
										'http://www.youtube.com/channel/UCeSrAAZ5lsdujFfFqbG7YUw',
									authorChannelId: {
										value: 'UCeSrAAZ5lsdujFfFqbG7YUw',
									},
									canRate: true,
									viewerRating: 'none',
									likeCount: 1,
									publishedAt: '2022-01-30T12:20:11Z',
									updatedAt: '2022-01-30T12:20:11Z',
								},
							},
							canReply: true,
							totalReplyCount: 0,
							isPublic: true,
						},
					},
				],
			};
		},
		computed: {
			...mapGetters(['COMMENTS']),
			visiblePages() {
				return this.COMMENTS.slice(
					(this.page - 1) * this.perPage,
					this.page * this.perPage
				);
			},
		},
		created() {
			window.addEventListener('resize', this.resize);
		},
		destroyed() {
			window.removeEventListener('resize', this.resize);
		},
		methods: {
			resize(e) {
				if (e.target.innerWidth > 1200) {
					this.perPage = 6;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.coments {
		width: 100%;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
