<template>
    <div class="modal-background">
      <div class="modal-content">
        <h3>비밀번호 변경</h3>
  
        <label for="currentPassword">현재 비밀번호</label>
        <input v-model="currentPassword" id="currentPassword" type="password" placeholder="현재 비밀번호" />
  
        <label for="newPassword">새 비밀번호</label>
        <input v-model="newPassword" id="newPassword" type="password" placeholder="새 비밀번호" />
  
        <label for="confirmPassword">새 비밀번호 확인</label>
        <input v-model="confirmPassword" id="confirmPassword" type="password" placeholder="새 비밀번호 확인" />
  
        <div class="modal-buttons">
          <button @click="handleChange">변경</button>
          <button @click="$emit('close')">취소</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const emit = defineEmits(['close', 'changePassword']);
  
  const currentPassword = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');
  
  const handleChange = () => {
    if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
  
    if (newPassword.value !== confirmPassword.value) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
  
    emit('changePassword', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    });
  };
  </script>
  
  <style scoped>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    width: 350px;
    border-radius: 10px;
  }
  
  input {
    width: 95%;
    margin: 10px 0;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  button {
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }
  </style>
  