<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <p class="message">정말 로그아웃하시겠습니까?</p>
        <div class="button-group">
          <button class="yes" @click="confirm">예</button>
          <button class="no" @click="close">아니오</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { defineEmits } from 'vue'
  
  const emits = defineEmits(['confirm', 'close'])
  
  const router = useRouter()

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
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    width: 320px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
  
  .message {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  button {
    width: 45%;
    padding: 10px 0;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
  }
  
  .yes {
    background-color: #000;
    color: white;
  }
  
  .no {
    background-color: #e0e0e0;
    color: #333;
  }
  </style>
  