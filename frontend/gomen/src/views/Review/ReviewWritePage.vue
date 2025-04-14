<template>
    <div>
      <div class="review-container">
        <div class="review-header">
          <h2>별점 리뷰 작성</h2>
          <button class="submit-button">제출하기</button>
        </div>
  
        <ReviewTextarea />
        <StarRating />
      </div>
    </div>
  </template>
  
  <script>
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