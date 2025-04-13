<template>
  <div class="mentoring-page">
    <h2 class="title">멘토링 공간</h2>

    <div class="cards">
      <MyMentorCard :mentor="mentor" />
      <MyTeamCard :teamMembers="teamMembers" :isTeam="isTeam" />
    </div>

    <p class="left-question">남은 질문 개수 : {{ leftover }}</p>

    <QuestionList :questions="questions" />

    <Pagination :current="currentPage" :total="totalPage" @change="changePage" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MyMentorCard from '@/components/mentoring/MyMentorCard.vue'
import MyTeamCard from '@/components/mentoring/MyTeamCard.vue'
import QuestionList from '@/components/mentoring/QuestionList.vue'
import Pagination from '@/components/mentoring/Pagination.vue'
import api from '@/api'

const mentor = ref({})
const teamMembers = ref([])
const leftover = ref(0)
const isTeam = ref(false)

const questions = ref([])
const currentPage = ref(1)
const totalPage = ref(1)

const user = JSON.parse(localStorage.getItem('user'))

onMounted(async () => {
  // 1. 멘토링 공간 가져오기
  const mentoring = await api.get(`/mentoringSpaces?userId=${user.id}`)
  const space = mentoring.data[0]

  // 2. 멘토 정보
  const mentorRes = await api.get(`/users/${space.mentor_id}`)
  mentor.value = mentorRes.data

  // 3. 팀원 정보
  const memberList = await api.get(`/mentoringMembers?mentoringSpaceId=${space.mentoring_space_id}`)

  const resolved = await Promise.all(
    memberList.data
      .filter(m => m.user_id !== user.id)
      .map(async (m) => {
        const userRes = await api.get(`/users/${m.user_id}`)
        return {
          ...userRes.data,
          leftover_questions: m.leftover_questions,
        }
      })
  )

  teamMembers.value = resolved
  isTeam.value = resolved.length > 0

  // 4. 내 질문 잔여 개수
  const me = memberList.data.find(m => m.user_id === user.id)
  leftover.value = me?.leftover_questions || 0

  // 5. 질문 목록
  const qnaRes = await api.get(`/questions?mentoringSpaceId=${space.mentoring_space_id}&_page=1&_limit=3`)
  questions.value = qnaRes.data
  totalPage.value = Math.ceil(qnaRes.headers['x-total-count'] / 3)
})

const changePage = async (page) => {
  currentPage.value = page
  const mentoring = await api.get(`/mentoringSpaces?userId=${user.id}`)
  const space = mentoring.data[0]

  const res = await api.get(`/questions?mentoringSpaceId=${space.mentoring_space_id}&_page=${page}&_limit=3`)
  questions.value = res.data
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
.cards {
  display: flex;
  gap: 24px;
  margin-bottom: 8px;
}
.left-question {
  text-align: right;
  font-weight: bold;
  color: #5d5fef;
  margin-bottom: 24px;
}
</style>
