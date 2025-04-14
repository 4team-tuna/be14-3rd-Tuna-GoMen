<template>
    <div class="star-container">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        :class="{ filled: star <= currentRating }"
        @click="setRating(star)"
      >
        ★
      </span>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentRating: 0,
      };
    },
    methods: {
      setRating(star) {
        this.currentRating = star;
      },
    },
  };
  </script>
  
  <style scoped>
  .star-container {
    display: flex;
    justify-content: center;
    margin-top: 60px; /* ✅ 간격을 넉넉하게 */
  }
  
  .star {
    font-size: 80px; /* ✅ 별 크기 키움 */
    color: lightgray;
    margin: 0 10px; /* 별 사이 간격 */
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .star.filled {
    color: gold;
  }
  </style>
  