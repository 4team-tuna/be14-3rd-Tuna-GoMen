<template>
    <div class="write-container">
        <h1 class="page-title">✏️ 게시글 수정</h1>

        <div class="form-group">
            <select v-model="category">
                <option disabled value="">카테고리</option>
                <option>장비추천</option>
                <option>잡담</option>
                <option>Q&A</option>
            </select>
        </div>

        <input v-model="title" type="text" class="title-input" placeholder="제목을 입력하세요" />
        <textarea v-model="content" class="content-input" placeholder="내용을 입력하세요 :)"></textarea>

        <div class="actions">
            <input type="file" @change="handleFileUpload" />
            <button class="submit-btn" @click="updatePost">수정 완료</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const title = ref('')
const content = ref('')
const category = ref('')
const file = ref(null)

const postId = route.params.id

const handleFileUpload = (e) => {
    file.value = e.target.files[0]
}

// 게시글 정보 불러오기
onMounted(async () => {
    try {
        const res = await axios.get(`http://localhost:3001/allposts/${postId}`)
        const post = res.data
        title.value = post.title
        content.value = post.content
        category.value = post.category
    } catch (err) {
        alert('게시글 정보를 불러오는 데 실패했습니다.')
        console.error(err)
    }
})

// 수정 요청 보내기
const updatePost = async () => {
    if (!title.value || !content.value || !category.value) {
        alert('모든 항목을 입력해주세요!')
        return
    }

    const updatedPost = {
        title: title.value,
        content: content.value,
        category: category.value,
    }

    try {
        await axios.patch(`http://localhost:3001/allposts/${postId}`, updatedPost)
        alert('게시글이 수정되었습니다!')
        router.push('/boards/free')
    } catch (err) {
        alert('수정 중 오류가 발생했습니다.')
        console.error(err)
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
    background: url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>") no-repeat right 1rem center;
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