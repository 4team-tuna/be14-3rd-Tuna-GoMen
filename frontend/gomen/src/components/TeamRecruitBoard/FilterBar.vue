<template>
  <div class="filter-bar">
    <div class="left-filters">
      <select v-model="selectedFilter" class="filter-select">
        <option value="all">전체</option>
        <option value="teamName">팀명</option>
        <option value="title">제목</option>
        <option value="nickname">닉네임</option>
      </select>
      <input
        type="text"
        v-model="searchKeyword"
        placeholder="검색어를 입력하세요"
        @keyup.enter="emitSearch"
      />
    </div>
    <div class="right-buttons">
      <button
        :class="['btn-search', { active: selectedCategory === 'all' }]"
        @click="filterAll"
      >
        전체
      </button>
      <button
        :class="['btn-search', { active: selectedCategory === 'recruiting' }]"
        @click="filterRecruiting"
      >
        모집중
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const selectedCategory = ref('all')
const selectedFilter = ref('all') // 👈 검색 필터 추가
const searchKeyword = ref('')
const emit = defineEmits(['search'])

const emitSearch = () => {
  emit('search', {
    category: selectedCategory.value,
    keyword: searchKeyword.value,
    filter: selectedFilter.value,
  })
}

const filterAll = () => {
  selectedCategory.value = 'all'
  emitSearch()
}

const filterRecruiting = () => {
  selectedCategory.value = 'recruiting'
  emitSearch()
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.left-filters {
  display: flex;
  gap: 0.5rem;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.left-filters input[type='text'] {
  padding: 0.5rem;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.right-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-search {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-search.active {
  background-color: #b4f2b2; /* 초록색 */
  border-color: #8ede8c;
}
</style>
