<!-- src/components/common/FloatingWriteButton.vue -->
<template>
    <button class="floating-btn" @click="goToWritePage">
      <!-- 연필 아이콘 (SVG로 변경 가능) -->
      ✏️
    </button>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goToWritePage = () => {
    router.push('/board/team-recruit/write')
  }
  </script>
  
  <style scoped>
  .floating-btn {
    position: fixed;
    bottom: 32px;
    right: 32px;
    background-color: #5D5FEF; /* iris100 */
    color: white;
    border: none;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    font-size: 28px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    z-index: 50;
  }
  
  .floating-btn:hover {
    background-color: #4a4cd1; /* hover 색상 */
    transform: scale(1.05);
  }
  </style>
  