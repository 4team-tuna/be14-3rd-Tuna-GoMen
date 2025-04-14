<template>
    <div class="report-form">
      <h2>🚨 신고하기</h2>
      <p>대상 ID: {{ targetUserId }}</p>
      <textarea v-model="reason" placeholder="신고 사유를 입력해주세요" rows="5"></textarea>
      <button @click="submitReport">제출</button>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { ref } from 'vue'
  import axios from 'axios'
  
  const route = useRoute()
  const router = useRouter()
  const reason = ref('')
  const myId = localStorage.getItem('userId')
  
  const { postId, targetUserId, type } = route.query
  
  const submitReport = async () => {
    if (!reason.value.trim()) {
      alert('신고 사유를 입력해주세요.')
      return
    }
  
    try {
      await axios.post('http://localhost:3001/reports', {
        postId,
        reporterId: myId,
        targetUserId,
        type,
        reason: reason.value,
        reportedAt: new Date().toISOString()
      })
      alert('신고가 접수되었습니다.')
      router.back()
    } catch (err) {
      console.error('신고 실패:', err)
      alert('신고 처리 중 오류가 발생했습니다.')
    }
  }
  </script>
  
  <style scoped>
  .report-form {
  max-width: 500px;
  margin: 40px auto; /* ✅ 중앙 정렬 핵심 */
  padding: 20px;
  background-color: #f9f9fb;
  border: 1px solid #ddd;
  border-radius: 12px;
}

  textarea {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 6px;
    resize: vertical;
  }
  button {
    margin-top: 10px;
    padding: 10px 16px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  </style>
  