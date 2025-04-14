<template>
  <div class="mentoring-wrapper">
    <h2 class="title">멘토링 공간</h2>

    <div class="info-row">
      <div class="mentor-box">
        <p class="label">나의 멘토</p>
        <img :src="getImageUrl(mentor.image)" alt="멘토 이미지" class="mentor-img" />
        <p class="mentor-name">{{ mentor.name }}</p>
      </div>

      <div class="team-box">
        <p class="label">나의 팀</p>
        <p class="team-info">김성민/임은재/정건이<br />정우람/오현서/최다연<br />홍의정/류현우/강태윤</p>
        <p class="question-count">남은 질문 개수 : <strong>{{ questionCount }}</strong>개</p>
      </div>
    </div>

    <div class="section">
      <h3 class="sub-title">Q&A</h3>
      <div class="question-card" v-for="q in questions" :key="q.id">
        <p class="question-title">{{ q.title }}</p>
        <p class="question-preview">{{ q.preview }}</p>
        <p class="question-date">{{ q.date }}</p>
      </div>
    </div>

    <div class="pagination">
      <span>이전</span>
      <span v-for="n in 5" :key="n" class="page">{{ n }}</span>
      <span>다음</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mentor = ref({
  name: '찬승승🔥',
  image: 'mentor-img.png' // 실제 이미지 파일명 또는 경로로 대체
})

const questionCount = ref(1)

const questions = ref([
  { id: 1, title: 'java 오류가 많이 뜨네요', preview: 'java 칠 때마다 잠깐 로딩되다가 바르...', date: '2025.04.13' },
  { id: 2, title: 'useState', preview: 'react에서 useState를 쓸 때 생명주기를...', date: '2025.04.13' },
  { id: 3, title: '포트폴리오 작성시', preview: '제 포트폴리오에서 어떤 걸 더 추가...', date: '2025.04.13' },
])

function getImageUrl(path) {
  try {
    return new URL(`@/assets/${path}`, import.meta.url).href
  } catch {
    return new URL('@/assets/icon-basic-user.png', import.meta.url).href
  }
}
</script>

<style scoped>
.mentoring-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Pretendard';
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
}
.info-row {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}
.mentor-box, .team-box {
  flex: 1;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.label {
  font-weight: bold;
  margin-bottom: 12px;
}
.mentor-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 8px;
  object-fit: cover;
}
.mentor-name {
  font-weight: bold;
}
.team-info {
  font-size: 14px;
  color: #444;
  margin-bottom: 12px;
  white-space: pre-line;
}
.question-count {
  font-size: 14px;
  color: #222;
}
.section {
  margin-top: 40px;
}
.sub-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
}
.question-card {
  border: 1px solid #5d5fef;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  background: #fff;
}
.question-title {
  font-weight: bold;
  color: #222;
  margin-bottom: 6px;
}
.question-preview {
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
}
.question-date {
  font-size: 12px;
  color: #999;
  text-align: right;
}
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  font-size: 14px;
  color: #444;
}
.page {
  cursor: pointer;
}
</style>