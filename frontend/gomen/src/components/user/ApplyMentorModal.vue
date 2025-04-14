<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content">
        <h2 class="modal-title">멘토 신청하기</h2>
        <textarea
          v-model="message"
          placeholder="멘토 신청 메시지를 입력하세요."
          class="modal-textarea"
        ></textarea>
        <div class="modal-actions">
          <button @click="$emit('close')" class="modal-cancel">취소</button>
          <button :disabled="!message" @click="apply" class="modal-submit">
            신청
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const message = ref('')
  const emit = defineEmits(['apply', 'close'])
  
  const apply = () => {
    if (!message.value.trim()) {
      alert('신청 메시지를 입력해주세요.')
      return
    }
    emit('apply', message.value)
    emit('close')
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  .modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
  }
  .modal-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  .modal-textarea {
    width: 94%;
    height: 100px;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    resize: none;
    font-size: 1rem;
  }
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  .modal-cancel,
  .modal-submit {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }
  .modal-cancel {
    background: #ccc;
    margin-right: 0.5rem;
  }
  .modal-submit {
    background: #007bff;
    color: white;
  }
  .modal-submit:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
  </style>
  