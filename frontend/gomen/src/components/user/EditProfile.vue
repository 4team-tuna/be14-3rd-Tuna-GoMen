<template>
  <div class="edit-profile-page">
    <h2>계정관리</h2>
    <h3>기본정보 입력</h3>

    <form @submit.prevent="applyChanges" class="edit-form">
      <div class="form-group">
        <label for="nickname">닉네임</label>
        <input id="nickname" v-model="form.nickname" type="text" />
      </div>

      <div class="form-group">
        <label for="college">학력</label>
        <input id="college" v-model="form.college" type="text" />
      </div>

      <div class="form-group">
        <label for="blog">블로그</label>
        <input id="blog" v-model="form.blog" type="text" />
      </div>

      <div class="form-group">
        <label for="githubAdress">github 주소</label>
        <input id="githubAdress" v-model="form.githubAdress" type="text" />
      </div>

      <div class="button-group">
        <button type="submit" class="apply-btn">적용</button>
        <button type="button" class="cancel-btn" @click="cancelChanges">취소</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const myId = localStorage.getItem('userId')

const user = ref({});
const form = ref({
  nickname: '',
  college: '',
  blog: '',
  githubAdress: ''
})

// 사용자 정보 가져와서 form에 세팅
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3001/users/${myId}`)
    if (response.data) {
      user.value = response.data
      // form 초기값 세팅
      form.value.nickname = user.value.nickname || ''
      form.value.college = user.value.college || ''
      form.value.blog = user.value.blog || ''
      form.value.githubAdress = user.value.githubAdress || ''
    } else {
      alert('❌ 로그인된 사용자 정보를 찾을 수 없습니다.')
    }
  } catch (error) {
    console.error('에러 발생:', error)
    alert('서버와의 통신 중 오류가 발생했습니다.')
  }
})

// 적용 버튼 클릭
const applyChanges = async () => {
  try {
    await axios.patch(`http://localhost:3001/users/${myId}`, {
      ...form.value
    })
    alert('✅ 정보가 성공적으로 수정되었습니다.')
    router.back()
  } catch (error) {
    console.error('정보 수정 실패:', error)
    alert('❌ 정보를 저장하는 도중 오류가 발생했습니다.')
  }
}

// 취소 버튼 클릭
const cancelChanges = () => {
  router.back()
}
</script>

<style scoped>
.edit-profile-page {
  font-family: Arial, sans-serif;
  margin: 30px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
}

h3 {
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 4px;
  font-weight: 500;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.apply-btn,
.cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}

.apply-btn {
  background-color: #333;
  color: #fff;
}

.cancel-btn {
  background-color: #eee;
  color: #333;
}

.cancel-btn:hover {
  background-color: #ddd;
}
.apply-btn:hover {
  background-color: #555;
}
</style>
