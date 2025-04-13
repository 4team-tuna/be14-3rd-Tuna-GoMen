<template>
  <div class="signup-wrapper">
    <div class="signup-box">
      <div class="signup-logo">
        <img src="@/assets/gomen-logo.png" alt="GoMen Logo" class="logo" style="height: 150px"/>
      </div>

      <div class="signup-title">회원가입</div>

      <input v-model="form.loginId" type="text" placeholder="아이디" class="signup-input" />
      <input v-model="form.password" type="password" placeholder="비밀번호" class="signup-input" />

      <input v-model="form.name" type="text" placeholder="이름" class="signup-input" />
      <input v-model="form.nickname" type="text" placeholder="닉네임" class="signup-input" />
      <input v-model="form.personalNumber" type="text" placeholder="주민등록번호호" class="signup-input" />
      <input v-model="form.phoneNumber" type="text" placeholder="휴대전화번호 (대한민국 +82)" class="signup-input" />

      <button class="signup-button" @click="submitForm">회원가입</button>
      <button class="signup-back-button" @click="goBack">뒤로 가기</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'
const router = useRouter();

const form = reactive({
  loginId: '',
  password: '',
  name: '',
  nickname: '',
  personalNumber: '',
  phoneNumber: '',
})

const submitForm = async () => {
  if (!form.loginId || 
      !form.password || 
      !form.name || 
      !form.nickname ||
      !form.personalNumber || 
      !form.phoneNumber) {
    alert('모든 항목을 입력해주세요!')
    return
  }
  try {
    const newUser = {
      id: Date.now().toString(), // 임시 ID (JSON Server에서는 자동 생성도 가능)
      loginId: form.loginId,
      password: form.password, // 실제 서비스에선 암호화 필요
      name: form.name,
      personalNumber: form.personalNumber,
      phoneNumber: form.phoneNumber,
      nickname: form.nickname, // 임시 닉네임은 이름과 동일하게
      createdAt: new Date().toISOString(),
      updatedAt: null,
      willBeActivated: new Date().toISOString(),
      isQuitted: 'N',
      githubAdress: '',
      extensionCount: 0,
      careerInfo: '',
      isMentor: 'N',
      violationScore: 0,
      averageRating: 0,
      college: '',
      blog: '',
    }

    await axios.post('http://localhost:3001/users', newUser)
    alert('회원가입이 완료되었습니다!')
    router.push('/');
  } catch (error) {
    console.error('회원가입 오류:', error)
    alert('회원가입에 실패했습니다.')
  }
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.signup-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f5f7fa, #c3cfe2); /* ✨ 여기 변경 */
}

.signup-box {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 370px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.signup-logo {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
}

.signup-title {
  font-size: 14px;
  color: #666;
  text-align: left;
  margin-bottom: 12px;
}

.signup-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-bottom: 12px;
  font-size: 14px;
  box-sizing: border-box;
}

.signup-button {
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

.signup-back-button {
  font-size: 13px;
  color: #333;
  background-color: transparent;
  border: 1px solid #aaa;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
}
</style>
