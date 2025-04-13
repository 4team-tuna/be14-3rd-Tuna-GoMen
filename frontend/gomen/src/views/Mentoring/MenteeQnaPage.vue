<template>
    <div class="mentee-qna-page">
      <h2 class="title">나의 Q&A</h2>
  
      <QuestionForm
        :mentoringSpaceId="mentoringSpaceId"
        :memberId="user.id"
        @submitted="handleNewQuestion"
      />
  
      <QuestionTable :questions="questions" :startIndex="(currentPage - 1) * 10 + 1" />
  
      <Pagination
        :current="currentPage"
        :total="totalPage"
        @change="handlePageChange"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '@/api'
  import QuestionForm from '@/components/mentoring/QuestionForm.vue'
  import QuestionTable from '@/components/mentoring/QuestionTable.vue'
  import Pagination from '@/components/mentoring/Pagination.vue'
  
  const user = JSON.parse(localStorage.getItem('user'))
  
  const mentoringSpaceId = ref(null)
  const questions = ref([])
  const currentPage = ref(1)
  const totalPage = ref(1)
  
  const fetchQuestions = async (page = 1) => {
    const allRes = await api.get(`/questions?mentoring_space_id=${mentoringSpaceId.value}&_sort=question_created_time&_order=desc`)
    const allQuestions = allRes.data

    const paged = allQuestions.slice((page - 1) * 10, page * 10)

    questions.value = paged
    totalPage.value = Math.ceil(allQuestions.length / 10)

    }
  
  const handlePageChange = async (page) => {
    currentPage.value = page
    await fetchQuestions(page)
  }
  
  const handleNewQuestion = async () => {
    await fetchQuestions(currentPage.value)
  }
  
  onMounted(async () => {
    const memberRes = await api.get(`/mentoringMembers?user_id=${user.id}`)
    const member = memberRes.data[0]
    if (!member) return
    mentoringSpaceId.value = member.mentoring_space_id
    await fetchQuestions(currentPage.value)
  })
  </script>
  
  <style scoped>
  .mentee-qna-page {
    max-width: 1000px;
    margin: auto;
    padding: 40px 20px;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  </style>
  