<template>
    <div class="main-wrapper">
      <div class="main-box">
        <img src="@/assets/gomen-logo.png" alt="GoMen Logo" class="logo" />
        <h1>GoMen에 오신 것을 환영합니다!🎉</h1>
  
        <button class="mail-button" @click="goToMail">✉️ 쪽지창 열기</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goToMail = () => {
    router.push('/mail')
  }
  </script>
  
  <style scoped>
  .main-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f2f2f2;
  }
  
  .main-box {
    background-color: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .logo {
    height: 80px;
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 22px;
    margin-bottom: 30px;
    color: #333;
  }
  
  .mail-button {
    background-color: black;
    color: white;
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.2s;
  }
  
  .mail-button:hover {
    background-color: #444;
  }
  </style>
  