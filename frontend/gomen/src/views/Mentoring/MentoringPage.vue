<template>
  <div class="mentoring-page">
    <div v-if="spaceId">
      <MentorView v-if="isMentor" :spaceId="spaceId" />
      <MenteeView v-else :spaceId="spaceId" />
    </div>
    <p v-else class="loading">멘토링 공간을 불러오는 중입니다...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MentorView from '@/views/Mentoring/MentorView.vue'
import MenteeView from '@/views/Mentoring/MenteeView.vue'
import api from '@/api'

const user = JSON.parse(localStorage.getItem('user'))
const isMentor = ref(false)
const spaceId = ref(null)
const router = useRouter()

onMounted(async () => {
  try {
    // 1. 멘티로 등록된 공간 먼저 조회
    const memberRes = await api.get(`/mentoringMembers?user_id=${user.id}`)
    const myMembership = memberRes.data[0]

    if (myMembership) {
      const spaceRes = await api.get(`/mentoringSpaces/${myMembership.mentoring_space_id}`)
      const mySpace = spaceRes.data

      isMentor.value = String(mySpace.mentor_id) === String(user.id) // ✅ 먼저 판별

      if (mySpace.is_activated !== 'Y') {
        if (isMentor.value) {
          // 멘토면 공간 유지 (그냥 패스)
        } else {
          // 멘티면 리뷰 페이지로 이동
          alert('⛔ 멘토가 멘토링 연장을 거절하여 종료되었습니다. 리뷰를 남겨주세요.')
          return router.push({
            path:`/review/write`,
            query: {
              spaceId: mySpace.id,
              mentorId: mySpace.mentor_id,
              mentorNickname: mySpace.mentor_nickname
            }
          })
        }
      }

      spaceId.value = mySpace.id
      console.log('🧑‍🎓 멘티로 참여한 공간:', mySpace.id)
      return
    }

    // 2. 멘토로 등록된 공간 조회
    const mentorRes = await api.get(`/mentoringSpaces?mentor_id=${user.id}&is_activated=Y`)
    const myMentorSpace = mentorRes.data[0]

    if (myMentorSpace) {
      spaceId.value = myMentorSpace.id
      isMentor.value = true
      console.log('🧑‍🏫 멘토로 운영 중인 공간:', myMentorSpace.id)
      return 
    }

    // 3. 둘 다 없으면
    alert('멘토링 공간에 속해 있지 않습니다.')
    router.push('/main')

  } catch (e) {
    console.error('멘토링 공간 조회 실패:', e)
    alert('멘토링 공간을 불러오지 못했습니다.')
    router.push('/main')
  }
})
</script>

<style scoped>
.mentoring-page {
  max-width: 1000px;
  margin: auto;
  padding: 40px 20px;
}
.loading {
  text-align: center;
  color: #999;
  font-size: 16px;
  padding: 60px 0;
}
</style>
