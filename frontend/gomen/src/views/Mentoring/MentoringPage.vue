<template>
  <div class="mentoring-page">
    <h2 class="title">멘토링 공간</h2>

    <div class="cards">
      <MyMentorCard :mentor="mentor" />
      <MyTeamCard :teamMembers="teamMembers" :isTeam="isTeam" :leftoverQuestions="leftover" />
    </div>

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

// ✅ 공통 로직으로 분리
const fetchQuestionsWithNicknames = async (spaceId, page) => {
  const qnaRes = await api.get(`/questions?mentoring_space_id=${spaceId}&_page=${page}&_limit=3`)
  const allMembers = await api.get(`/mentoringMembers?mentoring_space_id=${spaceId}`)
  const allUsers = await api.get(`/users`)

  questions.value = qnaRes.data.map(q => {
    const member = allMembers.data.find(m => m.id === q.member_id)
    const user = allUsers.data.find(u => u.id === member?.user_id)
    return {
      ...q,
      nickname: user?.nickname || '익명'
    }
  })

  totalPage.value = Math.ceil(qnaRes.headers['x-total-count'] / 3)
}

onMounted(async () => {
  // 1. 멘토링 공간 가져오기
  const mentoring = await api.get(`/mentoringSpaces?userId=${user.id}`)
  const space = mentoring.data[0]

  // 2. 멘토 정보
  const mentorRes = await api.get(`/users/${space.mentor_id}`)
  mentor.value = mentorRes.data

  // 3. 팀원 정보
  const memberList = await api.get(`/mentoringMembers?mentoring_space_id=${space.mentoring_space_id}`)
  const resolved = await Promise.all(
  memberList.data
    .filter(m => String(m.user_id) !== String(user.id))  // ✅ 수정된 부분
    .map(async (m) => {
      const userRes = await api.get(`/users/${m.user_id}`)
      return {
        ...userRes.data,
        leftover_questions: m.leftover_questions
      }
    })
)
  teamMembers.value = resolved
  isTeam.value = resolved.length > 0

  // 4. 내 질문 잔여 개수
  const me = memberList.data.find(m => String(m.user_id) === String(user.id))
  leftover.value = me?.leftover_questions || 0

  // 5. 질문 목록 (닉네임 포함)
  await fetchQuestionsWithNicknames(space.mentoring_space_id, 1)
})

const changePage = async (page) => {
  currentPage.value = page
  const mentoring = await api.get(`/mentoringSpaces?userId=${user.id}`)
  const space = mentoring.data[0]
  await fetchQuestionsWithNicknames(space.mentoring_space_id, page)
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
  margin-bottom: 24px;
}
</style>
