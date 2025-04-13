<template>
  <div class="mentee-view">
    <h2 class="title">멘토링 공간</h2>

    <!-- 멘토 & 팀 구성 -->
    <div class="top-section" v-if="mentor && teamMembers.length">
      <MyMentorCard :mentor="mentor" />
      <MyTeamCard :teamMembers="teamMembers" :isTeam="isTeam" />
    </div>

    <!-- 연장하기 버튼 -->
    <div class="status-bar">
      <button
        class="extension-btn"
        :disabled="leftoverQuestions > 0"
        @click="requestExtension"
      >
        연장하기
      </button>
      <span class="leftover-text">
        남은 질문 개수: <b>{{ leftoverQuestions }}</b>
      </span>
    </div>

    <!-- Q&A 섹션 -->
    <div class="qna-header">
      <h3>Q&A</h3>
      <button class="more-btn" @click="goToQnaPage">더보기 &gt;</button>
    </div>

    <div class="questions">
      <QuestionList :questions="questions" />
    </div>

    <Pagination :current="currentPage" :total="totalPage" @change="changePage" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MyMentorCard from '@/components/mentoring/MyMentorCard.vue'
import MyTeamCard from '@/components/mentoring/MyTeamCard.vue'
import QuestionList from '@/components/mentoring/QuestionList.vue'
import Pagination from '@/components/mentoring/Pagination.vue'
import api from '@/api'

const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))

const mentor = ref({})
const teamMembers = ref([])
const isTeam = ref(false)
const leftoverQuestions = ref(0)

const questions = ref([])
const currentPage = ref(1)
const totalPage = ref(1)

const mentoringSpaceId = ref(null)

const fetchQuestions = async (spaceId, page) => {
  const res = await api.get(`/questions?mentoring_space_id=${spaceId}&member_id=${user.id}&_page=${page}&_limit=3`)
  questions.value = res.data
  totalPage.value = Math.ceil(res.headers['x-total-count'] / 3)
}

onMounted(async () => {
  const myMemberships = await api.get(`/mentoringMembers?user_id=${user.id}`)
  const member = myMemberships.data[0]
  if (!member) return

  mentoringSpaceId.value = member.mentoring_space_id
  leftoverQuestions.value = member.leftover_questions

  const spaceRes = await api.get(`/mentoringSpaces/${member.mentoring_space_id}`)
  const mentorRes = await api.get(`/users/${spaceRes.data.mentor_id}`)
  mentor.value = mentorRes.data

  const allMembers = await api.get(`/mentoringMembers?mentoring_space_id=${member.mentoring_space_id}`)
  const resolved = await Promise.all(
    allMembers.data.map(async (m) => {
      const u = await api.get(`/users/${m.user_id}`)
      return {
        ...u.data,
        leftover_questions: m.leftover_questions
      }
    })
  )
  teamMembers.value = resolved
  isTeam.value = resolved.length > 1

  await fetchQuestions(member.mentoring_space_id, currentPage.value)
})

const changePage = async (page) => {
  currentPage.value = page
  await fetchQuestions(mentoringSpaceId.value, page)
}

const requestExtension = async () => {
  if (leftoverQuestions.value > 0) return
  alert('연장 요청이 전송되었습니다.')
}

const goToQnaPage = () => {
  router.push('/mentee/qna') // 너의 라우팅에 맞게 수정 가능
}
</script>

<style scoped>
.mentee-view {
  max-width: 1000px;
  margin: auto;
  padding: 40px 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}
.top-section {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fafafa;
}
.extension-btn {
  background-color: #5865F2;
  color: white;
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.extension-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.leftover-text {
  font-size: 14px;
  color: #333;
}
.qna-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.qna-header h3 {
  font-size: 18px;
  font-weight: bold;
}
.more-btn {
  background: none;
  border: none;
  font-size: 14px;
  color: #5865F2;
  cursor: pointer;
}
.more-btn:hover {
  text-decoration: underline;
}
.questions {
  margin-bottom: 32px;
}
</style>
