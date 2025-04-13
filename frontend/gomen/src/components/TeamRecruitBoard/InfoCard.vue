<template>
    <div class="team-info-card">
      <h2 class="card-title">팀 소개</h2>
      <p class="card-content">{{ teamIntroduce }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    teamIntroduce: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .team-info-card {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    margin-top: 2rem;
  }
  
  .card-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: #374151;
  }
  
  .card-content {
    font-size: 1rem;
    color: #4b5563;
    line-height: 1.6;
  }
  </style>
  