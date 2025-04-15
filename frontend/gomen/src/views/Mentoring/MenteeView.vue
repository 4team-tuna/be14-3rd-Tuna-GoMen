<template>
  <div class="mentee-view">
    <h2 class="title">멘토링 공간</h2>

    <!-- 멘토, 팀원 카드 -->
    <div class="top-section" v-if="mentor && teamMembers.length">
      <MyMentorCard :mentor="mentor" />
      <MyTeamCard :teamMembers="teamMembers" :isTeam="isTeam" />
    </div>

    <div class="status-bar">
      <button
        v-if="allUsedUp && !extensionRequested"
        class="extension-btn"
        @click="requestExtension"
        >연장하기</button>
        <span v-else class="extension-info">
          {{ extensionRequested ? '연장 요청됨' : '모든 질문을 소진해야 연장 가능해요.' }}
        </span>
        <span class="leftover-text">
          남은 질문 개수: <b>{{ leftoverQuestions }}</b>
        </span>
    </div>

    <QuestionForm
      v-if="mentoringSpaceId && mentoringMemberId !== null"
      :mentoringSpaceId="mentoringSpaceId"
      :mentoringMemberId="mentoringMemberId"
      :memberId="user.id"
      :leftoverQuestions="leftoverQuestions"
      @submitted="fetchAll"
    />

    <div class="qna-header">
      <h3>Q&A</h3>
      <button class="more-btn" @click="goToQnaPage">더보기 &gt;</button>
    </div>

    <div class="questions">
      <QuestionList :questions="questions" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MyMentorCard from '@/components/mentoring/MyMentorCard.vue'
import MyTeamCard from '@/components/mentoring/MyTeamCard.vue'
import QuestionList from '@/components/mentoring/QuestionList.vue'
import QuestionForm from '@/components/mentoring/QuestionForm.vue'
import api from '@/api'

// ✅ MentoringPage.vue에서 전달된 spaceId props 받기
const props = defineProps({
  spaceId: {
    type: [String, Number],
    required: true
  }
})

const mentoringSpaceId = props.spaceId  // 이제 이걸로 사용

const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))

const mentor = ref({})
const teamMembers = ref([])
const isTeam = ref(false)
const leftoverQuestions = ref(0)
const mentoringMemberId = ref(null)
const extensionRequested = ref(false)

const questions = ref([])


// 질문 조회
const fetchQuestions = async (spaceId) => {
  const res = await api.get(`/questions?mentoring_space_id=${spaceId}`)

  const sorted = res.data
    .sort((a, b) => new Date(b.question_created_time) - new Date(a.question_created_time))
    .slice(0, 3)

  questions.value = sorted
}

// 멘토링 멤버
const fetchMemberInfo = async () => {
  const membershipsRes = await api.get(`/mentoringMembers?mentoring_space_id=${mentoringSpaceId}&user_id=${user.id}`)
  console.log('🧪 멘티 멤버 확인:', membershipsRes.data)
  const member = membershipsRes.data[0]
  if (!member) return null

  mentoringMemberId.value = member.id
  leftoverQuestions.value = member.leftover_questions


  const spaceRes = await api.get(`/mentoringSpaces/${member.mentoring_space_id}`)

  extensionRequested.value = spaceRes.data.extension_requested === 'Y'

  return member
}

// 연장 요청 조건(전체 잔여 질문 갯수 0)
const allUsedUp = ref(false)

const fetchAll = async () => {
  const member = await fetchMemberInfo()
  if (!member) return


  await fetchQuestions(member.mentoring_space_id)
  // extensionRequested : 연장 요청 여부
  const spaceRes = await api.get(`/mentoringSpaces/${member.mentoring_space_id}`)
  extensionRequested.value = spaceRes.data.extension_requested === 'Y'

  // mentor : 멘토 정보

  const mentorRes = await api.get(`/users/${spaceRes.data.mentor_id}`)
  mentor.value = mentorRes.data

  const allMembers = await api.get(`/mentoringMembers?mentoring_space_id=${mentoringSpaceId}`)
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


  // 💡 모든 멤버의 leftover_questions 총합
  const totalLeft = allMembers.data.reduce((sum, m) => sum + m.leftover_questions, 0)
  allUsedUp.value = totalLeft === 0
}

onMounted(async() => {
  console.log('🧪 MenteeView mentoringSpaceId:', mentoringSpaceId)
  await fetchAll()
  console.log('✅ mentor:', mentor.value)
  console.log('✅ teamMembers:', teamMembers.value)
})

// ✅ 연장 요청 처리

const requestExtension = async () => {
  if (leftoverQuestions.value > 0 || extensionRequested.value) return

  try {
    await api.patch(`/mentoringSpaces/${mentoringSpaceId}`, {
      extension_requested: 'Y'
    })
    extensionRequested.value = true
    alert('연장 요청이 전송되었습니다.')
  } catch (e) {
    console.error(e)
    alert('연장 요청에 실패했습니다.')
  }
}

const goToQnaPage = () => {
  router.push('/mentee/qna')
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
