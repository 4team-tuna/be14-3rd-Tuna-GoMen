<template>
    <div class="question-list">
      <div
        class="question-card"
        v-for="question in questions"
        :key="question.question_id"
      >
        <div class="question-header">
          <p class="author">작성자: {{ getUserNickname(question.member_id) }}</p>
          <p class="time">{{ formatTime(question.question_created_time) }}</p>
        </div>
        <p class="content">{{ question.question_content }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import api from '@/api'
  import { useUserStore } from '@/stores/user'
  
  const props = defineProps({
    questions: {
      type: Array,
      required: true,
    }
  })
  
  const nicknames = ref({})
  
  const getUserNickname = (userId) => {
    return nicknames.value[userId] || `사용자 ${userId}`
  }
  
  const fetchNicknames = async () => {
    const uniqueUserIds = [...new Set(props.questions.map(q => q.member_id))]
    const results = await Promise.all(
      uniqueUserIds.map(id => api.get(`/users/${id}`))
    )
    results.forEach(res => {
      const user = res.data
      nicknames.value[user.user_id] = user.nickname
    })
  }
  
  const formatTime = (timeStr) => {
    const date = new Date(timeStr)
    return date.toLocaleString('ko-KR', { hour12: false })
  }
  
  watch(() => props.questions, fetchNicknames, { immediate: true })
  </script>
  
  <style scoped>
  .question-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .question-card {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
  .question-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .author {
    font-weight: bold;
    color: #444;
  }
  .time {
    font-size: 12px;
    color: #888;
  }
  .content {
    font-size: 15px;
    color: #333;
  }
  </style>
  