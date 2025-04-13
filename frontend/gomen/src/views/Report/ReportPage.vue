<template>
  <div class="report-page">
    <h2>신고하기</h2>
    <p class="info-text">신고 대상: <strong>{{ displayType }}</strong> (ID: {{ targetId }})</p>

    <textarea
      v-model="reason"
      placeholder="신고 사유를 자세히 작성하세요."
      class="report-textarea"
    />

    <div class="button-wrapper">
      <button class="submit-btn" @click="submitReport">제출하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const type = route.query.type || 'unknown'
const targetId = route.query.id || ''
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
      reporterId: 999
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
  max-width: 600px;
  margin: 60px auto;
  padding: 30px;
  border: 1px solid #e1e1e1;
  border-radius: 16px;
  background-color: #fafafa;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);

  display: flex;
  flex-direction: column;
  align-items: stretch; /* ← 중앙 정렬 대신 전체 너비로 맞추기 */
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
}

.info-text {
  font-size: 15px;
  color: #555;
  margin-bottom: 12px;
}

.report-textarea {
  width: 100%; /* 전체 너비 */
  height: 160px;
  padding: 14px;
  border: 1.5px solid #a4a4ff;
  border-radius: 10px;
  font-size: 14px;
  resize: none;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.submit-btn {
  background-color: #7c72f0;
  color: white;
  padding: 10px 22px;
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

