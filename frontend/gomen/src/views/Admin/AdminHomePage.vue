<template>
    <div class="admin-home">
      
  
      <main class="main">
        <button class="admin-btn" @click="goTo('report')">신고관리</button>
        <button class="admin-btn" @click="goTo('title')">칭호관리</button>
        <button class="admin-btn" @click="goTo('mentor')">멘토요청관리</button>
      </main>
  
      
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import Header from '@/components/common/Header.vue'
  import Footer from '@/components/common/Footer.vue'
  
  const router = useRouter()
  
  const goTo = (page) => {
    if (page === 'report') router.push('/admin/reports')
    else if (page === 'title') router.push('/admin/titles')
    else if (page === 'mentor') router.push('/admin/mentors')
  }
  </script>
  
  <style scoped>
  .admin-home {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-top: 120px;
  }
  
  .admin-btn {
    background-color: #9f90f5;
    color: white;
    font-weight: bold;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    padding: 14px 40px;
    width: 200px;
    cursor: pointer;
    transition: 0.2s;
  }
  
  .admin-btn:hover {
    background-color: #7e70e4;
  }
  </style>
  