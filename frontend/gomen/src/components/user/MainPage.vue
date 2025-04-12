<template>
    <div class="main-wrapper">
      <div class="main-box">
        <img src="@/assets/gomen-logo.png" alt="GoMen Logo" class="logo" />
        <h1>GoMen에 오신 것을 환영합니다!🎉</h1>
      </div>
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
  
  const router = useRouter()
  
  const goToMail = () => {
    router.push('/mail')
  }

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
    height: 400px;
    background-color: #f2f2f2;
  }
  
  .main-box {
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 40px auto;
  width: 70%;
  max-width: 600px;
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