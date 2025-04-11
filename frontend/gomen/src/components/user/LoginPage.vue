<template>
    <div class="login-wrapper">
      <div class="login-box">
        <img src="@/assets/gomen-logo.png" alt="GoMen Logo" class="logo" style="height: 150px"/>
  
        <input v-model="loginId" type="text" placeholder="로그인 ID" class="input" />
        <input v-model="password" type="password" placeholder="비밀번호" class="input" />
  
        <button class="login-button" @click="login">로 그 인</button>
  
        <div class="link-group">
          <a href="#">아이디 찾기</a>
          <span>|</span>
          <a href="#">비밀번호 찾기</a>
          <span>|</span>
          <a href="#">회원가입</a>
        </div>
  
        <button class="back-button">⟵ 뒤로 가기</button>
      </div>
    </div>
  </template>
  




<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter();

const loginId = ref('')
const password = ref('')

const login = async () => {
  if (!loginId.value || !password.value) {
    alert('모든 항목을 입력해주세요!')
    return
  }
  try {
    const response = await axios.get('http://localhost:3001/users', {
      params: {
        loginId: loginId.value,
        password: password.value, // 평문 비교라면 그대로 비교
      },
    })

    if (response.data.length > 0) {
      // 로그인 성공
      const user = response.data[0]
      console.log('✅ 로그인 성공!', user)
      
      // 예: 로그인 상태 저장 (로컬스토리지 사용)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('loginId', loginId);
      localStorage.setItem('userId', user.id);

      // 홈으로 리다이렉트
      router.push('/main')
    } else {
      alert('❌ 아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  } catch (error) {
    console.error('로그인 중 에러 발생:', error)
    alert('서버와의 통신 중 오류가 발생했습니다.')
  }
}

</script>





<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #dcdcdc;
}

.login-box {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 350px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
}

.logo span {
  font-weight: 600;
}

.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-bottom: 12px;
  font-size: 14px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  margin: 12px 0;
  font-size: 15px;
  cursor: pointer;
}

.link-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
}

.link-group a {
  color: #333;
  text-decoration: none;
}

.back-button {
  font-size: 13px;
  color: #333;
  background-color: transparent;
  border: 1px solid #aaa;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
}
</style>
