<template>
    <div class="write-wrapper">
      <div class="page-title-box">
        <h1 class="page-title">🧩팀 모집 게시글 작성</h1>
      </div>
  
      <div class="form-box">
        <input
          v-model="title"
          type="text"
          class="title-input"
          placeholder="글 제목을 입력하세요"
        />
        <input
          v-model="teamName"
          type="text"
          class="title-input"
          placeholder="팀명을 입력하세요"
        />
        <textarea
          v-model="content"
          class="content-input"
          placeholder="내용을 입력하세요 :)"
        ></textarea>
  
        <div class="actions">
          <button class="submit-btn" @click="submitPost">게시글 등록</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const router = useRouter()
  
  const title = ref('')
  const teamName = ref('')
  const content = ref('')
  
  // 로그인한 사용자 정보 가져오기
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const userId = user.id || ''
  const userNickname = user.nickname || ''
  
  // 게시글 작성 함수
  const submitPost = async () => {
    if (!title.value || !teamName.value || !content.value) {
      alert('모든 항목을 입력해주세요!')
      return
    }
  
    const newPost = {
      userId: userId,
      title: title.value,
      teamName: teamName.value,
      teamIntroduce: content.value,
      nickname: userNickname || '익명',
      createdAt: new Date().toISOString(),
      isActivated: 'Y',
      isDeleted: 'N',
      applicants: [],
    }
  
    try {
      // id를 빼고, json-server가 자동으로 id를 부여하도록 처리
      await axios.post('http://localhost:3001/teamRecruitPosts', newPost)
      alert('게시글이 등록되었습니다!')
      router.push('/board/team-recruit')
    } catch (error) {
      console.error('등록 실패:', error)
      alert('등록에 실패했습니다.')
    }
  }
  </script>
  
  <style scoped>
  .write-wrapper {
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Noto Sans KR', sans-serif;
  }
  
  .page-title-box {
    text-align: left;
    margin-bottom: 2rem;
  }
  
  .page-title {
    font-size: 1.8rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 12px;
  }
  
  .title-input {
    width: 100%;
    padding: 12px;
    font-size: 1.1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    margin-bottom: 1rem;
  }
  
  .content-input {
    width: 100%;
    height: 250px;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    resize: vertical;
    margin-bottom: 1rem;
  }
  
  .actions {
    display: flex;
    justify-content: end;
  }
  
  .submit-btn {
    background-color: #5a68d8;
    color: white;
    padding: 10px 18px;
    font-size: 1rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .submit-btn:hover {
    background-color: #3e4bb5;
  }
  </style>
  