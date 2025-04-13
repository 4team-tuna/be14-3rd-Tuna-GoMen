<template>
    <div class="mentoring-page">
      <h2 class="title">멘토링 공간 (멘토)</h2>
  
      <div class="cards">
        <MyTeamCard :teamMembers="teamMembers" :isTeam="isTeam" :leftoverQuestions="null" />
      </div>
  
      <QuestionList :questions="questions" />
  
      <Pagination :current="currentPage" :total="totalPage" @change="changePage" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import MyTeamCard from '@/components/mentoring/MyTeamCard.vue'
  import QuestionList from '@/components/mentoring/QuestionList.vue'
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
    // 멘토링 공간 가져오기 (멘토 기준)
    const res = await api.get(`/mentoringSpaces?mentor_id=${user.id}`)
    const space = res.data[0]
    if (!space) return
  
    // 팀 멤버 불러오기
    const memberList = await api.get(`/mentoringMembers?mentoring_space_id=${space.mentoring_space_id}`)
  
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
    isTeam.value = resolved.length > 1 // 멘토 혼자 X
  
    await fetchQuestionsWithNicknames(space.mentoring_space_id, 1)
  })
  
  const changePage = async (page) => {
    currentPage.value = page
    const res = await api.get(`/mentoringSpaces?mentor_id=${user.id}`)
    const space = res.data[0]
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
  