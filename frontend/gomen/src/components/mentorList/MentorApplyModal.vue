<template>
    <div class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-box">
        <h2>{{ mentor.title }}</h2>
        <p><strong>기술 스택:</strong> {{ mentor.skills }}</p>
        <p class="description">{{ mentor.description }}</p>
        <button class="close-button" @click="$emit('close')">닫기</button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({ mentor: Object })
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-box {
    background: white;
    padding: 32px;
    border-radius: 12px;
    width: 480px;
    max-width: 90%;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
  .description {
    margin-top: 12px;
    color: #666;
    font-size: 14px;
    line-height: 1.6;
  }
  .close-button {
    margin-top: 16px;
    padding: 10px 20px;
    background-color: #5d5fef;
    border: none;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
  </style>
  