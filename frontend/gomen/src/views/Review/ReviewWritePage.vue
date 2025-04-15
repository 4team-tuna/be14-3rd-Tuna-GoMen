<template>
  <div>
    <div class="review-container">
      <div class="review-header">
        <h2>별점 리뷰 작성</h2>
        <button class="submit-button" @click="handleSubmit">제출하기</button>
      </div>

      <ReviewTextarea v-model="reviewText" />
      <StarRating v-model="rating" />
    </div>
  </div>
</template>

<script>
import ReviewTextarea from '@/components/Review/ReviewTextArea.vue'
import StarRating from '@/components/Review/StarRating.vue'
import axios from 'axios'

export default {
  components: {
    ReviewTextarea,
    StarRating,
  },
  data() {
    return {
      reviewText: '',
      rating: 0,
      spaceId: null,
      mentorId: null,
      mentorNickname: ''
    }
  },
  mounted() {
    this.spaceId = this.$route.query.spaceId
    this.mentorId = this.$route.query.mentorId
    this.mentorNickname = this.$route.query.mentorNickname

    if (!this.spaceId || !this.mentorId) {
      alert('잘못된 접근입니다.')
      this.$router.push('/main')
    }
  },
  methods: {
    async handleSubmit() {
      const isReviewValid = this.reviewText.trim().length >= 20;
      const isRatingValid = this.rating >= 1;

      if (!isReviewValid && !isRatingValid) {
        alert('리뷰를 20자 이상 입력하고 별점을 입력해주세요.');
        return;
      } else if (!isReviewValid) {
        alert('리뷰는 최소 20자 이상 작성해야 합니다.');
        return;
      } else if (!isRatingValid) {
        alert('별점을 입력해주세요.');
        return;
      }

      const user = JSON.parse(localStorage.getItem('user'));

      const newReview = {
        mentoring_space_id: this.spaceId,
        mentor_id: this.mentorId,
        mentor_nickname: this.mentorNickname,
        member_id: user.id,
        member_nickname: user.nickname,
        rating: this.rating,
        content: this.reviewText.trim(),
        created_at: new Date().toISOString()
      };

      try {
        await axios.post('http://localhost:3001/reviews', newReview);

        const res = await axios.get(`http://localhost:3001/reviews?mentor_id=${this.mentorId}`);
        const allReviews = res.data;

        const total = allReviews.reduce((sum, r) => sum + Number(r.rating), 0);
        const average = (total / allReviews.length).toFixed(1);

        await axios.patch(`http://localhost:3001/mentorlist/${this.mentorId}`, {
          rating: Number(average)
        });

        alert('리뷰가 성공적으로 제출되었습니다!');
        this.$router.push('/main');
      } catch (error) {
        console.error('리뷰 제출 실패:', error);
        alert('리뷰 제출 중 오류가 발생했습니다.');
      }
    }
  }
}
</script>



<style scoped>
.review-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  margin-bottom: 110px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 100px;
}

.submit-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}
</style>