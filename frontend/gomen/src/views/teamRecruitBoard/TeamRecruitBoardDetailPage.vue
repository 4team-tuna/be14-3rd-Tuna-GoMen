<template>
  <div class="team-recruit-detail-page">
    <main class="detail-container" v-if="post">
      <div class="board-header">
        <h2 class="board-title">팀 모집 게시판</h2>
        <div class="applicant-button-wrapper">
          <ApplicantListButton v-if="post && post.nickname === userNickname" :postId="post.id" />
        </div>
      </div>

      <div class="post-card">
        <div class="top-row">
          <!-- 모집 상태 관련 기능 제거됨 -->
        </div>

        <h3 class="post-title">{{ post.title }}</h3>

        <div class="post-info">
          <p>{{ post.nickname }}</p>
          <p>{{ formatDate(post.createdAt) }}</p>
        </div>

        <div class="post-content">
          <p>{{ post.teamIntroduce }}</p>
        </div>
      </div>

      <div class="button-group">
        <div class="left-buttons">
          <DeleteButton v-if="post && post.nickname === userNickname" :postId="post.id" />
        </div>
        <div class="right-buttons">
          <button class="action-button secondary" @click="goToList">목록</button>
        </div>
      </div>

      <div class="apply-row">
        <button class="action-button apply" @click="openModal">신청하기</button>
      </div>
    </main>

    <div v-else class="loading">게시글을 불러오는 중...</div>

    <ApplyModal
      v-if="isModalOpen"
      @submit="handleSubmit"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DeleteButton from '@/components/TeamRecruitBoard/DeleteButton.vue'
import ApplyModal from '@/components/TeamRecruitBoard/ApplyModal.vue'
import ApplicantListButton from '@/components/Applicant/ApplicantListButton.vue'

const route = useRoute()
const router = useRouter()

const post = ref(null)
const isModalOpen = ref(false)

const openModal = () => isModalOpen.value = true
const closeModal = () => isModalOpen.value = false

const user = localStorage.getItem('user')
const userRaw = user
const parsedUser = userRaw ? JSON.parse(userRaw) : null
const userNickname = parsedUser?.nickname || ''

const handleSubmit = async (payload) => {
  const { nickname, introduction, blog } = payload

  if (post.value.nickname === userNickname) {
    alert('본인이 작성한 게시글에는 신청할 수 없습니다.')
    closeModal()
    return
  }

  if (!introduction.trim()) {
    alert('자기소개를 작성해주세요!')
    return
  }

  const postId = route.params.id
  const currentPost = await getPostData(postId)

  const isAlreadyApplied = currentPost.applicants.some(applicant => applicant.nickname === userNickname)
  if (isAlreadyApplied) {
    alert('이미 지원한 팀입니다.')
    closeModal()
    return
  }

  const applicant = {
    nickname,
    introduction,
    blog,
    appliedAt: new Date().toISOString(),
  }

  const updatedApplicants = [...(currentPost.applicants || []), applicant]

  const response = await fetch(`http://localhost:3001/teamRecruitPosts/${postId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ applicants: updatedApplicants }),
  })

  if (response.ok) {
    alert('신청이 완료되었습니다!')
    closeModal()
  } else {
    alert('신청에 실패했습니다. 다시 시도해 주세요.')
    closeModal()
  }
}

const getPostData = async (postId) => {
  const res = await fetch(`http://localhost:3001/teamRecruitPosts/${postId}`)
  if (!res.ok) throw new Error('게시글 데이터를 불러올 수 없습니다.')
  return await res.json()
}

const fetchPost = async (id) => {
  const res = await fetch(`http://localhost:3001/teamRecruitPosts/${id}`)
  post.value = await res.json()

  if (post.value.isDeleted === 'Y') {
    alert('삭제된 게시글입니다.')
    router.push('/board/team-recruit')
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}

const goToList = () => router.push('/board/team-recruit')

onMounted(() => {
  fetchPost(route.params.id)
})

watch(() => route.params.id, (newId) => {
  fetchPost(newId)
})
</script>

<style scoped>
.team-recruit-detail-page {
  background: #f9f9fb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.detail-container {
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.board-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.applicant-button-wrapper {
  display: flex;
  align-items: center;
}

.post-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.post-info {
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: space-between;
}

.post-content {
  font-size: 15px;
  line-height: 1.6;
  color: #444;
  white-space: pre-line;
}

.status {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
  background-color: #e0e7ff;
  color: #4f46e5;
}

.status:not(.recruiting) {
  background-color: #f3f4f6;
  color: #6b7280;
}

.recruiting {
  color: #4f46e5;
}

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.left-buttons,
.right-buttons {
  display: flex;
  gap: 0.5rem;
}

.apply-row {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.apply-row .action-button.apply {
  padding: 1rem 2rem;
  font-size: 1.25rem;
  border-radius: 10px;
  background-color: #4f46e5;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.apply-row .action-button.apply:hover {
  background-color: #4338ca;
}

.action-button {
  padding: 0.6rem 1.2rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button.secondary {
  background-color: #6366f1;
  color: white;
}

.action-button:hover,
.action-button.secondary:hover {
  background-color: #4f46e5;
}
</style>
