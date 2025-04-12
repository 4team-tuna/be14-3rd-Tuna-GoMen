<template>
    <div v-if="mentor.title" class="mentor-detail-wrapper">
      <div class="mentor-detail-container">
        <h2 class="title">멘토링 신청</h2>
  
        <div class="profile-row">
          <img :src="getImageUrl(mentor.image)" alt="멘토 이미지" class="profile-img" />
          <div class="name-box">
            <h3 class="name">{{ mentor.name }}</h3>
            <p class="job-title">{{ mentor.title }}</p>
          </div>
        </div>
  
        <hr />
  
        <div class="info-box">
          <p><strong>주요 기술 :</strong> {{ mentor.skills }}</p>
          <p class="description"><strong>기술 내용 :</strong> {{ mentor.description }}</p>
        </div>
  
        <button class="apply-button">신청하기</button>
      </div>
    </div>
  
    <div v-else class="loading">
      로딩 중입니다...
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const mentor = ref({})
  
  const getImageUrl = (path) => {
    try {
      return new URL(`../../assets${path}`, import.meta.url).href
    } catch {
      return new URL(`../../assets/icon-basic-user.png`, import.meta.url).href
    }
  }
  
  onMounted(async () => {
    const res = await axios.get(`http://localhost:3001/mentors/${route.params.id}`)
    console.log("📦 mentor 응답 데이터:", res.data)
    mentor.value = res.data
  })
  </script>
  
  <style scoped>
  .mentor-detail-wrapper {
    display: flex;
    justify-content: center;
    padding: 60px 20px;
    background-color: #f9f9f9;
  }
  
  .mentor-detail-container {
    background: white;
    border-radius: 16px;
    padding: 40px;
    max-width: 800px;
    width: 100%;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  
  .profile-row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .profile-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #ddd;
  }
  
  .name-box {
    display: flex;
    flex-direction: column;
  }
  
  .name {
    font-size: 18px;
    font-weight: 600;
  }
  
  .job-title {
    font-size: 14px;
    color: #666;
  }
  
  .info-box {
    margin-top: 20px;
    line-height: 1.6;
  }
  
  .description {
    margin-top: 10px;
    font-size: 15px;
    color: #444;
  }
  
  .apply-button {
    margin-top: 30px;
    background-color: #5d5fef;
    color: white;
    border: none;
    padding: 12px 32px;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  
  .loading {
    text-align: center;
    font-size: 18px;
    padding: 80px;
    color: #888;
  }
  </style>
  