<template>
    <div class="question-preview">
      <div class="question" v-for="q in questions" :key="q.id">
        <h4>{{ q.question_content.slice(0, 20) }}...</h4>
        <p>{{ formatDate(q.question_created_time) }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({ questions: Array })
  
  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
  }
  </script>
  
  <style scoped>
  .question {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
  }
  h4 {
    font-weight: bold;
  }
  p {
    font-size: 12px;
    color: #999;
  }
  </style>
  