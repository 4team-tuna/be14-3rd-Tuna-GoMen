<template>
    <div class="mentor-qna-page">
      <div class="header-row">
        <h2 class="page-title">멘토링 Q&A 전체 보기</h2>
        <RouterLink :to="`/mentoring`" class="back-button">멘토링 공간으로 돌아가기</RouterLink>
      </div>
  
      <div v-if="questions.length === 0" class="empty">등록된 질문이 없습니다.</div>
  
      <table class="qna-table" v-else>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(q, index) in paginatedQuestions" :key="q.id">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ q.question_content }}</td>
            <td>{{ q.writer_name || '알 수 없음' }}</td>
            <td>{{ formatDate(q.question_created_time) }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="pagination" v-if="totalPages > 1">
        <button
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const mentoringSpaceId = route.params.id
  const questions = ref([])
  const currentPage = ref(1)
  const pageSize = 10
  
  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
  }
  
  const paginatedQuestions = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return questions.value.slice(start, start + pageSize)
  })
  
  const totalPages = computed(() => Math.ceil(questions.value.length / pageSize))
  
  onMounted(async () => {
    try {
      const [questionRes, memberRes, userRes] = await Promise.all([
        axios.get(`http://localhost:3001/questions?mentoring_space_id=${mentoringSpaceId}`),
        axios.get(`http://localhost:3001/mentoringMembers?mentoring_space_id=${mentoringSpaceId}`),
        axios.get(`http://localhost:3001/users`)
      ])
      const members = memberRes.data
      const users = userRes.data
  
      const enriched = questionRes.data.map(q => {
        const member = members.find(m => String(m.user_id) === String(q.member_id))
        const user = member ? users.find(u => String(u.id) === String(member.user_id)) : null
        return {
          ...q,
          writer_name: user?.name || '알 수 없음'
        }
      })
  
      questions.value = enriched.sort((a, b) => new Date(b.question_created_time) - new Date(a.question_created_time))
    } catch (err) {
      console.error('질문 불러오기 실패:', err)
    }
  })
  </script>
  
  <style scoped>
  .mentor-qna-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Pretendard', sans-serif;
  }
  
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .page-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .back-button {
    font-size: 14px;
    color: #6c63ff;
    background-color: #f0f0ff;
    padding: 8px 14px;
    border-radius: 8px;
    text-decoration: none;
    border: 1px solid #d3d3ff;
    transition: 0.2s;
  }
  .back-button:hover {
    background-color: #e3e3ff;
  }
  
  .qna-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
  }
  .qna-table th,
  .qna-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  .qna-table th {
    background-color: #f0f0ff;
    font-weight: 600;
  }
  
  .empty {
    font-size: 14px;
    color: #888;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 8px;
  }
  .pagination button {
    padding: 6px 12px;
    border: 1px solid #ccc;
    background-color: white;
    cursor: pointer;
    border-radius: 4px;
  }
  .pagination button.active {
    background-color: #6c63ff;
    color: white;
    font-weight: bold;
  }
  </style>