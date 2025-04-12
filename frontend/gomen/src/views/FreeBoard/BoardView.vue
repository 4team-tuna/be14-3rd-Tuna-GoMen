<template>
    <div class="board-container">
      <h1 class="title">자유 게시판</h1>
      <button class="write-btn">글쓰기</button>
      
      <div class="filters">
  <div class="mb-4">
    <label class="mr-2">카테고리:</label>
    <select v-model="selectedCategory" class="border rounded px-2 py-1">
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
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .write-btn {
    float: right;
    margin-bottom: 1rem;
  }
  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  </style>
  