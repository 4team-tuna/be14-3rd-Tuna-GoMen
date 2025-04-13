<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <h3>팀 신청하기</h3>
        <textarea v-model="introduction" placeholder="간단한 자기소개를 작성해주세요" />
        <div class="modal-actions">
          <button class="action-button" @click="submit">신청하기</button>
          <button class="action-button secondary" @click="$emit('close')">취소</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const introduction = ref('')
  
  const emit = defineEmits(['submit', 'close'])
  
  const submit = () => {
    if (!introduction.value.trim()) {
      alert('자기소개를 입력해주세요.')
      return
    }
  
    emit('submit', introduction.value)
    introduction.value = ''
  }
  </script>
  
  <style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  width: 400px;
  max-width: 90%;
}

.modal-content textarea {
  width: 100%;
  height: 100px;
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activation-button {
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: #4f46e5;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

  </style>
  