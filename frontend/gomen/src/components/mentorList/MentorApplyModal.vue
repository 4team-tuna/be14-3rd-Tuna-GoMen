<template>
    <div class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-content">
        <h2 class="modal-title">{{ mentor.title }}</h2>
  
        <div class="mentor-info">
          <p class="mentor-skills">
            <strong>기술 스택:</strong>
            {{ mentor.skills }}
          </p>
          <p class="mentor-description">
            {{ mentor.description }}
          </p>
        </div>
  
        <div class="modal-actions">
          <button @click="$emit('close')">닫기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({ mentor: Object })
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-content {
    background: white;
    border-radius: 16px;
    padding: 32px 48px;
    width: 640px;             /* ✅ 너의 Figma 기준 넓이 */
    max-width: 90%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    text-align: left;
  }
  
  .modal-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  
  .mentor-info p {
    font-size: 16px;
    line-height: 1.6;
    margin: 10px 0;
  }
  
  .mentor-skills strong {
    font-weight: 600;
    margin-right: 4px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  
  .modal-actions button {
    background-color: #5d5fef;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
  }
  </style>
  