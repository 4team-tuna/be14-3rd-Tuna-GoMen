<template>
  <div class="mentor-card">
    <p class="label">멘토</p>
    <div class="profile">
      <img :src="getImageUrl(mentor.image)" class="profile-img" alt="프로필" />
      <div class="info">
        <p class="name">{{ mentor.nickname }}</p>
        <p class="title">{{ mentor.career_info }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  mentor: {
    type: Object,
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
.mentor-card {
  flex: 1;
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

.profile {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ccc;
}

.info .name {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.info .title {
  font-size: 13px;
  color: #666;
}
</style>