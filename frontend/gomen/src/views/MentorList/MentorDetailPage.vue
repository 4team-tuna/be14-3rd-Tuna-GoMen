<template>
  <div v-if="mentor.title" class="mentor-detail-wrapper">
    <div class="mentor-detail-container">
      <h2 class="title">멘토링 신청</h2>

      <div class="profile-row">
        <img :src="getImageUrl(mentor.image)" alt="멘토 이미지" class="profile-img" />
        <div class="name-box">
          <h3 class="name">{{ mentor.name }}</h3>
          <p class="job-title">{{ mentor.title }}</p>
        </div>
      </div>

      <hr />

      <div class="info-box">
        <p><strong>주요 기술 :</strong> {{ mentor.skills }}</p>
        <p class="description"><strong>기술 내용 :</strong> {{ mentor.description }}</p>
      </div>

      <!-- ✅ 버튼 조건 분기 -->
      <button class="apply-button" @click="applyAsTeam" v-if="isTeamLeader">
        팀으로 신청하기
      </button>
      <button class="apply-button" @click="applyAsIndividual" v-else-if="user">
        개인으로 신청하기
      </button>
      <p v-else class="loading">⚠ 로그인 후 신청 가능합니다.</p>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <img src="@/assets/gomen-logo.png" alt="GoMen 로고" class="modal-logo" />
        <p>멘토링 신청이 완료되었습니다!</p>
        <button class="modal-close" @click="goToList">확 인</button>
      </div>
    </div>
  </div>

  <div v-else class="loading">로딩 중입니다...</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const mentor = ref({})
const showModal = ref(false)

const user = JSON.parse(localStorage.getItem('user'))
const teamPosts = ref([])

const myTeam = computed(() =>
  teamPosts.value.find(post =>
    post.nickname?.trim().toLowerCase() === user?.nickname?.trim().toLowerCase()
  )
)
const isTeamLeader = computed(() => !!myTeam.value)

const applyAsTeam = async () => {
  try {
    console.log('🙋 team applicants:', myTeam.value.applicants)
    const payload = {
      type: 'team',
      mentorId: mentor.value.userId,
      teamId: myTeam.value.id,
      teamName: myTeam.value.teamName,
      leaderNickname: myTeam.value.nickname,
      applicants: myTeam.value.applicants.map(a => ({
        id: a.user_id, // ✅ 핵심 수정!
        nickname: a.nickname,
        introduction: a.introduction
      }))
    }
    
    await axios.post('http://localhost:3001/applications', payload)
    showModal.value = true
  } catch (err) {
    console.error('팀 신청 실패:', err)
    alert('신청 중 오류가 발생했습니다.')
  }
}

const applyAsIndividual = async () => {
  try {
    const payload = {
      mentorId: mentor.value.userId,
      menteeId: user.id,
      name: user.nickname,
      message: '멘토링 신청합니다!'
    }

    await axios.post('http://localhost:3001/applications', payload)
    showModal.value = true
  } catch (err) {
    console.error('개인 신청 실패:', err)
    alert('신청 중 오류가 발생했습니다.')
  }
}

const goToList = () => {
  router.push('/mentorlist')
}

const getImageUrl = (path) => {
  try {
    return new URL(`../assets${path || '/icon-basic-user.png'}`, import.meta.url).href
  } catch {
    return new URL(`../assets/icon-basic-user.png`, import.meta.url).href
  }
}

onMounted(async () => {
  const mentorRes = await axios.get(`http://localhost:3001/mentorlist/${route.params.id}`)
  mentor.value = mentorRes.data

  const teamRes = await axios.get('http://localhost:3001/teamRecruitPosts')
  teamPosts.value = teamRes.data

  console.log('✅ 불러온 팀 목록:', teamPosts.value)
  console.log('👤 현재 유저:', user.nickname)
  console.log('🧑‍💼 isTeamLeader:', isTeamLeader.value)
})
</script>

<style scoped>
.mentor-detail-wrapper {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  background-color: #f9f9f9;
}

.mentor-detail-container {
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.profile-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.profile-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.name-box {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 18px;
  font-weight: 600;
}

.job-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.info-box {
  margin-top: 20px;
  line-height: 1.6;
}

.description {
  margin-top: 10px;
  font-size: 15px;
  color: #444;
}

.apply-button {
  margin-top: 30px;
  background-color: #5d5fef;
  color: white;
  border: none;
  padding: 12px 32px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 340px;
  background: white;
  padding: 36px 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}

.modal-logo {
  width: 150px;
  margin-bottom: 12px; 
}

.modal-message {
  font-size: 17px;
  color: #333;
  margin: 8px 0 24px; 
}

.modal-close {
  background: black;
  color: white;
  padding: 10px 36px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.loading {
  text-align: center;
  font-size: 18px;
  padding: 80px;
  color: #888;
}
</style>
