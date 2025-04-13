<template>
    <div class="extension-box">
      <div class="request" v-for="req in requests" :key="req.id">
        <span>{{ req.nickname }}</span>
        <div class="btns">
          <button class="accept">수락 하기</button>
          <button class="reject">거절 하기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({ requests: Array })
  </script>
  
  <style scoped>
  .extension-box {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 12px;
  }
  .request {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .btns button {
    margin-left: 8px;
    padding: 4px 8px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  .accept {
    background-color: #5865F2;
    color: white;
  }
  .reject {
    background-color: #f44336;
    color: white;
  }
  </style>
  