<template>
  <div class="mentoring-page">
    <h2 class="title">멘토링 공간 (멘토)</h2>

    <!-- 팀 정보 카드 -->
    <section class="team-card">
      <h3>나의 팀</h3>
      <div class="team-members">
        <div class="profile" v-for="member in teamMembers" :key="member.id">
          <img src="@/assets/icon-basic-user.png" alt="프로필" />
          <p>{{ member.nickname }}</p>
        </div>
      </div>
    </section>

    <!-- 질문 리스트 -->
    <section class="question-list">
      <div
        class="question-card"
        v-for="question in questions"
        :key="question.id"
      >
        <div class="q-header">
          <span class="writer">작성자: {{ question.nickname }}</span>
          <span class="time">{{ formatTime(question.question_created_time) }}</span>
        </div>
        <p class="content">{{ question.question_content }}</p>
      </div>
    </section>

    <!-- 페이지네이션 -->
    <Pagination :current="currentPage" :total="totalPage" @change="changePage" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Pagination from '@/components/mentoring/Pagination.vue'
import api from '@/api'

const teamMembers = ref([])
const isTeam = ref(false)

const questions = ref([])
const currentPage = ref(1)
const totalPage = ref(1)

const user = JSON.parse(localStorage.getItem('user'))

const fetchQuestionsWithNicknames = async (spaceId, page) => {
  const qnaRes = await api.get(`/questions?mentoring_space_id=${spaceId}&_page=${page}&_limit=3`)
  const allMembers = await api.get(`/mentoringMembers?mentoring_space_id=${spaceId}`)
  const allUsers = await api.get(`/users`)

  questions.value = qnaRes.data.map((q) => {
    const member = allMembers.data.find(m => Number(m.user_id) === Number(q.member_id))
    const user = allUsers.data.find(u => Number(u.id) === Number(q.member_id))
    return {
      ...q,
      nickname: user?.nickname || '익명'
    }
  })

  totalPage.value = Math.ceil(qnaRes.headers['x-total-count'] / 3)
}

onMounted(async () => {
  const res = await api.get(`/mentoringSpaces?mentor_id=${user.id}`)
  const space = res.data[0]
  if (!space) return

  const memberList = await api.get(`/mentoringMembers?mentoring_space_id=${space.id}`)

  const resolved = await Promise.all(
    memberList.data.map(async (m) => {
      const userRes = await api.get(`/users/${m.user_id}`)
      return {
        ...userRes.data,
        leftover_questions: m.leftover_questions
      }
    })
  )

  teamMembers.value = resolved
  isTeam.value = resolved.length > 1
  await fetchQuestionsWithNicknames(space.id, 1)
})

const changePage = async (page) => {
  currentPage.value = page
  const res = await api.get(`/mentoringSpaces?mentor_id=${user.id}`)
  const space = res.data[0]
  await fetchQuestionsWithNicknames(space.id, page)
}

const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}
</script>

<style scoped>
.mentoring-page {
  max-width: 1000px;
  margin: auto;
  padding: 40px 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}
.team-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 40px;
}
.team-card h3 {
  font-size: 18px;
  margin-bottom: 16px;
}
.team-members {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
}
.profile img {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  object-fit: cover;
  margin-bottom: 6px;
}
.question-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}
.question-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 16px;
  background-color: #fff;
}
.q-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}
.content {
  font-size: 16px;
}
</style>
