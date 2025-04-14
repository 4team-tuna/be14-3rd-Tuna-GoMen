<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3>팀 신청하기</h3>
      <textarea
        v-model="introduction"
        placeholder="팀에 지원하고 싶은 이유를 작성해주세요.&#10;구체적이고 자세할수록 팀원으로 선택받을 확률이 올라갑니다."
        maxlength="200"
      ></textarea>
      <p class="char-count">{{ introduction.length }} / 200자</p>

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

  const user = JSON.parse(localStorage.getItem('user')) || {}
  const nickname = user.nickname
  const blog = user.blog || ''

  // 자기소개를 제출하며 부모 컴포넌트로 전달
  emit('submit', {
    nickname,
    introduction: introduction.value,
    blog: blog
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 90%;
  position: relative;
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
  box-sizing: border-box;
}

.char-count {
  text-align: right;
  font-size: 0.85rem;
  color: #888;
  margin-top: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.action-button {
  padding: 0.7rem 1.0rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #4338ca;
}

.action-button.secondary {
  background-color: #f3f4f6;
  color: #4f46e5;
}

.action-button.secondary:hover {
  background-color: #e5e7eb;
}
</style>
