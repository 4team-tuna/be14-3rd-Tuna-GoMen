<template>
    <!-- Overlay -->
    <div class="modal-overlay">
      <!-- Modal Content -->
      <div class="modal-content">
        <h3 class="modal-title">비밀번호 확인</h3>
  
        <input
          v-model="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          class="modal-input"
        />
  
        <div class="modal-actions">
          <button @click="emitCancel" class="modal-btn cancel">취소</button>
          <button @click="emitConfirm" class="modal-btn confirm">확인</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const password = ref('')
  const emit = defineEmits(['password-confirmed', 'close'])
  
  const emitConfirm = () => {
    emit('password-confirmed', password.value)
    password.value = ''
  }
  
  const emitCancel = () => {
    emit('close')
    password.value = ''
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4); /* 어두운 오버레이 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  }
  
  .modal-content {
    background-color: #fff;
    border-radius: 16px;
    padding: 32px 24px;
    width: 150%;
    max-width: 400px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    animation: slideUp 0.3s ease-out;
  }
  
  .modal-title {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin-bottom: 24px;
    text-align: center;
  }
  
  .modal-input {
    width: 90%;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 15px;
    margin-bottom: 24px;
    outline: none;
    transition: border-color 0.2s;
  }
  
  .modal-input:focus {
    border-color: #007bff;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
  
  .modal-btn {
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    border: none;
  }
  
  .modal-btn.cancel {
    background-color: #f0f0f0;
    color: #333;
  }
  
  .modal-btn.cancel:hover {
    background-color: #e0e0e0;
  }
  
  .modal-btn.confirm {
    background-color: #007bff;
    color: white;
  }
  
  .modal-btn.confirm:hover {
    background-color: #0056b3;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  </style>
  