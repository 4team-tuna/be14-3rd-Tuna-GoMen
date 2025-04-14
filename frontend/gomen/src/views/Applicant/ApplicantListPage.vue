<template>
  <div class="applicant-list-page">
    <h2 class="title">팀 모집 게시판</h2>
    <p class="description" @click="goToPostPage">
      ‘{{ postTitle }}’ 게시글의 지원자 목록입니다.
    </p>

    <ChangeRecruitmentStatusButton />

    <!-- 지원자가 없을 때 문구 표시 -->
    <div v-if="applicants.length === 0" class="no-applicants-message">
      지원자가 없습니다.
    </div>

    <div class="applicant-cards">
      <div
        v-for="(applicant, index) in applicants"
        :key="index"
        class="applicant-card-wrapper"
      >
        <ApplicantCard
          :applicant="applicant"
          :profileImage="profileImage"
          :postId="postId"
          @update-status="fetchApplicants"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import ApplicantCard from '@/components/Applicant/ApplicantCard.vue'
import ChangeRecruitmentStatusButton from '@/components/Applicant/ChangeRecruitmentStatusButton.vue'

import profileImage from '@/assets/icon-user.png'

const route = useRoute()
const router = useRouter()
const postId = route.params.id
const applicants = ref([])
const postTitle = ref('')

const fetchApplicants = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3001/teamRecruitPosts/${postId}`)
    postTitle.value = data.title
    applicants.value = data.applicants || []
  } catch (error) {
    console.error("데이터 로딩 실패:", error)
  }

  if (data.isActivated === 'N') {
    alert('모집이 종료되어 지원자 정보를 볼 수 없습니다.')
    router.push('/board/team-recruit')
    return
  }
}

const goToPostPage = () => {
  router.push(`/board/team-recruit/${postId}`)
}

onMounted(fetchApplicants)
</script>

<style scoped>
.applicant-list-page {
  padding: 40px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin-left: 280px;
  margin-top: 30px;
  margin-bottom: 40px;
}

.description {
  color: #666;
  text-align: left;
  margin-left: 290px;
  margin-bottom: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.description:hover {
  color: #6366f1;
}

.applicant-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 64px 32px;
  margin: 200px;
  margin-top: 40px;
}

.applicant-card-wrapper {
  flex: 0 0 calc(50% - 16px);
  display: flex;
  justify-content: center;
}

/* 지원자가 없을 때 문구 스타일 */
.no-applicants-message {
  font-size: 1.25rem;
  color: #888;
  text-align: center;
  margin-top: 40px;
}
</style>
