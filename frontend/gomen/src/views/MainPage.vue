<template>
  <div class="hero-wrapper">
    <div class="hero-image-container">
      <img src="@/assets/Ellipse 1.png" alt="장식 원" class="hero-deco" />

      <div class="hero-text">
        <p>
          사소함이 만드는<br /> 큰 차이,<br />
          <strong>Go Mento</strong>
        </p>
      </div>

      <!-- 🔴 멘토리스트 바로가기 버튼 -->
      <router-link to="/mentorlist" class="mentor-btn">
        멘토리스트 바로가기
      </router-link>

      <!-- 인기 멘토 섹션 추가 -->
      <section class="mentor-section">
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
  </div> <!-- Close hero-wrapper here -->
</template>


<script setup>
  import { useRouter } from 'vue-router'
  import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
  
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
.hero-wrapper {
  position: relative;
  text-align: center;
  padding: 0; /* 여기 수정 */
  margin: 0;  /* 혹시 몰라서 margin도 추가 */
  background-color: #fdfdfd;
  position: relative;
}


.hero-image-container {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0; /* 수정 */
  position: relative;
}


.mentor-btn {
  position: absolute;
  bottom: 280px;       /* 원보다 아래로 안 가게 숫자 조절 */
  left: 150px;       /* 원의 왼쪽 위치 (조정 가능) */
  background-color: #e53935; /* 빨간색 */
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  z-index: 2;
}

.mentor-btn:hover {
  transform: scale(1.05);
}

.hero-deco {
  width: 600px;
  height: auto;
}

.hero-text {
  position: absolute;
  top: 80px;
  right: 70px;
  color: white;
  font-weight: bold;
  font-size: 50px;
  text-align: right;
  line-height: 1.4;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.hero-text strong {
  font-size: 90px;
  animation: float 1s ease-in-out infinite;
  display: inline-block; 
}

.welcome-text {
  margin-top: 40px;
  font-size: 32px;
  font-weight: bold;
  line-height: 1.6;
  color: #333;
}

.highlight-text {
  color: #5a67d8;
}

/* Slider */
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


.mentor-section {
  position: absolute; /* 원에 상대적인 위치 */
  top: 270px; /* 원 위로 올라오게 조정 */
  left: 150px; /* 원의 왼쪽에 위치시킴 */
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1; /* 버튼보다는 아래에 있도록 설정 */
  width: auto; /* 원하는 너비로 설정 */
}

.mentor-section h2 {
  font-size: 20px;
  font-weight: bold;
}


.mentor-list {
  display: flex;            /* Flexbox로 가로 정렬 */
  gap: 20px;                /* 멘토들 사이에 여백 */
  overflow-x: auto;         /* 가로 스크롤 가능하도록 */
}


.mentor {
  display: flex;
  gap: 10px;
}

.mentor img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.mentor p {
  font-size: 14px;
}

.highlight {
  font-size: 14px;
  margin-top: 20px;
}

.yellow {
  color: #ffeb3b;
}

/* Board Section */
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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

.board li:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>

