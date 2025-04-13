<template>
  <div class="findid-wrapper">
    <div class="findid-box">
      <div class="findid-logo">
        <img src="@/assets/gomen-logo.png" alt="GoMen Logo" class="logo" style="height: 150px"/>
      </div>

      <div class="findid-title">아이디 찾기</div>

      <input v-model="name" type="text" placeholder="이름" class="findid-input" />
      <input v-model="personalNumber" type="text" placeholder="주민등록번호" class="findid-input" />

      <div class="findid-phone-group">
        <input v-model="phoneNumber" type="text" placeholder="휴대전화번호 (대한민국 +82)" class="findid-input" />
        <!-- <button class="findid-small-button">인증번호 받기</button> -->
      </div>

      <!-- <input type="text" placeholder="인증번호 6자리 숫자 입력" class="findid-input" /> -->

      <button class="findid-button" @click="findId">아이디 찾기</button>
      <button class="findid-back-button" @click="goBack">뒤로 가기</button>
    </div>
  </div>
</template>





<script setup>
  import {ref} from 'vue';
  import axios from 'axios'
  import {useRouter} from 'vue-router'

  const router = useRouter();

  const goBack = () => {router.push('/login')}

  const name = ref('')
  const personalNumber = ref('')
  const phoneNumber = ref('')

  const findId = async () => {
    if (!name.value || !personalNumber.value || !phoneNumber.value) {
    alert('모든 항목을 입력해주세요!')
    return
    }
    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          name: name.value,
          personalNumber: personalNumber.value,
          phoneNumber: phoneNumber.value
        }
      })

      if (response.data.length > 0) {
        // 아이디 찾기 성공
        const user = response.data[0]
        console.log('✅ 아이디 찾기 성공!', user)
        
        alert(`✅ 아이디 찾기 완료! 회원님의 ID는 ${user.loginId}입니다! 로그인해주세요.`)
        router.push('/login');
      } else {
        console.log('해당하는 회원이 없습니다.')
        alert(`해당하는 회원이 존재하지 않습니다.`)
      }
    } catch (error) {
      console.error('아이디 찾기 중 에러 발생:', error)
      alert('서버와의 통신 중 오류가 발생했습니다.')
    }
  }
</script>





<style scoped>
.findid-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f5f7fa, #c3cfe2); /* ✨ 여기 변경 */
}

.findid-box {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 350px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.findid-logo {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
}

.findid-title {
  font-size: 14px;
  color: #666;
  text-align: left;
  margin-bottom: 12px;
}

.findid-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-bottom: 12px;
  font-size: 14px;
  box-sizing: border-box;
}

.findid-phone-group {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.findid-small-button {
  padding: 8px 12px;
  font-size: 13px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.findid-button {
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

.findid-back-button {
  font-size: 13px;
  color: #333;
  background-color: transparent;
  border: 1px solid #aaa;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
}
</style>
