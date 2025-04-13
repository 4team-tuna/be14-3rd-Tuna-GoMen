<template>
    <div class="mentor-card">
      <p class="label">나의 멘토</p>
      <img :src="getImageUrl(mentor.image)" alt="멘토 이미지" class="mentor-img" />
      <p class="mentor-name">{{ mentor.nickname }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    mentor: {
      type: Object,
      required: true
    }
  })
  
  function getImageUrl(path) {
    try {
      return new URL(`@/assets/${path || 'icon-basic-user.png'}`, import.meta.url).href
    } catch {
      return new URL('@/assets/icon-basic-user.png', import.meta.url).href
    }
  }
  </script>
  
  <style scoped>
  .mentor-card {
    flex: 1;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    background-color: white;
  }
  
  .label {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  .mentor-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .mentor-name {
    font-size: 16px;
    font-weight: bold;
  }
  </style>
  