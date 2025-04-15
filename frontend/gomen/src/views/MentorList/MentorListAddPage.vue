<template>
    <div class="mentor-add-page">
      <h2 class="page-title">멘토 리스트 등록</h2>
  
      <div class="form-group">
        <label for="title">제목</label>
        <input id="title" v-model="form.title" type="text" placeholder="예: 10년차 백엔드 개발자" />
      </div>
  
      <div class="form-group">
        <label for="skills">주요 기술</label>
        <input id="skills" v-model="form.skills" type="text" placeholder="예: Java, Spring, Python..." />
      </div>
  
      <div class="form-group">
        <label for="description">기술 내용</label>
        <textarea id="description" v-model="form.description" rows="6" placeholder="기술 설명을 입력하세요" />
      </div>
  
      <button class="submit-btn" @click="submitForm">작성하기</button>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '@/api'
  
  const router = useRouter()
  
  const form = reactive({
    title: '',
    skills: '',
    description: ''
  })
  
  const submitForm = async () => {
    if (!form.title || !form.skills || !form.description) {
      alert('모든 항목을 입력해주세요.')
      return
    }

    const user = JSON.parse(localStorage.getItem('user'))
    form.userId = user.id
    form.name = user.nickname
    form.rating = 0.0
  
    try {
      await api.post('/mentorlist', form)
      alert('등록이 완료되었습니다.')
      localStorage.setItem('mentorRegistered', 'true')
      router.push('/mentorlist')
    } catch (err) {
      console.error('등록 실패:', err)
      alert('등록 중 오류가 발생했습니다.')
    }
  }
  </script>
  
  <style scoped>
  .mentor-add-page {
    max-width: 700px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  
  .page-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    box-sizing: border-box;
  }
  
  .submit-btn {
    width: 100%;
    padding: 12px;
    font-weight: bold;
    font-size: 16px;
    background-color: #5d5fef;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #7c83ff;
  }
  </style>
  