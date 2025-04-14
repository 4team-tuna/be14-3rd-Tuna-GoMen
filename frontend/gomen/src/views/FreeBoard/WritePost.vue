<template>
  <div class="write-container">
    <h1 class="page-title">🌱 자유 게시판 글쓰기</h1>

    <div class="form-group">
      <select v-model="category" id="category">
        <option disabled value="">카테고리</option>
        <option>장비추천</option>
        <option>잡담</option>
        <option>Q&A</option>
      </select>
    </div>

    <input v-model="title" type="text" class="title-input" placeholder="글 제목을 입력하세요" />
    <textarea v-model="content" class="content-input" placeholder="내용을 입력하세요 :)"></textarea>

    <div class="actions">
      <input type="file" @change="handleFileUpload" />
      <button class="submit-btn" @click="submitPost">게시글 등록</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const title = ref('')
const content = ref('')
const category = ref('')
const file = ref(null)

const handleFileUpload = (e) => {
  file.value = e.target.files[0]
}

const submitPost = async () => {
  if (!title.value || !content.value || !category.value) {
    alert('모든 항목을 입력해주세요!')
    return
  }
  const now = new Date()
const yy = String(now.getFullYear()).slice(2)
const mm = String(now.getMonth() + 1).padStart(2, '0')
const dd = String(now.getDate()).padStart(2, '0')

const formattedDate = `${yy}.${mm}.${dd}` // 👉 "25.04.13"


const user = JSON.parse(localStorage.getItem('user')) // 로컬스토리지에서 객체로 가져오기
const nickname = ref('')
nickname.value = user ? user.nickname : ''


  const newPost = {
  title: title.value,
  author: nickname.value ,
  date: formattedDate, // ✅ 요 줄!
  createdAt: now.toISOString(),
  category: category.value,
  views: 0,
  likes: 0,
  content: content.value,
  comments: [],
  is_blinded: "N" // ✅ 블라인드 기본값 추가
}


  try {
    const res = await axios.post('http://localhost:3001/allposts', newPost)
    newPost.id = res.data.id

    const raw = localStorage.getItem('allposts')
    const posts = raw ? JSON.parse(raw) : []
    posts.unshift(newPost) // ⬅ 이거! 최신 글을 맨 앞에 넣음
    localStorage.setItem('allposts', JSON.stringify(posts))

    alert('게시글이 등록되었습니다!')
    router.push('/boards/free')
  } catch (error) {
    console.error('서버 저장 실패:', error)
    alert('게시글 등록 실패 😢')
  }
}
</script>

<style scoped>
.write-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Noto Sans KR', sans-serif;
}

.page-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  padding: 0.5rem 1rem;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  justify-content: start;
}

.form-group select {
  width: 33%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")
    no-repeat right 1rem center;
  background-color: white;
  background-size: 1rem;
  padding-right: 2.5rem;
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
  justify-content: space-between;
  align-items: center;
}

input[type="file"] {
  font-size: 0.9rem;
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
