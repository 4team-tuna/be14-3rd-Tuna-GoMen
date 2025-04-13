<template>
  <div class="main-wrapper">
    <div class="main-box">
      <img src="@/assets/gomen-logo.png" alt="GoMen Logo" class="logo" />
      <h1 class="welcome-text">
        <span class="highlight-text">GoMen</span>에 오신 것을 <br />
        <span class="highlight-text">환영합니다!</span>
      </h1>
    </div>
  </div>

  <!-- 배너 슬라이더 -->
  <div class="slider-wrapper">
    <button class="arrow left" @click="prevBanner">‹</button>

    <div class="banner-container">
      <div class="slider-track" :style="trackStyle">
        <img
          v-for="(banner, index) in banners"
          :key="index"
          :src="banner"
          alt="배너 이미지"
          class="banner-image"
        />
      </div>
    </div>

    <button class="arrow right" @click="nextBanner">›</button>
  </div>

    <!-- 인기 멘토 섹션 -->
  <section class="mentor-section">
    <button class="mentor-button">멘토리스트 바로가기</button>
    <h2>지금 가장 인기있는 멘토</h2>
    <div class="mentor-list">
      <div class="mentor" v-for="mentor in mentors" :key="mentor.name">
        <img :src="mentor.img" :alt="mentor.name" />
        <p>{{ mentor.title }}<br />{{ mentor.name }}</p>
      </div>
    </div>
    <p class="highlight">
      실제 멘토들의 <span class="yellow">솔직한 별점과</span>
      <span class="yellow">생생한 리뷰</span>를 보고 신청해보세요!
    </p>
  </section>

  <!-- 배너 이미지 섹션 -->
  <div class="banner-image">
    <!-- <img src="@/assets/banner.png" alt="Mentoring Banner" /> -->
  </div>

  <!-- 게시판 섹션 -->
  <section class="board-section">
    <h2>🏠 집에서 만나는 따스한 멘토링</h2>
    <div class="board-columns">
      <div class="board">
        <h3>자유 게시판</h3>
        <ul>
          <li>코딩이 너무 재미없을 때 추천해주세요ㅠ</li>
          <li>요즘 무엇을 공부하나요?</li>
          <li>React와 Vue 비교해서 장단점 알려주세...</li>
        </ul>
      </div>
      <div class="board">
        <h3>팀모집 게시판</h3>
        <ul>
          <li>Spring 웹팀 팀원 모집합니다</li>
          <li>프론트엔드 개발팀 리드 찾습니다</li>
          <li>토이프로젝트 앱 같이 만들어요!</li>
        </ul>
      </div>
    </div>
  </section>

</template>






<script setup>
  import { useRouter } from 'vue-router'
  import {computed, ref, onMounted, onBeforeUnmount} from 'vue';
  
  const router = useRouter()

  const banners = [
  new URL('@/assets/banner/banner_tablet.png', import.meta.url).href,
  new URL('@/assets/banner/banner_meeting.png', import.meta.url).href,
  new URL('@/assets/banner/banner_desk.png', import.meta.url).href
  ]

  const currentBanner = ref(0)

  const prevBanner = () => {
    currentBanner.value = (currentBanner.value - 1 + banners.length) % banners.length
  }
  const nextBanner = () => {
    currentBanner.value = (currentBanner.value + 1) % banners.length
  }

  // 자동 슬라이드
  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      nextBanner()
    }, 5000) // 5초마다 변경
  })
  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })

  // 스타일로 현재 슬라이드 위치 계산
  const trackStyle = computed(() => ({
    transform: `translateX(-${currentBanner.value * 100}%)`
  }))

  const mentors = [
  {
    name: '한승우',
    title: '백엔드 개발자 3년차',
    img: new URL('@/assets/icon-user.png', import.meta.url).href,
  },
  {
    name: '김세미',
    title: 'PM',
    img: new URL('@/assets/icon-user.png', import.meta.url).href,
  },
  {
    name: '우기까',
    title: '서버 엔지니어',
    img: new URL('@/assets/icon-user.png', import.meta.url).href,
  },
  {
    name: '박태희',
    title: 'AI 개발자',
    img: new URL('@/assets/icon-user.png', import.meta.url).href,
  },
]
  </script>




  
<style scoped>

.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f6f8ff, #e6ecff);
  height: 400px;
}

.main-box {
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 80%;
}

.logo {
  width: 120px;
  margin-bottom: 16px;
}

.welcome-text {
  font-size: 30px;
  font-weight: bold;
  line-height: 1.5;
  color: #333;
}

.highlight-text {
  color: #5a67d8;
}

/* 슬라이더 */
.slider-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px auto;
  max-width: 90%;
}

.slider-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px auto;
  max-width: 100%;
}

.banner-container {
  width: 100%;
  max-width: 1000px;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.slider-track {
  display: flex;
  transition: all 0.6s ease-in-out;
}

.banner-image {
  width: 1000px;
  height: 380px;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 16px;
}

/* 화살표 스타일은 기존 그대로 유지 */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  color: #333;
  font-size: 32px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
  z-index: 10;
}

.arrow:hover {
  background-color: #f2f2f2;
}

.arrow.left {
  left: 0px;
}

.arrow.right {
  right: 0px;
}
  
  .mail-button {
  background-color: black;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 20px;
}

.mentor-section {
  text-align: center;
  margin-top: 100px;
}

.mentor-button {
  background-color: red;
  color: white;
  padding: 10px 18px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 20px;
}

.mentor-list {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.mentor img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: 10px;
}

.highlight {
  margin-top: 10px;
  font-weight: bold;
}

.yellow {
  color: orange;
}

.banner-image img {
  display: block;
  margin: 40px auto;
  width: 90%;
  max-width: 700px;
  border-radius: 12px;
}

.board-section {
  text-align: center;
}

.board-columns {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.board {
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  width: 300px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.board h3 {
  margin-bottom: 10px;
}

.board ul {
  list-style: none;
  padding: 0;
}

.board li {
  margin-bottom: 8px;
  font-size: 14px;
  text-align: left;
}
</style>