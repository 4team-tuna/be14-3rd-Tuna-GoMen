<template>
  <div class="mentoring-page">
    <!-- 로딩 중일 때는 아무 것도 렌더링하지 않음 -->
    <div v-if="spaceId">
      <MentorView v-if="isMentor" :spaceId="spaceId" />
      <MenteeView v-else :spaceId="spaceId" />
    </div>
    <p v-else class="loading">멘토링 공간을 불러오는 중입니다...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MentorView from '@/components/mentoring/MentorView.vue'
import MenteeView from '@/components/mentoring/MenteeView.vue'
import api from '@/api'

const user = JSON.parse(localStorage.getItem('user'))
const isMentor = ref(false)
const spaceId = ref(null)

onMounted(async () => {
  try {
    const res = await api.get(`/mentoringSpaces?userId=${user.id}`)
    const mySpace = res.data[0]
    if (!mySpace) return

    spaceId.value = mySpace.id  // ✅ 확정적으로 id 사용
    isMentor.value = String(mySpace.mentor_id) === String(user.id) // ✅ 타입 강제 일치
  } catch (e) {
    console.error('멘토링 공간 조회 실패:', e)
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
