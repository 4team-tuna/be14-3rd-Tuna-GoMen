<template>
  <div class="mypage-container">
    <h1>My Page</h1>

    <!-- 기본 정보 -->
    <section class="info-box" v-if="user">
      <h2>기본 정보</h2>
      <div class="info-card">
        <div class="info-grid">
          <div class="info-text">
              <p>이름 | {{ user.name }}</p>
              <p>주민등록번호 | {{ user.personalNumber }}</p>
              <p>전화번호 | {{ user.phoneNumber }}</p>
              <p>ID | {{ user.loginId }}</p>
              <p>닉네임 | {{ user.nickname }}</p>
              <p>학교 | {{ user.college || '미입력' }}</p>
              <p>블로그 | {{ user.blog || '미입력' }}</p>
              <p>깃허브 주소 | {{ user.githubAdress || '미입력' }}</p>
          </div>
          <div class="profile-pic-box">
            <button class="profile-pic-placeholder" @click="addProfilePic">📷</button>
          </div>
        </div>
        <button class="action-button" @click="changeInfo">정보 수정</button>
      </div>
    </section>

      <!-- 회사 / 경력 -->
    <section class="info-box" v-if="user">
      <div class="section-header">
        <h2>회사 / 경력</h2>
        <button class="plus-button" @click="openCareerModal">+</button>
      </div>

      <div class="info-card">
        <div class="info-grid">
          <div class="info-text">
            <template v-if="user.careerInfo && user.careerInfo.trim() !== ''">
              <div
                v-for="(line, index) in user.careerInfo.split('\n')"
                :key="index"
                class="career-line"
              >
                <span>{{ line }}</span>
                <button class="delete-button" @click="confirmDeleteCareer(index)">✖</button>
              </div>
            </template>
            <template v-else>
              <p class="no-career">등록된 경력이 없습니다.</p>
            </template>
          </div>
        </div>
      </div>
    </section>
  
      <!-- 북마크 게시글 -->
    <section class="bookmark-box">
      <h2>내가 북마크한 게시글</h2>
      <div class="bookmark-list">
        <div class="bookmark-item">
          <p>자유게시판 - 함께해요</p>
          <small>프론트 팀 프로젝트 모집중이에요</small>
        </div>
        <div class="bookmark-item">
          <p>자유게시판 - Q&A</p>
          <small>React의 Component가 안 불러와요...</small>
        </div>
        <!-- 더보기 버튼 -->
        <div class="more">더 보기 &gt;</div>
      </div>
    </section>
  
      <!-- 비밀번호 변경 -->
      <section class="simple-box">
        <div class="box-content">
          <p>최근 변경일: 2024.12.01</p>
          <p class="label">비밀번호</p>
          <p>●●●●●●●●●●</p>
          <button class="small-btn" @click="openChangePasswordModal">비밀번호 변경</button>
        </div>
      </section>
  
      <!-- 멤버 유형 -->
      <section class="simple-box" v-if="user">
        <div class="box-content">
          <p>최근 신청일: 2024.12.01</p>
          <p class="label">{{ user.isMentor === 'Y' ? '멘토(Mentor)' : '멘티(Mentee)' }}</p>
          <button v-if="user.isMentor !== 'Y'" class="small-btn" @click="openApplyMentorModal">
            멘토 신청
          </button>
        </div>
      </section>

  </div>

  <CareerModal
    v-if="showCareerModal"
    @close="closeCareerModal"
    @apply="addCareer"
  />

  <ApplyMentorModal
    v-if="showApplyMentorModal"
    @apply="applyMentor"
    @close="closeApplyMentorModal"
  />

  <ChangePasswordModal
    v-if="showChangePasswordModal"
    @changePassword="changePassword"
    @close="closeChangePasswordModal"
    />
</template>
  



<script setup>
// 추후 API로 사용자 정보, 북마크 게시글 불러올 수 있음
  import CareerModal from '@/components/user/CareerModal.vue';
  import ApplyMentorModal from '@/components/user/ApplyMentorModal.vue';
  import ChangePasswordModal from '@/components/user/ChangePasswordModal.vue';
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const changeInfo = () => {router.push('/changeInfo')}
  
  const myId = localStorage.getItem('userId');

  // Modal창 띄우기용
  const showCareerModal = ref(false);
  const openCareerModal = () => { showCareerModal.value = true }
  const closeCareerModal = () => { showCareerModal.value = false }
  const showApplyMentorModal = ref(false);
  const openApplyMentorModal = () => { showApplyMentorModal.value = true }
  const closeApplyMentorModal = () => { showApplyMentorModal.value = false }
  const showChangePasswordModal = ref(false);
  const openChangePasswordModal = () => { showChangePasswordModal.value = true }
  const closeChangePasswordModal = () => { showChangePasswordModal.value = false }
  
  // 회원 정보 조회해서 띄우기
  const user = ref(null)
  onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:3001/users/${myId}`)
        if (response.data) {
        user.value = response.data
        } else {
            alert('❌ 로그인된 사용자 정보를 찾을 수 없습니다.')
        }
    } catch (error) {
        console.error('에러 발생:', error)
        alert('서버와의 통신 중 오류가 발생했습니다.')
    }
  })

  // 경력 추가
  const addCareer = async (careerText) => {
    try {
      const currentCareer = user.value.careerInfo || ''
      const updatedCareer = currentCareer
        ? currentCareer + '\n' + careerText
        : careerText

      await axios.patch(`http://localhost:3001/users/${myId}`, {
        careerInfo: updatedCareer
      })

      user.value.careerInfo = updatedCareer // 로컬도 갱신
      alert('경력 정보가 저장되었습니다.')
    } catch (error) {
      console.error('경력 저장 실패:', error)
      alert('경력 저장 중 오류가 발생했습니다.')
    }
  }

  // 경력 삭제
  const confirmDeleteCareer = async (indexToRemove) => {
    if (!confirm('이 경력 정보를 삭제하시겠습니까?')) return

    const lines = user.value.careerInfo.split('\n')
    lines.splice(indexToRemove, 1)
    const updatedCareer = lines.join('\n')

    try {
      await axios.patch(`http://localhost:3001/users/${myId}`, {
        careerInfo: updatedCareer
      })

      user.value.careerInfo = updatedCareer
      alert('✅ 경력이 삭제되었습니다.')
    } catch (error) {
      console.error('삭제 실패:', error)
      alert('❌ 삭제 중 오류가 발생했습니다.')
    }
  }

  // 멘토 신청
  const applyMentor = async (message) => {
    try {
      const payload = {
        id: myId,
        userId: user.value.loginId,
        nickname: user.value.nickname,
        done: false,
        requestAt: new Date().toISOString(),
        message
      }

      await axios.post('http://localhost:3001/mentorRequests', payload)

      alert('멘토 신청이 완료되었습니다!')
    } catch (err) {
      console.error('신청 오류:', err)
      alert('멘토 신청 중 오류가 발생했습니다.')
    }
  }

  const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    if (user.value.password !== currentPassword) {
      alert('현재 비밀번호가 일치하지 않습니다.');
      return;
    }

    await axios.patch(`http://localhost:3001/users/${myId}`, {
      password: newPassword
    });

    user.value.password = newPassword; // 로컬 정보도 갱신
    alert('비밀번호가 변경되었습니다.');
    closeChangePasswordModal()
  } catch (err) {
    console.error('비밀번호 변경 실패:', err);
    alert('비밀번호 변경 중 오류가 발생했습니다.');
    closeChangePasswordModal()
  }
};
</script>
  
<style scoped>
  .mypage-container {
    max-width: 720px;
    margin: 0 auto;
    padding: 40px 20px;
    background-color: #f6f6f6;
    font-family: 'Pretendard', sans-serif;
  }

  h1 {
    font-size: 26px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .info-box,
  .bookmark-box,
  .simple-box {
    background-color: white;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  }

  .info-card .info-grid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .info-text p {
    
    margin: 4px 0;
    font-size: 15px;
    line-height: 1.4;
    color: #333;
  }

  .profile-pic-box {
    width: 80px;
    height: 80px;
    background-color: #eee;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-pic-placeholder {
    font-size: 40px;
  }

  .action-button {
    margin-top: 20px;
    background-color: #000;
    color: white;
    padding: 10px 20px;
    border-radius: 12px;
    font-size: 14px;
    cursor: pointer;
    border: none;
  }

  .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  }

  .plus-button {
    font-size: 18px;
    background-color: #000;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
  }

  .career-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid #eee;
  }

  .delete-button {
    background: none;
    border: none;
    color: #888;
    font-size: 14px;
    cursor: pointer;
    margin-left: 10px;
  }

  .delete-button:hover {
    color: red;
  }

  .bookmark-box h2 {
    font-size: 18px;
    margin-bottom: 16px;
  }

  .bookmark-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .bookmark-item {
    background-color: #fafafa;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid #ddd;
  }

  .bookmark-item p {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .more {
    margin-top: 10px;
    text-align: right;
    font-size: 14px;
    color: #777;
    cursor: pointer;
  }

  .simple-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .box-content {
    width: 100%;
  }

  .label {
    font-weight: bold;
    margin: 6px 0;
  }

  .small-btn {
    background-color: white;
    color: black;
    border: 1px solid #aaa;
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
    float: right;
  }
</style>
