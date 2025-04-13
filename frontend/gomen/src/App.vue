<template>
  <Header />
  <router-view /> <!-- 여기서 MessageInbox가 들어옴 -->
  <Footer />
</template>

<script setup>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
</script>
  
<style scoped>

</style>