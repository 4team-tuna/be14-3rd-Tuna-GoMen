<template>
    <div class="team-card">
      <p class="label">나의 팀</p>
  
      <div class="members">
        <div
          class="member"
          v-for="member in teamMembers"
          :key="member.user_id"
        >
          <img :src="getImageUrl(member.image)" class="profile-img" alt="프로필" />
          <p class="nickname">{{ member.nickname }}</p>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  defineProps({
    teamMembers: {
      type: Array,
      required: true
    }
  })
  
  function getImageUrl(path) {
  try {
    return new URL(`@/assets/${path || 'icon-basic-user.png'}`, import.meta.url).href
  } catch {
    return new URL('@/assets/icon-basic-user.png', import.meta.url).href
  }
}
  </script>
  
  <style scoped>
  .team-card {
    flex: 2;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  .label {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  .members {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .member {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 64px;
  }
  
  .profile-img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #ccc;
    margin-bottom: 4px;
  }
  
  .nickname {
    font-size: 12px;
    color: #333;
    text-align: center;
  }
  
  </style>
  