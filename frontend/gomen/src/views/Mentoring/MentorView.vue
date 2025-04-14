<template>
  <div class="mentor-view">
    <h2 class="title">멘토링 공간</h2>

    <!-- 멘토, 멘티 잔여 질문 카드 -->
    <div class="top-section" v-if="mentor && teamMembers.length">
      <!-- 멘토 박스 -->
      <div class="mentor-box">
        <MyMentorCard :mentor="mentor" />
      </div>

      <!-- 멘티 잔여 질문 횟수 박스 -->
      <div class="team-box">
        <div class="team-title">멘티 질문 잔여 횟수</div>
        <ul class="team-list">
          <li
            v-for="member in teamMembers"
            :key="member.id"
            class="team-item"
          >
            <span class="name">{{ member.name }}</span>
            <span class="count">{{ member.leftover_questions }}회 남음</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Q&A 섹션 -->
    <div class="qna-section">
      <div class="qna-title-row">
        <h3 class="section-title">Q&A</h3>
        <RouterLink :to="`/mentoring/${mentoringSpaceId}/qna/mentor`" class="more-btn">더보기 ></RouterLink>
      </div>
      <div v-if="visibleQuestions.length === 0" class="empty-msg">
        등록된 질문이 아직 없습니다.
      </div>
      <div class="question-list" v-else>
        <div
          v-for="question in visibleQuestions"
          :key="question.id"
          class="question-box"
        >
          <div class="question-title">{{ question.question_content.slice(0, 50) }}{{ question.question_content.length > 50 ? '...' : '' }}</div>
          <div class="question-preview">{{ question.preview }}</div>
          <div class="question-footer">
            <span class="author">작성자: {{ question.writer_name || '알 수 없음' }}</span>
            <span class="date">{{ formatDateTime(question.question_created_time) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 멘토링 연장 요청 -->
    <div class="extension-request-wrapper" v-if="extensionRequested">
      <ExtensionRequest
        :requesterName="extensionRequesterName"
        @accept="handleAccept"
        @reject="handleReject"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'

import MyMentorCard from '@/components/mentoring/MyMentorCard.vue'
import MyTeamCard from '@/components/mentoring/MyTeamCard.vue'
import ExtensionRequest from '@/components/mentoring/ExtensionRequest.vue'

const props = defineProps({
  spaceId: {
    type: [String, Number],
    required: true
  }
})

const mentoringSpaceId = props.spaceId

const mentor = ref(null)
const teamMembers = ref([])
const questions = ref([])
const extensionRequested = ref(false)
const visibleCount = ref(3)
const extensionRequesterName = ref('')

const visibleQuestions = computed(() => questions.value.slice(0, visibleCount.value))

const formatDateTime = (dateStr) => {
  const d = new Date(dateStr)
  return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')} ${d.getHours()}시 ${String(d.getMinutes()).padStart(2, '0')}분`
}

onMounted(async () => {
  try {
    const spaceRes = await axios.get(`http://localhost:3001/mentoringSpaces/${mentoringSpaceId}`)
    const space = spaceRes.data
    extensionRequested.value = space.extension_requested === 'Y'

    const usersRes = await axios.get(`http://localhost:3001/users`)
    const allUsers = usersRes.data

    const mentorRes = allUsers.find(u => u.id === String(space.mentor_id))
    mentor.value = mentorRes

    const membersRes = await axios.get(`http://localhost:3001/mentoringMembers?mentoring_space_id=${mentoringSpaceId}`)
    const memberList = membersRes.data

    teamMembers.value = memberList.map(m => {
      const user = allUsers.find(u => String(u.id) === String(m.user_id))
      console.log('🧩 매칭된 유저:', user)
      return {
        ...m,
        name: user?.name || user?.nickname || '알 수 없음',
        leftover_questions: m.leftover_questions
      }
    })

    // 연장 요청자 찾기
    const requester = teamMembers.value.find(m => m.leftover_questions === 0)
    extensionRequesterName.value = requester?.name || '알 수 없음'

    const questionsRes = await axios.get(`http://localhost:3001/questions?mentoring_space_id=${mentoringSpaceId}`)
    questions.value = questionsRes.data.map(q => {
      const member = memberList.find(m => String(m.user_id) === String(q.member_id))
      const writer = member ? allUsers.find(u => String(u.id) === String(member.user_id)) : null
      return {
        ...q,
        writer_name: writer?.name || writer?.nickname || '알 수 없음',
        preview: q.question_content.slice(0, 50) + (q.question_content.length > 50 ? '...' : '')
      }
    })
  } catch (err) {
    console.error('데이터 로딩 실패', err)
  }
})

async function handleAccept() {
  try {
    // 멘토링 멤버 질문횟수 +10
    const memberRes = await axios.get(`http://localhost:3001/mentoringMembers?mentoring_space_id=${mentoringSpaceId}`)
    await Promise.all(
      memberRes.data.map(member =>
        axios.patch(`http://localhost:3001/mentoringMembers/${member.id}`, {
          leftover_questions: member.leftover_questions + 10
        })
      )
    )

    // 멘토링 공간 extension_requested = "N", extension_count + 1
    const spaceRes = await axios.get(`http://localhost:3001/mentoringSpaces/${mentoringSpaceId}`)
    const currentCount = spaceRes.data.extension_count ?? 0

    await axios.patch(`http://localhost:3001/mentoringSpaces/${mentoringSpaceId}`, {
      extension_requested: "N",
      extension_count: currentCount + 1
    })

    alert("연장을 수락하였습니다. 질문 횟수가 추가되었습니다.")
    location.reload()  // 또는 상태값을 수동으로 갱신
  } catch (err) {
    console.error("연장 수락 실패:", err)
  }
}

async function handleReject() {
  try {
    await axios.patch(`http://localhost:3001/mentoringSpaces/${mentoringSpaceId}`, {
      extension_requested: "N",
      is_activated: "N"
    })

    alert("멘토링 공간이 종료되었습니다.")
    location.reload()  // 또는 is_activated 관련 상태를 비활성 처리
  } catch (err) {
    console.error("연장 거절 실패:", err)
  }
}
</script>


<style scoped>
.mentor-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Pretendard', sans-serif;
}

/* 제목 */
.title {
  font-size: 24px;
  margin-bottom: 24px;
  font-weight: 700;
}

/* 멘토/멘티 정보 박스 */
.top-section {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.mentor-box,
.team-box {
  flex: 1;
  border: 1px solid #c6c6f6;
  border-radius: 12px;
  background-color: #f9f9ff;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

/* 멘티 질문 잔여 횟수 */
.team-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 12px;
  color: #111;
}

.team-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.team-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding: 8px 0;
  color: #222;
}
.team-item .name {
  font-weight: 600;
  font-size: 17px;
}

.team-item .count {
  color: #6c63ff;
  font-weight: 600;
  font-size: 17px;
}

/* Q&A 영역 */
.qna-section {
  margin-bottom: 40px;
}

.qna-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: 600;
}

.more-btn {
  font-size: 14px;
  color: #6c63ff;
  text-decoration: none;
}

.empty-msg {
  margin-top: 12px;
  font-size: 14px;
  color: #888;
}

/* 질문 박스 */
.question-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
}

.question-box {
  padding: 16px 20px;
  border: 2px solid #a8a8ff;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.question-title {
  font-weight: bold;
  font-size: 16px;
  color: #111;
}

.question-preview {
  font-size: 14px;
  color: #666;
}

.question-footer {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #999;
}

.extension-request-wrapper {
  margin-bottom: 32px;
}

.author {
  font-weight: 500;
}
</style>
