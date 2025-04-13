<template>
    <div class="main-wrapper">
      <h1>GoMen</h1>
      <button @click="goLoginPage">로그인하기</button>
      <button @click="goSignUpPage">회원가입하기</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const goLoginPage = () => {
    router.push('/login')
  }
  
  const goSignUpPage = () => {
    router.push('/signUp')
  }
  </script>
  
  <style scoped>
  .main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  }
  button {
    margin: 8px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  