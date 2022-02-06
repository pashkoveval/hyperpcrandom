<template>
	<div class="d-flex">
		<v-flex sm8>
			<v-row class="comments d-flex">
				<v-col v-for="comment in COMMENTS" :key="comment.id">
					<CommentCard :comment="comment" :winner="!!WINNERS.length" />
				</v-col>
			</v-row>
		</v-flex>
		<v-flex sm4>
			<CommentsDetails />
		</v-flex>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import CommentCard from './CommentCard';
	import CommentsDetails from './CommentsDetails';

	export default {
		name: 'comments',
		components: {
			CommentCard,
			CommentsDetails,
		},
		computed: {
			...mapGetters(['COMMENTS', 'TOTAL_COMENTS', 'WINNERS']),
			commentsReversed() {
				const c = this.COMMENTS;
				c.reverse();
				return c;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.total-items {
		color: #fff;
		font-size: 30px;
	}
	.comments {
		width: 100%;
		height: 600px;
		overflow-y: scroll;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
</style>
