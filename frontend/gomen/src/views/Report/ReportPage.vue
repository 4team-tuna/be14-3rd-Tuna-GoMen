<template>
    <div class="report-page">
      <h2>신고하기</h2>
      <p class="info-text">신고 대상: <strong>{{ displayType }}</strong> (ID: {{ targetId }})</p>
      <textarea v-model="reason" placeholder="신고 사유를 자세히 작성하세요." />
      <button class="submit-btn" @click="submitReport">제출하기</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const router = useRouter()
  
  const type = route.query.type || 'unknown'
  const targetId = route.query.id || null
  const reason = ref('')
  
  const displayTypeMap = {
    post: '게시글',
    comment: '댓글',
    user: '회원'
  }
  const displayType = displayTypeMap[type] || '알 수 없음'
  
  const submitReport = async () => {
    if (!reason.value.trim()) {
      alert('신고 사유를 작성해주세요.')
      return
    }
  
    try {
      await axios.post('http://localhost:3001/reports', {
        type,
        reason: reason.value,
        postId: type === 'post' ? targetId : null,
        commentId: type === 'comment' ? targetId : null,
        targetUserId: type === 'user' ? targetId : null,
        reporterId: 999 // 🔐 실제 로그인한 유저 ID로 교체 필요
      })
  
      alert('신고가 접수되었습니다.')
      router.back()
    } catch (error) {
      console.error('신고 실패:', error)
      alert('신고 처리 중 오류가 발생했습니다.')
    }
  }
  </script>
  
  <style scoped>
  .report-page {
    max-width: 520px;
    margin: 60px auto;
    padding: 20px;
    border: 2px solid #ececec;
    border-radius: 12px;
    background-color: #fafafa;
  }
  
  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .info-text {
    font-size: 14px;
    color: #777;
    margin-bottom: 12px;
  }
  
  textarea {
    width: 100%;
    height: 180px;
    padding: 14px;
    border: 1px solid #ccc;
    border-radius: 10px;
    resize: none;
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 16px;
  }
  
  .submit-btn {
    float: right;
    background-color: #7c72f0;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-btn:hover {
    background-color: #5d5fef;
  }
  </style>
  