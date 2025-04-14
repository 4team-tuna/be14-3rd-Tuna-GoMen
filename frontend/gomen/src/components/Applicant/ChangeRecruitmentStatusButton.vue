<template>
    <div class="recruitment-end-button">
      <button
        class="end-recruitment-btn"
        :class="isActivated ? 'active' : 'inactive'"
        @click="toggleStatus"
      >
        {{ buttonText }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const postId = route.params.id
  const isActivated = ref(false)
  const buttonText = ref('모집 종료하기')
  
  onMounted(async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/teamRecruitPosts/${postId}`)
      isActivated.value = data.isActivated === 'Y'
      updateButtonText()
    } catch (error) {
      console.error("데이터 로딩 실패:", error)
    }
  })
  
  const updateButtonText = () => {
    buttonText.value = isActivated.value ? '모집 종료하기' : '모집중으로 변경'
  }
  
  const toggleStatus = async () => {
    const newStatus = isActivated.value ? 'N' : 'Y'
  
    try {
      await axios.patch(`http://localhost:3001/teamRecruitPosts/${postId}`, {
        isActivated: newStatus
      })
      isActivated.value = !isActivated.value
      updateButtonText()
    } catch (error) {
      console.error("모집 상태 변경 실패:", error)
      alert('모집 상태 변경에 실패했습니다.')
    }
  }
  </script>
  
  <style scoped>
  .recruitment-end-button {
    text-align: right;
    margin-right: 300px;
  }
  
  .end-recruitment-btn {
    padding: 10px 20px;
    border: 2px solid;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    color: white;
  }
  
  /* 모집중 상태일 때: 보라색 */
  .end-recruitment-btn.active {
    background-color: #6366f1;
    border-color: #4f46e5;
  }
  
  .end-recruitment-btn.active:hover {
    background-color: #4f46e5;
    border-color: #4338ca;
  }
  
  .end-recruitment-btn.active:active {
    background-color: #4338ca;
    border-color: #2e2e99;
  }
  
  /* 모집 종료 상태일 때: 회색 */
  .end-recruitment-btn.inactive {
    background-color: #a1a1aa; /* 연한 회색 */
    border-color: #71717a;
  }
  
  .end-recruitment-btn.inactive:hover {
    background-color: #71717a;
    border-color: #52525b;
  }
  
  .end-recruitment-btn.inactive:active {
    background-color: #52525b;
    border-color: #3f3f46;
  }
  </style>
  