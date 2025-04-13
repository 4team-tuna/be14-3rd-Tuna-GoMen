<template>
    <div class="answer-list">
      <h3 class="answer-title">답변 목록</h3>
      <div v-if="answers.length === 0" class="empty">아직 등록된 답변이 없습니다.</div>
      <div v-else>
        <div
          v-for="answer in answers"
          :key="answer.id"
          class="answer-card"
        >
          <div class="answer-meta">
            <span class="nickname">{{ getNickname(answer.mentor_id) }}</span>
            <span class="time">{{ formatDate(answer.answer_created_time) }}</span>
          </div>
          <p class="content">{{ answer.answer_content }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import api from '@/api'
  
  const props = defineProps({
    questionId: {
      type: String,
      required: true
    }
  })
  
  const answers = ref([])
  const nicknames = ref({})
  
  const fetchAnswers = async () => {
    const res = await api.get(`/answers?question_id=${props.questionId}`)
    answers.value = res.data
  
    const mentorIds = [...new Set(res.data.map(a => a.mentor_id))]
    const users = await Promise.all(mentorIds.map(id => api.get(`/users/${id}`)))
    users.forEach(user => {
      nicknames.value[user.data.id] = user.data.nickname
    })
  }
  
  const getNickname = (mentorId) => {
    return nicknames.value[mentorId] || `멘토 ${mentorId}`
  }
  
  const formatDate = (str) => {
    const d = new Date(str)
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} ${d.getHours()}시`
  }
  
  onMounted(fetchAnswers)
  watch(() => props.questionId, fetchAnswers)
  </script>
  
  <style scoped>
  .answer-list {
    margin-top: 24px;
  }
  .answer-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .empty {
    font-size: 14px;
    color: #888;
  }
  .answer-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  }
  .answer-meta {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin-bottom: 8px;
    color: #666;
  }
  .content {
    font-size: 14px;
    line-height: 1.5;
  }
  </style>
  