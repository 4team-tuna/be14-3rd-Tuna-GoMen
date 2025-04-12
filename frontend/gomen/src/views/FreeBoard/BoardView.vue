<template>
    <div class="board-container">
      <h1 class="title">🌱 자유 게시판</h1>
      <button class="write-btn">글쓰기</button>
      
      <div class="filters">
  <div class="category-group">
    <label>카테고리:</label>
    <select v-model="selectedCategory" class="category-select">
      <option value="">전체</option>
      <option value="장비추천">장비추천</option>
      <option value="잡담">잡담</option>
      <option value="Q&A">Q&A</option>
    </select>
  </div>

  <select v-model="sort">
    <option value="date">최신순</option>
    <option value="title">제목순</option>
  </select>

  <input v-model="search" placeholder="내용을 검색하세요" />
</div>

  
      <BoardList
        :posts="filteredPosts"
        :current-page="currentPage"
        :page-size="15"
        @change-page="currentPage = $event"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  import BoardList from '@/components/freeboard/BoardList.vue'
  
  const posts = ref([])
  const search = ref('')
  const sort = ref('date')
  const currentPage = ref(1)
  const selectedCategory = ref('')
  
  onMounted(async () => {
  const res = await axios.get('http://localhost:3001/allposts') // 요기만 바꿨어!
  posts.value = res.data
})
  
const filteredPosts = computed(() => {
  let result = posts.value

  // ✅ 카테고리 선택 반영 (selectedCategory로 고쳐야 작동함!)
  if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  if (search.value) {
    result = result.filter(p =>
      p.title.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  if (sort.value === 'title') {
    result = result.sort((a, b) => a.title.localeCompare(b.title))
  } else {
    result = result.sort((a, b) => b.id - a.id)
  }

  return result
})

  </script>
  
  <style scoped>
.board-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Noto Sans KR', sans-serif;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: left;
}

.write-btn {
  display: block;
  margin-left: auto;
  margin-bottom: 1.5rem;
  background-color: #007acc;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.write-btn:hover {
  background-color: #005a99;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filters select {
  padding: 8px 12px;
  padding-right: 28px; /* 오른쪽에 여유 공간 추가! */
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  flex: 0 0 130px;
  appearance: none; /* 화살표 숨김 (선택적) */
  background: url('data:image/svg+xml;charset=UTF-8,<svg fill="black" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px center;
  background-color: white;
  background-size: 16px;
}


.filters input {
  flex: 1; /* 검색창이 가장 넓게 차지함 */
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  min-width: 200px;
}

label {
  font-weight: 500;
  margin-right: 0.5rem;
}

.filters select:focus,
.filters input:focus {
  border-color: #007acc;
  outline: none;
}

.category-select {
  width: 160px; /* ✅ 너비 늘림 */
  padding: 8px 12px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
}


  </style>
  