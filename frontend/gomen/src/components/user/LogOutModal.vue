<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2 class="modal-title">로그아웃 하시겠어요?</h2>
      <p class="modal-message">다시 로그인하려면 ID와 비밀번호가 필요합니다.</p>
      <div class="button-group">
        <button class="btn confirm" @click="confirm">네, 로그아웃</button>
        <button class="btn cancel" @click="close">아니오</button>
      </div>
    </div>
  </div>
</template>


  
<script setup>
  import { defineEmits } from 'vue'
  
  const emits = defineEmits(['confirm', 'close'])

  function confirm() {
    emits('confirm') // 홈으로 이동
  }
  
  function close() {
    emits('close') // 부모가 showModal = false 처리
  }
</script>
  
<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  width: 360px;
  max-width: 90%;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  transform: translateY(0);
  animation: slideUp 0.3s ease-out;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
}

.modal-message {
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  flex: 1;
  padding: 10px 0;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.confirm {
  background-color: #ff4d4f;
  color: white;
}

.cancel {
  background-color: #f0f0f0;
  color: #333;
}

.confirm:hover {
  background-color: #e04344;
}

.cancel:hover {
  background-color: #e0e0e0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>