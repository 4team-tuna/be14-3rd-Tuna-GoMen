<template>

    <Header/>

    <main class="main-content">
    <!-- 여기가 본문 들어가는 영역 -->
     <MentorList/>
    <h1>Welcome to GOMEN!</h1>
    <p>이곳에 게시판, 팀 모집 등 본문이 들어감!!!
      
    </p>
  </main>


      <Footer/>
  </template>
  
  <script setup>
  import Header from './components/common/Header.vue';
  import Footer from './components/common/Footer.vue';
  import MentorList from './components/mentorList/MentorList.vue';
 </script>
  
  <style scoped>
  
  </style>