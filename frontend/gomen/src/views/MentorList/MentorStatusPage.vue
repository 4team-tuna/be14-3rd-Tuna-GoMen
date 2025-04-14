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
            <p class="name">{{ applicant.name }}</p>
            <p class="content">{{ applicant.message }}</p>
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
    const mentorUser = JSON.parse(localStorage.getItem('user'))

    const res = await api.post('/mentoringSpaces', {
      mentorId: mentorUser.id,
      menteeId: applicant.userId,
      createdAt: new Date().toISOString()
    })

        // 신청자 리스트에서 제거
        applicants.value = applicants.value.filter(a => a.id !== applicant.id)

        // mentoring 공간으로 이동
        router.push('/mentoring')
    } catch (error) {
        console.error('멘토링 공간 생성 실패:', error)
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
  