<template>
    <table class="question-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>글쓴이</th>
          <th>등록일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(q, index) in questions" :key="q.id">
          <td>{{ startIndex + index }}</td>
          <td>{{ q.question_content }}</td>
          <td>{{ getNickname(q.member_id) }}</td>
          <td>{{ formatDate(q.question_created_time) }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import api from '@/api'
  
  const props = defineProps({
    questions: Array,
    startIndex: Number
  })
  
  const nicknames = ref({})
  
  const getNickname = (memberId) => {
    return nicknames.value[memberId] || `사용자 ${memberId}`
  }
  
  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return `${String(d.getFullYear()).slice(2)}.${String(d.getMonth()+1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }
  
  const fetchNicknames = async () => {
    const ids = [...new Set(props.questions.map(q => q.member_id))]
    const resList = await Promise.all(ids.map(id => api.get(`/users/${id}`)))
    resList.forEach(res => {
      nicknames.value[res.data.id] = res.data.nickname
    })
  }
  
  watch(() => props.questions, fetchNicknames, { immediate: true })
  </script>
  
  <style scoped>
  .question-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  margin-top: 24px;
  background-color: white;
  font-size: 14px;
  color: #333;
}

.question-table thead {
  background-color: #f5f5f5;
  font-weight: 600;
  text-align: left;
}

.question-table th, .question-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
}

.question-table th:first-child,
.question-table td:first-child {
  text-align: center;
  width: 60px;
}

.question-table th:nth-child(2),
.question-table td:nth-child(2) {
  width: 55%;
}

.question-table th:nth-child(3),
.question-table td:nth-child(3) {
  width: 20%;
  text-align: center;
}

.question-table th:nth-child(4),
.question-table td:nth-child(4) {
  width: 15%;
  text-align: center;
}

.question-table tbody tr:hover {
  background-color: #f9f9f9;
  transition: 0.2s ease;
}

  </style>
  