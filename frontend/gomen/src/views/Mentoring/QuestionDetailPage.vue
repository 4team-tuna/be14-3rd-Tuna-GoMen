<template>
    <div class="question-detail-page">
      <h2 class="question-title">{{ question.question_content }}</h2>
      <div class="meta">
        <span class="author">작성자: {{ nickname }}</span>
        <span class="time">{{ formatDate(question.question_created_time) }}</span>
      </div>
      <div class="question-body">
        {{ question.question_detail || '상세 내용이 없습니다.' }}
      </div>
  
      <hr />
  
      <AnswerList :questionId="question.id" />
      <AnswerForm :questionId="question.id" @submitted="reloadAnswers" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import api from '@/api'
  import AnswerList from '@/components/mentoring/AnswerList.vue'
  import AnswerForm from '@/components/mentoring/AnswerForm.vue'
  
  const route = useRoute()
  const questionId = route.params.questionId
  
  const question = ref({})
  const nickname = ref('')
  
  const fetchQuestion = async () => {
    const res = await api.get(`/questions/${questionId}`)
    question.value = res.data
  
    // 작성자 닉네임도 불러오기
    const userRes = await api.get(`/users/${res.data.member_id}`)
    nickname.value = userRes.data.nickname
  }
  
  onMounted(fetchQuestion)
  
  const reloadAnswers = () => {
    // AnswerList 쪽에서 watch로 questionId props 감지하면 자동 갱신됨
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${d.getHours()}시 ${d.getMinutes()}분`
    }
  </script>
  
  <style scoped>
  .question-detail-page {
    max-width: 1000px;
    margin: auto;
    padding: 40px 20px;
  }
  .question-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .meta {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
  }
  .question-body {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 24px;
  }
  hr {
    margin: 24px 0;
    border: none;
    border-top: 1px solid #eee;
  }
  </style>
  