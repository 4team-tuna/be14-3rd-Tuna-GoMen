<template>
    <div class="main-wrapper">
      <h1 class="title">GoMen</h1>
      <div class="btn-group">
        <button class="main-btn" @click="goLoginPage">로그인하기</button>
        <button class="main-btn secondary" @click="goSignUpPage">회원가입하기</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const goLoginPage = () => {
    router.push('/backend/login')
  }
  
  const goSignUpPage = () => {
    router.push('/backend/signUp')
  }
  </script>
  
  <style scoped>
  .main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to bottom right, #f5f7fa, #c3cfe2);
  }
  
  .title {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 40px;
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    animation: fadeIn 1s ease-in-out;
  }
  
  .btn-group {
    display: flex;
    gap: 20px;
  }
  
  .main-btn {
    padding: 12px 24px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #4f86f7;
    color: white;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .main-btn:hover {
    background-color: #366fe0;
    transform: translateY(-2px);
  }
  
  .main-btn.secondary {
    background-color: #ffffff;
    color: #4f86f7;
    border: 2px solid #4f86f7;
  }
  
  .main-btn.secondary:hover {
    background-color: #e9f0ff;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  