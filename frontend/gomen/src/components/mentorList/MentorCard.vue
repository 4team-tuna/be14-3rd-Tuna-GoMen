<template>
  <div class="mentor-card">
    <span class="mentor-rating">⭐ {{ mentor.rating }}</span>
    <img :src="getImageUrl(mentor.image)" alt="멘토 이미지" class="mentor-image" />
    <div class="mentor-info">
      <h3 class="mentor-name">{{ mentor.name }}</h3>
      <p class="mentor-title">{{ mentor.title }}</p> 
      <p class="mentor-skills">{{ mentor.skills }}</p>
      <p class="mentor-description">
        {{ mentor.description.length > 100 ? mentor.description.slice(0, 100) + '...' : mentor.description }}
      </p>
    </div>
    <router-link :to="`/mentorlist/${mentor.id}`" class="apply-button-link">
      <button class="apply-button">신청하기</button>
    </router-link>
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
    return new URL(`@/assets/${path.split('/').pop()}`, import.meta.url).href
  } catch {
    return new URL('@/assets/icon-basic-user.png', import.meta.url).href
  }
}
</script>

<style scoped>
.mentor-card {
  position: relative;
  width: 100%;
  height: auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e6e7ff;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(93, 95, 239, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.mentor-rating {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 14px;
  color: #5d5fef;
  font-weight: bold;
}

.mentor-image {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 8px;
}

.mentor-info {
  text-align: center;
  padding: 12px 0;
}

.mentor-name {
  font-size: 16px;
  font-weight: 700;
  margin: 6px 0;
  color: #333;
}

.mentor-title {
  font-size: 15px;
  font-weight: 600;
  color: #5d5fef;
  margin-bottom: 6px;
}

.mentor-skills {
  font-size: 14px;
  font-weight: 500;
  color: #444;
  margin: 8px 0;
  text-align: center;
  white-space: normal;
}

.mentor-description {
  font-size: 12px;
  color: #888;
  padding: 0 6px;
  line-height: 1.4;
  margin-bottom: 12px;
}

.apply-button {
  width: 90%;
  padding: 10px 0;
  font-size: 13px;
  font-weight: bold;
  background-color: #5d5fef;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: block;
  margin: 0 auto;
}

.apply-button:hover {
  background-color: #7c83ff;
}

.apply-button-link {
  width: 100%;
  text-decoration: none;
}
</style>
