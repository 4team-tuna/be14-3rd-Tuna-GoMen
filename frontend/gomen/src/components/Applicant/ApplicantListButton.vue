<template>
  <button class="applicant-button" @click="goToApplicantList">
    지원자 확인
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  postId: {
    type: String,
    required: true
  }
})

const goToApplicantList = () => {
  router.push(`/board/team-recruit/${props.postId}/applicants`)
}
</script>

<style scoped>
.applicant-button {
  padding: 0.6rem 1.2rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.applicant-button:hover {
  background-color: #4f46e5;
}
</style>
