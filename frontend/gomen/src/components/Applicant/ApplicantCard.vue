<template>
  <div class="applicant-card">
    <div class="content">
      <img :src="profileImage" alt="기본 프로필" />
      <h3>{{ applicant.nickname }}</h3>
    </div>

    <div class="introduction-wrapper">
      <div class="introduction-text">{{ applicant.introduction }}</div>
    </div>

    <div class="button-container">
      <button
        type="button"
        class="accept"
        @click="handleAccept"
        :disabled="applicant.isProcessed === 'Y' || applicant.isProcessed === 'N'"
      >
        수락
      </button>
      <button
        type="button"
        class="reject"
        @click="handleReject"
        :disabled="applicant.isProcessed === 'Y' || applicant.isProcessed === 'N'"
      >
        거절
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import axios from 'axios'

const props = defineProps({
  applicant: Object,
  profileImage: String,
  postId: String
})

const emit = defineEmits(['update-status'])

const handleAccept = async () => {
  await updateStatus('Y')
}

const handleReject = async () => {
  await updateStatus('N')
}

const updateStatus = async (status) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/teamRecruitPosts/${props.postId}`)

    const updatedApplicants = data.applicants.map(app => {
      if (app.nickname === props.applicant.nickname) {
        return { ...app, isProcessed: status }
      }
      return app
    })

    await axios.patch(`http://localhost:3001/teamRecruitPosts/${props.postId}`, {
      applicants: updatedApplicants
    })

    emit('update-status')
  } catch (error) {
    console.error('업데이트 실패:', error)
  }
}
</script>

<style scoped>
.applicant-card {
  width: 450px;
  height: 360px;
  border-radius: 12px;
  border: 1px solid #d4d4d4;
  background-color: rgba(255, 255, 255, 0.86);
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
  position: relative;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.applicant-card img {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-bottom: 12px;
}

.applicant-card h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
}

.introduction-wrapper {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}

.introduction-text {
  white-space: pre-wrap;
  font-size: 1rem;
  color: #333;
  min-height: 100px;
  padding: 8px 0;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: auto;
  gap: 8px;
}

button {
  padding: 6px 10px;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

button.accept {
  background-color: #e8f0ff;
  color: #6366f1;
  border: 1px solid #c7d2fe;
}

button.reject {
  background-color: #ffe8e8;
  color: #ef4444;
  border: 1px solid #fbcaca;
}

button:disabled {
  background-color: #e5e5e5;
  color: #999;
  cursor: not-allowed;
}

button:hover:enabled {
  transform: translateY(-1px);
}
</style>
