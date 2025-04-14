<template>
  <div class="status-page">
    <h2 class="title">멘토링 신청자</h2>
    <div class="applicant-grid">
      <div
        class="applicant-card"
        v-for="applicant in applicants"
        :key="applicant.id"
      >
        <img class="profile-img" :src="getImageUrl(applicant.image)" alt="프로필" />

        <div class="info">
          <!-- ✅ 개인 or 팀 분기 -->
          <p class="name">
            {{ applicant.type === 'team' ? applicant.teamName : applicant.name }}
          </p>
          <p class="content">
            {{ applicant.type === 'team'
              ? `팀장 ${applicant.leaderNickname}님의 팀이 신청했습니다. (${applicant.applicants?.length || 0}명)`
              : applicant.message }}
          </p>
        </div>

        <div class="buttons">
          <button class="accept" @click="acceptApplicant(applicant)">수락</button>
          <button class="reject">거절</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'

const router = useRouter()
const applicants = ref([])

const getImageUrl = (img) => {
  try {
    return new URL(`@/assets/${img || 'icon-basic-user.png'}`, import.meta.url).href
  } catch {
    return new URL('@/assets/icon-basic-user.png', import.meta.url).href
  }
}

const acceptApplicant = async (applicant) => {
  try {
    console.log('👀 등록 대상 멤버:', applicant.applicants)
    const mentorUser = JSON.parse(localStorage.getItem('user'))

    // 1. 멘토링 공간 생성
    const spaceRes = await api.post('/mentoringSpaces', {
      mentor_id: mentorUser.id,
      personal_information: '',
      information_is_opened: 'N',
      personal_info_requested: 'N',
      extension_count: 0,
      extension_requested: 'N',
      is_activated: 'Y'
    })

    const mentoringSpaceId = spaceRes.data.id

    // ✅ 2. 멘토링 멤버 등록 (개인 or 팀)
    if (applicant.type === 'individual') {
      await api.post('/mentoringMembers', {
        mentoring_space_id: mentoringSpaceId,
        user_id: applicant.menteeId,
        leftover_questions: 10
      })
    } else if (applicant.type === 'team') {
      for (const mentee of applicant.applicants) {
        await api.post('/mentoringMembers', {
          mentoring_space_id: mentoringSpaceId,
          user_id: mentee.id,  // ⚠ user_id가 있어야 함!
          leftover_questions: 10
        })
      }
    }

    // 3. 신청 상태 업데이트
    await api.patch(`/applications/${applicant.id}`, {
      is_accepted: 'Y'
    })

    // 4. 리스트에서 제거 + 페이지 이동
    applicants.value = applicants.value.filter(a => a.id !== applicant.id)
    router.push('/mentoring')

  } catch (error) {
    console.error('멘토링 공간 생성 실패:', error)
    alert('멘토링 수락 중 오류가 발생했습니다.')
  }
}

onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const res = await api.get(`/applications?mentorId=${user.id}`)
  applicants.value = res.data
})
</script>

<style scoped>
.status-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}
.applicant-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 24px;
}
.applicant-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.profile-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}
.info {
  text-align: center;
  margin-bottom: 12px;
}
.name {
  font-weight: bold;
  margin-bottom: 8px;
}
.content {
  font-size: 14px;
  color: #555;
}
.buttons {
  display: flex;
  gap: 12px;
}
.accept {
  background-color: #5d5fef;
  color: white;
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.reject {
  background-color: #ccc;
  color: #444;
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
