<template>
  <div class="mentor-card">
    <img class="profile" :src="mentorImage" alt="멘토 프로필" />
    <h3 class="nickname">{{ mentor.nickname }} <span class="name">({{ mentor.name }})</span></h3>
    <p class="career">{{ mentor.careerInfo || '직무 정보 없음' }}</p>
    <p class="school">{{ mentor.college || '학교 정보 없음' }}</p>

    <a
      v-if="mentor.githubAdress"
      class="github-link"
      :href="mentor.githubAdress"
      target="_blank"
    >
      GitHub 보기 →
    </a>
  </div>
</template>

<script setup>
defineProps({
  mentor: {
    type: Object,
    required: true
  }
})

const mentorImage = '@/assets/profile-default.png' // 추후 mentor.profileImage 로 대체 가능
</script>

<style scoped>
.mentor-card {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.04);
}

.profile {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}

.nickname {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.name {
  font-size: 14px;
  font-weight: normal;
  color: #888;
}

.career,
.school {
  font-size: 14px;
  color: #555;
  margin: 4px 0;
}

.github-link {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: #5865F2;
  text-decoration: none;
  font-weight: 500;
}
.github-link:hover {
  text-decoration: underline;
}
</style>
