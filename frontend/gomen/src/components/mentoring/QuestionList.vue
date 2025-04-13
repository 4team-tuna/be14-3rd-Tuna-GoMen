<template>
  <div class="question-list">
    <div
      class="question-card"
      v-for="question in questions"
      :key="question.id"
    >
      <div class="q-header">
        <span class="writer">
          작성자: {{ getUserNickname(question.member_id) }}
        </span>
        <span class="time">{{ formatDate(question.question_created_time) }}</span>
      </div>
      <p class="content">{{ question.question_content }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import api from '@/api'

const props = defineProps({
  questions: {
    type: Array,
    required: true,
  }
})

const nicknames = ref({})

// ✅ 키 접근과 저장을 모두 문자열로 통일
const getUserNickname = (userId) => {
  return nicknames.value[String(userId)] || `사용자 ${userId}`
}
const fetchNicknames = async () => {
  const uniqueUserIds = [...new Set(props.questions.map(q => q.member_id))]

  if (uniqueUserIds.length === 0) return

  console.log('📦 유저 ID 목록:', uniqueUserIds)

  try {
    const results = await Promise.all(
      uniqueUserIds.map(id => api.get(`/users/${id}`))
    )

    results.forEach(res => {
      const user = res.data
      console.log('🎯 사용자 응답:', user)
      nicknames.value[String(user.id)] = user.nickname 
    })

    console.log('✅ 최종 nickname 캐시:', nicknames.value)
  } catch (err) {
    console.error('❌ 닉네임 조회 실패:', err)
  }
}

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()} ${d.getHours()}시 ${d.getMinutes()}분`
}

// ✅ 질문 목록이 바뀌면 닉네임 자동 갱신
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
.q-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.writer {
  font-weight: 500;
  font-size: 14px;
  color: #333;
}
.time {
  font-size: 13px;
  color: #888;
}
.content {
  font-size: 15px;
  color: #333;
  line-height: 1.5;
}
</style>
