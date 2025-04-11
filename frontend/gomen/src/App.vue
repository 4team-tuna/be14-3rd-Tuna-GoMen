<template>

    <Header/>
    <router-view /> <!-- 여기에 각 페이지들이 들어감 -->
      <Footer/>
  </template>
  
  <script setup>
  import Header from './components/common/Header.vue';
  import Footer from './components/common/Footer.vue';
 </script>
  
  <style scoped>
  
  </style>