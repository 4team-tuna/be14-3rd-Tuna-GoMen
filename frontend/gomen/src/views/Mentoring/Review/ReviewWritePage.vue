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
import ReviewTextarea from '@/components/mentoring/Review/ReviewTextArea.vue'
import StarRating from '@/components/mentoring/Review/StarRating.vue'

export default {
  components: {
    ReviewTextarea,
    StarRating,
  },
  data() {
    return {
      reviewText: '',
      rating: 0,
    }
  },
  methods: {
    handleSubmit() {
      const isReviewValid = this.reviewText.trim().length >= 20;
      const isRatingValid = this.rating >= 1;

      if (!isReviewValid && !isRatingValid) {
        alert('리뷰를 20자 이상 입력하고 별점을 입력해주세요.');
      } else if (!isReviewValid) {
        alert('리뷰는 최소 20자 이상 작성해야 합니다.');
      } else if (!isRatingValid) {
        alert('별점을 입력해주세요.');
      } else {
        alert('리뷰가 성공적으로 제출되었습니다!');
        // 여기에 실제 제출 로직 추가하면 됨
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
