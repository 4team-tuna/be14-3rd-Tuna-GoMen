리뷰
<template>
    <div>
      <div class="review-container">
        <div class="review-header">
          <h2>별점 리뷰 작성</h2>
          <button class="submit-button" @click="submitReview">제출하기</button>
        </div>
  
        <ReviewTextarea />
        <StarRating />
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter, useRoute } from 'vue-router' //
  import HeaderComponent from '@/components/common/Header.vue'
  import FooterComponent from '@/components/common/Footer.vue'
  import ReviewTextarea from '@/components/Review/ReviewTextArea.vue'
  import StarRating from '@/components/Review/StarRating.vue'
  
  export default {
    components: {
      HeaderComponent,
      FooterComponent,
      ReviewTextarea,
      StarRating,
    },
    setup() {
    const router = useRouter()
    const route = useRoute()

    const submitReview = async () => {
      try {
        alert('✅ 리뷰가 제출되었습니다.')
        router.push('/main')
      } catch (err) {
        console.error('리뷰 제출 실패:', err)
        alert('⚠️ 리뷰 제출 중 오류가 발생했어요.')
      }
    }

    return { submitReview }
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