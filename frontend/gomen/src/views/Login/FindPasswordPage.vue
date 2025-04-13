<template>
    <div class="findpw-wrapper">
      <div class="findpw-box">
        <div class="findpw-logo">
          <img src="@/assets/gomen-logo.png" alt="GoMen Logo" class="logo" style="height: 150px"/>
        </div>
  
        <div class="findpw-title">비밀번호 찾기</div>
  
        <input v-model="name" type="text" placeholder="이름" class="findpw-input" />
        <input v-model="personalNumber" type="text" placeholder="주민등록번호" class="findpw-input" />
        <input v-model="loginId" type="text" placeholder="로그인ID" class="findpw-input" />
  
        <div class="findpw-phone-group">
          <input v-model="phoneNumber" type="text" placeholder="휴대전화번호 (대한민국 +82)" class="findpw-input" />
          <!-- <button class="findpw-small-button">인증번호 받기</button> -->
        </div>
  
        <!-- <input type="text" placeholder="인증번호 6자리 숫자 입력" class="findpw-input" /> -->
  
        <button class="findpw-button" @click="findPassword">비밀번호 찾기</button>
        <button class="findpw-back-button" @click="goBack">뒤로 가기</button>
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
  const loginId = ref('')

  const findPassword = async () => {
    if (!name.value || !personalNumber.value || !phoneNumber.value || !loginId.value) {
    alert('모든 항목을 입력해주세요!')
    return
    }
    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          name: name.value,
          personalNumber: personalNumber.value,
          phoneNumber: phoneNumber.value,
          loginId: loginId.value
        }
      })

      if (response.data.length > 0) {
        // 비밀번호 찾기 성공
        const user = response.data[0]
        console.log('✅ 비밀번호 찾기 성공!', user)
        
        alert(`✅ 비밀번호 찾기 완료! 회원님의 비밀번호는 ${user.password}입니다! 로그인해주세요.`)
        router.push('/login');
      } else {
        console.log('해당하는 회원이 없습니다.')
        alert(`해당하는 회원이 존재하지 않습니다.`)
      }
    } catch (error) {
      console.error('비밀번호 찾기 중 에러 발생:', error)
      alert('서버와의 통신 중 오류가 발생했습니다.')
    }
  }
</script>
  
<style scoped>
.findpw-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f5f7fa, #c3cfe2); /* ✨ 여기 변경 */
}

.findpw-box {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 370px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.findpw-logo {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
}

.findpw-title {
  font-size: 14px;
  color: #666;
  text-align: left;
  margin-bottom: 12px;
}

.findpw-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-bottom: 12px;
  font-size: 14px;
  box-sizing: border-box;
}

.findpw-phone-group {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.findpw-small-button {
  padding: 8px 12px;
  font-size: 13px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.findpw-button {
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

.findpw-back-button {
  font-size: 13px;
  color: #333;
  background-color: transparent;
  border: 1px solid #aaa;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
}
</style>
